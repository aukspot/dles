<script>
  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { filteredDles, tagNames, tags } from "../stores";

  export let type;

  let tagsOnPage = [];
  let dropdownTags = [];
  $: {
    tagsOnPage = $filteredDles
      .map((dle) => dle.tags)
      .flat()
      .filter((x, i, a) => a.indexOf(x) == i)
      .sort();
  }
  $: {
    if (type == "include") {
      dropdownTags = tagsOnPage.filter((tagName) => !$tags[tagName].included);
    } else {
      dropdownTags = tagsOnPage.filter((tagName) => !$tags[tagName].excluded);
    }
  }
</script>

<div class="dropdownContainer">
  <label for="checkbox-{type}" class="not-selectable pointer addButton">
    <div class="plusButton">+ add tag</div>
  </label>
  <input id="checkbox-{type}" class="filterCheckbox" type="checkbox" />
  <div id="includedTagsChoices" class="dropdown">
    <FilterTagGroup tags={dropdownTags} {type} />
  </div>
</div>

<style>
  .filterCheckbox {
    display: none;
  }
  .filterCheckbox:checked + div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 50%;
    justify-content: center;
    padding: 0.5rem;
  }
  /* .dropdownContainer { */
  /* position: relative; */
  /* } */
  :global(.dropdown) {
    display: none;
    list-style: none;
    width: 30rem;
  }
  .dropdown {
    /* display: flex; */
    padding-left: 0.5rem;
    position: absolute;
    width: 100px;
    background-color: var(--color-bg);
    /* margin: 0; */
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  }
</style>
