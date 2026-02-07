import { playedDleIds, autoMarkPlayed } from "$lib/stores"
import { isLocalStorageAvailable } from "$lib/js/utilities"
import { get } from "svelte/store"

export function usePlayedDles() {

  function isPlayed(dle) {
    const currentPlayedDles = get(playedDleIds)
    return currentPlayedDles.includes(dle.id)
  }

  function markAsPlayed(dle, force = false) {
    // Check if auto-mark is enabled (unless force is true)
    if (!force && !get(autoMarkPlayed)) {
      return false
    }

    try {
      const currentPlayedDles = get(playedDleIds)

      if (currentPlayedDles.includes(dle.id)) {
        return true // Already marked
      }

      const newPlayedDles = [...currentPlayedDles, dle.id]
      playedDleIds.set(newPlayedDles)

      if (isLocalStorageAvailable()) {
        localStorage.playedDles = JSON.stringify(newPlayedDles)
      }

      return true
    } catch (error) {
      console.error('Failed to mark dle as played:', error)
      return false
    }
  }

  function unmarkAsPlayed(dle) {
    try {
      const currentPlayedDles = get(playedDleIds)
      const newPlayedDles = currentPlayedDles.filter(id => id !== dle.id)

      playedDleIds.set(newPlayedDles)

      if (isLocalStorageAvailable()) {
        localStorage.playedDles = JSON.stringify(newPlayedDles)
      }

      return true
    } catch (error) {
      console.error('Failed to unmark dle as played:', error)
      return false
    }
  }

  function resetPlayedDles() {
    const previousPlayedDles = get(playedDleIds)
    playedDleIds.set([])
    if (isLocalStorageAvailable()) {
      localStorage.playedDles = JSON.stringify([])
    }
    return previousPlayedDles
  }

  function getPlayedCount() {
    return get(playedDleIds).length
  }

  return {
    isPlayed,
    markAsPlayed,
    unmarkAsPlayed,
    resetPlayedDles,
    getPlayedCount
  }
}
