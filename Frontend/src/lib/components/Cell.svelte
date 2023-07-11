<script lang="ts">

    export let playerName: string = '';
    export let playerColor: string = '';

</script>

{#if playerName!=''}
    <div class="border w-16 h-16 flex items-center justify-center text-white" 
    style="background:{playerColor}">{playerName}</div>
{:else}
    <div class="border border-black w-16 h-16"></div>
{/if}