const VAR = "--bottom-ad-offset"
const MAX_FRACTION = 0.35

function measure() {
  const vh = window.innerHeight
  let offset = 0
  for (const el of document.body.children) {
    const style = getComputedStyle(el)
    if (style.position !== "fixed" && style.position !== "sticky") continue
    if (style.display === "none" || style.visibility === "hidden") continue
    const rect = el.getBoundingClientRect()
    if (rect.height === 0 || rect.height > vh * MAX_FRACTION) continue
    if (Math.abs(rect.bottom - vh) > 4) continue
    offset = Math.max(offset, vh - rect.top)
  }
  document.documentElement.style.setProperty(VAR, `${Math.ceil(offset)}px`)
}

export function trackBottomAdOffset() {
  let frame = 0
  const schedule = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(measure)
  }

  const resizeObserver = new ResizeObserver(schedule)
  const observeChildren = () => {
    for (const el of document.body.children) resizeObserver.observe(el)
  }

  const mutationObserver = new MutationObserver(() => {
    observeChildren()
    schedule()
  })
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class", "hidden"],
  })

  observeChildren()
  window.addEventListener("resize", schedule)
  schedule()

  return () => {
    cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    mutationObserver.disconnect()
    window.removeEventListener("resize", schedule)
  }
}
