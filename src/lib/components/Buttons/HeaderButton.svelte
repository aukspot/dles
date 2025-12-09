<script>
  import { activePanelStore } from "$lib/stores"

  export let panelId = null // 'info' | 'random' | 'settings' | 'help' | null
  export let label // Button text
  export let hoverColor // 'red' | 'orange' | 'yellow' | 'green' | 'blue'
  export let href = null // For link-only buttons (Discord)
  export let jsOnly = false // Hide when JavaScript is disabled

  const colorClasses = {
    red: "!bg-red-300 dark:!bg-red-800 hover:!bg-colorCardC",
    orange: "!bg-orange-300 dark:!bg-orange-700 hover:!bg-colorCardC",
    yellow: "!bg-yellow-300 dark:!bg-yellow-700 hover:!bg-colorCardC",
    green: "!bg-green-300 dark:!bg-green-700 hover:!bg-colorCardC",
    blue: "!bg-blue-300 dark:!bg-blue-700 hover:!bg-colorCardC",
    violet: "!bg-violet-300 dark:!bg-violet-800 hover:!bg-colorCardC",
  }

  $: isActive = $activePanelStore === panelId
  $: displayLabel = isActive && panelId ? `X ${label}` : label
  $: colorClass = colorClasses[hoverColor] || ""
  $: wrapperClass = jsOnly ? "js-only" : ""

  function handleToggle() {
    if (!panelId) return
    $activePanelStore = isActive ? null : panelId // Toggle
  }
</script>

{#if href}
  <a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    class={wrapperClass}
  >
    <span class="btn-header text-colorText {colorClass}">{label}</span>
  </a>
{:else}
  <button
    on:click={handleToggle}
    aria-label={label}
    aria-pressed={isActive}
    class={wrapperClass}
  >
    <span class="btn-header {colorClass}">{displayLabel}</span>
  </button>
{/if}
