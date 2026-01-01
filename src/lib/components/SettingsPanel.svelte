<script>
  import {
    categories,
    categoryRanks,
    categoryColors,
    settings,
    completelyHiddenSections,
  } from "$lib/stores"
  import IconEye from "./Icons/IconEye.svelte"
  import IconEyeSlash from "./Icons/IconEyeSlash.svelte"
  import IconLightbulb from "./Icons/IconLightbulb.svelte"
  import IconFavoriteOutline from "./Icons/IconFavoriteOutline.svelte"
  import IconCalendarHeart from "./Icons/IconCalendarHeart.svelte"
  import IconClose from "./Icons/IconClose.svelte"
  import Button from "./Button.svelte"
  import { activePanelStore } from "$lib/stores"
  import { trackEvent } from "$lib/js/trackingUtils"
  import { dndzone } from "svelte-dnd-action"
  import { flip } from "svelte/animate"
  import { onMount } from "svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { base } from "$app/paths"
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import { useTheme } from "$lib/composables/useTheme"

  export let open = false

  // Working copy of category items (array of objects with id and category name)
  let categoryItems = []
  const flipDurationMs = 200
  let isDragging = false
  let reorderMode = false
  let isMobile = false

  // Detect if device is mobile
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768 // md breakpoint
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  // Migrate DetailedView to Category View (deprecation)
  onMount(() => {
    if (isLocalStorageAvailable()) {
      const storedView = localStorage.view
      if (storedView === "Detailed View") {
        // Migrate to Category View
        $settings.view = "Category View"
        localStorage.view = "Category View"
      } else {
        $settings.view = storedView || "Category View"
      }
    } else {
      $settings.view = "Category View"
    }
  })

  // Theme management
  const theme = useTheme()
  const { isDark, toggleTheme } = theme

  onMount(() => {
    return theme.initTheme()
  })

  $: themeButtonText = $isDark ? "Turn on light mode" : "Turn on dark mode"

  // View toggle management
  // function toggleView() {
  //   const newView = $settings.view === "Category View" ? "Table View" : "Category View"
  //   $settings.view = newView
  //   if (isLocalStorageAvailable()) {
  //     localStorage.view = newView
  //   }
  //   trackEvent("settings_view_toggle", { view: newView })
  // }

  // $: viewButtonText = $settings.view === "Table View" ? "Switch to Category View" : "Switch to Table View"

  // Initialize category items from current ranks
  // Separate visible and completely hidden categories
  $: {
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
    // Automatically save changes
    saveChanges()
    // Reset drag state after a short delay to prevent click events
    setTimeout(() => {
      isDragging = false
    }, 100)
  }

  function saveChanges() {
    // Convert category items array to ranks object
    const newRanks = {}
    categoryItems.forEach((item, index) => {
      newRanks[item.category] = index + 1 // Ranks are 1-indexed
    })

    categoryRanks.bulkSetRanks(newRanks)
  }

  function resetToDefault() {
    categoryRanks.reset()
    completelyHiddenSections.reset()
  }

  function toggleCompletelyHidden(sectionId) {
    if ($completelyHiddenSections[sectionId]) {
      completelyHiddenSections.show(sectionId)
    } else {
      completelyHiddenSections.completelyHide(sectionId)
    }
  }

  function toggleReorderMode() {
    reorderMode = !reorderMode
  }

  const fontSizes = [
    { label: "Small", value: "-2px" },
    { label: "Default", value: "0px" },
    { label: "Large", value: "2px" },
    { label: "Extra Large", value: "4px" },
  ]

  let currentFontSize = "0px"

  onMount(() => {
    // Just sync the UI state - the CSS variable is already set in +layout.svelte
    if (isLocalStorageAvailable()) {
      const stored = localStorage.fontSizeOffset
      if (stored) {
        currentFontSize = stored
      }
    }
  })

  function changeFontSize(offset) {
    currentFontSize = offset
    document.documentElement.style.setProperty("--font-size-offset", offset)
    if (isLocalStorageAvailable()) {
      localStorage.fontSizeOffset = offset
    }
    trackEvent("settings_font_size_change", { offset })
  }
</script>

<PanelWrapper {open}>
  <PanelTitle color="yellow" title="SETTINGS" />

  <div class="panel-content">
    <section class="preference-section">
      <div class="button-row-center">
        <Button icon={IconLightbulb} on:click={toggleTheme}>
          {themeButtonText}
        </Button>
        <!-- <Button on:click={toggleView}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-5 h-5"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4h18M3 12h18M3 20h18"
            /></svg
          >
          {viewButtonText}
        </Button> -->
        <!-- <a data-sveltekit-reload class="btn-action" href="{base}/favorites">
            Favorites
          </a> -->
      </div>
    </section>

    <section class="preference-section md:hidden">
      <h3 class="section-subtitle">Font Size</h3>
      <p class="text-center text-xs text-colorTextSofter lowercase mb-3">
        (Adjust text size)
      </p>
      <div class="font-size-grid">
        {#each fontSizes as size}
          <button
            class="font-size-button"
            class:active={currentFontSize === size.value}
            on:click={() => changeFontSize(size.value)}
          >
            {size.label}
          </button>
        {/each}
      </div>
    </section>

    <section class="preference-section">
      <h3 class="section-subtitle">Special Sections</h3>
      <p class="text-center text-xs text-colorTextSofter lowercase mb-3">
        (Hide these sections if you want)
      </p>
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
            <IconFavoriteOutline />
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
      </div>
    </section>

    <section class="preference-section">
      <h3 class="section-subtitle">Categories</h3>
      <div class="categories-header">
        <p class="text-center text-xs text-colorTextSofter lowercase mb-3">
          (Drag favorites to the top, or press the eye to hide)
        </p>
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
            animate:flip={{ duration: flipDurationMs }}
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

      <div class="flex justify-center mt-2">
        <button class="btn-action-big mt-3" on:click={resetToDefault}>
          Reset to Default
        </button>
      </div>
    </section>
  </div>
</PanelWrapper>

<style lang="postcss">
  .panel-content {
    @apply p-0;
  }

  .preference-section {
    @apply mb-4;
  }

  .section-subtitle {
    @apply text-sm md:text-base font-semibold text-colorTextSoft uppercase tracking-wide mb-1 text-center;
  }

  .categories-header {
    @apply flex flex-col items-center gap-2 mb-3;
  }

  @media (min-width: 48em) {
    .categories-header {
      @apply mb-0;
    }
  }

  .reorder-toggle-btn {
    @apply px-3 py-1 text-xs font-medium text-colorText bg-colorCardC border border-colorTextSofter rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
  }

  .reorder-toggle-btn.active {
    @apply bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-800/50;
  }

  .button-row-center {
    @apply flex gap-1 mb-3 justify-center;
  }

  .category-grid {
    @apply grid grid-cols-2 md:grid-cols-3 gap-1 mb-2;
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

  /* svelte-dnd-action classes */
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

  /* Special sections styles */
  .special-sections-grid {
    @apply flex flex-wrap gap-1 mb-2 justify-center;
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

  /* Category box updates */
  .category-box.grayed-out {
    @apply opacity-40 bg-gray-200 border-dashed;
  }

  :global(.dark) .category-box.grayed-out {
    @apply bg-gray-800;
  }

  /* Font size controls */
  .font-size-grid {
    @apply grid grid-cols-2 md:grid-cols-4 gap-1 mb-2 justify-center;
  }

  .font-size-button {
    @apply px-3 py-2 text-sm font-medium text-colorText bg-colorCardC border border-colorTextSofter
           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer;
  }

  .font-size-button.active {
    @apply bg-blue-100 border-blue-400 text-blue-700 font-semibold
           dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300;
  }
</style>
