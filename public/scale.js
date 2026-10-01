// Scales the active Figma frame (1440 / 768 / 390) to the viewport width, before first paint.
(function(){function s(){var w=document.documentElement.clientWidth,d=w>=1024?1440:w>=600?768:390;document.documentElement.style.setProperty('--z',(w/d)+'')}s();addEventListener('resize',s)})();
