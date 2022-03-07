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







const Home: NextPage = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const {loading,nftDataList, nftImages} = Utils.Solana.useNFTs(
      'Ah2Z2JTiyNxrMgC87dAr94eB5wXA4K1zegCTkqFroFP1'
    //publicKey?.toString()
    ,connection)

  const ref = React.useRef(null) //for canvas 
  const MouseRef = React.useRef(null) //for mouse
  const mouse = useMouse(MouseRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })
  const [drawing, setDrawing] = React.useState(true); //controlling drawing state

  const [dimesions,setDimensions]  = React.useState({x:0,y:0}); // setting dimensions

  React.useEffect(()=>{
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight
    })
  },[])
 

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

       <SearchAddress ctx={ref} setDrawing={setDrawing}/>

    </div>

    <Canvas loading={loading}
             mouse={mouse}
             canvasRef={ref}
             dimensions={dimesions}
             drawing={drawing}
             nftImages={nftImages}
    />
   
  </>
  )
}






export default Home
