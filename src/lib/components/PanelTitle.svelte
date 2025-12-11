<script>
  import { activePanelStore } from "$lib/stores"

  export let color = "yellow" // yellow, red, green, blue, etc.
  export let title = ""
</script>

<div class="title mb-4 flex items-center justify-center {color} relative">
  <span>{title}</span>
  <button
    class="title-close-btn absolute right-1"
    on:click={() => ($activePanelStore = null)}
    title="Close panel"
  >
    X
  </button>
</div>

<style lang="postcss">
  .title {
    @apply py-2 px-3 text-base md:text-lg font-semibold uppercase tracking-wide text-colorText;
  }

  .title.yellow {
    @apply !bg-yellow-300 dark:!bg-yellow-700;
  }

  .title.red {
    @apply !bg-red-300 dark:!bg-red-800;
  }

  .title.green {
    @apply !bg-green-300 dark:!bg-green-700;
  }

  .title.blue {
    @apply !bg-blue-300 dark:!bg-blue-700;
  }

  .title.orange {
    @apply !bg-orange-300 dark:!bg-orange-700;
  }

  .title.violet {
    @apply !bg-violet-300 dark:!bg-violet-700;
  }

  .title-close-btn {
    @apply px-3 py-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors cursor-pointer font-bold;
  }
</style>
