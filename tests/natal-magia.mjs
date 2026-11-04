// Integration checks in a temporary Chrome CDP profile and local static server.
import fs from 'node:fs/promises';import {tmpdir} from 'node:os';import assert from 'node:assert/strict';
const server=process.env.POMPOM_CDP_URL||'http://127.0.0.1:9237',base=process.env.POMPOM_TEST_URL||'http://127.0.0.1:8011';
const tab=await(await fetch(server+'/json/new?about:blank',{method:'PUT'})).json(),ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};
const call=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});
const run=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const before='/fotos/datas-comemorativas/halloween/IMG_4076.JPG.webp',after='/fotos/datas-comemorativas/natal/87aac4ca-87cd-4aab-a735-b385b6ffd7b4.jpg.webp';
const capture=async name=>{const s=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(tmpdir()+'/pompom-magic-'+name+'.png',Buffer.from(s.data,'base64'))};
try{
 await call('Emulation.setDeviceMetricsOverride',{width:1400,height:1000,deviceScaleFactor:1,mobile:false});
 for(const page of ['mobile','desktop']){
  const w=page==='mobile'?"document.querySelector('#site').contentWindow":'window',evalPage=code=>run(`${w}.eval(${JSON.stringify(code)})`);
  await call('Page.navigate',{url:base+(page==='mobile'?'/previews/natal/?parte=magia&v=29':'/previews/natal/base-desktop.html?previewThemes=1&theme=halloween&opening=none&previewEmbedded=1&parte=magia&v=29')});await wait(2300);
  assert.equal(await evalPage(`!!window.PomPomChristmasMagic`),true);
  assert.equal(await evalPage(`document.querySelectorAll('[data-magic-pet]').length`),1);
  assert.equal(await evalPage(`window.PomPomChristmasMagic.state.pet`),'kiara');
  assert.equal(await evalPage(`document.querySelectorAll('.magic-bow,.magic-paper,.magic-ribbon,.magic-modes,.magic-accessories,.christmas-magic .christmas-wrapped-photo').length`),0);
  assert.equal(await evalPage(`document.querySelector('.magic-stage > .magic-photo').getAttribute('src')`),before);
  assert.equal(await evalPage(`document.querySelector('.magic-after-photo').getAttribute('src')`),after);
  assert.equal(await evalPage(`(async()=>{await Promise.all([...document.querySelectorAll('.magic-photo')].map(i=>i.decode()));return true})()`),true);
  assert.equal(await evalPage(`getComputedStyle(document.querySelector('.magic-after-layer')).opacity`),'0');await capture(page+'-start');
  await evalPage(`window.PomPomChristmasMagic.setProgress(.53);true`);assert.equal(await evalPage(`getComputedStyle(document.querySelector('.magic-after-layer')).opacity`),'0');
  await evalPage(`window.PomPomChristmasMagic.setProgress(.55);true`);assert.equal(await evalPage(`getComputedStyle(document.querySelector('.magic-after-layer')).opacity`),'1');assert.equal(await evalPage(`(()=>{const c=document.querySelector('.magic-smoke');return c.getContext('2d').getImageData(0,0,1,1).data[3]})()`),255);await capture(page+'-smoke');
  await evalPage(`window.PomPomChristmasMagic.setProgress(1);true`);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.phase`),'open');assert.equal(await evalPage(`document.querySelector('.magic-touch').hidden`),true);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.smoke`),0);await capture(page+'-open');
  assert.equal(await evalPage(`window.PomPomChristmasMagic.setPair('kiara',{before:'https://example.com/pet.jpg',after:null})`),false);
  assert.equal(await evalPage(`window.PomPomChristmasMagic.setPair('__proto__',{before:${JSON.stringify(before)},after:null})`),false);
  assert.equal(await evalPage(`window.PomPomChristmasMagic.setPair('kiara',{before:${JSON.stringify(before)},after:null})`),true);await evalPage(`window.PomPomChristmasMagic.setProgress(1);true`);assert.equal(await evalPage(`document.querySelector('.magic-after-placeholder').hidden`),false);
  await evalPage(`window.PomPomChristmasMagic.setPair('kiara',{before:${JSON.stringify(before)},after:${JSON.stringify(after)}});true`);
  await evalPage(`(()=>{const r=document.querySelector('#magic-progress');r.value='62';r.dispatchEvent(new Event('input'))})()`);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.progress`),.62);
  await evalPage(`document.querySelector('.magic-repeat').click();true`);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.progress`),0);
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await evalPage(`document.querySelector('.magic-touch').click();true`);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.progress`),1);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.smoke`),0);await call('Emulation.setEmulatedMedia',{features:[]});
  await evalPage(`window.PomPomNatalReset.setPaper('vermelho');true`);assert.equal(await evalPage(`document.querySelectorAll('.christmas-magic .christmas-wrapped-photo').length`),0);
  console.log('PASS',page,': confirmed Kiara pair; no bow/wrapping; opaque smoke swap; untouched image sources; reset, slider, reduced motion and local image validation.');
 }
 await call('Page.navigate',{url:base+'/previews/natal/?parte=magia&v=29'});await wait(2300);
 const w="document.querySelector('#site').contentWindow",evalPage=code=>run(`${w}.eval(${JSON.stringify(code)})`);
 await evalPage(`window.PomPomChristmasMagic.reset();document.querySelector('.magic-stage').scrollIntoView({block:'center'});true`);
 const c=await run(`(()=>{const f=document.querySelector('#site'),r=f.getBoundingClientRect(),b=f.contentWindow.document.querySelector('.magic-stage').getBoundingClientRect(),s=r.width/f.contentWindow.innerWidth;return {x:r.left+(b.left+b.width*.4)*s,y:r.top+(b.top+b.height*.5)*s}})()`);
 await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...c});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...c});await wait(1600);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.phase`),'open');
 await evalPage(`window.PomPomChristmasMagic.reset();document.querySelector('.magic-touch').focus();true`);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await wait(1600);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.phase`),'open');
 for(const width of [320,390,430]){await call('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:true});await wait(100);assert.equal(await run(`document.documentElement.scrollWidth>innerWidth`),false)}
 await evalPage(`window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));true`);assert.equal(await evalPage(`window.PomPomChristmasMagic.state.progress`),0);
 console.log('PASS: real photo click, keyboard, 320/390/430 layouts and history restore.');
}finally{ws.close();await fetch(server+'/json/close/'+tab.id)}
