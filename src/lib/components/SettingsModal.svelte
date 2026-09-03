<script>
  import {
    settings,
    hiddenDleIds,
    playedDleIds,
    categoryRanks,
    completelyHiddenSections,
    showHiddenDlesModal,
    showMarkedDlesModal,
  } from "$lib/stores"
  import { defaultRanks } from "$lib/js/categoryRanks"
  import IconLightbulb from "./Icons/IconLightbulb.svelte"
  import IconFolders from "./Icons/IconFolders.svelte"
  import IconChecklist from "./Icons/IconChecklist.svelte"
  import IconEyeSlash from "./Icons/IconEyeSlash.svelte"
  import ManageCategoriesModal from "./ManageCategoriesModal.svelte"
  import ToggleSwitch from "./Buttons/ToggleSwitch.svelte"
  import { onMount } from "svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import ModalPanel from "./ModalPanel.svelte"
  import { useTheme } from "$lib/composables/useTheme"

  export let onClose

  let showCategoriesModal = false

  $: childModalOpen =
    showCategoriesModal || $showHiddenDlesModal || $showMarkedDlesModal

  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`

  $: hiddenLabel = $hiddenDleIds.length
    ? `${plural($hiddenDleIds.length, "dle")} hidden`
    : "No dles hidden"

  $: playedLabel = $playedDleIds.length
    ? `${plural($playedDleIds.length, "dle")} played today`
    : "No dles played today"

  $: categoriesModified =
    Object.keys(defaultRanks).some(
      (name) => $categoryRanks[name] !== defaultRanks[name],
    ) || Object.values($completelyHiddenSections).some(Boolean)

  $: categoriesLabel = categoriesModified
    ? "Categories modified"
    : "Categories unmodified"

  onMount(() => {
    if (isLocalStorageAvailable()) {
      const storedView = localStorage.view
      if (storedView === "Detailed View") {
        $settings.view = "Category View"
        localStorage.view = "Category View"
      } else {
        $settings.view = storedView || "Category View"
      }
    } else {
      $settings.view = "Category View"
    }
  })

  const theme = useTheme()
  const { isDark, toggleTheme } = theme

  onMount(() => {
    return theme.initTheme()
  })

  const fontSizes = [
    { label: "Small", value: "-2px" },
    { label: "Default", value: "0px" },
    { label: "Large", value: "2px" },
    { label: "Extra Large", value: "4px" },
  ]
  const DEFAULT_FONT_SIZE_INDEX = 1

  let fontSizeIndex = DEFAULT_FONT_SIZE_INDEX
  $: fontSize = fontSizes[fontSizeIndex]

  onMount(() => {
    if (!isLocalStorageAvailable()) return
    const stored = localStorage.fontSizeOffset
    const i = fontSizes.findIndex((s) => s.value === stored)
    if (i !== -1) fontSizeIndex = i
  })

  function stepFontSize(delta) {
    const next = fontSizeIndex + delta
    if (next < 0 || next >= fontSizes.length) return
    fontSizeIndex = next
    const offset = fontSizes[next].value
    document.documentElement.style.setProperty("--font-size-offset", offset)
    if (isLocalStorageAvailable()) {
      localStorage.fontSizeOffset = offset
    }
  }
</script>

<ModalPanel
  title="Settings"
  {onClose}
  maxWidth="32rem"
  closeOnEscape={!childModalOpen}
  closeOnClickOutside={!childModalOpen}
>
  <ul class="settings-rows">
    <li class="settings-row">
      <span class="row-icon icon-lightbulb"><IconLightbulb /></span>
      <span class="row-label">Dark mode</span>
      <ToggleSwitch
        checked={$isDark}
        label="Dark mode"
        on:click={toggleTheme}
      />
    </li>

    <li class="settings-row">
      <span class="row-icon icon-eye-slash"><IconEyeSlash /></span>
      <span class="row-label" class:muted={!$hiddenDleIds.length}
        >{hiddenLabel}</span
      >
      <button
        class="row-action"
        on:click={() => ($showHiddenDlesModal = true)}
        aria-label="Manage hidden dles"
      >
        Manage
      </button>
    </li>

    <li class="settings-row">
      <span class="row-icon icon-checklist"><IconChecklist /></span>
      <span class="row-label" class:muted={!$playedDleIds.length}
        >{playedLabel}</span
      >
      <button
        class="row-action"
        on:click={() => ($showMarkedDlesModal = true)}
        aria-label="Manage dles played today"
      >
        Manage
      </button>
    </li>

    <li class="settings-row">
      <span class="row-icon icon-folders"><IconFolders /></span>
      <span class="row-label" class:muted={!categoriesModified}
        >{categoriesLabel}</span
      >
      <button
        class="row-action"
        on:click={() => (showCategoriesModal = true)}
        aria-label="Manage categories"
      >
        Manage
      </button>
    </li>

    <li class="settings-row">
      <span class="row-icon"><span class="font-size-glyph">Aa</span></span>
      <span class="row-label">Font size</span>
      <div class="stepper">
        <button
          class="stepper-btn"
          on:click={() => stepFontSize(-1)}
          disabled={fontSizeIndex === 0}
          aria-label="Decrease font size"
        >
          &minus;
        </button>
        <span class="stepper-value" aria-live="polite">{fontSize.label}</span>
        <button
          class="stepper-btn"
          on:click={() => stepFontSize(1)}
          disabled={fontSizeIndex === fontSizes.length - 1}
          aria-label="Increase font size"
        >
          +
        </button>
      </div>
    </li>
  </ul>
</ModalPanel>

{#if showCategoriesModal}
  <ManageCategoriesModal
    onClose={() => (showCategoriesModal = false)}
    lockScroll={false}
  />
{/if}

<style lang="postcss">
  .settings-rows {
    @apply flex flex-col list-none m-0 p-0;
  }

  .settings-row {
    @apply flex items-center gap-3 py-3 px-1 border-b border-colorTextSoftest;
  }

  .settings-row:last-child {
    @apply border-b-0;
  }

  .row-icon {
    @apply flex items-center justify-center flex-shrink-0 w-6 h-6 text-colorTextSoft;
  }

  .row-icon :global(svg) {
    @apply w-full h-full;
  }

  .icon-lightbulb :global(svg) {
    transform: translateY(-1px);
  }

  .icon-eye-slash :global(svg) {
    transform: scale(0.83);
  }

  .icon-checklist :global(svg) {
    transform: scale(1.03) translateY(-0.25px);
  }

  .icon-folders :global(svg) {
    transform: scale(0.92);
  }

  .font-size-glyph {
    @apply text-sm font-bold leading-none;
  }

  .row-label {
    @apply flex-1 min-w-0 text-sm text-colorText;
  }

  .row-label.muted {
    @apply text-colorTextSoft;
  }

  .row-action {
    @apply flex-shrink-0 px-3 py-1.5 text-xs font-medium uppercase tracking-wide
           text-colorText bg-colorCardB border border-colorTextSofter cursor-pointer
           transition-colors;
  }

  .row-action:hover {
    @apply bg-colorCardC border-colorText;
  }

  .stepper {
    @apply flex items-center flex-shrink-0 border border-colorTextSofter bg-colorCardB;
  }

  .stepper-btn {
    @apply w-8 h-8 flex items-center justify-center text-base font-bold leading-none
           text-colorText cursor-pointer bg-transparent border-none transition-colors;
  }

  .stepper-btn:hover:not(:disabled) {
    @apply bg-colorCardC;
  }

  .stepper-btn:disabled {
    @apply opacity-30 cursor-not-allowed;
  }

  .stepper-value {
    @apply text-xs font-medium uppercase tracking-wide text-colorText text-center
           border-x border-colorTextSofter px-2 py-1.5;
    min-width: 6.5rem;
  }
</style>
