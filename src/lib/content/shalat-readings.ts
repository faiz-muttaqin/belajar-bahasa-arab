type Word = readonly [arabic: string, meaning: string, note?: string];

type Book = 'bukhari' | 'muslim' | 'abudawud' | 'nasai' | 'ibnmajah';

type Reading = {
	id: string;
	title: string;
	book: Book;
	number: string;
	riwayat: string;
	words: readonly Word[];
	meaning: string;
	note?: string;
	grade?: string;
};

type ReadingGroup = {
	id: string;
	title: string;
	readings: readonly Reading[];
};

const books: Record<Book, string> = {
	bukhari: 'Sahih al-Bukhari',
	muslim: 'Sahih Muslim',
	abudawud: 'Sunan Abi Dawud',
	nasai: 'Sunan an-Nasa’i',
	ibnmajah: 'Sunan Ibn Majah'
};

export function readingSource(reading: Reading) {
	return {
		label: `${books[reading.book]} ${reading.number}`,
		href: `https://sunnah.com/${reading.book}:${reading.number}`
	};
}

const allahumma = ['اللَّهُمَّ', 'Ya Allah', 'Panggilan langsung kepada Allah.'] as const;
const rabbana = ['رَبَّنَا', 'Tuhan kami', 'رَبّ berarti Tuhan dan ـنَا berarti kami.'] as const;
const rabbi = ['رَبِّيَ', 'Tuhanku', 'Akhiran ـِي menyatakan “-ku”.'] as const;
const subhana = ['سُبْحَانَ', 'Mahasuci', 'Ungkapan penyucian Allah dari kekurangan.'] as const;
const subhanaka = ['سُبْحَانَكَ', 'Mahasuci Engkau', 'Akhiran ـكَ menunjuk kepada yang disapa.'] as const;
const praise = ['الْحَمْدُ', 'segala puji'] as const;
const lakalHamd: readonly Word[] = [['لَكَ', 'bagi-Mu'], praise];
const abundantPraise: readonly Word[] = [
	['حَمْدًا', 'pujian'],
	['كَثِيرًا', 'yang banyak', 'Kata ini menerangkan حَمْدًا.'],
	['طَيِّبًا', 'yang baik'],
	['مُبَارَكًا', 'yang diberkahi'],
	['فِيهِ', 'di dalamnya', 'Akhiran ـهِ merujuk kepada pujian.']
];
const forgive: readonly Word[] = [
	['اغْفِرْ', 'ampunilah', 'Bentuk permohonan dari غَفَرَ, mengampuni.'],
	['لِي', 'untukku', 'لِـ berarti untuk dan ـي berarti aku.']
];
const noDeity: readonly Word[] = [
	['لَا', 'tidak ada'],
	['إِلَهَ', 'sesembahan'],
	['إِلَّا', 'kecuali'],
	['اللَّهُ', 'Allah']
];
const salam: readonly Word[] = [
	['السَّلَامُ', 'keselamatan'],
	['عَلَيْكُمْ', 'atas kalian', 'عَلَى berarti atas. Akhiran ـكُمْ menunjuk kepada kalian.'],
	['وَرَحْمَةُ', 'dan rahmat'],
	['اللَّهِ', 'Allah']
];
const greetings: readonly Word[] = [
	['السَّلَامُ', 'keselamatan'],
	['عَلَيْكَ', 'atasmu'],
	['أَيُّهَا', 'wahai'],
	['النَّبِيُّ', 'Nabi'],
	['وَرَحْمَةُ', 'dan rahmat'],
	['اللَّهِ', 'Allah'],
	['وَبَرَكَاتُهُ', 'dan berkah-Nya', 'Akhiran ـهُ merujuk kepada Allah.'],
	['السَّلَامُ', 'keselamatan'],
	['عَلَيْنَا', 'atas kami'],
	['وَعَلَى', 'dan atas'],
	['عِبَادِ', 'hamba-hamba', 'Bentuk jamak dari عَبْد.'],
	['اللَّهِ', 'Allah'],
	['الصَّالِحِينَ', 'yang saleh', 'Menerangkan عِبَادِ اللَّهِ.']
];
const testimony: readonly Word[] = [
	['أَشْهَدُ', 'aku bersaksi'],
	['أَنْ', 'bahwa'],
	...noDeity,
	['وَأَشْهَدُ', 'dan aku bersaksi'],
	['أَنَّ', 'bahwa'],
	['مُحَمَّدًا', 'Muhammad']
];
const greetingMeaning =
	'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah kepadamu, wahai Nabi. Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada sesembahan selain Allah dan aku bersaksi bahwa Muhammad';
const hamidMajid: readonly Word[] = [
	['إِنَّكَ', 'sungguh Engkau'],
	['حَمِيدٌ', 'Maha Terpuji'],
	['مَجِيدٌ', 'Mahamulia']
];

export const prayerReadings: readonly ReadingGroup[] = [
	{
		id: 'takbir',
		title: 'Takbir pembuka dan perpindahan',
		readings: [
			{
				id: 'allahu-akbar',
				title: 'Takbir',
				book: 'bukhari',
				number: '795',
				riwayat: 'Abu Hurairah',
				words: [
					['اللَّهُ', 'Allah'],
					['أَكْبَرُ', 'Mahabesar', 'Bentuk perbandingan dari akar ك ب ر, besar.']
				],
				meaning: 'Allah Mahabesar.',
				note: 'Hadis ini memuat lafaz takbir. Al-Bukhari 789 merinci kapan Nabi bertakbir ketika membuka shalat dan berpindah gerakan.'
			}
		]
	},
	{
		id: 'iftitah',
		title: 'Doa dan pujian pembuka',
		readings: [
			{
				id: 'allahumma-baid',
				title: 'Doa agar dijauhkan dari dosa',
				book: 'bukhari',
				number: '744',
				riwayat: 'Abu Hurairah',
				words: [
					allahumma,
					['بَاعِدْ', 'jauhkanlah', 'Bentuk permohonan dari بَاعَدَ, menjauhkan.'],
					['بَيْنِي', 'antara aku'],
					['وَبَيْنَ', 'dan antara'],
					['خَطَايَايَ', 'kesalahan-kesalahanku', 'خَطَايَا adalah jamak dari خَطِيئَة.'],
					['كَمَا', 'sebagaimana'],
					['بَاعَدْتَ', 'Engkau menjauhkan'],
					['بَيْنَ', 'antara'],
					['الْمَشْرِقِ', 'timur'],
					['وَالْمَغْرِبِ،', 'dan barat'],
					allahumma,
					[
						'نَقِّنِي',
						'bersihkanlah aku',
						'نَقِّ menyatakan permohonan. Akhiran ـنِي berarti aku sebagai objek.'
					],
					['مِنَ', 'dari'],
					['الْخَطَايَا', 'kesalahan-kesalahan'],
					['كَمَا', 'sebagaimana'],
					['يُنَقَّى', 'dibersihkan', 'Bentuk pasif dari نَقَّى.'],
					['الثَّوْبُ', 'pakaian'],
					['الْأَبْيَضُ', 'yang putih'],
					['مِنَ', 'dari'],
					['الدَّنَسِ،', 'kotoran'],
					allahumma,
					['اغْسِلْ', 'basuhlah'],
					['خَطَايَايَ', 'kesalahan-kesalahanku'],
					['بِالْمَاءِ', 'dengan air'],
					['وَالثَّلْجِ', 'dan salju'],
					['وَالْبَرَدِ', 'dan butiran es', 'الْبَرَد adalah butiran es yang turun dari langit.']
				],
				meaning:
					'Ya Allah, jauhkanlah aku dari kesalahan-kesalahanku sebagaimana Engkau menjauhkan timur dari barat. Ya Allah, bersihkanlah aku dari kesalahan sebagaimana pakaian putih dibersihkan dari kotoran. Ya Allah, basuhlah kesalahan-kesalahanku dengan air, salju, dan butiran es.',
				note: 'Abu Hurairah menanyakan bacaan Nabi pada jeda antara takbir dan qiraah.'
			},
			{
				id: 'subhanaka',
				title: 'Tasbih dan pujian pembuka',
				book: 'abudawud',
				number: '775',
				riwayat: 'Abu Sa‘id al-Khudri',
				grade: 'Sahih menurut al-Albani',
				words: [
					subhanaka,
					allahumma,
					['وَبِحَمْدِكَ', 'dan dengan pujian kepada-Mu'],
					['وَتَبَارَكَ', 'dan Mahaberkah'],
					['اسْمُكَ', 'nama-Mu'],
					['وَتَعَالَى', 'dan Mahatinggi'],
					['جَدُّكَ', 'keagungan-Mu', 'جَدّ di sini bermakna keagungan.'],
					['وَلَا', 'dan tidak ada'],
					['إِلَهَ', 'sesembahan'],
					['غَيْرُكَ', 'selain Engkau']
				],
				meaning:
					'Mahasuci Engkau, ya Allah, dan segala puji bagi-Mu. Mahaberkah nama-Mu, Mahatinggi keagungan-Mu, dan tidak ada sesembahan selain Engkau.',
				note: 'Dalam riwayat ini Nabi mengucapkannya ketika membuka shalat malam.'
			},
			{
				id: 'allahu-akbar-kabira',
				title: 'Takbir, tahmid, dan tasbih seorang sahabat',
				book: 'muslim',
				number: '601',
				riwayat: 'Abdullah bin Umar',
				words: [
					['اللَّهُ', 'Allah'],
					['أَكْبَرُ', 'Mahabesar'],
					['كَبِيرًا', 'dengan penuh pengagungan'],
					['وَالْحَمْدُ', 'dan segala puji'],
					['لِلَّهِ', 'bagi Allah'],
					['كَثِيرًا', 'sebanyak-banyaknya'],
					['وَسُبْحَانَ', 'dan Mahasuci'],
					['اللَّهِ', 'Allah'],
					['بُكْرَةً', 'pada pagi hari'],
					['وَأَصِيلًا', 'dan pada petang hari']
				],
				meaning:
					'Allah Mahabesar dengan segala kebesaran. Segala puji bagi Allah sebanyak-banyaknya. Mahasuci Allah pada pagi dan petang hari.',
				note: 'Seorang sahabat mengucapkannya ketika shalat bersama Nabi, dan Nabi memuji bacaan itu.'
			},
			{
				id: 'alhamdulillah-kathira',
				title: 'Tahmid seorang sahabat',
				book: 'muslim',
				number: '600',
				riwayat: 'Anas bin Malik',
				words: [praise, ['لِلَّهِ', 'bagi Allah'], ...abundantPraise],
				meaning: 'Segala puji bagi Allah dengan pujian yang banyak, baik, dan penuh berkah.',
				note: 'Seorang sahabat membacanya saat baru bergabung dalam saf. Riwayat i‘tidal dengan tahmid serupa dicatat tersendiri di bawah.'
			}
		]
	},
	{
		id: 'qiraah',
		title: 'Sebelum dan sesudah Al-Fatihah',
		readings: [
			{
				id: 'taawuz',
				title: 'Taawuz sebelum membaca Al-Qur’an',
				book: 'abudawud',
				number: '775',
				riwayat: 'Abu Sa‘id al-Khudri',
				grade: 'Sahih menurut al-Albani',
				words: [
					['أَعُوذُ', 'aku berlindung', 'Bentuk orang pertama dari عَاذَ, berlindung.'],
					['بِاللَّهِ', 'kepada Allah'],
					['السَّمِيعِ', 'Yang Maha Mendengar'],
					['الْعَلِيمِ', 'Yang Maha Mengetahui'],
					['مِنَ', 'dari'],
					['الشَّيْطَانِ', 'setan'],
					['الرَّجِيمِ', 'yang terkutuk'],
					['مِنْ', 'dari'],
					['هَمْزِهِ', 'gangguannya'],
					['وَنَفْخِهِ', 'dan tiupannya'],
					['وَنَفْثِهِ', 'dan embusannya']
				],
				meaning:
					'Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari setan yang terkutuk, dari gangguan, tiupan, dan embusannya.',
				note: 'Cuplikan taawuz dari riwayat pembukaan shalat malam.'
			},
			{
				id: 'amin',
				title: 'Amin',
				book: 'bukhari',
				number: '780',
				riwayat: 'Abu Hurairah',
				words: [['آمِينَ', 'kabulkanlah', 'Ungkapan untuk memohon agar doa dikabulkan.']],
				meaning: 'Kabulkanlah.'
			}
		]
	},
	{
		id: 'rukuk',
		title: 'Rukuk',
		readings: [
			{
				id: 'subhana-rabbiyal-azim',
				title: 'Tasbih rukuk',
				book: 'muslim',
				number: '772',
				riwayat: 'Hudzaifah bin al-Yaman',
				words: [subhana, rabbi, ['الْعَظِيمِ', 'Yang Mahaagung', 'Sifat dari رَبّ, Tuhan.']],
				meaning: 'Mahasuci Tuhanku Yang Mahaagung.',
				note: 'Hudzaifah meriwayatkannya ketika shalat malam bersama Nabi.'
			},
			{
				id: 'subbuhun-quddus',
				title: 'Pujian ketika rukuk dan sujud',
				book: 'muslim',
				number: '487a',
				riwayat: 'Aisyah',
				words: [
					['سُبُّوحٌ', 'Mahasuci'],
					['قُدُّوسٌ', 'Mahakudus'],
					['رَبُّ', 'Tuhan'],
					['الْمَلَائِكَةِ', 'para malaikat'],
					['وَالرُّوحِ', 'dan ar-Ruh', 'Ar-Ruh lazim dijelaskan sebagai Jibril dalam syarah hadis ini.']
				],
				meaning: 'Mahasuci, Mahakudus, Tuhan para malaikat dan ar-Ruh.',
				note: 'Aisyah meriwayatkan bacaan ini untuk rukuk dan sujud.'
			},
			{
				id: 'dhil-jabarut',
				title: 'Tasbih pemilik segala keagungan',
				book: 'nasai',
				number: '1049',
				riwayat: 'Auf bin Malik',
				grade: 'Sahih menurut al-Albani',
				words: [
					subhana,
					['ذِي', 'Pemilik', 'Bentuk jar dari ذُو dalam susunan kepemilikan.'],
					['الْجَبَرُوتِ', 'kekuasaan mutlak'],
					['وَالْمَلَكُوتِ', 'dan kerajaan'],
					['وَالْكِبْرِيَاءِ', 'dan kebesaran'],
					['وَالْعَظَمَةِ', 'dan keagungan']
				],
				meaning: 'Mahasuci Pemilik kekuasaan mutlak, kerajaan, kebesaran, dan keagungan.',
				note: 'Auf bin Malik mendengarnya saat rukuk dan sujud dalam shalat malam.'
			}
		]
	},
	{
		id: 'iktidal',
		title: 'Bangkit dari rukuk dan iktidal',
		readings: [
			{
				id: 'samiallahu',
				title: 'Tasmi‘ ketika bangkit',
				book: 'bukhari',
				number: '795',
				riwayat: 'Abu Hurairah',
				words: [
					['سَمِعَ', 'mendengar', 'Bentuk lampau dari kata kerja mendengar.'],
					['اللَّهُ', 'Allah', 'Pelaku muncul sesudah kata kerja.'],
					['لِمَنْ', 'orang yang', 'Susunan لِـ dan مَنْ.'],
					['حَمِدَهُ', 'memuji-Nya', 'Akhiran ـهُ merujuk kepada Allah.']
				],
				meaning: 'Allah mendengar orang yang memuji-Nya.'
			},
			{
				id: 'rabbana-lakal-hamd',
				title: 'Tahmid singkat',
				book: 'muslim',
				number: '772',
				riwayat: 'Hudzaifah bin al-Yaman',
				words: [rabbana, ...lakalHamd],
				meaning: 'Tuhan kami, bagi-Mu segala puji.'
			},
			{
				id: 'allahumma-walakal-hamd',
				title: 'Tahmid dengan panggilan “Ya Allah”',
				book: 'bukhari',
				number: '795',
				riwayat: 'Abu Hurairah',
				words: [allahumma, rabbana, ['وَلَكَ', 'dan bagi-Mu'], praise],
				meaning: 'Ya Allah, Tuhan kami, bagi-Mu segala puji.'
			},
			{
				id: 'allahumma-lakal-hamd',
				title: 'Tahmid jawaban makmum dalam riwayat Abu Hurairah',
				book: 'bukhari',
				number: '796',
				riwayat: 'Abu Hurairah',
				words: [allahumma, rabbana, ...lakalHamd],
				meaning: 'Ya Allah, Tuhan kami, bagi-Mu segala puji.'
			},
			{
				id: 'rabbana-hamdan-kathira',
				title: 'Tahmid dengan tambahan pujian',
				book: 'bukhari',
				number: '799',
				riwayat: 'Rifa‘ah bin Rafi‘',
				words: [rabbana, ['وَلَكَ', 'dan bagi-Mu'], ['الْحَمْدُ،', 'segala puji'], ...abundantPraise],
				meaning: 'Tuhan kami, bagi-Mu segala puji yang banyak, baik, dan penuh berkah.',
				note: 'Seorang makmum mengucapkannya setelah Nabi bangkit dari rukuk, lalu Nabi memuji ucapan tersebut.'
			}
		]
	},
	{
		id: 'sujud',
		title: 'Sujud',
		readings: [
			{
				id: 'subhana-rabbiyal-ala',
				title: 'Tasbih sujud',
				book: 'muslim',
				number: '772',
				riwayat: 'Hudzaifah bin al-Yaman',
				words: [
					subhana,
					rabbi,
					['الْأَعْلَى', 'Yang Mahatinggi', 'Bentuk perbandingan yang berasal dari akar ع ل و.']
				],
				meaning: 'Mahasuci Tuhanku Yang Mahatinggi.'
			},
			{
				id: 'subhanaka-rabbana',
				title: 'Tasbih dan permohonan ampun',
				book: 'bukhari',
				number: '817',
				riwayat: 'Aisyah',
				words: [
					subhanaka,
					allahumma,
					rabbana,
					['وَبِحَمْدِكَ،', 'dan dengan pujian kepada-Mu'],
					allahumma,
					...forgive
				],
				meaning:
					'Mahasuci Engkau, ya Allah, Tuhan kami, dan segala puji bagi-Mu. Ya Allah, ampunilah aku.',
				note: 'Aisyah meriwayatkan bacaan ini untuk rukuk dan sujud.'
			},
			{
				id: 'ighfir-li-dhanbi',
				title: 'Permohonan ampun untuk seluruh dosa',
				book: 'muslim',
				number: '483',
				riwayat: 'Abu Hurairah',
				words: [
					allahumma,
					...forgive,
					['ذَنْبِي', 'dosaku'],
					['كُلَّهُ،', 'seluruhnya'],
					['دِقَّهُ', 'yang kecil'],
					['وَجِلَّهُ،', 'dan yang besar'],
					['وَأَوَّلَهُ', 'dan yang awal'],
					['وَآخِرَهُ،', 'dan yang akhir'],
					['وَعَلَانِيَتَهُ', 'dan yang tampak'],
					['وَسِرَّهُ', 'dan yang tersembunyi']
				],
				meaning:
					'Ya Allah, ampunilah seluruh dosaku, yang kecil dan yang besar, yang awal dan yang akhir, yang tampak dan yang tersembunyi.'
			},
			{
				id: 'laka-sajadtu',
				title: 'Sujud, iman, dan penyerahan diri',
				book: 'muslim',
				number: '771a',
				riwayat: 'Ali bin Abi Thalib',
				words: [
					allahumma,
					['لَكَ', 'kepada-Mu'],
					['سَجَدْتُ', 'aku bersujud'],
					['وَبِكَ', 'dan kepada-Mu'],
					['آمَنْتُ', 'aku beriman'],
					['وَلَكَ', 'dan kepada-Mu'],
					['أَسْلَمْتُ،', 'aku berserah diri'],
					['سَجَدَ', 'bersujud'],
					['وَجْهِي', 'wajahku'],
					['لِلَّذِي', 'kepada Yang'],
					['خَلَقَهُ', 'menciptakannya'],
					['وَصَوَّرَهُ', 'dan membentuknya'],
					['وَشَقَّ', 'dan membuka'],
					['سَمْعَهُ', 'pendengarannya'],
					['وَبَصَرَهُ،', 'dan penglihatannya'],
					['تَبَارَكَ', 'Mahaberkah'],
					['اللَّهُ', 'Allah'],
					['أَحْسَنُ', 'sebaik-baik'],
					['الْخَالِقِينَ', 'para pencipta']
				],
				meaning:
					'Ya Allah, kepada-Mu aku bersujud, kepada-Mu aku beriman, dan kepada-Mu aku berserah diri. Wajahku bersujud kepada Yang menciptakan dan membentuknya, serta membuka pendengaran dan penglihatannya. Mahaberkah Allah, sebaik-baik pencipta.'
			},
			{
				id: 'audhu-biridaka',
				title: 'Berlindung kepada Allah dengan rida-Nya',
				book: 'muslim',
				number: '486',
				riwayat: 'Aisyah',
				words: [
					allahumma,
					['أَعُوذُ', 'aku berlindung'],
					['بِرِضَاكَ', 'dengan rida-Mu'],
					['مِنْ', 'dari'],
					['سَخَطِكَ', 'murka-Mu'],
					['وَبِمُعَافَاتِكَ', 'dan dengan perlindungan-Mu'],
					['مِنْ', 'dari'],
					['عُقُوبَتِكَ،', 'hukuman-Mu'],
					['وَأَعُوذُ', 'dan aku berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنْكَ،', 'dari-Mu'],
					['لَا', 'tidak'],
					['أُحْصِي', 'aku mampu menghitung'],
					['ثَنَاءً', 'pujian'],
					['عَلَيْكَ،', 'terhadap-Mu'],
					['أَنْتَ', 'Engkau'],
					['كَمَا', 'sebagaimana'],
					['أَثْنَيْتَ', 'Engkau memuji'],
					['عَلَى', 'atas'],
					['نَفْسِكَ', 'diri-Mu sendiri']
				],
				meaning:
					'Ya Allah, aku berlindung dengan rida-Mu dari murka-Mu dan dengan perlindungan-Mu dari hukuman-Mu. Aku berlindung kepada-Mu dari-Mu. Aku tidak mampu menghitung pujian bagi-Mu. Engkau sebagaimana Engkau memuji diri-Mu sendiri.',
				note: 'Aisyah mendengarnya ketika Nabi sedang sujud pada malam hari.'
			}
		]
	},
	{
		id: 'antara-dua-sujud',
		title: 'Duduk di antara dua sujud',
		readings: [
			{
				id: 'rabbighfirli',
				title: 'Permohonan ampun yang diulang',
				book: 'ibnmajah',
				number: '897',
				riwayat: 'Hudzaifah bin al-Yaman',
				grade: 'Sahih menurut al-Albani dan Darussalam',
				words: [
					['رَبِّ', 'wahai Tuhanku', 'Panggilan kepada Tuhan dengan makna “-ku”.'],
					...forgive,
					['رَبِّ', 'wahai Tuhanku'],
					...forgive
				],
				meaning: 'Wahai Tuhanku, ampunilah aku. Wahai Tuhanku, ampunilah aku.'
			},
			{
				id: 'rabbighfirli-warhamni',
				title: 'Permohonan ampun, rahmat, rezeki, dan derajat',
				book: 'ibnmajah',
				number: '898',
				riwayat: 'Abdullah bin Abbas',
				grade: 'Sahih menurut al-Albani. Penilaian lain tercatat dalam catatan peninjauan.',
				words: [
					['رَبِّ', 'wahai Tuhanku'],
					...forgive,
					['وَارْحَمْنِي', 'dan rahmatilah aku'],
					[
						'وَاجْبُرْنِي',
						'dan pulihkanlah kekuranganku',
						'Bentuk permohonan dari جَبَرَ, memulihkan yang rusak atau kurang.'
					],
					['وَارْزُقْنِي', 'dan berilah aku rezeki'],
					['وَارْفَعْنِي', 'dan angkatlah derajatku']
				],
				meaning:
					'Wahai Tuhanku, ampunilah aku, rahmatilah aku, pulihkanlah kekuranganku, berilah aku rezeki, dan angkatlah derajatku.',
				note: 'Ibn Abbas meriwayatkannya untuk duduk di antara dua sujud dalam shalat malam. Akhiran ـنِي berulang pada empat permohonan terakhir.'
			}
		]
	},
	{
		id: 'tasyahud',
		title: 'Tasyahud',
		readings: [
			{
				id: 'tasyahud-ibn-masud',
				title: 'Tasyahud riwayat Ibnu Mas‘ud',
				book: 'bukhari',
				number: '831',
				riwayat: 'Abdullah bin Mas‘ud',
				words: [
					['التَّحِيَّاتُ', 'segala penghormatan', 'Bentuk jamak dari تَحِيَّة.'],
					['لِلَّهِ', 'bagi Allah'],
					['وَالصَّلَوَاتُ', 'dan segala shalat'],
					['وَالطَّيِّبَاتُ،', 'dan segala kebaikan'],
					...greetings,
					...testimony,
					['عَبْدُهُ', 'hamba-Nya'],
					['وَرَسُولُهُ', 'dan utusan-Nya']
				],
				meaning: `Segala penghormatan, shalat, dan kebaikan bagi Allah. ${greetingMeaning} adalah hamba dan utusan-Nya.`
			},
			{
				id: 'tasyahud-ibn-abbas',
				title: 'Tasyahud riwayat Ibnu Abbas',
				book: 'muslim',
				number: '403a',
				riwayat: 'Abdullah bin Abbas',
				words: [
					['التَّحِيَّاتُ', 'segala penghormatan'],
					['الْمُبَارَكَاتُ', 'yang diberkahi'],
					['الصَّلَوَاتُ', 'segala shalat'],
					['الطَّيِّبَاتُ', 'segala kebaikan'],
					['لِلَّهِ،', 'bagi Allah'],
					...greetings,
					...testimony,
					['رَسُولُ', 'utusan'],
					['اللَّهِ', 'Allah']
				],
				meaning: `Segala penghormatan yang diberkahi, segala shalat, dan segala kebaikan bagi Allah. ${greetingMeaning} adalah utusan Allah.`,
				note: 'Bandingkan kata الْمُبَارَكَاتُ di awal dan رَسُولُ اللَّهِ di akhir dengan riwayat Ibnu Mas‘ud.'
			},
			{
				id: 'tasyahud-abu-musa',
				title: 'Tasyahud riwayat Abu Musa',
				book: 'muslim',
				number: '404a',
				riwayat: 'Abu Musa al-Asy‘ari',
				words: [
					['التَّحِيَّاتُ', 'segala penghormatan'],
					['الطَّيِّبَاتُ', 'yang baik'],
					['الصَّلَوَاتُ', 'segala shalat'],
					['لِلَّهِ،', 'bagi Allah'],
					...greetings,
					...testimony,
					['عَبْدُهُ', 'hamba-Nya'],
					['وَرَسُولُهُ', 'dan utusan-Nya']
				],
				meaning: `Segala penghormatan yang baik dan segala shalat bagi Allah. ${greetingMeaning} adalah hamba dan utusan-Nya.`
			}
		]
	},
	{
		id: 'shalawat',
		title: 'Shalawat',
		readings: [
			{
				id: 'shalawat-kaab',
				title: 'Shalawat riwayat Ka‘ab bin ‘Ujrah',
				book: 'bukhari',
				number: '3370',
				riwayat: 'Ka‘ab bin ‘Ujrah',
				words: [
					allahumma,
					['صَلِّ', 'limpahkanlah shalawat', 'Bentuk permohonan dari صَلَّى.'],
					['عَلَى', 'kepada'],
					['مُحَمَّدٍ', 'Muhammad'],
					['وَعَلَى', 'dan kepada'],
					['آلِ', 'keluarga'],
					['مُحَمَّدٍ،', 'Muhammad'],
					['كَمَا', 'sebagaimana'],
					['صَلَّيْتَ', 'Engkau melimpahkan shalawat'],
					['عَلَى', 'kepada'],
					['إِبْرَاهِيمَ', 'Ibrahim'],
					['وَعَلَى', 'dan kepada'],
					['آلِ', 'keluarga'],
					['إِبْرَاهِيمَ،', 'Ibrahim', 'Nama ini tetap berfathah dalam susunan jar ini.'],
					...hamidMajid,
					allahumma,
					['بَارِكْ', 'berkahilah'],
					['عَلَى', 'kepada'],
					['مُحَمَّدٍ', 'Muhammad'],
					['وَعَلَى', 'dan kepada'],
					['آلِ', 'keluarga'],
					['مُحَمَّدٍ،', 'Muhammad'],
					['كَمَا', 'sebagaimana'],
					['بَارَكْتَ', 'Engkau memberkahi'],
					['عَلَى', 'kepada'],
					['إِبْرَاهِيمَ', 'Ibrahim'],
					['وَعَلَى', 'dan kepada'],
					['آلِ', 'keluarga'],
					['إِبْرَاهِيمَ،', 'Ibrahim'],
					...hamidMajid
				],
				meaning:
					'Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau melimpahkan shalawat kepada Ibrahim dan keluarga Ibrahim. Sungguh Engkau Maha Terpuji, Mahamulia. Ya Allah, berkahilah Muhammad dan keluarga Muhammad sebagaimana Engkau memberkahi Ibrahim dan keluarga Ibrahim. Sungguh Engkau Maha Terpuji, Mahamulia.'
			},
			{
				id: 'shalawat-abu-humaid',
				title: 'Shalawat riwayat Abu Humaid',
				book: 'bukhari',
				number: '3369',
				riwayat: 'Abu Humaid as-Sa‘idi',
				words: [
					allahumma,
					['صَلِّ', 'limpahkanlah shalawat'],
					['عَلَى', 'kepada'],
					['مُحَمَّدٍ', 'Muhammad'],
					['وَأَزْوَاجِهِ', 'dan istri-istrinya', 'أَزْوَاج adalah bentuk jamak dari زَوْج.'],
					['وَذُرِّيَّتِهِ،', 'dan keturunannya'],
					['كَمَا', 'sebagaimana'],
					['صَلَّيْتَ', 'Engkau melimpahkan shalawat'],
					['عَلَى', 'kepada'],
					['آلِ', 'keluarga'],
					['إِبْرَاهِيمَ،', 'Ibrahim'],
					['وَبَارِكْ', 'dan berkahilah'],
					['عَلَى', 'kepada'],
					['مُحَمَّدٍ', 'Muhammad'],
					['وَأَزْوَاجِهِ', 'dan istri-istrinya'],
					['وَذُرِّيَّتِهِ،', 'dan keturunannya'],
					['كَمَا', 'sebagaimana'],
					['بَارَكْتَ', 'Engkau memberkahi'],
					['عَلَى', 'kepada'],
					['آلِ', 'keluarga'],
					['إِبْرَاهِيمَ،', 'Ibrahim'],
					...hamidMajid
				],
				meaning:
					'Ya Allah, limpahkanlah shalawat kepada Muhammad, istri-istrinya, dan keturunannya sebagaimana Engkau melimpahkan shalawat kepada keluarga Ibrahim. Berkahilah Muhammad, istri-istrinya, dan keturunannya sebagaimana Engkau memberkahi keluarga Ibrahim. Sungguh Engkau Maha Terpuji, Mahamulia.'
			}
		]
	},
	{
		id: 'sebelum-salam',
		title: 'Doa sebelum salam',
		readings: [
			{
				id: 'perlindungan-empat-perkara',
				title: 'Berlindung dari empat perkara',
				book: 'muslim',
				number: '588a',
				riwayat: 'Abu Hurairah',
				words: [
					allahumma,
					['إِنِّي', 'sungguh aku'],
					['أَعُوذُ', 'berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنْ', 'dari'],
					['عَذَابِ', 'azab'],
					['جَهَنَّمَ،', 'Jahanam'],
					['وَمِنْ', 'dan dari'],
					['عَذَابِ', 'azab'],
					['الْقَبْرِ،', 'kubur'],
					['وَمِنْ', 'dan dari'],
					['فِتْنَةِ', 'ujian'],
					['الْمَحْيَا', 'kehidupan'],
					['وَالْمَمَاتِ،', 'dan kematian'],
					['وَمِنْ', 'dan dari'],
					['شَرِّ', 'keburukan'],
					['فِتْنَةِ', 'ujian'],
					['الْمَسِيحِ', 'al-Masih'],
					['الدَّجَّالِ', 'Dajjal']
				],
				meaning:
					'Ya Allah, sungguh aku berlindung kepada-Mu dari azab Jahanam, azab kubur, ujian hidup dan mati, dan keburukan ujian al-Masih Dajjal.'
			},
			{
				id: 'zalamtu-nafsi',
				title: 'Doa yang diajarkan kepada Abu Bakar',
				book: 'bukhari',
				number: '834',
				riwayat: 'Abu Bakar ash-Shiddiq',
				words: [
					allahumma,
					['إِنِّي', 'sungguh aku'],
					['ظَلَمْتُ', 'telah menzalimi'],
					['نَفْسِي', 'diriku'],
					['ظُلْمًا', 'dengan kezaliman'],
					['كَثِيرًا،', 'yang banyak'],
					['وَلَا', 'dan tidak'],
					['يَغْفِرُ', 'mengampuni'],
					['الذُّنُوبَ', 'dosa-dosa'],
					['إِلَّا', 'selain'],
					['أَنْتَ،', 'Engkau'],
					['فَاغْفِرْ', 'maka ampunilah'],
					forgive[1]!,
					['مَغْفِرَةً', 'dengan ampunan'],
					['مِنْ', 'dari'],
					['عِنْدِكَ،', 'sisi-Mu'],
					['وَارْحَمْنِي', 'dan rahmatilah aku'],
					['إِنَّكَ', 'sungguh Engkau'],
					['أَنْتَ', 'Engkaulah'],
					['الْغَفُورُ', 'Yang Maha Pengampun'],
					['الرَّحِيمُ', 'Yang Maha Penyayang']
				],
				meaning:
					'Ya Allah, sungguh aku telah banyak menzalimi diriku. Tiada yang mengampuni dosa selain Engkau. Ampunilah aku dengan ampunan dari sisi-Mu dan rahmatilah aku. Sungguh Engkaulah Yang Maha Pengampun, Yang Maha Penyayang.',
				note: 'Abu Bakar meminta doa untuk dibaca dalam shalat. Hadis ini tidak menyebut posisi doa secara eksplisit.'
			},
			{
				id: 'ma-qaddamtu',
				title: 'Memohon ampun atas yang terdahulu dan yang kemudian',
				book: 'muslim',
				number: '771a',
				riwayat: 'Ali bin Abi Thalib',
				words: [
					allahumma,
					...forgive,
					['مَا', 'apa yang'],
					['قَدَّمْتُ', 'aku lakukan terdahulu'],
					['وَمَا', 'dan apa yang'],
					['أَخَّرْتُ', 'aku lakukan kemudian'],
					['وَمَا', 'dan apa yang'],
					['أَسْرَرْتُ', 'aku rahasiakan'],
					['وَمَا', 'dan apa yang'],
					['أَعْلَنْتُ', 'aku tampakkan'],
					['وَمَا', 'dan apa yang'],
					['أَسْرَفْتُ', 'aku lakukan melampaui batas'],
					['وَمَا', 'dan apa yang'],
					['أَنْتَ', 'Engkau'],
					['أَعْلَمُ', 'lebih tahu'],
					['بِهِ', 'tentangnya'],
					['مِنِّي،', 'daripadaku'],
					['أَنْتَ', 'Engkau'],
					['الْمُقَدِّمُ', 'Yang Mendahulukan'],
					['وَأَنْتَ', 'dan Engkau'],
					['الْمُؤَخِّرُ،', 'Yang Mengakhirkan'],
					...noDeity.slice(0, 3),
					['أَنْتَ', 'Engkau']
				],
				meaning:
					'Ya Allah, ampunilah apa yang kulakukan terdahulu dan kemudian, yang kurahasiakan dan yang kutampakkan, tindakanku yang melampaui batas, serta apa yang Engkau lebih ketahui daripada aku. Engkaulah Yang Mendahulukan dan Yang Mengakhirkan. Tiada sesembahan selain Engkau.',
				note: 'Riwayat Ali menyebutnya di antara tasyahud dan salam.'
			}
		]
	},
	{
		id: 'salam',
		title: 'Salam',
		readings: [
			{
				id: 'salam-wa-rahmatullah',
				title: 'Salam ke kanan dan ke kiri',
				book: 'abudawud',
				number: '996',
				riwayat: 'Abdullah bin Mas‘ud',
				grade: 'Sahih menurut al-Albani',
				words: salam,
				meaning: 'Semoga keselamatan dan rahmat Allah tercurah kepada kalian.',
				note: 'Lafaz yang sama dibaca ke kanan dan ke kiri dalam riwayat ini.'
			},
			{
				id: 'salam-wa-barakatuh',
				title: 'Salam dengan tambahan berkah di sebelah kanan',
				book: 'abudawud',
				number: '997',
				riwayat: 'Wa’il bin Hujr',
				grade: 'Sahih menurut al-Albani',
				words: [...salam, ['وَبَرَكَاتُهُ', 'dan berkah-Nya']],
				meaning: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah kepada kalian.',
				note: 'Tambahan وَبَرَكَاتُهُ ada pada salam kanan dalam riwayat ini. Salam kiri memakai lafaz tanpa tambahan seperti pada riwayat sebelumnya.'
			}
		]
	},
	{
		id: 'sesudah-salam',
		title: 'Zikir sesudah salam',
		readings: [
			{
				id: 'astaghfirullah',
				title: 'Istigfar tiga kali',
				book: 'muslim',
				number: '591',
				riwayat: 'Tsauban',
				words: [
					['أَسْتَغْفِرُ', 'aku memohon ampun', 'Bentuk dari اِسْتَغْفَرَ, meminta ampun.'],
					['اللَّهَ', 'kepada Allah']
				],
				meaning: 'Aku memohon ampun kepada Allah.',
				note: 'Tsauban meriwayatkan tiga kali istigfar sesudah shalat. Lafaz ini dijelaskan oleh al-Auza‘i dalam hadis yang sama.'
			},
			{
				id: 'antas-salam',
				title: 'Engkaulah Yang Mahasejahtera',
				book: 'muslim',
				number: '591',
				riwayat: 'Tsauban',
				words: [
					allahumma,
					['أَنْتَ', 'Engkau'],
					['السَّلَامُ', 'Yang Mahasejahtera'],
					['وَمِنْكَ', 'dan dari-Mu'],
					['السَّلَامُ،', 'keselamatan'],
					['تَبَارَكْتَ', 'Mahaberkah Engkau'],
					['ذَا', 'wahai Pemilik'],
					['الْجَلَالِ', 'keagungan'],
					['وَالْإِكْرَامِ', 'dan kemuliaan']
				],
				meaning:
					'Ya Allah, Engkau Yang Mahasejahtera dan dari-Mu datang keselamatan. Mahaberkah Engkau, wahai Pemilik keagungan dan kemuliaan.',
				note: 'Dibaca setelah salam dan istigfar dalam rangkaian riwayat Tsauban.'
			}
		]
	}
];
