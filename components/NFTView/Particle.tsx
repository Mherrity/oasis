import * as React from 'react'

export const random = (min:any, max:any) => Math.random() * (max - min) + min


export const addParticle = (setParticles:any, setParticlesStyle:any,e:any) => {
 
  const style = { 
    position: 'absolute',
    pointerEvents: 'none',
    top: e.pageY ,
    left: e.pageX - 150,
    zIndex: 1000,
    speedX : random(-10, 10),
    speedY : random(-3, -20),
    rotate : random(-30, 30),
    scale : random(1, 2.4),
    x : e.pageX - 150,
    y : e.pageY - 250,
    life: 1
   }

    setParticlesStyle(style)

    //@ts-ignore
    setParticles([<div key='1' style={style}> CopiEd </div>])
}

export const updateParticle = (setParticles:any, setParticlesStyle:any, style: any) => {
  
  setParticlesStyle(({x,y,life,rotate,speedX,speedY,scale,top,left}:any)=>{
    life -= 0.02
    rotate *= 1.03
    speedX *= 0.99
    speedY += 0.6
    x += speedX
    y += speedY
    return { life, rotate, speedX, speedY, x, y, scale,top,left}
  })

  setParticles((element:any)=>{
   const {x,y,life,rotate,speedX,speedY,scale,top,left} = style

   const newStyle = {  position: 'absolute',
                       pointerEvents: 'none',
                       top,
                       left,
                       zIndex:1000,
                      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
                       opacity: life}

   return [React.cloneElement(element[0],{style:newStyle})]
  })

}