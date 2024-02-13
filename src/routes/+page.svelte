<script>
  import DleCard from "./DleCard.svelte";
  import dles_json from "../data/dles.json";
  import Filters from "./Filters.svelte";
  import { dles, filteredDles, tagNames, tags } from "../stores";

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

  $: $filteredDles = $dles.filter((dle) => {
    let result = false;
    if (includedTags.every((tag) => dle.tags.includes(tag))) {
      result = true;
    }
    if (excludedTags.some((tag) => dle.tags.includes(tag))) {
      result = false;
    }
    return result;
  });

  function clearFilters() {
    for (let includedTag of includedTags) {
      $tags[includedTag].included = false;
    }
    for (let excludedTag of excludedTags) {
      $tags[excludedTag].excluded = false;
    }
  }
</script>

<svelte:head>
  <title>The Dles</title>
  <meta
    name="description"
    content="A curated list of free daily games and unlimited games."
  />
</svelte:head>

<h1>The Dles</h1>
<p>"...they're anything but."</p>
<p>A filterable collection of free web games, created by @aukspot.</p>
<div class="divider"></div>
<Filters />
{#if hasFilters}
  <button id="clearFiltersButton" on:click={clearFilters}>Clear filters</button>
{/if}
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
    margin-bottom: 0;
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

  #clearFiltersButton {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    margin-top: 0.5rem;
  }

  .divider {
    border-top: 1px solid darkgray;
    margin-bottom: 0.5rem;
  }
</style>
