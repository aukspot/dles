<script>
  import { favorites, favoriteIds, categoryColors, dles } from "$lib/stores"
  import { playRandom } from "$lib/js/utilities"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import IconRandom from "$lib/components/Icons/IconRandom.svelte"
  import FavoriteButton from "$lib/components/Buttons/FavoriteButton.svelte"
  import { onMount } from "svelte"
  import { base } from "$app/paths"

  let loading = true
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
</script>

{#if !loading}
  <h2 class="my-2 text-2xl text-center underline">Favorites</h2>
  {#if $favorites.length === 0}
    <p class="text-center">No favorites.</p>
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
      <button class="btn-dropdown-menu" on:click={() => playRandom($favorites)}>
        <IconRandom /> Play random favorite!</button
      >
    </div>
  {/if}
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
                  <a class="text-base" target="_blank" href={favorite.url}
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
{:else}
  <div class="m-auto text-center">loading...</div>
{/if}

<style lang="postcss">
  /* .favoritesContainer {
    @apply ;
  } */
  .card {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }
</style>
