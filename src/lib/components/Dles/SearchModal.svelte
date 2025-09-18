<script>
  import { dles, favorites } from "$lib/stores"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { categoryColors } from "$lib/stores"
  import { clickOutside } from "$lib/js/clickOutside"
  import IconClose from "../Icons/IconClose.svelte"
  import IconFavoriteOutline from "../Icons/IconFavoriteOutline.svelte"

  export let onClose
  export let pageX
  export let pageY
  export let clientY

  let searchQuery = ""
  let filteredDles = []

  let width = 320
  let baseHeight = 120
  let maxHeight = 400

  $: currentHeight = filteredDles.length > 0 ? maxHeight : baseHeight

  if (pageX < width / 2) {
    pageX = width / 2 + 5
  }
  if (pageX + width / 2 > document.documentElement.clientWidth) {
    pageX = document.documentElement.clientWidth - width / 2 - 5
  }

  let adjustedPageY, transformY

  if (pageY - maxHeight < window.scrollY) {
    adjustedPageY = pageY - 60
    transformY = "0%"
  } else {
    adjustedPageY = pageY - 50
    transformY = "-100%"
  }

  $: {
    if (searchQuery.trim()) {
      filteredDles = $dles
        .filter((dle) =>
          dle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dle.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((dle) => !$favorites.find((f) => f.name === dle.name))
        .slice(0, 20)
    } else {
      filteredDles = []
    }
  }

  function addToFavorites(dle) {
    $favorites = [...$favorites, dle]
    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify($favorites)
    }
    filteredDles = filteredDles.filter((d) => d.name !== dle.name)
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  function handleClickOutside() {
    onClose()
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="searchPopup"
  style="left: {pageX}px; top: {adjustedPageY}px; width: {width}px; height: {currentHeight}px; transform: translate(-50%, {transformY});"
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <div class="flex justify-between items-center mb-2">
    <h3 class="text-lg font-semibold text-colorText">Add Favorite</h3>
    <button on:click={onClose}>
      <IconClose />
    </button>
  </div>

  <div class="search-header">
    <input
      type="text"
      placeholder="Search dles..."
      bind:value={searchQuery}
      class="search-input"
      autofocus
    />
  </div>

  <div class="results-container">
    {#if searchQuery.trim() && filteredDles.length === 0}
      <div class="no-results">
        No dles found or all matches are already favorites.
      </div>
    {:else if filteredDles.length > 0}
      <div class="results">
        {#each filteredDles as dle (dle.name)}
          <div class="result-item">
            <div class="dle-info">
              <div
                class="category-icon"
                style="background-color: {$categoryColors[dle.category]};"
              >
                <svelte:component this={categoryIcons[dle.category]} />
              </div>
              <div class="dle-details">
                <div class="dle-name">{dle.name}</div>
                <div class="dle-category">{dle.category}</div>
              </div>
            </div>
            <button
              class="add-button"
              on:click={() => addToFavorites(dle)}
              title="Add to favorites"
            >
              <IconFavoriteOutline />
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .searchPopup {
    @apply absolute p-3 flex flex-col bg-colorCardC rounded-lg border border-colorNeutralSoft;
    z-index: 100;
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  :global(.dark) .searchPopup {
    @apply border-colorTextSoftest;
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
  }

  .search-header {
    @apply flex-shrink-0 mb-2 flex justify-center;
  }

  .search-input {
    @apply p-2 border border-colorTextSoftest rounded bg-colorCardB text-colorText placeholder-colorTextSofter focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm;
    width: 80%;
    max-width: 300px;
  }

  .results-container {
    @apply flex-1 overflow-y-auto;
    min-height: 0; /* Important for flex child to shrink */
  }

  .no-results {
    @apply text-center text-colorTextSoft py-2 text-sm;
  }

  .results {
    @apply space-y-1;
  }

  .result-item {
    @apply flex items-center justify-between p-2 bg-colorCardB rounded hover:bg-colorCardA transition-colors;
  }

  .dle-info {
    @apply flex items-center gap-2 flex-1;
  }

  .category-icon {
    @apply p-1 rounded flex items-center justify-center flex-shrink-0 w-6 h-6;
  }

  .dle-details {
    @apply flex-1;
  }

  .dle-name {
    @apply font-medium text-colorText text-sm leading-tight;
  }

  .dle-category {
    @apply text-xs text-colorTextSoft;
  }

  .add-button {
    @apply p-1 hover:bg-colorCardC rounded transition-colors text-colorTextSofter hover:text-colorText;
  }
</style>