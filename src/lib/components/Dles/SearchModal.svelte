<script>
  import { dles, favorites, favoriteIds } from "$lib/stores"
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

  // Check if we're on mobile
  $: isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  let adjustedPageX, adjustedPageY, transformX, transformY

  $: {
    if (isMobile) {
      // Center horizontally and position at the very top on mobile
      adjustedPageX = '50%'
      adjustedPageY = '2%'
      transformX = '-50%'
      transformY = '0%'
    } else {
      // Desktop positioning logic
      if (pageX < width / 2) {
        pageX = width / 2 + 5
      }
      if (pageX + width / 2 > document.documentElement.clientWidth) {
        pageX = document.documentElement.clientWidth - width / 2 - 5
      }

      if (pageY - maxHeight < window.scrollY) {
        adjustedPageY = pageY - 60
        transformY = "0%"
      } else {
        adjustedPageY = pageY - 50
        transformY = "-100%"
      }

      adjustedPageX = pageX
      transformX = '-50%'
    }
  }

  $: {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()

      filteredDles = $dles
        .filter((dle) =>
          dle.name.toLowerCase().includes(query)
        )
        .filter((dle) => !$favoriteIds.includes(dle.id))
        .sort((a, b) => {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()

          // Priority 1: Name starts with query
          const aNameStarts = aName.startsWith(query)
          const bNameStarts = bName.startsWith(query)
          if (aNameStarts && !bNameStarts) return -1
          if (!aNameStarts && bNameStarts) return 1

          // Priority 2: Alphabetical by name
          return aName.localeCompare(bName)
        })
        .slice(0, 20)
    } else {
      filteredDles = []
    }
  }

  function addToFavorites(dle) {
    $favoriteIds = [...$favoriteIds, dle.id]
    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify($favoriteIds)
    }
    filteredDles = filteredDles.filter((d) => d.id !== dle.id)
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
  style="left: {adjustedPageX}{typeof adjustedPageX === 'number' ? 'px' : ''}; top: {adjustedPageY}{typeof adjustedPageY === 'number' ? 'px' : ''}; width: {width}px; height: {currentHeight}px; transform: translate({transformX}, {transformY});"
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <div class="flex justify-around items-center mb-2">
    <div class="w-6"></div> <!-- Placeholder for balance -->
    <h3 class="text-lg font-semibold text-colorText">Add a new favorite!</h3>
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
          <button
            class="result-item"
            on:click={() => addToFavorites(dle)}
            title="Add {dle.name} to favorites"
          >
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
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .searchPopup {
    @apply fixed p-3 flex flex-col bg-colorCardC rounded-lg border border-colorNeutralSoft;
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
    @apply flex items-center justify-between p-2 bg-colorCardB rounded hover:bg-colorCardA transition-colors cursor-pointer border-none w-full text-left;
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

</style>