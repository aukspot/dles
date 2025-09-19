<script>
  import { poppedUpDle, newDles, favorites, favoriteIds } from "$lib/stores"
  import { openInNewTab, isLocalStorageAvailable } from "$lib/js/utilities"
  import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"
  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"
  import IconDragHandle from "../Icons/IconDragHandle.svelte"
  import { onDestroy } from "svelte"

  export let pageX
  export let pageY
  export let clientY
  export let dleGroup
  export let section = 'regular'
  export let reorderable = false
  export let editMode = false

  let draggedIndex = null
  let dragOverIndex = null
  let touchStartY = 0
  let touchCurrentY = 0
  let isDragging = false
  let draggedElement = null
  let touchOffset = { x: 0, y: 0 }
  let originalBodyOverflow = ''
  let originalBodyPosition = ''

  function isNewDle(dle) {
    return $newDles.filter((d) => d.url === dle.url).length === 1
  }

  function isFavorited(dle) {
    return $favoriteIds.includes(dle.id)
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
      // Get the actual dle IDs from the displayed (possibly filtered) list
      const draggedDle = dleGroup[draggedIndex]
      const targetDle = dleGroup[dragOverIndex]

      if (!draggedDle || !targetDle) return

      const newFavoriteIds = [...$favoriteIds]

      // Find actual positions in the full favorites list
      const actualDraggedIndex = newFavoriteIds.indexOf(draggedDle.id)
      const actualTargetIndex = newFavoriteIds.indexOf(targetDle.id)

      if (actualDraggedIndex === -1 || actualTargetIndex === -1) return

      // Remove the dragged item from its current position
      newFavoriteIds.splice(actualDraggedIndex, 1)

      // Find the new target index (it might have shifted after removal)
      const updatedTargetIndex = newFavoriteIds.indexOf(targetDle.id)
      const insertIndex = draggedIndex < dragOverIndex ? updatedTargetIndex + 1 : updatedTargetIndex

      // Insert at the new position
      newFavoriteIds.splice(insertIndex, 0, draggedDle.id)

      $favoriteIds = newFavoriteIds

      if (isLocalStorageAvailable()) {
        localStorage.favorites = JSON.stringify($favoriteIds)
      }
    }

    draggedIndex = null
    dragOverIndex = null
  }

  function handleDragLeave() {
    dragOverIndex = null
  }

  function preventBodyScroll() {
    if (typeof document !== 'undefined') {
      originalBodyOverflow = document.body.style.overflow
      originalBodyPosition = document.body.style.position
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    }
  }

  function restoreBodyScroll() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.position = originalBodyPosition
      document.body.style.width = ''
    }
  }

  function cleanupDrag() {
    if (isDragging) {
      if (draggedElement) {
        draggedElement.style.cssText = ''
        draggedElement._lastHitTest = null
      }
      restoreBodyScroll()
      isDragging = false
      draggedElement = null
      draggedIndex = null
      dragOverIndex = null
      touchStartY = 0
      touchCurrentY = 0
      touchOffset = { x: 0, y: 0 }
    }
  }

  // Cleanup on component destroy to ensure body scroll is restored
  onDestroy(() => {
    cleanupDrag()
  })

  function handleTouchStart(event, index) {
    if (!reorderable || !editMode) return

    // Prevent default immediately to stop any scroll behavior
    event.preventDefault()
    event.stopPropagation()

    // Prevent body scrolling during drag
    preventBodyScroll()

    const touch = event.touches[0]
    const target = event.currentTarget

    const rect = target.getBoundingClientRect()
    touchOffset.x = touch.clientX - rect.left
    touchOffset.y = touch.clientY - rect.top

    touchStartY = touch.clientY
    draggedIndex = index
    isDragging = true
    draggedElement = target

    const originalWidth = rect.width
    const originalHeight = rect.height

    target.style.cssText = `
      position: fixed !important;
      z-index: 1000 !important;
      pointer-events: none !important;
      transform: scale(1.05) translate3d(${touch.clientX - touchOffset.x}px, ${touch.clientY - touchOffset.y}px, 0) !important;
      opacity: 0.9 !important;
      width: ${originalWidth}px !important;
      height: ${originalHeight}px !important;
      will-change: transform !important;
      transition: none !important;
      left: 0 !important;
      top: 0 !important;
    `
  }

  function handleTouchMove(event) {
    if (!isDragging || draggedIndex === null || !draggedElement) return

    // Prevent default immediately to stop any scroll behavior
    event.preventDefault()
    event.stopPropagation()

    const touch = event.touches[0]
    touchCurrentY = touch.clientY

    const newX = touch.clientX - touchOffset.x
    const newY = touch.clientY - touchOffset.y

    draggedElement.style.transform = `scale(1.05) translate3d(${newX}px, ${newY}px, 0)`

    if (!draggedElement._lastHitTest || Date.now() - draggedElement._lastHitTest > 16) {
      draggedElement._lastHitTest = Date.now()

      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
      const dleElement = elementBelow?.closest('[data-dle-index]')

      if (dleElement) {
        const newIndex = parseInt(dleElement.dataset.dleIndex)
        if (newIndex !== draggedIndex && !isNaN(newIndex)) {
          dragOverIndex = newIndex
        }
      }
    }
  }

  function handleTouchEnd(event) {
    if (!isDragging) return

    // Prevent default immediately to stop any scroll behavior
    event.preventDefault()
    event.stopPropagation()

    if (draggedElement) {
      draggedElement.style.cssText = ''
      draggedElement._lastHitTest = null
    }

    handleDragEnd()

    // Restore body scrolling
    restoreBodyScroll()

    isDragging = false
    draggedElement = null
    touchStartY = 0
    touchCurrentY = 0
    touchOffset = { x: 0, y: 0 }
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
        data-dle-index={j}
        draggable={reorderable && editMode}
        on:dragstart={(e) => handleDragStart(e, j)}
        on:dragover={(e) => handleDragOver(e, j)}
        on:dragend={handleDragEnd}
        on:dragleave={handleDragLeave}
        on:touchstart={(e) => handleTouchStart(e, j)}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
        on:touchcancel={handleTouchEnd}
      >
        <div class="dleTop" class:draggable-row={reorderable && editMode}>
          <div class="dleLeft">
            <div class="dle-name-container">
              <button
                class="dleName"
                class:with-drag-handle={reorderable && editMode}
                on:click={(e) => {
                  if (reorderable && editMode) return 

                  if (e.ctrlKey || e.metaKey) {
                    handleCtrlClick(dle, j);
                    return;
                  }

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

  /* Prevent scrolling during drag operations */
  .dleContainer[draggable="true"] {
    touch-action: none;
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
    touch-action: none; /* Prevent browser scrolling during drag */
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
