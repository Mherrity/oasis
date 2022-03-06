// responsive-box.tsx
import type { Ref } from 'react'
import { HTMLFactory } from 'react'
import {useState, useEffect, useRef} from 'react'
import { SupportedChains } from '../../types'
import { gsap } from "gsap";
import useForm from '../../utls/useForm'

// const absoluteCenter = {
//     position: 'absolute'; 
//     left: 0; 
//     right: 0; 
//     margin-left: auto; 
//     margin-right: auto; 
//     width: 100px; /* Need a specific value to work */
// }

const inputDivStyles = {
width: '600px',
fontSize: '12px',
border: 'none',
borderBottom: '0.5px solid #000000',
background : 'transparent',
outline: 'none',
fontFamily: 'suisee',
marginBottom : '16px',
opacity: 0
}

const inputStyles = {
    width: '500px',
    fontSize: '12px',
    border: 'none',
    background : 'transparent',
    outline: 'none',
    fontFamily: 'suisee'
    }
    

const labelStyle = {
    display: 'inline-block',
    width: '100px',
    textalign: 'right',
    color: 'rgba(0, 0, 0, 0.25)'
}

const addAnotherDivStyle = {
    width: '600px',
    fontSize : '12px',
    textalign : 'left',
    fontFamily : 'suisee',
    cursor: 'pointer',
   // marginTop: '16px'
}

const viewButtonStyle = {
    width: '600px',
    fontSize : '12px',
    fontFamily : 'suisee-medium',
    textalign : 'center',
    alignSelf: 'auto',
    cursor : 'pointer',
    marginTop: '24px',
    border: 'none',
    background: 'none'
}
export const SearchAddress = () =>{
    /* Submit Logic */
    const submit = (form:any)=>console.log({form}) 

    const [add, setAdd] = useState(false)
    const {form, updateForm, handleSubmit} = useForm(submit)

    /* Array of Inputs*/
    const [addyInput,addAddy] = useState([
        <InputBox updateForm={updateForm}
              setAdd={setAdd}
              name='1'
              key = '1'
              />
    ])

    /* Appending to Array */
    const addInput = () => addAddy((oldAddy:any)=>
        oldAddy.concat(
            <InputBox updateForm={updateForm}
              setAdd={setAdd}
              name={oldAddy.length + 1}
              key = {oldAddy.length + 1}
              />
        )
    )


    return (
    
    <form onSubmit={handleSubmit}>

    {addyInput}

     <AddAnother visible={add} onClick={addInput}/>

     <View onClick={()=>null}visible={add}/>

    </form>
)
}

interface InputProps {
    updateForm : any,
    setAdd : any,
    name: string
}   

const InputBox = ({updateForm,setAdd,name}:InputProps) => {
    
    const [chain, setChain] = useState<SupportedChains | null>() //which chain is this address
    const [chainOn, setChainOn] = useState(false)

    const divRef = useRef(null);

    const handleChange = (e:any) => {
        updateForm(e)
        const address = e.target.value
        const len = address?.length
        /* Chain Logic */
        if(len >= 2){
            address.substring(0,2) == '0x' ?  setChain(SupportedChains.ETHEREUM) : setChain(SupportedChains.SOLANA)
            setChainOn(true)
        }
        else{
            setChainOn(false)
        }
        /* Add Button Logic */
        if(len>0){
            setAdd(true)
        }
        else{
            setAdd(false)
        }
    }

    useEffect(() => {
        gsap.to(divRef.current, {opacity: "+=1" });
      });

    let addtlStyle = chainOn?  {opacity:1, transition: 'opacity 1s ease'} : {opacity:0, transition: 'opacity 1s ease'}

    return (
        <div ref={divRef} style={{...inputDivStyles }}>
        <input name={name}
               onChange={handleChange} 
               style={{...inputStyles}} 
               type='text'
               onFocus={(e) => e.target.placeholder = '' }
               spellCheck="false"
               placeholder='YOUR ADDRESS'/>
        <label style={{...labelStyle,
                        ...addtlStyle
                    }} >{chain!=null?chain:''}</label>
    </div>
    )

}



interface AddProps {
    visible : boolean,
    onClick : any
}

const AddAnother = ({visible, onClick}: AddProps) =>{ 
    let addtlStyle = visible?  {opacity:1, transition: 'opacity 1s ease'} : {opacity:0, transition: 'opacity 1s ease'}
    return (
    <div onClick={onClick}
         style={{...addAnotherDivStyle,
                  ...addtlStyle}}>
         &#43; ADD ANOTHER 
    </div>
)
}

const View = ({visible}: AddProps) =>{
    let addtlStyle = visible?  {opacity:1, transition: 'opacity 1s ease'} : {opacity:0, transition: 'opacity 1s ease'}
    return (
    <button style={{...viewButtonStyle, ...addtlStyle }}
    type='submit'
    >
         VIEW &rarr;
    </button>
)
    }

