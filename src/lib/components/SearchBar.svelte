<script>
  import { searchQuery, filteredDles, dles } from "$lib/stores"
  import { enhancedSearch } from "$lib/js/utilities"

  let searchByDescription = true
</script>

<div class="search-container">
  <input
    type="text"
    placeholder="Search..."
    class="search-bar"
    bind:value={$searchQuery}
    on:input={() => {
      $filteredDles = enhancedSearch($dles, $searchQuery, searchByDescription)
    }}
  />

  {#if $searchQuery.trim()}
    <label class="checkbox-container">
      <input
        type="checkbox"
        bind:checked={searchByDescription}
        on:change={() => {
          if ($searchQuery.trim()) {
            $filteredDles = enhancedSearch(
              $dles,
              $searchQuery,
              searchByDescription,
            )
          }
        }}
      />
      Search by description
    </label>
    <button
      class="clear-button"
      on:click={() => {
        $searchQuery = ""
        $filteredDles = $dles
      }}
      aria-label="Clear search"
    >
      Clear Search
    </button>
  {/if}
</div>

<style lang="postcss">
  .search-container {
    @apply flex flex-col justify-end items-end w-full ml-2;
  }

  .search-bar {
    @apply w-full lg:w-72 h-10 px-4;
  }

  .checkbox-container {
    @apply text-xs md:text-sm text-colorTextSoft flex items-center gap-2;
  }

  .checkbox-container input[type="checkbox"] {
    @apply w-4 h-4;
  }

  .clear-button {
    @apply my-2 px-4 py-2 text-sm bg-colorCardB hover:shadow-lg
           rounded-md transition-colors duration-200 text-colorTextSoft;
  }
</style>
