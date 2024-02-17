<script>
  import DleTagGroup from "./DleTagGroup.svelte";
  export let i;
  export let dle;
</script>

<li>
  <div class="left">
    <div
      style="display: flex; align-items: flex-start; gap:0.25rem; vertical-align: text-top;"
    >
      <span class="not-selectable name">{i}. </span>
      <span class="name"><strong>{dle.name}</strong></span>
    </div>
    <div class="description">
      {dle.description}
    </div>
    <DleTagGroup tags={dle.tags}></DleTagGroup>
  </div>
  <div class="right">
    <a href={dle.url} target="_blank" rel="noreferrer"
      ><button class="play not-selectable">Play</button></a
    >
  </div>
</li>

<style>
  li {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: space-between;
    width: 22rem;
    padding: 0.5rem;
    border: 1px solid darkgray;
    border-radius: 4px;
  }
  li:nth-child(3n + 1) {
    background-color: var(--color-card-bg-2);
  }
  li:nth-child(3n + 2) {
    background-color: var(--color-card-bg-1);
  }
  li:nth-child(3n) {
    background-color: var(--color-card-bg-3);
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
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
    /* border: none; */
    border: 2px solid darkgray;
  }
</style>
