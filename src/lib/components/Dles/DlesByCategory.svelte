<script>
  import {
    categories,
    categoryColors,
    categorizedDles,
    newDles,
    poppedUpDle,
    dlesOfTheWeek,
    favorites,
  } from "$lib/stores"

  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"

  import { categoryIcons } from "$lib/js/categoryIcons"
  import { base } from "$app/paths"
  import Banner from "../Banner.svelte"
  import { openInNewTab } from "$lib/js/utilities"
  import IconCalendarHeart from "../Icons/IconCalendarHeart.svelte"
  import DleGroup from "./DleGroup.svelte"

  let pageX = 0
  let pageY = 0
  let clientY = 0

  function resetPoppedUpDle() {
    $poppedUpDle = ""
  }

  function handleKeyUp(event) {
    if (event.key == "Escape") {
      resetPoppedUpDle()
    }
  }
</script>

<svelte:window on:resize={resetPoppedUpDle} />
<svelte:document on:keyup={(e) => handleKeyUp(e)} />
<Banner includeSearch={true} />
<div class="w-full mx-auto">
  <div class="dlesContainer">
    {#if $dlesOfTheWeek.length !== 0}
      <div class="card">
        <div class="labelContainer rainbow-gradient">
          <div class="label">
            <div class="flex-shrink-0">
              <IconCalendarHeart />
            </div>
            DLES of the Week
          </div>
        </div>
        <DleGroup
          dleGroup={$dlesOfTheWeek}
          bind:pageX
          bind:pageY
          bind:clientY
        />
      </div>
    {/if}

    <!-- Sponsors Section -->
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
      <div class="sponsor-cta-header">
        <p class="sponsor-cta-text">Play one of our sponsors!</p>
      </div>
      <div class="sponsor-grid p-2">
        <!-- Nibble Games Sponsor -->
        <div class="sponsor-item">
          <a href="https://nibble.games" target="_blank" class="sponsor-link">
            <div class="sponsor-card-content">
              <img
                src="/nibble.games_cropped.png"
                alt="nibble.games"
                class="sponsor-logo-img"
              />
              <div class="sponsor-text">
                <h4 class="sponsor-title-text">nibble.games</h4>
                <p class="sponsor-subtitle-text">Daily puzzle games</p>
              </div>
            </div>
          </a>
        </div>

        <!-- Placeholder sponsor content -->
        <!-- <div class="sponsor-item">
          <div class="sponsor-placeholder">
            <span class="text-sm text-colorTextSecondary">Sponsor Slot 2</span>
          </div>
        </div> -->
      </div>

      <div class="sponsor-footer">
        <a href="#" class="sponsor-inquiry-link">Want to sponsor? Contact us!</a
        >
      </div>
    </div>

    {#each $categories as category, i (i)}
      {@const categoryDles = $categorizedDles[category] || []}
      {#if categoryDles.length !== 0}
        <div class="card">
          <div
            class="labelContainer"
            style="background-color: {$categoryColors[category]}"
          >
            <div class="label">
              <div class="flex-shrink-0">
                <svelte:component this={categoryIcons[category]} />
              </div>
              {category}
            </div>
          </div>
          <DleGroup
            dleGroup={categoryDles}
            bind:pageX
            bind:pageY
            bind:clientY
          />
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="postcss">
  .dlesContainer {
    @apply pb-3 px-1 mt-1 mb-2 gap-2 columns-2 md:columns-[12rem] max-[290px]:columns-1;
  }
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }
  .labelContainer {
    @apply py-2 px-2 bg-colorCardB border-b-2 border-colorText;
  }
  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-base md:text-lg text-colorText font-semibold;
  }
  .rainbow-gradient {
    background: repeating-linear-gradient(
      60deg,
      hsl(0, 90%, 70%, 0.8) 0% 20%,
      /* Red */ hsl(72, 90%, 70%, 0.8) 20% 40%,
      /* Yellow */ hsl(144, 90%, 70%, 0.8) 40% 60%,
      /* Green */ hsl(216, 90%, 70%, 0.8) 60% 80%,
      /* Blue */ hsl(288, 90%, 70%, 0.8) 80% 100% /* Purple */
    );
  }
  :global(.dark) .rainbow-gradient {
    background: repeating-linear-gradient(
      60deg,
      hsl(0, 90%, 30%, 0.9) 0% 20%,
      /* Dark Red */ hsl(72, 90%, 30%, 0.9) 20% 40%,
      /* Dark Yellow */ hsl(144, 90%, 30%, 0.9) 40% 60%,
      /* Dark Green */ hsl(216, 90%, 30%, 0.9) 60% 80%,
      /* Dark Blue */ hsl(288, 90%, 30%, 0.9) 80% 100% /* Dark Purple */
    );
  }

  .sponsor-cta-header {
    @apply px-4 py-2 bg-colorCardB border-b border-colorNeutralSoft;
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
    @apply text-xs text-colorTextSofter hover:text-colorTextSoft underline decoration-1 underline-offset-2 transition-colors;
  }

  .sponsor-item {
    @apply flex justify-center;
  }

  .sponsor-placeholder {
    @apply w-full h-14 bg-colorCardA border border-colorNeutralSoft rounded flex items-center justify-center hover:bg-colorCardB transition-colors text-center;
  }

  .sponsor-link {
    @apply block w-full no-underline;
  }

  .sponsor-card-content {
    @apply bg-gray-100 dark:bg-gray-100 border border-colorNeutralSoft rounded  hover:bg-white transition-colors flex items-center space-x-3 h-12;
  }

  .sponsor-logo-img {
    @apply h-10 w-auto object-contain flex-shrink-0;
  }

  .sponsor-text {
    @apply flex-1 min-w-0;
  }

  .sponsor-title-text {
    @apply text-sm font-semibold text-colorText truncate;
  }

  .sponsor-subtitle-text {
    @apply text-xs text-colorTextSofter truncate;
  }
</style>
