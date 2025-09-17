<script>
  import { poppedUpDle, newDles } from "$lib/stores"
  import { openInNewTab } from "$lib/js/utilities"
  import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"
  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"

  export let pageX
  export let pageY
  export let clientY
  export let dleGroup
  export let section = 'regular'
  // export let showThemes = false
  // export let category = ""

  function isNewDle(dle) {
    return $newDles.filter((d) => d.url === dle.url).length === 1
  }

  // function groupDlesByTheme(dles) {
  //   const grouped = {}
  //   
  //   // Special handling for Video Games - group all themed games together
  //   if (category === "Video Games") {
  //     for (const dle of dles) {
  //       const theme = dle.theme ? "Themed" : "General"
  //       if (!grouped[theme]) {
  //         grouped[theme] = []
  //       }
  //       grouped[theme].push(dle)
  //     }
  //   } else {
  //     // Normal grouping by individual themes for other categories
  //     for (const dle of dles) {
  //       const theme = dle.theme || "General"
  //       if (!grouped[theme]) {
  //         grouped[theme] = []
  //       }
  //       grouped[theme].push(dle)
  //     }
  //   }

  //   // Sort themes with "General" first, then alphabetically
  //   const sortedThemes = Object.keys(grouped).sort((a, b) => {
  //     if (a === "General") return -1
  //     if (b === "General") return 1
  //     return a.localeCompare(b)
  //   })

  //   const result = {}
  //   for (const theme of sortedThemes) {
  //     result[theme] = grouped[theme]
  //   }

  //   return result
  // }

  // $: groupedDles = showThemes ? groupDlesByTheme(dleGroup) : { "": dleGroup }

  function handleClickOutside(event) {
    const originalEvent = event.detail?.originalEvent
    const target = originalEvent?.target

    // Don't close if clicking inside the popup
    if (target && target.closest(".dlePopUp")) {
      return
    }

    $poppedUpDle = ""
  }

  function handleAuxClick(dle, position) {
    handleGameClick(dle, position, 'middle-click');
  }

  function handleCtrlClick(dle, position) {
    handleGameClick(dle, position, 'ctrl-click');
  }

  function handleGameClick(dle, position, clickType) {
    const trackingData = createTrackingData(dle, clickType, 'list', section, position);
    trackEvent('game-click', trackingData, `DleGroup ${clickType}`);
    openInNewTab(dle.url, trackingData);
  }
</script>

<div>
  <ol class="dleList">
    {#each dleGroup as dle, j (j)}
      <li class="dleContainer">
        <div class="dleTop">
          <button
            class="dleName"
            on:click={(e) => {
              // If Ctrl/Cmd is held, navigate directly to the game
              if (e.ctrlKey || e.metaKey) {
                handleCtrlClick(dle, j);
                return;
              }

              // Otherwise, show/hide popup
              // Use section + name to make popup unique per section
              const popupKey = `${section}-${dle.name}`
              $poppedUpDle === popupKey
                ? ($poppedUpDle = "")
                : ($poppedUpDle = popupKey)
              pageX = e.pageX
              pageY = e.pageY
              clientY = e.clientY
            }}
            on:auxclick={(e) => handleAuxClick(dle, j)}
          >
            {dle.name}
          </button>{#if isNewDle(dle)}
            <IconNew />
          {/if}
        </div>
        {#if $poppedUpDle === `${section}-${dle.name}`}
          <DlePopUp {dle} {pageX} {pageY} {clientY} {handleClickOutside} {section} position={j} />
        {/if}
      </li>
    {/each}
  </ol>
</div>

<style lang="postcss">
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
