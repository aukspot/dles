<script>
  import changelog from "$lib/data/changelog.json"

  const latestChange = changelog[0]
</script>

<div class="mt-4">
  <h2 class="text-center text-base">
    Last updated <em>{latestChange.date}</em>
  </h2>
  <!-- <div class="text-sm text-center flex flex-col justify-center">
    {@html latestChange.description}
  </div> -->
</div>
