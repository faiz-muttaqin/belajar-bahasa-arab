import { dev, version } from '$app/env';
import { immutable, prerendered } from '$app/manifest';
import { self } from '$app/service-worker';
import { CATALOG_PATH, MANIFEST_PATH } from '#lib/catalog/types.js';

const prefix = `belajar-arab:${self.registration.scope}:`;
const cacheName = prefix + version;
const scoped = (path: string) => new URL(path.replace(/^\//, ''), self.registration.scope).href;
const assets = new Set(immutable.map(({ path }) => scoped(path)));
const pages = new Set(
	prerendered
		.filter(({ path }) => path !== CATALOG_PATH && path !== MANIFEST_PATH)
		.map(({ path }) => scoped(path))
);
// Prerendered files are identical across origins. Module requests can carry an
// Origin header absent during precaching, even when the host sends Vary: Origin.
const cacheMatch = { ignoreVary: true };

async function cacheSite() {
	const cache = await caches.open(cacheName);
	try {
		await cache.addAll([...assets, ...pages]);
	} catch (error) {
		await caches.delete(cacheName);
		throw error;
	}
}

async function activateSite() {
	const keys = await caches.keys();
	await Promise.all(
		keys
			.filter((key) => key.startsWith(prefix) && key !== cacheName)
			.map((key) => caches.delete(key))
	);
	await self.clients.claim();
}

async function servePage(request: Request, key: string) {
	const cachedPage = async () => (await caches.open(cacheName)).match(key, cacheMatch);
	try {
		const response = await fetch(request);
		if (response.status < 500) return response;
		return (await cachedPage()) ?? response;
	} catch (error) {
		const saved = await cachedPage();
		if (saved) return saved;
		throw error;
	}
}

if (!dev) {
	self.addEventListener('install', (event) => event.waitUntil(cacheSite()));
	self.addEventListener('activate', (event) => event.waitUntil(activateSite()));
	self.addEventListener('fetch', (event) => {
		const { request } = event;
		if (request.method !== 'GET' || request.headers.has('range')) return;

		const url = new URL(request.url);
		if (!url.href.startsWith(self.registration.scope)) return;
		if (assets.has(url.href)) {
			event.respondWith(
				caches
					.open(cacheName)
					.then(async (cache) => (await cache.match(request, cacheMatch)) ?? fetch(request))
			);
			return;
		}
		// Search parameters belong to the browser. The same prerendered document serves each query.
		const key = url.origin + url.pathname;
		if (pages.has(key)) event.respondWith(servePage(request, key));
	});
}
