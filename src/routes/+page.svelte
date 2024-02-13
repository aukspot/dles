<script>
  import DleCard from "./DleCard.svelte";
  import dles_json from "../data/dles.json";
  import Filters from "./Filters.svelte";
  import { dles, tagNames, tags } from "../stores";

  function initializeDles() {
    $dles = dles_json;
    for (let dle of $dles) {
      dle.hidden = false;
    }
  }

  function initializeTags() {
    $tagNames = $dles
      .map((dle) => dle.tags)
      .flat()
      .filter((x, i, a) => a.indexOf(x) == i)
      .sort();

    $tags = {};
    for (let tag_name of $tagNames) {
      $tags[tag_name] = {
        included: false,
        excluded: false,
      };
    }
  }

  initializeDles();
  initializeTags();

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included);
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded);

  $: hasFilters = includedTags.length > 0 || excludedTags.length > 0;

  $: filteredDles = $dles.filter((dle) => {
    let result = false;
    if (includedTags.every((tag) => dle.tags.includes(tag))) {
      result = true;
    }
    if (excludedTags.some((tag) => dle.tags.includes(tag))) {
      result = false;
    }
    return result;
  });
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
<p>A filterable collection of free web games, created by @aukspot.</p>

<Filters />

<h2>{filteredDles.length} dles</h2>
{#if hasFilters}
  <button>Clear filters</button>
{/if}
<ol>
  {#each filteredDles as dle, i}
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
