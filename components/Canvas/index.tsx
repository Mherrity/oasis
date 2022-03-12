import * as React from 'react'
import { calcDistance } from '../../utls/math';

const drawImage = (img: typeof Image, context:any, x:number,y:number, width:number, height:number) => 
    context.drawImage(img, x - width/2, y - height/2, width, height);
  


interface CanvasProps {
    nftImages : any,
    mouse : any,
    dimensions: any,
    canvasRef : any,
    drawing: boolean,
    loading : boolean,
    setImageInfo : any
}
 const Canvas  = ({nftImages, 
                    mouse,
                    canvasRef,
                   dimensions,
                   drawing,
                   loading,
                   setImageInfo
                }: CanvasProps) => {

    const [prevMouse, setPrevMouse] = React.useState({x:0,y:0})

    React.useEffect(()=>{
  
        const {pageX, pageY,x,y} = mouse

        //Do we have null values
        if(pageX != null && drawing == true){
        //Getting mouse movement
        const distance = calcDistance({x:prevMouse.x,y:prevMouse.y},
                                        {x:pageX!, y: pageY!})
       
        //if greater than 40 
        if(distance > 40){

            setPrevMouse({x:pageX!,y:pageY!}) //updating prevmouse position
            
            if(!loading && canvasRef!=null && canvasRef.current!=null && nftImages.length > 0 ){
            let loaded = false 
            let img: HTMLImageElement
            let index:number
            let width, height:number
            while(loaded==false){
            index =  Math.floor( Math.random() * nftImages.length )
            img = nftImages[index].img
            if(img.complete && img.naturalHeight!=0){
                loaded = img.complete && img.naturalHeight!=0
                width = height = 150 + Math.random() * 150
                setImageInfo({index,height,width})
            }
            }
            //@ts-ignore
            console.log({img})

            console.log('x',x,'y',y)
            console.log()
            //@ts-ignore
            drawImage(img,canvasRef.current.getContext('2d'), x,y, width, height)  
                    } 
                }
            }
        },
        [mouse])

                    return (
                        <canvas ref={canvasRef} 
                        height={dimensions.y}
                        width = {dimensions.x}
                        style={{top:0, left: 0, position:'absolute', zIndex:0}}/>
                    )
 }

 export default Canvas