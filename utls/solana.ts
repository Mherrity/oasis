import {useEffect, useState} from 'react'
import { Connection } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";


  //get NFT
export const getAllNftData = async (provider: Connection, publicKey : string) => {
      try {
          const nfts = await getParsedNftAccountsByOwner({
            publicAddress: publicKey,
            connection: provider,
          });
          console.log({nfts})
          return nfts;
        }
       catch (error) {
        console.log(error);
      }
    };


/**
 * Gets JSON data for all NFTS
 * @param pubKey public key of wallet to get NFTS
 * @param connection solana RPC connection
 * @returns 
 */
export const useNFTs = (pubKey : string | undefined, connection: Connection) => {
    const [loading, setLoading] = useState(true);
    const [nftDataList, setNFTDataList] = <any>useState([]);
    const [nftImages, setNFTImages] = useState<any>();
    useEffect(()=>{

    if(pubKey==undefined){return} // if pubkey is null return nothing

    const parseNfts = async () => {
        setLoading(true);
        //Getting all NFT data 
        const nfts = await getAllNftData(connection, pubKey);
        if(nfts==null){return []}
        //pasrsing all Metadata
        const parsedNFTs = await Promise.all( nfts!.map(async({data})=>{
            let jsonData =  await fetch(data.uri) 
            return await jsonData.json()
        } ) )
        const images = parsedNFTs.map(({image})=>{
          let img =  new Image()
          img.src = image
          return img
        }
        )
        setNFTImages(images)
        setNFTDataList(parsedNFTs)
        setLoading(false)
    }
    parseNfts()
    },
    [pubKey])

    return {loading, nftDataList, nftImages}
}