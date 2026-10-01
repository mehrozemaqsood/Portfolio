import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
const [slug, w] = [process.argv[2], +process.argv[3] || 1440];
const url = (q) => `http://localhost:4321/${slug === 'index' ? '' : slug}${q}`;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const shot = async (q, scroll) => {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url(q)); await p.waitForTimeout(800);
  if (scroll) { const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); } await p.waitForTimeout(2200); await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500); }
  const left = await p.evaluate(() => document.querySelectorAll('[data-rv]').length);
  const buf = await p.screenshot({ fullPage: true }); await p.close(); return [PNG.sync.read(buf), left];
};
const [a] = await shot('?still', true); const [c, left] = await shot(process.env.CTRL ? '?still' : '', true);
const h = Math.min(a.height, c.height); const d = pixelmatch(a.data, c.data, null, a.width, h, { threshold: 0.1 });
const rows=[];for(let y=0;y<h;y++){let n=0;for(let x=0;x<a.width;x++){const i=(y*a.width+x)*4;if(Math.abs(a.data[i]-c.data[i])+Math.abs(a.data[i+1]-c.data[i+1])+Math.abs(a.data[i+2]-c.data[i+2])>40){n++;}}if(n)rows.push(y);}
import('fs').then(f=>{f.writeFileSync('/tmp/a.png',PNG.sync.write(a));f.writeFileSync('/tmp/c.png',PNG.sync.write(c))});
const bands=[];for(const y of rows){const l=bands[bands.length-1];if(l&&y-l[1]<20)l[1]=y;else bands.push([y,y]);}
console.log('bands',JSON.stringify(bands.slice(0,15)));
console.log(slug, w, 'heights', a.height, c.height, 'diffpx', d, 'unrevealed', left);
await b.close();
