<script>
  import { categories, categoryColors, categorizedDles } from "$lib/stores"
  import { themesByCategory } from "$lib/js/themes"
  import { base } from "$app/paths"

  import SectionHeader from "../SectionHeader.svelte"

  import { categoryIcons } from "$lib/js/categoryIcons"
</script>

<div class="gridContainer dle-columns">
  {#each $categories as category, i (i)}
    <div class="card">
      <SectionHeader
        title={category}
        icon={categoryIcons[category]}
        color={$categoryColors[category]}
      />
      {#if themesByCategory[category]}
        <a
          class="browse-themes"
          href="{base}/category/{category.toLowerCase()}"
        >
          Browse subcategories &rarr;
        </a>
      {/if}
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
  }

  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
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
  .browse-themes {
    @apply block px-2 py-1 text-xs font-medium text-colorTextSoft bg-colorCardC text-center hover:text-colorText;
  }
</style>
