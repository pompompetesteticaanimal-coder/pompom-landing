import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require = createRequire(process.env.POMPOM_TEST_NODE_MODULES + '/../package.json');
const {chromium} = require('playwright');
const browser = await chromium.launch({headless: true, executablePath: process.env.POMPOM_TEST_BROWSER || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const base = process.env.POMPOM_TEST_URL || 'http://localhost:8000';
try {
  for (const [name, width, height] of [['mobile',390,844], ['mobile',320,740], ['desktop',1440,1000]]) {
    const page = await browser.newPage({viewport:{width,height}});
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/${name}.html?previewThemes=1&theme=halloween&opening=none`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const track = document.querySelector('.halloween-showcase-track');
      return track && getComputedStyle(track).display === 'grid';
    });
    const card = page.locator('.halloween-carousel');
    await card.scrollIntoViewIfNeeded();
    await page.mouse.move(0,0);
    assert.equal(await card.locator('.halloween-showcase-slide').count(),5);
    assert.equal(await card.locator('.halloween-feature-photos img:not([hidden])').count(),3, 'Original three-pet collage restored');
    assert.equal(await card.locator('.halloween-showcase-dots').count(),0, 'No bottom dots');
    const activePanel = card.locator('.is-active');
    const panelBox = await activePanel.boundingBox();
    const leftArrow = await activePanel.getByRole('button',{name:'Card anterior',exact:true}).boundingBox();
    const rightArrow = await activePanel.getByRole('button',{name:'Próximo card',exact:true}).boundingBox();
    assert.ok(leftArrow.x < panelBox.x + 10 && rightArrow.x + rightArrow.width > panelBox.x + panelBox.width - 10, 'Arrows at opposite panel edges');
    assert.ok(leftArrow.width >= 44 && rightArrow.width >= 44, 'Touch targets at least 44px');
    assert.ok(await card.locator('.is-active').evaluate(slide => getComputedStyle(slide).backgroundImage !== 'none'), 'Moving card owns its background');
    const size = await card.boundingBox();
    for (let i = 1; i < 5; i++) {
      await card.getByRole('button',{name:'Próximo card',exact:true}).click();
      assert.ok(await card.locator('.is-active').evaluate(slide => slide.getAnimations().length > 0), 'Whole card slides sideways');
      await page.waitForTimeout(850);
      const active = card.locator('.is-active');
      assert.equal(await active.getAttribute('aria-label'),`${i + 1} de 5`);
      assert.ok(await active.locator('img').evaluate(img => img.complete && img.naturalWidth > 0));
      assert.equal((await card.boundingBox()).height,size.height, 'No height jump between slides');
    }
    await card.getByRole('button',{name:'Próximo card',exact:true}).click();
    assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'1 de 5');
    await card.getByRole('button',{name:'Próximo card',exact:true}).click();
    await page.waitForTimeout(850);
    assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'2 de 5');
    if (width !== 320) await card.screenshot({path:`/private/tmp/pompom-showcase-${name}.png`});
    assert.ok(await card.evaluate(element => element.scrollWidth <= element.clientWidth && element.getBoundingClientRect().right <= innerWidth), 'Carousel has no horizontal overflow');
    await page.evaluate(() => { document.activeElement.blur(); });
    await page.mouse.move(0,0);
    await page.waitForTimeout(6000);
    assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'3 de 5', 'Automatic advance');
    await card.getByRole('button',{name:'Pausar troca automática',exact:true}).click();
    await page.evaluate(() => { document.activeElement.blur(); });
    await page.mouse.move(0,0);
    await page.waitForTimeout(6000);
    assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'3 de 5', 'Pause retained');
    await page.evaluate(() => window.PomPomTheme.set('normal'));
    assert.equal(await card.isVisible(),false);
    await page.evaluate(() => window.PomPomTheme.set('halloween'));
    assert.equal(await card.isVisible(),true);
    assert.deepEqual(errors,[]);
    console.log(`PASS ${name} ${width}px: 5 complete sliding cards, restored pet collage, assets, controls, autoplay, pause, stable height ${size.height}px, theme switch`);
    await page.close();
  }
  const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await page.goto(`${base}/mobile.html?previewThemes=1&theme=halloween&opening=none`);
  const card = page.locator('.halloween-carousel'); await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(6000);
  assert.equal(await card.locator('.is-active').getAttribute('aria-label'),'1 de 5');
  assert.equal(await card.getByRole('button',{name:'Iniciar troca automática'}).count(),1);
  console.log('PASS reduced motion: no automatic animation');
  await page.close();
} finally { await browser.close(); }
