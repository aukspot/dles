import{a as u,i as x}from"./scheduler.CMd_E5aF.js";function _(n){const t=n-1;return t*t*t+1}function S(n,{delay:t=0,duration:o=400,easing:s=x}={}){const a=+getComputedStyle(n).opacity;return{delay:t,duration:o,easing:s,css:c=>`opacity: ${c*a}`}}function U(n,{delay:t=0,duration:o=400,easing:s=_,x:a=0,y:c=0,opacity:f=0}={}){const r=getComputedStyle(n),e=+r.opacity,y=r.transform==="none"?"":r.transform,p=e*(1-f),[l,m]=u(a),[$,d]=u(c);return{delay:t,duration:o,easing:s,css:(i,g)=>`
			transform: ${y} translate(${(1-i)*l}${m}, ${(1-i)*$}${d});
			opacity: ${e-p*g}`}}export{S as a,_ as c,U as f};
