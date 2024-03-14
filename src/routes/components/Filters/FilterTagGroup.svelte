<script>
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import FilterTag from "./FilterTag.svelte";

  export let tags;
  export let type;
  export let inDropdown;
</script>

<div class="flex justify-center">
  {#if tags.length == 0}
    <div id="none">
      {#if inDropdown}
        No tags remaining
      {/if}
    </div>
  {:else}
    {#each tags as name, i (i)}
      <div animate:flip={{ duration: 300, easing: quintOut }}>
        <FilterTag {name} {type}></FilterTag>
      </div>
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
  #none {
    font-size: 0.9rem;
    /* padding: 0.28rem 0; */
  }
</style>
