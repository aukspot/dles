<script>
  import { headerColorClasses } from "$lib/js/headerColors"
  import IconX from "../Icons/IconX.svelte"

  export let icon
  export let label
  export let color = "zinc"
  export let active = false
  export let showLabel = false

  $: colorClass = active ? headerColorClasses[color] || "" : ""
  $: glyph = active ? IconX : icon
</script>

<button
  on:click
  aria-label={label}
  aria-haspopup="dialog"
  aria-expanded={active}
  title={label}
  class="btn-header text-colorText {colorClass}"
  class:btn-header-icon={!showLabel}
  class:btn-header-labelled={showLabel}
>
  <svelte:component this={glyph} />
  {#if showLabel}<span class="label">{label}</span>{/if}
</button>

<style lang="postcss">
  .btn-header-icon {
    @apply justify-center p-1 w-10 h-10 lg:w-8 lg:h-8;
  }

  .btn-header-labelled {
    @apply justify-start gap-1.5 py-1.5 px-2;
  }

  .label {
    @apply leading-none;
  }

  .btn-header-icon :global(svg),
  .btn-header-labelled :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
  }
</style>
