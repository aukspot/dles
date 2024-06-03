<script>
  import { base } from "$app/paths"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { dles, infoHidden } from "$lib/stores"
  import IconInformation from "./Icons/IconInformation.svelte"
  import Toolbar from "./Toolbar.svelte"

  function toggleInfo() {
    $infoHidden = !$infoHidden
    if (isLocalStorageAvailable()) {
      localStorage.closedBefore = true
    }
  }
</script>

<header class="flex justify-between items-center px-2 py-2 relative">
  <div>
    <h1 class="text-colorText flex items-baseline gap-3 fill-colorText">
      <a class="title" href="{base}/"> The Dles </a>
      <button
        id="button-information"
        aria-label="information"
        on:click={toggleInfo}
      >
        <IconInformation />
      </button>
    </h1>
    <p class="pt-1 pl-1 leading-none text-sm md:text-base">
      A curated collection of <strong>{$dles.length}</strong> daily games.
    </p>
  </div>
  <Toolbar />
</header>

<style lang="postcss">
  .title {
    @apply text-colorText leading-none tracking-tight text-3xl uppercase font-mono font-bold md:text-4xl;
    word-spacing: -6px;
  }
</style>
