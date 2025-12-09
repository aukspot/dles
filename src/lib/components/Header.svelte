<script>
  import { base } from "$app/paths"
  import HeaderButton from "./Buttons/HeaderButton.svelte"
  import BackToTopButton from "./Buttons/BackToTopButton.svelte"
  import Banner from "./Banner.svelte"
  import { changelog, dles } from "$lib/stores"
</script>

<header class="flex items-center gap-2 px-2 py-2 md:px-0">
  <div class="flex gap-2 w-full items-end flex-wrap">
    <div class="flex gap-3 items-end content-start flex-shrink-0">
      <div>
        <div class="title flex flex-col items-baseline gap-2">
          <div class="flex gap-3 items-baseline py-[2px]">
            <h1 class="text-colorText flex items-baseline gap-2">
              <a
                class="whitespace-nowrap text-colorText uppercase font-bold text-xl lg:text-2xl"
                href="{base}/"
              >
                The Dles
              </a>
            </h1>
            <span class="lowercase font-normal text-sm tracking-tighter italic"
              >by <a href="https://aukspot.com">aukspot</a></span
            >
          </div>
          <span class="font-normal text-xs pl-[2px]"
            >Discover <strong>{$dles.length}</strong> free daily games.</span
          >
          <span class="last-updated pl-[2px]">
            <span class="italic">Last updated: </span>
            <a class="underline" href="{base}/changelog">
              {$changelog[0].date}
            </a>
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-baseline gap-2 flex-wrap overflow-x js-buttons">
      <HeaderButton panelId="info" label="Info" hoverColor="red" />
      <HeaderButton
        panelId="settings"
        label="Settings"
        hoverColor="yellow"
        jsOnly={true}
      />
      <HeaderButton panelId="help" label="How to Help" hoverColor="green" />
      <HeaderButton
        href="https://discord.gg/BQpGUg3r9C"
        label="Discord"
        hoverColor="blue"
      />
      <HeaderButton
        panelId="random"
        label="Random"
        hoverColor="orange"
        jsOnly={true}
      />
      <HeaderButton
        panelId="search"
        label="Search"
        hoverColor="violet"
        jsOnly={true}
      />
    </div>
    <noscript>
      <div class="flex items-baseline gap-2 flex-wrap overflow-x">
        <a
          href="#panel-info"
          class="btn-header text-colorText !bg-red-300 dark:!bg-red-800 hover:!bg-colorCardC"
          >INFO</a
        >
        <a
          href="#panel-help"
          class="btn-header text-colorText !bg-green-300 dark:!bg-green-700 hover:!bg-colorCardC"
          >HOW TO HELP</a
        >
        <!-- <a
          href="https://discord.gg"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-header text-colorText hover:bg-blue-300 dark:hover:bg-blue-700"
        >
          DISCORD
        </a> -->
      </div>
    </noscript>
  </div>
</header>

<style lang="postcss">
  .last-updated {
    @apply text-[11px] md:text-xs text-colorTextSofter;
  }

  .panel-radio {
    @apply hidden;
  }

  label.btn-header {
    @apply cursor-pointer;
  }
</style>
