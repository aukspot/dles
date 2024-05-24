<script>
  import { base } from "$app/paths"
  import DleList from "$lib/components/Dles/DleList.svelte"
  import Settings from "$lib/components/Settings.svelte"
  import SimpleLink from "$lib/components/SimpleLink.svelte"
</script>

<svelte:head>
  <title>The Dles - a curated collection of daily games.</title>
  <meta
    name="description"
    content="A curated collection of free daily games. Contains 100+ games, including Wordle, TimeGuessr, Bandle, and many more."
  />
  <meta
    name="keywords"
    content="list, collection, links, games, daily, dles, wordle, timeguessr, bandle, connections, gamedle"
  />
  <meta name="author" content="aukspot" />
</svelte:head>

<SimpleLink href="{base}/suggest" text="Suggest a game to add!"></SimpleLink>
<DleList />
