<script>
  import { page } from "$app/stores";
  import ThemeButton from "./ThemeButton.svelte";
</script>

<header>
  <!-- <nav>
    <ul>
      <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
        <a href="/">Home</a>
      </li>
      <li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
        <a href="/about">About</a>
      </li>
    </ul>
  </nav> -->

  <div id="themeSwitcher">
    <ThemeButton />
  </div>
</header>

<style>
  :global(body) {
    --color-bg: var(--color-bg-lightmode);
    --color-text: var(--color-text-lightmode);
    --color-lightbulb: var(--color-lightbulb-lightmode);
    --color-card-bg-1: var(--color-card-bg-1-lightmode);
    --color-card-bg-2: var(--color-card-bg-2-lightmode);
    --color-card-bg-3: var(--color-card-bg-3-lightmode);

    background-color: var(--color-bg);
    color: var(--color-text);

    transition: background-color 0.3s;
  }
  :global(body.dark) {
    --color-bg: var(--color-bg-darkmode);
    --color-text: var(--color-text-darkmode);
    --color-lightbulb: var(--color-lightbulb-darkmode);
    --color-card-bg-1: var(--color-card-bg-1-darkmode);
    --color-card-bg-2: var(--color-card-bg-2-darkmode);
    --color-card-bg-3: var(--color-card-bg-3-darkmode);
  }
  #themeSwitcher {
    position: absolute;
    right: 10px;
  }
</style>
