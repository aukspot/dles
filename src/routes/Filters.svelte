<script>
  import DropdownInclude from "./DropdownInclude.svelte";
  import DropdownExclude from "./DropdownExclude.svelte";
</script>

<details id="filterDetails" style="padding: 0.25rem" open>
  <summary
    class="not-selectable pointer"
    style="margin-bottom: 0.75rem; text-align: center; cursor: pointer"
  >
    Filters
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
        <DropdownInclude />
      </div>
    </div>

    <div style="background-color: darkgray; width: 2px;"></div>

    <div style="display: flex; flex-direction: column;">
      <div id="excludeLabel" class="filterLabel">
        <strong>exclude</strong>
      </div>
      <div id="includedTagsList" class="tagsList">
        <DropdownExclude />
      </div>
    </div>
  </div>
</details>

<style>
  details[open] {
    margin: auto;
    padding: 1rem;
  }
  .tagsList {
    display: flex;
    row-gap: 0.25rem;
    column-gap: 0.5rem;
    flex-wrap: wrap;
    line-height: 1.2;
  }
  #includeLabel {
    display: flex;
    justify-content: end;
  }
</style>
