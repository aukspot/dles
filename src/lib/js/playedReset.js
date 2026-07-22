// Helpers for the "mark as played today" auto-reset.
//
// Each dle carries an optional `resetTime`:
//   - absent or "client" -> resets at 00:00 in the user's local timezone
//   - an IANA timezone string (e.g. "America/Los_Angeles") -> resets at 00:00 in that zone
//
// The last reset check is persisted as a single ISO datetime in
// localStorage.playedDlesLastReset. On load we drop a played dle only when a
// midnight in its own zone fell between that instant and now.

export function getResetTime(dle) {
  return dle?.resetTime || "client"
}

// The wall-clock day (YYYY-MM-DD) that `date` falls on in the given zone.
// "client" uses the user's local timezone.
export function dayInZone(date, resetTime) {
  const options = resetTime === "client" ? {} : { timeZone: resetTime }
  return date.toLocaleDateString("en-CA", options)
}

// Parses both legacy date-only strings ("Wed Jul 22 2026") and ISO datetimes.
// Returns null when absent or unparseable.
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
  const currentDayByZone = {}

  return playedIds.filter((id) => {
    const zone = getResetTime(byId.get(id))
    if (!(zone in currentDayByZone)) {
      currentDayByZone[zone] = dayInZone(now, zone)
    }
    return dayInZone(lastReset, zone) === currentDayByZone[zone]
  })
}
