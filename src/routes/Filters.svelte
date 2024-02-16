<script>
  import Dropdown from "./Dropdown.svelte";
  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { tagNames, tags } from "../stores";

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included);
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded);
  $: numFilters = includedTags.length + excludedTags.length;
</script>

<details id="filterDetails" style="padding: 0.25rem" open>
  <summary
    class="not-selectable pointer"
    style="margin-bottom: 0.75rem; text-align: center; cursor: pointer; font-size: 1.2rem;"
  >
    Filters {#if numFilters > 0}
      ({numFilters})
    {/if}
  </summary>
  <div
    id="filtersContainer"
    style="
        display: flex;
        flex-wrap: wrap;
        column-gap: 1rem;
        row-gap: 0.5rem;
        line-height: 1;
        min-height: 5.2rem;
      "
  >
    <div class="filterSection">
      <div id="includeLabel" class="filterLabel">
        <strong>include</strong>
      </div>
      <FilterTagGroup tags={includedTags} type="include" inDropdown={false} />
      <div id="includedTagsList" class="tagsList">
        <Dropdown type="include" />
      </div>
    </div>

    <div style="background-color: darkgray; width: 2px;"></div>

    <div class="filterSection">
      <div id="excludeLabel" class="filterLabel">
        <strong>exclude</strong>
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
    justify-content: end;
  }
  #includedTagsList {
    position: relative;
    justify-content: end;
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
