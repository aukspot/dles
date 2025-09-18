<script>
  import { poppedUpDle, newDles, favorites } from "$lib/stores"
  import { openInNewTab, isLocalStorageAvailable } from "$lib/js/utilities"
  import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"
  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"
  import IconDragHandle from "../Icons/IconDragHandle.svelte"

  export let pageX
  export let pageY
  export let clientY
  export let dleGroup
  export let section = 'regular'
  export let reorderable = false
  export let editMode = false

  let draggedIndex = null
  let dragOverIndex = null

  function isNewDle(dle) {
    return $newDles.filter((d) => d.url === dle.url).length === 1
  }

  function isFavorited(dle) {
    return $favorites.some((favorite) => favorite.name === dle.name)
  }

  // function groupDlesByTheme(dles) {
  //   const grouped = {}
  //   
  //   // Special handling for Video Games - group all themed games together
  //   if (category === "Video Games") {
  //     for (const dle of dles) {
  //       const theme = dle.theme ? "Themed" : "General"
  //       if (!grouped[theme]) {
  //         grouped[theme] = []
  //       }
  //       grouped[theme].push(dle)
  //     }
  //   } else {
  //     // Normal grouping by individual themes for other categories
  //     for (const dle of dles) {
  //       const theme = dle.theme || "General"
  //       if (!grouped[theme]) {
  //         grouped[theme] = []
  //       }
  //       grouped[theme].push(dle)
  //     }
  //   }

  //   // Sort themes with "General" first, then alphabetically
  //   const sortedThemes = Object.keys(grouped).sort((a, b) => {
  //     if (a === "General") return -1
  //     if (b === "General") return 1
  //     return a.localeCompare(b)
  //   })

  //   const result = {}
  //   for (const theme of sortedThemes) {
  //     result[theme] = grouped[theme]
  //   }

  //   return result
  // }

  // $: groupedDles = showThemes ? groupDlesByTheme(dleGroup) : { "": dleGroup }

  function handleClickOutside(event) {
    const originalEvent = event.detail?.originalEvent
    const target = originalEvent?.target

    // Don't close if clicking inside the popup
    if (target && target.closest(".dlePopUp")) {
      return
    }

    $poppedUpDle = ""
  }

  function handleDragStart(event, index) {
    if (!reorderable || !editMode) return
    draggedIndex = index
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/html", event.target)
  }

  function handleDragOver(event, index) {
    if (!reorderable || !editMode || draggedIndex === null) return
    event.preventDefault()
    dragOverIndex = index
  }

  function handleDragEnd() {
    if (!reorderable || !editMode) return

    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newFavorites = [...$favorites]
      const draggedItem = newFavorites[draggedIndex]

      // Remove the dragged item
      newFavorites.splice(draggedIndex, 1)
      // Insert it at the new position
      newFavorites.splice(dragOverIndex, 0, draggedItem)

      $favorites = newFavorites

      if (isLocalStorageAvailable()) {
        localStorage.favorites = JSON.stringify($favorites)
      }
    }

    draggedIndex = null
    dragOverIndex = null
  }

  function handleDragLeave() {
    dragOverIndex = null
  }

  function handleAuxClick(dle, position) {
    handleGameClick(dle, position, 'middle-click');
  }

  function handleCtrlClick(dle, position) {
    handleGameClick(dle, position, 'ctrl-click');
  }

  function handleGameClick(dle, position, clickType) {
    const trackingData = createTrackingData(dle, clickType, 'list', section, position);
    trackEvent('game-click', trackingData, `DleGroup ${clickType}`);
    openInNewTab(dle.url, trackingData);
  }
</script>

<div>
  <ol class="dleList">
    {#each dleGroup as dle, j (reorderable ? dle.name : j)}
      <li
        class="dleContainer"
        class:dragging={reorderable && editMode && draggedIndex === j}
        class:drag-over={reorderable && editMode && dragOverIndex === j}
        draggable={reorderable && editMode}
        on:dragstart={(e) => handleDragStart(e, j)}
        on:dragover={(e) => handleDragOver(e, j)}
        on:dragend={handleDragEnd}
        on:dragleave={handleDragLeave}
      >
        <div class="dleTop" class:draggable-row={reorderable && editMode}>
          <div class="dleLeft">
            <div class="dle-name-container">
              <button
                class="dleName"
                class:with-drag-handle={reorderable && editMode}
                on:click={(e) => {
                  if (reorderable && editMode) return // Disable popup in edit mode

                  // If Ctrl/Cmd is held, navigate directly to the game
                  if (e.ctrlKey || e.metaKey) {
                    handleCtrlClick(dle, j);
                    return;
                  }

                  // Otherwise, show/hide popup
                  // Use section + name to make popup unique per section
                  const popupKey = `${section}-${dle.name}`
                  $poppedUpDle === popupKey
                    ? ($poppedUpDle = "")
                    : ($poppedUpDle = popupKey)
                  pageX = e.pageX
                  pageY = e.pageY
                  clientY = e.clientY
                }}
                on:auxclick={(e) => handleAuxClick(dle, j)}
              >
                {dle.name}
              </button>
              {#if isNewDle(dle)}
                <IconNew />
              {/if}
            </div>
          </div>
          {#if reorderable && editMode}
            <div class="drag-handle">
              <IconDragHandle />
            </div>
          {:else}
            <div class="hover-favorite" class:favorited={isFavorited(dle)}>
              <FavoriteButton {dle} size="small" />
            </div>
          {/if}
        </div>
        {#if $poppedUpDle === `${section}-${dle.name}` && !(reorderable && editMode)}
          <DlePopUp {dle} {pageX} {pageY} {clientY} {handleClickOutside} {section} position={j} />
        {/if}
      </li>
    {/each}
  </ol>
</div>

<style lang="postcss">
  .dleContainer {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA transition-all duration-200;
  }

  .dleContainer.dragging {
    @apply opacity-50 scale-105;
  }

  .dleContainer.drag-over {
    @apply border-t-2 border-blue-500;
  }

  .dleTop {
    @apply p-1 px-2 flex items-center justify-between;
  }

  .dleTop.draggable-row {
    @apply cursor-move;
  }

  .dleLeft {
    @apply flex items-center gap-1;
  }

  .drag-handle {
    @apply text-colorTextSofter transition-colors flex items-center flex-shrink-0;
  }

  .dleName {
    @apply inline text-left text-base text-colorText underline decoration-colorTextSoftest cursor-pointer hover:text-colorTextSoft hover:decoration-colorTextSoft hover:transition-all hover:duration-300;
    text-decoration-thickness: 2px;
    padding: 0;
    border: none;
    background: none;
    display: inline;
  }

  .dleName.with-drag-handle {
    @apply cursor-move;
  }

  /* Different hover color in edit mode */
  .dleName.with-drag-handle:hover {
    @apply text-blue-600 decoration-blue-400;
  }

  /* Subtle background highlight when hovering in edit mode */
  .dleContainer:has(.dleName.with-drag-handle):hover {
    @apply bg-blue-50;
  }

  :global(.dark) .dleContainer:has(.dleName.with-drag-handle):hover {
    @apply bg-blue-900/20;
  }

  .hover-favorite {
    @apply opacity-0 transition-opacity duration-200 flex items-center flex-shrink-0;
  }

  .hover-favorite.favorited {
    @apply opacity-100;
  }

  .dleContainer:hover .hover-favorite {
    @apply opacity-100;
  }

  @media (max-width: 768px) {
    .hover-favorite {
      @apply opacity-100;
    }
  }
</style>
