<script>
  import IconLightbulb from "./IconLightbulb.svelte";

  let isDark = true;

  function toggle() {
    window.document.body.classList.toggle("dark-mode");
    isDark = window.document.body.classList.contains("dark-mode");
  }
</script>

<button class="themeButton" on:click={toggle}>
  <IconLightbulb />
</button>

<style>
  button {
    color: var(--color-lightbulb-lightmode);
    background-color: var(--color-lightbulb-darkmode);
    border: none;
    border-radius: 4px;
    padding: 0.25rem;
  }
  :global(body.dark-mode) button {
    color: var(--color-lightbulb-darkmode);
    background-color: var(--color-lightbulb-lightmode);
  }
  button:hover {
    cursor: pointer;
  }
</style>
