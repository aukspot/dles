<script>
  import { poppedUpDle } from "$lib/stores"
  import IconClose from "../Icons/IconClose.svelte"
  import DleFavorite from "../Buttons/FavoriteButton.svelte"
  export let dle, pageX, pageY, clientY

  let width = 310
  if (pageX < width / 2) {
    pageX = width / 2 + 5
  }
  if (pageX + width / 2 > document.documentElement.clientWidth) {
    pageX = document.documentElement.clientWidth - width / 2 - 5
  }
  if (clientY < 220) {
    pageY += 220 - clientY
  }

  function closePopup() {
    $poppedUpDle = ""
  }
</script>

<div class="dlePopUp" style="left: {pageX}px; top: {pageY}px; width: {width}px">
  <div class="flex justify-around items-start gap-2">
    <button on:click={closePopup}>
      <IconClose />
    </button>
    <div class="text-center text-xl font-bold">
      {dle.name}
    </div>
    <DleFavorite {dle} />
  </div>

  <div class="text-center text-base text-colorTextSoft">
    {dle.description}
  </div>
  <!-- <a class="flex justify-center" href={dle.url} target="_blank" rel="noopener"
    ><button class="btn"
      >Play! <span class="text-sm">(opens in new tab)</span></button
    >
  </a> -->
  <a class="text-center text-base underline" href={dle.url} target="_blank">
    {dle.url}
  </a>
</div>

<style lang="postcss">
  .dlePopUp {
    @apply absolute p-3 flex flex-col gap-2 bg-colorCardC rounded-2xl border-2 border-colorTextSoftest shadow-md shadow-colorTextSoftest;
    transform: translate(-50%, -99%);
  }
</style>
