<script>
  import IconClose from "./Icons/IconClose.svelte"

  export let title
  export let onClose
  export let variant = "inline" // 'inline' or 'section'
</script>

{#if variant === "section"}
  <div class="modal-header-section">
    <h3 class="modal-title">{title}</h3>
    <button on:click={onClose} class="close-button">
      <IconClose />
    </button>
  </div>
{:else}
  <div class="modal-header-inline">
    <div class="w-6"></div>
    <h3 class="modal-title-inline">{title}</h3>
    <button on:click={onClose}>
      <IconClose />
    </button>
  </div>
{/if}

<style lang="postcss">
  /* Section - used by FavoritesImportExportModal */
  .modal-header-section {
    @apply flex justify-between items-center p-3 bg-colorCardB border-b-2 border-colorTextSofter;
  }

  .modal-title {
    @apply text-base font-semibold text-colorText uppercase tracking-wide;
  }

  .close-button {
    @apply p-1 hover:bg-colorCardC transition-colors border-none bg-transparent cursor-pointer;
  }

  /* Inline - used by SearchModal */
  .modal-header-inline {
    @apply flex justify-around items-center mb-2;
  }

  .modal-title-inline {
    @apply text-lg font-semibold text-colorText;
  }
</style>
