<script>
  import {
    dlesOfTheWeek,
    favorites,
    categorizedDles,
    categories,
    categoryColors,
    categoryRanks,
    newDles,
    sponsors,
    searchQuery,
    completelyHiddenSections,
    poppedUpDle as globalPoppedUpDle,
  } from "$lib/stores"

  import { categoryIcons } from "$lib/js/categoryIcons"
  import IconCalendarHeart from "../Icons/IconCalendarHeart.svelte"
  import IconFavoriteFilled from "../Icons/IconFavoriteFilled.svelte"
  import IconNew from "../Icons/IconNew.svelte"
  import IconInfo from "../Icons/IconInfo.svelte"
  import IconStar from "../Icons/IconStar.svelte"
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"
  import DlePopUp from "./DlePopUp.svelte"
  import { useTracking } from "$lib/composables/useTracking"

  let currentDle = null
  let currentSection = ""
  let currentPosition = null
  let infoButtonRef = null

  const tracking = useTracking()

  function handleDleClick(dle, section, index, event) {
    // Track the click
    const customTrackingData = {
      click_type:
        event.ctrlKey || event.metaKey
          ? "ctrl-click"
          : event.button === 1
            ? "middle-click"
            : "url-link",
      source: "table-view",
      section: section,
      position: index,
    }
    tracking.trackGameClick(dle, customTrackingData)
  }

  function showDescription(dle, section, position, event) {
    event.stopPropagation()

    const popupKey = `table-${section}-${dle.name}`

    if ($globalPoppedUpDle === popupKey) {
      $globalPoppedUpDle = ""
      infoButtonRef = null
      currentDle = null
      return
    }

    infoButtonRef = event.target.closest("button")
    currentDle = dle
    currentSection = section
    currentPosition = position
    $globalPoppedUpDle = popupKey
  }

  function handleClickOutside() {
    $globalPoppedUpDle = ""
    infoButtonRef = null
    currentDle = null
  }

  // Watch for changes to globalPoppedUpDle to clear local state when closed
  $: if ($globalPoppedUpDle === "") {
    infoButtonRef = null
    currentDle = null
  }

  // Build table sections - group DLEs by section
  let tableSections = []

  function buildTableSections() {
    const sections = []

    // DLES of the Week (hide when searching or completely hidden)
    if (
      $dlesOfTheWeek.length !== 0 &&
      (!$searchQuery || $searchQuery.trim() === "") &&
      !completelyHiddenSections.isCompletelyHidden(
        "dlesOfTheWeek",
        $completelyHiddenSections,
      )
    ) {
      sections.push({
        id: "dles-of-the-week",
        name: "DLES of the Week",
        color: "rainbow-gradient",
        icon: IconCalendarHeart,
        dles: $dlesOfTheWeek,
      })
    }

    // Favorites (unless completely hidden)
    if (
      !completelyHiddenSections.isCompletelyHidden(
        "favorites",
        $completelyHiddenSections,
      )
    ) {
      sections.push({
        id: "favorites",
        name: "Favorites",
        color: "hsl(320, 90%, 50%, 45%)",
        icon: IconFavoriteFilled,
        dles: $favorites,
      })
    }

    // Sponsors (when not searching)
    if (!$searchQuery || $searchQuery.trim() === "") {
      sections.push({
        id: "sponsors",
        name: "Sponsors",
        color: $categoryColors["Sponsors"],
        icon: IconStar,
        dles: $sponsors,
      })
    }

    // Sort categories by rank
    const sortedCategories = [...$categories].sort((a, b) => {
      const rankA = $categoryRanks[a] ?? 999
      const rankB = $categoryRanks[b] ?? 999
      return rankA - rankB
    })

    // Add category sections in ranked order
    for (const category of sortedCategories) {
      const categoryDles = $categorizedDles[category] || []
      if (
        categoryDles.length !== 0 &&
        !completelyHiddenSections.isCompletelyHidden(
          category,
          $completelyHiddenSections,
        )
      ) {
        sections.push({
          id: category,
          name: category,
          color: $categoryColors[category],
          icon: categoryIcons[category],
          dles: categoryDles,
        })
      }
    }

    tableSections = sections
  }

  $: {
    $dlesOfTheWeek
    $favorites
    $categorizedDles
    $categories
    $categoryRanks
    $completelyHiddenSections
    $sponsors
    buildTableSections()
  }

  function isNewDle(dle) {
    return $newDles.some((newDle) => newDle.id === dle.id)
  }
</script>

<div class="table-view-container">
  <div class="table-wrapper">
    <table class="dles-table">
      {#each tableSections as section (section.id)}
        <tbody>
          <tr class="section-header-row">
            <td
              colspan="3"
              class="section-header"
              style="--section-color: {section.color}"
              class:rainbow-gradient={section.id === "dles-of-the-week"}
            >
              <div class="section-header-content">
                {#if section.icon}
                  <div class="section-icon">
                    <svelte:component this={section.icon} />
                  </div>
                {/if}
                <span class="section-name">{section.name}</span>
              </div>
            </td>
          </tr>
          {#each section.dles as dle, index (dle.id)}
            <tr class="dle-row">
              <td class="cell-fav">
                <FavoriteButton
                  {dle}
                  section={section.id}
                  position={index}
                  size="small"
                />
              </td>
              <td class="cell-name">
                <div class="name-cell-content">
                  <a
                    href={dle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="dle-name-link"
                    on:click={(e) => handleDleClick(dle, section.id, index, e)}
                    on:auxclick={(e) =>
                      handleDleClick(dle, section.id, index, e)}
                  >
                    {dle.name}
                  </a>
                  {#if isNewDle(dle)}
                    <span class="new-badge">
                      <IconNew />
                    </span>
                  {/if}
                </div>
              </td>
              <td class="cell-description">
                <span class="description-text desktop-only"
                  >{dle.description}</span
                >
                <button
                  class="info-button mobile-only"
                  on:click={(e) => showDescription(dle, section.id, index, e)}
                  title="Show description"
                >
                  <IconInfo />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      {/each}
    </table>
  </div>
</div>

{#if currentDle && infoButtonRef}
  <DlePopUp
    dle={currentDle}
    section={currentSection}
    position={currentPosition}
    {handleClickOutside}
    referenceEl={infoButtonRef}
  />
{/if}

<style lang="postcss">
  .table-view-container {
    @apply w-full mx-auto p-2 md:p-4;
  }

  .table-wrapper {
    @apply overflow-x-auto shadow-lg rounded-sm;
  }

  .dles-table {
    @apply w-full border-collapse bg-colorCardC;
    border: 2px solid theme("colors.colorText");
  }

  tbody {
    @apply border-b-2 border-colorText;
  }

  tbody:last-child {
    @apply border-b-0;
  }

  .section-header-row {
    @apply border-b-2 border-colorTextSoftest;
  }

  .section-header {
    @apply py-2 px-2 font-semibold text-colorText;
  }

  .section-header:not(.rainbow-gradient) {
    background-color: var(--section-color);
  }

  .section-header-content {
    @apply flex items-center gap-2;
  }

  .section-name {
    @apply text-sm md:text-base font-semibold text-colorText;
  }

  .dle-row {
    @apply border-b border-colorTextSoftest transition-colors duration-75;
  }

  .dle-row:hover {
    @apply bg-yellow-100 dark:bg-slate-900;
  }

  .dle-row:last-child {
    @apply border-b-0;
  }

  td {
    @apply px-2 py-1.5 border-r-2 border-colorTextSoftest;
  }

  td:last-child {
    @apply border-r-0;
  }

  .cell-fav {
    @apply text-center;
  }

  .cell-name {
    @apply font-medium;
  }

  .name-cell-content {
    @apply flex items-center gap-1.5;
  }

  .dle-name-link {
    @apply text-colorLink hover:text-colorLinkHover hover:underline transition-colors duration-75 text-sm;
  }

  .new-badge {
    @apply flex-shrink-0;
  }

  .new-badge :global(svg) {
    @apply w-4 h-4;
  }

  .info-button {
    @apply flex-shrink-0 p-0 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-75;
    width: 1.375rem;
    height: 1.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.dark) .info-button {
    @apply hover:bg-zinc-700;
  }

  .info-button :global(svg) {
    @apply w-full h-full stroke-colorTextSofter;
  }

  .mobile-only {
    @apply md:hidden;
  }

  .desktop-only {
    @apply hidden md:table-cell;
  }

  .cell-description {
    @apply text-colorTextSoft;
  }

  .description-text {
    @apply text-sm leading-relaxed;
  }

  .sr-only {
    @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
    clip: rect(0, 0, 0, 0);
  }
</style>
