"use client"

import { useSelf ,useMutation} from "../../../../liveblocks.config";
import { useSelectionBounds } from "../../../../hooks/useSelectionBounce";
import { memo } from "react";
import { BringToFront,SendToBack,Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {ColorPicker} from "../_components/ColorPicker"
import { useDeleteLayers } from "../../../../hooks/use-delete-layers";
import Hint from "../../../../components/hint";

export const SelectionTools=memo(({setLastUsedColor,camera})=>{
    const selection=useSelf((self)=>self.presence.selection);

    const moveToBack = useMutation((
      { storage }
    ) => {
      const liveLayerIds = storage.get("layerIds");
      const indices= [];
  
      const arr = liveLayerIds.toImmutable();
      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }
      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    }, [selection]);
    const moveToFront = useMutation((
      { storage }
    ) => {
      const liveLayerIds = storage.get("layerIds");
      const indices= [];
  
      const arr = liveLayerIds.toImmutable();
  
      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }
  
      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i)
        );
      }
    }, [selection]);

    const setFill=useMutation(({storage},fill)=>{
      const liveLayers=storage.get("layers");
      setLastUsedColor(fill);
      selection.forEach((e)=>{
        liveLayers.get(e)?.set("fill",fill);
      })
    },[selection,setLastUsedColor])

    const deleteLayers=useDeleteLayers();
    const selectionBounds=useSelectionBounds();
    if(!selectionBounds){
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;
    return (
        <div className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{ 
            transform: `translate(
              calc(${x}px - 50%),
              calc(${y - 16}px - 100%)
            )`
          }}
        >
            <ColorPicker onChange={setFill}></ColorPicker>
            <div className="flex flex-col gap-y-0.5">
              <Hint label={"Bring To Front"}>
              <Button variant="board" size="icon" onClick={moveToFront}>
                <BringToFront>
                </BringToFront>
              </Button>
              </Hint>
              <Hint label={"Send To back"} side="bottom">
              <Button variant="board" size="icon" onClick={moveToBack}>
                <SendToBack>
                </SendToBack>
              </Button>
              </Hint>
            </div>
            <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
              <Hint label={"Delete"}>
                <Button variant="board" size="icon" onClick={deleteLayers}>
                    <Trash2></Trash2>
                </Button>
              </Hint>

            </div>
        </div>
    )
})

SelectionTools.displayName="SelectionTools";