<script>
  import { themeColor } from "$lib/js/themes"
  import { themeIcons } from "$lib/js/themeIcons"
  import { slugifySection } from "$lib/js/counter.js"
  import SectionHeader from "../SectionHeader.svelte"
  import DleGroup from "./DleGroup.svelte"

  export let theme
  export let dles
  export let themes
  export let category
  export let description = ""
  export let untyped = false

  $: sectionName = `theme-${slugifySection(category)}-${slugifySection(theme)}`
</script>

<div class="card">
  <SectionHeader
    title={theme}
    icon={themeIcons[theme]}
    color={untyped ? "hsl(0, 0%, 49%, 45%)" : themeColor(theme, themes)}
  />
  {#if description}
    <p class="theme-description">{description}</p>
  {/if}
  <DleGroup dleGroup={dles} section={sectionName} />
</div>

<style lang="postcss">
  .card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
    display: inline-block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .theme-description {
    @apply block px-2 py-1 text-xs font-normal text-colorTextSoft bg-colorCardC text-center;
  }
</style>
