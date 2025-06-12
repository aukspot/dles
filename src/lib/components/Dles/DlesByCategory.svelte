<script>
  import {
    categories,
    categoryColors,
    categorizedDles,
    newDles,
    poppedUpDle,
  } from "$lib/stores"

  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"

  import { categoryIcons } from "$lib/js/categoryIcons"
  import { clickOutside } from "$lib/js/clickOutside"
  import { base } from "$app/paths"
  import Banner from "../Banner.svelte"
  import { openInNewTab } from "$lib/js/utilities"

  let pageX = 0
  let pageY = 0
  let clientY = 0

  function isNewDle(dle) {
    return $newDles.filter((d) => d.url === dle.url).length === 1
  }

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
          <div>
            <ol class="dleList">
              {#each $categorizedDles[category] as dle, j (j)}
                <li class="dleContainer">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <div class="dleTop">
                    <button
                      class="dleName"
                      on:click={(e) => {
                        $poppedUpDle === dle.name
                          ? ($poppedUpDle = "")
                          : ($poppedUpDle = dle.name)
                        pageX = e.pageX
                        pageY = e.pageY
                        clientY = e.clientY
                      }}
                      on:auxclick={(e) => openInNewTab(dle.url)}
                    >
                      {dle.name}
                    </button>{#if isNewDle(dle)}
                      <IconNew />
                    {/if}
                  </div>
                  {#if $poppedUpDle === dle.name}
                    <div use:clickOutside on:click_outside={handleClickOutside}>
                      <DlePopUp {dle} {pageX} {pageY} {clientY} />
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
    @apply mr-1 inline-block text-left text-base text-colorText underline decoration-colorTextSoftest cursor-pointer hover:text-colorTextSoft hover:decoration-colorTextSoft hover:transition-all hover:duration-300;
    text-decoration-thickness: 2px;
    width: auto;
  }
</style>
