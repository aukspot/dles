import{s as L,n as H,c as M}from"../chunks/scheduler.B9j9pDzV.js";import{S,i as T,g as p,t as $,h as x,j as u,a as v,k as q,d,l as y,m as j,b as g,e as D,f as o,n as C}from"../chunks/index.CoB1TgL6.js";import{b as I}from"../chunks/paths.DlKBxOBU.js";import{p as P}from"../chunks/stores.BpJirbrG.js";function V(c){let e,s,a=c[0].status+"",l,f,n,h=c[0].error.message+"",m,_,i,k=`Would you like to go <a href="${I}/">home</a>?`;return{c(){e=p("div"),s=p("h1"),l=$(a),f=x(),n=p("h2"),m=$(h),_=x(),i=p("p"),i.innerHTML=k,this.h()},l(r){e=u(r,"DIV",{class:!0});var t=v(e);s=u(t,"H1",{class:!0});var b=v(s);l=q(b,a),b.forEach(d),f=y(t),n=u(t,"H2",{class:!0});var E=v(n);m=q(E,h),E.forEach(d),_=y(t),i=u(t,"P",{"data-svelte-h":!0}),j(i)!=="svelte-1q2larb"&&(i.innerHTML=k),t.forEach(d),this.h()},h(){g(s,"class","svelte-1ck0k69"),g(n,"class","svelte-1ck0k69"),g(e,"class","svelte-1ck0k69")},m(r,t){D(r,e,t),o(e,s),o(s,l),o(e,f),o(e,n),o(n,m),o(e,_),o(e,i)},p(r,[t]){t&1&&a!==(a=r[0].status+"")&&C(l,a),t&1&&h!==(h=r[0].error.message+"")&&C(m,h)},i:H,o:H,d(r){r&&d(e)}}}function W(c,e,s){let a;return M(c,P,l=>s(0,a=l)),[a]}class F extends S{constructor(e){super(),T(this,e,W,V,L,{})}}export{F as component};