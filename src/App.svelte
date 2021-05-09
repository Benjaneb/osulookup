<script>
	"use strict";

	import { fade, fly } from "svelte/transition";

	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Search from "./Search.svelte";
	import User from "./User.svelte";

	import { build, searchName } from "./store.js";

	async function authorize() { // Fetch token
		return await fetch("https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/oauth/token", {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"grant_type": "client_credentials",
				"client_id": 6654,
				"client_secret": "a7iIVdGhTRciaeRbI8lCUc3CqRjSQzqxxfy8WjIr",
				"scope": "public"
			})
		})
		.then(response => {
			return response.json();
		})
		.then(json => {
			return json.access_token;
		})
		.catch(err => console.error(err));
	}

	async function getUser() {
		const token = await authorize();

		return fetch(`https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/api/v2/users/${$searchName}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			if(!response.ok) {
				return false;
			} else return response.json();
		})
		.catch(err => {
			console.error(err)
		});
	}
</script>


<Header/>
<main>
{#if !$build}
	<Search/>
{/if}
{#if $build}
	{#await getUser()}
		<div class="loading" in:fade out:fade></div>
	{:then user}
		<User user={user}/>
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
{/if}
</main>
<Footer/>


<style lang="scss">
	@import "mixin";

	main {
		@include flexCenterAll(column);
	}

	.loading {
		width: 6em;
		height: 6em;
		border-radius: 50%;
		border: 1em solid #8d8d8d;
		border-top: 1em solid #0cf0f0;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {transform: rotate(0deg);}
		100% {transform: rotate(360deg);}
	}

	.error {
		color: red;
	}
</style>