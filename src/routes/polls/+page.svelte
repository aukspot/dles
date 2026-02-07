<script>
  import { allPolls } from "$lib/stores"
  import GoBackHome from "$lib/components/GoBackHome.svelte"
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
    <a href="/" class="back-arrow" aria-label="Go back home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </a>
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
      {#each completedPolls as poll, index}
        {@const results = pollResults[poll.id]}
        {@const winner = getWinner(poll, results)}
        {@const isLoading = loadingPolls.has(poll.id)}
        {@const error = errorPolls[poll.id]}

        <div class="poll-card">
          <div class="poll-header">
            <span></span>
            <h3 class="poll-question">
              {completedPolls.length - index}. {poll.question}
            </h3>
            <!-- <span class="poll-date">{formatDateRange(poll.timeRange)}</span> -->
          </div>

          <div class="poll-content">
            {#if isLoading}
              <div class="loading-container">
                <span class="loading-text">Loading...</span>
              </div>
            {:else if error}
              <div class="error-message">Failed to load results</div>
            {:else if results}
              <div class="poll-results">
                {#each poll.options as option}
                  {@const count = results[option.id] || 0}
                  {@const percentage = results.percentages[option.id] || 0}
                  {@const isWinner = winner && winner.id === option.id}

                  <div class="result-row" class:winner={isWinner}>
                    <div class="result-info">
                      <span class="result-label" class:winner-label={isWinner}>
                        {option.label}
                        <!-- {#if isWinner}
                          <span class="winner-badge">Winner</span>
                        {/if} -->
                      </span>
                      <span class="result-stats"
                        >{count} votes ({percentage}%)</span
                      >
                    </div>
                    <div class="result-bar-container">
                      <div
                        class="result-bar"
                        class:winner-bar={isWinner}
                        style="width: {percentage}%"
                      ></div>
                    </div>
                  </div>
                {/each}
                <p class="results-total">{results.total} total votes</p>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <GoBackHome />
</div>

<style lang="postcss">
  .polls-container {
    @apply max-w-lg mx-auto px-3 py-4;
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

  .back-arrow {
    @apply w-6 h-6 text-colorTextSoft hover:text-colorText transition-colors;
  }

  .back-arrow svg {
    @apply w-full h-full;
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

  /* .polls-list {
    @apply grid grid-cols-2 gap-2;
  } */

  .polls-list {
    @apply flex flex-col gap-8;
  }

  .poll-card {
    @apply border-2 border-colorTextSoftest rounded-sm overflow-hidden bg-colorCardA;
  }

  .poll-header {
    @apply px-2 py-1.5 bg-colorCardC border-b border-colorTextSoftest text-center flex flex-col;
  }

  .poll-question {
    @apply text-base font-semibold text-colorText m-0;
  }

  .poll-content {
    @apply p-2;
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
    @apply flex flex-col gap-3;
  }

  .result-row {
    @apply flex flex-col gap-0.5;
  }

  .result-row.winner {
    @apply p-1.5 -mx-1.5 bg-green-100 dark:bg-green-700/20 rounded;
  }

  .result-info {
    @apply flex items-center justify-between gap-2;
  }

  .result-label {
    @apply text-sm font-medium text-colorText flex items-center gap-2;
  }

  .result-label.winner-label {
    @apply text-green-700 dark:text-green-400;
  }

  .result-stats {
    @apply text-xs text-colorTextSoft font-mono;
  }

  .result-bar-container {
    @apply w-full h-2 bg-zinc-400 dark:bg-zinc-600 rounded overflow-hidden;
  }

  .result-bar {
    @apply h-full bg-blue-500 dark:bg-blue-600 transition-all duration-300;
  }

  .result-bar.winner-bar {
    @apply bg-green-500 dark:bg-green-600;
  }

  .results-total {
    @apply text-center text-xs text-colorTextSoft mt-1 mb-0;
  }
</style>
