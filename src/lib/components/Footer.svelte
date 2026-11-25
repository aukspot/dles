<script>
  import { base } from "$app/paths"
</script>

<footer class="flex flex-col p-1">
  <div class="divider"></div>

  <div
    class="flex flex-wrap justify-center gap-x-4 gap-y-1 m-4 mt-1 p-1"
    data-sveltekit-reload
  >
    <a href="{base}/privacy" class="text-sm underline text-colorTextSoft"
      >Privacy Policy</a
    >
    <a
      href="{base}/privacy#privacy-choices"
      class="text-sm underline text-colorTextSoft">Your Privacy Choices</a
    >
  </div>
</footer>
