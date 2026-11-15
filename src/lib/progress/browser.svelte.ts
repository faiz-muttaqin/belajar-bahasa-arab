import { onMount } from 'svelte';
import { readProgress } from './storage.js';
import type { LessonProgress } from './lessons.js';

const progressEvent = 'belajar-bahasa-arab:progres';

function progressChannel() {
	try {
		return new BroadcastChannel(progressEvent);
	} catch {
		// The view still refreshes when the tab becomes visible.
	}
}

export function notifyProgress() {
	window.dispatchEvent(new Event(progressEvent));
	const channel = progressChannel();
	channel?.postMessage(null);
	channel?.close();
}

export function useProgress() {
	let records = $state.raw<LessonProgress[]>([]);
	let status = $state<'initial' | 'loading' | 'ready' | 'unavailable'>('initial');

	onMount(() => {
		let active = true;
		let sequence = 0;
		async function refresh() {
			const request = ++sequence;
			try {
				const next = await readProgress();
				if (!active || request !== sequence) return;
				records = next;
				status = 'ready';
			} catch {
				if (active && request === sequence) status = 'unavailable';
			}
		}
		function refreshVisible() {
			if (document.visibilityState === 'visible') void refresh();
		}
		const channel = progressChannel();
		channel?.addEventListener('message', refresh);
		window.addEventListener(progressEvent, refresh);
		window.addEventListener('pageshow', refresh);
		document.addEventListener('visibilitychange', refreshVisible);
		status = 'loading';
		void refresh();
		return () => {
			active = false;
			channel?.close();
			window.removeEventListener(progressEvent, refresh);
			window.removeEventListener('pageshow', refresh);
			document.removeEventListener('visibilitychange', refreshVisible);
		};
	});

	return {
		get records() {
			return records;
		},
		get status() {
			return status;
		}
	};
}
