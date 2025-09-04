<script>
  import { filteredDles } from "$lib/stores"
  import Banner from "../Banner.svelte"
  import DleCard from "./DleCard.svelte"
  import IconFavorite from "../Icons/IconFavorite.svelte"
    import { onMount } from "svelte"
  let randomizedDles = []
  let currentIndex = 0;  // Current position in the dataset
  let passed = 0;
  let failed = 0;
  let timer = false
  let challenge_begin = false;
  let elapsed = 0;
  function beginChallenge() {
    randomizedDles = [...$filteredDles].sort(() => Math.random() - 0.5);
    elapsed = 0;
    timer = true;
    challenge_begin = true;
  }

  function endChallenge() {
    timer = false;
    challenge_begin = false;
  }

  $: maxCardsinDom = Math.min($filteredDles.length);

  function iterate(id, status){
    randomizedDles = randomizedDles.filter(dle => dle.id !== id);
    if(status === 1) passed++;
    else failed++;
  }

  onMount(() => {
    let last_time = performance.now();
		let frame = requestAnimationFrame(function update(time) {
			frame = requestAnimationFrame(update);
      if (!timer) {
        return;
      }
			elapsed += time - last_time;
			last_time = time;
		});
    return () => cancelAnimationFrame(frame);
  });
</script>

<Banner includeSearch={true} />
<div class="text-center mb-8">
  <h1 class="text-3xl font-bold  mb-4 leading-tight">
    Challenge Mode
  </h1>
  <p class="text-lg  max-w-xl mx-auto">
    See how quickly you can complete all dailies. You'll see the dailies when you press the start button.
  </p>
</div>
<div class="grid grid-cols-2 gap-4">
<div class=" rounded-lg p-4 text-center border  mb-4">
  <div class="text-2xl font-bold mb-1">{ $filteredDles.length - randomizedDles.length}</div>
  <div class="text-sm font-medium">COMPLETED</div>
  <div class="text-xs  mt-1">out of {$filteredDles.length}</div>
</div>
<div class=" rounded-lg p-4 text-center border  mb-4">
  <div class="text-2xl font-bold mb-1"> {(elapsed / 1000).toFixed(1)}s</div>
  <div class="text-sm font-medium">Elapsed Time</div>
</div>
</div>
<div class="grid grid-cols-2 gap-4">
    <div class="rounded-lg p-4 text-center border border-green-500">
      <div class="text-2xl font-bold text-green-500 mb-1">{passed}</div>
      <div class="text-sm text-green-500 font-medium">PASSED</div>
    </div>
    <div class="rounded-lg p-4 text-center border border-red-500">
      <div class="text-2xl font-bold text-red-500 mb-1">{failed}</div>
      <div class="text-sm text-red-500 font-medium">FAILED</div>
    </div>
</div>

<div class="mt-2 width-full flex justify-center">
  {#if challenge_begin}
    <button on:click={endChallenge} class="btn mr-2">{'Give Up'}</button>
  {:else}
    <button on:click={beginChallenge} class="btn">Begin Challenge</button>
  {/if}


</div>
<ol class="card-stack mt-4 bg-colorCardC">
  {#each randomizedDles as dle, i (i)}
    <li>
       <div class="card rounded-md">

          <div class="flex-1 m-2">
            <DleCard {dle} i={i + 1}></DleCard>
          </div>

          <div class="grid grid-cols-2 mt-4 gap-2 m-2">
            <button on:click={() => iterate(dle.id, 1)} class="btn bg-green-500">Passed</button>
            <button on:click={() => iterate(dle.id, 0)}  class="btn bg-red-500">Failed</button>
          </div>
        </div>
    </li>
  {/each}
</ol>

<style lang="postcss">
  li {
    @apply flex [&:nth-child(odd)]:bg-colorCardA [&:nth-child(even)]:bg-colorCardB lg:[&:nth-child(odd)]:bg-colorCardB lg:[&:nth-child(even)]:bg-colorCardB;
  }

  .card {
    width: 100%;
  }

</style>
