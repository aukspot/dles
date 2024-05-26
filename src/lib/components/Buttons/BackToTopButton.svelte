<script>
  function scrolltoTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  function showBackToTop(e) {
    const backToTopButton = document.getElementById("backToTop")
    const rootElement = document.documentElement

    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if (window.scrollY > 600 && rootElement.scrollTop / scrollTotal > 0.8) {
      backToTopButton.classList.add("showBtn")
    } else {
      backToTopButton.classList.remove("showBtn")
    }
  }
</script>

<svelte:document on:scroll={showBackToTop} />

<div class="flex justify-center mt-4 mb-2">
  <button
    on:click={scrolltoTop}
    id="backToTop"
    class="btn !py-2 !px-4 text-sm md:text-base">Back to top</button
  >
</div>

<style>
  button {
    z-index: 100;
    opacity: 0;
    display: none;
    transition: opacity 0.5s ease;
  }
</style>
