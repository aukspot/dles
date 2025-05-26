<script>
  import "../app.css"
  import dles_json from "$lib/data/dles.json"
  import new_dles_json from "$lib/data/new_dles.json"
  import changelog_json from "$lib/data/changelog.json"

  import {
    categories,
    categorizedDles,
    changelog,
    dles,
    newDles,
    favorites,
    filteredDles,
    infoHidden,
    randomCategories,
    tagNames,
    tags,
  } from "$lib/stores"

  import Header from "$lib/components/Header.svelte"
  import { onMount } from "svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Info from "$lib/components/Info.svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"
  import LatestChange from "$lib/components/LatestChange.svelte"

  onMount(() => {
    if (isLocalStorageAvailable()) {
      if (localStorage.randomCategories) {
        $randomCategories = JSON.parse(localStorage.randomCategories)
      } else {
        $randomCategories = $categories
      }
      $favorites = JSON.parse(localStorage.favorites || "[]")
    }
  })

  function initializeDles() {
    $dles = dles_json
    for (let dle of $dles) {
      dle.hidden = false
    }
  }

  function initializeNewDles() {
    $newDles = new_dles_json
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

  function initializeChangelog() {
    $changelog = changelog_json
  }

  initializeDles()
  initializeNewDles()
  initializeTags()
  initializeChangelog()

  for (let category of $categories) {
    $categorizedDles[category] = $dles.filter((dle) => dle.category == category)
  }

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

  $: {
    for (let category of $categories) {
      $categorizedDles[category] = $filteredDles.filter(
        (dle) => dle.category == category,
      )
    }
  }

  let loading = true
  onMount(() => {
    loading = false
    if (isLocalStorageAvailable()) {
      $infoHidden = localStorage.infoHidden
    }
  })
</script>

<div class="w-full text-colorText bg-colorCardA first">
  <div class="flex flex-col max-w-screen-xl mx-auto">
    <main
      class="flex flex-col flex-1 justify-between py-1 md:p-1 min-h-screen w-full mx-auto box-border bg-colorBackground"
    >
      <div>
        <Header />
        {#if !loading && !$infoHidden}
          <Info />
        {/if}
        <slot />
      </div>
      <LatestChange />
    </main>
    <Footer />
  </div>
</div>

<style lang="postcss">
  .first {
    background-image: radial-gradient(
      circle at 2px 2px, 
      color-mix(in srgb, theme('colors.colorText') 5%, transparent) 2px, 
      transparent 0
    );
    background-size: 25px 25px;
  }

  main {
  
  }
</style>