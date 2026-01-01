<script>
  export let title
  export let icon = null
  export let color = null
  export let rainbow = false

  let className = ""
  export { className as class }
</script>

<div
  class="labelContainer {rainbow ? 'rainbow-gradient' : ''} {className}"
  style={!rainbow && color ? `background-color: ${color}` : ''}
>
  <div class="label">
    {#if icon}
      <div class="section-icon">
        <svelte:component this={icon} />
      </div>
    {/if}
    {title}
  </div>
</div>

<style lang="postcss">
  .labelContainer {
    @apply py-2 px-2 bg-colorCardB border-b-2 border-colorText;
  }

  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-sm md:text-base lg:text-lg text-colorText font-semibold;
  }
</style>
