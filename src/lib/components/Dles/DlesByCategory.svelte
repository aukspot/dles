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
  import { clickOutside } from "$lib/js/clickOutside"
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

  function handleClickOutside() {
    resetPoppedUpDle()
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
    {#each $categories as category, i (i)}
      {#if $categorizedDles[category].length !== 0}
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
            dleGroup={$categorizedDles[category]}
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
</style>
