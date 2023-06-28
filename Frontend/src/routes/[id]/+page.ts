import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ params }) => {
	const { id } = params;
	const URL = PUBLIC_API_URL + 'lobby/' + id;
	const lobby = await fetch(URL).then((response) => response.json());
	return {
		lobby
	};
}) satisfies PageLoad;
