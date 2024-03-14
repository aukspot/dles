<script>
  import FiltersDropdown from "./FiltersDropdown.svelte"
  import FilterTagGroup from "./FilterTagGroup.svelte"
  import { tagNames, tags } from "../../../stores"

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included)
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded)
  $: numFilters = includedTags.length + excludedTags.length
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
      checked
    />
    <label class="radioLabel" for="includeFilter">include</label>
    <input
      class="radioInput"
      type="radio"
      name="filterChoice"
      value="exclude"
      id="excludeFilter"
    />
    <label class="radioLabel" for="excludeFilter">exclude</label>
  </div>
</div>
<!-- <FilterTagGroup tags={includedTags} type="include" inDropdown={false} /> -->
<FiltersDropdown type="include" />

<!-- 
    <div style="background-color: darkgray; width: 2px;"></div>

    <div class="filterSection">
      <div id="excludeLabel" class="font-semibold text-sm filterLabel">
        exclude
      </div>
      <FilterTagGroup tags={excludedTags} type="exclude" inDropdown={false} />

      <div id="excludedTagsList" class="tagsList">
        <FiltersDropdown type="exclude" />
      </div>
    </div> -->

<style lang="postcss">
  .radioInput {
    @apply w-0 h-0 absolute left-96;
    &:checked + label {
      @apply bg-colorTextSoft text-colorBackground transition-all duration-500 ease-in-out;
    }
    &:not(:checked) + label {
      @apply bg-colorBackground text-colorTextSoft;
    }
  }
  .radioLabel {
    @apply m-0 py-1 px-2 box-border relative inline-block border-y border-r border-colorNeutral bg-colorBackground text-center text-sm cursor-pointer unselectable;
    &:nth-of-type(1) {
      @apply rounded-l border-l;
    }
    &:nth-of-type(2) {
      @apply rounded-r;
    }
  }
</style>
