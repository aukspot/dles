import {
  s as I,
  n as y,
  o as j,
  r as Q,
  d as J,
  u as X,
  g as Z,
  e as ee,
} from "../chunks/scheduler.CnDQLdtr.js"
import {
  S as D,
  i as S,
  C as W,
  D as F,
  a as b,
  d as h,
  f as r,
  g as T,
  h as u,
  e as g,
  v as R,
  c as v,
  w as M,
  x as H,
  B as V,
  p as A,
  n as G,
  y as L,
  j as x,
  k as $,
  l as K,
  q as B,
  E as te,
  t as q,
  H as le,
  b as U,
  F as ae,
} from "../chunks/index.WqaF0Ff_.js"
import { e as se } from "../chunks/each.D6YF6ztN.js"
const oe =
  typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global
function re(c) {
  let e, t, l
  return {
    c() {
      ;(e = W("svg")), (t = W("path")), (l = W("path")), this.h()
    },
    l(s) {
      e = F(s, "svg", { xmlns: !0, fill: !0, viewBox: !0, class: !0 })
      var a = b(e)
      ;(t = F(a, "path", { stroke: !0, "stroke-width": !0, d: !0 })),
        b(t).forEach(h),
        (l = F(a, "path", {
          stroke: !0,
          "stroke-linecap": !0,
          "stroke-linejoin": !0,
          "stroke-width": !0,
          d: !0,
        })),
        b(l).forEach(h),
        a.forEach(h),
        this.h()
    },
    h() {
      r(t, "stroke", "currentColor"),
        r(t, "stroke-width", "1.5"),
        r(
          t,
          "d",
          "M14.5 19.5h-5m5 0c0-.713 0-1.07.038-1.307.123-.763.144-.812.631-1.412.151-.186.711-.688 1.832-1.692A7.5 7.5 0 1 0 7 15.09c1.12 1.004 1.68 1.505 1.832 1.692.487.6.508.649.63 1.412.039.237.039.593.039 1.307m5 0c0 .935 0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.349.2-.816.2-1.751.2s-1.402 0-1.75-.201a1.5 1.5 0 0 1-.549-.549c-.201-.348-.201-.815-.201-1.75"
        ),
        r(l, "stroke", "currentColor"),
        r(l, "stroke-linecap", "round"),
        r(l, "stroke-linejoin", "round"),
        r(l, "stroke-width", "1.5"),
        r(l, "d", "m12.786 8.5-2.143 3h3l-2.143 3"),
        r(e, "xmlns", "http://www.w3.org/2000/svg"),
        r(e, "fill", "none"),
        r(e, "viewBox", "0 0 24 24"),
        r(e, "class", "svelte-jb7maa")
    },
    m(s, a) {
      T(s, e, a), u(e, t), u(e, l)
    },
    p: y,
    i: y,
    o: y,
    d(s) {
      s && h(e)
    },
  }
}
class ne extends D {
  constructor(e) {
    super(), S(this, e, null, re, I, {})
  }
}
function me(c) {
  let e, t, l, s, a
  return (
    (t = new ne({})),
    {
      c() {
        ;(e = g("button")), R(t.$$.fragment), this.h()
      },
      l(o) {
        e = v(o, "BUTTON", { class: !0 })
        var d = b(e)
        M(t.$$.fragment, d), d.forEach(h), this.h()
      },
      h() {
        r(
          e,
          "class",
          "p-1 rounded-md shadow-md border border-slate-800 dark:border-slate-200 active:shadow-none"
        )
      },
      m(o, d) {
        T(o, e, d),
          H(t, e, null),
          (l = !0),
          s || ((a = V(e, "click", c[0])), (s = !0))
      },
      p: y,
      i(o) {
        l || (A(t.$$.fragment, o), (l = !0))
      },
      o(o) {
        G(t.$$.fragment, o), (l = !1)
      },
      d(o) {
        o && h(e), L(t), (s = !1), a()
      },
    }
  )
}
const O = "theme",
  de = "(prefers-color-scheme: dark)"
function Y() {
  var c = "test"
  try {
    return localStorage.setItem(c, c), localStorage.removeItem(c), !0
  } catch {
    return !1
  }
}
function ce(c) {
  const e = { DARK: "dark", LIGHT: "light" },
    t = () => window.matchMedia(de).matches,
    l = () => {
      if (!Y()) {
        s()
        return
      }
      localStorage.getItem(O)
        ? localStorage.removeItem(O)
        : localStorage.setItem(O, t() ? e.LIGHT : e.DARK),
        s()
    },
    s = () => {
      if (!Y()) {
        document.body.classList.toggle(e.DARK)
        return
      }
      const a = t() ? e.DARK : e.LIGHT
      let o = localStorage.getItem(O) ?? a
      o && o == e.DARK
        ? document.body.classList.add(e.DARK)
        : document.body.classList.remove(e.DARK)
    }
  return j(s), [l]
}
class ie extends D {
  constructor(e) {
    super(), S(this, e, ce, me, I, {})
  }
}
function ue(c) {
  let e,
    t,
    l,
    s,
    a,
    o = "The Dles",
    d,
    n,
    m = "A curated collection of daily games.",
    _
  return (
    (l = new ie({})),
    {
      c() {
        ;(e = g("header")),
          (t = g("div")),
          R(l.$$.fragment),
          (s = x()),
          (a = g("h1")),
          (a.textContent = o),
          (d = x()),
          (n = g("p")),
          (n.textContent = m),
          this.h()
      },
      l(i) {
        e = v(i, "HEADER", {})
        var p = b(e)
        t = v(p, "DIV", { id: !0, class: !0 })
        var w = b(t)
        M(l.$$.fragment, w),
          w.forEach(h),
          (s = $(p)),
          (a = v(p, "H1", { class: !0, "data-svelte-h": !0 })),
          K(a) !== "svelte-h7q42l" && (a.textContent = o),
          (d = $(p)),
          (n = v(p, "P", { class: !0, "data-svelte-h": !0 })),
          K(n) !== "svelte-1w4bv1n" && (n.textContent = m),
          p.forEach(h),
          this.h()
      },
      h() {
        r(t, "id", "themeSwitcher"),
          r(t, "class", "absolute top-2 left-2"),
          r(
            a,
            "class",
            "text-2xl text-center uppercase font-semibold font-mono mt-2"
          ),
          r(n, "class", "text-sm mt-1 text-center")
      },
      m(i, p) {
        T(i, e, p),
          u(e, t),
          H(l, t, null),
          u(e, s),
          u(e, a),
          u(e, d),
          u(e, n),
          (_ = !0)
      },
      p: y,
      i(i) {
        _ || (A(l.$$.fragment, i), (_ = !0))
      },
      o(i) {
        G(l.$$.fragment, i), (_ = !1)
      },
      d(i) {
        i && h(e), L(l)
      },
    }
  )
}
class he extends D {
  constructor(e) {
    super(), S(this, e, null, ue, I, {})
  }
}
const pe = [
  {
    date: "2024-02-27",
    description:
      'Added a <a href="https://github.com/aukspot/dles/blob/main/CHANGELOG.md" target="_blank">CHANGELOG.md</a>.<br>13 dles added.',
    "dles added": [
      { name: "Hitori Conquest", url: "https://hitoriconquest.com/" },
      { name: "Keyword", url: "https://www.washingtonpost.com/games/keyword/" },
      { name: "Letterset", url: "https://www.letterset.net/daily" },
      { name: "Mathler", url: "https://www.mathler.com/" },
      { name: "Mislettered", url: "https://tryhardguides.com/mislettered/" },
      { name: "One Word Search", url: "https://onewordsearch.com/" },
      { name: "pedantle", url: "https://cemantle.certitudes.org/pedantle" },
      { name: "PopCultured", url: "https://histordle.com/popcultured/" },
      { name: "Rogule", url: "https://rogule.com/game.html" },
      { name: "Songle", url: "https://histordle.com/songle/" },
      { name: "Sumplete", url: "https://sumplete.com/daily/" },
      {
        name: "Syllacrostic",
        url: "https://www.syllacrostic.com/daily-puzzle",
      },
      { name: "Yeardle", url: "https://histordle.com/yeardle/" },
    ],
  },
  {
    date: "2024-02-17",
    description: "8 dles added.",
    "dles added": [
      { name: "Connections Game", url: "https://connectionsgame.com" },
      {
        name: "Daily Tomato",
        url: "https://www.rottentomatoes.com/movie-trivia/",
      },
      { name: "Dordle", url: "https://zaratustra.itch.io/dordle" },
      { name: "hello wordl", url: "https://hellowordl.net/?today" },
      { name: "Listed", url: "https://listed.fun/" },
      { name: "Puckdoku", url: "https://www.puckdoku.com/" },
      { name: "Quordle", url: "https://quordlegame.com/" },
      { name: "Spelling Bee", url: "https://spellsbee.com/" },
    ],
  },
  {
    date: "2024-02-16",
    description:
      'Added a <a href="/dles/suggest">suggestion form</a>.<br>4 dles added.',
    "dles added": [
      { name: "Adoptle", url: "https://tryhardguides.com/adoptle/" },
      { name: "Concludle", url: "https://tryhardguides.com/concludle/" },
      { name: "Globle Capitals", url: "https://globle-capitals.com/" },
      { name: "NYT Sudoku", url: "https://www.nytimes.com/puzzles/sudoku" },
    ],
  },
  {
    date: "2024-02-14",
    description:
      'Added a proper <a href="https://github.com/aukspot/dles/blob/main/README.md" target="_blank">README</a>.<br>Removed daily and unlimited tags for simplicity.<br>Added archive tag. <br>7 dles added, 1 removed.',
    "dles added": [
      { name: "Archiguessr", url: "https://archiguesser.com/" },
      { name: "Daydle", url: "https://daydle.com/" },
      {
        name: "Immaculate Grid: Hockey",
        url: "https://www.immaculategrid.com/hockey",
      },
      { name: "Nerdle", url: "https://nerdlegame.com/" },
      { name: "Quizl", url: "https://quizl.io/" },
      { name: "Redactle", url: "https://redactle.net/" },
      { name: "WordAll", url: "https://wordall.xyz/" },
    ],
    "dles removed": [
      {
        name: "Gamedle Classic Unlimited",
        url: "https://www.gamedle.wtf/unlimited",
      },
    ],
  },
  {
    date: "2024-02-13",
    description:
      "Added tags with include/exclude filters.<br>Added dark mode toggle.<br>57 dles added.",
    "dles added": [
      { name: "Bandle", url: "https://bandle.app/" },
      { name: "Box Office Game", url: "https://boxofficega.me/" },
      { name: "Chronophoto", url: "https://www.chronophoto.app/" },
      { name: "Cine2Nerdle", url: "https://www.cinenerdle2.app/" },
      { name: "Colorfle", url: "https://colorfle.org/index.html" },
      { name: "Combinations", url: "https://combinations.org/" },
      { name: "Conexo", url: "https://conexo.ws/en/daily" },
      { name: "Connections", url: "https://www.nytimes.com/games/connections" },
      { name: "Contexto", url: "https://contexto.me/" },
      { name: "Costcodle", url: "https://costcodle.com/" },
      { name: "Crosswordle", url: "https://crosswordle.vercel.app" },
      { name: "crosswordle.com", url: "https://crosswordle.com/" },
      { name: "crosswordle.org", url: "https://crosswordle.org/" },
      { name: "Daily Dozen Trivia", url: "https://dailydozentrivia.com/" },
      { name: "Flagdle", url: "https://www.flagdle.org/" },
      { name: "Flagle", url: "https://www.flagle.io/" },
      { name: "Framed", url: "https://framed.wtf/" },
      { name: "Gamedle Artwork", url: "https://www.gamedle.wtf/artwork" },
      { name: "Gamedle Classic", url: "https://www.gamedle.wtf/classic" },
      {
        name: "Gamedle Classic Unlimited",
        url: "https://www.gamedle.wtf/unlimited",
      },
      { name: "Gamedle Guess", url: "https://www.gamedle.wtf/guess" },
      { name: "Gamedle Keywords", url: "https://www.gamedle.wtf/keywords" },
      { name: "Globle", url: "https://globle-game.com/game" },
      { name: "Guess The Game", url: "https://guessthe.game/" },
      { name: "Housle", url: "https://housle.house/game" },
      { name: "Immaculate Footy", url: "https://www.immaculatefooty.com" },
      {
        name: "Immaculate Grid: Baseball",
        url: "https://www.immaculategrid.com/",
      },
      {
        name: "Immaculate Grid: Men's Basketball",
        url: "https://www.immaculategrid.com/basketball/mens",
      },
      {
        name: "Immaculate Grid: Pro Football",
        url: "https://www.immaculategrid.com/football",
      },
      {
        name: "Immaculate Grid: Women's Basketball",
        url: "https://www.immaculategrid.com/basketball/womens",
      },
      { name: "Metaflora", url: "https://flora.metazooa.com/" },
      { name: "Metazooa", url: "https://metazooa.com/" },
      { name: "MLB Pickle", url: "https://www.mlbpickle.com/" },
      { name: "Movie Grid", url: "https://moviegrid.io/" },
      { name: "Movie to Movie", url: "https://movietomovie.com/" },
      {
        name: "NYT Mini Crossword",
        url: "https://www.nytimes.com/crosswords/game/mini",
      },
      { name: "OEC Tradle", url: "https://games.oec.world/en/tradle/" },
      { name: "Petdle", url: "https://petdle.link/" },
      { name: "Pokedoku", url: "https://pokedoku.com/" },
      {
        name: "Puzzmo - Crossword",
        url: "https://www.puzzmo.com/play/crossword",
      },
      { name: "Puzzmo - Flipart", url: "https://www.puzzmo.com/play/flip-art" },
      {
        name: "Puzzmo - Really Bad Chess",
        url: "https://www.puzzmo.com/play/really-bad-chess",
      },
      {
        name: "Puzzmo - Spelltower",
        url: "https://www.puzzmo.com/play/spelltower",
      },
      {
        name: "Puzzmo - Typeshift",
        url: "https://www.puzzmo.com/play/typeshift",
      },
      { name: "Semantle", url: "https://semantle.com/" },
      { name: "Songless", url: "https://lessgames.com/songless" },
      { name: "Spellcheck", url: "https://spellcheck.xyz/" },
      { name: "Statele", url: "https://statele.teuteuf.fr/" },
      { name: "TimeGuessr", url: "https://timeguessr.com/" },
      { name: "travle", url: "https://travle.earth/" },
      { name: "Weaver", url: "https://weavergame.org/" },
      { name: "WhereTaken", url: "https://wheretaken.teuteuf.fr/" },
      { name: "WhereTaken USA", url: "https://wheretakenusa.teuteuf.fr/" },
      { name: "Word Waffle", url: "https://wordwaffle.org/" },
      {
        name: "Wordle",
        url: "https://www.nytimes.com/games/wordle/index.html",
      },
      { name: "Wordless", url: "https://lessgames.com/wordless" },
      { name: "Worldle", url: "https://worldle.teuteuf.fr/" },
    ],
  },
]
function fe(c, e, t) {
  const l = c.slice()
  return (l[0] = e[t]), l
}
function we(c) {
  let e,
    t,
    l,
    s = c[0].date + "",
    a,
    o,
    d,
    n,
    m,
    _ = c[0].description + "",
    i
  return {
    c() {
      ;(e = g("div")),
        (t = g("time")),
        (l = g("strong")),
        (a = q(s)),
        (o = q(":")),
        (d = x()),
        (n = g("section")),
        (m = new le(!1)),
        (i = x()),
        this.h()
    },
    l(p) {
      e = v(p, "DIV", { class: !0 })
      var w = b(e)
      t = v(w, "TIME", { datetime: !0 })
      var C = b(t)
      l = v(C, "STRONG", {})
      var k = b(l)
      ;(a = U(k, s)),
        k.forEach(h),
        (o = U(C, ":")),
        C.forEach(h),
        (d = $(w)),
        (n = v(w, "SECTION", {}))
      var f = b(n)
      ;(m = ae(f, !1)), f.forEach(h), (i = $(w)), w.forEach(h), this.h()
    },
    h() {
      r(t, "datetime", c[0].date),
        (m.a = null),
        r(e, "class", "entry svelte-136mdf9")
    },
    m(p, w) {
      T(p, e, w),
        u(e, t),
        u(t, l),
        u(l, a),
        u(t, o),
        u(e, d),
        u(e, n),
        m.m(_, n),
        u(e, i)
    },
    p: y,
    d(p) {
      p && h(e)
    },
  }
}
function ge(c) {
  let e,
    t,
    l,
    s = "Changelog",
    a,
    o,
    d = se(pe),
    n = []
  for (let m = 0; m < d.length; m += 1) n[m] = we(fe(c, d, m))
  return {
    c() {
      ;(e = g("div")),
        (t = g("details")),
        (l = g("summary")),
        (l.textContent = s),
        (a = x()),
        (o = g("div"))
      for (let m = 0; m < n.length; m += 1) n[m].c()
      this.h()
    },
    l(m) {
      e = v(m, "DIV", { id: !0, class: !0 })
      var _ = b(e)
      t = v(_, "DETAILS", { id: !0, style: !0, class: !0 })
      var i = b(t)
      ;(l = v(i, "SUMMARY", { class: !0, style: !0, "data-svelte-h": !0 })),
        K(l) !== "svelte-4easkr" && (l.textContent = s),
        (a = $(i)),
        (o = v(i, "DIV", { id: !0, class: !0 }))
      var p = b(o)
      for (let w = 0; w < n.length; w += 1) n[w].l(p)
      p.forEach(h), i.forEach(h), _.forEach(h), this.h()
    },
    h() {
      r(l, "class", "not-selectable pointer"),
        B(l, "margin-bottom", "0.75rem"),
        B(l, "text-align", "center"),
        B(l, "cursor", "pointer"),
        B(l, "font-size", "1.2rem"),
        r(o, "id", "entries"),
        r(o, "class", "svelte-136mdf9"),
        r(t, "id", "changelog"),
        B(t, "padding", "0.25rem"),
        r(t, "class", "svelte-136mdf9"),
        r(e, "id", "changelogContainer"),
        r(e, "class", "svelte-136mdf9")
    },
    m(m, _) {
      T(m, e, _), u(e, t), u(t, l), u(t, a), u(t, o)
      for (let i = 0; i < n.length; i += 1) n[i] && n[i].m(o, null)
    },
    p: y,
    i: y,
    o: y,
    d(m) {
      m && h(e), te(n, m)
    },
  }
}
class ve extends D {
  constructor(e) {
    super(), S(this, e, null, ge, I, {})
  }
}
const { document: be } = oe
function _e(c) {
  let e,
    t,
    l,
    s = "Back to top",
    a,
    o
  return {
    c() {
      ;(e = x()),
        (t = g("div")),
        (l = g("button")),
        (l.textContent = s),
        this.h()
    },
    l(d) {
      ;(e = $(d)), (t = v(d, "DIV", { class: !0 }))
      var n = b(t)
      ;(l = v(n, "BUTTON", { id: !0, class: !0, "data-svelte-h": !0 })),
        K(l) !== "svelte-7aiye4" && (l.textContent = s),
        n.forEach(h),
        this.h()
    },
    h() {
      r(l, "id", "backToTop"),
        r(l, "class", "btn svelte-1lo125h"),
        r(t, "class", "svelte-1lo125h")
    },
    m(d, n) {
      T(d, e, n),
        T(d, t, n),
        u(t, l),
        a || ((o = [V(be, "scroll", ye), V(l, "click", ke)]), (a = !0))
    },
    p: y,
    i: y,
    o: y,
    d(d) {
      d && (h(e), h(t)), (a = !1), Q(o)
    },
  }
}
function ke() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}
function ye(c) {
  const e = document.getElementById("backToTop"),
    t = document.documentElement
  let l = t.scrollHeight - t.clientHeight
  window.scrollY > 600 && t.scrollTop / l > 0.8
    ? e.classList.add("showBtn")
    : e.classList.remove("showBtn")
}
class xe extends D {
  constructor(e) {
    super(), S(this, e, null, _e, I, {})
  }
}
function $e(c) {
  let e, t, l, s, a, o, d, n, m, _, i, p, w
  s = new he({})
  const C = c[1].default,
    k = J(C, c, c[0], null)
  return (
    (d = new xe({})),
    (p = new ve({})),
    {
      c() {
        ;(e = g("div")),
          (t = g("div")),
          (l = g("main")),
          R(s.$$.fragment),
          (a = x()),
          k && k.c(),
          (o = x()),
          R(d.$$.fragment),
          (n = x()),
          (m = g("footer")),
          (_ = g("div")),
          (i = x()),
          R(p.$$.fragment),
          this.h()
      },
      l(f) {
        e = v(f, "DIV", { class: !0 })
        var E = b(e)
        t = v(E, "DIV", { class: !0 })
        var P = b(t)
        l = v(P, "MAIN", { class: !0 })
        var z = b(l)
        M(s.$$.fragment, z),
          (a = $(z)),
          k && k.l(z),
          (o = $(z)),
          M(d.$$.fragment, z),
          z.forEach(h),
          (n = $(P)),
          (m = v(P, "FOOTER", { class: !0 }))
        var N = b(m)
        ;(_ = v(N, "DIV", { class: !0 })),
          b(_).forEach(h),
          (i = $(N)),
          M(p.$$.fragment, N),
          N.forEach(h),
          P.forEach(h),
          E.forEach(h),
          this.h()
      },
      h() {
        r(
          l,
          "class",
          "relative flex flex-col flex-1 p-1 w-full mx-auto box-border"
        ),
          r(_, "class", "divider"),
          r(m, "class", "flex flex-col p-1"),
          r(
            t,
            "class",
            "flex flex-col min-h-screen justify-between max-w-3xl mx-auto"
          ),
          r(
            e,
            "class",
            "w-full text-colorText bg-colorBackground dark:text-colorText dark:bg-colorBackground"
          )
      },
      m(f, E) {
        T(f, e, E),
          u(e, t),
          u(t, l),
          H(s, l, null),
          u(l, a),
          k && k.m(l, null),
          u(l, o),
          H(d, l, null),
          u(t, n),
          u(t, m),
          u(m, _),
          u(m, i),
          H(p, m, null),
          (w = !0)
      },
      p(f, [E]) {
        k &&
          k.p &&
          (!w || E & 1) &&
          X(k, C, f, f[0], w ? ee(C, f[0], E, null) : Z(f[0]), null)
      },
      i(f) {
        w ||
          (A(s.$$.fragment, f),
          A(k, f),
          A(d.$$.fragment, f),
          A(p.$$.fragment, f),
          (w = !0))
      },
      o(f) {
        G(s.$$.fragment, f),
          G(k, f),
          G(d.$$.fragment, f),
          G(p.$$.fragment, f),
          (w = !1)
      },
      d(f) {
        f && h(e), L(s), k && k.d(f), L(d), L(p)
      },
    }
  )
}
function Te(c, e, t) {
  let { $$slots: l = {}, $$scope: s } = e
  return (
    (c.$$set = (a) => {
      "$$scope" in a && t(0, (s = a.$$scope))
    }),
    [s, l]
  )
}
class Ae extends D {
  constructor(e) {
    super(), S(this, e, Te, $e, I, {})
  }
}
export { Ae as component }
