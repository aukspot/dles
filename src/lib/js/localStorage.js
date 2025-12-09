import { browser } from "$app/environment"

/**
 * Wrapper for localStorage operations with error handling and SSR safety
 */

/**
 * Check if localStorage is available
 * @returns {boolean}
 */
export function isLocalStorageAvailable() {
  if (!browser) return false

  try {
    const test = "__localStorage_test__"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Get an item from localStorage
 * @param {string} key - The key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or default value
 */
export function getLocalStorage(key, defaultValue = null) {
  if (!isLocalStorageAvailable()) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item !== null ? item : defaultValue
  } catch (e) {
    console.error(`Error reading localStorage key "${key}":`, e)
    return defaultValue
  }
}

/**
 * Get a JSON item from localStorage
 * @param {string} key - The key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The parsed value or default value
 */
export function getLocalStorageJSON(key, defaultValue = null) {
  if (!isLocalStorageAvailable()) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) : defaultValue
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e)
    return defaultValue
  }
}

/**
 * Set an item in localStorage
 * @param {string} key - The key to set
 * @param {string} value - The value to store
 * @returns {boolean} True if successful
 */
export function setLocalStorage(key, value) {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.setItem(key, value)
    return true
  } catch (e) {
    console.error(`Error writing localStorage key "${key}":`, e)
    return false
  }
}

/**
 * Set a JSON item in localStorage
 * @param {string} key - The key to set
 * @param {*} value - The value to store (will be JSON.stringified)
 * @returns {boolean} True if successful
 */
export function setLocalStorageJSON(key, value) {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error(`Error writing localStorage key "${key}":`, e)
    return false
  }
}

/**
 * Remove an item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} True if successful
 */
export function removeLocalStorage(key) {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e)
    return false
  }
}

/**
 * Clear all items from localStorage
 * @returns {boolean} True if successful
 */
export function clearLocalStorage() {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.clear()
    return true
  } catch (e) {
    console.error("Error clearing localStorage:", e)
    return false
  }
}
