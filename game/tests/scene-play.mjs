import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'test-output');
fs.mkdirSync(output, { recursive: true });
const executablePath = process.env.BROWSER_PATH || [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find(fs.existsSync);
if (!executablePath) throw new Error('Set BROWSER_PATH to Chrome or Edge.');
const server = await createServer({ root, server: { host: '127.0.0.1', port: 0 } });
let browser;

async function enter(page, role) {
  await page.locator(`[data-case-role="${role}"]`).click();
  await page.locator('#case-enter').click();
  assert.match(await page.locator('#role-tag').innerText(), role === 'tenant' ? /租客/ : /房东/);
  assert.equal(await page.locator('.spot').count(), 0);
}

async function dragObject(page, id) {
  const object = page.locator(`[data-scene-object="${id}"]:not([hidden])`);
  await object.scrollIntoViewIfNeeded();
  const box = await object.boundingBox();
  assert.ok(box, `Visible object for ${id}`);
  const direction = await object.getAttribute('data-direction');
  const vector = { right: [88, 0], left: [-88, 0], up: [0, -88], down: [0, 88] }[direction];
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + vector[0], y + vector[1], { steps: 6 });
  await page.mouse.up();
}

async function collect(page, id, steps) {
  for (let i = 0; i < steps; i++) await dragObject(page, id);
  assert.equal(await page.locator(`[data-scene-object="${id}"]:not([hidden])`).count(), 0, `${id} did not complete`);
}

async function touchDrag(page, id) {
  const object = page.locator(`[data-scene-object="${id}"]:not([hidden])`);
  await object.scrollIntoViewIfNeeded();
  const box = await object.boundingBox();
  assert.ok(box);
  const direction = await object.getAttribute('data-direction');
  const vector = { right: [55, 0], left: [-55, 0], up: [0, -55], down: [0, 55] }[direction];
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let i = 1; i <= 5; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + vector[0] * i / 5, y: y + vector[1] * i / 5 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach();
}

try {
  await server.listen();
  browser = await chromium.launch({ executablePath, headless: true });
  const url = new URL('perspective-demo.html', server.resolvedUrls.local[0]).href;
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  desktop.on('pageerror', error => errors.push(error.message));
  await desktop.goto(url);
  assert.equal(await desktop.locator('#case-enter').isDisabled(), true);
  await enter(desktop, 'tenant');
  assert.equal(await desktop.locator('[data-scene-reveal]:visible').count(), 0);
  await desktop.screenshot({ path: path.join(output, 'scene-play-tenant-before.png'), fullPage: true });

  const curtain = desktop.locator('[data-scene-object="D1"]');
  await curtain.click();
  assert.match(await desktop.locator('#progress-text').innerText(), /0\/5/);
  const box = await curtain.boundingBox();
  await desktop.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await desktop.mouse.down();
  await desktop.mouse.move(box.x + box.width / 2 + 5, box.y + box.height / 2);
  await desktop.mouse.up();
  assert.equal(await curtain.isVisible(), true);
  assert.match(await desktop.locator('#progress-text').innerText(), /0\/5/);

  await collect(desktop, 'D1', 1);
  assert.equal(await desktop.locator('.reveal-loo').isVisible(), true);
  assert.equal(await desktop.locator('[data-scene-reveal]:visible').count(), 1);
  assert.match(await desktop.locator('#progress-text').innerText(), /1\/5/);
  await desktop.screenshot({ path: path.join(output, 'scene-play-tenant-reveal.png'), fullPage: true });
  await desktop.locator('#face-button').click();
  await desktop.locator('#go-anyway').click();
  await desktop.locator('[data-charge="D2"]').click();
  await desktop.locator('[data-evidence="D1"]').click();
  assert.match(await desktop.locator('#deposit-text').innerText(), /\$0 \/ \$500/);
  await desktop.locator('[data-charge="D1"]').click();
  await desktop.locator('[data-evidence="D1"]').click();
  await desktop.locator('#partial-finish').click();
  assert.match(await desktop.locator('.settlement').innerText(), /\$100 \/ \$500/);
  await desktop.locator('#back-to-room').click();
  for (const [id, steps] of Object.entries({ D2: 2, D3: 1, D4: 2, D5: 3 })) await collect(desktop, id, steps);
  assert.match(await desktop.locator('#progress-text').innerText(), /5\/5/);
  await desktop.locator('#phone-button').click();
  assert.match(await desktop.locator('#modal-content').innerText(), /已记录/);
  await desktop.locator('#modal-close').click();
  await desktop.locator('#face-button').click();
  for (const id of ['D2', 'D3', 'D4', 'D5']) {
    await desktop.locator(`[data-charge="${id}"]`).click();
    await desktop.locator(`[data-evidence="${id}"]`).click();
  }
  assert.match(await desktop.locator('.settlement').innerText(), /\$500 \/ \$500/);
  const events = await desktop.evaluate(() => JSON.parse(localStorage.getItem('deposit-wars-dual-view-events') || '[]'));
  assert.ok(events.some(event => event.type === 'evidence_match' && event.value === false));
  assert.ok(events.some(event => event.type === 'level_finish'));
  await desktop.locator('#flip-role').click();
  await desktop.locator('#case-enter').click();
  for (const [id, steps] of Object.entries({ D1: 1, D2: 2, D3: 1, D4: 2, D5: 3 })) await collect(desktop, id, steps);
  await desktop.locator('#face-button').click();
  for (const id of ['D1', 'D2', 'D3', 'D4', 'D5']) {
    await desktop.locator(`[data-charge="${id}"]`).click();
    await desktop.locator(`[data-evidence="${id}"]`).click();
  }
  assert.match(await desktop.locator('.settlement').innerText(), /\$500 \/ \$500/);
  assert.deepEqual(errors, []);
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(url);
  await enter(mobile, 'tenant');
  await mobile.screenshot({ path: path.join(output, 'scene-play-mobile-before.png'), fullPage: true });
  await mobile.locator('#hint-button').tap();
  assert.match(await mobile.locator('#scene-status').innerText(), /帘子/);
  await touchDrag(mobile, 'D1');
  assert.match(await mobile.locator('#progress-text').innerText(), /1\/5/);
  await mobile.locator('[data-scene-object="D2"][data-step="0"]').focus();
  await mobile.keyboard.press('Enter');
  assert.equal(await mobile.locator('.reveal-fungi').isVisible(), true);
  await mobile.locator('#sound-button').tap();
  assert.equal(await mobile.locator('#sound-button').getAttribute('aria-pressed'), 'false');
  assert.deepEqual(errors, []);
  console.log('Direct scene play: no numbered markers, mouse/touch drag, keyboard, five clues, dual-role settlement PASS');
} finally {
  await browser?.close();
  await server.close();
}
