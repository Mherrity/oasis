// responsive-box.tsx
import type { Ref } from 'react'
import { HTMLFactory } from 'react'
import {useState, useEffect, useRef} from 'react'
import { SupportedChains } from '../../types'
import { gsap } from "gsap";
import useForm from '../../utls/useForm'


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
    color: 'rgba(0, 0, 0, 0.25)'
}

const addAnotherDivStyle = {
    width: '600px',
    fontSize : '12px',
    textalign : 'left',
    fontFamily : 'suisee',
    cursor: 'pointer',
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

interface SearchAddressProps {
    ctx : any,
    setDrawing : any
}

export const SearchAddress = ({ctx, setDrawing}:SearchAddressProps ) =>{
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
              ctx = {ctx}
              setDrawing={setDrawing}
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
    
    <form style={{marginBottom:'50vh'}} onSubmit={handleSubmit}>

    {addyInput}

     <AddAnother visible={add} onClick={addInput}/>

     <View onClick={()=>null}visible={add}/>

    </form>
    
)
}

interface InputProps {
    updateForm : any,
    setAdd : any,
    name: string,
    ctx? : any,
    setDrawing? : any
}   

const InputBox = ({updateForm,setAdd,name,ctx,setDrawing}:InputProps) => {
    
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
        gsap.to(divRef.current, {duration: 2, opacity: "+=1" });
      });

    let addtlStyle = chainOn?  {opacity:1, transition: 'opacity 1s ease'} : {opacity:0, transition: 'opacity 1s ease'}

    return (
        <div ref={divRef} style={{...inputDivStyles }}>
        <input name={name}
               onChange={handleChange} 
               style={{...inputStyles}} 
               type='text'
               onFocus={(e) => { e.target.placeholder = ''
                                if(ctx){
                                 let canv = ctx.current.getContext('2d')
                                 canv.beginPath();
                                 canv.rect(0, 0, 5000, 1000);
                                 canv.fillStyle = 'rgba(255,255,255,1)'
                                 canv.fill()
                                 setDrawing(false)
                                }
                                
             } }
               spellCheck="false"
               autoComplete = "off"
               placeholder='YOUR ADDRESS'/>
        <label  style={{...labelStyle,
                        ...addtlStyle,
                        textAlign : 'right'
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

