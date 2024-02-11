<script>
  import FilterTagGroup from "./FilterTagGroup.svelte";
  export let tags;
</script>

<div class="dropdownContainer">
  <label for="checkbox" class="not-selectable pointer addButton">
    <div class="plusButton">+ add tag</div>
  </label>
  <input id="checkbox" class="filterCheckbox" type="checkbox" />
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
  .plusButton {
    background-color: var(--color-card-bg-1);
    border-color: darkgray;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
  }
  .dropdownContainer {
    position: relative;
  }
  .dropdown {
    display: none;
    list-style: none;
    padding-left: 0.5rem;
    position: absolute;
    /* width: 60%; */
    background-color: white;
    margin: 0;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.75);
  }
</style>
