import { writable } from "svelte/store"
import { browser } from "$app/environment"

const STORAGE_KEY = "theme"
const DARK_PREFERENCE = "(prefers-color-scheme: dark)"
const THEMES = {
  DARK: "dark",
  LIGHT: "light",
}

const prefersDarkThemes = () =>
  browser && window.matchMedia(DARK_PREFERENCE).matches

/**
 * Composable for managing theme state and persistence
 */
export function useTheme() {
  const isDark = writable(false)

  function checkTheme() {
    if (browser && typeof document !== "undefined") {
      isDark.set(document.documentElement.classList.contains(THEMES.DARK))
    }
  }

  function toggleTheme() {
    if (!browser) return

    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK,
      )
    }
    applyTheme()
    checkTheme()
  }

  function applyTheme() {
    if (!browser) return

    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT
    let currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme

    if (currentTheme && currentTheme == THEMES.DARK) {
      document.documentElement.classList.add(THEMES.DARK)
    } else {
      document.documentElement.classList.remove(THEMES.DARK)
    }
  }

  function initTheme() {
    if (!browser) return

    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      checkTheme()
    })

    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
    }

    return () => observer.disconnect()
  }

  return {
    isDark,
    toggleTheme,
    applyTheme,
    checkTheme,
    initTheme,
  }
}
