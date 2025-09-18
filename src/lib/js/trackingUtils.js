import { get } from 'svelte/store';
import { dlesOfTheWeek } from '$lib/stores';

const POSITION_ID_FORMATS = {
  DEDICATED_SECTION: 'dles-of-the-week',
  REGULAR_SECTION: 'regular-section-dle-of-week'
};

/**
 * Creates standardized tracking data for dles-of-the-week interactions
 */
export function createTrackingData(dle, clickType, viewType, section, position = null) {
  const trackingData = {
    game_name: dle.name,
    game_category: dle.category,
    game_id: dle.id,
    click_type: clickType,
    view_type: viewType,
    section: section
  };

  // Add position tracking
  const positionId = getPositionId(dle, section, position);
  if (positionId) {
    trackingData.position_id = positionId;
  }

  return trackingData;
}

/**
 * Determines the correct position_id for tracking
 */
function getPositionId(dle, section, position) {
  // Direct position from dedicated dles-of-the-week section
  if (position !== null && section === 'dles-of-the-week') {
    return `${POSITION_ID_FORMATS.DEDICATED_SECTION}-${position + 1}`;
  }

  // Check if it's a dle-of-the-week game in regular section
  if (section === 'regular') {
    const dleOfWeekPosition = getCurrentDleOfTheWeekPosition(dle);
    if (dleOfWeekPosition !== -1) {
      return `${POSITION_ID_FORMATS.REGULAR_SECTION}-${dleOfWeekPosition + 1}`;
    }
  }

  return null;
}

/**
 * Finds the position of a dle in the current dles-of-the-week list
 */
function getCurrentDleOfTheWeekPosition(dle) {
  const currentDlesOfTheWeek = get(dlesOfTheWeek);
  return currentDlesOfTheWeek.findIndex(weeklyDle => weeklyDle.id === dle.id);
}

/**
 * Checks if a dle is currently a dle-of-the-week
 */
export function isCurrentDleOfTheWeek(dle) {
  return getCurrentDleOfTheWeekPosition(dle) !== -1;
}

/**
 * Tracks an event with optional debug logging
 */
export function trackEvent(eventName, trackingData, debugContext = '') {
  // Uncomment for debugging:
  // if (debugContext) {
  //   console.log(`${debugContext}:`, trackingData);
  // }
  // console.log(`Final ${eventName} tracking data:`, trackingData);

  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, trackingData);
  }
}