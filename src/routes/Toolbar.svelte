<script>
  import FilterButton from "./components/Buttons/IconButtons/FilterButton.svelte"
  import RandomButton from "./components/Buttons/IconButtons/RandomButton.svelte"
  import SearchButton from "./components/Buttons/IconButtons/SearchButton.svelte"

  import Filters from "./components/Filters/Filters.svelte"

  export let selection
</script>

<div class="flex justify-center gap-3">
  <RandomButton selected={selection === "Random"} />
  <FilterButton selected={selection === "Filter"} />
  <SearchButton selected={selection === "Search"} />
</div>
<div>
  <Filters />
</div>
