// Christmas breast harness: body-mounted leather straps and separate draught traces.
const ns='http://www.w3.org/2000/svg';
export const tracePins={sled:{x:116,y:8},deer:{x:-29,y:4},lead:{x:27,y:-5}};
export function attachment(body,p){return {x:body.x+p.x*Math.cos(body.a)-p.y*Math.sin(body.a),y:body.y+p.x*Math.sin(body.a)+p.y*Math.cos(body.a)}}
export function mountHarness(root){
 const deer=[...root.querySelectorAll('[data-deer]')];
 deer.forEach(d=>{
  const g=document.createElementNS(ns,'g');g.dataset.harness='';
  g.innerHTML=`<g fill="none" stroke-linejoin="round" stroke-linecap="round">
   <path d="M-17-26Q-7-8-11 23M14-25Q18-11 27-5Q40 0 39 12L27 20Q18 14 16 3Z" stroke="#49231e" stroke-width="8"/>
   <path d="M-17-26Q-7-8-11 23M14-25Q18-11 27-5Q40 0 39 12L27 20Q18 14 16 3Z" stroke="#a62135" stroke-width="5.5"/>
   <path d="M-17-27Q-7-10-11 22M14-26Q18-12 27-6Q40-1 39 11L27 19Q18 13 16 2" stroke="#efc76d" stroke-width="1"/>
   <path d="M27-5Q2-2-29 4" stroke="#49231e" stroke-width="6"/>
   <path d="M27-5Q2-2-29 4" stroke="#b52b3c" stroke-width="3.5"/>
   <path d="M27-6Q2-3-29 3" stroke="#f0cb79" stroke-width=".8"/>
   <rect x="-17" y="-8" width="11" height="12" rx="2" stroke="#ffdc83" stroke-width="2"/><path d="M-11-8V4" stroke="#ffdc83" stroke-width="1.3"/>
   <circle cx="27" cy="-5" r="4" stroke="#ffdb7c" stroke-width="2.4"/><circle cx="-29" cy="4" r="3.5" stroke="#ffdb7c" stroke-width="2"/>
  </g><g fill="#f0c365" stroke="#8a522b" stroke-width=".7"><path d="M18 13V18" fill="none"/><circle cx="18" cy="21" r="3.2"/><path d="M16 22H20" fill="none"/></g>`;
  d.append(g);
 });
 const layer=document.createElementNS(ns,'g');layer.dataset.draughtTraces='';layer.setAttribute('fill','none');layer.setAttribute('stroke-linecap','round');
 layer.innerHTML=Array.from({length:deer.length},(_,i)=>`<g data-trace="${i}"><path stroke="#48231f" stroke-width="7"/><path stroke="#9e2434" stroke-width="4.5"/><path stroke="#ecc57a" stroke-width="1"/></g>`).join('');
 const rig=root.querySelector('.articulated-rig')||root;rig.insertBefore(layer,rig.querySelector('[data-sled]'));
 const paths=[...layer.querySelectorAll('[data-trace]')].map(g=>[...g.querySelectorAll('path')]);
 const mount=document.createElementNS(ns,'g');mount.dataset.traceMount='';mount.innerHTML='<path d="M103 10H121" stroke="#6c3327" stroke-width="5"/><circle cx="116" cy="8" r="4.5" fill="#702c28" stroke="#f6d489" stroke-width="2"/>';root.querySelector('[data-sled]').append(mount);
 function update(t,f){
  const starts=f.d.map((_,i)=>i<2?attachment(f.s,tracePins.sled):attachment(f.d[i-2],tracePins.lead));
  paths.forEach((set,i)=>{const a=starts[i],b=attachment(f.d[i],tracePins.deer),sag=1.4+Math.min(2,Math.abs(Math.sin(t*8+i))*.8+Math.abs(f.d[i].a)*4);const d=`M${a.x},${a.y}Q${(a.x+b.x)/2},${(a.y+b.y)/2+sag} ${b.x},${b.y}`;set.forEach(p=>p.setAttribute('d',d))});
 }
 return {update};
}
