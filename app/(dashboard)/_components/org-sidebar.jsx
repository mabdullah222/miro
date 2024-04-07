"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '../../../lib/utils'
import { LayoutDashboard,Star } from 'lucide-react'
import {OrganizationSwitcher} from "@clerk/nextjs"
import { Button } from '../../../components/ui/button'
import { useSearchParams } from 'next/navigation'
const font=Poppins({subsets:["latin"],weight:["600"]})
const OrgSidebar = () => {
  const searchParams=useSearchParams()
  const favorites=searchParams.get("favorites")
  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
        <Link href="/">
          <div className='flex items-center gap-x-2'>
            <Image
              src="/logo.svg"
              alt="Logo"
              height={60}
              width={60}
            >
            </Image>
            <span className={cn("font-semibold text-2xl",font.className)}>
              miro
            </span>
          </div>
        </Link>
        <OrganizationSwitcher hidePersonal appearance={{elements:{
          rootBox:{
          display:"flex",justifyContent:"center",alignItems:"center", width:"100%"
        },
        organizationSwitcherTrigger:{
          padding:"6px",width:"100%",borderRadius:"8px",border:"1px solid #E5E7EBB",justifyContent:"center",backgroundColor:"white"
        }
      }
        }}></OrganizationSwitcher>
      <div className='space-y-2 w-full'>
        <Button variant={favorites?"ghost":"secondary"} size="lg" className="font-normal justify-start px-2 w-full">
          <Link href="/">
            <LayoutDashboard className='h-4 w-4 mr-2'></LayoutDashboard>
            Team boards
          </Link>
        </Button>
        <Button variant={favorites?"secondary":"ghost"} size="lg" className="font-normal justify-start px-2 w-full">
          <Link href={{pathname:"/",query:{favorites:true}}}>
            <Star className='h-4 w-4 mr-2'></Star>
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default OrgSidebar