import Image from "next/image";

export const EmptyFavorites=()=>{
    return(
        <div className="flex flex-col justify-center items-center">
            <Image src="/empty-favorites.svg"
            height={140} width={140} alt="Empty"
            >

            </Image>
            <h2 className="text-2xl mt-4 font-semibold">
                No favorite boards
            </h2>
            <p className="text-muted-foreground font-semibold text-sm mt-2">Try favoriting a board</p>
        </div>
    )
}