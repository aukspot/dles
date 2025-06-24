import { readable, writable } from "svelte/store"

export let dles = writable([])
export let newDles = writable([])
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
export let searchQuery = writable("")
export let categorizedDles = writable({})
export let categories = readable([
  "Card/Board Games",
  "Colors",
  "Food",
  "Geography/History",
  "Math/Logic",
  "Movies/TV",
  "Music",
  "Prices",
  "Science/Nature",
  "Shapes/Patterns",
  "Sports",
  "Trivia",
  "Vehicles",
  "Video Games",
  "Words",
  "Miscellaneous",
])
export let categoryColors = readable({
  "Card/Board Games": "hsl(0, 90%, 50%, 45%)",
  Colors: "hsl(24, 90%, 50%, 45%)",
  Food: "hsl(48, 90%, 50%, 45%)",
  "Geography/History": "hsl(72, 90%, 50%, 45%)",
  "Math/Logic": "hsl(96, 90%, 50%, 45%)",
  "Movies/TV": "hsl(120, 90%, 50%, 45%)",
  Music: "hsl(144, 90%, 50%, 45%)",
  Prices: "hsl(168, 90%, 50%, 45%)",
  "Science/Nature": "hsl(192, 90%, 50%, 45%)",
  "Shapes/Patterns": "hsl(216, 90%, 50%, 45%)",
  Sports: "hsl(240, 90%, 50%, 45%)",
  Trivia: "hsl(264, 90%, 50%, 45%)",
  Vehicles: "hsl(288, 90%, 50%, 45%)",
  "Video Games": "hsl(312, 90%, 50%, 45%)",
  Words: "hsl(336, 90%, 50%, 45%)",
  Miscellaneous: "hsl(0, 0%, 49%, 45%)",
})
