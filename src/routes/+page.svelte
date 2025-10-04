<script>
  export const params = undefined

  import DleList from "$lib/components/Dles/DleList.svelte"
</script>

<svelte:head>
  <title
    >The Dles - Discover 500+ Free Daily Games | Wordle, Connections & More</title
  >

  <meta
    name="description"
    content="Discover 500+ free games updated daily - Wordle, Connections, Bandle, and more. Your curated collection of daily puzzles, word games, trivia, and logic games."
  />
  <meta
    name="keywords"
    content="free games, daily games, puzzle games, word games, wordle, connections, bandle, trivia, logic games, quiz games, daily puzzles, online games, browser games"
  />
  <meta name="author" content="aukspot" />
  <meta
    property="og:title"
    content="The Dles - Discover 500+ Free Daily Games | Wordle, Connections & More"
  />
  <meta property="og:site_name" content="The Dles" />
  <meta property="og:url" content="https://dles.aukspot.com" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
  <meta
    property="og:description"
    content="Discover 500+ free games updated daily - Wordle, Connections, Bandle, and more. Your curated collection of daily puzzles, word games, trivia, and logic games."
  />
  <meta property="og:image" content="https://dles.aukspot.com/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://dles.aukspot.com/og-image.jpg" />
  <meta
    name="twitter:title"
    content="The Dles - Discover 500+ Free Daily Games"
  />
  <meta
    name="twitter:description"
    content="Discover 500+ free games updated daily - Wordle, Connections, Bandle, and more. Your curated collection of daily puzzles, word games, trivia, and logic games."
  />
  <link rel="canonical" href="https://dles.aukspot.com" />
  {@html `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "The Dles - Free Daily Games Collection",
  "description": "Discover 500+ free games updated daily including Wordle, Connections, Bandle, and more",
  "url": "https://dles.aukspot.com"
}
</script>`}
</svelte:head>
<DleList />
