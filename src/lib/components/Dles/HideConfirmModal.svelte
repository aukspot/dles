<script>
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"

  export let dleName
  export let onConfirm
  export let onCancel
</script>

<Modal onClose={onCancel} overlay={true} zIndex={1100}>
  <div class="modal-container">
    <ModalHeader title="Hide this dle?" onClose={onCancel} variant="section" />

    <div class="modal-content">
      <p class="message">
        Are you sure you want to hide <strong>{dleName}</strong>?
      </p>
      <p class="hint">
        You can unhide it later in <strong>Settings → Manage hidden DLES</strong>.
      </p>

      <div class="button-row">
        <button class="btn btn-cancel" on:click={onCancel}>
          Cancel
        </button>
        <button class="btn btn-confirm" on:click={onConfirm}>
          Hide
        </button>
      </div>
    </div>
  </div>
</Modal>

<style lang="postcss">
  .modal-container {
    @apply bg-colorBackground border border-colorTextSofter shadow-xl;
    width: min(350px, 90vw);
  }

  .modal-content {
    @apply p-4 flex flex-col gap-4;
  }

  .message {
    @apply text-colorText text-sm text-center;
  }

  .hint {
    @apply text-colorTextSoft text-xs text-center;
  }

  .button-row {
    @apply flex gap-2 justify-center;
  }

  .btn {
    @apply px-4 py-2 text-sm font-medium rounded border transition-colors cursor-pointer;
  }

  .btn-cancel {
    @apply bg-colorCardC text-colorText border-colorTextSofter hover:bg-gray-100 dark:hover:bg-gray-700;
  }

  .btn-confirm {
    @apply bg-orange-500 text-white border-orange-600 hover:bg-orange-600;
  }
</style>
