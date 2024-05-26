<script>
  let hidden = true

  function dropdownMenuButtonClicked(e) {
    e.preventDefault()
    hidden = !hidden
  }
  function menuBackgroundClicked(e) {
    e.preventDefault()
    hidden = !hidden
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="menuBackground"
  class="{hidden
    ? 'hidden'
    : 'z-10'} fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50"
  on:click={menuBackgroundClicked}
></div>
<div class="relative {hidden ? '' : 'z-20'}">
  <button class="btn-dropdown-menu" on:click={dropdownMenuButtonClicked}>
    <slot />
  </button>
  {#if !hidden}
    <slot name="menu" />
  {/if}
</div>
