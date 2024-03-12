import { readable, writable } from "svelte/store"

export let dles = writable([])
export let filteredDles = writable([])
export let tagNames = writable([])
export let tags = writable({})
export let filtersContainerHeight = readable(110)
export let numColumns = writable(2)
