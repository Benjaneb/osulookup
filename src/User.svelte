<script>
	"use strict";

    import { fade, fly } from "svelte/transition";
    import { search, home } from "./js/store.js";
    export let user;
    export let scores;

    let dead = false;
    let declining = false;

    console.log(user);
    console.log(scores);

    // Error checking if stats doesn't exist & manipulating stats
    if (user) {
        const dateRegEx = /(\d+\-\d+\-\d+)T\d+:\d+:\d+\+\d+:\d+/;
        if (user.last_visit) user.last_visit = user.last_visit.match(dateRegEx);
        else user.last_visit = ["", "Unknown"];
        if (user.statistics.global_rank) {
            let rh = user.rank_history.data;
            if (rh[0] < rh[rh.length - 1]) declining = true;
        } else {
            user.statistics.global_rank = "Unknown";
            user.statistics.country_rank = "Unknown";
            dead = true;
        }
        if (!user.playstyle) user.playstyle = ["Unknown"];
        user.join_date = user.join_date.match(dateRegEx);
    }

    const goHome = () => {
        search.set(false);
        home.set(true);
    };
</script>


{#if !user}
    <article class="error" in:fade out:fly={{ x: 800, duration: 400 }}>
        <p>Couldn't find a user with that username!</p>
        <p>Check for misspellings.</p>
        <button on:click={goHome} tabindex="0">Return</button>
    </article>
{:else}
    <article class="user" in:fade out:fly={{ x: 1000, duration: 500 }}>
        <div class="header">
            <button class="return" on:click={goHome} tabindex="0">
                <i class="fas fa-reply"></i> Return
            </button>
            <p>Mode: {user.playmode}</p>
        </div>
        <div class="profile-top">
            <img src={user.avatar_url} alt="Profile picture" width="150" in:fly={{ x: -800, duration: 400 }}>
            <div>
                <h2 class="username" in:fly={{ x: 800, duration: 400 }}>{user.username} ({user.country.name})</h2>
                <span class="rank" title="Global"><i class="fas fa-globe"></i> #{user.statistics.global_rank}</span>
                <span class="rank" title="Country"><i class="fas fa-flag"></i> #{user.statistics.country_rank}</span>
                <div class="badges">
                {#if user.is_bot}
                    <p>Bot</p>
                {/if}
                {#if dead}
                    <p class="red">Dead</p>
                {:else if user.is_active}
                    <p class="green">Active</p>
                {:else}
                    <p class="red">Inactive</p>
                {/if}
                {#if declining}
                    <p class="red">Declining</p>
                {/if}
                {#if user.statistics.global_rank < 500}
                    <p class="red">Top player</p>
                {/if}
                {#if user.ranked_and_approved_beatmapset_count > 2}
                    <p class="blue">Mapper</p>
                {/if}
                </div>
            </div>
        </div>
        <p>Last online: {user.last_visit[1]}</p>
        <p>Joined: {user.join_date[1]}</p>
        <p>Lvl: {user.statistics.level.current}</p>
        <p>PP: {Math.round(user.statistics.pp)}</p>
        <p>Accuracy: {user.statistics.hit_accuracy.toFixed(2)}%</p>
        <p>Playstyles: {user.playstyle.join(", ")}</p>
        <p>Playtime: {Math.round(user.statistics.play_time / 3600)}h</p>
        <h3>Top scores</h3>
        {#each scores as score, i}
            <div class="score" in:fly={{ x: 400, duration: 300, delay: i * 40 }}>
                <div>
                    <span>{i + 1}.</span>
                    <span class="score_rank">{score.rank}</span>
                    <span>{score.beatmapset.title}</span>
                    <span> ({score.beatmap.version})</span>
                    <span class="acc">{(score.accuracy * 100).toFixed(2)}%</span>
                    {#if score.mods.length > 0}
                       <span>{score.mods.join(" ")}</span>
                    {/if}
                </div>
                <span>{Math.round(score.pp)}pp</span>
            </div>
        {/each}
    </article>
{/if}


<style lang="scss">
    @import "scss/mixin";

    .error {
        @include flexCenterAll(column);

        p {
            margin: 0 0 1em 0;
        }

        button {
            all: unset;
            background: white;
            padding: 0.5em 0.8em;
            cursor: pointer;
            border-radius: 0.5em;
        }
    }

    .header {
        display: flex;
        width: 100%;
        border-bottom: 2px grey solid;
        padding-bottom: 0.5em;
        margin-bottom: 2em;

        p {
            margin: 0 0 0 auto;
        }
    }

    .return {
        @include link;
	}

    .badges {
        display: flex;
        align-items: center;

        & * {
            font-size: 0.8rem;
            padding: 0.3em 0.5em;
            margin: 0.5em;
            background: white;
            color: black;
            border: 1px solid black;
            border-radius: 0.2em;
        }
    }

    .profile-top {
        display: flex;  
        align-items: center;

        & > div {
            margin-left: 1em;
        }
    }

    h2 {
        margin: 0.5em 0;
    }

    .rank {
        color: var(--pink);
        margin: 0.5em 0;
        padding-left: 0.5em;

        &:first-of-type {
            padding: 0 0.5em 0 0;
            border-right: 2px solid grey;
        }
    }

    .green {
        background: #53ca53;
    }

    .red {
        background: #ca5353;
    }

    .blue {
        background: #5353ca;
    }

    .user {
        max-width: 40em;
    }

    .playstyle::after {
        content: " ";
    }

    .score {
        background: var(--light-grey);
        border-bottom: var(--grey) solid 0.3em;
        padding: 1em;
        display: flex;
        justify-content: space-between;

        & > div {
            width: auto;
        }

        & > span:last-child {
            margin-left: 1em;
        }
    }

    .acc {
        color: #dfdfdf;
        margin: 0 0.5em;
    }

    .score_rank {
        margin: 0 0.6em;
        font-size: 1.2em;
        color: #dddd54;
        font-weight: bold;
    }
</style>