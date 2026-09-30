const EX=new Set("124:1494,201:1148,201:1927,201:2299,201:3073,201:3088,201:3112,201:3235,201:3358,201:3381,201:5146,201:5153,242:2344,242:2370,242:2405,242:2413,242:2534,320:1980,338:1718,338:1732,338:1744,338:1746,355:1700,240:12088,240:12089,240:12090,240:12091,240:12110,240:12111,240:12112,240:12113,240:12114,240:12133,240:12134,240:12135,240:12156,255:22551,255:22552,255:22553,255:22554,255:22555,255:22556,255:22557,255:22558,255:22560,255:22562,255:22564,212:1307,212:1462,212:1560,212:1657,212:1812,212:1956,212:2078,212:2095,212:2190,212:2262,212:2279,212:2372,212:2442,212:2459,222:1304,222:1665,222:1678,222:1877,222:1890,222:1974,284:1722,284:1724,284:1725,284:1726,284:1727,284:1728,284:1812,284:1813,284:1814,284:1815,284:1816,284:1817,284:1818,284:1819,172:1234,172:1235,172:1237,172:1269,172:1280,289:2960,289:2962,289:2963,289:2964,289:2966,289:2967,289:2968,289:2971,289:2973,289:3026,289:3027,289:3028,289:3029,289:3030,289:3031,289:3032,289:3033,289:3034,289:3035,289:3036,289:3038,289:3039,289:3104,289:3105,289:3106,289:3107,289:3108,289:3109,289:3110,289:3111,289:3112,289:3113,289:3114,289:3115,289:3116,289:3117,289:3172,289:3173,289:3174,289:3175,289:3176,289:3177,289:3178,289:3179,289:3180,289:3181,289:3182,289:3183,289:3184,289:3185,241:10265,241:10596,241:10948,241:11620,241:12277,241:12997,241:13693,241:14449,241:14739,241:15099,241:15414,241:15768,241:16088,241:16375,241:1666,241:16741,241:17060,241:17813,241:18259,241:18601,241:18916,241:19257,241:2490,241:3143,241:3853,241:4394,241:5101,241:5874,241:6177,241:6553,241:6873,241:7239,241:7572,241:7907,241:8294,241:8624,241:9437,241:9897,242:1264,242:1300,242:1339,242:13396,242:1352,242:1395,242:1434,242:1470,242:1508,242:1521,242:1564,242:1697,242:1760,242:1765,269:1534,269:1536,269:1540,116:16401,116:16412,116:16423,124:1789,124:1792,137:2431,140:2758,140:2762,35:319,47:823,60:14598,60:14616,124:1953,284:1748,285:1701,285:1745,285:1748,285:1751,285:1754,287:1635,287:1638,287:1641,287:1644,287:1647,287:1650,287:1653,287:1656,166:1175,320:1823,320:1842,320:1844,326:1721,326:1722,326:1723,326:1724,326:1725,326:1726,326:1727,326:1728,326:1729,326:1731,326:1737,326:1738,326:1739,326:1740,326:1741,326:1742,326:1743,326:1744,326:1745,326:1747,326:1748,326:1778,326:1779,326:1780,326:1781,326:1782,326:1783,326:1784,326:1790,326:1792,326:1793,326:1794,326:1795,326:1796,326:1797,326:1827,326:1828,326:1829,326:1830,326:1831,326:1832,326:1838,326:1840,326:1841,326:1842,326:1843,326:1844,326:1845,326:1846,326:1876,326:1877,326:1878,326:1879,326:1880,326:1881,326:1887,137:2520,289:1742,289:1786,289:1789,289:1792,289:1795,289:1803,289:1806,289:1809,289:1812,289:1815,289:1818,289:1821,289:2961,289:2965,289:2969,289:2970,289:2972".split(","));
const R=v=>Math.round(v*100)/100;
const hx=c=>{const f=v=>Math.round(v*255).toString(16).padStart(2,"0");return "#"+f(c.r)+f(c.g)+f(c.b)};
const paint=p=>{
  if(p.visible===false)return null;
  if(p.type==="SOLID")return {k:"s",c:hx(p.color),o:p.opacity!==undefined&&p.opacity!==1?R(p.opacity):undefined};
  if(p.type.startsWith("GRADIENT")){const t=p.gradientTransform;return {k:p.type==="GRADIENT_LINEAR"?"gl":p.type==="GRADIENT_RADIAL"?"gr":"go",t:t.map(r=>r.map(v=>R(v*1000)/1000)),st:p.gradientStops.map(s=>[hx(s.color),R(s.color.a*(p.opacity===undefined?1:p.opacity)),R(s.position*1000)/1000]),o:undefined}}
  if(p.type==="IMAGE")return {k:"i",m:p.scaleMode,o:p.opacity!==undefined&&p.opacity!==1?R(p.opacity):undefined};
  return null;
};
const fl=a=>{if(a===figma.mixed||!a)return undefined;const r=a.map(paint).filter(Boolean);return r.length?r:undefined};
const eff=n=>{const r=[];for(const e of n.effects||[]){if(e.visible===false)continue;
  if(e.type==="DROP_SHADOW"||e.type==="INNER_SHADOW")r.push({k:e.type==="DROP_SHADOW"?"d":"n",c:hx(e.color),a:R(e.color.a),x:e.offset.x,y:e.offset.y,b:e.radius,s:e.spread||0});
  else if(e.type==="LAYER_BLUR")r.push({k:"lb",b:e.radius});else if(e.type==="BACKGROUND_BLUR")r.push({k:"bb",b:e.radius});}
  return r.length?r:undefined};
let svgN=0;
const out=(o,k,v)=>{if(v!==undefined&&v!==null&&v!==0&&v!==false&&!(Array.isArray(v)&&!v.length))o[k]=v};
async function ser(n,parent){
  if(n.visible===false)return null;
  const o={t:n.type[0]+(n.type==="TEXT"?"":n.type[1]),n:(n.name||"").slice(0,24),x:R(n.x),y:R(n.y),w:R(n.width),h:R(n.height)};
  if(n.type==="TEXT")o.t="T";else if(n.type==="FRAME"||n.type==="COMPONENT"||n.type==="INSTANCE"||n.type==="GROUP"||n.type==="SECTION")o.t=n.type==="GROUP"?"G":"F";
  else if(n.type==="RECTANGLE")o.t="R";else if(n.type==="ELLIPSE")o.t="E";else o.t="V";
  if(EX.has(n.id)){o.id=n.id;o.ex=1}
  out(o,"rot",R(n.rotation||0));
  if(n.opacity!==undefined&&n.opacity!==1)o.op=R(n.opacity);
  if(n.blendMode&&n.blendMode!=="NORMAL"&&n.blendMode!=="PASS_THROUGH")o.bm=n.blendMode;
  if(parent&&parent.layoutMode&&parent.layoutMode!=="NONE"){
    if(n.layoutPositioning==="ABSOLUTE")o.abs=1;
    if(n.layoutGrow)o.gr=n.layoutGrow;
    if(n.layoutAlign==="STRETCH")o.st=1;
  }
  const c=n.constraints;if(c&&parent&&(!parent.layoutMode||parent.layoutMode==="NONE"||n.layoutPositioning==="ABSOLUTE"))o.cn=[c.horizontal[0],c.vertical[0]];
  if("fills" in n){const f=fl(n.fills);if(f)o.f=f}
  if("strokes" in n){const s=fl(n.strokes);if(s){o.sk=s;const w=n.strokeWeight;o.sw=w===figma.mixed?[n.strokeTopWeight,n.strokeRightWeight,n.strokeBottomWeight,n.strokeLeftWeight]:w;o.sa=n.strokeAlign[0];if(n.dashPattern&&n.dashPattern.length)o.da=n.dashPattern}}
  if("cornerRadius" in n){const r=n.cornerRadius;if(r===figma.mixed)o.r=[n.topLeftRadius,n.topRightRadius,n.bottomRightRadius,n.bottomLeftRadius];else if(r)o.r=r}
  const e=eff(n);if(e)o.e=e;
  if(n.clipsContent&&(n.type==="FRAME"||n.type==="COMPONENT"||n.type==="INSTANCE"))o.cl=1;
  if(n.isMask)o.mk=1;
  if(n.layoutMode&&n.layoutMode!=="NONE"){o.L=n.layoutMode[0];o.g=n.itemSpacing;o.p=[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft];
    o.pa=n.primaryAxisAlignItems[0]+(n.primaryAxisAlignItems==="SPACE_BETWEEN"?"B":"");o.ca=n.counterAxisAlignItems[0];
    o.ps=n.primaryAxisSizingMode[0];o.cs=n.counterAxisSizingMode[0];if(n.layoutWrap==="WRAP")o.wr=1;}
  if(n.type==="TEXT"){
    const segs=n.getStyledTextSegments(["fontName","fontSize","fills","lineHeight","letterSpacing","textCase","textDecoration","textStyleId"]);
    o.tx=segs.map(s=>{const lh=s.lineHeight,ls=s.letterSpacing;const f=fl(s.fills);return {s:s.characters,ff:s.fontName.family,fs:s.fontName.style,z:s.fontSize,lh:lh.unit==="AUTO"?undefined:(lh.unit==="PIXELS"?lh.value:lh.value+"%"),ls:ls.value?(ls.unit==="PIXELS"?ls.value:ls.value+"%"):undefined,c:f&&f[0].k==="s"?f[0].c:undefined,co:f&&f[0].o,cf:f&&f[0].k!=="s"?f:undefined,tc:s.textCase!=="ORIGINAL"?s.textCase[0]:undefined,td:s.textDecoration!=="NONE"?s.textDecoration[0]:undefined}});
    o.ta=n.textAlignHorizontal[0];o.tv=n.textAlignVertical[0];o.ar=n.textAutoResize[0];
    if(n.maxLines)o.ml=n.maxLines;
    delete o.f;
  }
  if(o.t==="V"){try{o.svg=await n.exportAsync({format:"SVG_STRING",svgIdAttribute:false,svgOutlineText:false})}catch(e){o.err=1}}
  if(!o.ex&&"children" in n&&o.t!=="V"){const k=[];for(const ch of n.children){const s=await ser(ch,n);if(s)k.push(s)}if(k.length)o.k=k}
  return o;
}
const node=await figma.getNodeByIdAsync("__NODE__");
const js=JSON.stringify(await ser(node,null));
return js.slice(__S__,__S__+__L__);
