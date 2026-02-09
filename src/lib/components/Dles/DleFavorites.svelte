<script>
  import { favorites, favoritesView } from "$lib/stores"
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
    <a href="/" class="back-arrow" aria-label="Go back home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </a>
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
    <div class="loading-container">
      <span class="loading-text">LOADING</span>
    </div>
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

  .back-arrow {
    @apply w-6 h-6 text-colorTextSoft hover:text-colorText transition-colors;
  }

  .back-arrow svg {
    @apply w-full h-full;
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
