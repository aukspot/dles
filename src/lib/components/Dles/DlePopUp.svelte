<script>
  export let dle, pageX, pageY, clientY

  let width = 300
  if (pageX < width / 2) {
    pageX = width / 2 + 10
  }
  if (pageX + width / 2 > document.documentElement.clientWidth) {
    pageX = document.documentElement.clientWidth - width / 2 - 10
  }
  if (clientY < 250) {
    pageY += 250 - clientY
  }
  // $: console.log(
  //   pageX,
  //   pageY,
  //   clientY,
  //   document.documentElement.clientWidth,
  //   window.devicePixelRatio,
  // )
</script>

<div class="dlePopUp" style="left: {pageX}px; top: {pageY}px; width: {width}px">
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
    @apply absolute p-3 flex flex-col gap-2 bg-colorCardC rounded-lg border-2 border-colorTextSoftest shadow-md shadow-colorTextSoftest;
    transform: translate(-50%, -99%);
  }
</style>
