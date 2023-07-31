<script lang="ts">
    import Lobby from '$lib/components/Lobby.svelte';
    import Game from '$lib/components/Game.svelte';
    import type { PageData } from './$types';
    import { invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';
    import { onDestroy } from 'svelte';

    export let data: PageData;
    let { game } = data;

    // poll for changes
    let interval = setInterval(async () => {
            if (!browser) return;
            invalidateAll();
            game = data.game; // update the game
    }, 1000);

    //stop polling when status is finished
    if (game.status == "FINISHED") {
        clearInterval(interval);
    }

    // stop polling when the component is destroyed
    onDestroy(() => {
        clearInterval(interval);
    });


</script>


<main class="p-2">
    {#if game.status=="LOBBY"}
    <Lobby {game}/>
{:else if game.status=="FINISHED"}
    <h1>El juego ha terminado</h1>
    <h2>¡{game.winner} fue el ganador!</h2>

{:else}
    <Game {game}/>
{/if}
</main>
    

