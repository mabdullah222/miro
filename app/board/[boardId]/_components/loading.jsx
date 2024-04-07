'use client'
import { Loader } from "lucide-react";
import { ToolbarSkeleton } from "./toolbar";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
export const Loading=()=>{
    return (
        <main className="h-[100vh] w-[100vw] bg-neutral-100 relative touch-none  flex items-center justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin">

            </Loader>
            < InfoSkeleton></InfoSkeleton>
            <ParticipantsSkeleton></ParticipantsSkeleton>
            <ToolbarSkeleton></ToolbarSkeleton>
        </main>
    )
}

