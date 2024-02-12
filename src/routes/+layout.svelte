<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app">
  <main>
    <Header />
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 60rem;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
  }
</style>
