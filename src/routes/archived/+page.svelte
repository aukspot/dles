<script>
  import { archivedDles, categories } from "$lib/stores"
  import BackArrow from "$lib/components/Buttons/BackArrow.svelte"
  import BackToTopButton from "$lib/components/Buttons/BackToTopButton.svelte"
  import DleGrid from "$lib/components/Dles/DleGrid.svelte"
  import ArchivedCategoryCard from "$lib/components/Dles/ArchivedCategoryCard.svelte"
  import PuzzlePickerModal from "$lib/components/Dles/PuzzlePickerModal.svelte"
  import { ARCHIVE_PUZZLES } from "$lib/js/archivePuzzles"

  const FALLBACK_CATEGORY = "Miscellaneous"

  let pickerDle = null

  $: groups = $categories
    .map((category) => ({
      category,
      dles: $archivedDles
        .filter((dle) => (dle.category ?? FALLBACK_CATEGORY) === category)
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((group) => group.dles.length > 0)

  $: cards = groups.map((group, i) => ({
    id: group.category,
    type: "category",
    rank: i,
    data: group.dles,
    category: group.category,
    estimatedHeight:
      group.dles.reduce(
        (h, dle) => h + 74 + (dle.description ? 34 : 0) + (dle.notes ? 30 : 0),
        0,
      ) + 44,
  }))
</script>

<svelte:head>
  <title>Archived games - The Dles</title>
  <meta
    name="description"
    content="Dles that no longer update daily, but can still be played."
  />
</svelte:head>

<div class="w-full mx-auto">
  <div class="intro">
    <div class="page-header">
      <BackArrow />
      <div class="header-center">
        <h2 class="page-title">Archived</h2>
        <span class="header-count">{$archivedDles.length} games</span>
      </div>
      <div class="header-spacer"></div>
    </div>
    <p class="count">
      These games no longer update daily, but can still be played
    </p>
  </div>

  <div class="px-1">
    <DleGrid {cards} cardsVersion={cards.length} maxColumns={4} let:card>
      <ArchivedCategoryCard
        category={card.id}
        dles={card.data}
        onPick={(dle) => (pickerDle = dle)}
      />
    </DleGrid>
  </div>

  <noscript>
    <div class="dle-columns noscript-grid px-1">
      {#each groups as group (group.category)}
        <ArchivedCategoryCard category={group.category} dles={group.dles} />
      {/each}
    </div>
  </noscript>
</div>

{#if pickerDle}
  <PuzzlePickerModal
    dleId={pickerDle.id}
    title={pickerDle.name}
    description={pickerDle.description}
    puzzles={ARCHIVE_PUZZLES[pickerDle.id].puzzles}
    sets={ARCHIVE_PUZZLES[pickerDle.id].sets}
    calendar={ARCHIVE_PUZZLES[pickerDle.id].calendar}
    onClose={() => (pickerDle = null)}
  />
{/if}

<BackToTopButton />

<style lang="postcss">
  .intro {
    @apply px-3 py-4 max-w-3xl mx-auto text-center;
  }

  .page-header {
    @apply flex items-center justify-between gap-2;
  }

  .header-center {
    @apply flex items-center justify-center gap-2;
  }

  .header-spacer {
    @apply w-6;
  }

  .page-title {
    @apply text-xl font-bold text-colorText m-0;
  }

  .header-count {
    @apply text-sm text-colorTextSoft;
  }

  .count {
    @apply text-sm text-colorTextSoft mt-2;
  }

  .noscript-grid {
    columns: 4;
  }
</style>
