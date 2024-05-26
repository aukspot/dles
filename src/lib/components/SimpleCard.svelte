<div>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply mx-0 py-4 px-2 flex flex-col gap-3 rounded-none md:rounded-2xl md:px-3 text-sm sm:text-base bg-colorCardA shadow-md shadow-colorTextSoftest dark:bg-colorCardB;
  }
</style>
