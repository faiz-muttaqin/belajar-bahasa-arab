export type GrammarTermId = 'isim' | 'kalimah' | 'jumlah';
export type GlossaryText = readonly (string | { term: GrammarTermId })[];

type Reference = { label: string; href: string };
type GrammarTerm = {
	id: GrammarTermId;
	title: string;
	arabic: string;
	definition: string;
	example: { arabic: string; meaning: string; explanation: string };
	note?: string;
	details: readonly { heading: string; text: string }[];
	roles?: readonly { arabic: string; meaning: string; kind: string; role: string }[];
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
const door = { arabic: 'الْبَابُ مَفْتُوحٌ', meaning: 'Pintu itu terbuka.' };

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
		roles: [
			{ arabic: 'الْبَابُ', meaning: 'pintu itu', kind: 'Isim', role: 'Pokok pembicaraan' },
			{ arabic: 'مَفْتُوحٌ', meaning: 'terbuka', kind: 'Isim', role: 'Memberi kabar' }
		],
		references: [
			nominal,
			{
				label: 'Madinah Arabic · Jumlah nominal dan verbal',
				href: 'https://madinaharabic.com/free-content/grammar/lesson-4/part-1'
			}
		]
	}
};

export const grammarTermList = Object.values(grammarTerms);
