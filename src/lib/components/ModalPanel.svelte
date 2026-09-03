<script>
  import Modal from "./Modal.svelte"
  import ModalHeader from "./ModalHeader.svelte"

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
</script>

<Modal
  {onClose}
  overlay={true}
  {zIndex}
  {closeOnEscape}
  {closeOnClickOutside}
  {align}
>
  <div
    class="modal-panel"
    style="--modal-panel-width: {maxWidth}"
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <ModalHeader {title} {onClose} variant="section" />
    <div class="modal-panel-body">
      <slot />
    </div>
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
</style>
