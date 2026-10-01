import { chromium } from 'playwright';
const [,,pg,alt,out] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:390,height:800} });
await p.goto('http://localhost:4321/'+pg,{waitUntil:'networkidle'});
const el=p.locator('.stage-m img[alt="'+alt+'"]').first();
await el.scrollIntoViewIfNeeded();await p.waitForTimeout(1500);
await el.screenshot({path:out});await b.close();
