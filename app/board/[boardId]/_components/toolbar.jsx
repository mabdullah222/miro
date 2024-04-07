import React from 'react'
import ToolButton from './tool-button'
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote,Type, Undo2 } from 'lucide-react'

export const modeTypes={None:0,
    Pressing:1,
    SelectionNet:2,
    Translating:3,
    Inserting:4,
    Resizing:5,
    Pencil:6
}

export const LayerType={
    Rectangle:0,
  Ellipse:1,
  Path:2,
  Text:3,
  Note:4,
}




const Toolbar = ({canUndo,undo,redo,canvasState,setCanvasState,canRedo}) => {
  console.log(canvasState.mode === modeTypes.None ||
                canvasState.mode === modeTypes.Translating ||
                canvasState.mode === modeTypes.SelectionNet ||
                canvasState.mode === modeTypes.Pressing ||
                canvasState.mode === modeTypes.Resizing)
  console.log(canvasState)
  return (
    <div className='absolute  translate-y-[50%] flex  flex-col gap-y-4 left-2'>
        <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col shadow-md items-center'>
            <ToolButton
             isActive={canvasState.mode === modeTypes.None ||
                canvasState.mode === modeTypes.Translating ||
                canvasState.mode === modeTypes.SelectionNet ||
                canvasState.mode === modeTypes.Pressing ||
                canvasState.mode === modeTypes.Resizing}
             onClick={()=>{
                setCanvasState({mode:modeTypes.None})
             }}   
             isDisabled={false}
            icon={MousePointer2}
             label={"Select"}
            ></ToolButton>
            
            <ToolButton isActive={canvasState.mode==modeTypes.Inserting && canvasState.layerType==LayerType.Text} onClick={()=>{setCanvasState({mode:modeTypes.Inserting,layerType:LayerType.Text})}}   isDisabled={false}
            icon={Type} label={"Text"}
            ></ToolButton>

            <ToolButton isActive={canvasState.mode==modeTypes.Inserting && canvasState.layerType==LayerType.Note} onClick={()=>{setCanvasState({mode:modeTypes.Inserting,layerType:LayerType.Note})}}  isDisabled={false}
            icon={StickyNote} label={"StickyNote"}
            ></ToolButton>


            <ToolButton isActive={
                canvasState.mode===modeTypes.Inserting && canvasState.layerType==LayerType.Rectangle
            } onClick={()=>{
                setCanvasState({mode:modeTypes.Inserting,layerType:LayerType.Rectangle})
            }}  isDisabled={false}
            icon={Square} label={"Rectangle"}
            ></ToolButton>

            <ToolButton isActive={canvasState.mode===modeTypes.Inserting && canvasState.layerType==LayerType.Ellipse } onClick={()=>{setCanvasState({mode:modeTypes.Inserting,layerType:LayerType.Ellipse})}}  isDisabled={false}
            icon={Circle} label={"Ellipse"}
            ></ToolButton>

            <ToolButton onClick={() => setCanvasState({
            mode: modeTypes.Pencil,
          })}
          isActive={
            canvasState.mode === modeTypes.Pencil
          }  isDisabled={false}
            icon={Pencil} label={"Pen"}
            ></ToolButton>

        </div>
        <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
            <ToolButton label={"Undo"} icon={Undo2} onClick={undo} isDisabled={!canUndo} isActive={false}>

            </ToolButton>
            <ToolButton label={"Redo"} icon={Redo2} onClick={redo} isDisabled={!canRedo} isActive={false}>

            </ToolButton>
        </div>
    </div>
  )
}

export default Toolbar

export const ToolbarSkeleton=()=>{
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md animate-pulse" />
  );
}