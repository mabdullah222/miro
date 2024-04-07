import { Plus } from "lucide-react";
import {OrganizationProfile} from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
import { Dialog,DialogContent,DialogTrigger } from "../../../components/ui/dialog";

const InviteButton=()=>{
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2">
                    </Plus>
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent max-w-[880px] border-none">
                <OrganizationProfile></OrganizationProfile>
            </DialogContent>
        </Dialog>
    )
}
export default InviteButton;