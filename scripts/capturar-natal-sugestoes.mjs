// Local Chrome CDP visual review. No publishing or external-service writes.
import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';
const cdp=process.env.POMPOM_CDP_URL||'http://127.0.0.1:9237',base=process.env.POMPOM_TEST_URL||'http://127.0.0.1:8011';
const tab=await(await fetch(cdp+'/json/new?about:blank',{method:'PUT'})).json(),ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};const call=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});const run=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};const wait=ms=>new Promise(r=>setTimeout(r,ms));
const w="document.querySelector('#site').contentWindow",page=code=>run(`${w}.eval(${JSON.stringify(code)})`),until=async(code,label)=>{for(let i=0;i<100;i++){if(await run(code))return;await wait(100)}throw Error('Timeout: '+label)};
try{
 await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Emulation.setDeviceMetricsOverride',{width:1400,height:1000,deviceScaleFactor:1,mobile:false});await call('Page.navigate',{url:base+'/previews/natal/?parte=capa&v=43'});await until(`!!${w}?.PomPomChristmasLayouts&&!!${w}?.PomPomNatalReset`,'lab');await wait(350);
 const parts=await run(`Object.values(window.PomPomNatalProposals.parts)`);assert.equal(parts.length,16);assert.ok(parts.every(p=>p.options.length===3));assert.equal(new Set(parts.flatMap(p=>p.options.map(o=>o.name))).size,48);
 const protectedSources=await page(`[...document.querySelectorAll('#espaco img,[data-gallery-theme] img,#gallery-secondary img,#vitrine img')].map(i=>i.getAttribute('src'))`);
 await fs.mkdir('previews/natal/sugestoes/previas',{recursive:true});let total=0;
 for(const part of parts){
  await run(`(()=>{const select=document.querySelector('#part');select.value=${JSON.stringify(part.id)};select.dispatchEvent(new Event('change'))})()`);
  const appearances=[];
  for(let i=0;i<3;i++){
   const option=part.options[i];await run(`document.querySelector('[data-layout="${option.id}"]').click();true`);
   if(part.id==='abertura'){
    const style=['teatro-ilustrado','teatro','cinema'][i];await until(`${w}.PomPomChristmasOpening?.active?.style===${JSON.stringify(style)}&&!!${w}.PomPomChristmasOpening.active.timeline`,'opening '+style);await page(`window.PomPomChristmasOpening.active.timeline.pause(${style==='cinema'?1.8:2.2},false);true`);
   }else{
    await until(`${w}.document.querySelector('[data-natal-section="${part.id}"]')?.dataset.natalVisual===${JSON.stringify(option.id)}`,'layout '+part.id);
    if(part.id==='catalogo')await until(`${w}.document.querySelectorAll('[data-product-file]').length>0&&getComputedStyle(${w}.document.querySelector('#lojinha-sheet')).display!=='none'&&${w}.document.querySelector('#lojinha-sheet').classList.contains('aberto')`,'visible catalog products');
    if(part.id==='produto'||part.id==='zoom'){await until(`${w}.document.querySelector('#product-detail')?.open`,'product dialog');await page(`(async()=>{await document.querySelector('.product-detail-image').decode();return true})()`);assert.ok(await page(`(()=>{const r=document.querySelector('#product-detail').getBoundingClientRect();return r.top>=-1&&r.bottom<=innerHeight+1})()`),'product dialog must be on screen');assert.equal(await page(`getComputedStyle(document.querySelector('#product-detail')).position`),'fixed')}
    appearances.push(await page(`(()=>{const e=document.querySelector('[data-natal-section="${part.id}"]'),s=getComputedStyle(e);return s.backgroundColor+'|'+s.backgroundImage})()`));
   }
   if(part.id==='capa'){await page(`(async()=>{await document.querySelector('.halloween-mobile-art img').decode();return true})()`);assert.ok(await page(`document.querySelector('.halloween-mobile-art img').getAttribute('src').includes('capa-${option.id}.webp')`));assert.ok(await page(`[...document.querySelectorAll('.christmas-brand-image')].every(i=>i.getAttribute('src').startsWith('/previews/natal/artes/'))`),'brand must remain separate from proposal scene')}
   await wait(470);
   const clip=await run(`(()=>{const b=document.querySelector('#site').getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,scale:1}})()`),shot=await call('Page.captureScreenshot',{format:'png',clip});
   if(part.id==='catalogo')assert.ok(await page(`document.querySelector('#lojinha-sheet').getBoundingClientRect().top<innerHeight*.5`),'catalog must remain on screen at capture');
   const filename=path.join('previews/natal/sugestoes/previas',part.id+'-'+option.id+'.png');await fs.writeFile(filename,Buffer.from(shot.data,'base64'));total++;
  }
  if(part.id!=='abertura')assert.equal(new Set(appearances).size,3,'distinct presentation required: '+part.id);
  assert.deepEqual(await page(`[...document.querySelectorAll('#espaco img,[data-gallery-theme] img,#gallery-secondary img,#vitrine img')].map(i=>i.getAttribute('src'))`),protectedSources,'photos must remain unchanged');
  console.log(part.id+': 3 propostas capturadas e fotos preservadas');
 }
 assert.equal(total,48);console.log('PASS: 16 sections, 48 named visual proposals, distinct presentation and protected original photos.');
}finally{ws.close();await fetch(cdp+'/json/close/'+tab.id)}
