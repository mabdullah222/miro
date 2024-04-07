import Image from "next/image";

export const EmptySearch=()=>{
    return(
        <div className="flex flex-col justify-center items-center">
            <Image src="/empty-search.svg"
            height={140} width={140} alt="Empty"
            >

            </Image>
            <h2 className="text-2xl mt-4 font-semibold">
                No results
            </h2>
            <p className="text-muted-foreground font-semibold text-sm mt-2">Try searching for something else</p>
        </div>
    )
}