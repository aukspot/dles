<script>
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { favorites, favoriteIds } from "$lib/stores"
  import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"
  import { onMount } from "svelte"
  import IconFavoriteOutline from "../Icons/IconFavoriteOutline.svelte"
  import IconFavoriteRemove from "../Icons/IconFavoriteRemove.svelte"

  export let dle
  export let size = "normal" // "normal" or "small"
  export let section = 'regular'
  export let position = null


  let favoriteFill
  let favoriteColor = "rgb(var(--colors-colorTextSofter))"
  let unFavoriteColor = "transparent"
  let isHovered = false

  $: isFavorited = inFavorites(dle)
  $: {
    $favorites
    setFill()
  }

  onMount(() => {
    setFill()
  })

  function inFavorites(dle) {
    return $favoriteIds.includes(dle.id)
  }

  function setFill() {
    if (inFavorites(dle)) {
      favoriteFill = favoriteColor
    } else {
      favoriteFill = unFavoriteColor
    }
  }

  function removeFromFavorites(dle) {
    $favoriteIds = $favoriteIds.filter((id) => id !== dle.id)
  }

  function toggleFavorite() {
    const wasInFavorites = inFavorites(dle)

    if (wasInFavorites) {
      removeFromFavorites(dle)
      favoriteFill = unFavoriteColor
    } else {
      $favoriteIds = [...$favoriteIds, dle.id]
      favoriteFill = favoriteColor
    }

    if (typeof window !== 'undefined' && window.umami) {
      const trackingData = createTrackingData(dle, wasInFavorites ? 'unfavorite' : 'favorite', 'button', section, position);
      trackingData.total_favorites = $favoriteIds.length;
      trackingData.action = wasInFavorites ? 'unfavorite' : 'favorite';

      trackEvent('favorite-action', trackingData, `FavoriteButton ${trackingData.action}`);
    }

    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify($favoriteIds)
    }
  }
</script>

<button
  style="fill: {favoriteFill ?? 'transparent'};"
  on:click={toggleFavorite}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  class="hover:scale-105 flex items-center justify-center favorite-button"
  class:small={size === "small"}
  class:is-favorited={isFavorited}
  title={isFavorited ? "Remove from favorites" : "Add to favorites"}
>
  {#if isFavorited && isHovered}
    <IconFavoriteRemove />
  {:else}
    <IconFavoriteOutline />
  {/if}
</button
>

<style lang="postcss">
  .small {
    @apply h-6 w-8 min-h-0;
  }

  .small :global(svg) {
    @apply w-6 h-6;
  }
</style>
