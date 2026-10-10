/* Render shorts/*.html to MP4 by seeking the page's deterministic timeline frame by frame.
   Usage:  node render/render.mjs calibration [--wide]
   Needs:  playwright (npm i playwright) and ffmpeg on PATH.
   Output: shorts/<name>.mp4 (1080x1920) or shorts/<name>-wide.mp4 (1920x1080), 30 fps, silent.
   Fonts are loaded from Google Fonts at render time; render on a machine with internet so Space Grotesk is embedded. */
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const name = process.argv[2] || 'calibration'; const wide = process.argv.includes('--wide');
const FPS = 30, W = wide ? 1920 : 1080, H = wide ? 1080 : 1920;
const tmp = fs.mkdtempSync(path.join(ROOT, 'render', 'frames-'));

const srv = http.createServer((req, res) => { const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0])); if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.setHeader('content-type', { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(res); }).listen(4174);

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(`http://localhost:4174/shorts/${name}.html?render=1${wide ? '&wide=1' : ''}`);
await page.waitForTimeout(1500); // fonts
const DUR = await page.evaluate(() => window.__duration);
const total = Math.round(DUR * FPS);
for (let i = 0; i < total; i++) {
  await page.evaluate(t => window.__seek(t), i / FPS);
  await page.screenshot({ path: path.join(tmp, `f${String(i).padStart(5, '0')}.png`), clip: { x: 0, y: 0, width: W, height: H } });
  if (i % 60 === 0) process.stdout.write(`\r${i}/${total}`);
}
await browser.close(); srv.close();
const out = path.join(ROOT, 'shorts', `${name}${wide ? '-wide' : ''}.mp4`);
execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${tmp}/f%05d.png -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart "${out}"`);
fs.rmSync(tmp, { recursive: true });
console.log(`\nwrote ${out}`);
