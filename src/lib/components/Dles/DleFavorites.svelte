<script>
  import { favorites, categoryColors } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { onMount } from "svelte"
  import { base } from "$app/paths"
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"
  let loading = true
  onMount(() => {
    loading = false
  })

  function sortByCategory() {
    $favorites = $favorites.sort((a, b) => {
      return a.category.toLowerCase() > b.category.toLowerCase()
    })
    localStorage.favorites = JSON.stringify($favorites)
  }

  function sortAlphabetically() {
    $favorites = $favorites.sort((a, b) => {
      return a.name.toLowerCase() > b.name.toLowerCase()
    })
    localStorage.favorites = JSON.stringify($favorites)
  }
</script>

{#if !loading}
  <h2 class="my-2 text-2xl text-center underline">Favorites</h2>
  <p class="pb-4 px-4 text-sm text-center mb-2">
    <strong>Note</strong>: favorites are a new feature, so please
    <a href="{base}/report" class="underline">report a bug</a> if you run into a
    problem!
  </p>
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
