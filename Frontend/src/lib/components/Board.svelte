<script lang="ts">
    import Cell from "$lib/components/Cell.svelte";

    export let totalCells: number = 20;
    export let player1;
    export let player2;
</script>

<div class="grid grid-cols-6 gap-10">


{#each Array(totalCells) as _, i}
    {#if i==player1.position}
        <Cell playerName={player1.name} playerColor={player1.color}/>
    {:else if i==player2.position}
        <Cell playerName={player2.name} playerColor={player2.color}/>
    {:else}
        <Cell/>
    {/if}
{/each}
<div class="border border-black w-16 h-16 rounded-full flex items-center justify-center">FINISH</div>
</div>