<script>
  import { fade } from "svelte/transition"
</script>

<div transition:fade={{ duration: 80 }}>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply flex flex-col p-3 gap-2 bg-colorCardC absolute right-1 top-20 w-80 sm:w-[22rem] md:w-96 border-2 border-colorTextSoftest rounded-lg shadow-md shadow-colorTextSoftest;
  }
</style>
