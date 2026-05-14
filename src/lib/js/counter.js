export function countClick(dleId, section) {
  if (typeof document === 'undefined') return
  const img = new Image()
  img.src = `https://counter.aukspot.com/t?id=${dleId}&s=${encodeURIComponent(section)}`
}
