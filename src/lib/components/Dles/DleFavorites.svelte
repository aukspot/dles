<script>
  import { favorites, favoritesView } from "$lib/stores"
  import BackArrow from "../Buttons/BackArrow.svelte"
  import FavoritesList from "./FavoritesList.svelte"
  import ViewModeToggle from "./ViewModeToggle.svelte"
  import { onMount } from "svelte"

  const { viewMode } = favoritesView
  let mounted = false

  onMount(() => {
    mounted = true
  })
</script>

<div class="favorites-container" class:wide={$viewMode === "grid"}>
  <div class="favorites-header">
    <BackArrow />
    <div class="header-center">
      <h2 class="favorites-title">Favorites</h2>
      {#if $favorites.length > 0}
        <span class="header-count">{$favorites.length} total</span>
      {/if}
    </div>
    {#if mounted}
      <ViewModeToggle showBadge={true} />
    {:else}
      <div class="toggle-placeholder"></div>
    {/if}
  </div>

  {#if !mounted}
    <div class="loading-container js-only">
      <span class="loading-text">LOADING</span>
    </div>
    <noscript>
      <p class="noscript-note">
        Favorites are stored in your browser, so this page needs JavaScript to
        show them.
      </p>
    </noscript>
  {:else}
    <FavoritesList
      section="favorites-page"
      showCategory={true}
      viewMode={$viewMode}
    />
  {/if}
</div>

<style lang="postcss">
  .favorites-container {
    @apply max-w-lg mx-auto px-3 py-4 transition-all duration-200;
  }

  .noscript-note {
    @apply text-center text-sm text-colorTextSoft px-4;
  }

  .favorites-container.wide {
    @apply max-w-4xl;
  }

  .favorites-header {
    @apply flex items-center justify-between gap-2 mb-4;
  }

  .header-center {
    @apply flex items-center justify-center gap-2;
  }

  .toggle-placeholder {
    @apply w-5 h-5;
  }

  .favorites-title {
    @apply text-xl font-bold text-colorText m-0;
  }

  .header-count {
    @apply text-sm text-colorTextSoft;
  }

  .loading-container {
    @apply flex justify-center py-12;
  }

  .loading-text {
    @apply text-sm font-mono text-colorTextSoft tracking-widest;
  }
</style>
