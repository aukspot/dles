<script>
  export let selected;
</script>

<button
  class="btn-icon {selected ? 'shadow-inner shadow-colorNeutralSoft' : ''}"
>
  <slot />
</button>
