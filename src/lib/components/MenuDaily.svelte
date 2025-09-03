<script>
  import { isLocalStorageAvailable, playRandom } from "$lib/js/utilities"
  import { categories, dles, randomCategories } from "$lib/stores"
  import { onMount } from "svelte"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconRandom from "./Icons/IconRandom.svelte"
  import { base } from "$app/paths"

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
</script>

<DropdownMenu>
  <h2
    class="pb-1 mb-1 flex justify-center gap-2 fill-colorText text-lg font-semibold border-b border-colorTextSoftest"
  >
    <IconRandom /> Begin Challenge Mode 
  </h2>
  <div class="flex justify-center">
    <div class="mx-auto">
      <label>
      <input
      name="single_mode"
      type="checkbox"
      />
      <span aria-label="single-mode" class="text-sm">Singular Mode (Hard)</span>
      </label>
    </div>
    <div data-sveltekit-reload>
      <a class="menu-link btn-menu-item rounded-md shadow-sm shadow-colorTextSofter active:shadow-none" href="{base}/challenge"
        ><IconRandom /> Begin</a
      >
    </div>

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
