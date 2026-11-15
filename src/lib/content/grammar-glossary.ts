export type GrammarTermId = 'isim' | 'kalimah' | 'jumlah' | 'fiil' | 'harf' | 'nahwu' | 'sharaf';
export type GlossaryText = readonly (string | { term: GrammarTermId })[];

type Reference = { label: string; href: string };
type Illustration = {
	heading: string;
	words: readonly {
		arabic: string;
		meaning: string;
		labels: readonly { label: string; value: string }[];
	}[];
	explanation: string;
};
type GrammarTerm = {
	id: GrammarTermId;
	title: string;
	arabic: string;
	definition: string;
	example: { arabic: string; meaning: string; explanation: string };
	note?: string;
	details: readonly { heading: string; text: string }[];
	illustration?: Illustration;
	related: readonly GrammarTermId[];
	references: readonly Reference[];
};

const qatr = {
	label: 'Ibn Hishām, Qaṭr al-Nadā · Kata dan jenisnya',
	href: 'https://rissc.jo/wp-content/uploads/2024/10/QatrNada_21-10-24.pdf#page=17'
};
const nominal = {
	label: 'Madinah Arabic · Kalimat nominal',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-58/part-1'
};
const negation = {
	label: 'Madinah Arabic · Penyangkalan dengan lam',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-31/part-2'
};
const preposition = {
	label: 'Madinah Arabic · Kata depan dan bentuk majrur',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-4/part-3'
};
const morphology = {
	label: 'Madinah Arabic · Pembentukan kata dari akar',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-90/part-1'
};
const door = { arabic: 'الْبَابُ مَفْتُوحٌ', meaning: 'Pintu itu terbuka.' };
const doorIllustration: Illustration = {
	heading: 'Jenis dan tugas kata',
	words: [
		{
			arabic: 'الْبَابُ',
			meaning: 'pintu itu',
			labels: [
				{ label: 'Jenis kata', value: 'Isim' },
				{ label: 'Tugas', value: 'Pokok pembicaraan' }
			]
		},
		{
			arabic: 'مَفْتُوحٌ',
			meaning: 'terbuka',
			labels: [
				{ label: 'Jenis kata', value: 'Isim' },
				{ label: 'Tugas', value: 'Memberi kabar' }
			]
		}
	],
	explanation: 'Kedua kata termasuk isim. Dalam jumlah ini, masing-masing punya tugas berbeda.'
};

export const grammarTerms: Record<GrammarTermId, GrammarTerm> = {
	isim: {
		id: 'isim',
		title: 'Isim',
		arabic: 'اِسْمٌ',
		definition:
			'Isim adalah kelompok kata yang mencakup nama, kata benda, kata sifat, dan kata ganti.',
		example: {
			...door,
			explanation: 'الْبَابُ menamai benda. مَفْتُوحٌ menyatakan keadaan pintu. Keduanya termasuk isim.'
		},
		details: [
			{
				heading: 'Arti dan cakupan',
				text: 'Di luar pembagian jenis kata, اِسْمٌ bisa berarti “nama”. Dalam tata bahasa, بَابٌ (“pintu”), نَظِيفٌ (“bersih”), dan هُوَ (“dia”) termasuk isim. Dalam bahasa Indonesia, ketiganya biasa disebut kata benda, kata sifat, dan kata ganti.'
			},
			{
				heading: 'Jenis kata dan tugasnya',
				text: 'Pada “Pintu itu terbuka”, “pintu itu” adalah pokok pembicaraan dan “terbuka” memberi kabar. Tugas keduanya berbeda walaupun padanan Arabnya sama-sama isim.'
			},
			{
				heading: 'Kapan harakat akhir berubah?',
				text: 'Bandingkan الْبَابُ (“pintu itu”) sebagai pokok pembicaraan dengan إِلَى الْبَابِ (“ke pintu itu”). Setelah kata depan إِلَى, akhir الْبَابِ berbunyi -i pada contoh ini. Ada juga isim dengan akhiran tetap, seperti kata ganti هُوَ.'
			}
		],
		related: ['kalimah', 'jumlah', 'nahwu'],
		references: [qatr, nominal]
	},
	kalimah: {
		id: 'kalimah',
		title: 'Kalimah',
		arabic: 'كَلِمَةٌ',
		definition: 'Dalam pembagian jenis kata Arab, kalimah berarti satu kata.',
		note: 'Istilah Indonesia “kalimat” ada pada tingkat susunan kata. “Pintu” satu kata. “Pintu itu terbuka” satu kalimat.',
		example: {
			arabic: 'بَابٌ',
			meaning: 'Pintu',
			explanation: 'بَابٌ adalah satu kalimah yang jenisnya isim.'
		},
		details: [
			{
				heading: 'Tiga jenis kata',
				text: 'Dalam pembagian ini, kalimah bisa berupa isim seperti بَابٌ (“pintu”), fi‘il seperti فَتَحَ (“membuka”), atau harf seperti فِي (“di”).'
			},
			{
				heading: 'Saat kata digabung',
				text: 'Bandingkan الْبَابُ الْمَفْتُوحُ (“pintu yang terbuka itu”) dengan الْبَابُ مَفْتُوحٌ (“pintu itu terbuka”). Yang pertama menyebut benda beserta sifatnya. Yang kedua memberi kabar tentang benda itu, sehingga membentuk jumlah.'
			}
		],
		related: ['isim', 'jumlah', 'fiil', 'harf'],
		references: [qatr, nominal]
	},
	jumlah: {
		id: 'jumlah',
		title: 'Jumlah',
		arabic: 'جُمْلَةٌ',
		definition:
			'Dalam tata bahasa Arab, jumlah adalah susunan yang menyampaikan sesuatu tentang pokok pembicaraan atau menyatakan suatu tindakan.',
		note: 'Dalam bahasa Indonesia, “jumlah” biasa dipakai untuk banyaknya sesuatu. Di pelajaran ini, artinya berkaitan dengan susunan kata.',
		example: {
			...door,
			explanation: 'الْبَابُ adalah pokok pembicaraan. مَفْتُوحٌ memberi kabar bahwa pintu itu terbuka.'
		},
		details: [
			{
				heading: 'Jumlah nominal dan verbal',
				text: 'Contoh nominal di atas memberi kabar tentang pintu. Pada contoh verbal فَتَحَ الْحَارِسُ الْبَابَ (“Penjaga itu membuka pintu”), kata pertama menyebut tindakan, lalu diikuti pelaku dan sasaran.'
			},
			{
				heading: 'Saat jumlah ada di dalam kalimat',
				text: 'Jumlah juga bisa menjadi bagian dari kalimat yang lebih besar, seperti “penjaga itu datang” di dalam “Saya tahu bahwa penjaga itu datang.” Dalam konteks ini, bagian tersebut disebut klausa dalam bahasa Indonesia.'
			}
		],
		illustration: doorIllustration,
		related: ['isim', 'kalimah', 'nahwu'],
		references: [
			nominal,
			{
				label: 'Madinah Arabic · Jumlah nominal dan verbal',
				href: 'https://madinaharabic.com/free-content/grammar/lesson-4/part-1'
			}
		]
	},
	fiil: {
		id: 'fiil',
		title: 'Fi‘il',
		arabic: 'فِعْلٌ',
		definition:
			'Fi‘il adalah kata kerja. Bentuknya bisa menunjukkan tindakan atau keadaan, termasuk perintah.',
		example: {
			arabic: 'كَتَبَ الطَّالِبُ الرِّسَالَةَ',
			meaning: 'Siswa itu sudah menulis surat tersebut.',
			explanation: 'كَتَبَ adalah fi‘il yang menunjukkan tindakan menulis sudah terjadi.'
		},
		details: [
			{
				heading: 'Tiga bentuk yang sering ditemui',
				text: 'كَتَبَ adalah bentuk lampau (madhi), يَكْتُبُ bentuk nonlampau (mudhari‘), dan اُكْتُبْ bentuk perintah (amr). Dalam bahasa Indonesia, kita dapat menambahkan “sudah” atau “sedang”. Dalam bahasa Arab, bentuk kata juga memberi petunjuk, dan konteks membantu menentukan waktunya.'
			},
			{
				heading: 'Apa yang terjadi setelah lam?',
				text: 'Dalam لَمْ يَكْتُبْ (“ia tidak menulis”), لَمْ menyangkal tindakan di masa lampau. Bentuk yang dipakai tetap mudhari‘. Pada contoh ini, dammah di akhir يَكْتُبُ berubah menjadi sukun.'
			}
		],
		related: ['kalimah', 'harf', 'sharaf'],
		references: [
			{
				label: 'Madinah Arabic · Tiga bentuk kata kerja',
				href: 'https://madinaharabic.com/free-content/grammar/lesson-28/part-1'
			},
			negation
		]
	},
	harf: {
		id: 'harf',
		title: 'Harf',
		arabic: 'حَرْفٌ',
		definition: 'Harf adalah kata tugas, seperti kata depan atau kata hubung.',
		note: 'Harf juga bisa berarti huruf tulisan, seperti ب.',
		example: {
			arabic: 'فِي الْبَيْتِ',
			meaning: 'Di dalam rumah itu',
			explanation: 'فِي berarti “di”. Akhir الْبَيْتِ berbunyi -i.'
		},
		details: [
			{
				heading: 'Apa yang dilakukan kata tugas?',
				text: 'Dalam bahasa Indonesia, “di rumah” memberi keterangan tempat dan “tidak menulis” menyangkal tindakan. Contoh Arabnya adalah فِي untuk tempat dan لَمْ untuk penyangkalan lampau pada bentuk mudhari‘.'
			},
			{
				heading: 'Pengaruh pada kata sesudahnya',
				text: 'Bandingkan الْبَيْتُ sebagai pokok pembicaraan dengan فِي الْبَيْتِ sebagai keterangan tempat. فِي adalah kata depan (harf jarr). Isim setelahnya berada dalam keadaan majrur, yang ditandai kasrah pada contoh ini.'
			}
		],
		related: ['kalimah', 'isim', 'fiil', 'nahwu'],
		references: [qatr, preposition, negation]
	},
	nahwu: {
		id: 'nahwu',
		title: 'Nahwu',
		arabic: 'نَحْوٌ',
		definition:
			'Nahwu membahas susunan kata, tugas setiap kata, dan perubahan tanda akhir yang berkaitan dengan susunan itu.',
		example: {
			...door,
			explanation: 'الْبَابُ adalah yang dibicarakan. مَفْتُوحٌ menyampaikan kabar tentang pintu.'
		},
		details: [
			{
				heading: 'Frasa dan kalimat',
				text: '“Pintu yang terbuka” menerangkan pintu mana yang dimaksud. Pada frasa الْبَابُ الْمَفْتُوحُ, sifat الْمَفْتُوحُ mengikuti kata tertentu yang diterangkannya. Pada kalimat الْبَابُ مَفْتُوحٌ, مَفْتُوحٌ memberi kabar “terbuka”.'
			},
			{
				heading: 'Susunan dan tanda akhir',
				text: 'Dalam الْبَابُ مَفْتُوحٌ, الْبَابُ menjadi pokok pembicaraan. Dalam إِلَى الْبَابِ, kata itu mengikuti kata depan إِلَى. Tanda akhir kata yang sama dapat berubah ketika perannya berbeda. Pembahasan perubahan tanda akhir ini disebut i‘rab.'
			}
		],
		illustration: doorIllustration,
		related: ['jumlah', 'harf', 'sharaf'],
		references: [nominal, preposition]
	},
	sharaf: {
		id: 'sharaf',
		title: 'Sharaf',
		arabic: 'صَرْفٌ',
		definition:
			'Sharaf membahas bentuk kata Arab dan cara bentuknya berubah atau terbentuk dari akar dan pola.',
		example: {
			arabic: 'كَاتِبٌ',
			meaning: 'Penulis',
			explanation:
				'كَاتِبٌ berasal dari akar ك ت ب. Bentuknya menunjuk orang yang melakukan kegiatan menulis.'
		},
		details: [
			{
				heading: 'Akar dan pola',
				text: 'Akar membantu mengenali keluarga makna. Pola atau wazan menunjukkan bagaimana bunyi, harakat, dan huruf tambahan menyusun sebuah bentuk. Pada keluarga ك ت ب, perhatikan perbedaan antara كَاتِبٌ (“penulis”) dan مَكْتُوبٌ (“yang ditulis”).'
			},
			{
				heading: 'Dari bentuk ke tugas dalam kalimat',
				text: 'Ambil padanan Indonesia “menulis”, “penulis”, dan “yang ditulis”. Bentuk yang berbeda membantu membaca maknanya. Saat salah satunya masuk ke kalimat, gunakan nahwu untuk melihat tugasnya dalam susunan itu.'
			}
		],
		illustration: {
			heading: 'Satu akar, tiga bentuk',
			words: [
				{
					arabic: 'كَتَبَ',
					meaning: 'ia sudah menulis',
					labels: [{ label: 'Bentuk', value: 'Fi‘il lampau' }]
				},
				{ arabic: 'كَاتِبٌ', meaning: 'penulis', labels: [{ label: 'Bentuk', value: 'Isim fa‘il' }] },
				{
					arabic: 'مَكْتُوبٌ',
					meaning: 'yang ditulis',
					labels: [{ label: 'Bentuk', value: 'Isim maf‘ul' }]
				}
			],
			explanation:
				'Ketiganya berbagi akar yang terkait dengan kegiatan menulis. Masing-masing bentuk memberi petunjuk makna.'
		},
		related: ['fiil', 'isim', 'nahwu'],
		references: [morphology]
	}
};

export const grammarTermList = Object.values(grammarTerms);
