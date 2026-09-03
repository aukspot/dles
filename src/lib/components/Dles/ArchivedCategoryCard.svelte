<script>
  import SectionHeader from "../SectionHeader.svelte"
  import { categoryIcons } from "$lib/js/categoryIcons"
  import { categoryColors } from "$lib/stores"
  import { ARCHIVE_PUZZLES } from "$lib/js/archivePuzzles"

  export let category
  export let dles = []
  // Opens the puzzle picker for a dle that has one; the page owns that modal.
  export let onPick = () => {}
</script>

<div class="card">
  <SectionHeader
    title={category}
    icon={categoryIcons[category]}
    color={$categoryColors[category]}
  />
  <ul class="dle-list">
    {#each dles as dle (dle.id)}
      {@const linkUrl = dle.archive_url ?? dle.url}
      {@const picker = ARCHIVE_PUZZLES[dle.id]}
      <li class="dle-item">
        <span class="dle-name">{dle.name}</span>

        {#if dle.description}
          <p class="dle-description">{dle.description}</p>
        {/if}

        {#if picker}
          {@const puzzleCount = picker.sets
            ? picker.sets.reduce((n, set) => n + set.puzzles.length, 0)
            : picker.puzzles.length}
          <button class="action" on:click={() => onPick(dle)}>
            Browse {puzzleCount} puzzles
          </button>
        {:else}
          <a class="action" href={linkUrl} target="_blank" rel="noopener noreferrer">
            Play the archive
          </a>
        {/if}

        {#if dle.notes && !picker}
          <p class="dle-notes">{dle.notes}</p>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .card {
    @apply mb-2 shadow-sm shadow-colorNeutralSoft;
    display: inline-block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    break-inside: avoid;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .dle-list {
    @apply flex flex-col;
  }

  .dle-item {
    @apply flex flex-col gap-1 px-2.5 py-2
           [&:nth-child(odd)]:bg-colorCardA [&:nth-child(even)]:bg-colorCardB;
  }

  .dle-name {
    @apply text-colorText text-sm font-bold md:text-base;
  }

  .dle-description {
    @apply text-colorTextSoft text-xs leading-snug md:text-sm;
  }

  /* One shape for both actions so entries read consistently, whether the
     target is a picker or a plain link. */
  .action {
    @apply text-colorText bg-colorCardC border-colorTextSofter mt-1 cursor-pointer
           self-start border px-2 py-1 text-xs font-semibold no-underline
           transition-colors hover:bg-colorBackground hover:text-colorText;
  }

  .dle-notes {
    @apply text-colorTextSofter mt-0.5 text-xs leading-snug;
  }
</style>
