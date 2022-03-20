import * as React from 'react'
import {SiteStates} from '../../types'
import type {MousePosition} from '@react-hook/mouse-position'
import InfoBox from './InfoBox'

const defValue = {name:'name'}

interface NFTViewProps {
    siteState : any,
    nftsImages : any,
    mouse : MousePosition,
    imgStyle :any,
    imageInfo:any,
    cursorFree : boolean,
    freeCursor : any
}

const NFTView = ({siteState,nftsImages,mouse,imgStyle,imageInfo, cursorFree, freeCursor}:NFTViewProps) => {

    const [pos,setPos] = React.useState<{x:number,y:number}>({x:0,y:0})
    React.useEffect(()=>{
        if(!cursorFree && mouse.pageY){
        //Setting position if not updated
        setPos({
           y: mouse.pageY!,
            x:mouse.pageX! - 300/2,
        })
    }
    },
    [mouse,cursorFree])

    //On space the cursor will be free
    const KeyDown = (e:any) => {
             if(e.keyCode == 32){
                freeCursor(!cursorFree) 
             }
    }

    React.useEffect( ()=>{
        document.body.onkeydown = KeyDown
    },
    [cursorFree])


    const {name, description, collection, attributes} = nftsImages && imageInfo ? nftsImages[imageInfo?.index] : defValue

    return (
    <>
        {siteState==SiteStates.NFTVIEW && <img src={nftsImages[imageInfo?.index!].img.src} 
        style={imgStyle}
     /> }

{(siteState==SiteStates.NFTVIEW && nftsImages) && <div id='label' style={{position:'absolute',
               top: pos.y,
               left: pos.x,
               width: '300px',
               height: '10px',
               cursor: 'pointer',
               zIndex : 557,
               }}>
                 
                <InfoBox data={nftsImages[imageInfo?.index]} />
   </div>}    
    )
    </>
    )
}

export default NFTView;