(() => {
  'use strict';
  const card = document.querySelector('.halloween-feature');
  if (!card) return;
  const track = document.createElement('div');
  track.className = 'halloween-showcase-track';
  const original = document.createElement('article');
  original.append(...card.children);
  const petPhotos = original.querySelector('.halloween-feature-photos');
  if (petPhotos) petPhotos.classList.add('halloween-pet-photos');
  track.append(original);
  const slide = document.createElement('article');
  const copy = document.createElement('div');
  const eyebrow = document.createElement('div');
  eyebrow.className = 'halloween-eyebrow'; eyebrow.textContent = 'Halloween na PomPom';
  const heading = document.createElement('h2');
  heading.append('Um espaço mágico.', document.createElement('br'));
  const em = document.createElement('em'); em.textContent = 'Feito para acolher.'; heading.append(em);
  const description = document.createElement('p');
  description.textContent = 'Da fachada à nossa área de cuidado, cada cantinho foi preparado com carinho para receber você e seu pet.';
  const link = document.createElement('a'); link.href = '#contato'; link.textContent = 'Venha conhecer a PomPom ↗';
  copy.append(eyebrow, heading, description, link);
  const photos = document.createElement('div'); photos.className = 'halloween-feature-photos halloween-environment-photos';
  const scenes = [
    ['fachada', 'Fachada da PomPom Pet decorada para Halloween'],
    ['recepcao', 'Recepção da PomPom com abóboras e luzes de Halloween'],
    ['cantinho', 'Cantinho de espera da PomPom decorado com teias e luzes'],
    ['abobora', 'Detalhe de abóbora iluminada com chapéu de bruxa na PomPom']
  ];
  for (const [file, alt] of scenes) {
    const img = document.createElement('img');
    img.src = 'fotos/halloween/ambiente/' + file + '.webp'; img.alt = alt;
    img.width = 600; img.height = 600; img.loading = 'lazy'; img.decoding = 'async';
    photos.append(img);
  }
  slide.append(copy, photos); track.append(slide);

  const giftSlide = document.createElement('article');
  const giftCopy = document.createElement('div');
  const giftEyebrow = document.createElement('div');
  giftEyebrow.className = 'halloween-eyebrow'; giftEyebrow.textContent = 'Um mimo da PomPom';
  const giftHeading = document.createElement('h2');
  giftHeading.append('Um carinho a mais.', document.createElement('br'));
  const giftEm = document.createElement('em'); giftEm.textContent = 'Para levar pra casa.'; giftHeading.append(giftEm);
  const giftDescription = document.createElement('p');
  giftDescription.textContent = 'Os pacotes de Halloween vêm com lembrancinhas exclusivas, preparadas com carinho para deixar a experiência do seu pet ainda mais especial.';
  const giftLink = document.createElement('a'); giftLink.href = '#contato'; giftLink.textContent = 'Conheça os pacotes de Halloween ↗';
  giftCopy.append(giftEyebrow, giftHeading, giftDescription, giftLink);
  const giftPhotos = document.createElement('div'); giftPhotos.className = 'halloween-feature-photos halloween-gift-photos';
  const gifts = [
    ['cesta-de-mimos.jpeg', 'Cesta com biscoitos e lembrancinhas PomPom Pet para Halloween'],
    ['kit-halloween.jpeg', 'Kit de biscoitos para pets com embalagens e adesivos PomPom Pet de Halloween'],
    ['lembrancinha-pet.jpeg', 'Lembrancinha individual com biscoito para pet e adesivo PomPom Pet de Halloween']
  ];
  for (const [file, alt] of gifts) {
    const img = document.createElement('img');
    img.src = 'fotos/halloween/lembrancinhas/' + file; img.alt = alt;
    img.width = file === 'lembrancinha-pet.jpeg' ? 1200 : 1600;
    img.height = file === 'lembrancinha-pet.jpeg' ? 1600 : 1200;
    img.loading = 'lazy'; img.decoding = 'async';
    giftPhotos.append(img);
  }
  giftSlide.append(giftCopy, giftPhotos); track.append(giftSlide);
  card.append(track); card.classList.add('halloween-carousel');
  card.setAttribute('aria-label', 'Halloween na PomPom: pets, ambiente e lembrancinhas');
  card.setAttribute('aria-roledescription', 'carrossel');
  const slides = [...track.children];
  slides.forEach((slide, i) => {
    slide.className = 'halloween-showcase-slide';
    slide.setAttribute('role', 'group'); slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', (i + 1) + ' de ' + slides.length);
  });
  const controls = document.createElement('div'); controls.className = 'halloween-showcase-controls';
  const button = (label, text) => {
    const element = document.createElement('button'); element.type = 'button'; element.setAttribute('aria-label', label); element.textContent = text; return element;
  };
  const prev = button('Card anterior', '‹'), next = button('Próximo card', '›');
  prev.dataset.showcaseAction = 'prev'; next.dataset.showcaseAction = 'next';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, paused = motion.matches, hovering = false, focusing = false, visible = true;
  let animations = [];
  const pause = button('Pausar troca automática', 'Ⅱ');
  pause.dataset.showcaseAction = 'pause';
  const status = document.createElement('span'); status.className = 'halloween-showcase-status'; status.setAttribute('aria-live', 'polite');
  function show(value, manual = false) {
    const previous = slides[index];
    const direction = value < index ? -1 : 1;
    const wasActive = previous.classList.contains('is-active');
    animations.forEach(animation => animation.cancel()); animations = [];
    slides.forEach(slide => slide.classList.remove('is-leaving'));
    index = (value + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active); slide.setAttribute('aria-hidden', String(!active)); slide.inert = !active;
    });
    const incoming = slides[index];
    if (wasActive && previous !== incoming && !motion.matches && typeof incoming.animate === 'function') {
      // The background, border, copy, photos and controls all belong to the moving panel.
      previous.classList.add('is-leaving');
      const options = {duration: 780, easing: 'cubic-bezier(.22,.68,.18,1)'};
      const outgoing = previous.animate([
        {transform: 'translateX(0)', opacity: 1},
        {transform: `translateX(${-direction * 108}%)`, opacity: .15}
      ], options);
      outgoing.onfinish = () => previous.classList.remove('is-leaving');
      const entering = incoming.animate([
        {transform: `translateX(${direction * 108}%)`, opacity: .25},
        {transform: 'translateX(0)', opacity: 1}
      ], options);
      animations = [outgoing, entering];
    }
    if (manual) status.textContent = 'Card ' + (index + 1) + ' de ' + slides.length;
  }
  function schedule() {
    clearTimeout(timer);
    const normal = window.PomPomTheme?.current === 'normal' || document.body.classList.contains('theme-normal');
    if (paused || hovering || focusing || !visible || document.hidden || normal) return;
    timer = setTimeout(() => { show(index + 1); schedule(); }, 5500);
  }
  const syncPause = () => {
    card.querySelectorAll('[data-showcase-action="pause"]').forEach(button => {
      button.textContent = paused ? '▶ Continuar' : 'Ⅱ Pausar';
      button.setAttribute('aria-label', paused ? 'Iniciar troca automática' : 'Pausar troca automática');
    });
  };
  controls.append(prev, next, pause);
  slides.forEach(slide => slide.append(controls.cloneNode(true))); card.append(status);
  card.addEventListener('click', event => {
    const button = event.target.closest('[data-showcase-action]');
    if (!button || !card.contains(button)) return;
    if (button.dataset.showcaseAction === 'pause') { paused = !paused; syncPause(); }
    else if (button.dataset.showcaseAction === 'prev') show(index - 1, true);
    else if (button.dataset.showcaseAction === 'next') show(index + 1, true);
    schedule();
  });
  card.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  card.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  card.addEventListener('focusin', event => { focusing = event.target.matches(':focus-visible'); schedule(); });
  card.addEventListener('focusout', event => { focusing = Boolean(event.relatedTarget && card.contains(event.relatedTarget) && event.relatedTarget.matches(':focus-visible')); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('pompom:themechange', schedule);
  motion.addEventListener('change', event => { paused = event.matches; syncPause(); schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold: .15}).observe(card);
  }
  let touchX = null, touchY = null;
  track.addEventListener('touchstart', event => {
    if (event.target.closest('[data-showcase-action]')) { touchX = null; return; }
    touchX = event.touches[0].clientX; touchY = event.touches[0].clientY;
  }, {passive: true});
  track.addEventListener('touchend', event => {
    if (touchX === null) return;
    const dx = event.changedTouches[0].clientX - touchX, dy = event.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { show(index + (dx < 0 ? 1 : -1), true); schedule(); }
    touchX = null;
  }, {passive: true});
  syncPause(); show(0); schedule();
})();
