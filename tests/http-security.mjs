import assert from 'node:assert/strict';
const base = process.argv[2];
assert.ok(base && base.startsWith('https://'), 'Provide HTTPS site URL');
const protections = ['content-security-policy', 'strict-transport-security', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'cross-origin-opener-policy', 'cross-origin-resource-policy'];
for (const route of ['/', '/mobile', '/desktop', '/privacidade', '/tailwind.css', '/halloween.css', '/halloween-components.js', '/site-events.js', '/site-scripts/mobile-3.js', '/site-scripts/desktop-2.js', '/fotos/halloween/logo-halloween.webp', '/not-found-security', '/.env', '/.git/config', '/Dockerfile', '/nginx.conf', '/package.json', '/backups/halloween-2026-10-02/README.md', '/previews/halloween/layouts']) {
  const response = await fetch(base + route);
  assert.equal(response.status, /not-found|\.env|\.git|Dockerfile|nginx\.conf|package\.json|backups|previews/.test(route) ? 404 : 200, route);
  for (const name of protections) assert.ok(response.headers.get(name), route + ' missing ' + name);
  const csp = response.headers.get('content-security-policy');
  const scripts = csp.match(/(?:^|;)\s*script-src\s+([^;]+)/)[1];
  assert.ok(!scripts.includes('unsafe-inline') && !scripts.includes('unsafe-eval'));
  assert.match(csp, /script-src-attr 'none'/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  if (route.endsWith('.js')) assert.match(response.headers.get('content-type'), /javascript/);
  if (route === '/site-events.js') assert.ok((await response.text()).includes('Object.hasOwn'));
  if (route === '/') {
    const html = await response.text();
    assert.ok(html.includes('/site-scripts/desktop-2.js'));
    assert.ok(!/\bonclick=|\bonerror=/.test(html));
  }
  console.log('PASS HTTP ' + response.status + ' headers: ' + route);
  await new Promise(resolve => setTimeout(resolve, 100));
}
const mobile = await (await fetch(base + '/', {headers:{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)'}})).text();
assert.ok(mobile.includes('/site-scripts/mobile-3.js'));
assert.ok(mobile.includes('halloween-intro.js'));
assert.ok(!/\bonclick=|\bonerror=/.test(mobile));
const post = await fetch(base + '/', {method:'POST'});
assert.equal(post.status, 405);
const redirect = await fetch(base + '/mobile.html?intro=off', {redirect:'manual'});
assert.equal(redirect.status, 301);
assert.ok(redirect.headers.get('location').endsWith('/mobile?intro=off'));
console.log('PASS mobile routing, forbidden POST, clean URL preserves query');
