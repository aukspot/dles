<script>
  import { categories, categoryColors, filteredDles } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"

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
              <li class="dleName">
                <!-- <span class="unselectable dleNumber"></span> -->
                <div class="dleTop">
                  <a href={dle.url} target="_blank" rel="noopener">{dle.name}</a
                  >
                  <!-- <div class="expandDescription">&#8801;</div> -->
                </div>
                <!-- <div class="dleDescription">{dle.description}</div> -->
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
    @apply px-1 mt-4 gap-2 columns-2 lg:columns-4 max-[290px]:columns-1;
  }
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
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
  .dleName {
    @apply [&:nth-child(odd)]:bg-colorCardB [&:nth-child(even)]:bg-colorCardA;
  }
  .dleTop {
    @apply p-1 px-2 flex justify-between items-baseline align-top gap-1;
  }
  .dleDescription {
    @apply p-1 text-xs md:text-sm hidden;
  }
</style>
