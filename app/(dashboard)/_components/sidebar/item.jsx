"use client"
import Image from "next/image";
import { useOrganization,useOrganizationList } from "@clerk/nextjs";
import { cn } from "../../../../lib/utils";
import Hint from "../../../../components/hint";
const Item=({id,name,imageUrl})=>{
    const {organization}=useOrganization();
    const {setActive}=useOrganizationList();
    const isActive=organization?.id===id
    const onClick=()=>{
        setActive({organization:id})
    }
    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
            <Image fill alt={name} src={imageUrl} onClick={()=>{}}
            className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition")}
            >
            </Image>
            </Hint>
            
        </div>
    )
}
export default Item;