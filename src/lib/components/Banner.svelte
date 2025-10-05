<script>
  import IconNew from "./Icons/IconNew.svelte"
  import { changelog, searchQuery } from "$lib/stores"
  import SearchBar from "./SearchBar.svelte"
  import { getContext } from "svelte"

  export let includeSearch = false

  const infoOpenStore = getContext("infoOpen")

  $: buttonText = $infoOpenStore ? "Close info" : "Site info"

  function toggleInfo() {
    if (infoOpenStore) {
      infoOpenStore.update(v => !v)
    }
  }
</script>

<div class="flex justify-between items-start md:items-start w-full gap-2">
  <div class="p-3 set-width text-sm md:p-2 md:text-base">
    <strong>Last updated: </strong><a
      class="underline"
      href="/changelog#{$changelog[0].date}"
    >
      {$changelog[0].date}</a
    >
  </div>
  <div class="flex justify-center set-width">
    <button on:click={toggleInfo} class="btn-info cursor-pointer">
      {buttonText}
    </button>
  </div>
  <div class="set-width flex justify-end">
    {#if includeSearch}
      <SearchBar />
    {/if}
  </div>
</div>

<style lang="postcss">
  .set-width {
    @apply w-1/3;
  }
  .btn-info {
    @apply my-2 text-sm md:text-base mx-auto p-2 hover:shadow-colorTextSoftest w-36 rounded-md bg-colorCardB shadow-md active:shadow-none;
  }
</style>
