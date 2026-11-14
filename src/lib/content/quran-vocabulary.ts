import type {
	QuranGroup,
	QuranOccurrence,
	VerbReference,
	VocabularyItem
} from '#lib/domain/vocabulary/types.js';
import { quranFrequencies } from './quran-frequency.js';

export const TANZIL_TEXT_VERSION = 'Tanzil Uthmani 1.1';
export const TANZIL_NOTICE = 'Tanzil Quran Text © 2007–2021 Tanzil Project';
export const TANZIL_LICENSE_URL = 'https://tanzil.net/docs/text_license';

/** Lemmas and original Indonesian glosses, with a separate unedited ayah token. */
type Word = [
	slug: string,
	lemma: string,
	transliteration: string,
	meaning: string,
	reference: QuranOccurrence['reference'],
	token: string,
	context: string,
	verbReference?: VerbReference
];

const words: Record<QuranGroup, Word[]> = {
	harf: [
		['min', 'مِنْ', 'min', 'dari', '2:22', 'مِنَ', 'Harakat akhir dapat berubah saat dibaca sambung.'],
		['fi', 'فِي', 'fī', 'di, di dalam', '57:4', 'فِى', 'Harf jarr yang menandai tempat atau waktu.'],
		[
			'ala',
			'عَلَىٰ',
			'ʿalā',
			'di atas, atas',
			'7:54',
			'عَلَى',
			'Harf jarr. Maknanya mengikuti frasa yang dibentuknya.'
		],
		['ila', 'إِلَىٰ', 'ilā', 'ke, menuju', '4:87', 'إِلَىٰ', 'Menandai arah atau batas.'],
		[
			'an-jarr',
			'عَنْ',
			'ʿan',
			'tentang, dari',
			'40:60',
			'عَنْ',
			'Di sini menunjukkan menjauh dari suatu tindakan.'
		],
		[
			'bi',
			'بِـ',
			'bi-',
			'dengan, melalui',
			'1:1',
			'بِسْمِ',
			'Awalan bi- melekat pada kata sesudahnya.'
		],
		[
			'li',
			'لِـ',
			'li-',
			'untuk, milik',
			'1:2',
			'لِلَّهِ',
			'Awalan li- menyatakan peruntukan atau kepemilikan sesuai konteks.'
		],
		['wa', 'وَ', 'wa-', 'dan', '7:54', 'وَٱلشَّمْسَ', 'Di sini wa- menyambung unsur dalam daftar.'],
		[
			'fa',
			'فَ',
			'fa-',
			'maka, lalu',
			'2:22',
			'فَأَخْرَجَ',
			'Di sini fa- menghubungkan tindakan dengan hasilnya.'
		],
		[
			'thumma',
			'ثُمَّ',
			'thumma',
			'kemudian',
			'7:54',
			'ثُمَّ',
			'Menghubungkan peristiwa dalam suatu urutan.'
		],
		['aw', 'أَوْ', 'aw', 'atau', '2:185', 'أَوْ', 'Menawarkan pilihan atau alternatif.'],
		[
			'inna',
			'إِنَّ',
			'inna',
			'sungguh, sesungguhnya',
			'2:153',
			'إِنَّ',
			'Memberi penegasan pada klausa nominal.'
		],
		[
			'in-shart',
			'إِنْ',
			'in',
			'jika',
			'3:31',
			'إِن',
			'Harf syarat. Bedakan dari inna yang bersyaddah.'
		],
		[
			'an-masdar',
			'أَنْ',
			'an',
			'bahwa, untuk',
			'36:82',
			'أَن',
			'Mengantar klausa. Harakat akhir fi’il mudhari sesudahnya dapat berubah.'
		],
		['la-nafy', 'لَا', 'lā', 'tidak', '2:2', 'لَا', 'Di sini lā meniadakan adanya keraguan.'],
		[
			'la-nahy',
			'لَا',
			'lā',
			'jangan',
			'12:5',
			'لَا',
			'Di sini lā diikuti fi’il mudhari majzum untuk larangan.'
		],
		[
			'lam',
			'لَمْ',
			'lam',
			'tidak, belum',
			'96:5',
			'لَمْ',
			'Menegasikan peristiwa lampau dan menjazmkan fi’il mudhari.'
		],
		['illa', 'إِلَّا', 'illā', 'kecuali', '103:3', 'إِلَّا', 'Menandai pengecualian atau pembatasan.'],
		[
			'qad',
			'قَدْ',
			'qad',
			'sudah, sungguh',
			'2:60',
			'قَدْ',
			'Di sini mendahului fi’il madhi yang menyatakan kejadian yang sudah diketahui.'
		]
	],
	rujukan: [
		[
			'huwa',
			'هُوَ',
			'huwa',
			'dia (laki-laki), Dia',
			'112:1',
			'هُوَ',
			'Kata ganti tunggal. Tentukan rujukannya dari kalimat.'
		],
		[
			'hiya',
			'هِيَ',
			'hiya',
			'dia atau itu (feminin)',
			'17:9',
			'هِىَ',
			'Di sini kata ganti feminin merujuk pada jalan yang paling lurus.'
		],
		['ana', 'أَنَا', 'anā', 'aku', '20:14', 'أَنَا', 'Kata ganti orang pertama tunggal.'],
		['nahnu', 'نَحْنُ', 'nahnu', 'kami atau kita', '18:13', 'نَّحْنُ', 'Kata ganti orang pertama jamak.'],
		['hum', 'هُمْ', 'hum', 'mereka', '2:82', 'هُمْ', 'Kata ganti orang ketiga jamak.'],
		['hadha', 'هَٰذَا', 'hādhā', 'ini', '17:9', 'هَٰذَا', 'Kata tunjuk untuk bentuk maskulin tunggal.'],
		[
			'dhalika',
			'ذَٰلِكَ',
			'dhālika',
			'itu',
			'2:2',
			'ذَٰلِكَ',
			'Kata tunjuk untuk bentuk maskulin tunggal.'
		],
		[
			'alladhi',
			'الَّذِي',
			'alladhī',
			'yang',
			'57:4',
			'ٱلَّذِى',
			'Kata sambung relatif untuk bentuk maskulin tunggal.'
		],
		[
			'alladhina',
			'الَّذِينَ',
			'alladhīna',
			'orang-orang yang',
			'2:3',
			'ٱلَّذِينَ',
			'Kata sambung relatif untuk jamak maskulin.'
		],
		[
			'man',
			'مَنْ',
			'man',
			'siapa, orang yang',
			'2:185',
			'فَمَن',
			'Di sini bermakna “siapa saja yang” dan mengawali syarat.'
		],
		[
			'ma',
			'مَا',
			'mā',
			'apa, apa yang',
			'57:4',
			'مَا',
			'Di sini mengantar keterangan relatif. Pada susunan lain mā dapat menegasikan.'
		],
		[
			'idha-time',
			'إِذَا',
			'idhā',
			'ketika, apabila',
			'2:117',
			'وَإِذَا',
			'Mengantar keterangan waktu berkaitan dengan peristiwa yang menyusul.'
		],
		[
			'ind',
			'عِنْدَ',
			'ʿinda',
			'di sisi, pada',
			'2:110',
			'عِندَ',
			'Menunjukkan kedekatan atau keberadaan menurut konteks.'
		],
		['maa', 'مَعَ', 'maʿa', 'bersama', '2:153', 'مَعَ', 'Menandai kebersamaan atau penyertaan.'],
		[
			'kull',
			'كُلٌّ',
			'kull',
			'setiap, seluruh',
			'2:20',
			'كُلِّ',
			'Dalam frasa “setiap sesuatu”, i‘rabnya mengikuti susunan kalimat.'
		],
		[
			'ghayr',
			'غَيْرٌ',
			'ghayr',
			'selain, bukan',
			'1:7',
			'غَيْرِ',
			'Pada ayat ini digunakan untuk mengecualikan suatu golongan.'
		]
	],
	'fiil-ujar': [
		[
			'qala',
			'قَالَ',
			'qāla',
			'berkata',
			'2:30',
			'قَالَ',
			'Bandingkan dengan bentuk perintah “katakanlah”.',
			{ bab: 1, id: 'قال-1' }
		],
		[
			'saala',
			'سَأَلَ',
			'saʔala',
			'bertanya, meminta',
			'2:222',
			'وَيَسْـَٔلُونَكَ',
			'Di sini bentuk mudhari jamak berarti “mereka bertanya kepadamu”.',
			{ bab: 3, id: 'سأل-1' }
		],
		[
			'qaraa',
			'قَرَأَ',
			'qaraʔa',
			'membaca',
			'96:1',
			'ٱقْرَأْ',
			'Bentuk dalam ayat adalah perintah tunggal.',
			{ bab: 3, id: 'قرأ-1' }
		],
		[
			'alima',
			'عَلِمَ',
			'ʕalima',
			'mengetahui',
			'96:5',
			'يَعْلَمْ',
			'Bandingkan dengan ʿallama dari akar yang sama.',
			{ bab: 4, id: 'علم-1' }
		],
		[
			'allama',
			'عَلَّمَ',
			'ʕallama',
			'mengajarkan',
			'55:2',
			'عَلَّمَ',
			'Tasydid dalam bentuk ini membedakannya dari ʿalima.',
			{ bab: 7, id: 'علم-II-1' }
		],
		[
			'daa',
			'دَعَا',
			'daʕā',
			'memanggil, berdoa',
			'40:60',
			'ٱدْعُونِىٓ',
			'Bentuk dalam ayat berarti “berdoalah kepada-Ku”.',
			{ bab: 1, id: 'دعا-1' }
		],
		[
			'kadhdhaba',
			'كَذَّبَ',
			'kaḏḏaba',
			'mendustakan',
			'55:13',
			'تُكَذِّبَانِ',
			'Akhiran -āni di sini menunjuk dua pihak.',
			{ bab: 7, id: 'كذب-II-1' }
		],
		[
			'qassa',
			'قَصَّ',
			'qaṣṣa',
			'menceritakan',
			'18:13',
			'نَقُصُّ',
			'Awalan na- menandai orang pertama jamak pada contoh ini.'
		]
	],
	'fiil-iman': [
		[
			'amana',
			'آمَنَ',
			'ʔāmana',
			'beriman',
			'2:62',
			'ءَامَنَ',
			'Sering diikuti bi- untuk menyatakan objek keimanan.',
			{ bab: 9, id: 'آمن-IV-1' }
		],
		[
			'abada',
			'عَبَدَ',
			'ʕabada',
			'menyembah, beribadah',
			'1:5',
			'نَعْبُدُ',
			'Awalan na- pada bentuk ayat berarti “kami”.',
			{ bab: 1, id: 'عبد-1' }
		],
		[
			'hada',
			'هَدَى',
			'hadā',
			'memberi petunjuk',
			'1:6',
			'ٱهْدِنَا',
			'Akhiran -nā pada bentuk perintah menunjukkan penerima petunjuk.',
			{ bab: 2, id: 'هدى-1' }
		],
		[
			'kafara',
			'كَفَرَ',
			'kafara',
			'mengingkari, tidak beriman',
			'6:1',
			'كَفَرُوا۟',
			'Padanan pada ayat ini berkaitan dengan keimanan.',
			{ bab: 1, id: 'كفر-1' }
		],
		[
			'ittaqa',
			'اِتَّقَى',
			'ittaqā',
			'bertakwa, menjaga diri',
			'4:1',
			'ٱتَّقُوا۟',
			'Di sini bentuk perintah ditujukan kepada banyak orang.',
			{ bab: 12, id: 'اتقى-VIII-1' }
		],
		[
			'ghafara',
			'غَفَرَ',
			'ḡafara',
			'mengampuni',
			'39:53',
			'يَغْفِرُ',
			'Bandingkan dengan istaghfara, yang berarti memohon ampun.',
			{ bab: 2, id: 'غفر-1' }
		],
		[
			'istaghfara',
			'اِسْتَغْفَرَ',
			'istaḡfara',
			'memohon ampun',
			'71:10',
			'ٱسْتَغْفِرُوا۟',
			'Bentuk dalam ayat adalah perintah jamak.',
			{ bab: 15, id: 'استغفر-X-1' }
		],
		[
			'istana',
			'اِسْتَعَانَ',
			'istaʕāna',
			'meminta pertolongan',
			'1:5',
			'نَسْتَعِينُ',
			'Bentuk mudhari dalam ayat menyatakan “kami meminta pertolongan”.',
			{ bab: 15, id: 'استعان-X-1' }
		],
		[
			'tawasa',
			'تَوَاصَى',
			'tawāṣā',
			'saling menasihati',
			'103:3',
			'وَتَوَاصَوْا۟',
			'Pola ini menunjukkan tindakan timbal balik.',
			{ bab: 10, id: 'تواصى-VI-1' }
		]
	],
	'fiil-tindakan': [
		[
			'kana',
			'كَانَ',
			'kāna',
			'adalah, dahulu, berada',
			'17:32',
			'كَانَ',
			'Kāna menghubungkan subjek dengan keterangannya. Padanan waktu mengikuti konteks.',
			{ bab: 1, id: 'كان-1' }
		],
		[
			'jaala',
			'جَعَلَ',
			'jaʕala',
			'menjadikan',
			'6:1',
			'وَجَعَلَ',
			'Sering menyatakan penetapan atau perubahan keadaan.',
			{ bab: 3, id: 'جعل-1' }
		],
		[
			'jaa',
			'جَاءَ',
			'jāʔa',
			'datang',
			'110:1',
			'جَآءَ',
			'Di sini pembacaan waktu mengikuti susunan idhā di awal ayat.',
			{ bab: 2, id: 'جاء-1' }
		],
		[
			'amila',
			'عَمِلَ',
			'ʕamila',
			'mengerjakan, berbuat',
			'2:62',
			'وَعَمِلَ',
			'Ketika berpasangan dengan ṣāliḥ, konteksnya perbuatan baik.',
			{ bab: 4, id: 'عمل-1' }
		],
		[
			'aata',
			'آتَى',
			'ʔātā',
			'memberi',
			'2:43',
			'وَءَاتُوا۟',
			'Bedakan dari أَتَى, “datang”. Pada contoh ini perintah untuk menunaikan zakat.',
			{ bab: 9, id: 'آتى-IV-1' }
		],
		[
			'ata',
			'أَتَى',
			'ʔatā',
			'datang, mendatangi',
			'26:89',
			'أَتَى',
			'Bedakan dari آتَى, “memberi”.',
			{ bab: 2, id: 'أتى-1' }
		],
		[
			'raa',
			'رَأَى',
			'raʔā',
			'melihat',
			'12:4',
			'رَأَيْتُ',
			'Akhiran -tu menunjukkan “aku”. Konteks di sini berkaitan dengan mimpi.',
			{ bab: 3, id: 'رأى-1' }
		],
		[
			'khalaqa',
			'خَلَقَ',
			'ḵalaqa',
			'menciptakan',
			'96:1',
			'خَلَقَ',
			'Di sini kata kerja menyatakan tindakan penciptaan.',
			{ bab: 1, id: 'خلق-1' }
		],
		[
			'anzala',
			'أَنْزَلَ',
			'ʔanzala',
			'menurunkan',
			'2:22',
			'وَأَنزَلَ',
			'Konteksnya air yang diturunkan dari langit.',
			{ bab: 9, id: 'أنزل-IV-1' }
		],
		[
			'arada',
			'أَرَادَ',
			'ʔarāda',
			'menghendaki',
			'36:82',
			'أَرَادَ',
			'Bentuk yang ditampilkan adalah madhi.',
			{ bab: 9, id: 'أراد-IV-1' }
		],
		[
			'akhadha',
			'أَخَذَ',
			'ʔaḵaḏa',
			'mengambil',
			'2:83',
			'أَخَذْنَا',
			'Di sini digunakan dalam frasa mengambil perjanjian.',
			{ bab: 1, id: 'أخذ-1' }
		],
		[
			'wajada',
			'وَجَدَ',
			'wajada',
			'menemukan',
			'2:110',
			'تَجِدُوهُ',
			'Akhiran -hu merujuk pada sesuatu yang didapati.',
			{ bab: 2, id: 'وجد-1' }
		],
		[
			'akala',
			'أَكَلَ',
			'ʔakala',
			'makan',
			'2:60',
			'كُلُوا۟',
			'Perintah jamak. Hamzah awal lema tidak muncul pada bentuk perintah ini.',
			{ bab: 1, id: 'أكل-1' }
		],
		[
			'ittabaa',
			'اِتَّبَعَ',
			'ittabaʕa',
			'mengikuti',
			'3:31',
			'فَٱتَّبِعُونِى',
			'Perintah jamak dengan akhiran yang berarti “aku”.',
			{ bab: 12, id: 'اتبع-VIII-1' }
		]
	],
	isim: [
		['allah', 'اللَّهُ', 'Allāh', 'Allah', '112:2', 'ٱللَّهُ', 'Nama diri.'],
		[
			'sabil',
			'سَبِيلٌ',
			'sabīl',
			'jalan, cara',
			'2:154',
			'سَبِيلِ',
			'Dalam ayat ini bermakna jalan atau perjuangan di jalan Allah.'
		],
		[
			'rabb',
			'رَبٌّ',
			'rabb',
			'Tuhan, Pemelihara',
			'1:2',
			'رَبِّ',
			'Kata ini dibaca dengan kasrah karena mengikuti lafaz Allah dalam susunan ini.'
		],
		[
			'kitab',
			'كِتَابٌ',
			'kitāb',
			'kitab, tulisan',
			'2:2',
			'ٱلْكِتَٰبُ',
			'Dalam ayat ini kata tersebut didahului al-.'
		],
		['ayah', 'آيَةٌ', 'āyah', 'tanda, ayat', '3:7', 'ءَايَٰتٌ', 'Bentuk dalam ayat adalah jamak.'],
		[
			'rasul',
			'رَسُولٌ',
			'rasūl',
			'utusan',
			'2:214',
			'ٱلرَّسُولُ',
			'Bentuk ini menunjuk utusan, dari akar ر س ل.'
		],
		[
			'yawm',
			'يَوْمٌ',
			'yawm',
			'hari',
			'1:4',
			'يَوْمِ',
			'Bersama kata dīn, frasa ini berarti “hari pembalasan”.'
		],
		[
			'din',
			'دِينٌ',
			'dīn',
			'agama, pembalasan',
			'1:4',
			'ٱلدِّينِ',
			'Pada ayat ini padanan yang sesuai adalah “pembalasan”. Di konteks lain bisa berarti agama.'
		],
		[
			'nafs',
			'نَفْسٌ',
			'nafs',
			'diri, jiwa',
			'4:1',
			'نَّفْسٍ',
			'Di sini digunakan dalam frasa “satu jiwa”.'
		],
		[
			'qawm',
			'قَوْمٌ',
			'qawm',
			'kaum, suatu kelompok',
			'2:286',
			'ٱلْقَوْمِ',
			'Merujuk pada sekelompok orang.'
		],
		[
			'nas',
			'نَاسٌ',
			'nās',
			'manusia, orang-orang',
			'2:21',
			'ٱلنَّاسُ',
			'Menunjuk manusia secara kolektif.'
		],
		['qalb', 'قَلْبٌ', 'qalb', 'hati', '13:28', 'ٱلْقُلُوبُ', 'Qulūb adalah bentuk jamak dari qalb.'],
		[
			'ard',
			'أَرْضٌ',
			'arḍ',
			'bumi, tanah',
			'2:11',
			'ٱلْأَرْضِ',
			'Pada ayat ini kata itu muncul sesudah harf jarr fī.'
		],
		[
			'sama',
			'سَمَاءٌ',
			'samāʾ',
			'langit',
			'2:22',
			'ٱلسَّمَآءِ',
			'Bentuk ini berbeda dari bentuk jamak samāwāt.'
		],
		['maa-air', 'مَاءٌ', 'māʾ', 'air', '21:30', 'ٱلْمَآءِ', 'Bedakan dari mā tanpa hamzah akhir.'],
		[
			'nur',
			'نُورٌ',
			'nūr',
			'cahaya',
			'24:35',
			'نُورُ',
			'Harakat akhir mengikuti kedudukan dalam kalimat.'
		],
		[
			'rahmah',
			'رَحْمَةٌ',
			'raḥmah',
			'rahmat, kasih sayang',
			'18:10',
			'رَحْمَةً',
			'Di sini kata digunakan dalam permohonan.'
		],
		['jannah', 'جَنَّةٌ', 'jannah', 'kebun, surga', '2:82', 'ٱلْجَنَّةِ', 'Pada ayat ini konteksnya surga.'],
		[
			'azab',
			'عَذَابٌ',
			'ʿadhāb',
			'azab, siksa',
			'2:10',
			'عَذَابٌ',
			'Pada ayat ini diikuti sifat yang menyatakan rasa sakit.'
		],
		[
			'ilmun',
			'عِلْمٌ',
			'ʿilm',
			'ilmu, pengetahuan',
			'20:114',
			'عِلْمًا',
			'Satu keluarga kata dengan ʿalima dan ʿallama.'
		],
		[
			'sabr',
			'صَبْرٌ',
			'ṣabr',
			'kesabaran, keteguhan',
			'2:153',
			'بِٱلصَّبْرِ',
			'Di sini bi- melekat pada isim yang diawali al-.'
		],
		[
			'salah',
			'صَلَاةٌ',
			'ṣalāh',
			'salat',
			'2:43',
			'ٱلصَّلَوٰةَ',
			'Ejaan bentuk di ayat mengikuti rasm Utsmani.'
		],
		[
			'zakat',
			'زَكَاةٌ',
			'zakāh',
			'zakat',
			'2:43',
			'ٱلزَّكَوٰةَ',
			'Dalam ayat ini kata menjadi objek perintah untuk menunaikan.'
		],
		[
			'haqq',
			'حَقٌّ',
			'ḥaqq',
			'kebenaran, hak',
			'103:3',
			'بِٱلْحَقِّ',
			'Di sini bermakna kebenaran dalam nasihat.'
		],
		[
			'khayr',
			'خَيْرٌ',
			'khayr',
			'kebaikan, lebih baik',
			'2:110',
			'خَيْرٍ',
			'Pada contoh ini digunakan untuk suatu kebaikan.'
		],
		[
			'akhirah',
			'آخِرَةٌ',
			'ākhirah',
			'akhirat',
			'2:130',
			'ٱلْـَٔاخِرَةِ',
			'Dalam konteks ayat ini dihadapkan dengan dunia.'
		],
		[
			'kabir',
			'كَبِيرٌ',
			'kabīr',
			'besar',
			'17:9',
			'كَبِيرًا',
			'Di sini sifat menerangkan kata “pahala”.'
		],
		[
			'karim',
			'كَرِيمٌ',
			'karīm',
			'mulia, terhormat',
			'17:23',
			'كَرِيمًا',
			'Di sini sifat menerangkan ucapan.'
		],
		[
			'rahim',
			'رَحِيمٌ',
			'raḥīm',
			'penyayang',
			'1:3',
			'ٱلرَّحِيمِ',
			'Dalam ayat ini merupakan sifat Allah.'
		],
		[
			'ghafur',
			'غَفُورٌ',
			'ghafūr',
			'Maha Pengampun',
			'39:53',
			'ٱلْغَفُورُ',
			'Dalam ayat ini merupakan sifat Allah.'
		],
		[
			'sami',
			'سَمِيعٌ',
			'samīʿ',
			'Maha Mendengar',
			'6:13',
			'ٱلسَّمِيعُ',
			'Dalam ayat ini merupakan sifat Allah.'
		],
		[
			'alim',
			'عَلِيمٌ',
			'ʿalīm',
			'Maha Mengetahui',
			'6:13',
			'ٱلْعَلِيمُ',
			'Dalam ayat ini merupakan sifat Allah.'
		]
	]
};

export const quranVocabulary: VocabularyItem[] = Object.entries(words).flatMap(([name, group]) => {
	const quranGroup = name as QuranGroup;
	return group.map(
		([slug, arabic, transliteration, meaning, reference, token, context, verbReference]) => {
			const quranFrequency = quranFrequencies[slug];
			const sources = [
				`https://tanzil.net/#${reference}`,
				TANZIL_LICENSE_URL,
				...(quranFrequency ? [quranFrequency.source] : [])
			];
			return {
				id: `quran-${slug}`,
				collection: 'quran',
				register: 'classical',
				reviewStatus: 'draft',
				concreteness: quranGroup === 'harf' || quranGroup === 'rujukan' ? 'function' : 'abstract',
				arabic,
				transliteration,
				meaning,
				context,
				sources,
				quranGroup,
				quranFrequency,
				quranOccurrence: { reference, token, textVersion: TANZIL_TEXT_VERSION },
				verbReference
			};
		}
	);
});
