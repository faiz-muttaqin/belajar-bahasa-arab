import type { Path } from '$app/types';

export type ReferenceGroupPath =
	'rujukan/fiil/' | 'rujukan/isim/' | 'rujukan/harf/' | 'rujukan/kata-tanya/';
export const groupPathsExist: ReferenceGroupPath extends Path ? true : never = true;

export type ReferenceGroupId = 'fiil' | 'isim' | 'harf' | 'tanya';

export type ReferenceGroup = {
	id: ReferenceGroupId;
	label: string;
	/** Short Arabic term shown beside the label. */
	arabic: string;
	path: ReferenceGroupPath;
	/** One plain sentence: what is on the page. */
	summary: string;
	/** How to recognise this kind of word. */
	hint: string;
	tables: readonly string[];
};

/** Which page each reference table lives on. One source of truth for hub, subnav and search. */
export const referenceGroups: readonly ReferenceGroup[] = [
	{
		id: 'fiil',
		label: 'Kata kerja',
		arabic: 'فِعْل',
		path: 'rujukan/fiil/',
		summary: 'Perubahan bentuk kata kerja dalam 22 kelompok wazan.',
		hint: 'Menyatakan perbuatan atau keadaan, dan berubah menurut waktu.',
		tables: ['tashrif-istilahi']
	},
	{
		id: 'isim',
		label: 'Kata benda dan sifat',
		arabic: 'اِسْم',
		path: 'rujukan/isim/',
		summary: 'Kata ganti, kata tunjuk, kata sifat, dan pola isim turunan.',
		hint: 'Menyebut orang, benda, atau sifat. Bisa diberi الْـ dan tanwin.',
		tables: [
			'kata-ganti-pisah',
			'kata-ganti-sambung',
			'kata-tunjuk',
			'pola-isim-turunan',
			'kata-sifat-mengikuti'
		]
	},
	{
		id: 'harf',
		label: 'Kata hubung dan kata tugas',
		arabic: 'حَرْف',
		path: 'rujukan/harf/',
		summary: 'Penghubung kalimat dan kata kecil seperti فِي dan مِنْ.',
		hint: 'Tidak berarti penuh sendirian; maknanya muncul bersama kata lain.',
		tables: ['kata-penghubung', 'kata-tugas']
	},
	{
		id: 'tanya',
		label: 'Kata tanya',
		arabic: 'أَسْئِلَة',
		path: 'rujukan/kata-tanya/',
		summary: 'Delapan kata tanya untuk percakapan dan bacaan.',
		hint: 'Dipakai di awal kalimat untuk bertanya.',
		tables: ['kata-tanya']
	}
];

export function groupOfTable(tableId: string): ReferenceGroup | undefined {
	return referenceGroups.find((group) => group.tables.includes(tableId));
}
