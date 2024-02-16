<script>
  import Header from "./Header.svelte";
  import Changelog from "./Changelog.svelte";
  import "./styles.css";
  import BackToTopButton from "./BackToTopButton.svelte";
</script>

<div class="app">
  <main>
    <Header />
    <slot />
    <BackToTopButton />
  </main>
  <footer>
    <div class="divider"></div>
    <Changelog />
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    max-width: 50rem;
    margin: 0 auto;
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
  }
  footer {
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
  }
</style>
