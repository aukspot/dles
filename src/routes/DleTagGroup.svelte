<script>
  import DleTag from "./DleTag.svelte";

  export let tags;
</script>

<div>
  {#each tags as name}
    <DleTag {name}></DleTag>
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
