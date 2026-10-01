import { chromium } from 'playwright';
const [,,pg,sel] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:390,height:800} });
await p.goto('http://localhost:4321/'+pg,{waitUntil:'networkidle'});
const r = await p.evaluate((sel)=>{const s=document.querySelector('.stage-m '+sel);const z=parseFloat(getComputedStyle(document.querySelector('.stage-m')).zoom)||1;const b0=s.getBoundingClientRect().top;return [...s.querySelectorAll('*')].filter(e=>e.children.length==0||e.tagName=='P'||e.tagName=='H2').map(e=>{const r=e.getBoundingClientRect();return [e.tagName,(e.textContent||'').slice(0,28),Math.round((r.top-b0)/z*10)/10,Math.round(r.height/z*10)/10]})},sel);
console.log(r.map(x=>x.join(' | ')).join('\n'));await b.close();
