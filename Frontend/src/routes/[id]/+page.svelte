<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from './$types';

    export let data: PageData;

    const gameId = $page.params.id;
</script>

{#if data.lobby > 0}
    <h1>esto es el lobby con id: {data.lobby}</h1>
{:else}
    <h1>
        No se encontro el lobby con id: {gameId}
    </h1>
    <button class="btn variant-filled-primary">
        <a href="/">Volver al inicio</a>
    </button>
{/if}
