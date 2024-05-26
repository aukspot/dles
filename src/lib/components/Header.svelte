<script>
  import { base } from "$app/paths"
  import { dles } from "$lib/stores"
  import Toolbar from "./Toolbar.svelte"
</script>

<header class="flex justify-between items-center px-2 py-2 relative">
  <!-- <div id="themeSwitcher" class="absolute top-0 right-1">
    <ThemeButton />
  </div>
  <h1
    class="text-xl text-center uppercase font-semibold font-mono mt-1 md:text-3xl"
  >
    The Dles
  </h1>
  <p class="text-sm text-center md:text-base">
    A curated collection of daily games.
  </p> -->
  <div>
    <h1
      class="leading-none tracking-tight text-3xl uppercase font-mono font-bold md:text-4xl"
    >
      <a class="text-colorText" href="{base}/"> The Dles </a>
    </h1>
    <p class="pt-1 pl-1 leading-none text-sm md:text-base">
      A curated collection of <strong>{$dles.length}</strong> daily games.
    </p>
  </div>
  <Toolbar />
  <!-- <div id="themeSwitcher" class="">
    <ThemeButton />
  </div> -->
</header>
