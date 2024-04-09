<script>
  import { toolbarSelection } from "$lib/stores"
  export let name

  $: selected = name === $toolbarSelection
</script>

<button
  class="btn-icon {selected ? 'shadow-inner shadow-colorNeutralSoft' : ''}"
  on:click={() => {
    selected ? ($toolbarSelection = "") : ($toolbarSelection = name)
  }}
>
  <slot />
</button>
