<script>
  import FilterTag from "./FilterTag.svelte";

  export let tags;
  export let type;
  export let inDropdown;
</script>

<div
  class="filterTags-{type} flex gap-x-1 gap-y-2 flex-wrap leading-5 justify-center"
>
  {#if tags.length == 0}
    <div id="none">
      {#if inDropdown}
        No tags remaining
      {/if}
    </div>
  {:else}
    {#each tags as name}
      <FilterTag {name} {type}></FilterTag>
    {/each}
  {/if}
</div>

<style>
  #none {
    font-size: 0.9rem;
    /* padding: 0.28rem 0; */
  }
</style>
