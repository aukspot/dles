<script>
  import { filteredDles, hiddenDleIds } from "$lib/stores"
  import BackArrow from "$lib/components/Buttons/BackArrow.svelte"
  import { groupByTheme } from "$lib/js/themes"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import DleGrid from "$lib/components/Dles/DleGrid.svelte"
  import ThemeCard from "$lib/components/Dles/ThemeCard.svelte"
  import BackToTopButton from "$lib/components/Buttons/BackToTopButton.svelte"

  export let data

  $: icon = categoryIcons[data.category]

  $: inCategory = $filteredDles.filter(
    (dle) => dle.category === data.category && !$hiddenDleIds.includes(dle.id),
  )

  $: groups = groupByTheme(inCategory, data.themes)

  $: cards = groups.map((group, i) => ({
    id: group.theme,
    type: "theme",
    rank: i,
    data: group.dles,
    description: group.description,
    untyped: Boolean(group.untyped),
    estimatedHeight: group.dles.length * 40 + (group.description ? 110 : 80),
  }))
</script>

<svelte:head>
  <title>{data.category} - The Dles</title>
  <meta
    name="description"
    content="Browse {inCategory.length} free daily games about {data.category.toLowerCase()}."
  />
  <link
    rel="canonical"
    href="https://dles.aukspot.com/category/{data.category.toLowerCase()}"
  />
</svelte:head>

<div class="w-full mx-auto">
  <div class="intro">
    <div class="page-header">
      <BackArrow />
      <div class="header-center">
        {#if icon}
          <span class="header-icon"><svelte:component this={icon} /></span>
        {/if}
        <h2 class="page-title">{data.category}</h2>
        <span class="header-count">{inCategory.length} games</span>
      </div>
      <div class="header-spacer"></div>
    </div>
    <p class="count">
      {groups.length} subcategories, some games are in more than one
    </p>
  </div>

  <div class="px-1">
    <DleGrid {cards} cardsVersion={cards.length} let:card>
      <ThemeCard
        theme={card.id}
        dles={card.data}
        description={card.description}
        untyped={card.untyped}
        themes={data.themes}
        category={data.category}
      />
    </DleGrid>
  </div>
</div>

<noscript>
  <div class="gridContainer dle-columns px-1">
    {#each groups as group (group.theme)}
      <ThemeCard
        theme={group.theme}
        dles={group.dles}
        description={group.description}
        untyped={Boolean(group.untyped)}
        themes={data.themes}
        category={data.category}
      />
    {/each}
  </div>
</noscript>

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

  .header-icon {
    @apply w-6 h-6 inline-flex items-center justify-center shrink-0 text-colorText;
  }

  .header-icon :global(svg) {
    @apply w-full h-full;
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

  .gridContainer {
    @apply pb-3 mt-1 mb-2;
  }
</style>
