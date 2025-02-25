"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/client";
import { 
  useOthersConnectionIds, 
  useOthersMapped
} from "../../../../liveblocks.config";


import { Cursor } from "./cursor";
import { Path } from "./Path";
import { ColorToCss } from "../../../../lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  );
};

const Drafts=()=>{
  const others=useOthersMapped((other)=>({
    pencilDraft:other.presence.pencilDraft,
    pencilColor:other.presence.pencilColor
  }),shallow)
  return <>
    {others.map(([key,other])=>{
      if(other.pencilDraft){
        return <Path key={key} x={0} y={0} points={other.pencilDraft} fill={other.pencilColor? ColorToCss(other.pencilColor):"#000"}/>
      }
      return null;
    })}
  </>
}

export const CursorsPresence = memo(() => {
  return (
    <>
    <Drafts></Drafts>
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";