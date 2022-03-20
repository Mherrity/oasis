import type { GetServerSidePropsContext, NextPage } from 'next'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Utils from '../utls'
import * as React from 'react'
import useMouse from '@react-hook/mouse-position'
import { calcDistance, updateIndex } from '../utls/math';
import { NavBar } from '../components';
import { SearchAddress } from '../components/InputAddress';
import Canvas from '../components/Canvas'
import { useRouter } from 'next/router'
import { ClearCanvas } from '../utls/drawing';
import { SiteStates } from '../types';
import {Connection, clusterApiUrl} from '@solana/web3.js'
import NFTView from '../components/NFTView';

const CON = new Connection(clusterApiUrl('mainnet-beta'))
interface ImageHeroInfo {
  index: number,
   width : number,
   height: number
}


const NFTList = ['Ah2Z2JTiyNxrMgC87dAr94eB5wXA4K1zegCTkqFroFP1','Ah2Z2JTiyNxrMgC87dAr94eB5wXA4K1zegCTkqFroFP1']

interface pageProps {
  baseURL : string
}

export async function getServerSideProps(context : GetServerSidePropsContext ) {
  const {req, query} = context
  const host = req.headers.host
  const prefix = host == 'localhost:3000' ? 'http://' : 'https://'
  return {
    props: { baseURL : prefix + host}
  }
}

const Home = ({baseURL} : pageProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [nftsImages,setNFTImages] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [imageInfo, setImageInfo] = React.useState<ImageHeroInfo>()
  const [siteState, setSite] = React.useState<SiteStates>()
  const [imgStyle, setImgStyle] = React.useState({}) 
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

  //Fetching data on load
  React.useEffect(()=>{
    
    const AllAddy = async (addresses:any) =>{

      const nftsPreFlat = await Promise.all(addresses.map(async (addy:string)=>
                                            Utils.Solana.getImages(addy,CON,baseURL)))
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
      console.log({randomAddy})
      const aw = await Utils.Solana.getImages(randomAddy,CON,baseURL)
      setNFTImages(aw)
      setLoading(false)
      setDrawing(true)
    }

    if(typeof addresses == 'string' && addresses.length > 10 ){
      const allAddresses = addresses.split(',')
      console.log({allAddresses})
      AllAddy(allAddresses)
      setSite(SiteStates.DRAWING)
    }
    else{
      setSite(SiteStates.SEARCH)
      NewImage()
    }
  },[addresses])
   
  // We store searches via pushing on the router
  const search = (addresses:string) => {
    Router.push({
      pathname: '/',
      query: {addresses}
    })
  }

  //free cursor when viewiing a specific nft 
  const [cursorFree, freeCursor] = React.useState(false)

  //Need window dimensions to render the screen
  React.useEffect(()=>{
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight
    })
  },[])


  const computeImageStyle = () => {
    let x, y 
    x = mouse.pageX
    y = mouse.pageY
    const {width,height} = imageInfo!
    return {
      width,
      height,
      zIndex:550,
      position:'absolute',
      top: y! - height!/2,
      left: x! - width!/2
    }
  }
 
  return (
    <>
    <NavBar/>

    {(!addresses || siteState==SiteStates.NFTVIEW) && 
    <div style={{top:0, left: 0, height:'100vh', width:'100vw', position:'absolute', zIndex : 500,
      backgroundColor: 'rgba(255,255,255,0.9)',
      display : 'flex',
      alignItems: 'center',
      justifyContent: 'center'
      }}/> 
      }

    <div
    ref={MouseRef}
    onClick={_=>{
      if(siteState==SiteStates.DRAWING){
      setSite(SiteStates.NFTVIEW)
      setImgStyle(computeImageStyle())
      }
      if(siteState == SiteStates.NFTVIEW){
        setSite(SiteStates.DRAWING)
      }

    }}
    style={{
      top:0,
    left: 0,
    height:'100vh', 
    width:'100vw', 
    position:'absolute', 
    zIndex : cursorFree ? 400 : 600,
    display : 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection : 'column',
    cursor : siteState==SiteStates.NFTVIEW && !cursorFree ? 'none': 'pointer'
    }} > 

    {(!addresses && loading==false) && <SearchAddress ctx={ref} setDrawing={setDrawing} search={search} /> }

    {loading && <h1>Loading</h1>}

    </div>
    
    <NFTView siteState={siteState}
              imgStyle={imgStyle}
              nftsImages={nftsImages}
              imageInfo={imageInfo}
              mouse={mouse}
              cursorFree={cursorFree}
              freeCursor={freeCursor}
              />
    
       
    <Canvas loading={ loading }
             mouse={mouse}
             canvasRef={ref}
             dimensions={dimesions}
             drawing={drawing && siteState!=SiteStates.NFTVIEW}
             nftImages={nftsImages}
             setImageInfo={setImageInfo}
    />
   
  </>
  )
}

export default Home
