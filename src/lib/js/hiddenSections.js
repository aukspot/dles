import { writable } from "svelte/store"
import { browser } from "$app/environment"

const STORAGE_KEY = "hiddenSections"

function createHiddenSectionsStore() {
  const initialValue = browser
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
    : {}

  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    hide: (sectionId) => {
      update((sections) => {
        const newSections = { ...sections, [sectionId]: true }
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newSections))
        }
        return newSections
      })
    },
    show: (sectionId) => {
      update((sections) => {
        const newSections = { ...sections, [sectionId]: false }
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newSections))
        }
        return newSections
      })
    },
    isHidden: (sectionId, currentState) => {
      return currentState[sectionId] === true
    },
  }
}

export const hiddenSections = createHiddenSectionsStore()
