// Força o topo ao recarregar
  window.scrollTo(0, 0);

  // ── MENU ──
  let menuOpener;
  function openMenu(trigger = document.getElementById('mobile-menu-trigger')) {
    menuOpener = trigger;
    document.querySelector('.menu-panel').style.top = Math.max(16, trigger.getBoundingClientRect().bottom + 12) + 'px';
    document.getElementById('side-menu').classList.add('open');
    document.body.style.overflow = 'hidden';
    document.querySelectorAll('[aria-controls="side-menu"]').forEach(button => button.setAttribute('aria-expanded', 'true'));
    document.querySelector('.halloween-menu-close').focus();
  }
  function closeMenu() {
    document.getElementById('side-menu').classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('[aria-controls="side-menu"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
    menuOpener?.focus({ preventScroll: true });
  }
  document.getElementById('side-menu').addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
    if (event.key !== 'Tab') return;
    const focusable = [...document.querySelectorAll('.menu-panel a, .menu-panel button')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  // ── STICKY HEADER: esconde no hero, aparece ao rolar ──
  const stickyHdr = document.getElementById('sticky-hdr');
  const heroSection = document.getElementById('inicio');
  const observer = new IntersectionObserver(([e]) => {
    stickyHdr.style.display = e.isIntersecting ? 'none' : 'flex';
  }, { threshold: 0.1 });
  observer.observe(heroSection);
  stickyHdr.style.display = 'none'; // escondido no início

  // ── FADE-UP ──
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

  // ── BEFORE/AFTER SLIDER ──
  const baRange   = document.getElementById('ba-range');
  const baOverlay = document.getElementById('ba-overlay');
  const baDivider = document.getElementById('ba-divider');
  if (baRange && baOverlay && baDivider) {
    baRange.addEventListener('input', e => {
      const pct = e.target.value;
      baOverlay.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      baDivider.style.left = pct + '%';
    });
  }

  // ── LOJINHA MODAL ──
  const CATEGORIAS = {
    roupas:     { nome:"Roupas",           emoji:"👗", files:["C-20.jpeg","C-62.jpeg","C-81 G.jpeg","C-83 G.jpeg","C-85 G.jpeg","C-86 G.jpeg","C-88-M.jpeg","CD-37 tubarão.JPEG","FZ-02.jpeg","FZ-11.jpeg","FZ-12.JPEG","FZ-23.jpeg","FZ-28.jpeg","FZ-38.jpeg","PJCQ420.jpeg","PJCQ693.jpeg","PJCQ839.jpeg","PJCQ846.jpeg","PJDC078.jpeg","JK111.jpeg","X-205.jpeg","X-206.jpeg","X-244 M.jpeg"] },
    guias:      { nome:"Guias & Peitorais",emoji:"🦮", files:["A0020.jpeg","A0033.jpeg","A0035.jpeg","A0040.jpeg","A0113.jpeg","BL-511.jpeg","BL-8001.jpeg","FP63178-5.jpeg","JS-033.jpeg","Z0001.jpeg","Z0005.jpeg"] },
    brinquedos: { nome:"Brinquedos",       emoji:"🎾", files:["bolinha.jpg","CJ-20.jpeg","Wj-25.jpeg","WJ-28-P.jpeg","WJ-42.jpeg","WJ-45.jpeg","Wj-48.jpeg","WJ-49.jpeg","WJ-50.jpeg","WJ-51.jpeg","W26.JPEG","W28.jpeg"] },
    caminhas:   { nome:"Caminhas",         emoji:"🏠", files:["BD-10-M.jpeg","BD-12-13-14 P.png"] },
    comedouros: { nome:"Comedouros",       emoji:"🍽️", files:["W-59.jpeg","CWW-PT.jpeg"] },
    acessorios: { nome:"Acessórios",       emoji:"🎀", files:["HR2.jpeg","HR49.jpeg","chapeu.jpeg","FJ-003.jpeg","DYZ00109.jpeg","YJ-10.jpeg","JJ-006.jpeg"] },
    mochilas:   { nome:"Mochilas",         emoji:"🎒", files:["Y-04.jpeg","y-17.jpeg","Y-57.jpeg","Y-62.jpeg","Y-66.jpeg","y-9.jpeg"] }
  };
  let _catAtiva = 'roupas';

  function _bolinha(f) {
    return window.PomPomCatalogo.card(f);
  }

  function mostrarCategoria(key) {
    _catAtiva = key;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('ativa', t.dataset.cat === key));
    const grid = document.getElementById('lojinha-grid');
    grid.scrollTop = 0;
    const files = [...CATEGORIAS[key].files].sort(() => Math.random() - 0.5);
    grid.innerHTML = files.map(_bolinha).join('');
  }

  function abrirLojinha() {
    const overlay = document.getElementById('lojinha-overlay');
    const sheet   = document.getElementById('lojinha-sheet');
    const cats    = document.getElementById('lojinha-cats');
    cats.innerHTML = Object.entries(CATEGORIAS).map(([k, c]) =>
      `<button class="cat-tab${k===_catAtiva?' ativa':''}" data-cat="${k}" data-site-action="category-mobile">${c.emoji} ${c.nome}</button>`
    ).join('');
    mostrarCategoria(_catAtiva);
    overlay.style.display = 'block';
    sheet.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => sheet.classList.add('aberto'));
  }

  function fecharLojinha() {
    const sheet = document.getElementById('lojinha-sheet');
    sheet.classList.remove('aberto');
    setTimeout(() => {
      document.getElementById('lojinha-overlay').style.display = 'none';
      sheet.style.display = 'none';
      document.body.style.overflow = '';
    }, 350);
  }

  // ── LIGHTBOX (mobile) ──
  function openLightbox(src) {
    document.getElementById('lightbox-m-img').src = src;
    document.getElementById('lightbox-m').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightboxM() {
    document.getElementById('lightbox-m').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── GALERIA COM ABAS (mobile) ──
  const GALERIA_M_DADOS = {
    halloween: {
      label: '🎃 Halloween', cor: '#f97316',
      fotos: [
        'fotos/datas-comemorativas/halloween/princiapal.jpg',
        'fotos/datas-comemorativas/halloween/principal_2.JPG',
        'fotos/datas-comemorativas/halloween/principal_3.JPG',
        'fotos/datas-comemorativas/halloween/1b9ea046-b68c-4c54-bbcd-0beeeccd3ec3.jpg',
        'fotos/datas-comemorativas/halloween/6e675108-81c1-4856-bf18-653f1948833e.jpg',
        'fotos/datas-comemorativas/halloween/98172b84-3337-4978-b0c3-e76d58025b69.jpg',
        'fotos/datas-comemorativas/halloween/a6906787-43a0-4f2d-be25-b2ac19800553.jpg',
        'fotos/datas-comemorativas/halloween/e29b8fd6-f43a-4288-aaaf-b106330726b7.jpg',
        'fotos/datas-comemorativas/halloween/fb29afc2-8ef2-4187-a9ac-a3692df2ec28.jpg',
        'fotos/datas-comemorativas/halloween/fcacc484-8166-434e-997a-239a124c74b0.jpg',
        'fotos/datas-comemorativas/halloween/IMG_4013.JPG',
        'fotos/datas-comemorativas/halloween/IMG_4076.JPG',
        'fotos/datas-comemorativas/halloween/IMG_4122.JPG',
        'fotos/datas-comemorativas/halloween/IMG_4202.JPG',
        'fotos/datas-comemorativas/halloween/IMG_4359.JPG',
      ]
    },
    natal: {
      label: '🎄 Natal', cor: '#16a34a',
      fotos: [
        'fotos/datas-comemorativas/natal/principal.jpg',
        'fotos/datas-comemorativas/natal/principal1.jpg',
        'fotos/datas-comemorativas/natal/principal2.jpg',
        'fotos/datas-comemorativas/natal/principal3.jpg',
        'fotos/datas-comemorativas/natal/principal5.PNG',
        'fotos/datas-comemorativas/natal/principal6.PNG',
        'fotos/datas-comemorativas/natal/principal8.PNG',
        'fotos/datas-comemorativas/natal/principal9.PNG',
        'fotos/datas-comemorativas/natal/principal10.JPG',
        'fotos/datas-comemorativas/natal/155e0700-0908-4f34-bb2a-6fd3286b7a0a.jpg',
        'fotos/datas-comemorativas/natal/18bf052b-53e7-4fe8-a07c-a15f02c6dec9.jpg',
        'fotos/datas-comemorativas/natal/292a23ca-634f-47c6-89a7-d5cf76dac580.jpg',
        'fotos/datas-comemorativas/natal/87aac4ca-87cd-4aab-a735-b385b6ffd7b4.jpg',
        'fotos/datas-comemorativas/natal/DSC_9119.jpeg',
        'fotos/datas-comemorativas/natal/efb994a8-7c5a-45dc-ae0f-68098073a75e.jpg',
        'fotos/datas-comemorativas/natal/IMG_6443.PNG',
        'fotos/datas-comemorativas/natal/IMG_6444.PNG',
      ]
    },
    pascoa: {
      label: '🐣 Páscoa', cor: '#a855f7',
      fotos: [
        'fotos/datas-comemorativas/pascoa/principal.png',
        'fotos/datas-comemorativas/pascoa/principal_1.PNG',
        'fotos/datas-comemorativas/pascoa/principal_2.PNG',
        'fotos/datas-comemorativas/pascoa/princiapl_3.PNG',
        'fotos/datas-comemorativas/pascoa/principal_4.png',
        'fotos/datas-comemorativas/pascoa/1F32B19F-2487-48AF-8219-DE48172F1C1B.png',
        'fotos/datas-comemorativas/pascoa/77F23C0B-BE66-41EC-AF4D-23A8047522D5.png',
        'fotos/datas-comemorativas/pascoa/84C330E9-76F7-441C-9676-AB0E6EB3BDBD.png',
        'fotos/datas-comemorativas/pascoa/97788919-5714-4208-8106-5320C83EECF7.png',
        'fotos/datas-comemorativas/pascoa/A1961E08-FBD5-4FB5-A8D8-AF9747AF9B4A.png',
        'fotos/datas-comemorativas/pascoa/FE9FB7FF-BC03-46A7-8748-C16A41B9025F.png',
        'fotos/datas-comemorativas/pascoa/IMG_1567.PNG',
        'fotos/datas-comemorativas/pascoa/IMG_1637.PNG',
        'fotos/datas-comemorativas/pascoa/IMG_1662.PNG',
        'fotos/datas-comemorativas/pascoa/IMG_1668.PNG',
      ]
    },
    carnaval: {
      label: '🎭 Carnaval', cor: '#7c3aed',
      fotos: [
        'fotos/datas-comemorativas/carnaval/principal.png',
        'fotos/datas-comemorativas/carnaval/principal_1.png',
        'fotos/datas-comemorativas/carnaval/principal_2.png',
        'fotos/datas-comemorativas/carnaval/principal_3.png',
        'fotos/datas-comemorativas/carnaval/175C155A-C257-4C4D-9E57-673F32EB5F62.png',
        'fotos/datas-comemorativas/carnaval/2DCD7B81-3764-4AD6-B087-C7A37F3E2E04.png',
        'fotos/datas-comemorativas/carnaval/44813EB9-9160-4D6E-BE27-1BD338097D1E.png',
        'fotos/datas-comemorativas/carnaval/6C26F3CC-AD97-45FF-8D70-E87B47ECE307.png',
        'fotos/datas-comemorativas/carnaval/95F6A441-D0FD-477B-9336-D093DD026AEF.png',
        'fotos/datas-comemorativas/carnaval/9A18D8C8-5D8F-431F-8687-8CD778639879.png',
        'fotos/datas-comemorativas/carnaval/A3CBB488-88A6-4B81-91E5-72FA2C4080DF.png',
        'fotos/datas-comemorativas/carnaval/F5B8E6E9-7C2A-4900-9842-E74E779E1BFD.png',
        'fotos/datas-comemorativas/carnaval/IMG_8438.PNG',
        'fotos/datas-comemorativas/carnaval/IMG_8456.PNG',
      ]
    }
  };

  const PORTFOLIO_M_FOTOS = [
    'fotos/destaque.jpg',
    'fotos/trabalho1.jpg',
    'fotos/cachorros/D0E2A0A9-A99F-4AFF-97B2-5CD058DDDC0E.jpg',
    'fotos/cachorros/809C6B43-407C-452D-9E9F-3C23FA351005.png',
    'fotos/trabalho4.jpg',
    'fotos/trabalho5.jpg',
    'fotos/cachorros/7E86BC8C-B4D2-4DA1-B7B2-53DB74296FB7.png',
    'fotos/trabalho7.jpg',
    'fotos/trabalho8.jpg',
  ];

  function mudarGaleriaMTab(key) {
    let fotos;
    if (key === 'todas') {
      const grupos = [
        PORTFOLIO_M_FOTOS,
        ...Object.values(GALERIA_M_DADOS).map(d =>
          d.fotos.filter(f => /principal/i.test(f.split('/').pop()))
        )
      ];
      fotos = [];
      const max = Math.max(...grupos.map(g => g.length));
      for (let i = 0; i < max; i++)
        for (const g of grupos) if (i < g.length) fotos.push(g[i]);
    } else {
      fotos = GALERIA_M_DADOS[key].fotos;
    }

    document.querySelectorAll('.galeria-m-tab-btn').forEach(btn => {
      const cor = btn.dataset.tab === 'todas' ? '#be123c' : (GALERIA_M_DADOS[btn.dataset.tab] || {}).cor || '#be123c';
      if (btn.dataset.tab === key) {
        btn.classList.add('ativa');
        btn.style.background = cor; btn.style.borderColor = cor;
        btn.style.color = 'white'; btn.style.boxShadow = `0 4px 14px ${cor}55`;
      } else {
        btn.classList.remove('ativa');
        btn.style.background = 'white'; btn.style.borderColor = cor;
        btn.style.color = cor; btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
      }
    });

    const container = document.getElementById('galeria-m-grid');
    container.innerHTML = '';
    fotos.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'story-card';
      item.style.cssText = `opacity:0;animation:datasItemIn .4s cubic-bezier(.25,.46,.45,.94) ${i*45}ms forwards;`;
      item.innerHTML = `<img src="${src}" alt="" loading="lazy" decoding="async"/>`;
      item.addEventListener('click', () => openLightbox(src));
      container.appendChild(item);
    });
    container.scrollLeft = 0;
    container.closest('.scroll-hint-wrap').classList.remove('scrolled');
  }

  function abrirAlbumDataM(key) {
    mudarGaleriaMTab(key);
    const sec = document.getElementById('galeria');
    window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('galeria-m-grid');
    if (grid) grid.addEventListener('scroll', () => {
      if (grid.scrollLeft > 20) grid.closest('.scroll-hint-wrap').classList.add('scrolled');
    }, { passive: true });
  });

  function _initGaleriaM() {
    const nav = document.getElementById('galeria-m-tabs-nav');
    const todasBtn = `<button class="datas-tab-btn-m galeria-m-tab-btn" data-tab="todas" data-site-action="gallery-mobile" style="color:#be123c;border-color:#be123c;">✨ Todas</button>`;
    const dataBtns = Object.entries(GALERIA_M_DADOS).map(([k, d]) =>
      `<button class="datas-tab-btn-m galeria-m-tab-btn" data-tab="${k}" data-site-action="gallery-mobile" style="color:${d.cor};border-color:${d.cor};">${d.label}</button>`
    ).join('');
    nav.innerHTML = todasBtn + dataBtns;
    mudarGaleriaMTab('halloween');
  }
  document.addEventListener('DOMContentLoaded', _initGaleriaM);
