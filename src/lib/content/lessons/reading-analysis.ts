import type { AnalysisGroup } from './analysis.js';

export const bagAnalysis: readonly AnalysisGroup[] = [
	{
		heading: 'Tindakan utama, waktu, dan tempat',
		paragraph: 1,
		sentences: [
			{
				words: [
					[
						'قَبْلَ',
						'sebelum',
						'Isim',
						'Nomina yang menyatakan waktu dalam pemakaian ini.',
						'Zharaf zaman, manshub. Menjadi mudhaf untuk klausa waktu setelahnya.'
					],
					[
						'أَنْ',
						'penanda klausa',
						'Harf',
						'Bentuk tetap. Dipahami bersama قَبْلَ sebagai “sebelum”.',
						'Harf nashab. Membuat fi‘il mudhari‘ setelahnya manshub.'
					],
					[
						'تُغَادِرَ',
						'berangkat',
						'Fi‘il',
						'Mudhari‘ dari غَادَرَ, pola III. Awalan تُـ sesuai dengan pelaku feminin tunggal di sini.',
						'Manshub dengan fathah sesudah أَنْ. Ini verba dalam keterangan waktu.'
					],
					[
						'الْحَافِلَةُ،',
						'bus itu',
						'Isim',
						'حَافِلَةٌ adalah nomina feminin. الْـ menandai bentuk tertentu.',
						'Fa‘il untuk تُغَادِرَ, marfu‘ dengan dammah.'
					],
					[
						'رَأَتْ',
						'melihat',
						'Fi‘il',
						'Madhi dari رَأَى. Akhir ـتْ menandai feminin tunggal.',
						'Verba utama. Pelakunya disebut setelah verba.'
					],
					[
						'لِينَا',
						'Lina',
						'Isim',
						'Nama orang. Bunyi akhir ā tetap.',
						'Fa‘il untuk رَأَتْ. Marfu‘ tanpa dammah yang tampak pada alif akhir.'
					],
					[
						'حَقِيبَةً',
						'sebuah tas',
						'Isim',
						'Nomina feminin tunggal حَقِيبَةٌ dalam bentuk tak tentu.',
						'Maf‘ul bih, manshub dengan fathah.'
					],
					[
						'صَغِيرَةً',
						'kecil',
						'Isim',
						'Bentuk feminin dari صَغِيرٌ, dengan ta marbuthah.',
						'Na‘t yang mengikuti حَقِيبَةً dalam feminin, tunggal, ketidaktentuan, dan nashab.'
					],
					[
						'تَحْتَ',
						'di bawah',
						'Isim',
						'Nomina tempat. Dalam konteks ini diterjemahkan sebagai “di bawah”.',
						'Zharaf makan, manshub. Juga menjadi mudhaf.'
					],
					[
						'الْمَقْعَدِ.',
						'tempat duduk itu',
						'Isim',
						'Isim tempat dari قَعَدَ (duduk), akar ق ع د, dengan الْـ.',
						'Mudhaf ilaih untuk تَحْتَ, majrur dengan kasrah.'
					]
				],
				structure:
					'Keterangan waktu + fi‘il utama + fa‘il + maf‘ul bih beserta na‘t + keterangan tempat.',
				translation: 'Sebelum bus berangkat, Lina melihat sebuah tas kecil di bawah tempat duduk.'
			}
		]
	},
	{
		heading: 'Kata yang dijelaskan oleh klausa relatif',
		paragraph: 2,
		sentences: [
			{
				words: [
					[
						'أَحْضَرَتْ',
						'membawa',
						'Fi‘il',
						'Madhi dari أَحْضَرَ, pola IV dari akar ح ض ر. ـتْ menandai feminin.',
						'Verba utama. Lina pelakunya.'
					],
					[
						'لِينَا',
						'Lina',
						'Isim',
						'Nama orang dengan alif akhir.',
						'Fa‘il, marfu‘ tanpa perubahan akhir yang tampak.'
					],
					[
						'الْحَقِيبَةَ',
						'tas itu',
						'Isim',
						'Nomina feminin dengan awalan الْـ.',
						'Maf‘ul bih, manshub dengan fathah.'
					],
					[
						'إِلَى',
						'ke',
						'Harf',
						'Kata depan dengan bentuk tetap.',
						'Harf jarr yang menyatakan arah.'
					],
					[
						'الْمَكْتَبِ',
						'kantor itu',
						'Isim',
						'Isim tempat dari akar ك ت ب, dengan awalan الْـ.',
						'Majrur sesudah إِلَى, dengan kasrah.'
					],
					[
						'الَّذِي',
						'yang',
						'Isim',
						'Isim maushul (kata relatif) untuk maskulin tunggal.',
						'Merujuk pada الْمَكْتَبِ. Menyambungkan kata itu dengan klausa penjelas.'
					],
					[
						'يَسْتَقْبِلُ',
						'menerima',
						'Fi‘il',
						'Mudhari‘ dari اِسْتَقْبَلَ, pola X dari akar ق ب ل.',
						'Verba dalam klausa relatif. Pelakunya tersirat dan merujuk ke kantor.'
					],
					[
						'الْمَفْقُودَاتِ.',
						'barang-barang hilang',
						'Isim',
						'Bentuk jamak berakhiran ـات dari الْمَفْقُودَةُ. Dasarnya isim maf‘ul dari فَقَدَ.',
						'Maf‘ul bih dari يَسْتَقْبِلُ. Jamak feminin beraturan ini bertanda nashab kasrah.'
					]
				],
				structure:
					'Lina membawa tas ke kantor. Klausa yang dimulai oleh الَّذِي menjelaskan fungsi kantor.',
				translation: 'Lina membawa tas itu ke kantor yang menerima barang hilang.'
			}
		]
	},
	{
		heading: 'Dua akhiran -hā dalam satu klausa',
		paragraph: 3,
		sentences: [
			{
				words: [
					[
						'فَأَعَادَهَا',
						'lalu ia mengembalikannya',
						'Fi‘il + harf + isim',
						'فَـ mengaitkan dengan tindakan sebelumnya. أَعَادَ adalah madhi pola IV dari akar ع و د. ـهَا kata ganti feminin.',
						'Pelaku tersirat adalah petugas. ـهَا menjadi objek dan merujuk pada tas.'
					],
					[
						'إِلَيْهَا.',
						'kepadanya',
						'Isim + harf',
						'إِلَى berbentuk إِلَيْـ ketika digabung dengan ـهَا.',
						'Kata depan dan kata ganti membentuk frasa penerima. Yang dirujuk adalah penumpang.'
					]
				],
				structure: 'Tindakan + objek melekat + frasa penerima.',
				translation: 'Lalu petugas mengembalikan tas itu kepadanya.'
			}
		]
	}
];

export const photoAnalysis: readonly AnalysisGroup[] = [
	{
		heading: 'Siapa ingin ikut, dan ikut dalam apa?',
		paragraph: 1,
		sentences: [
			{
				words: [
					[
						'أَرَادَتْ',
						'ingin',
						'Fi‘il',
						'Madhi dari أَرَادَ, pola IV. ـتْ menandai feminin tunggal.',
						'Verba utama. Pelakunya Lina.'
					],
					[
						'لِينَا',
						'Lina',
						'Isim',
						'Nama orang dengan alif akhir.',
						'Fa‘il untuk أَرَادَتْ. Marfu‘ tanpa tanda akhir yang tampak.'
					],
					[
						'أَنْ',
						'untuk',
						'Harf',
						'Bentuk tetap yang membuka klausa.',
						'Harf nashab sebelum verba mudhari‘.'
					],
					[
						'تُشَارِكَ',
						'ikut',
						'Fi‘il',
						'Mudhari‘ dari شَارَكَ, pola III dari akar ش ر ك.',
						'Manshub dengan fathah setelah أَنْ. Pelakunya tersirat dan merujuk pada Lina.'
					],
					[
						'فِيهِ،',
						'di dalamnya',
						'Isim + harf',
						'فِي + ـهِ (kata ganti maskulin tunggal).',
						'Frasa kata depan melengkapi makna “ikut”. Kata ganti merujuk pada مَعْرِضٍ, pameran pada kalimat sebelumnya.'
					]
				],
				structure: 'Verba keinginan + pelaku + klausa yang menyatakan apa yang ingin dilakukan.',
				translation: 'Lina ingin ikut dalam pameran itu.'
			}
		]
	},
	{
		heading: 'Foto yang diperlihatkan dan orang yang ditanya',
		paragraph: 2,
		sentences: [
			{
				words: [
					[
						'ثُمَّ',
						'kemudian',
						'Harf',
						'Kata penghubung dengan bentuk tetap.',
						'Mengaitkan tindakan ini dengan pengambilan foto sebelumnya.'
					],
					[
						'عَرَضَتْهَا',
						'ia memperlihatkannya',
						'Fi‘il + isim',
						'عَرَضَ madhi dari akar ع ر ض. ـتْ menandai feminin, lalu ـهَا adalah kata ganti.',
						'Pelaku tersirat adalah Lina. Objek ـهَا merujuk pada foto.'
					],
					[
						'عَلَى',
						'kepada',
						'Harf',
						'Kata depan tetap. Arti dipilih dari konteks “memperlihatkan”.',
						'Harf jarr yang memperkenalkan orang yang melihat foto.'
					],
					[
						'الْبَائِعَةِ',
						'pedagang itu',
						'Isim',
						'Bentuk feminin dari بَائِعٌ, isim fa‘il dari بَاعَ.',
						'Majrur dengan kasrah setelah عَلَى.'
					],
					[
						'وَسَأَلَتْهَا',
						'dan ia bertanya kepadanya',
						'Fi‘il + harf + isim',
						'وَ + سَأَلَتْ (madhi feminin) + ـهَا (kata ganti).',
						'Lina tetap menjadi pelaku. Objek ـهَا kali ini adalah pedagang, yaitu orang yang ditanya.'
					]
				],
				structure:
					'Kemudian + tindakan pertama dan objeknya + penerima + tindakan kedua dan objeknya.',
				translation: 'Kemudian Lina memperlihatkan foto itu kepada pedagang dan bertanya kepadanya.'
			}
		]
	},
	{
		heading: 'Akhiran verba yang menunjukkan pelaku',
		paragraph: 3,
		sentences: [
			{
				words: [
					[
						'قَرَأَ',
						'membaca',
						'Fi‘il',
						'Madhi aktif dari akar ق ر أ. Bentuk maskulin tunggal muncul sebelum pelaku jamak yang disebut.',
						'Verba utama klausa pertama.'
					],
					[
						'الزُّوَّارُ',
						'para pengunjung',
						'Isim',
						'Jamak taksir dari زَائِرٌ.',
						'Fa‘il, marfu‘ dengan dammah.'
					],
					[
						'الْجُمْلَةَ،',
						'kalimat itu',
						'Isim',
						'Nomina feminin tunggal dengan الْـ.',
						'Maf‘ul bih, manshub dengan fathah.'
					],
					['ثُمَّ', 'lalu', 'Harf', 'Kata penghubung tetap.', 'Menunjukkan urutan tindakan.'],
					[
						'سَأَلُوا',
						'mereka bertanya',
						'Fi‘il + isim',
						'Madhi سَأَلَ dengan waw jamak. Alif terakhir tidak dibunyikan.',
						'Waw adalah kata ganti subjek, merujuk ke para pengunjung.'
					],
					[
						'لِينَا',
						'Lina',
						'Isim',
						'Nama orang dengan alif akhir.',
						'Maf‘ul bih, yaitu orang yang ditanya. Tanda nashab tidak tampak.'
					],
					[
						'عَنِ',
						'tentang',
						'Harf',
						'Bentuk dasar عَنْ. Kasrah pada nun membantu penyambungan sebelum الْـ.',
						'Harf jarr yang memperkenalkan topik pertanyaan.'
					],
					[
						'السُّوقِ.',
						'pasar itu',
						'Isim',
						'Nomina tertentu. Sin digandakan dalam ucapan setelah الْـ.',
						'Majrur dengan kasrah setelah عَنْ.'
					]
				],
				structure:
					'Tindakan pertama dengan pelaku yang disebut + tindakan kedua dengan pelaku pada akhiran verba.',
				translation:
					'Para pengunjung membaca kalimat itu, lalu mereka bertanya kepada Lina tentang pasar.'
			}
		]
	}
];

export const bottlesAnalysis: readonly AnalysisGroup[] = [
	{
		heading: 'Apa yang diamati tim?',
		paragraph: 1,
		sentences: [
			{
				words: [
					[
						'لَاحَظَ',
						'memperhatikan',
						'Fi‘il',
						'Madhi, pola III dari akar ل ح ظ.',
						'Verba utama yang membuka laporan pengamatan.'
					],
					[
						'فَرِيقُ',
						'tim',
						'Isim',
						'Nomina tunggal. Di sini dipakai dalam idhafah.',
						'Fa‘il, marfu‘ dengan dammah. Menjadi mudhaf.'
					],
					[
						'النَّظَافَةِ',
						'kebersihan',
						'Isim',
						'Nomina abstrak dari akar ن ظ ف, dengan awalan الْـ.',
						'Mudhaf ilaih, majrur dengan kasrah.'
					],
					[
						'أَنَّ',
						'bahwa',
						'Harf',
						'Kata tugas berbentuk tetap.',
						'Membuka isi pengamatan dan membuat isimnya manshub.'
					],
					[
						'عَدَدًا',
						'sejumlah',
						'Isim',
						'Nomina tunggal tak tentu.',
						'Isim untuk أَنَّ, manshub dengan fathah.'
					],
					[
						'كَبِيرًا',
						'besar',
						'Isim',
						'Sifat dari akar ك ب ر, pola فَعِيل.',
						'Na‘t untuk عَدَدًا dan mengikuti nashabnya.'
					],
					[
						'مِنْ',
						'dari',
						'Harf',
						'Kata depan berbentuk tetap.',
						'Memperkenalkan benda yang dihitung.'
					],
					[
						'قَوَارِيرِ',
						'botol-botol',
						'Isim',
						'Jamak taksir dari قَارُورَةٌ. Termasuk bentuk yang biasanya tidak bertanwin.',
						'Majrur setelah مِنْ. Kasrah muncul di sini karena menjadi mudhaf.'
					],
					[
						'الْمَاءِ',
						'air',
						'Isim',
						'Nomina bermakna air dengan الْـ.',
						'Mudhaf ilaih untuk قَوَارِيرِ, majrur.'
					],
					[
						'يُرْمَى',
						'dibuang',
						'Fi‘il',
						'Mudhari‘ pasif dari رَمَى. Alif maqshurah di akhir membuat tanda i‘rab tidak tampak.',
						'Klausa verba menjadi khabar untuk أَنَّ. Yang dibuang adalah sejumlah botol air; pelaku tidak ditulis.'
					]
				],
				structure:
					'Verba pengamatan + tim kebersihan sebagai pelaku + klausa أَنَّ yang menyatakan apa yang diamati.',
				translation: 'Tim kebersihan memperhatikan bahwa banyak botol air dibuang.'
			}
		]
	},
	{
		heading: 'Pemilik botol dan benda yang diisi',
		paragraph: 2,
		sentences: [
			{
				words: [
					[
						'أَنْ',
						'untuk',
						'Harf',
						'Penanda awal klausa dengan bentuk tetap.',
						'Membuat mudhari‘ berikutnya manshub.'
					],
					[
						'يُحْضِرُوا',
						'mereka membawa',
						'Fi‘il + isim',
						'Mudhari‘ dari أَحْضَرَ dengan waw jamak. Nun pada يُحْضِرُونَ hilang sesudah أَنْ.',
						'Waw adalah pelaku, yaitu para siswa.'
					],
					[
						'قَوَارِيرَهُمْ',
						'botol-botol mereka',
						'Isim',
						'قَوَارِيرَ (jamak taksir) + ـهُمْ (kata ganti jamak).',
						'Objek dari “membawa”. ـهُمْ sebagai pemilik merujuk pada para siswa.'
					],
					[
						'وَأَنْ',
						'dan untuk',
						'Harf',
						'وَ + أَنْ. Keduanya harf.',
						'Menghubungkan klausa kedua dan memberi nashab pada verba sesudahnya.'
					],
					[
						'يَمْلَؤُوهَا',
						'mereka mengisinya',
						'Fi‘il + isim',
						'Mudhari‘ dari مَلَأَ. Nun pada يَمْلَؤُونَ hilang karena أَنْ. Waw menandai jamak; ـهَا kata ganti objek.',
						'Waw tetap merujuk pada siswa. ـهَا merujuk pada botol-botol, jamak benda yang diperlakukan seperti feminin tunggal di sini.'
					],
					[
						'هُنَاكَ',
						'di sana',
						'Isim',
						'Bentuk penunjuk tempat.',
						'Keterangan tempat, merujuk lokasi isi ulang.'
					]
				],
				structure:
					'Dua klausa tindakan sejajar. Subjeknya sama, sedangkan bentuk kata ganti objek mengikuti benda yang dirujuk.',
				translation: 'Agar mereka membawa botol mereka sendiri dan mengisinya di sana.'
			}
		]
	},
	{
		heading: 'Negasi dan hasil yang belum diukur',
		paragraph: 3,
		sentences: [
			{
				words: [
					[
						'وَلَكِنَّ',
						'tetapi',
						'Harf',
						'وَ + لَكِنَّ. Keduanya kata tugas.',
						'Menghubungkan klausa yang mengoreksi dugaan. لَكِنَّ membuat isimnya manshub.'
					],
					[
						'فَرِيقَ',
						'tim',
						'Isim',
						'Nomina tunggal dalam idhafah.',
						'Isim untuk لَكِنَّ, manshub. Menjadi mudhaf.'
					],
					[
						'النَّظَافَةِ',
						'kebersihan',
						'Isim',
						'Nomina abstrak tertentu dengan الْـ.',
						'Mudhaf ilaih, majrur.'
					],
					[
						'لَمْ',
						'belum atau tidak',
						'Harf',
						'Partikel negasi dengan bentuk tetap.',
						'Membuat fi‘il mudhari‘ sesudahnya majzum dan memberi makna negasi lampau.'
					],
					[
						'يَقِسْ',
						'mengukur',
						'Fi‘il',
						'Dari قَاسَ → يَقِيسُ. Pada bentuk majzum, akhir menjadi sukun dan huruf tengah ya gugur.',
						'Verba inti dari klausa yang berfungsi sebagai khabar لَكِنَّ. Pelaku tersirat merujuk pada tim.'
					],
					[
						'كَمِّيَّةَ',
						'jumlah',
						'Isim',
						'Nomina feminin dalam idhafah.',
						'Maf‘ul bih dari يَقِسْ, manshub dan menjadi mudhaf.'
					],
					[
						'النَّفَايَاتِ',
						'sampah',
						'Isim',
						'Nomina jamak berakhiran ـات dari نِفَايَةٌ dengan الْـ.',
						'Mudhaf ilaih, majrur.'
					],
					[
						'بَعْدُ.',
						'sampai saat itu',
						'Isim',
						'Nomina waktu yang dipakai bersama negasi.',
						'Zharaf zaman. Bentuk akhir -u tetap karena pelengkap waktunya dipahami dari konteks.'
					]
				],
				structure: 'Penanda kontras + isimnya + klausa yang menyatakan hasil pengukuran belum ada.',
				translation: 'Namun tim kebersihan belum mengukur jumlah sampah.'
			}
		]
	},
	{
		heading: 'Rencana mendatang dan klausa penjelas',
		paragraph: 4,
		sentences: [
			{
				words: [
					[
						'فِي',
						'pada',
						'Harf',
						'Kata depan berbentuk tetap.',
						'Harf jarr. Memulai keterangan waktu.'
					],
					['الشَّهْرِ', 'bulan', 'Isim', 'Nomina tunggal dengan awalan الْـ.', 'Majrur setelah فِي.'],
					[
						'الْمُقْبِلِ،',
						'yang akan datang',
						'Isim',
						'Isim fa‘il dari أَقْبَلَ, dengan awalan الْـ.',
						'Na‘t untuk الشَّهْرِ, mengikuti kasrahnya.'
					],
					[
						'سَيُسَجِّلُ',
						'akan mencatat',
						'Fi‘il + harf',
						'سَـ penanda masa depan + mudhari‘ dari سَجَّلَ, pola II.',
						'Verba utama. Awalan سَـ memberi makna rencana mendatang.'
					],
					[
						'الْفَرِيقُ',
						'tim itu',
						'Isim',
						'Nomina tertentu dengan الْـ.',
						'Fa‘il, marfu‘ dengan dammah.'
					],
					[
						'عَدَدَ',
						'jumlah',
						'Isim',
						'Nomina tunggal dalam idhafah.',
						'Maf‘ul bih dan mudhaf, manshub dengan fathah.'
					],
					[
						'الْقَوَارِيرِ',
						'botol-botol itu',
						'Isim',
						'Jamak taksir dari قَارُورَةٌ. Bentuknya tertentu dengan الْـ.',
						'Mudhaf ilaih, majrur dengan kasrah.'
					],
					[
						'الَّتِي',
						'yang',
						'Isim',
						'Isim maushul feminin tunggal. Di sini merujuk pada jamak benda.',
						'Mengaitkan botol-botol dengan klausa penjelas.'
					],
					[
						'تُرْمَى',
						'dibuang',
						'Fi‘il',
						'Mudhari‘ pasif dari رَمَى, bentuk feminin tunggal.',
						'Verba klausa relatif. Yang dibuang adalah botol-botol.'
					],
					[
						'كُلَّ',
						'setiap',
						'Isim',
						'Nomina yang menyatakan cakupan dan masuk idhafah.',
						'Zharaf zaman, manshub. Menjadi mudhaf.'
					],
					['يَوْمٍ.', 'hari', 'Isim', 'Nomina tak tentu.', 'Mudhaf ilaih untuk كُلَّ, majrur.']
				],
				structure:
					'Keterangan waktu + rencana tindakan + pelaku + objek, lalu klausa relatif menjelaskan botol mana yang dihitung.',
				translation: 'Bulan depan, tim akan mencatat jumlah botol yang dibuang setiap hari.'
			}
		]
	}
];
