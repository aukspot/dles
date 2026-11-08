<script>
  import { clickOutside } from "$lib/js/clickOutside"
  import { onMount } from "svelte"

  export let onClose
  export let overlay = false
  export let closeOnEscape = true
  export let closeOnClickOutside = true
  export let zIndex = 100
  export let lockScroll = true
  // "top" pins the dialog near the top of the viewport so that content which
  // grows and shrinks (e.g. a filtering result list) only moves its bottom edge.
  export let align = "center"
  export let fullscreenMobile = false

  onMount(() => {
    if (lockScroll) {
      const html = document.documentElement
      const originalOverflow = html.style.overflow
      const originalScrollbarGutter = html.style.scrollbarGutter

      html.style.overflow = "hidden"
      html.style.scrollbarGutter = "stable"

      return () => {
        html.style.overflow = originalOverflow
        html.style.scrollbarGutter = originalScrollbarGutter
      }
    }
  })

  function handleKeydown(event) {
    if (closeOnEscape && event.key === "Escape") {
      onClose()
    }
  }

  function handleClickOutside() {
    if (closeOnClickOutside) {
      onClose()
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if overlay}
  <div
    class="modal-overlay"
    class:align-top={align === "top"}
    class:fullscreen-mobile={fullscreenMobile}
    style="z-index: {zIndex}"
  >
    <div
      class="modal-overlay-content"
      use:clickOutside
      on:click_outside={handleClickOutside}
    >
      <slot />
    </div>
  </div>
{:else}
  <div use:clickOutside on:click_outside={handleClickOutside}>
    <slot />
  </div>
{/if}

<style lang="postcss">
  .modal-overlay {
    @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center;
  }

  .modal-overlay.align-top {
    @apply items-start;
    padding-top: 8vh;
  }

  @media (max-width: 767.98px) {
    .modal-overlay.fullscreen-mobile {
      padding-top: 0;
    }

    .modal-overlay.fullscreen-mobile > .modal-overlay-content {
      width: 100%;
      height: 100%;
    }
  }
</style>
