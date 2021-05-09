<header>
    <button><h1>Osu!Lookup</h1></button>
    <nav>
        <button>Home</button>
        <button>About</button>
    </nav>
</header>


<style lang="scss">
    @import "mixin";

    nav button {
        @include link;
        font-size: 1.3rem;
        margin: 0 1.5em;
    }

    header {
        display: flex;
        align-items: center;
        background-color: var(--grey);
        padding: 0.8em;
        
        & * {
            margin: 0 1.5em;
        }

        & > button {
            @include link;
        }
    }
</style>