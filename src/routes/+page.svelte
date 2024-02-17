<script>
  import { base } from "$app/paths";
  import DleCard from "./DleCard.svelte";
  import dles_json from "../data/dles.json";
  import Filters from "./Filters.svelte";
  import { dles, filteredDles, tagNames, tags } from "../stores";
  // import DleSuggestionForm from "$lib/dleSuggestionForm.svelte";
  // import { onMount } from "svelte";
  // import supabase from "$lib/supabaseClient";

  // onMount(() => {
  //   const { data, error } = supabase
  //     .from("DleSuggestion")
  //     .insert({ dle_name: "hocus pocus" });
  //   console.log(data, error);
  // });

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
    content="A curated collection of free daily games."
  />
  <meta
    name="keywords"
    content="list, collection, links, games, daily, dles, wordle"
  />
  <meta name="author" content="aukspot" />
</svelte:head>

<h1>The Dles</h1>
<!-- <p>"...they're anything but."</p> -->
<p>A curated collection of daily games.</p>
<p>
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

<h2 class="banner">
  {$filteredDles.length} dles
</h2>
<Filters />
<button
  id="clearFiltersButton"
  class="filterButton"
  on:click={clearFilters}
  style="display:{hasFilters ? 'unset' : 'none'}">Clear filters</button
>

<ol>
  {#each $filteredDles as dle, i}
    <DleCard {dle} i={i + 1}></DleCard>
  {/each}
</ol>

<style>
  h1 {
    font-family: var(--font-mono);
    margin: 0.75rem;
  }
  h1,
  h2,
  p {
    text-align: center;
    text-wrap: balance;
  }

  h2 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    /* text-decoration: underline; */
  }

  p {
    margin: 0.5rem 0 0 0;
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
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    margin: 0 auto;
    margin-top: 0.35rem;
  }
</style>
