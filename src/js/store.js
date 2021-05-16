import { writable } from "svelte/store";

export let search = writable(false);
export let searchName = writable("");
export let about = writable(false);
export let home = writable(true);