<script>
  import {
    categories,
    categoryColors,
    categorizedDles,
    newDles,
    poppedUpDle,
    dlesOfTheWeek,
    favorites,
  } from "$lib/stores"

  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"

  import { categoryIcons } from "$lib/js/categoryIcons"
  import { base } from "$app/paths"
  import Banner from "../Banner.svelte"
  import { openInNewTab } from "$lib/js/utilities"
  import IconCalendarHeart from "../Icons/IconCalendarHeart.svelte"
  import IconFavorite from "../Icons/IconFavorite.svelte"
  import IconPlus from "../Icons/IconPlus.svelte"
  import IconEdit from "../Icons/IconEdit.svelte"
  import DleGroup from "./DleGroup.svelte"
  import DleGrid from "./DleGrid.svelte"
  import SearchModal from "./SearchModal.svelte"
  import Sponsors from "../Sponsors.svelte"

  let pageX = 0
  let pageY = 0
  let clientY = 0
  let allCards = []
  let favoriteCardIndex = -1
  let showSearchModal = false
  let editMode = false

  function resetPoppedUpDle() {
    $poppedUpDle = ""
  }

  function handleKeyUp(event) {
    if (event.key == "Escape") {
      resetPoppedUpDle()
      if (showSearchModal) {
        showSearchModal = false
      }
    }
  }

  function openSearchModal(event) {
    pageX = event.pageX
    pageY = event.pageY
    clientY = event.clientY
    showSearchModal = true
  }

  function closeSearchModal() {
    showSearchModal = false
  }

  function toggleEditMode() {
    editMode = !editMode
  }


  function buildCards() {
    const cards = []
    let currentIndex = 0

    // Add DLES of the Week
    if ($dlesOfTheWeek.length !== 0) {
      cards.push({
        id: 'dlesOfTheWeek',
        type: 'dlesOfTheWeek',
        data: $dlesOfTheWeek
      })
      currentIndex++
    }

    // Add Favorites (always present, even if empty)
    favoriteCardIndex = currentIndex
    cards.push({
      id: 'favorites',
      type: 'favorites',
      data: $favorites
    })
    currentIndex++

    // Add Sponsors
    cards.push({
      id: 'sponsors',
      type: 'sponsors',
      data: null
    })
    currentIndex++

    // Add category cards
    for (const category of $categories) {
      const categoryDles = $categorizedDles[category] || []
      if (categoryDles.length !== 0) {
        cards.push({
          id: category,
          type: 'category',
          data: categoryDles,
          category
        })
        currentIndex++
      }
    }

    allCards = cards
  }

  $: {
    $dlesOfTheWeek
    $favorites
    $categorizedDles
    $categories
    buildCards()
  }
</script>

<svelte:window on:resize={resetPoppedUpDle} />
<svelte:document on:keyup={(e) => handleKeyUp(e)} />
<Banner includeSearch={true} />
<div class="w-full mx-auto">
  <DleGrid cards={allCards} {favoriteCardIndex} let:card>
    {#if card.type === 'dlesOfTheWeek'}
      <div class="card">
        <div class="labelContainer rainbow-gradient">
          <div class="label">
            <div class="flex-shrink-0">
              <IconCalendarHeart />
            </div>
            DLES of the Week
          </div>
        </div>
        <DleGroup
          dleGroup={card.data}
          bind:pageX
          bind:pageY
          bind:clientY
        />
      </div>
    {:else if card.type === 'favorites'}
      <div class="card">
        <div
          class="labelContainer"
          style="background-color: hsl(320, 90%, 50%, 45%);"
        >
          <div class="label">
            <div class="flex-shrink-0">
              <IconFavorite />
            </div>
            Favorites
          </div>
        </div>
        <div class="favorites-add-row">
          <div class="favorites-add-text">
            {card.data.length === 0 ? 'No favorites yet' : `${card.data.length} favorite${card.data.length !== 1 ? 's' : ''}`}
          </div>
          <div class="favorites-buttons">
            <button
              class="favorites-add-button"
              on:click={openSearchModal}
              title="Add dle to favorites"
            >
              <IconPlus />
            </button>
            {#if card.data.length > 0}
              <button
                class="favorites-edit-button"
                class:active={editMode}
                on:click={toggleEditMode}
                title={editMode ? "Done rearranging" : "Rearrange favorites"}
              >
                <IconEdit />
              </button>
            {/if}
          </div>
        </div>
        {#if card.data.length > 0}
          <DleGroup
            dleGroup={card.data}
            reorderable={true}
            {editMode}
            bind:pageX
            bind:pageY
            bind:clientY
          />
        {/if}
      </div>
    {:else if card.type === 'sponsors'}
      <Sponsors />
    {:else if card.type === 'category'}
      <div class="card">
        <div
          class="labelContainer"
          style="background-color: {$categoryColors[card.category]}"
        >
          <div class="label">
            <div class="flex-shrink-0">
              <svelte:component this={categoryIcons[card.category]} />
            </div>
            {card.category}
          </div>
        </div>
        <DleGroup
          dleGroup={card.data}
          bind:pageX
          bind:pageY
          bind:clientY
        />
      </div>
    {/if}
  </DleGrid>
</div>

{#if showSearchModal}
  <SearchModal onClose={closeSearchModal} {pageX} {pageY} {clientY} />
{/if}

<style lang="postcss">
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }
  .labelContainer {
    @apply py-2 px-2 bg-colorCardB border-b-2 border-colorText;
  }
  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-base md:text-lg text-colorText font-semibold;
  }
  .rainbow-gradient {
    background: repeating-linear-gradient(
      60deg,
      hsl(0, 90%, 70%, 0.8) 0% 20%,
      /* Red */ hsl(72, 90%, 70%, 0.8) 20% 40%,
      /* Yellow */ hsl(144, 90%, 70%, 0.8) 40% 60%,
      /* Green */ hsl(216, 90%, 70%, 0.8) 60% 80%,
      /* Blue */ hsl(288, 90%, 70%, 0.8) 80% 100% /* Purple */
    );
  }
  :global(.dark) .rainbow-gradient {
    background: repeating-linear-gradient(
      60deg,
      hsl(0, 90%, 30%, 0.9) 0% 20%,
      /* Dark Red */ hsl(72, 90%, 30%, 0.9) 20% 40%,
      /* Dark Yellow */ hsl(144, 90%, 30%, 0.9) 40% 60%,
      /* Dark Green */ hsl(216, 90%, 30%, 0.9) 60% 80%,
      /* Dark Blue */ hsl(288, 90%, 30%, 0.9) 80% 100% /* Dark Purple */
    );
  }

  .empty-favorites {
    @apply min-h-[60px];
  }

  .favorites-add-row {
    @apply flex items-center justify-between p-1 px-2 bg-colorCardC border-t border-colorTextSoftest;
  }

  .favorites-add-text {
    @apply text-sm text-colorTextSoft;
  }

  .favorites-buttons {
    @apply flex items-center justify-end gap-1;
  }

  .favorites-add-button, .favorites-edit-button {
    @apply p-1 hover:bg-colorCardB rounded transition-colors text-colorTextSofter hover:text-colorText;
  }

  .favorites-edit-button.active {
    @apply bg-colorCardB text-colorText;
  }

</style>
