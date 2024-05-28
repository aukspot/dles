<script>
  import { base } from "$app/paths"
  import DleList from "$lib/components/Dles/DleList.svelte"
  import IconBug from "$lib/components/Icons/IconBug.svelte"
  import IconKofi from "$lib/components/Icons/IconKofi.svelte"
  import IconSuggest from "$lib/components/Icons/IconSuggest.svelte"
  import LatestChange from "$lib/components/LatestChange.svelte"
  import Settings from "$lib/components/Settings.svelte"
  import SimpleLink from "$lib/components/SimpleLink.svelte"
</script>

<svelte:head>
  <title>The Dles - a curated collection of daily games.</title>
  <meta
    name="description"
    content="A curated collection of free daily games. Contains 100+ games, like Wordle, Connections, Bandle, and many more."
  />
  <meta
    name="keywords"
    content="list, collection, links, games, daily, dles, wordle, timeguessr, bandle, connections, gamedle, like wordle"
  />
  <meta name="author" content="aukspot" />
</svelte:head>

<!-- <SimpleLink href="{base}/suggest" text="Suggest a game to add!"></SimpleLink> -->
<DleList />
