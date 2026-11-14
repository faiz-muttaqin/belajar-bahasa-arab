import type { SentenceAnalysis } from '../analysis.js';

export const bagAnalysis = [
	[
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
		},
		{
			words: [
				['لَمْ', 'tidak', 'Harf', 'Partikel tetap.', 'Menegasikan masa lampau dan menjazmkan تَكُنْ.'],
				[
					'تَكُنِ',
					'adalah',
					'Fi‘il',
					'Mudhari‘ dari كَانَ: تَكُونُ → تَكُنْ setelah لَمْ.',
					'Majzum dengan sukun; kasrah sementara pada nun memudahkan sambungan ke الْـ.'
				],
				[
					'الْحَقِيبَةُ',
					'tas itu',
					'Isim',
					'Nomina feminin dengan الْـ.',
					'Isim كَانَ, marfu‘ dengan dammah.'
				],
				[
					'لَهَا،',
					'miliknya',
					'Harf + isim',
					'لِـ + ـهَا; lam dibaca dengan fathah di sini.',
					'Frasa kata depan sebagai khabar كَانَ. ـهَا merujuk pada Lina.'
				],
				[
					'فَسَأَلَتِ',
					'maka ia bertanya',
					'Fi‘il + harf',
					'فَـ + madhi feminin dari سَأَلَ.',
					'Fa menyatakan akibat. Pelakunya Lina. Akhir ـتْ dibaca ـتِ saat disambungkan ke السَّائِقَ.'
				],
				[
					'السَّائِقَ',
					'sopir itu',
					'Isim',
					'Isim fa‘il dari سَاقَ, akar س و ق, dengan الْـ.',
					'Objek yang ditanya, manshub dengan fathah.'
				],
				['عَنْ', 'tentang', 'Harf', 'Kata depan tetap.', 'Membuat isim berikutnya majrur.'],
				[
					'صَاحِبِهَا.',
					'pemiliknya',
					'Isim',
					'صَاحِبٌ (pemilik) + ـهَا (kata ganti feminin).',
					'Kasrah pada ب karena عَنْ. Kata ganti menjadi mudhaf ilaih dan merujuk pada tas.'
				]
			],
			structure: 'Negasi kepemilikan, lalu akibatnya.',
			translation: 'Tas itu bukan milik Lina, jadi ia bertanya kepada sopir tentang pemiliknya.'
		}
	],
	[
		{
			words: [
				[
					'قَالَ',
					'berkata',
					'Fi‘il',
					'Madhi dari akar ق و ل. Waw tengah tampil sebagai alif.',
					'Verba utama dan mabni pada fathah.'
				],
				[
					'السَّائِقُ',
					'sopir itu',
					'Isim',
					'Isim fa‘il dari سَاقَ, dengan الْـ.',
					'Fa‘il untuk قَالَ, marfu‘ dengan dammah.'
				],
				[
					'إِنَّ',
					'sesungguhnya / bahwa',
					'Harf',
					'Partikel penegas tetap.',
					'Membuka isi ucapan; isimnya manshub.'
				],
				[
					'رَاكِبَةً',
					'seorang penumpang perempuan',
					'Isim',
					'Isim fa‘il feminin dari رَكِبَ.',
					'Isim إِنَّ, manshub dengan fathah.'
				],
				[
					'نَزَلَتْ',
					'ia turun',
					'Fi‘il',
					'Madhi نَزَلَ + ta feminin bersukun.',
					'Pelaku tersirat: penumpang. Klausa ini memberi khabar إِنَّ.'
				],
				['قَبْلَ', 'sebelum', 'Isim', 'Nomina waktu.', 'Zharaf zaman manshub, menjadi mudhaf.'],
				[
					'قَلِيلٍ.',
					'sebentar',
					'Isim',
					'Isim sifat pada pola فَعِيل, dipakai sebagai ungkapan waktu.',
					'Mudhaf ilaih, majrur dengan kasrah. قَبْلَ قَلِيلٍ berarti “baru saja”.'
				]
			],
			structure: 'Ucapan sopir berisi satu klausa tentang penumpang.',
			translation: 'Sopir berkata bahwa seorang penumpang perempuan baru saja turun.'
		},
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
				['إِلَى', 'ke', 'Harf', 'Kata depan dengan bentuk tetap.', 'Harf jarr yang menyatakan arah.'],
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
		},
		{
			words: [
				[
					'وَسُجِّلَ',
					'dan dicatat',
					'Fi‘il + harf',
					'وَ + madhi pasif pola II, سَجَّلَ → سُجِّلَ.',
					'Waw menghubungkan. Verba pasif mabni pada fathah; pelaku tidak disebut.'
				],
				[
					'وَقْتُ',
					'waktu',
					'Isim',
					'Isim tunggal, dipakai sebagai mudhaf.',
					'Na’ib al-fa‘il, marfu‘ dengan dammah.'
				],
				[
					'الْعُثُورِ',
					'penemuan',
					'Isim',
					'Mashdar dari عَثَرَ عَلَى, dengan الْـ.',
					'Mudhaf ilaih untuk وَقْتُ, majrur dengan kasrah.'
				],
				[
					'عَلَيْهَا',
					'atasnya / terhadapnya',
					'Harf + isim',
					'عَلَى → عَلَيْـ + ـهَا.',
					'Melengkapi عُثُور dalam arti “menemukannya”. ـهَا merujuk pada tas dan berkedudukan jarr.'
				],
				['فِي', 'di dalam', 'Harf', 'Kata depan tetap.', 'Harf jarr sebelum سِجِلِّ.'],
				[
					'سِجِلِّ',
					'buku catatan',
					'Isim',
					'Isim tunggal سِجِلٌّ, dipakai sebagai mudhaf.',
					'Majrur karena فِي, dengan kasrah.'
				],
				[
					'الْمَكْتَبِ.',
					'kantor itu',
					'Isim',
					'Isim tempat dari ك ت ب, dengan الْـ.',
					'Mudhaf ilaih untuk سِجِلِّ, majrur dengan kasrah.'
				]
			],
			structure: 'Verba pasif + hal yang dicatat + tempat pencatatan.',
			translation: 'Waktu penemuan tas dicatat dalam buku kantor.'
		}
	],
	[
		{
			words: [
				[
					'بَعْدَ',
					'setelah',
					'Isim',
					'Nomina waktu.',
					'Zharaf zaman manshub dengan fathah; menjadi mudhaf.'
				],
				[
					'سَاعَةٍ',
					'satu jam',
					'Isim',
					'Nomina feminin tak tentu.',
					'Mudhaf ilaih untuk بَعْدَ, majrur dengan kasrah.'
				],
				[
					'عَادَتِ',
					'kembali',
					'Fi‘il',
					'Madhi عَادَ, akar ع و د, + ـتْ feminin.',
					'Verba utama. Kasrah pada ta sementara saat disambung ke الرَّاكِبَةُ.'
				],
				[
					'الرَّاكِبَةُ',
					'penumpang perempuan itu',
					'Isim',
					'Isim fa‘il feminin dari رَكِبَ, dengan الْـ.',
					'Fa‘il, marfu‘ dengan dammah.'
				],
				[
					'إِلَى',
					'ke',
					'Harf',
					'Kata depan tetap.',
					'Menunjukkan tujuan dan menjarkan kata sesudahnya.'
				],
				[
					'الْمَحَطَّةِ.',
					'halte itu',
					'Isim',
					'Nomina tempat dari akar ح ط ط dengan الْـ.',
					'Majrur setelah إِلَى, dengan kasrah.'
				]
			],
			structure: 'Keterangan waktu diikuti tindakan kembali dan tujuannya.',
			translation: 'Sejam kemudian, penumpang itu kembali ke halte.'
		},
		{
			words: [
				[
					'وَصَفَتْ',
					'ia mendeskripsikan',
					'Fi‘il',
					'Madhi dari وَصَفَ, akar و ص ف, dengan ـتْ feminin. Waw awal bagian dari akar.',
					'Verba utama klausa pertama. Pelakunya tersirat: penumpang.'
				],
				[
					'حَقِيبَتَهَا',
					'tasnya',
					'Isim',
					'حَقِيبَةٌ + ـهَا. Ta marbuthah menjadi ت ketika ada akhiran.',
					'Objek, manshub dengan fathah pada ta. ـهَا sebagai pemilik merujuk pada penumpang.'
				],
				[
					'لِلْمُوَظَّفِ،',
					'kepada petugas',
					'Harf + isim',
					'لِـ + الْـ + مُوَظَّفٌ, isim maf‘ul dari وَظَّفَ pola II.',
					'Kasrah karena lam jarr. Frasa memperkenalkan penerima keterangan.'
				],
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
					'Harf + isim',
					'إِلَى berbentuk إِلَيْـ ketika digabung dengan ـهَا.',
					'Kata depan dan kata ganti membentuk frasa penerima. Yang dirujuk adalah penumpang.'
				]
			],
			structure:
				'Penumpang mendeskripsikan tas; petugas mengembalikannya. Perubahan pelaku diketahui dari konteks dan bentuk verba.',
			translation:
				'Ia mendeskripsikan tasnya kepada petugas, lalu petugas mengembalikan tas itu kepadanya.'
		},
		{
			words: [
				['ثُمَّ', 'kemudian', 'Harf', 'Penghubung tetap.', 'Menunjukkan urutan dengan jeda.'],
				[
					'اتَّصَلَتِ',
					'menelepon',
					'Fi‘il',
					'Madhi pola VIII dari akar و ص ل, + ـتْ feminin.',
					'Verba utama. Ta berkasrah sementara saat disambung ke الرَّاكِبَةُ.'
				],
				[
					'الرَّاكِبَةُ',
					'penumpang perempuan itu',
					'Isim',
					'Isim fa‘il feminin dari رَكِبَ dengan الْـ.',
					'Fa‘il, marfu‘ dengan dammah.'
				],
				[
					'بِلِينَا',
					'kepada Lina',
					'Harf + isim',
					'بِـ + nama لِينَا.',
					'Ba adalah harf jarr; posisi jarr pada nama Lina tidak tampak karena alif akhir.'
				],
				[
					'وَشَكَرَتْهَا.',
					'dan ia berterima kasih kepadanya',
					'Fi‘il + harf + isim',
					'وَ + شَكَرَتْ (madhi feminin) + ـهَا (kata ganti).',
					'Pelakunya tetap penumpang. ـهَا menempati posisi objek dan merujuk pada Lina.'
				]
			],
			structure: 'Penghubung urutan + dua tindakan dengan pelaku yang sama.',
			translation: 'Kemudian penumpang menelepon Lina dan berterima kasih kepadanya.'
		}
	]
] satisfies readonly (readonly SentenceAnalysis[])[];
