<script>
  import { categories, categorizedDles } from "$lib/stores"

  import Banner from "../Banner.svelte"

  import IconCardBoardGames from "$lib/components/Icons/IconCardBoardGames.svelte"
  import IconColors from "$lib/components/Icons/IconColors.svelte"
  import IconEstimation from "$lib/components/Icons/IconEstimation.svelte"
  import IconFood from "$lib/components/Icons/IconFood.svelte"
  import IconGeography from "$lib/components/Icons/IconGeography.svelte"
  import IconHistory from "$lib/components/Icons/IconHistory.svelte"
  import IconMath from "$lib/components/Icons/IconMath.svelte"
  import IconMovies from "$lib/components/Icons/IconMovies.svelte"
  import IconMusic from "$lib/components/Icons/IconMusic.svelte"
  import IconScienceNature from "$lib/components/Icons/IconScienceNature.svelte"
  import IconShapesPatterns from "$lib/components/Icons/IconShapesPatterns.svelte"
  import IconSports from "$lib/components/Icons/IconSports.svelte"
  import IconTrivia from "$lib/components/Icons/IconTrivia.svelte"
  import IconVehicles from "$lib/components/Icons/IconVehicles.svelte"
  import IconVideoGames from "$lib/components/Icons/IconVideoGames.svelte"
  import IconWords from "$lib/components/Icons/IconWords.svelte"
  import IconMiscellaneous from "$lib/components/Icons/IconMiscellaneous.svelte"

  let categoryColors = {
    "Card/Board Games": "hsl(0, 90%, 50%, 45%)",
    Colors: "hsl(24, 90%, 50%, 45%)",
    Estimation: "hsl(48, 90%, 50%, 45%)",
    Food: "hsl(72, 90%, 50%, 45%)",
    Geography: "hsl(96, 90%, 50%, 45%)",
    History: "hsl(108, 90%, 50%, 45%)",
    "Math/Logic": "hsl(120, 90%, 50%, 45%)",
    "Movies/TV": "hsl(144, 90%, 50%, 45%)",
    Music: "hsl(168, 90%, 50%, 45%)",
    "Science/Nature": "hsl(192, 90%, 50%, 45%)",
    "Shapes/Patterns": "hsl(216, 90%, 50%, 45%)",
    Sponsors: "hsl(226, 90%, 50%, 45%)",
    Sports: "hsl(240, 90%, 50%, 45%)",
    Trivia: "hsl(264, 90%, 50%, 45%)",
    Vehicles: "hsl(288, 90%, 50%, 45%)",
    "Video Games": "hsl(312, 90%, 50%, 45%)",
    Words: "hsl(336, 90%, 50%, 45%)",
    Miscellaneous: "hsl(0, 0%, 49%, 45%)",
  }

  const categoryIcons = {
    "Card/Board Games": IconCardBoardGames,
    Colors: IconColors,
    Estimation: IconEstimation,
    Food: IconFood,
    Geography: IconGeography,
    History: IconHistory,
    "Math/Logic": IconMath,
    "Movies/TV": IconMovies,
    Music: IconMusic,
    "Science/Nature": IconScienceNature,
    "Shapes/Patterns": IconShapesPatterns,
    Sports: IconSports,
    Trivia: IconTrivia,
    Vehicles: IconVehicles,
    "Video Games": IconVideoGames,
    Words: IconWords,
    Miscellaneous: IconMiscellaneous,
  }
</script>

<div class="gridContainer">
  {#each $categories as category, i (i)}
    <div class="card">
      <div
        class="labelContainer"
        style="background-color: {categoryColors[category]}"
      >
        <div class="label">
          <div class="flex-shrink-0">
            <svelte:component this={categoryIcons[category]} />
          </div>
          {category}
        </div>
      </div>
      <div>
        <ol class="dleList">
          {#each $categorizedDles[category] as dle, j (j)}
            <li class="dleContainer">
              <div class="dleTop">
                <a class="dleName" href={dle.url} target="_blank">
                  {dle.name}
                </a>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  .gridContainer {
    @apply pb-3 mt-1 mb-2;
    columns: 2;
    column-gap: 0.5rem;
    width: 100%;
    max-width: 100%;
  }

  /* Responsive column count */
  @media (min-width: 570px) {
    .gridContainer {
      columns: 3;
    }
  }

  @media (min-width: 768px) {
    .gridContainer {
      columns: 4;
    }
  }

  @media (min-width: 1200px) {
    .gridContainer {
      column-count: 5;
    }
  }

  @media (max-width: 374px) {
    .gridContainer {
      columns: 1;
    }
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
  .dleContainer {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }
  .dleTop {
    @apply p-1 px-2;
  }
  .dleName {
    @apply inline-block text-left text-base text-colorText underline decoration-colorTextSoftest cursor-pointer hover:text-colorLink;
    text-decoration-thickness: 2px;
    width: auto;
  }
  .dleList {
    @apply list-none p-0 m-0;
  }
</style>
