<script>
  import { poppedUpDle } from "$lib/stores"
  import IconClose from "../Icons/IconClose.svelte"
  import DleFavorite from "../Buttons/FavoriteButton.svelte"
  export let dle, pageX, pageY, clientY

  let width = 310
  let height =
    30 +
    2 * 8 +
    2 * 12 +
    Math.floor(Math.ceil(28 * dle.name.length) / 10) +
    Math.floor(Math.ceil(24 * dle.description.length) / 26) +
    Math.floor(Math.ceil(24 * dle.url.length) / 26)
  if (pageX < width / 2) {
    pageX = width / 2 + 5
  }
  if (pageX + width / 2 > document.documentElement.clientWidth) {
    pageX = document.documentElement.clientWidth - width / 2 - 5
  }
  if (clientY < height) {
    pageY += height - clientY
  }

  function closePopup() {
    $poppedUpDle = ""
  }
</script>

<div class="dlePopUp bevel" style="left: {pageX}px; top: {pageY}px; width: {width}px">
  <div class="flex justify-around items-start gap-2">
    <DleFavorite {dle} />

    <div class="text-center text-xl font-bold">
      {dle.name}
    </div>
    <button on:click={closePopup}>
      <IconClose />
    </button>
  </div>

  <div class="text-center text-base text-colorTextSoft">
    {dle.description}
  </div>

  <a href={dle.url} target="_blank">
    {dle.url}
  </a>
</div>

<style lang="postcss">
  .dlePopUp {
    @apply absolute p-3 flex flex-col gap-2 bg-colorCardC rounded-lg shadow-sm shadow-colorTextSoftest;
    transform: translate(-50%, -99%);
  }

  a {
    @apply text-center text-base underline break-words;
  }
</style>
