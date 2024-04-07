"use client"

import { ColorToCss } from "../../../../lib/utils"

export const Ellipse=({id,layer,onPointerDown,selectionColor})=>{
    return (
        <ellipse className="drop-shadow-md"
        onPointerDown={(e)=>{onPointerDown(e,id)}}
        style={{transform:`translate(${layer.x}px,${layer.y}px)`}}
        cx={layer.width/2}
        cy={layer.height/2}
        rx={layer.width/2}
        ry={layer.width/2}
        fill={layer.fill ? ColorToCss(layer.fill):"#000"}
        stroke={selectionColor || "transparent"}
        >

        </ellipse>
    )
}