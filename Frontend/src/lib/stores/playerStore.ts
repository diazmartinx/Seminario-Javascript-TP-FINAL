import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const playerStore: Writable<string> = localStorageStore('playerStore', '{}');

playerStore.subscribe(() => {}); // logs '0'
