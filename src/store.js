import { writable } from "svelte/store";

export let build = writable(false);
export let searchName = writable("");