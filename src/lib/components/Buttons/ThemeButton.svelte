<script>
  import { onMount } from "svelte"
  import IconLightbulb from "$lib/components/Icons/IconLightbulb.svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"

  const STORAGE_KEY = "theme"
  const DARK_PREFERENCE = "(prefers-color-scheme: dark)"

  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  }

  const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches

  const toggleTheme = () => {
    if (!isLocalStorageAvailable()) {
      applyTheme()
      return
    }
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
  }

  const applyTheme = () => {
    if (!isLocalStorageAvailable()) {
      document.body.classList.toggle(THEMES.DARK)
      return
    }

    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT
    let currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme

    if (currentTheme && currentTheme == THEMES.DARK) {
      document.body.classList.add(THEMES.DARK)
    } else {
      document.body.classList.remove(THEMES.DARK)
    }
  }

  onMount(applyTheme)
</script>

<button
  on:click={toggleTheme}
  class="flex justify-end align-bottom rounded-md btn-menu-item"
>
  <IconLightbulb />
  <div>Toggle theme</div>
</button>
