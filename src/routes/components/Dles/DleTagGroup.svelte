<script>
  import {flip} from "svelte/animate"
  import FilterTag from "./../Filters/FilterTag.svelte"
  export let tags
</script>

<div class="flex gap-x-1 gap-y-2 flex-wrap leading-5">
  {#each tags as name, i (i)}
  <div animate:flip>
    <FilterTag {name} type="include"></FilterTag>
  </div>
  {/each}
</div>
