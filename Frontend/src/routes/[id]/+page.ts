import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { playerStore } from '$lib/stores/playerStore';
import { get } from 'svelte/store';

export const ssr = false;

export const load = (async ({ fetch, params }) => {
	const { id } = params;
	const localStorage = get(playerStore);
	const player = localStorage[id];


	if (player != undefined) {
		console.log(player.playerId)
	}

	const URL = PUBLIC_API_URL + 'game/' + id;
	const game = await fetch(URL).then((response) => response.json());

	return {
		game
	};
}) satisfies PageLoad;
