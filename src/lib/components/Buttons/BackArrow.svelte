<script>
  import { base } from "$app/paths"
  import { afterNavigate } from "$app/navigation"

  export let href = `${base}/`
  export let label = "Go back home"

  let cameFromSite = false
  afterNavigate(({ from }) => {
    cameFromSite = Boolean(from)
  })

  function goBack(event) {
    if (!cameFromSite) return
    event.preventDefault()
    history.back()
  }
</script>

<a class="back-arrow" {href} on:click={goBack} aria-label={label}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
</a>

<style lang="postcss">
  .back-arrow {
    @apply w-6 h-6 text-colorTextSoft hover:text-colorText transition-colors;
  }

  .back-arrow svg {
    @apply w-full h-full;
  }
</style>
