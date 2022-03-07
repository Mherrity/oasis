


export const ClearCanvas = (ctx:any, setDrawing:any) => {
let canv = ctx.current.getContext('2d')
canv.beginPath();
canv.rect(0, 0, 5000, 1000);
canv.fillStyle = 'rgba(255,255,255,1)'
canv.fill()
setDrawing(false)
}