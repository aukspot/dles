<script>
  import { favorites, favoriteIds, categoryColors, dles } from "$lib/stores"
  import { playRandom } from "$lib/js/utilities"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import IconRandom from "$lib/components/Icons/IconRandom.svelte"
  import FavoriteButton from "$lib/components/Buttons/FavoriteButton.svelte"
  import SearchModal from "$lib/components/Dles/SearchModal.svelte"
  import { onMount } from "svelte"
  import { base } from "$app/paths"
  import { useTracking } from "$lib/composables/useTracking"
  import { dndzone } from "svelte-dnd-action"
  import { flip } from "svelte/animate"

  let loading = true
  let showSearchModal = false
  let dragEnabled = false
  let items = []

  $: nonFavorites = $dles.filter(
    (dle) => !$favorites.find((f) => f.name === dle.name),
  )

  $: items = $favorites.map((fav) => ({ ...fav, id: fav.id }))

  onMount(() => {
    loading = false
  })

  function toggleDragMode() {
    dragEnabled = !dragEnabled
  }

  function handleDndConsider(e) {
    items = e.detail.items
  }

  function handleDndFinalize(e) {
    items = e.detail.items
    $favoriteIds = items.map((item) => item.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function sortByCategory() {
    const sortedFavorites = $favorites.sort((a, b) => {
      return a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    })
    $favoriteIds = sortedFavorites.map((fav) => fav.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function sortAlphabetically() {
    const sortedFavorites = $favorites.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    })
    $favoriteIds = sortedFavorites.map((fav) => fav.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  const { trackGameClick } = useTracking()

  function handleGameUrlClick(favorite) {
    trackGameClick(favorite, "url-link", "favorites", "favorites-dedicated")
  }

  function handlePlayRandomFavorite() {
    const customTrackingData = {
      click_type: "random-button-favorites",
      source: "favorites-page",
      section: "favorites-dedicated",
      available_options: $favorites.length,
    }
    playRandom($favorites, customTrackingData)
  }

  function openSearchModal(event) {
    const rect = event.target.closest("button").getBoundingClientRect()
    modalX = rect.left + rect.width / 2
    modalY = rect.bottom - 10

    showSearchModal = true
  }

  let modalX = 400
  let modalY = 200

  function closeSearchModal() {
    showSearchModal = false
  }
</script>

{#if !loading}
  <div class="m-auto px-2 py-4">
    <h2 class="title justify-center mb-4">Favorites</h2>

    <div class="flex justify-center mb-3 gap-2 flex-wrap">
      <button
        class="btn-action hover:bg-green-200 dark:hover:bg-green-800"
        on:click={openSearchModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Favorite
      </button>

      {#if $favorites.length > 0}
        <button
          class="btn-action {dragEnabled
            ? 'reorder-active'
            : 'hover:bg-violet-200 dark:hover:bg-violet-800'}"
          on:click={toggleDragMode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          {dragEnabled ? "Done Reordering" : "Reorder"}
        </button>
        <button
          class="btn-action hover:bg-blue-200 dark:hover:bg-blue-800"
          on:click={sortByCategory}
        >
          Sort by Category
        </button>
        <button
          class="btn-action hover:bg-blue-200 dark:hover:bg-blue-800"
          on:click={sortAlphabetically}
        >
          Sort Alphabetically
        </button>
        <button
          class="btn-action hover:bg-orange-200 dark:hover:bg-orange-800"
          on:click={handlePlayRandomFavorite}
        >
          <IconRandom />
          Play Random
        </button>
      {/if}
    </div>

    {#if $favorites.length > 0}
      <p
        class="text-center text-[10px] sm:text-xs text-colorTextSoft mb-3 uppercase font-mono"
      >
        {$favorites.length} total
      </p>
    {/if}

    {#if $favorites.length === 0}
      <p class="text-center text-sm text-colorTextSoft">
        No favorites. Use the button above to add some!
      </p>
    {/if}
  </div>

  {#if $favorites.length > 0}
    <div class="m-auto px-2 pb-4">
      <div
        data-sveltekit-reload
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        use:dndzone={{
          items,
          flipDurationMs: 200,
          dragDisabled: !dragEnabled,
          dropTargetStyle: {},
          type: "favorites",
        }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each items as favorite (favorite.id)}
          <div
            animate:flip={{ duration: 200 }}
            class="card flex border border-colorTextSofter hover:border-colorText"
            class:drag-enabled={dragEnabled}
          >
            <div
              class="w-12 flex justify-center items-center flex-shrink-0"
              style="background-color: {$categoryColors[favorite.category]};"
            >
              <svelte:component this={categoryIcons[favorite.category]} />
            </div>
            <div class="p-2 w-full flex flex-col gap-1">
              <div class="flex justify-between items-start gap-2">
                <div
                  class="font-mono text-xs sm:text-sm font-semibold leading-tight flex-1 min-w-0"
                >
                  {favorite.name}
                </div>
                <div class="flex-shrink-0">
                  <FavoriteButton dle={favorite} />
                </div>
              </div>
              <a
                class="text-[10px] sm:text-xs text-colorTextSoft hover:text-colorLink block break-all"
                target="_blank"
                href={favorite.url}
                on:click={() => handleGameUrlClick(favorite)}>{favorite.url}</a
              >
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
{:else}
  <div class="m-auto text-center">loading...</div>
{/if}

{#if showSearchModal}
  <SearchModal onClose={closeSearchModal} pageX={modalX} pageY={modalY} />
{/if}

<style lang="postcss">
  .card {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }

  .card.drag-enabled,
  .card.drag-enabled *,
  .card.drag-enabled:hover,
  .card.drag-enabled *:hover {
    cursor: grab !important;
  }

  .card.drag-enabled:active,
  .card.drag-enabled *:active {
    cursor: grabbing !important;
  }

  .reorder-active {
    @apply bg-yellow-200 hover:bg-yellow-300 border-yellow-400;
  }

  :global(.dark) .reorder-active {
    @apply bg-yellow-700 hover:bg-yellow-600 border-yellow-500;
  }
</style>
