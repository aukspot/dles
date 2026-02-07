<script>
  import {
    categoryColors,
    searchQuery,
    sponsors,
    favoriteIds,
    hiddenDleIdsSet,
  } from "$lib/stores"
  import { enhancedSearch } from "$lib/js/utilities"
  import DleGroup from "$lib/components/Dles/DleGroup.svelte"
  import { trackEvent } from "$lib/js/trackingUtils"
  import SectionHeader from "./SectionHeader.svelte"
  import IconStar from "./Icons/IconStar.svelte"

  $: visibleSponsors = $sponsors.filter((s) => !$hiddenDleIdsSet.has(s.id))
  $: hasVisibleSponsors = visibleSponsors.length > 0
</script>

{#if hasVisibleSponsors}
  <div class="card">
    <SectionHeader
      title="Sponsors"
      icon={IconStar}
      color={$categoryColors["Sponsors"]}
    />

    <DleGroup dleGroup={visibleSponsors} section="sponsors" />

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
