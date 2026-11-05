(()=>{'use strict';
function init(){
 if(new URLSearchParams(location.search).get('magia')==='efeito'){
  const css=document.createElement('link');css.rel='stylesheet';css.href='/previews/natal/magia/magia.css?v=33';document.head.append(css);const script=document.createElement('script');script.src='/previews/natal/magia/magia.js?v=33';document.head.append(script);return;
 }
 const {items}=window.PomPomChristmasPhotos;let section=document.getElementById('transformacoes');if(!section){section=document.createElement('section');section.id='transformacoes';document.getElementById('galeria')?.before(section)}
 const root=document.createElement('div');root.className='christmas-album';const heading=document.createElement('div');heading.className='christmas-album-heading';const tag=document.createElement('span');tag.textContent='Fotos de Natal';const title=document.createElement('h3');title.textContent='Um toque de Natal.';const intro=document.createElement('p');intro.textContent='Momentos de carinho do nosso Natal. Toque em uma foto para ver todos os detalhes.';heading.append(tag,title,intro);
 const grid=document.createElement('div');grid.id='christmas-album-grid';grid.className='christmas-album-grid';const controls=document.createElement('div');controls.className='christmas-album-controls';const previous=document.createElement('button');previous.type='button';previous.textContent='← Anteriores';previous.setAttribute('aria-controls',grid.id);const next=document.createElement('button');next.type='button';next.textContent='Próximas →';next.setAttribute('aria-controls',grid.id);const status=document.createElement('span');status.setAttribute('role','status');status.setAttribute('aria-live','polite');let page=0;
 function render(){const start=page*4;grid.replaceChildren(...items.slice(start,start+4).map(window.PomPomChristmasPhotoUI.tile));status.textContent='Fotos '+(start+1)+'–'+Math.min(start+4,items.length)+' de '+items.length;previous.disabled=page===0;next.disabled=start+4>=items.length;root.dataset.page=String(page);root.dataset.total=String(items.length)}
 previous.addEventListener('click',()=>{if(page>0){page--;render()}});next.addEventListener('click',()=>{if((page+1)*4<items.length){page++;render()}});controls.append(previous,status,next);root.append(heading,grid,controls);section.replaceChildren(root);render();
 const gallery=document.getElementById('galeria');const tagMain=gallery?.querySelector('.section-header .section-tag'),subtitle=gallery?.querySelector('.section-header .section-sub');if(tagMain)tagMain.textContent='🎄 Fotos de Natal';if(subtitle)subtitle.textContent='Lembranças de Natal e momentos do ano para ver de perto.';
 window.PomPomChristmasAlbum={element:root,get page(){return page},get total(){return items.length}};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
