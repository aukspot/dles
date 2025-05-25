<div>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply mx-0 py-4 px-2 flex flex-col gap-3 rounded-none md:rounded-2xl md:px-3 text-sm sm:text-base bg-colorCardA shadow-md shadow-colorTextSoftest dark:bg-colorCardB;

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
