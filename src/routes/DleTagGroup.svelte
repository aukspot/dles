<script>
  import FilterTag from "./FilterTag.svelte"
  export let tags
</script>

<div class="flex gap-x-1 gap-y-2 flex-wrap leading-5">
  {#each tags as name}
    <FilterTag {name} type="include"></FilterTag>
  {/each}
</div>
