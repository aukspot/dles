<script>
  import { base } from "$app/paths"

  import "../app.css"
  import dles_json from "$lib/data/dles.json"

  import {
    categories,
    categoryColors,
    dles,
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

  onMount(() => {
    $categories = [
      "Geography/History",
      "Math/Logic",
      "Movies/TV",
      "Music",
      "Prices",
      "Sports",
      "Trivia",
      "Video Games",
      "Words",
      "Miscellaneous",
    ]
    if (isLocalStorageAvailable()) {
      if (localStorage.randomCategories) {
        $randomCategories = JSON.parse(localStorage.randomCategories)
      } else {
        $randomCategories = $categories
      }
    }
  })

  $categoryColors = {
    "Geography/History": "hsl(0, 90%, 50%, 45%)",
    "Math/Logic": "hsl(20, 90%, 50%, 45%)",
    "Movies/TV": "hsl(40, 90%, 50%, 45%)",
    Music: "hsl(60, 90%, 50%, 45%)",
    Prices: "hsl(100, 90%, 50%, 45%)",
    Sports: "hsl(150, 90%, 50%, 45%)",
    Trivia: "hsl(200, 90%, 50%, 45%)",
    "Video Games": "hsl(300, 90%, 50%, 45%)",
    Words: "hsl(340, 90%, 50%, 45%)",
    Miscellaneous: "hsl(0, 0%, 49%, 45%)",
  }

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

  let loading = true
  onMount(() => {
    loading = false
    if (isLocalStorageAvailable()) {
      $infoHidden = localStorage.closedBefore !== undefined
    }
  })
</script>

<div class="w-full text-colorText bg-colorBackground">
  <div class="flex flex-col max-w-screen-xl mx-auto">
    <main
      class="flex flex-col flex-1 py-1 md:p-1 min-h-screen w-full mx-auto box-border"
    >
      <Header />
      {#if !loading && !$infoHidden}
        <Info />
      {/if}
      <slot />
    </main>
    <Footer />
  </div>
</div>
