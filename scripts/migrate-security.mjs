// One-time mechanical migration: preserve script order and replace inline events.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const actions = new Map([
  ['closeMenu()', 'close-menu'], ['openMenu()', 'open-menu'], ['openMenu(this)', 'open-menu'],
  ['closeMenu(); abrirLojinha()', 'menu-store'], ['abrirLojinha()', 'open-store'],
  ['fecharLojinha()', 'close-store'], ['closeLightboxM()', 'close-lightbox-mobile'],
  ['closeLightbox()', 'close-lightbox'], ["mudarGaleriaMTab('halloween')", 'gallery-halloween-mobile'],
  ["mudarGaleriaTab('halloween')", 'gallery-halloween'],
  ["mostrarCategoria('${k}')", 'category-mobile'], ["mostrarCategoriaD('${k}')", 'category'],
  ["mudarGaleriaMTab('todas')", 'gallery-mobile'], ["mudarGaleriaMTab('${k}')", 'gallery-mobile'],
  ["mudarGaleriaTab('todas')", 'gallery'], ["mudarGaleriaTab('${key}')", 'gallery']
]);
fs.mkdirSync(path.join(root, 'site-scripts'), { recursive: true });
for (const page of ['desktop', 'mobile', 'index', 'privacidade']) {
  const file = path.join(root, page + '.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/\bonclick="([^"]*)"/g, (_, code) => {
    if (!actions.has(code)) throw new Error('Unmapped event: ' + code);
    return 'data-site-action="' + actions.get(code) + '"';
  });
  let fallback = 0;
  html = html.replace(/\bonerror="[^"]*"/g, () => 'data-image-fallback="' + page + '-' + (++fallback) + '"');
  let number = 0;
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (tag, attrs, code) => {
    if (/\bsrc\s*=|application\/ld\+json/.test(attrs)) return tag;
    const name = page + '-' + (++number) + '.js';
    fs.writeFileSync(path.join(root, 'site-scripts', name), code.trim() + '\n');
    return '<script src="/site-scripts/' + name + '"></script>';
  });
  if (page !== 'index') html = html.replace('</head>', '<script src="/site-events.js" defer></script>\n</head>');
  fs.writeFileSync(file, html);
  console.log(page + ': ' + number + ' external scripts, ' + fallback + ' image fallbacks');
}
