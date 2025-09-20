import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"

export function useTracking() {

  function trackFavoriteAction(dle, action, type, section, position) {
    try {
      if (typeof window === 'undefined' || !window.umami) {
        return false
      }

      const trackingData = {
        dle_name: dle.name,
        dle_id: dle.id,
        action: action,
        view_type: type,
        section: section
      }

      trackEvent('favorite-action', trackingData, `${type} ${action}`)

      return true
    } catch (error) {
      console.error('Failed to track favorite action:', error)
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
    trackGameClick,
    isTrackingAvailable
  }
}