/**
 * TEST FIXTURE — NOT A LESSON.
 *
 * UI preview data, used only by the DEV-only preview components in this folder. Pages load
 * those with a dynamic import inside `import.meta.env.DEV`, so none of it reaches the
 * production build (guarded by an e2e test). The Arabic strings are the typography QA
 * specimens listed in docs/arabic-learning-stack-guide-sveltekit.md §7, not curriculum. The "without harakat"
 * column is derived mechanically by `stripHarakat`, not authored.
 */
import { stripHarakat } from '#lib/domain/arabic/harakat.js';
import type { ReferenceTableData } from '#lib/domain/reference/table.js';

export const FIXTURE_LABEL = 'TEST FIXTURE — NOT A LESSON';

const specimens = [
	{ id: 'specimen-1', text: 'بِسْمِ اللَّهِ', checks: 'kasrah, sukun, shaddah, ligatur lafẓ Allah' },
	{ id: 'specimen-2', text: 'السَّلَامُ عَلَيْكُمْ', checks: 'shaddah + fathah, sukun, mim akhir' },
	{ id: 'specimen-3', text: 'مُعَلِّمٌ', checks: 'shaddah + kasrah, tanwin dammah' },
	{ id: 'specimen-4', text: 'قُرْآنٌ', checks: 'sukun, alif maddah, tanwin dammah' }
];

export const previewTable: ReferenceTableData = {
	id: 'fixture-harakat-specimens',
	title: 'Contoh tabel (data uji)',
	caption: 'Spesimen QA tipografi: dengan dan tanpa harakat',
	reviewStatus: 'fixture',
	sources: ['docs/arabic-learning-stack-guide-sveltekit.md §7 (specimen list)'],
	columns: [
		{ key: 'vocalised', label: 'Berharakat', lang: 'ar', hideable: true },
		{ key: 'plain', label: 'Tanpa harakat', lang: 'ar', hideable: true },
		{ key: 'checks', label: 'Yang diperiksa', lang: 'id' }
	],
	rows: specimens.map((s) => ({
		id: s.id,
		cells: { vocalised: s.text, plain: stripHarakat(s.text), checks: s.checks },
		explanation:
			'Data uji untuk memeriksa tampilan tanda baca Arab: tanda harus terlihat utuh, tidak terpotong dan tidak bertabrakan. Bukan materi pelajaran.'
	}))
};

export const previewSpecimen = specimens[1]!.text;
