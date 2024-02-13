<script>
  import FilterTag from "./FilterTag.svelte";

  export let tags;
  export let type;
  export let inDropdown;
</script>

<div class="filterTags-{type}">
  {#if tags.length == 0}
    <div id="none">
      {#if inDropdown}
        No tags remaining
      {/if}
    </div>
  {:else}
    {#each tags as name}
      <FilterTag {name} {type} {inDropdown}></FilterTag>
    {/each}
  {/if}
</div>

<style>
  div {
    display: flex;
    row-gap: 0.25rem;
    column-gap: 0.5rem;
    flex-wrap: wrap;
    line-height: 1.2;
  }
  .filterTags-include {
    justify-content: end;
  }
  #none {
    font-size: 0.9rem;
    /* padding: 0.28rem 0; */
  }
</style>
