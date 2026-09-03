import { error } from "@sveltejs/kit"
import { themesByCategory } from "$lib/js/themes"

export const prerender = true

const SLUGS = { words: "Words" }

export function entries() {
  return Object.keys(SLUGS).map((category) => ({ category }))
}

export function load({ params }) {
  const category = SLUGS[params.category]
  if (!category || !themesByCategory[category]) {
    throw error(404, "Not found")
  }
  return { category, themes: themesByCategory[category] }
}
