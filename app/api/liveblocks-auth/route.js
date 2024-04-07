import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v } from "convex/values";
const liveblocks=new Liveblocks({
    secret:process.env.LIVE_SECRET
})

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export const  POST=async (req)=>{
    const authorization=auth()
    const user=await currentUser()
    if(!authorization || !user){
        return new NextResponse("Unauthorized",{status:403})
        
    }
    const {room}=await req.json();
    
    const board=await convex.query(api.board.get,{id:room})


    if(board?.orgId !== authorization.orgId){
        return new NextResponse("Unauthorized",{status:403})
    }
    const userInfo={name:user.firstName,picture:user.imageUrl}
    const session=liveblocks.prepareSession(user.id,{userInfo})

    if(room){
        session.allow(room,session.FULL_ACCESS);
    }
    const {status,body}=await session.authorize();
    return new NextResponse(body,{status});
}