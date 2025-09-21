<script>
  import { onMount } from "svelte"
  import { useFavorites } from "$lib/composables/useFavorites.js"
  import { useTracking } from "$lib/composables/useTracking.js"
  import IconFavoriteOutline from "../Icons/IconFavoriteOutline.svelte"
  import IconFavoriteRemove from "../Icons/IconFavoriteRemove.svelte"

  export let dle
  export let size = "normal" // "normal" or "small"
  export let section = 'regular'
  export let position = null

  const favorites = useFavorites()
  const tracking = useTracking()

  let favoriteFill
  let favoriteColor = "rgb(var(--colors-colorTextSofter))"
  let unFavoriteColor = "transparent"
  let isHovered = false
  let isTouchDevice = false

  $: isFavorited = favorites.isFavorited(dle)
  $: setFill(isFavorited)

  onMount(() => {
    setFill(favorites.isFavorited(dle))

    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })

  function setFill(isFavorited) {
    favoriteFill = isFavorited ? favoriteColor : unFavoriteColor
  }

  function toggleFavorite() {
    const result = favorites.toggleFavorite(dle)

    if (result.success) {
      setFill(!result.wasInFavorites)

      tracking.trackFavoriteAction(
        dle,
        result.action,
        'button',
        section,
        position,
      )
    }
  }
</script>

<button
  style="fill: {favoriteFill ?? 'transparent'};"
  on:click={toggleFavorite}
  on:mouseenter={() => !isTouchDevice && (isHovered = true)}
  on:mouseleave={() => isHovered = false}
  class="hover:scale-105 flex items-center justify-center favorite-button"
  class:small={size === "small"}
  class:is-favorited={isFavorited}
  title={isFavorited ? "Remove from favorites" : "Add to favorites"}
>
  {#if isFavorited && isHovered && !isTouchDevice}
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
