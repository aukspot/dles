<script>
  import { categories, categoryColors, filteredDles } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"

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
</script>

<div class="dlesContainer">
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
              <li class="dleCard">
                <div class="dleLeft">
                  <div>
                    <span class="unselectable dleNumber">{j + 1}.</span>
                    <span class="text-lg">{dle.name}</span>
                  </div>
                  <div class="dleDescription">{dle.description}</div>
                  <a href={dle.url} target="_blank">{dle.url}</a>
                </div>
                <div class="flex justify-center align-middle">
                  <div class="flex flex-1">
                    <FavoriteButton {dle} />
                  </div>
                </div>
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
    @apply px-1 mt-4 gap-4 columns-1 md:columns-[20rem];
  }
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }
  a {
    @apply block pl-2 text-sm md:text-base text-colorText underline decoration-colorTextSoftest hover:text-colorLink;
    text-decoration-thickness: 2px;
  }
  .labelContainer {
    @apply py-2 px-2 bg-colorCardB border-b-2 border-colorText;
  }
  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-base md:text-lg text-colorText font-semibold;
  }
  .dleCard {
    @apply p-2 pr-3 pb-3 flex justify-between gap-3 [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }

  .dleLeft {
    @apply p-1 px-2 flex flex-col justify-between gap-1 items-start align-top;
  }
  .dleDescription {
    @apply p-1 pl-2 text-sm md:text-base text-colorTextSoft;
  }
</style>
