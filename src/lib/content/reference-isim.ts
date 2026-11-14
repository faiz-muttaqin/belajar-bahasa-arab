import type { ReferenceTableData } from '#lib/domain/reference/table.js';

const corpus = 'https://corpus.quran.com/documentation';
const madinah = 'https://madinaharabic.com/free-content/grammar';

type Row = readonly [id: string, arabic: string, meaning: string, example: string, note: string];

function rows(items: readonly Row[]) {
	return items.map(([id, arabic, meaning, example, explanation]) => ({
		id,
		cells: { arabic, meaning, example },
		explanation
	}));
}

const lookColumns = [
	{ key: 'arabic', label: 'Bentuk', lang: 'ar', hideable: true },
	{ key: 'meaning', label: 'Arti', lang: 'id', hideable: true },
	{ key: 'example', label: 'Contoh', lang: 'ar' }
] as const;

export const separatePronouns: ReferenceTableData = {
	id: 'kata-ganti-pisah',
	title: 'Kata ganti berdiri sendiri',
	caption: 'Dua belas bentuk, dari orang ketiga sampai orang pertama.',
	reviewStatus: 'draft',
	sources: [`${corpus}/pronoun.jsp`, `${madinah}`],
	columns: [...lookColumns],
	rows: rows([
		['huwa', 'هُوَ', 'dia (laki-laki)', 'هُوَ طَالِبٌ.', 'Dia seorang pelajar.'],
		['hiya', 'هِيَ', 'dia (perempuan)', 'هِيَ طَالِبَةٌ.', 'Dia seorang pelajar putri.'],
		[
			'huma',
			'هُمَا',
			'mereka berdua',
			'هُمَا طَالِبَانِ.',
			'Mereka berdua pelajar. Bentuk untuk dua orang.'
		],
		['hum', 'هُمْ', 'mereka (laki-laki)', 'هُمْ طُلَّابٌ.', 'Mereka para pelajar.'],
		['hunna', 'هُنَّ', 'mereka (perempuan)', 'هُنَّ طَالِبَاتٌ.', 'Mereka para pelajar putri.'],
		['anta', 'أَنْتَ', 'kamu (laki-laki)', 'أَنْتَ مُعَلِّمٌ.', 'Kamu seorang guru.'],
		[
			'anti',
			'أَنْتِ',
			'kamu (perempuan)',
			'أَنْتِ مُعَلِّمَةٌ.',
			'Kamu seorang guru putri. Bedanya dengan أَنْتَ hanya harakat akhir.'
		],
		['antuma', 'أَنْتُمَا', 'kalian berdua', 'أَنْتُمَا مُعَلِّمَانِ.', 'Kalian berdua guru.'],
		['antum', 'أَنْتُمْ', 'kalian (laki-laki)', 'أَنْتُمْ مُعَلِّمُونَ.', 'Kalian para guru.'],
		['antunna', 'أَنْتُنَّ', 'kalian (perempuan)', 'أَنْتُنَّ مُعَلِّمَاتٌ.', 'Kalian para guru putri.'],
		['ana', 'أَنَا', 'saya', 'أَنَا قَارِئٌ.', 'Saya seorang pembaca.'],
		[
			'nahnu',
			'نَحْنُ',
			'kami, kita',
			'نَحْنُ قُرَّاءٌ.',
			'Kami para pembaca. Satu bentuk untuk “kami” dan “kita”.'
		]
	])
};

export const attachedPronouns: ReferenceTableData = {
	id: 'kata-ganti-sambung',
	title: 'Kata ganti yang menempel',
	caption: 'Akhiran pada kata benda berarti “milik”. Di sini dipasang pada كِتَابٌ.',
	reviewStatus: 'draft',
	sources: [`${corpus}/pronoun.jsp`, `${madinah}`],
	columns: [
		{ key: 'arabic', label: 'Akhiran', lang: 'ar', hideable: true },
		{ key: 'meaning', label: 'Arti', lang: 'id', hideable: true },
		{ key: 'example', label: 'Dipasang pada “buku”', lang: 'ar' }
	],
	rows: rows([
		[
			'hu',
			'ـهُ',
			'-nya (laki-laki)',
			'كِتَابُهُ',
			'Bukunya (milik dia laki-laki). Setelah kasrah atau ya, bunyinya menjadi ـهِ.'
		],
		['ha', 'ـهَا', '-nya (perempuan)', 'كِتَابُهَا', 'Bukunya (milik dia perempuan).'],
		['hum', 'ـهُمْ', '-nya (mereka)', 'كِتَابُهُمْ', 'Buku mereka.'],
		['ka', 'ـكَ', '-mu (laki-laki)', 'كِتَابُكَ', 'Bukumu.'],
		['ki', 'ـكِ', '-mu (perempuan)', 'كِتَابُكِ', 'Bukumu. Beda dengan ـكَ hanya pada harakat.'],
		['i', 'ـي', '-ku', 'كِتَابِي', 'Bukuku. Huruf sebelum ya diberi kasrah.'],
		['na', 'ـنَا', '-kami, -kita', 'كِتَابُنَا', 'Buku kami atau buku kita.']
	])
};

export const demonstratives: ReferenceTableData = {
	id: 'kata-tunjuk',
	title: 'Kata tunjuk',
	caption: 'Dekat atau jauh, laki-laki atau perempuan, tunggal atau jamak.',
	reviewStatus: 'draft',
	sources: [`${corpus}/demonstrative.jsp`, `${madinah}`],
	columns: [...lookColumns],
	rows: rows([
		['hadha', 'هَذَا', 'ini (laki-laki)', 'هَذَا كِتَابٌ.', 'Ini sebuah buku.'],
		['hadhihi', 'هَذِهِ', 'ini (perempuan)', 'هَذِهِ مَدْرَسَةٌ.', 'Ini sebuah sekolah.'],
		['dhalika', 'ذَلِكَ', 'itu (laki-laki)', 'ذَلِكَ بَابٌ.', 'Itu sebuah pintu.'],
		['tilka', 'تِلْكَ', 'itu (perempuan)', 'تِلْكَ سَيَّارَةٌ.', 'Itu sebuah mobil.'],
		[
			'haula',
			'هَؤُلَاءِ',
			'mereka ini (jamak)',
			'هَؤُلَاءِ طُلَّابٌ.',
			'Mereka ini para pelajar. Bentuk jamak untuk laki-laki dan perempuan.'
		],
		[
			'ulaika',
			'أُولَئِكَ',
			'mereka itu (jamak)',
			'أُولَئِكَ مُعَلِّمُونَ.',
			'Mereka itu para guru. Bentuk untuk dua orang (dual) belum dimasukkan.'
		]
	])
};

export const derivedPatterns: ReferenceTableData = {
	id: 'pola-isim-turunan',
	title: 'Pola kata sifat dan isim turunan',
	caption: 'Beberapa pola umum. Kenali polanya, lalu tebak arti dari akar katanya.',
	reviewStatus: 'draft',
	sources: [
		`${corpus}/activeparticiple.jsp`,
		`${corpus}/passiveparticiple.jsp`,
		`${corpus}/adjective.jsp`
	],
	columns: [
		{ key: 'pattern', label: 'Pola', lang: 'ar', hideable: true },
		{ key: 'meaning', label: 'Makna pola', lang: 'id', hideable: true },
		{ key: 'example', label: 'Contoh', lang: 'ar' }
	],
	rows: [
		[
			'fail',
			'فَاعِل',
			'pelaku, yang melakukan',
			'كَاتِبٌ',
			'Penulis, dari akar ك ت ب. Disebut isim fa‘il.'
		],
		[
			'maful',
			'مَفْعُول',
			'yang dikenai perbuatan',
			'مَكْتُوبٌ',
			'Yang ditulis, dari akar ك ت ب. Disebut isim maf‘ul.'
		],
		[
			'fail-sifat',
			'فَعِيل',
			'sifat yang melekat',
			'كَبِيرٌ',
			'Besar. Pola ini banyak dipakai sebagai kata sifat.'
		],
		[
			'afal',
			'أَفْعَل',
			'warna, cacat, atau “lebih”',
			'أَحْمَرُ',
			'Merah (perempuan: حَمْرَاءُ). Pola yang sama dipakai untuk perbandingan, misalnya أَكْبَرُ, “lebih besar”.'
		],
		['fa-lan', 'فَعْلَان', 'keadaan sesaat', 'عَطْشَانُ', 'Haus. Perempuannya عَطْشَى.'],
		['faal', 'فَعَّال', 'pelaku profesi atau pelaku berulang', 'نَجَّارٌ', 'Tukang kayu.'],
		['mafal', 'مَفْعَل', 'tempat', 'مَلْعَبٌ', 'Lapangan, tempat bermain, dari akar ل ع ب.']
	].map(([id, pattern, meaning, example, explanation]) => ({
		id: id!,
		cells: { pattern: pattern!, meaning: meaning!, example: example! },
		explanation
	}))
};

export const adjectiveAgreement: ReferenceTableData = {
	id: 'kata-sifat-mengikuti',
	title: 'Kata sifat mengikuti kata benda',
	caption: 'Kata sifat menyesuaikan jenis kelamin dan ketentuan kata yang diterangkan.',
	reviewStatus: 'draft',
	sources: [`${corpus}/adjective.jsp`, `${madinah}`],
	columns: [
		{ key: 'situation', label: 'Keadaan', lang: 'id', hideable: true },
		{ key: 'example', label: 'Contoh', lang: 'ar', hideable: true },
		{ key: 'meaning', label: 'Arti', lang: 'id' }
	],
	rows: [
		[
			'lk',
			'laki-laki, tak tentu',
			'كِتَابٌ كَبِيرٌ',
			'sebuah buku besar',
			'Kata sifat sama dengan bendanya: tanwin pada keduanya.'
		],
		[
			'pr',
			'perempuan, tak tentu',
			'مَدْرَسَةٌ كَبِيرَةٌ',
			'sebuah sekolah besar',
			'Benda perempuan, sifat diberi ta marbuthah.'
		],
		[
			'lk-tentu',
			'laki-laki, tertentu',
			'الْكِتَابُ الْكَبِيرُ',
			'buku besar itu',
			'Kalau benda memakai الْـ, sifat juga memakainya.'
		],
		[
			'pr-tentu',
			'perempuan, tertentu',
			'الْمَدْرَسَةُ الْكَبِيرَةُ',
			'sekolah besar itu',
			'الْـ dipasang pada keduanya.'
		],
		[
			'jamak',
			'jamak benda mati',
			'كُتُبٌ كَبِيرَةٌ',
			'buku-buku besar',
			'Jamak benda mati diterangkan dengan sifat tunggal perempuan.'
		]
	].map(([id, situation, example, meaning, explanation]) => ({
		id: id!,
		cells: { situation: situation!, example: example!, meaning: meaning! },
		explanation
	}))
};

export const isimReferences = [
	separatePronouns,
	attachedPronouns,
	demonstratives,
	derivedPatterns,
	adjectiveAgreement
] as const;
