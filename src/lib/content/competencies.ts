import type { Competency, Prerequisite, RoadmapSource } from '#lib/domain/roadmap/types.js';

const graphUrl =
	'https://github.com/faiz-muttaqin/belajar-bahasa-arab/blob/main/docs/curriculum/COMPETENCY_GRAPH.md';
export const competencySources = {
	graph: {
		label: 'Graf kompetensi · node dan prasyarat (§2, §7)',
		href: `${graphUrl}#2-nodes`,
		usageType: 'independent-original'
	},
	reading: {
		label: 'Graf kompetensi · cakupan bacaan tingkat menengah',
		href: `${graphUrl}#cakupan-bacaan-tingkat-menengah`,
		usageType: 'independent-original'
	},
	lessons: {
		label: 'Pelajaran publik · tujuan dan bukti pemahaman',
		href: 'https://github.com/faiz-muttaqin/belajar-bahasa-arab/blob/main/docs/content/public-lessons.md',
		usageType: 'independent-original'
	}
} satisfies Record<string, RoadmapSource>;

function prerequisites(
	soft: readonly string[] = [],
	optional: readonly string[] = [],
	hard: readonly [id: string, impossibleBecause: string][] = []
): Prerequisite[] {
	return [
		...hard.map(([id, impossibleBecause]) => ({
			id,
			strength: 'hard' as const,
			impossibleBecause
		})),
		...soft.map((id) => ({ id, strength: 'soft' as const })),
		...optional.map((id) => ({ id, strength: 'optional' as const }))
	];
}

function node(
	id: string,
	titleId: string,
	canDo: string,
	dependencies: readonly Prerequisite[] = []
): Competency {
	return {
		id,
		track: id.startsWith('CA-') ? 'A' : id.startsWith('CB-') ? 'B' : 'reference',
		titleId,
		canDo,
		prerequisites: dependencies,
		sources: [
			/^CB-2[234]$/u.test(id) ? competencySources.reading : competencySources.graph,
			competencySources.lessons
		],
		reviewStatus: 'draft'
	};
}

/** Existing graph and lesson goals, rewritten in Indonesian; no new Arabic material. */
export const competencies: readonly Competency[] = [
	node(
		'CA-01',
		'Membedakan bunyi yang sering tertukar',
		'Saya bisa membedakan bunyi Arab yang sering tertukar.'
	),
	node(
		'CA-02',
		'Mengenali huruf dan bentuknya',
		'Saya bisa mengenali huruf dari titik dan bentuk sambungannya.'
	),
	node(
		'CA-03',
		'Membaca harakat, vokal panjang, sukun',
		'Saya bisa membaca harakat pendek, vokal panjang dan sukun pada rangkaian baru.',
		prerequisites(
			['CA-01'],
			[],
			[['CA-02', 'Tanda vokal dibaca bersama huruf yang harus dikenali lebih dahulu.']]
		)
	),
	node(
		'CA-04',
		'Membaca tasydid dan tanwin',
		'Saya bisa membaca konsonan rangkap dan akhir tanwin.',
		prerequisites([], [], [['CA-03', 'Tasydid dan tanwin dibaca bersama tanda vokal.']])
	),
	node(
		'CA-06',
		'Membaca al- dan hamzah waṣl',
		'Saya bisa membaca al- dan hamzah waṣl saat menyambung bacaan.',
		prerequisites(
			[],
			[],
			[['CA-03', 'Membaca al- dan hamzah waṣl dalam konteks memerlukan pembacaan vokal.']]
		)
	),
	node(
		'CA-05',
		'Membaca ungkapan dan kalimat pendek berharakat',
		'Saya bisa membaca kalimat pendek berharakat dan mengelompokkan maknanya.',
		prerequisites(
			['CA-04', 'CA-06'],
			[],
			[['CA-03', 'Membaca ungkapan baru tanpa bantuan memerlukan pembacaan vokal.']]
		)
	),
	node(
		'CB-01',
		'Kata inti bacaan shalat',
		'Saya tahu arti kata inti yang saya ucapkan dalam shalat.'
	),
	node(
		'CB-02',
		'Varian bacaan shalat berdampingan',
		'Saya bisa membandingkan varian bacaan dengan kata inti yang sama.',
		prerequisites(['CB-01'])
	),
	node('CB-03', 'Benda di sekitar', 'Saya bisa mengenali makna kata untuk benda di sekitar.'),
	node(
		'CB-04',
		'Menunjuk dan bertanya',
		'Saya bisa memahami pertanyaan tentang benda atau orang yang ditunjuk.',
		prerequisites(['CB-03'])
	),
	node(
		'CB-05',
		'Yang tertentu: al-',
		'Saya bisa membedakan sebuah benda dan benda tertentu.',
		prerequisites(['CB-04'], ['CA-06'])
	),
	node(
		'CB-06',
		'Kalimat nominal sederhana',
		'Saya bisa membedakan frasa penunjuk dan informasi baru dalam kalimat.',
		prerequisites(['CB-04', 'CB-05'])
	),
	node(
		'CB-07',
		'Lokasi dengan ḥarf jarr',
		'Saya bisa memahami di mana sesuatu berada.',
		prerequisites(['CB-03'])
	),
	node(
		'CB-08',
		'Kata ganti terpisah',
		'Saya bisa melacak siapa yang dibicarakan dari kata ganti.',
		prerequisites(['CB-06'])
	),
	node(
		'CB-09',
		'Milik: iḍāfah',
		'Saya bisa memahami milik siapa sesuatu dan menemukan benda utama dalam frasa.',
		prerequisites(['CB-03', 'CB-05'])
	),
	node(
		'CB-10',
		'Kata tunjuk feminin dan penanda gender',
		'Saya mengenali kata tunjuk untuk kata berjenis feminin.',
		prerequisites(['CB-04'])
	),
	node(
		'CB-11',
		'Frasa sifat',
		'Saya bisa membedakan sifat dalam frasa dan sifat yang memberi kabar.',
		prerequisites(['CB-05', 'CB-10'])
	),
	node(
		'CB-12',
		'Kata ganti melekat',
		'Saya bisa menemukan pemilik dari akhiran kata dan konteksnya.',
		prerequisites(['CB-08', 'CB-09'])
	),
	node(
		'CB-13',
		'Kata kerja paling sering',
		'Saya memahami kata kerja yang sering dipakai pada contoh pelajaran.',
		prerequisites(['CB-06'])
	),
	node(
		'CB-14',
		'Pelaku dan tindakan',
		'Saya bisa memahami siapa melakukan apa dan apakah pelaku disebutkan.',
		prerequisites(['CB-03', 'CB-13'])
	),
	node(
		'CB-15',
		'Lampau dan bukan lampau',
		'Saya bisa membedakan aksi lampau dan bukan lampau serta cakupan negasinya.',
		prerequisites(['CB-13', 'CB-14'])
	),
	node(
		'CB-16',
		'Tiga jenis kata',
		'Saya bisa membedakan isim, fi‘il dan harf dengan contoh serta memisahkan bentuk dan perannya.',
		prerequisites(['CB-06', 'CB-07', 'CB-14'])
	),
	node(
		'CB-17',
		'Gender dan jumlah',
		'Saya bisa menemukan tunggal, ganda dan jamak dari bentuk serta peran kata.',
		prerequisites(['CB-10', 'CB-11'])
	),
	node(
		'CB-18',
		'Keluarga akar kata',
		'Saya bisa memakai tashrif untuk membaca keluarga kata yang sudah dikenal.',
		prerequisites(['CB-15'])
	),
	node(
		'CB-19',
		'Kata tugas Al-Qur’an paling sering',
		'Saya bisa membaca fungsi kata tugas yang telah diperkenalkan dalam konteks.',
		prerequisites(['CB-04', 'CB-07'], ['CB-01'])
	),
	node(
		'CB-20',
		'Bertanya dan dialog pendek',
		'Saya bisa memahami tanya jawab pendek tentang orang dan benda.',
		prerequisites(['CB-04', 'CB-08'])
	),
	node(
		'CB-21',
		'Integrasi dan transfer',
		'Saya bisa menerapkan pemahaman bacaan pada dokumen baru dan menunjukkan buktinya.',
		prerequisites(['CB-11', 'CB-15', 'CB-20'])
	),
	node(
		'CB-22',
		'Hubungan antarkalimat',
		'Saya bisa menjelaskan alasan, akibat, urutan atau kontras dan menunjuk penandanya.',
		prerequisites(['CB-07', 'CB-12', 'CB-15'])
	),
	node(
		'CB-23',
		'Gagasan utama paragraf',
		'Saya bisa menulis gagasan utama paragraf dan memilih detail pendukungnya.',
		prerequisites(['CB-22'])
	),
	node(
		'CB-24',
		'Struktur dan ringkasan dokumen',
		'Saya bisa menjelaskan fungsi paragraf, melacak rujukan dan merangkum dokumen pendek.',
		prerequisites(['CB-12', 'CB-22', 'CB-23'])
	),
	node(
		'CR-01',
		'Tabel tashrif istilahi',
		'Saya bisa menggunakan tabel tashrif sebagai rujukan bentuk yang sudah dipahami.',
		prerequisites(['CB-15'], ['CB-18'])
	),
	node(
		'CR-02',
		'Tabel jenis ḥarf',
		'Saya bisa menggunakan tabel partikel untuk memeriksa fungsinya dalam contoh.',
		prerequisites(['CB-07'], ['CB-16'])
	),
	node(
		'CR-03',
		'I‘rab: empat keadaan akhir kata',
		'Saya bisa memeriksa keadaan akhir kata pada kalimat yang sudah dikenal.',
		prerequisites(['CB-06', 'CB-14', 'CB-16'])
	)
];
