"use client"
import { useStorage } from "../../../../liveblocks.config"
import { memo } from "react"
import { LayerType } from "./toolbar"
import { Rectangle } from "./rectangle"
import {Ellipse} from "./ellipse"
import {Text} from "./text"
import {Note} from "./note"
import {Path} from "./Path"
import { ColorToCss } from "../../../../lib/utils"

export const LayerPreview=memo(({id,onLayerPointerDown,selectionColor})=>{
    const layer=useStorage((root)=>root?.layers?.get(id))
    if(!layer){
        return null;
    }
    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle
                id={id}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
                layer={layer}
                />
            )
        case LayerType.Ellipse:
            return (
                <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}></Ellipse>
            )
        case LayerType.Text:
            return (
                <Text id={id} onPointerDown={onLayerPointerDown} layer={layer} selectionColor={selectionColor}>

                </Text>
            )
        case LayerType.Note:
            return (
                <Note id={id} onPointerDown={onLayerPointerDown} layer={layer} selectionColor={selectionColor}></Note>
            )
        case LayerType.Path:
            return (
                <Path key={id} id={id} x={layer.x} y={layer.y} fill={ColorToCss(layer.fill)} points={layer.points} onPointerDown={onLayerPointerDown} selectionColor={selectionColor}>

                </Path>
            )
        default:
            return null;
    }
})

LayerPreview.displayName="LayerPreview"