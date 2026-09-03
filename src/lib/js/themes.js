export const wordsThemes = [
  "Wordle-likes",
  "Multi-Board",
  "Anagrams",
  "Boggle-likes",
  "Clues",
  "Crosswords",
  "Cryptics",
  "Decoding",
  "Grouping",
  "Linguistics",
  "Letter Reveal",
  "Scrabble-likes",
  "Semantics",
  "Rearranging",
  "Word Ladders",
  "Word Chains",
  "Word Searches",
]

export const themeDescriptions = {
  "Wordle-likes": "Progressively learn about each letter on the board.",
  "Multi-Board": "Each guess gets shared across multiple boards.",
  Anagrams: "Create words using the letters provided.",
  "Boggle-likes": "Find words by tracing between letters.",
  Clues: "Solve puzzles based on their clues.",
  Crosswords: "Solve crossword grids of any size.",
  Cryptics: "Solve cryptic clues from nonsensical phrases.",
  Decoding: "The answer is hidden behind a code.",
  Grouping: "Sort words into categories.",
  Linguistics: "Language and how it's used.",
  "Letter Reveal": "Guess letters to solve the puzzle, like Wheel of Fortune.",
  "Scrabble-likes": "Place letter tiles on a board to build words.",
  Semantics: "Solve based on the meaning of words.",
  "Rearranging": "Move letters or words into place.",
  "Word Ladders": "Transform one word into another, one step at a time.",
  "Word Chains": "Create a chain of compound words and phrases.",
  "Word Searches": "Find specific words in a grid of letters.",
}

export const themesByCategory = {
  Words: wordsThemes,
}

const WORDS_HUE = 336
const SPREAD = 50

export function themeColor(theme, themes = wordsThemes) {
  const index = themes.indexOf(theme)
  if (index === -1) return "hsl(0, 0%, 49%, 45%)"
  const offset = (index / Math.max(themes.length - 1, 1) - 0.5) * SPREAD
  const hue = (WORDS_HUE + offset + 360) % 360
  return `hsl(${hue.toFixed(0)}, 90%, 50%, 45%)`
}

export const UNTHEMED_SECTION = "Miscellaneous"
export const UNTHEMED_DESCRIPTION =
  "Games without a subcategory."

export function groupByTheme(dles, themes = wordsThemes) {
  const groups = []

  for (const theme of themes) {
    const members = dles.filter((dle) => (dle.themes || []).includes(theme))
    if (members.length) {
      groups.push({ theme, dles: members, description: themeDescriptions[theme] })
    }
  }

  const untyped = dles.filter((dle) => !(dle.themes || []).length)
  if (untyped.length) {
    groups.push({
      theme: UNTHEMED_SECTION,
      dles: untyped,
      untyped: true,
      description: UNTHEMED_DESCRIPTION,
    })
  }

  return groups
}
