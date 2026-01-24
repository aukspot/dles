<script>
  import { dles, favoriteIds, poppedUpDle } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { categoryColors } from "$lib/stores"
  import { onMount, tick } from "svelte"
  import { browser } from "$app/environment"
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import DlePopUp from "./Dles/DlePopUp.svelte"
  import IconFavoriteFilled from "./Icons/IconFavoriteFilled.svelte"

  export let open = false

  let searchQuery = ""
  let filteredDles = []
  let searchInput
  let previousOpen = false
  let dlesCache = new Map()
  let allDlesSorted = []
  let favoriteIdsSet = new Set()
  let prevFavoriteIds = []
  let searchRaf = null
  let referenceElements = {}
  let resultsContainer
  let prevSearchQuery = ""

  // Handle panel opening - focus the input
  $: if (open && !previousOpen) {
    previousOpen = true
    tick().then(() => {
      if (searchInput) {
        searchInput.focus()
      }
    })
  }

  // Reset when panel closes
  $: if (!open && previousOpen) {
    previousOpen = false
    searchQuery = ""
    $poppedUpDle = ""
  }

  // Build cache once on mount
  function buildCache() {
    const newCache = new Map()
    const sortedDles = []
    for (const dle of $dles) {
      if (dle?.id && dle?.name) {
        newCache.set(dle.id, {
          dle,
          nameLower: dle.name.toLowerCase(),
          descLower: dle.description?.toLowerCase() || "",
        })
        sortedDles.push(dle)
      }
    }
    // Sort alphabetically for initial display
    sortedDles.sort((a, b) => a.name.localeCompare(b.name))
    allDlesSorted = sortedDles
    dlesCache = newCache
  }

  // Update favoriteIdsSet only when $favoriteIds actually changes
  $: {
    if ($favoriteIds !== prevFavoriteIds) {
      favoriteIdsSet = new Set($favoriteIds)
      prevFavoriteIds = $favoriteIds
    }
  }

  // Optimized search function with result limit
  function performSearch(query) {
    if (!query.trim()) {
      // Show all dles alphabetically when no search query
      filteredDles = allDlesSorted
      return
    }

    const queryLower = query.toLowerCase()
    const results = []

    for (const [id, { dle, nameLower, descLower }] of dlesCache) {
      const matchesName = nameLower.includes(queryLower)
      const matchesDesc = descLower.includes(queryLower)

      if (matchesName || matchesDesc) {
        // Calculate sort score: 0 for name starts with, 1 for name contains, 2 for desc only
        let sortScore = 2
        if (matchesName) {
          sortScore = nameLower.startsWith(queryLower) ? 0 : 1
        }
        results.push({ dle, sortScore, name: dle.name })
      }
    }

    // Sort: first by sortScore, then alphabetically
    results.sort((a, b) => {
      if (a.sortScore !== b.sortScore) return a.sortScore - b.sortScore
      return a.name.localeCompare(b.name)
    })

    filteredDles = results.map((r) => r.dle)
  }

  // Use RAF to batch search updates (only in browser)
  $: if (browser) {
    if (searchRaf) {
      cancelAnimationFrame(searchRaf)
    }
    const queryChanged = searchQuery !== prevSearchQuery
    searchRaf = requestAnimationFrame(() => {
      performSearch(searchQuery)
      // Reset scroll position only when search query actually changes
      if (queryChanged && resultsContainer) {
        resultsContainer.scrollTop = 0
        prevSearchQuery = searchQuery
      }
      searchRaf = null
    })
  }

  function clearSearch() {
    searchQuery = ""
  }

  function handleDleClick(dle) {
    const popupKey = `search-${dle.id}`
    if ($poppedUpDle === popupKey) {
      $poppedUpDle = ""
    } else {
      $poppedUpDle = popupKey
    }
  }

  function handleClickOutside(event) {
    const originalEvent = event.detail?.originalEvent
    const target = originalEvent?.target

    // Don't close if clicking inside the popup
    if (target && target.closest(".dlePopUp")) {
      return
    }

    $poppedUpDle = ""
  }

  function handleResultsScroll() {
    // Close popup when user scrolls the results to avoid position issues
    if ($poppedUpDle) {
      $poppedUpDle = ""
    }
  }

  onMount(() => {
    buildCache()
  })
</script>

<PanelWrapper {open}>
  <PanelTitle color="violet" title="SEARCH DLES" id="search-panel-title" />
  <div class="search-content">
    <div class="search-header">
      <input
        bind:this={searchInput}
        type="text"
        placeholder="Search dles..."
        bind:value={searchQuery}
        class="search-input"
      />
      {#if searchQuery.trim()}
        <button
          class="btn-clear"
          on:click={clearSearch}
          aria-label="Clear search"
        >
          Clear
        </button>
      {/if}
    </div>

    {#if filteredDles.length > 0}
      <div class="results-count">
        {#if searchQuery.trim()}
          Found <strong>{filteredDles.length}</strong>
          {filteredDles.length === 1 ? "dle" : "dles"}
        {:else}
          Showing all <strong>{filteredDles.length}</strong> dles
        {/if}
      </div>
    {/if}

    <div
      class="results-container"
      bind:this={resultsContainer}
      on:scroll={handleResultsScroll}
    >
      {#if searchQuery.trim() && filteredDles.length === 0}
        <div class="no-results">No dles found.</div>
      {:else if filteredDles.length > 0}
        <div class="results">
          {#each filteredDles as dle, index (dle.id)}
            {@const isFavorited = favoriteIdsSet.has(dle.id)}
            <div class="result-wrapper">
              <button
                bind:this={referenceElements[dle.id]}
                class="result-item"
                class:favorited={isFavorited}
                class:even-row={index % 2 === 0}
                class:odd-row={index % 2 !== 0}
                on:click={() => handleDleClick(dle)}
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
                {#if isFavorited}
                  <div class="favorite-badge">
                    <IconFavoriteFilled />
                  </div>
                {/if}
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</PanelWrapper>

<!-- Render popup outside the scrollable container -->
{#each filteredDles as dle, index (dle.id)}
  {@const popupKey = `search-${dle.id}`}
  {#if $poppedUpDle === popupKey}
    <DlePopUp
      {dle}
      {handleClickOutside}
      section="search"
      position={index}
      referenceEl={referenceElements[dle.id]}
    />
  {/if}
{/each}

<style lang="postcss">
  .search-content {
    @apply flex flex-col items-center w-full;
    max-width: 300px;
    margin: 0 auto;
  }

  .search-header {
    @apply flex items-center gap-2 mb-3;
  }

  .search-input {
    @apply p-3 border border-colorTextSoftest rounded bg-colorCardB text-colorText placeholder-colorTextSofter focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm;
    width: 220px;
  }

  .btn-clear {
    @apply px-3.5 py-2.5 text-xs rounded bg-colorCardB text-colorText border border-colorTextSoftest hover:bg-red-100 dark:hover:bg-red-900 transition-colors;
  }

  .results-container {
    @apply w-full overflow-y-auto border border-colorTextSoftest;
    max-height: 300px;
  }

  .results-count {
    @apply text-xs text-center text-colorTextSoft mb-2;
  }

  .no-results {
    @apply text-center text-colorTextSoft py-4 text-sm;
  }

  .results {
    @apply flex flex-col;
  }

  .result-wrapper {
    @apply relative;
  }

  .result-item {
    @apply flex items-center justify-between p-2 pr-3 cursor-pointer border-none w-full text-left;
    transition: background-color 0.15s ease;
  }

  .result-item.even-row {
    @apply bg-colorCardB;
  }

  .result-item.odd-row {
    @apply bg-colorCardA;
  }

  .result-item:hover {
    @apply bg-colorCardC;
  }

  .dle-info {
    @apply flex items-center gap-2 flex-1 min-w-0;
  }

  .category-icon {
    @apply p-1 rounded flex items-center justify-center flex-shrink-0 w-6 h-6 text-colorText;
  }

  .dle-details {
    @apply flex-1 min-w-0;
  }

  .dle-name {
    @apply font-medium text-colorText text-sm leading-tight truncate;
  }

  .dle-category {
    @apply text-xs text-colorTextSoft truncate;
  }

  .favorite-badge {
    @apply flex-shrink-0 text-colorTextSofter pr-2;
  }

  .favorite-badge :global(svg) {
    @apply w-full h-full;
  }
</style>
