<script>
  import { dles, hiddenDleIds, hiddenDleIdsSet } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { categoryColors } from "$lib/stores"
  import { useHiddenDles } from "$lib/composables/useHiddenDles.js"
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"
  import IconEye from "../Icons/IconEye.svelte"
  import IconEyeSlash from "../Icons/IconEyeSlash.svelte"

  export let onClose

  const hiddenDlesComposable = useHiddenDles()

  let undoData = null

  let searchQuery = ""
  let activeTab = "hidden" // "hidden" or "all"

  $: hiddenDlesList = $dles
    .filter((dle) => $hiddenDleIdsSet.has(dle.id))
    .sort((a, b) => a.name.localeCompare(b.name))

  $: visibleDles = $dles
    .filter((dle) => !$hiddenDleIdsSet.has(dle.id))
    .filter((dle) => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      return (
        dle.name.toLowerCase().includes(query) ||
        dle.description?.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  function handleHide(dle) {
    hiddenDlesComposable.hideDle(dle)
  }

  function handleUnhide(dle) {
    hiddenDlesComposable.unhideDle(dle)
  }

  function handleUnhideAll() {
    const previousHiddenDles = hiddenDlesComposable.resetHiddenDles()
    const count = previousHiddenDles.length

    if (count > 0) {
      undoData = { ids: previousHiddenDles, count }
    }
  }

  function handleUndo() {
    if (undoData) {
      hiddenDlesComposable.restoreHiddenDles(undoData.ids)
      undoData = null
    }
  }
</script>

<Modal {onClose} overlay={true} zIndex={1000}>
  <div class="modal-container">
    <ModalHeader title="Manage Hidden Dles" {onClose} variant="section" />

    <div class="modal-content">
      <!-- Tabs -->
      <div class="tabs">
        <button
          class="tab"
          class:active={activeTab === "hidden"}
          on:click={() => (activeTab = "hidden")}
        >
          Hidden ({hiddenDlesList.length})
        </button>
        <button
          class="tab"
          class:active={activeTab === "all"}
          on:click={() => (activeTab = "all")}
        >
          All Dles
        </button>
      </div>

      {#if activeTab === "hidden"}
        <!-- Hidden Dles List -->
        <div class="list-section">
          {#if hiddenDlesList.length === 0 && !undoData}
            <div class="empty-state">
              No dles hidden yet. Hide dles from the other tab or their popup.
            </div>
          {:else}
            <div class="list-header">
              {#if undoData}
                <span class="undo-message">Unhid {undoData.count} {undoData.count === 1 ? "dle" : "dles"}</span>
                <button class="undo-btn" on:click={handleUndo}>Undo</button>
              {:else}
                <span class="list-count"
                  >{hiddenDlesList.length} hidden {hiddenDlesList.length === 1
                    ? "dle"
                    : "dles"}</span
                >
                <button class="unhide-all-btn" on:click={handleUnhideAll}>
                  Unhide all
                </button>
              {/if}
            </div>
            <div class="results-container">
              <div class="results">
                {#each hiddenDlesList as dle, index (dle.id)}
                  <div
                    class="result-item"
                    class:even-row={index % 2 === 0}
                    class:odd-row={index % 2 !== 0}
                  >
                    <div class="dle-info">
                      <div
                        class="category-icon"
                        style="background-color: {$categoryColors[
                          dle.category
                        ]};"
                      >
                        <svelte:component this={categoryIcons[dle.category]} />
                      </div>
                      <div class="dle-details">
                        <div class="dle-name">{dle.name}</div>
                        <div class="dle-category">{dle.category}</div>
                      </div>
                    </div>
                    <button
                      class="action-btn show-btn"
                      on:click={() => handleUnhide(dle)}
                      title="Unhide dle"
                    >
                      <IconEye />
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {:else}
        <!-- All Dles List -->
        <div class="list-section">
          <div class="search-header">
            <input
              type="text"
              placeholder="Search dles..."
              bind:value={searchQuery}
              class="search-input"
            />
            {#if searchQuery.trim()}
              <button class="btn-clear" on:click={() => (searchQuery = "")}>
                Clear
              </button>
            {/if}
          </div>
          <div class="list-count">
            {visibleDles.length}
            {visibleDles.length === 1 ? "dle" : "dles"}
          </div>
          <div class="results-container">
            <div class="results">
              {#each visibleDles as dle, index (dle.id)}
                <div
                  class="result-item"
                  class:even-row={index % 2 === 0}
                  class:odd-row={index % 2 !== 0}
                >
                  <div class="dle-info">
                    <div
                      class="category-icon"
                      style="background-color: {$categoryColors[dle.category]};"
                    >
                      <svelte:component this={categoryIcons[dle.category]} />
                    </div>
                    <div class="dle-details">
                      <div class="dle-name">{dle.name}</div>
                      <div class="dle-category">{dle.category}</div>
                    </div>
                  </div>
                  <button
                    class="action-btn hide-btn"
                    on:click={() => handleHide(dle)}
                    title="Hide dle"
                  >
                    <IconEyeSlash />
                  </button>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</Modal>

<style lang="postcss">
  .modal-container {
    @apply bg-colorBackground border border-colorTextSofter shadow-xl;
    width: min(400px, 90vw);
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    @apply p-3 flex flex-col gap-3 overflow-hidden;
    flex: 1;
    min-height: 0;
  }

  .undo-message {
    @apply text-xs text-colorTextSoft;
  }

  .undo-btn {
    @apply px-2 py-1 text-xs font-medium rounded bg-colorCardB text-colorText border border-colorTextSoftest hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors;
  }

  .tabs {
    @apply flex gap-1 border-b border-colorTextSoftest pb-2;
  }

  .tab {
    @apply px-3 py-1.5 text-sm font-medium rounded-t border-b-2 border-transparent transition-colors;
    @apply text-colorTextSoft hover:text-colorText hover:bg-colorCardB;
  }

  .tab.active {
    @apply text-colorText border-b-2 border-blue-500 bg-colorCardB;
  }

  .list-section {
    @apply flex flex-col gap-2 overflow-hidden;
    flex: 1;
    min-height: 0;
  }

  .list-header {
    @apply flex justify-between items-center;
  }

  .list-count {
    @apply text-xs text-colorTextSoft font-bold;
  }

  .unhide-all-btn {
    @apply px-2 py-1 text-xs font-medium rounded bg-colorCardB text-colorText border border-colorTextSoftest hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors;
  }

  .search-header {
    @apply flex items-center gap-2;
  }

  .search-input {
    @apply flex-1 p-2 border border-colorTextSoftest rounded bg-colorCardB text-colorText placeholder-colorTextSofter focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm;
  }

  .btn-clear {
    @apply px-2 py-1.5 text-xs rounded bg-colorCardB text-colorText border border-colorTextSoftest hover:bg-red-100 dark:hover:bg-red-900 transition-colors;
  }

  .empty-state {
    @apply text-center text-colorTextSoft py-8 text-sm;
  }

  .results-container {
    @apply overflow-y-auto border border-colorTextSoftest flex-1;
    min-height: 200px;
    max-height: 350px;
  }

  .results {
    @apply flex flex-col;
  }

  .result-item {
    @apply flex items-center justify-between p-2 pr-3;
  }

  .result-item.even-row {
    @apply bg-colorCardB;
  }

  .result-item.odd-row {
    @apply bg-colorCardA;
  }

  .dle-info {
    @apply flex items-center gap-2 flex-1 min-w-0;
  }

  .category-icon {
    @apply p-1 rounded flex items-center justify-center flex-shrink-0 w-6 h-6 text-colorText;
  }

  .dle-details {
    @apply flex-1 min-w-0;
  }

  .dle-name {
    @apply font-medium text-colorText text-sm leading-tight truncate;
  }

  .dle-category {
    @apply text-xs text-colorTextSoft truncate;
  }

  .action-btn {
    @apply p-1.5 rounded border border-colorTextSoftest transition-colors flex-shrink-0;
  }

  .action-btn :global(svg) {
    @apply w-4 h-4;
  }

  .show-btn {
    @apply bg-colorCardB text-colorTextSoft hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300;
  }

  :global(.dark) .show-btn:hover {
    @apply bg-blue-900 text-blue-300 border-blue-700;
  }

  .hide-btn {
    @apply bg-colorCardB text-colorTextSofter hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300;
  }

  :global(.dark) .hide-btn:hover {
    @apply bg-orange-900 text-orange-300 border-orange-700;
  }
</style>
