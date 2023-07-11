<script lang="ts">
    import Lobby from '$lib/components/Lobby.svelte';
    import Game from '$lib/components/Game.svelte';
    import type { PageData } from './$types';
    import { invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';

    export let data: PageData;
    let { game } = data;

    // poll for changes every 2 seconds
    if (browser) {
    setInterval(async () => {
            invalidateAll();
            game = data.game; // update the game
    }, 3000);
}

</script>



    {#if game.status=="LOBBY"}
        <Lobby {game}/>
    {:else}
        <Game {game}/>
    {/if}

