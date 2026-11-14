import { json } from '@sveltejs/kit';
import { catalogManifest } from '#lib/server/catalog.js';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	return json(catalogManifest);
}
