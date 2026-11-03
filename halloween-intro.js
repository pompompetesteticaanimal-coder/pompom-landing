function showHalloweenIntro() {
  'use strict';
  const theme = window.PomPomTheme?.current || document.body.dataset.theme;
  if (theme !== 'halloween') return;
  if (window.PomPomTheme && window.PomPomTheme.opening !== 'halloween') return;
  const mode = new URLSearchParams(location.search).get('intro');
  if (mode === 'off' || typeof HTMLDialogElement === 'undefined') return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const previousFocus = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.className = 'halloween-intro' + (reduced ? ' intro-reduced' : '');
  dialog.setAttribute('aria-labelledby', 'halloween-intro-title');
  dialog.setAttribute('aria-describedby', 'halloween-intro-caption');

  // Personagem próprio: corpinho redondo, asas macias e expressão amigável.
  // Cada desenho tem gradientes próprios para não duplicar IDs no documento.
  const makeBat = index => {
    const id = 'intro-bat-' + index;
    const wing = `<path d="M96 72C73 42 43 28 14 35Q8 36 13 42C29 53 36 66 29 86Q27 94 36 90C48 85 56 91 59 100Q61 107 68 101C78 94 86 99 91 109Q96 117 101 104L110 82Z" fill="url(#${id}-wing)" stroke="#352442" stroke-width="2.5" stroke-linejoin="round"/><path d="M96 72C66 48 42 36 16 38" fill="none" stroke="#d8b5e3" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M95 73Q52 49 32 85M95 73Q66 65 62 99M95 73Q89 89 92 108" fill="none" stroke="#61416f" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`;
    const eyes = index % 5 === 0
      ? '<path d="M102 77Q108 70 114 77M127 77Q133 70 139 77" fill="none" stroke="#211629" stroke-width="3.4" stroke-linecap="round"/>'
      : '<ellipse cx="108" cy="75" rx="8.5" ry="10.5" fill="#211629"/><ellipse cx="132" cy="75" rx="8.5" ry="10.5" fill="#211629"/><ellipse cx="105.5" cy="72" rx="3" ry="3.6" fill="#fff4df"/><ellipse cx="129.5" cy="72" rx="3" ry="3.6" fill="#fff4df"/><circle cx="111" cy="79" r="1.4" fill="#c8b3db"/><circle cx="135" cy="79" r="1.4" fill="#c8b3db"/>';
    return `<svg viewBox="0 0 240 142" aria-hidden="true"><defs><linearGradient id="${id}-wing" x1="0" y1="0" x2="0.2" y2="1"><stop stop-color="#c49bd8"/><stop offset=".55" stop-color="#9a73b0"/><stop offset="1" stop-color="#75548e"/></linearGradient><radialGradient id="${id}-fur" cx=".35" cy=".2" r=".85"><stop stop-color="#9c7daf"/><stop offset=".58" stop-color="#735c89"/><stop offset="1" stop-color="#4a385e"/></radialGradient><linearGradient id="${id}-ear" x2=".4" y2="1"><stop stop-color="#efbac9"/><stop offset="1" stop-color="#b778aa"/></linearGradient></defs><g class="bat-wing">${wing}</g><g class="bat-wing bat-wing-right"><g transform="translate(240 0) scale(-1 1)">${wing}</g></g><path d="M96 56C89 46 86 28 91 22C95 19 108 28 114 47M126 47C132 28 145 19 149 22C154 29 151 46 144 56" fill="url(#${id}-fur)" stroke="#352442" stroke-width="2.5" stroke-linecap="round"/><path d="M98 48Q92 34 94 28Q103 31 108 45M132 45Q137 31 146 28Q148 35 141 49" fill="url(#${id}-ear)"/><path d="M96 52Q105 44 112 48L118 43L122 49L128 45L132 50Q145 44 151 60C162 82 155 108 140 119Q120 133 100 119C82 108 78 73 96 52Z" fill="url(#${id}-fur)" stroke="#352442" stroke-width="2.5" stroke-linejoin="round"/><ellipse cx="120" cy="106" rx="20" ry="13" fill="#ba9bc9" opacity=".24"/><path d="M94 63Q100 55 107 55" fill="none" stroke="#cbb0d9" stroke-width="3" stroke-linecap="round" opacity=".5"/>${eyes}<ellipse cx="98" cy="88" rx="7" ry="4" fill="#e69bb6" opacity=".75"/><ellipse cx="142" cy="88" rx="7" ry="4" fill="#e69bb6" opacity=".75"/><path d="M116 85Q120 81 124 85Q125 88 120 91Q115 88 116 85Z" fill="#eeb3bc"/><path d="M108 94Q120 104 132 94" fill="none" stroke="#33203f" stroke-width="2.3" stroke-linecap="round"/><path d="M111 96L114 102L117 98M123 98L126 102L129 96" fill="#fff0d9" stroke-linejoin="round"/><ellipse cx="109" cy="124" rx="6" ry="3.5" fill="#d2a8c7" stroke="#4a345b" stroke-width="1.5"/><ellipse cx="132" cy="124" rx="6" ry="3.5" fill="#d2a8c7" stroke="#4a345b" stroke-width="1.5"/></svg>`;
  };
  const lightning = '<svg viewBox="0 0 180 450" preserveAspectRatio="none" aria-hidden="true"><path d="M90 -10L66 85L111 110L48 212L80 204L22 345L53 312L18 450M76 69L146 151L130 195L173 268M52 208L8 238L18 286" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  dialog.innerHTML = `<div class="intro-night" aria-hidden="true"><div class="intro-stars"></div><div class="intro-halo"></div><div class="intro-lightning">${lightning}</div><div class="intro-lightning intro-lightning-right">${lightning}</div><div class="intro-flash"></div><div class="intro-flash intro-flash-second"></div></div><div class="intro-cover" aria-hidden="true"></div><div class="intro-message"><div class="intro-reveal"><div class="intro-emblem intro-evaporate"><img src="fotos/halloween/logo-halloween.webp" alt="PomPom Pet — logo de Halloween" width="112" height="112" fetchpriority="high" /></div></div><div class="intro-reveal"><div class="intro-identity intro-evaporate"><strong>PomPom <span class="intro-brand-pet">Pet</span></strong><small>Estética Animal</small><span class="intro-services">Banho, tosa e carinho para seu pet.</span></div></div><div class="intro-reveal"><h2 id="halloween-intro-title" class="intro-title"><span class="intro-evaporate">Halloween chegou.</span><span class="intro-invitation intro-evaporate">Venha conferir!</span></h2></div><div class="intro-reveal"><p id="halloween-intro-caption" class="intro-caption">Um sustinho de fofura espera por você.</p></div></div><div class="intro-mist" aria-hidden="true"></div><div class="intro-swarm" aria-hidden="true"></div><button class="intro-skip" type="button" autofocus>Entrar no site <span aria-hidden="true">↗</span></button>`;

  if (!reduced) {
    const width = innerWidth;
    const height = innerHeight;
    const compact = width < 600;
    const columns = compact ? 4 : Math.min(10, Math.ceil(width / 180) + 1);
    const rows = compact ? 8 : Math.min(8, Math.ceil(height / 130) + 1);
    const swarm = dialog.querySelector('.intro-swarm');
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        const wave = (Math.sin(index * 17.3) + 1) / 2;
        const size = (width / columns) * (compact ? 1.95 : 1.85) + wave * 35;
        const x = (col - .52) * width / (columns - 1) + Math.sin(index * 3) * 37 + (row % 2 ? 18 : -18);
        const y = (row - .52) * height / (rows - 1) + Math.cos(index * 2) * 33;
        const centerX = x + size / 2;
        const centerY = y + size * .29;
        const directionX = centerX < width / 2 ? -1 : 1;
        const directionY = centerY < height / 2 ? -1 : 1;
        const endX = x + directionX * (width + size);
        const endY = y + directionY * (height * .75 + size);
        const el = document.createElement('div');
        el.className = 'intro-bat';
        el.style.cssText = `--size:${size}px;--x:${x}px;--y:${y}px;--mid-x:${x + directionX * 55}px;--mid-y:${y - 30}px;--end-x:${endX}px;--end-y:${endY}px;--angle:${(wave - .5) * 32}deg;--tilt:${directionX * 14}deg;--end-angle:${directionX * 32}deg;--delay:${.12 + wave * .6}s;--duration:${1.65 + wave * .65}s;--wingbeat:${.24 + wave * .13}s;--flap-offset:${-wave * .6}s;--bob:${.38 + wave * .2}s;`;
        el.innerHTML = makeBat(index);
        fragment.appendChild(el);
      }
    }
    swarm.appendChild(fragment);
    const mist = dialog.querySelector('.intro-mist');
    for (let i = 0; i < 7; i++) {
      const wisp = document.createElement('div');
      wisp.className = 'intro-wisp';
      wisp.style.cssText = `--top:${36 + i * 5}%;--left:${35 + (i % 3) * 15}%;--drift:${i % 2 ? 90 : -90}px;--delay:${4.5 + i * .11}s;`;
      mist.appendChild(wisp);
    }
  }

  let timer;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    if (dialog.open) dialog.close();
    dialog.remove();
    document.documentElement.classList.remove('halloween-intro-active');
    if (previousFocus && previousFocus !== document.body && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
  };
  dialog.querySelector('.intro-skip').addEventListener('click', finish);
  dialog.addEventListener('cancel', event => { event.preventDefault(); finish(); });
  document.body.appendChild(dialog);
  try {
    dialog.showModal();
    document.documentElement.classList.add('halloween-intro-active');
    timer = setTimeout(finish, reduced ? 2600 : 6700);
    // Ao sair da página, libere o diálogo e descarte o temporizador.
    addEventListener('pagehide', finish, { once: true });
  } catch (_) {
    finish();
  }
}
showHalloweenIntro();
// O histórico pode restaurar uma página sem executar os scripts novamente.
addEventListener('pageshow', event => {
  if (event.persisted) showHalloweenIntro();
});
