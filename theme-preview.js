(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (params.get('previewThemes') !== '1') return;

  const button = document.querySelector('.theme-preview-toggle');
  if (!button || !window.PomPomTheme || params.get('previewEmbedded') === '1') return;

  const paint = () => {
    const normal = window.PomPomTheme.current === 'normal';
    button.textContent = normal ? 'Ver tema Halloween' : 'Ver tema normal';
    button.setAttribute('aria-pressed', String(normal));
    button.hidden = false;
  };

  button.addEventListener('click', () => {
    window.PomPomTheme.set(window.PomPomTheme.current === 'normal' ? 'halloween' : 'normal');
    const url = new URL(location.href);
    url.searchParams.set('theme', window.PomPomTheme.current);
    history.replaceState(null, '', url);
  });
  addEventListener('pompom:themechange', paint);
  paint();
})();
