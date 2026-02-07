<script>
  import { poppedUpDle } from "$lib/stores"
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"
  import FavoritesList from "./FavoritesList.svelte"

  export let onClose

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
  <div class="modal-container">
    <ModalHeader
      title="Favorites Menu"
      onClose={handleClose}
      variant="section"
    />
    <FavoritesList
      bind:this={favoritesListRef}
      bind:dragEnabled
      section="favorites-modal"
      showCategory={false}
      searchModalZIndex={1100}
    />
  </div>
</Modal>

<style lang="postcss">
  .modal-container {
    @apply bg-colorBackground border border-colorTextSofter shadow-xl;
    width: min(400px, 95vw);
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
