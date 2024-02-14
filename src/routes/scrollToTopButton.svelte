<script>
  function scrolltoTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function showBackToTop(e) {
    const backToTopButton = document.getElementById("backToTop");
    const rootElement = document.documentElement;

    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (window.scrollY > 50 && rootElement.scrollTop / scrollTotal > 0.8) {
      backToTopButton.classList.add("showBtn");
    } else {
      backToTopButton.classList.remove("showBtn");
    }
  }
</script>

<svelte:document on:scroll={showBackToTop} />

<div>
  <button
    on:click={scrolltoTop}
    id="backToTop"
    class="scrollToTopBtn filterButton">Back to top</button
  >
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  button {
    padding: 0.4rem 0.8rem;
    z-index: 100;
    opacity: 0;
    transition: all 0.5s ease;
  }
</style>
