<script>
  import Banner from "$lib/components/Banner.svelte"
  import { changelog } from "$lib/stores"
</script>

<svelte:head>
  <title>Changelog - The Dles</title>
  <meta name="description" content="Changelog for The Dles." />
</svelte:head>

<Banner />
<h2 class="my-8 text-2xl text-center">Changelog</h2>
<div id="changelog">
  {#each $changelog as log}
    <table class="mb-10 bg-colorCardC">
      <th id={log.date} class="text-xl">{log.date}</th>
      <tr class="text-center text-sm md:text-base">{@html log.description}</tr>
      {#if "dles added" in log}
        <tr>
          <table class="w-[92%] mx-auto">
            <thead>
              <tr>
                <th colspan="2">dles added</th>
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
            </thead>
            {#each log["dles removed"] as dleRemoved}
              <tr>
                <td colspan="2">
                  <div><strong>name</strong>: {dleRemoved.name}</div>

                  <div>
                    <strong>url</strong>:
                    <a href={dleRemoved.url} target="_blank">{dleRemoved.url}</a
                    >
                  </div>
                  {#if dleRemoved.reason}
                    <div>
                      <strong>reason removed</strong>: {dleRemoved.reason}
                    </div>
                  {/if}
                </td>
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
  table {
    table-layout: fixed;
  }
  th,
  td {
    @apply p-[5px] border border-colorTextSoftest border-collapse;
  }
  a {
    @apply break-words;
  }

  .head-small {
    @apply bg-colorBackground;
  }
</style>
