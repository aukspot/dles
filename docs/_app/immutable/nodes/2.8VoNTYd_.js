import{n as L,k as Xe,s as W,r as pe,c as se,h as ge,A as He,i as Re}from"../chunks/scheduler.CQ9qRthI.js";import{G as qe,I as Fe,J as We,K as Ze,S as Z,i as G,h as j,g as b,l as A,j as k,a as w,m as $e,d as h,b as d,e as z,f as g,A as re,s as K,c as J,v as N,t as q,w as X,k as F,D as le,x as S,n as ne,p as V,o as B,y as O,E as ae,C as oe,F as Ce,q as Ge}from"../chunks/index.CsNcSv-F.js";import{p as fe,e as ie,u as _e,o as be,n as Ke,b as Je,a as Qe,d as et,g as tt,h as lt,s as nt}from"../chunks/stores.tHijDCIG.js";import{F as Oe,c as Ie}from"../chunks/categoryIcons.BtQ6ZXjf.js";import"../chunks/paths.CJlYpnyH.js";import{o as st}from"../chunks/IconFavorite.CMdByjjl.js";const rt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function at(r,e,t,l){if(!e)return L;const n=r.getBoundingClientRect();if(e.left===n.left&&e.right===n.right&&e.top===n.top&&e.bottom===n.bottom)return L;const{delay:s=0,duration:a=300,easing:o=Xe,start:i=qe()+s,end:c=i+a,tick:f=L,css:p}=t(r,{from:e,to:n},l);let m=!0,u=!1,v;function Y(){p&&(v=We(r,0,1,a,s,o,p)),s||(u=!0)}function $(){p&&Ze(r,v),m=!1}return Fe(y=>{if(!u&&y>=i&&(u=!0),u&&y>=c&&(f(1,0),$()),!m)return!1;if(u){const _=y-i,E=0+1*o(_/a);f(E,1-E)}return!0}),Y(),f(0,1),$}function ot(r){const e=getComputedStyle(r);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:t,height:l}=e,n=r.getBoundingClientRect();r.style.position="absolute",r.style.width=t,r.style.height=l,it(r,n)}}function it(r,e){const t=r.getBoundingClientRect();if(e.left!==t.left||e.top!==t.top){const l=getComputedStyle(r),n=l.transform==="none"?"":l.transform;r.style.transform=`${n} translate(${e.left-t.left}px, ${e.top-t.top}px)`}}function ct(r){const e=r-1;return e*e*e+1}const ft=!0,Bl=Object.freeze(Object.defineProperty({__proto__:null,prerender:ft},Symbol.toStringTag,{value:"Module"})),{document:ut}=rt;function dt(r){let e,t,l,n="Back to top",s,a;return{c(){e=j(),t=b("div"),l=b("button"),l.textContent=n,this.h()},l(o){e=A(o),t=k(o,"DIV",{class:!0});var i=w(t);l=k(i,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),$e(l)!=="svelte-1uhjlnn"&&(l.textContent=n),i.forEach(h),this.h()},h(){d(l,"id","backToTop"),d(l,"class","btn !py-2 !px-4 text-sm md:text-base svelte-jr6w1a"),d(t,"class","flex justify-center mt-4 mb-2")},m(o,i){z(o,e,i),z(o,t,i),g(t,l),s||(a=[re(ut,"scroll",mt),re(l,"click",ht)],s=!0)},p:L,i:L,o:L,d(o){o&&(h(e),h(t)),s=!1,pe(a)}}}function ht(){window.scrollTo({top:0,left:0,behavior:"smooth"})}function mt(r){const e=document.getElementById("backToTop"),t=document.documentElement;let l=t.scrollHeight-t.clientHeight;window.scrollY>600&&t.scrollTop/l>.6?e.classList.add("showBtn"):e.classList.remove("showBtn")}class gt extends Z{constructor(e){super(),G(this,e,null,dt,W,{})}}function pt(r){let e,t,l,n,s,a;return{c(){e=K("svg"),t=K("g"),l=K("path"),n=K("defs"),s=K("clipPath"),a=K("path"),this.h()},l(o){e=J(o,"svg",{width:!0,viewBox:!0,class:!0});var i=w(e);t=J(i,"g",{});var c=w(t);l=J(c,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),w(l).forEach(h),c.forEach(h),n=J(i,"defs",{});var f=w(n);s=J(f,"clipPath",{id:!0});var p=w(s);a=J(p,"path",{d:!0}),w(a).forEach(h),p.forEach(h),f.forEach(h),i.forEach(h),this.h()},h(){d(l,"stroke-linecap","round"),d(l,"stroke-linejoin","round"),d(l,"stroke-width","2.5"),d(l,"d","m7 7 10 10M7 17 17 7"),d(a,"d","M0 0h24v24H0z"),d(s,"id","a"),d(e,"width","28"),d(e,"viewBox","0 0 24 24"),d(e,"class","svelte-x43ij4")},m(o,i){z(o,e,i),g(e,t),g(t,l),g(e,n),g(n,s),g(s,a)},p:L,i:L,o:L,d(o){o&&h(e)}}}class _t extends Z{constructor(e){super(),G(this,e,null,pt,W,{})}}function vt(r){let e,t,l,n,s,a=r[2].name+"",o,i,c,f,p,m,u=r[2].description+"",v,Y,$,y=r[2].url+"",_,E,M,C,T;return l=new Oe({props:{dle:r[2]}}),f=new _t({}),{c(){e=b("div"),t=b("div"),N(l.$$.fragment),n=j(),s=b("div"),o=q(a),i=j(),c=b("button"),N(f.$$.fragment),p=j(),m=b("div"),v=q(u),Y=j(),$=b("a"),_=q(y),this.h()},l(D){e=k(D,"DIV",{class:!0,style:!0});var I=w(e);t=k(I,"DIV",{class:!0});var x=w(t);X(l.$$.fragment,x),n=A(x),s=k(x,"DIV",{class:!0});var U=w(s);o=F(U,a),U.forEach(h),i=A(x),c=k(x,"BUTTON",{});var R=w(c);X(f.$$.fragment,R),R.forEach(h),x.forEach(h),p=A(I),m=k(I,"DIV",{class:!0});var Q=w(m);v=F(Q,u),Q.forEach(h),Y=A(I),$=k(I,"A",{href:!0,target:!0,class:!0});var ce=w($);_=F(ce,y),ce.forEach(h),I.forEach(h),this.h()},h(){d(s,"class","text-center text-xl font-bold"),d(t,"class","flex justify-around items-start gap-2"),d(m,"class","text-center text-base text-colorTextSoft"),d($,"href",E=r[2].url),d($,"target","_blank"),d($,"class","svelte-1f9a514"),d(e,"class","dlePopUp svelte-1f9a514"),le(e,"left",r[0]+"px"),le(e,"top",r[1]+"px"),le(e,"width",de+"px")},m(D,I){z(D,e,I),g(e,t),S(l,t,null),g(t,n),g(t,s),g(s,o),g(t,i),g(t,c),S(f,c,null),g(e,p),g(e,m),g(m,v),g(e,Y),g(e,$),g($,_),M=!0,C||(T=re(c,"click",r[3]),C=!0)},p(D,[I]){const x={};I&4&&(x.dle=D[2]),l.$set(x),(!M||I&4)&&a!==(a=D[2].name+"")&&ne(o,a),(!M||I&4)&&u!==(u=D[2].description+"")&&ne(v,u),(!M||I&4)&&y!==(y=D[2].url+"")&&ne(_,y),(!M||I&4&&E!==(E=D[2].url))&&d($,"href",E),(!M||I&1)&&le(e,"left",D[0]+"px"),(!M||I&2)&&le(e,"top",D[1]+"px")},i(D){M||(V(l.$$.fragment,D),V(f.$$.fragment,D),M=!0)},o(D){B(l.$$.fragment,D),B(f.$$.fragment,D),M=!1},d(D){D&&h(e),O(l),O(f),C=!1,T()}}}let de=310;function $t(r,e,t){let l;se(r,fe,f=>t(5,l=f));let{dle:n,pageX:s,pageY:a,clientY:o}=e,i=30+2*8+2*12+Math.floor(Math.ceil(28*n.name.length)/10)+Math.floor(Math.ceil(24*n.description.length)/26)+Math.floor(Math.ceil(24*n.url.length)/26);s<de/2&&(s=de/2+5),s+de/2>document.documentElement.clientWidth&&(s=document.documentElement.clientWidth-de/2-5),o<i&&(a+=i-o);function c(){ge(fe,l="",l)}return r.$$set=f=>{"dle"in f&&t(2,n=f.dle),"pageX"in f&&t(0,s=f.pageX),"pageY"in f&&t(1,a=f.pageY),"clientY"in f&&t(4,o=f.clientY)},[s,a,n,c,o]}class bt extends Z{constructor(e){super(),G(this,e,$t,vt,W,{dle:2,pageX:0,pageY:1,clientY:4})}}function kt(r){let e,t,l,n;return{c(){e=K("svg"),t=K("g"),l=K("path"),n=K("path"),this.h()},l(s){e=J(s,"svg",{fill:!0,viewBox:!0,height:!0,class:!0});var a=w(e);t=J(a,"g",{});var o=w(t);l=J(o,"path",{fill:!0,d:!0}),w(l).forEach(h),n=J(o,"path",{d:!0}),w(n).forEach(h),o.forEach(h),a.forEach(h),this.h()},h(){d(l,"fill","none"),d(l,"d","M0 0h48v48H0z"),d(n,"d","M44 14H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h40a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2ZM17.3 29h-2.5l-3-5-.7-1.3V29H8.7V19h2.5l3 5 .6 1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1 0h-7.7V19h7.6v2h-5.1v1.8h4.4v2h-4.4v2.1h5.2Zm10.9 0h-2.5l-1-4.8c-.2-.8-.4-1.9-.4-1.9s-.2 1.1-.3 1.9L32 29h-2.4l-2.8-10h2.5l1 4.2a20.1 20.1 0 0 1 .5 2.5l.5-2.4 1-4.3h2.3l.9 4.3.5 2.4.5-2.5 1-4.2H40Z"),d(e,"fill","currentColor"),d(e,"viewBox","0 12 48 24"),d(e,"height","18"),d(e,"class","svelte-1viggjg")},m(s,a){z(s,e,a),g(e,t),g(t,l),g(t,n)},p:L,i:L,o:L,d(s){s&&h(e)}}}class xe extends Z{constructor(e){super(),G(this,e,null,kt,W,{})}}function wt(r){const e=t=>{r&&!r.contains(t.target)&&!t.defaultPrevented&&r.dispatchEvent(new CustomEvent("click_outside",r))};return document.addEventListener("click",e,!0),{destroy(){document.removeEventListener("click",e,!0)}}}function yt(r){let e,t,l="Latest update",n,s,a,o;return s=new xe({}),{c(){e=b("p"),t=b("strong"),t.textContent=l,n=q(": Added 35 new dles, look for the "),N(s.$$.fragment),a=q(` tag
  to find them!`),this.h()},l(i){e=k(i,"P",{class:!0});var c=w(e);t=k(c,"STRONG",{"data-svelte-h":!0}),$e(t)!=="svelte-blxpfu"&&(t.textContent=l),n=F(c,": Added 35 new dles, look for the "),X(s.$$.fragment,c),a=F(c,` tag
  to find them!`),c.forEach(h),this.h()},h(){d(e,"class","p-3 text-center text-sm md:p-2 md:text-base")},m(i,c){z(i,e,c),g(e,t),g(e,n),S(s,e,null),g(e,a),o=!0},p:L,i(i){o||(V(s.$$.fragment,i),o=!0)},o(i){B(s.$$.fragment,i),o=!1},d(i){i&&h(e),O(s)}}}class Ue extends Z{constructor(e){super(),G(this,e,null,yt,W,{})}}function Ve(r,e,t){const l=r.slice();return l[15]=e[t],l[17]=t,l}function Be(r,e,t){const l=r.slice();return l[18]=e[t],l[20]=t,l}function Me(r){let e,t;return e=new xe({}),{c(){N(e.$$.fragment)},l(l){X(e.$$.fragment,l)},m(l,n){S(e,l,n),t=!0},i(l){t||(V(e.$$.fragment,l),t=!0)},o(l){B(e.$$.fragment,l),t=!1},d(l){O(e,l)}}}function je(r){let e,t,l,n,s;return t=new bt({props:{dle:r[18],pageX:r[0],pageY:r[1],clientY:r[2]}}),{c(){e=b("div"),N(t.$$.fragment)},l(a){e=k(a,"DIV",{});var o=w(e);X(t.$$.fragment,o),o.forEach(h)},m(a,o){z(a,e,o),S(t,e,null),l=!0,n||(s=[He(wt.call(null,e)),re(e,"click_outside",r[10])],n=!0)},p(a,o){const i={};o&80&&(i.dle=a[18]),o&1&&(i.pageX=a[0]),o&2&&(i.pageY=a[1]),o&4&&(i.clientY=a[2]),t.$set(i)},i(a){l||(V(t.$$.fragment,a),l=!0)},o(a){B(t.$$.fragment,a),l=!1},d(a){a&&h(e),O(t),n=!1,pe(s)}}}function Ae(r,e){let t,l,n,s=e[18].name+"",a,o,i=e[7](e[18]),c,f,p,m,u;function v(..._){return e[12](e[18],..._)}function Y(..._){return e[13](e[18],..._)}let $=i&&Me(),y=e[3]===e[18].name&&je(e);return{key:r,first:null,c(){t=b("li"),l=b("div"),n=b("button"),a=q(s),o=j(),$&&$.c(),c=j(),y&&y.c(),f=j(),this.h()},l(_){t=k(_,"LI",{class:!0});var E=w(t);l=k(E,"DIV",{class:!0});var M=w(l);n=k(M,"BUTTON",{class:!0});var C=w(n);a=F(C,s),o=A(C),C.forEach(h),$&&$.l(M),M.forEach(h),c=A(E),y&&y.l(E),f=A(E),E.forEach(h),this.h()},h(){d(n,"class","dleName svelte-1721uy0"),d(l,"class","dleTop svelte-1721uy0"),d(t,"class","dleContainer svelte-1721uy0"),this.first=t},m(_,E){z(_,t,E),g(t,l),g(l,n),g(n,a),g(n,o),$&&$.m(l,null),g(t,c),y&&y.m(t,null),g(t,f),p=!0,m||(u=[re(n,"click",v),re(n,"auxclick",Y)],m=!0)},p(_,E){e=_,(!p||E&80)&&s!==(s=e[18].name+"")&&ne(a,s),E&80&&(i=e[7](e[18])),i?$?E&80&&V($,1):($=Me(),$.c(),V($,1),$.m(l,null)):$&&(ae(),B($,1,1,()=>{$=null}),oe()),e[3]===e[18].name?y?(y.p(e,E),E&88&&V(y,1)):(y=je(e),y.c(),V(y,1),y.m(t,f)):y&&(ae(),B(y,1,1,()=>{y=null}),oe())},i(_){p||(V($),V(y),p=!0)},o(_){B($),B(y),p=!1},d(_){_&&h(t),$&&$.d(),y&&y.d(),m=!1,pe(u)}}}function ze(r,e){let t,l,n,s,a,o,i=e[15]+"",c,f,p,m,u=[],v=new Map,Y,$;var y=Ie[e[15]];function _(C,T){return{}}y&&(a=Ce(y,_()));let E=ie(e[6][e[15]]);const M=C=>C[20];for(let C=0;C<E.length;C+=1){let T=Be(e,E,C),D=M(T);v.set(D,u[C]=Ae(D,T))}return{key:r,first:null,c(){t=b("div"),l=b("div"),n=b("div"),s=b("div"),a&&N(a.$$.fragment),o=j(),c=q(i),f=j(),p=b("div"),m=b("ol");for(let C=0;C<u.length;C+=1)u[C].c();Y=j(),this.h()},l(C){t=k(C,"DIV",{class:!0});var T=w(t);l=k(T,"DIV",{class:!0,style:!0});var D=w(l);n=k(D,"DIV",{class:!0});var I=w(n);s=k(I,"DIV",{class:!0});var x=w(s);a&&X(a.$$.fragment,x),x.forEach(h),o=A(I),c=F(I,i),I.forEach(h),D.forEach(h),f=A(T),p=k(T,"DIV",{});var U=w(p);m=k(U,"OL",{class:!0});var R=w(m);for(let Q=0;Q<u.length;Q+=1)u[Q].l(R);R.forEach(h),U.forEach(h),Y=A(T),T.forEach(h),this.h()},h(){d(s,"class","flex-shrink-0"),d(n,"class","label svelte-1721uy0"),d(l,"class","labelContainer svelte-1721uy0"),le(l,"background-color",e[5][e[15]]),d(m,"class","dleList"),d(t,"class","card svelte-1721uy0"),this.first=t},m(C,T){z(C,t,T),g(t,l),g(l,n),g(n,s),a&&S(a,s,null),g(n,o),g(n,c),g(t,f),g(t,p),g(p,m);for(let D=0;D<u.length;D+=1)u[D]&&u[D].m(m,null);g(t,Y),$=!0},p(C,T){if(e=C,T&16&&y!==(y=Ie[e[15]])){if(a){ae();const D=a;B(D.$$.fragment,1,0,()=>{O(D,1)}),oe()}y?(a=Ce(y,_()),N(a.$$.fragment),V(a.$$.fragment,1),S(a,s,null)):a=null}(!$||T&16)&&i!==(i=e[15]+"")&&ne(c,i),(!$||T&48)&&le(l,"background-color",e[5][e[15]]),T&1247&&(E=ie(e[6][e[15]]),ae(),u=_e(u,T,M,1,e,E,v,m,be,Ae,null,Be),oe())},i(C){if(!$){a&&V(a.$$.fragment,C);for(let T=0;T<E.length;T+=1)V(u[T]);$=!0}},o(C){a&&B(a.$$.fragment,C);for(let T=0;T<u.length;T+=1)B(u[T]);$=!1},d(C){C&&h(t),a&&O(a);for(let T=0;T<u.length;T+=1)u[T].d()}}}function Et(r){let e,t,l,n,s=[],a=new Map,o,i,c;t=new Ue({});let f=ie(r[4]);const p=m=>m[17];for(let m=0;m<f.length;m+=1){let u=Ve(r,f,m),v=p(u);a.set(v,s[m]=ze(v,u))}return{c(){e=j(),N(t.$$.fragment),l=j(),n=b("div");for(let m=0;m<s.length;m+=1)s[m].c();this.h()},l(m){e=A(m),X(t.$$.fragment,m),l=A(m),n=k(m,"DIV",{class:!0});var u=w(n);for(let v=0;v<s.length;v+=1)s[v].l(u);u.forEach(h),this.h()},h(){d(n,"class","dlesContainer svelte-1721uy0")},m(m,u){z(m,e,u),S(t,m,u),z(m,l,u),z(m,n,u);for(let v=0;v<s.length;v+=1)s[v]&&s[v].m(n,null);o=!0,i||(c=[re(window,"resize",r[8]),re(document,"keyup",r[11])],i=!0)},p(m,[u]){u&1279&&(f=ie(m[4]),ae(),s=_e(s,u,p,1,m,f,a,n,be,ze,null,Ve),oe())},i(m){if(!o){V(t.$$.fragment,m);for(let u=0;u<f.length;u+=1)V(s[u]);o=!0}},o(m){B(t.$$.fragment,m);for(let u=0;u<s.length;u+=1)B(s[u]);o=!1},d(m){m&&(h(e),h(l),h(n)),O(t,m);for(let u=0;u<s.length;u+=1)s[u].d();i=!1,pe(c)}}}function Tt(r,e,t){let l,n,s,a,o;se(r,fe,_=>t(3,l=_)),se(r,Ke,_=>t(14,n=_)),se(r,Je,_=>t(4,s=_)),se(r,Qe,_=>t(5,a=_)),se(r,et,_=>t(6,o=_));let i=0,c=0,f=0;function p(_){return n.filter(E=>E.url===_.url).length===1}function m(){ge(fe,l="",l)}function u(_){_.key=="Escape"&&m()}function v(){m()}return[i,c,f,l,s,a,o,p,m,u,v,_=>u(_),(_,E)=>{l===_.name?ge(fe,l="",l):ge(fe,l=_.name,l),t(0,i=E.pageX),t(1,c=E.pageY),t(2,f=E.clientY)},(_,E)=>st(_.url)]}class Dt extends Z{constructor(e){super(),G(this,e,Tt,Et,W,{})}}function Ct(r,{from:e,to:t},l={}){const n=getComputedStyle(r),s=n.transform==="none"?"":n.transform,[a,o]=n.transformOrigin.split(" ").map(parseFloat),i=e.left+e.width*a/t.width-(t.left+a),c=e.top+e.height*o/t.height-(t.top+o),{delay:f=0,duration:p=u=>Math.sqrt(u)*120,easing:m=ct}=l;return{delay:f,duration:Re(p)?p(Math.sqrt(i*i+c*c)):p,easing:m,css:(u,v)=>{const Y=v*i,$=v*c,y=u+v*e.width/t.width,_=u+v*e.height/t.height;return`transform: ${s} translate(${Y}px, ${$}px) scale(${y}, ${_});`}}}const It="#dfa99f",Vt="#dfab9f",Bt="#dfae9f",Mt="#dfae9f",jt="#dfc59f",At="#cfdf9f",zt="#cddf9f",Yt="#c4df9f",Pt="#b3df9f",Lt="#b0df9f",Nt="#9fdfca",St="#9fdfd1",Ot="#9fdfd1",xt="#9fdfd9",Ut="#9fdfdc",Xt="#9fdfdf",Ht="#9fd4df",Rt="#9fbddf",qt="#9fb8df",Ft="#9fb6df",Wt="#a39fdf",Zt="#aa9fdf",Gt="#b19fdf",Kt="#b29fdf",Jt="#bd9fdf",Qt="#c29fdf",el="#c49fdf",tl="#ce9fdf",ll="#d19fdf",nl="#da9fdf",sl="#df9fd2",rl="#df9fd2",Ye={archive:It,audio:Vt,baseball:Bt,basketball:Mt,colors:jt,"fast-paced":"#d5df9f",flags:At,football:zt,geography:Yt,history:Pt,hockey:Lt,logic:Nt,maps:St,math:Ot,movies:xt,music:Ut,nba:Xt,numbers:Ht,pictures:Rt,prices:qt,puzzmo:Ft,roguelike:Wt,science:Zt,soccer:Gt,sports:Kt,time:Jt,trivia:Qt,tv:el,unlimited:tl,usa:ll,"video games":"#da9fdf",visual:nl,wordle:sl,words:rl};function al(r){let e,t;return{c(){e=b("button"),t=q(r[0]),this.h()},l(l){e=k(l,"BUTTON",{class:!0,style:!0});var n=w(e);t=F(n,r[0]),n.forEach(h),this.h()},h(){d(e,"class","filterTag unselectable svelte-1rn8qnj"),le(e,"background-color",Ye[r[0]])},m(l,n){z(l,e,n),g(e,t)},p(l,[n]){n&1&&ne(t,l[0]),n&1&&le(e,"background-color",Ye[l[0]])},i:L,o:L,d(l){l&&h(e)}}}function ol(r,e,t){let{name:l}=e;return r.$$set=n=>{"name"in n&&t(0,l=n.name)},[l]}class il extends Z{constructor(e){super(),G(this,e,ol,al,W,{name:0})}}function Pe(r,e,t){const l=r.slice();return l[1]=e[t],l[3]=t,l}function Le(r,e){let t,l,n,s,a=L,o;return l=new il({props:{name:e[1]}}),{key:r,first:null,c(){t=b("div"),N(l.$$.fragment),n=j(),this.h()},l(i){t=k(i,"DIV",{});var c=w(t);X(l.$$.fragment,c),n=A(c),c.forEach(h),this.h()},h(){this.first=t},m(i,c){z(i,t,c),S(l,t,null),g(t,n),o=!0},p(i,c){e=i;const f={};c&1&&(f.name=e[1]),l.$set(f)},r(){s=t.getBoundingClientRect()},f(){ot(t),a()},a(){a(),a=at(t,s,Ct,{})},i(i){o||(V(l.$$.fragment,i),o=!0)},o(i){B(l.$$.fragment,i),o=!1},d(i){i&&h(t),O(l)}}}function cl(r){let e,t=[],l=new Map,n,s=ie(r[0]);const a=o=>o[3];for(let o=0;o<s.length;o+=1){let i=Pe(r,s,o),c=a(i);l.set(c,t[o]=Le(c,i))}return{c(){e=b("div");for(let o=0;o<t.length;o+=1)t[o].c();this.h()},l(o){e=k(o,"DIV",{class:!0});var i=w(e);for(let c=0;c<t.length;c+=1)t[c].l(i);i.forEach(h),this.h()},h(){d(e,"class","group svelte-v2fvv4")},m(o,i){z(o,e,i);for(let c=0;c<t.length;c+=1)t[c]&&t[c].m(e,null);n=!0},p(o,[i]){if(i&1){s=ie(o[0]),ae();for(let c=0;c<t.length;c+=1)t[c].r();t=_e(t,i,a,1,o,s,l,e,tt,Le,null,Pe);for(let c=0;c<t.length;c+=1)t[c].a();oe()}},i(o){if(!n){for(let i=0;i<s.length;i+=1)V(t[i]);n=!0}},o(o){for(let i=0;i<t.length;i+=1)B(t[i]);n=!1},d(o){o&&h(e);for(let i=0;i<t.length;i+=1)t[i].d()}}}function fl(r,e,t){let{tags:l}=e;return r.$$set=n=>{"tags"in n&&t(0,l=n.tags)},[l]}class ul extends Z{constructor(e){super(),G(this,e,fl,cl,W,{tags:0})}}function dl(r){let e,t,l,n,s,a,o,i,c,f,p=r[1].name+"",m,u,v,Y,$=r[1].description+"",y,_,E,M,C,T,D,I,x,U,R,Q="Play",ce,ee;return M=new ul({props:{tags:r[1].tags}}),I=new Oe({props:{dle:r[1]}}),{c(){e=b("div"),t=b("div"),l=b("div"),n=b("div"),s=b("span"),a=q(r[0]),o=q("."),i=j(),c=b("span"),f=b("a"),m=q(p),v=j(),Y=b("div"),y=q($),_=j(),E=b("div"),N(M.$$.fragment),C=j(),T=b("div"),D=b("span"),N(I.$$.fragment),x=j(),U=b("a"),R=b("button"),R.textContent=Q,this.h()},l(P){e=k(P,"DIV",{class:!0});var H=w(e);t=k(H,"DIV",{class:!0});var te=w(t);l=k(te,"DIV",{class:!0});var ue=w(l);n=k(ue,"DIV",{class:!0});var he=w(n);s=k(he,"SPAN",{class:!0});var ve=w(s);a=F(ve,r[0]),o=F(ve,"."),ve.forEach(h),i=A(he),c=k(he,"SPAN",{class:!0});var ke=w(c);f=k(ke,"A",{href:!0,class:!0});var we=w(f);m=F(we,p),we.forEach(h),ke.forEach(h),he.forEach(h),ue.forEach(h),v=A(te),Y=k(te,"DIV",{class:!0});var ye=w(Y);y=F(ye,$),ye.forEach(h),_=A(te),E=k(te,"DIV",{class:!0});var Ee=w(E);X(M.$$.fragment,Ee),Ee.forEach(h),te.forEach(h),C=A(H),T=k(H,"DIV",{class:!0});var me=w(T);D=k(me,"SPAN",{class:!0});var Te=w(D);X(I.$$.fragment,Te),Te.forEach(h),x=A(me),U=k(me,"A",{class:!0,href:!0,target:!0,rel:!0});var De=w(U);R=k(De,"BUTTON",{class:!0,"data-svelte-h":!0}),$e(R)!=="svelte-1n1krum"&&(R.textContent=Q),De.forEach(h),me.forEach(h),H.forEach(h),this.h()},h(){d(s,"class","unselectable"),d(f,"href",u=r[1].url),d(f,"class","svelte-1j9d4zc"),d(c,"class","cardName svelte-1j9d4zc"),d(n,"class","cardLabel svelte-1j9d4zc"),d(l,"class","cardTop svelte-1j9d4zc"),d(Y,"class","cardDescription svelte-1j9d4zc"),d(E,"class","mt-2"),d(t,"class","cardRows svelte-1j9d4zc"),d(D,"class","flex items-baseline"),d(R,"class","btn unselectable svelte-1j9d4zc"),d(U,"class","flex justify-center"),d(U,"href",ce=r[1].url),d(U,"target","_blank"),d(U,"rel","noopener"),d(T,"class","playButton svelte-1j9d4zc"),d(e,"class","card svelte-1j9d4zc")},m(P,H){z(P,e,H),g(e,t),g(t,l),g(l,n),g(n,s),g(s,a),g(s,o),g(n,i),g(n,c),g(c,f),g(f,m),g(t,v),g(t,Y),g(Y,y),g(t,_),g(t,E),S(M,E,null),g(e,C),g(e,T),g(T,D),S(I,D,null),g(T,x),g(T,U),g(U,R),ee=!0},p(P,[H]){(!ee||H&1)&&ne(a,P[0]),(!ee||H&2)&&p!==(p=P[1].name+"")&&ne(m,p),(!ee||H&2&&u!==(u=P[1].url))&&d(f,"href",u),(!ee||H&2)&&$!==($=P[1].description+"")&&ne(y,$);const te={};H&2&&(te.tags=P[1].tags),M.$set(te);const ue={};H&2&&(ue.dle=P[1]),I.$set(ue),(!ee||H&2&&ce!==(ce=P[1].url))&&d(U,"href",ce)},i(P){ee||(V(M.$$.fragment,P),V(I.$$.fragment,P),ee=!0)},o(P){B(M.$$.fragment,P),B(I.$$.fragment,P),ee=!1},d(P){P&&h(e),O(M),O(I)}}}function hl(r,e,t){let{i:l}=e,{dle:n}=e;return r.$$set=s=>{"i"in s&&t(0,l=s.i),"dle"in s&&t(1,n=s.dle)},[l,n]}class ml extends Z{constructor(e){super(),G(this,e,hl,dl,W,{i:0,dle:1})}}function Ne(r,e,t){const l=r.slice();return l[1]=e[t],l[3]=t,l}function Se(r,e){let t,l,n,s;return l=new ml({props:{dle:e[1],i:e[3]+1}}),{key:r,first:null,c(){t=b("li"),N(l.$$.fragment),n=j(),this.h()},l(a){t=k(a,"LI",{class:!0});var o=w(t);X(l.$$.fragment,o),n=A(o),o.forEach(h),this.h()},h(){d(t,"class","svelte-t6xppm"),this.first=t},m(a,o){z(a,t,o),S(l,t,null),g(t,n),s=!0},p(a,o){e=a;const i={};o&1&&(i.dle=e[1]),o&1&&(i.i=e[3]+1),l.$set(i)},i(a){s||(V(l.$$.fragment,a),s=!0)},o(a){B(l.$$.fragment,a),s=!1},d(a){a&&h(t),O(l)}}}function gl(r){let e,t,l,n=[],s=new Map,a;e=new Ue({});let o=ie(r[0]);const i=c=>c[3];for(let c=0;c<o.length;c+=1){let f=Ne(r,o,c),p=i(f);s.set(p,n[c]=Se(p,f))}return{c(){N(e.$$.fragment),t=j(),l=b("ol");for(let c=0;c<n.length;c+=1)n[c].c();this.h()},l(c){X(e.$$.fragment,c),t=A(c),l=k(c,"OL",{class:!0});var f=w(l);for(let p=0;p<n.length;p+=1)n[p].l(f);f.forEach(h),this.h()},h(){d(l,"class","mt-4 px-1 gap-2 grid grid-cols-1 lg:grid-cols-2")},m(c,f){S(e,c,f),z(c,t,f),z(c,l,f);for(let p=0;p<n.length;p+=1)n[p]&&n[p].m(l,null);a=!0},p(c,[f]){f&1&&(o=ie(c[0]),ae(),n=_e(n,f,i,1,c,o,s,l,be,Se,null,Ne),oe())},i(c){if(!a){V(e.$$.fragment,c);for(let f=0;f<o.length;f+=1)V(n[f]);a=!0}},o(c){B(e.$$.fragment,c);for(let f=0;f<n.length;f+=1)B(n[f]);a=!1},d(c){c&&(h(t),h(l)),O(e,c);for(let f=0;f<n.length;f+=1)n[f].d()}}}function pl(r,e,t){let l;return se(r,lt,n=>t(0,l=n)),[l]}class _l extends Z{constructor(e){super(),G(this,e,pl,gl,W,{})}}function vl(r){let e,t;return e=new Dt({}),{c(){N(e.$$.fragment)},l(l){X(e.$$.fragment,l)},m(l,n){S(e,l,n),t=!0},i(l){t||(V(e.$$.fragment,l),t=!0)},o(l){B(e.$$.fragment,l),t=!1},d(l){O(e,l)}}}function $l(r){let e,t;return e=new _l({}),{c(){N(e.$$.fragment)},l(l){X(e.$$.fragment,l)},m(l,n){S(e,l,n),t=!0},i(l){t||(V(e.$$.fragment,l),t=!0)},o(l){B(e.$$.fragment,l),t=!1},d(l){O(e,l)}}}function bl(r){let e,t,l,n,s,a;const o=[$l,vl],i=[];function c(f,p){return f[0].view=="Detailed View"?0:f[0].view=="Category View"?1:-1}return~(e=c(r))&&(t=i[e]=o[e](r)),s=new gt({}),{c(){t&&t.c(),l=j(),n=j(),N(s.$$.fragment)},l(f){t&&t.l(f),l=A(f),n=A(f),X(s.$$.fragment,f)},m(f,p){~e&&i[e].m(f,p),z(f,l,p),z(f,n,p),S(s,f,p),a=!0},p(f,[p]){let m=e;e=c(f),e!==m&&(t&&(ae(),B(i[m],1,1,()=>{i[m]=null}),oe()),~e?(t=i[e],t||(t=i[e]=o[e](f),t.c()),V(t,1),t.m(l.parentNode,l)):t=null)},i(f){a||(V(t),V(s.$$.fragment,f),a=!0)},o(f){B(t),B(s.$$.fragment,f),a=!1},d(f){f&&(h(l),h(n)),~e&&i[e].d(f),O(s,f)}}}function kl(r,e,t){let l;return se(r,nt,n=>t(0,l=n)),[l]}class wl extends Z{constructor(e){super(),G(this,e,kl,bl,W,{})}}function yl(r){let e,t,l,n,s,a,o,i,c,f,p,m;return p=new wl({}),{c(){e=b("meta"),t=b("meta"),l=b("meta"),n=b("meta"),s=b("meta"),a=b("meta"),o=b("meta"),i=b("meta"),c=b("meta"),f=j(),N(p.$$.fragment),this.h()},l(u){const v=Ge("svelte-nwfbrj",document.head);e=k(v,"META",{name:!0,content:!0}),t=k(v,"META",{name:!0,content:!0}),l=k(v,"META",{name:!0,content:!0}),n=k(v,"META",{property:!0,content:!0}),s=k(v,"META",{property:!0,content:!0}),a=k(v,"META",{property:!0,content:!0}),o=k(v,"META",{property:!0,content:!0}),i=k(v,"META",{property:!0,content:!0}),c=k(v,"META",{property:!0,content:!0}),v.forEach(h),f=A(u),X(p.$$.fragment,u),this.h()},h(){document.title="The Dles - a curated collection of daily games.",d(e,"name","description"),d(e,"content","A curated collection of free daily games. Contains 300+ games, like Wordle, Connections, Bandle, and many more."),d(t,"name","keywords"),d(t,"content","list, collection, links, games, daily, dles, wordle, timeguessr, bandle, connections, gamedle, like wordle"),d(l,"name","author"),d(l,"content","aukspot"),d(n,"property","og:title"),d(n,"content","The DLES"),d(s,"property","og:site_name"),d(s,"content","The DLES"),d(a,"property","og:url"),d(a,"content","https://dles.aukspot.com"),d(o,"property","og:type"),d(o,"content","website"),d(i,"property","og:locale"),d(i,"content","en_US"),d(c,"property","og:description"),d(c,"content","A curated collection of dles, or free daily games. Contains 300+ games - like Wordle, Connections, Bandle, and many more.")},m(u,v){g(document.head,e),g(document.head,t),g(document.head,l),g(document.head,n),g(document.head,s),g(document.head,a),g(document.head,o),g(document.head,i),g(document.head,c),z(u,f,v),S(p,u,v),m=!0},p:L,i(u){m||(V(p.$$.fragment,u),m=!0)},o(u){B(p.$$.fragment,u),m=!1},d(u){u&&h(f),h(e),h(t),h(l),h(n),h(s),h(a),h(o),h(i),h(c),O(p,u)}}}class Ml extends Z{constructor(e){super(),G(this,e,null,yl,W,{})}}export{Ml as component,Bl as universal};
