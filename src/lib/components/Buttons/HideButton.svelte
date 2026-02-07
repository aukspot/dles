<script>
  import { onMount } from "svelte"
  import {
    hiddenDleIds,
    poppedUpDle,
    favoriteIds,
    showHiddenDlesModal,
  } from "$lib/stores"
  import { useHiddenDles } from "$lib/composables/useHiddenDles.js"
  import { useFavorites } from "$lib/composables/useFavorites.js"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { toasts, toastName } from "$lib/stores/toastStore.js"
  import IconEye from "../Icons/IconEye.svelte"
  import IconEyeSlash from "../Icons/IconEyeSlash.svelte"
  import HideConfirmModal from "../Dles/HideConfirmModal.svelte"

  export let dle
  export let size = "normal" // "normal" or "small"

  const hiddenDles = useHiddenDles()
  const favoritesComposable = useFavorites()

  let isHovered = false
  let isTouchDevice = false
  let showConfirmModal = false
  let hasHiddenBefore = false

  // Use reactive store subscription instead of composable getter
  $: isHidden = $hiddenDleIds.includes(dle.id)
  $: isFavorited = $favoriteIds.includes(dle.id)

  onMount(() => {
    isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isLocalStorageAvailable()) {
      hasHiddenBefore = localStorage.getItem("hasHiddenDle") === "true"
    }
  })

  function toggleHidden() {
    // If unhiding, just do it
    if (isHidden) {
      hiddenDles.unhideDle(dle)
      return
    }

    // If first time hiding, show confirmation modal
    if (!hasHiddenBefore) {
      showConfirmModal = true
      return
    }

    performHide()
  }

  function performHide() {
    const result = hiddenDles.toggleHidden(dle)
    P
    if (result.success && result.action === "hide") {
      // Mark that user has hidden a dle before
      if (isLocalStorageAvailable()) {
        localStorage.setItem("hasHiddenDle", "true")
        hasHiddenBefore = true
      }

      // Show toast notification (favorites removal is handled in useHiddenDles)
      const message = result.wasFavorited
        ? `${toastName(dle.name)} hidden and removed from favorites`
        : `${toastName(dle.name)} hidden`

      const previousFavoriteIndex = result.previousFavoriteIndex
      toasts.show(message, {
        type: "info",
        duration: 5000,
        actions: [
          {
            label: "Undo",
            onClick: () => {
              hiddenDles.unhideDle(dle)
              if (result.wasFavorited) {
                favoritesComposable.insertFavoriteAt(dle, previousFavoriteIndex)
              }
            },
          },
          {
            label: "Manage",
            onClick: () => {
              $showHiddenDlesModal = true
            },
          },
        ],
      })

      // Close the popup after hiding
      $poppedUpDle = ""
    }
  }

  function handleConfirm() {
    showConfirmModal = false
    performHide()
  }

  function handleCancel() {
    showConfirmModal = false
  }
</script>

<button
  on:click={toggleHidden}
  on:mouseenter={() => !isTouchDevice && (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  class="hover:scale-105 flex items-center justify-center hide-button"
  class:small={size === "small"}
  class:is-hidden={isHidden}
  title={isHidden ? "Unhide dle" : "Hide dle"}
>
  {#if isHidden}
    <IconEye />
  {:else}
    <IconEyeSlash />
  {/if}
</button>

{#if showConfirmModal}
  <HideConfirmModal
    dleName={dle.name}
    onConfirm={handleConfirm}
    onCancel={handleCancel}
  />
{/if}

<style lang="postcss">
  .hide-button {
    @apply text-colorTextSofter hover:text-colorText transition-colors;
  }

  .hide-button :global(svg) {
    @apply w-5 h-5;
  }

  .small {
    @apply h-6 w-8 min-h-0;
  }

  .small :global(svg) {
    @apply w-5 h-5;
  }
</style>
