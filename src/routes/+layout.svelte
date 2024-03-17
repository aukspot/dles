<script>
  import "../app.css"
  import "./styles.css"
  import Header from "$lib/components/Header.svelte"
  import Changelog from "$lib/components/Changelog.svelte"
  import BackToTopButton from "$lib/components/Buttons/BackToTopButton.svelte"
</script>

<div class="w-full text-colorText bg-colorBackground">
  <div
    class="flex flex-col min-h-screen justify-between max-w-screen-xl mx-auto"
  >
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
