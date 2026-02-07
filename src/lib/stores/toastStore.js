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

    if (toast.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, toast.duration)
    }

    return id
  }

  function dismiss(id) {
    update((toasts) => toasts.filter((t) => t.id !== id))
  }

  function clear() {
    update(() => [])
  }

  return {
    subscribe,
    show,
    dismiss,
    clear,
  }
}

export const toasts = createToastStore()
