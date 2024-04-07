"use client"
import { cn } from "../../../lib/utils"
import { Plus } from "lucide-react"
import { useApiMutation } from "../../../hooks/use-api-mutation"
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export const NewBoardButton=({orgId,disabled})=>{
    const router=useRouter()
    const {mutate,pending}=useApiMutation(api.board.create)
    return (
    <button disabled={pending} onClick={()=>{
        mutate({orgId:orgId,title:"No Title"}).then((res)=>{toast.success("Board created")
        router.push(`/board/${res}`)
    }).catch((error)=>{"Error creating the board"}
        )
    }}
    className={cn("col-span-1 aspect-[100/27] h-full w-full bg-blue-500 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",disabled || pending?"opacity-75 hover:bg-blue-500":"opacity-100")}
    >
        <div>

        </div>
        <Plus className="h-12 w-12 text-white stroke-1"></Plus>
        <p className="text-xs text-white font-ligt">
            New Board
        </p>
    </button>
    )
}