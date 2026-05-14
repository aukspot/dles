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

export function playRandom(options, section, onChosen = null) {
  if (options.length != 0) {
    const choice = options[Math.floor(Math.random() * options.length)]

    import("$lib/js/counter.js").then(({ countClick }) => countClick(choice.id, section))
    openInNewTab(choice.url)
    if (onChosen) onChosen(choice)
  }
}

export function getCurrentDlesOfTheWeek(dlesOfWeek) {
  const now = new Date();
  const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  for (const entry of dlesOfWeek) {
    const entryDate = new Date(entry.date);
    if (entryDate < estTime) {
      return entry;
    }
  }

  return dlesOfWeek[dlesOfWeek.length - 1];
}

export function enhancedSearch(dles, query, searchByDescription = false, searchByUrl = false) {
  if (!query.trim()) return dles;

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return dles.filter((dle) => {
    const searchableText = [
      dle.name,
      ...(searchByDescription ? [dle.description] : []),
      ...(searchByUrl ? [dle.url] : [])
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}