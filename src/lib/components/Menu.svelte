<script>
  import { base } from "$app/paths"
  import Settings from "$lib/components/Settings.svelte"
  import DropdownMenu from "./DropdownMenu.svelte"
  import IconBug from "./Icons/IconBug.svelte"
  import IconKofi from "./Icons/IconKofi.svelte"
  import IconSuggest from "./Icons/IconSuggest.svelte"
</script>

<DropdownMenu>
  <h2
    class="pb-1 mb-1 text-center text-lg font-semibold border-b border-colorTextSoftest"
  >
    Menu
  </h2>

  <Settings />
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
      target="_blank"><IconKofi /> Support on Ko-fi</a
    >
  </div>
</DropdownMenu>
