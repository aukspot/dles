const VISITOR_ID_KEY = "visitorId"
const VISITOR_ID_LENGTH = 7
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export function slugifySection(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// Randomized visitor id
export function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY)
    if (!id) {
      const bytes = crypto.getRandomValues(new Uint8Array(VISITOR_ID_LENGTH))
      id = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("")
      localStorage.setItem(VISITOR_ID_KEY, id)
    }
    return id
  } catch {
    return "-"
  }
}

export function countClick(dleId, section) {
  if (typeof document === 'undefined') return
  const img = new Image()
  img.src = `https://counter.aukspot.com/t?id=${dleId}&s=${encodeURIComponent(section)}&v=${getVisitorId()}`
}
