// Functional DOM regression tests, not a substitute for browser CSP/layout checks.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(path.join(process.env.POMPOM_TEST_NODE_MODULES, '..', 'package.json'));
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(import.meta.dirname, '..');
class LocalAssets extends ResourceLoader {
  fetch(url) {
    const parsed = new URL(url);
    if (parsed.hostname !== 'pompom.test') return null;
    const file = path.resolve(root, '.' + decodeURIComponent(parsed.pathname));
    if (!file.startsWith(root + '/') || !fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
    return Promise.resolve(fs.readFileSync(file));
  }
}
function assertNoInline(doc) {
  for (const script of doc.querySelectorAll('script:not([src])')) assert.equal(script.type, 'application/ld+json');
  for (const node of doc.querySelectorAll('*')) {
    for (const attr of node.attributes) assert.ok(!/^on/i.test(attr.name), 'Inline event: ' + attr.name);
  }
}
async function load(page, intro = false) {
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', error => { if (error.type !== 'css-parsing') errors.push(error.message); });
  const dom = new JSDOM(fs.readFileSync(path.join(root, page + '.html'), 'utf8'), {
    url: 'https://pompom.test/' + page + (intro ? '' : '?intro=off'),
    runScripts: 'dangerously', resources: new LocalAssets(), pretendToBeVisual: true, virtualConsole: console,
    beforeParse(window) {
      window.scrollTo = () => {};
      window.matchMedia = () => ({matches:false, addEventListener(){}, removeEventListener(){}});
      window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
      window.HTMLElement.prototype.scrollTo = () => {};
      window.HTMLElement.prototype.getClientRects = function () { return this.style.display === 'none' ? [] : [{}]; };
      window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
      window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
    }
  });
  await new Promise(resolve => dom.window.addEventListener('load', resolve, {once:true}));
  return {dom, errors, doc:dom.window.document};
}
for (const page of ['mobile', 'desktop']) {
  const {dom, errors, doc} = await load(page);
  const win = dom.window;
  const click = selector => { const target = doc.querySelector(selector); assert.ok(target, selector); target.click(); };
  assertNoInline(doc);
  if (page === 'mobile') {
    click('#mobile-menu-trigger'); assert.ok(doc.querySelector('#side-menu').classList.contains('open'));
    click('.halloween-menu-close'); assert.ok(!doc.querySelector('#side-menu').classList.contains('open'));
    click('#sticky-menu-trigger'); assert.equal(doc.querySelector('#sticky-menu-trigger').getAttribute('aria-expanded'), 'true');
    click('[data-site-action="menu-store"]'); assert.ok(!doc.querySelector('#side-menu').classList.contains('open'));
  } else click('[data-open-store]');
  const modal = doc.querySelector(page === 'mobile' ? '#lojinha-sheet' : '#lojinha-modal');
  assert.notEqual(modal.style.display, 'none');
  const categories = [...doc.querySelectorAll(page === 'mobile' ? '.cat-tab' : '.cat-tab-d')];
  assert.equal(categories.length, 7);
  for (const category of categories) {
    category.click(); assert.ok(category.classList.contains('ativa')); assert.ok(modal.querySelector('.catalog-product'));
  }
  const product = modal.querySelector('.catalog-product');
  product.click();
  const detail = doc.querySelector('#product-detail');
  assert.ok(detail.open); assert.match(detail.querySelector('img').src, /^https:\/\/storage.googleapis.com\/pompom-produtos\//);
  assert.match(detail.querySelector('a').href, /^https:\/\/wa.me\/5511947266216\?text=/);
  detail.querySelector('input').value = '2';
  detail.querySelector('input').dispatchEvent(new win.Event('input'));
  assert.equal(detail.querySelector('output').textContent, '200%');
  detail.querySelector('button').click(); assert.ok(!detail.open);
  const tabs = [...doc.querySelectorAll(page === 'mobile' ? '.galeria-m-tab-btn' : '.galeria-tab-btn')];
  assert.ok(tabs.length > 1);
  for (const tab of tabs) tab.click();
  const grid = doc.querySelector(page === 'mobile' ? '#galeria-m-grid' : '#galeria-masonry');
  assert.ok(grid.querySelector('img')); grid.querySelector('img').click();
  const lightbox = doc.querySelector(page === 'mobile' ? '#lightbox-m' : '#lightbox');
  assert.ok(lightbox.classList.contains('open')); lightbox.click(); assert.ok(!lightbox.classList.contains('open'));
  const review = doc.querySelector('[data-review-status]').textContent;
  click('[data-review-next]'); assert.notEqual(doc.querySelector('[data-review-status]').textContent, review);
  click('[data-site-action="close-store"]');
  await new Promise(resolve => setTimeout(resolve, 400)); assert.equal(modal.style.display, 'none');
  assertNoInline(doc);
  assert.deepEqual(errors, []);
  dom.window.close();
  console.log('PASS ' + page + ': menu/store, 7 categories, photo/zoom/WhatsApp, gallery/lightbox, reviews, close, no inline events');
}
const {dom, errors, doc} = await load('mobile', true);
assert.ok(doc.querySelector('.halloween-intro').open);
assert.ok(doc.querySelector('.intro-identity').textContent.includes('Estética Animal'));
doc.querySelector('.intro-skip').click();
assert.equal(doc.querySelector('.halloween-intro'), null);
assert.ok(!doc.documentElement.classList.contains('halloween-intro-active'));
dom.window.dispatchEvent(new dom.window.PageTransitionEvent('pageshow', {persisted:true}));
assert.ok(doc.querySelector('.halloween-intro').open);
doc.querySelector('.intro-skip').click();
assert.deepEqual(errors, []);
dom.window.close();
console.log('PASS mobile intro: identity, skip, release page, repeat on return');
