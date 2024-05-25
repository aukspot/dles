<script>
  import { settings } from "$lib/stores"
  import { onMount } from "svelte"

  onMount(() => {
    $settings.view = localStorage.view || "categories"
  })

  function updateLocalStorage() {
    localStorage.view = $settings.view
  }
</script>

<div class="flex justify-center m-2">
  <div class="flex items-center gap-2">
    <select
      class="p-1 rounded-md bg-colorNeutralSofter"
      id="view"
      name="view"
      bind:value={$settings.view}
      on:change={updateLocalStorage}
    >
      <option value="detailed">Detailed View</option>
      <option value="categories">Category View</option>
      <option value="descriptions">Descriptions</option>
    </select>
  </div>
</div>
