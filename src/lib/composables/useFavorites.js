import { favoriteIds } from "$lib/stores"
import { isLocalStorageAvailable } from "$lib/js/utilities"
import { get } from "svelte/store"

export function useFavorites() {

  function isFavorited(dle) {
    const currentFavorites = get(favoriteIds)
    return currentFavorites.includes(dle.id)
  }

  function addToFavorites(dle) {
    try {
      const currentFavorites = get(favoriteIds)

      if (currentFavorites.includes(dle.id)) {
        return true
      }

      favoriteIds.update(favorites => [...favorites, dle.id])

      if (isLocalStorageAvailable()) {
        localStorage.favorites = JSON.stringify(get(favoriteIds))
      }

      return true
    } catch (error) {
      console.error('Failed to add favorite:', error)
      return false
    }
  }

  function removeFromFavorites(dle) {
    try {
      favoriteIds.update(favorites => favorites.filter(id => id !== dle.id))

      if (isLocalStorageAvailable()) {
        localStorage.favorites = JSON.stringify(get(favoriteIds))
      }

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

    return {
      success,
      action: wasInFavorites ? 'unfavorite' : 'favorite',
      wasInFavorites,
      totalFavorites: get(favoriteIds).length
    }
  }

  function getFavoritesCount() {
    return get(favoriteIds).length
  }

  return {
    isFavorited,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    getFavoritesCount
  }
}