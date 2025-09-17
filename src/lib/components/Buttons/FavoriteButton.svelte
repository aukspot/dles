<script>
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { favorites } from "$lib/stores"
  import { onMount } from "svelte"
  import IconFavorite from "../Icons/IconFavorite.svelte"

  export let dle
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
      const trackingData = {
        game_name: dle.name,
        game_category: dle.category,
        game_id: dle.id,
        action: wasInFavorites ? 'unfavorite' : 'favorite',
        total_favorites: $favorites.length,
        section: section
      };

      if (position !== null && section === 'dles-of-the-week') {
        trackingData.position_id = `${section}-${position + 1}`;
      }

      window.umami.track('favorite-action', trackingData);
    }

    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify($favorites)
    }
  }
</script>

<button
  style="fill: {favoriteFill ?? 'transparent'};"
  on:click={toggleFavorite}
  class="stroke-colorTextSofter transition-colors duration-200 hover:scale-105 active:stroke-2"
>
  <IconFavorite /></button
>
