import { sharafEntries } from '#lib/content/sharaf.js';

export const prerender = true;
export const trailingSlash = 'never';

/** Static, same-origin glossary snapshot. No runtime server or external service. */
export function GET(): Response {
	return new Response(JSON.stringify({ schema: 1, entries: sharafEntries }), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}
