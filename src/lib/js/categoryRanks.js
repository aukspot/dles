import { writable } from "svelte/store"
import { browser } from "$app/environment"

const STORAGE_KEY = "categoryRanks"

export const defaultRanks = {
  Arcade: 1,
  "Card/Board Games": 2,
  Colors: 3,
  Estimation: 4,
  Food: 5,
  Geography: 6,
  History: 7,
  "Math/Logic": 8,
  "Movies/TV": 9,
  Music: 10,
  Novelty: 11,
  "Science/Nature": 12,
  "Shapes/Patterns": 13,
  Sports: 14,
  Trivia: 15,
  Vehicles: 16,
  "Video Games": 17,
  Miscellaneous: 18,
  Words: 19,
}

function mergeWithDefaults(storedRanks) {
  const defaultOrder = Object.keys(defaultRanks).sort(
    (a, b) => defaultRanks[a] - defaultRanks[b],
  )
  const order = Object.keys(storedRanks)
    .filter((category) => category in defaultRanks)
    .sort((a, b) => storedRanks[a] - storedRanks[b])

  defaultOrder.forEach((category, i) => {
    if (order.includes(category)) return
    const previous = defaultOrder.slice(0, i).reverse().find((c) => order.includes(c))
    order.splice(previous ? order.indexOf(previous) + 1 : 0, 0, category)
  })

  return Object.fromEntries(order.map((category, i) => [category, i + 1]))
}

function loadRanks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (stored && typeof stored === "object") {
      const merged = mergeWithDefaults(stored)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      return merged
    }
  } catch { }
  return defaultRanks
}

function createCategoryRanksStore() {
  const initialValue = browser ? loadRanks() : defaultRanks

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
