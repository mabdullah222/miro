"use client"
import getStroke from "perfect-freehand"
import { ColorToCss, getSvgPathFromStroke } from "../../../../lib/utils";

export const Path=({id,x,y,fill,points,onPointerDown,selectionColor})=>{
    return (
        <path className="drop-shadow-md" onPointerDown={(e)=>onPointerDown(e,id)} d={getSvgPathFromStroke(getStroke(points,{size:16,thinning:0.5,smoothing:0.5,streamline:0.5}))}
        style={{transform:`translate(${x}px,${y}px)`}}
        x={0}
        y={0}
        fill={fill}
        stroke={selectionColor}
        strokeWidth={1}
        >

        </path>
    )
}