<script>
  import { categoryColors, searchQuery } from "$lib/stores"
  import { enhancedSearch } from "$lib/js/utilities"
  import DleGroup from "$lib/components/Dles/DleGroup.svelte"
  import { trackEvent } from "$lib/js/trackingUtils"

  let pageX = 0
  let pageY = 0
  let clientY = 0

  const partners = [
    {
      id: 220,
      name: "MapTap",
      url: "https://maptap.gg",
      description:
        "Click as close as you can to the given world cities, 5 rounds per day.",
      category: "Geography",
    },
    {
      id: 308,
      name: "Quintalist",
      url: "https://www.quintalist.com?dles",
      description: "Correctly choose the top 5 entries in 5 tries or fewer.",
      category: "Trivia",
      theme: "Guess the List",
    },
    {
      id: 468,
      name: "FlashPopTiles",
      url: "https://flashpoptiles.com",
      description:
        "Traverse the grid while changing either shape or color, never both!",
      category: "Shapes/Patterns",
    },
  ]

  $: filteredPartners = enhancedSearch(partners, $searchQuery)
</script>

{#if $searchQuery.length == 0 || filteredPartners.length > 0}
  <div class="card">
    <div
      class="labelContainer"
      style="background-color: {$categoryColors['Sponsors']}"
    >
      <div class="label">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            version="1.0"
            viewBox="-10 -8 80 80"
            width="28"
          >
            <path
              fill="currentColor"
              d="M62.799 23.737a3.941 3.941 0 0 0-3.139-2.642l-16.969-2.593-7.622-16.237a3.938 3.938 0 0 0-7.13 0l-7.623 16.238-16.969 2.593a3.937 3.937 0 0 0-2.222 6.642l12.392 12.707-2.935 17.977a3.94 3.94 0 0 0 5.797 4.082l15.126-8.365 15.126 8.365a3.94 3.94 0 0 0 5.796-4.082l-2.935-17.977 12.393-12.707a3.942 3.942 0 0 0 .914-4.001z"
            />
          </svg>
        </div>
        Sponsors
      </div>
    </div>
    <!-- {#if $searchQuery.length == 0}
      <div class="partner-cta-header">
        <p class="partner-cta-text">Play one of our sponsors!</p>
      </div>
    {/if} -->
    <DleGroup
      bind:pageX
      bind:pageY
      bind:clientY
      dleGroup={filteredPartners}
      section="sponsors"
    />

    {#if $searchQuery.length == 0}
      <div class="partner-footer">
        <a
          href="https://tally.so/r/wgEX5K"
          class="partner-inquiry-link"
          target="_blank"
          on:click={() => trackEvent("sponsor-inquiry-click", {})}
          >Want to sponsor? Message me!</a
        >
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }
  .labelContainer {
    @apply py-2 px-2 bg-colorCardB border-b-2 border-colorText;
  }
  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-base md:text-lg text-colorText font-semibold;
  }

  .partner-footer {
    @apply px-1 py-1 bg-colorCardB border-t border-colorNeutralSoft text-center;
  }

  .partner-inquiry-link {
    @apply text-xs text-colorTextSofter hover:hover:text-colorLinkHover underline decoration-1 underline-offset-2 transition-colors;
  }
</style>
