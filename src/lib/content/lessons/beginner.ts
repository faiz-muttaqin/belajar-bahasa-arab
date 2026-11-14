import type { Lesson } from './types.js';

const madinah = (lesson: number, part = 1) => ({
	label: `Madinah Arabic · Rujukan konsep, pelajaran ${lesson}`,
	href: `https://madinaharabic.com/free-content/grammar/lesson-${lesson}/part-${part}`
});

const base = {
	track: 'belajar',
	level: 'Dasar',
	register: 'msa',
	reviewStatus: 'draft',
	revision: 1
} as const;

export const beginnerLessons: readonly Lesson[] = [
	{
		...base,
		register: 'classical',
		id: 'lesson-u1-01',
		slug: 'kata-inti-shalat',
		title: 'Pahami kata inti bacaan shalat',
		minutes: 7,
		competencies: ['CB-01'],
		goal: 'Bedakan makna takbir, tasbih saat rukuk dan sujud, serta salam.',
		references: [
			{
				label: 'Sahih al-Bukhari 789 · Takbir dalam shalat',
				href: 'https://sunnah.com/bukhari:789'
			},
			{ label: 'Sahih Muslim 772 · Frasa rukuk dan sujud', href: 'https://sunnah.com/muslim:772' },
			{ label: 'Sunan Abi Dawud 996 · Frasa salam', href: 'https://sunnah.com/abudawud:996' }
		],
		intro:
			'Ingat perbedaan bacaan yang Anda kenal ketika rukuk dan sujud. Baca kedua frasa di bawah dan cari bagian yang berubah.',
		examples: [
			{
				arabic: 'اللَّهُ أَكْبَرُ',
				meaning: 'Allah Mahabesar',
				note: 'Itulah ungkapan takbir. Kata kedua berasal dari kata yang berkaitan dengan makna besar.'
			},
			{
				arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
				meaning: 'Mahasuci Tuhanku Yang Mahaagung',
				note: 'Dalam riwayat yang dirujuk, frasa ini diucapkan saat rukuk.'
			},
			{
				arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
				meaning: 'Mahasuci Tuhanku Yang Mahatinggi',
				note: 'Dalam riwayat yang dirujuk, frasa ini diucapkan saat sujud.'
			},
			{
				arabic: 'السَّلَامُ عَلَيْكُمْ',
				meaning: 'Semoga keselamatan tercurah kepada kalian',
				note: 'Ini bagian awal salam. Makna “kepada kalian” ada pada kata kedua.'
			}
		],
		patterns: [
			'Dua frasa tasbih dimulai dengan makna yang sama, “Mahasuci Tuhanku”. Kata terakhir membedakan “Yang Mahaagung” dan “Yang Mahatinggi”.',
			'Dalam kata untuk “Tuhanku”, akhiran bunyi i terkait dengan makna “-ku”. Pola kepemilikan serupa akan muncul lagi di pelajaran kata ganti melekat.',
			'Glos di sini berfokus pada arti kata dan frasa dalam bacaan.'
		],
		exercises: [
			{
				arabic: 'الْأَعْلَى',
				prompt: 'Apa artinya dalam frasa yang baru Anda baca?',
				answer: 'Yang Mahatinggi. Kata ini muncul dalam frasa sujud di atas.'
			},
			{
				arabic: 'رَبِّي',
				prompt: 'Bagian makna apa yang dibawa akhiran kata ini?',
				answer: '“-ku”. Arti keseluruhannya adalah “Tuhanku”.'
			},
			{
				arabic: 'السَّلَامُ عَلَيْكُمْ',
				prompt: 'Tuliskan makna salam ini dengan kata-kata Anda.',
				answer:
					'Ungkapan ini mendoakan keselamatan bagi orang-orang yang disapa. Bentuk “kalian” tampak pada kata terakhir.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u2-01',
		slug: 'menunjuk-dan-bertanya',
		title: 'Tanya “ini apa?” dan “ini siapa?”',
		minutes: 7,
		competencies: ['CB-03', 'CB-04'],
		goal: 'Pilih pertanyaan sesuai yang ditunjuk, lalu jawab dengan satu kalimat sederhana.',
		references: [madinah(1), madinah(2)],
		intro:
			'Bayangkan Anda sedang di ruang belajar. Ada benda yang belum Anda kenal dan seseorang yang baru masuk. Pertanyaan untuk keduanya berbeda.',
		examples: [
			{
				arabic: 'مَا هَذَا؟',
				meaning: 'Ini apa?',
				note: 'Mulai dengan kata tanya untuk benda dalam adegan ini.'
			},
			{
				arabic: 'هَذَا دَفْتَرٌ.',
				meaning: 'Ini buku catatan.',
				note: 'Susun “ini”, lalu nama benda. Dalam pola ini tidak ada kata tersendiri untuk “adalah”.'
			},
			{
				arabic: 'مَنْ هَذَا؟',
				meaning: 'Ini siapa?',
				note: 'Kata tanya di awal meminta identitas orang.'
			},
			{ arabic: 'هَذَا مُدَرِّسٌ.', meaning: 'Ini seorang guru.' }
		],
		patterns: [
			'Letakkan kata tanya lebih dulu. Untuk menjawab, letakkan kata tunjuk sebelum nama benda atau orang.',
			'Contoh di sini memakai kata tunjuk untuk bentuk maskulin tunggal. Bentuk feminin dipelajari setelah itu.'
		],
		exercises: [
			{
				arabic: 'هَذَا مِفْتَاحٌ.',
				prompt: 'Jawaban ini berarti “Ini sebuah kunci”. Pertanyaan mana yang cocok?',
				answer: 'مَا هَذَا؟ — Ini apa? Kunci adalah benda.'
			},
			{
				arabic: 'هَذَا طَالِبٌ.',
				prompt: 'Pilih pertanyaan yang jawabannya “Ini seorang siswa”.',
				answer: 'مَنْ هَذَا؟ — Ini siapa? Jawaban menunjukkan identitas orang.'
			},
			{
				arabic: 'مَا هَذَا؟',
				prompt: 'Jawab dengan kata مِصْبَاحٌ (lampu).',
				answer: 'هَذَا مِصْبَاحٌ. — Ini sebuah lampu.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u3-01',
		slug: 'benda-tertentu-dan-kalimat',
		title: 'Bedakan “sebuah” dengan benda tertentu',
		minutes: 7,
		competencies: ['CB-05', 'CB-06'],
		goal: 'Kenali fungsi al- dan bedakan frasa penunjuk dari kalimat yang memberi informasi baru.',
		references: [madinah(3), madinah(78, 2)],
		intro:
			'Saat seseorang berkata “buku catatan itu”, Anda dapat menghubungkannya dengan benda yang dimaksud dalam percakapan. Bahasa Arab bisa menandai hal itu pada kata bendanya.',
		examples: [
			{ arabic: 'هَذَا دَفْتَرٌ.', meaning: 'Ini sebuah buku catatan.' },
			{
				arabic: 'هَذَا الدَّفْتَرُ',
				meaning: 'Buku catatan ini',
				note: 'Ini masih berupa frasa. Pendengar menunggu informasi tentang buku catatan itu.'
			},
			{
				arabic: 'هَذَا الدَّفْتَرُ جَدِيدٌ.',
				meaning: 'Buku catatan ini baru.',
				note: 'Kata terakhir memberi kabar tentang buku catatan tersebut.'
			}
		],
		patterns: [
			'Di contoh ini, al- menandai benda tertentu. Terjemahannya bergantung pada konteks dan tidak harus memakai “itu”.',
			'Cari bagian yang menyebut hal yang dibicarakan, lalu bagian yang memberi kabar. Pola ini dapat menjadi kalimat tanpa kata “adalah”.'
		],
		exercises: [
			{
				arabic: 'هَذَا الْمِفْتَاحُ',
				prompt: 'Ini frasa penunjuk atau kalimat lengkap?',
				answer: 'Frasa “kunci ini”. Tidak ada kabar baru tentang kunci itu.'
			},
			{
				arabic: 'هَذَا الْمِفْتَاحُ صَغِيرٌ.',
				prompt: 'Apa informasi baru yang diberikan?',
				answer: 'Kunci ini kecil. Kata terakhir adalah kabar tentang kunci.'
			},
			{
				arabic: 'هَذَا مِفْتَاحٌ.',
				prompt: 'Apa yang dinyatakan tentang benda yang ditunjuk?',
				answer: 'Benda yang ditunjuk adalah sebuah kunci.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u4-01',
		slug: 'kata-ganti-dan-lokasi',
		title: 'Cari siapa dan di mana',
		minutes: 7,
		competencies: ['CB-07', 'CB-08'],
		goal: 'Ikuti kata ganti dia dan kenali lokasi dari frasa dengan kata depan.',
		references: [madinah(4), madinah(23, 4)],
		intro:
			'Setelah seseorang atau sesuatu disebut, bacaan pendek sering memakai “dia” atau “itu” untuk meneruskan cerita. Cari rujukan itu sebelum menerjemahkan lokasi.',
		examples: [
			{
				arabic: 'أَيْنَ الْمُدَرِّسُ؟ هُوَ فِي الْمَكْتَبِ.',
				meaning: 'Di mana guru itu? Dia ada di kantor.',
				note: 'Kata ganti merujuk pada guru. Frasa terakhir menjawab di mana.'
			},
			{
				arabic: 'أَيْنَ الْحَقِيبَةُ؟ هِيَ عَلَى الْكُرْسِيِّ.',
				meaning: 'Di mana tas itu? Tas itu ada di atas kursi.',
				note: 'Kata ganti feminin juga bisa merujuk ke benda seperti tas.'
			},
			{ arabic: 'الْمِفْتَاحُ فِي الْحَقِيبَةِ.', meaning: 'Kunci itu ada di dalam tas.' }
		],
		patterns: [
			'Di sini kata depan bermakna “di dalam” atau “di atas”. Baca kata depan bersama benda yang mengikutinya.',
			'Dalam contoh tunggal ini, nomina setelah kata depan berakhiran kasrah saat dibaca sambung. Ada bentuk lain dengan tanda akhir berbeda.'
		],
		exercises: [
			{
				arabic: 'الدَّفْتَرُ عَلَى الْمَكْتَبِ.',
				prompt: 'Apa yang berada di meja?',
				answer: 'Buku catatan. Frasa setelahnya adalah lokasi.'
			},
			{
				arabic: 'أَيْنَ الْمَكْتَبَةُ؟ هِيَ فِي الْمَدْرَسَةِ.',
				prompt: 'Apa yang dirujuk oleh kata ganti feminin?',
				answer: 'Perpustakaan. Perpustakaan itu berada di sekolah.'
			},
			{
				arabic: 'هُوَ فِي الْحَقِيبَةِ.',
				prompt: 'Bisakah Anda tahu benda apa yang berada dalam tas dari kalimat ini saja?',
				answer:
					'Belum tentu. Kata ganti memberi petunjuk maskulin tunggal. Kalimat sebelumnya, atau situasi, memberi identitas benda.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u5-01',
		slug: 'hubungan-milik',
		title: 'Kenali hubungan milik dan bagian',
		minutes: 6,
		competencies: ['CB-09'],
		goal: 'Baca dua nomina berurutan sebagai satu frasa dan kenali benda utamanya.',
		references: [madinah(47, 2)],
		intro:
			'Dalam bahasa Indonesia kita juga menempelkan dua kata benda: “pintu kelas”, “tas siswa”. Di contoh bahasa Arab berikut, kata pertama menentukan benda yang sedang dibicarakan.',
		examples: [
			{
				arabic: 'بَابُ الْفَصْلِ',
				meaning: 'Pintu kelas',
				note: 'Benda utamanya adalah pintu. Kelas menjelaskan pintu yang mana.'
			},
			{
				arabic: 'دَفْتَرُ الطَّالِبِ',
				meaning: 'Buku catatan siswa',
				note: 'Hubungan di sini adalah kepemilikan.'
			},
			{
				arabic: 'دَفْتَرُ الطَّالِبِ عَلَى الْكُرْسِيِّ.',
				meaning: 'Buku catatan siswa itu ada di kursi.',
				note: 'Frasa milik menjadi satu bagian utuh sebelum lokasi.'
			}
		],
		patterns: [
			'Dalam konstruksi ini, yang pertama ialah benda utama, sedangkan yang kedua menentukan kaitannya.',
			'Pada contoh ini kata pertama tidak membawa al- atau tanwin. Kata kedua majrur, terlihat dari kasrah pada bentuk tunggal yang dipakai.'
		],
		exercises: [
			{
				arabic: 'مِفْتَاحُ الْبَابِ',
				prompt: 'Apa benda utama dan apa kaitannya?',
				answer: 'Benda utamanya kunci. Kata kedua menjelaskan bahwa itu kunci pintu.'
			},
			{
				arabic: 'بَابُ الْمَكْتَبِ مَفْتُوحٌ.',
				prompt: 'Apa yang terbuka?',
				answer: 'Pintunya, yaitu pintu kantor.'
			},
			{ arabic: 'حَقِيبَةُ الْمُدَرِّسِ', prompt: 'Terjemahkan frasa ini.', answer: 'Tas guru itu.' }
		]
	},
	{
		...base,
		id: 'lesson-u6-01',
		slug: 'kata-tunjuk-feminin',
		title: 'Pilih kata tunjuk untuk benda feminin',
		minutes: 5,
		competencies: ['CB-10'],
		goal: 'Pilih bentuk kata tunjuk tunggal dengan melihat gender tata bahasa kata benda.',
		references: [madinah(6)],
		intro:
			'Di ruangan yang sama Anda dapat menunjuk kunci dan tas. Dalam bahasa Indonesia keduanya memakai “ini”. Dalam bahasa Arab, bentuknya bisa berbeda.',
		examples: [
			{
				arabic: 'هَذَا مِفْتَاحٌ.',
				meaning: 'Ini sebuah kunci.',
				note: 'Kata untuk kunci ini maskulin.'
			},
			{ arabic: 'هَذِهِ حَقِيبَةٌ.', meaning: 'Ini sebuah tas.', note: 'Kata untuk tas ini feminin.' },
			{
				arabic: 'هَذِهِ غُرْفَةٌ.',
				meaning: 'Ini sebuah ruangan.',
				note: 'Akhiran ta marbutah sering membantu Anda mengenali bentuk feminin.'
			}
		],
		patterns: [
			'Jika kata bendanya sudah diketahui, cocokkan kata tunjuk dengan gender kata benda itu.',
			'Ta marbutah adalah petunjuk yang sering muncul. Catat gender bersama kosakata baru karena ada juga kata feminin tanpa tanda tersebut.'
		],
		exercises: [
			{
				arabic: 'حَقِيبَةٌ',
				prompt: 'Bagaimana mengatakan “Ini sebuah tas”?',
				answer: 'هَذِهِ حَقِيبَةٌ. — Pakai bentuk feminin.'
			},
			{
				arabic: 'دَفْتَرٌ',
				prompt: 'Bagaimana mengatakan “Ini sebuah buku catatan”?',
				answer: 'هَذَا دَفْتَرٌ. — Kata untuk buku catatan di sini maskulin.'
			},
			{
				arabic: 'مَا هَذِهِ؟ هَذِهِ مَدْرَسَةٌ.',
				prompt: 'Terjemahkan tanya jawab ini.',
				answer: 'Ini apa? Ini sebuah sekolah.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u7-01',
		slug: 'sifat-atau-kabar',
		title: 'Bedakan sifat dari kabar',
		minutes: 7,
		competencies: ['CB-11'],
		goal: 'Kenali kapan kata sifat masih menjadi bagian frasa dan kapan ia menyampaikan kabar.',
		references: [madinah(78, 2), madinah(3)],
		intro:
			'Bandingkan “tas kecil itu” dan “tas itu kecil”. Keduanya memakai kata yang mirip, tetapi yang kedua sudah menyatakan sesuatu.',
		examples: [
			{
				arabic: 'حَقِيبَةٌ صَغِيرَةٌ',
				meaning: 'Sebuah tas kecil',
				note: 'Tas dan sifatnya sama-sama tak tentu serta feminin.'
			},
			{
				arabic: 'الْحَقِيبَةُ الصَّغِيرَةُ',
				meaning: 'Tas kecil itu',
				note: 'Al- muncul pada kedua kata. Keduanya masih satu frasa.'
			},
			{
				arabic: 'الْحَقِيبَةُ صَغِيرَةٌ.',
				meaning: 'Tas itu kecil.',
				note: 'Kata terakhir menyampaikan kabar. Dalam contoh ini, kata sifat tidak memakai al-.'
			}
		],
		patterns: [
			'Saat kata sifat menerangkan nomina, cocokkan ketentuan dan gendernya seperti pada contoh tunggal ini.',
			'Coba ucapkan terjemahannya. Jika terjemahan Anda berupa nama sesuatu, kemungkinan itu baru frasa. Jika ia bisa dijawab dengan “oh, ternyata begitu”, cari predikatnya.'
		],
		exercises: [
			{
				arabic: 'الْمِفْتَاحُ الصَّغِيرُ',
				prompt: 'Terjemahkan dan tentukan bentuknya.',
				answer: 'Kunci kecil itu. Ini frasa, dengan sifat yang juga memakai al-.'
			},
			{
				arabic: 'الْمِفْتَاحُ صَغِيرٌ.',
				prompt: 'Apa kabarnya?',
				answer: 'Kunci itu kecil. Kata terakhir memberi kabar tentang kunci.'
			},
			{
				arabic: 'الْحَقِيبَةُ الصَّغِيرَةُ فِي الْغُرْفَةِ.',
				prompt: 'Di mana frasa yang dibicarakan berakhir?',
				answer:
					'Setelah kata sifat “kecil”. Kalimat memberi kabar bahwa tas kecil itu berada di ruangan.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u8-01',
		slug: 'kata-ganti-melekat',
		title: 'Lacak pemilik dari akhiran kata',
		minutes: 7,
		competencies: ['CB-12'],
		goal: 'Pakai akhiran “-ku”, “-nya”, dan konteks sebelumnya untuk menemukan pemilik benda.',
		references: [madinah(23, 4), madinah(47, 2)],
		intro:
			'Jika sebuah cerita menyebut Lina lalu beralih ke “tasnya”, pembaca perlu menyambungkan akhiran itu dengan Lina. Anda bisa melakukan hal yang sama dalam teks Arab berikut.',
		examples: [
			{ arabic: 'كِتَابِي', meaning: 'Bukuku', note: 'Ya di akhir membawa makna “-ku”.' },
			{
				arabic: 'مِفْتَاحُهُ',
				meaning: 'Kuncinya',
				note: 'Akhiran -hu dapat merujuk pada seorang laki-laki yang sudah disebut.'
			},
			{
				arabic: 'حَقِيبَةُ لِينَا هُنَا. دَفْتَرُهَا فِي الْحَقِيبَةِ.',
				meaning: 'Tas Lina ada di sini. Buku catatannya ada di dalam tas.',
				note: 'Akhiran -hā pada “buku catatannya” merujuk pada Lina dalam konteks ini.'
			}
		],
		patterns: [
			'Mulailah dari inti kata untuk mengetahui bendanya, lalu baca akhirannya untuk mengetahui pemilik.',
			'Cari kandidat di kalimat sebelumnya. Jika ada dua kandidat yang sama-sama cocok, uji konteks sebelum memutuskan.'
		],
		exercises: [
			{
				arabic: 'دَفْتَرِي هُنَا.',
				prompt: 'Siapa pemilik buku catatan?',
				answer: 'Orang yang sedang berbicara. Akhiran ya menyatakan “-ku”.'
			},
			{
				arabic: 'وَصَلَ سَامِي. مِفْتَاحُهُ فِي الْمَكْتَبِ.',
				prompt: 'Kunci siapa yang ada di kantor?',
				answer: 'Kunci Sami. Akhiran -hu mengacu pada Sami dalam konteks itu.'
			},
			{
				arabic: 'هَذَا كِتَابُ لِينَا. كِتَابُهَا جَدِيدٌ.',
				prompt: 'Temukan dua bentuk yang menunjuk ke buku yang sama.',
				answer: 'كِتَابُ لِينَا dan كِتَابُهَا. Sebutan kedua memakai akhiran yang merujuk ke Lina.'
			}
		]
	},
	{
		...base,
		id: 'lesson-u9-01',
		slug: 'pelaku-tindakan-dan-waktu',
		title: 'Tentukan siapa melakukan apa',
		minutes: 8,
		competencies: ['CB-13', 'CB-14', 'CB-15'],
		goal: 'Temukan tindakan, pelaku dan sasaran, lalu bedakan tindakan lampau dari yang berlangsung atau berulang.',
		references: [
			{
				label: 'Madinah Arabic · Indeks pelajaran kata kerja',
				href: 'https://madinaharabic.com/free-content/grammar'
			}
		],
		intro:
			'Bahasa Indonesia sering mulai dari pelaku. Saat membaca kalimat Arab yang mulai dari tindakan, tahan dulu terjemahannya sampai Anda menemukan siapa yang bertindak dan apa yang dikenai tindakan.',
		examples: [
			{
				arabic: 'كَتَبَ سَامِي الرِّسَالَةَ أَمْسِ.',
				meaning: 'Sami menulis surat itu kemarin.',
				note: 'Kata pertama tindakan, Sami pelaku, surat sasarannya, dan kata terakhir penanda waktu.'
			},
			{
				arabic: 'يَكْتُبُ سَامِي رِسَالَةً كُلَّ أُسْبُوعٍ.',
				meaning: 'Sami menulis surat setiap minggu.',
				note: 'Bentuk verba dan penanda “setiap minggu” mendukung bacaan kebiasaan.'
			},
			{
				arabic: 'قَالَتْ لِينَا إِنَّ الْبَابَ مَفْتُوحٌ.',
				meaning: 'Lina berkata bahwa pintunya terbuka.',
				note: '“Berkata” adalah tindakan. Bagian setelahnya menjawab apa yang dikatakan.'
			},
			{
				arabic: 'كَانَ الْبَابُ مَفْتُوحًا.',
				meaning: 'Pintu itu tadinya terbuka.',
				note: 'Bentuk lampau di awal menempatkan keadaan pintu pada waktu sebelumnya.'
			}
		],
		patterns: [
			'Urutan kata adalah petunjuk yang perlu dibaca bersama harakat, bentuk verba, dan konteks.',
			'Bentuk lampau membantu menemukan peristiwa yang sudah terjadi. Bentuk nonlampau dibaca bersama petunjuk waktu untuk memilih arti seperti “sedang” atau “biasa”.'
		],
		exercises: [
			{
				arabic: 'فَتَحَ الْمُدَرِّسُ الْبَابَ صَبَاحًا.',
				prompt: 'Siapa pelaku dan apa sasarannya?',
				answer: 'Guru membuka pintu pada pagi hari. Guru pelaku, pintu sasaran.'
			},
			{
				arabic: 'تَقْرَأُ لِينَا الْخَبَرَ كُلَّ صَبَاحٍ.',
				prompt: 'Ini kebiasaan atau kejadian satu kali? Apa buktinya?',
				answer: 'Kebiasaan. Frasa terakhir berarti “setiap pagi”.'
			},
			{
				arabic: 'قَالَ سَامِي إِنَّ الْمَكْتَبَ فَارِغٌ.',
				prompt: 'Pisahkan peristiwa dan isi ucapan.',
				answer: 'Peristiwanya: Sami berkata. Isi ucapannya: kantor itu kosong.'
			}
		]
	}
];
