// Lifecycle and integration checks; visual layout still needs an actual browser/device.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(path.join(process.env.POMPOM_TEST_NODE_MODULES, '..', 'package.json'));
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(import.meta.dirname, '..');
async function load(page, query = '', config) {
  const errors = [], requests = [], console = new VirtualConsole();
  console.on('jsdomError', error => { if (error.type !== 'css-parsing') errors.push(error.message); });
  class LocalAssets extends ResourceLoader {
    fetch(url) {
      const parsed = new URL(url);
      requests.push(parsed.pathname);
      if (parsed.hostname !== 'pompom.test') return null;
      if (config && parsed.pathname === '/site-theme-config.js') return Promise.resolve(Buffer.from('window.PomPomThemeConfig=' + JSON.stringify(config)));
      const file = path.resolve(root, '.' + decodeURIComponent(parsed.pathname));
      if (!file.startsWith(root + '/') || !fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
      return Promise.resolve(fs.readFileSync(file));
    }
  }
  const dom = new JSDOM(fs.readFileSync(path.join(root,page + '.html'),'utf8'), {
    url: 'https://pompom.test/' + page + '.html' + query,
    runScripts:'dangerously', resources:new LocalAssets(), pretendToBeVisual:true, virtualConsole:console,
    beforeParse(win) {
      win.scrollTo = () => {};
      win.matchMedia = () => ({matches:false,addEventListener(){},removeEventListener(){}});
      win.IntersectionObserver = class {observe(){} unobserve(){} disconnect(){}};
      win.HTMLElement.prototype.scrollTo = () => {};
      win.HTMLElement.prototype.getClientRects = function () { return this.style.display === 'none' ? [] : [{}]; };
      win.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
      win.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new win.Event('close')); };
    }
  });
  await new Promise(resolve => dom.window.addEventListener('load',resolve,{once:true}));
  return {dom,doc:dom.window.document,errors,requests};
}
for (const page of ['mobile','desktop']) {
  for (const theme of ['normal','halloween']) {
    const {dom,doc,errors,requests} = await load(page,'?previewThemes=1&previewEmbedded=1&theme=' + theme);
    const win = dom.window;
    assert.equal(win.PomPomTheme.current,theme);
    assert.equal(doc.querySelector('[data-owner-photo]').getAttribute('src'), theme === 'halloween' ? 'fotos/halloween/deisiane-halloween.webp' : 'fotos/dona.jpg');
    assert.ok(doc.body.classList.contains('halloween-theme'), 'Approved structural rules must remain');
    assert.equal(doc.body.classList.contains('theme-normal'),theme === 'normal');
    assert.equal(Boolean(doc.querySelector('.halloween-intro')),page === 'mobile' && theme === 'halloween');
    if (theme === 'normal') {
      assert.ok(!requests.includes('/halloween-intro.js'), 'Normal must not download the animation');
      win.eval(fs.readFileSync(path.join(root,'halloween-intro.js'),'utf8'));
      win.dispatchEvent(new win.PageTransitionEvent('pageshow',{persisted:true}));
      assert.equal(doc.querySelector('.halloween-intro'),null, 'Even an old animation entry point cannot start on normal');
      assert.ok(!doc.documentElement.classList.contains('halloween-intro-active'));
    }
    doc.querySelector('.intro-skip')?.click();
    if (page === 'mobile') {
      const comparison = doc.querySelector('#transformacoes');
      const before = comparison.querySelector('.ba-overlay');
      const after = comparison.querySelector('.ba-img:not(.ba-overlay)');
      const range = comparison.querySelector('#ba-range');
      assert.equal(doc.querySelector('#ba-pets').hidden,theme === 'normal');
      assert.equal(comparison.nextElementSibling?.id === 'gallery-secondary',theme === 'halloween');
      assert.equal(doc.querySelector('#gallery-secondary-title').hidden,theme === 'normal');
      assert.equal(before.getAttribute('src'),theme === 'halloween' ? 'fotos/halloween/transformacoes/cacau-antes.webp' : 'fotos/antes1.jpg');
      assert.equal(range.value,theme === 'halloween' ? '85' : '50');
      assert.equal(before.style.clipPath,theme === 'halloween' ? 'inset(0 15% 0 0)' : 'inset(0 50% 0 0)');
      if (theme === 'halloween') {
        assert.equal(doc.querySelectorAll('[data-transform-pet]').length,4);
        for (const slug of ['snoopydexter','yoshi']) {
          doc.querySelector('[data-transform-pet="'+slug+'"]').click();
          assert.equal(before.getAttribute('src'),'fotos/halloween/transformacoes/'+slug+'-antes.webp');
          assert.equal(after.getAttribute('src'),'fotos/halloween/transformacoes/'+slug+'-depois.webp');
          assert.equal(range.value,'85');
          assert.ok(fs.existsSync(path.join(root,after.getAttribute('src'))));
          assert.ok(fs.existsSync(path.join(root,before.getAttribute('src'))));
          assert.equal(doc.querySelector('[data-transform-pet="'+slug+'"]').getAttribute('aria-pressed'),'true');
        }
        doc.querySelector('[data-transform-pet="lufi"]').click();
        assert.equal(before.getAttribute('src'),'fotos/halloween/transformacoes/lufi-antes.webp');
        assert.equal(after.getAttribute('src'),'fotos/halloween/transformacoes/lufi-depois.webp');
        for (const pct of [0,25,100]) {
          range.value=String(pct); range.dispatchEvent(new win.Event('input',{bubbles:true}));
          assert.equal(before.style.clipPath,`inset(0 ${100-pct}% 0 0)`);
          assert.equal(doc.querySelector('#ba-divider').style.left,pct+'%');
          assert.match(range.getAttribute('aria-valuetext'),new RegExp('^'+pct+'%'));
        }
        doc.querySelector('[data-transform-pet="cacau"]').click();
        assert.equal(range.value,'85');
        assert.equal(after.getAttribute('src'),'fotos/halloween/transformacoes/cacau-depois.webp');
      }
      assert.ok(doc.querySelector('.theme-preview-toggle').hidden);
      doc.querySelector('#mobile-menu-trigger').click();
      assert.ok(doc.querySelector('#side-menu').classList.contains('open'));
      doc.querySelector('[data-site-action="menu-store"]').click();
    } else doc.querySelector('[data-open-store]').click();
    const modal = doc.querySelector(page === 'mobile' ? '#lojinha-sheet' : '#lojinha-modal');
    assert.ok(modal.querySelector('.catalog-product'));
    modal.querySelector('.catalog-product').click();
    assert.ok(doc.querySelector('#product-detail').open);
    win.PomPomTheme.set(theme === 'normal' ? 'halloween' : 'normal');
    assert.equal(doc.body.dataset.theme,theme === 'normal' ? 'halloween' : 'normal');
    assert.equal(doc.querySelector('[data-owner-photo]').getAttribute('src'), theme === 'normal' ? 'fotos/halloween/deisiane-halloween.webp' : 'fotos/dona.jpg');
    if (page === 'mobile') {
      assert.equal(doc.querySelector('#ba-pets').hidden,theme === 'halloween');
      assert.equal(doc.querySelector('#ba-overlay').getAttribute('src'), theme === 'normal' ? 'fotos/halloween/transformacoes/cacau-antes.webp' : 'fotos/antes1.jpg');
    }
    assert.ok(doc.querySelector('#product-detail').open, 'Theme change preserves open product detail');
    assert.deepEqual(errors,[]); dom.window.close();
  }
}
for (const config of [
  {activeTheme:'halloween',opening:'auto',endsAt:'2000-01-01T00:00:00-03:00'},
  {activeTheme:'halloween',opening:'auto',startsAt:'2100-01-01T00:00:00-03:00'},
  {activeTheme:'halloween',opening:'auto',endsAt:'invalid'}
]) {
  const {dom,doc,errors} = await load('mobile','',config);
  assert.equal(dom.window.PomPomTheme.current,'normal');
  assert.equal(dom.window.PomPomTheme.opening,'none');
  assert.equal(doc.querySelector('.halloween-intro'),null);
  assert.deepEqual(errors,[]); dom.window.close();
}
for (const [query,theme,opening] of [
  ['?theme=normal&opening=none','halloween','halloween'],
  ['?previewThemes=1&theme=normal&opening=halloween','normal','none'],
  ['?previewThemes=1&theme=halloween&opening=none','halloween','none'],
  ['?previewThemes=1&theme=normal&opening=auto','normal','none']
]) {
  const {dom,doc,errors} = await load('mobile',query);
  assert.equal(dom.window.PomPomTheme.current,theme);
  assert.equal(dom.window.PomPomTheme.opening,opening);
  assert.equal(Boolean(doc.querySelector('.halloween-intro')),opening === 'halloween');
  assert.deepEqual(errors,[]); dom.window.close();
}
{
  const {dom,doc,errors} = await load('mobile','?previewThemes=1&theme=halloween');
  assert.ok(doc.querySelector('.halloween-intro'));
  dom.window.PomPomTheme.set('normal');
  assert.equal(doc.querySelector('.halloween-intro'),null);
  dom.window.dispatchEvent(new dom.window.PageTransitionEvent('pageshow',{persisted:true}));
  assert.equal(doc.querySelector('.halloween-intro'),null);
  assert.ok(!doc.documentElement.classList.contains('halloween-intro-active'));
  assert.deepEqual(errors,[]);dom.window.close();
}
console.log('PASS themes: normal never loads/starts/replays Halloween animation; mobile+desktop, store, scheduling and theme switch preserved');
