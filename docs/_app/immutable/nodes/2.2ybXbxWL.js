import{s as le,n as ce,c as J,x as Q,y as $e,r as Ie}from"../chunks/scheduler.BzRGDREP.js";import{S as re,i as oe,e as y,t as ee,c as b,a as I,b as te,d,o as h,p as N,g as F,h as f,C as se,j as ie,n as A,q as ue,m as de,l as W,D as pe,u as R,v as j,w as Y,x as K,s as L,f as P,z as X,k as we,y as Se}from"../chunks/index.CyOMe2O_.js";import{e as ne}from"../chunks/each.D6YF6ztN.js";import{w as he}from"../chunks/index.BuPfINcF.js";const Fe=!0,Lt=Object.freeze(Object.defineProperty({__proto__:null,prerender:Fe},Symbol.toStringTag,{value:"Module"})),Le="#b2e5e3",Pe="#d9e5b2",Be="#b2e5da",Me="#e5bfb2",Ae="#e5bbb2",Ve="#e5bcb2",Ne="#ceb2e5",We="#d7e5b2",Oe="#b2cae5",Ue="#b2c4e5",qe="#d0e5b2",He="#b2c6e5",Re="#cab2e5",je="#c1b2e5",Ye="#c0e5b2",Ke="#e5b2db",Qe="#b2e5e0",Je="#e5bab2",Xe="#b2e5da",Ze="#c2e5b2",et="#e5bab2",tt="#bbb2e5",st="#dab2e5",lt="#e5b2db",rt="#e5d1b2",ot="#c1b2e5",at="#c9e5b2",nt="#e5bfb2",ve={music:Le,flags:Pe,maps:Be,basketball:Me,art:Ae,audio:Ve,trivia:Ne,football:We,pictures:Oe,puzzmo:Ue,geography:qe,prices:He,time:Re,sports:je,hockey:Ye,words:Ke,movies:Qe,architecture:Je,math:Xe,history:Ze,archive:et,science:tt,"video games":"#e1b2e5",usa:st,wordle:lt,colors:rt,soccer:ot,guessing:at,baseball:nt};let ye=he([]),ge=he([]),me=he([]),H=he({});function it(o){let e,t,s,l;return{c(){e=y("button"),t=ee(o[0]),this.h()},l(n){e=b(n,"BUTTON",{class:!0,style:!0});var r=I(e);t=te(r,o[0]),r.forEach(d),this.h()},h(){h(e,"class","filterTag not-selectable svelte-eqjtq0"),N(e,"background-color",ve[o[0]])},m(n,r){F(n,e,r),f(e,t),s||(l=se(e,"click",o[1]),s=!0)},p(n,[r]){r&1&&ie(t,n[0]),r&1&&N(e,"background-color",ve[n[0]])},i:ce,o:ce,d(n){n&&d(e),s=!1,l()}}}function ct(o,e,t){let s;J(o,H,i=>t(3,s=i));let{name:l}=e,{type:n}=e;function r(){n=="include"&&Q(H,s[l].included=!s[l].included,s),n=="exclude"&&Q(H,s[l].excluded=!s[l].excluded,s)}return o.$$set=i=>{"name"in i&&t(0,l=i.name),"type"in i&&t(2,n=i.type)},[l,r,n]}class Ee extends re{constructor(e){super(),oe(this,e,ct,it,le,{name:0,type:2})}}function be(o,e,t){const s=o.slice();return s[1]=e[t],s}function _e(o){let e,t;return e=new Ee({props:{name:o[1],type:"include"}}),{c(){R(e.$$.fragment)},l(s){j(e.$$.fragment,s)},m(s,l){Y(e,s,l),t=!0},p(s,l){const n={};l&1&&(n.name=s[1]),e.$set(n)},i(s){t||(A(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){K(e,s)}}}function ut(o){let e,t,s=ne(o[0]),l=[];for(let r=0;r<s.length;r+=1)l[r]=_e(be(o,s,r));const n=r=>W(l[r],1,1,()=>{l[r]=null});return{c(){e=y("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=b(r,"DIV",{class:!0});var i=I(e);for(let a=0;a<l.length;a+=1)l[a].l(i);i.forEach(d),this.h()},h(){h(e,"class","svelte-m655z9")},m(r,i){F(r,e,i);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(e,null);t=!0},p(r,[i]){if(i&1){s=ne(r[0]);let a;for(a=0;a<s.length;a+=1){const g=be(r,s,a);l[a]?(l[a].p(g,i),A(l[a],1)):(l[a]=_e(g),l[a].c(),A(l[a],1),l[a].m(e,null))}for(ue(),a=s.length;a<l.length;a+=1)n(a);de()}},i(r){if(!t){for(let i=0;i<s.length;i+=1)A(l[i]);t=!0}},o(r){l=l.filter(Boolean);for(let i=0;i<l.length;i+=1)W(l[i]);t=!1},d(r){r&&d(e),pe(l,r)}}}function dt(o,e,t){let{tags:s}=e;return o.$$set=l=>{"tags"in l&&t(0,s=l.tags)},[s]}class ht extends re{constructor(e){super(),oe(this,e,dt,ut,le,{tags:0})}}function gt(o){let e,t,s,l,n,r,i,a,g,_=o[1].name+"",k,x,c,G=o[1].description+"",T,z,w,E,B,V,M,q="Play",O,S;return w=new ht({props:{tags:o[1].tags}}),{c(){e=y("li"),t=y("div"),s=y("div"),l=y("span"),n=ee(o[0]),r=ee("."),i=L(),a=y("span"),g=y("strong"),k=ee(_),x=L(),c=y("div"),T=ee(G),z=L(),R(w.$$.fragment),E=L(),B=y("div"),V=y("a"),M=y("button"),M.textContent=q,this.h()},l($){e=b($,"LI",{class:!0});var m=I(e);t=b(m,"DIV",{class:!0});var D=I(t);s=b(D,"DIV",{style:!0});var v=I(s);l=b(v,"SPAN",{class:!0});var U=I(l);n=te(U,o[0]),r=te(U,"."),U.forEach(d),i=P(v),a=b(v,"SPAN",{class:!0});var u=I(a);g=b(u,"STRONG",{});var p=I(g);k=te(p,_),p.forEach(d),u.forEach(d),v.forEach(d),x=P(D),c=b(D,"DIV",{class:!0});var C=I(c);T=te(C,G),C.forEach(d),z=P(D),j(w.$$.fragment,D),D.forEach(d),E=P(m),B=b(m,"DIV",{class:!0});var Z=I(B);V=b(Z,"A",{href:!0,target:!0,rel:!0});var ae=I(V);M=b(ae,"BUTTON",{class:!0,"data-svelte-h":!0}),X(M)!=="svelte-1tm5a7p"&&(M.textContent=q),ae.forEach(d),Z.forEach(d),m.forEach(d),this.h()},h(){h(l,"class","not-selectable name svelte-10ofvas"),h(a,"class","name svelte-10ofvas"),N(s,"display","flex"),N(s,"align-items","flex-start"),N(s,"gap","0.25rem"),N(s,"vertical-align","text-top"),h(c,"class","description svelte-10ofvas"),h(t,"class","left svelte-10ofvas"),h(M,"class","play not-selectable svelte-10ofvas"),h(V,"href",O=o[1].url),h(V,"target","_blank"),h(V,"rel","noreferrer"),h(B,"class","right svelte-10ofvas"),h(e,"class","svelte-10ofvas")},m($,m){F($,e,m),f(e,t),f(t,s),f(s,l),f(l,n),f(l,r),f(s,i),f(s,a),f(a,g),f(g,k),f(t,x),f(t,c),f(c,T),f(t,z),Y(w,t,null),f(e,E),f(e,B),f(B,V),f(V,M),S=!0},p($,[m]){(!S||m&1)&&ie(n,$[0]),(!S||m&2)&&_!==(_=$[1].name+"")&&ie(k,_),(!S||m&2)&&G!==(G=$[1].description+"")&&ie(T,G);const D={};m&2&&(D.tags=$[1].tags),w.$set(D),(!S||m&2&&O!==(O=$[1].url))&&h(V,"href",O)},i($){S||(A(w.$$.fragment,$),S=!0)},o($){W(w.$$.fragment,$),S=!1},d($){$&&d(e),K(w)}}}function mt(o,e,t){let{i:s}=e,{dle:l}=e;return o.$$set=n=>{"i"in n&&t(0,s=n.i),"dle"in n&&t(1,l=n.dle)},[s,l]}class ft extends re{constructor(e){super(),oe(this,e,mt,gt,le,{i:0,dle:1})}}const pt=[{name:"Archiguessr",url:"https://archiguesser.com/",description:"Guess the name of the architecture, given a series of pictures.",tags:["architecture","archive","guessing","pictures"]},{name:"Bandle",url:"https://bandle.app/",description:"Guess the song, one instrument at a time (sort of).",tags:["audio","guessing","music"]},{name:"Box Office Game",url:"https://boxofficega.me/",description:"Guess the top five movies in the US domestic box office for the given weekend.",tags:["guessing","movies"]},{name:"Chronophoto",url:"https://www.chronophoto.app/",description:"Guess the year in which each historical picture was taken.",tags:["history","pictures","time"]},{name:"Cine2Nerdle",url:"https://www.cinenerdle2.app/",description:"Rearrange the tiles into groups that represent movies/themes. Includes both Original and Reversal.",tags:["archive","movies"]},{name:"Colorfle",url:"https://colorfle.org/index.html",description:"Figure out the color composition of the given color.",tags:["colors","guessing"]},{name:"Combinations",url:"https://combinations.org/",description:"Create words using combinations of letters from the grid.",tags:["words"]},{name:"Conexo",url:"https://conexo.ws/en/daily",description:"Form groups of 4 words that have something in common.",tags:["archive","guessing","words"]},{name:"Connections",url:"https://www.nytimes.com/games/connections",description:"Group words that share a common thread.",tags:["words"]},{name:"Contexto",url:"https://contexto.me/",description:"Guess words to see how close they are to the secret word in terms of context, eventually guessing the secret word.",tags:["archive","guessing","words"]},{name:"Costcodle",url:"https://costcodle.com/",description:"Guess the price of the given Costco item.",tags:["guessing","prices"]},{name:"Crosswordle",url:"https://crosswordle.vercel.app",description:"Fill in the grid to logically fit a series of Wordle guesses.",tags:["wordle","words"]},{name:"crosswordle.com",url:"https://crosswordle.com/",description:"Swap tiles to solve multiple Wordle puzzles crossed together.",tags:["wordle","words"]},{name:"crosswordle.org",url:"https://crosswordle.org/",description:"Solve multiple Wordle puzzles crossed together.",tags:["archive","guessing","wordle","words"]},{name:"Daily Dozen Trivia",url:"https://dailydozentrivia.com/",description:"Answer 9 trivia questions from various categories.",tags:["trivia"]},{name:"Daydle",url:"https://daydle.com/",description:"Given an event that happened on today's month/day, guess the year in which the event occurred.",tags:["guessing","history","time"]},{name:"Flagdle",url:"https://www.flagdle.org/",description:"Guess the country by its flag.",tags:["flags","geography"]},{name:"Flagle",url:"https://www.flagle.io/",description:"Guess the flag in 5 guesses or less.",tags:["flags","geography","guessing"]},{name:"Framed",url:"https://framed.wtf/",description:"Guess the movie from 6 frames.",tags:["archive","guessing","movies","pictures"]},{name:"Gamedle Artwork",url:"https://www.gamedle.wtf/artwork",description:"Guess the video game by its artwork.",tags:["art","guessing","pictures","video games"]},{name:"Gamedle Classic",url:"https://www.gamedle.wtf/classic",description:"Guess the video game by its cover.",tags:["guessing","pictures","video games"]},{name:"Gamedle Guess",url:"https://www.gamedle.wtf/guess",description:"Guess the video game by its specifications.",tags:["guessing","video games"]},{name:"Gamedle Keywords",url:"https://www.gamedle.wtf/keywords",description:"Guess the video game by keywords.",tags:["guessing","video games","words"]},{name:"Globle",url:"https://globle-game.com/game",description:"Guess the mystery country, given how close it is to each guessed country.",tags:["geography","guessing","maps"]},{name:"Guess The Game",url:"https://guessthe.game/",description:"Guess the video game by its cropped screenshots.",tags:["guessing","pictures","video games"]},{name:"Housle",url:"https://housle.house/game",description:"Guess the price of the house, given pictures of parts of the house.",tags:["guessing","prices"]},{name:"Immaculate Footy",url:"https://www.immaculatefooty.com",description:"Fill out the grid with soccer players matching the criteria of each cell's row and column.",tags:["soccer","sports"]},{name:"Immaculate Grid: Baseball",url:"https://www.immaculategrid.com/",description:"Fill out the grid with baseball players matching the criteria of each cell's row and column.",tags:["baseball","sports"]},{name:"Immaculate Grid: Hockey",url:"https://www.immaculategrid.com/hockey",description:"Fill out the grid with hockey players matching the criteria of each cell's row and column.",tags:["hockey","sports"]},{name:"Immaculate Grid: Men's Basketball",url:"https://www.immaculategrid.com/basketball/mens",description:"Fill out the grid with men's basketball players matching the criteria of each cell's row and column.",tags:["basketball","sports"]},{name:"Immaculate Grid: Pro Football",url:"https://www.immaculategrid.com/football",description:"Fill out the grid with pro football players matching the criteria of each cell's row and column.",tags:["football","sports"]},{name:"Immaculate Grid: Women's Basketball",url:"https://www.immaculategrid.com/basketball/womens",description:"Fill out the grid with women's basketball players matching the criteria of each cell's row and column.",tags:["basketball","sports"]},{name:"Metaflora",url:"https://flora.metazooa.com/",description:"Guess plants to see where they share common ancestors with the mystery plant, eventually guessing the mystery plant.",tags:["guessing","science"]},{name:"Metazooa",url:"https://metazooa.com/",description:"Guess animals to see where they share common ancestors with the mystery animal, eventually guessing the mystery animal.",tags:["guessing","science"]},{name:"MLB Pickle",url:"https://www.mlbpickle.com/",description:"Guess today's mystery MLB player within nine guesses.",tags:["baseball","guessing","sports"]},{name:"Movie Grid",url:"https://moviegrid.io/",description:"Fill out the grid with movies matching the criteria of each cell's row and column.",tags:["movies"]},{name:"Movie to Movie",url:"https://movietomovie.com/",description:"Connect two movies by jumping through actors and the movies they've been in.",tags:["movies"]},{name:"Nerdle",url:"https://nerdlegame.com/",description:"Guess the secret arithmetic equation.",tags:["guessing","math"]},{name:"NYT Mini Crossword",url:"https://www.nytimes.com/crosswords/game/mini",description:"A very small crossword puzzle by the New York Times.",tags:["words"]},{name:"OEC Tradle",url:"https://games.oec.world/en/tradle/",description:"Guess the country by its exports.",tags:["geography","guessing"]},{name:"Petdle",url:"https://petdle.link/",description:"Guess the pet taken from the game Super Auto Pets.",tags:["guessing","video games"]},{name:"Pokedoku",url:"https://pokedoku.com/",description:"Fill out the grid with Pokémon matching the criteria of each cell's row and column.",tags:["video games"]},{name:"Puzzmo - Crossword",url:"https://www.puzzmo.com/play/crossword",description:"Crosswords without getting stuck.",tags:["puzzmo","words"]},{name:"Puzzmo - Flipart",url:"https://www.puzzmo.com/play/flip-art",description:"Rotate the pieces to fit them within the frame.",tags:["puzzmo"]},{name:"Puzzmo - Really Bad Chess",url:"https://www.puzzmo.com/play/really-bad-chess",description:"Checkmate the opponent's king in this randomized Chess variant.",tags:["puzzmo"]},{name:"Puzzmo - Spelltower",url:"https://www.puzzmo.com/play/spelltower",description:"Find words to clear tiles in the falling grid.",tags:["puzzmo","words"]},{name:"Puzzmo - Typeshift",url:"https://www.puzzmo.com/play/typeshift",description:"Slide columns of letters to make words, using all of the letters along the way.",tags:["puzzmo","words"]},{name:"Quizl",url:"https://quizl.io/",description:"Answer today's trivia questions.",tags:["trivia"]},{name:"Redactle",url:"https://redactle.net/",description:"Guess the Wikipedia article by its content with keywords redacted.",tags:["guessing","words"]},{name:"Semantle",url:"https://semantle.com/",description:"Guess words to see how close they are to the secret word semantically, eventually guessing the secret word.",tags:["guessing","words"]},{name:"Songless",url:"https://lessgames.com/songless",description:"Guess the song from listening to small parts of it.",tags:["audio","guessing","music"]},{name:"Spellcheck",url:"https://spellcheck.xyz/",description:"Spell the words correctly after listening to them.",tags:["audio","words"]},{name:"Statele",url:"https://statele.teuteuf.fr/",description:"Guess the US State by its outline on the map.",tags:["geography","maps","usa"]},{name:"TimeGuessr",url:"https://timeguessr.com/",description:"Guess the right time and location of each historical photo.",tags:["geography","history","maps","pictures","time"]},{name:"travle",url:"https://travle.earth/",description:"Connect the starting country to the ending country by naming countries in between them.",tags:["geography","maps"]},{name:"Weaver",url:"https://weavergame.org/",description:"Weave your way from the start word to the end word, changing only one letter at a time.",tags:["words"]},{name:"WhereTaken",url:"https://wheretaken.teuteuf.fr/",description:"Guess the Country/Region in which the photo was taken.",tags:["geography","guessing","pictures"]},{name:"WhereTaken USA",url:"https://wheretakenusa.teuteuf.fr/",description:"Guess the US State in which the photo was taken.",tags:["geography","guessing","pictures","usa"]},{name:"Word Waffle",url:"https://wordwaffle.org/",description:"Move letters to create words both horizontally and vertically.",tags:["wordle","words"]},{name:"WordAll",url:"https://wordall.xyz/",description:"Guess all of the Wordle words, given the starting clues.",tags:["guessing","wordle","words"]},{name:"Wordle",url:"https://www.nytimes.com/games/wordle/index.html",description:"Guess the 5-letter word in six or fewer attempts.",tags:["guessing","wordle","words"]},{name:"Wordless",url:"https://lessgames.com/wordless",description:"Solve Wordle puzzles of various sizes.",tags:["guessing","wordle","words"]},{name:"Worldle",url:"https://worldle.teuteuf.fr/",description:"Guess the country by its shape on the world map.",tags:["geography","maps"]}];function ke(o,e,t){const s=o.slice();return s[3]=e[t],s}function wt(o){let e,t,s=ne(o[0]),l=[];for(let r=0;r<s.length;r+=1)l[r]=ze(ke(o,s,r));const n=r=>W(l[r],1,1,()=>{l[r]=null});return{c(){for(let r=0;r<l.length;r+=1)l[r].c();e=we()},l(r){for(let i=0;i<l.length;i+=1)l[i].l(r);e=we()},m(r,i){for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(r,i);F(r,e,i),t=!0},p(r,i){if(i&3){s=ne(r[0]);let a;for(a=0;a<s.length;a+=1){const g=ke(r,s,a);l[a]?(l[a].p(g,i),A(l[a],1)):(l[a]=ze(g),l[a].c(),A(l[a],1),l[a].m(e.parentNode,e))}for(ue(),a=s.length;a<l.length;a+=1)n(a);de()}},i(r){if(!t){for(let i=0;i<s.length;i+=1)A(l[i]);t=!0}},o(r){l=l.filter(Boolean);for(let i=0;i<l.length;i+=1)W(l[i]);t=!1},d(r){r&&d(e),pe(l,r)}}}function vt(o){let e,t=o[2]&&Ce();return{c(){e=y("div"),t&&t.c(),this.h()},l(s){e=b(s,"DIV",{id:!0,class:!0});var l=I(e);t&&t.l(l),l.forEach(d),this.h()},h(){h(e,"id","none"),h(e,"class","svelte-17kpr8t")},m(s,l){F(s,e,l),t&&t.m(e,null)},p(s,l){s[2]?t||(t=Ce(),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:ce,o:ce,d(s){s&&d(e),t&&t.d()}}}function ze(o){let e,t;return e=new Ee({props:{name:o[3],type:o[1]}}),{c(){R(e.$$.fragment)},l(s){j(e.$$.fragment,s)},m(s,l){Y(e,s,l),t=!0},p(s,l){const n={};l&1&&(n.name=s[3]),l&2&&(n.type=s[1]),e.$set(n)},i(s){t||(A(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){K(e,s)}}}function Ce(o){let e;return{c(){e=ee("No tags remaining")},l(t){e=te(t,"No tags remaining")},m(t,s){F(t,e,s)},d(t){t&&d(e)}}}function yt(o){let e,t,s,l,n;const r=[vt,wt],i=[];function a(g,_){return g[0].length==0?0:1}return t=a(o),s=i[t]=r[t](o),{c(){e=y("div"),s.c(),this.h()},l(g){e=b(g,"DIV",{class:!0});var _=I(e);s.l(_),_.forEach(d),this.h()},h(){h(e,"class",l="filterTags-"+o[1]+" svelte-17kpr8t")},m(g,_){F(g,e,_),i[t].m(e,null),n=!0},p(g,[_]){let k=t;t=a(g),t===k?i[t].p(g,_):(ue(),W(i[k],1,1,()=>{i[k]=null}),de(),s=i[t],s?s.p(g,_):(s=i[t]=r[t](g),s.c()),A(s,1),s.m(e,null)),(!n||_&2&&l!==(l="filterTags-"+g[1]+" svelte-17kpr8t"))&&h(e,"class",l)},i(g){n||(A(s),n=!0)},o(g){W(s),n=!1},d(g){g&&d(e),i[t].d()}}}function bt(o,e,t){let{tags:s}=e,{type:l}=e,{inDropdown:n}=e;return o.$$set=r=>{"tags"in r&&t(0,s=r.tags),"type"in r&&t(1,l=r.type),"inDropdown"in r&&t(2,n=r.inDropdown)},[s,l,n]}class fe extends re{constructor(e){super(),oe(this,e,bt,yt,le,{tags:0,type:1,inDropdown:2})}}function _t(o){const e=t=>{o&&!o.contains(t.target)&&!t.defaultPrevented&&o.dispatchEvent(new CustomEvent("click_outside",o))};return document.addEventListener("click",e,!0),{destroy(){document.removeEventListener("click",e,!0)}}}function kt(o){let e,t,s,l,n="+ add tag",r,i,a,g,_,k,x,c,G,T;return x=new fe({props:{tags:o[1],type:o[0],inDropdown:!0}}),{c(){e=L(),t=y("div"),s=y("label"),l=y("div"),l.textContent=n,i=L(),a=y("input"),_=L(),k=y("div"),R(x.$$.fragment),this.h()},l(z){e=P(z),t=b(z,"DIV",{class:!0});var w=I(t);s=b(w,"LABEL",{for:!0,class:!0});var E=I(s);l=b(E,"DIV",{class:!0,"data-svelte-h":!0}),X(l)!=="svelte-1s58qu8"&&(l.textContent=n),E.forEach(d),i=P(w),a=b(w,"INPUT",{id:!0,class:!0,type:!0}),_=P(w),k=b(w,"DIV",{id:!0,class:!0});var B=I(k);j(x.$$.fragment,B),B.forEach(d),w.forEach(d),this.h()},h(){h(l,"class","flex-end filterButton svelte-tf9w24"),h(s,"for",r="checkbox-"+o[0]),h(s,"class","not-selectable pointer addButton"),h(a,"id",g="checkbox-"+o[0]),h(a,"class","filterCheckbox svelte-tf9w24"),h(a,"type","checkbox"),h(k,"id","includedTagsChoices"),h(k,"class","dropdown svelte-tf9w24"),h(t,"class","dropdownContainer")},m(z,w){F(z,e,w),F(z,t,w),f(t,s),f(s,l),f(t,i),f(t,a),a.checked=o[2],f(t,_),f(t,k),Y(x,k,null),c=!0,G||(T=[se(document,"keyup",o[5]),se(document,"click",zt),se(a,"change",o[9]),se(k,"click",o[4]),$e(_t.call(null,k)),se(k,"click_outside",o[3])],G=!0)},p(z,[w]){(!c||w&1&&r!==(r="checkbox-"+z[0]))&&h(s,"for",r),(!c||w&1&&g!==(g="checkbox-"+z[0]))&&h(a,"id",g),w&4&&(a.checked=z[2]);const E={};w&2&&(E.tags=z[1]),w&1&&(E.type=z[0]),x.$set(E)},i(z){c||(A(x.$$.fragment,z),c=!0)},o(z){W(x.$$.fragment,z),c=!1},d(z){z&&(d(e),d(t)),K(x),G=!1,Ie(T)}}}function zt(o){}function Ct(o,e,t){let s,l;J(o,H,c=>t(7,s=c)),J(o,ge,c=>t(8,l=c));let{type:n}=e,r=[],i=[],a=!1;function g(c){c.target.classList.contains("filterButton")&&a&&t(2,a=!1),t(2,a=!1)}function _(c){c.target.classList.contains("filterTag")&&t(2,a=!1)}function k(c){c.key=="Escape"&&t(2,a=!1)}function x(){a=this.checked,t(2,a)}return o.$$set=c=>{"type"in c&&t(0,n=c.type)},o.$$.update=()=>{o.$$.dirty&256&&t(6,r=l.map(c=>c.tags).flat().filter((c,G,T)=>T.indexOf(c)==G).sort()),o.$$.dirty&193&&(n=="include"?t(1,i=r.filter(c=>!s[c].included)):t(1,i=r.filter(c=>!s[c].excluded)))},[n,i,a,g,_,k,r,s,l,x]}class Ge extends re{constructor(e){super(),oe(this,e,Ct,kt,le,{type:0})}}function Gt(o){let e,t,s="Filters",l,n,r,i,a="<strong>include</strong>",g,_,k,x,c,G,T,z,w,E,B="<strong>exclude</strong>",V,M,q,O,S,$;return _=new fe({props:{tags:o[1],type:"include",inDropdown:!1}}),c=new Ge({props:{type:"include"}}),M=new fe({props:{tags:o[0],type:"exclude",inDropdown:!1}}),S=new Ge({props:{type:"exclude"}}),{c(){e=y("details"),t=y("summary"),t.textContent=s,l=L(),n=y("div"),r=y("div"),i=y("div"),i.innerHTML=a,g=L(),R(_.$$.fragment),k=L(),x=y("div"),R(c.$$.fragment),G=L(),T=y("div"),z=L(),w=y("div"),E=y("div"),E.innerHTML=B,V=L(),R(M.$$.fragment),q=L(),O=y("div"),R(S.$$.fragment),this.h()},l(m){e=b(m,"DETAILS",{id:!0,style:!0,class:!0});var D=I(e);t=b(D,"SUMMARY",{class:!0,style:!0,"data-svelte-h":!0}),X(t)!=="svelte-1ehln68"&&(t.textContent=s),l=P(D),n=b(D,"DIV",{style:!0});var v=I(n);r=b(v,"DIV",{class:!0});var U=I(r);i=b(U,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),X(i)!=="svelte-1r2iuzc"&&(i.innerHTML=a),g=P(U),j(_.$$.fragment,U),k=P(U),x=b(U,"DIV",{id:!0,class:!0});var u=I(x);j(c.$$.fragment,u),u.forEach(d),U.forEach(d),G=P(v),T=b(v,"DIV",{style:!0}),I(T).forEach(d),z=P(v),w=b(v,"DIV",{class:!0});var p=I(w);E=b(p,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),X(E)!=="svelte-rmotlw"&&(E.innerHTML=B),V=P(p),j(M.$$.fragment,p),q=P(p),O=b(p,"DIV",{id:!0,class:!0});var C=I(O);j(S.$$.fragment,C),C.forEach(d),p.forEach(d),v.forEach(d),D.forEach(d),this.h()},h(){h(t,"class","not-selectable pointer"),N(t,"margin-bottom","0.75rem"),N(t,"text-align","center"),N(t,"cursor","pointer"),N(t,"font-size","1.2rem"),h(i,"id","includeLabel"),h(i,"class","filterLabel svelte-wne201"),h(x,"id","includedTagsList"),h(x,"class","tagsList svelte-wne201"),h(r,"class","filterSection svelte-wne201"),N(T,"background-color","darkgray"),N(T,"width","2px"),h(E,"id","excludeLabel"),h(E,"class","filterLabel svelte-wne201"),h(O,"id","excludedTagsList"),h(O,"class","tagsList svelte-wne201"),h(w,"class","filterSection svelte-wne201"),N(n,"display","flex"),N(n,"flex-wrap","wrap"),N(n,"column-gap","1rem"),N(n,"row-gap","0.5rem"),N(n,"line-height","1"),h(e,"id","filterDetails"),N(e,"padding","0.25rem"),e.open=!0,h(e,"class","svelte-wne201")},m(m,D){F(m,e,D),f(e,t),f(e,l),f(e,n),f(n,r),f(r,i),f(r,g),Y(_,r,null),f(r,k),f(r,x),Y(c,x,null),f(n,G),f(n,T),f(n,z),f(n,w),f(w,E),f(w,V),Y(M,w,null),f(w,q),f(w,O),Y(S,O,null),$=!0},p(m,[D]){const v={};D&2&&(v.tags=m[1]),_.$set(v);const U={};D&1&&(U.tags=m[0]),M.$set(U)},i(m){$||(A(_.$$.fragment,m),A(c.$$.fragment,m),A(M.$$.fragment,m),A(S.$$.fragment,m),$=!0)},o(m){W(_.$$.fragment,m),W(c.$$.fragment,m),W(M.$$.fragment,m),W(S.$$.fragment,m),$=!1},d(m){m&&d(e),K(_),K(c),K(M),K(S)}}}function xt(o,e,t){let s,l,n,r;return J(o,H,i=>t(2,n=i)),J(o,me,i=>t(3,r=i)),o.$$.update=()=>{o.$$.dirty&12&&t(1,s=r.filter(i=>n[i].included)),o.$$.dirty&12&&t(0,l=r.filter(i=>n[i].excluded))},[l,s,n,r]}class Tt extends re{constructor(e){super(),oe(this,e,xt,Gt,le,{})}}function xe(o,e,t){const s=o.slice();return s[10]=e[t],s[12]=t,s}function Te(o){let e,t="Clear filters",s,l;return{c(){e=y("button"),e.textContent=t,this.h()},l(n){e=b(n,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),X(e)!=="svelte-1v2i3xl"&&(e.textContent=t),this.h()},h(){h(e,"id","clearFiltersButton"),h(e,"class","filterButton svelte-1rnoucn")},m(n,r){F(n,e,r),s||(l=se(e,"click",o[2]),s=!0)},p:ce,d(n){n&&d(e),s=!1,l()}}}function De(o){let e,t;return e=new ft({props:{dle:o[10],i:o[12]+1}}),{c(){R(e.$$.fragment)},l(s){j(e.$$.fragment,s)},m(s,l){Y(e,s,l),t=!0},p(s,l){const n={};l&2&&(n.dle=s[10]),e.$set(n)},i(s){t||(A(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){K(e,s)}}}function Dt(o){let e,t,s,l,n,r="The Dles",i,a,g=`"...they're anything but."`,_,k,x="A curated collection of daily games.",c,G,T,z,w,E,B,V=o[1].length+"",M,q,O,S,$;z=new Tt({});let m=o[0]&&Te(o),D=ne(o[1]),v=[];for(let u=0;u<D.length;u+=1)v[u]=De(xe(o,D,u));const U=u=>W(v[u],1,1,()=>{v[u]=null});return{c(){e=y("meta"),t=y("meta"),s=y("meta"),l=L(),n=y("h1"),n.textContent=r,i=L(),a=y("p"),a.textContent=g,_=L(),k=y("p"),k.textContent=x,c=L(),G=y("div"),T=L(),R(z.$$.fragment),w=L(),m&&m.c(),E=L(),B=y("h2"),M=ee(V),q=ee(" dles"),O=L(),S=y("ol");for(let u=0;u<v.length;u+=1)v[u].c();this.h()},l(u){const p=Se("svelte-194gfuk",document.head);e=b(p,"META",{name:!0,content:!0}),t=b(p,"META",{name:!0,content:!0}),s=b(p,"META",{name:!0,content:!0}),p.forEach(d),l=P(u),n=b(u,"H1",{class:!0,"data-svelte-h":!0}),X(n)!=="svelte-z7z0pp"&&(n.textContent=r),i=P(u),a=b(u,"P",{class:!0,"data-svelte-h":!0}),X(a)!=="svelte-11w4v6x"&&(a.textContent=g),_=P(u),k=b(u,"P",{class:!0,"data-svelte-h":!0}),X(k)!=="svelte-nxg2us"&&(k.textContent=x),c=P(u),G=b(u,"DIV",{class:!0}),I(G).forEach(d),T=P(u),j(z.$$.fragment,u),w=P(u),m&&m.l(u),E=P(u),B=b(u,"H2",{class:!0});var C=I(B);M=te(C,V),q=te(C," dles"),C.forEach(d),O=P(u),S=b(u,"OL",{class:!0});var Z=I(S);for(let ae=0;ae<v.length;ae+=1)v[ae].l(Z);Z.forEach(d),this.h()},h(){document.title="The Dles",h(e,"name","description"),h(e,"content","A curated collection of free daily games."),h(t,"name","keywords"),h(t,"content","list, collection, links, games, daily, dles, wordle"),h(s,"name","author"),h(s,"content","aukspot"),h(n,"class","svelte-1rnoucn"),h(a,"class","svelte-1rnoucn"),h(k,"class","svelte-1rnoucn"),h(G,"class","divider"),h(B,"class","svelte-1rnoucn"),h(S,"class","svelte-1rnoucn")},m(u,p){f(document.head,e),f(document.head,t),f(document.head,s),F(u,l,p),F(u,n,p),F(u,i,p),F(u,a,p),F(u,_,p),F(u,k,p),F(u,c,p),F(u,G,p),F(u,T,p),Y(z,u,p),F(u,w,p),m&&m.m(u,p),F(u,E,p),F(u,B,p),f(B,M),f(B,q),F(u,O,p),F(u,S,p);for(let C=0;C<v.length;C+=1)v[C]&&v[C].m(S,null);$=!0},p(u,[p]){if(u[0]?m?m.p(u,p):(m=Te(u),m.c(),m.m(E.parentNode,E)):m&&(m.d(1),m=null),(!$||p&2)&&V!==(V=u[1].length+"")&&ie(M,V),p&2){D=ne(u[1]);let C;for(C=0;C<D.length;C+=1){const Z=xe(u,D,C);v[C]?(v[C].p(Z,p),A(v[C],1)):(v[C]=De(Z),v[C].c(),A(v[C],1),v[C].m(S,null))}for(ue(),C=D.length;C<v.length;C+=1)U(C);de()}},i(u){if(!$){A(z.$$.fragment,u);for(let p=0;p<D.length;p+=1)A(v[p]);$=!0}},o(u){W(z.$$.fragment,u),v=v.filter(Boolean);for(let p=0;p<v.length;p+=1)W(v[p]);$=!1},d(u){u&&(d(l),d(n),d(i),d(a),d(_),d(k),d(c),d(G),d(T),d(w),d(E),d(B),d(O),d(S)),d(e),d(t),d(s),K(z,u),m&&m.d(u),pe(v,u)}}}function Et(o,e,t){let s,l,n,r,i,a,g;J(o,H,c=>t(5,r=c)),J(o,ye,c=>t(6,i=c)),J(o,ge,c=>t(1,a=c)),J(o,me,c=>t(7,g=c));function _(){Q(ye,i=pt,i);for(let c of i)c.hidden=!1}function k(){Q(me,g=i.map(c=>c.tags).flat().filter((c,G,T)=>T.indexOf(c)==G).sort(),g),Q(H,r={},r);for(let c of g)Q(H,r[c]={included:!1,excluded:!1},r)}_(),k();function x(){for(let c of s)Q(H,r[c].included=!1,r);for(let c of l)Q(H,r[c].excluded=!1,r)}return o.$$.update=()=>{o.$$.dirty&160&&t(4,s=g.filter(c=>r[c].included)),o.$$.dirty&160&&t(3,l=g.filter(c=>r[c].excluded)),o.$$.dirty&24&&t(0,n=s.length>0||l.length>0),o.$$.dirty&88&&Q(ge,a=i.filter(c=>{let G=!1;return s.every(T=>c.tags.includes(T))&&(G=!0),l.some(T=>c.tags.includes(T))&&(G=!1),G}),a)},[n,a,x,l,s,r,i,g]}class Pt extends re{constructor(e){super(),oe(this,e,Et,Dt,le,{})}}export{Pt as component,Lt as universal};
