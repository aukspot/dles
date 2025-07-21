<script>
  import { categories, categorizedDles, categoryColors } from "$lib/stores"
  import Banner from "../Banner.svelte"

  import IconGeography from "../Icons/IconGeography.svelte"
  import IconMath from "../Icons/IconMath.svelte"
  import IconMiscellaneous from "../Icons/IconMiscellaneous.svelte"
  import IconMovies from "../Icons/IconMovies.svelte"
  import IconMusic from "../Icons/IconMusic.svelte"
  import IconPrices from "../Icons/IconPrices.svelte"
  import IconSports from "../Icons/IconSports.svelte"
  import IconTrivia from "../Icons/IconTrivia.svelte"
  import IconVideoGames from "../Icons/IconVideoGames.svelte"
  import IconWords from "../Icons/IconWords.svelte"

  const categoryIcons = {
    "Geography/History": IconGeography,
    "Math/Logic": IconMath,
    "Movies/TV": IconMovies,
    Music: IconMusic,
    Prices: IconPrices,
    Sports: IconSports,
    Trivia: IconTrivia,
    "Video Games": IconVideoGames,
    Words: IconWords,
    Miscellaneous: IconMiscellaneous,
  }
</script>

<Banner />
<div class="dlesContainer">
  {#each $categories as category, i (i)}
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
</style>
