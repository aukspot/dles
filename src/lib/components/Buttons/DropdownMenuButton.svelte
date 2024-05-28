<script>
  import { fade } from "svelte/transition"

  let hidden = true

  function dropdownMenuButtonClicked(e) {
    e.preventDefault()
    hidden = !hidden
  }
  function menuBackgroundClicked(e) {
    e.preventDefault()
    hidden = !hidden
  }
  function handleKeyUp(event) {
    if (event.key == "Escape") {
      hidden = true
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  in:fade
  id="menuBackground"
  class="{hidden
    ? 'hidden opacity-100'
    : 'z-10'} fixed top-0 left-0 w-full h-full bg-gray-900 opacity-0"
  on:click={menuBackgroundClicked}
></div>
<svelte:document on:keyup={handleKeyUp} />

<div class={hidden ? "" : "z-20"}>
  <button class="btn-dropdown-menu" on:click={dropdownMenuButtonClicked}>
    <slot />
  </button>
  {#if !hidden}
    <slot name="menu" />
  {/if}
</div>
