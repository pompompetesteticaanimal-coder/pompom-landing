(() => {
  'use strict';
  const theme = window.PomPomTheme;
  if (!theme || theme.current !== 'halloween' || theme.opening !== 'halloween') return;
  if (new URLSearchParams(location.search).get('intro') === 'off') return;
  const script = document.createElement('script');
  script.src = new URL('halloween-intro.js?v=20261004-4', document.currentScript.src).href;
  document.documentElement.classList.add('halloween-intro-active');
  const release = () => {
    if (!document.querySelector('.halloween-intro')) document.documentElement.classList.remove('halloween-intro-active');
  };
  script.addEventListener('load', release);
  script.addEventListener('error', release);
  document.body.append(script);
})();
