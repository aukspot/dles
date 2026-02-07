<script>
  import {
    poppedUpDle,
    newDles,
    favorites,
    favoriteIds,
    hiddenDleIdsSet,
    playedDleIdsSet,
  } from "$lib/stores"
  import { openInNewTab, isLocalStorageAvailable } from "$lib/js/utilities"
  import { useTracking } from "$lib/composables/useTracking.js"
  import { usePlayedDles } from "$lib/composables/usePlayedDles.js"
  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import IconDragHandle from "../Icons/IconDragHandle.svelte"
  import { dndzone } from "svelte-dnd-action"
  import { flip } from "svelte/animate"

  export let dleGroup
  export let section = "regular"
  export let reorderable = false
  export let editMode = false
  export let showCategoryIcon = false

  const tracking = useTracking()
  const playedDles = usePlayedDles()

  let items = []
  let referenceElements = {}

  $: items = dleGroup
    .filter((dle) => !$hiddenDleIdsSet.has(dle.id))
    .map((dle, idx) => ({ ...dle, id: dle.id || dle.name }))

  function isNewDle(dle) {
    return $newDles.filter((d) => d.url === dle.url).length === 1
  }

  function isFavorited(dle) {
    return $favoriteIds.includes(dle.id)
  }

  function isPlayed(dle) {
    return $playedDleIdsSet.has(dle.id)
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

  function handleDndConsider(e) {
    items = e.detail.items
  }

  function handleDndFinalize(e) {
    if (!reorderable || !editMode) return

    items = e.detail.items

    // Update favoriteIds based on new order
    const newFavoriteIds = items.map((item) => item.id)
    $favoriteIds = newFavoriteIds

    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify($favoriteIds)
    }
  }

  function handleAuxClick(dle, position) {
    handleGameClick(dle, position, "middle-click")
  }

  function handleCtrlClick(dle, position) {
    handleGameClick(dle, position, "ctrl-click")
  }

  function handleGameClick(dle, position, clickType) {
    if (section === "sponsors") {
      tracking.trackSponsorClick(dle, clickType, position)
    } else {
      tracking.trackGameClick(dle, clickType, "list", section, position)
    }
    // Auto-mark as played when clicking the link
    playedDles.markAsPlayed(dle)
    openInNewTab(dle.url)
  }
</script>

<div>
  <ol
    class="dleList"
    use:dndzone={{
      items,
      dragDisabled: !(reorderable && editMode),
      dropTargetStyle: {},
    }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each items as dle, j (dle.id || dle.name)}
      <li class="dleContainer" class:played={$playedDleIdsSet.has(dle.id)}>
        <div class="dleTop" class:draggable-row={reorderable && editMode}>
          <div class="dleLeft">
            <div class="dle-name-container">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="dleName"
                class:with-drag-handle={reorderable && editMode}
                role="button"
                tabindex="0"
                bind:this={referenceElements[`${section}-${dle.name}`]}
                on:click={(e) => {
                  if (reorderable && editMode) return

                  if (e.ctrlKey || e.metaKey) {
                    handleCtrlClick(dle, j)
                    return
                  }

                  const popupKey = `${section}-${dle.name}`
                  $poppedUpDle === popupKey
                    ? ($poppedUpDle = "")
                    : ($poppedUpDle = popupKey)
                }}
                on:auxclick={(e) => handleAuxClick(dle, j)}
              >
                {dle.name}
              </span>
              {#if showCategoryIcon && dle.category && categoryIcons[dle.category]}
                <span class="category-icon">
                  <svelte:component this={categoryIcons[dle.category]} />
                </span>
              {/if}
              {#if section !== "new" && isNewDle(dle)}
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
              <FavoriteButton {dle} {section} position={j} size="small" />
            </div>
          {/if}
        </div>
        {#if $poppedUpDle === `${section}-${dle.name}` && !(reorderable && editMode)}
          <DlePopUp
            {dle}
            {handleClickOutside}
            {section}
            position={j}
            referenceEl={referenceElements[`${section}-${dle.name}`]}
          />
        {/if}
      </li>
    {/each}
  </ol>
</div>

<style lang="postcss">
  .dleContainer {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
    /* Specific transitions to avoid flash during theme toggle */
    transition:
      opacity 200ms ease,
      transform 200ms ease,
      border-color 200ms ease;
  }

  .dleContainer.played .dleTop {
    opacity: var(--dle-played-opacity);
  }

  .dleTop {
    @apply p-1 px-2 flex items-center justify-between;
  }

  .dleTop.draggable-row {
    cursor: grab !important;
  }

  .dleTop.draggable-row:active {
    cursor: grabbing !important;
  }

  .dleTop.draggable-row *,
  .dleTop.draggable-row *:hover {
    cursor: grab !important;
  }

  .dleTop.draggable-row:active *,
  .dleTop.draggable-row:active *:hover {
    cursor: grabbing !important;
  }

  .dleLeft {
    @apply flex items-center gap-1;
    min-width: 0;
    flex: 1;
    overflow: hidden;
  }

  .dle-name-container {
    min-width: 0;
    display: inline;
  }

  .dle-name-container :global(svg) {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.25rem;
  }

  .category-icon {
    display: inline-block;
    vertical-align: top;
    margin-right: 0.25rem;
    opacity: 0.25;
  }

  .category-icon :global(svg) {
    width: 1.2rem;
    height: 1.2rem;
  }

  .drag-handle {
    @apply text-colorTextSofter transition-colors flex items-center flex-shrink-0;
  }

  .dleName {
    @apply text-left text-base text-colorText underline decoration-colorTextSoftest cursor-pointer hover:text-colorTextSoft hover:decoration-colorTextSoft hover:transition-colors hover:duration-300;
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

  @media (max-width: 48em) {
    .hover-favorite {
      @apply opacity-100;
    }
  }
</style>
