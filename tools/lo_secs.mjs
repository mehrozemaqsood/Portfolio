import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/lensesonline',{waitUntil:'networkidle'});
const r = await p.evaluate(()=>{const s=document.querySelector('.stage-d');const base=s.getBoundingClientRect().top+scrollY;return [...s.querySelectorAll('section,footer')].map(e=>[e.getAttribute('aria-label')||e.tagName,Math.round((e.getBoundingClientRect().top+scrollY-base)*10)/10,Math.round(e.getBoundingClientRect().height*10)/10])});
console.log(r.map(x=>x.join(' | ')).join('\n'));
await b.close();
