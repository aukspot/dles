<script>
  import { base } from "$app/paths"
  import DleList from "$lib/components/Dles/DleList.svelte"
  import Settings from "$lib/components/Settings.svelte"
  import SimpleLink from "$lib/components/SimpleLink.svelte"
</script>

<svelte:head>
  <title>The Dles</title>
  <meta
    name="description"
    content="A curated collection of free daily games."
  />
  <meta
    name="keywords"
    content="list, collection, links, games, daily, dles, wordle"
  />
  <meta name="author" content="aukspot" />
</svelte:head>

<SimpleLink href="{base}/suggest" text="Suggest a game to add!"></SimpleLink>
<Settings />
<DleList />
