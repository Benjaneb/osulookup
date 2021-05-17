<script>
	"use strict";

    import { fly } from "svelte/transition";
    import { search, searchName, home, about } from "./js/store.js";

	const startSearching = () => {
		$search = true;
		$home = false;
	}

	const toAbout = () => {
		$home = false;
		$about = true;
	}
</script>


<article in:fly={{ x: -800, duration: 400, delay: 400 }} out:fly={{ x: 800, duration: 400 }}>
    <form on:submit|preventDefault={startSearching}>
        <fieldset>
            <label for="searchInput">Enter an Osu username to get started!</label>
            <div class="searchbar">
                <input required id="searchInput" type="text" placeholder="Benjaneb" bind:value={$searchName}>
                <button type="submit" class="searchbutton" tabindex="0" aria-label="search">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </fieldset>
    </form>
    <p>When the website hasn't been used for a while, searching can take a few seconds.</p>
	<p>
		Don't know what this is all about? Check the <button on:click={toAbout} tabindex="0">About</button> page.
	</p>
</article>


<style lang="scss">
    @import "scss/mixin";

    article,
    fieldset {
        @include flexCenterAll(column);
        fieldset {
            border: none;
        }
    }

	label {
		font-size: 1.2rem;
		margin-bottom: 1em;
	}

	.searchbar {
		max-width: 10em;
		padding: 1.2em;
		border: none;
		border-radius: 0.8em;
		box-shadow: 0.1em 0.1em 0.5em black;
		background-color: white;
		transition: max-width 0.3s ease-out;

		&:focus-within {
			max-width: 15em;
		}
	}

	#searchInput {
		all: unset;
		width: calc(100% - 2.1em);
		border-bottom: white solid 2px;

		&:focus {
			outline: none;
			border-color: #aaaaaa;
		}
	}

	.searchbutton {
		all: unset;
		padding: 0.4em;

		&:hover {
			cursor: pointer;
		}
	}

	p > button {
		@include link;
	}
</style>