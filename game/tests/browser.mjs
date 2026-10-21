import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'test-output');
fs.mkdirSync(output, { recursive: true });
const chrome = process.env.BROWSER_PATH || [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find(fs.existsSync);
if (!chrome) throw new Error('Set BROWSER_PATH to a Chromium-compatible browser executable.');

const server = await createServer({ root, server: { host: '127.0.0.1', port: 0 } });
let browser;
try {
  await server.listen();
  const url = server.resolvedUrls.local[0];
  browser = await chromium.launch({ executablePath: chrome, headless: true });
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await desktop.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(url);
  await page.locator('#game canvas').waitFor();
  await page.screenshot({ path: path.join(output, 'desktop-start.png'), fullPage: true });

  const steps = { D1: 1, D2: 2, D3: 1, D4: 2, D5: 3 };
  async function hit(page, id, touch = false) {
    if (touch) {
      await page.locator('#game-viewport').evaluate((el, spot) => { el.scrollLeft = ['D3', 'D4'].includes(spot) ? 410 : 0; }, id);
      await page.evaluate(() => new Promise(requestAnimationFrame));
      await page.locator(`[data-spot="${id}"]`).tap();
    } else {
      await page.locator(`[data-spot="${id}"]`).click();
    }
  }
  for (const id of ['D1', 'D2', 'D3', 'D4', 'D5']) {
    await hit(page, id);
    for (let i = 0; i < steps[id]; i++) await page.locator('#do-step').click();
    await page.locator('#do-record').click();
    await page.locator('#record-evidence').click();
    await page.locator('#close-dialog').click();
  }
  assert.match(await page.locator('#evidence-count').innerText(), /5 \/ 5/);
  await page.locator('#face-button').click();
  await page.locator('[data-evidence="D2"]').click(); // wrong match is recoverable
  assert.match(await page.locator('#deposit').innerText(), /\$0 \/ \$500/);
  for (const id of ['D1', 'D2', 'D3', 'D4', 'D5']) await page.locator(`[data-evidence="${id}"]`).click();
  assert.match(await page.locator('#dialog-title').innerText(), /Full deposit back/);
  assert.match(await page.locator('#deposit').innerText(), /\$500 \/ \$500/);
  const eventCount = await page.evaluate(() => JSON.parse(localStorage.getItem('deposit-wars-local-playtest') || '[]').length);
  assert.ok(eventCount >= 18, `expected playtest events, got ${eventCount}`);
  await page.screenshot({ path: path.join(output, 'desktop-win.png'), fullPage: true });
  await page.reload();
  assert.match(await page.locator('#evidence-count').innerText(), /0 \/ 5/);
  await page.locator('#hint-button').click();
  assert.match(await page.locator('#status').innerText(), /Hint 01/);
  await page.locator('#sound-button').click();
  assert.equal(await page.locator('#sound-button').getAttribute('aria-pressed'), 'false');
  await page.keyboard.press('1');
  assert.match(await page.locator('#dialog-title').innerText(), /private/);
  await page.keyboard.press('Escape');
  await page.locator('#dialog-backdrop.hidden').waitFor({ state: 'attached' });
  assert.deepEqual(errors, [], `browser errors: ${errors.join('; ')}`);
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const phone = await mobile.newPage();
  const mobileErrors = [];
  phone.on('pageerror', (error) => mobileErrors.push(error.message));
  await phone.goto(url);
  await phone.locator('#game canvas').waitFor();
  await phone.screenshot({ path: path.join(output, 'mobile-start.png'), fullPage: true });
  await hit(phone, 'D1', true);
  await phone.locator('#do-step').tap();
  await phone.locator('#do-record').tap();
  await phone.locator('#record-evidence').tap();
  await phone.locator('#close-dialog').tap();
  await phone.locator('#dialog-backdrop.hidden').waitFor({ state: 'attached' });
  await phone.locator('#face-button').tap();
  await phone.locator('#go-anyway').tap();
  await phone.locator('[data-evidence="D1"]').tap();
  await phone.locator('#partial-finish').tap();
  assert.match(await phone.locator('#dialog-title').innerText(), /Still disputed/);
  await phone.locator('#back-to-room').tap();
  await phone.locator('#dialog-backdrop.hidden').waitFor({ state: 'attached' });
  await hit(phone, 'D4', true);
  assert.match(await phone.locator('#dialog-title').innerText(), /clockwork exit/);
  for (let i = 0; i < steps.D4; i++) await phone.locator('#do-step').tap();
  await phone.locator('#do-record').tap();
  await phone.locator('#record-evidence').tap();
  await phone.locator('#close-dialog').tap();
  for (const id of ['D2', 'D3', 'D5']) {
    await hit(phone, id, true);
    for (let i = 0; i < steps[id]; i++) await phone.locator('#do-step').tap();
    await phone.locator('#do-record').tap();
    await phone.locator('#record-evidence').tap();
    await phone.locator('#close-dialog').tap();
  }
  assert.match(await phone.locator('#evidence-count').innerText(), /5 \/ 5/);
  await phone.locator('#face-button').tap();
  for (const id of ['D2', 'D3', 'D4', 'D5']) await phone.locator(`[data-evidence="${id}"]`).tap();
  assert.match(await phone.locator('#dialog-title').innerText(), /Full deposit back/);
  await phone.screenshot({ path: path.join(output, 'mobile-win.png'), fullPage: true });
  assert.deepEqual(mobileErrors, []);
  await mobile.close();
  console.log('PASS desktop five-defect full run, wrong-match recovery, refresh reset, local events');
  console.log('PASS 390×844 touch five-defect full run, partial recovery and horizontal room scroll; screenshots in test-output/');
} finally {
  await browser?.close();
  await server.close();
}
