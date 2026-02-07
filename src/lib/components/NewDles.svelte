<script>
  import {
    categoryColors,
    newDles,
    filteredDles,
    hiddenDleIdsSet,
  } from "$lib/stores"
  import DleGroup from "$lib/components/Dles/DleGroup.svelte"
  import SectionHeader from "./SectionHeader.svelte"
  import IconSunrise from "./Icons/IconSunrise.svelte"

  // Create a map of id -> full dle data from filteredDles
  $: dlesById = new Map($filteredDles.map((d) => [d.id, d]))

  // Group dles by date_added, sorted by most recent first
  // Look up full dle data by id, filter out hidden and any not found in main dles list
  $: dlesByDate = groupByDate(
    $newDles
      .filter((d) => !$hiddenDleIdsSet.has(d.id) && dlesById.has(d.id))
      .map((d) => ({ ...dlesById.get(d.id), date_added: d.date_added })),
  )

  function groupByDate(dles) {
    const groups = {}

    for (const dle of dles) {
      const date = dle.date_added
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(dle)
    }

    // Sort dates descending (most recent first)
    const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a))

    return sortedDates.map((date) => ({
      date,
      dles: groups[date].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      ),
    }))
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00")
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffTime = today - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Added today"
    if (diffDays === 1) return "Added yesterday"
    if (diffDays < 7) return `Added ${diffDays} days ago`

    return (
      "Added " +
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    )
  }

  $: hasVisibleDles = dlesByDate.length > 0
</script>

{#if hasVisibleDles}
  <div class="card">
    <SectionHeader
      title="NEW"
      icon={IconSunrise}
      color={$categoryColors["New"]}
    />

    <div class="new-dles-container">
      {#each dlesByDate as group}
        <div class="date-group">
          <div class="date-header">
            {formatDate(group.date)}
          </div>
          <DleGroup dleGroup={group.dles} section="new" showCategoryIcon />
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="postcss">
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }

  .new-dles-container {
    @apply flex flex-col;
  }

  .date-group {
    @apply border-t border-colorNeutralSoft;
  }

  .date-group:first-child {
    @apply border-t-0;
  }

  .date-header {
    @apply px-2 py-1 text-xs font-medium text-colorTextSoft bg-colorCardC text-center;
  }
</style>
