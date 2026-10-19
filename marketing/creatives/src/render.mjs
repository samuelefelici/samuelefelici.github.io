#!/usr/bin/env node
/**
 * Renderizza le creatività di marketing/creatives/src/creatives.mjs in JPG.
 *
 *   node marketing/creatives/src/render.mjs            # tutte
 *   node marketing/creatives/src/render.mjs tpl siti   # solo i nomi che contengono "tpl" o "siti"
 *
 * Variabili d'ambiente:
 *   CHROMIUM_PATH     eseguibile Chromium (default /opt/pw-browsers/chromium se esiste)
 *   PLAYWRIGHT_DIR    cartella con node_modules/playwright, se non è risolvibile dal repo
 *   JPEG_QUALITY      default 88
 */
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { creatives } from './creatives.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '..');
const template = pathToFileURL(join(here, 'template.html')).href;
const SIZES = { sq: [1080, 1080], pt: [1080, 1350], st: [1080, 1920] };
const quality = Number(process.env.JPEG_QUALITY || 88);

const pick = (m) => m.chromium ?? m.default?.chromium;

async function loadPlaywright() {
  const tries = ['playwright', 'playwright-core'];
  for (const name of tries) {
    try { const c = pick(await import(name)); if (c) return c; } catch {}
  }
  for (const dir of [process.env.PLAYWRIGHT_DIR, '/tmp/claude-0/creatives'].filter(Boolean)) {
    const req = createRequire(join(dir, 'package.json'));
    for (const name of tries) {
      try { const c = pick(await import(pathToFileURL(req.resolve(name)).href)); if (c) return c; } catch {}
    }
  }
  throw new Error('Playwright non trovato: `npm i --no-save playwright` nel repo, oppure imposta PLAYWRIGHT_DIR.');
}

const chromium = await loadPlaywright();
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath, args: ['--allow-file-access-from-files', '--font-render-hinting=none'] });

const filters = process.argv.slice(2);
const list = filters.length ? creatives.filter((c) => filters.some((f) => c.name.includes(f))) : creatives;

for (const cfg of list) {
  const [width, height] = SIZES[cfg.format];
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error(`[${cfg.name}] errore pagina:`, e.message));
  await page.goto(template);
  await page.evaluate((c) => window.render(c), cfg);
  const file = join(outDir, `${cfg.name}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality, clip: { x: 0, y: 0, width, height } });
  console.log(`${cfg.name}.jpg  ${width}×${height}`);
  await page.close();
}
await browser.close();
