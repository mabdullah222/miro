import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";
const DashBoardLayout=({children})=>{
    return(
        <main className="h-full">
            <Sidebar></Sidebar>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar></OrgSidebar>
                    <div className="h-full flex-1">
                        <Navbar></Navbar>
                    {children}
                    </div>
                </div>  
            </div>
            
        </main>
    )
}
export default DashBoardLayout;