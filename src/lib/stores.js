import { readable, writable } from "svelte/store"

export let dles = writable([])
export let filteredDles = writable([])
export let tagNames = writable([])
export let tags = writable({})
export let changelog = writable([])
export let numColumns = writable(2)
export let toolbarSelection = writable("")
export let settings = writable({})
export let randomCategories = writable([])
export let infoHidden = writable(false)
export let favorites = writable([])
export let poppedUpDle = writable("")
export let categorizedDles = writable({})
export let categories = readable([
  "Geography/History",
  "Math/Logic",
  "Movies/TV",
  "Music",
  "Prices",
  "Sports",
  "Trivia",
  "Video Games",
  "Words",
  "Miscellaneous",
])
export let categoryColors = readable({
  "Geography/History": "hsl(0, 90%, 50%, 45%)",
  "Math/Logic": "hsl(20, 90%, 50%, 45%)",
  "Movies/TV": "hsl(40, 90%, 50%, 45%)",
  Music: "hsl(60, 90%, 50%, 45%)",
  Prices: "hsl(100, 90%, 50%, 45%)",
  Sports: "hsl(150, 90%, 50%, 45%)",
  Trivia: "hsl(200, 90%, 50%, 45%)",
  "Video Games": "hsl(300, 90%, 50%, 45%)",
  Words: "hsl(340, 90%, 50%, 45%)",
  Miscellaneous: "hsl(0, 0%, 49%, 45%)",
})
