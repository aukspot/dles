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

  function initializeChangelog() {
    $changelog = changelog_json
  }

  initializeDles()
  initializeNewDles()
  initializeChangelog()

  for (let category of $categories) {
    $categorizedDles[category] = $dles.filter((dle) => dle.category == category)
  }

  $: {
    for (let category of $categories) {
      $categorizedDles[category] = $filteredDles.filter(
        (dle) => dle.category == category,
      )
    }
  }

  $: $filteredDles = $dles

  let loading = true
  onMount(() => {
    loading = false
    if (isLocalStorageAvailable()) {
      $infoHidden = localStorage.infoHidden
    }
  })
</script>

<div class="w-full text-colorText bg-colorBackground">
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
