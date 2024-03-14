<script>
  import { base } from "$app/paths";
  import DleCard from "./DleCard.svelte";
  import dles_json from "../data/dles.json";

  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { dles, filteredDles, numColumns, tagNames, tags } from "../stores";
  import Toolbar from "./Toolbar.svelte";

  $: numColumnsCSS = `--num-columns: ${$numColumns} !important;`;

  $: {
    console.log($numColumns);
  }

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

<div
  class="mt-3 pt-2 pb-1 border border-colorNeutral leading-6 align-middle font-mono rounded text-center text-2xl shadow-sm shadow-colorNeutralSoft"
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
<Toolbar />
<!-- <Filters /> -->
<button
  id="clearFiltersButton"
  class="btn text-sm py-2 px-4 mt-2 mx-auto min-w-32"
  on:click={clearFilters}
  style="display:{hasFilters ? 'unset' : 'none'}">Clear filters</button
>

<ol class="mt-2 gap-2 grid grid-cols-1 lg:grid-cols-2">
  {#each $filteredDles as dle, i}
    <DleCard {dle} i={i + 1}></DleCard>
    <!-- <DleCompactCard {dle} i={i + 1}></DleCompactCard> -->
  {/each}
</ol>
