<script>
  import SearchBar from "./SearchBar.svelte"
  import PanelWrapper from "./PanelWrapper.svelte"
  import { searchQuery, activePanelStore } from "$lib/stores"
  import { tick } from "svelte"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { base } from "$app/paths"

  export let open = false

  let searchInput
  let searchBarComponent
  let previousOpen = false
  let isNavigating = false

  // Handle panel opening
  $: if (open && !previousOpen && !isNavigating) {
    previousOpen = true

    // If on changelog, navigate to home first
    if ($page.url.pathname.includes("/changelog")) {
      isNavigating = true
      goto(`${base}/`).then(() => {
        isNavigating = false
        // Focus after navigation completes
        tick().then(() => {
          if (searchInput) {
            searchInput.focus()
          }
        })
      })
    } else {
      // On home page, just focus
      tick().then(() => {
        if (searchInput) {
          searchInput.focus()
        }
      })
    }
  }

  // Reset when panel closes
  $: if (!open && previousOpen) {
    previousOpen = false
  }

  // Clear search when panel closes
  $: if (!open && $searchQuery && searchBarComponent) {
    searchBarComponent.clearSearch()
  }

  // Close search panel when navigating to changelog (unless we're the ones navigating)
  $: if ($page.url.pathname.includes("/changelog") && open && !isNavigating) {
    $activePanelStore = null
  }
</script>

<PanelWrapper {open}>
  <div class="title mb-4 !bg-violet-300 dark:!bg-violet-800">SEARCH DLES</div>

  <div class="search-content">
    <SearchBar bind:this={searchBarComponent} bind:searchInput />
  </div>
</PanelWrapper>

<style lang="postcss">
  .search-content {
    @apply flex flex-col items-center w-full;
  }

  .search-content :global(.search-container) {
    @apply items-center;
  }
</style>
