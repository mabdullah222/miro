import { Canvas } from "./_components/canvas"
import { Room } from "../../../components/room";
import { Loading } from "./_components/loading";
const BoardPage=async ({params})=>{
    return(
        <div>
            <Room roomId={params.boardId} fallback={<Loading></Loading>}>
            <Canvas boardId={params.boardId}></Canvas>  
            </Room>   
        </div>
    )
}

export default BoardPage;