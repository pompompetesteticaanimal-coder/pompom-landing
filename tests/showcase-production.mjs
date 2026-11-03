import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require = createRequire(process.env.POMPOM_TEST_NODE_MODULES + '/../package.json');
const {chromium} = require('playwright');
const browser = await chromium.launch({headless:true,executablePath:process.env.POMPOM_TEST_BROWSER || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const base = process.env.POMPOM_TEST_URL || 'https://pompompetshop.com.br';
const patch = process.env.POMPOM_DEPLOY_CONTEXT;
try {
  for (const [name,width,height] of [['mobile',390,844],['desktop',1440,1000]]) {
    const page = await browser.newPage({viewport:{width,height},userAgent:name === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)'});
    const errors = []; page.on('pageerror',error => errors.push(error.message));
    if (patch) await page.route(base + '/**',async route => {
      const pathname = new URL(route.request().url()).pathname;
      const file = pathname === '/' ? name + '.html' : pathname.replace(/^\/fotos\/halloween\//,'').replace(/^\//,'');
      const target = patch + '/' + file;
      if (fs.existsSync(target) && fs.statSync(target).isFile()) {
        const contentType = file.endsWith('.html') ? 'text/html' : file.endsWith('.js') ? 'application/javascript' : file.endsWith('.css') ? 'text/css' : 'image/webp';
        await route.fulfill({body:fs.readFileSync(target),contentType});
      } else await route.continue();
    });
    await page.goto(base + '/?intro=off&showcaseCheck=20261007',{waitUntil:'domcontentloaded'});
    const card = page.locator('.halloween-carousel'); await card.waitFor();
    await page.evaluate(() => document.fonts.ready); await card.scrollIntoViewIfNeeded();
    assert.equal(await card.locator('.halloween-showcase-slide').count(),5);
    assert.equal(await card.locator('.halloween-showcase-dots').count(),0);
    assert.equal(await card.locator('.halloween-feature-photos img').count(),3);
    await card.getByRole('button',{name:'Próximo card',exact:true}).click();
    await page.waitForTimeout(850);
    assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'2 de 5');
    assert.ok(await card.locator('.is-active img').evaluate(img => img.complete && img.naturalWidth > 0));
    await page.evaluate(() => document.activeElement.blur()); await page.mouse.move(0,0);
    await page.waitForTimeout(6000);
    assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'3 de 5');
    assert.deepEqual(errors,[]);
    assert.equal(await page.locator('script[src*="site-theme.js"]').count(),0,'Experimental theme engine not published');
    console.log(`PASS ${name} production${patch ? ' patch' : ''}: original collage, subtle arrows, photos, slide transition, autoplay, no JS errors`);
    await page.close();
  }
} finally { await browser.close(); }
