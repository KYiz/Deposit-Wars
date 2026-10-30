import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'test-output');
fs.mkdirSync(output, { recursive: true });
const executablePath = process.env.BROWSER_PATH || [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find(fs.existsSync);
if (!executablePath) throw new Error('Set BROWSER_PATH to Chrome or Edge.');

const browser = await chromium.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(path.join(root, 'offline-demo.html')).href);
  await page.locator('[data-case-role="tenant"]').click();
  await page.locator('#case-enter').click();
  await page.locator('.scene-object img').first().evaluate(async img => {
    if (!img.complete) await new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
  });
  assert.equal(await page.locator('.scene-object img').evaluateAll(images => images.every(img => img.naturalWidth > 0)), true);
  await page.screenshot({ path: path.join(output, 'task017-first-room.png'), fullPage: true });

  async function drag(id) {
    const object = page.locator(`[data-scene-object="${id}"]:not([hidden])`);
    const box = await object.boundingBox();
    assert.ok(box, `visible PNG object ${id}`);
    const direction = await object.getAttribute('data-direction');
    const [dx, dy] = { right: [90, 0], left: [-90, 0], up: [0, -90], down: [0, 90] }[direction];
    const x = box.x + box.width / 2, y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + dx, y + dy, { steps: 6 });
    await page.mouse.up();
  }
  for (const [id, steps] of [['D1', 1], ['D2', 2], ['D3', 1], ['D4', 2], ['D5', 3]]) {
    for (let i = 0; i < steps; i++) await drag(id);
  }
  assert.match(await page.locator('#progress-text').innerText(), /5\s*\/\s*5/);
  await page.screenshot({ path: path.join(output, 'task017-first-room-revealed.png'), fullPage: true });
  await page.locator('#switch-role').click();
  await page.locator('[data-case-role="landlord"]').click();
  await page.locator('#case-enter').click();
  assert.match(await page.locator('#role-tag').innerText(), /房东/);
  for (const [id, steps] of [['D1', 1], ['D2', 2], ['D3', 1], ['D4', 2], ['D5', 3]]) {
    for (let i = 0; i < steps; i++) {
      const object = page.locator(`[data-scene-object="${id}"][data-step="${i}"]`);
      await object.focus();
      await page.keyboard.press('Enter');
    }
  }
  assert.match(await page.locator('#progress-text').innerText(), /5\s*\/\s*5/);

  const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await touchContext.newPage();
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(pathToFileURL(path.join(root, 'offline-demo.html')).href);
  await mobile.locator('[data-case-role="tenant"]').click();
  await mobile.locator('#case-enter').click();
  const curtain = mobile.locator('[data-scene-object="D1"]');
  await curtain.scrollIntoViewIfNeeded();
  const curtainBox = await curtain.boundingBox();
  assert.ok(curtainBox);
  const touchX = curtainBox.x + curtainBox.width / 2, touchY = curtainBox.y + curtainBox.height / 2;
  const cdp = await touchContext.newCDPSession(mobile);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touchX, y: touchY }] });
  for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: touchX + i * 12, y: touchY }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach();
  assert.match(await mobile.locator('#progress-text').innerText(), /1\s*\/\s*5/);
  await mobile.locator('[data-scene-object="D2"][data-step="0"]').focus();
  await mobile.keyboard.press('Enter');
  await mobile.locator('[data-scene-object="D2"][data-step="1"]').focus();
  await mobile.keyboard.press('Enter');
  assert.match(await mobile.locator('#progress-text').innerText(), /2\s*\/\s*5/);
  await touchContext.close();

  const preview = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  preview.on('pageerror', error => errors.push(error.message));
  await preview.goto(pathToFileURL(path.join(root, 'level-art-preview.html')).href);
  for (let level = 1; level <= 6; level++) {
    await preview.locator('.case-tabs button').nth(level - 1).click();
    for (const role of ['tenant', 'landlord']) {
      await preview.locator(`#${role}`).click();
      assert.equal(await preview.locator('.prop').count(), 3);
      await preview.waitForFunction(() => document.querySelector('.room')?.naturalWidth > 0 && [...document.querySelectorAll('.prop img')].every(img => img.naturalWidth > 0));
    }
  }
  await preview.screenshot({ path: path.join(output, 'task017-level-06.png'), fullPage: true });
  assert.deepEqual(errors, []);
  console.log('TASK-017: first room PNG drag 5/5, touch and keyboard, both roles, six rooms and 36 unique prop references PASS');
} finally {
  await browser.close();
}
