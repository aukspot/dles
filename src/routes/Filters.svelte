<script>
  import Dropdown from "./Dropdown.svelte";
  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { tagNames, tags } from "../stores";

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included);
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded);
  $: numFilters = includedTags.length + excludedTags.length;
</script>

<div class="mb-3 text-center cursor-pointer not-selectable pointer">
  Filters {#if numFilters > 0}
    ({numFilters})
  {/if}
</div>
<div id="filtersContainer" class="flex wrap gap-x-4 gap-y-2 leading-4">
  <div class="filterSection">
    <!-- <FilterTagGroup tags={includedTags} type="include" inDropdown={false} /> -->
    <Dropdown type="include" />

    <div id="includedTagsList" class="tagsList"></div>
  </div>
  <!-- 
    <div style="background-color: darkgray; width: 2px;"></div>

    <div class="filterSection">
      <div id="excludeLabel" class="font-semibold text-sm filterLabel">
        exclude
      </div>
      <FilterTagGroup tags={excludedTags} type="exclude" inDropdown={false} />

      <div id="excludedTagsList" class="tagsList">
        <Dropdown type="exclude" />
      </div>
    </div> -->
</div>

<style>
  .filterLabel {
    font-size: 1.1rem;
  }
  .filterSection {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
