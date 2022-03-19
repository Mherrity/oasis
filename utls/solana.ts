import {useEffect, useState} from 'react'
import {queryAPI} from './useFetch';
import { Connection , PublicKey, TokenAccountsFilter, clusterApiUrl} from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
import {getHandleAndRegistryKey, getHashedName, NAME_PROGRAM_ID} from '@solana/spl-name-service'
import { serialize, deserialize, deserializeUnchecked } from 'borsh';
import { Buffer } from 'buffer';
import {
    Keypair,
    AccountMeta,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { performReverseLookup } from "@bonfida/spl-name-service";
import Service from "@bonfida/spl-name-service";




// // Flexible class that takes properties and imbues them
// // to the object instance
// class Assignable {
//     constructor(properties:any) {
//         Object.keys(properties).map((key) => {
//             //@ts-ignore
//             return (this[key] = properties[key]);
//         });
//     }
// }

// export class AccoundData extends Assignable { }

// const dataSchema = new Map([
//     [
//         AccoundData,
//         {
//             kind: "struct",
//             fields: [
//                 ["initialized", "u8"],
//                 ["tree_length", "u32"],
//                 ["map", { kind: 'map', key: 'string', value: 'string' }]
//             ]
//         }
//     ]
// ]);

// /**
//  * Fetch program account data
//  * @param {Connection} connection - Solana RPC connection
//  * @param {PublicKey} account - Public key for account whose data we want
//  * @return {Promise<AccoundData>} - Keypair
//  */
// export async function getAccountData(connection: Connection, account: PublicKey): Promise<AccoundData> {
//     let nameAccount = await connection.getAccountInfo(
//         account,
//         'processed'
//     );
//     return deserializeUnchecked(dataSchema, AccoundData, nameAccount!.data)
// }
 
export async function findOwnedNameAccountsForUser(
    connection: Connection,
    userAccount: PublicKey
  ): Promise<any> {
    const filters = [
      {
        memcmp: {
          offset: 32,
          bytes: userAccount.toBase58(),
        },
      },
    ];
    const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
      filters,
    });
    return accounts.map((a) => a);
  }

// export const resolveSNSName = async (address: string, con: Connection) => {
//     const pubKey = new PublicKey(address);
//     const acc = await findOwnedNameAccountsForUser(con,pubKey);
//     if(acc.length>0){
//     const name =  await performReverseLookup(con,acc[0].pubkey);
//     return name+'.sol'
//     }
//      return null
// }



  //get NFT
export const getAllNftData = async (provider: Connection, publicKey : string) => {
      try {
          console.log({publicKey})
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
   
    const images = data.result.map((data:any)=>{
        const parsedData = JSON.parse(data.metadata)
        if(parsedData && parsedData.image){
        let img = new Image()
        img.src = makeIPFS(parsedData.image)
        return {img, ...parsedData, ...data, 
                human_owner_name : make_addy_humnan_readable(addy) }
        }
        return null
    })
    return images.filter((img:HTMLImageElement)=> img)
}

export const parseNftsSol = async (addy:string, connection:Connection) => {
   
    const nfts = await getAllNftData(connection, addy);

    if(nfts==null){return []}

    //pasrsing all Metadata
    const parsedNFTs = await Promise.all( nfts!.map(async(nft:any)=>{
        let {data} = nft
        let jsonData =  await fetch(data?.uri)
        let externalMetadata = await jsonData.json()

        return {...nft, ...data, ...externalMetadata, 
            owner_of : addy, 
            human_owner_name : make_addy_humnan_readable(addy)  }
    } ) )

    const images = parsedNFTs.map((data:any)=>{
      if(data?.image){
      let img =  new Image()
      img.src = makeIPFS(data.image)
      return {img, ...data}
      }
      else{
          return null
      }
    }
    )
   return images.filter((img)=> img)
}

export const make_addy_humnan_readable = (addy: string) => addy.substring(0,4) + '...' +addy.substring(addy.length-6,addy.length-1)
//make the URL an IPFS resolvable UrL 
const makeIPFS = (url:string) =>url.includes('ipfs://')?url.replace('ipfs://','https://ipfs.io/ipfs/'):url

//Utility to find if address is SOL or not 
const isSol=(addy:string)=>addy.substring(0,2)!='0x'

// Used to call the right endpoint depending on if address is solana or not 
export const getImages = async (addy:string, connection:Connection, hostName:string) => isSol(addy) ? 
                                                                    await parseNftsSol(addy,connection) :
                                                                    await parseNFTsEth(hostName,addy)