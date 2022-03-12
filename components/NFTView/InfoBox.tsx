import * as React from 'react'
import { MetaData, Attribute } from '../../types/metaplex'


interface InfoBoxProps {
    data : MetaData
}

const InfoBox = ({data}:InfoBoxProps) => {
    const {name,attributes,description,collection} = data
    return (
        <>
        <SpaceBarText/>
        <NameDisplay name={name}/>
        <OwnedBy/>
        <Border/>
        <Description description={description}/>
        <Header>Traits</Header>
        <Traits attributes={attributes} />
        <Header>More</Header>
 
        </>
    )
}

const SpaceBarText = () => <div style={{fontSize:'12px', fontFamily:'suisee', opacity: 0.25, marginBottom:'10px'}}
> *hold space to free cursor </div>

const NameDisplay = ({name}:any) => <div style={{fontSize:'12px', fontFamily:'suisee-medium',marginBottom:'5px'}}>
                                    {name}
                                    </div>

const OwnedBy = () => <div style={{fontSize:'12px', fontFamily:'suisee', marginBottom:'10px'}}>
Owned By MNIRPRJCTS.sol
</div>

const Border = () => <div style={{width:'100%', borderBottom: '0.5px solid #000000',marginBottom:'10px'}}></div>

const Description = ({description}:any) => <div style={{fontSize:'12px', fontFamily:'suisee',marginBottom:'10px'}}>{description}</div>

const Header = ({children}:any) => <div style={{width:'100%', borderBottom: '0.5px solid #000000'}}>
    {children}
    <div style={{float:'right'}}> - </div>
</div>

interface TraitProps {attributes:Attribute[]}

const Traits = ({attributes}:TraitProps) => (
    <div>
        {attributes.map( (props,index)=> (<TraitBox key={index} {...props} />)) }
    </div>
)

const TraitBox = ({trait_type,value}:Attribute) => <div style={{background: 'rgba(255, 255, 255, 0.5)',
                                                                border: '0.5px solid #000000',
                                                                boxSizing: 'border-box',
                                                                backdropFilter: 'blur(25px)',
                                                                borderRadius: '15px',
                                                                width: 'auto',
                                                                fontSize: '12px',
                                                                fontFamily:'suisee',
                                                                display: 'flex'
                                                                }}>
                                                              &nbsp;{ ` ${trait_type}: ${value} `}
                                                    </div>
    





export default InfoBox