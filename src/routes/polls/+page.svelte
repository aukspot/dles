<script>
  import { allPolls } from "$lib/stores"
  import BackArrow from "$lib/components/Buttons/BackArrow.svelte"
  import GoBackHome from "$lib/components/GoBackHome.svelte"
  import IconCheckBold from "$lib/components/Icons/IconCheckBold.svelte"
  import { onMount } from "svelte"

  let pollResults = {}
  let loadingPolls = new Set()
  let errorPolls = {}

  // Mock data for local development
  const mockResults = {
    "poll-1": { yes: 156, no: 23 },
    "poll-2": { yes: 89, no: 67 },
    "poll-3": { yes: 142, no: 31 },
    "poll-4": { "math-logic": 78, words: 94 },
    "poll-5": {
      "yes-it-is-a-good-feature": 45,
      "yes-but-i-dont-see-the-point": 12,
      no: 89,
    },
    "poll-6": { music: 112, "movies-tv": 98 },
    "poll-7": { sports: 67, "video-games": 134 },
  }

  // Get completed polls (end date has passed), sorted by end date descending (most recent first)
  $: completedPolls = allPolls
    .filter((poll) => {
      const end = new Date(poll.timeRange.end)
      const now = new Date()
      return now > end
    })
    .sort((a, b) => new Date(b.timeRange.end) - new Date(a.timeRange.end))

  $: columns = [0, 1].map((col) =>
    completedPolls
      .map((poll, index) => ({ poll, index }))
      .filter(({ index }) => index % 2 === col),
  )

  onMount(() => {
    // Load results for all completed polls
    completedPolls.forEach((poll) => {
      loadResults(poll)
    })
  })

  async function loadResults(poll) {
    loadingPolls.add(poll.id)
    loadingPolls = loadingPolls

    try {
      // Use mock data in dev mode
      if (import.meta.env.DEV && mockResults[poll.id]) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 200))
        pollResults[poll.id] = calculatePercentages(mockResults[poll.id])
        pollResults = pollResults
        return
      }

      const apiUrl = import.meta.env.DEV
        ? `http://localhost:8787/api/poll-results?pollId=${poll.id}`
        : `/api/poll-results?pollId=${poll.id}`

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error("Failed to load results")
      }

      const data = await response.json()
      pollResults[poll.id] = calculatePercentages(data.results)
      pollResults = pollResults
    } catch (err) {
      errorPolls[poll.id] = err.message
      errorPolls = errorPolls
    } finally {
      loadingPolls.delete(poll.id)
      loadingPolls = loadingPolls
    }
  }

  function calculatePercentages(results) {
    const total = Object.values(results).reduce((sum, count) => sum + count, 0)
    const percentages = {}
    for (const [option, count] of Object.entries(results)) {
      percentages[option] = total > 0 ? Math.round((count / total) * 100) : 0
    }
    return { ...results, total, percentages }
  }

  function formatDateRange(timeRange) {
    const start = new Date(timeRange.start + "T00:00:00")
    const end = new Date(timeRange.end + "T00:00:00")

    const formatOptions = { month: "short", day: "numeric", year: "numeric" }
    return `${start.toLocaleDateString("en-US", formatOptions)} - ${end.toLocaleDateString("en-US", formatOptions)}`
  }

  function getWinner(poll, results) {
    if (!results) return null

    let maxVotes = 0
    let winners = []

    for (const option of poll.options) {
      const votes = results[option.id] || 0
      if (votes > maxVotes) {
        maxVotes = votes
        winners = [option]
      } else if (votes === maxVotes) {
        winners.push(option)
      }
    }

    return winners.length === 1 ? winners[0] : null
  }
</script>

<svelte:head>
  <title>Past Polls - The Dles</title>
  <meta
    name="description"
    content="View results from past polls on The Dles."
  />
</svelte:head>

<div class="polls-container">
  <div class="polls-header">
    <BackArrow />
    <div class="header-center">
      <h2 class="polls-title">Past Polls</h2>
      <span class="header-count">{completedPolls.length} total</span>
    </div>
    <div class="header-spacer"></div>
  </div>

  {#if completedPolls.length === 0}
    <p class="empty-message">No completed polls yet.</p>
  {:else}
    <div class="polls-list">
      {#each columns as column}
        <div class="polls-column">
          {#each column as { poll, index } (poll.id)}
            {@const results = pollResults[poll.id]}
            {@const winner = getWinner(poll, results)}
            {@const isLoading = loadingPolls.has(poll.id)}
            {@const error = errorPolls[poll.id]}

            <article class="poll-card" style="order: {index}">
              <header class="poll-header">
                <h3 class="poll-question">{poll.question}</h3>
                {#if poll.subtitle}
                  <p class="poll-subtitle">{poll.subtitle}</p>
                {/if}
              </header>

              <div class="poll-content">
                {#if isLoading}
                  <div class="loading-container">
                    <span class="loading-text">Loading...</span>
                  </div>
                {:else if error}
                  <div class="error-message">Failed to load results</div>
                {:else if results}
                  <ul class="poll-results">
                    {#each poll.options as option}
                      {@const count = results[option.id] || 0}
                      {@const percentage = results.percentages[option.id] || 0}
                      {@const isWinner = winner && winner.id === option.id}

                      <li class="result-row" class:winner={isWinner}>
                        <div class="result-info">
                          <span class="result-label">
                            {option.label}
                            {#if isWinner}
                              <span class="winner-icon" aria-label="Winner">
                                <IconCheckBold />
                              </span>
                            {/if}
                          </span>
                          <span class="result-percentage">{percentage}%</span>
                        </div>
                        <div class="result-bar-container">
                          <div
                            class="result-bar"
                            style="width: {percentage}%"
                          ></div>
                        </div>
                        <span class="result-count">
                          {count}
                          {count === 1 ? "vote" : "votes"}
                        </span>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </div>

              <footer class="poll-footer">
                <span>
                  {#if results && !isLoading && !error}
                    {results.total} total votes
                  {/if}
                </span>
                <span class="poll-number">#{completedPolls.length - index}</span
                >
              </footer>
            </article>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

  <GoBackHome />
</div>

<style lang="postcss">
  .polls-container {
    @apply max-w-lg lg:max-w-4xl mx-auto px-3 py-4;
  }

  .polls-header {
    @apply flex items-center justify-between gap-2 mb-4;
  }

  .header-center {
    @apply flex items-center justify-center gap-2;
  }

  .header-spacer {
    @apply w-6;
  }

  .polls-title {
    @apply text-xl font-bold text-colorText m-0;
  }

  .header-count {
    @apply text-sm text-colorTextSoft;
  }

  .empty-message {
    @apply text-center text-colorTextSoft py-8;
  }

  .polls-list {
    @apply flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5;
  }

  .polls-column {
    @apply contents lg:flex lg:flex-col lg:gap-5;
  }

  .poll-card {
    @apply flex flex-col border-2 border-colorTextSoftest rounded overflow-hidden bg-colorCardA;
  }

  .poll-header {
    @apply px-3 py-2.5 bg-colorCardC border-b border-colorTextSoftest;
  }

  .poll-number {
    @apply text-xs font-mono text-colorTextSofter;
  }

  .poll-question {
    @apply text-base font-semibold leading-snug text-colorText m-0;
  }

  .poll-subtitle {
    @apply text-xs text-colorTextSoft mt-0.5 mb-0;
  }

  .poll-content {
    @apply px-3 py-3;
  }

  .loading-container {
    @apply flex items-center justify-center py-4;
  }

  .loading-text {
    @apply text-colorTextSoft text-sm uppercase tracking-wide;
  }

  .error-message {
    @apply text-center text-red-600 dark:text-red-400 text-sm py-2;
  }

  .poll-results {
    @apply flex flex-col gap-3.5 list-none m-0 p-0;
  }

  .result-row {
    @apply flex flex-col gap-1;
  }

  .result-info {
    @apply flex items-baseline justify-between gap-3;
  }

  .result-label {
    @apply text-sm font-medium leading-snug text-colorText;
  }

  .winner-icon {
    @apply inline-flex w-3 h-3 ml-0.5 align-[-0.05em];
  }

  .result-percentage {
    @apply text-sm font-semibold tabular-nums text-colorText shrink-0;
  }

  .result-count {
    @apply text-xs tabular-nums text-colorTextSofter;
  }

  .result-bar-container {
    @apply w-full h-2.5 bg-zinc-400/50 dark:bg-zinc-600/60 rounded-full overflow-hidden;
  }

  .result-bar {
    @apply h-full rounded-full bg-blue-500 dark:bg-blue-600 transition-all duration-300;
  }

  .winner .result-label,
  .winner .result-percentage {
    @apply text-green-700 dark:text-green-400 font-semibold;
  }

  .winner .result-bar {
    @apply bg-green-500 dark:bg-green-600;
  }

  .poll-footer {
    @apply flex items-center justify-between gap-2 px-3 py-2 text-xs text-colorTextSoft border-t border-colorTextSoftest bg-colorCardC;
  }
</style>
