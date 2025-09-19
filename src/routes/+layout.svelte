<script>
  import "../app.css"
  import dles_json from "$lib/data/dles.json"
  import new_dles_json from "$lib/data/new_dles.json"
  import changelog_json from "$lib/data/changelog.json"
  import dles_of_the_week_json from "$lib/data/dles_of_the_week.json"

  import {
    categories,
    categorizedDles,
    changelog,
    dles,
    newDles,
    favoriteIds,
    filteredDles,
    infoHidden,
    randomCategories,
    dlesOfTheWeek,
  } from "$lib/stores"

  import Header from "$lib/components/Header.svelte"
  import { onMount } from "svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Info from "$lib/components/Info.svelte"
  import {
    getCurrentDlesOfTheWeek,
    isLocalStorageAvailable,
  } from "$lib/js/utilities"
  import {
    migrateFavoritesToIds,
    needsFavoritesMigration
  } from "$lib/js/favoritesMigration"
  import LatestChange from "$lib/components/LatestChange.svelte"

  onMount(() => {
    if (isLocalStorageAvailable()) {
      if (localStorage.randomCategories) {
        $randomCategories = JSON.parse(localStorage.randomCategories)
      } else {
        $randomCategories = $categories
      }
      const rawFavorites = JSON.parse(localStorage.favorites || "[]")

      // Check if migration is needed
      if (needsFavoritesMigration(rawFavorites)) {
        console.log('🔄 Migrating favorites to new ID-based format...')
        const migrationResult = migrateFavoritesToIds(rawFavorites, $dles)
        $favoriteIds = migrationResult.ids
        localStorage.favorites = JSON.stringify(migrationResult.ids)

        const { report } = migrationResult
        console.log(`✅ Migration complete: ${report.migrated}/${report.total} favorites migrated`)

        if (report.failed.length > 0) {
          console.warn('⚠️ Some favorites could not be migrated:', report.failed)
          if (report.suggestions.length > 0) {
            console.log('💡 Suggestions for failed migrations:', report.suggestions)
          }
        }
      } else {
        $favoriteIds = rawFavorites
      }
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
    let dlesInCategory = $dles.filter((dle) => dle.category == category)
    $categorizedDles[category] = dlesInCategory
  }

  $: {
    for (let category of $categories) {
      let dlesInCategory = $filteredDles.filter((dle) => dle.category == category)
      $categorizedDles[category] = dlesInCategory
    }
  }

  let currentDlesOfTheWeek = getCurrentDlesOfTheWeek(dles_of_the_week_json)

  $: $filteredDles = $dles
  $: $dlesOfTheWeek = $filteredDles.filter((dle) =>
    currentDlesOfTheWeek["dle_ids"].includes(dle.id),
  )

  let loading = true
  onMount(() => {
    loading = false
    if (isLocalStorageAvailable()) {
      $infoHidden = localStorage.infoHidden
    }
  })
</script>

<div class="w-full text-colorText bg-colorBackground">
  <div class="flex flex-col max-w-screen-xl xl:max-w-[1170px] mx-auto">
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
