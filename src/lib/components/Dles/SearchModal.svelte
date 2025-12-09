<script>
  import { dles, favoriteIds } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { categoryColors } from "$lib/stores"
  import { clickOutside } from "$lib/js/clickOutside"
  import { useFavorites } from "$lib/composables/useFavorites.js"
  import { useTracking } from "$lib/composables/useTracking.js"
  import { onMount } from "svelte"
  import IconClose from "../Icons/IconClose.svelte"
  import IconPlus from "../Icons/IconPlus.svelte"

  export let onClose
  export let pageX
  export let pageY

  const favorites = useFavorites()
  const tracking = useTracking()

  let searchQuery = ""
  let filteredDles = []
  let newlyToggledInSession = new Set()
  let isTouchDevice = false
  let dlesCache = new Map()
  let favoriteIdsSet = new Set()
  let prevFavoriteIds = []
  let searchRaf = null

  let width = 320
  let baseHeight = 120
  let maxHeight = 400

  $: currentHeight = filteredDles.length > 0 ? maxHeight : baseHeight

  $: isMobile = typeof window !== "undefined" && window.innerWidth <= 768

  let adjustedPageX, adjustedPageY, transformX, transformY

  $: {
    if (isMobile) {
      adjustedPageX = "50%"
      adjustedPageY = "2%"
      transformX = "-50%"
      transformY = "0%"
    } else {
      if (pageX < width / 2) {
        pageX = width / 2 + 5
      }
      if (pageX + width / 2 > document.documentElement.clientWidth) {
        pageX = document.documentElement.clientWidth - width / 2 - 5
      }

      const viewportY = pageY - window.scrollY

      adjustedPageY = viewportY - 68
      transformY = "0%"

      adjustedPageX = pageX
      transformX = "-50%"
    }
  }

  // Build cache once on mount with pre-sorted groups by first letter
  function buildCache() {
    const newCache = new Map()
    for (const dle of $dles) {
      if (dle?.id && dle?.name) {
        newCache.set(dle.id, {
          dle,
          nameLower: dle.name.toLowerCase(),
          nameFirstChar: dle.name.toLowerCase().charAt(0),
        })
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

  // Optimized search function with result limit
  function performSearch(query) {
    if (!query.trim()) {
      filteredDles = []
      return
    }

    const queryLower = query.toLowerCase()
    const results = []
    const maxResults = 50 // Limit results for better performance

    // Single pass: collect and immediately sort by insertion
    for (const [id, { dle, nameLower }] of dlesCache) {
      if (favoriteIdsSet.has(id) && !newlyToggledInSession.has(id)) continue

      if (nameLower.includes(queryLower)) {
        // Calculate a simple sort score: 0 for starts with, 1 for contains
        const sortScore = nameLower.startsWith(queryLower) ? 0 : 1
        results.push({ dle, sortScore, name: dle.name })

        // Early exit if we have enough results and they're all "starts with"
        if (results.length >= maxResults && sortScore === 0) break
      }
    }

    // Sort: first by sortScore, then alphabetically
    results.sort((a, b) => {
      if (a.sortScore !== b.sortScore) return a.sortScore - b.sortScore
      return a.name.localeCompare(b.name)
    })

    // Take only the top results and extract dles
    filteredDles = results.slice(0, maxResults).map((r) => r.dle)
  }

  // Use RAF to batch search updates and prevent UI freezing
  $: {
    if (searchRaf) {
      cancelAnimationFrame(searchRaf)
    }
    searchRaf = requestAnimationFrame(() => {
      performSearch(searchQuery)
      searchRaf = null
    })
  }

  function toggleFavorite(dle) {
    const result = favorites.toggleFavorite(dle)

    if (result.success) {
      newlyToggledInSession.add(dle.id)

      tracking.trackFavoriteAction(
        dle,
        result.action,
        "search-modal",
        "favorites-search",
        null,
        result.totalFavorites,
      )
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      onClose()
    }
  }

  function handleClickOutside() {
    onClose()
  }

  onMount(() => {
    isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    buildCache()
  })

  function focusInput(element) {
    element.focus()
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="searchPopup"
  style="left: {adjustedPageX}{typeof adjustedPageX === 'number'
    ? 'px'
    : ''}; top: {adjustedPageY}{typeof adjustedPageY === 'number'
    ? 'px'
    : ''}; width: {width}px; height: {currentHeight}px; transform: translate({transformX}, {transformY});"
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <div class="flex justify-around items-center mb-2">
    <div class="w-6"></div>
    <!-- Placeholder for balance -->
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
      use:focusInput
    />
  </div>

  <div class="results-container">
    {#if searchQuery.trim() && filteredDles.length === 0}
      <div class="no-results">No dles found.</div>
    {:else if filteredDles.length > 0}
      <div class="results">
        {#each filteredDles as dle, index (dle.id)}
          {@const isFavorited =
            favoriteIdsSet.has(dle.id) || newlyToggledInSession.has(dle.id)}
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
            {#if isFavorited && newlyToggledInSession.has(dle.id)}
              <div class="favorite-message">
                <div class="favorite-text">Added!</div>
                <div class="favorite-subtext">Click to remove</div>
              </div>
            {:else if !isFavorited && !isTouchDevice}
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

<style lang="postcss">
  .searchPopup {
    @apply fixed p-3 flex flex-col bg-colorCardC rounded-lg border border-colorNeutralSoft;
    z-index: 100;
    box-shadow:
      0 10px 25px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  :global(.dark) .searchPopup {
    @apply border-colorTextSoftest;
    box-shadow:
      0 10px 25px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.1);
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
  }

  .result-item {
    @apply flex items-center justify-between p-2 pr-4 rounded cursor-pointer border-none w-full text-left;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .result-item.even-row {
    @apply bg-colorCardB;
  }

  .result-item.odd-row {
    @apply bg-colorCardA;
  }

  .result-item:hover {
    @apply bg-colorCardC;
    background-color: rgb(var(--colors-colorCardC)) !important;
  }

  .result-item.favorited {
    @apply bg-green-200 hover:bg-green-300 dark:bg-green-900/20 dark:hover:bg-green-800/30;

    .favorite-text {
      @apply text-xs font-bold text-green-900 dark:text-green-200;
    }

    .favorite-subtext {
      @apply text-xs text-green-800 dark:text-green-100;
    }
  }

  .favorite-message {
    @apply text-right flex-shrink-0 px-2;
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

  .plus-icon {
    @apply opacity-0 flex items-center flex-shrink-0 text-colorTextSofter;
  }

  .result-item:hover .plus-icon {
    @apply opacity-100;
  }
</style>
