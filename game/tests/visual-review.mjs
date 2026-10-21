// Captures unaltered running prototype pixels for TASK-005; no game state edits.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(root, '../deposit_wars_skills/artifacts/art/review');
fs.mkdirSync(out, { recursive: true });
const executablePath = process.env.BROWSER_PATH || [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find(fs.existsSync);
if (!executablePath) throw new Error('Set BROWSER_PATH to a Chromium executable.');

const server = await createServer({ root, server: { host: '127.0.0.1', port: 0 } });
let browser;
try {
  await server.listen();
  const url = server.resolvedUrls.local[0];
  browser = await chromium.launch({ executablePath, headless: true });
  for (const spec of [
    { name: 'desktop', viewport: { width: 1280, height: 900 } },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  ]) {
    const context = await browser.newContext(spec);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.locator('#game canvas').waitFor();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.screenshot({ path: path.join(out, `actual-${spec.name}-page.png`), fullPage: true });
    await page.locator('#game-viewport').screenshot({ path: path.join(out, `actual-${spec.name}-room-left.png`) });
    if (spec.name === 'mobile') {
      await page.locator('#game-viewport').evaluate(el => { el.scrollLeft = el.scrollWidth - el.clientWidth; });
      await page.evaluate(() => new Promise(requestAnimationFrame));
      await page.locator('#game-viewport').screenshot({ path: path.join(out, 'actual-mobile-room-right.png') });
    }
    if (errors.length) throw new Error(`${spec.name} page errors: ${errors.join('; ')}`);
    await context.close();
  }
  console.log(`PASS actual runtime screenshots saved to ${out}`);
} finally {
  await browser?.close();
  await server.close();
}
