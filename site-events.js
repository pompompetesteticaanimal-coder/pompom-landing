// Explicit allowlist: data attributes never contain executable JavaScript.
(() => {
  'use strict';
  const actions = {
    'close-menu': () => window.closeMenu(),
    'open-menu': element => window.openMenu(element),
    'menu-store': () => { window.closeMenu(); window.abrirLojinha(); },
    'open-store': () => window.abrirLojinha(),
    'close-store': () => window.fecharLojinha(),
    'close-lightbox-mobile': () => window.closeLightboxM(),
    'close-lightbox': () => window.closeLightbox(),
    'gallery-halloween-mobile': () => window.mudarGaleriaMTab('halloween'),
    'gallery-halloween': () => window.mudarGaleriaTab('halloween'),
    'category-mobile': element => window.mostrarCategoria(element.dataset.cat),
    'category': element => window.mostrarCategoriaD(element.dataset.cat),
    'gallery-mobile': element => window.mudarGaleriaMTab(element.dataset.tab),
    'gallery': element => window.mudarGaleriaTab(element.dataset.tab)
  };
  document.addEventListener('click', event => {
    const element = event.target.closest('[data-site-action]');
    const action = element && Object.hasOwn(actions, element.dataset.siteAction) && actions[element.dataset.siteAction];
    if (action) action(element);
  });
  function fallback(image) {
    if (!(image instanceof HTMLImageElement) || !image.dataset.imageFallback) return;
    const kind = image.dataset.imageFallback;
    delete image.dataset.imageFallback;
    if (kind === 'mobile-1') {
      image.style.display = 'none';
      const placeholder = document.getElementById('dona-placeholder');
      if (placeholder) placeholder.style.display = 'flex';
    } else if (kind === 'desktop-1') {
      const placeholder = document.createElement('div');
      placeholder.textContent = '👩';
      placeholder.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:120px;opacity:.2';
      image.parentElement.style.background = 'linear-gradient(135deg,#fce7f3,#fdf2f8)';
      image.parentElement.append(placeholder);
    } else {
      image.style.background = kind === 'mobile-2' ? 'linear-gradient(135deg,#fb7185,#e11d48)' : '#d1d5db';
      image.removeAttribute('src');
    }
  }
  document.addEventListener('error', event => fallback(event.target), true);
  document.querySelectorAll('img[data-image-fallback]').forEach(image => {
    if (image.complete && image.naturalWidth === 0) fallback(image);
  });
})();
