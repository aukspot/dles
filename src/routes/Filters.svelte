<script>
  import Dropdown from "./Dropdown.svelte";

  export let tags = ["daily", "music"];
</script>

<details id="filterDetails" style="padding: 0.25rem" open>
  <summary class="not-selectable pointer" style="margin-bottom: 0.75rem">
    Filters (Work in progress)
  </summary>
  <div
    style="
        display: flex;
        flex-wrap: wrap;
        column-gap: 1rem;
        row-gap: 0.5rem;
        line-height: 1;
      "
  >
    <div style="display: flex; flex-direction: column;">
      <div id="includeLabel" class="filterLabel">
        <strong>include</strong>
      </div>
      <div id="includedTagsList" class="tagsList">
        <Dropdown {tags} />
      </div>
    </div>
    <div style="display: flex; flex-direction: column;">
      <div id="excludeLabel" class="filterLabel">
        <strong>exclude</strong>
      </div>
      <div id="includedTagsList" class="tagsList">
        <Dropdown {tags} />
      </div>
    </div>
  </div>
</details>

<style>
  details {
    width: 80%;
    margin: auto;
  }
  .tagsList {
    display: flex;
    row-gap: 0.25rem;
    column-gap: 0.5rem;
    flex-wrap: wrap;
    line-height: 1.2;
  }
</style>
