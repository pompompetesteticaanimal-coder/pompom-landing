// Uma entrada própria usa o mesmo laboratório para manter moldura, temas e controles consistentes.
(() => {
  const url = new URL('index.html', location.href);
  url.search = location.search;
  url.searchParams.set('view', 'arts');
  url.searchParams.set('v', '20261004-5');
  location.replace(url.href);
})();
