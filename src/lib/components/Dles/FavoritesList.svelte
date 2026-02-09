<script>
  import {
    favorites,
    favoriteIds,
    categoryColors,
    poppedUpDle,
    playedDleIdsSet,
  } from "$lib/stores"
  import { playRandom, openInNewTab } from "$lib/js/utilities"
  import Button from "../Button.svelte"
  import IconRandom from "../Icons/IconRandom.svelte"
  import IconDragHandle from "../Icons/IconDragHandle.svelte"
  import IconPlus from "../Icons/IconPlus.svelte"
  import DlePopUp from "./DlePopUp.svelte"
  import SearchModal from "./SearchModal.svelte"
  import { useTracking } from "$lib/composables/useTracking"
  import { usePlayedDles } from "$lib/composables/usePlayedDles"
  import { dndzone } from "svelte-dnd-action"

  export let section = "favorites"
  export let showCategory = false
  export let searchModalZIndex = 1100
  export let viewMode = "row"

  export let dragEnabled = false
  let items = []
  let referenceElements = {}
  let undoStack = []
  let showSortDropdown = false
  let showSearchModal = false
  const MAX_UNDO_HISTORY = 10

  $: items = $favorites.map((fav) => ({ ...fav, id: fav.id }))
  $: canUndo = undoStack.length > 0

  function toggleSortDropdown() {
    showSortDropdown = !showSortDropdown
  }

  function closeSortDropdown() {
    showSortDropdown = false
  }

  function saveToHistory() {
    undoStack = [...undoStack, [...$favoriteIds]].slice(-MAX_UNDO_HISTORY)
  }

  function undo() {
    if (undoStack.length === 0) return
    const previousState = undoStack[undoStack.length - 1]
    undoStack = undoStack.slice(0, -1)
    $favoriteIds = previousState
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function toggleDragMode() {
    dragEnabled = !dragEnabled
    if (!dragEnabled) {
      closeSortDropdown()
    }
  }

  function handleDndConsider(e) {
    items = e.detail.items
  }

  function handleDndFinalize(e) {
    items = e.detail.items
    $favoriteIds = items.map((item) => item.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function moveToTop(index) {
    if (index === 0) return
    saveToHistory()
    const item = items[index]
    items = [item, ...items.slice(0, index), ...items.slice(index + 1)]
    $favoriteIds = items.map((item) => item.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function moveToBottom(index) {
    if (index === items.length - 1) return
    saveToHistory()
    const item = items[index]
    items = [...items.slice(0, index), ...items.slice(index + 1), item]
    $favoriteIds = items.map((item) => item.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  function sortByCategory() {
    closeSortDropdown()
    const previousIds = items.map((item) => item.id)
    const sortedItems = [...items].sort((a, b) => {
      return a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    })
    const newIds = sortedItems.map((item) => item.id)
    if (arraysEqual(previousIds, newIds)) return
    saveToHistory()
    items = sortedItems
    $favoriteIds = newIds
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function sortAlphabetically() {
    closeSortDropdown()
    const previousIds = items.map((item) => item.id)
    const sortedItems = [...items].sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    })
    const newIds = sortedItems.map((item) => item.id)
    if (arraysEqual(previousIds, newIds)) return
    saveToHistory()
    items = sortedItems
    $favoriteIds = newIds
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  const { trackGameClick } = useTracking()
  const playedDles = usePlayedDles()

  function handlePlayClick(favorite, index) {
    trackGameClick(favorite, "play-button", "favorites", section, index)
    playedDles.markAsPlayed(favorite)
    openInNewTab(favorite.url)
  }

  function handleNameClick(e, favorite, index) {
    if (e.ctrlKey || e.metaKey) {
      trackGameClick(favorite, "ctrl-click", "favorites", section, index)
      playedDles.markAsPlayed(favorite)
      openInNewTab(favorite.url)
      return
    }
    const popupKey = `${section}-${favorite.id}`
    $poppedUpDle === popupKey ? ($poppedUpDle = "") : ($poppedUpDle = popupKey)
  }

  function handleAuxClick(favorite, index) {
    trackGameClick(favorite, "middle-click", "favorites", section, index)
    playedDles.markAsPlayed(favorite)
    openInNewTab(favorite.url)
  }

  function handleClickOutside(event) {
    const originalEvent = event.detail?.originalEvent
    const target = originalEvent?.target
    if (target && target.closest(".dlePopUp")) {
      return
    }
    $poppedUpDle = ""
  }

  function handlePlayRandomFavorite() {
    const customTrackingData = {
      click_type: "random-button-favorites",
      source: section === "favorites-modal" ? "main-page" : "favorites-page",
      section,
      available_options: $favorites.length,
    }
    playRandom($favorites, customTrackingData)
  }

  function openSearchModal() {
    showSearchModal = true
  }

  function closeSearchModal() {
    showSearchModal = false
  }

  export function clearPoppedUp() {
    $poppedUpDle = ""
  }
</script>

<div class="favorites-list-container">
  {#if $favorites.length > 0}
    <div class="actions-bar">
      <Button
        size="sm"
        color="green"
        icon={IconPlus}
        on:click={openSearchModal}
      >
        Add
      </Button>
      <Button
        size="sm"
        color="blue"
        class={dragEnabled ? "reorder-active" : ""}
        on:click={toggleDragMode}
      >
        {dragEnabled ? "Done" : "Reorder"}
      </Button>
      <div class="sort-dropdown-container">
        <Button
          size="sm"
          color="blue"
          class="sort-button"
          on:click={toggleSortDropdown}
        >
          Sort
          <svg
            class="sort-chevron"
            class:open={showSortDropdown}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </Button>
        <div class="sort-dropdown" class:hidden={!showSortDropdown}>
          <button class="sort-option" on:click={sortAlphabetically}>
            A-Z by Name
          </button>
          <button class="sort-option" on:click={sortByCategory}>
            A-Z by Category
          </button>
        </div>
      </div>
      <Button
        size="sm"
        color="orange"
        icon={IconRandom}
        on:click={handlePlayRandomFavorite}
      >
        Random
      </Button>
      {#if canUndo}
        <Button size="sm" color="neutral" on:click={undo}>Undo</Button>
      {/if}
    </div>
  {/if}

  <div class="list-content">
    {#if $favorites.length === 0}
      <div class="empty-state">
        <p class="empty-message">No favorites yet.</p>
        <Button
          size="sm"
          color="green"
          icon={IconPlus}
          on:click={openSearchModal}
        >
          Add Favorite
        </Button>
      </div>
    {:else}
      {#if viewMode === "row"}
        <div class="reorder-wrapper" class:reorder-mode={dragEnabled}>
          <div
            class="favorites-list"
            use:dndzone={{
              items,
              dragDisabled: !dragEnabled,
              dropTargetStyle: {},
              type: section,
              transformDraggedElement: (el) => {
                el.style.willChange = "transform"
                el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
                el.style.opacity = "0.95"
              },
            }}
            on:consider={handleDndConsider}
            on:finalize={handleDndFinalize}
          >
            {#each items as favorite, index (favorite.id)}
              {@const popupKey = `${section}-${favorite.id}`}
              <div
                class="favorite-item"
                class:even-row={index % 2 === 0}
                class:odd-row={index % 2 !== 0}
                class:drag-enabled={dragEnabled}
                class:played={$playedDleIdsSet.has(favorite.id)}
              >
                <div class="dle-info">
                  <div
                    class="position-number"
                    style="--category-color: {$categoryColors[
                      favorite.category
                    ]};"
                  >
                    {index + 1}
                  </div>
                  <div class="dle-details">
                    {#if dragEnabled}
                      <span
                        class="dle-name-btn drag-mode"
                        bind:this={referenceElements[popupKey]}
                      >
                        {favorite.name}
                      </span>
                    {:else}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <span
                        class="dle-name-btn"
                        role="button"
                        tabindex="0"
                        bind:this={referenceElements[popupKey]}
                        on:click={(e) => handleNameClick(e, favorite, index)}
                        on:auxclick={() => handleAuxClick(favorite, index)}
                      >
                        {favorite.name}
                      </span>
                    {/if}
                    {#if showCategory}
                      <div class="dle-category">{favorite.category}</div>
                    {/if}
                  </div>
                </div>
                <div class="favorite-actions">
                  {#if dragEnabled}
                    <button
                      class="move-btn"
                      on:click={() => moveToTop(index)}
                      disabled={index === 0}
                      title="Move to top"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="rotate-180"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.53 15.28a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 1 1 1.06-1.06L10 13.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25ZM14.78 5.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 6.53a.75.75 0 0 1 1.06-1.06L10 9.19l3.72-3.72a.75.75 0 0 1 1.06 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      class="move-btn"
                      on:click={() => moveToBottom(index)}
                      disabled={index === items.length - 1}
                      title="Move to bottom"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.53 15.28a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 1 1 1.06-1.06L10 13.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25ZM14.78 5.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 6.53a.75.75 0 0 1 1.06-1.06L10 9.19l3.72-3.72a.75.75 0 0 1 1.06 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div class="drag-handle">
                      <IconDragHandle />
                    </div>
                  {:else}
                    <button
                      class="play-btn"
                      on:click={() => handlePlayClick(favorite, index)}
                    >
                      Play
                    </button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <!-- Grid view -->
        <div class="reorder-wrapper" class:reorder-mode={dragEnabled}>
          <div
            class="favorites-grid"
            use:dndzone={{
              items,
              dragDisabled: !dragEnabled,
              dropTargetStyle: {},
              type: section,
            }}
            on:consider={handleDndConsider}
            on:finalize={handleDndFinalize}
          >
            {#each items as favorite, index (favorite.id)}
              {@const popupKey = `${section}-${favorite.id}`}
              <div
                class="grid-card"
                class:drag-enabled={dragEnabled}
                class:played={$playedDleIdsSet.has(favorite.id)}
              >
                <div class="grid-card-inner">
                  <div
                    class="position-number"
                    style="--category-color: {$categoryColors[
                      favorite.category
                    ]};"
                  >
                    {index + 1}
                  </div>
                  <div class="grid-card-details">
                    {#if dragEnabled}
                      <span
                        class="dle-name-btn grid-name drag-mode"
                        bind:this={referenceElements[popupKey]}
                      >
                        {favorite.name}
                      </span>
                    {:else}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <span
                        class="dle-name-btn grid-name"
                        role="button"
                        tabindex="0"
                        bind:this={referenceElements[popupKey]}
                        on:click={(e) => handleNameClick(e, favorite, index)}
                        on:auxclick={() => handleAuxClick(favorite, index)}
                      >
                        {favorite.name}
                      </span>
                    {/if}
                    {#if showCategory}
                      <div class="dle-category">{favorite.category}</div>
                    {/if}
                  </div>
                </div>
                {#if dragEnabled}
                  <div class="drag-handle">
                    <IconDragHandle />
                  </div>
                {:else}
                  <button
                    class="play-btn"
                    on:click={() => handlePlayClick(favorite, index)}
                  >
                    Play
                  </button>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
      {#each items as favorite (favorite.id)}
        {@const popupKey = `${section}-${favorite.id}`}
        {#if $poppedUpDle === popupKey}
          <DlePopUp
            dle={favorite}
            {handleClickOutside}
            {section}
            position={items.findIndex((f) => f.id === favorite.id)}
            referenceEl={referenceElements[popupKey]}
          />
        {/if}
      {/each}
    {/if}
  </div>
</div>

{#if showSearchModal}
  <SearchModal onClose={closeSearchModal} zIndex={searchModalZIndex} />
{/if}

<style lang="postcss">
  .favorites-list-container {
    @apply flex flex-col;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .actions-bar {
    @apply flex justify-center gap-1 flex-wrap p-2 border-b border-colorTextSoftest;
    flex-shrink: 0;
  }

  .sort-dropdown-container {
    @apply relative flex;
  }

  :global(.sort-button) {
    @apply px-3;
  }

  .sort-chevron {
    @apply w-3.5 h-3.5 ml-1 transition-transform duration-150;
  }

  .sort-chevron.open {
    @apply rotate-180;
  }

  .sort-dropdown {
    @apply absolute top-full left-0 mt-1 bg-colorBackground border border-colorTextSofter shadow-lg rounded-sm z-10 min-w-max;
  }

  .sort-dropdown.hidden {
    @apply invisible pointer-events-none;
  }

  .sort-option {
    @apply block w-full text-left px-3 py-1.5 text-xs font-medium text-colorText hover:bg-colorCardC transition-colors cursor-pointer border-none bg-transparent;
  }

  .sort-option:first-child {
    @apply rounded-t-sm;
  }

  .sort-option:last-child {
    @apply rounded-b-sm;
  }

  .list-content {
    @apply p-2 flex flex-col gap-2 overflow-y-auto;
    flex: 1;
    min-height: 0;
  }

  .empty-state {
    @apply flex flex-col items-center gap-3 py-6;
  }

  .empty-message {
    @apply text-center text-sm text-colorTextSoft;
  }

  .reorder-wrapper {
    @apply transition-all duration-200;
  }

  .reorder-wrapper.reorder-mode {
    @apply bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-600 rounded-md p-2 pr-12 md:pr-2;
    overflow: visible;
  }

  .reorder-wrapper.reorder-mode .favorite-item {
    will-change: transform;
  }

  .favorites-list {
    @apply rounded-sm border border-colorNeutralSoft overflow-hidden;
  }

  .favorite-item {
    @apply flex items-center justify-between p-2 md:p-1 pr-1.5 border-none w-full text-left;
    transition: background-color 0.15s ease;
  }

  .favorite-item.even-row {
    @apply bg-colorCardB;
  }

  .favorite-item.odd-row {
    @apply bg-colorCardA;
  }

  .favorite-item.played {
    opacity: var(--dle-played-opacity);
  }

  .favorite-item.drag-enabled,
  .favorite-item.drag-enabled *:not(.move-btn):not(.move-btn *),
  .favorite-item.drag-enabled:hover,
  .favorite-item.drag-enabled *:not(.move-btn):not(.move-btn *):hover {
    cursor: grab !important;
  }

  .favorite-item.drag-enabled:active,
  .favorite-item.drag-enabled *:not(.move-btn):not(.move-btn *):active {
    cursor: grabbing !important;
  }

  .favorite-item.drag-enabled {
    touch-action: none;
    user-select: none;
  }

  .dle-info {
    @apply flex items-center gap-2 flex-1 min-w-0;
  }

  .position-number {
    @apply rounded flex items-center justify-center flex-shrink-0 w-6 h-6 text-colorText text-xs font-bold border border-colorTextSofter relative overflow-hidden;
    isolation: isolate;
  }

  .position-number::before {
    content: "";
    @apply absolute inset-0;
    background-color: var(--category-color);
    opacity: 0.5;
    z-index: -1;
  }

  :global(.dark) .position-number::before {
    opacity: 1;
  }

  .dle-details {
    @apply flex-1 min-w-0;
  }

  .dle-name-btn {
    @apply font-medium text-colorText text-base md:text-lg leading-tight inline text-left;
    @apply underline decoration-colorTextSoftest hover:text-colorTextSoft hover:decoration-colorTextSoft transition-colors cursor-pointer;
    @apply bg-transparent border-none p-0 m-0;
    text-decoration-thickness: 1px;
  }

  .dle-name-btn.drag-mode {
    @apply no-underline cursor-grab;
  }

  .dle-name-btn.drag-mode:active {
    @apply cursor-grabbing;
  }

  .dle-category {
    @apply text-xs md:text-sm text-colorTextSoft;
  }

  .favorite-actions {
    @apply flex-shrink-0 ml-1.5 flex items-center gap-1;
  }

  .play-btn {
    @apply px-2 py-1 text-xs md:text-sm font-medium uppercase cursor-pointer;
    @apply bg-colorCardC text-colorTextSofter border border-colorTextSoftest;
    @apply hover:bg-colorCardA transition-colors;
  }

  .move-btn {
    @apply p-1 bg-transparent border-none cursor-pointer text-colorTextSofter hover:text-colorText transition-colors;
  }

  .move-btn:disabled {
    @apply opacity-30 cursor-default;
  }

  .move-btn svg {
    @apply w-5 h-5;
  }

  .drag-handle {
    @apply text-colorTextSofter flex items-center px-0.5 ml-1;
  }

  .drag-handle :global(svg) {
    @apply w-3.5 h-3.5;
  }

  :global(.reorder-active) {
    background-color: rgb(191 219 254) !important; /* blue-200 */
    border-color: rgb(96 165 250) !important; /* blue-400 */
  }

  :global(.reorder-active:hover) {
    background-color: rgb(147 197 253) !important; /* blue-300 */
  }

  :global(.dark .reorder-active) {
    background-color: rgb(29 78 216) !important; /* blue-700 */
    border-color: rgb(59 130 246) !important; /* blue-500 */
  }

  :global(.dark .reorder-active:hover) {
    background-color: rgb(37 99 235) !important; /* blue-600 */
  }

  /* Grid view styles */
  .favorites-grid {
    @apply grid grid-cols-2 md:grid-cols-3 gap-1.5;
  }

  .grid-card {
    @apply flex items-center justify-between p-2 gap-1.5 rounded-sm border border-colorNeutralSoft bg-colorCardB;
    transition: background-color 0.15s ease;
  }

  .grid-card:nth-child(even) {
    @apply bg-colorCardA;
  }

  .grid-card.played {
    opacity: var(--dle-played-opacity);
  }

  .grid-card.drag-enabled,
  .grid-card.drag-enabled *:not(.play-btn),
  .grid-card.drag-enabled:hover,
  .grid-card.drag-enabled *:not(.play-btn):hover {
    cursor: grab !important;
  }

  .grid-card.drag-enabled:active,
  .grid-card.drag-enabled *:not(.play-btn):active {
    cursor: grabbing !important;
  }

  .grid-card-inner {
    @apply flex items-center gap-2 min-w-0 flex-1;
  }

  .grid-card-details {
    @apply flex-1 min-w-0;
  }

  .dle-name-btn.grid-name {
    @apply text-sm leading-tight;
  }

  .grid-card .dle-category {
    @apply text-xs;
  }

  .grid-card .play-btn {
    @apply text-xs px-1 py-0.5;
  }
</style>
