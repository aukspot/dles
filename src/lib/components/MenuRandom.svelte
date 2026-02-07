<script>
  import { isLocalStorageAvailable, playRandom } from "$lib/js/utilities"
  import {
    categories,
    dles,
    randomCategories,
    hiddenDleIds,
    completelyHiddenSections,
  } from "$lib/stores"
  import { onMount } from "svelte"
  import Modal from "./Modal.svelte"
  import PanelTitle from "./PanelTitle.svelte"

  let options = []
  let excludeHidden = true
  let showSettingsModal = false

  $: categoryChecked = Object.fromEntries(
    $categories.map((category) => [
      category,
      $randomCategories.includes(category),
    ]),
  )

  function updateOptions() {
    options = $dles.filter((dle) => {
      const inSelectedCategory = $randomCategories.includes(dle.category)
      const isHidden = $hiddenDleIds.includes(dle.id)
      const isCategoryHidden = $completelyHiddenSections[dle.category] === true
      return (
        inSelectedCategory && (!excludeHidden || !isHidden) && !isCategoryHidden
      )
    })
  }

  function toggleCategory(category) {
    if ($randomCategories.includes(category)) {
      $randomCategories = $randomCategories.filter((c) => c != category)
    } else {
      $randomCategories.push(category)
      $randomCategories.sort()
    }

    if (isLocalStorageAvailable()) {
      localStorage.randomCategories = JSON.stringify($randomCategories)
    }

    updateOptions()
  }

  function selectAllCategories() {
    const visible = $categories.filter(
      (cat) => $completelyHiddenSections[cat] !== true,
    )
    $randomCategories = [...visible]
    if (isLocalStorageAvailable()) {
      localStorage.randomCategories = JSON.stringify($randomCategories)
    }
    updateOptions()
  }

  function deselectAllCategories() {
    $randomCategories = []
    if (isLocalStorageAvailable()) {
      localStorage.randomCategories = JSON.stringify($randomCategories)
    }
    updateOptions()
  }

  function toggleExcludeHidden() {
    excludeHidden = !excludeHidden
    if (isLocalStorageAvailable()) {
      localStorage.randomExcludeHidden = JSON.stringify(excludeHidden)
    }
    updateOptions()
  }

  onMount(() => {
    if (isLocalStorageAvailable) {
      if (localStorage.randomCategories) {
        $randomCategories = JSON.parse(localStorage.randomCategories)
      } else {
        $randomCategories = $categories
      }
      if (localStorage.randomExcludeHidden !== undefined) {
        excludeHidden = JSON.parse(localStorage.randomExcludeHidden)
      }
    }
    updateOptions()
  })

  $: visibleCategories = $categories.filter(
    (cat) => $completelyHiddenSections[cat] !== true,
  )
  $: selectedCount = $randomCategories.filter((cat) =>
    visibleCategories.includes(cat),
  ).length
  $: allSelected = selectedCount === visibleCategories.length
  $: noneSelected = selectedCount === 0

  // Update options when hidden dles or sections change
  $: $hiddenDleIds, $completelyHiddenSections, updateOptions()
</script>

<div>
  <PanelTitle color="orange" title="RANDOM" />

  <div class="main-content">
    <button
      class="btn-play"
      disabled={options.length === 0}
      on:click={() =>
        playRandom(options, {
          click_type: "random-button-menu",
          section: "random-menu",
          available_options: options.length,
        })}
    >
      Play random dle!
    </button>

    <p class="dle-count">
      choosing from <span class="font-bold">{options.length}</span> dles
    </p>

    <button class="btn-settings" on:click={() => (showSettingsModal = true)}>
      Settings
      {#if !allSelected || (!excludeHidden && $hiddenDleIds.length > 0)}
        <span class="settings-indicator">•</span>
      {/if}
    </button>
  </div>
</div>

{#if showSettingsModal}
  <Modal onClose={() => (showSettingsModal = false)} overlay={true}>
    <div class="settings-modal">
      <h3 class="modal-title">Random Settings</h3>
      <p class="dle-count-modal">
        <span class="font-bold">{options.length}</span> dles selected
      </p>

      <div class="settings-section">
        <div class="section-header">
          <span class="section-title">Categories selected</span>
          <div class="section-actions">
            <button
              class="action-btn"
              disabled={allSelected}
              on:click={selectAllCategories}
            >
              All
            </button>
            <button
              class="action-btn"
              disabled={noneSelected}
              on:click={deselectAllCategories}
            >
              None
            </button>
          </div>
        </div>
        <div class="category-grid">
          {#each visibleCategories as category}
            <label
              class="category-btn"
              class:checked={categoryChecked[category]}
            >
              <input
                name={category}
                type="checkbox"
                bind:checked={categoryChecked[category]}
                on:click={() => toggleCategory(category)}
              />
              <span>{category}</span>
            </label>
          {/each}
        </div>
      </div>

      {#if $hiddenDleIds.length > 0}
        <div class="settings-section">
          <label class="hidden-toggle">
            <input
              type="checkbox"
              checked={excludeHidden}
              on:change={toggleExcludeHidden}
            />
            <span>Exclude hidden dles ({$hiddenDleIds.length} hidden)</span>
          </label>
        </div>
      {/if}

      <button class="btn-close" on:click={() => (showSettingsModal = false)}>
        Done
      </button>
    </div>
  </Modal>
{/if}

<style lang="postcss">
  .main-content {
    @apply flex flex-col items-center gap-2 py-2;
  }

  .btn-play {
    @apply px-6 py-3 text-sm font-bold uppercase bg-orange-200 hover:bg-orange-300 dark:bg-orange-800 border border-colorTextSoft dark:hover:bg-orange-700 text-colorText disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .dle-count {
    @apply text-xs text-colorTextSoft;
  }

  .btn-settings {
    @apply text-xs text-colorTextSofter hover:text-colorText underline cursor-pointer bg-transparent border-none relative;
  }

  .settings-indicator {
    @apply text-orange-500 absolute -right-2 -top-1 text-lg;
  }

  .settings-modal {
    @apply bg-colorBackground p-4 rounded shadow-lg max-w-md w-[90vw] max-h-[80vh] overflow-y-auto;
  }

  .modal-title {
    @apply text-lg font-bold text-center mb-1 text-colorText;
  }

  .dle-count-modal {
    @apply text-sm text-colorTextSoft text-center mb-4;
  }

  .settings-section {
    @apply mb-4;
  }

  .section-header {
    @apply flex items-center justify-between mb-2;
  }

  .section-title {
    @apply text-sm font-semibold text-colorTextSoft;
  }

  .section-actions {
    @apply flex gap-1;
  }

  .action-btn {
    @apply text-xs px-2 py-0.5 bg-colorCardC hover:bg-colorCardB border border-colorTextSofter rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed;
  }

  .category-grid {
    @apply grid grid-cols-2 gap-1;
  }

  .category-btn {
    @apply cursor-pointer flex items-center gap-1 select-none text-xs px-2 py-1.5 border text-left border-colorTextSofter uppercase font-mono transition-colors bg-colorCardC hover:bg-gray-100 dark:hover:bg-gray-700;
  }

  .category-btn:not(.checked) {
    @apply opacity-40 bg-gray-200 border-dashed dark:bg-gray-800;
  }

  .category-btn.checked {
    @apply hover:bg-orange-300 dark:hover:bg-orange-700;
  }

  .category-btn input[type="checkbox"] {
    @apply hidden;
  }

  .hidden-toggle {
    @apply flex items-center gap-2 text-sm text-colorTextSoft cursor-pointer select-none;
  }

  .hidden-toggle input[type="checkbox"] {
    @apply block w-4 h-4 cursor-pointer;
  }

  .btn-close {
    @apply w-full mt-4 px-4 py-2 text-sm font-semibold bg-orange-200 hover:bg-orange-300 dark:bg-orange-800 dark:hover:bg-orange-700 border border-colorTextSoft rounded cursor-pointer text-colorText;
  }
</style>
