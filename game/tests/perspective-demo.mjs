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
}

async function collect(page, id, steps) {
  await page.locator(`[data-defect="${id}"]`).click();
  for (let index = 0; index < steps; index++) {
    await page.locator('#drag-object').dragTo(page.locator('#drag-target'));
    assert.equal(await page.locator('.puzzle-found').count(), 1);
  }
  await page.locator('#open-phone-detail').click();
  await page.locator('#record-evidence').click();
  await page.locator('#modal-close').click();
}

async function touchDrag(page) {
  const from = await page.locator('#drag-object').boundingBox();
  const to = await page.locator('#drag-target').boundingBox();
  assert.ok(from && to);
  const x = from.x + from.width / 2, y = from.y + from.height / 2;
  const endX = to.x + to.width / 2, endY = to.y + to.height / 2;
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let step = 1; step <= 5; step++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + (endX - x) * step / 5, y: y + (endY - y) * step / 5 }] });
  }
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
  await desktop.screenshot({ path: path.join(output, 'full-game-tenant-room.png'), fullPage: true });
  assert.equal(await desktop.locator('[data-defect]').count(), 5);

  // A reveal is required before Phone recording; partial settlement can return to the room.
  await desktop.locator('[data-defect="D1"]').click();
  await desktop.screenshot({ path: path.join(output, 'drag-puzzle-d1.png'), fullPage: true });
  assert.equal(await desktop.locator('#record-evidence').count(), 0);
  await desktop.locator('#drag-object').dragTo(desktop.locator('.puzzle-trail'));
  assert.equal(await desktop.locator('.puzzle-found').count(), 0);
  assert.equal(await desktop.locator('#drag-object').getAttribute('style'), '');
  await desktop.locator('#drag-object').dragTo(desktop.locator('#drag-target'));
  assert.match(await desktop.locator('.puzzle-found').innerText(), /马桶与厨房同框/);
  await desktop.locator('#open-phone-detail').click();
  await desktop.locator('#record-evidence').click();
  await desktop.locator('#modal-close').click();
  assert.match(await desktop.locator('#progress-text').innerText(), /1\/5/);
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
  const steps = { D2: 2, D3: 1, D4: 2, D5: 3 };
  for (const [id, count] of Object.entries(steps)) await collect(desktop, id, count);
  assert.match(await desktop.locator('#progress-text').innerText(), /5\/5/);
  await desktop.locator('#face-button').click();
  for (const id of Object.keys(steps)) {
    await desktop.locator(`[data-charge="${id}"]`).click();
    await desktop.locator(`[data-evidence="${id}"]`).click();
  }
  assert.match(await desktop.locator('.settlement').innerText(), /\$500 \/ \$500/);
  const events = await desktop.evaluate(() => JSON.parse(localStorage.getItem('deposit-wars-dual-view-events') || '[]'));
  assert.ok(events.some(event => event.type === 'evidence_match' && event.value === false));
  assert.ok(events.some(event => event.type === 'level_finish'));
  await desktop.screenshot({ path: path.join(output, 'full-game-tenant-win.png'), fullPage: true });
  await desktop.locator('#flip-role').click();
  assert.equal(await desktop.locator('[data-case-role="landlord"]').getAttribute('aria-pressed'), 'true');
  await desktop.locator('#case-enter').click();
  await desktop.screenshot({ path: path.join(output, 'full-game-landlord-room.png'), fullPage: true });
  for (const [id, count] of Object.entries({ D1: 1, D2: 2, D3: 1, D4: 2, D5: 3 })) await collect(desktop, id, count);
  await desktop.locator('#face-button').click();
  for (const id of ['D1', 'D2', 'D3', 'D4', 'D5']) {
    await desktop.locator(`[data-charge="${id}"]`).click();
    await desktop.locator(`[data-evidence="${id}"]`).click();
  }
  assert.match(await desktop.locator('.settlement').innerText(), /\$500 \/ \$500/);
  assert.match(await desktop.locator('#modal-content').innerText(), /五项问题已核对/);
  await desktop.screenshot({ path: path.join(output, 'full-game-landlord-win.png'), fullPage: true });
  assert.deepEqual(errors, []);
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(url);
  await mobile.locator('[data-case-role="tenant"]').tap();
  await mobile.locator('#case-enter').tap();
  await mobile.screenshot({ path: path.join(output, 'full-game-mobile-room.png'), fullPage: true });
  await mobile.locator('#mobile-hint-button').tap();
  assert.match(await mobile.locator('#scene-status').innerText(), /提示 D1/);
  await mobile.locator('[data-defect="D1"]').tap();
  assert.equal(await mobile.locator('#drag-object').count(), 1);
  await touchDrag(mobile);
  assert.match(await mobile.locator('.puzzle-found').innerText(), /马桶与厨房同框/);
  await mobile.waitForTimeout(350);
  await mobile.locator('#open-phone-detail').tap();
  await mobile.locator('#record-evidence').tap();
  await mobile.locator('#modal-close').tap();
  assert.match(await mobile.locator('#progress-text').innerText(), /1\/5/);
  await mobile.locator('[data-defect="D2"]').tap();
  await mobile.locator('#do-step').focus();
  await mobile.keyboard.press('Enter');
  assert.match(await mobile.locator('.puzzle-found').innerText(), /蘑菇/);
  await mobile.locator('#modal-close').tap();
  await mobile.locator('#sound-button').tap();
  assert.equal(await mobile.locator('#sound-button').getAttribute('aria-pressed'), 'false');
  assert.deepEqual(errors, []);
  console.log('Full dual-role demo: five defects, Phone, wrong match, partial recovery, $500 settlement, mobile PASS');
} finally {
  await browser?.close();
  await server.close();
}
