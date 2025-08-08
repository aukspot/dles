<script>
  import { poppedUpDle, newDles } from "$lib/stores"
  import { openInNewTab } from "$lib/js/utilities"
  import DlePopUp from "./DlePopUp.svelte"
  import IconNew from "../Icons/IconNew.svelte"

  export let pageX
  export let pageY
  export let clientY
  export let dleGroup

  function isNewDle(dle) {
    return $newDles.filter((d) => d.url === dle.url).length === 1
  }

  function handleClickOutside(event) {
    const originalEvent = event.detail?.originalEvent
    const target = originalEvent?.target
    
    // Don't close if clicking inside the popup
    if (target && target.closest('.dlePopUp')) {
      return
    }
    
    $poppedUpDle = ""
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
          <DlePopUp {dle} {pageX} {pageY} {clientY} {handleClickOutside} />
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
