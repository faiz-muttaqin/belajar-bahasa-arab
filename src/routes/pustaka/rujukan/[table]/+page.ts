import { error } from '@sveltejs/kit';
import { localContent } from '#lib/content/local/index.js';

export function entries() {
	return localContent.tables().map((table) => ({ table: table.slug }));
}

export async function load({ params }: { params: { table: string } }) {
	const meta = localContent.table(params.table);
	if (!meta) error(404, 'Tabel tidak ditemukan');
	const table = await localContent.loadTable(meta.sourceInfo.id, meta.id);
	if (!table) error(404, 'Berkas tabel tidak ditemukan');
	return { table, source: meta.sourceInfo };
}
