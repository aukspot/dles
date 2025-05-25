<script>
  import { fade } from "svelte/transition"
</script>

<div transition:fade={{ duration: 80 }}>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply flex flex-col p-3 gap-2 bg-colorCardC absolute right-1 top-20 w-80 sm:w-[22rem] md:w-96 border-2 border-colorTextSoftest rounded-lg shadow-sm shadow-colorTextSoftest;

    /* 3D bevel effect */
    border: 2px solid;
    border-color: 
      theme('colors.colorTextSoftest') 
      theme('colors.colorTextSoft') 
      theme('colors.colorTextSoft') 
      theme('colors.colorTextSoftest');
    box-shadow: 
      inset 1px 1px 0 rgba(255, 255, 255, 0.3),
      inset -1px -1px 0 rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
