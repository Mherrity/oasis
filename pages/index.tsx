import type { NextPage } from 'next'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Utils from '../utls'
import { Metaplex } from '../types';
import * as React from 'react'
import useMouse from '@react-hook/mouse-position'
import { calcDistance, updateIndex } from '../utls/math';
import { NavBar } from '../components';


const drawImage = (img: typeof Image, context:any,x:number,y:number, canvas:any) => {
  
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
  const [dimesions,setDimensions]  = React.useState({x:0,y:0})
  React.useEffect(()=>{
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight
    })
  },[])

  React.useEffect(()=>{
  const {pageX, pageY,x,y} = mouse
  //Do we have null values
  if(pageX != null){
  const distance = calcDistance({x:prevMouse.x,y:prevMouse.y},
                                {x:pageX!, y: pageY!})
  if(distance > 40){
    setPrevMouse({x:pageX!,y:pageY!}) //updating prevmouse position
    // setImageIndex(updateIndex(nftDataList,imageIndex))
    if(!loading){
    const index =  Math.floor( Math.random() * nftImages.length )
    if(ref!=null && ref.current!=null){
    //@ts-ignore
    drawImage(nftImages[index],ref.current.getContext('2d'), x,y, ref.current)
    }
  }
  }

  }
  },
  [mouse])


  return (
    <>
    <NavBar/>
    <canvas ref={ref} height={dimesions.y}
                      width = {dimesions.x}
    style={{top:0, left: 0, position:'absolute', zIndex:-1000}}>

    {loading?(
      <div> 
        Loading
      </div>
    ):<h1>play ball</h1>
    }
  
  </canvas>
  </>
  )
}

interface ImageMapProps {
  nftDataList : Metaplex.ExternalMetaData[]
}
const ImageMapper = ({nftDataList}:ImageMapProps ) => (
  <>
  
 { nftDataList.map(({name,image,animationurl}:Metaplex.ExternalMetaData)=>(
    image && <img alt={name} src={image}
     width='100px'
     height='100px'
     />
    ))
    }
  </>

)




export default Home
