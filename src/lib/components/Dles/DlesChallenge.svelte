<script>
  import { filteredDles } from "$lib/stores"
  import Banner from "../Banner.svelte"
  import DleCard from "./DleCard.svelte"
  let randomizedDles = []

  $: {
    randomizedDles = [...$filteredDles].sort(() => Math.random() - 0.5)
  }
</script>

<Banner includeSearch={true} />
<h1>CHALLENGE MODE ACTIVATED</h1>
<p>COMPLETED X out of {$filteredDles.length}</p>
<ol class="mt-4 px-1 gap-2 grid grid-cols-1 lg:grid-cols-1">
  {#each randomizedDles as dle, i (i)}
    <li>
       <div class="flex items-start gap-3">
          <input 
            type="checkbox" 
            class="mt-2 w-4 h-4 accent-blue-500"
            label="Mark as completed"
          />
          <div class="flex-1">
            <DleCard {dle} i={i + 1}></DleCard>
          </div>
        </div>
    </li>
  {/each}
</ol>

<style lang="postcss">
  li {
    @apply flex [&:nth-child(odd)]:bg-colorCardA [&:nth-child(even)]:bg-colorCardB lg:[&:nth-child(odd)]:bg-colorCardB lg:[&:nth-child(even)]:bg-colorCardB;
  }
</style>
