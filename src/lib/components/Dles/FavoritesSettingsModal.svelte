<script>
  import { poppedUpDle, favoritesView } from "$lib/stores"
  import Modal from "../Modal.svelte"
  import FavoritesList from "./FavoritesList.svelte"
  import ViewModeToggle from "./ViewModeToggle.svelte"
  import IconClose from "../Icons/IconClose.svelte"

  export let onClose

  const { viewMode } = favoritesView
  let favoritesListRef
  let dragEnabled = false

  function handleClose() {
    $poppedUpDle = ""
    onClose()
  }
</script>

<Modal
  onClose={handleClose}
  overlay={true}
  zIndex={1000}
  closeOnClickOutside={!dragEnabled}
>
  <div class="modal-container" class:wide={$viewMode === "grid"}>
    <div class="modal-header-section">
      <h3 class="modal-title">Favorites Menu</h3>
      <div class="header-actions">
        <ViewModeToggle showBadge={true} />
        <button on:click={handleClose} class="close-button">
          <IconClose />
        </button>
      </div>
    </div>
    <FavoritesList
      bind:this={favoritesListRef}
      bind:dragEnabled
      section="favorites-modal"
      showCategory={false}
      searchModalZIndex={1100}
      viewMode={$viewMode}
    />
  </div>
</Modal>

<style lang="postcss">
  .modal-container {
    @apply bg-colorBackground border border-colorTextSofter shadow-xl transition-all duration-200;
    max-width: 400px;
    width: 95vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .modal-container.wide {
    @apply max-w-3xl;
  }

  .modal-header-section {
    @apply flex justify-between items-center p-3 bg-colorCardB border-b-2 border-colorTextSofter;
  }

  .modal-title {
    @apply text-base font-semibold text-colorText uppercase tracking-wide;
  }

  .header-actions {
    @apply flex items-center gap-8;
  }

  .close-button {
    @apply p-1 hover:bg-colorCardC transition-colors border-none bg-transparent cursor-pointer;
  }
</style>
