<script>
  import FilterButton from "./FilterButton.svelte";
  import RandomButton from "./RandomButton.svelte";
  import SearchButton from "./SearchButton.svelte";

  export let selection;
</script>

<div class="flex justify-center gap-3">
  <RandomButton selected={selection === "Random"} />
  <FilterButton selected={selection === "Filter"} />
  <SearchButton selected={selection === "Search"} />
</div>
