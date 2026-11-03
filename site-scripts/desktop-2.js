// ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    navbar.classList.toggle('scrolled', scrolled);
  });

  // ── PARALLAX ──
  const heroBg = document.getElementById('hero-bg');
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
  });

  // ── REVEAL ──
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revObs.observe(el));

  // ── LIGHTBOX ──
  function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); fecharLojinha(); }
  });

  // ── LOJINHA MODAL ──
  const CATEGORIAS_D = {
    roupas:     { nome:"Roupas",           emoji:"👗", files:["C-20.jpeg","C-62.jpeg","C-81 G.jpeg","C-83 G.jpeg","C-85 G.jpeg","C-86 G.jpeg","C-88-M.jpeg","CD-37 tubarão.JPEG","FZ-02.jpeg","FZ-11.jpeg","FZ-12.JPEG","FZ-23.jpeg","FZ-28.jpeg","FZ-38.jpeg","PJCQ420.jpeg","PJCQ693.jpeg","PJCQ839.jpeg","PJCQ846.jpeg","PJDC078.jpeg","JK111.jpeg","X-205.jpeg","X-206.jpeg","X-244 M.jpeg"] },
    guias:      { nome:"Guias & Peitorais",emoji:"🦮", files:["A0020.jpeg","A0033.jpeg","A0035.jpeg","A0040.jpeg","A0113.jpeg","BL-511.jpeg","BL-8001.jpeg","FP63178-5.jpeg","JS-033.jpeg","Z0001.jpeg","Z0005.jpeg"] },
    brinquedos: { nome:"Brinquedos",       emoji:"🎾", files:["bolinha.jpg","CJ-20.jpeg","Wj-25.jpeg","WJ-28-P.jpeg","WJ-42.jpeg","WJ-45.jpeg","Wj-48.jpeg","WJ-49.jpeg","WJ-50.jpeg","WJ-51.jpeg","W26.JPEG","W28.jpeg"] },
    caminhas:   { nome:"Caminhas",         emoji:"🏠", files:["BD-10-M.jpeg","BD-12-13-14 P.png"] },
    comedouros: { nome:"Comedouros",       emoji:"🍽️", files:["W-59.jpeg","CWW-PT.jpeg"] },
    acessorios: { nome:"Acessórios",       emoji:"🎀", files:["HR2.jpeg","HR49.jpeg","chapeu.jpeg","FJ-003.jpeg","DYZ00109.jpeg","YJ-10.jpeg","JJ-006.jpeg"] },
    mochilas:   { nome:"Mochilas",         emoji:"🎒", files:["Y-04.jpeg","y-17.jpeg","Y-57.jpeg","Y-62.jpeg","Y-66.jpeg","y-9.jpeg"] }
  };
  let _catAtivaD = 'roupas';

  function _cardDesktop(f) {
    return window.PomPomCatalogo.card(f);
  }

  function mostrarCategoriaD(key) {
    _catAtivaD = key;
    document.querySelectorAll('.cat-tab-d').forEach(t => t.classList.toggle('ativa', t.dataset.cat === key));
    const grid = document.getElementById('lojinha-grid-d');
    grid.scrollTop = 0;
    const files = [...CATEGORIAS_D[key].files].sort(() => Math.random() - 0.5);
    grid.innerHTML = files.map(_cardDesktop).join('');
  }

  function abrirLojinha() {
    const overlay = document.getElementById('lojinha-overlay');
    const modal   = document.getElementById('lojinha-modal');
    const cats    = document.getElementById('lojinha-cats-d');
    cats.innerHTML = Object.entries(CATEGORIAS_D).map(([k, c]) =>
      `<button class="cat-tab-d${k===_catAtivaD?' ativa':''}" data-cat="${k}" data-site-action="category">${c.emoji} ${c.nome}</button>`
    ).join('');
    mostrarCategoriaD(_catAtivaD);
    overlay.style.display = 'block';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => modal.classList.add('aberto'));
  }

  function fecharLojinha() {
    const modal = document.getElementById('lojinha-modal');
    modal.classList.remove('aberto');
    setTimeout(() => {
      document.getElementById('lojinha-overlay').style.display = 'none';
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // ── GALERIA COM ABAS ──
  const GALERIA_POR_DATA = {
    halloween: {
      label: '🎃 Halloween',
      cor: '#f97316',
      fotos: [
        { src: 'fotos/datas-comemorativas/halloween/princiapal.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/principal_2.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/principal_3.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/1b9ea046-b68c-4c54-bbcd-0beeeccd3ec3.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/6e675108-81c1-4856-bf18-653f1948833e.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/98172b84-3337-4978-b0c3-e76d58025b69.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/a6906787-43a0-4f2d-be25-b2ac19800553.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/e29b8fd6-f43a-4288-aaaf-b106330726b7.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/fb29afc2-8ef2-4187-a9ac-a3692df2ec28.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/fcacc484-8166-434e-997a-239a124c74b0.jpg', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4013.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4014.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4076.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4122.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4202.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4226.JPG', alt: '🎃 Halloween' },
        { src: 'fotos/datas-comemorativas/halloween/IMG_4359.JPG', alt: '🎃 Halloween' },
      ]
    },
    natal: {
      label: '🎄 Natal',
      cor: '#16a34a',
      fotos: [
        { src: 'fotos/datas-comemorativas/natal/principal.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal1.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal2.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal3.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal5.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal6.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal8.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal9.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/principal10.JPG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/155e0700-0908-4f34-bb2a-6fd3286b7a0a.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/18bf052b-53e7-4fe8-a07c-a15f02c6dec9.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/292a23ca-634f-47c6-89a7-d5cf76dac580.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/3346edf6-1359-464b-92a2-87eba084c71a.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/3db7c8b8-bb97-4659-b8b7-8de531f33ee4.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/7623a695-f944-41a7-b820-31d8bc5bd756.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/87aac4ca-87cd-4aab-a735-b385b6ffd7b4.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/92b2ac2a-0ed0-4cd9-a87c-d55bdcd85d13.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/A2872DFB-64E7-4A76-B467-91A17C092932.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/c94ae3d8-de41-45cd-aeb7-e24564ad12fd.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/DSC_9119.jpeg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/EE7F70E8-7463-4DE2-A326-5FF312B293FE.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/efb994a8-7c5a-45dc-ae0f-68098073a75e.jpg', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/IMG_6443.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/IMG_6444.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/IMG_6584.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/IMG_6719.PNG', alt: '🎄 Natal' },
        { src: 'fotos/datas-comemorativas/natal/IMG_6772.PNG', alt: '🎄 Natal' },
      ]
    },
    pascoa: {
      label: '🐣 Páscoa',
      cor: '#a855f7',
      fotos: [
        { src: 'fotos/datas-comemorativas/pascoa/principal.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/principal_1.PNG', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/principal_2.PNG', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/princiapl_3.PNG', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/principal_4.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/1F32B19F-2487-48AF-8219-DE48172F1C1B.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/77F23C0B-BE66-41EC-AF4D-23A8047522D5.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/7E86BC8C-B4D2-4DA1-B7B2-53DB74296FB7.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/809C6B43-407C-452D-9E9F-3C23FA351005.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/84C330E9-76F7-441C-9676-AB0E6EB3BDBD.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/97788919-5714-4208-8106-5320C83EECF7.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/9c216b7f-f8ff-4973-92a0-8eac234713f1.jpg', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/A1961E08-FBD5-4FB5-A8D8-AF9747AF9B4A.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/FE9FB7FF-BC03-46A7-8748-C16A41B9025F.png', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/IMG_1567.PNG', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/IMG_1637.PNG', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/IMG_1662.PNG', alt: '🐣 Páscoa' },
        { src: 'fotos/datas-comemorativas/pascoa/IMG_1668.PNG', alt: '🐣 Páscoa' },
      ]
    },
    carnaval: {
      label: '🎭 Carnaval',
      cor: '#7c3aed',
      fotos: [
        { src: 'fotos/datas-comemorativas/carnaval/principal.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/principal_1.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/principal_2.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/principal_3.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/175C155A-C257-4C4D-9E57-673F32EB5F62.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/2DCD7B81-3764-4AD6-B087-C7A37F3E2E04.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/44813EB9-9160-4D6E-BE27-1BD338097D1E.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/6C26F3CC-AD97-45FF-8D70-E87B47ECE307.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/6FF73396-1F0C-4659-9D84-D630D4A67FEE.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/95F6A441-D0FD-477B-9336-D093DD026AEF.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/9A18D8C8-5D8F-431F-8687-8CD778639879.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/A3CBB488-88A6-4B81-91E5-72FA2C4080DF.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/F5B8E6E9-7C2A-4900-9842-E74E779E1BFD.png', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/IMG_8438.PNG', alt: '🎭 Carnaval' },
        { src: 'fotos/datas-comemorativas/carnaval/IMG_8456.PNG', alt: '🎭 Carnaval' },
      ]
    }
  };

  const PORTFOLIO_FOTOS = [
    { src: 'fotos/destaque.jpg', alt: '🐾 Shih Tzu' },
    { src: 'fotos/trabalho1.jpg', alt: '🦊 Spitz Alemão' },
    { src: 'fotos/cachorros/D0E2A0A9-A99F-4AFF-97B2-5CD058DDDC0E.jpg', alt: '🐕 Husky Siberiano' },
    { src: 'fotos/cachorros/809C6B43-407C-452D-9E9F-3C23FA351005.png', alt: '🐕 Lhasa Apso' },
    { src: 'fotos/trabalho4.jpg', alt: '👑 Shih Tzu' },
    { src: 'fotos/trabalho5.jpg', alt: '🌟 Golden Retriever' },
    { src: 'fotos/cachorros/7E86BC8C-B4D2-4DA1-B7B2-53DB74296FB7.png', alt: '🐕 Pug' },
    { src: 'fotos/trabalho7.jpg', alt: '🐩 Poodle' },
    { src: 'fotos/trabalho8.jpg', alt: '😊 Maltês' },
  ];

  let _galeriaAtivaKey = 'todas';

  function mudarGaleriaTab(key) {
    _galeriaAtivaKey = key;
    let fotos;
    if (key === 'todas') {
      const grupos = [
        PORTFOLIO_FOTOS,
        ...Object.values(GALERIA_POR_DATA).map(d =>
          d.fotos.filter(f => /principal/i.test(f.src.split('/').pop()))
        )
      ];
      fotos = [];
      const max = Math.max(...grupos.map(g => g.length));
      for (let i = 0; i < max; i++)
        for (const g of grupos) if (i < g.length) fotos.push(g[i]);
    } else {
      fotos = GALERIA_POR_DATA[key].fotos;
    }

    document.querySelectorAll('.galeria-tab-btn').forEach(btn => {
      const cor = btn.dataset.tab === 'todas' ? '#be123c' : (GALERIA_POR_DATA[btn.dataset.tab] || {}).cor || '#be123c';
      if (btn.dataset.tab === key) {
        btn.classList.add('ativa');
        btn.style.background = cor;
        btn.style.borderColor = cor;
        btn.style.color = 'white';
        btn.style.boxShadow = `0 6px 22px ${cor}55`;
      } else {
        btn.classList.remove('ativa');
        btn.style.background = 'white';
        btn.style.borderColor = cor;
        btn.style.color = cor;
        btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
      }
    });

    const container = document.getElementById('galeria-masonry');
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'masonry';
    fotos.forEach((foto, i) => {
      const item = document.createElement('div');
      item.className = 'masonry-item';
      item.style.cssText = `opacity:0;animation:datasItemIn 0.45s cubic-bezier(.25,.46,.45,.94) ${i * 50}ms forwards;`;
      item.innerHTML = `<img src="${foto.src}" alt="${foto.alt}" loading="lazy" decoding="async" /><div class="overlay"><span>${foto.alt}</span></div>`;
      item.addEventListener('click', () => openLightbox(foto.src));
      grid.appendChild(item);
    });
    container.appendChild(grid);

    const wrap = container.closest('.galeria-grid-wrap');
    if (wrap) wrap.scrollTop = 0;
  }

  function abrirAlbumData(key) {
    mudarGaleriaTab(key);
    const sec = document.getElementById('galeria');
    const y = sec.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function _initGaleria() {
    const nav = document.getElementById('galeria-tabs-nav');
    const todasBtn = `<button class="datas-tab-btn galeria-tab-btn" data-tab="todas" data-site-action="gallery" style="color:#be123c;border-color:#be123c;">✨ Todas</button>`;
    const dataBtns = Object.entries(GALERIA_POR_DATA).map(([key, d]) =>
      `<button class="datas-tab-btn galeria-tab-btn" data-tab="${key}" data-site-action="gallery" style="color:${d.cor};border-color:${d.cor};">${d.label}</button>`
    ).join('');
    nav.innerHTML = todasBtn + dataBtns;
    mudarGaleriaTab('halloween');
  }
  document.addEventListener('DOMContentLoaded', _initGaleria);
