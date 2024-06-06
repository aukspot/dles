<script>
  import { favorites } from "$lib/stores"
  import { categoryIcons } from "$lib/js/categoryIcons"
</script>

{#each $favorites as favorite}
  <div>
    <div>{favorite.name}</div>
    <svelte:component this={categoryIcons[favorite.category]} />
  </div>
{/each}
