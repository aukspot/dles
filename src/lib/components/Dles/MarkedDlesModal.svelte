<script>
  import {
    dles,
    playedDleIds,
    playedDleIdsSet,
    autoMarkPlayed,
    autoResetPlayed,
    categoryColors,
  } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { usePlayedDles } from "$lib/composables/usePlayedDles.js"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { trackEvent } from "$lib/js/trackingUtils"
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"
  import IconX from "../Icons/IconX.svelte"

  export let onClose

  const playedDlesComposable = usePlayedDles()

  let undoData = null

  // Get dles in the order they were marked (playedDleIds preserves order)
  $: markedDlesList = $playedDleIds
    .map((id) => $dles.find((dle) => dle.id === id))
    .filter(Boolean)

  function handleUnmark(dle) {
    playedDlesComposable.unmarkAsPlayed(dle)
  }

  function handleUnmarkAll() {
    const previousPlayedDles = playedDlesComposable.resetPlayedDles()
    const count = previousPlayedDles.length

    if (isLocalStorageAvailable()) {
      localStorage.playedDlesLastReset = new Date().toDateString()
    }
    trackEvent("settings_reset_played", { count })

    if (count > 0) {
      undoData = { ids: previousPlayedDles, count }
    }
  }

  function handleUndo() {
    if (undoData) {
      // Restore the played dles
      for (const id of undoData.ids) {
        const dle = $dles.find((d) => d.id === id)
        if (dle) {
          playedDlesComposable.markAsPlayed(dle, true)
        }
      }
      undoData = null
    }
  }

  function toggleAutoMarkPlayed() {
    $autoMarkPlayed = !$autoMarkPlayed
    if (isLocalStorageAvailable()) {
      localStorage.autoMarkPlayed = $autoMarkPlayed.toString()
    }
    trackEvent("settings_auto_mark_played_toggle", { enabled: $autoMarkPlayed })
  }

  function toggleAutoResetPlayed() {
    $autoResetPlayed = !$autoResetPlayed
    if (isLocalStorageAvailable()) {
      localStorage.autoResetPlayed = $autoResetPlayed.toString()
      if ($autoResetPlayed) {
        localStorage.playedDlesLastReset = new Date().toDateString()
      }
    }
    trackEvent("settings_auto_reset_played_toggle", {
      enabled: $autoResetPlayed,
    })
  }
</script>

<Modal {onClose} overlay={true} zIndex={1000}>
  <div class="modal-container">
    <ModalHeader title="Mark As Played Today" {onClose} variant="section" />

    <div class="modal-content">
      <!-- Settings Section -->
      <div class="settings-section">
        <button
          class="toggle-btn"
          class:active={$autoMarkPlayed}
          on:click={toggleAutoMarkPlayed}
        >
          <span class="toggle-label">Auto-mark dles after clicking</span>
          <span class="toggle-status">{$autoMarkPlayed ? "ON" : "OFF"}</span>
        </button>
        <button
          class="toggle-btn"
          class:active={$autoResetPlayed}
          on:click={toggleAutoResetPlayed}
        >
          <span class="toggle-label">Auto-reset at midnight</span>
          <span class="toggle-status">{$autoResetPlayed ? "ON" : "OFF"}</span>
        </button>
      </div>

      <div class="divider"></div>

      <!-- List Section -->
      <div class="list-section">
        {#if markedDlesList.length === 0 && !undoData}
          <div class="empty-state">No dles marked as played yet.</div>
        {:else}
          <div class="list-header">
            {#if undoData}
              <span class="undo-message"
                >Unmarked {undoData.count}
                {undoData.count === 1 ? "dle" : "dles"}</span
              >
              <button class="undo-btn" on:click={handleUndo}>Undo</button>
            {:else}
              <span class="list-count"
                >{markedDlesList.length}
                {markedDlesList.length === 1 ? "dle" : "dles"} marked as played</span
              >
              <button class="unmark-all-btn" on:click={handleUnmarkAll}>
                Reset
              </button>
            {/if}
          </div>
          <div class="results-container">
            <div class="results">
              {#each markedDlesList as dle, index (dle.id)}
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
                    class="action-btn unmark-btn"
                    on:click={() => handleUnmark(dle)}
                    title="Unmark as played"
                  >
                    <IconX />
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
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

  .settings-section {
    @apply flex flex-col gap-2;
  }

  .toggle-btn {
    @apply flex items-center justify-between px-3 py-2 text-sm rounded border border-colorTextSoftest bg-colorCardB hover:bg-colorCardA transition-colors cursor-pointer;
  }

  .toggle-btn.active {
    @apply bg-green-100 border-green-500 dark:bg-green-900/40 dark:border-green-600;
  }

  .toggle-label {
    @apply text-colorText;
  }

  .toggle-status {
    @apply text-xs font-bold uppercase;
  }

  .toggle-btn.active .toggle-status {
    @apply text-green-700 dark:text-green-300;
  }

  .toggle-btn:not(.active) .toggle-status {
    @apply text-colorTextSofter;
  }

  .divider {
    @apply border-t border-colorTextSoftest;
  }

  .undo-message {
    @apply text-xs text-colorTextSoft;
  }

  .undo-btn {
    @apply px-2 py-1 text-xs font-medium rounded bg-colorCardB text-colorText border border-colorTextSoftest hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors;
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

  .unmark-all-btn {
    @apply px-2 py-1 text-xs font-medium rounded bg-colorCardB text-colorText border border-colorTextSoftest hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors;
  }

  .empty-state {
    @apply text-center text-colorTextSoft py-8 text-sm;
  }

  .results-container {
    @apply overflow-y-auto border border-colorTextSoftest flex-1;
    min-height: 150px;
    max-height: 300px;
  }

  .results {
    @apply flex flex-col;
  }

  .result-item {
    @apply flex items-center justify-between p-2 pr-3 gap-2;
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

  .unmark-btn {
    @apply bg-colorCardC hover:bg-colorCardA;
  }

  :global(.dark) .unmark-btn {
    @apply bg-zinc-900 text-zinc-300 border-zinc-700;
  }

  :global(.dark) .unmark-btn:hover {
    @apply bg-zinc-800 text-zinc-200 border-zinc-600;
  }
</style>
