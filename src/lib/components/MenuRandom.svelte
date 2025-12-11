<script>
  import { isLocalStorageAvailable, playRandom } from "$lib/js/utilities"
  import { categories, dles, randomCategories } from "$lib/stores"
  import { onMount } from "svelte"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconRandom from "./Icons/IconRandom.svelte"
  import PanelTitle from "./PanelTitle.svelte"

  let options = []

  $: categoryChecked = Object.fromEntries(
    $categories.map((category) => [
      category,
      $randomCategories.includes(category),
    ]),
  )

  function updateOptions() {
    options = $dles.filter((dle) => $randomCategories.includes(dle.category))
  }

  function toggleCategory(category) {
    if ($randomCategories.includes(category)) {
      $randomCategories = $randomCategories.filter((c) => c != category)
    } else {
      $randomCategories.push(category)
      $randomCategories.sort()
    }

    if (isLocalStorageAvailable()) {
      localStorage.randomCategories = JSON.stringify($randomCategories)
    }

    updateOptions()
  }

  onMount(() => {
    updateOptions()
  })

  $: selectedCount = $randomCategories.length
</script>

<div>
  <PanelTitle color="orange" title="RANDOM" />

  <div class="text-xs text-center text-colorTextSoft">
    (<strong>{selectedCount}</strong> categories selected, toggle them below)
  </div>
  <div class="category-grid mt-4 mb-2">
    {#each $categories as category}
      <label class="category-btn" class:checked={categoryChecked[category]}>
        <input
          name={category}
          type="checkbox"
          bind:checked={categoryChecked[category]}
          on:click={toggleCategory(category)}
        />
        <span aria-label={category}>{category}</span>
      </label>
    {/each}
  </div>
  <div class="flex justify-center mb-2">
    <button
      class="btn-play"
      on:click={() =>
        playRandom(options, {
          click_type: "random-button-menu",
          section: "random-menu",
          available_options: options.length,
        })}
    >
      Play random dle!
    </button>
  </div>

  <p class="text-center text-xs text-colorTextSoft">
    choosing from of <span class="font-bold">{options.length}</span> dles
  </p>
</div>

<style lang="postcss">
  .category-grid {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1;
  }

  .category-btn {
    @apply cursor-pointer flex items-center justify-center gap-1 select-none text-[10px] sm:text-xs px-2 py-1 border text-center border-colorTextSofter uppercase font-mono transition-colors bg-colorCardC hover:bg-gray-100 dark:hover:bg-gray-700;
  }

  .category-btn:not(.checked) {
    @apply opacity-40 bg-gray-200 border-dashed dark:bg-gray-800;
  }

  .category-btn.checked {
    @apply hover:bg-orange-300 dark:hover:bg-orange-700;
  }

  input[type="checkbox"] {
    @apply hidden;
  }

  .btn-play {
    @apply px-4 py-2 mt-4 text-xs font-bold uppercase bg-orange-200 hover:bg-orange-300 dark:bg-orange-800 border border-colorTextSoft dark:hover:bg-orange-700 text-colorText;
  }
</style>
