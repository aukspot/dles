<script>
  export let variant = "default" // "default" | "active" | "completed" | "answered" | "new"
  export let size = "sm" // "sm" | "md"

  let className = ""
  export { className as class }

  $: variantClass = `badge-${variant}`
  $: sizeClass = `badge-size-${size}`
  $: computedClass = `badge ${variantClass} ${sizeClass} ${className}`.trim()
</script>

<span class={computedClass}>
  <slot />
</span>

<style lang="postcss">
  .badge {
    @apply text-xs font-mono font-semibold px-2 py-1 rounded uppercase;
  }

  /* Variant styles */
  .badge-default {
    @apply bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300;
  }

  .badge-active {
    @apply bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200;
  }

  .badge-completed {
    @apply bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300;
  }

  .badge-answered {
    @apply bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200;
  }

  .badge-new {
    @apply bg-red-500 text-white;
    @apply absolute -top-2.5 -right-1 px-1 py-0.5;
  }

  /* Size variants */
  .badge-size-sm {
    @apply text-xs px-2 py-1;
  }

  .badge-size-md {
    @apply text-sm px-3 py-1.5;
  }
</style>
