<script>
  import HiddenDlesModal from "./Dles/HiddenDlesModal.svelte"

  export let showHideSectionButton = true
  export let onHideSection = null

  let showHiddenModal = false
</script>

<div class="hidden-message">
  <button class="hidden-btn" on:click={() => (showHiddenModal = true)}>
    Manage hidden dles
  </button>
  {#if showHideSectionButton && onHideSection}
    <button class="hidden-btn" on:click={onHideSection}> Hide section </button>
  {/if}
</div>

{#if showHiddenModal}
  <HiddenDlesModal onClose={() => (showHiddenModal = false)} />
{/if}

<style lang="postcss">
  .hidden-message {
    @apply px-1 py-2 bg-colorCardC text-center flex gap-2 justify-center;
  }

  .hidden-btn {
    @apply text-tiny md:text-sm text-colorTextSofter bg-colorCardB p-1 hover:text-colorText cursor-pointer border border-colorTextSofter;
  }
</style>
