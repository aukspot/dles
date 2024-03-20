<script>
  import tag_colors from "$lib/data/tag_colors.json";
  import { tags } from "$lib/stores";

  export let name;
  export let type;

  function handleClick() {
    if (type == "include") $tags[name].included = !$tags[name].included;
    if (type == "exclude") $tags[name].excluded = !$tags[name].excluded;
  }
</script>

<button
  on:click={handleClick}
  class="filterTag unselectable"
  style="background-color: {tag_colors[name]}"
>
  {name}
</button>

<style lang="postcss">
  button {
    @apply text-xs text-colorTextTag px-2 py-1 rounded shadow-md shadow-colorNeutralSofter font-mono active:shadow-none md:text-sm;
  }
</style>
