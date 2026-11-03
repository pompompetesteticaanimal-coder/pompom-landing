// Coordinates of the entire team. Change direction only when the complete team is offscreen.
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
export const flightBounds={minX:-530,maxX:400,minY:-220,maxY:190};
export const moon={x:610,y:390,radius:175};
export const turnTime=5.5;
export function flightPose(t){
 if(t<turnTime){const enter=smooth((t-.3)/1.2),exit=smooth((t-4.1)/1.4);return {x:-500+980*enter+1020*exit,y:690-410*exit,scale:1.1-.4*exit,rotation:-13*exit,facing:1,behindMoon:false}}
 const approach=smooth((t-turnTime)/1.5);
 return {x:1500-890*approach,y:280+110*approach,scale:.7-.46*approach,rotation:0,facing:-1,behindMoon:true};
}
