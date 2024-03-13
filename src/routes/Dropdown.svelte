<script>
  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { filteredDles, tags } from "../stores";
  import { clickOutside } from "./clickOutside.js";

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

  let checked = false;

  function handleClickOutsideDropdown(event) {
    if (event.target.classList.contains("filterButton")) {
      if (checked) {
        checked = false;
      }
    }
    checked = false;
  }
  function handleClickInsideDropdown(event) {
    if (event.target.classList.contains("filterTag")) {
      checked = false;
    }
  }
  function handleDocumentClick(event) {
    // if (!event.target.classList.contains(""))
  }
  function handleKeyUp(event) {
    if (event.key == "Escape") {
      checked = false;
    }
  }
</script>

<svelte:document on:keyup={handleKeyUp} on:click={handleDocumentClick} />
<div class="dropdownContainer">
  <FilterTagGroup tags={dropdownTags} {type} inDropdown={true} />
</div>

<style>
  .filterCheckbox {
    display: none;
  }
  .filterCheckbox:checked + div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    width: 200px;
    justify-content: center;
    padding: 0.75rem;
    top: 2.5rem;
    border-radius: 0.15rem;
  }

  #checkbox-include:checked + div {
    right: -0.82rem;
  }

  #checkbox-exclude:checked + div {
    left: -0.78rem;
  }

  :global(.dropdown) {
    /* display: none; */
    list-style: none;
    width: 30rem;
  }
  .dropdown {
    /* padding-left: 0.5rem; */
    /* position: absolute; */
    background-color: var(--color-bg);
    border: 1px solid var(--color-text);
    /* box-shadow: 1px 1px 6px 2px var(--color-text);
    -webkit-box-shadow: 1px 1px 6px 2px var(--color-text);
    -moz-box-shadow: 1px 1px 6px 2px var(--color-text); */
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media (max-width: 600px) {
    .filterCheckbox:checked + div {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      width: 150px;
      justify-content: center;
      padding: 0.75rem;
      top: 2.25rem;
    }
  }
</style>
