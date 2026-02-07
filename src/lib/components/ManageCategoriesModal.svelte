<script>
  import {
    categories,
    categoryRanks,
    categoryColors,
    completelyHiddenSections,
  } from "$lib/stores"
  import IconEye from "./Icons/IconEye.svelte"
  import IconEyeSlash from "./Icons/IconEyeSlash.svelte"
  import IconFavoriteOutline from "./Icons/IconFavoriteOutline.svelte"
  import IconCalendarHeart from "./Icons/IconCalendarHeart.svelte"
  import Modal from "./Modal.svelte"
  import ModalHeader from "./ModalHeader.svelte"
  import { dndzone } from "svelte-dnd-action"
  import { flip } from "svelte/animate"
  import { onMount } from "svelte"
  import IconFavoriteFilled from "./Icons/IconFavoriteFilled.svelte"
  import IconSunrise from "./Icons/IconSunrise.svelte"

  export let onClose

  let categoryItems = []
  const flipDurationMs = 200
  let isDragging = false
  let reorderMode = false
  let isMobile = false

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  // Initialize category items once on mount
  onMount(() => {
    initCategoryItems()
  })

  function initCategoryItems() {
    const ranksArray = Object.entries($categoryRanks).sort(
      (a, b) => a[1] - b[1],
    )
    const visible = ranksArray.filter(
      ([cat]) => !$completelyHiddenSections[cat],
    )
    const hidden = ranksArray.filter(([cat]) => $completelyHiddenSections[cat])
    categoryItems = [...visible, ...hidden].map(([category]) => ({
      id: category,
      category: category,
    }))
  }

  function handleDndConsider(e) {
    categoryItems = e.detail.items
    isDragging = true
  }

  function handleDndFinalize(e) {
    categoryItems = e.detail.items
    saveChanges()
    setTimeout(() => {
      isDragging = false
    }, 100)
  }

  function saveChanges() {
    const newRanks = {}
    categoryItems.forEach((item, index) => {
      newRanks[item.category] = index + 1
    })
    categoryRanks.bulkSetRanks(newRanks)
  }

  function resetToDefault() {
    categoryRanks.reset()
    completelyHiddenSections.reset()
    // Reinitialize after a tick to let stores update
    setTimeout(() => initCategoryItems(), 0)
  }

  function toggleCompletelyHidden(sectionId) {
    if ($completelyHiddenSections[sectionId]) {
      completelyHiddenSections.show(sectionId)
    } else {
      completelyHiddenSections.completelyHide(sectionId)
    }
    // Re-sort items: visible first, then hidden
    setTimeout(() => {
      resortCategoryItems()
    }, 0)
  }

  function resortCategoryItems() {
    const visibleItems = categoryItems.filter(
      (item) => !$completelyHiddenSections[item.category],
    )
    const hiddenItems = categoryItems.filter(
      (item) => $completelyHiddenSections[item.category],
    )
    categoryItems = [...visibleItems, ...hiddenItems]
    saveChanges()
  }

  function toggleReorderMode() {
    reorderMode = !reorderMode
  }
</script>

<Modal {onClose} overlay={true} zIndex={1000} closeOnClickOutside={false}>
  <div class="modal-container">
    <ModalHeader title="Manage Categories" {onClose} variant="section" />

    <div class="modal-content">
      <section class="section">
        <h3 class="section-subtitle">Special Sections</h3>
        <p class="section-hint">click to hide/show sections</p>
        <div class="special-sections-grid">
          <button
            class="special-section-card"
            class:section-hidden={$completelyHiddenSections["dlesOfTheWeek"]}
            on:click={() => toggleCompletelyHidden("dlesOfTheWeek")}
            title={$completelyHiddenSections["dlesOfTheWeek"]
              ? "Show DLES of the Week"
              : "Hide DLES of the Week"}
          >
            <div class="special-section-icon">
              <IconCalendarHeart />
            </div>
            <span class="special-section-name">DLES of the Week</span>
            <div class="special-section-toggle">
              {#if $completelyHiddenSections["dlesOfTheWeek"]}
                <IconEyeSlash />
              {:else}
                <IconEye />
              {/if}
            </div>
          </button>

          <button
            class="special-section-card"
            class:section-hidden={$completelyHiddenSections["favorites"]}
            on:click={() => toggleCompletelyHidden("favorites")}
            title={$completelyHiddenSections["favorites"]
              ? "Show Favorites"
              : "Hide Favorites"}
          >
            <div class="special-section-icon">
              <IconFavoriteFilled />
            </div>
            <span class="special-section-name">Favorites</span>
            <div class="special-section-toggle">
              {#if $completelyHiddenSections["favorites"]}
                <IconEyeSlash />
              {:else}
                <IconEye />
              {/if}
            </div>
          </button>

          <button
            class="special-section-card"
            class:section-hidden={$completelyHiddenSections["new"]}
            on:click={() => toggleCompletelyHidden("new")}
            title={$completelyHiddenSections["new"] ? "Show NEW" : "Hide NEW"}
          >
            <div class="special-section-icon">
              <IconSunrise />
            </div>
            <span class="special-section-name">NEW</span>
            <div class="special-section-toggle">
              {#if $completelyHiddenSections["new"]}
                <IconEyeSlash />
              {:else}
                <IconEye />
              {/if}
            </div>
          </button>
        </div>
      </section>

      <section class="section">
        <h3 class="section-subtitle">Categories</h3>
        <div class="categories-header">
          <p class="section-hint">Drag to reorder, or press the eye to hide</p>
          <button
            class="reorder-toggle-btn md:hidden"
            class:active={reorderMode}
            on:click={toggleReorderMode}
          >
            {reorderMode ? "Done" : "Reorder"}
          </button>
        </div>
        <div
          class="category-grid"
          class:reorder-mode={reorderMode}
          use:dndzone={{
            items: categoryItems,
            flipDurationMs,
            type: "category",
            dropTargetStyle: {},
            dragDisabled: isMobile && !reorderMode,
            morphDisabled: true,
            dropFromOthersDisabled: true,
          }}
          on:consider={handleDndConsider}
          on:finalize={handleDndFinalize}
        >
          {#each categoryItems as item, index (item.id)}
            <div
              class="category-box"
              class:grayed-out={$completelyHiddenSections[item.category]}
            >
              <span
                class="category-rank-badge"
                style="background-color: {$categoryColors[item.category]}"
                >{index + 1}</span
              >
              <div class="category-info">
                <span class="category-name">{item.category}</span>
              </div>
              <button
                class="eye-toggle-btn"
                on:click|stopPropagation={() =>
                  toggleCompletelyHidden(item.category)}
                title={$completelyHiddenSections[item.category]
                  ? "Show category"
                  : "Hide category"}
              >
                {#if $completelyHiddenSections[item.category]}
                  <IconEyeSlash />
                {:else}
                  <IconEye />
                {/if}
              </button>
            </div>
          {/each}
        </div>

        <div class="flex justify-center mt-3">
          <button class="reset-btn" on:click={resetToDefault}>
            Reset to Default
          </button>
        </div>
      </section>
    </div>
  </div>
</Modal>

<style lang="postcss">
  .modal-container {
    @apply bg-colorBackground border border-colorTextSofter shadow-xl;
    width: min(450px, 90vw);
    max-height: 85vh;
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    @apply p-3 flex flex-col gap-4 overflow-y-auto;
    flex: 1;
    min-height: 0;
  }

  .section {
    @apply flex flex-col gap-2;
  }

  .section-subtitle {
    @apply text-sm font-semibold text-colorTextSoft uppercase tracking-wide text-center;
  }

  .section-hint {
    @apply text-center text-xs text-colorTextSofter lowercase;
  }

  .categories-header {
    @apply flex flex-col items-center gap-2;
  }

  .reorder-toggle-btn {
    @apply px-3 py-1 text-xs font-medium text-colorText bg-colorCardC border border-colorTextSofter rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
  }

  .reorder-toggle-btn.active {
    @apply bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-800/50;
  }

  .special-sections-grid {
    @apply flex flex-wrap gap-1 justify-center;
  }

  .special-section-card {
    @apply flex items-center gap-2 px-1.5 py-1 bg-colorCardC border border-colorTextSofter
           hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors;
    min-height: 2.5rem;
  }

  .special-section-card.section-hidden {
    @apply opacity-40 bg-gray-200 border-dashed;
  }

  :global(.dark) .special-section-card.section-hidden {
    @apply bg-gray-800;
  }

  .special-section-icon {
    @apply flex-shrink-0;
  }

  .special-section-icon :global(svg) {
    @apply w-5 h-5;
  }

  .special-section-name {
    @apply flex-1 text-left text-tiny sm:text-xs font-medium text-colorText uppercase leading-tight;
  }

  .special-section-toggle {
    @apply flex-shrink-0 flex items-center;
  }

  .special-section-toggle :global(svg) {
    @apply w-3.5 h-3.5 text-colorTextSofter;
  }

  .category-grid {
    @apply grid grid-cols-2 gap-1;
    outline: none !important;
  }

  .category-grid.reorder-mode {
    @apply bg-blue-50 dark:bg-blue-900/20 p-2 rounded-sm border-2 border-dashed border-blue-300 dark:border-blue-700;
  }

  .category-grid:focus {
    outline: none !important;
  }

  .category-grid > * {
    height: 100%;
    outline: none !important;
  }

  .category-grid > *:focus {
    outline: none !important;
  }

  .category-box {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "badge name eye"
      "badge name eye";
    @apply gap-2 p-1 bg-colorCardC border border-colorTextSofter relative
           hover:bg-gray-100 dark:hover:bg-gray-700;
    min-height: 2rem;
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-y;
    outline: none !important;
    box-shadow: none !important;
  }

  .category-grid.reorder-mode .category-box {
    touch-action: none;
    cursor: grab;
  }

  .category-box:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .category-box:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }

  :global(.category-box[aria-grabbed="true"]) {
    @apply opacity-50 cursor-grabbing;
    outline: none !important;
    box-shadow: none !important;
  }

  :global(.category-box[aria-dropeffect="move"]) {
    @apply border-blue-500 bg-blue-50;
    outline: none !important;
    box-shadow: none !important;
  }

  :global(.dark .category-box[aria-dropeffect="move"]) {
    @apply border-blue-400 bg-blue-900/30;
    outline: none !important;
    box-shadow: none !important;
  }

  .category-box.grayed-out {
    @apply opacity-40 bg-gray-200 border-dashed;
  }

  :global(.dark) .category-box.grayed-out {
    @apply bg-gray-800;
  }

  .category-rank-badge {
    grid-area: badge;
    @apply bg-colorTextSoft text-colorText text-xs font-bold flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-sm border border-colorText;
  }

  .category-info {
    grid-area: name;
    @apply flex items-center min-w-0;
  }

  .category-name {
    @apply text-colorText font-medium text-tiny md:text-xs uppercase leading-tight break-all md:break-normal;
  }

  .eye-toggle-btn {
    grid-area: eye;
    @apply p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-sm text-colorTextSofter hover:text-colorText border border-transparent hover:border-colorTextSofter flex-shrink-0 flex items-center justify-center self-center;
    cursor: pointer;
    border-style: solid;
  }

  .eye-toggle-btn:hover {
    border-style: dashed;
  }

  .eye-toggle-btn :global(svg) {
    @apply w-3.5 h-3.5;
  }

  .reset-btn {
    @apply px-4 py-2 text-sm font-medium text-colorText bg-colorCardC border border-colorTextSofter
           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer;
  }
</style>
