<script>
  import {
    settings,
    hiddenDleIds,
    playedDleIds,
    showHiddenDlesModal,
    showMarkedDlesModal,
  } from "$lib/stores"
  import IconLightbulb from "./Icons/IconLightbulb.svelte"
  import IconFolders from "./Icons/IconFolders.svelte"
  import IconChecklist from "./Icons/IconChecklist.svelte"
  import ManageCategoriesModal from "./ManageCategoriesModal.svelte"
  import { trackEvent } from "$lib/js/trackingUtils"
  import { onMount } from "svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import PanelWrapper from "./PanelWrapper.svelte"
  import PanelTitle from "./PanelTitle.svelte"
  import { useTheme } from "$lib/composables/useTheme"
  import IconEyeSlash from "./Icons/IconEyeSlash.svelte"

  export let open = false

  let showCategoriesModal = false

  // Migrate DetailedView to Category View (deprecation)
  onMount(() => {
    if (isLocalStorageAvailable()) {
      const storedView = localStorage.view
      if (storedView === "Detailed View") {
        // Migrate to Category View
        $settings.view = "Category View"
        localStorage.view = "Category View"
      } else {
        $settings.view = storedView || "Category View"
      }
    } else {
      $settings.view = "Category View"
    }
  })

  // Theme management
  const theme = useTheme()
  const { isDark, toggleTheme } = theme

  onMount(() => {
    return theme.initTheme()
  })

  $: themeButtonText = $isDark ? "Turn on light mode" : "Turn on dark mode"

  const fontSizes = [
    { label: "Small", value: "-2px" },
    { label: "Default", value: "0px" },
    { label: "Large", value: "2px" },
    { label: "Extra Large", value: "4px" },
  ]

  let currentFontSize = "0px"

  onMount(() => {
    // Just sync the UI state - the CSS variable is already set in +layout.svelte
    if (isLocalStorageAvailable()) {
      const stored = localStorage.fontSizeOffset
      if (stored) {
        currentFontSize = stored
      }
    }
  })

  function changeFontSize(offset) {
    currentFontSize = offset
    document.documentElement.style.setProperty("--font-size-offset", offset)
    if (isLocalStorageAvailable()) {
      localStorage.fontSizeOffset = offset
    }
    trackEvent("settings_font_size_change", { offset })
  }
</script>

<PanelWrapper {open}>
  <PanelTitle color="zinc" title="SETTINGS" />

  <div class="panel-content">
    <section class="preference-section">
      <div class="button-row-center">
        <button class="settings-btn" on:click={toggleTheme}>
          <IconLightbulb />
          {themeButtonText}
        </button>
      </div>
    </section>
    <section class="preference-section">
      <h3 class="section-subtitle">Manage</h3>

      <div class="button-row-center">
        <button
          class="settings-btn"
          on:click={() => (showCategoriesModal = true)}
        >
          <IconFolders />
          Categories
        </button>
        <button
          class="settings-btn"
          on:click={() => ($showHiddenDlesModal = true)}
        >
          <IconEyeSlash />
          Hidden DLES ({$hiddenDleIds.length})
        </button>
        <button
          class="settings-btn"
          on:click={() => ($showMarkedDlesModal = true)}
        >
          <IconChecklist />
          Played ({$playedDleIds.length})
        </button>
      </div>
    </section>

    <section class="preference-section md:hidden">
      <h3 class="section-subtitle">Set Font Size</h3>
      <div class="font-size-grid">
        {#each fontSizes as size}
          <button
            class="font-size-button"
            class:active={currentFontSize === size.value}
            on:click={() => changeFontSize(size.value)}
          >
            {size.label}
          </button>
        {/each}
      </div>
    </section>
  </div>
</PanelWrapper>

{#if showCategoriesModal}
  <ManageCategoriesModal onClose={() => (showCategoriesModal = false)} />
{/if}

<style lang="postcss">
  .panel-content {
    @apply p-0;
  }

  .preference-section {
    @apply mb-4;
  }

  .section-subtitle {
    @apply text-sm md:text-base font-bold text-colorTextSoft uppercase tracking-wide mb-1 text-center;
  }

  .button-row-center {
    @apply flex flex-row gap-1 mb-3 justify-center;
  }

  /* Font size controls */
  .font-size-grid {
    @apply grid grid-cols-2 gap-1 mb-2 justify-center;
  }

  .font-size-button {
    @apply px-4 py-2 text-xs font-medium text-colorText bg-zinc-100 dark:bg-zinc-700 border border-colorTextSofter
           hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer uppercase;
  }

  .font-size-button.active {
    @apply bg-blue-100 border-blue-400 text-blue-700 font-semibold
           dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300;
  }

  /* Settings buttons */
  .settings-btn {
    @apply px-4 py-2 text-xs font-medium text-colorText bg-zinc-100 dark:bg-zinc-700 border border-colorTextSofter
           cursor-pointer uppercase flex items-center justify-center gap-2;
    transition: all 0.15s ease-out;
  }

  .settings-btn:hover {
    @apply bg-zinc-200 dark:bg-zinc-800 border-colorText shadow-md;
    transform: translateY(-1px);
  }

  .settings-btn:active {
    @apply shadow-none;
    transform: translateY(0);
  }

  .settings-btn :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.15s ease-out;
  }

  .settings-btn:hover :global(svg) {
    transform: scale(1.1);
  }

  .settings-btn:disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .settings-btn:disabled:hover {
    @apply bg-zinc-100 dark:bg-zinc-700 shadow-none;
    transform: none;
  }
</style>
