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
export let hiddenDleIds = writable([])
export let hiddenDleIdsSet = derived(
  hiddenDleIds,
  ($hiddenDleIds) => new Set($hiddenDleIds)
)
export let playedDleIds = writable([])
export let playedDleIdsSet = derived(
  playedDleIds,
  ($playedDleIds) => new Set($playedDleIds)
)
export let autoMarkPlayed = writable(false)
export let autoResetPlayed = writable(true)
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
  New: "hsl(180, 90%, 40%, 45%)",
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

import sponsorsData from "$lib/data/sponsors.json"
export let sponsors = readable(sponsorsData)

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

// Favorites view mode store (synced with localStorage)
function createFavoritesViewStore() {
  const isBrowser = typeof window !== 'undefined'
  const isLocalStorageAvailable = isBrowser && typeof localStorage !== 'undefined'

  const initialViewMode = isLocalStorageAvailable
    ? (localStorage.getItem('favoritesViewMode') || 'row')
    : 'row'
  const initialToggleSeen = isLocalStorageAvailable
    ? !!localStorage.getItem('favoritesViewToggleSeen')
    : false

  const viewMode = writable(initialViewMode)
  const showNewBadge = writable(!initialToggleSeen)

  function toggle() {
    viewMode.update((current) => {
      const next = current === 'row' ? 'grid' : 'row'
      if (isLocalStorageAvailable) {
        localStorage.setItem('favoritesViewMode', next)
      }
      return next
    })
    showNewBadge.update((current) => {
      if (current && isLocalStorageAvailable) {
        localStorage.setItem('favoritesViewToggleSeen', 'true')
      }
      return false
    })
  }

  return { viewMode, showNewBadge, toggle }
}

export const favoritesView = createFavoritesViewStore()

// Modal visibility stores
export let showHiddenDlesModal = writable(false)
export let showMarkedDlesModal = writable(false)
export let showFavoritesSettingsModal = writable(false)
