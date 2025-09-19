import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"

export function useTracking() {

  function trackFavoriteAction(dle, action, type, section, position, totalFavorites) {
    try {
      if (typeof window === 'undefined' || !window.umami) {
        return false
      }

      const trackingData = createTrackingData(dle, action, type, section, position)
      trackingData.total_favorites = totalFavorites
      trackingData.action = action

      trackEvent('favorite-action', trackingData, `${type} ${action}`)

      return true
    } catch (error) {
      console.error('Failed to track favorite action:', error)
      return false
    }
  }

  
  function trackInteraction(eventName, dle, interactionType, source, position = null, additionalData = {}) {
    try {
      if (typeof window === 'undefined' || !window.umami) {
        return false
      }

      const trackingData = createTrackingData(dle, interactionType, source, 'interaction', position)

      // Merge additional data
      Object.assign(trackingData, additionalData)

      trackEvent(eventName, trackingData, `${source} ${interactionType}`)

      return true
    } catch (error) {
      console.error('Failed to track interaction:', error)
      return false
    }
  }

  function trackGameClick(dle, clickType, source, section, position) {
    try {
      if (typeof window === 'undefined' || !window.umami) {
        return false
      }

      const trackingData = createTrackingData(dle, clickType, source, section, position)
      trackEvent('game-click', trackingData, `${source} ${clickType}`)

      return true
    } catch (error) {
      console.error('Failed to track game click:', error)
      return false
    }
  }

  function isTrackingAvailable() {
    return typeof window !== 'undefined' && !!window.umami
  }

  return {
    trackFavoriteAction,
    trackInteraction,
    trackGameClick,
    isTrackingAvailable
  }
}