<script>
  export let selected;
</script>

<button class="btn-icon {selected ? 'shadow-inner' : 0}">
  <slot />
</button>
