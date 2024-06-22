<script>
  import { changelog } from "$lib/stores"
</script>

<svelte:head>
  <title>Changelog - The Dles</title>
  <meta name="description" content="Changelog for The Dles." />
</svelte:head>

<h2 class="my-3 text-2xl text-center">Changelog</h2>
<div id="changelog">
  {#each $changelog as log}
    <table class="mb-8">
      <th id={log.date} class="text-xl">{log.date}</th>
      <tr class="text-center text-sm md:text-base">{@html log.description}</tr>
      {#if "dles added" in log}
        <tr>
          <table class="w-[92%] mx-auto">
            <thead>
              <tr>
                <th colspan="2">dles added</th>
              </tr>
              <tr>
                <th class="head-small">name</th>
                <th class="head-small">url</th>
              </tr>
            </thead>
            {#each log["dles added"] as dleAdded}
              <tr>
                <td class="text-left">{dleAdded.name}</td>
                <td
                  ><a href={dleAdded.url} target="_blank">{dleAdded.url}</a></td
                >
              </tr>
            {/each}
          </table>
        </tr>
      {/if}
      {#if "dles removed" in log}
        <tr>
          <table class="w-[92%] mx-auto">
            <thead>
              <tr>
                <th colspan="2">dles removed</th>
              </tr>
              <tr>
                <th class="head-small">name</th>
                <th class="head-small">url</th>
              </tr>
            </thead>
            {#each log["dles removed"] as dleRemoved}
              <tr>
                <td class="text-left">{dleRemoved.name}</td>
                <td
                  ><a href={dleRemoved.url} target="_blank">{dleRemoved.url}</a
                  ></td
                >
              </tr>
            {/each}
          </table>
        </tr>
      {/if}
    </table>
  {/each}
</div>

<style lang="postcss">
  #changelog {
    @apply max-w-[40rem] m-auto;
  }
  th,
  td {
    @apply p-1 border border-colorTextSoft border-collapse;
  }
  .head-small {
    @apply bg-colorBackground;
  }
</style>
