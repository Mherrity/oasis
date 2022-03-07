// responsive-box.tsx
import type { Ref } from 'react'
import { HTMLFactory } from 'react'
import {useState, useEffect, useRef, cloneElement} from 'react'
import { SupportedChains } from '../../types'
import { gsap } from "gsap";
import useForm from '../../utls/useForm'
import Image from 'next/image'
import { PublicKey } from '@solana/web3.js';
import web3 from 'web3'

const InputDivDiv = {
width: '600px',
fontSize: '12px',
border: 'none',
background : 'transparent',
outline: 'none',
fontFamily: 'suisee',
marginBottom : '16px',
display: 'flex',
flexdirection: 'row'
}

const inputDivStyles = {
width: '650px',
fontSize: '12px',
border: 'none',
borderBottom: '0.5px solid #000000',
background : 'transparent',
outline: 'none',
fontFamily: 'suisee',
opacity: 0,
display: 'flex',
flexdirection: 'row'
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
    display:'flex',
    flexdirection: 'row'
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
    const [err,setErr] = useState<boolean>(false)

    const [numAddy,setNum] = useState(1)
    /* Array of Inputs*/
    const [addyInput,addAddy] = useState<any>([])

    useEffect(()=>{
        addAddy([<InputBox updateForm={updateForm}
              setAdd={setAdd}
              name='1'
              key = '1'
              ctx = {ctx}
              setDrawing={setDrawing}
              setErr={setErr}
               arrayLen={numAddy}
               addAddy={addAddy}
               maxKey={true}
              />] )
    }, [])



    /* Appending to Array */
    const addInput = () =>{
         setNum(numAddy+1)
         addAddy((oldAddy:any)=>
        oldAddy.concat(
            <InputBox updateForm={updateForm}
              arr = {addyInput}
              setAdd={setAdd}
              addAddy={addAddy}
              name={String(numAddy+1) }
              key = {String(numAddy+1)}
              setErr={setErr}
              arrayLen={numAddy}
              maxKey={true}
              />
        )
    )
}

    const addCheck = () => {
        let maxKey = addyInput.map((val:any)=>parseInt(val.key)).reduce((a:number,b:number)=>Math.max(a,b))
        //@ts-ignore
        const address = form[String(maxKey)]

        //creating error object
        let error = ''

        if(address.substring(0,2)=='0x'){
            if(web3.utils.isAddress(address)){
                console.log('ture')
            }
            else{
                error = 'INVALID ADDRESS'
            }
        }
        else{
            try{
                new PublicKey(address)
            }
            catch(e){
                error = 'INVALID ADDRESS'
            }
        }

        if(error==''){
            //So we find the max Key and use that one 
            let maxKey = addyInput.map((val:any)=>parseInt(val.key)).reduce((a:number,b:number)=>Math.max(a,b))
            let a = document.getElementById(`input-${maxKey}`)

            addAddy((prevAddy:any)=>{
                prevAddy[prevAddy.length - 1] = cloneElement(prevAddy[prevAddy.length - 1],{maxKey:false})
                return prevAddy
            }
            )
            
            //@ts-ignore
            a?.setAttribute('disabled',true)
            addInput()
        }
        else{
            console.log('setting err')
            setErr(true)
      }
    }


    return (
    
    <form style={{marginBottom:'50vh'}} onSubmit={handleSubmit}>

    {addyInput}

     <AddAnother visible={add} onClick={addCheck} err={err}/>

     <View onClick={()=>null} visible={add}/>

    </form>
    
)
}

interface InputProps {
    updateForm : any,
    setAdd : any,
    addAddy : any,
    name: string,
    ctx? : any,
    setDrawing? : any,
    setErr: any,
    arrayLen: any,
    arr?: any,
    maxKey:boolean
}   

const InputBox = ({updateForm,setAdd,name,ctx,setDrawing,setErr,addAddy,maxKey}:InputProps) => {
    
    const [chain, setChain] = useState<SupportedChains | null | string>() //which chain is this address
    const [chainOn, setChainOn] = useState(false)



    const divRef = useRef(null);

    const handleChange = (e:any) => {
        updateForm(e)
        setErr(false)
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

    const RemoveElement = () =>{
         console.log(name)
         addAddy((prevArr:[])=>{
             return prevArr.filter((val:any,index)=>{
                 //@ts-ignore
                 let {disabled} = document.getElementById(`input-${val.key}`)
                 console.log(val.key,disabled)
                 return !disabled || val.key != name
                 })
    })
}
    

    useEffect(() => {
        gsap.to(divRef.current, {duration: 2, opacity: "+=1" });
      });

   console.log({maxKey})
    let addtlStyle = chainOn?  {opacity:1, transition: 'opacity 1s ease'} : {opacity:0, transition: 'opacity 1s ease'}
    let addtlStyleX = maxKey ? {opacity:0, transition: 'opacity 1s ease'} : {opacity:1, transition: 'opacity 1s ease'}
    return (
    <div style={InputDivDiv}>
        <div ref={divRef} style={{...inputDivStyles }}>
        <input id={`input-${name}`}
               name={name}
               onChange={handleChange} 
               style={{...inputStyles}} 
               type='text'
               onFocus={(e) => { 
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
               placeholder='ENTER ADDRESS'/>

        <label  style={{...labelStyle,
                        ...addtlStyle,
                        textAlign : 'right',
                        color : chain!=null && !(typeof SupportedChains)? 'red': 'background: rgba(0, 0, 0, 1)'
                    }} >{chain!=null?chain:''}
                     
                    </label>
    </div>

    <img onClick={RemoveElement}
        style={{...{
                    display:'inline-block',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    color: 'black',
                    opacity: 0
                },
                ...addtlStyleX
            }
            } src ='/CancelX.svg' height='10px' width='10px'/>

    </div>
    )

}



interface AddProps {
    visible : boolean,
    onClick : any,
    err? : boolean
}

const AddAnother = ({visible, onClick, err}: AddProps) =>{ 
    const [style,setStyle] = useState({opacity:0, transition: 'opacity 1s ease'})
    useEffect(()=>{
        if(err){
            setStyle({opacity:1, transition: 'opacity 1s ease'})
        }
        else{
            setStyle({opacity:0, transition: 'opacity 1s ease'})
        }

    },[err])

    let addtlStyle = visible?  {opacity:1, transition: 'opacity 1s ease'} : {opacity:0, transition: 'opacity 1s ease'}

    return (
        <div style={addAnotherDivStyle}>
            <div onClick={onClick}
                style={addtlStyle}>
                &#43; ADD ANOTHER
            </div>
            <div style={{...{color:'red'},...style }}>
                &#160; &#160; ENTER A VALID ADDRESS
            </div>
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

