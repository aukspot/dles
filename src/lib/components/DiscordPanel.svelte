<script>
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import IconDiscord from "./Icons/IconDiscord.svelte"

  export let open = false
</script>

<PanelWrapper {open}>
  <PanelTitle color="teal" title="DISCORD" />

  <div class="discord-content">
    <div class="discord-icon-wrapper">
      <IconDiscord />
    </div>

    <p class="discord-description">
      Chat with other enjoyers of DLES in the brand new Discord server!
    </p>

    <div class="discord-button-wrapper">
      <a
        href="https://discord.gg/UQzeTqG3Mx"
        target="_blank"
        rel="noopener noreferrer"
        class="discord-join-btn"
      >
        Join the Discord!
      </a>
    </div>

    <p class="discord-footer">
      <strong>Also</strong>: test out potential dles, share feedback directly
      with me, and more!
    </p>
  </div>
</PanelWrapper>

<style lang="postcss">
  .discord-content {
    @apply p-4 flex flex-col items-center gap-4 text-center;
  }

  .discord-icon-wrapper {
    @apply w-16 h-16 flex items-center justify-center text-teal-600 dark:text-teal-400;
  }

  .discord-icon-wrapper :global(svg) {
    @apply w-full h-full;
  }

  .discord-description {
    @apply text-sm md:text-base text-colorText leading-relaxed max-w-md;
  }

  .discord-button-wrapper {
    @apply my-2;
  }

  .discord-join-btn {
    @apply inline-flex items-center gap-2 px-6 py-3 bg-teal-500 dark:bg-teal-600
           text-white font-semibold text-sm md:text-base  tracking-wide
           hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors cursor-pointer
           border-2 border-teal-600 dark:border-teal-700;
  }

  .discord-footer {
    @apply text-xs text-colorTextSoft my-2 max-w-96;
  }
</style>
