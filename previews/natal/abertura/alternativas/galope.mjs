// Hooves sweep backwards under the body during the extended/downward stroke.
// Coordinates face right; the theatre mirrors the whole team on the moon return.
export function legCycle(time,index){
 const phase=-(time+index*7/60)*2*Math.PI*1.35+(index%2)*.9;
 return Array.from({length:4},(_,j)=>{
  const q=phase+(j%2?Math.PI*.8:0)+(j>=2?1.7:0),x=Math.sin(q)*25,y=34+Math.cos(q)*12,L=27,dist=Math.min(52,Math.hypot(x,y));
  const knee=(j<2?-1:1)*Math.acos((dist*dist-2*L*L)/(2*L*L));
  return [-Math.atan2(x,y)-knee/2,knee];
 });
}
