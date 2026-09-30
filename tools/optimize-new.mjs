import sharp from 'sharp'; import fs from 'fs';
const raw='src/assets/raw/', out='public/img';
const res=JSON.parse(fs.readFileSync('src/assets/images.json'));
sharp.concurrency(4);
let n=0;
for (const f of fs.readdirSync(raw)) {
  const id=f.replace(/\.(jpg|png)$/,''); if(res[id]) continue;
  const b=fs.readFileSync(raw+f); const m=await sharp(b).metadata();
  res[id]={w:m.width,h:m.height,variants:[]};
  const ws=[...new Set([400,800,1200,1600].filter(w=>w<m.width).concat([Math.min(m.width,1600)]))].sort((a,b)=>a-b);
  for(const w of ws){ for(const [ext,opt] of [['avif',{quality:55,effort:2}],['webp',{quality:80}]]) await sharp(b).resize({width:w,withoutEnlargement:true})[ext](opt).toFile(`${out}/${id}-${w}.${ext}`); res[id].variants.push(w); }
  res[id].blur='data:image/webp;base64,'+(await sharp(b).resize(16).blur().webp({quality:40}).toBuffer()).toString('base64');
  n++;
}
fs.writeFileSync('src/assets/images.json',JSON.stringify(res)); console.log('added',n);
