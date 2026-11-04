import {legCycle} from './galope.mjs?v=29';
// Layout experiments reuse the two baked articulated motion sources with staggered phases.
import {attachment} from './arreios.mjs?v=29';
export const teamCounts=[4,6,9];
export const validTeam=value=>teamCounts.includes(Number(value))?Number(value):6;
export function makeTeam(source,value){
 const count=validTeam(value),means=source.frames[0].d.map((_,i)=>source.frames.reduce((p,f)=>({x:p.x+f.d[i].x/source.frames.length,y:p.y+f.d[i].y/source.frames.length}),{x:0,y:0}));
 const frames=source.frames.map((f,n)=>{
  const d=Array.from({length:count},(_,i)=>{
   const leader=count===9&&i===8,far=!leader&&i%2===0,row=Math.floor(i/2),seed=i%2,q=source.frames[Math.min(source.frames.length-1,n+i*7)].d[seed];
   return {...q,legs:legCycle(f.t,i),x:35+row*130+(far?22:0)+(q.x-means[seed].x)*.6,y:f.s.y+(leader?-8:far?-43:-2)+(q.y-means[seed].y)*.4};
  });
  const r=d.map((q,i)=>{const seed=i%2,old=f.r[seed],a=attachment(f.s,source.pins.sled),b=attachment(q,source.pins.deer);return old.map((p,j)=>{const k=j/(old.length-1);return [p[0]+(a.x-old[0][0])*(1-k)+(b.x-old.at(-1)[0])*k,p[1]+(a.y-old[0][1])*(1-k)+(b.y-old.at(-1)[1])*k]})});
  return {...f,d,r};
 });
 return {...source,frames,teamCount:count,layout:'Paired layout with staggered samples from two baked motion sources'};
}
