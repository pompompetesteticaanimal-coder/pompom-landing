(()=>{'use strict';
const $=id=>document.getElementById(id),controls=document.querySelector('.controls');
const details=document.createElement('details');details.className='lab-finishes';const summary=document.createElement('summary');summary.textContent='Identidade e acabamentos';details.append(summary);for(const id of ['palette-section','paper-section'])details.append($(id));$('layout-panel').before($('art-section'));$('layout-panel').after(details);
const device=document.createElement('div');device.className='lab-device';const label=document.querySelector('label[for="device"]');device.append(label,$('device'));document.querySelector('.stagebar').append(device);
const selector=document.createElement('details');selector.className='lab-section-select';const selectorTitle=document.createElement('summary');selectorTitle.textContent='Trocar parte do site';selector.append(selectorTitle,document.querySelector('label[for="part"]'),$('part'));controls.querySelector('.intro').after(selector);
const footer=document.createElement('p');footer.className='lab-saved-note';footer.textContent='Suas escolhas ficam salvas neste navegador. As fotos originais e o estoque continuam preservados.';controls.append(footer);
function context({part}){const data=window.PomPomNatalProposals.parts[part];$('work-title').textContent=part==='abertura'?'Entrada de Natal':data.title;$('paper-section').hidden=part!=='natal';details.hidden=part==='abertura';$('opening-section').hidden=part!=='abertura';$('opening').textContent=part==='abertura'?'↻ Repetir entrada':'▶ Testar entrada'}
addEventListener('pompom:labstate',e=>context(e.detail));context(window.PomPomNatalLab.getState());
})();

if(location.hash==='#art-section')requestAnimationFrame(()=>document.getElementById('art-section').scrollIntoView({block:'start'}));
