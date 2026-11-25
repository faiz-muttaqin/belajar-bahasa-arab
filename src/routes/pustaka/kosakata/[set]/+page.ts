import { error } from '@sveltejs/kit';
import { localContent } from '#lib/content/local/index.js';

export function entries() {
	return localContent.vocabSets().map((set) => ({ set: set.slug }));
}

export async function load({ params }: { params: { set: string } }) {
	const meta = localContent.vocabSet(params.set);
	if (!meta) error(404, 'Daftar kata tidak ditemukan');
	const set = await localContent.loadVocabSet(meta.sourceInfo.id, meta.id);
	if (!set) error(404, 'Berkas daftar kata tidak ditemukan');
	return { set, source: meta.sourceInfo };
}
