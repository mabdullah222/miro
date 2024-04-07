'use client'

import { RoomProvider } from '../liveblocks.config';
import { LiveList, LiveMap } from '@liveblocks/client';
import { ClientSideSuspense } from '@liveblocks/react';

export const Room=({children,roomId,fallback})=>{
    
    return (
        <RoomProvider id={roomId} initialPresence={{cursor:null,selection:[],pencilDraft:null,pencilColor:null}} initialStorage={{layers:new LiveMap(),layerIds:new LiveList()}}>
            <ClientSideSuspense fallback={fallback}>
                {()=>{return children}}
            </ClientSideSuspense>
        </RoomProvider>
    )
}