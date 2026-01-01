<script>
  import { onMount } from "svelte"
  import { searchQuery, filteredDles, dles } from "$lib/stores"
  import { enhancedSearch } from "$lib/js/utilities"
  import {
    getLocalStorageJSON,
    setLocalStorageJSON,
  } from "$lib/js/localStorage"
  import Button from "./Button.svelte"

  export let searchInput

  let searchByDescription = false
  let searchByUrl = false
  let searchTimer = null
  let searchCache = new Map()

  // Calculate visible and hidden counts
  $: visibleCount = $filteredDles.filter((dle) => !dle.hidden).length
  $: hiddenCount = $filteredDles.filter((dle) => dle.hidden).length

  // Build search cache when dles change
  $: {
    if ($dles && $dles.length > 0) {
      const newCache = new Map()
      for (const dle of $dles) {
        newCache.set(dle.id, {
          dle,
          nameLower: dle.name.toLowerCase(),
          descLower: dle.description?.toLowerCase() || '',
          urlLower: dle.url.toLowerCase()
        })
      }
      searchCache = newCache
    }
  }

  // Load search preferences from localStorage on mount
  onMount(() => {
    const preferences = getLocalStorageJSON("searchPreferences", {
      searchByDescription: false,
      searchByUrl: false,
    })
    searchByDescription = preferences.searchByDescription
    searchByUrl = preferences.searchByUrl
  })

  function performSearch() {
    // Clear existing timer
    if (searchTimer) clearTimeout(searchTimer)

    // Debounce search
    searchTimer = setTimeout(() => {
      if (!$searchQuery.trim()) {
        $filteredDles = $dles
        return
      }

      const searchTerms = $searchQuery.toLowerCase().trim().split(/\s+/)
      const results = []

      for (const [id, cached] of searchCache) {
        const searchableText = [
          cached.nameLower,
          ...(searchByDescription ? [cached.descLower] : []),
          ...(searchByUrl ? [cached.urlLower] : [])
        ].join(' ')

        if (searchTerms.every(term => searchableText.includes(term))) {
          results.push(cached.dle)
        }
      }

      $filteredDles = results
      searchTimer = null
    }, 150)
  }

  function updatePreferences() {
    setLocalStorageJSON("searchPreferences", {
      searchByDescription,
      searchByUrl,
    })
    performSearch()
  }

  export function clearSearch() {
    if (searchTimer) clearTimeout(searchTimer)
    $searchQuery = ""
    $filteredDles = $dles
  }
</script>

<div class="search-container">
  <div class="search-row">
    <input
      bind:this={searchInput}
      type="text"
      placeholder="Search..."
      class="search-bar"
      bind:value={$searchQuery}
      on:input={performSearch}
    />
    {#if $searchQuery.trim()}
      <button
        class="btn-action hover:bg-red-100 dark:hover:bg-red-900"
        on:click={clearSearch}
        aria-label="Clear search"
      >
        Clear
      </button>
    {/if}
  </div>

  {#if $searchQuery.trim()}
    <div class="search-options">
      <Button variant="toggle" active={searchByDescription}>
        <input
          type="checkbox"
          bind:checked={searchByDescription}
          on:change={updatePreferences}
        />
        Include Description
      </Button>
      <Button variant="toggle" active={searchByUrl}>
        <input
          type="checkbox"
          bind:checked={searchByUrl}
          on:change={updatePreferences}
        />
        Include URL
      </Button>
    </div>
    <div class="mt-2 results-count">
      Found
      <strong> {visibleCount}</strong>
      {visibleCount === 1 ? "dle" : "dles"}

      {#if hiddenCount > 0}
        <span class="hidden-count">({hiddenCount} hidden)</span>
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  .search-container {
    @apply flex flex-col items-center w-full gap-2;
  }

  .search-row {
    @apply flex items-center gap-1;
  }

  .search-bar {
    @apply w-52 h-10 px-4;
  }

  .search-options {
    @apply flex items-center gap-2 flex-wrap justify-center;
  }

  .results-count {
    @apply mt-2 text-xs text-center text-colorText;
  }

  .hidden-count {
    @apply text-colorTextSofter italic;
  }
</style>
