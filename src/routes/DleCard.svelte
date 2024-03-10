<script>
  import DleTagGroup from "./DleTagGroup.svelte";
  export let i;
  export let dle;
</script>

<li
  class="flex flex-row justify-between w-full px-2 py-1 ring-1 ring-slate-400 shadow-md rounded-md dark:ring-slate-500"
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
    <div>
      {dle.description}
    </div>
    <div class="mt-2">
      <DleTagGroup tags={dle.tags}></DleTagGroup>
    </div>
  </div>
</li>

<!-- font-size: 1rem; padding: 0.4rem 0.8rem; background-color: var(--color-bg); color:
var(--color-text); border-radius: 0.3rem; border: 2px solid darkgray; -->

<style>
  /*
  li:nth-child(3n + 1) {
    background-color: var(--color-card-bg-2);
  }
  li:nth-child(3n + 2) {
    background-color: var(--color-card-bg-1);
  }
  li:nth-child(3n) {
    background-color: var(--color-card-bg-3);
  }
  .right {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
  .name {
    font-size: 1.1rem;
    vertical-align: text-top;
  }
  .description {
    font-size: 1rem;
    line-height: 1.2;
  }
  .play {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    background-color: var(--color-bg);
    color: var(--color-text);
    border-radius: 0.3rem;
    border: 2px solid darkgray;
  } */
</style>
