<script>
  export let variant = "default" // "default" | "info" | "warning" | "error" | "success"
  export let padding = "md" // "sm" | "md" | "lg"
  export let border = true

  let className = ""
  export { className as class }

  $: variantClass = `card-${variant}`
  $: paddingClass = `card-padding-${padding}`
  $: borderClass = border ? "card-border" : ""
  $: computedClass =
    `${variantClass} ${paddingClass} ${borderClass} ${className}`.trim()
</script>

<div class={computedClass}>
  <slot />
</div>

<style lang="postcss">
  /* Base card styles */
  :global(.card-default) {
    @apply bg-colorCardA rounded;
  }

  :global(.card-info) {
    @apply bg-colorCardB;
  }

  :global(.card-warning) {
    @apply bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-700;
  }

  :global(.card-error) {
    @apply bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700;
  }

  :global(.card-success) {
    @apply bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700;
  }

  /* Padding variants */
  :global(.card-padding-sm) {
    @apply p-2;
  }

  :global(.card-padding-md) {
    @apply p-3;
  }

  :global(.card-padding-lg) {
    @apply p-4;
  }

  /* Border */
  :global(.card-border) {
    @apply border border-colorTextSoftest;
  }

  :global(.card-warning.card-border),
  :global(.card-error.card-border),
  :global(.card-success.card-border) {
    @apply border-2;
  }
</style>
