import { writable } from "svelte/store"
import { browser } from "$app/environment"
import pollsData from "$lib/data/polls.json"

const STORAGE_KEY = "pollResponses"

// Get currently active polls based on timeRange
export function getActivePolls() {
  const now = new Date()
  return pollsData.filter((poll) => {
    const start = new Date(poll.timeRange.start)
    const end = new Date(poll.timeRange.end)
    return now >= start && now <= end
  })
}

// Get all polls (for historical view)
export const allPolls = pollsData

// Store for tracking which polls the user has answered
function createPollResponsesStore() {
  const initialValue = browser
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
    : {}

  const { subscribe, set, update } = writable(initialValue)

  return {
    subscribe,
    hasAnswered: (pollId, currentState) => {
      return currentState[pollId] !== undefined
    },
    recordAnswer: (pollId, answerId) => {
      update((responses) => {
        const newResponses = { ...responses, [pollId]: answerId }
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newResponses))
        }
        return newResponses
      })
    },
    getAnswer: (pollId, currentState) => {
      return currentState[pollId]
    },
  }
}

export const pollResponses = createPollResponsesStore()
