<script>
  import { toolbarSelection } from "../../../../stores"
  export let name
</script>

<button
  class="btn-icon {name === $toolbarSelection
    ? 'shadow-inner shadow-colorNeutralSoft'
    : ''}"
  on:click={() => {
    $toolbarSelection = name
  }}
>
  <slot />
</button>
