<script>
  import ThemeButton from "./ThemeButton.svelte"
</script>

<header>
  <div id="themeSwitcher" class="absolute top-2 left-2">
    <ThemeButton />
  </div>
  <h1 class="text-2xl text-center uppercase font-semibold font-mono mt-2">
    The Dles
  </h1>
  <p class="text-sm mt-1 text-center">A curated collection of daily games.</p>
</header>

<style>
  /* :global(body) {
    --color-bg: var(--color-bg-lightmode);
    --color-text: var(--color-text-lightmode);
    --color-accent: var(--color-accent-lightmode);
    --color-link: var(--color-link-lightmode);
    --color-link-hover: var(--color-link-hover-lightmode);
    --color-link-visited: var(--color-link-visited-lightmode);
    --color-lightbulb: var(--color-lightbulb-lightmode);
    --color-card-bg-1: var(--color-card-bg-1-lightmode);
    --color-card-bg-2: var(--color-card-bg-2-lightmode);
    --color-card-bg-3: var(--color-card-bg-3-lightmode);
    --color-red: var(--color-red-lightmode);

    background-color: var(--color-bg);
    color: var(--color-text);

    transition: background-color 0.2s;
  }
  :global(body.dark) {
    --color-bg: var(--color-bg-darkmode);
    --color-text: var(--color-text-darkmode);
    --color-accent: var(--color-accent-darkmode);
    --color-link: var(--color-link-darkmode);
    --color-link-hover: var(--color-link-hover-darkmode);
    --color-link-visited: var(--color-link-visited-darkmode);
    --color-lightbulb: var(--color-lightbulb-darkmode);
    --color-card-bg-1: var(--color-card-bg-1-darkmode);
    --color-card-bg-2: var(--color-card-bg-2-darkmode);
    --color-card-bg-3: var(--color-card-bg-3-darkmode);
    --color-red: var(--color-red-darkmode);
  }
 */
</style>
