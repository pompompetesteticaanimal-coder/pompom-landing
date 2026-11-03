(() => {
  'use strict';
  const config = window.PomPomThemeConfig || { activeTheme: 'halloween', opening: 'auto' };
  const params = new URLSearchParams(location.search);
  const preview = params.get('previewThemes') === '1';
  const themes = ['normal', 'halloween'];
  const now = Date.now();
  const boundary = value => value == null ? null : Date.parse(value);
  const start = boundary(config.startsAt), end = boundary(config.endsAt);
  const scheduled = (start === null || (Number.isFinite(start) && now >= start)) &&
    (end === null || (Number.isFinite(end) && now < end));
  const configured = themes.includes(config.activeTheme) && scheduled ? config.activeTheme : 'normal';
  let current = preview && themes.includes(params.get('theme')) ? params.get('theme') : configured;
  const modes = ['auto', 'none', 'halloween'];
  const openingMode = preview && modes.includes(params.get('opening')) ? params.get('opening') :
    (modes.includes(config.opening) ? config.opening : 'auto');
  const opening = () => current !== 'halloween' ? 'none' : (openingMode === 'auto' ? 'halloween' : openingMode);
  const syncContent = () => {
    document.querySelectorAll('[data-owner-photo]').forEach(image => {
      const seasonal = current === 'halloween';
      image.setAttribute('src', seasonal ? image.dataset.halloweenSrc : image.dataset.normalSrc);
      image.alt = seasonal ? 'Deisiane França, fundadora da PomPom Pet, com um cachorro em trajes de Halloween' : 'Deisiane França, fundadora da PomPom Pet — estética animal em Cajamar';
    });
    document.querySelectorAll('.normal-mobile-preview, .normal-desktop-preview, .normal-hero-photos').forEach(node => {
      node.setAttribute('aria-hidden', String(current !== 'normal'));
    });
  };
  const apply = () => {
    // Esta classe antiga também contém os layouts aprovados; permanece nos dois temas.
    document.body.classList.add('halloween-theme');
    document.body.classList.toggle('theme-normal', current === 'normal');
    document.body.dataset.theme = current;
    if (current === 'normal') {
      document.querySelector('.halloween-intro .intro-skip')?.click();
      document.documentElement.classList.remove('halloween-intro-active');
    }
    document.documentElement.style.colorScheme = current === 'normal' ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', current === 'normal' ? '#e11d48' : '#17101f');
    syncContent();
    dispatchEvent(new CustomEvent('pompom:themechange', { detail: { theme: current, opening: opening() } }));
  };
  window.PomPomTheme = {
    get current() { return current; },
    get opening() { return opening(); },
    preview,
    set(theme) { if (!themes.includes(theme)) return; current = theme; apply(); }
  };
  document.addEventListener('DOMContentLoaded', syncContent, { once: true });
  apply();
})();
