<script>
  export let dle, layerX, layerY, clientY

  let width = 300
  if (layerX < width / 2) {
    layerX = width / 2 + 10
  }
  if (layerX + width / 2 > document.documentElement.clientWidth) {
    layerX = document.documentElement.clientWidth - width / 2 - 10
  }
  if (clientY < 250) {
    layerY += 250 - clientY
  }
  $: console.log(layerX, layerY, clientY, document.documentElement.clientWidth)
</script>

<div
  class="dlePopUp"
  style="left: {layerX}px; top: {layerY}px; width: {width}px"
>
  <div class="text-center text-lg md:text-xl font-bold">
    {dle.name}
  </div>
  <div class="text-center text-sm md:text-base text-colorTextSoft">
    {dle.description}
  </div>
  <a class="flex justify-center" href={dle.url} target="_blank" rel="noopener"
    ><button class="btn"
      >Play! <span class="text-sm">(opens in new tab)</span></button
    >
  </a>
</div>

<style lang="postcss">
  .dlePopUp {
    @apply absolute p-3 flex flex-col gap-2 bg-colorCardC  rounded-lg shadow-xl shadow-colorTextSoftest;
    transform: translate(-50%, -99%);
  }
</style>
