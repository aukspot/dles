<script>
  import { base } from "$app/paths"
  import Settings from "$lib/components/Settings.svelte"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconBug from "./Icons/IconBug.svelte"
  import IconGitHub from "./Icons/IconGitHub.svelte"
  import IconKofi from "./Icons/IconKofi.svelte"
  import IconSuggest from "./Icons/IconSuggest.svelte"
</script>

<DropdownMenu>
  <h2
    class="pb-1 mb-1 text-center text-xl font-semibold border-b border-colorTextSoftest"
  >
    Main Menu
  </h2>

  <Settings />
  <h3 class="pb-1 my-1 text-center text-lg border-b border-colorTextSoftest">
    How to help
  </h3>
  <div data-sveltekit-reload>
    <a class="menu-link btn-menu-item" href="{base}/suggest"
      ><IconSuggest /> Suggest a game</a
    >
    <a class="menu-link btn-menu-item" href="{base}/report"
      ><IconBug /> Report a bug</a
    >
    <a
      class="menu-link btn-menu-item"
      href="https://ko-fi.com/aukspot"
      target="_blank"><IconKofi /> Buy me a coffee</a
    >
    <a
      class="menu-link btn-menu-item"
      href="https://github.com/aukspot/dles"
      target="_blank"><IconGitHub />Contribute</a
    >
  </div>
</DropdownMenu>
