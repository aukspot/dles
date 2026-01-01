<script>
  import {
    categoryColors,
    searchQuery,
    sponsors,
    favoriteIds,
  } from "$lib/stores"
  import { enhancedSearch } from "$lib/js/utilities"
  import DleGroup from "$lib/components/Dles/DleGroup.svelte"
  import { trackEvent } from "$lib/js/trackingUtils"
  import SectionHeader from "./SectionHeader.svelte"
  import IconStar from "./Icons/IconStar.svelte"

  // Add favoriteIds dependency to force re-render when favorites change
  $: filteredPartners = ($favoriteIds, enhancedSearch($sponsors, $searchQuery))
</script>

{#if $searchQuery.length == 0 || filteredPartners.length > 0}
  <div class="card">
    <SectionHeader
      title="Sponsors"
      icon={IconStar}
      color={$categoryColors['Sponsors']}
    />
    <!-- {#if $searchQuery.length == 0}
      <div class="partner-cta-header">
        <p class="partner-cta-text">Play one of our sponsors!</p>
      </div>
    {/if} -->
    <DleGroup dleGroup={filteredPartners} section="sponsors" />

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

  .partner-footer {
    @apply px-1 py-1 bg-colorCardB border-t border-colorNeutralSoft text-center;
  }

  .partner-inquiry-link {
    @apply text-tiny md:text-xs text-colorTextSofter hover:hover:text-colorLinkHover underline decoration-1 underline-offset-2 transition-colors;
  }
</style>
