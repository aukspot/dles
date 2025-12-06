<script>
  import { onMount, onDestroy } from "svelte"
  import { browser } from "$app/environment"

  export let cards = []
  export let cardsVersion = 0

  let gridContainer
  let columns = []
  let numColumns = 2
  let isResizing = false
  let organizeTimeout = null
  let lastWindowWidth = 0

  function getNumColumns() {
    if (!browser) return 2

    // Use document.documentElement.clientWidth instead of window.innerWidth
    // to account for zoom/scaling
    const width = document.documentElement.clientWidth
    if (width <= 336) return 1 // Increased threshold to prevent overflow
    if (width >= 1200) return Math.min(Math.floor(width / 220), 5) // 5 columns when there's space
    if (width >= 768) return Math.min(Math.floor(width / 220), 4) // 4 columns on large screens
    if (width >= 570) return 3
    return 2
  }

  function estimateCardHeight(card) {
    // Estimate relative heights based on card type and content
    if (card.type === "dlesOfTheWeek") return 300 // Usually has multiple items
    if (card.type === "favorites") return card.data.length * 40 + 100 // Base height + items
    if (card.type === "sponsors") return 200 // Fixed sponsors height
    if (card.type === "bookRecommendation") return 150 // Book recommendation card (horizontal, compact)
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
    const bookRecommendationCard = cards.find(
      (card) => card.type === "bookRecommendation",
    )
    const categoryCards = cards.filter((card) => card.type === "category")

    if (numColumns === 1) {
      const orderedCards = []

      if (favoriteCard) orderedCards.push(favoriteCard)
      if (dlesOfTheWeekCard) orderedCards.push(dlesOfTheWeekCard)
      if (sponsorsCard) orderedCards.push(sponsorsCard)
      if (bookRecommendationCard) orderedCards.push(bookRecommendationCard)
      orderedCards.push(...categoryCards)

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
      if (bookRecommendationCard) {
        columns[0].push(bookRecommendationCard)
        columnHeights[0] += estimateCardHeight(bookRecommendationCard)
      }

      if (favoriteCard) {
        columns[1].push(favoriteCard)
        columnHeights[1] += estimateCardHeight(favoriteCard)
      }

      const regularCategoryCards = categoryCards.filter(
        (card) => card.category !== "Miscellaneous",
      )

      const sortedCategoryCards = [...regularCategoryCards].sort((a, b) => {
        if (a.category === "Words") return 1
        if (b.category === "Words") return -1
        return a.category.localeCompare(b.category)
      })

      const miscellaneousCard = categoryCards.find(
        (card) => card.category === "Miscellaneous",
      )
      if (miscellaneousCard) {
        columns[0].push(miscellaneousCard)
        columnHeights[0] += estimateCardHeight(miscellaneousCard)
      }

      const wordsCard = sortedCategoryCards.find(
        (card) => card.category === "Words",
      )
      const nonWordsCards = sortedCategoryCards.filter(
        (card) => card.category !== "Words",
      )

      if (numColumns === 2) {
        const firstColumnCards = nonWordsCards.filter(
          (card) => card.category < "Trivia",
        )
        const secondColumnCards = nonWordsCards.filter(
          (card) => card.category >= "Trivia",
        )

        firstColumnCards.forEach((card) => {
          columns[0].push(card)
          columnHeights[0] += estimateCardHeight(card)
        })

        secondColumnCards.forEach((card) => {
          columns[1].push(card)
          columnHeights[1] += estimateCardHeight(card)
        })
      } else {
        const availableColumns = numColumns - (wordsCard ? 1 : 0)
        const cardsPerColumn = Math.ceil(
          nonWordsCards.length / availableColumns,
        )

        nonWordsCards.forEach((card, index) => {
          const targetColumn = Math.min(
            Math.floor(index / cardsPerColumn),
            availableColumns - 1,
          )
          columns[targetColumn].push(card)
          columnHeights[targetColumn] += estimateCardHeight(card)
        })
      }

      if (wordsCard) {
        columns[numColumns - 1].push(wordsCard)
        columnHeights[numColumns - 1] += estimateCardHeight(wordsCard)
      }
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
      .map((c) => `${c.id}:${c.type}:${c.data?.length || 0}`)
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
