<script>
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { favorites } from "$lib/stores"
  import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"
  import { onMount } from "svelte"
  import IconFavorite from "../Icons/IconFavorite.svelte"

  export let dle
  export let size = "normal" // "normal" or "small"
  export let section = 'regular'
  export let position = null


  let favoriteFill
  let favoriteColor = "rgb(var(--colors-colorTextSofter))"
  let unFavoriteColor = "transparent"

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
  class="stroke-colorTextSofter transition-colors duration-200 hover:scale-105 active:stroke-2 flex items-center justify-center"
  class:small={size === "small"}
>
  <IconFavorite /></button
>

<style lang="postcss">
  .small {
    @apply h-6 w-8 min-h-0;
  }

  .small :global(svg) {
    @apply w-6 h-6;
  }
</style>
