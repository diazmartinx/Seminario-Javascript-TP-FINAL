<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_API_URL } from "$env/static/public";
    import { createGame } from "$lib/Client";



async function submit() {

    const game = await createGame();
    goto(`${game.id}`)


}

</script>

<main>

    <section>
        <button class="btn btn-xl variant-filled-primary" on:click={submit}>EMPEZAR JUEGO</button>
    </section>

    <section class="p-10">
        <p>Unirse a una partida existente</p>
        <label for="">Codigo de partida:</label>
        <input type="text">
        <button class="btn btn-lg variant-filled-secondary">Entrar</button>
    </section>

</main>