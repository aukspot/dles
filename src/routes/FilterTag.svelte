<script>
  import tag_colors from "../data/tag_colors.json"
  import { tags } from "../stores"

  export let name
  export let type

  function handleClick() {
    if (type == "include") $tags[name].included = !$tags[name].included
    if (type == "exclude") $tags[name].excluded = !$tags[name].excluded
  }
</script>

<button
  on:click={handleClick}
  class="filterTag not-selectable text-xs px-2 py-1 rounded ring-1 ring-slate-50 dark:text-slate-900 dark:ring-slate-700"
  style="background-color: {tag_colors[name]}"
>
  {name}
</button>
