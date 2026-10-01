import { chromium } from 'playwright';
const [,,pg] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:768,height:800} });
await p.goto('http://localhost:4321/'+pg,{waitUntil:'networkidle'});
const r = await p.evaluate(()=>{const s=document.querySelector('.stage-t');const base=s.getBoundingClientRect().top+scrollY;return [...s.querySelectorAll('section,footer')].filter(e=>!e.parentElement.closest('section,footer')).map(e=>[e.getAttribute('aria-label')||e.tagName,Math.round((e.getBoundingClientRect().top+scrollY-base)*10)/10,Math.round(e.getBoundingClientRect().height*10)/10])});
console.log(r.map(x=>x.join(' | ')).join('\n'));
console.log('TOTAL', await p.evaluate(()=>Math.round(document.querySelector('.stage-t').getBoundingClientRect().height)));
await b.close();
