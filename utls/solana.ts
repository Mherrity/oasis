import {useEffect, useState} from 'react'
import {queryAPI} from './useFetch';
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

export const parseNFTsEth = async (hostName:string, addy:string) => {
    //TODO 
    const {data} = await queryAPI(`${hostName}/api/nftz?address=${addy}`,null,'GET',{})
    console.log({data})
    const images = data.result.map(({metadata}:any):HTMLImageElement | null=>{
        const parsedData = JSON.parse(metadata)
        if(parsedData && parsedData.image){
        let img = new Image()
        img.src = parsedData.image
        return img
        }
        return null
    })
    return images.filter((img:HTMLImageElement)=> img)
}

export const parseNftsSol = async (addy:string, connection:Connection) => {
    //Getting all NFT data 
    const nfts = await getAllNftData(connection, addy);

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
   return images.filter((img)=> img)
}

const isSol=(addy:string)=>addy.substring(0,2)!='0x'

export const getImages = async (addy:string, connection:Connection, hostName:string) => isSol(addy) ? 
                                                                    await parseNftsSol(addy,connection) :
                                                                    await parseNFTsEth(hostName,addy)