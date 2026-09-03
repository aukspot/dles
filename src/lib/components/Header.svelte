<script>
  import { base } from "$app/paths"
  import HeaderButton from "./Buttons/HeaderButton.svelte"
  import NavLink from "./Buttons/NavLink.svelte"
  import IconActionButton from "./Buttons/IconActionButton.svelte"
  import IconSearch from "./Icons/IconSearch.svelte"
  import IconSettings from "./Icons/IconSettings.svelte"
  import IconHome from "./Icons/IconHome.svelte"
  import IconFavoriteOutline from "./Icons/IconFavoriteOutline.svelte"
  import IconArchive from "./Icons/IconArchive.svelte"
  import {
    changelog,
    dles,
    getActivePolls,
    pollResponses,
    activePanelStore,
    showSearchModal,
    showSettingsModal,
  } from "$lib/stores"
  import { onMount } from "svelte"
  import { getLocalStorage, setLocalStorage } from "$lib/js/localStorage"

  // Check if there are unanswered polls
  $: activePolls = getActivePolls()
  $: hasUnansweredPolls = activePolls.some((poll) => !$pollResponses[poll.id])

  // Check if discord panel was opened
  let hasOpenedDiscordPanel = false
  onMount(() => {
    hasOpenedDiscordPanel = getLocalStorage("hasOpenedDiscordPanel") === "true"
  })

  // Mark discord panel as opened when it's opened
  $: if ($activePanelStore === "discord" && !hasOpenedDiscordPanel) {
    hasOpenedDiscordPanel = true
    setLocalStorage("hasOpenedDiscordPanel", "true")
  }

  function openModal(store) {
    $activePanelStore = null
    store.set(true)
  }

  let headerEl, titleEl, actionsEl
  let compact = false

  const HYSTERESIS = 8

  function updateCompact() {
    if (!headerEl || !titleEl || !actionsEl) return

    const labels = [...actionsEl.querySelectorAll(".label")]
    if (!labels.length) return

    const labelWidth = Math.max(...labels.map((l) => l.scrollWidth))
    const button = actionsEl.querySelector("button")
    const iconGap = parseFloat(getComputedStyle(button).columnGap) || 0

    const needed = compact
      ? actionsEl.offsetWidth + labelWidth + iconGap
      : actionsEl.offsetWidth

    const available = actionsEl.parentElement.clientWidth

    compact = compact ? needed > available - HYSTERESIS : needed > available
  }

  onMount(() => {
    updateCompact()
    const ro = new ResizeObserver(updateCompact)
    ro.observe(headerEl)
    ro.observe(titleEl)
    return () => ro.disconnect()
  })
</script>

<header
  bind:this={headerEl}
  class="flex items-start gap-2 px-2 py-2 md:px-0 flex-wrap"
>
  <div
    class="flex w-full items-start lg:items-center gap-2 flex-wrap lg:flex-nowrap"
  >
    <div
      class="order-3 lg:order-2 w-full lg:w-auto lg:flex-1 lg:min-w-0 flex flex-col gap-2 lg:items-center"
    >
      <nav
        aria-label="Site"
        class="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 justify-center"
      >
        <NavLink href="{base}/" routeId="/" label="Home" icon={IconHome} />
        <NavLink
          href="{base}/favorites"
          routeId="/favorites"
          label="Favorites"
          icon={IconFavoriteOutline}
        />
        <NavLink
          href="{base}/archived"
          routeId="/archived"
          label="Archived"
          icon={IconArchive}
        />
      </nav>

      <div
        class="flex items-baseline gap-3 flex-wrap justify-center js-buttons"
      >
        <HeaderButton panelId="info" label="Info" hoverColor="red" />
        <HeaderButton panelId="help" label="How to Help" hoverColor="green" />
        <HeaderButton
          panelId="discord"
          label="Discord"
          hoverColor="teal"
          jsOnly={true}
          showBadge={!hasOpenedDiscordPanel}
        />
        <HeaderButton
          panelId="poll"
          label="Polls"
          hoverColor="blue"
          jsOnly={true}
          showBadge={hasUnansweredPolls}
        />
        <HeaderButton
          panelId="random"
          label="Random"
          hoverColor="orange"
          jsOnly={true}
        />
      </div>

      <noscript>
        <div class="flex items-baseline gap-2 flex-wrap">
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
        </div>
      </noscript>
    </div>
    <div class="order-1 lg:order-1 flex-none flex justify-start">
      <div
        bind:this={titleEl}
        class="flex gap-3 items-end content-start flex-shrink-0"
      >
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
              <span
                class="lowercase font-normal text-sm tracking-tighter italic"
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
    </div>
    <div
      class="order-2 lg:order-3 flex-1 min-w-0 lg:flex-none flex justify-end items-start lg:items-center"
    >
      <div
        bind:this={actionsEl}
        class="header-actions flex-shrink-0 js-only"
        class:is-compact={compact}
      >
        <IconActionButton
          icon={IconSettings}
          label="Settings"
          color="zinc"
          showLabel={true}
          active={$showSettingsModal}
          on:click={() => openModal(showSettingsModal)}
        />
        <IconActionButton
          icon={IconSearch}
          label="Search"
          color="violet"
          showLabel={true}
          active={$showSearchModal}
          on:click={() => openModal(showSearchModal)}
        />
      </div>
    </div>
  </div>
</header>

<style lang="postcss">
  .last-updated {
    @apply text-xs text-colorTextSofter;
  }

  .header-actions {
    @apply flex items-stretch gap-1 w-auto ml-auto;
  }

  .header-actions :global(button) {
    @apply justify-start py-1.5 px-2 gap-1.5;
  }

  .header-actions :global(.label) {
    @apply inline-block overflow-hidden whitespace-nowrap align-middle;
    max-width: 8rem;
    transition: max-width 0.15s ease;
  }

  .header-actions.is-compact :global(button) {
    @apply justify-center gap-0;
  }

  .header-actions.is-compact :global(.label) {
    max-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .header-actions :global(.label) {
      transition: none;
    }
  }
</style>
