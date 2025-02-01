<script>
  import { searchQuery, filteredDles, dles } from "$lib/stores"
  import { slide } from "svelte/transition"
</script>

<input
  type="text"
  placeholder="Search..."
  class="search-bar"
  bind:value={$searchQuery}
  on:input={() => {
    $filteredDles = $dles.filter((dle) => {
      return dle.name.toLowerCase().includes($searchQuery.toLowerCase())
    })
  }}
  transition:slide
/>

<style lang="postcss">
  .search-bar {
    @apply w-[90%] lg:w-[80%] h-10;
  }
</style>
