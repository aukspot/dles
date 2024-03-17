import{s as fe,d as pe,u as he,g as _e,e as ve,r as be}from"../chunks/scheduler.DqDtp4WO.js";import{S as me,i as de,e as h,c as _,d as x,g as n,h as t,j as y,t as W,a as Y,l as g,v as re,z as xe,m as E,w as ne,k as c,x as oe,y as ie,b as ue,n as k,f as ce,A as j,B as Q}from"../chunks/index.mXkAtjv9.js";import{b as ge}from"../chunks/paths.BGFBJZ2a.js";import{S as Ee}from"../chunks/SimpleLink.DwYs71ww.js";const Ce=!0,$e=Object.freeze(Object.defineProperty({__proto__:null,prerender:Ce},Symbol.toStringTag,{value:"Module"}));function Se(i){let l,o;const f=i[1].default,a=pe(f,i,i[0],null);return{c(){l=h("div"),a&&a.c(),this.h()},l(s){l=_(s,"DIV",{class:!0});var u=x(l);a&&a.l(u),u.forEach(n),this.h()},h(){t(l,"class","mx-1 py-4 px-2 flex flex-col gap-4 rounded-md text-xs sm:text-sm bg-colorCardA shadow-md shadow-colorNeutralSoft border-2 border-colorNeutralSofter")},m(s,u){y(s,l,u),a&&a.m(l,null),o=!0},p(s,[u]){a&&a.p&&(!o||u&1)&&he(a,f,s,s[0],o?ve(f,s[0],u,null):_e(s[0]),null)},i(s){o||(W(a,s),o=!0)},o(s){Y(a,s),o=!1},d(s){s&&n(l),a&&a.d(s)}}}function ze(i,l,o){let{$$slots:f={},$$scope:a}=l;return i.$$set=s=>{"$$scope"in s&&o(0,a=s.$$scope)},[a,f]}class ye extends me{constructor(l){super(),de(this,l,ze,Se,fe,{})}}function we(i){let l,o="Suggest a game!",f,a,s=`Is there a fun game / dle that is missing from the list? Make an anonymous
      suggestion below!`,u,m,v,d,e,r,A="URL",N,C,R,I,V,Z="Description",U,S,q,D,$,ee="Comments",F,z,X,L,G,M,H,T,J,K,te;return{c(){l=h("h2"),l.textContent=o,f=g(),a=h("p"),a.textContent=s,u=g(),m=h("div"),v=h("form"),d=h("fieldset"),e=h("div"),r=h("label"),r.textContent=A,N=g(),C=h("input"),R=g(),I=h("div"),V=h("label"),V.textContent=Z,U=g(),S=h("textarea"),q=g(),D=h("div"),$=h("label"),$.textContent=ee,F=g(),z=h("textarea"),X=g(),L=h("p"),G=ue("* Must fill at least one box."),H=g(),T=h("button"),J=ue("Submit"),this.h()},l(p){l=_(p,"H2",{class:!0,"data-svelte-h":!0}),k(l)!=="svelte-hngqz8"&&(l.textContent=o),f=E(p),a=_(p,"P",{class:!0,"data-svelte-h":!0}),k(a)!=="svelte-1mifznu"&&(a.textContent=s),u=E(p),m=_(p,"DIV",{class:!0});var b=x(m);v=_(b,"FORM",{class:!0,method:!0,action:!0});var se=x(v);d=_(se,"FIELDSET",{class:!0});var w=x(d);e=_(w,"DIV",{class:!0});var P=x(e);r=_(P,"LABEL",{for:!0,"data-svelte-h":!0}),k(r)!=="svelte-a2idys"&&(r.textContent=A),N=E(P),C=_(P,"INPUT",{type:!0,id:!0,name:!0,placeholder:!0}),P.forEach(n),R=E(w),I=_(w,"DIV",{class:!0});var B=x(I);V=_(B,"LABEL",{for:!0,"data-svelte-h":!0}),k(V)!=="svelte-1tds9bi"&&(V.textContent=Z),U=E(B),S=_(B,"TEXTAREA",{id:!0,name:!0,placeholder:!0,rows:!0}),x(S).forEach(n),B.forEach(n),q=E(w),D=_(w,"DIV",{class:!0});var O=x(D);$=_(O,"LABEL",{for:!0,"data-svelte-h":!0}),k($)!=="svelte-1cfsige"&&($.textContent=ee),F=E(O),z=_(O,"TEXTAREA",{id:!0,name:!0,placeholder:!0,rows:!0}),x(z).forEach(n),O.forEach(n),X=E(w),L=_(w,"P",{id:!0,class:!0});var le=x(L);G=ce(le,"* Must fill at least one box."),le.forEach(n),H=E(w),T=_(w,"BUTTON",{class:!0,type:!0});var ae=x(T);J=ce(ae,"Submit"),ae.forEach(n),w.forEach(n),se.forEach(n),b.forEach(n),this.h()},h(){t(l,"class","mb-0 text-center text-lg font-semibold"),t(a,"class","text-center text-colorTextSoft px-2"),t(r,"for","url"),t(C,"type","text"),t(C,"id","url"),t(C,"name","url"),t(C,"placeholder","example.game"),t(e,"class","formElementContainer svelte-b4zs8z"),t(V,"for","description"),t(S,"id","description"),t(S,"name","description"),t(S,"placeholder","describe the game"),t(S,"rows","4"),t(I,"class","formElementContainer svelte-b4zs8z"),t($,"for","comments"),t(z,"id","comments"),t(z,"name","comments"),t(z,"placeholder","share anything else here"),t(z,"rows","4"),t(D,"class","formElementContainer svelte-b4zs8z"),t(L,"id","criteria"),t(L,"class",M="text-center "+i[4]+" svelte-b4zs8z"),t(T,"class","btn mt-2 mx-auto w-48"),t(T,"type","submit"),T.disabled=i[3],t(d,"class","p-1 flex flex-col justify-end gap-2 bg-colorCardA"),t(v,"class","w-full"),t(v,"method","POST"),t(v,"action","https://formspree.io/f/xpzvdyzl"),t(m,"class","flex justify-center items-center")},m(p,b){y(p,l,b),y(p,f,b),y(p,a,b),y(p,u,b),y(p,m,b),c(m,v),c(v,d),c(d,e),c(e,r),c(e,N),c(e,C),j(C,i[0]),c(d,R),c(d,I),c(I,V),c(I,U),c(I,S),j(S,i[1]),c(d,q),c(d,D),c(D,$),c(D,F),c(D,z),j(z,i[2]),c(d,X),c(d,L),c(L,G),c(d,H),c(d,T),c(T,J),K||(te=[Q(C,"input",i[5]),Q(S,"input",i[6]),Q(z,"input",i[7])],K=!0)},p(p,b){b&1&&C.value!==p[0]&&j(C,p[0]),b&2&&j(S,p[1]),b&4&&j(z,p[2]),b&16&&M!==(M="text-center "+p[4]+" svelte-b4zs8z")&&t(L,"class",M),b&8&&(T.disabled=p[3])},d(p){p&&(n(l),n(f),n(a),n(u),n(m)),K=!1,be(te)}}}function Te(i){let l,o,f,a,s,u,m,v,d;return f=new Ee({props:{href:ge+"/",text:"Go back to collection"}}),v=new ye({props:{$$slots:{default:[we]},$$scope:{ctx:i}}}),{c(){l=h("meta"),o=g(),re(f.$$.fragment),a=g(),s=h("div"),u=g(),m=h("div"),re(v.$$.fragment),this.h()},l(e){const r=xe("svelte-kh186j",document.head);l=_(r,"META",{name:!0,content:!0}),r.forEach(n),o=E(e),ne(f.$$.fragment,e),a=E(e),s=_(e,"DIV",{class:!0}),x(s).forEach(n),u=E(e),m=_(e,"DIV",{class:!0});var A=x(m);ne(v.$$.fragment,A),A.forEach(n),this.h()},h(){document.title="Suggest a game!",t(l,"name","description"),t(l,"content","Suggest a game to be added to the list of dles."),t(s,"class","divider"),t(m,"class","mt-8 mx-auto sm:w-full max-w-lg flex flex-col gap-3")},m(e,r){c(document.head,l),y(e,o,r),oe(f,e,r),y(e,a,r),y(e,s,r),y(e,u,r),y(e,m,r),oe(v,m,null),d=!0},p(e,[r]){const A={};r&287&&(A.$$scope={dirty:r,ctx:e}),v.$set(A)},i(e){d||(W(f.$$.fragment,e),W(v.$$.fragment,e),d=!0)},o(e){Y(f.$$.fragment,e),Y(v.$$.fragment,e),d=!1},d(e){e&&(n(o),n(a),n(s),n(u),n(m)),n(l),ie(f,e),ie(v)}}}function Ae(i,l,o){let f,a,{url:s=""}=l,{description:u=""}=l,{comments:m=""}=l;function v(){s=this.value,o(0,s)}function d(){u=this.value,o(1,u)}function e(){m=this.value,o(2,m)}return i.$$set=r=>{"url"in r&&o(0,s=r.url),"description"in r&&o(1,u=r.description),"comments"in r&&o(2,m=r.comments)},i.$$.update=()=>{i.$$.dirty&7&&o(3,f=[s,u,m].every(r=>r.length==0)),i.$$.dirty&8&&o(4,a=f?"text-colorError":"")},[s,u,m,f,a,v,d,e]}class je extends me{constructor(l){super(),de(this,l,Ae,Te,fe,{url:0,description:1,comments:2})}}export{je as component,$e as universal};
