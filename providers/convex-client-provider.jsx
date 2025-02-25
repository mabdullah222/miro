"use client"
import { ClerkProvider,useAuth } from "@clerk/nextjs"
import {ConvexProviderWithClerk} from "convex/react-clerk"
import {AuthLoading,Authenticated,ConvexReactClient} from "convex/react"
import { Loading } from "../components/ui/auth/loading"
const convexUrl=process.env.NEXT_PUBLIC_CONVEX_URL

const convex=new ConvexReactClient(convexUrl)
export const ConvexClientProvider=({children})=>{
    return(
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated>
                {children}
                </Authenticated>
                <AuthLoading>
                    <Loading></Loading>
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
        
    )
    
}