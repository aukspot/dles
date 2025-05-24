<script>
  import { isLocalStorageAvailable, openInNewTab } from "$lib/js/utilities"
  import { categories, dles, randomCategories } from "$lib/stores"
  import { onMount } from "svelte"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconRandom from "./Icons/IconRandom.svelte"

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

  function playRandom() {
    if (options.length != 0) {
      const choice = options[Math.floor(Math.random() * options.length)]
      openInNewTab(choice.url)
    }
  }

  onMount(() => {
    updateOptions()
  })
</script>

<DropdownMenu>
  <h2
    class="pb-1 mb-1 flex justify-center gap-2 fill-colorText text-lg font-semibold border-b border-colorTextSoftest"
  >
    <IconRandom /> Play random game
  </h2>
  <div class="flex justify-center">
    <button
      class="menu-link btn-menu-item rounded-md shadow-sm shadow-colorTextSofter active:shadow-none"
      on:click={playRandom}
    >
      Go! (opens in new tab)</button
    >
  </div>
  <h3 class="text-center underline">Allowed categories</h3>
  <div class="columns-2 mx-auto">
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
  <p class="text-center">
    Choosing from <strong>{options.length}</strong> dles
  </p>
</DropdownMenu>

<style lang="postcss">
  label {
    @apply cursor-pointer flex items-center flex-shrink-0 select-none;
  }
  input[type="checkbox"] {
    @apply w-5 h-5 fill-colorCardB cursor-pointer flex-shrink-0;
  }
</style>
