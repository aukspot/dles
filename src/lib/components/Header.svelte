<script>
  import { base } from "$app/paths"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { dles, infoHidden } from "$lib/stores"
  import IconInformation from "./Icons/IconInformation.svelte"
  import Toolbar from "./Toolbar.svelte"

  function toggleInfo() {
    $infoHidden = !$infoHidden
    if (isLocalStorageAvailable()) {
      localStorage.infoHidden = $infoHidden
    }
  }
</script>

<header class="flex justify-between items-center gap-3 px-2 py-2 relative">
  <div>
    <div class="flex gap-3 items-baseline content-start">
      <h1 class="text-colorText flex items-baseline gap-3 fill-colorText">
        <a class="title whitespace-nowrap" href="{base}/"> The Dles </a>
      </h1>
      <p class="whitespace-nowrap">
        <em>by <a href="https://aukspot.com">aukspot</a></em>
      </p>
    </div>
    <p class="pt-1 pl-1 leading-none text-sm md:text-base">
      Discover <strong>{$dles.length}</strong> free daily games.
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
