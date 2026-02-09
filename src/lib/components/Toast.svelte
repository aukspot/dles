<script>
  import { toasts } from "$lib/stores/toastStore.js"
  import { fly, slide } from "svelte/transition"
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <div
      class="toast toast-{toast.type}"
      role="alert"
      in:fly={{ y: 50, duration: 300 }}
      out:fly={{ y: 50, duration: 200 }}
      on:mouseenter={() => toasts.pause(toast.id)}
      on:mouseleave={() => toasts.resume(toast.id)}
    >
      <span class="toast-message">{@html toast.message}</span>
      {#if toast.actions}
        {#each toast.actions as action}
          <button
            class="toast-action"
            on:click={() => {
              action.onClick()
              if (action.dismissOnClick !== false) {
                toasts.dismiss(toast.id)
              }
            }}
          >
            {action.label}
          </button>
        {/each}
      {:else if toast.action}
        <button
          class="toast-action"
          on:click={() => {
            toast.action.onClick()
            toasts.dismiss(toast.id)
          }}
        >
          {toast.action.label}
        </button>
      {/if}
      <button
        class="toast-dismiss"
        on:click={() => toasts.dismiss(toast.id)}
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  {/each}
</div>

<style lang="postcss">
  .toast-container {
    @apply fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center;
    pointer-events: none;
  }

  .toast {
    @apply flex items-center gap-4 px-4 py-3 rounded shadow-sm shadow-colorText border border-colorTextSoft text-sm w-[90vw] md:w-auto md:max-w-[95vw];
    pointer-events: auto;
  }

  .toast-info {
    @apply bg-colorCardC text-colorTextSoft;
  }

  .toast-success {
    @apply bg-green-600 text-colorTextSoft;
  }

  .toast-warning {
    @apply bg-orange-500 text-colorTextSoft;
  }

  .toast-error {
    @apply bg-red-600 text-colorTextSoft;
  }

  .toast-message {
    @apply flex-1;
  }

  .toast-message :global(strong) {
    @apply font-bold text-colorText;
  }

  .toast-action {
    @apply px-2 py-1 text-xs font-semibold uppercase bg-colorTextSoft/20 hover:bg-colorTextSoft/30 rounded transition-colors cursor-pointer;
  }

  .toast-dismiss {
    @apply text-lg leading-none opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none text-inherit;
  }
</style>
