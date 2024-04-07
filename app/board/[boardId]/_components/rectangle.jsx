"use client"
import { ColorToCss } from "../../../../lib/utils";
export const Rectangle=({id,layer,onPointerDown,selectionColor})=>{
    const {x,y,height,width,fill}=layer;
    return (
        <rect className="drop-shadow-md" onPointerDown={(e)=>onPointerDown(e,id)}
        height={height}
        width={width}
        fill={fill ? ColorToCss(fill) : "#000"}
        stroke={selectionColor[id] || "transparent"}
        style={{transform:`translateX(${x}px) translateY(${y}px)`}}
        >
        </rect>
       
    )
}