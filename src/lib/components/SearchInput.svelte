<script>
  import { autoFocus as autoFocusAction } from "$lib/js/autoFocus"
  import IconX from "./Icons/IconX.svelte"

  export let value = ""
  export let placeholder = "Search dles..."
  export let autoFocus = false
  export let size = "md" // "md" | "sm"

  let input

  function focusIfEnabled(node) {
    if (autoFocus) autoFocusAction(node)
  }

  function clear() {
    value = ""
    input?.focus()
  }
</script>

<div class="search-input-wrapper">
  <input
    type="text"
    {placeholder}
    bind:value
    bind:this={input}
    class="search-input"
    class:sm={size === "sm"}
    use:focusIfEnabled
  />
  {#if value}
    <button
      type="button"
      class="btn-clear"
      on:click={clear}
      aria-label="Clear search"
      title="Clear search"
    >
      <IconX />
    </button>
  {/if}
</div>

<style lang="postcss">
  .search-input-wrapper {
    @apply relative w-full;
  }

  .search-input {
    @apply m-0 w-full p-3 pr-10 border border-colorTextSoftest rounded bg-colorCardB text-colorText placeholder-colorTextSofter focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm;
  }

  .search-input.sm {
    @apply p-2 pr-9;
  }

  @media (max-width: 767.98px) {
    .search-input {
      font-size: 16px;
    }
  }

  .btn-clear {
    @apply absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded text-colorTextSoft hover:text-colorText hover:bg-colorCardC transition-colors;
  }

  .search-input.sm + .btn-clear {
    @apply right-0.5 w-7 h-7;
  }

  .btn-clear :global(svg) {
    @apply w-6 h-6;
    stroke-width: 3.5;
  }

  .search-input.sm + .btn-clear :global(svg) {
    @apply w-5 h-5;
  }
</style>
