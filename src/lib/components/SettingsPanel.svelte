<script>
  import {
    categories,
    categoryRanks,
    categoryColors,
    settings,
  } from "$lib/stores"
  import IconEye from "./Icons/IconEye.svelte"
  import IconEyeSlash from "./Icons/IconEyeSlash.svelte"
  import IconLightbulb from "./Icons/IconLightbulb.svelte"
  import IconFavoriteOutline from "./Icons/IconFavoriteOutline.svelte"
  import { trackEvent } from "$lib/js/trackingUtils"
  import { dndzone } from "svelte-dnd-action"
  import { flip } from "svelte/animate"
  import { hiddenSections } from "$lib/js/hiddenSections"
  import { onMount } from "svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { base } from "$app/paths"
  import PanelWrapper from "./PanelWrapper.svelte"
  import { useTheme } from "$lib/composables/useTheme"

  export let open = false

  // Working copy of category items (array of objects with id and category name)
  let categoryItems = []
  const flipDurationMs = 200
  let isDragging = false

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

  // Initialize category items from current ranks
  $: {
    const ranksArray = Object.entries($categoryRanks).sort(
      (a, b) => a[1] - b[1],
    )
    categoryItems = ranksArray.map(([category]) => ({
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
    trackEvent("category-ranks-saved", { categories: categoryItems.length })
  }

  function resetToDefault() {
    categoryRanks.reset()
    trackEvent("category-ranks-reset", {})
  }

  function toggleCategoryVisibility(category) {
    if ($hiddenSections[category] === true) {
      hiddenSections.show(category)
    } else {
      hiddenSections.hide(category)
    }
  }
</script>

<PanelWrapper {open}>
  <div class="title mb-4">SETTINGS</div>

  <div class="panel-content">
    <section class="preference-section">
      <div class="button-row-center">
        <button on:click={toggleTheme} class="btn-action">
          <IconLightbulb />
          {themeButtonText}
        </button>
        <!-- <a data-sveltekit-reload class="btn-action" href="{base}/favorites">
            Favorites
          </a> -->
      </div>
    </section>

    <section class="preference-section">
      <h3 class="section-subtitle">Category Priority</h3>
      <p class="text-center text-xs text-colorTextSofter lowercase mb-3">
        (Drag to rearrange, put your favorites at the top)
      </p>
      <div
        class="category-grid"
        use:dndzone={{
          items: categoryItems,
          flipDurationMs,
          type: "category",
        }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each categoryItems as item, index (item.id)}
          <div class="category-box" animate:flip={{ duration: flipDurationMs }}>
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
                toggleCategoryVisibility(item.category)}
              title={$hiddenSections[item.category] === true
                ? "Show category"
                : "Hide category"}
            >
              {#if $hiddenSections[item.category] === true}
                <IconEyeSlash />
              {:else}
                <IconEye />
              {/if}
            </button>
          </div>
        {/each}
      </div>

      <div class="flex justify-center mt-2">
        <button class="btn-action mt-3" on:click={resetToDefault}>
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

  .button-row {
    @apply flex gap-1 mb-3;
  }

  .button-row-center {
    @apply flex gap-1 mb-3 justify-center;
  }

  .category-grid {
    @apply grid grid-cols-2 md:grid-cols-3 gap-1 mb-2;
    outline: none !important;
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
    @apply gap-2 p-1.5 bg-colorCardC border border-colorTextSofter relative
           hover:bg-gray-100 dark:hover:bg-gray-700;
    min-height: 2.5rem;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    outline: none !important;
    box-shadow: none !important;
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
    @apply bg-colorTextSoft text-colorText text-[11px] font-bold flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-sm border border-colorText;
  }

  .category-info {
    grid-area: name;
    @apply flex items-center min-w-0;
  }

  .category-name {
    @apply text-colorText font-medium text-[10px] sm:text-xs uppercase leading-tight;
  }

  .eye-toggle-btn {
    grid-area: eye;
    @apply p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-sm text-colorTextSofter hover:text-colorText flex-shrink-0;
    cursor: pointer;
  }

  .eye-toggle-btn :global(svg) {
    @apply w-3.5 h-3.5;
  }
</style>
