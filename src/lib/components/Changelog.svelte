<script>
  import { base } from "$app/paths"
  import changelog from "$lib/data/changelog.json"
</script>

<div class="flex justify-center">
  <details class="m-4 mt-1 p-1">
    <summary class="text-center text-lg cursor-pointer unselectable">
      Changelog
    </summary>
    <div class="flex flex-col text-xs sm:text-sm md:text-base gap-2 mt-2">
      <a href="{base}/changelog" class=" text-center">(view full changelog)</a>
      {#each changelog as entry}
        <div class="entry">
          <a
            class="time underline"
            href="https://dles.aukspot.com/changelog#{entry.date}"
          >
            <time datetime={entry.date}><strong>{entry.date}</strong>:</time>
          </a>

          <section>{@html entry.description}</section>
        </div>
      {/each}
    </div>
  </details>
</div>

<style lang="postcss">
  .entry {
    @apply mt-2 flex flex-nowrap gap-2;
  }
  .time {
    @apply font-mono flex-shrink-0;
  }
</style>
