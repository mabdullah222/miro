'use client'
import { EmptySearch } from "./empty-search"
import { EmptyFavorites } from "./empty-favorites"
import { EmptyBoards } from "./empty-boards"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { BoardCard } from "./board-card"
import { NewBoardButton } from "./new-board-button"
const BoardList = ({orgId,query}) => {
    
    const data=useQuery(api.boards.get, { 
        orgId,
        ...query,
      })
    if(data===undefined){
        return (
            <div>
        <h2 className="text-3xl">
            {query?.favorites?"Favorite boards":"Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2,md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
            <NewBoardButton orgId={orgId} disabled></NewBoardButton>
               <BoardCard.Skeleton></BoardCard.Skeleton>
               <BoardCard.Skeleton></BoardCard.Skeleton>
               <BoardCard.Skeleton></BoardCard.Skeleton>
        </div>
    </div>
        )
    }
    if(data?.length==0 && query?.search){
        return(
            <EmptySearch/>
        )
    }
    if(data?.length==0 && query.favorites){
        return(
            <div>
                <EmptyFavorites></EmptyFavorites>
            </div>
        )
    }
    if(data?.length==0){
        return(
            <div>
                <EmptyBoards></EmptyBoards>
            </div>
        )
    }
  return (
    <div>
        <h2 className="text-3xl">
            {query?.favorites?"Favorite boards":"Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2,md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
            <NewBoardButton orgId={orgId}></NewBoardButton>
            {data?.map((board)=>(<BoardCard key={board._id} board={board} favorites={board.isFavorite}>{JSON.stringify(board)}</BoardCard>))}    
        </div>
    </div>
  )
}

export default BoardList;