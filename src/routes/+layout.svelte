<script>
  import { dles, filteredDles, tagNames, tags } from "$lib/stores"

  import "../app.css"
  import Header from "$lib/components/Header.svelte"
  import Changelog from "$lib/components/Changelog.svelte"
  import BackToTopButton from "$lib/components/Buttons/BackToTopButton.svelte"
  import dles_json from "$lib/data/dles.json"
  function initializeDles() {
    $dles = dles_json
    for (let dle of $dles) {
      dle.hidden = false
    }
  }

  function initializeTags() {
    $tagNames = $dles
      .map((dle) => dle.tags)
      .flat()
      .filter((x, i, a) => a.indexOf(x) == i)
      .sort()

    $tags = {}
    for (let tag_name of $tagNames) {
      $tags[tag_name] = {
        included: false,
        excluded: false,
      }
    }
  }

  initializeDles()
  initializeTags()

  $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included)
  $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded)

  $: $filteredDles = $dles.filter((dle) => {
    let result = false
    if (includedTags.every((tag) => dle.tags.includes(tag))) {
      result = true
    }
    if (excludedTags.some((tag) => dle.tags.includes(tag))) {
      result = false
    }
    return result
  })
</script>

<div class="w-full text-colorText bg-colorBackground">
  <div
    class="flex flex-col min-h-screen justify-between max-w-screen-xl mx-auto"
  >
    <main class="flex flex-col flex-1 p-1 w-full mx-auto box-border">
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
