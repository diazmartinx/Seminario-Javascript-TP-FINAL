<script lang="ts">

	let player1 = "";
	let player2 = "";
	$: valid = (player1.length > 2 && player2.length > 2 && player1 !== player2);

</script>
<main class="h-screen grid grid-cols-[1fr,0.5fr,1fr] justify-center items-center">
	<div class="m-auto">
			<div>
				<label for="player1" class="text-4xl font-semibold">Jugador 1</label>
				<input
					type="text"
					name="player1"
					id="player1"
					placeholder="Nombre.."
					class="input p-2 my-5"
					bind:value={player1}
					minlength="2"
				/>
			</div>
	</div>

	<div class="m-auto">
		<form action="" method="POST">
			<button disabled={!valid} class="btn btn-xl variant-filled-primary">¡Empezar Partida!</button>
		</form>
		<ul>
			<li></li>
		</ul>
		
	</div>

	<div class="m-auto">
			<div>
				<label for="player2" class="text-4xl font-semibold">Jugador 2</label>
				<input
					type="text"
					name="player2"
					id="player2"
					placeholder="Nombre.."
					class="input my-5"
					bind:value={player2}
					minlength="2"
				/>
			</div>
	</div>
</main>
