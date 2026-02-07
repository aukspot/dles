import { hiddenDleIds, favoriteIds } from "$lib/stores"
import { isLocalStorageAvailable } from "$lib/js/utilities"
import { useFavorites } from "$lib/composables/useFavorites.js"
import { get } from "svelte/store"

let updateTimer = null
let pendingHiddenDles = null

function flushHiddenDleUpdates() {
  if (pendingHiddenDles !== null) {
    hiddenDleIds.set(pendingHiddenDles)

    if (isLocalStorageAvailable()) {
      localStorage.hiddenDles = JSON.stringify(pendingHiddenDles)
    }

    pendingHiddenDles = null
  }
}

function debouncedUpdateHiddenDles(newHiddenDles) {
  pendingHiddenDles = newHiddenDles

  if (updateTimer) {
    clearTimeout(updateTimer)
  }

  updateTimer = setTimeout(() => {
    flushHiddenDleUpdates()
    updateTimer = null
  }, 15) // 15ms debounce - fast enough to feel instant but batches rapid toggles
}

export function useHiddenDles() {

  function isHidden(dle) {
    // Check pending updates first for immediate UI feedback
    if (pendingHiddenDles !== null) {
      return pendingHiddenDles.includes(dle.id)
    }
    const currentHiddenDles = get(hiddenDleIds)
    return currentHiddenDles.includes(dle.id)
  }

  function hideDle(dle) {
    try {
      const currentHiddenDles = pendingHiddenDles !== null ? pendingHiddenDles : get(hiddenDleIds)

      if (currentHiddenDles.includes(dle.id)) {
        return { success: true, previousFavoriteIndex: -1 }
      }

      const newHiddenDles = [...currentHiddenDles, dle.id]
      debouncedUpdateHiddenDles(newHiddenDles)

      // Also remove from favorites if it was favorited
      let previousFavoriteIndex = -1
      const currentFavorites = get(favoriteIds)
      if (currentFavorites.includes(dle.id)) {
        previousFavoriteIndex = currentFavorites.indexOf(dle.id)
        const favoritesComposable = useFavorites()
        favoritesComposable.removeFromFavorites(dle)
      }

      return { success: true, previousFavoriteIndex }
    } catch (error) {
      console.error('Failed to hide dle:', error)
      return { success: false, previousFavoriteIndex: -1 }
    }
  }

  function unhideDle(dle) {
    try {
      const currentHiddenDles = pendingHiddenDles !== null ? pendingHiddenDles : get(hiddenDleIds)
      const newHiddenDles = currentHiddenDles.filter(id => id !== dle.id)

      debouncedUpdateHiddenDles(newHiddenDles)

      return true
    } catch (error) {
      console.error('Failed to unhide dle:', error)
      return false
    }
  }

  function toggleHidden(dle) {
    const wasHidden = isHidden(dle)
    const wasFavorited = !wasHidden && get(favoriteIds).includes(dle.id)
    let success = false
    let previousFavoriteIndex = -1

    if (wasHidden) {
      success = unhideDle(dle)
    } else {
      const result = hideDle(dle)
      success = result.success
      previousFavoriteIndex = result.previousFavoriteIndex
    }

    // Use pending hidden dles count if available for immediate feedback
    const currentCount = pendingHiddenDles !== null ? pendingHiddenDles.length : get(hiddenDleIds).length

    return {
      success,
      action: wasHidden ? 'unhide' : 'hide',
      wasHidden,
      wasFavorited,
      previousFavoriteIndex,
      totalHidden: currentCount
    }
  }

  function getHiddenCount() {
    return pendingHiddenDles !== null ? pendingHiddenDles.length : get(hiddenDleIds).length
  }

  function resetHiddenDles() {
    const previousHiddenDles = get(hiddenDleIds)
    hiddenDleIds.set([])
    if (isLocalStorageAvailable()) {
      localStorage.hiddenDles = JSON.stringify([])
    }
    return previousHiddenDles
  }

  function restoreHiddenDles(dleIds) {
    hiddenDleIds.set(dleIds)
    if (isLocalStorageAvailable()) {
      localStorage.hiddenDles = JSON.stringify(dleIds)
    }
  }

  return {
    isHidden,
    hideDle,
    unhideDle,
    toggleHidden,
    getHiddenCount,
    resetHiddenDles,
    restoreHiddenDles
  }
}
