<script>
  import FiltersDropdown from "./FiltersDropdown.svelte"
  import FilterTagGroup from "./FilterTagGroup.svelte"
  import { tagNames, tags } from "../../../stores"

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included)
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded)
  $: hasFilters = includedTags.length > 0 || excludedTags.length > 0

  let filterChoice = "include"

  function clearFilters() {
    for (let includedTag of includedTags) {
      $tags[includedTag].included = false
    }
    for (let excludedTag of excludedTags) {
      $tags[excludedTag].excluded = false
    }
  }
</script>

<div class="flex justify-center items-center mt-2 gap-2 text-sm">
  Select tags to:
  <div class="flex flex-nowrap box-border text-[0] justify-start items-stretch">
    <input
      class="radioInput"
      type="radio"
      name="filterChoice"
      value="include"
      id="includeFilter"
      bind:group={filterChoice}
    />
    <label class="radioLabel unselectable" for="includeFilter">include</label>
    <input
      class="radioInput"
      type="radio"
      name="filterChoice"
      value="exclude"
      id="excludeFilter"
      bind:group={filterChoice}
    />
    <label class="radioLabel unselectable" for="excludeFilter">exclude</label>
  </div>
</div>
<FiltersDropdown type={filterChoice} />
<div class="flex justify-center items-center">
  <button
    id="clearFiltersButton"
    class="btn text-xs py-2 px-3 mt-3 mx-auto min-w-28"
    on:click={clearFilters}
    style="display:{hasFilters ? 'unset' : 'none'}">Clear filters</button
  >
</div>

<style lang="postcss">
  .radioInput {
    @apply w-0 h-0 hidden;
    &:checked + label {
      @apply bg-colorTextSoft text-colorBackground transition-all duration-500 ease-in-out;
    }
    &:not(:checked) + label {
      @apply bg-colorBackground text-colorTextSoft;
    }
  }
  .radioLabel {
    @apply m-0 py-1 px-2 box-border relative inline-block border-y border-r border-colorNeutral bg-colorBackground text-center text-sm cursor-pointer;
    &:nth-of-type(1) {
      @apply rounded-l border-l;
    }
    &:nth-of-type(2) {
      @apply rounded-r;
    }
  }
</style>
