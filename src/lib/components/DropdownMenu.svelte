<script>
</script>

<div>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply flex flex-col p-2 gap-2 bg-gray-50 dark:bg-gray-950 absolute -right-2 top-12 w-72 sm:w-80 md:w-96 rounded-md shadow-md shadow-gray-500;
    /* transform: translate(calc(50vw - 50%)); */
  }
</style>
