<script>
  import { onMount, onDestroy } from "svelte"
  import { browser } from "$app/environment"
  import { categoryRanks, newDles } from "$lib/stores"

  export let cards = []
  export let cardsVersion = 0
  export let maxColumns = 5

  let gridContainer
  let columns = []
  let numColumns = 2
  let isResizing = false
  let organizeTimeout = null
  let lastWindowWidth = 0

  function getNumColumns() {
    if (!browser) return Math.min(2, maxColumns)

    // Use document.documentElement.clientWidth instead of window.innerWidth
    // to account for zoom/scaling
    const width = document.documentElement.clientWidth
    // Use minimum of 300px
    if (width < 300) return 1
    if (width >= 1200) return Math.min(Math.floor(width / 220), 5, maxColumns)
    if (width >= 768) return Math.min(Math.floor(width / 220), 4, maxColumns)
    if (width >= 570) return Math.min(3, maxColumns)
    return Math.min(2, maxColumns)
  }

  function estimateCardHeight(card) {
    if (typeof card.estimatedHeight === "number") return card.estimatedHeight
    // Estimate relative heights based on card type and content
    if (card.type === "dlesOfTheWeek") return 300 // Usually has multiple items
    if (card.type === "favorites") return card.data.length * 40 + 100 // Base height + items
    if (card.type === "sponsors") return 200 // Fixed sponsors height
    if (card.type === "new") {
      // Calculate based on newDles data - need to count unique dates + dles
      const newDlesData = $newDles || []
      const uniqueDates = new Set(newDlesData.map((d) => d.date_added)).size
      return newDlesData.length * 40 + uniqueDates * 30 + 80 // dles + date headers + section header
    }
    if (card.type === "category") return card.data.length * 40 + 80 // Base height + items
    return 100 // Default
  }

  function organizeCards() {
    if (!gridContainer || cards.length === 0) return

    const newNumColumns = getNumColumns()

    if (newNumColumns !== numColumns) {
      numColumns = newNumColumns
    }

    columns = Array.from({ length: numColumns }, () => [])
    const columnHeights = Array.from({ length: numColumns }, () => 0)

    const favoriteCard = cards.find((card) => card.type === "favorites")
    const dlesOfTheWeekCard = cards.find(
      (card) => card.type === "dlesOfTheWeek",
    )
    const sponsorsCard = cards.find((card) => card.type === "sponsors")
    const newCard = cards.find((card) => card.type === "new")
    const pinnedTypes = ["favorites", "dlesOfTheWeek", "sponsors", "new"]
    const flowCards = cards.filter((card) => !pinnedTypes.includes(card.type))

    if (numColumns === 1) {
      const orderedCards = []

      if (favoriteCard) orderedCards.push(favoriteCard)
      if (dlesOfTheWeekCard) orderedCards.push(dlesOfTheWeekCard)
      if (sponsorsCard) orderedCards.push(sponsorsCard)
      if (newCard) orderedCards.push(newCard)
      orderedCards.push(...flowCards)

      orderedCards.forEach((card) => {
        columns[0].push(card)
        columnHeights[0] += estimateCardHeight(card)
      })
    } else {
      if (dlesOfTheWeekCard) {
        columns[0].push(dlesOfTheWeekCard)
        columnHeights[0] += estimateCardHeight(dlesOfTheWeekCard)
      }
      if (sponsorsCard) {
        columns[0].push(sponsorsCard)
        columnHeights[0] += estimateCardHeight(sponsorsCard)
      }
      if (newCard) {
        columns[0].push(newCard)
        columnHeights[0] += estimateCardHeight(newCard)
      }
      if (favoriteCard) {
        columns[1].push(favoriteCard)
        columnHeights[1] += estimateCardHeight(favoriteCard)
      }

      const sortedFlowCards = [...flowCards].sort((a, b) => {
        const rankA = a.rank ?? $categoryRanks[a.category] ?? 999
        const rankB = b.rank ?? $categoryRanks[b.category] ?? 999
        return rankA - rankB
      })

      // This creates a balanced masonry layout
      sortedFlowCards.forEach((card) => {
        // Find the column with minimum height
        const shortestColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights),
        )

        // Add card to shortest column
        columns[shortestColumnIndex].push(card)
        columnHeights[shortestColumnIndex] += estimateCardHeight(card)
      })
    }

    // Force reactivity
    columns = [...columns]
  }

  function handleResize() {
    if (isResizing) return

    const currentWidth = document.documentElement.clientWidth
    if (Math.abs(currentWidth - lastWindowWidth) < 20) {
      return
    }

    lastWindowWidth = currentWidth
    isResizing = true
    requestAnimationFrame(() => {
      organizeCards()
      isResizing = false
    })
  }

  onMount(() => {
    if (browser) {
      lastWindowWidth = document.documentElement.clientWidth
      organizeCards()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  })

  let previousCardsKey = ""

  function getCardsKey(cards) {
    return cards
      .map((c) => {
        // Exclude favorites length to prevent reorganization when favoriting
        // Only track structural changes (card additions/removals/reordering)
        if (c.type === "favorites") {
          return `${c.id}:${c.type}`
        }
        return `${c.id}:${c.type}:${c.data?.length || 0}`
      })
      .join("|")
  }

  function debouncedOrganizeCards() {
    clearTimeout(organizeTimeout)
    organizeTimeout = setTimeout(() => {
      organizeCards()
    }, 100)
  }

  $: if (cardsVersion > 0) {
    const currentKey = getCardsKey(cards)
    if (currentKey !== previousCardsKey) {
      previousCardsKey = currentKey
      debouncedOrganizeCards()
    }
  }

  $: if (cards.length > 0 && columns.length > 0) {
    columns.forEach((column) => {
      column.forEach((cardInColumn) => {
        const updatedCard = cards.find((c) => c.id === cardInColumn.id)
        if (updatedCard && updatedCard.data !== cardInColumn.data) {
          cardInColumn.data = updatedCard.data
        }
      })
    })
    columns = [...columns]
  }

  onDestroy(() => {
    clearTimeout(organizeTimeout)
  })
</script>

<div
  bind:this={gridContainer}
  class="grid-container"
  style="--num-columns: {numColumns}"
>
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
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .grid-column {
    @apply flex flex-col gap-2;
    min-width: 0;
    max-width: 100%;
  }

  .card-wrapper {
    @apply break-inside-avoid;
    min-width: 0;
    max-width: 100%;
  }

  .card-wrapper:empty {
    display: none;
  }

  @media (max-width: 18em) {
    .grid-container {
      grid-template-columns: 1fr !important;
    }
  }
</style>
