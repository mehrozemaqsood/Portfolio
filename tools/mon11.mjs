import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/');
const rows=[];
for (let i=0;i<14;i++){ await p.waitForTimeout(250); rows.push([Math.round(performance.now?0:0), await p.evaluate(()=>{const v=document.querySelector('.stage-d .ms-vp');return [getComputedStyle(v).opacity.slice(0,4), Math.round(new DOMMatrix(getComputedStyle(document.querySelector('.stage-d .ms-sc')).transform).m42*10)/10, Math.round(performance.now())]})]); await p.screenshot({path:`/tmp/j_${i}.png`,clip:{x:393,y:238,width:556,height:340}}); }
console.log(rows.map(r=>r[1].join('/')).join('  '));
await b.close();
