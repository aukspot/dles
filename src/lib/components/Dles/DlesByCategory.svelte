<script>
  import { filteredDles } from "$lib/stores"
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

  const categories = [
    "Geography/History",
    "Math/Logic",
    "Movies",
    "Music",
    "Prices",
    "Sports",
    "Trivia",
    "Video Games",
    "Words",
    "Miscellaneous",
  ]

  const categoryColors = {
    "Geography/History": "hsl(0, 90%, 50%, 45%)",
    "Math/Logic": "hsl(20, 90%, 50%, 45%)",
    Movies: "hsl(40, 90%, 50%, 45%)",
    Music: "hsl(60, 90%, 50%, 45%)",
    Prices: "hsl(100, 90%, 50%, 45%)",
    Sports: "hsl(150, 90%, 50%, 45%)",
    Trivia: "hsl(200, 90%, 50%, 45%)",
    "Video Games": "hsl(300, 90%, 50%, 45%)",
    Words: "hsl(340, 90%, 50%, 45%)",
    Miscellaneous: "hsl(0, 0%, 49%, 45%)",
  }

  const categoryIcons = {
    "Geography/History": IconGeography,
    "Math/Logic": IconMath,
    Movies: IconMovies,
    Music: IconMusic,
    Prices: IconPrices,
    Sports: IconSports,
    Trivia: IconTrivia,
    "Video Games": IconVideoGames,
    Words: IconWords,
    Miscellaneous: IconMiscellaneous,
  }

  let categorizedDles = {}
  for (let category of categories) {
    categorizedDles[category] = $filteredDles.filter(
      (dle) => dle.category == category,
    )
  }

  $: {
    for (let category of categories) {
      categorizedDles[category] = $filteredDles.filter(
        (dle) => dle.category == category,
      )
    }
  }
</script>

<div class="dlesContainer">
  {#each categories as category, i (i)}
    {#if categorizedDles[category].length != 0}
      <div class="card">
        <div class="label" style="background-color: {categoryColors[category]}">
          <svelte:component this={categoryIcons[category]} />
          {category}
        </div>
        <div>
          <ol class="dleList">
            {#each categorizedDles[category] as dle, j (j)}
              <li class="dleName">
                <span class="unselectable dleNumber">{j + 1}. </span>
                <a href={dle.url} target="_blank" rel="noopener">{dle.name}</a>
              </li>
            {/each}
          </ol>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style lang="postcss">
  .dlesContainer {
    @apply px-1 mt-4 columns-2 lg:columns-4 max-[290px]:columns-1;
  }
  .card {
    @apply mb-4 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }
  a {
    @apply text-base text-colorText underline underline-offset-4 hover:text-colorLink;
  }
  .label {
    @apply py-2 px-2 flex justify-center gap-1 text-lg text-slate-800 dark:text-slate-100 font-semibold bg-colorCardB border-b-2 border-slate-800;
  }
  .dleNumber {
    @apply text-colorTextSoft;
  }
  .dleName {
    @apply p-1 flex items-baseline align-top gap-1 [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }
</style>
