<script>
  import { settings, toolbarSelection } from "$lib/stores"
  import Settings from "./Settings.svelte"
  import MenuRandomButton from "./Buttons/MenuRandomButton.svelte"
  import MenuButton from "./Buttons/MenuButton.svelte"
  import DailyDleButton from "./Buttons/DailyDleButton.svelte";
  $settings.test = true
</script>

<div>
  <div class="flex gap-2">
    <MenuRandomButton />
    <!-- <FilterButton /> -->
    <MenuButton />
    <DailyDleButton />
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

  <div class={$toolbarSelection === "Settings" ? "absolute" : "hidden"}>
    <Settings />
  </div>
</div>

<!-- <div class={$toolbarSelection === "Search" ? "" : "hidden"}>Search</div> -->
<!-- </div> -->

<style>
</style>
