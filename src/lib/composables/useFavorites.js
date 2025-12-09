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

  function removeFromFavorites(dle) {
    try {
      const currentFavorites = pendingFavorites !== null ? pendingFavorites : get(favoriteIds)
      const newFavorites = currentFavorites.filter(id => id !== dle.id)

      debouncedUpdateFavorites(newFavorites)

      return true
    } catch (error) {
      console.error('Failed to remove favorite:', error)
      return false
    }
  }

  function toggleFavorite(dle) {
    const wasInFavorites = isFavorited(dle)
    let success = false

    if (wasInFavorites) {
      success = removeFromFavorites(dle)
    } else {
      success = addToFavorites(dle)
    }

    // Use pending favorites count if available for immediate feedback
    const currentCount = pendingFavorites !== null ? pendingFavorites.length : get(favoriteIds).length

    return {
      success,
      action: wasInFavorites ? 'unfavorite' : 'favorite',
      wasInFavorites,
      totalFavorites: currentCount
    }
  }

  function getFavoritesCount() {
    return pendingFavorites !== null ? pendingFavorites.length : get(favoriteIds).length
  }

  return {
    isFavorited,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    getFavoritesCount
  }
}