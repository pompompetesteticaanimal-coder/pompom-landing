import assert from 'node:assert/strict';
import {flightPose,flightBounds,moon,turnTime} from '../previews/natal/abertura/alternativas/trajetoria.mjs';
const corners=pose=>[flightBounds.minX,flightBounds.maxX].flatMap(x=>[flightBounds.minY,flightBounds.maxY].map(y=>{
 const xf=x*pose.facing,a=pose.rotation*Math.PI/180;
 return {x:pose.x+pose.scale*(xf*Math.cos(a)-y*Math.sin(a)),y:pose.y+pose.scale*(xf*Math.sin(a)+y*Math.cos(a))};
}));
for(let i=1;i<=660;i++){
 const a=flightPose((i-1)/60),b=flightPose(i/60);
 assert.ok(Math.hypot(b.x-a.x,b.y-a.y)<25,'flight position must remain continuous');
}
for(const t of [turnTime-.001,turnTime])assert.ok(corners(flightPose(t)).every(p=>p.x>1000),'turn must happen fully offscreen');
for(let t=turnTime;t<7;t+=1/60){const a=flightPose(t),b=flightPose(t+1/60);assert.equal(a.facing,-1);assert.equal(a.behindMoon,true);assert.ok(b.x<=a.x,'reindeer must lead toward moon');}
assert.ok(corners(flightPose(7)).every(p=>Math.hypot(p.x-moon.x,p.y-moon.y)<moon.radius),'whole team must finish inside moon');
console.log('PASS: continuous flight, offscreen direction change, reindeer lead return and complete moon occlusion.');
