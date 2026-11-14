import { catalogJson } from '#lib/server/catalog.js';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	return new Response(catalogJson, {
		headers: { 'content-type': 'application/json; charset=utf-8' }
	});
}
