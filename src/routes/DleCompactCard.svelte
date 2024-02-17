<script>
  export let i;
  export let dle;
</script>

<li>
  <div class="left">
    <div
      style="display: flex; align-items: flex-start; gap:0.25rem; vertical-align: text-top;"
    >
      <span class="not-selectable name">{i}. </span>
      <span class="name"
        ><strong
          ><a href={dle.url} target="_blank" rel="noreferrer">{dle.name}</a
          ></strong
        ></span
      >
    </div>
  </div>
</li>

<style>
  li {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: space-between;
    width: 15rem;
    padding: 0.25rem;
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
  a {
    text-decoration: none;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .name {
    font-size: 1.1rem;
    vertical-align: text-top;
  }
  @media (max-width: 600px) {
    li {
      width: 18rem;
    }
    .name {
      /* font-size: 1rem; */
    }
  }
  /* @media (max-width: 400px) {
    li {
      width: 8rem;
    }
    .name {
      font-size: 0.9rem;
    }
  } */
</style>
