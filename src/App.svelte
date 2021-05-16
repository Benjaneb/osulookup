<script>
	"use strict";

	import { fade, fly } from "svelte/transition";

	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Search from "./Search.svelte";
	import User from "./User.svelte";
	import About from "./About.svelte";

	import { search, searchName, about, home } from "./js/store.js";

	function authorize() { // Fetch token
		return fetch("https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/oauth/token", {
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

	async function userStats(token) {
		return await fetch(`https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/api/v2/users/${$searchName}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			if(!response.ok) {
				return false;
			} else return response.json();
		})
		.catch(err => console.error(err));
	}

	async function userScores(token, id) {
		return await fetch(`https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/api/v2/users/${id}/scores/best`, {
			headers: {
				Authorization: `Bearer ${token}`,
				limit: 10
			}
		})
		.then(response => { return response.json() })
		.catch(err => console.error(err));
	}

	async function getUser() {
		const token = await authorize();
		let userInfo = {
			user: {},
			scores: {}
		};
		userInfo.user = await userStats(token);
		userInfo.scores = await userScores(token, userInfo.user.id);

		return userInfo;
	}
</script>


<Header/>
<main>
{#if $home}
	<Search/>
{/if}
{#if $search}
	{#await getUser()}
		<div class="loading" in:fade out:fade></div>
	{:then userInfo}
		<User {...userInfo}/>
	{:catch error}
		<p class="error">{error.message}</p>
	{/await}
{/if}
{#if $about}
	<About/>
{/if}
</main>
<Footer/>


<style lang="scss">
	@import "scss/mixin";

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