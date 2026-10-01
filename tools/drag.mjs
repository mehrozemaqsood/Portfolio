import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(800);
await p.evaluate(()=>document.querySelector('.stage-d .rec-stack').scrollIntoView({block:'center'})); await p.waitForTimeout(1200);
const bb=await p.locator('.stage-d .rec-stack').boundingBox();
const cx=bb.x+bb.width/2, cy=bb.y+bb.height/2;
await p.mouse.move(cx,cy); await p.mouse.down(); await p.mouse.move(cx+160,cy+6,{steps:8}); await p.mouse.up();
for(let i=0;i<8;i++){ await p.screenshot({path:`/tmp/d_${i}.png`,clip:{x:bb.x-120,y:bb.y-90,width:bb.width+240,height:bb.height+150}}); await p.waitForTimeout(90); }
console.log(errs.join('|')||'no errors');
await b.close();
