import{o as x,p as C}from"./index.Bu9pzqnC.js";import{r as L}from"./scheduler.CMd_E5aF.js";import{r as _,w as t}from"./index.CFWwkTDf.js";function z(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}function P(s,c){x(s,1,1,()=>{c.delete(s.key)})}function A(s,c){s.f(),P(s,c)}function N(s,c,G,T,V,m,d,b,y,D,r,H){let a=s.length,o=m.length,i=a;const g={};for(;i--;)g[s[i].key]=i;const h=[],u=new Map,p=new Map,M=[];for(i=o;i--;){const e=H(V,m,i),n=G(e);let l=d.get(n);l?T&&M.push(()=>l.p(e,c)):(l=D(n,e),l.c()),u.set(n,h[i]=l),n in g&&p.set(n,Math.abs(i-g[n]))}const v=new Set,S=new Set;function w(e){C(e,1),e.m(b,r),d.set(e.key,e),r=e.first,o--}for(;a&&o;){const e=h[o-1],n=s[a-1],l=e.key,f=n.key;e===n?(r=e.first,a--,o--):u.has(f)?!d.has(l)||v.has(l)?w(e):S.has(f)?a--:p.get(l)>p.get(f)?(S.add(l),w(e)):(v.add(f),a--):(y(n,d),a--)}for(;a--;){const e=s[a];u.has(e.key)||y(e,d)}for(;o;)w(h[o-1]);return L(M),h}let U=t([]),q=t([]),B=t([]),E=t({}),F=t([]),I=t(""),J=t({}),K=t([]),O=t(!1),Q=t([]),R=t(""),X=t({}),Y=_(["Geography/History","Math/Logic","Movies/TV","Music","Prices","Sports","Trivia","Video Games","Words","Miscellaneous"]),Z=_({"Geography/History":"hsl(0, 90%, 50%, 45%)","Math/Logic":"hsl(20, 90%, 50%, 45%)","Movies/TV":"hsl(40, 90%, 50%, 45%)",Music:"hsl(60, 90%, 50%, 45%)",Prices:"hsl(100, 90%, 50%, 45%)",Sports:"hsl(150, 90%, 50%, 45%)",Trivia:"hsl(200, 90%, 50%, 45%)","Video Games":"hsl(300, 90%, 50%, 45%)",Words:"hsl(340, 90%, 50%, 45%)",Miscellaneous:"hsl(0, 0%, 49%, 45%)"});export{Z as a,Y as b,F as c,X as d,z as e,Q as f,A as g,q as h,U as i,O as j,B as k,E as l,P as o,R as p,K as r,J as s,I as t,N as u};
