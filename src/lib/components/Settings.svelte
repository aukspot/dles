<script>
  import { settings } from "$lib/stores"
  import { onMount } from "svelte"
  import ThemeButton from "./Buttons/ThemeButton.svelte"
  import DropdownMenu from "./DropdownMenu.svelte"
  onMount(() => {
    $settings.view = localStorage.view || "categories"
  })

  function updateLocalStorage() {
    localStorage.view = $settings.view
  }
</script>

<div class="flex justify-center items-center gap-1">
  <select
    class="btn-menu-item !p-2 w-full text-center rounded-md bg-colorNeutralSofter"
    id="view"
    name="view"
    bind:value={$settings.view}
    on:change={updateLocalStorage}
  >
    <option value="categories">Category View</option>
    <option value="detailed">Detailed View (Legacy)</option>
  </select>
</div>
<ThemeButton />
