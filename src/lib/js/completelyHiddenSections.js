import { writable } from "svelte/store"
import { browser } from "$app/environment"

const STORAGE_KEY = "completelyHiddenSections"

function createCompletelyHiddenSectionsStore() {
  const initialValue = browser
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
    : {}

  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    completelyHide: (sectionId) => {
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
    isCompletelyHidden: (sectionId, currentState) => {
      return currentState[sectionId] === true
    },
    reset: () => {
      set({})
      if (browser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}))
      }
    },
  }
}

export const completelyHiddenSections = createCompletelyHiddenSectionsStore()
