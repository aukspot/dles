import { writable } from "svelte/store";

export let dles = writable([])
export let filteredDles = writable([])
export let tagNames = writable([])
export let tags = writable({})