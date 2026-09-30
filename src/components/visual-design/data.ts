// Gallery definitions per Figma frame. Tile = [image key, x, y, w, h] relative to the gallery box.
export type T = [string, number, number, number, number];
export interface Sec { id?: string; eyebrow: string; title: string; statement: string; h: number; gh: number; lines?: 'plain' | 'sheen'; tiles: T[]; }
const V = (n: string) => `VisualDesi_${n}`;
export const desktop: Sec[] = [
  { id: 'brand-identity', eyebrow: '01  /  BRAND IDENTITY', title: 'GOURMET', h: 3100, gh: 2628,
    statement: 'A rebrand for Gourmet Bakers & Sweets. One orange emblem and wordmark carry the brand across signage, packaging, apparel and outdoor.',
    tiles: [[V('326-1737'),0,0,588,588],[V('326-1738'),612,0,588,588],[V('326-1739'),0,612,588,588],[V('326-1740'),612,612,588,588],
      [V('326-1741'),0,1224,384,384],[V('326-1742'),408,1224,384,384],[V('326-1743'),816,1224,384,384],
      [V('326-1744'),0,1632,384,384],[V('326-1745'),408,1632,384,384],[V('326-1746'),816,1632,384,384],
      [V('326-1747'),0,2040,588,588],[V('326-1748'),612,2040,588,588]] },
  { id: 'e-commerce', eyebrow: '02  /  E-COMMERCE VISUALS', title: 'BAYSIDE', h: 3256, gh: 2784,
    statement: 'Listing and hero images for Bayside hand and foot masks: ingredient callouts, benefits and product shots on a calm aqua palette.',
    tiles: [[V('326-1790'),0,0,1200,675],[V('326-1793'),0,699,588,331],[V('326-1792'),612,699,588,331],[V('326-1794'),0,1054,588,331],[V('326-1795'),612,1054,588,331],
      [V('326-1796'),0,1409,1200,675],[V('326-1797'),0,2109,1200,675]] },
  { eyebrow: '03  /  BRAND IDENTITY', title: 'WURX MEDIA', h: 3621, gh: 3149, lines: 'plain',
    statement: 'A brand system for Wurx Media, a TikTok Shop growth team: logo versions, colour palette, typography and real-world applications across 12 pages.',
    tiles: [[V('320-1842'),0,0,1200,676],[V('326-1721'),0,699,588,331],[V('326-1722'),612,699,588,331],[V('326-1723'),0,1054,588,331],[V('326-1724'),612,1054,588,331],
      [V('326-1725'),0,1409,588,331],[V('326-1726'),612,1409,588,331],[V('326-1727'),0,1764,588,331],[V('326-1728'),612,1764,588,331],
      [V('326-1729'),0,2119,588,331],[V('320-1844'),612,2119,588,331],[V('326-1731'),0,2474,1200,675]] },
  { id: 'social-media', eyebrow: '04  /  SOCIAL MEDIA', title: 'SOCIAL POSTS', h: 1960, gh: 1488, lines: 'sheen',
    statement: 'Square and portrait posts for consumer and energy brands, each built around one product and one message.',
    tiles: [[V('326-1838'),0,0,384,480],[V('320-1823'),408,0,384,384],[V('326-1840'),816,0,384,384],[V('326-1841'),408,408,384,384],[V('326-1842'),816,408,384,480],
      [V('326-1843'),0,504,384,480],[V('326-1844'),408,816,384,384],[V('326-1845'),816,912,384,384],[V('326-1846'),0,1008,384,480]] },
  { eyebrow: '05  /  CAMPAIGN POSTERS', title: 'CAMPAIGN POSTERS', h: 1495, gh: 1023, lines: 'plain',
    statement: 'Contest and reward posters for creator campaigns. Prizes, tiers and rules are laid out so they can be read in seconds.',
    tiles: [[V('326-1778'),0,0,384,576],[V('326-1779'),408,0,384,576],[V('326-1780'),816,0,384,576],
      [V('326-1781'),0,600,282,423],[V('326-1782'),306,600,282,423],[V('326-1783'),612,600,282,423],[V('326-1784'),918,600,282,423]] },
  { eyebrow: '06  /  E-COMMERCE VISUALS', title: 'KAWALA', h: 2556, gh: 2084, lines: 'plain',
    statement: 'Carousel images for Kawala men’s face wipes: when to use, why Kawala, ingredients, how to use and benefits, on a dark green palette.',
    tiles: [[V('326-1827'),0,0,1200,675],[V('326-1828'),0,699,588,331],[V('326-1829'),612,699,588,331],[V('326-1830'),0,1054,588,331],[V('326-1831'),612,1054,588,331],[V('326-1832'),0,1409,1200,675]] },
  { id: 'growth-stories', eyebrow: '07  /  GROWTH STORIES', title: 'CASE STUDY COVERS', h: 2556, gh: 2084, lines: 'plain',
    statement: 'Cover graphics for six creator-led growth stories, each with the brand, a headline result and a consistent footer.',
    tiles: [[V('326-1876'),0,0,1200,675],[V('326-1877'),0,699,588,331],[V('326-1878'),612,699,588,331],[V('326-1879'),0,1054,588,331],[V('326-1880'),612,1054,588,331],[V('326-1881'),0,1409,1200,675]] },
  { eyebrow: '08  /  BOOK COVER', title: 'BOOK COVER', h: 1147, gh: 675,
    statement: 'A cover and mockup for “Million Dollar Months”, a founder’s guide to winning on TikTok Shop.',
    tiles: [[V('326-1887'),0,0,1200,675]] },
];

// ---- tablet (768 frame) ----
const c2 = [0, 350.88], c3 = [0, 233.92, 467.84];
const S = 337.12, Q = 220.16, W = 688, PH = 189.77333, FH = 387;
const pairs = (keys: string[], y0: number, step = 203.53333): T[] => keys.map((k, i) => [k, c2[i % 2], +(y0 + Math.floor(i / 2) * step).toFixed(3), S, PH] as T);
export interface SecT { id?: string; eyebrow: string; title: string; statement: string; h: number; gh: number; gy: number; sh: number; lines?: 'plain' | 'sheen'; tiles: T[]; }
export const tablet: SecT[] = [
  { id: 'brand-identity', eyebrow: '01  /  BRAND IDENTITY', title: 'GOURMET', h: 1948.72, gh: 1506.72, gy: 370, sh: 120, statement: desktop[0].statement,
    tiles: [[V('326-1737'),0,0,S,S],[V('326-1738'),c2[1],0,S,S],[V('326-1739'),0,350.88,S,S],[V('326-1740'),c2[1],350.88,S,S],
      [V('326-1741'),c3[0],701.76,Q,Q],[V('326-1742'),c3[1],701.76,Q,Q],[V('326-1743'),c3[2],701.76,Q,Q],
      [V('326-1744'),c3[0],935.68,Q,Q],[V('326-1745'),c3[1],935.68,Q,Q],[V('326-1746'),c3[2],935.68,Q,Q],
      [V('326-1747'),0,1169.6,S,S],[V('326-1748'),c2[1],1169.6,S,S]] },
  { id: 'e-commerce', eyebrow: '02  /  E-COMMERCE VISUALS', title: 'BAYSIDE', h: 2038.16, gh: 1596.16, gy: 370, sh: 120, statement: desktop[1].statement,
    tiles: [[V('326-1790'),0,0,W,FH],...pairs([V('326-1793'),V('326-1792'),V('326-1794'),V('326-1795')],400.76),[V('326-1796'),0,807.827,W,FH],[V('326-1797'),0,1209.16,W,FH]] },
  { eyebrow: '03  /  BRAND IDENTITY', title: 'WURX MEDIA', h: 2287.427, gh: 1805.427, gy: 410, sh: 160, lines: 'plain', statement: desktop[2].statement,
    tiles: [[V('320-1842'),0,0,W,387.573],...pairs([V('326-1721'),V('326-1722'),V('326-1723'),V('326-1724'),V('326-1725'),V('326-1726'),V('326-1727'),V('326-1728'),V('326-1729'),V('320-1844')],400.76),[V('326-1731'),0,1418.427,W,FH]] },
  { id: 'social-media', eyebrow: '04  /  SOCIAL MEDIA', title: 'SOCIAL POSTS', h: 1295.12, gh: 853.12, gy: 370, sh: 120, lines: 'sheen', statement: desktop[3].statement,
    tiles: [[V('326-1838'),0,0,Q,275.2],[V('320-1823'),233.92,0,Q,Q],[V('326-1840'),467.84,0,Q,Q],[V('326-1841'),233.92,233.92,Q,Q],[V('326-1842'),467.84,233.92,Q,275.2],
      [V('326-1843'),0,288.96,Q,275.2],[V('326-1844'),233.92,467.84,Q,Q],[V('326-1845'),467.84,522.88,Q,Q],[V('326-1846'),0,577.92,Q,275.2]] },
  { eyebrow: '05  /  CAMPAIGN POSTERS', title: 'CAMPAIGN POSTERS', h: 1028.52, gh: 586.52, gy: 370, sh: 120, lines: 'plain', statement: desktop[4].statement,
    tiles: [[V('326-1778'),0,0,Q,330.24],[V('326-1779'),233.92,0,Q,330.24],[V('326-1780'),467.84,0,Q,330.24],
      [V('326-1781'),0,344,161.68,242.52],[V('326-1782'),175.44,344,161.68,242.52],[V('326-1783'),350.88,344,161.68,242.52],[V('326-1784'),526.32,344,161.68,242.52]] },
  { eyebrow: '06  /  E-COMMERCE VISUALS', title: 'KAWALA', h: 1636.827, gh: 1194.827, gy: 370, sh: 120, lines: 'plain', statement: desktop[5].statement,
    tiles: [[V('326-1827'),0,0,W,FH],...pairs([V('326-1828'),V('326-1829'),V('326-1830'),V('326-1831')],400.76),[V('326-1832'),0,807.827,W,FH]] },
  { id: 'growth-stories', eyebrow: '07  /  GROWTH STORIES', title: 'CASE STUDY COVERS', h: 1636.827, gh: 1194.827, gy: 370, sh: 120, lines: 'plain', statement: desktop[6].statement,
    tiles: [[V('326-1876'),0,0,W,FH],...pairs([V('326-1877'),V('326-1878'),V('326-1879'),V('326-1880')],400.76),[V('326-1881'),0,807.827,W,FH]] },
  { eyebrow: '08  /  BOOK COVER', title: 'BOOK COVER', h: 789, gh: 387, gy: 330, sh: 80, statement: desktop[7].statement, tiles: [[V('326-1887'),0,0,W,FH]] },
];
