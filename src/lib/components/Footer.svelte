<script>
  import { fade, fly } from "svelte/transition"
  import LatestChange from "./LatestChange.svelte"
  import IconSuggest from "./Icons/IconSuggest.svelte"
  import IconBug from "./Icons/IconBug.svelte"
  import IconKofi from "./Icons/IconKofi.svelte"
  import { base } from "$app/paths"
</script>

<footer class="flex flex-col p-1">
  <div class="divider"></div>
  <div class="flex flex-col md:flex-row justify-around">
    <LatestChange />

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
  </div>
</footer>
