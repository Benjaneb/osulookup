<script>
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";

	"using strict";

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
				"client_secret": "IuBG8rnvw0U60si1KDMhkaBnGyhMvLSGkhSNWKPu",
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
		const userID = "9158995";

		return fetch(`https://glacial-peak-29237.herokuapp.com/https://osu.ppy.sh/api/v2/users/${userID}/osu`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
	}

	let build = false;

	const startBuild = () => { build = true; }
</script>

<Header/>
<main>
	{#if !build}
		<article>
			<form class="search">
				<fieldset>
					<legend>Enter an Osu username to get started!</legend>
					<div class="searchbar">
						<input type="text" placeholder="Cookiezi" name="username">
						<button type="button" on:click={startBuild} class="searchbutton"><i class="fas fa-search"></i></button>
					</div>
				</fieldset>
			</form>
		</article>
	{/if}
	{#if build}
		{#await getUser()}
			<div class="loading"></div>
		{:then user}
			<article class="user">
				<img src={user.avatar_url} alt="Profile picture" class="pfp">
				<h2 class="username">{user.username}</h2>
			</article>
		{:catch error}
			<p class="error">{error.message}</p>
		{/await}
	{/if}
</main>
<Footer/>

<style>

</style>