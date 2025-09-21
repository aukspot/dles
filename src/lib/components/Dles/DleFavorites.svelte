<script>
  import { favorites, favoriteIds, categoryColors, dles } from "$lib/stores"
  import { playRandom } from "$lib/js/utilities"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import IconRandom from "$lib/components/Icons/IconRandom.svelte"
  import FavoriteButton from "$lib/components/Buttons/FavoriteButton.svelte"
  import SearchModal from "$lib/components/Dles/SearchModal.svelte"
  import { onMount } from "svelte"
  import { base } from "$app/paths"
  import { useTracking } from "$lib/composables/useTracking"

  let loading = true
  let showSearchModal = false
  $: nonFavorites = $dles.filter(
    (dle) => !$favorites.find((f) => f.name === dle.name),
  )

  onMount(() => {
    loading = false
  })

  function sortByCategory() {
    const sortedFavorites = $favorites.sort((a, b) => {
      return a.category.toLowerCase() > b.category.toLowerCase()
    })
    $favoriteIds = sortedFavorites.map(fav => fav.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  function sortAlphabetically() {
    const sortedFavorites = $favorites.sort((a, b) => {
      return a.name.toLowerCase() > b.name.toLowerCase()
    })
    $favoriteIds = sortedFavorites.map(fav => fav.id)
    localStorage.favorites = JSON.stringify($favoriteIds)
  }

  const { trackGameClick } = useTracking()

  function handleGameUrlClick(favorite) {
    trackGameClick(favorite, 'url-link', 'favorites', 'favorites-dedicated')
  }

  function handlePlayRandomFavorite() {
    const customTrackingData = {
      click_type: 'random-button-favorites',
      source: 'favorites-page',
      section: 'favorites-dedicated',
      available_options: $favorites.length
    };
    playRandom($favorites, customTrackingData);
  }

  function openSearchModal(event) {
    const rect = event.target.closest('button').getBoundingClientRect();
    modalX = rect.left + rect.width / 2;
    modalY = rect.bottom - 10;

    showSearchModal = true;
  }

  let modalX = 400;
  let modalY = 200;

  function closeSearchModal() {
    showSearchModal = false;
  }
</script>

{#if !loading}
  <h2 class="my-2 text-2xl text-center underline">Favorites</h2>

  <div class="flex justify-center mb-4">
    <button class="btn flex items-center" on:click={openSearchModal}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add new favorite
    </button>
  </div>

  {#if $favorites.length > 0}
    <p class="text-center text-colorTextSoft mb-4">{$favorites.length} favorites total</p>
  {/if}

  {#if $favorites.length === 0}
    <p class="text-center">No favorites. Use the search above to add some!</p>
  {:else}
    <div class="flex justify-center gap-3 mb-6">
      <button class="btn w-40 !text-sm" on:click={sortByCategory}
        >Sort by Category</button
      >
      <button class="btn w-40 !text-sm" on:click={sortAlphabetically}
        >Sort Alphabetically</button
      >
    </div>

    <div class="flex justify-center my-4">
      <button class="btn-dropdown-menu" on:click={handlePlayRandomFavorite}>
        <IconRandom /> Play random favorite!</button
      >
    </div>
  {/if}

  {#if $favorites.length > 0}
    <div class="m-auto columns-sm">
      <div data-sveltekit-reload class="favoritesContainer">
        {#each $favorites as favorite, i (i)}
        <div class="card flex break-inside-avoid">
          <div
            class="p-2 flex justify-center items-center"
            style="background-color: {$categoryColors[favorite.category]};"
          >
            <svelte:component this={categoryIcons[favorite.category]} />
          </div>
          <div class="p-3 w-full">
            <div class="flex justify-between">
              <div>
                <div>
                  <div class="text-lg font-semibold leading-5">
                    {favorite.name}
                  </div>
                  <a class="text-base" target="_blank" href={favorite.url} on:click={() => handleGameUrlClick(favorite)}
                    >{favorite.url}</a
                  >
                </div>
                <!-- <div class="text-sm leading-4">{favorite.description}</div> -->
              </div>
              <div class="p-2 flex justify-center items-center">
                <FavoriteButton dle={favorite} />
              </div>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  {/if}
{:else}
  <div class="m-auto text-center">loading...</div>
{/if}

{#if showSearchModal}
  <SearchModal onClose={closeSearchModal} pageX={modalX} pageY={modalY} />
{/if}

<style lang="postcss">
  /* .favoritesContainer {
    @apply ;
  } */
  .card {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }
</style>
