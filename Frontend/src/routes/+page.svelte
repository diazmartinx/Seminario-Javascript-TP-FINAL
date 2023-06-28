<script lang="ts">
    import { goto } from "$app/navigation";

    const API_URL = "http://localhost:3000/api";

async function createLobby() {
    await fetch(`${API_URL}/lobby`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            goto(`/${res.id}`);
        })
        .catch((err) => {
            console.log(err);
        });


}

</script>

<main>

    <section>
        <button class="btn btn-xl variant-filled-primary" on:click={createLobby}>EMPEZAR JUEGO</button>
    </section>

    <section class="p-10">
        <p>Unirse a una partida existente</p>
        <label for="">Codigo de partida:</label>
        <input type="text">
        <button class="btn btn-lg variant-filled-secondary">Entrar</button>
    </section>

</main>