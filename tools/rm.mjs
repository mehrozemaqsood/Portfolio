import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3}); const p=await c.newPage();
await p.goto('http://localhost:4321/'); await p.waitForTimeout(9000);
const r=await p.evaluate(()=>{const e=document.querySelector('.stage-m .ms-vp').getBoundingClientRect();return [e.left,e.top,e.right,e.bottom]});
console.log(r);
await p.screenshot({path:'/tmp/rm.png',clip:{x:r[2]-30,y:r[1]-10,width:45,height:r[3]-r[1]+25}});
await b.close();
