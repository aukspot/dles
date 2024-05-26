<script>
  import { fly } from "svelte/transition"
</script>

<div transition:fly={{ y: -200, duration: 300 }}>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply flex flex-col p-3 gap-2 bg-colorCardC absolute right-1 top-20 w-72 sm:w-80 md:w-96 border-2 border-colorTextSoftest rounded-lg shadow-md shadow-colorTextSoftest;
  }
</style>
