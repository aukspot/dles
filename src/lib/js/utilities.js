export function isLocalStorageAvailable() {
  let test = "test"
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

import { trackEvent } from './trackingUtils.js';

export function openInNewTab(href, trackingData = null) {
  if (trackingData) {
    const result = {
      dle_name: trackingData.dle_name,
      dle_id: trackingData.dle_id,
      click_type: trackingData.click_type,
      section: trackingData.section || 'random'
    };

    // Keep position_id only for dles-of-the-week
    if (trackingData.position_id && trackingData.section && trackingData.section.includes('dles-of-the-week')) {
      result.position_id = trackingData.position_id;
    }

    trackEvent('game-click', result);
  }

  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener",
    href: href,
  }).click()
}

export function playRandom(options, customTrackingData = null) {
  if (options.length != 0) {
    const choice = options[Math.floor(Math.random() * options.length)]

    const trackingData = customTrackingData || {
      dle_name: choice.name,
      dle_id: choice.id,
      click_type: 'random-button',
      section: 'random'
    };

    if (customTrackingData) {
      trackingData.dle_name = choice.name;
      trackingData.dle_id = choice.id;
    }

    openInNewTab(choice.url, trackingData)
  }
}

export function getCurrentDlesOfTheWeek(dlesOfWeek) {
  const now = new Date();
  const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  for (const entry of dlesOfWeek) {
    const entryDate = new Date(entry.date);
    if (entryDate < estTime) {
      return entry;
    }
  }

  return dlesOfWeek[dlesOfWeek.length - 1];
}

export function enhancedSearch(dles, query, searchByDescription = false) {
  if (!query.trim()) return dles;

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return dles.filter((dle) => {
    const searchableText = [
      dle.name,
      ...(searchByDescription ? [dle.description] : [])
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}