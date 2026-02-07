import { favoriteIds } from "$lib/stores"
import { isLocalStorageAvailable } from "$lib/js/utilities"
import { get } from "svelte/store"

// Debounce timer for batching favorite updates
let updateTimer = null
let pendingFavorites = null

function flushFavoriteUpdates() {
  if (pendingFavorites !== null) {
    favoriteIds.set(pendingFavorites)

    if (isLocalStorageAvailable()) {
      localStorage.favorites = JSON.stringify(pendingFavorites)
    }

    pendingFavorites = null
  }
}

function debouncedUpdateFavorites(newFavorites) {
  pendingFavorites = newFavorites

  if (updateTimer) {
    clearTimeout(updateTimer)
  }

  updateTimer = setTimeout(() => {
    flushFavoriteUpdates()
    updateTimer = null
  }, 15) // 15ms debounce - fast enough to feel instant but batches rapid toggles
}

export function useFavorites() {

  function isFavorited(dle) {
    // Check pending updates first for immediate UI feedback
    if (pendingFavorites !== null) {
      return pendingFavorites.includes(dle.id)
    }
    const currentFavorites = get(favoriteIds)
    return currentFavorites.includes(dle.id)
  }

  function addToFavorites(dle) {
    try {
      const currentFavorites = pendingFavorites !== null ? pendingFavorites : get(favoriteIds)

      if (currentFavorites.includes(dle.id)) {
        return true
      }

      const newFavorites = [...currentFavorites, dle.id]
      debouncedUpdateFavorites(newFavorites)

      return true
    } catch (error) {
      console.error('Failed to add favorite:', error)
      return false
    }
  }

  function insertFavoriteAt(dle, index) {
    try {
      const currentFavorites = pendingFavorites !== null ? pendingFavorites : get(favoriteIds)

      if (currentFavorites.includes(dle.id)) {
        return true
      }

      const newFavorites = [...currentFavorites]
      const safeIndex = Math.min(index, newFavorites.length)
      newFavorites.splice(safeIndex, 0, dle.id)
      debouncedUpdateFavorites(newFavorites)

      return true
    } catch (error) {
      console.error('Failed to insert favorite:', error)
      return false
    }
  }

  function removeFromFavorites(dle) {
    try {
      const currentFavorites = pendingFavorites !== null ? pendingFavorites : get(favoriteIds)
      const index = currentFavorites.indexOf(dle.id)
      const newFavorites = currentFavorites.filter(id => id !== dle.id)

      debouncedUpdateFavorites(newFavorites)

      return { success: true, index }
    } catch (error) {
      console.error('Failed to remove favorite:', error)
      return { success: false, index: -1 }
    }
  }

  function toggleFavorite(dle) {
    const wasInFavorites = isFavorited(dle)
    let success = false
    let previousIndex = -1

    if (wasInFavorites) {
      const result = removeFromFavorites(dle)
      success = result.success
      previousIndex = result.index
    } else {
      success = addToFavorites(dle)
    }

    // Use pending favorites count if available for immediate feedback
    const currentCount = pendingFavorites !== null ? pendingFavorites.length : get(favoriteIds).length

    return {
      success,
      action: wasInFavorites ? 'unfavorite' : 'favorite',
      wasInFavorites,
      previousIndex,
      totalFavorites: currentCount
    }
  }

  function getFavoritesCount() {
    return pendingFavorites !== null ? pendingFavorites.length : get(favoriteIds).length
  }

  return {
    isFavorited,
    addToFavorites,
    insertFavoriteAt,
    removeFromFavorites,
    toggleFavorite,
    getFavoritesCount
  }
}