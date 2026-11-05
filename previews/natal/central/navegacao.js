(()=>{'use strict';
const root='/previews/natal/',archives={
 'natal-v10':{title:'Laboratório de Natal · versão 10',description:'Primeiro laboratório consolidado e escolhas daquela etapa.',src:root+'historico-v10/index.html'},
 'natal-mobile-antigo':{title:'Natal mobile · estudo anterior',description:'Página mobile usada nos primeiros estudos, preservada para consulta.',src:root+'site-mobile.html',phone:true},
 'natal-desktop-antigo':{title:'Natal desktop · estudo anterior',description:'Versão desktop dos estudos anteriores.',src:root+'site-desktop.html'},
 'halloween-layouts':{title:'Halloween · propostas e layouts',description:'As opções e referências de layout que deram origem ao site atual.',src:'/previews/halloween/layouts.html'},
 'halloween-identidade':{title:'Halloween · identidade e artes',description:'Artes, mascotes e composição da campanha anterior.',src:'/previews/halloween/identidade.html'},
 'halloween-abertura':{title:'Halloween · abertura',description:'Experimentos de entrada da campanha anterior.',src:'/previews/halloween/abertura.html'}
};
window.PomPomNatalNavigation={root,archives};
if(window.top!==window.self||new URLSearchParams(location.search).get('previewEmbedded')==='1')return;
if(document.getElementById('central-navigation'))return;
const inline=(location.pathname===root||location.pathname===root+'index.html')&&!!document.querySelector('.controls #part'),planning=location.pathname.endsWith('/planejamento.html'),archive=location.pathname.endsWith('/arquivo.html'),params=new URLSearchParams(location.search);
const key=planning?(location.hash==='#references'?'references':'planning'):archive?'archive':inline?(params.get('comparar')==='lado-a-lado'?'compare':'lab'):'archive';
document.body.dataset.centralNavigation=inline?'inline':'page';
const nav=document.createElement('nav');nav.id='central-navigation';nav.className='central-navigation'+(inline?' central-navigation--inline':'');nav.setAttribute('aria-label','Páginas da Central PomPom');
const brand=document.createElement('a');brand.className='central-navigation-brand';brand.href=root+'?v=39';const logo=document.createElement('img');logo.src=root+'artes/aquarela.png';logo.alt='';logo.width=38;logo.height=38;const brandText=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent='Central PomPom';small.textContent='Projeto de Natal';brandText.append(strong,small);brand.append(logo,brandText);nav.append(brand);
const toggle=document.createElement('button');toggle.type='button';toggle.className='central-navigation-toggle';toggle.textContent='☰ Páginas do projeto';toggle.setAttribute('aria-controls','central-navigation-content');toggle.setAttribute('aria-expanded','false');nav.append(toggle);
const content=document.createElement('div');content.id='central-navigation-content';content.className='central-navigation-content';nav.append(content);
const main=document.createElement('div');main.className='central-navigation-main';content.append(main);
function link(parent,title,href,id){const a=document.createElement('a');a.textContent=title;a.href=href;a.dataset.centralLink=id;if(id===key)a.setAttribute('aria-current','page');parent.append(a);return a}
link(main,'Laboratório ao vivo',root+'?v=39','lab');link(main,'48 propostas e plano',root+'planejamento.html','planning');link(main,'Natal × Halloween',root+'?comparar=lado-a-lado&v=39','compare');link(main,'Testar conjunto completo',root+'?v=39#layout-panel','all');
if(!inline){const details=document.createElement('details');details.className='central-navigation-parts';const summary=document.createElement('summary');summary.textContent='Ir direto para uma parte';details.append(summary);for(const part of Object.values(window.PomPomNatalProposals?.parts||{})){const href=planning?'#'+part.id:root+'?parte='+part.id+'&v=39';link(details,part.title,href,'part-'+part.id)}content.append(details)}
const secondary=document.createElement('div');secondary.className='central-navigation-secondary';content.append(secondary);link(secondary,'Referências de arte',root+'planejamento.html#references','references');link(secondary,'Arquivo de estudos',root+'arquivo.html','archive');link(secondary,'Layouts do Halloween',root+'arquivo.html?pagina=halloween-layouts','halloween');
function markCurrent(){const active=planning?(location.hash==='#references'?'references':'planning'):key;for(const a of content.querySelectorAll('[data-central-link]')){if(a.dataset.centralLink===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}}addEventListener('hashchange',markCurrent);markCurrent();
const help=document.createElement('p');help.className='central-navigation-help';help.textContent='As escolhas de Natal ficam salvas neste navegador.';content.append(help);
function close(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){close();toggle.focus()}});content.addEventListener('click',e=>{if(e.target.closest('a'))close()});
if(inline)document.querySelector('.controls').prepend(nav);else{document.body.prepend(nav);const crumb=document.createElement('div');crumb.className='central-breadcrumb';const back=document.createElement('a');back.href=root+'?v=39';back.textContent='Central de Natal';const label=document.createElement('span');label.textContent='› '+(planning?'Planejamento das propostas':archive?'Arquivo de estudos':'Referência histórica');crumb.append(back,label);nav.after(crumb)}
})();
