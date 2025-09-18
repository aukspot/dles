function stringSimilarity(a, b) {
  if (!a || !b) return 0

  const longer = a.length > b.length ? a : b
  const shorter = a.length > b.length ? b : a

  if (longer.length === 0) return 1

  const editDistance = levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase())
  return (longer.length - editDistance) / longer.length
}

function levenshteinDistance(a, b) {
  const matrix = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}


export function migrateFavoritesToIds(oldFavorites, allDles) {
  if (!Array.isArray(oldFavorites) || !Array.isArray(allDles)) {
    return { ids: [], report: { total: 0, migrated: 0, failed: [], suggestions: [] } }
  }

  const favoriteIds = []
  const migrationReport = {
    total: oldFavorites.length,
    migrated: 0,
    failed: [],
    suggestions: []
  }

  for (const oldFavorite of oldFavorites) {
    if (typeof oldFavorite === 'number') {
      favoriteIds.push(oldFavorite)
      migrationReport.migrated++
      continue
    }

    if (!oldFavorite || typeof oldFavorite !== 'object') {
      continue
    }

    let matchingDle = null
    let matchReason = ''

    if (oldFavorite.name) {
      matchingDle = allDles.find(dle => dle.name === oldFavorite.name)
      if (matchingDle) matchReason = 'exact_name'
    }

    if (!matchingDle && oldFavorite.url) {
      matchingDle = allDles.find(dle => dle.url === oldFavorite.url)
      if (matchingDle) matchReason = 'exact_url'
    }

    if (!matchingDle && oldFavorite.name) {
      const SIMILARITY_THRESHOLD = 0.65
      let bestMatch = null
      let bestSimilarity = 0

      for (const dle of allDles) {
        if (!dle.name) continue
        const similarity = stringSimilarity(oldFavorite.name, dle.name)
        if (similarity > bestSimilarity && similarity >= SIMILARITY_THRESHOLD) {
          bestSimilarity = similarity
          bestMatch = dle
        }
      }

      if (bestMatch) {
        matchingDle = bestMatch
        matchReason = `fuzzy_name (${Math.round(bestSimilarity * 100)}% similar)`
      }
    }

    if (!matchingDle && oldFavorite.url) {
      const oldDomain = extractDomain(oldFavorite.url)
      if (oldDomain) {
        matchingDle = allDles.find(dle => {
          if (!dle.url) return false
          const newDomain = extractDomain(dle.url)
          return newDomain === oldDomain
        })
        if (matchingDle) matchReason = 'domain_match'
      }
    }

    if (matchingDle && matchingDle.id) {
      favoriteIds.push(matchingDle.id)
      migrationReport.migrated++
      console.log(`✅ Migrated "${oldFavorite.name}" → "${matchingDle.name}" (ID: ${matchingDle.id}) [${matchReason}]`)
    } else {
      const failedItem = {
        name: oldFavorite.name || 'Unknown',
        url: oldFavorite.url || 'Unknown',
        reason: 'No suitable match found'
      }

      migrationReport.failed.push(failedItem)

      if (oldFavorite.name) {
        const suggestions = findSimilarGames(oldFavorite.name, allDles, 3)
        if (suggestions.length > 0) {
          migrationReport.suggestions.push({
            original: oldFavorite.name,
            suggestions: suggestions
          })
        }
      }

      console.warn(`❌ Could not migrate "${oldFavorite.name || oldFavorite.url}"`)
    }
  }

  return { ids: favoriteIds, report: migrationReport }
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return null
  }
}

function findSimilarGames(searchName, allDles, limit = 3) {
  const similarities = allDles
    .filter(dle => dle.name)
    .map(dle => ({
      name: dle.name,
      similarity: stringSimilarity(searchName, dle.name)
    }))
    .filter(item => item.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)

  return similarities.map(item => item.name)
}

export function getFavoritesFromIds(favoriteIds, filteredDles) {
  if (!Array.isArray(favoriteIds) || !Array.isArray(filteredDles)) {
    return []
  }

  return favoriteIds
    .map(id => filteredDles.find(dle => dle.id === id))
    .filter(Boolean)
}

export function needsFavoritesMigration(favorites) {
  if (!Array.isArray(favorites) || favorites.length === 0) {
    return false
  }

  return favorites.some(fav => typeof fav === 'object' && fav !== null)
}