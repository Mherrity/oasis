import { Metadata } from "@nfteyez/sol-rayz/dist/config/metaplex"


type distanceInput = {
    x : number,
    y : number
}
/**
 * Calculates distance from prevMouse position to currentMouse
 * @param prev 
 * @param current 
 * @returns 
 */
export const calcDistance = (
    prev : distanceInput,
    current : distanceInput
) => Math.sqrt(
    Math.pow(prev.x - current.x,2) + Math.pow(prev.y - current.y, 2)
)

/**
 * 
 * @param nftList 
 * @param currentIndex 
 */
export const updateIndex = (nftList:Metadata[],currentIndex:number) =>
    currentIndex + 1 == nftList.length ? 0 : currentIndex + 1 
 


