import type { Lesson } from './types.js';

const writing = [
	{ label: 'W3C · Sistem tulisan Arab dan tanda vokal', href: 'https://www.w3.org/TR/alreq/' }
];
const base = {
	track: 'iqra',
	level: 'Fondasi',
	register: 'script',
	reviewStatus: 'draft',
	revision: 1,
	references: writing
} as const;

export const foundationLessons: readonly Lesson[] = [
	{
		...base,
		id: 'lesson-a1-01',
		slug: 'bentuk-huruf',
		title: 'Kenali huruf dari titik dan sambungannya',
		minutes: 5,
		competencies: ['CA-02'],
		goal: 'Kenali ba, ta, dan tsa dalam bentuk lepas dan di dalam rangkaian huruf.',
		intro:
			'Mulailah dari sisi kanan. Tiga huruf berikut punya rangka yang mirip. Hitung titiknya dan lihat letak titik itu sebelum mengeja.',
		examples: [
			{
				arabic: 'ب',
				meaning: 'Ba',
				note: 'Satu titik di bawah. Dalam sambungan, bentuknya bisa sesingkat satu lengkung kecil.'
			},
			{ arabic: 'ت', meaning: 'Ta', note: 'Dua titik di atas.' },
			{ arabic: 'ث', meaning: 'Tsa', note: 'Tiga titik di atas.' },
			{
				arabic: 'بَتَثَ',
				meaning: 'Rangkaian latihan: ba, ta, tsa',
				note: 'Dari kanan ke kiri, ba berada di awal, ta di tengah, dan tsa di akhir.'
			},
			{
				arabic: 'بَابٌ',
				meaning: 'Pintu',
				note: 'Perhatikan dua ba. Alif di tengah menerima sambungan dari kanan dan memutus sambungan ke huruf berikutnya.'
			}
		],
		patterns: [
			'Kenali posisi dan jumlah titik meski rangka huruf menyempit saat tersambung.',
			'Huruf dibaca berurutan dari kanan. Jeda visual di dalam satu kata bisa disebabkan oleh huruf yang tidak menyambung ke kiri.'
		],
		exercises: [
			{
				arabic: 'ثَتَبَ',
				prompt: 'Sebutkan nama tiga huruf dari kanan.',
				answer:
					'Tsa, ta, ba. Tiga titik di atas dimiliki huruf pertama dan satu titik di bawah dimiliki huruf terakhir.'
			},
			{
				arabic: 'تَابَ',
				prompt: 'Huruf apa yang ada paling kiri?',
				answer: 'Ba. Bentuknya terpisah karena alif di sebelah kanannya tidak meneruskan sambungan.'
			},
			{
				arabic: 'بَثَثَ',
				prompt: 'Huruf apa yang muncul dua kali?',
				answer: 'Tsa. Cari dua kelompok yang masing-masing punya tiga titik di atas.'
			}
		]
	},
	{
		...base,
		id: 'lesson-a2-01',
		slug: 'harakat-pendek',
		title: 'Baca tiga harakat pendek',
		minutes: 5,
		competencies: ['CA-03'],
		goal: 'Bedakan bunyi a, i, dan u ketika tanda di sekitar huruf berubah.',
		intro:
			'Baca rangkaian berikut dengan suara Anda sendiri. Perhatikan bahwa huruf dasarnya sama, sementara bunyi vokalnya berubah.',
		examples: [
			{ arabic: 'بَ', meaning: 'ba', note: 'Fathah, garis di atas, memberi bunyi a.' },
			{ arabic: 'بِ', meaning: 'bi', note: 'Kasrah, garis di bawah, memberi bunyi i.' },
			{ arabic: 'بُ', meaning: 'bu', note: 'Dammah, tanda melengkung di atas, memberi bunyi u.' },
			{
				arabic: 'كَتَبَ',
				meaning: 'kataba · ia menulis',
				note: 'Baca ka, ta, ba. Ketiganya memakai fathah.'
			}
		],
		patterns: [
			'Baca huruf bersama tandanya sebagai satu bunyi pendek.',
			'Pindahkan pola ke huruf lain. Kasrah pada mim tetap berbunyi i, sehingga menjadi mi.'
		],
		exercises: [
			{
				arabic: 'تُ تِ تَ',
				prompt: 'Baca tiga bentuk ini dari kanan.',
				answer: 'Tu, ti, ta. Huruf ta sama pada ketiganya.'
			},
			{
				arabic: 'شَرِبَ',
				prompt: 'Baca pelan. Huruf mana yang membawa kasrah?',
				answer: 'Syariba. Kasrah ada pada ra di tengah.'
			},
			{
				arabic: 'سُئِلَ',
				prompt: 'Sebutkan urutan vokal pendek yang terlihat.',
				answer: 'U, i, a. Perhatikan kasrah pada hamzah yang ditulis di atas bentuk kursi ya.'
			}
		]
	},
	{
		...base,
		id: 'lesson-a2-02',
		slug: 'vokal-panjang-dan-sukun',
		title: 'Bedakan vokal panjang dan sukun',
		minutes: 6,
		competencies: ['CA-03'],
		goal: 'Baca vokal panjang dan tutup suku kata tanpa menambahkan vokal pada sukun.',
		intro:
			'Saat membaca, perhatikan tanda yang membuat bunyi vokal berlanjut dan tanda yang membuat suku kata berakhir pada konsonan.',
		examples: [
			{
				arabic: 'بَا بِـي بُو',
				meaning: 'Latihan bunyi: bā, bī, bū',
				note: 'Garis di atas huruf Latin menandai vokal panjang.'
			},
			{
				arabic: 'سَارَ',
				meaning: 'Ia berjalan',
				note: 'Baca sā-ra. Alif setelah sin berfathah memanjangkan a.'
			},
			{ arabic: 'مِنْ', meaning: 'Dari', note: 'Baca min. Nun bersukun menutup suku kata.' },
			{
				arabic: 'يَكْتُبُ',
				meaning: 'Ia menulis',
				note: 'Baca yak-tu-bu saat dilafalkan dengan vokal akhir. Kaf bersukun menutup suku kata pertama.'
			}
		],
		patterns: [
			'Fathah sebelum alif, kasrah sebelum ya yang berfungsi sebagai vokal, dan dammah sebelum waw yang berfungsi sebagai vokal menghasilkan bunyi panjang.',
			'Pada huruf bersukun, ucapkan konsonannya tanpa menyisipkan a, i, atau u.'
		],
		exercises: [
			{
				arabic: 'سُوقٌ',
				prompt: 'Vokal mana yang panjang?',
				answer: 'Vokal u setelah sin dipanjangkan oleh waw, sehingga bagian awalnya berbunyi sū.'
			},
			{
				arabic: 'نَجْمٌ',
				prompt: 'Temukan huruf bersukun. Di mana suku kata pertama berakhir?',
				answer: 'Jim bersukun. Suku kata pertama berakhir pada bunyi j.'
			},
			{
				arabic: 'كِيلَ',
				prompt: 'Huruf mana yang membawa vokal panjang?',
				answer: 'Kaf membawa kasrah yang diperpanjang oleh ya, sehingga bagian awalnya berbunyi kī.'
			}
		]
	},
	{
		...base,
		id: 'lesson-a2-03',
		slug: 'latih-harakat',
		title: 'Latih harakat pada rangkaian baru',
		minutes: 6,
		competencies: ['CA-03'],
		goal: 'Pindahkan pola harakat pendek, panjang, dan sukun ke huruf serta rangkaian lain.',
		intro:
			'Setelah mengenali nama tanda, latihan berikut meminta Anda membacanya pada huruf yang berbeda. Baca dari kanan, lalu bandingkan bunyi tanpa menghafal satu kata saja.',
		examples: [
			{
				arabic: 'بَ بِ بُ',
				meaning: 'Latihan bunyi: ba, bi, bu',
				note: 'Huruf ba tetap sama; posisi dan bentuk tanda yang mengubah vokalnya.'
			},
			{
				arabic: 'تَ تِ تُ',
				meaning: 'Latihan bunyi: ta, ti, tu',
				note: 'Aturan fathah, kasrah dan dammah tidak bergantung pada huruf ba.'
			},
			{
				arabic: 'مَا مِي مُو',
				meaning: 'Latihan bunyi panjang: mā, mī, mū',
				note: 'Ini rangkaian untuk melatih bunyi, bukan tiga kosakata dengan arti sendiri.'
			},
			{
				arabic: 'مِنْ',
				meaning: 'min · dari',
				note: 'Nun bersukun menutup suku kata. Jangan menambahkan vokal setelah n.'
			}
		],
		patterns: [
			'Harakat pendek mengubah vokal pada huruf yang sama. Gunakan aturan itu pada ba, ta dan mim.',
			'Vokal panjang pada latihan mengikuti fathah + alif, kasrah + ya, atau dammah + waw. Huruf dengan sukun tidak menambah vokal pendek.'
		],
		exercises: [
			{
				arabic: 'مُ مِ مَ',
				prompt: 'Baca dari kanan. Sebutkan bunyi yang dihasilkan tiga tanda.',
				answer:
				'Mu, mi, ma. Ketiganya memakai mim. Perhatikan bahwa susunan vokal berbeda dari contoh awal.'
			},
			{
				arabic: 'بَا بَ',
				prompt: 'Dari dua bentuk ba ini, bentuk mana yang memiliki vokal panjang?',
				answer:
				'بَا yang berada di sebelah kanan. Fathah diikuti alif memberi bunyi bā; بَ hanya ba pendek.'
			},
			{
				arabic: 'مِنْ مِ',
				prompt: 'Mana yang berakhir dengan konsonan tanpa vokal tambahan?',
				answer:
				'مِنْ berakhir dengan nun bersukun. Pada مِ hanya ada mim berkasrah yang berbunyi mi.'
			},
			{
				arabic: 'بِي بُو',
				prompt: 'Sebutkan kedua bunyi panjang ini, dari kanan.',
				answer:
				'Bī dan bū. Kasrah dengan ya menjadi ī; dammah dengan waw menjadi ū.'
			}
		]
	},
	{
		...base,
		id: 'lesson-a3-01',
		slug: 'tasydid-dan-tanwin',
		title: 'Kenali tasydid dan tanwin',
		minutes: 6,
		competencies: ['CA-04'],
		goal: 'Kenali konsonan yang dirangkap dan tiga bentuk tanwin dalam teks berharakat.',
		intro:
			'Saat mengeja kata baru, lihat setiap bunyi di tengah kata dan bedakan dengan tanda pada akhir kata.',
		examples: [
			{
				arabic: 'مَرَّ',
				meaning: 'Ia lewat',
				note: 'Tasydid pada ra menandai konsonan rangkap. Untuk latihan, pecah menjadi mar-ra.'
			},
			{
				arabic: 'حَقٌّ',
				meaning: 'Hak atau kebenaran, sesuai konteks',
				note: 'Qaf bertanda tasydid dan dammatain. Latih bunyi rangkap q dan akhiran -un saat dibaca sambung.'
			},
			{
				arabic: 'قَلَمٌ قَلَمًا قَلَمٍ',
				meaning: 'Tiga bentuk kata pena',
				note: 'Dari kanan saat dibaca sambung: qalamun, qalaman, qalamin.'
			}
		],
		patterns: [
			'Tasydid merangkap bunyi konsonan yang memikulnya. Harakat lain tetap menunjukkan vokal sesudah konsonan rangkap itu.',
			'Pada bacaan sambung, dammatain, fathatain, dan kasratain masing-masing memberi akhiran -un, -an, dan -in. Saat berhenti, cara membaca akhiran dapat berubah.'
		],
		exercises: [
			{
				arabic: 'دَرَّسَ',
				prompt: 'Konsonan mana yang dirangkap?',
				answer: 'Ra. Baca dar-ra-sa, artinya ia mengajar.'
			},
			{
				arabic: 'كِتَابٍ',
				prompt: 'Apa bunyi akhir saat disambung?',
				answer: '-in, karena ada kasratain pada ba.'
			},
			{
				arabic: 'صَفٌّ',
				prompt: 'Sebutkan dua tanda yang memengaruhi akhir kata saat disambung.',
				answer: 'Tasydid merangkap fa. Dammatain menambahkan akhiran -un.'
			}
		]
	},
	{
		...base,
		id: 'lesson-a4-01',
		slug: 'baca-kalimat-pendek',
		title: 'Sambungkan bunyi menjadi kalimat',
		minutes: 7,
		competencies: ['CA-05', 'CA-06'],
		goal: 'Pecah kalimat berharakat menjadi kelompok kata, lalu baca kembali secara utuh.',
		intro:
			'Baca perlahan dari kanan. Berhenti sebentar di akhir setiap kelompok makna, lalu ulangi kalimatnya sampai Anda tidak perlu mengeja setiap huruf.',
		examples: [
			{
				arabic: 'الْقَلَمُ فِي الْحَقِيبَةِ.',
				meaning: 'Pena itu ada di dalam tas.',
				note: 'Kelompok pertama menyebut benda. Kelompok kedua berarti “di dalam tas”. Pada awal kata untuk pena, lam terdengar.'
			},
			{
				arabic: 'الشَّمْسُ فِي السَّمَاءِ.',
				meaning: 'Matahari ada di langit.',
				note: 'Saat mulai membaca, bagian awal kata matahari berbunyi asy-sya. Tasydid menunjukkan sy yang dirangkap. Lam pada awalan al- melebur ke bunyi sy.'
			},
			{
				arabic: 'الْبَابُ مَفْتُوحٌ.',
				meaning: 'Pintu itu terbuka.',
				note: 'Ucapkan kata pertama, lalu kata kedua. Keduanya bersama menyampaikan satu kabar.'
			}
		],
		patterns: [
			'Pada contoh “pena” dan “pintu”, lam awalan al- terdengar. Pada “matahari”, sy dirangkap. Harakat dan tasydid membantu Anda melihat perbedaan ini.',
			'Saat awalan al- dibaca dalam sambungan dari kata sebelumnya, bunyi pembukanya tidak diulang. Beri perhatian khusus pada peralihan di tengah kalimat.'
		],
		exercises: [
			{
				arabic: 'النَّجْمُ',
				prompt: 'Baca dari awal. Bunyi apa yang dirangkap?',
				answer: 'Nun. Awalannya terdengar an-na. Tasydid menunjukkan nun rangkap.'
			},
			{
				arabic: 'الْمِفْتَاحُ فِي الْغُرْفَةِ.',
				prompt: 'Baca dua kelompok makna. Kelompok mana yang menyatakan tempat?',
				answer:
					'Kelompok kedua, فِي الْغُرْفَةِ, berarti “di dalam ruangan”. Kelompok pertama berarti “kunci itu”.'
			},
			{
				arabic: 'الْكِتَابُ جَدِيدٌ.',
				prompt: 'Baca tanpa memisahkan huruf. Sebutkan arti kalimatnya.',
				answer: 'Buku itu baru. Lam pada awal kata pertama terdengar.'
			}
		]
	}
];
