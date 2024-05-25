<script>
  import ThemeButton from "$lib/components/Buttons/ThemeButton.svelte"
  import Toolbar from "./Toolbar.svelte"
</script>

<header class="flex justify-between px-1 py-2">
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
      class="leading-none tracking-tight text-3xl uppercase font-semibold font-mono md:text-4xl"
    >
      The Dles
    </h1>
    <p class="pl-1 leading-none text-sm md:text-base">
      A curated collection of daily games.
    </p>
  </div>
  <Toolbar />
  <!-- <div id="themeSwitcher" class="">
    <ThemeButton />
  </div> -->
</header>
