<script>
  import { toolbarSelection } from "../stores";
  import FilterButton from "./components/Buttons/IconButtons/FilterButton.svelte";
  import RandomButton from "./components/Buttons/IconButtons/RandomButton.svelte";
  import SearchButton from "./components/Buttons/IconButtons/SearchButton.svelte";

  import Filters from "./components/Filters/Filters.svelte";
  import Random from "./components/Random.svelte";
</script>

<div class="flex justify-center gap-3">
  <RandomButton />
  <FilterButton />
  <SearchButton />
</div>
<div>
  <div class={$toolbarSelection === "Random" ? "" : "hidden"}>
    <Random />
  </div>
  <div class={$toolbarSelection === "Filter" ? "" : "hidden"}>
    <Filters />
  </div>
  <div class={$toolbarSelection === "Search" ? "" : "hidden"}>Search</div>
</div>
