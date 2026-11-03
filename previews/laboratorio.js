(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let theme = ['normal', 'halloween'].includes(params.get('theme')) ? params.get('theme') : 'halloween';
  let data, variant = 1;
  let artData, artSlug = params.get('art') || 'aquarela', artSaved = 'aquarela';
  const artKey = 'pompom:art-studies:2026:v1';
  try { artSaved = localStorage.getItem(artKey) || 'aquarela'; if (!params.has('art')) artSlug = artSaved; } catch (_) {}
  if (['site','studies','arts'].includes(params.get('view'))) $('content').value = params.get('view');
  let choices = {};
  const storageKey = 'pompom:layout-studies:2026:v1';
  try { choices = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) {}
  const frame = $('site');
  const stage = document.querySelector('.stage');
  let expanded = false;
  function expandedState(value) {
    expanded = value;
    stage.classList.toggle('phone-fullscreen', value);
    document.querySelectorAll('.lab-header,.lab-intro,.controls,.context').forEach(node => { node.inert = value; });
    $('fullscreen-phone').setAttribute('aria-pressed', String(value));
    $('fullscreen-phone').textContent = value ? '✕ Voltar ao laboratório' : '⛶ Ampliar celular';
    sizePhone();
  }
  async function exitPhoneFullscreen() {
    if (document.fullscreenElement === stage) await document.exitFullscreen();
    expandedState(false);
    $('fullscreen-phone').focus({preventScroll:true});
  }
  $('fullscreen-phone').addEventListener('click', async () => {
    if (expanded) { await exitPhoneFullscreen(); return; }
    expandedState(true);
    try { if (stage.requestFullscreen) await stage.requestFullscreen(); } catch (_) { /* A moldura ampliada funciona também sem fullscreen nativo. */ }
    sizePhone();
  });
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement !== stage && expanded) expandedState(false);
    else sizePhone();
  });
  const escapeExpanded = event => {
    if (event.key === 'Escape' && expanded && !document.fullscreenElement) {
      event.preventDefault(); exitPhoneFullscreen();
    }
  };
  document.addEventListener('keydown', escapeExpanded);
  const allowedSections = [...$('section').options].map(option => option.value);
  if (allowedSections.includes(params.get('section'))) $('section').value = params.get('section');
  if (['auto','none','halloween'].includes(params.get('opening'))) $('opening').value = params.get('opening');

  function mobileURL(embedded = true) {
    const url = new URL('../mobile.html', location.href);
    url.searchParams.set('previewThemes', '1');
    url.searchParams.set('theme', theme);
    url.searchParams.set('opening', $('opening').value);
    if (embedded) url.searchParams.set('previewEmbedded', '1');
    if (theme === 'normal' || $('section').value !== 'inicio') url.searchParams.set('intro', 'off');
    url.searchParams.set('v', '20261004-4');
    if (!['inicio','menu','catalogo'].includes($('section').value)) url.hash = $('section').value;
    return url;
  }
  function sizePhone() {
    const [width, height] = $('device').value.split('x').map(Number);
    const availableWidth = stage.clientWidth || innerWidth - 32;
    const chrome = expanded ? 128 : 94;
    const availableHeight = Math.max(1, (stage.clientHeight || innerHeight - (expanded ? 0 : 250)) - chrome);
    const scale = Math.min(expanded ? 2 : 1, (availableWidth - (expanded ? 24 : 0)) / (width + 24), availableHeight / (height + 24));
    $('phone-sizer').style.width = (width + 24) * scale + 'px';
    $('phone-sizer').style.height = (height + 24) * scale + 'px';
    $('phone').style.width = width + 24 + 'px';
    $('phone').style.transform = 'scale(' + scale + ')';
    $('screen').style.width = width + 'px';
    $('screen').style.height = height + 'px';
  }
  function loadSite() {
    if (theme === 'normal') $('opening').value = 'none';
    $('opening').disabled = theme === 'normal';
    $('site-controls').hidden = false; $('study-controls').hidden = true;
    $('art-controls').hidden = true; frame.dataset.previewMode = 'site';
    $('stitch-project').href = 'https://stitch.google.com/projects/3957235714949665270';
    frame.hidden = false; $('study-screen').hidden = true; $('prototype-link').hidden = true;
    document.querySelectorAll('[data-theme]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
    const label = theme === 'normal' ? 'Normal' : 'Halloween';
    $('preview-label').textContent = label + ' · ' + $('section').selectedOptions[0].textContent;
    $('context-title').textContent = label;
    $('context-description').textContent = theme === 'normal' ? 'A identidade permanente da PomPom: rosa, fundo claro e o cuidado de sempre.' : 'Campanha com aquarela, teias e morcegos. A abertura segue a opção escolhida.';
    $('status').textContent = 'Carregando a página…';
    $('open-mobile').href = mobileURL(false).href;
    const desktop = new URL('../desktop.html', location.href);
    desktop.searchParams.set('previewThemes','1'); desktop.searchParams.set('theme',theme); $('open-desktop').href = desktop.href;
    const share = new URL(location.href); share.searchParams.set('view','site'); share.searchParams.set('theme',theme); share.searchParams.set('opening',$('opening').value); share.searchParams.set('section',$('section').value);
    history.replaceState(null,'',share);
    frame.src = mobileURL().href;
  }
  function loadStudy() {
    $('site-controls').hidden = true; $('study-controls').hidden = false;
    $('art-controls').hidden = true; frame.dataset.previewMode = 'studies';
    $('stitch-project').href = 'https://stitch.google.com/projects/3957235714949665270';
    $('prototype-link').textContent = 'Abrir protótipo desta opção ↗';
    const share = new URL(location.href); share.searchParams.set('view','studies'); history.replaceState(null,'',share);
    frame.hidden = true; frame.removeAttribute('src'); $('study-screen').hidden = false;
    if (!data) { $('status').textContent = 'Os estudos ainda estão carregando.'; return; }
    const part = data.parts.find(item => item.slug === $('study-part').value) || data.parts[0];
    variant = Math.min(part.options.length, Math.max(1, variant));
    const option = part.options[variant - 1];
    $('variants').replaceChildren(...part.options.map((item, i) => {
      const button = document.createElement('button'); button.type = 'button';
      button.textContent = (i + 1) + ' · ' + item.title; button.setAttribute('aria-pressed', String(i + 1 === variant));
      button.addEventListener('click', () => { variant = i + 1; loadStudy(); }); return button;
    }));
    $('study-image').src = new URL(option.image, new URL('halloween/', location.href)).href;
    $('study-image').alt = part.title + ' · opção ' + variant + ' · ' + option.title;
    $('study-screen').scrollTop = 0;
    $('preview-label').textContent = part.title + ' · opção ' + variant;
    $('context-title').textContent = option.title; $('context-description').textContent = part.description;
    $('choose').textContent = (choices[part.slug] || part.approvedOption) === variant ? 'Opção escolhida ✓' : 'Escolher esta opção';
    $('prototype-link').href = new URL(option.html, new URL('halloween/', location.href)).href; $('prototype-link').hidden = false;
    $('status').textContent = 'Estudo salvo do Stitch. Para interagir, abra o protótipo desta opção.';
  }
  function applyArt() {
    const image = frame.contentDocument?.querySelector('.halloween-mobile-art img');
    const option = artData?.options.find(item => item.slug === artSlug);
    if (!image || !option) return;
    image.src = new URL('halloween/artes/' + option.slug + '.webp',location.href).href;
    image.alt = 'Cachorro e gato da PomPom — ' + option.name;
    frame.contentWindow.scrollTo({top:0,behavior:'instant'});
    $('status').textContent = 'Arte aplicada à prévia. Amplie o celular para comparar os detalhes.';
  }
  function loadArt() {
    $('site-controls').hidden = true; $('study-controls').hidden = true; $('art-controls').hidden = false;
    frame.hidden = false; $('study-screen').hidden = true;
    if (!artData) { $('status').textContent = 'Carregando os estilos de arte…'; return; }
    const option = artData.options.find(item => item.slug === artSlug);
    $('art-options').replaceChildren(...artData.options.map(item => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'art-option';
      button.setAttribute('aria-pressed',String(item.slug === artSlug));
      const image = document.createElement('img'); image.src = 'halloween/artes/' + item.slug + '.webp'; image.alt = ''; image.width = 44; image.height = 44;
      const name = document.createElement('span'); name.textContent = item.name;
      button.append(image,name); button.addEventListener('click',()=>{artSlug=item.slug;loadArt();});return button;
    }));
    $('choose-art').textContent = artSaved === artSlug ? 'Estilo escolhido ✓' : 'Escolher este estilo';
    $('art-choice').textContent = 'Sua escolha: ' + artData.options.find(item=>item.slug===artSaved).name;
    $('preview-label').textContent = option.name + ' · prévia da arte';
    $('context-title').textContent = option.name; $('context-description').textContent = option.description + ' Exemplos preservados do cachorro e gato no Halloween; usados aqui para comparar o estilo.';
    $('stitch-project').href = 'https://stitch.google.com/projects/' + artData.project + '?node-id=' + option.screen;
    $('prototype-link').href = 'halloween/artes.html#' + option.slug; $('prototype-link').textContent = 'Comparador original de artes ↗'; $('prototype-link').hidden = false;
    const url = new URL('../mobile.html',location.href);
    url.search = '?previewThemes=1&theme=halloween&opening=none&intro=off&previewEmbedded=1&v=20261004-5';
    $('open-mobile').href = 'halloween/artes.html#' + option.slug;
    const desktop = new URL('../desktop.html',location.href); desktop.search = '?previewThemes=1&theme=halloween&v=20261004-5'; $('open-desktop').href = desktop.href;
    const share = new URL(location.href); share.searchParams.set('view','arts'); share.searchParams.set('art',artSlug); history.replaceState(null,'',share);
    if (frame.dataset.previewMode === 'arts' && frame.contentDocument?.querySelector('.halloween-mobile-art img')) applyArt();
    else { frame.dataset.previewMode = 'arts'; frame.src = url.href; }
  }
  function render() {
    const view = $('content').value;
    document.querySelector('.lab-intro h1').textContent = view === 'arts' ? 'O mesmo cachorro e gato. Cinco estilos.' : 'Vamos experimentar?';
    document.querySelector('.lab-intro p').textContent = view === 'arts' ? 'Compare as artes salvas, veja no celular e escolha o estilo para a próxima criação.' : 'Veja o site no celular, compare os temas e reveja as opções de cada parte.';
    if (view === 'arts') loadArt(); else if (view === 'studies') loadStudy(); else loadSite();
    sizePhone();
  }
  frame.addEventListener('load', () => {
    if ($('content').value === 'arts') { frame.contentWindow.addEventListener('keydown',escapeExpanded); applyArt(); return; }
    if ($('content').value !== 'site' || !frame.hasAttribute('src')) return;
    const doc = frame.contentDocument, win = frame.contentWindow;
    win.addEventListener('keydown', escapeExpanded);
    if ($('section').value === 'menu') win.openMenu?.();
    else if ($('section').value === 'catalogo') win.abrirLojinha?.();
    else if ($('section').value !== 'inicio') doc.getElementById($('section').value)?.scrollIntoView({block:'start'});
    $('status').textContent = 'Prévia pronta. Role e toque dentro do celular para testar.';
  });
  document.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => {
    if (theme === 'normal' && button.dataset.theme === 'halloween') $('opening').value = 'auto';
    theme = button.dataset.theme; loadSite();
  }));
  ['content','opening','section'].forEach(id => $(id).addEventListener('change', render));
  $('device').addEventListener('change', sizePhone); addEventListener('resize', sizePhone);
  $('reload').addEventListener('click', render);
  $('study-part').addEventListener('change', () => { const part = data.parts.find(item => item.slug === $('study-part').value); variant = choices[part.slug] || part.approvedOption || 1; loadStudy(); });
  $('choose').addEventListener('click', () => { choices[$('study-part').value] = variant; try { localStorage.setItem(storageKey,JSON.stringify(choices)); } catch (_) {} loadStudy(); });
  $('choose-art').addEventListener('click',()=>{ if (!artData) return; artSaved=artSlug; try {localStorage.setItem(artKey,artSaved);}catch(_){} loadArt(); });
  $('copy').addEventListener('click', async () => {
    if (!data) return;
    const text = (artData ? 'Arte: ' + artData.options.find(item=>item.slug===artSaved).name + '\n' : '') + data.parts.filter(part => choices[part.slug] || part.approvedOption).map(part => {
      const choice = choices[part.slug] || part.approvedOption;
      return part.title + ': opção ' + choice + ' — ' + part.options[choice - 1].title;
    }).join('\n');
    try { await navigator.clipboard.writeText(text); $('status').textContent = 'Escolhas copiadas para enviar na conversa.'; }
    catch (_) { $('copy-fallback').hidden = false; $('copy-fallback').value = text; $('copy-fallback').focus(); $('copy-fallback').select(); }
  });
  fetch('halloween/layouts/estudos.json').then(response => { if (!response.ok) throw new Error('Estudos indisponíveis'); return response.json(); }).then(result => {
    data = result;
    $('study-part').replaceChildren(...data.parts.map(part => { const option = document.createElement('option'); option.value = part.slug; option.textContent = part.title; return option; }));
    if ($('content').value === 'studies') loadStudy();
  }).catch(() => { $('status').textContent = 'Não foi possível carregar os estudos. O site atual continua disponível.'; });
  fetch('arte-estilos.json').then(response=>{if(!response.ok)throw new Error('Artes indisponíveis');return response.json();}).then(result=>{
    artData=result;
    if (!artData.options.some(item=>item.slug===artSaved)) artSaved=artData.approved;
    if (!artData.options.some(item=>item.slug===artSlug)) artSlug=artSaved;
    if ($('content').value === 'arts') loadArt();
  }).catch(()=>{if($('content').value==='arts')$('status').textContent='Não foi possível carregar as artes. Use o comparador original de artes salvas.';});
  render();
})();
