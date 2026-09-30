// usage: node tools/stic_shifts.mjs url width map.json out.json  -> per-text-element boxes (page coords, unzoomed 1:1 at viewport=stage width)
import { chromium } from 'playwright';
import fs from 'fs';
const [,, url, w, out] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const c = await b.newContext({viewport:{width:+w,height:900},reducedMotion:'reduce'});
const p = await c.newPage();
await p.goto(url,{waitUntil:'networkidle'});
const res = await p.evaluate((w)=>{
  const stage=[...document.querySelectorAll('.stage')].find(s=>getComputedStyle(s).display!=='none');
  const arr=[];
  const walker=document.createTreeWalker(stage,NodeFilter.SHOW_TEXT);
  let n; while(n=walker.nextNode()){ if(!n.textContent.trim())continue; const el=n.parentElement; const cs=getComputedStyle(el);
    if(el.closest('[hidden]'))continue;
    const r=document.createRange(); r.selectNodeContents(n); const rc=r.getBoundingClientRect();
    arr.push({t:n.textContent.trim().slice(0,30),x:rc.x,y:rc.y+scrollY,w:rc.width,h:rc.height,fs:cs.fontSize,lh:cs.lineHeight,fw:cs.fontWeight,ff:cs.fontFamily.split(',')[0]});}
  return arr;}, +w);
fs.writeFileSync(out,JSON.stringify(res));
console.log(res.length);
await b.close();
