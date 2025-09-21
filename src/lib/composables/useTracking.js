import { createTrackingData, trackEvent } from "$lib/js/trackingUtils"

export function useTracking() {

  function trackFavoriteAction(dle, action, type, section, position) {
    try {
      if (typeof window === 'undefined' || !window.umami) {
        return false
      }

      // Use createTrackingData for dles-of-the-week to get position_id
      const baseTrackingData = createTrackingData(dle, action, type, section, position)

      // Override with favorite-specific fields
      const trackingData = {
        dle_name: baseTrackingData.dle_name,
        dle_id: baseTrackingData.dle_id,
        action: action,
        section: baseTrackingData.section
      }

      // Add position_id only for dles-of-the-week
      if (baseTrackingData.position_id) {
        trackingData.position_id = baseTrackingData.position_id
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