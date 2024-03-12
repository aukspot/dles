import{s as Q,n as K,c as H,x as L}from"../chunks/scheduler.CnDQLdtr.js";import{S as J,i as X,e as _,t as A,c as k,a as T,b as B,d as h,f as p,q as ae,g as $,h as f,B as ue,s as O,p as x,r as te,o as se,n as D,E as de,v as V,w as j,x as R,y as U,j as E,k as F,l as ne,m as we,A as ve,G as Ee,z as Ne}from"../chunks/index.WqaF0Ff_.js";import{b as Ie}from"../chunks/paths.C-L9opJJ.js";import{e as ee}from"../chunks/each.D6YF6ztN.js";import{r as We,w as oe}from"../chunks/index.BqMgp1LS.js";import{S as Pe}from"../chunks/SimpleLink.Cf9roQ6t.js";const Ae=!0,Ot=Object.freeze(Object.defineProperty({__proto__:null,prerender:Ae},Symbol.toStringTag,{value:"Module"})),Be="#e5bab2",Me="#e5bab2",Le="#e5bbb2",qe="#e5bcb2",Oe="#e5bfb2",Ve="#e5bfb2",je="#e5d1b2",Re="#d9e5b2",Ue="#d7e5b2",Ye="#d0e5b2",He="#c9e5b2",Ke="#c2e5b2",Qe="#c0e5b2",Je="#b2e5d4",Xe="#b2e5da",Ze="#b2e5da",et="#b2e5e0",tt="#b2e5e3",st="#b2dce5",ot="#b2cae5",rt="#b2c6e5",lt="#b2c4e5",at="#b5b2e5",it="#bbb2e5",nt="#c1b2e5",ct="#c1b2e5",ut="#cab2e5",dt="#ceb2e5",mt="#dab2e5",gt="#e5b2db",ht="#e5b2db",ye={architecture:Be,archive:Me,art:Le,audio:qe,baseball:Oe,basketball:Ve,colors:je,flags:Re,football:Ue,geography:Ye,guessing:He,history:Ke,hockey:Qe,logic:Je,maps:Xe,math:Ze,movies:et,music:tt,numbers:st,pictures:ot,prices:rt,puzzmo:lt,roguelike:at,science:it,soccer:nt,sports:ct,time:ut,trivia:dt,usa:mt,"video games":"#e1b2e5",wordle:gt,words:ht};let be=oe([]),_e=oe([]),ke=oe([]),q=oe({});We(110);let ce=oe(2);function pt(l){let e,o,t,s;return{c(){e=_("button"),o=A(l[0]),this.h()},l(i){e=k(i,"BUTTON",{class:!0,style:!0});var r=T(e);o=B(r,l[0]),r.forEach(h),this.h()},h(){p(e,"class","filterTag not-selectable text-xs px-2 py-1 rounded shadow-md font-mono dark:text-slate-900 active:shadow-none"),ae(e,"background-color",ye[l[0]])},m(i,r){$(i,e,r),f(e,o),t||(s=ue(e,"click",l[1]),t=!0)},p(i,[r]){r&1&&O(o,i[0]),r&1&&ae(e,"background-color",ye[i[0]])},i:K,o:K,d(i){i&&h(e),t=!1,s()}}}function ft(l,e,o){let t;H(l,q,a=>o(3,t=a));let{name:s}=e,{type:i}=e;function r(){i=="include"&&L(q,t[s].included=!t[s].included,t),i=="exclude"&&L(q,t[s].excluded=!t[s].excluded,t)}return l.$$set=a=>{"name"in a&&o(0,s=a.name),"type"in a&&o(2,i=a.type)},[s,r,i]}class Fe extends J{constructor(e){super(),X(this,e,ft,pt,Q,{name:0,type:2})}}function ze(l,e,o){const t=l.slice();return t[1]=e[o],t}function Ge(l){let e,o;return e=new Fe({props:{name:l[1],type:"include"}}),{c(){V(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,s){R(e,t,s),o=!0},p(t,s){const i={};s&1&&(i.name=t[1]),e.$set(i)},i(t){o||(x(e.$$.fragment,t),o=!0)},o(t){D(e.$$.fragment,t),o=!1},d(t){U(e,t)}}}function wt(l){let e,o,t=ee(l[0]),s=[];for(let r=0;r<t.length;r+=1)s[r]=Ge(ze(l,t,r));const i=r=>D(s[r],1,1,()=>{s[r]=null});return{c(){e=_("div");for(let r=0;r<s.length;r+=1)s[r].c();this.h()},l(r){e=k(r,"DIV",{class:!0});var a=T(e);for(let n=0;n<s.length;n+=1)s[n].l(a);a.forEach(h),this.h()},h(){p(e,"class","flex gap-x-1 gap-y-2 flex-wrap leading-5")},m(r,a){$(r,e,a);for(let n=0;n<s.length;n+=1)s[n]&&s[n].m(e,null);o=!0},p(r,[a]){if(a&1){t=ee(r[0]);let n;for(n=0;n<t.length;n+=1){const u=ze(r,t,n);s[n]?(s[n].p(u,a),x(s[n],1)):(s[n]=Ge(u),s[n].c(),x(s[n],1),s[n].m(e,null))}for(te(),n=t.length;n<s.length;n+=1)i(n);se()}},i(r){if(!o){for(let a=0;a<t.length;a+=1)x(s[a]);o=!0}},o(r){s=s.filter(Boolean);for(let a=0;a<s.length;a+=1)D(s[a]);o=!1},d(r){r&&h(e),de(s,r)}}}function vt(l,e,o){let{tags:t}=e;return l.$$set=s=>{"tags"in s&&o(0,t=s.tags)},[t]}class yt extends J{constructor(e){super(),X(this,e,vt,wt,Q,{tags:0})}}function bt(l){let e,o,t,s,i,r,a,n,u,c=l[1].name+"",d,b,z,m,C,P="Play",Y,G,N,y=l[1].description+"",Z,g,w,v,I;return v=new yt({props:{tags:l[1].tags}}),{c(){e=_("li"),o=_("div"),t=_("div"),s=_("div"),i=_("span"),r=A(l[0]),a=A("."),n=E(),u=_("span"),d=A(c),b=E(),z=_("div"),m=_("a"),C=_("button"),C.textContent=P,G=E(),N=_("div"),Z=A(y),g=E(),w=_("div"),V(v.$$.fragment),this.h()},l(S){e=k(S,"LI",{class:!0});var W=T(e);o=k(W,"DIV",{class:!0});var M=T(o);t=k(M,"DIV",{class:!0});var re=T(t);s=k(re,"DIV",{class:!0});var le=T(s);i=k(le,"SPAN",{class:!0});var ie=T(i);r=B(ie,l[0]),a=B(ie,"."),ie.forEach(h),n=F(le),u=k(le,"SPAN",{class:!0});var me=T(u);d=B(me,c),me.forEach(h),le.forEach(h),b=F(re),z=k(re,"DIV",{class:!0});var ge=T(z);m=k(ge,"A",{href:!0,target:!0,rel:!0});var he=T(m);C=k(he,"BUTTON",{class:!0,"data-svelte-h":!0}),ne(C)!=="svelte-4sc87"&&(C.textContent=P),he.forEach(h),ge.forEach(h),re.forEach(h),G=F(M),N=k(M,"DIV",{class:!0});var pe=T(N);Z=B(pe,y),pe.forEach(h),g=F(M),w=k(M,"DIV",{class:!0});var fe=T(w);j(v.$$.fragment,fe),fe.forEach(h),M.forEach(h),W.forEach(h),this.h()},h(){p(i,"class","not-selectable"),p(u,"class","text-lg font-semibold"),p(s,"class","flex items-baseline align-top gap-1"),p(C,"class","btn not-selectable"),p(m,"href",Y=l[1].url),p(m,"target","_blank"),p(m,"rel","noreferrer"),p(z,"class","flex items-center pt-1"),p(t,"class","flex justify-between"),p(N,"class","text-sm"),p(w,"class","mt-2"),p(o,"class","flex flex-col flex-wrap justify-between w-full"),p(e,"class","flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-neutral-500 shadow-md rounded-md svelte-1oaxbnc")},m(S,W){$(S,e,W),f(e,o),f(o,t),f(t,s),f(s,i),f(i,r),f(i,a),f(s,n),f(s,u),f(u,d),f(t,b),f(t,z),f(z,m),f(m,C),f(o,G),f(o,N),f(N,Z),f(o,g),f(o,w),R(v,w,null),I=!0},p(S,[W]){(!I||W&1)&&O(r,S[0]),(!I||W&2)&&c!==(c=S[1].name+"")&&O(d,c),(!I||W&2&&Y!==(Y=S[1].url))&&p(m,"href",Y),(!I||W&2)&&y!==(y=S[1].description+"")&&O(Z,y);const M={};W&2&&(M.tags=S[1].tags),v.$set(M)},i(S){I||(x(v.$$.fragment,S),I=!0)},o(S){D(v.$$.fragment,S),I=!1},d(S){S&&h(e),U(v)}}}function _t(l,e,o){let{i:t}=e,{dle:s}=e;return l.$$set=i=>{"i"in i&&o(0,t=i.i),"dle"in i&&o(1,s=i.dle)},[t,s]}class kt extends J{constructor(e){super(),X(this,e,_t,bt,Q,{i:0,dle:1})}}const zt=[{name:"Adoptle",url:"https://tryhardguides.com/adoptle/",description:"Guess the name of a pet that is up for adoption, given a picture of them.",tags:["pictures","wordle","words"]},{name:"Archiguessr",url:"https://archiguesser.com/",description:"Guess the name of the architecture, given a series of pictures.",tags:["archive","guessing","pictures"]},{name:"Bandle",url:"https://bandle.app/",description:"Guess the song, one instrument at a time (sort of).",tags:["audio","guessing","music"]},{name:"Box Office Game",url:"https://boxofficega.me/",description:"Guess the top five movies in the US domestic box office for the given weekend.",tags:["guessing","movies"]},{name:"Chronophoto",url:"https://www.chronophoto.app/",description:"Guess the year in which each historical picture was taken.",tags:["history","pictures","time"]},{name:"Cine2Nerdle",url:"https://www.cinenerdle2.app/",description:"Rearrange the tiles into groups that represent movies/themes. Includes both Original and Reversal.",tags:["archive","movies"]},{name:"Colorfle",url:"https://colorfle.org/index.html",description:"Figure out the color composition of the given color.",tags:["guessing"]},{name:"Combinations",url:"https://combinations.org/",description:"Create words using combinations of letters from the grid.",tags:["words"]},{name:"Concludle",url:"https://tryhardguides.com/concludle/",description:"Guess the secret answer from a series of clues.",tags:["guessing","trivia"]},{name:"Conexo",url:"https://conexo.ws/en",description:"Form groups of 4 words that have something in common.",tags:["archive","guessing","words"]},{name:"Connections Game",url:"https://connectionsgame.com",description:"Group words that share a common thread, basically a copy of NYT Connections but with 3 difficulty modes and a good archive.",tags:["archive","guessing","words"]},{name:"Contexto",url:"https://contexto.me/",description:"Guess words to see how close they are to the secret word in terms of context, eventually guessing the secret word.",tags:["archive","guessing","words"]},{name:"Costcodle",url:"https://costcodle.com/",description:"Guess the price of the given Costco item.",tags:["guessing","prices"]},{name:"Crosswordle",url:"https://crosswordle.vercel.app",description:"Fill in the grid to logically fit a series of Wordle guesses.",tags:["logic","wordle","words"]},{name:"crosswordle.com",url:"https://crosswordle.com/",description:"Swap tiles to solve multiple Wordle puzzles crossed together.",tags:["wordle","words"]},{name:"crosswordle.org",url:"https://crosswordle.org/",description:"Solve multiple Wordle puzzles crossed together.",tags:["archive","guessing","logic","wordle","words"]},{name:"Daily Dozen Trivia",url:"https://dailydozentrivia.com/",description:"Answer 9 trivia questions from various categories.",tags:["trivia"]},{name:"Daily Tomato",url:"https://www.rottentomatoes.com/movie-trivia/",description:"Guess the movie title from a series of 5 clues, by Rotten Tomatoes.",tags:["guessing","movies"]},{name:"Daydle",url:"https://daydle.com/",description:"Guess the year of a historical event that happened on this day in history.",tags:["guessing","history","time"]},{name:"Dordle",url:"https://zaratustra.itch.io/dordle",description:"Solve 2 Wordle puzzles at the same time.",tags:["guessing","wordle","words"]},{name:"Flagdle",url:"https://www.flagdle.org/",description:"Guess the country by its flag.",tags:["flags","geography"]},{name:"Flagle",url:"https://www.flagle.io/",description:"Guess the flag in 5 guesses or less.",tags:["flags","geography","guessing"]},{name:"Framed",url:"https://framed.wtf/",description:"Guess the movie from 6 frames.",tags:["archive","guessing","movies","pictures"]},{name:"Gamedle Artwork",url:"https://www.gamedle.wtf/artwork",description:"Guess the video game by its artwork.",tags:["guessing","pictures","video games"]},{name:"Gamedle Classic",url:"https://www.gamedle.wtf/classic",description:"Guess the video game by its cover.",tags:["guessing","pictures","video games"]},{name:"Gamedle Guess",url:"https://www.gamedle.wtf/guess",description:"Guess the video game by its specifications.",tags:["guessing","video games"]},{name:"Gamedle Keywords",url:"https://www.gamedle.wtf/keywords",description:"Guess the video game by keywords.",tags:["guessing","video games","words"]},{name:"Globle",url:"https://globle-game.com/game",description:"Guess the mystery country, given how close it is to each guessed country.",tags:["geography","guessing","maps"]},{name:"Globle Capitals",url:"https://globle-capitals.com/",description:"Guess the mystery world capital, given how close it is to each guessed world capital.",tags:["geography","guessing","maps"]},{name:"Guess The Game",url:"https://guessthe.game/",description:"Guess the video game by its cropped screenshots.",tags:["archive","guessing","pictures","video games"]},{name:"hello wordl",url:"https://hellowordl.net/?today",description:"Play Wordle puzzles from 4 to 11 letters long.",tags:["guessing","wordle","words"]},{name:"Hitori Conquest",url:"https://hitoriconquest.com/",description:"Eliminate cells in the grid to remove row or column duplicates and satisfy the given rules.",tags:["logic","numbers"]},{name:"Housle",url:"https://housle.house/game",description:"Guess the price of the house, given pictures of parts of the house.",tags:["guessing","pictures","prices"]},{name:"Immaculate Footy",url:"https://www.immaculatefooty.com",description:"Fill out the grid with soccer players matching the criteria of each cell's row and column.",tags:["archive","soccer","sports"]},{name:"Immaculate Grid: Baseball",url:"https://www.immaculategrid.com/",description:"Fill out the grid with baseball players matching the criteria of each cell's row and column.",tags:["archive","baseball","sports"]},{name:"Immaculate Grid: Hockey",url:"https://www.immaculategrid.com/hockey",description:"Fill out the grid with hockey players matching the criteria of each cell's row and column.",tags:["archive","hockey","sports"]},{name:"Immaculate Grid: Men's Basketball",url:"https://www.immaculategrid.com/basketball/mens",description:"Fill out the grid with men's basketball players matching the criteria of each cell's row and column.",tags:["archive","basketball","sports"]},{name:"Immaculate Grid: Pro Football",url:"https://www.immaculategrid.com/football",description:"Fill out the grid with pro football players matching the criteria of each cell's row and column.",tags:["archive","football","sports"]},{name:"Immaculate Grid: Women's Basketball",url:"https://www.immaculategrid.com/basketball/womens",description:"Fill out the grid with women's basketball players matching the criteria of each cell's row and column.",tags:["archive","basketball","sports"]},{name:"Keyword",url:"https://www.washingtonpost.com/games/keyword/",description:"Find the target word by guessing the final letter of the vertical words.",tags:["words"]},{name:"Letterset",url:"https://www.letterset.net/daily",description:"Spell words with the given letters to earn points. Longer words help prolong the game and earn more points.",tags:["archive","words"]},{name:"Listed",url:"https://listed.fun/",description:"Guess the price of the recently sold property.",tags:["guessing","pictures","prices"]},{name:"Mathler",url:"https://www.mathler.com/",description:"Find the hidden calculation that equals the given number.",tags:["guessing","math","numbers"]},{name:"Metaflora",url:"https://flora.metazooa.com/",description:"Guess plants to see where they share common ancestors with the mystery plant, eventually guessing the mystery plant.",tags:["guessing","science"]},{name:"Metazooa",url:"https://metazooa.com/",description:"Guess animals to see where they share common ancestors with the mystery animal, eventually guessing the mystery animal.",tags:["guessing","science"]},{name:"Mislettered",url:"https://tryhardguides.com/mislettered/",description:"Solve the word or phrase by guessing one letter at a time.",tags:["guessing","words"]},{name:"MLB Pickle",url:"https://www.mlbpickle.com/",description:"Guess today's mystery MLB player within nine guesses.",tags:["baseball","guessing","sports"]},{name:"Movie Grid",url:"https://moviegrid.io/",description:"Fill out the grid with movies matching the criteria of each cell's row and column.",tags:["movies"]},{name:"Movie to Movie",url:"https://movietomovie.com/",description:"Connect two movies by jumping through actors and the movies they've been in.",tags:["archive","movies"]},{name:"Nerdle",url:"https://nerdlegame.com/",description:"Guess the secret arithmetic equation.",tags:["archive","guessing","math","numbers"]},{name:"NYT Connections",url:"https://www.nytimes.com/games/connections",description:"Group words that share a common thread.",tags:["guessing","words"]},{name:"NYT Mini Crossword",url:"https://www.nytimes.com/crosswords/game/mini",description:"A very small crossword puzzle by the New York Times.",tags:["words"]},{name:"NYT Sudoku",url:"https://www.nytimes.com/puzzles/sudoku",description:"Daily Sudoku puzzles from the New York Times.",tags:["logic","numbers"]},{name:"NYT Wordle",url:"https://www.nytimes.com/games/wordle/index.html",description:"Guess the 5-letter word in six or fewer attempts.",tags:["guessing","wordle","words"]},{name:"OEC Tradle",url:"https://games.oec.world/en/tradle/",description:"Guess the country by its exports.",tags:["geography","guessing"]},{name:"One Word Search",url:"https://onewordsearch.com/",description:"Repeatedly search for the only word in a grid of letters.",tags:["words"]},{name:"pedantle",url:"https://cemantle.certitudes.org/pedantle",description:"Find the secret Wikipedia page by revealing the words in its introduction.",tags:["guessing","words"]},{name:"Petdle",url:"https://petdle.link/",description:"Guess the pet taken from the game Super Auto Pets.",tags:["guessing","video games"]},{name:"Pokedoku",url:"https://pokedoku.com/",description:"Fill out the grid with Pokémon matching the criteria of each cell's row and column.",tags:["video games"]},{name:"PopCultured",url:"https://histordle.com/popcultured/",description:"Guess the year given three pop culture items released that year.",tags:["guessing","time"]},{name:"Puckdoku",url:"https://www.puckdoku.com/",description:"Fill out the grid with hockey players matching the criteria of each cell's row and column.",tags:["hockey","sports"]},{name:"Puzzmo - Crossword",url:"https://www.puzzmo.com/play/crossword",description:"Crosswords without getting stuck.",tags:["puzzmo","words"]},{name:"Puzzmo - Flipart",url:"https://www.puzzmo.com/play/flip-art",description:"Rotate the pieces to fit them within the frame.",tags:["puzzmo"]},{name:"Puzzmo - Really Bad Chess",url:"https://www.puzzmo.com/play/really-bad-chess",description:"Checkmate the opponent's king in this randomized Chess variant.",tags:["puzzmo"]},{name:"Puzzmo - Spelltower",url:"https://www.puzzmo.com/play/spelltower",description:"Find words to clear tiles in the falling grid.",tags:["puzzmo","words"]},{name:"Puzzmo - Typeshift",url:"https://www.puzzmo.com/play/typeshift",description:"Slide columns of letters to make words, using all of the letters along the way.",tags:["puzzmo","words"]},{name:"Quizl",url:"https://quizl.io/",description:"Answer today's 5 trivia questions.",tags:["archive","trivia"]},{name:"Quordle",url:"https://quordlegame.com/",description:"Solve 4 Wordle puzzles at the same time.",tags:["guessing","wordle","words"]},{name:"Redactle",url:"https://redactle.net/",description:"Guess the Wikipedia article by its content with keywords redacted.",tags:["archive","guessing","words"]},{name:"Rogule",url:"https://rogule.com/game.html",description:"A daily emoji dungeon crawler roguelike.",tags:["roguelike"]},{name:"Semantle",url:"https://semantle.com/",description:"Guess words to see how close they are to the secret word semantically, eventually guessing the secret word.",tags:["guessing","words"]},{name:"Songle",url:"https://histordle.com/songle/",description:"Guess the year given three songs that were released that year.",tags:["guessing","music","time"]},{name:"Songless",url:"https://lessgames.com/songless",description:"Guess the song from listening to small parts of it.",tags:["audio","guessing","music"]},{name:"Spellcheck",url:"https://spellcheck.xyz/",description:"Spell the words correctly after listening to them.",tags:["audio","words"]},{name:"Spelling Bee",url:"https://spellsbee.com/",description:"Given 7 letters, make as many words as you can that contain the center letter. Same as NYT Spelling Bee, which requires a subscription.",tags:["words"]},{name:"Statele",url:"https://statele.teuteuf.fr/",description:"Guess the US State by its outline on the map.",tags:["geography","maps","usa"]},{name:"Sumplete",url:"https://sumplete.com/daily/",description:"Delete numbers so that each row and column adds up to their target number.",tags:["logic","math","numbers"]},{name:"Syllacrostic",url:"https://www.syllacrostic.com/daily-puzzle",description:"Combine syllables to solve the clues.",tags:["archive","words"]},{name:"TimeGuessr",url:"https://timeguessr.com/",description:"Guess the right time and location of each historical photo.",tags:["geography","history","maps","pictures","time"]},{name:"travle",url:"https://travle.earth/",description:"Connect the starting country to the ending country by naming countries in between them.",tags:["geography","maps"]},{name:"Weaver",url:"https://weavergame.org/",description:"Weave your way from the start word to the end word, changing only one letter at a time.",tags:["words"]},{name:"WhereTaken",url:"https://wheretaken.teuteuf.fr/",description:"Guess the Country/Region in which the photo was taken.",tags:["geography","guessing","pictures"]},{name:"WhereTaken USA",url:"https://wheretakenusa.teuteuf.fr/",description:"Guess the US State in which the photo was taken.",tags:["geography","guessing","pictures","usa"]},{name:"Word Waffle",url:"https://wordwaffle.org/",description:"Move letters to create words both horizontally and vertically.",tags:["wordle","words"]},{name:"WordAll",url:"https://wordall.xyz/",description:"Guess all of the Wordle words, given the starting clues.",tags:["guessing","wordle","words"]},{name:"Wordless",url:"https://lessgames.com/wordless",description:"Solve Wordle puzzles of various sizes.",tags:["guessing","wordle","words"]},{name:"Worldle",url:"https://worldle.teuteuf.fr/",description:"Guess the country by its shape on the world map.",tags:["geography","maps"]},{name:"Yeardle",url:"https://histordle.com/yeardle/",description:"Guess the year based on the given historical events of that year.",tags:["guessing","history","time"]}];function Ce(l,e,o){const t=l.slice();return t[3]=e[o],t}function Gt(l){let e,o,t=ee(l[0]),s=[];for(let r=0;r<t.length;r+=1)s[r]=xe(Ce(l,t,r));const i=r=>D(s[r],1,1,()=>{s[r]=null});return{c(){for(let r=0;r<s.length;r+=1)s[r].c();e=we()},l(r){for(let a=0;a<s.length;a+=1)s[a].l(r);e=we()},m(r,a){for(let n=0;n<s.length;n+=1)s[n]&&s[n].m(r,a);$(r,e,a),o=!0},p(r,a){if(a&3){t=ee(r[0]);let n;for(n=0;n<t.length;n+=1){const u=Ce(r,t,n);s[n]?(s[n].p(u,a),x(s[n],1)):(s[n]=xe(u),s[n].c(),x(s[n],1),s[n].m(e.parentNode,e))}for(te(),n=t.length;n<s.length;n+=1)i(n);se()}},i(r){if(!o){for(let a=0;a<t.length;a+=1)x(s[a]);o=!0}},o(r){s=s.filter(Boolean);for(let a=0;a<s.length;a+=1)D(s[a]);o=!1},d(r){r&&h(e),de(s,r)}}}function Ct(l){let e,o=l[2]&&Te();return{c(){e=_("div"),o&&o.c(),this.h()},l(t){e=k(t,"DIV",{id:!0,class:!0});var s=T(e);o&&o.l(s),s.forEach(h),this.h()},h(){p(e,"id","none"),p(e,"class","svelte-l1a3ld")},m(t,s){$(t,e,s),o&&o.m(e,null)},p(t,s){t[2]?o||(o=Te(),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},i:K,o:K,d(t){t&&h(e),o&&o.d()}}}function xe(l){let e,o;return e=new Fe({props:{name:l[3],type:l[1]}}),{c(){V(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,s){R(e,t,s),o=!0},p(t,s){const i={};s&1&&(i.name=t[3]),s&2&&(i.type=t[1]),e.$set(i)},i(t){o||(x(e.$$.fragment,t),o=!0)},o(t){D(e.$$.fragment,t),o=!1},d(t){U(e,t)}}}function Te(l){let e;return{c(){e=A("No tags remaining")},l(o){e=B(o,"No tags remaining")},m(o,t){$(o,e,t)},d(o){o&&h(e)}}}function xt(l){let e,o,t,s,i;const r=[Ct,Gt],a=[];function n(u,c){return u[0].length==0?0:1}return o=n(l),t=a[o]=r[o](l),{c(){e=_("div"),t.c(),this.h()},l(u){e=k(u,"DIV",{class:!0});var c=T(e);t.l(c),c.forEach(h),this.h()},h(){p(e,"class",s="filterTags-"+l[1]+" flex gap-x-1 gap-y-2 flex-wrap leading-5 justify-center")},m(u,c){$(u,e,c),a[o].m(e,null),i=!0},p(u,[c]){let d=o;o=n(u),o===d?a[o].p(u,c):(te(),D(a[d],1,1,()=>{a[d]=null}),se(),t=a[o],t?t.p(u,c):(t=a[o]=r[o](u),t.c()),x(t,1),t.m(e,null)),(!i||c&2&&s!==(s="filterTags-"+u[1]+" flex gap-x-1 gap-y-2 flex-wrap leading-5 justify-center"))&&p(e,"class",s)},i(u){i||(x(t),i=!0)},o(u){D(t),i=!1},d(u){u&&h(e),a[o].d()}}}function Tt(l,e,o){let{tags:t}=e,{type:s}=e,{inDropdown:i}=e;return l.$$set=r=>{"tags"in r&&o(0,t=r.tags),"type"in r&&o(1,s=r.type),"inDropdown"in r&&o(2,i=r.inDropdown)},[t,s,i]}class St extends J{constructor(e){super(),X(this,e,Tt,xt,Q,{tags:0,type:1,inDropdown:2})}}function Se(l,e,o){const t=l.slice();return t[11]=e[o],t[13]=o,t}function $e(l){let e,o=l[3].length!=1?"have":"has",t,s,i=l[0].length>1?"tags":"tag",r,a,n,u;return n=new St({props:{tags:l[0],type:"include",inDropdown:!1}}),{c(){e=_("div"),t=A(o),s=A(" the "),r=A(i),a=E(),V(n.$$.fragment),this.h()},l(c){e=k(c,"DIV",{class:!0});var d=T(e);t=B(d,o),s=B(d," the "),r=B(d,i),a=F(d),j(n.$$.fragment,d),d.forEach(h),this.h()},h(){p(e,"class","text-sm")},m(c,d){$(c,e,d),f(e,t),f(e,s),f(e,r),f(e,a),R(n,e,null),u=!0},p(c,d){(!u||d&8)&&o!==(o=c[3].length!=1?"have":"has")&&O(t,o),(!u||d&1)&&i!==(i=c[0].length>1?"tags":"tag")&&O(r,i);const b={};d&1&&(b.tags=c[0]),n.$set(b)},i(c){u||(x(n.$$.fragment,c),u=!0)},o(c){D(n.$$.fragment,c),u=!1},d(c){c&&h(e),U(n)}}}function De(l){let e,o,t;return e=new kt({props:{dle:l[11],i:l[13]+1}}),{c(){V(e.$$.fragment),o=E()},l(s){j(e.$$.fragment,s),o=F(s)},m(s,i){R(e,s,i),$(s,o,i),t=!0},p(s,i){const r={};i&8&&(r.dle=s[11]),e.$set(r)},i(s){t||(x(e.$$.fragment,s),t=!0)},o(s){D(e.$$.fragment,s),t=!1},d(s){s&&h(o),U(e,s)}}}function $t(l){let e,o,t=l[3].length+"",s,i,r=l[3].length!=1?"dles":"dle",a,n,u,c,d,b,z,m,C,P,Y,G=l[0].length>0&&$e(l),N=ee(l[3]),y=[];for(let g=0;g<N.length;g+=1)y[g]=De(Se(l,N,g));const Z=g=>D(y[g],1,1,()=>{y[g]=null});return{c(){e=_("div"),o=_("strong"),s=A(t),i=E(),a=A(r),n=E(),G&&G.c(),u=E(),c=_("button"),d=A("Clear filters"),b=E(),z=_("ol");for(let g=0;g<y.length;g+=1)y[g].c();this.h()},l(g){e=k(g,"DIV",{class:!0});var w=T(e);o=k(w,"STRONG",{});var v=T(o);s=B(v,t),v.forEach(h),i=F(w),a=B(w,r),n=F(w),G&&G.l(w),w.forEach(h),u=F(g),c=k(g,"BUTTON",{id:!0,class:!0,style:!0});var I=T(c);d=B(I,"Clear filters"),I.forEach(h),b=F(g),z=k(g,"OL",{class:!0});var S=T(z);for(let W=0;W<y.length;W+=1)y[W].l(S);S.forEach(h),this.h()},h(){p(e,"class","mt-3 pt-2 pb-1 border border-neutral-500 leading-6 align-middle font-mono text-center text-2xl shadow-md"),p(c,"id","clearFiltersButton"),p(c,"class","btn text-sm py-2 px-4 mt-2 mx-auto min-w-32"),ae(c,"display",l[2]?"unset":"none"),p(z,"class",m="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-"+l[1])},m(g,w){$(g,e,w),f(e,o),f(o,s),f(e,i),f(e,a),f(e,n),G&&G.m(e,null),$(g,u,w),$(g,c,w),f(c,d),$(g,b,w),$(g,z,w);for(let v=0;v<y.length;v+=1)y[v]&&y[v].m(z,null);C=!0,P||(Y=ue(c,"click",l[4]),P=!0)},p(g,[w]){if((!C||w&8)&&t!==(t=g[3].length+"")&&O(s,t),(!C||w&8)&&r!==(r=g[3].length!=1?"dles":"dle")&&O(a,r),g[0].length>0?G?(G.p(g,w),w&1&&x(G,1)):(G=$e(g),G.c(),x(G,1),G.m(e,null)):G&&(te(),D(G,1,1,()=>{G=null}),se()),(!C||w&4)&&ae(c,"display",g[2]?"unset":"none"),w&8){N=ee(g[3]);let v;for(v=0;v<N.length;v+=1){const I=Se(g,N,v);y[v]?(y[v].p(I,w),x(y[v],1)):(y[v]=De(I),y[v].c(),x(y[v],1),y[v].m(z,null))}for(te(),v=N.length;v<y.length;v+=1)Z(v);se()}(!C||w&2&&m!==(m="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-"+g[1]))&&p(z,"class",m)},i(g){if(!C){x(G);for(let w=0;w<N.length;w+=1)x(y[w]);C=!0}},o(g){D(G),y=y.filter(Boolean);for(let w=0;w<y.length;w+=1)D(y[w]);C=!1},d(g){g&&(h(e),h(u),h(c),h(b),h(z)),G&&G.d(),de(y,g),P=!1,Y()}}}function Dt(l,e,o){let t,s,i,r,a,n,u,c;H(l,q,m=>o(6,r=m)),H(l,be,m=>o(7,a=m)),H(l,_e,m=>o(3,n=m)),H(l,ke,m=>o(8,u=m)),H(l,ce,m=>o(1,c=m));function d(){L(be,a=zt,a);for(let m of a)m.hidden=!1}function b(){L(ke,u=a.map(m=>m.tags).flat().filter((m,C,P)=>P.indexOf(m)==C).sort(),u),L(q,r={},r);for(let m of u)L(q,r[m]={included:!1,excluded:!1},r)}d(),b();function z(){for(let m of t)L(q,r[m].included=!1,r);for(let m of s)L(q,r[m].excluded=!1,r)}return l.$$.update=()=>{l.$$.dirty&2&&console.log(c),l.$$.dirty&320&&o(0,t=u.filter(m=>r[m].included)),l.$$.dirty&320&&o(5,s=u.filter(m=>r[m].excluded)),l.$$.dirty&33&&o(2,i=t.length>0||s.length>0),l.$$.dirty&161&&L(_e,n=a.filter(m=>{let C=!1;return t.every(P=>m.tags.includes(P))&&(C=!0),s.some(P=>m.tags.includes(P))&&(C=!1),C}),n)},[t,c,i,n,z,s,r,a,u]}class Et extends J{constructor(e){super(),X(this,e,Dt,$t,Q,{})}}function Ft(l){let e,o,t="Dark mode?",s,i,r,a,n="Number of columns",u,c,d,b;return{c(){e=_("div"),o=_("label"),o.textContent=t,s=E(),i=_("input"),r=E(),a=_("label"),a.textContent=n,u=E(),c=_("input"),this.h()},l(z){e=k(z,"DIV",{});var m=T(e);o=k(m,"LABEL",{for:!0,"data-svelte-h":!0}),ne(o)!=="svelte-11o5d4l"&&(o.textContent=t),s=F(m),i=k(m,"INPUT",{id:!0,type:!0}),r=F(m),a=k(m,"LABEL",{for:!0,"data-svelte-h":!0}),ne(a)!=="svelte-1mgq3ne"&&(a.textContent=n),u=F(m),c=k(m,"INPUT",{id:!0,type:!0,min:!0,max:!0}),m.forEach(h),this.h()},h(){p(o,"for","darkMode"),p(i,"id","darkMode"),p(i,"type","checkbox"),p(a,"for","numColumns"),p(c,"id","numColumns"),p(c,"type","number"),p(c,"min","1"),p(c,"max","3")},m(z,m){$(z,e,m),f(e,o),f(e,s),f(e,i),f(e,r),f(e,a),f(e,u),f(e,c),ve(c,l[0]),d||(b=ue(c,"input",l[1]),d=!0)},p(z,[m]){m&1&&Ee(c.value)!==z[0]&&ve(c,z[0])},i:K,o:K,d(z){z&&h(e),d=!1,b()}}}function Nt(l,e,o){let t;H(l,ce,i=>o(0,t=i));function s(){t=Ee(this.value),ce.set(t)}return[t,s]}class It extends J{constructor(e){super(),X(this,e,Nt,Ft,Q,{})}}function Wt(l){let e,o,t,s,i,r,a,n,u,c;return i=new Pe({props:{href:Ie+"/suggest",text:"Suggest a game to add!"}}),a=new It({}),u=new Et({}),{c(){e=_("meta"),o=_("meta"),t=_("meta"),s=E(),V(i.$$.fragment),r=E(),V(a.$$.fragment),n=E(),V(u.$$.fragment),this.h()},l(d){const b=Ne("svelte-194gfuk",document.head);e=k(b,"META",{name:!0,content:!0}),o=k(b,"META",{name:!0,content:!0}),t=k(b,"META",{name:!0,content:!0}),b.forEach(h),s=F(d),j(i.$$.fragment,d),r=F(d),j(a.$$.fragment,d),n=F(d),j(u.$$.fragment,d),this.h()},h(){document.title="The Dles",p(e,"name","description"),p(e,"content","A curated collection of free daily games."),p(o,"name","keywords"),p(o,"content","list, collection, links, games, daily, dles, wordle"),p(t,"name","author"),p(t,"content","aukspot")},m(d,b){f(document.head,e),f(document.head,o),f(document.head,t),$(d,s,b),R(i,d,b),$(d,r,b),R(a,d,b),$(d,n,b),R(u,d,b),c=!0},p:K,i(d){c||(x(i.$$.fragment,d),x(a.$$.fragment,d),x(u.$$.fragment,d),c=!0)},o(d){D(i.$$.fragment,d),D(a.$$.fragment,d),D(u.$$.fragment,d),c=!1},d(d){d&&(h(s),h(r),h(n)),h(e),h(o),h(t),U(i,d),U(a,d),U(u,d)}}}class Vt extends J{constructor(e){super(),X(this,e,null,Wt,Q,{})}}export{Vt as component,Ot as universal};
