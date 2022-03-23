import { useRef, useEffect } from 'react'
import { useRaf, useOnWindowResize } from 'rooks'


export const random = (min:any, max:any) => Math.random() * (max - min) + min

export class Particle {
    parent 
    text 
    x 
    y
    life:any
    style:any
    particle:any 
    speedX:any 
    speedY:any 
    rotate:any 
    scale:any 

  constructor(obj:any) {
    this.parent = document.body
    this.text = obj.text
    this.x = obj.x
    this.y = obj.y
    this.init()
  }

  init() {
    this.life = 1
    this.style = {
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      zIndex: 1000
    }
    this.particle = document.createElement('div')
    this.particle.innerHTML = this.text
    Object.assign(this.particle.style, this.style)
    this.speedX = random(-10, 10)
    this.speedY = random(-3, -20)
    this.rotate = random(-30, 30)
    this.scale = random(1, 2.4)
    this.parent.appendChild(this.particle)
  }

  update() {
    this.life -= 0.02
    this.rotate *= 1.03
    this.speedX *= 0.99
    this.speedY += 0.6
    this.x += this.speedX
    this.y += this.speedY
    if (this.particle) {
      this.particle.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale}) rotate(${this.rotate}deg) `
      this.particle.style.opacity = this.life
    }

    if (this.life < 0) {
      this.parent.removeChild(this.particle)
    }
  }
}



const CrazyButton = ({ children, mouse }:any) => {
  const Particles:any[] = []
  const $root = useRef()
  const bounds = useRef()

  const getBounds = () => {
    //@ts-ignore
    return $root.current!.getBoundingClientRect()
  }

  useEffect(() => {
    bounds.current = getBounds()
  }, [])

  useOnWindowResize(() => {
    bounds.current = getBounds()
  })

  const createParticle = (e:any) => {
    //@ts-ignore
    const { left, top } = bounds.current
    const x =  e.clientX
    const y =  e.clientY  
    console.log({x,y})
    Particles.push(
      new Particle({
        parent: $root.current,
        text: '✌️',
        x: x ,
        y: y 
      })
    )
  }

  const handleMouseMove = (e:any) => {
    createParticle(e)
  }

  useRaf(() => {
    Particles.forEach((p, i) => {
      if (p.life > 0.01) {
        p.update()
      } else {
        Particles.splice(i, 1)
      }
    })
  }, true)

  return (
    <div
      ref={$root as any}
      onTouchMove={handleMouseMove}
      onMouseMove={handleMouseMove}
      
    >
      {children}
    </div>
  )
}

export default CrazyButton
