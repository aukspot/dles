<script>
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import { onMount } from "svelte"
  import { cubicOut } from "svelte/easing"

  function slide(node, { duration = 220 } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t) => `transform: translateX(${(1 - t) * 100}%); opacity: ${t};`,
    }
  }

  export let dleId
  export let title
  export let description = ""
  export let puzzles = null
  export let sets = null
  export let calendar = false
  export let onClose

  $: allSets = sets ?? [{ id: "", name: "", puzzles }]
  let activeIndex = 0
  $: activeSet = allSets[Math.min(activeIndex, allSets.length - 1)]
  $: activePuzzles = activeSet.puzzles

  const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]

  let progress = {}
  let hidePlayed = false
  let confirmingReset = false

  const keyFor = (setId) =>
    setId ? `archivePlayed:${dleId}:${setId}` : `archivePlayed:${dleId}`

  onMount(() => {
    if (!isLocalStorageAvailable()) return
    const loaded = {}
    for (const set of allSets) {
      try {
        const raw = JSON.parse(localStorage.getItem(keyFor(set.id)) || "[]")
        loaded[set.id] = new Set(raw.map(String))
      } catch (error) {
        console.error("Failed to load archive progress:", error)
        loaded[set.id] = new Set()
      }
    }
    progress = loaded
  })

  $: played = progress[activeSet.id] ?? new Set()

  $: activeSet, (confirmingReset = false)

  function persist(setId, values) {
    progress = { ...progress, [setId]: values }
    if (!isLocalStorageAvailable()) return
    try {
      localStorage.setItem(keyFor(setId), JSON.stringify([...values]))
    } catch (error) {
      console.error("Failed to save archive progress:", error)
    }
  }

  function togglePlayed(key) {
    const next = new Set(played)
    next.has(key) ? next.delete(key) : next.add(key)
    persist(activeSet.id, next)
  }

  function clearProgress() {
    persist(activeSet.id, new Set())
    confirmingReset = false
    hidePlayed = false
  }

  function cancelReset() {
    confirmingReset = false
  }

  function markPlayed(puzzle) {
    if (played.has(puzzle.key)) return
    persist(activeSet.id, new Set(played).add(puzzle.key))
  }

  function playRandom() {
    const pool = activePuzzles.filter((p) => !played.has(p.key))
    if (!pool.length) return
    const puzzle = pool[Math.floor(Math.random() * pool.length)]
    markPlayed(puzzle)
    window.open(puzzle.url, "_blank", "noopener")
  }

  $: visible = hidePlayed
    ? activePuzzles.filter((p) => !played.has(p.key))
    : activePuzzles

  $: groups = visible.reduce((acc, puzzle) => {
    const last = acc[acc.length - 1]
    if (last && last.name === puzzle.group) last.puzzles.push(puzzle)
    else acc.push({ name: puzzle.group, puzzles: [puzzle] })
    return acc
  }, [])

  $: playedCount = activePuzzles.filter((p) => played.has(p.key)).length
  $: remaining = activePuzzles.length - playedCount
</script>

<Modal {onClose} overlay={true} zIndex={1100}>
  <div class="modal-container">
    <ModalHeader title="{title} Archive" {onClose} variant="section" />

    {#if description}
      <p class="description">{description}</p>
    {/if}

    {#if allSets.length > 1}
      <div class="tabs">
        {#each allSets as set, i (set.id)}
          <button
            class="tab"
            class:active={i === activeIndex}
            on:click={() => (activeIndex = i)}
          >
            {set.name}
          </button>
        {/each}
      </div>
    {/if}

    <div class="toolbar-shell">
      <div class="toolbar">
        <div class="progress">
          <span class="progress-count"
            >{playedCount}/{activePuzzles.length}</span
          >
          <span class="progress-label">played</span>
        </div>
        <div class="toolbar-actions">
          {#if playedCount > 0}
            <button
              class="tool-btn"
              class:active={hidePlayed}
              on:click={() => (hidePlayed = !hidePlayed)}
            >
              {hidePlayed ? "Hiding played" : "Hide played"}
            </button>
          {/if}
          <button
            class="tool-btn"
            on:click={playRandom}
            disabled={remaining === 0}
          >
            Random
          </button>
          <button
            class="tool-btn"
            on:click={() => (confirmingReset = true)}
            disabled={playedCount === 0}
          >
            Reset
          </button>
        </div>
      </div>

      {#if confirmingReset}
        <div class="confirm" transition:slide>
          <span class="confirm-spacer" aria-hidden="true">
            <span class="tool-btn spacer-btn">Yes</span>
            <span class="tool-btn spacer-btn">No</span>
          </span>
          <span class="confirm-text">Clear all played puzzles?</span>
          <span class="confirm-actions">
            <button class="tool-btn danger" on:click={clearProgress}>Yes</button
            >
            <button class="tool-btn" on:click={cancelReset}>No</button>
          </span>
        </div>
      {/if}
    </div>

    <p class="instructions">
      Opening a puzzle marks it as played, right-click to toggle by hand
    </p>

    <div class="grid-wrap">
      {#if groups.length === 0}
        <p class="empty">Every puzzle has been played.</p>
      {:else}
        {#each groups as group (group.name)}
          <div class="group">
            <div class="group-name">{group.name}</div>
            {#if calendar}
              <div class="weekday-row">
                {#each WEEKDAYS as label, i}
                  <span class="weekday">{label}</span>
                {/each}
              </div>
            {/if}
            <div class="day-grid">
              {#if calendar && group.puzzles.length}
                {#each Array(group.puzzles[0].weekday) as _}
                  <span class="spacer"></span>
                {/each}
              {/if}
              {#each group.puzzles as puzzle (puzzle.key)}
                <a
                  class="day-card"
                  class:played={played.has(puzzle.key)}
                  href={puzzle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  on:click={() => markPlayed(puzzle)}
                  on:auxclick={(e) => e.button === 1 && markPlayed(puzzle)}
                  on:contextmenu|preventDefault={() => togglePlayed(puzzle.key)}
                  title={played.has(puzzle.key)
                    ? `${puzzle.key} — played (right-click to unmark)`
                    : puzzle.key}
                >
                  {puzzle.label}
                </a>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</Modal>

<style lang="postcss">
  .modal-container {
    @apply bg-colorBackground border-colorTextSofter flex flex-col border shadow-xl;
    width: min(30rem, 94vw);
    max-height: 85vh;
  }

  .tabs {
    @apply bg-colorCardB border-colorTextSofter flex border-b;
  }

  .tab {
    @apply text-colorTextSoft flex-1 cursor-pointer border-b-4 border-transparent
           px-2 py-2 text-xs font-semibold uppercase transition-colors
           hover:text-colorText;
  }

  .tab.active {
    @apply text-colorText border-colorText bg-yellow-100 dark:bg-yellow-900;
  }

  .toolbar-shell {
    @apply bg-colorCardB border-colorTextSofter relative shrink-0 overflow-hidden border-b;
  }

  .toolbar {
    @apply flex flex-wrap items-center justify-between gap-2 px-3 py-2;
  }

  .progress {
    @apply flex items-baseline gap-1;
  }

  .progress-count {
    @apply text-colorText font-mono text-sm tracking-tight font-bold;
  }

  .progress-label {
    @apply text-colorTextSoft text-tiny uppercase;
  }

  .toolbar-actions {
    @apply flex flex-wrap gap-1;
  }

  .tool-btn {
    @apply text-colorText bg-colorCardC border-colorTextSofter cursor-pointer border
           px-2 py-1 text-tiny font-semibold uppercase transition-colors
           hover:bg-colorBackground;
  }

  .confirm {
    @apply bg-colorCardB absolute inset-0 flex items-center gap-2 px-3;
  }

  .confirm-text {
    @apply text-colorText min-w-0 flex-1 truncate text-center text-sm font-semibold;
  }

  .confirm-actions,
  .confirm-spacer {
    @apply flex shrink-0 gap-1;
  }

  .confirm-spacer {
    @apply invisible;
  }

  .spacer-btn {
    @apply pointer-events-none select-none;
  }

  .tool-btn.danger {
    @apply border-red-500 text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900;
  }

  .tool-btn.active {
    @apply bg-colorTextSofter text-colorBackground;
  }

  .tool-btn:disabled {
    @apply cursor-not-allowed opacity-40;
  }

  .description {
    @apply text-colorText bg-colorCardC border-colorTextSofter shrink-0 border-b
           px-3 py-2 text-sm leading-snug;
  }

  .instructions {
    @apply text-colorTextSofter border-colorTextSoftest shrink-0 border-b px-3
           py-1.5 text-center text-xs leading-snug;
  }

  .grid-wrap {
    @apply flex-1 overflow-y-auto p-2 bg-colorCardC;
  }

  .group {
    @apply mb-3;
  }

  .group-name {
    @apply text-colorTextSoft mb-1 font-mono text-xs font-bold uppercase tracking-wide text-center;
  }

  .weekday-row,
  .day-grid {
    @apply grid gap-1;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }

  .weekday-row {
    @apply mb-1;
  }

  .weekday {
    @apply text-colorTextSofter text-center font-mono text-tiny;
  }

  .day-card {
    @apply text-colorText bg-colorCardB border-colorTextSoftest cursor-pointer border
           py-1.5 text-center font-mono text-sm no-underline transition-colors
           hover:border-colorText hover:bg-colorCardC hover:text-colorText;
  }

  .day-card.played {
    @apply bg-colorCardA text-colorTextSofter border-transparent line-through;
  }

  .empty {
    @apply text-colorTextSoft p-6 text-center text-sm;
  }
</style>
