import { connectorsReference } from './connectors.js';
import { validateReferenceTable, type ReferenceTableData } from '#lib/domain/reference/table.js';

const nutshell =
	'https://www.terjemahmatan.com/2017/03/download-buku-ringkasan-al-amtsilah-at.html';
const classical = 'https://www.sacredlearning.org/resources/fundamentals_vol1.pdf';

const forms = [
	{
		key: 'madhi',
		label: 'Fi‘il madhi',
		explanation: 'Kata kerja lampau. Cari tindakan dan pelakunya.'
	},
	{
		key: 'mudhari',
		label: 'Fi‘il mudhari‘',
		explanation:
			'Kata kerja nonlampau. Baca konteks untuk memilih arti kebiasaan, sedang berlangsung, atau akan terjadi.'
	},
	{
		key: 'mashdar',
		label: 'Mashdar',
		explanation:
			'Nomina untuk perbuatan atau keadaan, tanpa penanda waktu. Pelajari bentuknya bersama setiap kata kerja.'
	},
	{
		key: 'mimi',
		label: 'Mashdar mimi',
		explanation:
			'Nomina perbuatan yang bentuknya dimulai dengan mim tambahan. Bentuknya dapat sama dengan isim tempat atau waktu.'
	},
	{
		key: 'fail',
		label: 'Isim fa‘il / sifat',
		explanation:
			'Sebutan pelaku, atau sifat pada contoh terakhir. Lihat kata di sekitarnya untuk memilih arti yang tepat.'
	},
	{
		key: 'maful',
		label: 'Isim maf‘ul',
		explanation: 'Sebutan yang dikenai tindakan. Contohnya “yang dibuka” dari kata “membuka”.'
	},
	{
		key: 'amr',
		label: 'Fi‘il amr',
		explanation: 'Perintah untuk satu orang laki-laki pada contoh ini.'
	},
	{
		key: 'nahy',
		label: 'Fi‘il nahy',
		explanation: 'Larangan. Partikel lā di sini disertai fi‘il mudhari‘ majzum.'
	},
	{
		key: 'zaman',
		label: 'Isim zaman',
		explanation: 'Bentuk yang menunjuk waktu suatu perbuatan dalam konteks yang sesuai.'
	},
	{
		key: 'makan',
		label: 'Isim makan',
		explanation:
			'Bentuk yang menunjuk tempat suatu perbuatan. Bentuknya sering sama dengan isim zaman.'
	},
	{
		key: 'alah',
		label: 'Isim alat',
		explanation: 'Bentuk yang menunjuk alat. Contoh yang lazim adalah miftāḥ, yaitu kunci.'
	}
] as const;

const roots = [
	{
		key: 'nasara',
		label: 'Bab 1 · Menolong',
		values: [
			'نَصَرَ',
			'يَنْصُرُ',
			'نَصْرٌ',
			'مَنْصَرٌ',
			'نَاصِرٌ',
			'مَنْصُورٌ',
			'اُنْصُرْ',
			'لَا تَنْصُرْ',
			'مَنْصَرٌ',
			'مَنْصَرٌ',
			'مِنْصَرٌ'
		]
	},
	{
		key: 'daraba',
		label: 'Bab 2 · Memukul',
		values: [
			'ضَرَبَ',
			'يَضْرِبُ',
			'ضَرْبٌ',
			'مَضْرَبٌ',
			'ضَارِبٌ',
			'مَضْرُوبٌ',
			'اِضْرِبْ',
			'لَا تَضْرِبْ',
			'مَضْرِبٌ',
			'مَضْرِبٌ',
			'مِضْرَبٌ'
		]
	},
	{
		key: 'fataha',
		label: 'Bab 3 · Membuka',
		values: [
			'فَتَحَ',
			'يَفْتَحُ',
			'فَتْحٌ',
			'مَفْتَحٌ',
			'فَاتِحٌ',
			'مَفْتُوحٌ',
			'اِفْتَحْ',
			'لَا تَفْتَحْ',
			'مَفْتَحٌ',
			'مَفْتَحٌ',
			'مِفْتَاحٌ'
		]
	},
	{
		key: 'alima',
		label: 'Bab 4 · Mengetahui',
		values: ['عَلِمَ', 'يَعْلَمُ', 'عِلْمٌ', 'مَعْلَمٌ', 'عَالِمٌ', 'مَعْلُومٌ', 'اِعْلَمْ', 'لَا تَعْلَمْ', 'مَعْلَمٌ', 'مَعْلَمٌ', '—']
	},
	{
		key: 'hasiba',
		label: 'Bab 5 · Mengira',
		values: [
			'حَسِبَ',
			'يَحْسِبُ',
			'حُسْبَانٌ',
			'مَحْسَبٌ',
			'حَاسِبٌ',
			'مَحْسُوبٌ',
			'اِحْسِبْ',
			'لَا تَحْسِبْ',
			'مَحْسِبٌ',
			'مَحْسِبٌ',
			'—'
		]
	},
	{
		key: 'hasuna',
		label: 'Bab 6 · Menjadi baik',
		values: ['حَسُنَ', 'يَحْسُنُ', 'حُسْنٌ', 'مَحْسَنٌ', 'حَسَنٌ', '—', 'اُحْسُنْ', 'لَا تَحْسُنْ', 'مَحْسَنٌ', 'مَحْسَنٌ', '—']
	}
] as const;

export const tashrifIstilahi: ReferenceTableData = {
	id: 'tashrif-istilahi',
	title: 'Tashrif istilahi',
	caption:
		'Sebelas bentuk untuk enam bab kata kerja dasar tiga huruf. Geser tabel untuk melihat semua bab.',
	reviewStatus: 'draft',
	sources: [nutshell, classical],
	columns: [
		{ key: 'form', label: 'Bentuk', lang: 'id' },
		...roots.map(({ key, label }) => ({ key, label, lang: 'ar' as const, hideable: true }))
	],
	rows: forms.map(({ key, label, explanation }, i) => ({
		id: key,
		cells: {
			form: label,
			...Object.fromEntries(roots.map((root) => [root.key, root.values[i]]))
		},
		explanation
	}))
};

export const particlesReference: ReferenceTableData = {
	id: 'kata-tugas',
	title: 'Kata tugas dalam bacaan',
	caption: 'Baca kata tugas bersama kata atau klausa yang mengikutinya.',
	reviewStatus: 'draft',
	sources: [
		'https://madinaharabic.com/free-content/grammar',
		'https://corpus.quran.com/documentation/pos.jsp'
	],
	columns: [
		{ key: 'arabic', label: 'Bentuk', lang: 'ar', hideable: true },
		{ key: 'meaning', label: 'Arti dalam konteks', lang: 'id', hideable: true },
		{ key: 'example', label: 'Contoh', lang: 'ar' }
	],
	rows: [
		{
			id: 'fi',
			cells: { arabic: 'فِي', meaning: 'di dalam', example: 'فِي الْحَقِيبَةِ' },
			explanation: 'Frasa ini berarti “di dalam tas”.'
		},
		{
			id: 'min',
			cells: { arabic: 'مِنْ', meaning: 'dari', example: 'مِنَ الْمَكْتَبَةِ' },
			explanation: 'Frasa ini berarti “dari perpustakaan”.'
		},
		{
			id: 'ila',
			cells: { arabic: 'إِلَى', meaning: 'ke, menuju', example: 'إِلَى الْمَدْرَسَةِ' },
			explanation: 'Frasa ini menyatakan tujuan, “ke sekolah”.'
		},
		{
			id: 'ala',
			cells: { arabic: 'عَلَى', meaning: 'di atas', example: 'عَلَى الْكُرْسِيِّ' },
			explanation: 'Frasa ini menunjukkan letak, “di atas kursi”.'
		},
		{
			id: 'thumma',
			cells: { arabic: 'ثُمَّ', meaning: 'lalu, kemudian', example: 'قَرَأَ ثُمَّ كَتَبَ.' },
			explanation: 'Ia membaca, kemudian menulis. Dua kegiatan disebut berurutan.'
		},
		{
			id: 'lianna',
			cells: { arabic: 'لِأَنَّ', meaning: 'karena', example: 'خَرَجَ لِأَنَّ الدَّرْسَ انْتَهَى.' },
			explanation: 'Ia keluar karena pelajaran sudah selesai. Klausa kedua memberi alasan.'
		},
		{
			id: 'lakin',
			cells: { arabic: 'لَكِنَّ', meaning: 'tetapi', example: 'الْقِصَّةُ قَصِيرَةٌ، لَكِنَّهَا صَعْبَةٌ.' },
			explanation: 'Ceritanya pendek, tetapi sulit. Akhiran -hā merujuk pada cerita.'
		}
	]
};

export const referenceTables = [tashrifIstilahi, connectorsReference, particlesReference] as const;

for (const table of referenceTables) {
	const issues = validateReferenceTable(table);
	if (issues.length || !table.sources.length) {
		throw new Error(
			`Tabel ${table.id} tidak lengkap: ${issues.map((issue) => issue.message).join(', ')}`
		);
	}
}
