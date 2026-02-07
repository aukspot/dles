<script>
  import {
    poppedUpDle,
    playedDleIdsSet,
    showMarkedDlesModal,
  } from "$lib/stores"
  import { toasts, toastName } from "$lib/stores/toastStore.js"
  import { useTracking } from "$lib/composables/useTracking.js"
  import { usePlayedDles } from "$lib/composables/usePlayedDles.js"
  import IconClose from "../Icons/IconClose.svelte"
  import IconCheck from "../Icons/IconCheck.svelte"
  import DleFavorite from "../Buttons/FavoriteButton.svelte"
  import HideButton from "../Buttons/HideButton.svelte"
  import { clickOutside } from "$lib/js/clickOutside"
  import { onMount } from "svelte"
  import {
    computePosition,
    offset,
    flip,
    shift,
    autoUpdate,
  } from "svelte-floating-ui/dom"

  export let dle, handleClickOutside, referenceEl
  export let section = "regular"
  export let position = null

  const tracking = useTracking()
  const playedDles = usePlayedDles()
  let popupEl
  let cleanup

  function trackGameClick(dle, clickType) {
    if (section === "sponsors") {
      tracking.trackSponsorClick(dle, clickType, position)
    } else {
      tracking.trackGameClick(dle, clickType, "popup", section, position)
    }
    // Auto-mark as played when clicking the link
    playedDles.markAsPlayed(dle)
  }

  onMount(() => {
    if (referenceEl && popupEl) {
      cleanup = autoUpdate(referenceEl, popupEl, () => {
        computePosition(referenceEl, popupEl, {
          placement: "top",
          middleware: [offset(-10), flip(), shift({ padding: 10 })],
        }).then(({ x, y }) => {
          Object.assign(popupEl.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        })
      })
    }

    return () => {
      if (cleanup) cleanup()
    }
  })

  function closePopup() {
    $poppedUpDle = ""
  }

  function togglePlayed() {
    if ($playedDleIdsSet.has(dle.id)) {
      playedDles.unmarkAsPlayed(dle)
      toasts.show(`${toastName(dle.name)} marked as not played`, {
        duration: 5000,
        actions: [
          {
            label: "Undo",
            onClick: () => {
              playedDles.markAsPlayed(dle, true)
            },
          },
          {
            label: "Manage",
            onClick: () => {
              $showMarkedDlesModal = true
            },
          },
        ],
      })
    } else {
      // Directly mark without checking autoMarkPlayed setting
      playedDles.markAsPlayed(dle, true)
      toasts.show(`${toastName(dle.name)} marked as played`, {
        duration: 5000,
        actions: [
          {
            label: "Undo",
            onClick: () => {
              playedDles.unmarkAsPlayed(dle)
            },
          },
          {
            label: "Manage",
            onClick: () => {
              $showMarkedDlesModal = true
            },
          },
        ],
      })
    }
  }

  $: isPlayed = $playedDleIdsSet.has(dle.id)
</script>

<div
  class="dlePopUp bevel"
  bind:this={popupEl}
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <div class="header-row">
    <DleFavorite {dle} {section} {position} />

    <div class="text-center text-xl font-bold flex-1">
      {dle.name}
    </div>
    <button class="close-btn" on:click={closePopup}>
      <IconClose />
    </button>
  </div>

  <div class="text-center text-base text-colorTextSoft px-6">
    {dle.description}
  </div>

  <div class="url-row">
    <div class="hide-btn-container">
      <HideButton {dle} />
    </div>
    <a
      href={dle.url}
      target="_blank"
      on:click={() => trackGameClick(dle, "popup-link")}
      on:auxclick={() => trackGameClick(dle, "popup-middle-click")}
      on:contextmenu={() => trackGameClick(dle, "popup-context-menu")}
    >
      {dle.url}
    </a>
    <button
      class="played-btn"
      class:checked={isPlayed}
      on:click={togglePlayed}
      title={isPlayed ? "Mark as not played" : "Mark as played"}
    >
      <IconCheck />
    </button>
  </div>
</div>

<style lang="postcss">
  .dlePopUp {
    @apply absolute p-3 flex flex-col gap-3.5 bg-colorCardC rounded-sm shadow-md shadow-colorTextSoftest z-50 dark:shadow-sm;
    width: 21.5rem;
    top: 0;
    left: 0;
  }

  .header-row {
    @apply flex items-start gap-2;
  }

  .close-btn {
    @apply flex-shrink-0;
  }

  .url-row {
    @apply flex items-center gap-2;
  }

  .hide-btn-container {
    @apply flex-shrink-0 flex items-center justify-center;
    width: 28px;
  }

  a {
    @apply text-center text-base underline break-words flex-1;
  }

  .played-btn {
    @apply flex-shrink-0 flex items-center justify-center
           border border-colorTextSoftest shadow-sm shadow-colorTextSofter rounded
           bg-transparent transition-all cursor-pointer;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.2rem;
  }

  .played-btn :global(svg) {
    @apply w-full h-full stroke-colorTextSofter opacity-40 transition-opacity;
  }

  .played-btn:hover {
    @apply scale-105;
  }

  .played-btn:hover :global(svg) {
    @apply opacity-60;
  }

  .played-btn:active {
    @apply shadow-none;
  }

  .played-btn.checked {
    @apply bg-colorTextSofter border-zinc-500;
  }

  .played-btn.checked :global(svg) {
    @apply stroke-white opacity-100;
  }
</style>
