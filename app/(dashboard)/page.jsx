'use client'
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/board-list";
export default function DashBoardPage(props) {
  const {searchParams}=props;
  const {organization}=useOrganization();
  return (
    
   <div className="flex-1 p-6 h-[calc(100%-80px)]">
    
    {!organization?
    <EmptyOrg></EmptyOrg>:
    <div>
      <BoardList orgId={organization.id} query={searchParams}></BoardList>
      </div>
      }
    
   </div>
  );
}
