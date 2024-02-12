<script>
  import FilterTagGroup from "./FilterTagGroup.svelte";
  import { allTags, includedTags } from "../stores";

  let tags = $allTags.filter((tag) => !$includedTags.includes(tag));
  console.log(tags);
  $includedTags.push("daily");
  console.log(tags);
</script>

<div class="dropdownContainer">
  <label for="checkboxInclude" class="not-selectable pointer addButton">
    <div class="plusButton">+ add tag</div>
  </label>
  <input id="checkboxInclude" class="filterCheckbox" type="checkbox" />
  <div id="includedTagsChoices" class="dropdown">
    <FilterTagGroup {tags} />
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
  .dropdownContainer {
    /* position: relative; */
  }
  :global(.dropdown) {
    display: none;
    list-style: none;
    width: 30rem;
  }
  .dropdown {
    padding-left: 0.5rem;
    position: absolute;
    width: 100px;
    background-color: white;
    margin: 0;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  }
</style>
