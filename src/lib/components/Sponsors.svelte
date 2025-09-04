<script>
  import { categoryColors, searchQuery } from "$lib/stores"
  import { enhancedSearch } from "$lib/js/utilities"

  const sponsors = [
    {
      id: "sponsor-nibble",
      name: "nibble.games",
      url: "https://nibble.games",
      logoLight: "/nibble.games_cropped_small.png",
      logoDark: "/nibble.games_cropped_dark_small.png",
      backgroundColor: "bg-white dark:bg-gray-950",
    },
    {
      id: "sponsor-quintalist",
      name: "Quintalist",
      url: "https://quintalist.com?dles",
      logoLight: "/QuintalistLightSmall.jpg",
      logoDark: "/QuintalistDarkSmall.jpg",
      backgroundColor: "bg-white dark:bg-black",
    },
  ]

  $: filteredSponsors = enhancedSearch(sponsors, $searchQuery)
</script>

{#if $searchQuery.length == 0 || filteredSponsors.length > 0}
  <div class="card">
    <div
      class="labelContainer"
      style="background-color: {$categoryColors['Sponsors']}"
    >
      <div class="label">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="28"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536.721.315 1.082.473 2.101.473 1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2c-.811 0-1.595.268-3.162.805L8.265 3C5.258 4.03 3.755 4.545 3.378 5.082Zm7.483 3.281-.13.235c-.145.259-.217.388-.329.473-.112.085-.252.117-.532.18l-.254.058c-.984.222-1.476.334-1.593.71-.117.377.218.769.889 1.553l.174.203c.19.223.285.334.328.472.043.138.029.287 0 .584l-.026.27c-.102 1.047-.152 1.57.154 1.803.306.233.767.02 1.688-.403l.239-.11c.261-.12.392-.181.531-.181s.27.06.531.18l.239.11c.92.425 1.382.637 1.688.404.306-.232.256-.756.154-1.802l-.026-.271c-.029-.297-.043-.446 0-.584.043-.138.138-.25.328-.472l.174-.203c.67-.784 1.006-1.176.889-1.553-.117-.376-.609-.488-1.593-.71l-.254-.058c-.28-.063-.42-.095-.532-.18-.112-.085-.184-.214-.328-.473l-.131-.235C12.632 7.454 12.379 7 12 7s-.632.454-1.139 1.363Z"
              clip-rule="evenodd"
            /></svg
          >
        </div>
        Sponsors
      </div>
    </div>
    {#if $searchQuery.length == 0}
      <div class="sponsor-cta-header">
        <p class="sponsor-cta-text">Play one of our sponsors!</p>
      </div>
    {/if}
    <div class="sponsor-grid p-2">
      {#each filteredSponsors as sponsor}
        <div class="sponsor-item">
          <a
            href={sponsor.url}
            target="_blank"
            class="sponsor-link"
            id={sponsor.id}
          >
            <div class="sponsor-card-content {sponsor.backgroundColor}">
              <img
                src={sponsor.logoLight}
                alt={sponsor.name}
                class="sponsor-logo-img sponsor-logo-light"
              />
              <img
                src={sponsor.logoDark}
                alt={sponsor.name}
                class="sponsor-logo-img sponsor-logo-dark"
              />
            </div>
          </a>
        </div>
      {/each}
    </div>

    {#if $searchQuery.length == 0}
      <div class="sponsor-footer">
        <a
          href="https://tally.so/r/wgEX5K"
          class="sponsor-inquiry-link"
          target="_blank">Want to sponsor? Message me!</a
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

  :global(.dark) #sponsor-nibble .sponsor-logo-img {
    filter: brightness(1.7) drop-shadow(0 0 4px rgba(255, 255, 255, 0.35));
  }
  .sponsor-cta-header {
    @apply px-2 py-2 bg-colorCardB border-b border-colorNeutralSoft;
  }

  .sponsor-cta-text {
    @apply text-sm text-center text-colorTextSofter italic;
  }

  .sponsor-grid {
    @apply grid grid-cols-1 gap-2;
  }

  .sponsor-footer {
    @apply px-1 py-1 bg-colorCardB border-t border-colorNeutralSoft text-center;
  }

  .sponsor-inquiry-link {
    @apply text-xs text-colorTextSofter hover:hover:text-colorLinkHover underline decoration-1 underline-offset-2 transition-colors;
  }

  .sponsor-item {
    @apply flex justify-center;
  }

  .sponsor-link {
    @apply block w-full no-underline;
  }

  .sponsor-card-content {
    @apply border border-colorNeutralSoft rounded hover:scale-105 transition-transform flex items-center justify-center h-12;
  }

  .sponsor-logo-img {
    @apply h-10 w-auto object-contain flex-shrink-0;
  }

  .sponsor-logo-light {
    @apply block;
  }

  .sponsor-logo-dark {
    @apply hidden;
  }

  :global(.dark) .sponsor-logo-light {
    @apply hidden;
  }

  :global(.dark) .sponsor-logo-dark {
    @apply block;
  }
</style>
