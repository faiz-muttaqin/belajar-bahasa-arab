import { validateReferenceTable, type ReferenceTableData } from '#lib/domain/reference/table.js';

/**
 * R-03: original, mechanically constructed reading-reference material.
 * The marks are displayed on tatweel, not on a dotted circle.
 *
 * References: project's own Iqra lessons A2-01, A2-02, A3-01 and W3C ALREQ.
 * Distinguish pronunciation in connected reading from pausing (waqf).
 * Human phonetic/Arabic-teacher review is still required.
 */
export const harakatReference: ReferenceTableData = {
	id: 'bagan-harakat',
	title: 'Bagan harakat dan tanda baca',
	caption:
		'Tanda pada garis sambung Arab (ـ) dan contoh baca. Urutan bunyi Latin hanya bantuan awal.',
	reviewStatus: 'draft',
	sources: ['https://www.w3.org/TR/alreq/'],
	columns: [
		{ key: 'kelompok', label: 'Kelompok', lang: 'id' },
		{ key: 'tanda', label: 'Tanda', lang: 'ar' },
		{ key: 'contoh', label: 'Contoh', lang: 'ar' },
		{ key: 'bunyi', label: 'Bunyi', lang: 'id', hideable: true }
	],
	rows: [
		{
			id: 'fathah',
			cells: { kelompok: 'Harakat pendek', tanda: 'ـَ', contoh: 'بَ', bunyi: 'ba' },
			explanation: 'Fathah memberi vokal pendek a pada huruf sebelumnya.'
		},
		{
			id: 'kasrah',
			cells: { kelompok: 'Harakat pendek', tanda: 'ـِ', contoh: 'بِ', bunyi: 'bi' },
			explanation: 'Kasrah memberi vokal pendek i. Posisi tanda berada di bawah huruf.'
		},
		{
			id: 'dammah',
			cells: { kelompok: 'Harakat pendek', tanda: 'ـُ', contoh: 'بُ', bunyi: 'bu' },
			explanation: 'Dammah memberi vokal pendek u.'
		},
		{
			id: 'sukun',
			cells: { kelompok: 'Penutup suku kata', tanda: 'ـْ', contoh: 'مِنْ', bunyi: 'min' },
			explanation: 'Nun pada مِنْ bersukun. Ucapkan konsonan n tanpa menambahkan vokal setelahnya.'
		},
		{
			id: 'tasydid',
			cells: { kelompok: 'Konsonan rangkap', tanda: 'ـَّ', contoh: 'مَرَّ', bunyi: 'mar-ra' },
			explanation:
				'Tasydid merangkap konsonan. Pada contoh, bunyi r menutup bagian mar dan membuka ra.'
		},
		{
			id: 'dammatain',
			cells: { kelompok: 'Tanwin', tanda: 'ـٌ', contoh: 'قَلَمٌ', bunyi: 'qalamun' },
			explanation:
				'Dammatain dibaca dengan akhir -un saat disambung. Ketika berhenti, bunyinya bisa berubah.'
		},
		{
			id: 'fathatain',
			cells: { kelompok: 'Tanwin', tanda: 'ـً', contoh: 'قَلَمًا', bunyi: 'qalaman' },
			explanation: 'Fathatain dibaca dengan akhir -an saat disambung. Aturan waqf dibahas terpisah.'
		},
		{
			id: 'kasratain',
			cells: { kelompok: 'Tanwin', tanda: 'ـٍ', contoh: 'قَلَمٍ', bunyi: 'qalamin' },
			explanation: 'Kasratain dibaca dengan akhir -in saat disambung. Ini bukan kasrah biasa.'
		},
		{
			id: 'mad-alif',
			cells: { kelompok: 'Vokal panjang', tanda: 'ـَا', contoh: 'بَا', bunyi: 'bā' },
			explanation: 'Fathah diikuti alif dalam susunan ini menghasilkan vokal panjang ā.'
		},
		{
			id: 'mad-ya',
			cells: { kelompok: 'Vokal panjang', tanda: 'ـِي', contoh: 'بِي', bunyi: 'bī' },
			explanation: 'Kasrah sebelum ya yang menjadi huruf mad menghasilkan vokal panjang ī.'
		},
		{
			id: 'mad-waw',
			cells: { kelompok: 'Vokal panjang', tanda: 'ـُو', contoh: 'بُو', bunyi: 'bū' },
			explanation: 'Dammah sebelum waw yang menjadi huruf mad menghasilkan vokal panjang ū.'
		}
	]
};

const issues = validateReferenceTable(harakatReference);
if (issues.length) {
	throw new Error('Bagan harakat tidak valid: ' + issues.map((issue) => issue.message).join('; '));
}
