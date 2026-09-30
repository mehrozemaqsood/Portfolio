import sharp from 'sharp'; import fs from 'fs'; import crypto from 'crypto';
const d='src/assets/raw/'; const out=[];
for (const f of fs.readdirSync(d)) { const b=fs.readFileSync(d+f); const m=await sharp(b).metadata();
 out.push({file:f,w:m.width,h:m.height,alpha:m.hasAlpha,kb:Math.round(b.length/1024),hash:crypto.createHash('md5').update(b).digest('hex').slice(0,8)});}
fs.writeFileSync('src/assets/manifest.json',JSON.stringify(out,null,1));
const dup={};out.forEach(o=>(dup[o.hash]??=[]).push(o.file));
console.log(out.length,'files; duplicates:',Object.values(dup).filter(a=>a.length>1).length, 'max w',Math.max(...out.map(o=>o.w)),'alpha',out.filter(o=>o.alpha).length);
