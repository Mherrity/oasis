import * as React from 'react'
import { calcDistance } from '../../utls/math';

const drawImage = (img: typeof Image, context:any, x:number,y:number, dimensions : any) => {
  
    const size = 150 + Math.random() * 150

    context.drawImage(img, x - size/2, y - size/2, size,size);
  }


interface CanvasProps {
    nftImages : any,
    mouse : any,
    dimensions: any,
    canvasRef : any,
    drawing: boolean,
    loading : boolean
}
 const Canvas  = ({nftImages, 
                    mouse,
                    canvasRef,
                   dimensions,
                   drawing,
                   loading
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

            if(!loading && canvasRef!=null && canvasRef.current!=null){
            const index =  Math.floor( Math.random() * nftImages.length )
            //@ts-ignore
            drawImage(nftImages[index],canvasRef.current.getContext('2d'), x,y, dimensions)  
                    } 
                }
            }
        },
        [mouse])

                    return (
                        <canvas ref={canvasRef} height={dimensions.y}
                        width = {dimensions.x}
                        style={{top:0, left: 0, position:'absolute', zIndex:-1000}}/>
                    )
 }

 export default Canvas