<script>
  import tag_colors from "$lib/data/tag_colors.json"
  export let name
</script>

<button
  class="filterTag unselectable"
  style="background-color: {tag_colors[name]}"
>
  {name}
</button>

<style lang="postcss">
  button {
    @apply text-xs text-colorTextTag px-2 py-1 rounded shadow-md shadow-colorNeutralSofter font-mono active:shadow-none md:text-sm cursor-default;
  }
</style>
