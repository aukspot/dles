<script>
  import changelog from "$lib/data/changelog.json"
</script>

<div class="flex justify-center">
  <details class="m-4 p-1">
    <summary class="text-center text-lg cursor-pointer unselectable">
      Changelog
    </summary>
    <div class="flex flex-col text-xs sm:text-sm md:text-base gap-2 mt-2">
      {#each changelog as entry}
        <div class="entry">
          <time datetime={entry.date}><strong>{entry.date}</strong>:</time>
          <section>{@html entry.description}</section>
        </div>
      {/each}
    </div>
  </details>
</div>

<style lang="postcss">
  .entry {
    @apply mt-2 flex gap-2;
    time {
      @apply font-mono;
    }
  }
</style>
