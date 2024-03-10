<script>
  import { base } from "$app/paths"
  import DleCard from "./DleCard.svelte"
  import dles_json from "../data/dles.json"
  import Filters from "./Filters.svelte"
  import FilterTagGroup from "./FilterTagGroup.svelte"
  import { dles, filteredDles, tagNames, tags } from "../stores"

  function initializeDles() {
    $dles = dles_json
    for (let dle of $dles) {
      dle.hidden = false
    }
  }

  function initializeTags() {
    $tagNames = $dles
      .map((dle) => dle.tags)
      .flat()
      .filter((x, i, a) => a.indexOf(x) == i)
      .sort()

    $tags = {}
    for (let tag_name of $tagNames) {
      $tags[tag_name] = {
        included: false,
        excluded: false,
      }
    }
  }

  initializeDles()
  initializeTags()

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included)
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded)

  $: hasFilters = includedTags.length > 0 || excludedTags.length > 0

  $: $filteredDles = $dles.filter((dle) => {
    let result = false
    if (includedTags.every((tag) => dle.tags.includes(tag))) {
      result = true
    }
    if (excludedTags.some((tag) => dle.tags.includes(tag))) {
      result = false
    }
    return result
  })

  function clearFilters() {
    for (let includedTag of includedTags) {
      $tags[includedTag].included = false
    }
    for (let excludedTag of excludedTags) {
      $tags[excludedTag].excluded = false
    }
  }
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

<p class="text-sm mt-3 text-center">
  <a href="{base}/suggest" style="text-align: center;">Suggest a game to add!</a
  >
</p>

<!-- <details>
  <summary>What is a "dle"?</summary>
  <p>
    A dle is generally a game that changes everyday which has the same version
    for everyone that plays, taking inspiration from Wor<u>dle</u>.
  </p>
</details> -->
<!-- <div class="divider"></div> -->

<div
  class="mt-3 pt-2 pb-1 border border-slate-500 leading-6 align-middle font-mono text-center text-2xl shadow-md"
>
  <strong>{$filteredDles.length}</strong>
  {$filteredDles.length != 1 ? "dles" : "dle"}
  {#if includedTags.length > 0}
    <div class="text-sm">
      {$filteredDles.length != 1 ? "have" : "has"} the {includedTags.length > 1
        ? "tags"
        : "tag"}
      <FilterTagGroup tags={includedTags} type="include" inDropdown={false} />
    </div>
  {/if}
</div>
<Filters />
<button
  id="clearFiltersButton"
  class="btn text-sm py-2 px-4"
  on:click={clearFilters}
  style="display:{hasFilters ? 'unset' : 'none'}">Clear filters</button
>

<ol class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
  {#each $filteredDles as dle, i}
    <DleCard {dle} i={i + 1}></DleCard>
    <!-- <DleCompactCard {dle} i={i + 1}></DleCompactCard> -->
  {/each}
</ol>

<style lang="postcss">
  #clearFiltersButton {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    margin: 0 auto;
    margin-top: 0.35rem;
  }
</style>
