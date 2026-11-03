/* Functional studies only: reuses the live local catalog, never connects Google. */
(() => {
  const script=document.getElementById('experiment-script');
  const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('experimentos.css',script.src).href;document.head.append(style);
  const reviews=[...document.querySelectorAll('.review-box .review-card')].map(card=>({text:card.querySelector('p').textContent.trim().replace(/^"|"$/g,''),name:card.querySelector('.text-xs.font-semibold').textContent.trim(),initials:card.querySelector('.w-8').textContent.trim()}));
  const products=[['C-20.jpeg','Roupinhas'],['A0020.jpeg','Guias & peitorais'],['bolinha.jpg','Brinquedos'],['BD-10-M.jpeg','Caminhas'],['W-59.jpeg','Comedouros'],['Y-04.jpeg','Mochilas'],['HR2.jpeg','Acessórios'],['C-62.jpeg','Mais roupinhas']];
  const storeBase='https://storage.googleapis.com/pompom-produtos/';
  const googleURL='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('PomPom Pet Estética Animal Rua dos Flox 954 Cajamar SP');
  const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let section,reviewIndex=0,activeVariant=1;
  function stats(ratings,total,complete,verified=false){
    const valid=Array.isArray(ratings)&&ratings.every(r=>Number.isInteger(r)&&r>=1&&r<=5);
    const full=valid&&complete&&total>0&&ratings.length===total;
    if(!full)return {ready:false,canClaimAllFive:false};
    const five=ratings.filter(r=>r===5).length,average=ratings.reduce((a,b)=>a+b,0)/total,perfect=five===total;
    const raw=five/total*100;let percentage=raw.toLocaleString('pt-BR',{maximumFractionDigits:1});if(!perfect&&percentage==='100')percentage='>99';
    return {ready:true,total,five,average:average.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}),percentage,perfect,canClaimAllFive:verified&&perfect,counts:[5,4,3,2,1].map(star=>ratings.filter(r=>r===star).length)};
  }
  function reviewHTML(review,index){return `<article class="exp-review"><span class="exp-stars" aria-label="Depoimento cinco estrelas do site atual">★★★★★</span><p>${safe(review.text)}</p><div class="exp-author"><span class="exp-avatar">${safe(review.initials)}</span><div><strong>${safe(review.name)}</strong><small>Depoimento presente no site atual</small></div></div>${activeVariant===2?`<details><summary>Ler depoimento completo</summary><p>${safe(review.text)}</p></details>`:''}</article>`;}
  function reviewAccordion(review){return `<details class="exp-review exp-review-accordion"><summary><span class="exp-avatar">${safe(review.initials)}</span><span><strong>${safe(review.name)}</strong><span class="exp-stars" aria-label="Cinco estrelas">★★★★★</span></span><span class="exp-expand" aria-hidden="true">+</span></summary><p>${safe(review.text)}</p><small>Depoimento presente no site atual</small></details>`;}
  function showShop(variant){
    section.innerHTML=`<div class="exp-eyebrow">Lojinha PomPom</div><h2 class="exp-title">Mimos para<br/>seu <em>melhor amigo.</em></h2><p class="exp-description">O seu catálogo de sempre, com mais produtos à vista e um convite claro para entrar.</p><button type="button" class="exp-shop-card ${variant===2?'exp-square':variant===3?'exp-slider':''}" id="exp-open-store" aria-haspopup="dialog" aria-controls="lojinha-sheet" aria-label="Abrir a lojinha PomPom e ver todos os produtos"><span class="exp-shop-heading"><strong>Conheça nossa lojinha</strong><span class="exp-shop-arrow" aria-hidden="true">↗</span></span><span class="exp-shop-hint">${variant===3?'Deslize para ver mais <span aria-hidden="true">↔</span>':'Toque no card para explorar os produtos'}</span><span class="exp-products">${products.slice(0,variant===3?8:6).map(([file,name])=>`<span class="exp-product"><img src="${storeBase+encodeURIComponent(file)}" alt="${safe(name)} do catálogo PomPom" width="80" height="80" decoding="async"><span>${safe(name)}</span></span>`).join('')}</span><span class="exp-shop-cta">Ver loja completa <small aria-hidden="true">→</small></span></button><p class="exp-footnote">Vitrine demonstrativa com fotos do catálogo atual. O toque abre a loja existente, com suas categorias e produtos. Consulte disponibilidade com a equipe.</p>`;
    const button=document.getElementById('exp-open-store');let dragged=false,start;
    button.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};dragged=false});
    button.addEventListener('pointermove',e=>{if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>10)dragged=true});
    button.addEventListener('pointerup',()=>{start=null});button.addEventListener('pointercancel',()=>{start=null;dragged=true});
    button.onclick=e=>{if(e.detail&&dragged)return;abrirLojinha();requestAnimationFrame(()=>document.querySelector('#lojinha-header button').focus())};
  }
  function showReviews(variant,mode){
    activeVariant=variant;const ratings=mode==='all'?[5,5,5,5,5,5]:mode==='mixed'?[5,5,5,5,5,5,4]:[];
    const aggregate=stats(ratings,ratings.length,mode!=='offline');
    const badge='<span class="exp-demo-badge">Exemplo ilustrativo · Google não conectado</span>';
    const stars='<span class="exp-stars">★★★★★</span>';
    let rating;
    if(!aggregate.ready)rating='<div class="exp-rating-card"><div class="exp-offline">Carinho que vira reconhecimento.<p>Conecte o perfil da empresa para exibir nota, total e distribuição reais. Nenhum percentual é afirmado enquanto os dados não estiverem completos.</p></div></div>';
    else if(variant===3)rating=`<div class="exp-rating-card exp-merit">${badge}<div class="exp-rating-top"><span class="exp-google">Google</span><span>Cenário simulado</span></div><div class="exp-medal" aria-hidden="true">★</div><strong class="exp-percent">${aggregate.percentage}%</strong><p>das avaliações simuladas<br/>com cinco estrelas</p><span class="exp-stars">★★★★★</span><div class="exp-distribution">${aggregate.counts.map((count,i)=>`<div><span>${5-i} ★</span><span class="track"><span class="fill" style="width:${count/aggregate.total*100}%"></span></span><span>${count}</span></div>`).join('')}</div><p class="exp-footnote">${aggregate.total} avaliações no cenário de teste.<br/>Não equivale a satisfação de todos os atendimentos.</p></div>`;
    else if(variant===2)rating=`<div class="exp-rating-card exp-rating-compact"><div><span class="exp-google">Google · exemplo</span><br/><strong>${aggregate.average}</strong></div><div>${stars}<span>${aggregate.total} avaliações simuladas</span></div></div>`;
    else rating=`<div class="exp-rating-card">${badge}<div class="exp-rating-top"><span class="exp-google">Google</span><span>Reconhecimento & carinho</span></div><div class="exp-rating"><strong>${aggregate.average}</strong><div>${stars}<small>${aggregate.total} avaliações simuladas</small></div></div><h3 class="exp-rating-line">${aggregate.perfect?'Cinco estrelas em cada avaliação.':'O cuidado aparece nas avaliações.'}</h3><p class="exp-footnote">Frase ilustrativa: só será usada no site se o histórico completo e atualizado comprovar esse resultado.</p></div>`;
    section.innerHTML=`<div class="exp-eyebrow">O carinho de quem já conhece</div><h2 class="exp-title">O que dizem<br/>nossos <em>clientes.</em></h2><p class="exp-description">Reconhecimento que merece destaque, com números transparentes e depoimentos fáceis de ler.</p>${variant===2?badge:''}${rating}<div id="exp-reviews" class="exp-reviews ${variant===2?'exp-review-scroll':''}">${variant===1?reviewHTML(reviews[reviewIndex],reviewIndex):reviews.map(variant===3?reviewAccordion:reviewHTML).join('')}</div>${variant===1?'<div class="exp-review-nav"><button type="button" id="exp-prev" aria-label="Depoimento anterior">←</button><span id="exp-position"></span><button type="button" id="exp-next" aria-label="Próximo depoimento">→</button></div>':''}<a class="exp-google-link" href="${googleURL}" target="_blank" rel="noopener noreferrer">Ver perfil no Google <span aria-hidden="true">↗</span></a><p class="exp-footnote">Depoimentos selecionados do site atual, não sincronizados com o Google nesta prévia. A seleção de cinco estrelas não comprova que todas as avaliações ou todos os atendimentos foram cinco estrelas.</p>`;
    if(variant===1){const update=()=>{document.getElementById('exp-reviews').innerHTML=reviewHTML(reviews[reviewIndex],reviewIndex);document.getElementById('exp-position').textContent=`${reviewIndex+1} de ${reviews.length} depoimentos do site`};document.getElementById('exp-prev').onclick=()=>{reviewIndex=(reviewIndex+reviews.length-1)%reviews.length;update()};document.getElementById('exp-next').onclick=()=>{reviewIndex=(reviewIndex+1)%reviews.length;update()};update()}
  }
  document.getElementById('lojinha-sheet').setAttribute('role','dialog');document.getElementById('lojinha-sheet').setAttribute('aria-modal','true');document.getElementById('lojinha-sheet').setAttribute('aria-label','Lojinha PomPom');
  document.getElementById('lojinha-sheet').addEventListener('keydown',e=>{if(e.key==='Escape'){fecharLojinha();document.getElementById('exp-open-store')?.focus()}});
  window.PomPomExperimentos={stats,render(part,variant,mode='all'){
    if(!section){section=document.createElement('section');section.id='experiment-section';document.body.prepend(section)}
    document.body.classList.add('preview-experiment');if(part==='vitrine')showShop(variant);else showReviews(variant,mode);window.scrollTo(0,0);
  }};
})();
