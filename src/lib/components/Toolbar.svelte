<script>
  import { settings, toolbarSelection } from "$lib/stores"
  import FilterButton from "$lib/components/Buttons/IconButtons/FilterButton.svelte"
  import SettingsButton from "./Buttons/IconButtons/SettingsButton.svelte"
  import Filters from "./Filters/Filters.svelte"
  import Random from "./Random.svelte"
  import Settings from "./Settings.svelte"
  import PlayRandomButton from "./Buttons/PlayRandomButton.svelte"

  $settings.test = true
</script>

<div class="flex">
  <PlayRandomButton />
  <!-- <FilterButton /> -->
  <SettingsButton />
  <!-- <SearchButton /> -->
</div>
<noscript class="text-center"
  >JavaScript is required to use the toolbar or change the theme.</noscript
>
<!-- <div> -->
<!-- <div class={$toolbarSelection === "Random" ? "" : "hidden"}> -->
<!-- <Random /> -->
<!-- </div> -->
<!-- <div class={$toolbarSelection === "Filter" ? "" : "hidden"}> -->
<!-- <Filters /> -->
<!-- </div> -->
<!-- <div class={$toolbarSelection === "Settings" ? "" : "hidden"}> -->
<Settings />
<!-- </div> -->
<!-- <div class={$toolbarSelection === "Search" ? "" : "hidden"}>Search</div> -->
<!-- </div> -->
