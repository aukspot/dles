import { writable } from "svelte/store"
import { browser } from "$app/environment"

const STORAGE_KEY = "categoryRanks"

const defaultRanks = {
  "Card/Board Games": 1,
  Colors: 2,
  Estimation: 3,
  Food: 4,
  Geography: 5,
  History: 6,
  "Math/Logic": 7,
  "Movies/TV": 8,
  Music: 9,
  "Science/Nature": 10,
  "Shapes/Patterns": 11,
  Sports: 12,
  Trivia: 13,
  Vehicles: 14,
  "Video Games": 15,
  Miscellaneous: 16,
  Words: 17,
}

function createCategoryRanksStore() {
  const initialValue = browser
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultRanks))
    : defaultRanks

  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    setRank: (categoryName, rankNumber) => {
      update((ranks) => {
        const newRanks = { ...ranks, [categoryName]: rankNumber }
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newRanks))
        }
        return newRanks
      })
    },
    bulkSetRanks: (newRanks) => {
      set(newRanks)
      if (browser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRanks))
      }
    },
    reset: () => {
      set(defaultRanks)
      if (browser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRanks))
      }
    },
  }
}

export const categoryRanks = createCategoryRanksStore()
