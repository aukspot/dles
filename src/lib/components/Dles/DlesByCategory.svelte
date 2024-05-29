<script>
  import { fly } from "svelte/transition"
  import { categories, categoryColors, filteredDles } from "$lib/stores"

  import DlePopUp from "./DlePopUp.svelte"
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

  import { clickOutside } from "$lib/js/clickOutside"

  let expandedDle = ""
  let layerX = 0
  let layerY = 0
  let clientY = 0

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

  let categorizedDles = {}
  for (let category of $categories) {
    categorizedDles[category] = $filteredDles.filter(
      (dle) => dle.category == category,
    )
  }

  $: {
    for (let category of $categories) {
      categorizedDles[category] = $filteredDles.filter(
        (dle) => dle.category == category,
      )
    }
  }

  function resetExpandedDle() {
    console.log(expandedDle)
    expandedDle = ""
  }

  function handleKeyUp(event) {
    if (event.key == "Escape") {
      resetExpandedDle()
    }
  }

  function handleClickOutside() {
    resetExpandedDle()
  }
</script>

<svelte:window on:resize={resetExpandedDle} />
<svelte:document on:keyup={(e) => handleKeyUp(e)} />
<div class="dlesContainer" in:fly={{ y: 500, duration: 200 }}>
  {#each $categories as category, i (i)}
    {#if categorizedDles[category].length != 0}
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
            {#each categorizedDles[category] as dle, j (j)}
              <li class="dleContainer">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="dleTop">
                  <span
                    class="dleName"
                    on:click={(e) => {
                      expandedDle === dle.name
                        ? (expandedDle = "")
                        : (expandedDle = dle.name)
                      layerX = e.layerX
                      layerY = e.layerY
                      clientY = e.clientY
                    }}
                  >
                    {dle.name}
                  </span>
                </div>
                {#if expandedDle === dle.name}
                  <div use:clickOutside on:click_outside={handleClickOutside}>
                    <DlePopUp {dle} {layerX} {layerY} {clientY} />
                  </div>
                {/if}
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
    @apply px-1 mt-1 gap-2 columns-2 md:columns-[12rem] max-[290px]:columns-1;
    /* columns: 12rem auto; */
  }
  .card {
    @apply mb-2 break-inside-avoid-column shadow-sm shadow-colorNeutralSoft;
  }
  a {
    @apply text-base text-colorText underline decoration-colorTextSoftest hover:text-colorLink;
    text-decoration-thickness: 2px;
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
    @apply inline-block text-base text-colorText underline decoration-colorTextSoftest cursor-pointer;
    text-decoration-thickness: 2px;
    width: auto;
  }
</style>
