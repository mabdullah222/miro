"use client";
import Image from "next/image";
import {Button} from "../../../components/ui/button"
import { api } from "../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { toast } from "sonner";


export const EmptyBoards=()=>{
    const {mutate,pending}=useApiMutation(api.board.create);
    const {organization}=useOrganization()
    const onClick=()=>{
        if(!organization){
            return;
        }
        mutate({orgId:organization.id,title:"Untitled"}).then(()=>{toast.success("Board Created")}).catch(()=>{toast.error("Failed to create board")})
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <Image src="/note.svg"
            height={140} width={140} alt="Empty"
            >

            </Image>
            <h2 className="text-2xl mt-4 font-semibold">
                Create your first boards
            </h2>
            <p className="text-muted-foreground font-semibold text-sm mt-2">Start by creating a board for your organization</p>
            <Button disabled={pending} onClick={onClick} size="lg" className="mt-4">
                Create board
            </Button>
        </div>
    )
}