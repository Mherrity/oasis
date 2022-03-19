import * as React from 'react'
import { make_addy_humnan_readable } from '../../utls/solana'

const MoreInfo = ({infoData} : any) =>{
    return (
    <table style={{fontSize:'12px', width:'100%'}}>
     { Object.entries(infoData).map(([key,value]:[any,any],index)=>( 
    <tr key={`table-${index}`}>
        <td key={`${key}-${index}`}>
            {//@ts-ignore
            keyMappings[key] as string
            }
        </td>
        <td>
        <ValueMappings heading={key} value={value}/>
        </td>
    </tr> )
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
     isMutable : 'Mutable:'
}

const ValueMappings = ({heading,value}:any) => (
    <>
    {['updateAuthority','mint','owner_of'].includes(heading) && <SolScanLink addy={value}/>}
    { heading == 'creators' && <NormalText value={value.length}/> }
    { heading == 'sellerFeeBasisPoints' && <NormalText value={`${(value/100.0).toFixed(2)}%`} /> }
    { heading == 'isMutable' && <NormalText value={value==1 ? 'True' : 'False'} /> }
    { heading == 'symbol' && <NormalText value={value}/> }
    { heading == 'image' && <ImageLink link={value} /> }
    </>
)




const SolScanLink = ({addy}:any) => (
    <a href = {`https://solscan.io/account/${addy}`} style={{textDecoration: 'underline'}}>
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