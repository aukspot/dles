<script>
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { favorites } from "$lib/stores"
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
    for (let favorite of $favorites) {
      if (dle.name === favorite.name) {
        return true
      }
    }
    return false
  }

  function setFill() {
    if (inFavorites(dle)) {
      favoriteFill = favoriteColor
    } else {
      favoriteFill = unFavoriteColor
    }
  }

  function removeFromFavorites(dle) {
    $favorites = $favorites.filter((d) => d.name !== dle.name)
  }

  function toggleFavorite() {
    const wasInFavorites = inFavorites(dle)

    if (wasInFavorites) {
      removeFromFavorites(dle)
      favoriteFill = unFavoriteColor
    } else {
      $favorites = [...$favorites, dle]
      favoriteFill = favoriteColor
    }

    if (typeof window !== 'undefined' && window.umami) {
      const trackingData = createTrackingData(dle, wasInFavorites ? 'unfavorite' : 'favorite', 'button', section, position);
      trackingData.total_favorites = $favorites.length;
      trackingData.action = wasInFavorites ? 'unfavorite' : 'favorite';

      trackEvent('favorite-action', trackingData, `FavoriteButton ${trackingData.action}`);
    }

    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify($favorites)
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
