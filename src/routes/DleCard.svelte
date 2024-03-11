<script>
  import DleTagGroup from "./DleTagGroup.svelte"
  export let i
  export let dle
</script>

<li
  class="flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-neutral-500 shadow-md rounded-md"
>
  <div class="flex flex-col flex-wrap justify-between w-full">
    <div class="flex justify-between items-baseline align-top">
      <div class="flex items-baseline align-top gap-1">
        <span class="not-selectable">{i}. </span>
        <span class="text-lg font-semibold">{dle.name}</span>
      </div>
      <div class="flex items-center p-2">
        <a href={dle.url} target="_blank" rel="noreferrer"
          ><button class="btn not-selectable">Play</button></a
        >
      </div>
    </div>
    <div class="text-sm">
      {dle.description}
    </div>
    <div class="mt-2">
      <DleTagGroup tags={dle.tags}></DleTagGroup>
    </div>
  </div>
</li>

<style>
  li:nth-child(3n + 1) {
    background-color: var(--color-card-bg-2);
  }
  li:nth-child(3n + 2) {
    background-color: var(--color-card-bg-1);
  }
  li:nth-child(3n) {
    background-color: var(--color-card-bg-3);
  }
</style>
