<script>
  import { onMount, afterUpdate } from "svelte"
  import { browser } from "$app/environment"

  export let cards = []
  export let favoriteCardIndex = -1

  let gridContainer
  let columns = []
  let numColumns = 2
  let isResizing = false

  function getNumColumns() {
    if (!browser) return 2

    const width = window.innerWidth
    if (width <= 336) return 1  // Increased threshold to prevent overflow
    if (width >= 1200) return Math.min(Math.floor(width / 220), 5) // 5 columns when there's space
    if (width >= 768) return Math.min(Math.floor(width / 220), 4) // 4 columns on large screens
    if (width >= 570) return 3
    return 2
  }

  function estimateCardHeight(card) {
    // Estimate relative heights based on card type and content
    if (card.type === 'dlesOfTheWeek') return 300 // Usually has multiple items
    if (card.type === 'favorites') return card.data.length * 40 + 100 // Base height + items
    if (card.type === 'sponsors') return 200 // Fixed sponsors height
    if (card.type === 'category') return card.data.length * 40 + 80 // Base height + items
    return 100 // Default
  }

  function organizeCards() {
    if (!gridContainer || cards.length === 0) return

    const newNumColumns = getNumColumns()

    if (newNumColumns !== numColumns) {
      numColumns = newNumColumns
    }

    // Initialize columns with height tracking
    columns = Array.from({ length: numColumns }, () => [])
    const columnHeights = Array.from({ length: numColumns }, () => 0)

    // Separate special cards from category cards
    const favoriteCard = favoriteCardIndex >= 0 ? cards[favoriteCardIndex] : null
    const dlesOfTheWeekCard = cards.find(card => card.type === 'dlesOfTheWeek')
    const sponsorsCard = cards.find(card => card.type === 'sponsors')
    const categoryCards = cards.filter(card => card.type === 'category')

    if (numColumns === 1) {
      // Mobile: single column with special order
      const orderedCards = []

      if (dlesOfTheWeekCard) orderedCards.push(dlesOfTheWeekCard)
      if (favoriteCard) orderedCards.push(favoriteCard)
      if (sponsorsCard) orderedCards.push(sponsorsCard)
      orderedCards.push(...categoryCards)

      orderedCards.forEach(card => {
        columns[0].push(card)
        columnHeights[0] += estimateCardHeight(card)
      })
    } else {
      // Multi-column: Place special cards in fixed positions

      // First column: DLES of the Week and Sponsors at top
      if (dlesOfTheWeekCard) {
        columns[0].push(dlesOfTheWeekCard)
        columnHeights[0] += estimateCardHeight(dlesOfTheWeekCard)
      }
      if (sponsorsCard) {
        columns[0].push(sponsorsCard)
        columnHeights[0] += estimateCardHeight(sponsorsCard)
      }

      // Second column: Favorites at top
      if (favoriteCard) {
        columns[1].push(favoriteCard)
        columnHeights[1] += estimateCardHeight(favoriteCard)
      }

      // Sort category cards alphabetically with Miscellaneous last
      const sortedCategoryCards = [...categoryCards].sort((a, b) => {
        // Miscellaneous always goes last
        if (a.category === 'Miscellaneous') return 1
        if (b.category === 'Miscellaneous') return -1
        // Everything else alphabetically
        return a.category.localeCompare(b.category)
      })

      // Distribute category cards by column in alphabetical order
      const cardsPerColumn = Math.ceil(sortedCategoryCards.length / numColumns)

      sortedCategoryCards.forEach((card, index) => {
        // Calculate which column this card should go to (fill columns vertically)
        const targetColumn = Math.floor(index / cardsPerColumn)

        // Add card to target column
        columns[targetColumn].push(card)
        columnHeights[targetColumn] += estimateCardHeight(card)
      })
    }

    // Force reactivity
    columns = [...columns]
  }

  function handleResize() {
    if (isResizing) return
    isResizing = true
    requestAnimationFrame(() => {
      organizeCards()
      isResizing = false
    })
  }

  onMount(() => {
    if (browser) {
      organizeCards()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  })

  afterUpdate(() => {
    organizeCards()
  })

  $: if (cards.length > 0) {
    organizeCards()
  }
</script>

<div bind:this={gridContainer} class="grid-container" style="--num-columns: {numColumns}">
  {#each columns as column, colIndex (colIndex)}
    <div class="grid-column">
      {#each column as card, cardIndex (card.id || `${colIndex}-${cardIndex}`)}
        <div class="card-wrapper">
          <slot {card} {colIndex} {cardIndex} />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="postcss">
  .grid-container {
    @apply pb-3 mt-1 mb-2 gap-2;
    display: grid;
    grid-template-columns: repeat(var(--num-columns), 1fr);
  }

  .grid-column {
    @apply flex flex-col gap-2;
  }

  .card-wrapper {
    @apply break-inside-avoid;
  }

  @media (max-width: 290px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }
</style>