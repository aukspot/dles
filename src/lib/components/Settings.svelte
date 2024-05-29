<script>
  import { settings } from "$lib/stores"
  import { onMount } from "svelte"
  import ThemeButton from "./Buttons/ThemeButton.svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { page } from "$app/stores"
  import { base } from "$app/paths"

  onMount(() => {
    if (isLocalStorageAvailable()) {
      $settings.view = localStorage.view || "Category View"
      if (
        $settings.view !== "Category View" &&
        $settings.view !== "Detailed View"
      ) {
        $settings.view = "Category View"
      }
    } else {
      $settings.view = "Category View"
    }
  })

  function updateLocalStorage() {
    if (isLocalStorageAvailable()) {
      localStorage.view = $settings.view
    }
  }

  $: otherView =
    $settings.view === "Category View" ? "Detailed View" : "Category View"

  function toggleView() {
    $settings.view = otherView
    updateLocalStorage()
  }
</script>

<ThemeButton />
<div class="flex justify-center items-center gap-1">
  {#if $page.route.id === "/"}
    <button on:click={toggleView} class="btn-menu-item">
      Switch to {otherView}
    </button>
  {:else}
    <a data-sveltekit-reload class="btn-menu-item" href="{base}/">Go home </a>
  {/if}
</div>

<style lang="postcss">
  button,
  a {
    @apply !p-2 w-full text-center rounded-md !bg-colorCardA;
  }
</style>
