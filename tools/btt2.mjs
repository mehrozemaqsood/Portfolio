import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1440,height:900}});
p.on('console',m=>console.log('C',m.text()));p.on('pageerror',e=>console.log('E',e.message));
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(800);
await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(800);
console.log(await p.evaluate(()=>[document.documentElement.scrollHeight,scrollY,innerHeight,matchMedia('(prefers-reduced-motion: reduce)').matches]));
await p.evaluate(()=>{const a=[...document.querySelectorAll('a[href="#top"]')].find(e=>e.offsetParent);const ev=new MouseEvent('click',{bubbles:true,cancelable:true});a.dispatchEvent(ev);console.log('prevented',ev.defaultPrevented)});
for(let i=0;i<8;i++){await p.waitForTimeout(200);console.log(await p.evaluate(()=>scrollY))}
await b.close();
