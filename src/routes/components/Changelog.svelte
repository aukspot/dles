<script>
  import changelog from "$lib/data/changelog.json"
</script>

<div id="changelogContainer">
  <details id="changelog" style="padding: 0.25rem">
    <summary
      class="unselectable pointer"
      style="margin-bottom: 0.75rem; text-align: center; cursor: pointer; font-size: 1.2rem;"
    >
      Changelog
    </summary>
    <div id="entries">
      {#each changelog as entry}
        <div class="entry">
          <time datetime={entry.date}><strong>{entry.date}</strong>:</time>
          <section>{@html entry.description}</section>
        </div>
      {/each}
    </div>
  </details>
</div>

<style>
  #changelogContainer {
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
  }
  details {
    margin: 1rem;
  }
  #entries {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .entry {
    display: flex;
    gap: 0.5rem;
  }
</style>
