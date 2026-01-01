<script>
  import { poppedUpDle } from "$lib/stores"
  import { useTracking } from "$lib/composables/useTracking.js"
  import IconClose from "../Icons/IconClose.svelte"
  import DleFavorite from "../Buttons/FavoriteButton.svelte"
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
  let popupEl
  let cleanup

  function trackGameClick(dle, clickType) {
    if (section === "sponsors") {
      tracking.trackSponsorClick(dle, clickType, position)
    } else {
      tracking.trackGameClick(dle, clickType, "popup", section, position)
    }
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

</script>

<div
  class="dlePopUp bevel"
  bind:this={popupEl}
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <div class="flex justify-around items-start gap-2">
    <DleFavorite {dle} {section} {position} />

    <div class="text-center text-xl font-bold">
      {dle.name}
    </div>
    <button on:click={closePopup}>
      <IconClose />
    </button>
  </div>

  <div class="text-center text-base text-colorTextSoft">
    {dle.description}
  </div>

  <a
    href={dle.url}
    target="_blank"
    on:click={() => trackGameClick(dle, "popup-link")}
    on:auxclick={() => trackGameClick(dle, "popup-middle-click")}
  >
    {dle.url}
  </a>
</div>

<style lang="postcss">
  .dlePopUp {
    @apply absolute p-3 flex flex-col gap-2 bg-colorCardC rounded-sm shadow-md shadow-colorTextSoftest z-50 dark:shadow-sm;
    width: 19.375rem;
    top: 0;
    left: 0;
  }

  a {
    @apply text-center text-base underline break-words;
  }
</style>
