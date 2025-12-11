<script>
  import { changelog } from "$lib/stores"
  import { onMount } from "svelte"
  import { browser } from "$app/environment"
  import GoBackHome from "$lib/components/GoBackHome.svelte"

  let changelogContainer
  let changelogLength = $changelog.length

  // Format description with bullet points
  function formatDescription(description) {
    const parts = description.split(/<br\s*\/?>/i).filter((part) => part.trim())
    if (parts.length === 1) {
      return `<span class="bullet-line">• ${description}</span>`
    }
    return parts
      .map((part) => `<span class="bullet-line">• ${part}</span>`)
      .join("<br>")
  }

  function layoutMasonry() {
    if (!browser || !changelogContainer) return

    const entries = Array.from(changelogContainer.children)
    // Match custom Tailwind breakpoints: lg (768px) for 3 cols, md (480px) for 2 cols
    const columns =
      window.innerWidth >= 768 ? 3 : window.innerWidth >= 480 ? 2 : 1

    if (columns === 1) {
      // Reset to natural flow on mobile
      changelogContainer.style.height = ""
      changelogContainer.style.display = ""
      entries.forEach((entry) => {
        entry.style.position = ""
        entry.style.left = ""
        entry.style.top = ""
        entry.style.width = ""
      })
      return
    }

    // Ensure container uses flexbox for masonry
    changelogContainer.style.display = "flex"

    // Use the correct gap based on breakpoint (gap-3 for mobile = 12px, gap-4 for md+ = 16px)
    const gap = window.innerWidth >= 480 ? 16 : 12
    const containerWidth = changelogContainer.offsetWidth
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns
    const columnHeights = new Array(columns).fill(0)

    // First, set widths without positioning to allow proper height calculation
    entries.forEach((entry) => {
      entry.style.width = `${columnWidth}px`
      entry.style.position = "relative"
    })

    // Force a reflow to ensure heights are calculated with new widths
    changelogContainer.offsetHeight

    // Now position each entry in the shortest column with correct heights
    entries.forEach((entry) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))
      const height = entry.offsetHeight

      // Position absolutely
      entry.style.position = "absolute"
      entry.style.left = `${shortestColumn * (columnWidth + gap)}px`
      entry.style.top = `${columnHeights[shortestColumn]}px`

      // Update column height (add entry height + gap)
      columnHeights[shortestColumn] += height + gap
    })

    // Set container height to tallest column
    changelogContainer.style.height = `${Math.max(...columnHeights) - gap}px`
  }

  onMount(() => {
    // Wait for DOM to be fully rendered before initial layout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        layoutMasonry()
      })
    })

    // Debounce resize events
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(layoutMasonry, 100)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  })

  // Re-layout when changelog changes
  $: if ($changelog && changelogContainer) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        layoutMasonry()
      })
    })
  }
</script>

<svelte:head>
  <title>Changelog - The Dles</title>
  <meta name="description" content="Changelog for The Dles." />
</svelte:head>

<div class="page-container">
  <h2 class="font-mono title justify-center mb-4">Changelog</h2>
  <div class="text-center font-mono text-sm text-colorTextSoft mb-4">
    View all <strong>{$changelog.length}</strong> updates to The DLES.
  </div>
  <GoBackHome />
  <div id="changelog" bind:this={changelogContainer}>
    {#each $changelog as log, index}
      <article class="changelog-entry" id={log.date}>
        <div class="entry-number">#{changelogLength - index}</div>
        <header class="entry-header">
          <h3 class="entry-date inline">{log.date}</h3>
          {#if index === 0}
            <span class="text-colorTextSofter text-xs">(Latest update)</span>
          {/if}
          <div class="entry-description">
            {@html formatDescription(log.description)}
          </div>
        </header>

        {#if "dles added" in log}
          <section class="entry-section">
            <h4 class="section-title">
              + Dles Added ({log["dles added"].length})
            </h4>
            <ul class="dle-list">
              {#each log["dles added"] as dleAdded}
                <li class="dle-item">
                  <span class="dle-name">{dleAdded.name}</span>
                  <a
                    href={dleAdded.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="dle-url">{dleAdded.url}</a
                  >
                </li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if "dles removed" in log}
          <section class="entry-section removed-section">
            <h4 class="section-title">
              - Dles Removed ({log["dles removed"].length})
            </h4>
            <ul class="dle-list">
              {#each log["dles removed"] as dleRemoved}
                <li class="dle-item-removed">
                  <div class="dle-removed-info">
                    <strong>{dleRemoved.name}</strong>
                    <a
                      href={dleRemoved.url}
                      target="_blank"
                      rel="noopener noreferrer">{dleRemoved.url}</a
                    >
                    {#if dleRemoved.reason}
                      <span class="removal-reason">({dleRemoved.reason})</span>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      </article>
    {/each}
  </div>
</div>

<style lang="postcss">
  .page-container {
    @apply max-w-[90rem] mx-auto py-4;
  }

  #changelog {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4;
    grid-auto-rows: max-content;
    align-items: start;
    position: relative;
  }

  /* Enable flexbox for JS masonry layout */
  @media (min-width: 480px) {
    #changelog {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .changelog-entry {
    @apply bg-colorCardC border border-colorTextSofter p-3 md:p-4;
    position: relative;
  }

  /* Flexbox layout for JS masonry - 2 columns */
  @media (min-width: 480px) and (max-width: 767px) {
    .changelog-entry {
      width: calc(50% - 0.5rem);
    }
  }

  /* Flexbox layout for JS masonry - 3 columns */
  @media (min-width: 768px) {
    .changelog-entry {
      width: calc(33.333% - 0.667rem);
    }
  }

  .entry-number {
    @apply text-[14px] md:text-[16px] text-colorTextSofter font-mono;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }

  @media (min-width: 768px) {
    .entry-number {
      top: 1rem;
      right: 1rem;
    }
  }

  .entry-header {
    @apply mb-4;
  }

  .entry-date {
    @apply text-sm md:text-lg font-bold text-colorText font-mono mb-1.5;
  }

  .entry-description {
    @apply text-xs md:text-sm text-colorTextSoft leading-tight;
  }

  .entry-description :global(.bullet-line) {
    display: block;
    padding-left: 1em;
    text-indent: -0.7em;
    margin: 0.25rem 0;
  }

  .entry-description :global(br) {
    display: none;
  }

  .entry-section {
    @apply mt-3;
  }

  .section-title {
    @apply text-xs md:text-sm font-bold uppercase text-colorTextSoft mb-2 tracking-wide;
  }

  .dle-list {
    @apply list-none space-y-0;
  }

  .dle-item {
    @apply text-xs md:text-sm py-1.5 px-0.5 flex items-baseline gap-2 border-b border-colorTextSoftest last:border-b-0;
  }

  .dle-name {
    @apply font-medium text-colorText w-28 xl:w-32 flex-shrink-0;
  }

  .dle-url {
    @apply text-colorLink break-all text-xs md:text-sm hover:text-colorHighlight;
  }

  .dle-item-removed {
    @apply text-xs md:text-sm py-1.5 px-0 border-b border-colorTextSoftest last:border-b-0;
  }

  .dle-removed-info {
    @apply flex flex-col gap-0.5;
  }

  .dle-removed-info strong {
    @apply text-colorText text-xs md:text-sm;
  }

  .dle-removed-info a {
    @apply text-colorLink break-all text-xs md:text-sm;
  }

  .removal-reason {
    @apply text-colorTextSofter italic text-[11px] md:text-xs;
  }

  a {
    @apply break-words;
  }
</style>
