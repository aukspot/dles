<script>
  import { settings } from "$lib/stores"
  import { onMount } from "svelte"
  import ThemeButton from "./Buttons/ThemeButton.svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"

  onMount(() => {
    if (isLocalStorageAvailable()) {
      $settings.view = localStorage.view || "categories"
    }
  })

  function updateLocalStorage() {
    if (isLocalStorageAvailable()) {
      localStorage.view = $settings.view
    }
  }
</script>

<ThemeButton />
<div class="flex justify-center items-center gap-1">
  <select
    class="btn-menu-item !p-2 w-full text-center rounded-md !bg-colorCardA"
    id="view"
    name="view"
    bind:value={$settings.view}
    on:change={updateLocalStorage}
  >
    <option value="categories">Category View</option>
    <option value="detailed">Detailed View (Legacy)</option>
  </select>
</div>
