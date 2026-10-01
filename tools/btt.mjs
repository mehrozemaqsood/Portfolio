import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [n,w,h,sel] of [['d',1440,900,'a[href="#top"]'],['m',390,800,'[data-top]']]){
  const p=await b.newPage({viewport:{width:w,height:h},hasTouch:n==='m'});
  await p.goto('http://localhost:4321/');await p.waitForTimeout(800);
  await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(800);
  const y0=await p.evaluate(()=>scrollY);
  await p.evaluate((s)=>[...document.querySelectorAll(s)].find(e=>e.offsetParent).click(),sel);
  const ys=[];for(let i=0;i<14;i++){await p.waitForTimeout(150);ys.push(Math.round(await p.evaluate(()=>scrollY)))}
  console.log(n,y0,ys.join(' '));await p.close();
}
await b.close();
