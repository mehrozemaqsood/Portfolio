// Casual image-copy protection. Applies only to images/figures: text stays selectable and every link, button and keyboard
// path keeps working. (Nothing can fully stop screenshots or the network tab; this just removes the one-click ways.)
const MEDIA = 'img,picture,svg,canvas,figure,[data-protect]';
const isMedia = (t) => t && t.closest && t.closest(MEDIA);
const lock = (root) => root.querySelectorAll('img').forEach((i) => { i.draggable = false; });
addEventListener('contextmenu', (e) => { if (isMedia(e.target)) e.preventDefault(); }, true);
addEventListener('dragstart', (e) => { if (isMedia(e.target)) e.preventDefault(); }, true);
addEventListener('selectstart', (e) => { if (e.target && e.target.nodeType === 1 && e.target.matches && e.target.matches('img,picture,svg,canvas')) e.preventDefault(); }, true);
lock(document);
new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType !== 1) return; if (n.tagName === 'IMG') n.draggable = false; else lock(n); }))).observe(document.documentElement, { childList: true, subtree: true });
