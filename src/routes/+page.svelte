<script>
  import DleCard from "./DleCard.svelte";
  import dles from "../data/dles.json";
  import Filters from "./Filters.svelte";

  let allTags = dles
    .map((dle) => dle.tags)
    .flat()
    .filter((x, i, a) => a.indexOf(x) == i)
    .sort();
  let filtered_dles = dles;
</script>

<svelte:head>
  <title>The Dles</title>
  <meta
    name="description"
    content="A curated list of daily games and unlimited games."
  />
</svelte:head>

<h1>The Dles</h1>
<p>...they're anything but.</p>
<Filters tags={allTags} />
<h2>{filtered_dles.length} dles</h2>
<ol>
  {#each dles as dle, i}
    <DleCard {dle} i={i + 1}></DleCard>
  {/each}
</ol>

<style>
  h1,
  h2,
  p {
    text-align: center;
  }

  h2 {
    margin-bottom: 0;
  }

  ol {
    width: 100%;
    padding: 0;
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
