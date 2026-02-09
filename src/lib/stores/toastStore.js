import { writable } from "svelte/store"

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

export function toastName(name) {
  return `<strong>${escapeHtml(name)}</strong>`
}

function createToastStore() {
  const { subscribe, update } = writable([])

  let idCounter = 0
  const timers = new Map() // id -> { timeoutId, remaining, startedAt }

  function startTimer(id, duration) {
    if (duration <= 0) return
    const timeoutId = setTimeout(() => {
      timers.delete(id)
      dismiss(id)
    }, duration)
    timers.set(id, { timeoutId, remaining: duration, startedAt: Date.now() })
  }

  function show(message, options = {}) {
    const id = ++idCounter
    const toast = {
      id,
      message,
      type: options.type || "info", // "info", "success", "warning", "error"
      duration: options.duration ?? 5000,
      action: options.action || null, // { label: "Undo", onClick: () => {} }
      actions: options.actions || null, // [{ label: "Undo", onClick: () => {} }, ...]
    }

    update((toasts) => [...toasts, toast])
    startTimer(id, toast.duration)

    return id
  }

  function pause(id) {
    const timer = timers.get(id)
    if (!timer) return
    clearTimeout(timer.timeoutId)
    timer.remaining -= Date.now() - timer.startedAt
    timer.timeoutId = null
  }

  function resume(id) {
    const timer = timers.get(id)
    if (!timer || timer.timeoutId) return
    startTimer(id, timer.remaining)
  }

  function dismiss(id) {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer.timeoutId)
      timers.delete(id)
    }
    update((toasts) => toasts.filter((t) => t.id !== id))
  }

  function clear() {
    timers.forEach((timer) => clearTimeout(timer.timeoutId))
    timers.clear()
    update(() => [])
  }

  return {
    subscribe,
    show,
    pause,
    resume,
    dismiss,
    clear,
  }
}

export const toasts = createToastStore()
