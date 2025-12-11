<script>
  import IconGitHub from "./Icons/IconGitHub.svelte"
  import IconKofi from "./Icons/IconKofi.svelte"
  import IconBug from "./Icons/IconBug.svelte"
  import IconSuggest from "./Icons/IconSuggest.svelte"
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import IconFeedback from "./Icons/IconFeedback.svelte"

  export let open = false
</script>

<PanelWrapper {open}>
  <PanelTitle color="green" title="HOW TO HELP" />
  <div class="link-grid">
    <a
      class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
      href="https://tally.so/r/mOKOea"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconSuggest />
      <span>Suggest a Game</span>
    </a>
    <a
      class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
      href="https://tally.so/r/wQpPpY"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconBug />
      <span>Report a Bug</span>
    </a>
    <a
      class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
      href="https://tally.so/r/Gx6kXZ"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconFeedback />
      <span>General Feedback</span>
    </a>
    <a
      class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
      href="https://ko-fi.com/aukspot"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconKofi />
      <span>Donate</span>
    </a>
    <a
      class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
      href="https://github.com/aukspot/dles"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconGitHub />
      <span>GitHub</span>
    </a>
  </div>
</PanelWrapper>

<style lang="postcss">
  .link-grid {
    @apply grid grid-cols-2 gap-2;
  }
</style>
