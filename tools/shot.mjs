import { chromium } from 'playwright';
const [,, url, out, w='1440', h='900', full='1'] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:+w,height:+h}, deviceScaleFactor:1 });
await p.goto(url,{waitUntil:'networkidle'});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0)});
await p.waitForTimeout(500);
await p.screenshot({path:out,fullPage:full==='1'});
await b.close();
