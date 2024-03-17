<script>
  import { toolbarSelection } from "../../stores"
  import FilterButton from "./Buttons/IconButtons/FilterButton.svelte"
  import RandomButton from "./Buttons/IconButtons/RandomButton.svelte"
  // import SearchButton from "./Buttons/IconButtons/SearchButton.svelte"

  import Filters from "./Filters/Filters.svelte"
  import Random from "./Random.svelte"
</script>

<div class="flex justify-center gap-3">
  <RandomButton />
  <FilterButton />
  <!-- <SearchButton /> -->
</div>
<div>
  <div class={$toolbarSelection === "Random" ? "" : "hidden"}>
    <Random />
  </div>
  <div class={$toolbarSelection === "Filter" ? "" : "hidden"}>
    <Filters />
  </div>
  <!-- <div class={$toolbarSelection === "Search" ? "" : "hidden"}>Search</div> -->
</div>
