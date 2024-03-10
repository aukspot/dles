<script>
  import "../app.css"
  import "./styles.css"
  import Header from "./Header.svelte"
  import Changelog from "./Changelog.svelte"
  import BackToTopButton from "./BackToTopButton.svelte"
</script>

<div
  class="w-full text-slate-900 bg-slate-100 dark:text-dark-text dark:bg-dark-bg"
>
  <div class="flex flex-col min-h-screen justify-between max-w-3xl mx-auto">
    <main class="relative flex flex-col flex-1 p-1 w-full mx-auto box-border">
      <Header />
      <slot />
      <BackToTopButton />
    </main>
    <footer class="flex flex-col p-1">
      <div class="divider"></div>
      <Changelog />
    </footer>
  </div>
</div>
