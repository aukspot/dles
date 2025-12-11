<script>
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import { pollResponses, getActivePolls } from "$lib/stores"
  import { trackEvent } from "$lib/js/trackingUtils"

  export let open = false

  let loadingPollId = null
  let errorPollId = null
  let errorMessage = ""
  let pollResults = {} // { pollId: { results, showResults } }
  let currentPollIndex = 0
  let showAllPolls = false

  // Get active polls, sorted by answered status (unanswered first)
  $: activePolls = getActivePolls().sort((a, b) => {
    const aAnswered = hasAnswered(a.id)
    const bAnswered = hasAnswered(b.id)
    if (aAnswered === bAnswered) return 0
    return aAnswered ? 1 : -1 // Unanswered first
  })

  // Reset to first unanswered poll when polls change
  $: if (activePolls.length > 0 && !showAllPolls) {
    const firstUnanswered = activePolls.findIndex(
      (poll) => !hasAnswered(poll.id),
    )
    currentPollIndex = firstUnanswered !== -1 ? firstUnanswered : 0
  }

  $: currentPoll = activePolls[currentPollIndex]

  // Auto-load results for answered polls when component mounts or poll changes
  $: if (
    currentPoll &&
    hasAnswered(currentPoll.id) &&
    currentPoll.showResultsImmediately &&
    !pollResults[currentPoll.id]
  ) {
    loadResults(currentPoll)
  }

  function goToPrevPoll() {
    currentPollIndex =
      (currentPollIndex - 1 + activePolls.length) % activePolls.length
  }

  function goToNextPoll() {
    currentPollIndex = (currentPollIndex + 1) % activePolls.length
  }

  function toggleViewMode() {
    showAllPolls = !showAllPolls
  }

  // Check if user has answered each poll
  function hasAnswered(pollId) {
    return pollResponses.hasAnswered(pollId, $pollResponses)
  }

  function getUserAnswer(pollId) {
    return pollResponses.getAnswer(pollId, $pollResponses)
  }

  async function submitVote(poll, optionId) {
    loadingPollId = poll.id
    errorPollId = null
    errorMessage = ""

    try {
      // Use local worker in dev, production URL in prod
      const apiUrl = import.meta.env.DEV
        ? "http://localhost:8787/api/poll-vote"
        : "/api/poll-vote"

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollId: poll.id,
          optionId: optionId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit vote")
      }

      const data = await response.json()

      // Record answer locally
      pollResponses.recordAnswer(poll.id, optionId)

      // Track with Umami
      trackEvent("poll-vote", {
        pollId: poll.id,
        option: optionId,
      })

      // Show results if configured
      if (poll.showResultsImmediately) {
        pollResults[poll.id] = {
          results: calculatePercentages(data.results),
          showResults: true,
        }
      }
    } catch (err) {
      errorPollId = poll.id
      errorMessage = err.message
    } finally {
      loadingPollId = null
    }
  }

  async function loadResults(poll) {
    loadingPollId = poll.id
    errorPollId = null
    errorMessage = ""

    try {
      // Use local worker in dev, production URL in prod
      const apiUrl = import.meta.env.DEV
        ? `http://localhost:8787/api/poll-results?pollId=${poll.id}`
        : `/api/poll-results?pollId=${poll.id}`

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error("Failed to load results")
      }

      const data = await response.json()
      pollResults[poll.id] = {
        results: calculatePercentages(data.results),
        showResults: true,
      }
    } catch (err) {
      errorPollId = poll.id
      errorMessage = err.message
    } finally {
      loadingPollId = null
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

  function toggleResults(poll) {
    if (pollResults[poll.id]?.showResults) {
      pollResults[poll.id].showResults = false
    } else {
      loadResults(poll)
    }
  }
</script>

<PanelWrapper {open}>
  <PanelTitle color="blue" title="POLLS" />

  <div class="polls-wrapper">
    {#if activePolls.length === 0}
      <p class="no-polls-message">No active polls.</p>
    {:else}
      <!-- Single poll view with navigation -->
      {#if currentPoll}
        {@const answered = hasAnswered(currentPoll.id)}
        {@const userAnswer = getUserAnswer(currentPoll.id)}
        {@const showingResults = pollResults[currentPoll.id]?.showResults}
        {@const results = pollResults[currentPoll.id]?.results}

        <div class="single-poll-container">
          <!-- Poll card -->
          <h3 class="poll-question">
            <div>
              {currentPoll.question}
            </div>
          </h3>
          <div class="poll-card">
            {#if errorPollId === currentPoll.id}
              <div class="error-message">
                Error: {errorMessage}
              </div>
            {/if}

            {#if loadingPollId === currentPoll.id}
              <!-- Loading state -->
              <div class="loading-container">
                <p class="loading-text">Loading...</p>
              </div>
            {:else if !answered && !showingResults}
              <!-- Voting UI -->
              <div class="poll-options-container">
                {#each currentPoll.options as option}
                  <button
                    class="poll-option-btn"
                    on:click={() => submitVote(currentPoll, option.id)}
                    disabled={loadingPollId === currentPoll.id}
                  >
                    {option.label}
                  </button>
                {/each}
              </div>
            {:else if showingResults}
              <!-- Results display -->
              <div class="poll-results">
                <div class="results-list">
                  {#each currentPoll.options as option}
                    {@const count = results[option.id] || 0}
                    {@const percentage = results.percentages[option.id] || 0}
                    <div class="result-row max-w-48">
                      <div class="mx-auto">
                        <span class="result-label">{option.label}:</span>
                        <span class="result-stats">
                          {count} ({percentage}%)</span
                        >
                      </div>
                      <span class="result-stats"></span>
                      <div class="result-bar-container">
                        <div
                          class="result-bar"
                          style="width: {percentage}%"
                        ></div>
                      </div>
                    </div>
                  {/each}
                </div>
                <p class="results-total">
                  <strong>{results.total}</strong> total votes
                </p>
              </div>
            {:else}
              <!-- Answered but results not loaded yet -->
              <div class="loading-container">
                <p class="loading-text">Loading...</p>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Navigation arrows -->
      {#if activePolls.length > 1}
        <div class="poll-navigation">
          <button
            class="nav-arrow nav-arrow-left"
            on:click={goToPrevPoll}
            aria-label="Previous poll"
          >
            ←
          </button>
          <span class="poll-counter"
            >{currentPollIndex + 1} / {activePolls.length}</span
          >
          <button
            class="nav-arrow nav-arrow-right"
            on:click={goToNextPoll}
            aria-label="Next poll"
          >
            →
          </button>
        </div>
      {/if}
    {/if}
  </div></PanelWrapper
>

<style lang="postcss">
  .polls-wrapper {
    @apply p-2;
  }

  .single-poll-container {
    @apply flex flex-col gap-3;
  }

  .poll-navigation {
    @apply flex items-center justify-center gap-4 m-2;
  }

  .nav-arrow {
    @apply w-8 h-8 flex items-center justify-center bg-colorCardC border border-colorTextSofter
           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded text-xl font-bold text-colorText;
  }

  .poll-counter {
    @apply text-sm font-medium text-colorTextSoft min-w-[3rem] text-center;
  }

  .no-polls-message {
    @apply text-center text-colorTextSoft py-6;
    @apply md:col-span-2;
  }

  .poll-card {
    @apply p-2 min-h-40 rounded flex flex-col gap-1 justify-around;
  }

  .poll-question {
    @apply flex justify-center text-center items-start gap-1 text-lg md:text-xl font-semibold text-colorText mb-2;
  }

  .poll-options-container {
    @apply flex flex-wrap justify-center gap-3;
  }

  .poll-option-btn {
    @apply p-2 bg-colorCardC border border-colorTextSofter
           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
           font-medium text-colorText text-sm md:text-base uppercase leading-tight min-w-16;
    min-height: 2.5rem;
  }

  .poll-option-btn:disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .loading-container {
    @apply flex items-center justify-center py-8;
  }

  .loading-text {
    @apply text-colorTextSoft text-lg uppercase tracking-wide;
  }

  .error-message {
    @apply bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700
           text-red-700 dark:text-red-400 px-3 py-2 rounded mb-3 text-xs;
  }

  .poll-results {
    @apply flex flex-col gap-2;
  }

  .results-total {
    @apply text-center text-xs text-colorTextSoft;
  }

  .results-list {
    @apply flex gap-3 justify-center flex-wrap;
  }

  .result-row {
    @apply grid grid-cols-[1fr_auto] gap-2 items-center;
    flex: 1 1 200px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 200px */
    min-width: 200px;
  }

  .result-label {
    @apply text-[11px] font-medium text-colorText font-mono;
  }

  .result-stats {
    @apply text-[11px] text-colorTextSofter font-mono;
  }

  .result-bar-container {
    @apply col-span-2 w-full h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden border border-colorTextSoft;
  }

  .result-bar {
    @apply h-full bg-blue-400 dark:bg-blue-600 transition-all duration-300;
  }
</style>
