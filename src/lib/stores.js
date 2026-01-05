import { readable, writable, derived } from "svelte/store"
import { getFavoritesFromIds } from "$lib/js/favoritesMigration"

export let dles = writable([])
export let newDles = writable([])
export let filteredDles = writable([])
export let dlesOfTheWeek = writable([])
export let changelog = writable([])
export let numColumns = writable(2)
export let toolbarSelection = writable("")
export let settings = writable({})
export let randomCategories = writable([])
export let favoriteIds = writable([])
export let favorites = derived(
  [favoriteIds, filteredDles],
  ([$favoriteIds, $filteredDles]) => getFavoritesFromIds($favoriteIds, $filteredDles)
)
export let poppedUpDle = writable("")
export let searchQuery = writable("")
export let categorizedDles = writable({})
export let categories = readable([
  "Card/Board Games",
  "Colors",
  "Estimation",
  "Food",
  "Geography",
  "History",
  "Math/Logic",
  "Movies/TV",
  "Music",
  "Science/Nature",
  "Shapes/Patterns",
  "Sports",
  "Trivia",
  "Vehicles",
  "Video Games",
  "Miscellaneous",
  "Words",
])
export let categoryColors = readable({
  "Card/Board Games": "hsl(0, 90%, 50%, 45%)",
  Colors: "hsl(24, 90%, 50%, 45%)",
  Estimation: "hsl(48, 90%, 50%, 45%)",
  Food: "hsl(72, 90%, 50%, 45%)",
  "Geography": "hsl(96, 90%, 50%, 45%)",
  "History": "hsl(108, 90%, 50%, 45%)",
  "Math/Logic": "hsl(120, 90%, 50%, 45%)",
  "Movies/TV": "hsl(144, 90%, 50%, 45%)",
  Music: "hsl(168, 90%, 50%, 45%)",
  "Science/Nature": "hsl(192, 90%, 50%, 45%)",
  "Shapes/Patterns": "hsl(216, 90%, 50%, 45%)",
  Sponsors: "hsl(226, 90%, 50%, 45%)",
  Sports: "hsl(240, 90%, 50%, 45%)",
  Trivia: "hsl(264, 90%, 50%, 45%)",
  Vehicles: "hsl(288, 90%, 50%, 45%)",
  "Video Games": "hsl(312, 90%, 50%, 45%)",
  Words: "hsl(336, 90%, 50%, 45%)",
  Miscellaneous: "hsl(0, 0%, 49%, 45%)",
})

export let sponsors = readable([
  {
    "name": "Cinema Circuit",
    "url": "https://www.wfhgames.com/cinema-circuit",
    "description": "Connect the two movie actors in the fewest links possible.",
    "category": "Movies/TV",
    "id": 542
  },
  {
    "name": "Wordamid",
    "url": "https://www.wordamid.com",
    "description": "Solve the daily word pyramid by guessing words of increasing length.",
    "category": "Words",
    "id": 564
  },
])

export { categoryRanks } from "$lib/js/categoryRanks"
export { completelyHiddenSections } from "$lib/js/completelyHiddenSections"
export let hideDiscord = writable(false)
export { pollResponses, getActivePolls, allPolls } from "$lib/js/polls"

function createActivePanelStore() {
  const isBrowser = typeof window !== 'undefined'
  const isLocalStorageAvailable = isBrowser && typeof localStorage !== 'undefined'

  const initialValue = isLocalStorageAvailable && localStorage.activePanel
    ? localStorage.activePanel
    : null

  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    set: (value) => {
      if (isLocalStorageAvailable) {
        if (value === null) {
          localStorage.removeItem('activePanel')
        } else {
          localStorage.activePanel = value
        }
      }
      set(value)
    },
    update: (fn) => {
      update((currentValue) => {
        const newValue = fn(currentValue)
        if (isLocalStorageAvailable) {
          if (newValue === null) {
            localStorage.removeItem('activePanel')
          } else {
            localStorage.activePanel = newValue
          }
        }
        return newValue
      })
    }
  }
}

export let activePanelStore = createActivePanelStore()
