<script>
  import { activePanelStore } from "$lib/stores"
  import { onMount, tick } from "svelte"
  import { browser } from "$app/environment"

  export let panelId = null // 'info' | 'random' | 'settings' | 'help' | null
  export let label // Button text
  export let hoverColor // 'red' | 'orange' | 'yellow' | 'green' | 'blue'
  export let href = null // For link-only buttons (Discord)
  export let jsOnly = false // Hide when JavaScript is disabled
  export let showBadge = false // Show "NEW" badge

  let loading = true

  onMount(() => {
    loading = false
  })

  const colorClasses = {
    red: "!bg-red-300 dark:!bg-red-800 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
    orange:
      "!bg-orange-300 dark:!bg-orange-700 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
    yellow:
      "!bg-yellow-300 dark:!bg-yellow-700 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
    green:
      "!bg-green-300 dark:!bg-green-700 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
    blue: "!bg-blue-300 dark:!bg-blue-700 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
    violet:
      "!bg-violet-300 dark:!bg-violet-800 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
    teal: "!bg-teal-300 dark:!bg-teal-700 hover:!bg-colorCardC dark:hover:!bg-colorCardC",
  }

  $: isActive = $activePanelStore === panelId
  $: displayLabel = isActive && panelId ? `${label} X` : label
  $: colorClass = colorClasses[hoverColor] || ""
  $: wrapperClass = jsOnly ? "js-only" : ""

  function isMobile() {
    return browser && window.innerWidth < 768
  }

  async function handleToggle() {
    if (!panelId) return
    const willOpen = !isActive
    $activePanelStore = isActive ? null : panelId // Toggle

    // Scroll to header title on mobile when opening search panel
    if (willOpen && panelId === "search" && isMobile()) {
      await tick()
      const searchTitle = document.getElementById("search-panel-title")
      if (searchTitle) {
        searchTitle.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }
</script>

{#if href}
  <a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    class="btn-header text-colorText {colorClass} {wrapperClass} relative"
  >
    {label}
    {#if showBadge}
      <span class="new-badge">NEW</span>
    {/if}
  </a>
{:else}
  <button
    on:click={handleToggle}
    aria-label={label}
    aria-pressed={isActive}
    class="btn-header {colorClass} {wrapperClass} relative"
  >
    {displayLabel}
    {#if showBadge && !isActive}
      <span class="new-badge" style="visibility:{loading ? 'hidden' : 'unset'}"
        >NEW</span
      >
    {/if}
  </button>
{/if}

<style lang="postcss">
  .new-badge {
    @apply absolute -top-2.5 -right-1 bg-red-500 text-white text-[0.5625rem] font-bold px-1 py-0.5 rounded uppercase;
  }
</style>
