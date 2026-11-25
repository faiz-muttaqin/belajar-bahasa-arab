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
	gradeSource?: string;
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
			},
			{
				id: 'wajjahtu',
				title: 'Menghadapkan diri kepada Pencipta',
				book: 'muslim',
				number: '771a',
				riwayat: 'Ali bin Abi Thalib',
				words: [
					['وَجَّهْتُ', 'aku menghadapkan'],
					['وَجْهِيَ', 'wajahku'],
					['لِلَّذِي', 'kepada Dia yang'],
					['فَطَرَ', 'menciptakan'],
					['السَّمَاوَاتِ', 'langit'],
					['وَالْأَرْضَ', 'dan bumi'],
					['حَنِيفًا', 'dengan lurus menuju tauhid'],
					['وَمَا', 'dan tidak'],
					['أَنَا', 'aku'],
					['مِنَ', 'dari kalangan'],
					['الْمُشْرِكِينَ.', 'orang yang menyekutukan Allah'],
					['إِنَّ', 'sungguh'],
					['صَلَاتِي', 'shalatku'],
					['وَنُسُكِي', 'dan ibadahku'],
					['وَمَحْيَايَ', 'dan hidupku'],
					['وَمَمَاتِي', 'dan matiku'],
					['لِلَّهِ', 'bagi Allah'],
					['رَبِّ', 'Tuhan'],
					['الْعَالَمِينَ.', 'seluruh alam'],
					['لَا', 'tidak ada'],
					['شَرِيكَ', 'sekutu'],
					['لَهُ', 'bagi-Nya'],
					['وَبِذَلِكَ', 'dan dengan itulah'],
					['أُمِرْتُ', 'aku diperintah'],
					['وَأَنَا', 'dan aku'],
					['مِنَ', 'dari kalangan'],
					['الْمُسْلِمِينَ.', 'orang yang berserah diri'],
					['اللَّهُمَّ', 'Ya Allah'],
					['أَنْتَ', 'Engkaulah'],
					['الْمَلِكُ', 'Raja'],
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['أَنْتَ.', 'Engkau'],
					['أَنْتَ', 'Engkaulah'],
					['رَبِّي', 'Tuhanku'],
					['وَأَنَا', 'dan aku'],
					['عَبْدُكَ،', 'hamba-Mu'],
					['ظَلَمْتُ', 'aku telah menzalimi'],
					['نَفْسِي', 'diriku'],
					['وَاعْتَرَفْتُ', 'dan aku mengakui'],
					['بِذَنْبِي', 'dosaku'],
					['فَاغْفِرْ', 'maka ampunilah'],
					['لِي', 'untukku'],
					['ذُنُوبِي', 'dosa-dosaku'],
					['جَمِيعًا،', 'semuanya'],
					['إِنَّهُ', 'sungguh'],
					['لَا', 'tidak'],
					['يَغْفِرُ', 'mengampuni'],
					['الذُّنُوبَ', 'dosa-dosa'],
					['إِلَّا', 'selain'],
					['أَنْتَ.', 'Engkau'],
					['وَاهْدِنِي', 'dan bimbinglah aku'],
					['لِأَحْسَنِ', 'kepada yang terbaik'],
					['الْأَخْلَاقِ،', 'dari akhlak'],
					['لَا', 'tidak'],
					['يَهْدِي', 'membimbing'],
					['لِأَحْسَنِهَا', 'kepada yang terbaik darinya'],
					['إِلَّا', 'selain'],
					['أَنْتَ.', 'Engkau'],
					['وَاصْرِفْ', 'dan jauhkanlah'],
					['عَنِّي', 'dariku'],
					['سَيِّئَهَا،', 'yang buruk darinya'],
					['لَا', 'tidak'],
					['يَصْرِفُ', 'menjauhkan'],
					['عَنِّي', 'dariku'],
					['سَيِّئَهَا', 'yang buruk darinya'],
					['إِلَّا', 'selain'],
					['أَنْتَ.', 'Engkau'],
					['لَبَّيْكَ', 'aku memenuhi panggilan-Mu'],
					['وَسَعْدَيْكَ،', 'dan aku terus taat kepada-Mu'],
					['وَالْخَيْرُ', 'dan kebaikan'],
					['كُلُّهُ', 'semuanya'],
					['فِي', 'di dalam'],
					['يَدَيْكَ', 'kedua tangan-Mu'],
					['وَالشَّرُّ', 'dan keburukan'],
					['لَيْسَ', 'tidak'],
					['إِلَيْكَ،', 'kepada-Mu'],
					['أَنَا', 'aku'],
					['بِكَ', 'dengan-Mu'],
					['وَإِلَيْكَ،', 'dan kepada-Mu'],
					['تَبَارَكْتَ', 'Mahaberkah Engkau'],
					['وَتَعَالَيْتَ،', 'dan Mahatinggi Engkau'],
					['أَسْتَغْفِرُكَ', 'aku memohon ampun kepada-Mu'],
					['وَأَتُوبُ', 'dan aku bertobat'],
					['إِلَيْكَ.', 'kepada-Mu']
				],
				meaning:
					'Aku menghadapkan wajahku kepada Dia yang menciptakan langit dan bumi, dengan lurus menuju tauhid, dan aku tidak termasuk orang yang menyekutukan Allah. Sungguh, shalatku, ibadahku, hidupku, dan matiku bagi Allah, Tuhan seluruh alam. Tiada sekutu bagi-Nya. Dengan itulah aku diperintah, dan aku termasuk orang-orang yang berserah diri. Ya Allah, Engkaulah Raja. Tiada sesembahan selain Engkau. Engkaulah Tuhanku dan aku hamba-Mu. Aku telah menzalimi diriku dan mengakui dosaku. Maka ampunilah semua dosaku. Sungguh, tiada yang mengampuni dosa selain Engkau. Bimbinglah aku kepada akhlak terbaik. Tiada yang membimbing kepadanya selain Engkau. Jauhkan akhlak buruk dariku. Tiada yang dapat menjauhkannya dariku selain Engkau. Aku memenuhi panggilan-Mu dan taat kepada-Mu. Segala kebaikan berada di tangan-Mu. Keburukan tidak dinisbatkan kepada-Mu. Dengan-Mu aku ada dan kepada-Mu aku menuju. Mahaberkah Engkau dan Mahatinggi. Aku memohon ampun kepada-Mu dan bertobat kepada-Mu.',
				note: 'Riwayat Ali memuat rangkaian pembuka ini. Sahih Muslim 771b menyebut konteks shalat malam dan juga mencatat perbedaan lafaz.'
			},
			{
				id: 'fathir',
				title: 'Memohon petunjuk ketika membuka shalat malam',
				book: 'muslim',
				number: '770',
				riwayat: 'Aisyah',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['رَبَّ', 'Tuhan'],
					['جِبْرَائِيلَ', 'Jibril'],
					['وَمِيكَائِيلَ', 'dan Mikail'],
					['وَإِسْرَافِيلَ،', 'dan Israfil'],
					['فَاطِرَ', 'Pencipta'],
					['السَّمَاوَاتِ', 'langit'],
					['وَالْأَرْضِ،', 'dan bumi'],
					['عَالِمَ', 'Yang Mengetahui'],
					['الْغَيْبِ', 'yang gaib'],
					['وَالشَّهَادَةِ،', 'dan yang tampak'],
					['أَنْتَ', 'Engkau'],
					['تَحْكُمُ', 'memutuskan perkara'],
					['بَيْنَ', 'di antara'],
					['عِبَادِكَ', 'hamba-hamba-Mu'],
					['فِيمَا', 'dalam apa yang'],
					[
						'كَانُوا',
						'mereka dahulu',
						'Membantu menempatkan kata kerja berikutnya dalam konteks lampau.'
					],
					['فِيهِ', 'di dalamnya'],
					['يَخْتَلِفُونَ.', 'berselisih'],
					['اهْدِنِي', 'bimbinglah aku'],
					['لِمَا', 'kepada apa yang'],
					['اخْتُلِفَ', 'diperselisihkan'],
					['فِيهِ', 'tentangnya'],
					['مِنَ', 'dari'],
					['الْحَقِّ', 'kebenaran'],
					['بِإِذْنِكَ،', 'dengan izin-Mu'],
					['إِنَّكَ', 'sungguh Engkau'],
					['تَهْدِي', 'membimbing'],
					['مَنْ', 'siapa yang'],
					['تَشَاءُ', 'Engkau kehendaki'],
					['إِلَى', 'ke'],
					['صِرَاطٍ', 'jalan'],
					['مُسْتَقِيمٍ.', 'yang lurus']
				],
				meaning:
					'Ya Allah, Tuhan Jibril, Mikail, dan Israfil, Pencipta langit dan bumi serta Yang Mengetahui yang gaib dan yang tampak. Engkau memutuskan perkara di antara hamba-hamba-Mu dalam hal yang mereka perselisihkan. Bimbinglah aku kepada kebenaran yang diperselisihkan itu dengan izin-Mu. Sungguh, Engkau membimbing siapa yang Engkau kehendaki ke jalan yang lurus.',
				note: 'Aisyah menjawab pertanyaan tentang bacaan pembuka Nabi ketika bangun untuk shalat malam.'
			},
			{
				id: 'iftitah-tahajud-ibn-abbas',
				title: 'Pujian pembuka tahajud',
				book: 'bukhari',
				number: '1120',
				riwayat: 'Abdullah bin Abbas',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['لَكَ', 'bagi-Mu'],
					['الْحَمْدُ،', 'segala puji'],
					['أَنْتَ', 'Engkaulah'],
					['قَيِّمُ', 'Yang mengurus'],
					['السَّمَاوَاتِ', 'langit'],
					['وَالْأَرْضِ', 'dan bumi'],
					['وَمَنْ', 'dan siapa saja yang'],
					['فِيهِنَّ،', 'ada di dalamnya'],
					['وَلَكَ', 'dan bagi-Mu'],
					['الْحَمْدُ،', 'segala puji'],
					['لَكَ', 'milik-Mu'],
					['مُلْكُ', 'kerajaan'],
					['السَّمَاوَاتِ', 'langit'],
					['وَالْأَرْضِ', 'dan bumi'],
					['وَمَنْ', 'dan siapa saja yang'],
					['فِيهِنَّ،', 'ada di dalamnya'],
					['وَلَكَ', 'dan bagi-Mu'],
					['الْحَمْدُ،', 'segala puji'],
					['أَنْتَ', 'Engkaulah'],
					['نُورُ', 'cahaya'],
					['السَّمَاوَاتِ', 'langit'],
					['وَالْأَرْضِ،', 'dan bumi'],
					['وَلَكَ', 'dan bagi-Mu'],
					['الْحَمْدُ،', 'segala puji'],
					['أَنْتَ', 'Engkaulah'],
					['الْحَقُّ،', 'Yang Mahabenar'],
					['وَوَعْدُكَ', 'dan janji-Mu'],
					['الْحَقُّ،', 'benar'],
					['وَلِقَاؤُكَ', 'dan perjumpaan dengan-Mu'],
					['حَقٌّ،', 'benar'],
					['وَقَوْلُكَ', 'dan firman-Mu'],
					['حَقٌّ،', 'benar'],
					['وَالْجَنَّةُ', 'dan surga'],
					['حَقٌّ،', 'benar'],
					['وَالنَّارُ', 'dan neraka'],
					['حَقٌّ،', 'benar'],
					['وَالنَّبِيُّونَ', 'dan para nabi'],
					['حَقٌّ،', 'benar'],
					['وَمُحَمَّدٌ', 'dan Muhammad'],
					['حَقٌّ،', 'benar'],
					['وَالسَّاعَةُ', 'dan Hari Kiamat'],
					['حَقٌّ.', 'benar'],
					['اللَّهُمَّ', 'Ya Allah'],
					['لَكَ', 'kepada-Mu'],
					['أَسْلَمْتُ،', 'aku berserah diri'],
					['وَبِكَ', 'dan kepada-Mu'],
					['آمَنْتُ،', 'aku beriman'],
					['وَعَلَيْكَ', 'dan kepada-Mu'],
					['تَوَكَّلْتُ،', 'aku bertawakal'],
					['وَإِلَيْكَ', 'dan kepada-Mu'],
					['أَنَبْتُ،', 'aku kembali'],
					['وَبِكَ', 'dan dengan pertolongan-Mu'],
					['خَاصَمْتُ،', 'aku menghadapi lawan'],
					['وَإِلَيْكَ', 'dan kepada-Mu'],
					['حَاكَمْتُ،', 'aku membawa perselisihan'],
					['فَاغْفِرْ', 'maka ampunilah'],
					['لِي', 'aku'],
					['مَا', 'apa yang'],
					['قَدَّمْتُ', 'kulakukan dahulu'],
					['وَمَا', 'dan apa yang'],
					['أَخَّرْتُ،', 'kulakukan kemudian'],
					['وَمَا', 'dan apa yang'],
					['أَسْرَرْتُ', 'kurahasiakan'],
					['وَمَا', 'dan apa yang'],
					['أَعْلَنْتُ،', 'kutampakkan'],
					['أَنْتَ', 'Engkaulah'],
					['الْمُقَدِّمُ', 'Yang Mendahulukan'],
					['وَأَنْتَ', 'dan Engkau'],
					['الْمُؤَخِّرُ،', 'Yang Mengakhirkan'],
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['أَنْتَ.', 'Engkau']
				],
				meaning:
					'Ya Allah, bagi-Mu segala puji. Engkaulah Yang mengurus langit, bumi, dan siapa saja yang ada di dalamnya. Bagi-Mu segala puji. Milik-Mu kerajaan langit, bumi, dan semua yang ada di dalamnya. Bagi-Mu segala puji. Engkaulah cahaya langit dan bumi. Bagi-Mu segala puji. Engkaulah Yang Mahabenar. Janji-Mu benar, perjumpaan dengan-Mu benar, firman-Mu benar, surga benar, neraka benar, para nabi benar, Muhammad benar, dan Hari Kiamat benar. Ya Allah, kepada-Mu aku berserah diri, kepada-Mu aku beriman, kepada-Mu aku bertawakal, kepada-Mu aku kembali. Dengan pertolongan-Mu aku menghadapi lawan, dan kepada-Mu aku membawa perselisihan. Maka ampunilah yang kulakukan dahulu dan kemudian, yang kurahasiakan dan yang kutampakkan. Engkaulah Yang Mendahulukan dan Yang Mengakhirkan. Tiada sesembahan selain Engkau.',
				note: 'Ibnu Abbas meriwayatkannya ketika Nabi bangun untuk tahajud. Perawi juga menyebut pilihan lafaz لَا إِلَهَ غَيْرُكَ pada penutup. Shalawat yang ditulis setelah nama Nabi dalam sumber menyertai penyebutan namanya.'
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
			},
			{
				id: 'laka-rakatu',
				title: 'Rukuk, iman, dan ketundukan',
				book: 'muslim',
				number: '771a',
				riwayat: 'Ali bin Abi Thalib',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['لَكَ', 'kepada-Mu'],
					['رَكَعْتُ', 'aku rukuk'],
					['وَبِكَ', 'dan kepada-Mu'],
					['آمَنْتُ', 'aku beriman'],
					['وَلَكَ', 'dan kepada-Mu'],
					['أَسْلَمْتُ،', 'aku berserah diri'],
					['خَشَعَ', 'tunduk'],
					['لَكَ', 'kepada-Mu'],
					['سَمْعِي', 'pendengaranku'],
					['وَبَصَرِي', 'dan penglihatanku'],
					['وَمُخِّي', 'dan sumsumku'],
					['وَعَظْمِي', 'dan tulangku'],
					['وَعَصَبِي.', 'dan urat sarafku']
				],
				meaning:
					'Ya Allah, kepada-Mu aku rukuk, kepada-Mu aku beriman, dan kepada-Mu aku berserah diri. Tunduk kepada-Mu pendengaranku, penglihatanku, sumsumku, tulangku, dan urat sarafku.',
				note: 'Akhiran ـتُ menandai “aku” sebagai pelaku. Akhiran ـي pada deret anggota tubuh berarti “-ku”.'
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
			},
			{
				id: 'rabbana-milas-samawat',
				title: 'Tahmid sepenuh langit dan bumi',
				book: 'muslim',
				number: '476a',
				riwayat: 'Abdullah bin Abi Aufa',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['رَبَّنَا', 'Tuhan kami'],
					['لَكَ', 'bagi-Mu'],
					['الْحَمْدُ', 'segala puji'],
					['مِلْءَ', 'sepenuh'],
					['السَّمَاوَاتِ', 'langit'],
					['وَمِلْءَ', 'dan sepenuh'],
					['الْأَرْضِ', 'bumi'],
					['وَمِلْءَ', 'dan sepenuh'],
					['مَا', 'apa yang'],
					['شِئْتَ', 'Engkau kehendaki'],
					['مِنْ', 'dari'],
					['شَيْءٍ', 'sesuatu'],
					['بَعْدُ.', 'sesudah itu']
				],
				meaning:
					'Ya Allah, Tuhan kami, bagi-Mu segala puji sepenuh langit, sepenuh bumi, dan sepenuh apa pun yang Engkau kehendaki sesudah itu.',
				note: 'Hadis menyebut tahmid ini setelah tasmi‘. Kata مِلْءَ menyatakan ukuran kepenuhan pujian.'
			},
			{
				id: 'ahlath-thana',
				title: 'Tahmid dan pengakuan akan karunia Allah',
				book: 'muslim',
				number: '477',
				riwayat: 'Abu Sa‘id al-Khudri',
				words: [
					['رَبَّنَا', 'Tuhan kami'],
					['لَكَ', 'bagi-Mu'],
					['الْحَمْدُ', 'segala puji'],
					['مِلْءَ', 'sepenuh'],
					['السَّمَاوَاتِ', 'langit'],
					['وَالْأَرْضِ', 'dan bumi'],
					['وَمِلْءَ', 'dan sepenuh'],
					['مَا', 'apa yang'],
					['شِئْتَ', 'Engkau kehendaki'],
					['مِنْ', 'dari'],
					['شَيْءٍ', 'sesuatu'],
					['بَعْدُ،', 'sesudah itu'],
					['أَهْلَ', 'wahai Yang layak menerima'],
					['الثَّنَاءِ', 'pujian'],
					['وَالْمَجْدِ،', 'dan kemuliaan'],
					['أَحَقُّ', 'yang paling benar'],
					['مَا', 'dari apa yang'],
					['قَالَ', 'diucapkan'],
					['الْعَبْدُ', 'seorang hamba'],
					['وَكُلُّنَا', 'dan kami semua'],
					['لَكَ', 'bagi-Mu'],
					['عَبْدٌ،', 'hamba'],
					['اللَّهُمَّ', 'Ya Allah'],
					['لَا', 'tiada'],
					['مَانِعَ', 'yang menghalangi'],
					['لِمَا', 'apa yang'],
					['أَعْطَيْتَ', 'Engkau berikan'],
					['وَلَا', 'dan tiada'],
					['مُعْطِيَ', 'yang memberi'],
					['لِمَا', 'apa yang'],
					['مَنَعْتَ،', 'Engkau tahan'],
					['وَلَا', 'dan tidak'],
					['يَنْفَعُ', 'bermanfaat'],
					['ذَا', 'bagi pemilik'],
					['الْجَدِّ', 'kekayaan'],
					['مِنْكَ', 'di hadapan-Mu'],
					['الْجَدُّ.', 'kekayaan itu']
				],
				meaning:
					'Tuhan kami, bagi-Mu segala puji sepenuh langit dan bumi dan sepenuh apa pun yang Engkau kehendaki sesudah itu. Engkau yang layak menerima pujian dan kemuliaan. Inilah ucapan paling benar yang diucapkan seorang hamba, dan kami semua hamba-Mu. Ya Allah, tiada yang menghalangi apa yang Engkau beri dan tiada yang memberi apa yang Engkau tahan. Di hadapan-Mu, kekayaan seseorang tidak dapat menolongnya.',
				note: 'جَدّ di akhir doa mengacu pada kekayaan atau kedudukan. Bandingkan dengan جَدُّكَ dalam doa pembuka yang bermakna “keagungan-Mu”.'
			},
			{
				id: 'rabbana-walakal-hamd',
				title: 'Tahmid singkat dengan wāw',
				book: 'bukhari',
				number: '738',
				riwayat: 'Abdullah bin Umar',
				words: [
					['رَبَّنَا', 'Tuhan kami'],
					['وَلَكَ', 'dan bagi-Mu'],
					['الْحَمْدُ.', 'segala puji']
				],
				meaning: 'Tuhan kami, bagi-Mu segala puji.',
				note: 'Ibnu Umar menyebut tahmid ini ketika bangkit dari rukuk.'
			},
			{
				id: 'rabbana-mila-baynahuma',
				title: 'Tahmid sepenuh apa yang ada di antara langit dan bumi',
				book: 'muslim',
				number: '771a',
				riwayat: 'Ali bin Abi Thalib',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['رَبَّنَا', 'Tuhan kami'],
					['لَكَ', 'bagi-Mu'],
					['الْحَمْدُ', 'segala puji'],
					['مِلْءَ', 'sepenuh'],
					['السَّمَاوَاتِ', 'langit'],
					['وَمِلْءَ', 'dan sepenuh'],
					['الْأَرْضِ', 'bumi'],
					['وَمِلْءَ', 'dan sepenuh'],
					['مَا', 'apa yang'],
					['بَيْنَهُمَا', 'ada di antara keduanya'],
					['وَمِلْءَ', 'dan sepenuh'],
					['مَا', 'apa yang'],
					['شِئْتَ', 'Engkau kehendaki'],
					['مِنْ', 'dari'],
					['شَيْءٍ', 'sesuatu'],
					['بَعْدُ.', 'sesudah itu']
				],
				meaning:
					'Ya Allah, Tuhan kami, bagi-Mu segala puji sepenuh langit, sepenuh bumi, sepenuh apa yang ada di antara keduanya, dan sepenuh apa pun yang Engkau kehendaki sesudah itu.',
				note: 'Akhiran ـهُمَا merujuk kepada dua hal, langit dan bumi.'
			},
			{
				id: 'tahmid-tahhirni',
				title: 'Tahmid dan doa agar disucikan',
				book: 'muslim',
				number: '476c',
				riwayat: 'Abdullah bin Abi Aufa',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['لَكَ', 'bagi-Mu'],
					['الْحَمْدُ', 'segala puji'],
					['مِلْءَ', 'sepenuh'],
					['السَّمَاءِ', 'langit'],
					['وَمِلْءَ', 'dan sepenuh'],
					['الْأَرْضِ', 'bumi'],
					['وَمِلْءَ', 'dan sepenuh'],
					['مَا', 'apa yang'],
					['شِئْتَ', 'Engkau kehendaki'],
					['مِنْ', 'dari'],
					['شَيْءٍ', 'sesuatu'],
					['بَعْدُ.', 'sesudah itu'],
					['اللَّهُمَّ', 'Ya Allah'],
					['طَهِّرْنِي', 'sucikanlah aku'],
					['بِالثَّلْجِ', 'dengan salju'],
					['وَالْبَرَدِ', 'dan butiran es'],
					['وَالْمَاءِ', 'dan air'],
					['الْبَارِدِ.', 'yang dingin'],
					['اللَّهُمَّ', 'Ya Allah'],
					['طَهِّرْنِي', 'sucikanlah aku'],
					['مِنَ', 'dari'],
					['الذُّنُوبِ', 'dosa'],
					['وَالْخَطَايَا', 'dan kesalahan'],
					['كَمَا', 'sebagaimana'],
					['يُنَقَّى', 'dibersihkan'],
					['الثَّوْبُ', 'pakaian'],
					['الْأَبْيَضُ', 'yang putih'],
					['مِنَ', 'dari'],
					['الْوَسَخِ.', 'kotoran']
				],
				meaning:
					'Ya Allah, bagi-Mu segala puji sepenuh langit, sepenuh bumi, dan sepenuh apa pun yang Engkau kehendaki sesudah itu. Ya Allah, sucikanlah aku dengan salju, butiran es, dan air dingin. Ya Allah, sucikanlah aku dari dosa dan kesalahan sebagaimana pakaian putih dibersihkan dari kotoran.',
				note: 'Di sini السَّمَاءِ berbentuk tunggal. Riwayat 476a memakai bentuk jamak السَّمَاوَاتِ.'
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
					['وَبِمُعَافَاتِكَ', 'dan dengan keselamatan dari-Mu'],
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
					'Ya Allah, aku berlindung dengan rida-Mu dari murka-Mu dan dengan keselamatan yang Engkau karuniakan dari hukuman-Mu. Aku berlindung kepada-Mu dari-Mu. Aku tidak mampu menghitung pujian bagi-Mu. Engkau sebagaimana Engkau memuji diri-Mu sendiri.',
				note: 'Aisyah mendengarnya ketika Nabi sedang sujud pada malam hari.'
			},
			{
				id: 'subhanaka-la-ilaha',
				title: 'Tasbih dan pengakuan tauhid',
				book: 'muslim',
				number: '485',
				riwayat: 'Aisyah',
				words: [
					['سُبْحَانَكَ', 'Mahasuci Engkau'],
					['وَبِحَمْدِكَ،', 'dan dengan pujian kepada-Mu'],
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['أَنْتَ.', 'Engkau']
				],
				meaning: 'Mahasuci Engkau dan segala puji bagi-Mu. Tiada sesembahan selain Engkau.',
				note: 'Aisyah mendengarnya pada malam hari ketika Nabi sedang rukuk atau sujud. Redaksi hadis menyebut salah satu dari dua posisi itu.'
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
				grade: 'Sahih menurut al-Albani dan daif menurut Darussalam.',
				gradeSource: 'https://dorar.net/h/4YsPO2gj?osoul=1',
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
			},
			{
				id: 'shalawat-abu-masud',
				title: 'Shalawat riwayat Abu Mas‘ud al-Anshari',
				book: 'muslim',
				number: '405',
				riwayat: 'Abu Mas‘ud al-Anshari',
				words: [
					allahumma,
					['صَلِّ', 'limpahkanlah shalawat'],
					['عَلَى', 'kepada'],
					['مُحَمَّدٍ', 'Muhammad'],
					['وَعَلَى', 'dan kepada'],
					['آلِ', 'keluarga'],
					['مُحَمَّدٍ', 'Muhammad'],
					['كَمَا', 'sebagaimana'],
					['صَلَّيْتَ', 'Engkau melimpahkan shalawat'],
					['عَلَى', 'kepada'],
					['آلِ', 'keluarga'],
					['إِبْرَاهِيمَ،', 'Ibrahim'],
					['وَبَارِكْ', 'dan berkahilah'],
					['عَلَى', 'kepada'],
					['مُحَمَّدٍ', 'Muhammad'],
					['وَعَلَى', 'dan kepada'],
					['آلِ', 'keluarga'],
					['مُحَمَّدٍ', 'Muhammad'],
					['كَمَا', 'sebagaimana'],
					['بَارَكْتَ', 'Engkau memberkahi'],
					['عَلَى', 'kepada'],
					['آلِ', 'keluarga'],
					['إِبْرَاهِيمَ', 'Ibrahim'],
					['فِي', 'di'],
					['الْعَالَمِينَ،', 'seluruh alam'],
					...hamidMajid
				],
				meaning:
					'Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarga Muhammad sebagaimana Engkau melimpahkan shalawat kepada keluarga Ibrahim. Berkahilah Muhammad dan keluarga Muhammad sebagaimana Engkau memberkahi keluarga Ibrahim di seluruh alam. Sungguh Engkau Maha Terpuji, Mahamulia.',
				note: 'Riwayat ini mencantumkan فِي الْعَالَمِينَ sesudah permohonan berkah.'
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
				note: 'Abu Bakar meminta doa untuk dibaca dalam shalat. Al-Bukhari menempatkan hadis ini dalam bab doa sebelum salam.'
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
			},
			{
				id: 'taawwudh-matham-maghram',
				title: 'Berlindung dari dosa dan beban utang',
				book: 'muslim',
				number: '589',
				riwayat: 'Aisyah',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['إِنِّي', 'sungguh aku'],
					['أَعُوذُ', 'berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنْ', 'dari'],
					['عَذَابِ', 'azab'],
					['الْقَبْرِ،', 'kubur'],
					['وَأَعُوذُ', 'dan aku berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنْ', 'dari'],
					['فِتْنَةِ', 'ujian'],
					['الْمَسِيحِ', 'al-Masih'],
					['الدَّجَّالِ،', 'Dajjal'],
					['وَأَعُوذُ', 'dan aku berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنْ', 'dari'],
					['فِتْنَةِ', 'ujian'],
					['الْمَحْيَا', 'kehidupan'],
					['وَالْمَمَاتِ.', 'dan kematian'],
					['اللَّهُمَّ', 'Ya Allah'],
					['إِنِّي', 'sungguh aku'],
					['أَعُوذُ', 'berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنَ', 'dari'],
					['الْمَأْثَمِ', 'dosa'],
					['وَالْمَغْرَمِ.', 'dan beban utang']
				],
				meaning:
					'Ya Allah, sungguh aku berlindung kepada-Mu dari azab kubur. Aku berlindung kepada-Mu dari ujian al-Masih Dajjal dan dari ujian hidup dan mati. Ya Allah, sungguh aku berlindung kepada-Mu dari dosa dan beban utang.',
				note: 'Aisyah meriwayatkannya sebagai doa dalam shalat. Kata الْمَغْرَم merujuk kepada utang atau tanggungan yang membebani.'
			},
			{
				id: 'biilmikal-ghayb',
				title: 'Doa yang dibaca Ammar bin Yasir',
				book: 'nasai',
				number: '1305',
				riwayat: 'Ammar bin Yasir',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['بِعِلْمِكَ', 'dengan pengetahuan-Mu'],
					['الْغَيْبَ', 'tentang yang gaib'],
					['وَقُدْرَتِكَ', 'dan kuasa-Mu'],
					['عَلَى', 'atas'],
					['الْخَلْقِ،', 'makhluk'],
					['أَحْيِنِي', 'hidupkanlah aku'],
					['مَا', 'selama'],
					['عَلِمْتَ', 'Engkau mengetahui'],
					['الْحَيَاةَ', 'hidup'],
					['خَيْرًا', 'lebih baik'],
					['لِي،', 'bagiku'],
					['وَتَوَفَّنِي', 'dan wafatkanlah aku'],
					['إِذَا', 'ketika'],
					['عَلِمْتَ', 'Engkau mengetahui'],
					['الْوَفَاةَ', 'wafat'],
					['خَيْرًا', 'lebih baik'],
					['لِي.', 'bagiku'],
					['اللَّهُمَّ', 'Ya Allah'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['خَشْيَتَكَ', 'rasa takut yang tulus kepada-Mu'],
					['فِي', 'dalam'],
					['الْغَيْبِ', 'keadaan tersembunyi'],
					['وَالشَّهَادَةِ،', 'dan yang terlihat'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['كَلِمَةَ', 'perkataan'],
					['الْحَقِّ', 'yang benar'],
					['فِي', 'dalam'],
					['الرِّضَا', 'keadaan rida'],
					['وَالْغَضَبِ،', 'dan marah'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['الْقَصْدَ', 'sikap wajar dan seimbang'],
					['فِي', 'dalam'],
					['الْفَقْرِ', 'kemiskinan'],
					['وَالْغِنَى،', 'dan kecukupan'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['نَعِيمًا', 'kenikmatan'],
					['لَا', 'yang tidak'],
					['يَنْفَدُ،', 'habis'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['قُرَّةَ', 'penyejuk'],
					['عَيْنٍ', 'mata'],
					['لَا', 'yang tidak'],
					['تَنْقَطِعُ،', 'terputus'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['الرِّضَاءَ', 'kerelaan'],
					['بَعْدَ', 'sesudah'],
					['الْقَضَاءِ،', 'ketetapan'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['بَرْدَ', 'kesejukan'],
					['الْعَيْشِ', 'hidup'],
					['بَعْدَ', 'sesudah'],
					['الْمَوْتِ،', 'kematian'],
					['وَأَسْأَلُكَ', 'dan aku memohon kepada-Mu'],
					['لَذَّةَ', 'kenikmatan'],
					['النَّظَرِ', 'memandang'],
					['إِلَى', 'kepada'],
					['وَجْهِكَ', 'wajah-Mu'],
					['وَالشَّوْقَ', 'dan kerinduan'],
					['إِلَى', 'untuk'],
					['لِقَائِكَ', 'berjumpa dengan-Mu'],
					['فِي', 'dalam'],
					['غَيْرِ', 'keadaan tanpa'],
					['ضَرَّاءَ', 'kesusahan'],
					['مُضِرَّةٍ', 'yang membahayakan'],
					['وَلَا', 'dan tanpa'],
					['فِتْنَةٍ', 'ujian'],
					['مُضِلَّةٍ.', 'yang menyesatkan'],
					['اللَّهُمَّ', 'Ya Allah'],
					['زَيِّنَّا', 'hiasilah kami'],
					['بِزِينَةِ', 'dengan perhiasan'],
					['الْإِيمَانِ', 'iman'],
					['وَاجْعَلْنَا', 'dan jadikanlah kami'],
					['هُدَاةً', 'orang yang membimbing'],
					['مُهْتَدِينَ.', 'yang mendapat petunjuk']
				],
				meaning:
					'Ya Allah, dengan pengetahuan-Mu tentang yang gaib dan kuasa-Mu atas makhluk, hidupkanlah aku selama Engkau mengetahui bahwa hidup lebih baik bagiku. Wafatkanlah aku ketika Engkau mengetahui bahwa wafat lebih baik bagiku. Ya Allah, aku mohon rasa takut yang tulus kepada-Mu saat sendiri maupun di hadapan orang. Aku mohon dapat berkata benar ketika rida maupun marah, dan bersikap wajar saat miskin maupun berkecukupan. Aku mohon kenikmatan yang tak habis dan penyejuk hati yang tak putus. Aku mohon kerelaan setelah ketetapan-Mu, kenyamanan hidup setelah mati, kenikmatan memandang wajah-Mu, dan kerinduan berjumpa dengan-Mu, tanpa kesusahan yang membahayakan atau ujian yang menyesatkan. Ya Allah, hiasilah kami dengan perhiasan iman dan jadikanlah kami pembimbing yang mendapat petunjuk.',
				note: 'Ammar menjelaskan bahwa ia membaca doa yang didengarnya dari Nabi dalam shalat. Judul bab an-Nasa’i mengelompokkannya dengan pilihan doa dalam shalat.',
				grade: 'Sahih menurut al-Albani'
			}
		]
	},
	{
		id: 'akhir-shalat',
		title: 'Doa di penghujung shalat',
		readings: [
			{
				id: 'allahumma-ainni',
				title: 'Memohon pertolongan untuk beribadah',
				book: 'abudawud',
				number: '1522',
				riwayat: 'Mu‘adz bin Jabal',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['أَعِنِّي', 'tolonglah aku', 'Akhiran ـنِي menunjukkan “aku” sebagai orang yang ditolong.'],
					['عَلَى', 'untuk'],
					['ذِكْرِكَ', 'mengingat-Mu'],
					['وَشُكْرِكَ', 'dan bersyukur kepada-Mu'],
					['وَحُسْنِ', 'dan baiknya'],
					['عِبَادَتِكَ.', 'ibadah kepada-Mu']
				],
				meaning:
					'Ya Allah, tolonglah aku agar mengingat-Mu, bersyukur kepada-Mu, dan beribadah kepada-Mu dengan baik.',
				note: 'Nabi mewasiatkan doa ini kepada Mu‘adz. Riwayat menyebut دُبُرِ كُلِّ صَلَاةٍ, yaitu di penghujung setiap shalat. Penempatan persisnya dibahas dalam fikih.',
				grade: 'Sahih menurut al-Albani'
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
			},
			{
				id: 'tasbih-tahmid-takbir',
				title: 'Lafaz tasbih, tahmid, dan takbir',
				book: 'bukhari',
				number: '843',
				riwayat: 'Abu Hurairah',
				words: [
					['سُبْحَانَ', 'Mahasuci'],
					['اللَّهِ،', 'Allah'],
					['وَالْحَمْدُ', 'dan segala puji'],
					['لِلَّهِ،', 'bagi Allah'],
					['وَاللَّهُ', 'dan Allah'],
					['أَكْبَرُ.', 'Mahabesar']
				],
				meaning: 'Mahasuci Allah. Segala puji bagi Allah. Allah Mahabesar.',
				note: 'Al-Bukhari 843 memuat tiga lafaz ini dalam pembahasan cara menghitungnya. Muslim 597a menyebut masing-masing 33 kali, lalu tahlil untuk menggenapkan seratus.'
			},
			{
				id: 'tahlil-penutup',
				title: 'Tahlil yang menggenapkan seratus',
				book: 'muslim',
				number: '597a',
				riwayat: 'Abu Hurairah',
				words: [
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['اللَّهُ', 'Allah'],
					['وَحْدَهُ،', 'semata'],
					['لَا', 'tiada'],
					['شَرِيكَ', 'sekutu'],
					['لَهُ،', 'bagi-Nya'],
					['لَهُ', 'milik-Nya'],
					['الْمُلْكُ،', 'kerajaan'],
					['وَلَهُ', 'dan bagi-Nya'],
					['الْحَمْدُ،', 'segala puji'],
					['وَهُوَ', 'dan Dia'],
					['عَلَى', 'atas'],
					['كُلِّ', 'segala'],
					['شَيْءٍ', 'sesuatu'],
					['قَدِيرٌ.', 'Mahakuasa']
				],
				meaning:
					'Tiada sesembahan selain Allah semata. Tiada sekutu bagi-Nya. Milik-Nya segala kerajaan, bagi-Nya segala puji, dan Dia Mahakuasa atas segala sesuatu.',
				note: 'Dalam riwayat ini tahlil menggenapkan seratus setelah masing-masing 33 tasbih, tahmid, dan takbir.'
			},
			{
				id: 'tahlil-la-mania',
				title: 'Tahlil dan pengakuan atas karunia Allah',
				book: 'bukhari',
				number: '844',
				riwayat: 'Al-Mughirah bin Syu‘bah',
				words: [
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['اللَّهُ', 'Allah'],
					['وَحْدَهُ،', 'semata'],
					['لَا', 'tiada'],
					['شَرِيكَ', 'sekutu'],
					['لَهُ،', 'bagi-Nya'],
					['لَهُ', 'milik-Nya'],
					['الْمُلْكُ،', 'kerajaan'],
					['وَلَهُ', 'dan bagi-Nya'],
					['الْحَمْدُ،', 'segala puji'],
					['وَهْوَ', 'dan Dia'],
					['عَلَى', 'atas'],
					['كُلِّ', 'segala'],
					['شَيْءٍ', 'sesuatu'],
					['قَدِيرٌ.', 'Mahakuasa'],
					['اللَّهُمَّ', 'Ya Allah'],
					['لَا', 'tiada'],
					['مَانِعَ', 'yang menghalangi'],
					['لِمَا', 'apa yang'],
					['أَعْطَيْتَ،', 'Engkau berikan'],
					['وَلَا', 'dan tiada'],
					['مُعْطِيَ', 'yang memberi'],
					['لِمَا', 'apa yang'],
					['مَنَعْتَ،', 'Engkau tahan'],
					['وَلَا', 'dan tidak'],
					['يَنْفَعُ', 'bermanfaat'],
					['ذَا', 'bagi pemilik'],
					['الْجَدِّ', 'kekayaan'],
					['مِنْكَ', 'di hadapan-Mu'],
					['الْجَدُّ.', 'kekayaan itu']
				],
				meaning:
					'Tiada sesembahan selain Allah semata. Tiada sekutu bagi-Nya. Milik-Nya segala kerajaan, bagi-Nya segala puji, dan Dia Mahakuasa atas segala sesuatu. Ya Allah, tiada yang menghalangi apa yang Engkau beri dan tiada yang memberi apa yang Engkau tahan. Di hadapan-Mu, kekayaan seseorang tidak dapat menolongnya.',
				note: 'Al-Mughirah meriwayatkan lafaz ini pada akhir shalat wajib. Bagian akhirnya juga muncul dalam riwayat tahmid setelah rukuk di Muslim 477.'
			},
			{
				id: 'tahlil-ibn-zubair',
				title: 'Tahlil riwayat Abdullah bin az-Zubair',
				book: 'muslim',
				number: '594a',
				riwayat: 'Abdullah bin az-Zubair',
				words: [
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['اللَّهُ', 'Allah'],
					['وَحْدَهُ،', 'semata'],
					['لَا', 'tiada'],
					['شَرِيكَ', 'sekutu'],
					['لَهُ،', 'bagi-Nya'],
					['لَهُ', 'milik-Nya'],
					['الْمُلْكُ', 'kerajaan'],
					['وَلَهُ', 'dan bagi-Nya'],
					['الْحَمْدُ', 'segala puji'],
					['وَهُوَ', 'dan Dia'],
					['عَلَى', 'atas'],
					['كُلِّ', 'segala'],
					['شَيْءٍ', 'sesuatu'],
					['قَدِيرٌ.', 'Mahakuasa'],
					['لَا', 'tiada'],
					['حَوْلَ', 'daya'],
					['وَلَا', 'dan tiada'],
					['قُوَّةَ', 'kekuatan'],
					['إِلَّا', 'kecuali'],
					['بِاللَّهِ.', 'dengan pertolongan Allah'],
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['اللَّهُ', 'Allah'],
					['وَلَا', 'dan tidak'],
					['نَعْبُدُ', 'kami menyembah'],
					['إِلَّا', 'kecuali'],
					['إِيَّاهُ.', 'Dia'],
					['لَهُ', 'milik-Nya'],
					['النِّعْمَةُ', 'segala nikmat'],
					['وَلَهُ', 'dan milik-Nya'],
					['الْفَضْلُ', 'karunia'],
					['وَلَهُ', 'dan bagi-Nya'],
					['الثَّنَاءُ', 'pujian'],
					['الْحَسَنُ.', 'yang baik'],
					['لَا', 'tiada'],
					['إِلَهَ', 'sesembahan'],
					['إِلَّا', 'selain'],
					['اللَّهُ', 'Allah'],
					['مُخْلِصِينَ', 'dengan mengikhlaskan'],
					['لَهُ', 'bagi-Nya'],
					['الدِّينَ', 'ibadah'],
					['وَلَوْ', 'walaupun'],
					['كَرِهَ', 'tidak menyukai'],
					['الْكَافِرُونَ.', 'orang-orang kafir']
				],
				meaning:
					'Tiada sesembahan selain Allah semata. Tiada sekutu bagi-Nya. Milik-Nya segala kerajaan dan bagi-Nya segala puji. Dia Mahakuasa atas segala sesuatu. Tiada daya dan tiada kekuatan kecuali dengan pertolongan Allah. Tiada sesembahan selain Allah, dan kami hanya menyembah Dia. Milik-Nya segala nikmat, karunia, dan pujian yang baik. Tiada sesembahan selain Allah. Kami mengikhlaskan ibadah bagi-Nya walaupun orang-orang kafir tidak menyukainya.',
				note: 'Ibnu az-Zubair mengucapkannya sesudah salam dan menyebut bahwa Rasulullah bertahlil dengan kalimat-kalimat ini.'
			}
		]
	},
	{
		id: 'qunut-witir',
		title: 'Doa dan zikir witir',
		readings: [
			{
				id: 'allahumma-ihdini',
				title: 'Qunut shalat witir',
				book: 'abudawud',
				number: '1425',
				riwayat: 'Hasan bin Ali',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['اهْدِنِي', 'beri aku petunjuk'],
					['فِيمَنْ', 'bersama orang yang'],
					['هَدَيْتَ،', 'Engkau beri petunjuk'],
					['وَعَافِنِي', 'dan beri aku keselamatan'],
					['فِيمَنْ', 'bersama orang yang'],
					['عَافَيْتَ،', 'Engkau beri keselamatan'],
					['وَتَوَلَّنِي', 'dan lindungilah aku'],
					['فِيمَنْ', 'bersama orang yang'],
					['تَوَلَّيْتَ،', 'Engkau lindungi'],
					['وَبَارِكْ', 'dan berkahilah'],
					['لِي', 'untukku'],
					['فِيمَا', 'pada apa yang'],
					['أَعْطَيْتَ،', 'Engkau berikan'],
					['وَقِنِي', 'dan lindungilah aku'],
					['شَرَّ', 'dari keburukan'],
					['مَا', 'apa yang'],
					['قَضَيْتَ،', 'Engkau tetapkan'],
					['إِنَّكَ', 'sungguh Engkau'],
					['تَقْضِي', 'menetapkan'],
					['وَلَا', 'dan tiada'],
					[
						'يُقْضَى',
						'ditetapkan',
						'Kata kerja pasif dari قَضَى. Makna utuhnya menyatakan bahwa keputusan tidak ditetapkan atas Allah.'
					],
					['عَلَيْكَ،', 'atas-Mu'],
					['وَإِنَّهُ', 'dan sungguh'],
					['لَا', 'tidak'],
					['يَذِلُّ', 'menjadi hina'],
					['مَنْ', 'orang yang'],
					['وَالَيْتَ،', 'Engkau lindungi'],
					['وَلَا', 'dan tidak'],
					['يَعِزُّ', 'menjadi mulia'],
					['مَنْ', 'orang yang'],
					['عَادَيْتَ،', 'Engkau musuhi'],
					['تَبَارَكْتَ', 'Mahaberkah Engkau'],
					['رَبَّنَا', 'Tuhan kami'],
					['وَتَعَالَيْتَ.', 'dan Mahatinggi Engkau']
				],
				meaning:
					'Ya Allah, bimbinglah aku bersama orang-orang yang Engkau beri petunjuk. Karuniakan keselamatan kepadaku bersama orang-orang yang Engkau beri keselamatan. Lindungilah aku bersama orang-orang yang Engkau lindungi. Berkahilah apa yang Engkau berikan kepadaku. Lindungilah aku dari keburukan yang Engkau tetapkan. Sungguh, Engkau menetapkan, dan tiada yang menetapkan atas-Mu. Orang yang Engkau lindungi tidak akan hina, dan orang yang Engkau musuhi tidak akan mulia. Mahaberkah Engkau, Tuhan kami, dan Mahatinggi.',
				note: 'Hasan bin Ali meriwayatkan pengajaran doa untuk witir. Ibn Jawwas menyebutnya qunut witir.',
				grade: 'Sahih menurut al-Albani'
			},
			{
				id: 'witir-akhir-ridaka',
				title: 'Doa perlindungan di akhir witir',
				book: 'abudawud',
				number: '1427',
				riwayat: 'Ali bin Abi Thalib',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['إِنِّي', 'sungguh aku'],
					['أَعُوذُ', 'berlindung'],
					['بِرِضَاكَ', 'dengan rida-Mu'],
					['مِنْ', 'dari'],
					['سَخَطِكَ', 'murka-Mu'],
					['وَبِمُعَافَاتِكَ', 'dan dengan keselamatan dari-Mu'],
					['مِنْ', 'dari'],
					['عُقُوبَتِكَ،', 'hukuman-Mu'],
					['وَأَعُوذُ', 'dan aku berlindung'],
					['بِكَ', 'kepada-Mu'],
					['مِنْكَ،', 'dari-Mu'],
					['لَا', 'tidak'],
					['أُحْصِي', 'aku mampu menghitung'],
					['ثَنَاءً', 'pujian'],
					['عَلَيْكَ،', 'bagi-Mu'],
					['أَنْتَ', 'Engkau'],
					['كَمَا', 'sebagaimana'],
					['أَثْنَيْتَ', 'Engkau memuji'],
					['عَلَى', 'atas'],
					['نَفْسِكَ.', 'diri-Mu sendiri']
				],
				meaning:
					'Ya Allah, sungguh aku berlindung dengan rida-Mu dari murka-Mu, dan dengan keselamatan yang Engkau karuniakan dari hukuman-Mu. Aku berlindung kepada-Mu dari-Mu. Aku tidak mampu menghitung pujian bagi-Mu. Engkau terpuji sebagaimana Engkau memuji diri-Mu sendiri.',
				note: 'Riwayat Ali menyebutnya pada akhir witir. Bandingkan lafaz ini dengan doa Aisyah ketika sujud dalam Muslim 486.',
				grade: 'Sahih menurut al-Albani'
			},
			{
				id: 'subhanal-malikil-quddus',
				title: 'Tasbih sesudah salam witir',
				book: 'abudawud',
				number: '1430',
				riwayat: 'Ubay bin Ka‘ab',
				words: [
					['سُبْحَانَ', 'Mahasuci'],
					['الْمَلِكِ', 'Sang Raja'],
					['الْقُدُّوسِ.', 'Yang Mahakudus']
				],
				meaning: 'Mahasuci Sang Raja Yang Mahakudus.',
				note: 'Ubay meriwayatkan bacaan ini sesudah salam witir.',
				grade: 'Sahih menurut al-Albani'
			}
		]
	},
	{
		id: 'jenazah',
		title: 'Doa shalat jenazah',
		readings: [
			{
				id: 'jenazah-awf',
				title: 'Doa untuk jenazah riwayat Auf bin Malik',
				book: 'muslim',
				number: '963b',
				riwayat: 'Auf bin Malik',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['اغْفِرْ', 'ampunilah'],
					['لَهُ', 'dia'],
					['وَارْحَمْهُ', 'dan rahmatilah dia'],
					['وَعَافِهِ', 'dan selamatkan dia'],
					['وَاعْفُ', 'dan maafkanlah'],
					['عَنْهُ،', 'dia'],
					['وَأَكْرِمْ', 'dan muliakanlah'],
					[
						'نُزُلَهُ',
						'tempat penerimaannya',
						'نُزُل dapat berarti jamuan atau tempat yang disiapkan bagi orang yang datang.'
					],
					['وَوَسِّعْ', 'dan luaskanlah'],
					['مُدْخَلَهُ،', 'tempat masuknya'],
					['وَاغْسِلْهُ', 'dan basuhlah dia'],
					['بِالْمَاءِ', 'dengan air'],
					['وَالثَّلْجِ', 'dan salju'],
					['وَالْبَرَدِ،', 'dan butiran es'],
					['وَنَقِّهِ', 'dan bersihkanlah dia'],
					['مِنَ', 'dari'],
					['الْخَطَايَا', 'kesalahan'],
					['كَمَا', 'sebagaimana'],
					['نَقَّيْتَ', 'Engkau membersihkan'],
					['الثَّوْبَ', 'pakaian'],
					['الْأَبْيَضَ', 'yang putih'],
					['مِنَ', 'dari'],
					['الدَّنَسِ،', 'kotoran'],
					['وَأَبْدِلْهُ', 'dan gantilah baginya'],
					['دَارًا', 'rumah'],
					['خَيْرًا', 'yang lebih baik'],
					['مِنْ', 'daripada'],
					['دَارِهِ', 'rumahnya'],
					['وَأَهْلًا', 'dan keluarga'],
					['خَيْرًا', 'yang lebih baik'],
					['مِنْ', 'daripada'],
					['أَهْلِهِ', 'keluarganya'],
					['وَزَوْجًا', 'dan pasangan'],
					['خَيْرًا', 'yang lebih baik'],
					['مِنْ', 'daripada'],
					['زَوْجِهِ،', 'pasangannya'],
					['وَأَدْخِلْهُ', 'dan masukkanlah dia'],
					['الْجَنَّةَ', 'ke surga'],
					['وَأَعِذْهُ', 'dan lindungilah dia'],
					['مِنْ', 'dari'],
					['عَذَابِ', 'azab'],
					['الْقَبْرِ', 'kubur'],
					['أَوْ', 'atau'],
					['مِنْ', 'dari'],
					['عَذَابِ', 'azab'],
					['النَّارِ.', 'neraka']
				],
				meaning:
					'Ya Allah, ampunilah dia, rahmatilah dia, selamatkan dia, dan maafkan dia. Muliakanlah tempat penerimaannya dan luaskanlah tempat masuknya. Basuhlah dia dengan air, salju, dan butiran es. Bersihkanlah dia dari kesalahan sebagaimana Engkau membersihkan pakaian putih dari kotoran. Gantilah rumahnya, keluarganya, dan pasangannya dengan yang lebih baik. Masukkanlah dia ke surga dan lindungilah dia dari azab kubur atau dari azab neraka.',
				note: 'Auf bin Malik mendengar doa ini ketika Nabi menshalatkan jenazah. Lafaz ini memakai pronomina tunggal maskulin. Pada akhir redaksi ini ada kata أَوْ.'
			},
			{
				id: 'jenazah-abu-hurairah',
				title: 'Doa untuk yang hidup dan yang meninggal',
				book: 'abudawud',
				number: '3201',
				riwayat: 'Abu Hurairah',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['اغْفِرْ', 'ampunilah'],
					['لِحَيِّنَا', 'yang hidup di antara kami'],
					['وَمَيِّتِنَا', 'dan yang meninggal di antara kami'],
					['وَصَغِيرِنَا', 'dan yang muda di antara kami'],
					['وَكَبِيرِنَا', 'dan yang tua di antara kami'],
					['وَذَكَرِنَا', 'dan laki-laki di antara kami'],
					['وَأُنْثَانَا', 'dan perempuan di antara kami'],
					['وَشَاهِدِنَا', 'dan yang hadir di antara kami'],
					['وَغَائِبِنَا.', 'dan yang tidak hadir di antara kami'],
					['اللَّهُمَّ', 'Ya Allah'],
					['مَنْ', 'siapa saja yang'],
					['أَحْيَيْتَهُ', 'Engkau hidupkan'],
					['مِنَّا', 'di antara kami'],
					['فَأَحْيِهِ', 'maka hidupkanlah dia'],
					['عَلَى', 'dalam'],
					['الْإِيمَانِ،', 'iman'],
					['وَمَنْ', 'dan siapa saja yang'],
					['تَوَفَّيْتَهُ', 'Engkau wafatkan'],
					['مِنَّا', 'di antara kami'],
					['فَتَوَفَّهُ', 'maka wafatkanlah dia'],
					['عَلَى', 'dalam'],
					['الْإِسْلَامِ.', 'Islam'],
					['اللَّهُمَّ', 'Ya Allah'],
					['لَا', 'jangan'],
					['تَحْرِمْنَا', 'halangi kami dari'],
					['أَجْرَهُ', 'pahalanya'],
					['وَلَا', 'dan jangan'],
					['تُضِلَّنَا', 'sesatkan kami'],
					['بَعْدَهُ.', 'sepeninggalnya']
				],
				meaning:
					'Ya Allah, ampunilah yang hidup dan yang meninggal di antara kami, yang muda dan yang tua, laki-laki dan perempuan, yang hadir dan yang tidak hadir. Ya Allah, siapa saja di antara kami yang Engkau hidupkan, hidupkanlah dia dalam iman. Siapa saja di antara kami yang Engkau wafatkan, wafatkanlah dia dalam Islam. Ya Allah, jangan halangi kami dari pahalanya dan jangan sesatkan kami sepeninggalnya.',
				note: 'Abu Hurairah meriwayatkannya dalam shalat jenazah. Akhiran ـنَا mengikat pasangan-pasangan orang yang disebut dengan makna “di antara kami”.',
				grade: 'Sahih menurut al-Albani'
			}
		]
	},
	{
		id: 'istikharah',
		title: 'Doa istikharah',
		readings: [
			{
				id: 'istikharah-jabir',
				title: 'Doa istikharah riwayat Jabir',
				book: 'bukhari',
				number: '1166',
				riwayat: 'Jabir bin Abdullah',
				words: [
					['اللَّهُمَّ', 'Ya Allah'],
					['إِنِّي', 'sungguh aku'],
					[
						'أَسْتَخِيرُكَ',
						'memohon pilihan yang baik kepada-Mu',
						'Bentuk dari اِسْتَخَارَ. Akhiran ـكَ menunjukkan kepada siapa permohonan ditujukan.'
					],
					['بِعِلْمِكَ', 'dengan ilmu-Mu'],
					['وَأَسْتَقْدِرُكَ', 'dan memohon kemampuan kepada-Mu'],
					['بِقُدْرَتِكَ،', 'dengan kuasa-Mu'],
					['وَأَسْأَلُكَ', 'dan memohon kepada-Mu'],
					['مِنْ', 'dari'],
					['فَضْلِكَ', 'karunia-Mu'],
					['الْعَظِيمِ،', 'yang agung'],
					['فَإِنَّكَ', 'karena sungguh Engkau'],
					['تَقْدِرُ', 'mampu'],
					['وَلَا', 'dan tidak'],
					['أَقْدِرُ،', 'aku mampu'],
					['وَتَعْلَمُ', 'dan Engkau mengetahui'],
					['وَلَا', 'dan tidak'],
					['أَعْلَمُ،', 'aku mengetahui'],
					['وَأَنْتَ', 'dan Engkaulah'],
					['عَلَّامُ', 'Yang Maha Mengetahui'],
					['الْغُيُوبِ.', 'segala yang gaib'],
					['اللَّهُمَّ', 'Ya Allah'],
					['إِنْ', 'jika'],
					['كُنْتَ', 'Engkau'],
					['تَعْلَمُ', 'mengetahui'],
					['أَنَّ', 'bahwa'],
					['هَذَا', 'ini'],
					['الْأَمْرَ', 'urusan'],
					['خَيْرٌ', 'baik'],
					['لِي', 'bagiku'],
					['فِي', 'dalam'],
					['دِينِي', 'agamaku'],
					['وَمَعَاشِي', 'dan penghidupanku'],
					['وَعَاقِبَةِ', 'dan akibat'],
					['أَمْرِي،', 'urusanku'],
					['فَاقْدُرْهُ', 'maka tetapkanlah ia'],
					['لِي', 'bagiku'],
					['وَيَسِّرْهُ', 'dan mudahkanlah ia'],
					['لِي', 'bagiku'],
					['ثُمَّ', 'kemudian'],
					['بَارِكْ', 'berkahilah'],
					['لِي', 'aku'],
					['فِيهِ.', 'di dalamnya'],
					['وَإِنْ', 'dan jika'],
					['كُنْتَ', 'Engkau'],
					['تَعْلَمُ', 'mengetahui'],
					['أَنَّ', 'bahwa'],
					['هَذَا', 'ini'],
					['الْأَمْرَ', 'urusan'],
					['شَرٌّ', 'buruk'],
					['لِي', 'bagiku'],
					['فِي', 'dalam'],
					['دِينِي', 'agamaku'],
					['وَمَعَاشِي', 'dan penghidupanku'],
					['وَعَاقِبَةِ', 'dan akibat'],
					['أَمْرِي،', 'urusanku'],
					['فَاصْرِفْهُ', 'maka jauhkanlah ia'],
					['عَنِّي', 'dariku'],
					['وَاصْرِفْنِي', 'dan jauhkanlah aku'],
					['عَنْهُ،', 'darinya'],
					['وَاقْدُرْ', 'dan tetapkanlah'],
					['لِي', 'bagiku'],
					['الْخَيْرَ', 'kebaikan'],
					['حَيْثُ', 'di mana pun'],
					['كَانَ،', 'ia berada'],
					['ثُمَّ', 'kemudian'],
					['أَرْضِنِي', 'jadikanlah aku rida'],
					['بِهِ.', 'dengannya']
				],
				meaning:
					'Ya Allah, aku memohon pilihan yang baik dengan ilmu-Mu, memohon kemampuan dengan kuasa-Mu, dan memohon karunia-Mu yang agung. Engkau mampu dan aku tidak mampu. Engkau mengetahui dan aku tidak mengetahui. Engkaulah Yang Maha Mengetahui segala yang gaib. Ya Allah, jika Engkau mengetahui bahwa urusan ini baik bagiku dalam agamaku, penghidupanku, dan akibat urusanku, tetapkanlah ia bagiku, mudahkanlah bagiku, lalu berkahilah aku di dalamnya. Jika Engkau mengetahui bahwa urusan ini buruk bagiku dalam agamaku, penghidupanku, dan akibat urusanku, jauhkanlah ia dariku dan jauhkanlah aku darinya. Tetapkanlah kebaikan bagiku di mana pun ia berada, lalu jadikanlah aku rida dengannya.',
				note: 'Jabir meriwayatkan doa ini setelah penyebutan shalat dua rakaat di luar shalat wajib. Hadis juga menyebut agar orang yang berdoa menyatakan keperluannya. Redaksi عَاقِبَةِ أَمْرِي dipilih untuk kartu ini. Perawi menyebut redaksi عَاجِلِ أَمْرِي وَآجِلِهِ sebagai pilihan lain.'
			}
		]
	}
];
