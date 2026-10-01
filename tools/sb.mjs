import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,path] of [[1440,'/boltshift'],[1440,'/'],[390,'/boltshift'],[1920,'/boltshift']]) {
  const p = await (await b.newContext({viewport:{width:w,height:900}})).newPage();
  await p.goto('http://localhost:4321'+path); await p.waitForTimeout(800);
  const r=await p.evaluate(()=>{const out=[['html',innerWidth-document.documentElement.clientWidth]];document.querySelectorAll('div').forEach(e=>{const cs=getComputedStyle(e);if((cs.overflowY=='auto'||cs.overflowY=='scroll')&&e.scrollHeight>e.clientHeight+4&&e.offsetParent){const bw=(e.getBoundingClientRect().width-e.clientWidth*(e.getBoundingClientRect().width/e.offsetWidth));out.push([(e.className+'').slice(0,28),+(e.getBoundingClientRect().width-e.clientWidth*e.getBoundingClientRect().width/e.offsetWidth).toFixed(1)])}});return out.slice(0,6)});
  console.log(w,path,JSON.stringify(r)); await p.close();
}
await b.close();
