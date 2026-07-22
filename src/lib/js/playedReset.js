export function dayInZone(date, resetTime) {
  try {
    // if the resetTime is undefined, the default behaviour is to use the client's timezone
    const options = !!resetTime && resetTime !== "client" ? { timeZone: resetTime } : {}
    return date.toLocaleDateString("en-CA", options)
  } catch {
    return date.toLocaleDateString("en-CA")
  }
}

export function parseResetDate(raw) {
  if (!raw) {
    return null
  }
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? null : date
}

// Returns the ids that should stay marked. A dle survives only if we have a
// baseline (`lastReset`) and no midnight in its zone has passed since then.
export function computePlayedReset(playedIds, dles, lastReset, now = new Date()) {
  if (!lastReset) {
    return []
  }

  const byId = new Map(dles.map((dle) => [dle.id, dle]))
  const survivesByZone = {} // cache to avoid Intl.DateTimeFormat computation

  return playedIds.filter((id) => {
    const zone = byId.get(id)?.resetTime
    if (!(zone in survivesByZone)) {
      survivesByZone[zone] = dayInZone(lastReset, zone) === dayInZone(now, zone)
    }
    return survivesByZone[zone]
  })
}
