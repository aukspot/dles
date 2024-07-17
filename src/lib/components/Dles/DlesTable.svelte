<script>
  export let dlesList = []
  export let name = ""

  let isEditing = false

  function toggleEditing() {
    isEditing = !isEditing
  }

  $: editButtonText = !isEditing ? `Edit ${name}` : "Stop editing"
</script>

<div class="flex justify-center">
  <div class="w-full flex flex-col gap-1">
    <div class="m-auto">
      <button class="btn w-32 !text-sm !md:text-base" on:click={toggleEditing}
        >{editButtonText}</button
      >
    </div>

    {#if dlesList}
      {#each dlesList as dle, i}
        <div
          class="w-full p-1 flex gap-3 border border-colorTextSofter rounded text-sm md:text-base"
        >
          {#if isEditing}
            <div class="thin flex">
              <button
                class="arrow"
                aria-label="moveItemUp"
                on:click={() => {
                  if (i <= 0) {
                    return
                  }
                  let temp = dlesList[i - 1]
                  dlesList[i - 1] = dlesList[i]
                  dlesList[i] = temp
                }}
              >
                ▲
              </button>
              <button
                class="arrow"
                aria-label="moveItemDown"
                on:click={() => {
                  if (i >= dlesList.length - 1) {
                    return
                  }
                  let temp = dlesList[i + 1]
                  dlesList[i + 1] = dlesList[i]
                  dlesList[i] = temp
                }}>▼</button
              >
            </div>
          {/if}
          <div>{i + 1}</div>
          <a href={dle.url} target="_blank">
            {dle.name}
          </a>
        </div>
      {/each}
    {:else}
      List empty.
    {/if}
  </div>
</div>

<style lang="postcss">
  a {
    @apply underline;
  }
  .arrow {
    @apply text-colorTextSofter cursor-pointer px-2;
  }
</style>
