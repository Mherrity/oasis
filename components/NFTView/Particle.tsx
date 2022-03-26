import * as React from 'react'

export const random = (min:any, max:any) => Math.random() * (max - min) + min


export const addParticle = (setParticles:any, setParticlesStyle:any,e:any) => {
 
  const style = { 
    position: 'absolute',
    pointerEvents: 'none',
    cursor: 'pointer',
    top: e.pageY ,
    left: e.pageX,
    zIndex: 1000,
    speedX : random(0, 20),
    speedY : random(-10, 10),
    rotate : random(-30, 30),
    scale : random(1, 2.4),
    x : 1,
    y : 1 , 
    life: 1
   }

    setParticlesStyle(style)

    //@ts-ignore
    setParticles([<div key='1' style={style}> CoPiEd </div>])
}

export const updateParticle = (setParticles:any, setParticlesStyle:any, style: any) => {
  
  setParticlesStyle(({x,y,life,rotate,speedX,speedY,scale,top,left}:any)=>{
    life -= 0.02
    rotate *= 1.1
    speedX *= 0.99
    speedY += 0.4
    x += speedX
    y += speedY
    return { life, rotate, speedX, speedY, x, y, scale,top,left}
  })

  setParticles((element:any)=>{
   const {x,y,life,rotate,speedX,speedY,scale,top,left} = style
   const newStyle = {  position: 'fixed',
                       pointerEvents: 'none',
                       top,
                       left,
                       zIndex:1000,
                       transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
                       opacity: life}

   return [React.cloneElement(element[0],{style:newStyle})]
  })

}