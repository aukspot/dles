import{s as A,n as y,o as U,r as Y,q as j,u as Q,v as J,w as X}from"../chunks/scheduler.BzRGDREP.js";import{S as D,i as S,C as W,D as K,a as f,d as c,h as o,j as E,k as h,e as g,v as G,c as v,w as M,x as R,B as N,p as x,n as I,y as L,s as C,g as q,f as T,q as B,E as Z,t as O,H as ee,b as F,F as te}from"../chunks/index.B61UMe1a.js";import{e as le}from"../chunks/each.D6YF6ztN.js";const se=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function ae(n){let e,t,l;return{c(){e=W("svg"),t=W("path"),l=W("path"),this.h()},l(r){e=K(r,"svg",{width:!0,height:!0,viewBox:!0,fill:!0,xmlns:!0,class:!0});var s=f(e);t=K(s,"path",{d:!0,stroke:!0,"stroke-width":!0}),f(t).forEach(c),l=K(s,"path",{d:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0}),f(l).forEach(c),s.forEach(c),this.h()},h(){o(t,"d","M14.5 19.5H9.5M14.5 19.5C14.5 18.7865 14.5 18.4297 14.5381 18.193C14.6609 17.4296 14.6824 17.3815 15.1692 16.7807C15.3201 16.5945 15.8805 16.0927 17.0012 15.0892C18.5349 13.7159 19.5 11.7206 19.5 9.5C19.5 5.35786 16.1421 2 12 2C7.85786 2 4.5 5.35786 4.5 9.5C4.5 11.7206 5.4651 13.7159 6.99876 15.0892C8.11945 16.0927 8.67987 16.5945 8.83082 16.7807C9.31762 17.3815 9.3391 17.4296 9.46192 18.193C9.5 18.4297 9.5 18.7865 9.5 19.5M14.5 19.5C14.5 20.4346 14.5 20.9019 14.299 21.25C14.1674 21.478 13.978 21.6674 13.75 21.799C13.4019 22 12.9346 22 12 22C11.0654 22 10.5981 22 10.25 21.799C10.022 21.6674 9.83261 21.478 9.70096 21.25C9.5 20.9019 9.5 20.4346 9.5 19.5"),o(t,"stroke","currentColor"),o(t,"stroke-width","1.5"),o(l,"d","M12.7857 8.5L10.6429 11.5H13.6429L11.5 14.5"),o(l,"stroke","currentColor"),o(l,"stroke-width","1.5"),o(l,"stroke-linecap","round"),o(l,"stroke-linejoin","round"),o(e,"width","800px"),o(e,"height","800px"),o(e,"viewBox","0 0 24 24"),o(e,"fill","none"),o(e,"xmlns","http://www.w3.org/2000/svg"),o(e,"class","svelte-v9ra62")},m(r,s){E(r,e,s),h(e,t),h(e,l)},p:y,i:y,o:y,d(r){r&&c(e)}}}class re extends D{constructor(e){super(),S(this,e,null,ae,A,{})}}function oe(n){let e,t,l,r,s;return t=new re({}),{c(){e=g("button"),G(t.$$.fragment),this.h()},l(a){e=v(a,"BUTTON",{class:!0});var d=f(e);M(t.$$.fragment,d),d.forEach(c),this.h()},h(){o(e,"class","themeButton svelte-1etdhoe")},m(a,d){E(a,e,d),R(t,e,null),l=!0,r||(s=N(e,"click",n[0]),r=!0)},p:y,i(a){l||(x(t.$$.fragment,a),l=!0)},o(a){I(t.$$.fragment,a),l=!1},d(a){a&&c(e),L(t),r=!1,s()}}}const P="theme",ne="(prefers-color-scheme: dark)";function V(){var n="test";try{return localStorage.setItem(n,n),localStorage.removeItem(n),!0}catch{return!1}}function me(n){const e={DARK:"dark",LIGHT:"light"},t=()=>window.matchMedia(ne).matches,l=()=>{if(!V()){r();return}localStorage.getItem(P)?localStorage.removeItem(P):localStorage.setItem(P,t()?e.LIGHT:e.DARK),r()},r=()=>{if(!V()){document.body.classList.toggle(e.DARK);return}const s=t()?e.DARK:e.LIGHT;let a=localStorage.getItem(P)??s;a&&a==e.DARK?document.body.classList.add(e.DARK):document.body.classList.remove(e.DARK)};return U(r),[l]}class de extends D{constructor(e){super(),S(this,e,me,oe,A,{})}}function ie(n){let e,t,l,r;return l=new de({}),{c(){e=g("header"),t=g("div"),G(l.$$.fragment),this.h()},l(s){e=v(s,"HEADER",{});var a=f(e);t=v(a,"DIV",{id:!0,class:!0});var d=f(t);M(l.$$.fragment,d),d.forEach(c),a.forEach(c),this.h()},h(){o(t,"id","themeSwitcher"),o(t,"class","svelte-1c38dnb")},m(s,a){E(s,e,a),h(e,t),R(l,t,null),r=!0},p:y,i(s){r||(x(l.$$.fragment,s),r=!0)},o(s){I(l.$$.fragment,s),r=!1},d(s){s&&c(e),L(l)}}}class ce extends D{constructor(e){super(),S(this,e,null,ie,A,{})}}const ue=[{date:"2024-02-27",description:"6 dles added.","dles added":[{name:"Mislettered",url:"https://tryhardguides.com/mislettered/"},{name:"One Word Search",url:"https://onewordsearch.com/"},{name:"pedantle",url:"https://cemantle.certitudes.org/pedantle"},{name:"PopCultured",url:"https://histordle.com/popcultured/"},{name:"Songle",url:"https://histordle.com/songle/"},{name:"Yeardle",url:"https://histordle.com/yeardle/"}]},{date:"2024-02-17",description:"8 dles added.","dles added":[{name:"Connections Game",url:"https://connectionsgame.com"},{name:"Daily Tomato",url:"https://www.rottentomatoes.com/movie-trivia/"},{name:"Dordle",url:"https://zaratustra.itch.io/dordle"},{name:"hello wordl",url:"https://hellowordl.net/?today"},{name:"Listed",url:"https://listed.fun/"},{name:"Puckdoku",url:"https://www.puckdoku.com/"},{name:"Quordle",url:"https://quordlegame.com/"},{name:"Spelling Bee",url:"https://spellsbee.com/"}]},{date:"2024-02-16",description:'Added a <a href="/dles/suggest">suggestion form</a>.<br>4 dles added.',"dles added":[{name:"Adoptle",url:"https://tryhardguides.com/adoptle/"},{name:"Concludle",url:"https://tryhardguides.com/concludle/"},{name:"Globle Capitals",url:"https://globle-capitals.com/"},{name:"NYT Sudoku",url:"https://www.nytimes.com/puzzles/sudoku"}]},{date:"2024-02-14",description:'Added a proper <a href="https://github.com/aukspot/dles/blob/main/README.md" target="_blank">README</a>.<br>Removed daily and unlimited tags for simplicity.<br>Added archive tag. <br>7 dles added, 1 removed.',"dles added":[{name:"Archiguessr",url:"https://archiguesser.com/"},{name:"Daydle",url:"https://daydle.com/"},{name:"Immaculate Grid: Hockey",url:"https://www.immaculategrid.com/hockey"},{name:"Nerdle",url:"https://nerdlegame.com/"},{name:"Quizl",url:"https://quizl.io/"},{name:"Redactle",url:"https://redactle.net/"},{name:"WordAll",url:"https://wordall.xyz/"}],"dles removed":[{name:"Gamedle Classic Unlimited",url:"https://www.gamedle.wtf/unlimited"}]},{date:"2024-02-13",description:"Added tags with include/exclude filters.<br>Added dark mode toggle.<br>57 dles added.","dles added":[{name:"Bandle",url:"https://bandle.app/"},{name:"Box Office Game",url:"https://boxofficega.me/"},{name:"Chronophoto",url:"https://www.chronophoto.app/"},{name:"Cine2Nerdle",url:"https://www.cinenerdle2.app/"},{name:"Colorfle",url:"https://colorfle.org/index.html"},{name:"Combinations",url:"https://combinations.org/"},{name:"Conexo",url:"https://conexo.ws/en/daily"},{name:"Connections",url:"https://www.nytimes.com/games/connections"},{name:"Contexto",url:"https://contexto.me/"},{name:"Costcodle",url:"https://costcodle.com/"},{name:"Crosswordle",url:"https://crosswordle.vercel.app"},{name:"crosswordle.com",url:"https://crosswordle.com/"},{name:"crosswordle.org",url:"https://crosswordle.org/"},{name:"Daily Dozen Trivia",url:"https://dailydozentrivia.com/"},{name:"Flagdle",url:"https://www.flagdle.org/"},{name:"Flagle",url:"https://www.flagle.io/"},{name:"Framed",url:"https://framed.wtf/"},{name:"Gamedle Artwork",url:"https://www.gamedle.wtf/artwork"},{name:"Gamedle Classic",url:"https://www.gamedle.wtf/classic"},{name:"Gamedle Classic Unlimited",url:"https://www.gamedle.wtf/unlimited"},{name:"Gamedle Guess",url:"https://www.gamedle.wtf/guess"},{name:"Gamedle Keywords",url:"https://www.gamedle.wtf/keywords"},{name:"Globle",url:"https://globle-game.com/game"},{name:"Guess The Game",url:"https://guessthe.game/"},{name:"Housle",url:"https://housle.house/game"},{name:"Immaculate Footy",url:"https://www.immaculatefooty.com"},{name:"Immaculate Grid: Baseball",url:"https://www.immaculategrid.com/"},{name:"Immaculate Grid: Men's Basketball",url:"https://www.immaculategrid.com/basketball/mens"},{name:"Immaculate Grid: Pro Football",url:"https://www.immaculategrid.com/football"},{name:"Immaculate Grid: Women's Basketball",url:"https://www.immaculategrid.com/basketball/womens"},{name:"Metaflora",url:"https://flora.metazooa.com/"},{name:"Metazooa",url:"https://metazooa.com/"},{name:"MLB Pickle",url:"https://www.mlbpickle.com/"},{name:"Movie Grid",url:"https://moviegrid.io/"},{name:"Movie to Movie",url:"https://movietomovie.com/"},{name:"NYT Mini Crossword",url:"https://www.nytimes.com/crosswords/game/mini"},{name:"OEC Tradle",url:"https://games.oec.world/en/tradle/"},{name:"Petdle",url:"https://petdle.link/"},{name:"Pokedoku",url:"https://pokedoku.com/"},{name:"Puzzmo - Crossword",url:"https://www.puzzmo.com/play/crossword"},{name:"Puzzmo - Flipart",url:"https://www.puzzmo.com/play/flip-art"},{name:"Puzzmo - Really Bad Chess",url:"https://www.puzzmo.com/play/really-bad-chess"},{name:"Puzzmo - Spelltower",url:"https://www.puzzmo.com/play/spelltower"},{name:"Puzzmo - Typeshift",url:"https://www.puzzmo.com/play/typeshift"},{name:"Semantle",url:"https://semantle.com/"},{name:"Songless",url:"https://lessgames.com/songless"},{name:"Spellcheck",url:"https://spellcheck.xyz/"},{name:"Statele",url:"https://statele.teuteuf.fr/"},{name:"TimeGuessr",url:"https://timeguessr.com/"},{name:"travle",url:"https://travle.earth/"},{name:"Weaver",url:"https://weavergame.org/"},{name:"WhereTaken",url:"https://wheretaken.teuteuf.fr/"},{name:"WhereTaken USA",url:"https://wheretakenusa.teuteuf.fr/"},{name:"Word Waffle",url:"https://wordwaffle.org/"},{name:"Wordle",url:"https://www.nytimes.com/games/wordle/index.html"},{name:"Wordless",url:"https://lessgames.com/wordless"},{name:"Worldle",url:"https://worldle.teuteuf.fr/"}]}];function he(n,e,t){const l=n.slice();return l[0]=e[t],l}function pe(n){let e,t,l,r=n[0].date+"",s,a,d,m,i,$=n[0].description+"",p;return{c(){e=g("div"),t=g("time"),l=g("strong"),s=O(r),a=O(":"),d=C(),m=g("section"),i=new ee(!1),p=C(),this.h()},l(_){e=v(_,"DIV",{class:!0});var b=f(e);t=v(b,"TIME",{datetime:!0});var w=f(t);l=v(w,"STRONG",{});var u=f(l);s=F(u,r),u.forEach(c),a=F(w,":"),w.forEach(c),d=T(b),m=v(b,"SECTION",{});var k=f(m);i=te(k,!1),k.forEach(c),p=T(b),b.forEach(c),this.h()},h(){o(t,"datetime",n[0].date),i.a=null,o(e,"class","entry svelte-136mdf9")},m(_,b){E(_,e,b),h(e,t),h(t,l),h(l,s),h(t,a),h(e,d),h(e,m),i.m($,m),h(e,p)},p:y,d(_){_&&c(e)}}}function fe(n){let e,t,l,r="Changelog",s,a,d=le(ue),m=[];for(let i=0;i<d.length;i+=1)m[i]=pe(he(n,d,i));return{c(){e=g("div"),t=g("details"),l=g("summary"),l.textContent=r,s=C(),a=g("div");for(let i=0;i<m.length;i+=1)m[i].c();this.h()},l(i){e=v(i,"DIV",{id:!0,class:!0});var $=f(e);t=v($,"DETAILS",{id:!0,style:!0,class:!0});var p=f(t);l=v(p,"SUMMARY",{class:!0,style:!0,"data-svelte-h":!0}),q(l)!=="svelte-4easkr"&&(l.textContent=r),s=T(p),a=v(p,"DIV",{id:!0,class:!0});var _=f(a);for(let b=0;b<m.length;b+=1)m[b].l(_);_.forEach(c),p.forEach(c),$.forEach(c),this.h()},h(){o(l,"class","not-selectable pointer"),B(l,"margin-bottom","0.75rem"),B(l,"text-align","center"),B(l,"cursor","pointer"),B(l,"font-size","1.2rem"),o(a,"id","entries"),o(a,"class","svelte-136mdf9"),o(t,"id","changelog"),B(t,"padding","0.25rem"),o(t,"class","svelte-136mdf9"),o(e,"id","changelogContainer"),o(e,"class","svelte-136mdf9")},m(i,$){E(i,e,$),h(e,t),h(t,l),h(t,s),h(t,a);for(let p=0;p<m.length;p+=1)m[p]&&m[p].m(a,null)},p:y,i:y,o:y,d(i){i&&c(e),Z(m,i)}}}class we extends D{constructor(e){super(),S(this,e,null,fe,A,{})}}const{document:ge}=se;function ve(n){let e,t,l,r="Back to top",s,a;return{c(){e=C(),t=g("div"),l=g("button"),l.textContent=r,this.h()},l(d){e=T(d),t=v(d,"DIV",{class:!0});var m=f(t);l=v(m,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),q(l)!=="svelte-hqvvlj"&&(l.textContent=r),m.forEach(c),this.h()},h(){o(l,"id","backToTop"),o(l,"class","scrollToTopBtn filterButton svelte-1lo125h"),o(t,"class","svelte-1lo125h")},m(d,m){E(d,e,m),E(d,t,m),h(t,l),s||(a=[N(ge,"scroll",be),N(l,"click",_e)],s=!0)},p:y,i:y,o:y,d(d){d&&(c(e),c(t)),s=!1,Y(a)}}}function _e(){window.scrollTo({top:0,left:0,behavior:"smooth"})}function be(n){const e=document.getElementById("backToTop"),t=document.documentElement;let l=t.scrollHeight-t.clientHeight;window.scrollY>600&&t.scrollTop/l>.8?e.classList.add("showBtn"):e.classList.remove("showBtn")}class ke extends D{constructor(e){super(),S(this,e,null,ve,A,{})}}function ye(n){let e,t,l,r,s,a,d,m,i,$,p,_;l=new ce({});const b=n[1].default,w=j(b,n,n[0],null);return a=new ke({}),p=new we({}),{c(){e=g("div"),t=g("main"),G(l.$$.fragment),r=C(),w&&w.c(),s=C(),G(a.$$.fragment),d=C(),m=g("footer"),i=g("div"),$=C(),G(p.$$.fragment),this.h()},l(u){e=v(u,"DIV",{class:!0});var k=f(e);t=v(k,"MAIN",{class:!0});var z=f(t);M(l.$$.fragment,z),r=T(z),w&&w.l(z),s=T(z),M(a.$$.fragment,z),z.forEach(c),d=T(k),m=v(k,"FOOTER",{class:!0});var H=f(m);i=v(H,"DIV",{class:!0}),f(i).forEach(c),$=T(H),M(p.$$.fragment,H),H.forEach(c),k.forEach(c),this.h()},h(){o(t,"class","svelte-16ufnrw"),o(i,"class","divider"),o(m,"class","svelte-16ufnrw"),o(e,"class","app svelte-16ufnrw")},m(u,k){E(u,e,k),h(e,t),R(l,t,null),h(t,r),w&&w.m(t,null),h(t,s),R(a,t,null),h(e,d),h(e,m),h(m,i),h(m,$),R(p,m,null),_=!0},p(u,[k]){w&&w.p&&(!_||k&1)&&Q(w,b,u,u[0],_?X(b,u[0],k,null):J(u[0]),null)},i(u){_||(x(l.$$.fragment,u),x(w,u),x(a.$$.fragment,u),x(p.$$.fragment,u),_=!0)},o(u){I(l.$$.fragment,u),I(w,u),I(a.$$.fragment,u),I(p.$$.fragment,u),_=!1},d(u){u&&c(e),L(l),w&&w.d(u),L(a),L(p)}}}function $e(n,e,t){let{$$slots:l={},$$scope:r}=e;return n.$$set=s=>{"$$scope"in s&&t(0,r=s.$$scope)},[r,l]}class ze extends D{constructor(e){super(),S(this,e,$e,ye,A,{})}}export{ze as component};
