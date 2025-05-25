<script>
  import IconNew from "./Icons/IconNew.svelte"
  import { changelog, infoHidden, searchQuery } from "$lib/stores"
  import SearchBar from "./SearchBar.svelte"

  function toggleInfo() {
    $infoHidden = !$infoHidden
    if (isLocalStorageAvailable()) {
      localStorage.infoHidden = $infoHidden
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
  {#if $infoHidden}
    <div class="flex justify-center set-width">
      <button on:click={toggleInfo} aria-label="information" class="btn-info"
        >What is this site?</button
      >
    </div>
  {:else}
    <div class="flex justify-center set-width">
      <button on:click={toggleInfo} aria-label="information" class="btn-info"
        >Hide info</button
      >
    </div>
  {/if}
  <div class="set-width flex justify-end items-center">
    <SearchBar />
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
