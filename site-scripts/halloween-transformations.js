(() => {
  'use strict';
  const section = document.getElementById('transformacoes');
  if (!section) return;
  const container = section.querySelector('.ba-container');
  const before = section.querySelector('.ba-overlay');
  const after = section.querySelector('.ba-img:not(.ba-overlay)');
  const range = document.getElementById('ba-range');
  const divider = document.getElementById('ba-divider');
  const pets = document.getElementById('ba-pets');
  const description = document.getElementById('ba-pet-description');
  const note = document.getElementById('ba-art-note');
  const title = document.getElementById('ba-title');
  const gallery = document.getElementById('galeria');
  const secondary = document.getElementById('gallery-secondary');
  const secondaryTitle = document.getElementById('gallery-secondary-title');
  const secondaryDescription = document.getElementById('gallery-secondary-description');
  const galleryTitle = gallery.querySelector('.section-header .section-title');
  const galleryTag = gallery.querySelector('.section-header .section-tag');
  const gallerySubtitle = gallery.querySelector('.section-header .section-sub');
  const galleryCopy = [galleryTitle.textContent,galleryTag.textContent,gallerySubtitle.textContent];
  const original = {before:before.getAttribute('src'),after:after.getAttribute('src')};
  const pairs = {
    cacau:{name:'Cacau',costume:'bruxinha'},
    lufi:{name:'Lufi',costume:'vampiro'},
    snoopydexter:{name:'Snoopy e Dexter',costume:'dupla Frankenstein'},
    yoshi:{name:'Yoshi',costume:'vampiro'}
  };
  let selected = 'cacau';
  const seasonal = () => window.PomPomTheme ? window.PomPomTheme.current === 'halloween' : document.body.classList.contains('halloween-theme') && !document.body.classList.contains('theme-normal');
  function updateRange() {
    const pct = Number(range.value);
    before.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
    divider.style.left = pct + '%';
    range.setAttribute('aria-valuetext', `${pct}% da foto original; ${100-pct}% da transformação`);
  }
  function paint() {
    const halloween = seasonal();
    section.classList.toggle('halloween-transformations',halloween);
    gallery.classList.toggle('has-halloween-transformations',halloween);
    if (secondary) {
      if (halloween) section.after(secondary); else section.before(secondary);
      secondaryTitle.hidden = secondaryDescription.hidden = !halloween;
    }
    galleryTitle.textContent = halloween ? 'Fofura que vira magia' : galleryCopy[0];
    galleryTag.textContent = halloween ? '🎃 Transformações de Halloween' : galleryCopy[1];
    gallerySubtitle.textContent = halloween ? 'Um toque de fantasia nos pets que você já conhece.' : galleryCopy[2];
    pets.hidden = description.hidden = note.hidden = !halloween;
    title.textContent = halloween ? '🎃 Uma transformação de Halloween' : '🔄 Antes e Depois';
    const pet = pairs[selected];
    before.src = halloween ? `fotos/halloween/transformacoes/${selected}-antes.webp` : original.before;
    after.src = halloween ? `fotos/halloween/transformacoes/${selected}-depois.webp` : original.after;
    before.alt = halloween ? `${pet.name} antes da transformação de Halloween` : 'Antes do banho e tosa';
    after.alt = halloween ? `${pet.name} em uma transformação artística de ${pet.costume}` : 'Depois do banho e tosa';
    before.style.display = after.style.display = '';
    description.textContent = `${pet.name}: de fofura a ${pet.costume}. Arraste a linha e descubra!`;
    range.setAttribute('aria-label', halloween ? `Comparar ${pet.name} antes e depois da transformação em ${pet.costume}` : 'Comparar antes e depois do banho e tosa');
    pets.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.transformPet===selected)));
    range.value = halloween ? '85' : '50';
    updateRange();
  }
  pets.addEventListener('click',event=>{
    const button=event.target.closest('[data-transform-pet]');
    if (!button || !pairs[button.dataset.transformPet] || !seasonal()) return;
    selected=button.dataset.transformPet;
    paint();
  });
  range.addEventListener('input',updateRange);
  // A visible focus ring around the photo makes the native keyboard slider discoverable.
  range.addEventListener('focus',()=>container.classList.add('ba-focused'));
  range.addEventListener('blur',()=>container.classList.remove('ba-focused'));
  addEventListener('pompom:themechange',paint);
  paint();
})();
