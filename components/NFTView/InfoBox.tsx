import * as React from 'react'
import { MetaData, Attribute } from '../../types/metaplex'
import MoreInfo from './MoreInfo'
interface InfoBoxProps {
    data : MetaData
}

const InfoBox = ({data}:InfoBoxProps) => {
    console.log({data})
    const {name,attributes,description,collection,mint,human_owner_name,updateAuthority,
           owner_of,symbol,sellerFeeBasisPoints, creators,image, isMutable} = data
    const infoData ={updateAuthority, mint, owner_of, symbol, image,
                    sellerFeeBasisPoints, creators, isMutable}
    return (
        <>
        <SpaceBarText/>
        <NameDisplay name={name}/>
        <OwnedBy human_readable_name={human_owner_name} />
        <Border/>
        <Description description={description}/>
        <Header>Traits</Header>
        <Traits attributes={attributes || []} />
        <Header>More</Header>
        <MoreInfo infoData = {infoData} />
        </>
    )
}

const SpaceBarText = () => <div style={{fontSize:'12px', fontFamily:'suisee', opacity: 0.25, marginBottom:'10px'}}
> *hold space to free cursor </div>

const NameDisplay = ({name}:any) => <div style={{fontSize:'12px', fontFamily:'suisee-medium',marginBottom:'5px'}}>
                                    {name}
                                    </div>

const OwnedBy = ({human_readable_name}:any) => <div style={{fontSize:'12px', fontFamily:'suisee', marginBottom:'10px'}}>
{`Owned By ${human_readable_name}`}
</div>

const Border = () => <div style={{width:'100%', borderBottom: '0.5px solid #000000',marginBottom:'10px'}}></div>

const Description = ({description}:any) => <div style={{fontSize:'12px', fontFamily:'suisee',marginBottom:'10px'}}>{description}</div>

const Header = ({children}:any) => <div style={{ fontSize: '12px', width:'100%', borderBottom: '0.5px solid #000000', marginBottom: '10px'}}>
    {children}
    <div style={{float:'right'}}> - </div>
</div>

interface TraitProps {attributes:Attribute[]}

const Traits = ({attributes}:TraitProps) => (
    <div style={{display: 'flex', flexDirection:'row', flexWrap:'wrap', rowGap: '10px', columnGap: '10px', marginBottom: '10px'}}>
        {attributes.map( (props,index)=> (<TraitBox key={index} {...props} />)) }
    </div>
)

const TraitBox = ({trait_type,value}:Attribute) => <div style={{background: 'rgba(255, 255, 255, 0.5)',
                                                                border: '0.5px solid #000000',
                                                                boxSizing: 'border-box',
                                                                backdropFilter: 'blur(25px)',
                                                                borderRadius: '15px',
                                                                width: 'auto',
                                                                padding: '6px 8px 6px 8px',
                                                                fontSize: '12px',
                                                                fontFamily:'suisee',
                                                                display: 'inline-block',
                                                                justifyContent: 'space-around',
                                                                alignItems : 'space-around'
                                                                }}>
                                                            { `${trait_type}: ${value}`}
                                                    </div>


    





export default InfoBox