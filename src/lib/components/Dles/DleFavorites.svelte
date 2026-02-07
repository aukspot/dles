<script>
  import { favorites } from "$lib/stores"
  import { onMount } from "svelte"
  import FavoritesList from "./FavoritesList.svelte"

  let loading = true

  onMount(() => {
    loading = false
  })
</script>

{#if !loading}
  <div class="favorites-container">
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
      <div class="header-spacer"></div>
    </div>

    <FavoritesList section="favorites-page" showCategory={true} />
  </div>
{:else}
  <div class="loading-container">
    <p class="loading-text">Loading...</p>
  </div>
{/if}

<style lang="postcss">
  .favorites-container {
    @apply max-w-lg mx-auto px-3 py-4;
  }

  .favorites-header {
    @apply flex items-center justify-between gap-2 mb-4;
  }

  .header-center {
    @apply flex items-center justify-center gap-2;
  }

  .header-spacer {
    @apply w-6;
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
    @apply text-center py-12 px-4;
  }

  .loading-text {
    @apply text-colorTextSoft text-lg uppercase tracking-wide;
  }
</style>
