import { chromium } from 'playwright';
const [,,pg,sel] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:390,height:800} });
await p.goto('http://localhost:4321/'+pg,{waitUntil:'networkidle'});
const r = await p.evaluate((sel)=>{const e=document.querySelector('.stage-m '+sel);const z=parseFloat(getComputedStyle(document.querySelector('.stage-m')).zoom)||1;const t=e.firstChild;const rg=document.createRange();const txt=t.textContent;const lines=[];let start=0,last=null;
for(let i=0;i<txt.length;i++){rg.setStart(t,i);rg.setEnd(t,i+1);const r=rg.getClientRects()[0];if(!r)continue;const k=Math.round(r.top);if(last!==null&&k!==last){lines.push([start,i]);start=i}last=k}lines.push([start,txt.length]);
return lines.map(([a,b])=>{rg.setStart(t,a);rg.setEnd(t,b);const rs=[...rg.getClientRects()];const w=Math.max(...rs.map(r=>r.right))-Math.min(...rs.map(r=>r.left));return [txt.slice(a,b),Math.round(w/z*100)/100]})},sel);
console.log(r.map(x=>x.join(' | ')).join('\n'));await b.close();
