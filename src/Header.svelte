<script>
    import { home, about, search } from "./js/store.js";

    const goHome = () => {
        $about = false;
        $search = false;
        $home = true;
    };

    const goAbout = () => {
        $home = false;
        $search = false;
        $about = true;
    };
</script>

<header>
    <div>
        <img src="images/osuLookup_logo.png" alt="Osu!Lookup logo">
        <button on:click={goHome} tabindex="0"><h1>Osu!Lookup</h1></button>
    </div>
    <nav>
        <button on:click={goHome} id="home" tabindex="0">Home</button>
        <button on:click={goAbout} tabindex="0">About</button>
    </nav>
</header>


<style lang="scss">
    @import "scss/mixin";

    nav button {
        @include link;
        font-size: 1.3rem;
        padding: 0 1.5em;
        height: 100%;
    }

    header {
        display: flex;
        align-items: center;
        background-color: var(--grey);
        height: 4.5rem;
        
        & * {
            margin: 0;
            padding: 0 1.5em;
            height: 100%;
        }

        & > div {
            display: flex;
            align-items: center;

            button {
                @include link;
            }

            * {
                padding: 0;
            }

            img {
                height: 80%;
                margin-right: 0.4em;
            }
        }
    }

    @media (max-width: 700px) {
        nav {
            padding: 0;
        }

        header button,
        h1 {
            padding: 0 0.5em;
        }
    }

    @media (max-width: 550px) {
        header > div {
            font-size: 0.7em;
            padding: 0.5em;
            img {
                height: 60%;
            }
        }

        nav button {
            font-size: 1em;
        }

        #home {
            display: none;
        }
    }
</style>