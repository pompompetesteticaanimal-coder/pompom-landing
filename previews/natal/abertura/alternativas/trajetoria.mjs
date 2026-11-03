// Coordinates of the entire team. Change direction only when the complete team is offscreen.
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
export const flightBounds={minX:-530,maxX:715,minY:-220,maxY:190};
export const moon={x:610,y:390,radius:175};
export const turnTime=5.5;
export function flightPose(t,count=9){
 const front=count===9?.74:count===6?.94:1.1,center=count===9?370:count===6?430:480;
 if(t<turnTime){const enter=smooth((t-.3)/1.2),exit=smooth((t-4.1)/1.4);return {x:-500+(center+500)*enter+(1520-center)*exit,y:690-410*exit,scale:front+(.7-front)*exit,rotation:-13*exit,facing:1,behindMoon:false}}
 const approach=smooth((t-turnTime)/1.5);
 return {x:1520-910*approach,y:280+110*approach,scale:.7-.49*approach,rotation:0,facing:-1,behindMoon:true};
}
