'use client'

import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { cn } from '../../../../lib/utils'
import { Button } from '../../../../components/ui/button'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Hint from '../../../../components/hint'
import { useRenameModal } from '../../../../store/use-rename-modal'
import { Actions } from '../../../../components/action'
import { Menu } from 'lucide-react'



const font=Poppins({
  subsets:["latin"],
  weight:["600"]
})

const TabSeperator=()=>{
  return (
    <div className='text-neutral-300 px-1.5'>

    </div>
  )
}



const Info = ({boardId}) => {
  const {onOpen}=useRenameModal()
  const data=useQuery(api.board.get,{id:boardId})
  if(!data){
    return <InfoSkeleton/>
  }
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 shadow-md flex items-center h-12'>
      <Hint label={"Go to boards"} sideOffset={10} side={'bottom'}>
      <Button asChild className="px-2" variant="board">
          <Link href={"/"}>
          <Image src={'/logo.svg'} alt="Logo" height={40} width={40}>

          </Image>
          <span className={cn('font-semibold text-xl ml-2 text-black',font.className)} >
          miro
        </span>
          </Link>
        </Button>

      </Hint>
      <TabSeperator></TabSeperator>
      <Hint label={"Edit title"} side={"bottom"}>
      <Button onClick={()=>{onOpen(data._id,data.title)}} variant="board" className="text-base font-normal px-2">
          {data.title}
        </Button>
      </Hint>
        <TabSeperator></TabSeperator>
        <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
          <Button>
          <Menu></Menu>
          </Button>
        </Actions>
    </div>
  )
}

export default Info

export const InfoSkeleton=()=>{
  return (
    <div 
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px] animate-pulse"
    />
  );
}