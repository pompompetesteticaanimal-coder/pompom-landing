(()=>{'use strict';
const selectors={capa:'.hero-mobile,#hero-bg',menu:'.menu-panel',natal:'#halloween-destaques',servicos:'#servicos',sobre:'#sobre',espaco:'#espaco',magia:'#transformacoes',momentos:'#gallery-secondary',galeria:'#galeria-temas',vitrine:'#vitrine',avaliacoes:'#avaliacoes',catalogo:'#lojinha-sheet,#lojinha-modal',produto:'#product-detail,.product-detail',zoom:'.product-image-area',contato:'#contato'};
let choices={},queued=false;try{choices=JSON.parse(new URLSearchParams(location.search).get('visuais')||'{}')}catch{}
function apply(value=choices){choices=value&&typeof value==='object'?value:{};for(const [part,selector] of Object.entries(selectors)){const pick=window.PomPomNatalProposals.parts[part]?.options.find(o=>o.id===choices[part])||window.PomPomNatalProposals.parts[part]?.options[0];if(!pick)continue;document.querySelectorAll(selector).forEach(el=>{el.dataset.natalSection=part;el.dataset.natalVisual=pick.id;if(part==='capa'){const img=el.querySelector('.halloween-mobile-art img,.halloween-art img');if(img){const src=pick.scene;if(img.getAttribute('src')!==src)img.src=src}}})}}
window.PomPomChristmasLayouts={apply};
addEventListener('load',()=>requestAnimationFrame(()=>apply(choices)));
function init(){apply();new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
