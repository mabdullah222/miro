import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


const COLORS=["#DC2626","#097706","#059669","#7C3AED","#DB2777"]


export const conectionIDtoColor=(connectionID)=>{
  return COLORS[connectionID%COLORS.length]
};  


export const pointerEventToCanvasPoint=(e,camera)=>{
  return {x:Math.round(e.clientX)-camera.x,
    y:Math.round(e.clientY)-camera.y}
}

export const ColorToCss=(color)=>{
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart("2",0)}${color.b.toString(16).padStart("2",0)}`
}

import { Side } from "../app/board/[boardId]/_components/selection-box";
import { LayerType } from "../app/board/[boardId]/_components/toolbar";
export const ResizeBounds=(
  bounds,
  corner,
  point
)=>{
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };
  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};


export const findIntersectingLayersWithRectangle=(layerIds,layers,a,b)=>{
  const rect={x:Math.min(a.x,b.x),y:Math.min(a.y,b.y),width:Math.abs(a.x-b.x),height:Math.abs(a.y-b.y)}
  const ids=[]
  for (const layerId of layerIds){
    const layer=layers.get(layerId);
    if(layer==null){
      continue
    }
    const {x,y,height,width}=layer;
    if(rect.x+rect.width>x && rect.x<x+width && rect.y +rect.height>y &&rect.y<y+height){
      ids.push(layerId);
    }
  }
  return ids;
}


export function getContrastingTextColor(color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};

export function penPointsToPathLayer(
  points,
  color,
) {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points
      .map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};

export function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};