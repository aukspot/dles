<script>
  import IconGitHub from "./Icons/IconGitHub.svelte"
  import IconKofi from "./Icons/IconKofi.svelte"
  import IconBug from "./Icons/IconBug.svelte"
  import IconSuggest from "./Icons/IconSuggest.svelte"
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import IconFeedback from "./Icons/IconFeedback.svelte"
  import Button from "./Button.svelte"

  export let open = false
</script>

<PanelWrapper {open}>
  <PanelTitle color="green" title="HOW TO HELP" />
  <div class="link-grid">
    <Button
      size="sm"
      color="green"
      icon={IconSuggest}
      href="https://tally.so/r/mOKOea"
    >
      Suggest a Game
    </Button>
    <Button
      size="sm"
      color="green"
      icon={IconBug}
      href="https://tally.so/r/wQpPpY"
    >
      Report a Bug
    </Button>
    <Button
      size="sm"
      color="green"
      icon={IconFeedback}
      href="https://tally.so/r/Gx6kXZ"
    >
      General Feedback
    </Button>
    <Button
      size="sm"
      color="green"
      icon={IconKofi}
      href="https://ko-fi.com/aukspot"
    >
      Donate
    </Button>
    <Button
      size="sm"
      color="green"
      icon={IconGitHub}
      href="https://github.com/aukspot/dles"
    >
      GitHub
    </Button>
  </div>
</PanelWrapper>

<style lang="postcss">
  .link-grid {
    @apply grid grid-cols-2 gap-2;
  }
</style>
