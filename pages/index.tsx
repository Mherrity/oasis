import type { NextPage } from 'next'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Utils from '../utls'
import { Metaplex } from '../types';
import * as React from 'react'
import useMouse from '@react-hook/mouse-position'
import { calcDistance, updateIndex } from '../utls/math';
import { NavBar } from '../components';
import { SearchAddress } from '../components/InputAddress';
import Canvas from '../components/Canvas'
import { useRouter } from 'next/router'
import { ClearCanvas } from '../utls/drawing';


const mouseRefDivStyling = {
  top:0,
left: 0,
height:'100vh', 
width:'100vw', 
position:'absolute', 
zIndex : 600,
display : 'flex',
alignItems: 'center',
justifyContent: 'flex-end',
flexDirection : 'column'
}


const NFTList = ['Ah2Z2JTiyNxrMgC87dAr94eB5wXA4K1zegCTkqFroFP1','Ah2Z2JTiyNxrMgC87dAr94eB5wXA4K1zegCTkqFroFP1']




const Home: NextPage = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [nftsImages,setNFTImages] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true)
  const Router = useRouter();
  const {addresses} = Router.query

  const ref = React.useRef(null) //for canvas

  const MouseRef = React.useRef(null) //for mouse

  const mouse = useMouse(MouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })
  const [drawing, setDrawing] = React.useState(true); //controlling drawing state

  const [dimesions,setDimensions]  = React.useState({x:0,y:0}); // setting dimensions


  React.useEffect(()=>{
    

    const AllAddy = async (addresses:any) =>{
      const nftsPreFlat = await Promise.all(addresses.map(async (addy:string)=>Utils.Solana.parseNfts(addy,connection)))
      //@ts-ignore
      const nfts = [].concat.apply( [], nftsPreFlat);
      setNFTImages(nfts)
      setDrawing(true)
      setLoading(false)
    }

    const NewImage = async () => {
      ClearCanvas(ref,setDrawing)
      setDrawing(false)
      const randomAddy = NFTList[ Math.floor( Math.random() * NFTList.length ) ]
      const aw = await Utils.Solana.parseNfts(randomAddy,connection)
      setNFTImages(aw)
      setLoading(false)
      setDrawing(true)
    }

    if(typeof addresses == 'string'){
      let allAddresses = addresses.split(',')
      AllAddy(allAddresses)
    }
    else{
      NewImage()
    }
  },[addresses])
   

  const search = (addresses:string) => {
    Router.push({
      pathname: '/',
      query: {addresses}
    })
  }

  React.useEffect(()=>{
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight
    })
  },[])
 
console.log({loading})
  return (
    <>
    <NavBar/>

    {!addresses &&
    <div style={{top:0, left: 0, height:'100vh', width:'100vw', position:'absolute', zIndex : 500,
      backgroundColor: 'rgba(255,255,255,0.9)',
      display : 'flex',
      alignItems: 'center',
      justifyContent: 'center'
      }}/> 
      }

    <div
    ref={MouseRef}
    style={{
      top:0,
    left: 0,
    height:'100vh', 
    width:'100vw', 
    position:'absolute', 
    zIndex : 600,
    display : 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection : 'column'
    }} > 

    {(!addresses && loading==false) && <SearchAddress ctx={ref} setDrawing={setDrawing} search={search} /> }
    {loading && <h1>Loading</h1>}

    </div>
    
       
    <Canvas loading={ loading }
             mouse={mouse}
             canvasRef={ref}
             dimensions={dimesions}
             drawing={drawing}
             nftImages={nftsImages}
    />
   
  </>
  )
}






export default Home
