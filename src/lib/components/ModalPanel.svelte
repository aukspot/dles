<script>
  import Modal from "./Modal.svelte"
  import ModalHeader from "./ModalHeader.svelte"
  import Button from "./Button.svelte"

  export let title
  export let onClose
  export let zIndex = 100
  // Callers holding a nested modal open must disable these, otherwise a click
  // or Escape meant for the child closes this one out from under it.
  export let closeOnEscape = true
  export let closeOnClickOutside = true
  // Cap the shell to its content; 40rem matches PanelWrapper's old max-width.
  export let maxWidth = "40rem"
  export let align = "center"
  export let fullscreenMobile = false
</script>

<Modal
  {onClose}
  overlay={true}
  {zIndex}
  {closeOnEscape}
  {closeOnClickOutside}
  {align}
  {fullscreenMobile}
>
  <div
    class="modal-panel"
    class:fullscreen-mobile={fullscreenMobile}
    style="--modal-panel-width: {maxWidth}"
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <ModalHeader {title} {onClose} variant="section" />
    <div class="modal-panel-body">
      <slot />
    </div>
    {#if fullscreenMobile}
      <div class="mobile-close">
        <Button
          variant="secondary"
          size="md"
          fullWidth
          uppercase
          on:click={onClose}
        >
          Close
        </Button>
      </div>
    {/if}
  </div>
</Modal>

<style lang="postcss">
  .modal-panel {
    @apply bg-colorCardC border border-colorTextSofter shadow-lg flex flex-col;
    width: min(var(--modal-panel-width), 92vw);
    max-height: 85vh;
  }

  .modal-panel-body {
    @apply overflow-y-auto p-2;
    min-height: 0; /* lets the flex child actually shrink and scroll */
  }

  .mobile-close {
    @apply hidden;
  }

  @media (max-width: 767.98px) {
    .modal-panel.fullscreen-mobile {
      @apply border-0 shadow-none;
      width: 100%;
      height: 100%;
      max-height: none;
    }

    .modal-panel.fullscreen-mobile .modal-panel-body {
      @apply flex flex-col flex-1 overflow-hidden;
    }

    .modal-panel.fullscreen-mobile .mobile-close {
      @apply block px-2 pt-1 flex-shrink-0;
      padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
    }
  }
</style>
