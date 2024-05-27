<script>
  import { base } from "$app/paths"
  import changelog from "$lib/data/changelog.json"

  const latestChange = changelog[0]
</script>

<div class="mt-2">
  <h2 class="text-center text-lg underline underline-offset-2">
    Latest changes
  </h2>
  <div class="text-center">({latestChange.date})</div>
  <div class="text-sm flex justify-center">
    {@html latestChange.description}
  </div>
  <!-- <a class="flex justify-center" href="{base}/changelog">View full changelog</a> -->
</div>
