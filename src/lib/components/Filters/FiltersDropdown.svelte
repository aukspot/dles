<script>
  import FilterTagGroup from "$lib/components/Filters/FilterTagGroup.svelte";
  import { filteredDles, tags } from "$lib/stores";
  import { clickOutside } from "$lib/js/clickOutside.js";

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
<div class="w-full mt-2">
  <FilterTagGroup tags={dropdownTags} {type} inDropdown={true} />
</div>
