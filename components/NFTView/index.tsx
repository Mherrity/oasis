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
    imageInfo:any
}

const NFTView = ({siteState,nftsImages,mouse,imgStyle,imageInfo}:NFTViewProps) => {
    const {name, description, collection, attributes} = nftsImages && imageInfo ? nftsImages[imageInfo?.index] : defValue

    return (
    <>
        {siteState==SiteStates.NFTVIEW && <img src={nftsImages[imageInfo?.index!].img.src} 
        style={imgStyle}
     /> }

{(siteState==SiteStates.NFTVIEW && nftsImages) && <div id='label' style={{position:'absolute',
               top: mouse.pageY!,
               left: mouse.pageX! - 300/2,
               width: '300px',
               height: '10px',
               cursor: 'none',
               zIndex : 557,
               }}>
                 
                <InfoBox data={nftsImages[imageInfo?.index]} />
   </div>}    
    )
    </>
    )
}

export default NFTView;