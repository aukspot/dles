<script>
  import tag_colors from "../data/tag_colors.json";
  import { tags } from "../stores";

  export let name;
  export let type;
  function handleClick() {
    if (type == "include") $tags[name].included = !$tags[name].included;
    if (type == "exclude") $tags[name].excluded = !$tags[name].excluded;
  }
</script>

<button
  on:click={handleClick}
  class="filterTag not-selectable"
  style="background-color: {tag_colors[name]}"
>
  {name}
</button>

<style>
  button {
    padding: 0.3rem 0.4rem;
  }
</style>
