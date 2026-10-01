import { chromium } from 'playwright';
const [,, slug, y, out] = process.argv;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:390,height:700} });
await p.goto('http://localhost:4321/'+slug+'?still',{waitUntil:'networkidle'});
await p.evaluate(y=>window.scrollTo(0,+y),y); await p.waitForTimeout(500);
await p.screenshot({path:out});
await b.close();
