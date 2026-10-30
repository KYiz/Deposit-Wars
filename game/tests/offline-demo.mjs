import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'offline-demo.html');
assert.ok(fs.existsSync(target), 'Run pnpm build:offline first.');
const executablePath = process.env.BROWSER_PATH || [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find(fs.existsSync);
if (!executablePath) throw new Error('Set BROWSER_PATH to Chrome or Edge.');

const browser = await chromium.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 820 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(target).href);
  await page.locator('.case-art').evaluate(async image => { if (!image.complete) await new Promise(resolve => image.onload = resolve); });
  assert.equal(await page.locator('.case-art').evaluate(image => image.naturalWidth > 0), true);
  assert.equal(await page.locator('#case-enter').isDisabled(), true);
  await page.locator('[data-case-role="tenant"]').click();
  await page.locator('#case-enter').click();
  assert.equal(await page.locator('.investigation-art').evaluate(image => image.complete && image.naturalWidth > 0), true);
  assert.equal(await page.locator('img[data-scene-reveal]').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
  assert.equal(await page.locator('.spot').count(), 0);
  const curtain = page.locator('[data-scene-object="D1"]');
  const box = await curtain.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();
  assert.equal(await page.locator('.reveal-loo').isVisible(), true);
  assert.match(await page.locator('#progress-text').innerText(), /1\s*\/\s*5/);
  assert.deepEqual(errors, []);
  console.log('Offline file demo: image, role selection, first puzzle PASS');
} finally {
  await browser.close();
}
