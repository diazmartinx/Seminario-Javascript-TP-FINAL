<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import Board from "./Board.svelte";
    import Dice from "./Dice.svelte";

    export let game: {
        id: string;
        status: string;
        diceNumber: number;
        isMyTurn: boolean;
        lastQuestion: {
            question: string;
            options: string[];
        };
        player1: {
            name: string;
            position: number;
            color: string;
        };
        player2: {
            name: string;
            position: number;
            color: string;
        };
    };
    export let player: {
        playerId: string;
        name: string;
    };
    console.log(player)
    let playerId = player.playerId;
    let isMyTurn = game.isMyTurn;

    function rollDice(){
        fetch(`${PUBLIC_API_URL}game/${game.id}/${playerId}/roll`, {
            method: 'POST',
        })
    }

    function answerQuestion(option: number){
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





<section class="grid grid-cols-[1fr_2fr_1fr] gap-5 items-center mb-10">

    <div>
        <Dice number={game.diceNumber}/>
    </div>
    

    <div class="flex justify-center">
        {#if game.lastQuestion}
<div class="border">
    <h3 class="h3">{game.lastQuestion.question}</h3>
    <ul>
        {#each game.lastQuestion.options as option, i}
            <li><button disabled={!isMyTurn}
            on:click={() => answerQuestion(i)}
                class="btn variant-outline-secondary">{option}</button></li>
        {/each}
    </ul>
</div>
    
{:else}
<button class="btn variant-filled-primary" disabled={!isMyTurn || game.lastQuestion}
on:click={rollDice}
>{isMyTurn ? 'TIRAR DADO' : 'Esperando'}</button>
{/if}
    </div>

    <div>
        {#if isMyTurn}
    <p>¡<strong>{player.name}</strong> es tu turno!</p>
{:else}
    <p>Esperando al otro jugador</p>
{/if}
    </div>

</section>


<Board player1={game.player1} player2={game.player2}/>

