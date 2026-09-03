import guessTheMovieDates from "$lib/data/guessthemovie_dates.json"

function expandRanges(ranges) {
  const dates = []
  for (const [start, end] of ranges) {
    const cursor = new Date(start + "T00:00:00Z")
    const last = new Date(end + "T00:00:00Z")
    while (cursor <= last) {
      dates.push(cursor.toISOString().slice(0, 10))
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
  }
  return dates
}

function indexedPuzzles({ total, buildUrl, perGroup = 50 }) {
  return Array.from({ length: total }, (_, i) => {
    const day = i + 1
    const groupStart = Math.floor(i / perGroup) * perGroup + 1
    const groupEnd = Math.min(groupStart + perGroup - 1, total)
    return {
      key: String(day),
      label: String(day),
      url: buildUrl(i),
      group: `Puzzles ${groupStart}–${groupEnd}`,
    }
  })
}

function datedPuzzles({ ranges, buildUrl, perGroup = 50 }) {
  const dates = expandRanges(ranges)
  return dates.map((date, i) => {
    const number = i + 1
    const groupStart = Math.floor(i / perGroup) * perGroup + 1
    const groupEnd = Math.min(groupStart + perGroup - 1, dates.length)
    return {
      key: String(number),
      label: String(number),
      url: buildUrl(date),
      group: `Puzzles ${groupStart}–${groupEnd}`,
    }
  })
}

export const ARCHIVE_PUZZLES = {
  // Listed
  "M15": {
    sets: [
      { id: "usa", name: "Listed USA", total: 1000 },
      { id: "sf", name: "San Francisco", total: 935 },
      { id: "chi", name: "Chicago", total: 935 },
    ].map((set) => ({
      ...set,
      puzzles: indexedPuzzles({
        total: set.total,
        buildUrl: (index) =>
          `https://listed.fun/archive/${set.id}/${index + 1}`,
      }),
    })),
  },

  // Where in the USA is this?
  418: {
    unit: "day",
    calendar: false,
    puzzles: indexedPuzzles({
      total: 750,
      buildUrl: (index) =>
        `https://pudding.cool/games/where/?skip=true&game=${index}`,
    }),
  },

  // GuessTheMovie.me
  519: {
    unit: "number",
    calendar: false,
    puzzles: datedPuzzles({
      ranges: guessTheMovieDates.ranges,
      buildUrl: (date) => `https://guessthemovie.me/archive/${date}`,
    }),
  },

  // Numblino
  552: {
    unit: "number",
    calendar: false,
    puzzles: indexedPuzzles({
      total: 273,
      buildUrl: (index) => `https://numblino.com/?gameId=${index + 1}`,
    }),
  },
}
