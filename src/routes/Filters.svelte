<script>
  import Dropdown from "./Dropdown.svelte";
  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { tagNames, tags } from "../stores";

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included);
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded);
  $: numFilters = includedTags.length + excludedTags.length;
</script>

<details id="filterDetails" class="p-1 hidden">
  <summary class="mb-3 text-center cursor-pointer not-selectable pointer">
    Filters {#if numFilters > 0}
      ({numFilters})
    {/if}
  </summary>
  <div
    id="filtersContainer"
    class="flex wrap gap-x-4 gap-y-2 leading-4 min-h-20"
  >
    <div class="filterSection">
      <div id="includeLabel" class="filterLabel font-semibold text-sm">
        include
      </div>
      <FilterTagGroup tags={includedTags} type="include" inDropdown={false} />
      <div id="includedTagsList" class="tagsList">
        <Dropdown type="include" />
      </div>
    </div>

    <div style="background-color: darkgray; width: 2px;"></div>

    <div class="filterSection">
      <div id="excludeLabel" class="font-semibold text-sm filterLabel">
        exclude
      </div>
      <FilterTagGroup tags={excludedTags} type="exclude" inDropdown={false} />

      <div id="excludedTagsList" class="tagsList">
        <Dropdown type="exclude" />
      </div>
    </div>
  </div>
</details>

<style>
  details[open] {
    display: flex;
    margin: 0 auto;
    padding: 1rem;
  }
  .tagsList {
    display: flex;
    row-gap: 0.25rem;
    column-gap: 0.5rem;
    flex-wrap: wrap;
    line-height: 1.2;
  }
  .filterLabel {
    font-size: 1.1rem;
  }
  .filterSection {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 220px;
  }
  #filtersContainer {
    height: var(--filtersContainerHeight);
  }
  #includeLabel {
    display: flex;
    justify-content: flex-end;
  }
  #includedTagsList {
    position: relative;
    justify-content: flex-end;
  }
  #excludedTagsList {
    position: relative;
  }
  @media (max-width: 600px) {
    .filterSection {
      max-width: 140px;
    }
  }
</style>
