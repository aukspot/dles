<script>
  import { base } from "$app/paths"
  import { categories, randomCategories } from "$lib/stores"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconRandom from "./Icons/IconRandom.svelte"

  $: categoryChecked = Object.fromEntries(
    $categories.map((category) => [
      category,
      $randomCategories.includes(category),
    ]),
  )

  function toggleCategory(category) {
    if ($randomCategories.includes(category)) {
      $randomCategories = $randomCategories.filter((c) => c != category)
    } else {
      $randomCategories.push(category)
      $randomCategories.sort()
    }
    localStorage.randomCategories = JSON.stringify($randomCategories)
  }
</script>

<DropdownMenu>
  <h2
    class="pb-1 mb-1 flex justify-center gap-2 fill-colorText text-lg font-semibold border-b border-colorTextSoftest"
  >
    <IconRandom /> Play random game
  </h2>
  <div data-sveltekit-reload>
    <a class="menu-link btn-menu-item rounded-md" href="{base}/suggest">
      Go! (Opens in new tab)</a
    >
  </div>
  <h3 class="text-center underline">Allowed categories</h3>
  <div class="columns-2">
    {#each $categories as category}
      <label>
        <input
          name={category}
          type="checkbox"
          bind:checked={categoryChecked[category]}
          on:click={toggleCategory(category)}
        />
        <span aria-label={category} class="text-sm">{category}</span>
      </label>
    {/each}
  </div>
</DropdownMenu>

<style lang="postcss">
  label {
    @apply cursor-pointer flex items-center flex-shrink-0 select-none;
  }
  input[type="checkbox"] {
    @apply w-5 h-5 fill-colorCardB cursor-pointer flex-shrink-0;
  }
</style>
