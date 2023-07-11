<script lang="ts">
    import  {createPlayer}  from "$lib/Client"
    import { playerStore } from "$lib/stores/playerStore"
    import { ProgressRadial } from '@skeletonlabs/skeleton';



    export let game: {};

    async function submit(e: Event){
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const name = data.name.toString();
        const color = data.color.toString();
        const player = await createPlayer(name,  color, game.id);
        console.log(player);
        // @ts-ignore
        playerStore.set({[game.id]:{
            playerId: player.playerId,
            name: name,
        }})
    }


    $: playerActive = $playerStore[game.id] || null;

</script>

{JSON.stringify(game)}

{#if playerActive!=null}
    <h1>{playerActive.name} Ya estas en la partida !</h1>
    <h2>Esperando al otro jugador</h2>
    <ProgressRadial size="large" value={undefined}/>
{:else}
<form on:submit|preventDefault={ (e) => {submit(e)}} >
    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name"  required>
    <label for="color">Color:</label>
    <input type="color" id="color" name="color" required>
    <button type="submit" class="btn variant-filled-primary">Unirse</button>
</form>
{/if}
