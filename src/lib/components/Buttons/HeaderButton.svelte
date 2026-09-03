<script>
  import { activePanelStore } from "$lib/stores"
  import { headerColorClasses } from "$lib/js/headerColors"
  import { onMount } from "svelte"

  export let panelId = null // 'info' | 'random' | 'help' | 'poll' | 'discord'
  export let label // Button text
  export let hoverColor // 'red' | 'orange' | 'yellow' | 'green' | 'blue'
  export let jsOnly = false // Hide when JavaScript is disabled
  export let showBadge = false // Show "NEW" badge

  let loading = true

  onMount(() => {
    loading = false
  })

  $: isActive = $activePanelStore === panelId
  $: displayLabel = isActive && panelId ? `${label} X` : label
  $: colorClass = headerColorClasses[hoverColor] || ""
  $: wrapperClass = jsOnly ? "js-only" : ""

  function handleToggle() {
    if (!panelId) return
    $activePanelStore = isActive ? null : panelId // Toggle
  }
</script>

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

<style lang="postcss">
  .new-badge {
    @apply absolute -top-2.5 -right-1 bg-red-500 text-white text-[0.5625rem] font-bold px-1 py-0.5 rounded uppercase;
  }
</style>
