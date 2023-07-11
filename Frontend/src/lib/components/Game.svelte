<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import Board from "./Board.svelte";
    import Dice from "./Dice.svelte";
    import { playerStore } from "$lib/stores/playerStore";

    export let game;
    let player = $playerStore[game.id]
    let playerId = player.playerId;
    $: isMyTurn = playerId == game.playerIdTurn;

    function rollDice(){
        fetch(`${PUBLIC_API_URL}game/${game.id}/${playerId}/roll`, {
            method: 'POST',
        })
    }

    function answerQuestion(option){
        fetch(`${PUBLIC_API_URL}game/${game.id}/${playerId}/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                optionIndex: option
            })
        })
    }

</script>

{#if isMyTurn}
    <h1>Es tu turno</h1>
{:else}
    <h1>Esperando al otro jugador</h1>
{/if}
<Dice number={game.diceNumber}/>

<button class="btn variant-filled-primary" disabled={!isMyTurn}
on:click={rollDice}
>{isMyTurn ? 'TIRAR DADO' : 'Esperando'}</button>

{#if game.lastQuestion}
    <h2>Ultima pregunta: {game.lastQuestion.question}</h2>
    <ul>
        {#each game.lastQuestion.options as option, i}
            <li><button
            on:click={() => answerQuestion(i)}
                class="btn variant-outline-secondary">{option}</button></li>
        {/each}
    </ul>
{/if}

<Board {...game.board}/>

