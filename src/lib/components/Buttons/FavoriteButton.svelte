<script>
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { favorites } from "$lib/stores"
  import { onMount } from "svelte"
  import IconFavorite from "../Icons/IconFavorite.svelte"

  export let dle

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
    if (inFavorites(dle)) {
      removeFromFavorites(dle)
      favoriteFill = unFavoriteColor
    } else {
      $favorites = [...$favorites, dle]
      favoriteFill = favoriteColor
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
