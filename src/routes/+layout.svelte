<script>
  export const params = undefined

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
    randomCategories,
    dlesOfTheWeek,
    activePanelStore,
  } from "$lib/stores"

  import Header from "$lib/components/Header.svelte"
  import { onMount } from "svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Info from "$lib/components/Info.svelte"
  import RandomPanel from "$lib/components/RandomPanel.svelte"
  import SettingsPanel from "$lib/components/SettingsPanel.svelte"
  import HowToHelp from "$lib/components/HowToHelp.svelte"
  import SearchPanel from "$lib/components/SearchPanel.svelte"
  import PollPanel from "$lib/components/PollPanel.svelte"
  import {
    getCurrentDlesOfTheWeek,
    isLocalStorageAvailable,
  } from "$lib/js/utilities"
  import {
    migrateFavoritesToIds,
    needsFavoritesMigration,
  } from "$lib/js/favoritesMigration"
  import LatestChange from "$lib/components/LatestChange.svelte"
  import ExamplePopUp from "$lib/components/ExamplePopUp.svelte"

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
        console.log("🔄 Migrating favorites to new ID-based format...")
        const migrationResult = migrateFavoritesToIds(rawFavorites, $dles)
        $favoriteIds = migrationResult.ids
        localStorage.favorites = JSON.stringify(migrationResult.ids)

        const { report } = migrationResult
        console.log(
          `✅ Migration complete: ${report.migrated}/${report.total} favorites migrated`,
        )

        if (report.failed.length > 0) {
          console.warn(
            "⚠️ Some favorites could not be migrated:",
            report.failed,
          )
          if (report.suggestions.length > 0) {
            console.log(
              "💡 Suggestions for failed migrations:",
              report.suggestions,
            )
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
      let dlesInCategory = $filteredDles.filter(
        (dle) => dle.category == category,
      )
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
  })
</script>

<noscript>
  <style>
    .js-only {
      display: none !important;
    }
    .js-panels {
      display: none !important;
    }
    .js-buttons {
      display: none !important;
    }

    /* Hide all panels by default */
    .noscript-panel {
      display: none;
    }

    /* Show panel when targeted */
    .noscript-panel:target {
      display: block !important;
    }
  </style>
</noscript>

<div class="w-full text-colorText bg-colorBackground">
  <div class="flex flex-col max-w-screen-xl xl:max-w-[1170px] mx-auto">
    <main
      class="flex flex-col flex-1 justify-between py-1 md:p-1 min-h-screen w-full mx-auto box-border bg-colorBackground"
    >
      <div>
        <Header />
        <noscript>
          <div class="noscript-content pt-16">
            <div
              id="panel-info"
              class="noscript-panel border border-zinc-900 dark:border-zinc-200 p-4 my-4"
            >
              <div class="m-auto max-w-[36rem] p-2">
                <div class="header-section-label">INFO</div>
                <div class="divider mt-2"></div>
                <h2 class="question">What is this?</h2>
                <p class="answer">
                  A curated collection of 500+ free games that are updated
                  daily: puzzle games, word games, trivia, logic games, and
                  more! All games are completely free and
                  <em>do not require an account or subscription.</em>
                </p>
                <h2 class="question">What is a dle?</h2>
                <p class="answer">
                  A <strong>dle</strong>, or <em>daily game</em>, is generally a
                  game that changes everyday which has the same version for
                  everyone that plays, often taking inspiration from
                  <a href="https://en.wikipedia.org/wiki/Wordle" target="_blank"
                    >Wor<strong>dle</strong></a
                  >.
                </p>
                <h2 class="question">Can I help?</h2>
                <p class="answer">
                  Sure! You can
                  <a href="https://tally.so/r/mOKOea" target="_blank"
                    >suggest a dle</a
                  >
                  or
                  <a href="https://tally.so/r/wQpPpY" target="_blank"
                    >report a bug</a
                  >. If you want to support monetarily, you can
                  <a href="https://ko-fi.com/aukspot" target="_blank"
                    >donate on Ko-fi</a
                  >. Lastly, you can
                  <a href="https://github.com/aukspot/dles" target="_blank"
                    >look at the code on GitHub</a
                  >
                  and propose changes, as this project is open source.
                </p>
                <div class="divider mt-2"></div>
                <p class="answer">
                  "They call them the dles, but they are anything but." -
                  <em>Northernlion</em>
                </p>
                <div class="flex justify-center mt-6">
                  <a
                    href="#top"
                    class="btn-header hover:bg-red-200 dark:hover:bg-red-800"
                  >
                    X CLOSE
                  </a>
                </div>
              </div>
            </div>
            <div
              id="panel-help"
              class="noscript-panel border border-zinc-900 dark:border-zinc-200 p-4 my-4 pt-16"
            >
              <div class="m-auto max-w-[36rem] p-2">
                <div class="header-section-label">HOW TO HELP</div>
                <div class="divider my-2 mb-6"></div>
                <div class="link-grid">
                  <a
                    class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
                    href="https://tally.so/r/mOKOea"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Suggest a Game
                  </a>
                  <a
                    class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
                    href="https://tally.so/r/wQpPpY"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report a Bug
                  </a>
                  <a
                    class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
                    href="https://ko-fi.com/aukspot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Donate
                  </a>
                  <a
                    class="btn-action hover:bg-green-100 dark:hover:bg-green-900"
                    href="https://github.com/aukspot/dles"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
                <div class="flex justify-center mt-6">
                  <a
                    href="#top"
                    class="btn-header hover:bg-red-200 dark:hover:bg-red-800"
                  >
                    X CLOSE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </noscript>
        <div
          class="js-panels"
          class:hidden={loading}
          class:p-4={$activePanelStore}
          class:my-4={$activePanelStore}
        >
          <Info open={$activePanelStore === "info"} />
          <RandomPanel open={$activePanelStore === "random"} />
          <SettingsPanel open={$activePanelStore === "settings"} />
          <HowToHelp open={$activePanelStore === "help"} />
          <SearchPanel open={$activePanelStore === "search"} />
          <PollPanel open={$activePanelStore === "poll"} />
        </div>
        <slot />
      </div>
      <!-- <LatestChange /> -->
    </main>
    <Footer />
  </div>
  <!-- <ExamplePopUp /> -->
</div>

<style lang="postcss">
  .question {
    @apply mt-2 text-sm font-bold md:text-base text-center;
  }
  .answer {
    @apply mt-1 text-xs md:text-sm leading-snug text-center;
  }
  .link-grid {
    @apply grid grid-cols-2 gap-1;
  }
</style>
