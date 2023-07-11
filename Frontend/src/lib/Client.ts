import { PUBLIC_API_URL } from '$env/static/public';

export async function createGame() {
	const URL = PUBLIC_API_URL + 'game';
	const game = await fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((response) => response.json());
	return game;
}

export async function createPlayer(name: string, color: string, gameID: string) {
	const URL = PUBLIC_API_URL + 'game/' + gameID + '/join';
	const player = await fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			color
		})
	}).then((response) => response.json());
	return player;
}
