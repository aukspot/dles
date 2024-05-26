<script>
  import { flip } from "svelte/animate"
  import FilterTag from "$lib/components/Filters/FilterTag.svelte"
  export let tags
</script>

<div class="group">
  {#each tags as name, i (i)}
    <div animate:flip>
      <FilterTag {name}></FilterTag>
    </div>
  {/each}
</div>

<style lang="postcss">
  .group {
    @apply flex gap-x-1 gap-y-2 flex-wrap leading-5;
  }
</style>
