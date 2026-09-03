<script>
  export let checked = false
  export let label // Accessible name, e.g. "Dark mode"
  export let onLabel = "On"
  export let offLabel = "Off"
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  class="toggle"
  class:on={checked}
  on:click
>
  <span class="track">
    <span class="knob"></span>
    <span class="state state-off" aria-hidden="true">{offLabel}</span>
    <span class="state state-on" aria-hidden="true">{onLabel}</span>
  </span>
</button>

<style lang="postcss">
  .toggle {
    @apply cursor-pointer border-none bg-transparent p-0 flex-shrink-0;
  }

  .track {
    @apply relative flex items-center rounded-full border-2 border-colorTextSofter bg-colorCardB transition-colors duration-200;
    width: 4.5rem;
    height: 2rem;
  }

  .toggle:hover .track {
    @apply border-colorText;
  }

  .toggle:focus-visible {
    @apply outline-none;
  }

  .toggle:focus-visible .track {
    @apply ring-2 ring-blue-500 ring-offset-1;
  }

  .on .track {
    @apply border-blue-500 bg-blue-100 dark:bg-blue-900/40;
  }

  .knob {
    @apply absolute rounded-full bg-colorTextSofter;
    width: 1.5rem;
    height: 1.5rem;
    left: 0.125rem;
    transform: translateX(0);
    transition: transform 0.22s cubic-bezier(0.2, 0.7, 0.3, 1),
      background-color 0.2s ease;
  }

  .on .knob {
    @apply bg-blue-500;
    /* track 4.5rem - 2*0.125rem inset - 2*0.125rem border - knob 1.5rem */
    transform: translateX(2.5rem);
  }

  .state {
    @apply absolute text-[0.625rem] font-bold uppercase tracking-wider text-colorTextSoft transition-opacity duration-200;
  }

  .state-off {
    right: 0.55rem;
    opacity: 1;
  }

  .state-on {
    left: 0.55rem;
    opacity: 0;
    @apply text-blue-700 dark:text-blue-300;
  }

  .on .state-off {
    opacity: 0;
  }

  .on .state-on {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .knob,
    .state,
    .track {
      transition: none;
    }
  }
</style>
