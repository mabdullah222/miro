"use client";
import { Overlay } from "./overlay";
import Link from "next/link";
import Image from "next/image";
import {formatDistanceToNow} from "date-fns"
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Actions } from "../../../../components/action";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const BoardCard=({board,favorites})=>{
    const {mutate:favorite,pending:pendingFavorite}=useApiMutation(api.board.favorite)
    const {mutate:unfavorite,pending:pendingunFavorite}=useApiMutation(api.board.unfavorite)
    const {userId}=useAuth()
    const authorLabel=userId===board.authorId?"You":board.authorName;
    const createdAtLabel=formatDistanceToNow(board._creationTime,{addSuffix:true})

    const toggleFavorite=()=>{
        if(favorites){
            unfavorite({id:board._id,orgId:board.orgId}).catch((err)=>toast("failed to unfavorite"))
        }
        else{
            favorite({id:board._id,orgId:board.orgId}).catch((err)=>toast("failed to favorite"))
        }
    }
    return (
        <Link href={`/board/${board._id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50">
                <Image src={board.imageUrl} alt="doodle" fill className="object-fit">
                    
                </Image>
                <Overlay></Overlay>
                <Actions id={board._id} title={board.title} side="right" sideOffset={0}>
                    <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                        <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"></MoreHorizontal>
                    </button>
                </Actions>
            </div>
            <Footer isFavorite={favorites} title={board.title} authorLabel={authorLabel} createdAtLabel={createdAtLabel} onClick={toggleFavorite} disabled={pendingFavorite || pendingunFavorite}>

            </Footer>
            </div>
        </Link>
        
    )
}

BoardCard.Skeleton=function BoardCardSkeleton(){
    return (
        <div className="aspect-[100/127] rounded-lg flex flex-col justify-between overflow-hidden">
            <Skeleton className="h-full w-full"></Skeleton>
        </div>
    )
}