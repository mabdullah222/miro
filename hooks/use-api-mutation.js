import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation=(mutationFuction)=>{
    const [pending,setPending]=useState(false)
    const apiMutation=useMutation(mutationFuction)
    const mutate=(payload)=>{
        setPending(true);
        return apiMutation(payload).finally(()=>{setPending(false)}).then((result)=>{return result}).catch((error)=>{throw error})
    }
    return {mutate,pending};
}

