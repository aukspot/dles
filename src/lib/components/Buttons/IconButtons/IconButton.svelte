<script>
  import { toolbarSelection } from "$lib/stores"
  import { onMount } from "svelte"

  export let name

  // onMount(() => {
  //   $toolbarSelection = localStorage.toolbarSelection || ""
  // })

  // $: selected = name === $toolbarSelection
</script>

<!-- <button
  class="btn-icon {selected ? 'shadow-inner shadow-colorNeutralSoft' : ''}"
  on:click={() => {
    selected ? ($toolbarSelection = "") : ($toolbarSelection = name)
    localStorage.toolbarSelection = $toolbarSelection
  }}
>
  <slot />
</button> -->
