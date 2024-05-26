<script>
  import { base } from "$app/paths"
  import { categories } from "$lib/stores"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconRandom from "./Icons/IconRandom.svelte"
</script>

<DropdownMenu>
  <h2
    class="pb-1 mb-1 text-center text-lg font-semibold border-b border-colorTextSoftest"
  >
    Play random game
  </h2>
  <div data-sveltekit-reload>
    <a class="menu-link btn-menu-item" href="{base}/suggest"
      ><IconRandom /> Go! (Opens in new tab)</a
    >
  </div>
  <h3 class="text-center underline">Allowed categories</h3>
  <div class="columns-2">
    {#each $categories as category}
      <label>
        <input name={category} type="checkbox" />
        <span aria-label={category} class="text-sm">{category}</span>
      </label>
    {/each}
  </div>
</DropdownMenu>

<style lang="postcss">
  label {
    @apply cursor-pointer flex items-center flex-shrink-0;
  }
  input[type="checkbox"] {
    @apply w-5 h-5 cursor-pointer flex-shrink-0;
  }
</style>
