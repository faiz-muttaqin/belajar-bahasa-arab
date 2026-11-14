import type { ReferenceTableData } from '#lib/domain/reference/table.js';

const examples = [
	{
		id: 'wa',
		arabic: 'وَ',
		meaning: 'dan',
		relation: 'Penambahan',
		effect:
			'Saat menghubungkan dua kata setara, kata kedua mengikuti status i‘rab kata pertama. Urutan waktu perlu dibaca dari konteks.',
		example: 'قَرَأْتُ الْكِتَابَ وَالرِّسَالَةَ.',
		explanation: 'Saya membaca buku dan surat itu. Keduanya berstatus nashab karena menjadi objek.'
	},
	{
		id: 'fa',
		arabic: 'فَـ',
		meaning: 'lalu, maka',
		relation: 'Urutan dekat atau akibat',
		effect:
			'Sebagai penghubung dalam contoh ini, fa tidak menashabkan verba. Kedua verba tetap madhi.',
		example: 'وَصَلَتْ لِينَا فَدَخَلَتْ.',
		explanation:
			'Lina tiba lalu langsung masuk. Ada pemakaian fa yang lain, misalnya fa sebab setelah larangan, yang dapat diikuti mudhari‘ manshub.'
	},
	{
		id: 'thumma',
		arabic: 'ثُمَّ',
		meaning: 'kemudian',
		relation: 'Urutan dengan jeda',
		effect: 'Saat menghubungkan klausa seperti contoh ini, kedua verba tetap dalam bentuk madhi.',
		example: 'قَرَأَتْ لِينَا ثُمَّ كَتَبَتْ.',
		explanation: 'Lina membaca, kemudian menulis. Jeda tidak harus disebut durasinya.'
	},
	{
		id: 'aw',
		arabic: 'أَوْ',
		meaning: 'atau',
		relation: 'Pilihan',
		effect:
			'Kata setelah aw berada dalam kedudukan yang sama dengan kata yang dihubungkan. Pada contoh ini, keduanya objek manshub.',
		example: 'تَقْرَأُ لِينَا كِتَابًا أَوْ رِسَالَةً.',
		explanation: 'Lina membaca buku atau surat. Tanwin fathah tampak pada kedua pilihan.'
	},
	{
		id: 'lianna',
		arabic: 'لِأَنَّ',
		meaning: 'karena',
		relation: 'Alasan',
		effect: 'Isim setelah أَنَّ manshub. Khabar satu kata biasanya marfu‘.',
		example: 'خَرَجَتْ لِأَنَّ الْغُرْفَةَ بَارِدَةٌ.',
		explanation: 'Ia keluar karena ruangan dingin. الْغُرْفَةَ manshub dan بَارِدَةٌ marfu‘.'
	},
	{
		id: 'lidhalika',
		arabic: 'لِذَلِكَ',
		meaning: 'oleh karena itu',
		relation: 'Akibat atau kesimpulan',
		effect:
			'Lam jarr berlaku pada kata tunjuk dalam ungkapan ini. Klausa berikutnya memiliki i‘rabnya sendiri.',
		example: 'تَأَخَّرَتِ الْحَافِلَةُ، لِذَلِكَ بَدَأَ الدَّرْسُ مُتَأَخِّرًا.',
		explanation:
			'Bus terlambat, karena itu pelajaran mulai terlambat. الدَّرْسُ tetap marfu‘ sebagai pelaku gramatikal dari بَدَأَ.'
	},
	{
		id: 'lakin',
		arabic: 'وَلَكِنَّ',
		meaning: 'tetapi',
		relation: 'Kontras atau koreksi',
		effect: 'Isim لَكِنَّ manshub. Jika khabarnya satu kata seperti pada contoh, khabar itu marfu‘.',
		example: 'الطَّرِيقُ طَوِيلٌ، وَلَكِنَّ الْمَشْيَ سَهْلٌ.',
		explanation: 'Jalannya panjang, tetapi berjalan kaki mudah. الْمَشْيَ berfathah dan سَهْلٌ berdammah.'
	},
	{
		id: 'kama',
		arabic: 'كَمَا',
		meaning: 'seperti, sebagaimana',
		relation: 'Kesamaan',
		effect: 'Dalam contoh, كَمَا menghubungkan dua tindakan untuk menyatakan kesamaan cara.',
		example: 'كَتَبْتُ كَمَا كَتَبَتْ لِينَا.',
		explanation: 'Saya menulis seperti Lina menulis. Verba di kedua bagian tetap madhi.'
	},
	{
		id: 'an',
		arabic: 'أَنْ',
		meaning: 'untuk, bahwa',
		relation: 'Menghubungkan verba dengan isi keinginan atau tujuan',
		effect:
			'Menashabkan fi‘il mudhari‘. Tanda nashab di contoh adalah fathah; pada bentuk seperti يُحْضِرُونَ, nun akhirnya gugur.',
		example: 'أُرِيدُ أَنْ أَقْرَأَ.',
		explanation: 'Saya ingin membaca. أَقْرَأُ menjadi أَقْرَأَ setelah أَنْ.'
	},
	{
		id: 'anna',
		arabic: 'أَنَّ',
		meaning: 'bahwa',
		relation: 'Isi pengetahuan atau pengamatan',
		effect: 'Menashabkan isim. Khabar satu kata seperti pada contoh ini tetap marfu‘.',
		example: 'عَرَفْتُ أَنَّ الْبَابَ مَفْتُوحٌ.',
		explanation:
			'Saya tahu bahwa pintu itu terbuka. Tasydid pada nun membedakannya dari أَنْ yang diikuti verba mudhari‘.'
	},
	{
		id: 'qabla',
		arabic: 'قَبْلَ أَنْ',
		meaning: 'sebelum',
		relation: 'Waktu relatif',
		effect:
			'قَبْلَ adalah isim yang berfungsi sebagai keterangan waktu. Partikel أَنْ yang menashabkan verba sesudahnya.',
		example: 'قَبْلَ أَنْ تُغَادِرَ الْحَافِلَةُ، رَأَتْ لِينَا حَقِيبَةً.',
		explanation:
			'Sebelum bus berangkat, Lina melihat tas. تُغَادِرَ manshub; الْحَافِلَةُ tetap marfu‘ sebagai pelaku.'
	},
	{
		id: 'idha',
		arabic: 'إِذَا',
		meaning: 'jika, apabila',
		relation: 'Syarat atau waktu',
		effect: 'Mengantar syarat. Dalam pola ini, إِذَا tidak menjazmkan verba.',
		example: 'إِذَا وَصَلَتْ لِينَا جَلَسَتْ.',
		explanation:
			'Apabila Lina tiba, ia duduk. وَصَلَتْ menyatakan syarat; جَلَسَتْ menyatakan apa yang terjadi sesudahnya.'
	}
] as const;

export const connectorsReference: ReferenceTableData = {
	id: 'kata-penghubung',
	title: 'Glosarium kata penghubung',
	caption: 'Coba ingat fungsi dan efek i‘rab tiap penghubung sebelum membuka jawabannya.',
	reviewStatus: 'draft',
	sources: [
		'https://corpus.quran.com/documentation/conjunction.jsp',
		'https://corpus.quran.com/documentation/particlefa.jsp',
		'https://corpus.quran.com/documentation/mood.jsp',
		'https://madinaharabic.com/free-content/grammar/lesson-60/part-1'
	],
	columns: [
		{ key: 'arabic', label: 'Bentuk', lang: 'ar', hideable: true },
		{ key: 'meaning', label: 'Arti', lang: 'id', hideable: true },
		{ key: 'relation', label: 'Hubungan', lang: 'id', hideable: true },
		{ key: 'effect', label: 'Efek pada kalimat', lang: 'id', hideable: true },
		{ key: 'example', label: 'Contoh', lang: 'ar' }
	],
	rows: examples.map(({ id, explanation, ...cells }) => ({ id, explanation, cells }))
};
