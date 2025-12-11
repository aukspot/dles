<script>
  import {
    categories,
    categoryColors,
    categorizedDles,
    newDles,
    poppedUpDle,
    dlesOfTheWeek,
    favorites,
    favoriteIds,
    searchQuery,
    sponsors,
    categoryRanks,
    completelyHiddenSections,
  } from "$lib/stores"

  import IconNew from "../Icons/IconNew.svelte"

  import { categoryIcons } from "$lib/js/categoryIcons"
  import { base } from "$app/paths"
  import Banner from "../Banner.svelte"
  import { openInNewTab } from "$lib/js/utilities"
  import IconCalendarHeart from "../Icons/IconCalendarHeart.svelte"
  import IconFavoriteOutline from "../Icons/IconFavoriteOutline.svelte"
  import IconFavoriteFilled from "../Icons/IconFavoriteFilled.svelte"
  import IconPlus from "../Icons/IconPlus.svelte"
  import IconSort from "../Icons/IconSort.svelte"
  import IconEdit from "../Icons/IconEdit.svelte"
  import IconRandom from "../Icons/IconRandom.svelte"
  import IconDownload from "../Icons/IconDownload.svelte"
  import IconUpload from "../Icons/IconUpload.svelte"
  import DleGroup from "./DleGroup.svelte"
  import DleGrid from "./DleGrid.svelte"
  import SearchModal from "./SearchModal.svelte"
  import FavoritesImportExportModal from "./FavoritesImportExportModal.svelte"
  import Sponsors from "../Sponsors.svelte"
  import BookRecommendation from "../BookRecommendation.svelte"
  import { enhancedSearch, playRandom } from "$lib/js/utilities"
  import { useTracking } from "$lib/composables/useTracking"

  let allCards = []
  let favoriteCardIndex = -1
  let showSearchModal = false
  let showImportExportModal = false
  let importExportMode = "export" // "export" or "import"
  let editMode = false

  const tracking = useTracking()

  function handlePlayRandomFavorite() {
    const customTrackingData = {
      click_type: "random-button-favorites",
      source: "main-page",
      section: "favorites",
      available_options: $favorites.length,
    }
    playRandom($favorites, customTrackingData)
  }

  function toggleFavoritesSort() {
    const currentNames = $favorites.map((fav) => fav.name.toLowerCase())
    const sortedAscending = [...currentNames].sort()
    const isCurrentlyAscending = currentNames.every(
      (name, index) => name === sortedAscending[index],
    )

    const sortedFavorites = $favorites.sort((a, b) => {
      const comparison = a.name
        .toLowerCase()
        .localeCompare(b.name.toLowerCase())
      return isCurrentlyAscending ? -comparison : comparison
    })

    $favoriteIds = sortedFavorites.map((fav) => fav.id)
    if (typeof localStorage !== "undefined") {
      localStorage.favorites = JSON.stringify($favoriteIds)
    }
  }

  function resetPoppedUpDle() {
    $poppedUpDle = ""
  }

  function handleKeyUp(event) {
    if (event.key == "Escape") {
      resetPoppedUpDle()
      if (showSearchModal) {
        showSearchModal = false
      }
      if (showImportExportModal) {
        showImportExportModal = false
      }
    }
  }

  function openSearchModal(event) {
    showSearchModal = true
  }

  function closeSearchModal() {
    showSearchModal = false
  }

  function toggleEditMode() {
    editMode = !editMode
  }

  function openExportModal() {
    importExportMode = "export"
    showImportExportModal = true
  }

  function openImportModal() {
    importExportMode = "import"
    showImportExportModal = true
  }

  function closeImportExportModal() {
    showImportExportModal = false
  }

  function hasSponsorMatches() {
    if (!$searchQuery || $searchQuery.trim() === "") return true

    const filteredPartners = enhancedSearch($sponsors, $searchQuery)
    return filteredPartners.length > 0
  }

  function buildCards() {
    const cards = []
    let currentIndex = 0

    // Add DLES of the Week (hide when searching or completely hidden)
    if (
      $dlesOfTheWeek.length !== 0 &&
      (!$searchQuery || $searchQuery.trim() === "") &&
      !completelyHiddenSections.isCompletelyHidden(
        "dlesOfTheWeek",
        $completelyHiddenSections,
      )
    ) {
      cards.push({
        id: "dlesOfTheWeek",
        type: "dlesOfTheWeek",
        data: $dlesOfTheWeek,
      })
      currentIndex++
    }

    // Add Favorites (unless completely hidden)
    if (
      !completelyHiddenSections.isCompletelyHidden(
        "favorites",
        $completelyHiddenSections,
      )
    ) {
      favoriteCardIndex = currentIndex
      cards.push({
        id: "favorites",
        type: "favorites",
        data: $favorites,
      })
      currentIndex++
    }

    // Sort categories by rank before building cards
    const sortedCategories = [...$categories].sort((a, b) => {
      const rankA = $categoryRanks[a] ?? 999
      const rankB = $categoryRanks[b] ?? 999
      return rankA - rankB
    })

    // Add category cards in ranked order (unless completely hidden)
    for (const category of sortedCategories) {
      const categoryDles = $categorizedDles[category] || []
      if (
        categoryDles.length !== 0 &&
        !completelyHiddenSections.isCompletelyHidden(
          category,
          $completelyHiddenSections,
        )
      ) {
        cards.push({
          id: category,
          type: "category",
          data: categoryDles,
          category,
        })
        currentIndex++
      }
    }

    // Add Sponsors (when not searching or when sponsors match search)
    const shouldShowSponsors =
      !$searchQuery || $searchQuery.trim() === "" || hasSponsorMatches()
    if (shouldShowSponsors) {
      cards.push({
        id: "sponsors",
        type: "sponsors",
        data: null,
      })
      currentIndex++
    }

    // Add Book Recommendation (only when not searching and not completely hidden)
    if (
      (!$searchQuery || $searchQuery.trim() === "") &&
      !completelyHiddenSections.isCompletelyHidden(
        "bookRecommendation",
        $completelyHiddenSections,
      )
    ) {
      cards.push({
        id: "bookRecommendation",
        type: "bookRecommendation",
        data: null,
      })
      currentIndex++
    }

    allCards = cards
  }

  $: {
    $dlesOfTheWeek
    $favorites
    $categorizedDles
    $categories
    $categoryRanks
    $completelyHiddenSections
    buildCards()
  }
</script>

<svelte:window on:resize={resetPoppedUpDle} />
<svelte:document on:keyup={(e) => handleKeyUp(e)} />
<!-- <Banner includeSearch={true} onOpenPreferences={openPreferencesModal} /> -->
<div class="w-full mx-auto">
  <DleGrid
    cards={allCards}
    {favoriteCardIndex}
    cardsVersion={allCards.length}
    let:card
  >
    {#if card.type === "dlesOfTheWeek"}
      <div class="card">
        <div class="labelContainer rainbow-gradient">
          <div class="label">
            <div class="flex-shrink-0">
              <IconCalendarHeart />
            </div>
            DLES of the Week
          </div>
        </div>
        <DleGroup dleGroup={card.data} section="dles-of-the-week" />
      </div>
    {:else if card.type === "favorites"}
      <div class="card">
        <div
          class="labelContainer"
          style="background-color: hsl(320, 90%, 50%, 45%);"
        >
          <div class="label">
            <div class="flex-shrink-0">
              <IconFavoriteFilled />
            </div>
            Favorites
          </div>
        </div>
        <div class="favorites-add-row" class:edit-mode={editMode}>
          <div class="favorites-add-text">
            {#if editMode}
              <span class="edit-mode-text">Drag to reorder!</span>
            {:else}
              <span class="text-[11px]">
                {card.data.length === 0
                  ? "No favorites"
                  : `${card.data.length} favorite${card.data.length !== 1 ? "s" : ""}`}</span
              >
            {/if}
          </div>
          <div class="favorites-buttons">
            {#if editMode}
              <button
                class="favorites-sort-button"
                on:click={toggleFavoritesSort}
                title="Sort favorites alphabetically"
              >
                <IconSort />
              </button>
            {:else}
              {#if card.data.length > 0}
                <button
                  class="favorites-random-button"
                  on:click={handlePlayRandomFavorite}
                  title="Play random favorite"
                >
                  <div class="icon-container">
                    <IconRandom />
                  </div>
                </button>
              {/if}
              <button
                class="favorites-add-button"
                on:click={openSearchModal}
                title="Add dle to favorites"
              >
                <IconPlus />
              </button>
            {/if}
            {#if card.data.length > 0}
              <button
                class="favorites-edit-button"
                class:active={editMode}
                on:click={toggleEditMode}
                title={editMode
                  ? "Click to finish rearranging"
                  : "Rearrange favorites"}
              >
                {#if editMode}
                  <span class="edit-button-text p-1">Done</span>
                {:else}
                  <IconEdit />
                {/if}
              </button>
            {/if}
          </div>
        </div>
        {#if card.data.length > 0}
          <DleGroup
            dleGroup={card.data}
            reorderable={true}
            {editMode}
            section="favorites"
          />
        {/if}
        <div class="favorites-import-export">
          <button
            class="import-export-button"
            on:click={openImportModal}
            title="Import favorites from file"
          >
            <IconUpload />
            <span>import</span>
          </button>
          <button
            class="import-export-button"
            on:click={openExportModal}
            title="Export favorites to file"
            disabled={card.data.length === 0}
          >
            <IconDownload />
            <span>export</span>
          </button>
        </div>
        {#if card.data.length > 0}
          <div class="favorites-page">
            <a
              href="{base}/favorites"
              class="favorites-page-button"
              data-sveltekit-reload
            >
              Go to favorites page
            </a>
          </div>
        {/if}
      </div>
    {:else if card.type === "sponsors"}
      <Sponsors />
    {:else if card.type === "bookRecommendation"}
      <BookRecommendation />
    {:else if card.type === "category"}
      <div class="card">
        <div
          class="labelContainer"
          style="background-color: {$categoryColors[card.category]}"
        >
          <div class="label">
            <div class="flex-shrink-0">
              <svelte:component this={categoryIcons[card.category]} />
            </div>
            {card.category}
          </div>
        </div>
        <DleGroup dleGroup={card.data} />
      </div>
    {/if}
  </DleGrid>
</div>

{#if showSearchModal}
  <SearchModal onClose={closeSearchModal} />
{/if}

{#if showImportExportModal}
  <FavoritesImportExportModal
    mode={importExportMode}
    onClose={closeImportExportModal}
  />
{/if}

<style lang="postcss">
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
    min-width: 0;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .labelContainer {
    @apply py-2 px-2 bg-colorCardB border-b-2 border-colorText;
  }
  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-sm md:text-base lg:text-lg text-colorText font-semibold;
  }
  .rainbow-gradient {
    background: repeating-linear-gradient(
      60deg,
      hsl(0, 90%, 70%, 0.8) 0% 20%,
      /* Red */ hsl(72, 90%, 70%, 0.8) 20% 40%,
      /* Yellow */ hsl(144, 90%, 70%, 0.8) 40% 60%,
      /* Green */ hsl(216, 90%, 70%, 0.8) 60% 80%,
      /* Blue */ hsl(288, 90%, 70%, 0.8) 80% 100% /* Purple */
    );
  }
  :global(.dark) .rainbow-gradient {
    background: repeating-linear-gradient(
      60deg,
      hsl(0, 90%, 30%, 0.9) 0% 20%,
      /* Dark Red */ hsl(72, 90%, 30%, 0.9) 20% 40%,
      /* Dark Yellow */ hsl(144, 90%, 30%, 0.9) 40% 60%,
      /* Dark Green */ hsl(216, 90%, 30%, 0.9) 60% 80%,
      /* Dark Blue */ hsl(288, 90%, 30%, 0.9) 80% 100% /* Dark Purple */
    );
  }

  .favorites-add-row {
    @apply flex items-center gap-1 justify-between p-1 pl-2 bg-colorCardC border-t border-colorTextSoftest;
  }

  .favorites-add-row.edit-mode {
    @apply bg-blue-50 border-blue-200;
  }

  :global(.dark) .favorites-add-row.edit-mode {
    @apply bg-blue-900/30 border-blue-700;
  }

  .favorites-add-text {
    @apply text-sm text-colorTextSoft;
  }

  .edit-mode-text {
    @apply text-blue-700 font-medium text-xs md:text-sm;
  }

  :global(.dark) .edit-mode-text {
    @apply text-blue-300;
  }

  .favorites-buttons {
    @apply flex items-center justify-end gap-1;
  }

  .favorites-add-button,
  .favorites-edit-button,
  .favorites-sort-button,
  .favorites-random-button {
    @apply p-1 bg-colorBackground hover:bg-gray-50 hover:border-colorTextSoft hover:shadow-md  active:scale-95 rounded-sm  transition-colors duration-75 border border-colorNeutralSoft shadow-md opacity-80;
  }

  .favorites-add-button,
  .favorites-edit-button,
  .favorites-sort-button {
    @apply stroke-colorTextSoft;
  }

  stroke-colorTextSoft .favorites-random-button .icon-container {
    @apply w-6 h-6 flex items-center justify-center;
  }

  .favorites-random-button :global(svg) {
    width: 24px;
    height: 24px;
    @apply fill-colorTextSofter;
  }

  :global(.dark) .favorites-add-button,
  :global(.dark) .favorites-edit-button,
  :global(.dark) .favorites-sort-button,
  :global(.dark) .favorites-random-button {
    @apply hover:bg-zinc-800;
  }

  .favorites-edit-button.active {
    @apply bg-blue-100 border-blue-300 text-blue-700 stroke-blue-600 hover:border-blue-400 hover:bg-blue-200;
  }

  :global(.dark) .favorites-edit-button.active {
    @apply bg-blue-900/40 border-blue-400 text-blue-300 stroke-blue-400 hover:border-blue-300 hover:bg-blue-800/50;
  }

  .edit-button-text {
    @apply text-xs font-bold;
  }

  .favorites-import-export {
    @apply flex gap-1.5 md:gap-2 p-1.5 md:p-2 bg-colorCardC border-t border-colorTextSoftest justify-center;
  }

  .import-export-button {
    @apply flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-medium text-colorTextSoft bg-colorBackground hover:bg-gray-50 border border-colorNeutralSoft rounded-sm shadow-sm hover:shadow-md active:scale-95 transition-all duration-75 stroke-colorTextSoft;
  }

  .import-export-button :global(svg) {
    @apply w-4 h-4 md:w-5 md:h-5;
  }

  .import-export-button:disabled {
    @apply opacity-40 cursor-not-allowed hover:bg-colorBackground hover:shadow-sm;
  }

  :global(.dark) .import-export-button {
    @apply hover:bg-zinc-800;
  }

  :global(.dark) .import-export-button:disabled {
    @apply hover:bg-colorBackground;
  }

  .import-export-button span {
    @apply lowercase;
  }

  .favorites-page {
    @apply flex justify-center p-1 bg-colorCardB border-t border-colorTextSoftest;
  }

  .favorites-page-button {
    @apply px-2 py-1 md:px-3 md:py-1.5 text-sm font-medium text-colorLink hover:text-colorLinkHover active:bg-colorLinkActive underline;
  }

  :global(.dark) .favorites-page-button {
    @apply hover:bg-zinc-800;
  }
</style>
