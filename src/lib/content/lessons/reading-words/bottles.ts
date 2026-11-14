import type { SentenceAnalysis } from '../analysis.js';

export const bottlesAnalysis = [
	[
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
				],
				[
					'بَعْدَ',
					'setelah',
					'Isim',
					'Nomina waktu.',
					'Zharaf zaman, manshub dengan fathah. Menjadi mudhaf.'
				],
				[
					'فُسْحَةِ',
					'waktu istirahat',
					'Isim',
					'Nomina feminin dalam idhafah.',
					'Mudhaf ilaih untuk بَعْدَ, majrur dengan kasrah, sekaligus menjadi mudhaf.'
				],
				[
					'الظُّهْرِ.',
					'tengah hari',
					'Isim',
					'Nomina waktu tertentu dengan الْـ.',
					'Mudhaf ilaih untuk فُسْحَةِ, majrur dengan kasrah.'
				]
			],
			structure:
				'Verba pengamatan + pelaku + isi pengamatan yang memuat verba pasif dan keterangan waktu.',
			translation:
				'Tim kebersihan memperhatikan bahwa banyak botol air dibuang setelah istirahat siang.'
		},
		{
			words: [
				[
					'كَانَ',
					'dahulu / pada waktu itu',
					'Fi‘il',
					'Madhi dari akar ك و ن; waw tengah tampil sebagai alif.',
					'Verba yang mengaitkan subjek dengan keterangan pada waktu lampau, mabni pada fathah.'
				],
				[
					'مُعْظَمُهَا',
					'sebagian besarnya',
					'Isim',
					'مُعْظَمٌ (sebagian besar) + ـهَا.',
					'Isim كَانَ, marfu‘ dengan dammah pada mim. ـهَا merujuk pada botol-botol.'
				],
				[
					'يُسْتَعْمَلُ',
					'dipakai',
					'Fi‘il',
					'Mudhari‘ pasif dari اِسْتَعْمَلَ, pola X dari ع م ل.',
					'Marfu‘ dengan dammah. Klausa pasif menjadi khabar كَانَ, dengan rujukan tersirat ke sebagian besar botol itu.'
				],
				[
					'مَرَّةً',
					'sekali',
					'Isim',
					'Isim yang menunjuk satu kejadian.',
					'Menunjukkan jumlah tindakan dan mewakili mashdar verba sebelumnya (na’ib maf‘ul mutlaq). Manshub dengan fathah.'
				],
				[
					'وَاحِدَةً،',
					'satu',
					'Isim',
					'Bentuk feminin dari وَاحِدٌ.',
					'Na‘t untuk مَرَّةً, mengikuti nashabnya.'
				],
				[
					'فَاقْتَرَحَ',
					'maka mengusulkan',
					'Fi‘il + harf',
					'فَـ + madhi pola VIII dari ق ر ح.',
					'Fa menyatakan akibat; madhi mabni pada fathah.'
				],
				[
					'الْفَرِيقُ',
					'tim itu',
					'Isim',
					'Nomina tunggal tertentu dengan الْـ.',
					'Fa‘il, marfu‘ dengan dammah.'
				],
				[
					'تَجْرِبَةَ',
					'percobaan',
					'Isim',
					'Mashdar dari جَرَّبَ, pola II, dalam idhafah.',
					'Maf‘ul bih dari اِقْتَرَحَ, manshub dengan fathah.'
				],
				[
					'حَلٍّ',
					'sebuah solusi',
					'Isim',
					'Mashdar dari حَلَّ, dipakai sebagai nomina.',
					'Mudhaf ilaih untuk تَجْرِبَةَ, majrur dengan kasrah.'
				],
				[
					'بَسِيطٍ.',
					'sederhana',
					'Isim',
					'Isim sifat pada pola فَعِيل.',
					'Na‘t untuk حَلٍّ, ikut majrur dengan kasrah.'
				]
			],
			structure: 'Keadaan sebelumnya menjadi alasan tim mengusulkan percobaan.',
			translation:
				'Sebagian besar botol itu hanya dipakai sekali, jadi tim mengusulkan untuk mencoba solusi sederhana.'
		}
	],
	[
		{
			words: [
				[
					'وَضَعَتْ',
					'menempatkan / menyediakan',
					'Fi‘il',
					'Madhi dari وَضَعَ, akar و ض ع, + ـتْ feminin. Waw bagian dari akar.',
					'Verba utama. Bentuk feminin mengikuti إِدَارَةُ.'
				],
				[
					'إِدَارَةُ',
					'pengelola',
					'Isim',
					'Mashdar dari أَدَارَ, di sini berarti pihak pengelola.',
					'Fa‘il, marfu‘ dengan dammah. Menjadi mudhaf.'
				],
				[
					'الْمَدْرَسَةِ',
					'sekolah itu',
					'Isim',
					'Isim tempat feminin dari د ر س dengan الْـ.',
					'Mudhaf ilaih, majrur dengan kasrah.'
				],
				[
					'نُقْطَةً',
					'sebuah tempat / titik',
					'Isim',
					'Nomina feminin tak tentu.',
					'Maf‘ul bih, manshub dengan fathah.'
				],
				[
					'لِتَعْبِئَةِ',
					'untuk pengisian',
					'Harf + isim',
					'لِـ + تَعْبِئَةٌ, mashdar dari عَبَّأَ, pola II.',
					'Majrur setelah lam, dengan kasrah. Menjadi mudhaf.'
				],
				['الْمَاءِ', 'air', 'Isim', 'Isim dengan awalan الْـ.', 'Mudhaf ilaih untuk تَعْبِئَةِ, majrur.'],
				[
					'قُرْبَ',
					'dekat',
					'Isim',
					'Nomina tempat dalam pemakaian ini.',
					'Zharaf makan, manshub, dan menjadi mudhaf.'
				],
				[
					'الْمَلْعَبِ.',
					'lapangan itu',
					'Isim',
					'Isim tempat dari ل ع ب dengan الْـ.',
					'Mudhaf ilaih untuk قُرْبَ, majrur dengan kasrah.'
				]
			],
			structure: 'Subjek berupa idhafah, lalu objek diikuti tujuan dan tempat.',
			translation: 'Pihak sekolah menyediakan tempat isi ulang air di dekat lapangan.'
		},
		{
			words: [
				[
					'وَطَلَبَتْ',
					'dan ia meminta',
					'Fi‘il + harf',
					'وَ + طَلَبَ (madhi) + ـتْ feminin.',
					'Menjelaskan tindakan berikutnya. Pelaku tersirat ialah pihak sekolah.'
				],
				[
					'مِنَ',
					'dari / kepada',
					'Harf',
					'Bentuk dasar مِنْ. Fathah pada nun memudahkan bacaan sambung.',
					'Harf jarr. Frasa menandai siapa yang diminta.'
				],
				[
					'الطُّلَّابِ',
					'para siswa',
					'Isim',
					'Jamak taksir dari طَالِبٌ dengan الْـ.',
					'Majrur setelah مِنْ, dengan kasrah.'
				],
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
				],
				[
					'بَدَلًا',
					'sebagai ganti',
					'Isim',
					'Isim yang menunjukkan pengganti, dengan tanwin fathah.',
					'Keterangan pilihan alternatif; menjelaskan tindakan yang dilakukan sebagai ganti pembelian.'
				],
				[
					'مِنْ',
					'dari',
					'Harf',
					'Kata depan berbentuk tetap.',
					'Mengawali frasa yang menunjukkan tindakan yang diganti.'
				],
				[
					'شِرَاءِ',
					'pembelian',
					'Isim',
					'Mashdar dari اِشْتَرَى, di sini sebagai mudhaf.',
					'Majrur setelah مِنْ, dengan kasrah.'
				],
				[
					'قَوَارِيرَ',
					'botol-botol',
					'Isim',
					'Jamak taksir قَوَارِير dari قَارُورَةٌ, bentuk mamnu‘ minash-sharf.',
					'Mudhaf ilaih, majrur. Jarr ditandai fathah karena bentuk ini tidak memakai الْـ dan bukan mudhaf.'
				],
				[
					'جَدِيدَةٍ.',
					'baru',
					'Isim',
					'Bentuk feminin tunggal dari جَدِيدٌ, sesuai dengan jamak benda.',
					'Na‘t dan ikut berstatus majrur. Tanda jarr pada جَدِيدَةٍ adalah kasrah, meski قَوَارِيرَ memakai fathah.'
				]
			],
			structure: 'Permintaan sekolah diikuti dua tindakan siswa dan pilihan yang digantikannya.',
			translation:
				'Pihak sekolah meminta para siswa membawa botol sendiri dan mengisinya di sana alih-alih membeli botol baru.'
		}
	],
	[
		{
			words: [
				[
					'خِلَالَ',
					'selama',
					'Isim',
					'Nomina waktu dalam pemakaian ini.',
					'Zharaf zaman manshub, dan menjadi mudhaf.'
				],
				[
					'الْأُسْبُوعِ',
					'minggu itu',
					'Isim',
					'Nomina waktu tertentu dengan الْـ.',
					'Mudhaf ilaih, majrur dengan kasrah.'
				],
				[
					'الْأَوَّلِ،',
					'pertama',
					'Isim',
					'Bilangan urutan dengan الْـ.',
					'Na‘t untuk الْأُسْبُوعِ, mengikuti ketentuan dan jarr-nya.'
				],
				[
					'اسْتَخْدَمَ',
					'menggunakan',
					'Fi‘il',
					'Madhi pola X dari خ د م.',
					'Verba utama, mabni pada fathah.'
				],
				[
					'كَثِيرٌ',
					'banyak',
					'Isim',
					'Isim sifat pola فَعِيل, dipakai untuk menyebut sejumlah orang.',
					'Fa‘il, marfu‘ dengan dammah dan tanwin.'
				],
				[
					'مِنَ',
					'dari',
					'Harf',
					'مِنْ dengan fathah sambung sebelum الْـ.',
					'Harf jarr, menjelaskan kelompok yang dirujuk.'
				],
				[
					'الطُّلَّابِ',
					'para siswa',
					'Isim',
					'Jamak taksir dari طَالِبٌ, dengan الْـ.',
					'Majrur setelah مِنْ, dengan kasrah.'
				],
				[
					'نُقْطَةَ',
					'tempat',
					'Isim',
					'Nomina feminin dalam idhafah.',
					'Maf‘ul bih, manshub dengan fathah. Menjadi mudhaf.'
				],
				[
					'التَّعْبِئَةِ.',
					'pengisian',
					'Isim',
					'Mashdar dari عَبَّأَ, dengan الْـ.',
					'Mudhaf ilaih, majrur dengan kasrah.'
				]
			],
			structure: 'Rentang waktu + tindakan + pelaku + objek.',
			translation: 'Pada minggu pertama, banyak siswa menggunakan tempat isi ulang.'
		},
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
	],
	[
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
		},
		{
			words: [
				[
					'وَسَيَعْرِضُ',
					'dan ia akan menyampaikan',
					'Fi‘il + harf',
					'وَ + سَـ (masa depan) + mudhari‘ dari عَرَضَ.',
					'Verba utama marfu‘ dengan dammah. Pelaku tersirat merujuk pada tim.'
				],
				[
					'النَّتَائِجَ',
					'hasil-hasil itu',
					'Isim',
					'Jamak taksir dari نَتِيجَةٌ dengan الْـ.',
					'Maf‘ul bih, manshub dengan fathah.'
				],
				[
					'عَلَى',
					'kepada',
					'Harf',
					'Kata depan berbentuk tetap.',
					'Memperkenalkan penerima hasil dan menjarkan isim setelahnya.'
				],
				[
					'الْإِدَارَةِ',
					'pihak sekolah',
					'Isim',
					'Mashdar dari أَدَارَ, di sini pihak pengelola, dengan الْـ.',
					'Majrur setelah عَلَى, dengan kasrah.'
				],
				[
					'قَبْلَ',
					'sebelum',
					'Isim',
					'Nomina waktu.',
					'Zharaf zaman manshub, diikuti klausa sebagai pelengkap.'
				],
				[
					'أَنْ',
					'penanda klausa',
					'Harf',
					'Bentuk tetap.',
					'Memberi nashab pada fi‘il mudhari‘ berikutnya.'
				],
				[
					'تُقَرِّرَ',
					'memutuskan',
					'Fi‘il',
					'Mudhari‘ feminin dari قَرَّرَ, pola II.',
					'Manshub dengan fathah setelah أَنْ. Pelakunya pihak sekolah.'
				],
				[
					'إِنْ',
					'apakah',
					'Harf',
					'Partikel tetap pada pertanyaan tak langsung.',
					'Membuka hal yang akan diputuskan.'
				],
				[
					'كَانَتْ',
					'ia akan / apakah ia',
					'Fi‘il',
					'Madhi كَانَ + ـتْ feminin.',
					'Isimnya tersirat dan merujuk pada pihak sekolah. Klausa berikutnya menjadi khabar.'
				],
				[
					'سَتَضَعُ',
					'akan menempatkan',
					'Fi‘il + harf',
					'سَـ + mudhari‘ feminin dari وَضَعَ. Waw akar gugur pada bentuk ini.',
					'Marfu‘ dengan dammah; subjek tersirat merujuk pada pihak sekolah.'
				],
				[
					'نُقْطَةً',
					'sebuah tempat',
					'Isim',
					'Nomina feminin tunggal tak tentu.',
					'Maf‘ul bih, manshub dengan fathah.'
				],
				[
					'ثَانِيَةً.',
					'kedua',
					'Isim',
					'Bilangan urutan feminin dari ثَانٍ.',
					'Na‘t untuk نُقْطَةً, mengikuti nashab dan ketidaktentuannya.'
				]
			],
			structure: 'Rencana penyampaian hasil, lalu batas waktu berupa keputusan sekolah.',
			translation:
				'Tim akan menyampaikan hasil kepada pihak sekolah sebelum sekolah memutuskan apakah akan menyediakan tempat isi ulang kedua.'
		}
	]
] satisfies readonly (readonly SentenceAnalysis[])[];
