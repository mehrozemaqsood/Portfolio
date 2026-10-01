import { chromium } from 'playwright';
const [,,pg,sel] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:390,height:800} });
await p.goto('http://localhost:4321/'+pg,{waitUntil:'networkidle'});
const r = await p.evaluate((sel)=>{const e=document.querySelector('.stage-m '+sel);const z=parseFloat(getComputedStyle(document.querySelector('.stage-m')).zoom)||1;const t=e.firstChild;const rg=document.createRange();const out=[];let last=null;let cur='';const txt=t.textContent;for(let i=0;i<txt.length;i++){rg.setStart(t,i);rg.setEnd(t,i+1);const r=rg.getClientRects()[0];if(!r)continue;const k=Math.round(r.top);if(last!==null&&k!==last){out.push(cur);cur=''}last=k;cur+=txt[i]}out.push(cur);
const rr=[];for(const l of out){rr.push(l)}
// width of first line text
return rr},sel);
console.log(r.join('\n'));await b.close();
