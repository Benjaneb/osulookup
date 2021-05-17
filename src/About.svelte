<script>
    "use strict";

    import { fly } from "svelte/transition";
</script>

<article in:fly={{ x: -800, duration: 400, delay: 400 }} out:fly={{ x: 800, duration: 400 }}>
    <h2>About Osu!Lookup</h2>
    <p>
        This website allows you to quickly search up osu user's profiles to check their most important stats 
        and also get a quick evaluation of the stats in the form of badges.
    </p>
    <p>
        The website was made using <a href="https://svelte.dev/" target="_blank" rel="noopener">Svelte</a> to enable an easy way to 
        create a Single Page Application with reactive elements, styled using <a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass</a>
        for more feature-rich CSS and last but not least hosted by <a href="https://heroku.com/" target="_blank" rel="noopener">Heroku</a> 
        for quick and easy deployment.
    </p>
</article>