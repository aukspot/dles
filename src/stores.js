import { writable } from "svelte/store";

export const alert = writable("This variable is stored!");
export const dles = writable([])
export let filteredDles = writable([])
export let allTags = writable([])
export let includedTags = writable([])
export let excludedTags = writable([])