<script>
  import { page } from "$app/stores"

  export let href
  export let label
  export let routeId // Canonical route id, e.g. "/favorites"
  export let icon = null

  // Match on route id, not href: with SvelteKit's relative paths, `base` is
  // rewritten per page at prerender time (".", "..") so hrefs can't be compared.
  $: isActive = $page.route.id === routeId
</script>

<!--
  Deliberately NOT a `.btn-header` chip. The panel buttons in the row below are
  chips; these navigate, so they read as links — icon plus underlined text — to
  keep the two kinds of control visually distinct.
-->
<a {href} class="nav-link" aria-current={isActive ? "page" : undefined}>
  {#if icon}<svelte:component this={icon} />{/if}
  <span>{label}</span>
</a>

<style lang="postcss">
  .nav-link {
    @apply inline-flex items-center gap-1.5 font-mono text-xs uppercase
           underline underline-offset-2 hover:decoration-2;
  }

  .nav-link :global(svg) {
    @apply w-4 h-4 flex-shrink-0;
  }

  /* Stroke-drawn icons would otherwise fall back to a solid black fill. Scoped
     by attribute so fill-drawn icons keep their `fill: currentColor`. */
  .nav-link :global(svg[stroke]) {
    fill: none;
  }

  /* You are already here: bold and de-emphasised rather than an invitation */
  .nav-link[aria-current="page"] {
    @apply font-bold text-colorText no-underline;
  }
</style>
