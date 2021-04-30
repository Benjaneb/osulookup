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
				"client_id": process.env.CLIENT_ID,
				"client_secret": process.env.CLIENT_SECRET,
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

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	fieldset {
		border: none;
	}

	.searchbar {
		width: 10em;
		padding: 1.2em;
		border: none;
		border-radius: 1em;
		box-shadow: 0.1em 0.1em 0.5em black;
		background-color: white;
		transition: width 0.3s ease-out;

		&:focus-within {
			width: 15em;
		}
	}

	input {
		all: unset;
		width: calc(100% - 1.5em);
		border-bottom: white solid 2px;

		&:focus {
			outline: none;
			border-color: #aaaaaa;
		}
	}

	.searchbutton {
		all: unset;

		&:hover {
			cursor: pointer;
		}
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