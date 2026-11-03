/* Isolated experiments, using the catalog already defined by mobile.html. */
(() => {
  'use strict';
  const source=document.getElementById('identity-demo-script').src;
  const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('identidade-demo.css',source).href;document.head.append(style);
  const fonts=document.createElement('link');fonts.rel='stylesheet';fonts.href='https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Baloo+2:wght@700;800&family=Lilita+One&display=swap';document.head.append(fonts);
  const categories=CATEGORIAS;
  const base='https://storage.googleapis.com/pompom-produtos/';
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let section,category='roupas',position=0,variant=2,opener;
  const detail=document.createElement('dialog');detail.className='id-detail';detail.setAttribute('aria-labelledby','id-detail-title');
  detail.innerHTML='<div class="id-detail-bar"><strong id="id-detail-title">Produto</strong><button class="id-detail-close" type="button" aria-label="Fechar foto ampliada">×</button></div><div class="id-image-area"><img class="id-detail-image" alt=""></div><div class="id-detail-tools"><div class="id-zoom"><label for="id-zoom-range">Zoom</label><input id="id-zoom-range" type="range" min="1" max="3" step=".25" value="1"><output for="id-zoom-range">100%</output></div><p class="id-detail-category"></p><p>Fotos do catálogo atual. Consulte cores, tamanhos e disponibilidade com a equipe.</p><a class="id-whatsapp" target="_blank" rel="noopener noreferrer">Consultar este produto no WhatsApp ↗</a></div>';
  document.body.append(detail);
  const zoom=detail.querySelector('input'),image=detail.querySelector('img'),area=detail.querySelector('.id-image-area');
  zoom.oninput=()=>{image.style.width=(Number(zoom.value)*100)+'%';image.style.maxWidth='none';detail.querySelector('output').textContent=Math.round(Number(zoom.value)*100)+'%';};
  function close(){detail.close();}
  detail.querySelector('button').onclick=close;
  detail.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true});});
  function open(file,button){
    opener=button;
    const ref=file.replace(/\.[^.]+$/,'');
    detail.querySelector('#id-detail-title').textContent='Referência '+ref;
    detail.querySelector('.id-detail-category').textContent=categories[category].nome;
    image.src=base+encodeURIComponent(file);image.alt=categories[category].nome+' — referência '+ref;
    image.style.width='100%';image.style.maxWidth='none';zoom.value='1';detail.querySelector('output').textContent='100%';area.scrollTo(0,0);
    detail.querySelector('a').href='https://wa.me/5511947266216?text='+encodeURIComponent('Olá! Quero saber mais sobre o produto '+ref+' da Lojinha PomPom Pet.');
    detail.showModal();document.body.style.overflow='hidden';detail.querySelector('button').focus();
  }
  function shop(){
    section.className=variant===1?'id-circle':variant===3?'id-immersive':'id-square';
    const list=categories[category].files;
    const files=variant===3?[list[position]]:list;
    section.innerHTML='<div class="id-eyebrow">Lojinha PomPom · Experimento '+variant+'</div><h2 class="id-title">Mimos para seu pet.</h2><p class="id-description">Explore as categorias. Toque no produto para ver a foto grande antes de consultar.</p><div class="id-categories" aria-label="Categorias"></div><div class="id-grid"></div><div class="id-navigation"></div><p class="id-note">Prévia com produtos reais do catálogo. Fotos sem recorte nos cards; nenhum preço ou estoque foi acrescentado.</p>';
    const tabs=section.querySelector('.id-categories');
    for(const [key,cat]of Object.entries(categories)){const b=document.createElement('button');b.type='button';b.textContent=cat.emoji+' '+cat.nome;b.setAttribute('aria-pressed',String(category===key));b.onclick=()=>{category=key;position=0;shop();section.querySelectorAll('.id-categories button')[Object.keys(categories).indexOf(key)].focus({preventScroll:true});};tabs.append(b);}
    const grid=section.querySelector('.id-grid');
    for(const file of files){
      const b=document.createElement('button');b.type='button';b.className='id-product';b.setAttribute('aria-label','Ampliar produto '+file.replace(/\.[^.]+$/,''));b.innerHTML='<img src="'+base+encodeURIComponent(file)+'" alt="" width="300" height="300" loading="lazy" decoding="async"><strong>Ref. '+escape(file.replace(/\.[^.]+$/,''))+'</strong><small>Ver detalhes ↗</small>';b.onclick=()=>open(file,b);grid.append(b);
    }
    if(variant===3){
      const nav=section.querySelector('.id-navigation');nav.className='id-nav';nav.innerHTML='<button type="button" aria-label="Produto anterior">←</button><span>'+ (position+1)+' de '+list.length+' produtos</span><button type="button" aria-label="Próximo produto">→</button>';
      const buttons=nav.querySelectorAll('button');buttons.forEach((button,i)=>{button.onclick=()=>{position=(position+(i?1:-1)+list.length)%list.length;shop();section.querySelectorAll('.id-nav button')[i].focus({preventScroll:true});};});
    }
    window.scrollTo(0,0);
  }
  window.PomPomIdentidade={render(part,option){
    variant=option;document.body.classList.add('identity-demo');
    if(part==='marca'){
      document.body.classList.add('brand-demo','brand-'+option);
      document.querySelectorAll('.nav-brand-pill').forEach(el=>{el.innerHTML='PomPom <span class="brand-pet">Pet</span>';});
      document.querySelectorAll('.nav-brand-sub').forEach(el=>{el.textContent='ESTÉTICA ANIMAL';});
      document.querySelector('#mobile-menu-trigger').onclick=()=>openMenu();
    }else{
      section=document.createElement('section');section.id='identity-section';document.body.prepend(section);shop();
    }
    window.scrollTo(0,0);
  }};
})();
