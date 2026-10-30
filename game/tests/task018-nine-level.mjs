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
  await page.goto(pathToFileURL(path.join(root, 'level-art-preview.html')).href);
  await page.waitForURL(/nine-level-demo\.html$/);
  const levels = await page.evaluate(() => window.NINE_LEVELS);
  assert.equal(levels.length, 9);
  assert.equal(new Set(levels.map(level => level.home)).size, 9);
  const seen = new Set();
  let inventorySize;
  for (let levelIndex = 0; levelIndex < 9; levelIndex++) {
    const level = levels[levelIndex];
    await page.locator('#level-nav button').nth(levelIndex).click();
    await page.waitForFunction(() => document.querySelector('#room-art')?.naturalWidth > 0);
    for (const role of ['tenant', 'landlord']) {
      await page.locator(`#${role}-role`).click();
      await page.waitForFunction(() => [...document.querySelectorAll('.pickup img')].every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.locator('.inventory-slot').count(), 6);
      assert.equal(await page.locator('.inventory-slot:not(.locked)').count(), level.capacity);
      const size = await page.locator('#inventory-shell').boundingBox();
      if (!inventorySize) inventorySize = { width: size.width, height: size.height };
      else assert.deepEqual({ width: size.width, height: size.height }, inventorySize);
      const route = level.roles[role];
      assert.equal(route.cases.length, 2);
      for (const problem of route.cases) {
        assert.equal(seen.has(problem.id), false, `duplicate ${problem.id}`);
        seen.add(problem.id);
      }
      const countBeforeDecoy = await page.locator('.inventory-slot img').count();
      await page.locator('.pickup.decoy').focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.inventory-slot img').count(), countBeforeDecoy);
      for (const problem of route.cases) {
        for (const item of problem.items) {
          const pickup = page.locator(`.pickup[data-item-id="${item.id}"]`);
          await pickup.focus();
          await page.keyboard.press('Enter');
        }
      }
      assert.equal(await page.locator('.inventory-slot img').count(), level.capacity);
      assert.equal(await page.locator('.inventory-slot img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
      assert.equal(await page.locator('.inventory-slot.empty').count(), 0);
      const [first, second] = route.cases;
      await page.locator(`.inventory-slot[data-case-id="${first.id}"]`).first().click();
      await page.locator(`.problem-zone[data-case-id="${second.id}"]`).focus();
      await page.keyboard.press('Enter');
      assert.match(await page.locator('#mark-progress').innerText(), /0\s*\/\s*2/);
      for (const problem of route.cases) {
        await page.locator(`.inventory-slot[data-case-id="${problem.id}"]`).first().click();
        await page.locator(`.problem-zone[data-case-id="${problem.id}"]`).focus();
        await page.keyboard.press('Enter');
      }
      assert.match(await page.locator('#mark-progress').innerText(), /2\s*\/\s*2/);
      if (levelIndex < 8) assert.equal(await page.locator('#next-level').isEnabled(), true);
    }
    if (levelIndex === 0) await page.screenshot({ path: path.join(output, 'task018-level-01-complete.png'), fullPage: true });
    if (levelIndex === 8) await page.screenshot({ path: path.join(output, 'task018-level-09-complete.png'), fullPage: true });
  }
  assert.equal(seen.size, 36);
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await mobileContext.newPage();
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(pathToFileURL(path.join(root, 'nine-level-demo.html')).href);
  const curtain = mobile.locator('.pickup[data-item-id="E01-0"]');
  await curtain.scrollIntoViewIfNeeded();
  const box = await curtain.boundingBox();
  assert.ok(box);
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  const cdp = await mobileContext.newCDPSession(mobile);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let i = 1; i <= 5; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + i * 15, y }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach();
  assert.equal(await mobile.locator('.inventory-slot img').count(), 1);
  await mobile.locator('.pickup[data-item-id="E02-0"]').tap();
  await mobile.locator('.inventory-slot[data-case-id="E01"]').tap();
  await mobile.locator('.problem-zone[data-case-id="E01"]').tap();
  assert.match(await mobile.locator('#mark-progress').innerText(), /1\s*\/\s*2/);
  const mobileInventory = await mobile.locator('#inventory-shell').boundingBox();
  assert.ok(mobileInventory.width <= 390);
  await mobile.screenshot({ path: path.join(output, 'task018-mobile-mark.png'), fullPage: true });
  await mobileContext.close();
  assert.deepEqual(errors, []);
  console.log('TASK-018: nine rooms, fixed inventory frame, variable slots, 36 case routes, decoys, wrong/correct marking, mobile touch PASS');
} finally {
  await browser.close();
}
