<script lang="ts">
    import Cell from "$lib/components/Cell.svelte";

    interface Player {
        name: string,
        color: string,
        position: number
    }

    export let totalCells: number = 20;
    export let player1: Player;
    export let player2: Player;
</script>

<div class="grid grid-cols-6 gap-10 items-center">


{#each Array(totalCells) as _, i}
    {#if i==0}

            {#if i==player1.position && i==player2.position}
            <div>
                <Cell {i} playerName={player1.name} playerColor={player1.color}/>
                <Cell {i} playerName={player2.name} playerColor={player2.color}/>
            </div>
            
            {:else if i==player1.position}
            <Cell {i} playerName={player1.name} playerColor={player1.color}/>
            {:else if i==player2.position}
            <Cell {i} playerName={player2.name} playerColor={player2.color}/>
            {/if}

    {:else if i==player1.position}
        <Cell {i} playerName={player1.name} playerColor={player1.color}/>
    {:else if i==player2.position}
        <Cell {i} playerName={player2.name} playerColor={player2.color}/>
    {:else}
        <Cell {i}/>
    {/if}
{/each}
<div class="border border-black w-16 h-16 rounded-full flex items-center justify-center">FINISH</div>
</div>