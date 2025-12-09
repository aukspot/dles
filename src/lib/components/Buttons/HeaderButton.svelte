<script>
  import { activePanelStore } from "$lib/stores"

  export let panelId = null // 'info' | 'random' | 'settings' | 'help' | null
  export let label // Button text
  export let hoverColor // 'red' | 'orange' | 'yellow' | 'green' | 'blue'
  export let href = null // For link-only buttons (Discord)
  export let jsOnly = false // Hide when JavaScript is disabled

  const colorClasses = {
    red: "hover:bg-red-300 dark:hover:bg-red-800",
    orange: "hover:bg-orange-300 dark:hover:bg-orange-700",
    yellow: "hover:bg-yellow-300 dark:hover:bg-yellow-700",
    green: "hover:bg-green-300 dark:hover:bg-green-700",
    blue: "hover:bg-blue-300 dark:hover:bg-blue-700",
    violet: "hover:bg-violet-300 dark:hover:bg-violet-800",
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
