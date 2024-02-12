<script>
  import DleCard from "./DleCard.svelte";
  import dles_json from "../data/dles.json";
  import Filters from "./Filters.svelte";
  import { dles, filteredDles, allTags } from "../stores";

  $dles = dles_json;
  $filteredDles = dles_json;

  $allTags = $dles
    .map((dle) => dle.tags)
    .flat()
    .filter((x, i, a) => a.indexOf(x) == i)
    .sort();
</script>

<svelte:head>
  <title>The Dles</title>
  <meta
    name="description"
    content="A curated list of daily games and unlimited games."
  />
</svelte:head>

<h1>The Dles</h1>
<p>"...they're anything but."</p>
<Filters />
<h2>{$filteredDles.length} dles</h2>
<ol>
  {#each $filteredDles as dle, i}
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
    padding-top: 1rem;
    margin-bottom: 0;
    border-top: 1px solid darkgray;
    text-decoration: underline;
  }

  p {
    margin: 0;
    padding-bottom: 1rem;
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
