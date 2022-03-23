import * as React from 'react'
import {addParticle, updateParticle} from './Particle'
import { make_addy_humnan_readable, isSol } from '../../utls/solana'
import CrazyButton, {Particle} from './CrazyCopy' 
import {useRaf} from 'rooks'
const MoreInfo = ({infoData} : any) =>{
    return (
    <table style={{fontSize:'12px', width:'100%'}}>
     { Object.entries(infoData).map(([key,value]:[any,any],index)=>(
         <>
         { value != undefined &&
    <tr key={`table-${index}`}>
        <td key={`${key}-${index}`}>
            {//@ts-ignore
            keyMappings[key] as string
            }
        </td>
        <td>
        <ValueMappings heading={key} value={value}/>
        </td>
    </tr> 
        }
        </> 
    )
     )
    }
    </table>
)
    }

//This maps the keys to human readable names
const keyMappings = {
    updateAuthority: 'Update Authority:',
     mint : 'Mint:',
     owner_of : 'Owner:',
     symbol : 'Symbol:',
     image : 'Image:', 
     creators : 'Creators:',
     sellerFeeBasisPoints : 'Royalty:',
     isMutable : 'Mutable:',
     contract_type : 'Contract Type:',
     token_id : 'Token ID:',
     token_address : 'Token Address:'
}

const ValueMappings = ({heading,value}:any) => (
    <>
    { heading=='owner_of' && <OwnerAddress addy={value}/> }
    { ['updateAuthority','mint'].includes(heading) && <SolScanLink key='1' addy={value}/>}
    { heading == 'creators' && <NormalText value={value.length}/> }
    { heading == 'sellerFeeBasisPoints' && <NormalText value={`${(value/100.0).toFixed(2)}%`} /> }
    { heading == 'isMutable' && <NormalText value={value==1 ? 'True' : 'False'} /> }
    { ['symbol','token_id','contract_type'].includes(heading) && <NormalText value={value}/> }
    { heading == 'image' && <ImageLink link={value} /> }
    { heading == 'token_address' && <EthScanLink addy={value} /> }
    </>
)


const OwnerAddress = ({addy}:any) => (
    isSol(addy)? 
    <SolScanLink addy={addy}/>:
    <EthScanLink addy={addy}/>
)


const SolScanLink = ({addy}:any) =>{
const [Particles, SetParticles] = React.useState([])
const [particleStyle, SetParticleStyle] = React.useState()

  const copyToClipBoard =  async (e:any) =>   {
    await navigator.clipboard.writeText(addy)
    addParticle(SetParticles,SetParticleStyle,e)
  }

  const $root = React.useRef()

  useRaf(() => {

    //@ts-ignore
    if(particleStyle!=undefined && particleStyle.x!=undefined){

    updateParticle(SetParticles,SetParticleStyle,particleStyle)
    }

    //@ts-ignore
    if(particleStyle && particleStyle.life < 0) {
        SetParticles([])
        SetParticleStyle(undefined)
    }

  }, true)


  return  (

    <div style={{display : 'flex', alignItems : 'center'}}>

    <a href = {`https://solscan.io/account/${addy}`} style={{textDecoration: 'underline'}}>
        {make_addy_humnan_readable(addy)} &#8599;
    </a>

    <span> &nbsp; </span>

    
        <img ref={$root as any} src='/copy.svg' height='12px' alt='copy' onClick={copyToClipBoard}/>

        {Particles}
   
    </div>
)
     }

const EthScanLink = ({addy}:any) => (
    <a href = {`https://etherscan.io/address/${addy}`} style={{textDecoration: 'underline'}}>
    {make_addy_humnan_readable(addy)} &#8599;
    </a>
)

const NormalText = ({value}:any) => (
    <div>
        {value}
    </div >
)

const ImageLink = ({link}:any) => (
    <a href={link} style={{textDecoration: 'underline'}}>
        VIEW ORIGINAL &#8599;
    </a>
)


export default MoreInfo