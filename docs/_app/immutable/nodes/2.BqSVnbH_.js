import{s as le,n as ce,c as te,x as ee,y as Fe,r as Ie}from"../chunks/scheduler.BzRGDREP.js";import{S as oe,i as ae,e as w,t as R,c as v,a as F,b as U,d,h as m,q as N,j as $,k as g,B as se,l as ie,p as W,r as ue,o as de,n as q,E as we,v as Q,w as J,x as X,y as Z,s as B,f as M,g as re,m as ye,z as Le}from"../chunks/index.B61UMe1a.js";import{e as ne}from"../chunks/each.D6YF6ztN.js";import{b as Pe}from"../chunks/paths.BFXDOOBw.js";import{r as Be,w as me}from"../chunks/index.Bikvempi.js";const Me=!0,Vt=Object.freeze(Object.defineProperty({__proto__:null,prerender:Me},Symbol.toStringTag,{value:"Module"})),Ne="#c1b2e5",We="#e5bab2",Ae="#b2e5da",Ve="#b2c4e5",qe="#e5bcb2",Oe="#e5bbb2",He="#b2e5d4",Re="#e5bfb2",Ue="#c0e5b2",Ye="#bbb2e5",je="#e5bfb2",Ke="#dab2e5",Qe="#c9e5b2",Je="#c1b2e5",Xe="#cab2e5",Ze="#b2c6e5",et="#d0e5b2",tt="#b2dce5",st="#b2e5da",rt="#ceb2e5",lt="#e5d1b2",ot="#b2e5e0",at="#b2e5e3",it="#e5b2db",nt="#d9e5b2",ct="#d7e5b2",ut="#e5bab2",dt="#c2e5b2",mt="#e5b2db",ht="#b2cae5",be={"video games":"#e1b2e5",soccer:Ne,archive:We,maps:Ae,puzzmo:Ve,audio:qe,art:Oe,logic:He,basketball:Re,hockey:Ue,science:Ye,baseball:je,usa:Ke,guessing:Qe,sports:Je,time:Xe,prices:Ze,geography:et,numbers:tt,math:st,trivia:rt,colors:lt,movies:ot,music:at,words:it,flags:nt,football:ct,architecture:ut,history:dt,wordle:mt,pictures:ht};let _e=me([]),ge=me([]),pe=me([]),K=me({});Be(110);function gt(o){let t,e,r,s;return{c(){t=w("button"),e=R(o[0]),this.h()},l(i){t=v(i,"BUTTON",{class:!0,style:!0});var l=F(t);e=U(l,o[0]),l.forEach(d),this.h()},h(){m(t,"class","filterTag not-selectable svelte-eqjtq0"),N(t,"background-color",be[o[0]])},m(i,l){$(i,t,l),g(t,e),r||(s=se(t,"click",o[1]),r=!0)},p(i,[l]){l&1&&ie(e,i[0]),l&1&&N(t,"background-color",be[i[0]])},i:ce,o:ce,d(i){i&&d(t),r=!1,s()}}}function pt(o,t,e){let r;te(o,K,n=>e(3,r=n));let{name:s}=t,{type:i}=t;function l(){i=="include"&&ee(K,r[s].included=!r[s].included,r),i=="exclude"&&ee(K,r[s].excluded=!r[s].excluded,r)}return o.$$set=n=>{"name"in n&&e(0,s=n.name),"type"in n&&e(2,i=n.type)},[s,l,i]}class $e extends oe{constructor(t){super(),ae(this,t,pt,gt,le,{name:0,type:2})}}function ke(o,t,e){const r=o.slice();return r[1]=t[e],r}function ze(o){let t,e;return t=new $e({props:{name:o[1],type:"include"}}),{c(){Q(t.$$.fragment)},l(r){J(t.$$.fragment,r)},m(r,s){X(t,r,s),e=!0},p(r,s){const i={};s&1&&(i.name=r[1]),t.$set(i)},i(r){e||(W(t.$$.fragment,r),e=!0)},o(r){q(t.$$.fragment,r),e=!1},d(r){Z(t,r)}}}function ft(o){let t,e,r=ne(o[0]),s=[];for(let l=0;l<r.length;l+=1)s[l]=ze(ke(o,r,l));const i=l=>q(s[l],1,1,()=>{s[l]=null});return{c(){t=w("div");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){t=v(l,"DIV",{class:!0});var n=F(t);for(let a=0;a<s.length;a+=1)s[a].l(n);n.forEach(d),this.h()},h(){m(t,"class","svelte-m655z9")},m(l,n){$(l,t,n);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(t,null);e=!0},p(l,[n]){if(n&1){r=ne(l[0]);let a;for(a=0;a<r.length;a+=1){const h=ke(l,r,a);s[a]?(s[a].p(h,n),W(s[a],1)):(s[a]=ze(h),s[a].c(),W(s[a],1),s[a].m(t,null))}for(ue(),a=r.length;a<s.length;a+=1)i(a);de()}},i(l){if(!e){for(let n=0;n<r.length;n+=1)W(s[n]);e=!0}},o(l){s=s.filter(Boolean);for(let n=0;n<s.length;n+=1)q(s[n]);e=!1},d(l){l&&d(t),we(s,l)}}}function wt(o,t,e){let{tags:r}=t;return o.$$set=s=>{"tags"in s&&e(0,r=s.tags)},[r]}class vt extends oe{constructor(t){super(),ae(this,t,wt,ft,le,{tags:0})}}function yt(o){let t,e,r,s,i,l,n,a,h,y=o[1].name+"",b,E,c,C=o[1].description+"",D,T,p,L,A,V,x,j="Play",O,I;return p=new vt({props:{tags:o[1].tags}}),{c(){t=w("li"),e=w("div"),r=w("div"),s=w("span"),i=R(o[0]),l=R("."),n=B(),a=w("span"),h=w("strong"),b=R(y),E=B(),c=w("div"),D=R(C),T=B(),Q(p.$$.fragment),L=B(),A=w("div"),V=w("a"),x=w("button"),x.textContent=j,this.h()},l(S){t=v(S,"LI",{class:!0});var G=F(t);e=v(G,"DIV",{class:!0});var k=F(e);r=v(k,"DIV",{style:!0});var P=F(r);s=v(P,"SPAN",{class:!0});var _=F(s);i=U(_,o[0]),l=U(_,"."),_.forEach(d),n=M(P),a=v(P,"SPAN",{class:!0});var H=F(a);h=v(H,"STRONG",{});var u=F(h);b=U(u,y),u.forEach(d),H.forEach(d),P.forEach(d),E=M(k),c=v(k,"DIV",{class:!0});var f=F(c);D=U(f,C),f.forEach(d),T=M(k),J(p.$$.fragment,k),k.forEach(d),L=M(G),A=v(G,"DIV",{class:!0});var z=F(A);V=v(z,"A",{href:!0,target:!0,rel:!0});var Y=F(V);x=v(Y,"BUTTON",{class:!0,"data-svelte-h":!0}),re(x)!=="svelte-1tm5a7p"&&(x.textContent=j),Y.forEach(d),z.forEach(d),G.forEach(d),this.h()},h(){m(s,"class","not-selectable name svelte-1m4ne3u"),m(a,"class","name svelte-1m4ne3u"),N(r,"display","flex"),N(r,"align-items","flex-start"),N(r,"gap","0.25rem"),N(r,"vertical-align","text-top"),m(c,"class","description svelte-1m4ne3u"),m(e,"class","left svelte-1m4ne3u"),m(x,"class","play not-selectable svelte-1m4ne3u"),m(V,"href",O=o[1].url),m(V,"target","_blank"),m(V,"rel","noreferrer"),m(A,"class","right svelte-1m4ne3u"),m(t,"class","svelte-1m4ne3u")},m(S,G){$(S,t,G),g(t,e),g(e,r),g(r,s),g(s,i),g(s,l),g(r,n),g(r,a),g(a,h),g(h,b),g(e,E),g(e,c),g(c,D),g(e,T),X(p,e,null),g(t,L),g(t,A),g(A,V),g(V,x),I=!0},p(S,[G]){(!I||G&1)&&ie(i,S[0]),(!I||G&2)&&y!==(y=S[1].name+"")&&ie(b,y),(!I||G&2)&&C!==(C=S[1].description+"")&&ie(D,C);const k={};G&2&&(k.tags=S[1].tags),p.$set(k),(!I||G&2&&O!==(O=S[1].url))&&m(V,"href",O)},i(S){I||(W(p.$$.fragment,S),I=!0)},o(S){q(p.$$.fragment,S),I=!1},d(S){S&&d(t),Z(p)}}}function bt(o,t,e){let{i:r}=t,{dle:s}=t;return o.$$set=i=>{"i"in i&&e(0,r=i.i),"dle"in i&&e(1,s=i.dle)},[r,s]}class _t extends oe{constructor(t){super(),ae(this,t,bt,yt,le,{i:0,dle:1})}}const kt=[{name:"Adoptle",url:"https://tryhardguides.com/adoptle/",description:"Guess the name of a pet that is up for adoption, given a picture of them.",tags:["pictures","wordle","words"]},{name:"Archiguessr",url:"https://archiguesser.com/",description:"Guess the name of the architecture, given a series of pictures.",tags:["architecture","archive","guessing","pictures"]},{name:"Bandle",url:"https://bandle.app/",description:"Guess the song, one instrument at a time (sort of).",tags:["audio","guessing","music"]},{name:"Box Office Game",url:"https://boxofficega.me/",description:"Guess the top five movies in the US domestic box office for the given weekend.",tags:["guessing","movies"]},{name:"Chronophoto",url:"https://www.chronophoto.app/",description:"Guess the year in which each historical picture was taken.",tags:["history","pictures","time"]},{name:"Cine2Nerdle",url:"https://www.cinenerdle2.app/",description:"Rearrange the tiles into groups that represent movies/themes. Includes both Original and Reversal.",tags:["archive","movies"]},{name:"Colorfle",url:"https://colorfle.org/index.html",description:"Figure out the color composition of the given color.",tags:["colors","guessing"]},{name:"Combinations",url:"https://combinations.org/",description:"Create words using combinations of letters from the grid.",tags:["words"]},{name:"Concludle",url:"https://tryhardguides.com/concludle/",description:"Guess the secret answer from a series of clues.",tags:["guessing","trivia"]},{name:"Conexo",url:"https://conexo.ws/en",description:"Form groups of 4 words that have something in common.",tags:["archive","guessing","words"]},{name:"Connections Game",url:"https://connectionsgame.com",description:"Group words that share a common thread, basically a copy of NYT Connections but with 3 difficulty modes and a good archive.",tags:["archive","guessing","words"]},{name:"Contexto",url:"https://contexto.me/",description:"Guess words to see how close they are to the secret word in terms of context, eventually guessing the secret word.",tags:["archive","guessing","words"]},{name:"Costcodle",url:"https://costcodle.com/",description:"Guess the price of the given Costco item.",tags:["guessing","prices"]},{name:"Crosswordle",url:"https://crosswordle.vercel.app",description:"Fill in the grid to logically fit a series of Wordle guesses.",tags:["logic","wordle","words"]},{name:"crosswordle.com",url:"https://crosswordle.com/",description:"Swap tiles to solve multiple Wordle puzzles crossed together.",tags:["wordle","words"]},{name:"crosswordle.org",url:"https://crosswordle.org/",description:"Solve multiple Wordle puzzles crossed together.",tags:["archive","guessing","logic","wordle","words"]},{name:"Daily Dozen Trivia",url:"https://dailydozentrivia.com/",description:"Answer 9 trivia questions from various categories.",tags:["trivia"]},{name:"Daily Tomato",url:"https://www.rottentomatoes.com/movie-trivia/",description:"Guess the movie title from a series of 5 clues, by Rotten Tomatoes.",tags:["guessing","movies"]},{name:"Daydle",url:"https://daydle.com/",description:"Guess the year of a historical event that happened on this day in history.",tags:["guessing","history","time"]},{name:"Dordle",url:"https://zaratustra.itch.io/dordle",description:"Solve 2 Wordle puzzles at the same time.",tags:["guessing","wordle","words"]},{name:"Flagdle",url:"https://www.flagdle.org/",description:"Guess the country by its flag.",tags:["flags","geography"]},{name:"Flagle",url:"https://www.flagle.io/",description:"Guess the flag in 5 guesses or less.",tags:["flags","geography","guessing"]},{name:"Framed",url:"https://framed.wtf/",description:"Guess the movie from 6 frames.",tags:["archive","guessing","movies","pictures"]},{name:"Gamedle Artwork",url:"https://www.gamedle.wtf/artwork",description:"Guess the video game by its artwork.",tags:["art","guessing","pictures","video games"]},{name:"Gamedle Classic",url:"https://www.gamedle.wtf/classic",description:"Guess the video game by its cover.",tags:["guessing","pictures","video games"]},{name:"Gamedle Guess",url:"https://www.gamedle.wtf/guess",description:"Guess the video game by its specifications.",tags:["guessing","video games"]},{name:"Gamedle Keywords",url:"https://www.gamedle.wtf/keywords",description:"Guess the video game by keywords.",tags:["guessing","video games","words"]},{name:"Globle",url:"https://globle-game.com/game",description:"Guess the mystery country, given how close it is to each guessed country.",tags:["geography","guessing","maps"]},{name:"Globle Capitals",url:"https://globle-capitals.com/",description:"Guess the mystery world capital, given how close it is to each guessed world capital.",tags:["geography","guessing","maps"]},{name:"Guess The Game",url:"https://guessthe.game/",description:"Guess the video game by its cropped screenshots.",tags:["archive","guessing","pictures","video games"]},{name:"hello wordl",url:"https://hellowordl.net/?today",description:"Play Wordle puzzles from 4 to 11 letters long.",tags:["guessing","wordle","words"]},{name:"Housle",url:"https://housle.house/game",description:"Guess the price of the house, given pictures of parts of the house.",tags:["guessing","pictures","prices"]},{name:"Immaculate Footy",url:"https://www.immaculatefooty.com",description:"Fill out the grid with soccer players matching the criteria of each cell's row and column.",tags:["archive","soccer","sports"]},{name:"Immaculate Grid: Baseball",url:"https://www.immaculategrid.com/",description:"Fill out the grid with baseball players matching the criteria of each cell's row and column.",tags:["archive","baseball","sports"]},{name:"Immaculate Grid: Hockey",url:"https://www.immaculategrid.com/hockey",description:"Fill out the grid with hockey players matching the criteria of each cell's row and column.",tags:["archive","hockey","sports"]},{name:"Immaculate Grid: Men's Basketball",url:"https://www.immaculategrid.com/basketball/mens",description:"Fill out the grid with men's basketball players matching the criteria of each cell's row and column.",tags:["archive","basketball","sports"]},{name:"Immaculate Grid: Pro Football",url:"https://www.immaculategrid.com/football",description:"Fill out the grid with pro football players matching the criteria of each cell's row and column.",tags:["archive","football","sports"]},{name:"Immaculate Grid: Women's Basketball",url:"https://www.immaculategrid.com/basketball/womens",description:"Fill out the grid with women's basketball players matching the criteria of each cell's row and column.",tags:["archive","basketball","sports"]},{name:"Listed",url:"https://listed.fun/",description:"Guess the price of the recently sold property.",tags:["guessing","pictures","prices"]},{name:"Metaflora",url:"https://flora.metazooa.com/",description:"Guess plants to see where they share common ancestors with the mystery plant, eventually guessing the mystery plant.",tags:["guessing","science"]},{name:"Metazooa",url:"https://metazooa.com/",description:"Guess animals to see where they share common ancestors with the mystery animal, eventually guessing the mystery animal.",tags:["guessing","science"]},{name:"Mislettered",url:"https://tryhardguides.com/mislettered/",description:"Solve the word or phrase by guessing one letter at a time.",tags:["guessing","words"]},{name:"MLB Pickle",url:"https://www.mlbpickle.com/",description:"Guess today's mystery MLB player within nine guesses.",tags:["baseball","guessing","sports"]},{name:"Movie Grid",url:"https://moviegrid.io/",description:"Fill out the grid with movies matching the criteria of each cell's row and column.",tags:["movies"]},{name:"Movie to Movie",url:"https://movietomovie.com/",description:"Connect two movies by jumping through actors and the movies they've been in.",tags:["archive","movies"]},{name:"Nerdle",url:"https://nerdlegame.com/",description:"Guess the secret arithmetic equation.",tags:["archive","guessing","math","numbers"]},{name:"NYT Connections",url:"https://www.nytimes.com/games/connections",description:"Group words that share a common thread.",tags:["guessing","words"]},{name:"NYT Mini Crossword",url:"https://www.nytimes.com/crosswords/game/mini",description:"A very small crossword puzzle by the New York Times.",tags:["words"]},{name:"NYT Sudoku",url:"https://www.nytimes.com/puzzles/sudoku",description:"Daily Sudoku puzzles from the New York Times.",tags:["logic","numbers"]},{name:"NYT Wordle",url:"https://www.nytimes.com/games/wordle/index.html",description:"Guess the 5-letter word in six or fewer attempts.",tags:["guessing","wordle","words"]},{name:"OEC Tradle",url:"https://games.oec.world/en/tradle/",description:"Guess the country by its exports.",tags:["geography","guessing"]},{name:"One Word Search",url:"https://onewordsearch.com/",description:"Repeatedly search for the only word in a grid of letters.",tags:["words"]},{name:"pedantle",url:"https://cemantle.certitudes.org/pedantle",description:"Find the secret Wikipedia page by revealing the words in its introduction.",tags:["guessing","words"]},{name:"Petdle",url:"https://petdle.link/",description:"Guess the pet taken from the game Super Auto Pets.",tags:["guessing","video games"]},{name:"Pokedoku",url:"https://pokedoku.com/",description:"Fill out the grid with Pokémon matching the criteria of each cell's row and column.",tags:["video games"]},{name:"PopCultured",url:"https://histordle.com/popcultured/",description:"Guess the year given three pop culture items released that year.",tags:["guessing","time"]},{name:"Puckdoku",url:"https://www.puckdoku.com/",description:"Fill out the grid with hockey players matching the criteria of each cell's row and column.",tags:["hockey","sports"]},{name:"Puzzmo - Crossword",url:"https://www.puzzmo.com/play/crossword",description:"Crosswords without getting stuck.",tags:["puzzmo","words"]},{name:"Puzzmo - Flipart",url:"https://www.puzzmo.com/play/flip-art",description:"Rotate the pieces to fit them within the frame.",tags:["puzzmo"]},{name:"Puzzmo - Really Bad Chess",url:"https://www.puzzmo.com/play/really-bad-chess",description:"Checkmate the opponent's king in this randomized Chess variant.",tags:["puzzmo"]},{name:"Puzzmo - Spelltower",url:"https://www.puzzmo.com/play/spelltower",description:"Find words to clear tiles in the falling grid.",tags:["puzzmo","words"]},{name:"Puzzmo - Typeshift",url:"https://www.puzzmo.com/play/typeshift",description:"Slide columns of letters to make words, using all of the letters along the way.",tags:["puzzmo","words"]},{name:"Quizl",url:"https://quizl.io/",description:"Answer today's 5 trivia questions.",tags:["archive","trivia"]},{name:"Quordle",url:"https://quordlegame.com/",description:"Solve 4 Wordle puzzles at the same time.",tags:["guessing","wordle","words"]},{name:"Redactle",url:"https://redactle.net/",description:"Guess the Wikipedia article by its content with keywords redacted.",tags:["archive","guessing","words"]},{name:"Semantle",url:"https://semantle.com/",description:"Guess words to see how close they are to the secret word semantically, eventually guessing the secret word.",tags:["guessing","words"]},{name:"Songle",url:"https://histordle.com/songle/",description:"Guess the year given three songs that were released that year.",tags:["guessing","music","time"]},{name:"Songless",url:"https://lessgames.com/songless",description:"Guess the song from listening to small parts of it.",tags:["audio","guessing","music"]},{name:"Spellcheck",url:"https://spellcheck.xyz/",description:"Spell the words correctly after listening to them.",tags:["audio","words"]},{name:"Spelling Bee",url:"https://spellsbee.com/",description:"Given 7 letters, make as many words as you can that contain the center letter. Same as NYT Spelling Bee, which requires a subscription.",tags:["words"]},{name:"Statele",url:"https://statele.teuteuf.fr/",description:"Guess the US State by its outline on the map.",tags:["geography","maps","usa"]},{name:"TimeGuessr",url:"https://timeguessr.com/",description:"Guess the right time and location of each historical photo.",tags:["geography","history","maps","pictures","time"]},{name:"travle",url:"https://travle.earth/",description:"Connect the starting country to the ending country by naming countries in between them.",tags:["geography","maps"]},{name:"Weaver",url:"https://weavergame.org/",description:"Weave your way from the start word to the end word, changing only one letter at a time.",tags:["words"]},{name:"WhereTaken",url:"https://wheretaken.teuteuf.fr/",description:"Guess the Country/Region in which the photo was taken.",tags:["geography","guessing","pictures"]},{name:"WhereTaken USA",url:"https://wheretakenusa.teuteuf.fr/",description:"Guess the US State in which the photo was taken.",tags:["geography","guessing","pictures","usa"]},{name:"Word Waffle",url:"https://wordwaffle.org/",description:"Move letters to create words both horizontally and vertically.",tags:["wordle","words"]},{name:"WordAll",url:"https://wordall.xyz/",description:"Guess all of the Wordle words, given the starting clues.",tags:["guessing","wordle","words"]},{name:"Wordless",url:"https://lessgames.com/wordless",description:"Solve Wordle puzzles of various sizes.",tags:["guessing","wordle","words"]},{name:"Worldle",url:"https://worldle.teuteuf.fr/",description:"Guess the country by its shape on the world map.",tags:["geography","maps"]},{name:"Yeardle",url:"https://histordle.com/yeardle/",description:"Guess the year based on the given historical events of that year.",tags:["guessing","history","time"]}];function Ge(o,t,e){const r=o.slice();return r[3]=t[e],r}function zt(o){let t,e,r=ne(o[0]),s=[];for(let l=0;l<r.length;l+=1)s[l]=Ce(Ge(o,r,l));const i=l=>q(s[l],1,1,()=>{s[l]=null});return{c(){for(let l=0;l<s.length;l+=1)s[l].c();t=ye()},l(l){for(let n=0;n<s.length;n+=1)s[n].l(l);t=ye()},m(l,n){for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(l,n);$(l,t,n),e=!0},p(l,n){if(n&3){r=ne(l[0]);let a;for(a=0;a<r.length;a+=1){const h=Ge(l,r,a);s[a]?(s[a].p(h,n),W(s[a],1)):(s[a]=Ce(h),s[a].c(),W(s[a],1),s[a].m(t.parentNode,t))}for(ue(),a=r.length;a<s.length;a+=1)i(a);de()}},i(l){if(!e){for(let n=0;n<r.length;n+=1)W(s[n]);e=!0}},o(l){s=s.filter(Boolean);for(let n=0;n<s.length;n+=1)q(s[n]);e=!1},d(l){l&&d(t),we(s,l)}}}function Gt(o){let t,e=o[2]&&Te();return{c(){t=w("div"),e&&e.c(),this.h()},l(r){t=v(r,"DIV",{id:!0,class:!0});var s=F(t);e&&e.l(s),s.forEach(d),this.h()},h(){m(t,"id","none"),m(t,"class","svelte-17kpr8t")},m(r,s){$(r,t,s),e&&e.m(t,null)},p(r,s){r[2]?e||(e=Te(),e.c(),e.m(t,null)):e&&(e.d(1),e=null)},i:ce,o:ce,d(r){r&&d(t),e&&e.d()}}}function Ce(o){let t,e;return t=new $e({props:{name:o[3],type:o[1]}}),{c(){Q(t.$$.fragment)},l(r){J(t.$$.fragment,r)},m(r,s){X(t,r,s),e=!0},p(r,s){const i={};s&1&&(i.name=r[3]),s&2&&(i.type=r[1]),t.$set(i)},i(r){e||(W(t.$$.fragment,r),e=!0)},o(r){q(t.$$.fragment,r),e=!1},d(r){Z(t,r)}}}function Te(o){let t;return{c(){t=R("No tags remaining")},l(e){t=U(e,"No tags remaining")},m(e,r){$(e,t,r)},d(e){e&&d(t)}}}function Ct(o){let t,e,r,s,i;const l=[Gt,zt],n=[];function a(h,y){return h[0].length==0?0:1}return e=a(o),r=n[e]=l[e](o),{c(){t=w("div"),r.c(),this.h()},l(h){t=v(h,"DIV",{class:!0});var y=F(t);r.l(y),y.forEach(d),this.h()},h(){m(t,"class",s="filterTags-"+o[1]+" svelte-17kpr8t")},m(h,y){$(h,t,y),n[e].m(t,null),i=!0},p(h,[y]){let b=e;e=a(h),e===b?n[e].p(h,y):(ue(),q(n[b],1,1,()=>{n[b]=null}),de(),r=n[e],r?r.p(h,y):(r=n[e]=l[e](h),r.c()),W(r,1),r.m(t,null)),(!i||y&2&&s!==(s="filterTags-"+h[1]+" svelte-17kpr8t"))&&m(t,"class",s)},i(h){i||(W(r),i=!0)},o(h){q(r),i=!1},d(h){h&&d(t),n[e].d()}}}function Tt(o,t,e){let{tags:r}=t,{type:s}=t,{inDropdown:i}=t;return o.$$set=l=>{"tags"in l&&e(0,r=l.tags),"type"in l&&e(1,s=l.type),"inDropdown"in l&&e(2,i=l.inDropdown)},[r,s,i]}class fe extends oe{constructor(t){super(),ae(this,t,Tt,Ct,le,{tags:0,type:1,inDropdown:2})}}function Dt(o){const t=e=>{o&&!o.contains(e.target)&&!e.defaultPrevented&&o.dispatchEvent(new CustomEvent("click_outside",o))};return document.addEventListener("click",t,!0),{destroy(){document.removeEventListener("click",t,!0)}}}function xt(o){let t,e,r,s,i="+ add tag",l,n,a,h,y,b,E,c,C,D;return E=new fe({props:{tags:o[1],type:o[0],inDropdown:!0}}),{c(){t=B(),e=w("div"),r=w("label"),s=w("div"),s.textContent=i,n=B(),a=w("input"),y=B(),b=w("div"),Q(E.$$.fragment),this.h()},l(T){t=M(T),e=v(T,"DIV",{class:!0});var p=F(e);r=v(p,"LABEL",{for:!0,class:!0});var L=F(r);s=v(L,"DIV",{class:!0,"data-svelte-h":!0}),re(s)!=="svelte-1s58qu8"&&(s.textContent=i),L.forEach(d),n=M(p),a=v(p,"INPUT",{id:!0,class:!0,type:!0}),y=M(p),b=v(p,"DIV",{class:!0});var A=F(b);J(E.$$.fragment,A),A.forEach(d),p.forEach(d),this.h()},h(){m(s,"class","flex-end filterButton svelte-tf9w24"),m(r,"for",l="checkbox-"+o[0]),m(r,"class","not-selectable pointer addButton"),m(a,"id",h="checkbox-"+o[0]),m(a,"class","filterCheckbox svelte-tf9w24"),m(a,"type","checkbox"),m(b,"class","dropdown svelte-tf9w24"),m(e,"class","dropdownContainer")},m(T,p){$(T,t,p),$(T,e,p),g(e,r),g(r,s),g(e,n),g(e,a),a.checked=o[2],g(e,y),g(e,b),X(E,b,null),c=!0,C||(D=[se(document,"keyup",o[5]),se(document,"click",Et),se(a,"change",o[9]),se(b,"click",o[4]),Fe(Dt.call(null,b)),se(b,"click_outside",o[3])],C=!0)},p(T,[p]){(!c||p&1&&l!==(l="checkbox-"+T[0]))&&m(r,"for",l),(!c||p&1&&h!==(h="checkbox-"+T[0]))&&m(a,"id",h),p&4&&(a.checked=T[2]);const L={};p&2&&(L.tags=T[1]),p&1&&(L.type=T[0]),E.$set(L)},i(T){c||(W(E.$$.fragment,T),c=!0)},o(T){q(E.$$.fragment,T),c=!1},d(T){T&&(d(t),d(e)),Z(E),C=!1,Ie(D)}}}function Et(o){}function St(o,t,e){let r,s;te(o,K,c=>e(7,r=c)),te(o,ge,c=>e(8,s=c));let{type:i}=t,l=[],n=[],a=!1;function h(c){c.target.classList.contains("filterButton")&&a&&e(2,a=!1),e(2,a=!1)}function y(c){c.target.classList.contains("filterTag")&&e(2,a=!1)}function b(c){c.key=="Escape"&&e(2,a=!1)}function E(){a=this.checked,e(2,a)}return o.$$set=c=>{"type"in c&&e(0,i=c.type)},o.$$.update=()=>{o.$$.dirty&256&&e(6,l=s.map(c=>c.tags).flat().filter((c,C,D)=>D.indexOf(c)==C).sort()),o.$$.dirty&193&&(i=="include"?e(1,n=l.filter(c=>!r[c].included)):e(1,n=l.filter(c=>!r[c].excluded)))},[i,n,a,h,y,b,l,r,s,E]}class De extends oe{constructor(t){super(),ae(this,t,St,xt,le,{type:0})}}function xe(o){let t,e,r;return{c(){t=R("("),e=R(o[2]),r=R(")")},l(s){t=U(s,"("),e=U(s,o[2]),r=U(s,")")},m(s,i){$(s,t,i),$(s,e,i),$(s,r,i)},p(s,i){i&4&&ie(e,s[2])},d(s){s&&(d(t),d(e),d(r))}}}function $t(o){let t,e,r,s,i,l,n,a="<strong>include</strong>",h,y,b,E,c,C,D,T,p,L,A="<strong>exclude</strong>",V,x,j,O,I,S,G=o[2]>0&&xe(o);return y=new fe({props:{tags:o[1],type:"include",inDropdown:!1}}),c=new De({props:{type:"include"}}),x=new fe({props:{tags:o[0],type:"exclude",inDropdown:!1}}),I=new De({props:{type:"exclude"}}),{c(){t=w("details"),e=w("summary"),r=R("Filters "),G&&G.c(),s=B(),i=w("div"),l=w("div"),n=w("div"),n.innerHTML=a,h=B(),Q(y.$$.fragment),b=B(),E=w("div"),Q(c.$$.fragment),C=B(),D=w("div"),T=B(),p=w("div"),L=w("div"),L.innerHTML=A,V=B(),Q(x.$$.fragment),j=B(),O=w("div"),Q(I.$$.fragment),this.h()},l(k){t=v(k,"DETAILS",{id:!0,style:!0,class:!0});var P=F(t);e=v(P,"SUMMARY",{class:!0,style:!0});var _=F(e);r=U(_,"Filters "),G&&G.l(_),_.forEach(d),s=M(P),i=v(P,"DIV",{id:!0,style:!0,class:!0});var H=F(i);l=v(H,"DIV",{class:!0});var u=F(l);n=v(u,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),re(n)!=="svelte-1r2iuzc"&&(n.innerHTML=a),h=M(u),J(y.$$.fragment,u),b=M(u),E=v(u,"DIV",{id:!0,class:!0});var f=F(E);J(c.$$.fragment,f),f.forEach(d),u.forEach(d),C=M(H),D=v(H,"DIV",{style:!0}),F(D).forEach(d),T=M(H),p=v(H,"DIV",{class:!0});var z=F(p);L=v(z,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),re(L)!=="svelte-rmotlw"&&(L.innerHTML=A),V=M(z),J(x.$$.fragment,z),j=M(z),O=v(z,"DIV",{id:!0,class:!0});var Y=F(O);J(I.$$.fragment,Y),Y.forEach(d),z.forEach(d),H.forEach(d),P.forEach(d),this.h()},h(){m(e,"class","not-selectable pointer"),N(e,"margin-bottom","0.75rem"),N(e,"text-align","center"),N(e,"cursor","pointer"),N(e,"font-size","1.2rem"),m(n,"id","includeLabel"),m(n,"class","filterLabel svelte-1bmbuft"),m(E,"id","includedTagsList"),m(E,"class","tagsList svelte-1bmbuft"),m(l,"class","filterSection svelte-1bmbuft"),N(D,"background-color","darkgray"),N(D,"width","2px"),m(L,"id","excludeLabel"),m(L,"class","filterLabel svelte-1bmbuft"),m(O,"id","excludedTagsList"),m(O,"class","tagsList svelte-1bmbuft"),m(p,"class","filterSection svelte-1bmbuft"),m(i,"id","filtersContainer"),N(i,"display","flex"),N(i,"flex-wrap","wrap"),N(i,"column-gap","1rem"),N(i,"row-gap","0.5rem"),N(i,"line-height","1"),N(i,"min-height","5.2rem"),m(i,"class","svelte-1bmbuft"),m(t,"id","filterDetails"),N(t,"padding","0.25rem"),t.open=!0,m(t,"class","svelte-1bmbuft")},m(k,P){$(k,t,P),g(t,e),g(e,r),G&&G.m(e,null),g(t,s),g(t,i),g(i,l),g(l,n),g(l,h),X(y,l,null),g(l,b),g(l,E),X(c,E,null),g(i,C),g(i,D),g(i,T),g(i,p),g(p,L),g(p,V),X(x,p,null),g(p,j),g(p,O),X(I,O,null),S=!0},p(k,[P]){k[2]>0?G?G.p(k,P):(G=xe(k),G.c(),G.m(e,null)):G&&(G.d(1),G=null);const _={};P&2&&(_.tags=k[1]),y.$set(_);const H={};P&1&&(H.tags=k[0]),x.$set(H)},i(k){S||(W(y.$$.fragment,k),W(c.$$.fragment,k),W(x.$$.fragment,k),W(I.$$.fragment,k),S=!0)},o(k){q(y.$$.fragment,k),q(c.$$.fragment,k),q(x.$$.fragment,k),q(I.$$.fragment,k),S=!1},d(k){k&&d(t),G&&G.d(),Z(y),Z(c),Z(x),Z(I)}}}function Ft(o,t,e){let r,s,i,l,n;return te(o,K,a=>e(3,l=a)),te(o,pe,a=>e(4,n=a)),o.$$.update=()=>{o.$$.dirty&24&&e(1,r=n.filter(a=>l[a].included)),o.$$.dirty&24&&e(0,s=n.filter(a=>l[a].excluded)),o.$$.dirty&3&&e(2,i=r.length+s.length)},[s,r,i,l,n]}class It extends oe{constructor(t){super(),ae(this,t,Ft,$t,le,{})}}function Ee(o,t,e){const r=o.slice();return r[10]=t[e],r[12]=e,r}function Se(o){let t,e,r;return t=new _t({props:{dle:o[10],i:o[12]+1}}),{c(){Q(t.$$.fragment),e=B()},l(s){J(t.$$.fragment,s),e=M(s)},m(s,i){X(t,s,i),$(s,e,i),r=!0},p(s,i){const l={};i&2&&(l.dle=s[10]),t.$set(l)},i(s){r||(W(t.$$.fragment,s),r=!0)},o(s){q(t.$$.fragment,s),r=!1},d(s){s&&d(e),Z(t,s)}}}function Lt(o){let t,e,r,s,i,l="The Dles",n,a,h="A curated collection of daily games.",y,b,E=`<a href="${Pe}/suggest" style="text-align: center;">Suggest a game to add!</a>`,c,C,D=o[1].length+"",T,p,L,A,V,x,j,O,I,S,G,k;A=new It({});let P=ne(o[1]),_=[];for(let u=0;u<P.length;u+=1)_[u]=Se(Ee(o,P,u));const H=u=>q(_[u],1,1,()=>{_[u]=null});return{c(){t=w("meta"),e=w("meta"),r=w("meta"),s=B(),i=w("h1"),i.textContent=l,n=B(),a=w("p"),a.textContent=h,y=B(),b=w("p"),b.innerHTML=E,c=B(),C=w("h2"),T=R(D),p=R(" dles"),L=B(),Q(A.$$.fragment),V=B(),x=w("button"),j=R("Clear filters"),O=B(),I=w("ol");for(let u=0;u<_.length;u+=1)_[u].c();this.h()},l(u){const f=Le("svelte-194gfuk",document.head);t=v(f,"META",{name:!0,content:!0}),e=v(f,"META",{name:!0,content:!0}),r=v(f,"META",{name:!0,content:!0}),f.forEach(d),s=M(u),i=v(u,"H1",{class:!0,"data-svelte-h":!0}),re(i)!=="svelte-z7z0pp"&&(i.textContent=l),n=M(u),a=v(u,"P",{class:!0,"data-svelte-h":!0}),re(a)!=="svelte-nxg2us"&&(a.textContent=h),y=M(u),b=v(u,"P",{class:!0,"data-svelte-h":!0}),re(b)!=="svelte-3mbpww"&&(b.innerHTML=E),c=M(u),C=v(u,"H2",{class:!0});var z=F(C);T=U(z,D),p=U(z," dles"),z.forEach(d),L=M(u),J(A.$$.fragment,u),V=M(u),x=v(u,"BUTTON",{id:!0,class:!0,style:!0});var Y=F(x);j=U(Y,"Clear filters"),Y.forEach(d),O=M(u),I=v(u,"OL",{class:!0});var ve=F(I);for(let he=0;he<_.length;he+=1)_[he].l(ve);ve.forEach(d),this.h()},h(){document.title="The Dles",m(t,"name","description"),m(t,"content","A curated collection of free daily games."),m(e,"name","keywords"),m(e,"content","list, collection, links, games, daily, dles, wordle"),m(r,"name","author"),m(r,"content","aukspot"),m(i,"class","svelte-15hq1xr"),m(a,"class","svelte-15hq1xr"),m(b,"class","svelte-15hq1xr"),m(C,"class","banner svelte-15hq1xr"),m(x,"id","clearFiltersButton"),m(x,"class","filterButton svelte-15hq1xr"),N(x,"display",o[0]?"unset":"none"),m(I,"class","svelte-15hq1xr")},m(u,f){g(document.head,t),g(document.head,e),g(document.head,r),$(u,s,f),$(u,i,f),$(u,n,f),$(u,a,f),$(u,y,f),$(u,b,f),$(u,c,f),$(u,C,f),g(C,T),g(C,p),$(u,L,f),X(A,u,f),$(u,V,f),$(u,x,f),g(x,j),$(u,O,f),$(u,I,f);for(let z=0;z<_.length;z+=1)_[z]&&_[z].m(I,null);S=!0,G||(k=se(x,"click",o[2]),G=!0)},p(u,[f]){if((!S||f&2)&&D!==(D=u[1].length+"")&&ie(T,D),(!S||f&1)&&N(x,"display",u[0]?"unset":"none"),f&2){P=ne(u[1]);let z;for(z=0;z<P.length;z+=1){const Y=Ee(u,P,z);_[z]?(_[z].p(Y,f),W(_[z],1)):(_[z]=Se(Y),_[z].c(),W(_[z],1),_[z].m(I,null))}for(ue(),z=P.length;z<_.length;z+=1)H(z);de()}},i(u){if(!S){W(A.$$.fragment,u);for(let f=0;f<P.length;f+=1)W(_[f]);S=!0}},o(u){q(A.$$.fragment,u),_=_.filter(Boolean);for(let f=0;f<_.length;f+=1)q(_[f]);S=!1},d(u){u&&(d(s),d(i),d(n),d(a),d(y),d(b),d(c),d(C),d(L),d(V),d(x),d(O),d(I)),d(t),d(e),d(r),Z(A,u),we(_,u),G=!1,k()}}}function Pt(o,t,e){let r,s,i,l,n,a,h;te(o,K,c=>e(5,l=c)),te(o,_e,c=>e(6,n=c)),te(o,ge,c=>e(1,a=c)),te(o,pe,c=>e(7,h=c));function y(){ee(_e,n=kt,n);for(let c of n)c.hidden=!1}function b(){ee(pe,h=n.map(c=>c.tags).flat().filter((c,C,D)=>D.indexOf(c)==C).sort(),h),ee(K,l={},l);for(let c of h)ee(K,l[c]={included:!1,excluded:!1},l)}y(),b();function E(){for(let c of r)ee(K,l[c].included=!1,l);for(let c of s)ee(K,l[c].excluded=!1,l)}return o.$$.update=()=>{o.$$.dirty&160&&e(4,r=h.filter(c=>l[c].included)),o.$$.dirty&160&&e(3,s=h.filter(c=>l[c].excluded)),o.$$.dirty&24&&e(0,i=r.length>0||s.length>0),o.$$.dirty&88&&ee(ge,a=n.filter(c=>{let C=!1;return r.every(D=>c.tags.includes(D))&&(C=!0),s.some(D=>c.tags.includes(D))&&(C=!1),C}),a)},[i,a,E,s,r,l,n,h]}class qt extends oe{constructor(t){super(),ae(this,t,Pt,Lt,le,{})}}export{qt as component,Vt as universal};
