export function isLocalStorageAvailable() {
  let test = "test"
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export function openInNewTab(href) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener",
    href: href,
  }).click()
}

export function playRandom(options) {
  if (options.length != 0) {
    const choice = options[Math.floor(Math.random() * options.length)]
    openInNewTab(choice.url)
  }
}