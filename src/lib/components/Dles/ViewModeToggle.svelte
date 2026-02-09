<script>
  import { favoritesView } from "$lib/stores"

  export let showBadge = false

  const { viewMode, showNewBadge, toggle } = favoritesView
</script>

<button
  class="view-toggle"
  on:click={toggle}
  title={$viewMode === "row" ? "Switch to Grid view" : "Switch to Row view"}
  aria-label={$viewMode === "row"
    ? "Switch to Grid view"
    : "Switch to Row view"}
>
  {#if $viewMode === "row"}
    <!-- Grid icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z"
        clip-rule="evenodd"
      />
    </svg>
  {:else}
    <!-- Row/list icon: two thick bars -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <rect x="2" y="3" width="16" height="5.5" rx="1" />
      <rect x="2" y="11.5" width="16" height="5.5" rx="1" />
    </svg>
  {/if}
  {#if showBadge && $showNewBadge}
    <span class="toggle-label">NEW</span>
  {/if}
</button>

<style lang="postcss">
  .view-toggle {
    @apply w-5 h-5 p-0 bg-transparent border-none text-colorTextSoft hover:text-colorText transition-colors cursor-pointer relative;
  }

  .view-toggle svg {
    @apply w-full h-full;
  }

  .toggle-label {
    @apply absolute -top-3 -right-2.5 bg-blue-500 text-white text-[0.5rem] font-bold px-0.5 py-0.5 rounded uppercase leading-tight;
  }
</style>
