import type { NextPage } from 'next'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Utils from '../utls'
import { Metaplex } from '../types';
import * as React from 'react'
import useMouse from '@react-hook/mouse-position'
import { calcDistance, updateIndex } from '../utls/math';
import { NavBar } from '../components';
import { SearchAddress } from '../components/InputAddress';


const drawImage = (img: typeof Image, context:any,x:number,y:number, dimensions : any) => {
  
    const size = 150 + Math.random() * 150

    context.drawImage(img, x - size/2, y - size/2, size,size);
  }




const Home: NextPage = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const {loading,nftDataList, nftImages} = Utils.Solana.useNFTs(
      'Ah2Z2JTiyNxrMgC87dAr94eB5wXA4K1zegCTkqFroFP1'
    //publicKey?.toString()
    ,connection)
  const ref = React.useRef(null)
  const MouseRef = React.useRef(null)
  const mouse = useMouse(MouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })
  const [prevMouse,setPrevMouse] = React.useState({x:0,y:0})
  const [dimesions,setDimensions]  = React.useState({x:0,y:0})
  const renderFrame = (dimesions:any) => {
    let t =  Date.now()
    console.log({t})
    if( t % 5 == 0 ){
      console.log('hello')
    //@ts-ignore
    const context = ref.current.getContext('2d')
    context.beginPath();
    context.rect(0, 0, dimesions.x, dimesions.y);
    context.fillStyle = "rgba(255,255,255,0.2)";
    context.fill();
    }
  };

  const tick = () => {
    if (!ref.current) return;
    requestAnimationFrame(tick);
  };
  React.useEffect(()=>{
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight
    })
    requestAnimationFrame(tick);
  },[])
 
  

  React.useEffect(()=>{
  const {pageX, pageY,x,y} = mouse
  //Do we have null values
  if(pageX != null){
  const distance = calcDistance({x:prevMouse.x,y:prevMouse.y},
                                {x:pageX!, y: pageY!})
  if(distance > 40){
    setPrevMouse({x:pageX!,y:pageY!}) //updating prevmouse position
    if(!loading){
    const index =  Math.floor( Math.random() * nftImages.length )
    if(ref!=null && ref.current!=null){
    //@ts-ignore
    drawImage(nftImages[index],ref.current.getContext('2d'), x,y, dimesions)
    }
  }
  }

  }
  },
  [mouse])


  return (
    <>
    <NavBar/>
    <div style={{top:0, left: 0, height:'100vh', width:'100vw', position:'absolute', zIndex : 500,
      backgroundColor: 'rgba(255,255,255,0.9)',
      display : 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  }} />

    <div
    ref={MouseRef}
    style={{top:0, left: 0, height:'100vh', width:'100vw', position:'absolute', zIndex : 600,
    display : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'column'
    }} > 
       <SearchAddress/>
    </div>

    <canvas ref={ref} height={dimesions.y}
                      width = {dimesions.x}
    style={{top:0, left: 0, position:'absolute', zIndex:-1000}}/>
  </>
  )
}






export default Home
