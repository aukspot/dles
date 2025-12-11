<script>
  import { activePanelStore } from "$lib/stores"

  export let open = false
</script>

{#if open}
  <div class="m-auto max-w-[40rem] p-2">
    <slot />

    <div class="flex justify-center mt-6">
      <button
        class="btn-header hover:bg-red-200 dark:hover:bg-red-800"
        on:click={() => ($activePanelStore = null)}
      >
        X CLOSE
      </button>
    </div>
  </div>
{/if}
