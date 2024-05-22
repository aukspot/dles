<script>
  import { base } from "$app/paths"
  import { dles, filteredDles, numColumns, tagNames, tags } from "$lib/stores"
  import dles_json from "$lib/data/dles.json"

  import DleCard from "$lib/components/Dles/DleCard.svelte"
  import FilterTagGroup from "$lib/components/Filters/FilterTagGroup.svelte"
  import Toolbar from "$lib/components/Toolbar.svelte"

  import { flip } from "svelte/animate"
  import { quintOut } from "svelte/easing"

  const categories = [
    "Geography/History",
    "Math/Logic",
    "Miscellaneous",
    "Movies",
    "Music",
    "Prices",
    "Sports",
    "Trivia",
    "Video Games",
    "Words",
  ]

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

  let categorizedDles = {}
  for (let category of categories) {
    categorizedDles[category] = $filteredDles.filter(dle => dle.category == category)
  }

  $: {
    for (let category of categories) {
      categorizedDles[category] = $filteredDles.filter(dle => dle.category == category)
    }
  }

</script>

<div
  class="mt-3 pt-3 pb-1 border border-colorNeutral leading-6 align-middle font-mono rounded text-center text-2xl shadow-sm shadow-colorNeutralSoft md:text-3xl"
>
  <strong>{$filteredDles.length}</strong>
  {$filteredDles.length != 1 ? "dles" : "dle"}
  {#if includedTags.length > 0}
    <div class="mt-1 text-sm md:text-base">
      {$filteredDles.length != 1 ? "have" : "has"} the {includedTags.length > 1
        ? "tags"
        : "tag"}
      <FilterTagGroup tags={includedTags} type="include" inDropdown={false} />
    </div>
  {/if}
  <div class="mt-1 text-sm md:text-base">
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

<!-- <ol class="mt-2 gap-2 grid grid-cols-1 lg:grid-cols-2"> -->
  <!-- {#each $filteredDles as dle, i (i)} -->
    <!-- <li animate:flip={{ duration: 100, easing: quintOut }}> -->
      <!-- <DleCard {dle} i={i + 1}></DleCard> -->
    <!-- </li> -->
    <!-- <DleCompactCard {dle} i={i + 1}></DleCompactCard> -->
  <!-- {/each} -->
<!-- </ol> -->

<!-- <div class="mt-4 flex flex-wrap flex-grow gap-2 justify-between"> -->
<div class="dlesContainer mt-4 grid grid-cols-2 gap-2 justify-between">
  {#each categories as category, i (i)}
    {#if categorizedDles[category].length != 0}
      <div class="py-2 rounded-lg bg-colorCardA">
        <div class="label">{category}</div>
        <div class="mb-4 dleList">
          <ol class="dleList">
            {#each categorizedDles[category] as dle, j (j)}
              <li class="dleName">
                <span class="unselectable">{j+1}. </span>
                <a href="{dle.url}">{dle.name}</a>
              </li>
            {/each}
          </ol> 
        </div>
      </div>
    {/if}
  {/each}
</div>

<style lang="postcss">
  .dlesContainer {
    grid-auto-columns: min-content;
  }
  .dleList {
    grid-auto-columns: min-content;
  }
  li {
    @apply p-1 [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }
  a {
    @apply text-base;
  }
  .label {
    @apply text-xl mb-2 text-center;
  }
  .dleName {
    @apply flex items-baseline align-top gap-1;
  }
  /* li {
    @apply flex [&:nth-child(odd)]:bg-colorCardA [&:nth-child(even)]:bg-colorCardB lg:[&:nth-child(odd)]:bg-colorCardA lg:[&:nth-child(even)]:bg-colorCardA;
  } */
</style>
