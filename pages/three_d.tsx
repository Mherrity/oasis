import type { NextPage } from 'next'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Utils from '../utls'
import { Metaplex } from '../types';
import React, { useRef, useState } from 'react'
import useMouse from '@react-hook/mouse-position'
import { calcDistance, updateIndex } from '../utls/math';
import { NavBar } from '../components';
import * as THREE from 'three'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, useLoader} from '@react-three/fiber'


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
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  })
  const [imageIndex, setImageIndex] = React.useState(0)
  const [prevMouse,setPrevMouse] = React.useState({x:0,y:0})
  const [Images,SetImages] = React.useState([<image key={1}/>])
  const [numImages, incrementNum] = React.useState(0)
  const [prevShapes, setShapes] = React.useState([])
  const [dimesions,setDimensions]  = React.useState({x:0,y:0})

//   const renderFrame = (dimesions:any) => {
//     let t =  Date.now()
//     console.log({t})
//     if( t % 5 == 0 ){
//       console.log('hello')
//     //@ts-ignore
//     const context = ref.current.getContext('2d')
//     context.beginPath();
//     context.rect(0, 0, dimesions.x, dimesions.y);
//     context.fillStyle = "rgba(255,255,255,0.2)";
//     context.fill();
//     }
//   };

//   const tick = () => {
//     console.log('made it ')
//     if (!ref.current) return;
//     console.log('yo')
//     // renderFrame(dimesions);
//     requestAnimationFrame(tick);
//   };
  React.useEffect(()=>{
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight
    })
    // requestAnimationFrame(tick);
  },[])
 
  

//   React.useEffect(()=>{
//   const {pageX, pageY,x,y} = mouse
//   //Do we have null values
//   if(pageX != null){
//   const distance = calcDistance({x:prevMouse.x,y:prevMouse.y},
//                                 {x:pageX!, y: pageY!})
//   if(distance > 40){
//     setPrevMouse({x:pageX!,y:pageY!}) //updating prevmouse position
//     // setImageIndex(updateIndex(nftDataList,imageIndex))
//     if(!loading){
//     const index =  Math.floor( Math.random() * nftImages.length )
//     if(ref!=null && ref.current!=null){
//     //@ts-ignore
//     // drawImage(nftImages[index],ref.current.getContext('2d'), x,y, dimesions)
//     }
//   }
//   }

//   }
//   },
//   [mouse])

const texture = useLoader(THREE.TextureLoader, 'https://ybfzamwxtkqlqraq7cdhjri54eyz3am5aezzwrccizl624ut.arweave.net/wEuQMteaoLhEEPiGdMUd4TGdgZ0BM5tE_Qk-ZX7XKTw?ext=png')

  return (
    <>
    <NavBar/>
    <div style = {{zIndex:-1000, position:'absolute', top:0,left:0, width:'100vw', height: '100vh'}} >
    <Canvas>
        <RenderImg/>
    </Canvas>
  </div>
  </>
  )
}

const RenderImg = (props:any) => {
    return (
        <mesh>
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshBasicMaterial attach="material"  />
    </mesh>
    )
}






export default Home
