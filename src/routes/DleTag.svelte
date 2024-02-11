<script>
  import tag_colors from "../data/tag_colors.json";
  export let name;
</script>

<div
  class="box-shadow not-selectable"
  style="background-color: {tag_colors[name]}"
>
  {name}
</div>

<style>
  div {
    color: var(--color-text-lightmode);
    font-size: 0.8rem;
    font-family: var(--font-mono);
    padding: 0.1rem 0.3rem;
    border: 1px solid var(--color-bg-darkmode);
  }
</style>
