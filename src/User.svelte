<script>
    import { fade, fly } from "svelte/transition";
    export let user;
</script>

<article class="user">
    <button class="return" on:click={toggleBuild}>
        <i class="fas fa-reply"></i> Return
    </button>
    <div>
        <img src={user.avatar_url} alt="Profile picture" width="150" in:fly={{ x: -1000, duration: 500 }}>
        <h2 class="username" in:fly={{ x: 1000, duration: 500 }}>{user.username}</h2>
    </div>
</article>

<style lang="scss">
	.return {
		all: unset;
		color: var(--pink);

		&:hover {
			color: var(--dark-pink);
			text-decoration: underline;
			cursor: pointer;
		}
	}
</style>