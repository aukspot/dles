<script>
  import { base } from "$app/paths";
  import {
    dles,
    filteredDles,
    numColumns,
    tagNames,
    tags,
  } from "../../../stores";
  import dles_json from "$lib/data/dles.json";

  import DleCard from "./DleCard.svelte";
  import Filters from "./../Filters/Filters.svelte";
  import FilterTagGroup from "./../Filters/FilterTagGroup.svelte";
  import Toolbar from "./../Toolbar.svelte";

  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  $: numColumnsCSS = `--num-columns: ${$numColumns} !important;`;

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
  <div class="text-sm">
    {#if excludedTags.length > 0}
      {#if includedTags.length > 0}
        but not the
      {:else}
        don't have the
      {/if}
      {excludedTags.length > 1 ? "tags" : "tag"}
    {/if}
    <FilterTagGroup tags={excludedTags} type="exclude" inDropdown={false} />
  </div>
</div>
<Toolbar />

<ol class="mt-2 gap-2 grid grid-cols-1 lg:grid-cols-2">
  {#each $filteredDles as dle, i (i)}
    <li
      animate:flip={{ duration: 100, easing: quintOut }}
      class="flex [&:nth-child(odd)]:bg-colorCardA [&:nth-child(even)]:bg-colorCardB lg:[&:nth-child(odd)]:bg-colorCardA lg:[&:nth-child(even)]:bg-colorCardA"
    >
      <DleCard {dle} i={i + 1}></DleCard>
    </li>
    <!-- <DleCompactCard {dle} i={i + 1}></DleCompactCard> -->
  {/each}
</ol>
