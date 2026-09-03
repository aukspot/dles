<script>
  import { dles, favoriteIds } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { categoryColors } from "$lib/stores"
  import { useFavorites } from "$lib/composables/useFavorites.js"
  import { onMount } from "svelte"
  import { autoFocus } from "$lib/js/autoFocus"
  import ModalPanel from "../ModalPanel.svelte"
  import IconPlus from "../Icons/IconPlus.svelte"

  export let onClose
  export let zIndex = 100

  const favorites = useFavorites()

  let searchQuery = ""
  let filteredDles = []
  let isTouchDevice = false
  let dlesCache = new Map()
  let allCandidates = []
  let favoriteIdsSet = new Set()
  let prevFavoriteIds = []
  let searchRaf = null
  let resultsContainer
  let prevSearchQuery = ""

  // Rows the user has acted on this session. Their only job is to keep a row
  // on screen after it is favorited, so the action stays undoable — it must NOT
  // feed into `isFavorited`, or a row stays stuck reading "Click to remove"
  // after being removed again.
  let stickyIds = new Set()

  function buildCache() {
    const newCache = new Map()
    for (const dle of $dles) {
      if (dle?.id && dle?.name) {
        newCache.set(dle.id, { dle, nameLower: dle.name.toLowerCase() })
      }
    }
    dlesCache = newCache
  }

  // Update favoriteIdsSet only when $favoriteIds actually changes
  $: {
    if ($favoriteIds !== prevFavoriteIds) {
      favoriteIdsSet = new Set($favoriteIds)
      prevFavoriteIds = $favoriteIds
    }
  }

  // Everything that can still be added, plus whatever the user just touched.
  $: {
    favoriteIdsSet
    stickyIds
    allCandidates = [...dlesCache.values()]
      .map(({ dle }) => dle)
      .filter((dle) => !favoriteIdsSet.has(dle.id) || stickyIds.has(dle.id))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  function performSearch(query) {
    if (!query.trim()) {
      // Match the main search modal: show the full list before any typing
      filteredDles = allCandidates
      return
    }

    const queryLower = query.toLowerCase()
    const results = []

    for (const dle of allCandidates) {
      const nameLower = dle.name.toLowerCase()
      if (nameLower.includes(queryLower)) {
        results.push({
          dle,
          sortScore: nameLower.startsWith(queryLower) ? 0 : 1,
          name: dle.name,
        })
      }
    }

    results.sort((a, b) => {
      if (a.sortScore !== b.sortScore) return a.sortScore - b.sortScore
      return a.name.localeCompare(b.name)
    })

    filteredDles = results.map((r) => r.dle)
  }

  // Use RAF to batch search updates and prevent UI freezing
  $: {
    allCandidates
    if (searchRaf) cancelAnimationFrame(searchRaf)
    const queryChanged = searchQuery !== prevSearchQuery
    searchRaf = requestAnimationFrame(() => {
      performSearch(searchQuery)
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

  function toggleFavorite(dle) {
    const result = favorites.toggleFavorite(dle)
    if (!result.success) return
    // Reassign so Svelte picks the change up
    stickyIds = new Set(stickyIds).add(dle.id)
  }

  onMount(() => {
    isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    buildCache()
    return () => {
      if (searchRaf) cancelAnimationFrame(searchRaf)
    }
  })
</script>

<ModalPanel
  title="Add favorites"
  {onClose}
  {zIndex}
  maxWidth="24rem"
  align="top"
>
  <div class="search-content">
    <div class="search-header">
      <input
        type="text"
        placeholder="Search dles..."
        bind:value={searchQuery}
        class="search-input"
        use:autoFocus
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
          Showing <strong>{filteredDles.length}</strong> dles
        {/if}
      </div>
    {/if}

    <div class="results-container" bind:this={resultsContainer}>
      {#if filteredDles.length === 0}
        <div class="no-results">
          {searchQuery.trim()
            ? "No dles found."
            : "Everything is already in your favorites!"}
        </div>
      {:else}
        <div class="results">
          {#each filteredDles as dle, index (dle.id)}
            {@const isFavorited = favoriteIdsSet.has(dle.id)}
            <button
              class="result-item"
              class:favorited={isFavorited}
              class:even-row={index % 2 === 0}
              class:odd-row={index % 2 !== 0}
              on:click={() => toggleFavorite(dle)}
              title={isFavorited
                ? `Remove ${dle.name} from favorites`
                : `Add ${dle.name} to favorites`}
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
                <div class="favorite-message">
                  <div class="favorite-text">Added!</div>
                  <div class="favorite-subtext">Click to remove</div>
                </div>
              {:else if !isTouchDevice}
                <div class="plus-icon">
                  <IconPlus />
                </div>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</ModalPanel>

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

  .results-count {
    @apply text-xs text-center text-colorTextSoft mb-2;
  }

  .results-container {
    @apply w-full overflow-y-auto border border-colorTextSoftest;
    max-height: 300px;
  }

  .no-results {
    @apply text-center text-colorTextSoft py-4 text-sm;
  }

  .results {
    @apply flex flex-col;
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

  .result-item.favorited {
    @apply bg-green-200 hover:bg-green-300 dark:bg-green-900/20 dark:hover:bg-green-800/30;
  }

  .result-item.favorited .favorite-text {
    @apply text-xs font-bold text-green-900 dark:text-green-200;
  }

  .result-item.favorited .favorite-subtext {
    @apply text-xs text-green-800 dark:text-green-100;
  }

  .favorite-message {
    @apply text-right flex-shrink-0 pl-2;
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

  .plus-icon {
    @apply opacity-0 flex items-center flex-shrink-0 text-colorTextSofter;
  }

  .result-item:hover .plus-icon {
    @apply opacity-100;
  }
</style>
