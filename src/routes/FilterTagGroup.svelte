<script>
  import FilterTag from "./FilterTag.svelte";

  export let tags;
  export let type;
</script>

<div>
  {#each tags as name}
    <FilterTag {name} {type}></FilterTag>
  {/each}
</div>

<style>
  div {
    display: flex;
    row-gap: 0.25rem;
    column-gap: 0.5rem;
    flex-wrap: wrap;
    line-height: 1.2;
  }
</style>
