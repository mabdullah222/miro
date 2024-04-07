
import ContentEditable,{ContentEditableEvent} from "react-contenteditable"
import { Kalam } from "next/font/google";
import {cn,ColorToCss} from "../../../../lib/utils";
import {useMutation} from "../../../../liveblocks.config"

const font=Kalam({subsets:["latin"],weight:["400"]})

export const Text=({layer,onPointerDown,id,selectionColor})=>{
    const updateValue=useMutation(({storage},newValue)=>{
        const liveLayers=storage.get('layers')
        liveLayers.get(id)?.set("value",newValue)
    },[])

    const handleContentChange=(e)=>{
        updateValue(e.target.value)
    }
    const CalculateFontSize=(width,height)=>{
        const maxFontSize=96;
        const scaleFactor=0.5;
        const fontSizeBasedOnHeight=height*scaleFactor;
        const fontSizeBasedOnWidth=width*scaleFactor;
        return Math.min(fontSizeBasedOnHeight,fontSizeBasedOnWidth,maxFontSize)

    }
    return (
        <foreignObject
        x={layer.x} y={layer.y} width={layer.width} height={layer.height}
        style={{outline:selectionColor? `1px solid ${selectionColor}`:"none"}}
        onPointerDown={(e)=>onPointerDown(e,id)}
        >
            <ContentEditable
            html={layer.value || "Text"}
            onChange={(e)=>handleContentChange(e)}
            className={cn("h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",font.className)}
            style={{color:layer.fill?ColorToCss(layer.fill):"none",fontSize:CalculateFontSize(layer.width,layer.height)}}
            >

            </ContentEditable>
        </foreignObject>

    )

}