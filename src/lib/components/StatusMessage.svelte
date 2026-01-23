<script>
  export let type = "info" // "loading" | "error" | "success" | "info"
  export let message = null

  $: typeClass = `status-${type}`
</script>

<div class="status-message {typeClass}">
  {#if type === "loading"}
    <p class="status-text">
      {#if message}
        {message}
      {:else}
        <slot>Loading...</slot>
      {/if}
    </p>
  {:else if type === "error"}
    <div class="status-content">
      {#if message}
        {message}
      {:else}
        <slot>Error occurred</slot>
      {/if}
    </div>
  {:else if type === "success"}
    <div class="status-content">
      {#if message}
        {message}
      {:else}
        <slot>Success</slot>
      {/if}
    </div>
  {:else}
    <div class="status-content">
      {#if message}
        {message}
      {:else}
        <slot>Info</slot>
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  .status-message {
    @apply flex items-center justify-center;
  }

  .status-loading {
    @apply py-8;
  }

  .status-error {
    @apply bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 p-3 rounded;
  }

  .status-success {
    @apply bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 p-3 rounded;
  }

  .status-info {
    @apply bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 p-3 rounded;
  }

  .status-text {
    @apply text-colorTextSoft text-lg uppercase tracking-wide;
  }

  .status-content {
    @apply text-sm;
  }

  .status-error .status-content {
    @apply text-red-800 dark:text-red-300;
  }

  .status-success .status-content {
    @apply text-green-800 dark:text-green-300;
  }

  .status-info .status-content {
    @apply text-blue-800 dark:text-blue-300;
  }
</style>
