<script>
  import { filteredDles } from "$lib/stores"
  import Banner from "../Banner.svelte"
  import DleCard from "./DleCard.svelte"
</script>

<Banner includeSearch={true} />
<ol class="mt-4 px-1 gap-2 grid grid-cols-1 lg:grid-cols-2">
  {#each $filteredDles as dle, i (i)}
    <li>
      <DleCard {dle} i={i + 1}></DleCard>
    </li>
  {/each}
</ol>

<style lang="postcss">
  li {
    @apply flex [&:nth-child(odd)]:bg-colorCardA [&:nth-child(even)]:bg-colorCardB lg:[&:nth-child(odd)]:bg-colorCardB lg:[&:nth-child(even)]:bg-colorCardB;
  }
</style>
