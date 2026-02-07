<script>
  import { changelog, dles, poppedUpDle } from "$lib/stores"
  import GoBackHome from "$lib/components/GoBackHome.svelte"
  import IconPlus from "$lib/components/Icons/IconPlus.svelte"
  import IconMinus from "$lib/components/Icons/IconMinus.svelte"
  import IconInfo from "$lib/components/Icons/IconInfo.svelte"
  import DlePopUp from "$lib/components/Dles/DlePopUp.svelte"
  import BackToTopButton from "$lib/components/Buttons/BackToTopButton.svelte"

  // Create a map of dle id -> full dle data for quick lookup
  $: dlesById = new Map($dles.map((d) => [d.id, d]))

  // Check if a dle still exists in the current list
  function getDleData(changelogDle) {
    return dlesById.get(changelogDle.id)
  }

  let referenceElements = {}

  function handleDleClick(e, dle, popupKey) {
    e.preventDefault()
    const fullDle = getDleData(dle)
    if (fullDle) {
      $poppedUpDle === popupKey
        ? ($poppedUpDle = "")
        : ($poppedUpDle = popupKey)
    }
  }

  function handleClickOutside(event) {
    const originalEvent = event.detail?.originalEvent
    const target = originalEvent?.target
    if (target && target.closest(".dlePopUp")) {
      return
    }
    $poppedUpDle = ""
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00")
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffTime = today - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Count totals
  $: totalAdded = $changelog.reduce(
    (sum, log) => sum + (log["dles added"]?.length || 0),
    0,
  )
  $: totalRemoved = $changelog.reduce(
    (sum, log) => sum + (log["dles removed"]?.length || 0),
    0,
  )

  // Parse description into bullet points, excluding add/remove mentions
  function parseDescription(description) {
    if (!description) return []
    return description
      .split(/<br\s*\/?>/i)
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .map((part) => {
        // Strip "Add X dles." and "Remove X dles." from the beginning
        return part
          .replace(/^(add|remove)\s+\d+\s+dles?\.\s*/gi, "")
          .replace(/^(add|remove)\s+\d+\s+dles?\.\s*/gi, "") // Run twice for "Add X. Remove Y."
          .trim()
      })
      .filter((part) => part.length > 0)
  }
</script>

<svelte:head>
  <title>Changelog - The Dles</title>
  <meta name="description" content="Changelog for The Dles." />
</svelte:head>

<div class="changelog-container">
  <div class="changelog-header">
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
      <h2 class="changelog-title">Changelog</h2>
      <span class="header-count">{$changelog.length} updates</span>
    </div>
    <div class="header-spacer"></div>
  </div>

  <div class="stats-bar">
    <span class="stat added">+{totalAdded} dles</span> /
    <span class="stat removed">-{totalRemoved} dles</span>
  </div>

  <div class="changelog-list">
    {#each $changelog as log, index}
      <div class="date-group">
        <div class="date-header">
          <span class="date-text">{formatDate(log.date)} </span>
          {#if log["dles added"]?.length > 0 || log["dles removed"]?.length > 0}
            <div>
              <span class="stat added">+{log["dles added"]?.length ?? 0}</span>
              /
              <span class="stat removed"
                >-{log["dles removed"]?.length ?? 0}</span
              >
            </div>
          {/if}
        </div>

        {#if log["dles added"]?.length > 0 || log["dles removed"]?.length > 0}
          <div class="dles-columns">
            <div
              class="dles-section added-section"
              class:empty-section={!log["dles added"]?.length}
            >
              <div class="section-label added">
                <IconPlus />
                <span>Added ({log["dles added"]?.length || 0})</span>
              </div>
              {#if log["dles added"]?.length > 0}
                {#each log["dles added"] as dle, i}
                  {@const fullDle = getDleData(dle)}
                  {@const popupKey = `changelog-${log.date}-${dle.id}`}
                  {#if fullDle}
                    <div
                      class="dle-item"
                      class:even-row={i % 2 === 0}
                      class:odd-row={i % 2 !== 0}
                    >
                      <span class="dle-indicator added">+</span>
                      <div class="dle-details">
                        <div class="dle-name">{dle.name}</div>
                        <div class="dle-url">{fullDle.url}</div>
                      </div>
                      <button
                        class="info-btn"
                        bind:this={referenceElements[popupKey]}
                        on:click={(e) => handleDleClick(e, dle, popupKey)}
                        aria-label="Show info for {dle.name}"
                      >
                        <IconInfo />
                      </button>
                    </div>
                    {#if $poppedUpDle === popupKey}
                      <DlePopUp
                        dle={fullDle}
                        {handleClickOutside}
                        section="changelog"
                        position={i}
                        referenceEl={referenceElements[popupKey]}
                      />
                    {/if}
                  {:else}
                    <div
                      class="dle-item discontinued"
                      class:even-row={i % 2 === 0}
                      class:odd-row={i % 2 !== 0}
                    >
                      <span class="dle-indicator added">+</span>
                      <div class="dle-details">
                        <div class="dle-name">{dle.name}</div>
                        <div class="dle-meta">No longer available</div>
                      </div>
                    </div>
                  {/if}
                {/each}
              {:else}
                <div class="dle-item empty-message">
                  <span class="empty-text">No dles added</span>
                </div>
              {/if}
            </div>

            <div
              class="dles-section removed-section"
              class:empty-section={!log["dles removed"]?.length}
            >
              <div class="section-label removed">
                <IconMinus />
                <span>Removed ({log["dles removed"]?.length || 0})</span>
              </div>
              {#if log["dles removed"]?.length > 0}
                {#each log["dles removed"] as dle, i}
                  <div
                    class="dle-item removed"
                    class:even-row={i % 2 === 0}
                    class:odd-row={i % 2 !== 0}
                  >
                    <span class="dle-indicator removed">−</span>
                    <div class="dle-details">
                      <div class="dle-name">{dle.name}</div>
                      <div class="dle-url">{dle.url}</div>
                      {#if dle.reason}
                        <div class="dle-reason">{dle.reason}</div>
                      {/if}
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="dle-item empty-message">
                  <span class="empty-text">No dles removed</span>
                </div>
              {/if}
            </div>
          </div>
        {/if}

        {#if parseDescription(log.description).length > 0}
          <div class="updates-section">
            <div class="section-label updates">
              <span>Updates</span>
            </div>
            <ul class="updates-list">
              {#each parseDescription(log.description) as update}
                <li class="update-item">{@html update}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <GoBackHome />
  <BackToTopButton />
</div>

<style lang="postcss">
  .changelog-container {
    @apply max-w-lg md:max-w-3xl mx-auto px-3 py-4;
  }

  .changelog-header {
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

  .changelog-title {
    @apply text-xl font-bold text-colorText m-0;
  }

  .stats-bar {
    @apply flex justify-center gap-4 mb-4 text-sm font-mono;
  }

  .stat.added {
    @apply text-green-600 dark:text-green-400;
  }

  .stat.removed {
    @apply text-red-600 dark:text-red-400;
  }

  .changelog-list {
    @apply flex flex-col border-b-2 border-colorTextSofter;
  }

  .date-group {
    @apply border border-colorTextSofter border-t-2 border-b-0;
  }

  .date-header {
    @apply px-2 py-2 text-sm font-medium text-colorText bg-colorCardC flex items-center justify-between;
  }

  .date-text {
    @apply font-bold;
  }

  .dles-columns {
    @apply border-t border-colorNeutralSoft;
  }

  @media (min-width: 768px) {
    .dles-columns {
      @apply flex;
    }

    .dles-columns .dles-section {
      @apply border-t-0;
      flex: 1 1 50%;
      width: 50%;
    }

    .dles-columns .removed-section {
      @apply border-l border-colorNeutralSoft;
    }
  }

  .dles-section {
    @apply border-t border-colorNeutralSoft;
  }

  .dles-columns .dles-section {
    @apply border-t-0;
  }

  .dles-columns .dles-section:not(:first-child) {
    @apply border-t border-colorNeutralSoft;
  }

  @media (min-width: 768px) {
    .dles-columns .dles-section:not(:first-child) {
      @apply border-t-0;
    }
  }

  .section-label {
    @apply px-2 py-1 text-xs font-bold uppercase tracking-wide flex items-center gap-1;
  }

  .section-label.added {
    @apply text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20;
  }

  .section-label.removed {
    @apply text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20;
  }

  .section-label :global(svg) {
    @apply w-3 h-3;
  }

  .dle-item {
    @apply flex items-center p-2 pr-2 no-underline w-full;
    transition: background-color 0.15s ease;
  }

  .dle-item.even-row {
    @apply bg-colorCardB;
  }

  .dle-item.odd-row {
    @apply bg-colorCardA;
  }

  .dle-item:hover {
    @apply bg-colorCardC;
  }

  .dle-item.removed {
    @apply opacity-70;
  }

  .dle-item.discontinued {
    @apply opacity-50 cursor-default;
  }

  .dle-item.discontinued:hover {
    @apply bg-colorCardB;
  }

  .dle-item.discontinued.odd-row:hover {
    @apply bg-colorCardA;
  }

  .dle-indicator {
    @apply flex-shrink-0 w-5 text-center font-bold text-lg leading-none mr-2;
  }

  .dle-indicator.added {
    @apply text-green-600 dark:text-green-400;
  }

  .dle-indicator.removed {
    @apply text-red-600 dark:text-red-400;
  }

  .dle-details {
    @apply flex-1 min-w-0;
  }

  .info-btn {
    @apply flex-shrink-0 ml-2 p-1 border-none bg-transparent cursor-pointer text-colorTextSofter hover:text-colorTextSoft transition-colors;
  }

  .info-btn :global(svg) {
    @apply w-5 h-5;
  }

  .dle-name {
    @apply font-medium text-colorText text-sm md:text-base leading-tight truncate;
  }

  .dle-url {
    @apply text-xs text-colorTextSoft truncate;
  }

  .dle-meta {
    @apply text-xs text-colorTextSofter italic;
  }

  .dle-reason {
    @apply text-xs text-colorTextSofter italic mt-0.5;
  }

  .dle-item.empty-message {
    @apply justify-center bg-colorCardA;
  }

  .empty-text {
    @apply text-sm text-colorTextSofter italic;
  }

  .dles-section.empty-section {
    @apply hidden;
  }

  @media (min-width: 768px) {
    .dles-section.empty-section {
      @apply block;
    }
  }

  .updates-section {
    @apply border-t border-colorNeutralSoft;
  }

  .section-label.updates {
    @apply text-colorTextSoft bg-colorCardB;
  }

  .updates-list {
    @apply list-none m-0 p-0;
  }

  .update-item {
    @apply px-3 py-1.5 text-sm text-colorTextSoft bg-colorCardC border-b border-colorNeutralSoft last:border-b-0;
  }

  .update-item::before {
    content: "•";
    @apply mr-2 text-colorTextSofter;
  }
</style>
