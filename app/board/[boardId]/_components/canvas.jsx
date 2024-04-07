"use client"

import Participants from "./participants"
import Info from "./info"
import Toolbar, { modeTypes } from "./toolbar"
import { LiveList,LiveMap,LiveObject } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"
import { LayerPreview } from "./layer-preview"
import { 
    useHistory, 
    useCanUndo, 
    useCanRedo,
    useMutation,
    useStorage,
    useOthersMapped,
    useSelf,
  } from "../../../../liveblocks.config";
import { CursorsPresence } from "./cursor-presence";
import { useCallback, useState } from "react";
import { ColorToCss, pointerEventToCanvasPoint } from "../../../../lib/utils";
import { nanoid } from "nanoid"
import { useMemo,memo } from "react"
import {conectionIDtoColor} from "../../../../lib/utils"
import { SelectionBox } from "./selection-box"
import { Side } from "./selection-box"
import { ResizeBounds } from "../../../../lib/utils"
import { SelectionTools } from "./selection-tools"
import { findIntersectingLayersWithRectangle } from "../../../../lib/utils"
import { penPointsToPathLayer } from "../../../../lib/utils"
import { Path } from "./Path"

const MAX_LAYERS=100;

export const Canvas=({boardId})=>{
    const info=useSelf(me=>me.info)
    const [canvasState,setCanvasState]=useState({mode:0,layerType:null})
    const history=useHistory()
    const canUndo=useCanUndo()
    const canRedo=useCanRedo()
    const layerIds=useStorage((root)=>root.layerIds);
    const pencilDraft=useSelf((self)=>self.presence.pencilDraft)
    const [lastUsedColor,setLastUsedColor]=useState({r:255,g:255,b:255});
    const [camera,setCamera]=useState({x:0,y:0})

    const InsertLayer=useMutation(({storage,setMyPresence},layerType,position)=>{
        const liveLayers=storage.get("layers")
        if(liveLayers.length>=MAX_LAYERS){
            return
        }
        const layerIds=storage.get("layerIds")
        const layerId=nanoid();
        const layer=new LiveObject({
            type:layerType,x:position.x,
            y:position.y,
            height:100,
            width:100,
            fill:lastUsedColor
        })
        layerIds.push(layerId)
        liveLayers.set(layerId,layer)
        setMyPresence({selection:[layerId]},{addToHistory:true})
        setCanvasState({mode:modeTypes.None})
    },[lastUsedColor])

    const onWheel=useCallback((e)=>{
        
        setCamera((camera)=>({x:camera.x-e.deltaX,y:camera.y-e.deltaY}))
    })

    const unSelectLayers=useMutation(({self,setMyPresence})=>{
        if(self.presence.selection.length!==0){
            setMyPresence({selection:[]},{addToHistory:true})
        }
    },[])

    const insertPath=useMutation(({storage,self,setMyPresence})=>{
        const liveLayers=storage.get('layers');
        const {pencilDraft}=self.presence;
        if(pencilDraft==null || pencilDraft.length <2 || liveLayers.size>=MAX_LAYERS){
            setMyPresence({pencilDraft:null})
            return;
        }
        const id=nanoid();
        liveLayers.set(id,new LiveObject(penPointsToPathLayer(pencilDraft,lastUsedColor)))
        const livelayerIds=storage.get("layerIds")
        livelayerIds.push(id)
        setMyPresence({pencilDraft:null})
        setCanvasState({mode:modeTypes.Pencil})
    },[lastUsedColor])


    const onPointerUp=useMutation(({setMyPresence},e)=>{
        const point=pointerEventToCanvasPoint(e,camera)
        if(canvasState.mode===modeTypes.None || canvasState.mode===modeTypes.Pressing){
            unSelectLayers();
            setCanvasState({mode:modeTypes.None})
        }
        else if(canvasState.mode===modeTypes.Pencil){
            insertPath()
        }
        else if(canvasState.mode===modeTypes.Inserting){
            InsertLayer(canvasState.layerType,point)
        }
        else{
            setCanvasState({mode:modeTypes.None})
        }
        history.resume()
    },[setCanvasState,
        camera,
        canvasState,
        history,
        InsertLayer,
        unSelectLayers,
        setCanvasState,
        insertPath
        ])

    const resizeSelectedLayer=useMutation(({storage,self},point)=>{
        if(canvasState.mode!==modeTypes.Resizing){
            return;
        }
        const bounds=ResizeBounds(canvasState.initialBounds,canvasState.corner,point)
        const liveLayers=storage.get('layers')
        const layer=liveLayers.get(self.presence.selection[0])
        if(layer){
            layer.update(bounds)
        }
    },[canvasState])

    const translateSelectedLayers=useMutation(({storage,self},point)=>{
        if(canvasState.mode!==modeTypes.Translating){
            return;
        }
        const offset={x:point.x-canvasState.current.x,y:point.y-canvasState.current.y}
        const liveLayers=storage.get('layers');
        for (const id of self.presence.selection){
            const layer=liveLayers.get(id);
            if(layer){
                layer.update({x:layer.get("x")+offset.x,y:layer.get("y")+offset.y})
            }
        }
        setCanvasState({mode:modeTypes.Translating,current:point})
    },[canvasState])

    const updateSelectionNet=useMutation(({storage,setMyPresence},current,origin)=>{
        const layers=storage.get('layers').toImmutable();
        setCanvasState({mode:modeTypes.SelectionNet,origin,current})
        const ids=findIntersectingLayersWithRectangle(layerIds,layers,origin,current);
        setMyPresence({selection:ids},{addToHistory:true});
    },[layerIds,canvasState])

    const startMultiSelection=useCallback((current,origin)=>{   
        if(Math.abs(current.x - origin?.x) + Math.abs(current.y - origin?.y) > 5){
            setCanvasState({mode:modeTypes.SelectionNet,origin,current})
        }
    },[])

    const continueDrawing=useMutation(({self,setMyPresence},point,e)=>{
        const {pencilDraft}=self.presence;
        if(canvasState.mode!==modeTypes.Pencil || e.buttons!=1 || pencilDraft ==null){
            return;
        }
        setMyPresence({cursor:point,pencilDraft:pencilDraft.length===1 && pencilDraft[0][0]===point.x && pencilDraft[0][1]===point.y ? pencilDraft : [...pencilDraft,[point.x,point.y,e.pressure]]})
    },[canvasState.mode])

    const onPointerMove = useMutation(
        ({setMyPresence},e) => {
        e.preventDefault();
        
        const current = pointerEventToCanvasPoint(e, camera);
        if(canvasState.mode===modeTypes.Pressing){
            startMultiSelection(current,canvasState.origin);
        }
        else if(canvasState.mode===modeTypes.SelectionNet){
            updateSelectionNet(current,canvasState.origin);
        }
        else if(canvasState.mode===modeTypes.Translating){
            translateSelectedLayers(current)
        }
        else if(canvasState.mode==modeTypes.Resizing){
            resizeSelectedLayer(current)
        }
        else if(canvasState.mode===modeTypes.Pencil){
            continueDrawing(current,e);
        }
        setMyPresence({ cursor: current });

        
      },[canvasState,resizeSelectedLayer,camera,translateSelectedLayers,startMultiSelection,updateSelectionNet,continueDrawing])

    const onPointerLeave=useMutation(({setMyPresence},e)=>{
        e.preventDefault()
        setMyPresence({cursor:null})
    },[])
    
    const selections=useOthersMapped((other)=>other.presence.selection);
    
    const layerIdsToColorSelection=useMemo(()=>{
        const layerIdsToColorSelection={}
        for (const user of selections) {
            const [connectionId, selection] = user;
            for (const layerId of selection) {
              layerIdsToColorSelection[layerId] = conectionIDtoColor(connectionId)
            }
        }
        return layerIdsToColorSelection
    },[selections])

    const onLayerPointerDown=useMutation(({self,setMyPresence},e,layerId)=>{
        if(canvasState.mode===modeTypes.Pencil || canvasState.mode===modeTypes.Inserting){
            return;
        }
            history.pause()
            e.stopPropagation();
            const point=pointerEventToCanvasPoint(e,camera);
            if(!self.presence.selection.includes(layerId)){
                setMyPresence({selection:[layerId]},{addToHistory:true})
            }
        setCanvasState({mode:modeTypes.Translating,current:point})
    },[setCanvasState,camera,history,canvasState.mode])

    const onResizeHandlePointerDown=useCallback((corner,initialBounds)=>{
        history.pause();
        setCanvasState({mode:modeTypes.Resizing,initialBounds,corner})

    },[history])

    const startDrawing=useMutation(({setMyPresence},point,pressure)=>{
        setMyPresence({pencilDraft:[[point.x,point.y,pressure]],pencilColor:lastUsedColor})
    },[])

    const onPointerDown=useCallback((e)=>{
        const point=pointerEventToCanvasPoint(e,camera);
        if(canvasState.mode===modeTypes.Inserting){
            return;
        }
        if (canvasState.mode === modeTypes.Pencil) {
            startDrawing(point, e.pressure);
            return;
        }
        setCanvasState({origin:point,mode:modeTypes.Pressing})
    },[camera,canvasState.mode,setCanvasState,startDrawing])

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}></Info>
            <Participants boardId={boardId}></Participants>
            <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo}
            canUndo={canUndo} undo={history.undo} redo={history.redo}

            ></Toolbar>
            <SelectionTools setLastUsedColor={setLastUsedColor} camera={camera}></SelectionTools>
            <svg
        className="h-[100vh] w-[100vw] bg-green-100"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`
          }}
        >
            {layerIds.map((layerId)=>{
                return (
                    <LayerPreview 
                    key={layerId}
                    id={layerId}
                    onLayerPointerDown={onLayerPointerDown}
                    selectionColor={layerIdsToColorSelection}
                    >

                    </LayerPreview>
                )
            })}
            <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}></SelectionBox>
            
            {canvasState.mode===modeTypes.SelectionNet && canvasState.current!=null && <rect
            className="fill-blue-500/5 stroke-blue-500 stroke-1" x={Math.min(canvasState.origin.x,canvasState.current.x)}  y={Math.min(canvasState.origin.y,canvasState.current.y)}
            width={Math.abs(canvasState.origin.x-canvasState.current.x)}
            height={Math.abs(canvasState.origin.y-canvasState.current.y)}
            >
                
                </rect>}
          <CursorsPresence />
          {pencilDraft!=null && pencilDraft.length>0 && (
            <Path points={pencilDraft} fill={ColorToCss(lastUsedColor)} x={0} y={0}>

            </Path>
          )}
        </g>
      </svg>
        </main>
    )
}