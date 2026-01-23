<script>
  export let type = "text" // "text" | "code" | "textarea"
  export let size = "md" // "sm" | "md" | "lg"
  export let fullWidth = false
  export let value = ""
  export let placeholder = ""
  export let disabled = false
  export let maxlength = null
  export let rows = 6
  export let id = null

  let className = ""
  export { className as class }

  $: typeClass = `input-type-${type}`
  $: sizeClass = `input-size-${size}`
  $: widthClass = fullWidth ? "input-full-width" : ""
  $: computedClass =
    `input ${typeClass} ${sizeClass} ${widthClass} ${className}`.trim()
</script>

{#if type === "textarea"}
  <textarea
    class={computedClass}
    {id}
    bind:value
    {placeholder}
    {disabled}
    {rows}
    {maxlength}
    on:focus
    on:blur
  />
{:else}
  <input
    type="text"
    class={computedClass}
    {id}
    bind:value
    {placeholder}
    {disabled}
    {maxlength}
    on:keydown
    on:focus
    on:blur
  />
{/if}

<style lang="postcss">
  .input {
    @apply border border-colorTextSofter focus:outline-none transition-colors;
  }

  /* Type variants */
  .input-type-text {
    @apply font-mono bg-colorCardB text-colorText placeholder:text-colorTextSofter;
  }

  .input-type-code {
    @apply font-mono bg-colorCardB text-colorText text-center;
    letter-spacing: 0.1em;
    @apply text-lg font-bold;
  }

  .input-type-textarea {
    @apply font-mono bg-colorCardB text-colorText border-2 border-colorTextSofter focus:border-blue-500 resize-y;
  }

  /* Size variants */
  .input-size-sm {
    @apply px-2 py-1 text-xs;
  }

  .input-size-md {
    @apply px-3 py-2 text-sm;
  }

  .input-size-lg {
    @apply px-3 py-2 text-lg;
  }

  /* Width */
  .input-full-width {
    @apply w-full;
  }

  /* Focus states */
  .input-type-code:focus {
    @apply border-blue-500;
  }
</style>
