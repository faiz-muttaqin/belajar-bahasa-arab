/**
 * G-03 edge cases (issue #16): ẓarf, muannath and jamak muannath sālim, al-asmā’ al-khamsa,
 * jamak taksir with mamnū‘ min aṣ-ṣarf, isim maqṣūr and manqūṣ, kata mabnī, and iḍāfah in naṣb
 * and as ma‘rifah.
 *
 * Every sentence is written for this project from the cited rule (ADR-004 D-9). None is copied
 * from a textbook; the sources check the rules and terms, not the sentences. All stay `draft`
 * until the single end-to-end ustadz review. Inventory, sources and the language-check record:
 * docs/data/nahwu-phrase-irab-audit.md.
 */
import { aj, madinah, qatr } from './annotation-builders.js';
import type { PhraseRule, PhraseSource } from './phrase-rules.js';
import type { AnnotationSource } from '#lib/domain/grammar/annotation.js';

const cite = (source: AnnotationSource): PhraseSource => ({
	name: source.label,
	url: source.url,
	locator: source.locator
});

export const edgePhraseRules: readonly PhraseRule[] = [
	{
		id: 'zharf-makan-zaman',
		title: 'Ẓarf makān dan ẓarf zamān',
		arabicTerm: 'ظَرْفُ الْمَكَانِ وَظَرْفُ الزَّمَانِ',
		summary:
			'Kata keterangan tempat dan waktu berstatus naṣb; bila ẓarf itu muḍāf, isim sesudahnya majrūr sebagai muḍāf ilaih.',
		keyRule:
			'Al-Ājurrūmiyyah menyebut ẓarf zamān dan ẓarf makān sebagai isim manṣūb, yaitu isim waktu atau tempat yang dinaṣabkan dengan makna “di” atau “pada” (taqdīr فِي). Contoh ẓarf makān: فَوْقَ, تَحْتَ, أَمَامَ, yang termasuk contoh dalam bab itu. Contoh ẓarf zamān di sini, قَبْلَ dan بَعْدَ, tidak ada dalam daftar contoh Al-Ājurrūmiyyah; keduanya dicantumkan sebagai ẓarf dalam penjelasan nahwu dan pelajaran Madinah Arabic. Tidak setiap ẓarf menjadi muḍāf (misalnya الْيَوْمَ). Dalam contoh di sini ẓarf berakhir fatḥa dan berkedudukan sebagai muḍāf, sehingga isim sesudahnya majrūr dengan kasra.',
		limitation:
			'قَبْلَ dan بَعْدَ dapat menunjuk waktu maupun tempat; contoh di sini memakainya untuk waktu. Ẓarf yang mabnī (misalnya حَيْثُ) dan ẓarf tanpa muḍāf ilaih tidak dibahas. Pada kalimat nominal, para ahli nahwu menjelaskan kedudukan ẓarf sebagai khabar dengan cara berbeda-beda; halaman ini hanya menandainya mengisi posisi khabar dan tidak merincinya.',
		examples: [
			{
				id: 'place-above',
				tokens: [
					{
						arabic: 'الْكِتَابُ',
						gloss: 'buku itu',
						role: 'Mubtada’',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'فَوْقَ',
						gloss: 'di atas',
						role: 'Ẓarf makān · muḍāf · mengisi posisi khabar',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'الْمَكْتَبِ',
						gloss: 'meja tulis itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Buku itu di atas meja tulis itu.',
				explanation:
					'فَوْقَ menyatakan tempat dan manṣūb; الْمَكْتَبِ majrūr karena menjadi muḍāf ilaih dari فَوْقَ.'
			},
			{
				id: 'place-below',
				tokens: [
					{
						arabic: 'الْقِطَّةُ',
						gloss: 'kucing itu',
						role: 'Mubtada’',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'تَحْتَ',
						gloss: 'di bawah',
						role: 'Ẓarf makān · muḍāf · mengisi posisi khabar',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'الْكُرْسِيِّ',
						gloss: 'kursi itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Kucing itu di bawah kursi itu.',
				explanation: 'Susunan sama dengan contoh sebelumnya; hanya tempatnya yang berganti.'
			},
			{
				id: 'place-front',
				tokens: [
					{ arabic: 'وَقَفَ', gloss: 'telah berdiri', role: 'Fi‘il māḍī' },
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'أَمَامَ',
						gloss: 'di depan',
						role: 'Ẓarf makān · muḍāf',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'الْبَابِ',
						gloss: 'pintu itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Murid itu berdiri di depan pintu itu.',
				explanation:
					'Pada kalimat verbal, ẓarf menerangkan tempat terjadinya perbuatan. Fatḥa pada أَمَامَ adalah tanda naṣb ẓarf, bukan tanda maf‘ūl bih.'
			},
			{
				id: 'time-after',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{
						arabic: 'الطَّالِبُ',
						gloss: 'murid itu',
						role: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'بَعْدَ',
						gloss: 'sesudah',
						role: 'Ẓarf zamān · muḍāf',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'الدَّرْسِ',
						gloss: 'pelajaran itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Murid itu datang sesudah pelajaran itu.',
				explanation: 'Ẓarf zamān menerangkan waktu; pola i‘rabnya sama dengan ẓarf makān.'
			},
			{
				id: 'time-before',
				tokens: [
					{ arabic: 'وَصَلَ', gloss: 'telah tiba', role: 'Fi‘il māḍī' },
					{
						arabic: 'الْمُعَلِّمُ',
						gloss: 'guru itu',
						role: 'Fā‘il',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'قَبْلَ',
						gloss: 'sebelum',
						role: 'Ẓarf zamān · muḍāf',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'الدَّرْسِ',
						gloss: 'pelajaran itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Guru itu tiba sebelum pelajaran itu.',
				explanation:
					'قَبْلَ dan بَعْدَ adalah pasangan lawan; keduanya tetap manṣūb sebagai ẓarf dan menjarrkan isim sesudahnya.'
			}
		],
		exercise: {
			question: 'Mengapa الْمَكْتَبِ berkasra padahal tidak ada huruf jar dalam الْكِتَابُ فَوْقَ الْمَكْتَبِ?',
			answer: 'Karena الْمَكْتَبِ adalah muḍāf ilaih dari فَوْقَ.',
			reason: 'Isim sesudah muḍāf selalu majrūr; huruf jar bukan satu-satunya penyebab jarr.'
		},
		sources: [
			cite(aj.zharf),
			cite(qatr.maful),
			cite(madinah.adverbPlace),
			cite(madinah.adverbTime)
		],
		reviewStatus: 'draft'
	},
	{
		id: 'muannath-salim',
		title: 'Muannath dan jamak muannath sālim',
		arabicTerm: 'الْمُؤَنَّثُ وَجَمْعُ الْمُؤَنَّثِ السَّالِمُ',
		summary:
			'Pasangan mudzakkar dan muannath biasanya dibedakan tā’ marbūṭah, dan jamak muannath sālim memakai kasra pada naṣb.',
		keyRule:
			'Pola yang paling umum: bentuk muannath menambahkan ـَةٌ pada bentuk mudzakkar, misalnya مُعَلِّمٌ dan مُعَلِّمَةٌ. Jamak muannath sālim berakhiran ـَاتٌ. Menurut Al-Ājurrūmiyyah, jamak ini marfū‘ dengan ḍamma, manṣūb dengan kasra (bukan fatḥa) dan majrūr dengan kasra. Pada nakirah, tanwin kasra tampak pada naṣb dan jarr; dengan الْـ atau sebagai muḍāf, kasra tampil tanpa tanwin.',
		limitation:
			'Banyak isim muannath tidak berakhir ـَة (misalnya أُمٌّ), dan sebagian isim berakhiran ـَة bermakna mudzakkar. Tidak semua isim muannath dijamakkan dengan ـَات; sebagian memakai jamak taksir. Contoh di sini memakai pola yang umum saja.',
		examples: [
			{
				id: 'masc-teacher',
				tokens: [
					{
						arabic: 'مُعَلِّمٌ',
						gloss: 'guru (laki-laki)',
						role: 'Man‘ūt · mudzakkar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					},
					{
						arabic: 'جَدِيدٌ',
						gloss: 'baru',
						role: 'Na‘at · mudzakkar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Seorang guru baru (laki-laki).',
				explanation: 'Bentuk mudzakkar tanpa tā’ marbūṭah; sifatnya juga mudzakkar.'
			},
			{
				id: 'fem-teacher',
				tokens: [
					{
						arabic: 'مُعَلِّمَةٌ',
						gloss: 'guru (perempuan)',
						role: 'Man‘ūt · muannath',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					},
					{
						arabic: 'جَدِيدَةٌ',
						gloss: 'baru',
						role: 'Na‘at · muannath',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Seorang guru baru (perempuan).',
				explanation:
					'Tā’ marbūṭah pada kedua kata menandai muannath; sifat mengikuti jenis kata yang disifati.'
			},
			{
				id: 'fem-plural-subject',
				tokens: [
					{
						arabic: 'جَاءَتِ',
						gloss: 'telah datang (feminin)',
						role: 'Fi‘il māḍī + tā’ ta’nīth'
					},
					{
						arabic: 'الْمُعَلِّمَاتُ',
						gloss: 'para guru perempuan itu',
						role: 'Fā‘il · jamak muannath sālim',
						irab: 'raf',
						marker: 'ḍamma'
					}
				],
				translation: 'Para guru perempuan itu datang.',
				explanation:
					'Pada posisi rafa‘, jamak muannath sālim memakai ḍamma seperti isim tunggal. Fi‘il yang mendahului pelaku muannath mendapat tā’ ta’nīth; tā’ sākinah itu diberi kasra karena bertemu lām الْـ yang bersukun.'
			},
			{
				id: 'fem-plural-object',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'الْمُعَلِّمَاتِ',
						gloss: 'para guru perempuan itu',
						role: 'Maf‘ūl bih · jamak muannath sālim',
						irab: 'nasb',
						marker: 'kasra (pengganti fatḥa)'
					}
				],
				translation: 'Saya melihat para guru perempuan itu.',
				explanation:
					'Walaupun menjadi maf‘ūl bih, tanda naṣb jamak muannath sālim adalah kasra, bukan fatḥa.'
			},
			{
				id: 'fem-plural-jarr',
				tokens: [
					{ arabic: 'سَلَّمْتُ', gloss: 'saya memberi salam', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'عَلَى', gloss: 'kepada', role: 'Huruf jar' },
					{
						arabic: 'الْمُعَلِّمَاتِ',
						gloss: 'para guru perempuan itu',
						role: 'Isim majrūr · jamak muannath sālim',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Saya memberi salam kepada para guru perempuan itu.',
				explanation:
					'Bentuk dan harakatnya sama dengan contoh naṣb, tetapi sebabnya berbeda: huruf jar عَلَى.'
			},
			{
				id: 'fem-plural-indefinite',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'مُعَلِّمَاتٍ',
						gloss: 'beberapa guru perempuan',
						role: 'Maf‘ūl bih · jamak muannath sālim',
						irab: 'nasb',
						marker: 'tanwin kasra (pengganti fatḥa)'
					}
				],
				translation: 'Saya melihat beberapa guru perempuan.',
				explanation:
					'Pada nakirah, naṣb jamak muannath sālim tampak sebagai tanwin kasra, bukan tanwin fatḥ.'
			}
		],
		exercise: {
			question: 'Apa tanda naṣb pada الْمُعَلِّمَاتِ dalam رَأَيْتُ الْمُعَلِّمَاتِ?',
			answer: 'Kasra, sebagai pengganti fatḥa.',
			reason:
				'Jamak muannath sālim tidak memakai fatḥa untuk naṣb; ḍamma, kasra dan kasra dipakai berturut-turut untuk rafa‘, naṣb dan jarr.'
		},
		sources: [cite(aj.irab), cite(qatr.types), cite(madinah.feminineSound)],
		reviewStatus: 'draft'
	},
	{
		id: 'asma-khamsa',
		title: 'Al-asmā’ al-khamsa',
		arabicTerm: 'الْأَسْمَاءُ الْخَمْسَةُ',
		summary: 'Lima isim memakai wāw, alif dan yā’ sebagai tanda i‘rab ketika menjadi muḍāf.',
		keyRule:
			'Al-Ājurrūmiyyah menyebut lima isim: أَبٌ (ayah), أَخٌ (saudara laki-laki), حَمٌ (kerabat laki-laki dari pihak suami atau istri), فَمٌ (mulut, dalam bentuk فُو) dan ذُو (pemilik). Dalam bentuk muḍāf, tandanya wāw pada rafa‘, alif pada naṣb dan yā’ pada jarr: أَبُو، أَبَا، أَبِي.',
		limitation:
			'Tanda wāw, alif dan yā’ muncul ketika kata-kata ini muḍāf. Syarat lain, misalnya bila muḍāf kepada yā’ mutakallim, dibahas dalam syarah dan tidak dirinci di sini. Tanpa iḍāfah isim ini memakai harakat biasa (أَبٌ، أَبًا، أَبٍ). Contoh hanya memakai أَبُو dan ذُو.',
		examples: [
			{
				id: 'father-raf',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{
						arabic: 'أَبُو',
						gloss: 'ayah',
						role: 'Fā‘il · muḍāf · asmā’ khamsa',
						irab: 'raf',
						marker: 'wāw'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Ayah murid itu datang.',
				explanation: 'Tanda rafa‘ أَبُو adalah wāw, bukan ḍamma.'
			},
			{
				id: 'father-nasb',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'أَبَا',
						gloss: 'ayah',
						role: 'Maf‘ūl bih · muḍāf · asmā’ khamsa',
						irab: 'nasb',
						marker: 'alif'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Saya melihat ayah murid itu.',
				explanation: 'Tanda naṣb أَبَا adalah alif, bukan fatḥa. Muḍāf ilaih tetap berkasra.'
			},
			{
				id: 'father-jarr',
				tokens: [
					{ arabic: 'سَلَّمْتُ', gloss: 'saya memberi salam', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'عَلَى', gloss: 'kepada', role: 'Huruf jar' },
					{
						arabic: 'أَبِي',
						gloss: 'ayah',
						role: 'Isim majrūr · muḍāf · asmā’ khamsa',
						irab: 'jarr',
						marker: 'yā’'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Saya memberi salam kepada ayah murid itu.',
				explanation:
					'Tanda jarr أَبِي adalah huruf yā’, bukan kasra; kasra pada bā’ hanya harakat yang menyesuaikan dengan yā’ sesudahnya. Sebab jarr أَبِي adalah عَلَى, sedangkan kasra pada الطَّالِبِ karena iḍāfah.'
			},
			{
				id: 'dhu-ilm',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{
						arabic: 'رَجُلٌ',
						gloss: 'seorang lelaki',
						role: 'Fā‘il · man‘ūt',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					},
					{
						arabic: 'ذُو',
						gloss: 'yang memiliki',
						role: 'Na‘at · muḍāf · asmā’ khamsa',
						irab: 'raf',
						marker: 'wāw'
					},
					{
						arabic: 'عِلْمٍ',
						gloss: 'ilmu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'tanwin kasra'
					}
				],
				translation: 'Seorang lelaki yang berilmu datang.',
				explanation:
					'ذُو selalu muḍāf. Di sini ia menjadi na‘at bagi رَجُلٌ sehingga marfū‘ dengan wāw; عِلْمٍ nakirah dan majrūr dengan tanwin kasra.'
			}
		],
		exercise: {
			question: 'Mengapa tanda rafa‘ pada أَبُو dalam جَاءَ أَبُو الطَّالِبِ berupa wāw?',
			answer: 'Karena أَبُو termasuk al-asmā’ al-khamsa dan di sini menjadi muḍāf.',
			reason: 'Lima isim ini memakai huruf, bukan harakat, ketika muḍāf.'
		},
		sources: [cite(aj.irab), cite(qatr.types), cite(madinah.sixNouns)],
		reviewStatus: 'draft'
	},
	{
		id: 'jamak-taksir-mamnu',
		title: 'Jamak taksir dan mamnū‘ min aṣ-ṣarf',
		arabicTerm: 'جَمْعُ التَّكْسِيرِ وَالْمَمْنُوعُ مِنَ الصَّرْفِ',
		summary:
			'Jamak taksir biasanya memakai tiga harakat, tetapi pola tertentu tidak bertanwin dan memakai fatḥa pada jarr.',
		keyRule:
			'Al-Ājurrūmiyyah menyatakan jamak taksir yang munṣarif (menerima tanwin) memakai ḍamma pada rafa‘, fatḥa pada naṣb dan kasra pada jarr, dan isim yang tidak munṣarif (mamnū‘ min aṣ-ṣarf) dijarrkan dengan fatḥa. Isim seperti itu tidak bertanwin. Menurut Qaṭr an-Nadā, ia dijarrkan dengan fatḥa kecuali bila memakai الْـ atau menjadi muḍāf; saat itu ia dijarrkan dengan kasra. Contoh di sini: كُتُبٌ (munṣarif) dan مَدَارِسُ (pola مَفَاعِلُ, mamnū‘ min aṣ-ṣarf).',
		limitation:
			'Hanya satu sebab larangan ṣarf yang dicontohkan: jamak taksir berpola مَفَاعِلُ. Qaṭr an-Nadā menghitung sembilan sebab; sebab lain (misalnya nama diri, pola أَفْعَلُ) tidak dibahas. Untuk sebab-sebab lain, periksa kamus atau pengajar.',
		examples: [
			{
				id: 'munsarif-jarr',
				tokens: [
					{ arabic: 'فِي', gloss: 'di dalam', role: 'Huruf jar' },
					{
						arabic: 'كُتُبٍ',
						gloss: 'buku-buku',
						role: 'Isim majrūr · jamak taksir munṣarif',
						irab: 'jarr',
						marker: 'tanwin kasra'
					},
					{
						arabic: 'كَثِيرَةٍ',
						gloss: 'banyak',
						role: 'Na‘at · feminin tunggal',
						irab: 'jarr',
						marker: 'tanwin kasra'
					}
				],
				translation: 'Di dalam banyak buku.',
				explanation:
					'كُتُبٌ menerima tanwin, jadi pada jarr ia berkasra dengan tanwin. Sifatnya feminin tunggal karena kata bendanya jamak benda tidak berakal.'
			},
			{
				id: 'munsarif-nasb',
				tokens: [
					{ arabic: 'قَرَأْتُ', gloss: 'saya membaca', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'كُتُبًا',
						gloss: 'buku-buku',
						role: 'Maf‘ūl bih · jamak taksir munṣarif',
						irab: 'nasb',
						marker: 'tanwin fatḥ'
					},
					{
						arabic: 'كَثِيرَةً',
						gloss: 'banyak',
						role: 'Na‘at · feminin tunggal',
						irab: 'nasb',
						marker: 'tanwin fatḥ'
					}
				],
				translation: 'Saya membaca banyak buku.',
				explanation: 'Jamak taksir munṣarif memakai fatḥa (tanwin fatḥ) pada naṣb.'
			},
			{
				id: 'mamnu-jarr',
				tokens: [
					{ arabic: 'فِي', gloss: 'di dalam', role: 'Huruf jar' },
					{
						arabic: 'مَدَارِسَ',
						gloss: 'sekolah-sekolah',
						role: 'Isim majrūr · mamnū‘ min aṣ-ṣarf',
						irab: 'jarr',
						marker: 'fatḥa (pengganti kasra)'
					},
					{
						arabic: 'كَثِيرَةٍ',
						gloss: 'banyak',
						role: 'Na‘at · feminin tunggal',
						irab: 'jarr',
						marker: 'tanwin kasra'
					}
				],
				translation: 'Di dalam banyak sekolah.',
				explanation:
					'مَدَارِسَ tidak bertanwin dan majrūr dengan fatḥa. Sifat كَثِيرَةٍ munṣarif, sehingga tetap berkasra dengan tanwin.'
			},
			{
				id: 'mamnu-definite',
				tokens: [
					{ arabic: 'فِي', gloss: 'di dalam', role: 'Huruf jar' },
					{
						arabic: 'الْمَدَارِسِ',
						gloss: 'sekolah-sekolah itu',
						role: 'Isim majrūr · memakai الْـ',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Di dalam sekolah-sekolah itu.',
				explanation: 'Dengan الْـ, isim yang tadinya tidak bertanwin kembali berkasra pada jarr.'
			},
			{
				id: 'mamnu-idafah',
				tokens: [
					{ arabic: 'فِي', gloss: 'di dalam', role: 'Huruf jar' },
					{
						arabic: 'مَدَارِسِ',
						gloss: 'sekolah-sekolah',
						role: 'Muḍāf · majrūr',
						irab: 'jarr',
						marker: 'kasra'
					},
					{
						arabic: 'الْمَدِينَةِ',
						gloss: 'kota itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Di dalam sekolah-sekolah kota itu.',
				explanation:
					'Sebagai muḍāf, مَدَارِسِ berkasra seperti isim munṣarif; kasra pada الْمَدِينَةِ karena iḍāfah.'
			}
		],
		exercise: {
			question: 'Mengapa مَدَارِسَ berfatḥa pada فِي مَدَارِسَ كَثِيرَةٍ, tetapi الْمَدَارِسِ berkasra?',
			answer: 'Karena مَدَارِسَ mamnū‘ min aṣ-ṣarf; dengan الْـ ia dijarrkan dengan kasra.',
			reason:
				'Menurut Qaṭr an-Nadā, isim mamnū‘ min aṣ-ṣarf dijarrkan dengan kasra bila memakai الْـ atau menjadi muḍāf.'
		},
		sources: [cite(aj.irab), cite(qatr.types), cite(qatr.mamnu), cite(madinah.diptote)],
		reviewStatus: 'draft'
	},
	{
		id: 'maqshur-manqush',
		title: 'Isim maqṣūr dan manqūṣ',
		arabicTerm: 'الِاسْمُ الْمَقْصُورُ وَالْمَنْقُوصُ',
		summary:
			'Pada sebagian isim, tanda i‘rab pada huruf akhir tidak tampak dan hanya diperkirakan.',
		keyRule:
			'Al-Ājurrūmiyyah menyatakan i‘rab dapat tampak (lafẓan) atau diperkirakan (taqdīran). Isim maqṣūr berakhir alif maqṣūrah (misalnya الْفَتَى): ḍamma, fatḥa dan kasra tidak tampak. Isim manqūṣ berakhir yā’ yang didahului kasra (misalnya الْقَاضِي): ḍamma dan kasra tidak tampak, tetapi fatḥa pada naṣb tampak: الْقَاضِيَ.',
		limitation:
			'Isim manqūṣ nakirah kehilangan yā’ pada rafa‘ dan jarr (قَاضٍ), dan penulisan maqṣūr nakirah juga berbeda; keduanya tidak dicontohkan. Isim mamdūd tidak dibahas.',
		examples: [
			{
				id: 'maqsur-raf',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{
						arabic: 'الْفَتَى',
						gloss: 'pemuda itu',
						role: 'Fā‘il · isim maqṣūr',
						irab: 'raf',
						marker: 'ḍamma muqaddara (tidak tampak)'
					}
				],
				translation: 'Pemuda itu datang.',
				explanation: 'Tanda rafa‘ ada pada akhir kata, tetapi tidak tampak karena alif maqṣūrah.'
			},
			{
				id: 'maqsur-nasb',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'الْفَتَى',
						gloss: 'pemuda itu',
						role: 'Maf‘ūl bih · isim maqṣūr',
						irab: 'nasb',
						marker: 'fatḥa muqaddara (tidak tampak)'
					}
				],
				translation: 'Saya melihat pemuda itu.',
				explanation:
					'Tulisan dan bunyinya sama dengan contoh rafa‘; kasusnya hanya diketahui dari fungsi kata dalam kalimat.'
			},
			{
				id: 'manqus-raf',
				tokens: [
					{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
					{
						arabic: 'الْقَاضِي',
						gloss: 'hakim itu',
						role: 'Fā‘il · isim manqūṣ',
						irab: 'raf',
						marker: 'ḍamma muqaddara (tidak tampak)'
					}
				],
				translation: 'Hakim itu datang.',
				explanation: 'Yā’ akhir tetap, tetapi ḍamma rafa‘ tidak tampak padanya.'
			},
			{
				id: 'manqus-nasb',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'الْقَاضِيَ',
						gloss: 'hakim itu',
						role: 'Maf‘ūl bih · isim manqūṣ',
						irab: 'nasb',
						marker: 'fatḥa ẓāhira (tampak)'
					}
				],
				translation: 'Saya melihat hakim itu.',
				explanation: 'Berbeda dari maqṣūr, fatḥa naṣb pada isim manqūṣ tampak pada yā’.'
			},
			{
				id: 'manqus-jarr',
				tokens: [
					{ arabic: 'سَلَّمْتُ', gloss: 'saya memberi salam', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'عَلَى', gloss: 'kepada', role: 'Huruf jar' },
					{
						arabic: 'الْقَاضِي',
						gloss: 'hakim itu',
						role: 'Isim majrūr · isim manqūṣ',
						irab: 'jarr',
						marker: 'kasra muqaddara (tidak tampak)'
					}
				],
				translation: 'Saya memberi salam kepada hakim itu.',
				explanation:
					'Bentuk الْقَاضِي sama dengan contoh rafa‘. Hanya naṣb yang tampak berbeda (الْقَاضِيَ).'
			}
		],
		exercise: {
			question: 'Pada isim manqūṣ seperti الْقَاضِي, pada kasus apa harakat akhirnya tampak?',
			answer: 'Pada naṣb, yaitu fatḥa pada الْقَاضِيَ.',
			reason: 'Rafa‘ dan jarr pada isim manqūṣ hanya diperkirakan; naṣb tampak.'
		},
		sources: [cite(aj.bab_irab), cite(qatr.taqdir), cite(madinah.maqsur)],
		reviewStatus: 'draft'
	},
	{
		id: 'kata-mabni',
		title: 'Kata mabnī: ḍamīr dan isim isyārah',
		arabicTerm: 'الْمَبْنِيُّ: الضَّمِيرُ وَاسْمُ الْإِشَارَةِ',
		summary:
			'Sebagian isim berbentuk tetap; kedudukannya ada, tetapi tidak tampak pada harakat akhir.',
		keyRule:
			'Isim mabnī tidak berubah akhirnya karena pengaruh ‘āmil. هَذَا sama bentuknya pada rafa‘, naṣb dan jarr. Ḍamīr juga mabnī, tetapi tiap kedudukan punya ḍamīr sendiri: هُوَ untuk rafa‘, dan ـهُ atau ـهُمْ untuk naṣb dan jarr. Kedudukannya dibaca dari fungsi kata dalam kalimat (disebut maḥall: “berada di tempat rafa‘”), bukan dari harakat akhir. Karena itu contoh di bawah tidak memberi label kasus berwarna pada kata mabnī.',
		limitation:
			'Hanya dua kelompok yang dicontohkan: ḍamīr dan isim isyārah mufrad mudzakkar. Ḍamīr lain (misalnya ḍamīr naṣb munfaṣil seperti إِيَّاهُ dan ḍamīr muttaṣil rafa‘), isim isyārah feminin dan jamak, isim mawṣūl, dan fi‘il māḍī yang juga mabnī tidak dibahas. Isim isyārah mutsanna (هَذَانِ) berubah bentuk menurut kasus dan tidak dicontohkan.',
		examples: [
			{
				id: 'pronoun-subject',
				tokens: [
					{ arabic: 'هُوَ', gloss: 'dia (laki-laki)', role: 'Ḍamīr munfaṣil · mubtada’ · mabnī' },
					{
						arabic: 'طَالِبٌ',
						gloss: 'seorang murid',
						role: 'Khabar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Dia seorang murid.',
				explanation:
					'Harakat akhir هُوَ bukan tanda i‘rab; kedudukannya sebagai mubtada’ berada di tempat rafa‘ (maḥall rafa‘).'
			},
			{
				id: 'demonstrative-subject',
				tokens: [
					{ arabic: 'هَذَا', gloss: 'ini', role: 'Isim isyārah · mubtada’ · mabnī' },
					{
						arabic: 'كِتَابٌ',
						gloss: 'sebuah buku',
						role: 'Khabar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Ini sebuah buku.',
				explanation: 'هَذَا berbentuk tetap; tanda rafa‘ hanya tampak pada khabar كِتَابٌ.'
			},
			{
				id: 'demonstrative-object',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'هَذَا', gloss: 'ini', role: 'Isim isyārah · maf‘ūl bih · mabnī' }
				],
				translation: 'Saya melihat ini.',
				explanation:
					'هَذَا tetap sama walaupun menjadi objek; ia berada di tempat naṣb (maḥall naṣb).'
			},
			{
				id: 'demonstrative-jarr',
				tokens: [
					{ arabic: 'سَأَلْتُ', gloss: 'saya bertanya', role: 'Fi‘il + dhamir subjek' },
					{ arabic: 'عَنْ', gloss: 'tentang', role: 'Huruf jar' },
					{ arabic: 'هَذَا', gloss: 'ini', role: 'Isim isyārah · di tempat jarr · mabnī' }
				],
				translation: 'Saya bertanya tentang ini.',
				explanation:
					'Setelah huruf jar, isim mu‘rab biasanya berkasra, tetapi هَذَا tidak berubah; ia berada di tempat jarr (maḥall jarr).'
			},
			{
				id: 'attached-pronoun',
				tokens: [
					{
						arabic: 'كِتَابُهُمْ',
						gloss: 'buku mereka',
						role: 'Mubtada’ · muḍāf + ḍamīr muttaṣil (muḍāf ilaih, mabnī)',
						irab: 'raf',
						marker: 'ḍamma (pada كِتَابُ)'
					},
					{
						arabic: 'جَدِيدٌ',
						gloss: 'baru',
						role: 'Khabar',
						irab: 'raf',
						marker: 'tanwin ḍamm'
					}
				],
				translation: 'Buku mereka baru.',
				explanation:
					'ـهُمْ adalah ḍamīr muttaṣil yang menjadi muḍāf ilaih di tempat jarr; ia mabnī dan tidak berubah karena ‘āmil. Harakat i‘rab hanya tampak pada muḍāf كِتَابُ. (Setelah kasra atau yā’ ḍamīr ini dibaca ـهِمْ, misalnya فِي كِتَابِهِمْ; itu penyesuaian bunyi, bukan i‘rab.)'
			}
		],
		exercise: {
			question: 'Mengapa هَذَا tetap sama dalam رَأَيْتُ هَذَا dan سَأَلْتُ عَنْ هَذَا?',
			answer: 'Karena هَذَا adalah isim mabnī; kedudukannya tidak tampak pada harakat akhir.',
			reason: 'Kasus kata mabnī dibaca dari fungsinya dalam kalimat, bukan dari harakatnya.'
		},
		sources: [
			cite(qatr.mabni),
			cite(qatr.marifah),
			cite(aj.naat),
			cite(madinah.mabni),
			cite(madinah.declinable),
			cite(madinah.pronouns)
		],
		reviewStatus: 'draft'
	},
	{
		id: 'idafah-nasb-marifah',
		title: 'Iḍāfah pada naṣb dan iḍāfah ma‘rifah',
		arabicTerm: 'الْمُضَافُ فِي النَّصْبِ وَالْإِضَافَةُ إِلَى الْمَعْرِفَةِ',
		summary:
			'Muḍāf mengikuti fungsinya dalam kalimat, muḍāf ilaih tetap majrūr, dan ketertentuan frasa mengikuti muḍāf ilaih.',
		keyRule:
			'Muḍāf menerima i‘rab sesuai fungsinya: ḍamma pada rafa‘, fatḥa pada naṣb, kasra pada jarr. Muḍāf ilaih tetap majrūr. Muḍāf tidak memakai tanwin maupun الْـ. Bila muḍāf ilaih ma‘rifah (misalnya memakai الْـ), seluruh frasa ma‘rifah; bila nakirah, frasa nakirah. Al-Ājurrūmiyyah mencantumkan isim yang diiḍāfahkan kepada salah satu dari empat jenis ma‘rifah sebelumnya sebagai ma‘rifah.',
		limitation:
			'Pembedaan iḍāfah lafẓiyyah dan ma‘nawiyyah tidak dibahas. Na‘at yang menerangkan muḍāf mengikuti kasus muḍāf, sedangkan na‘at yang menerangkan muḍāf ilaih mengikuti kasus muḍāf ilaih; hal ini hanya dicontohkan pada satu pasangan. Iḍāfah dengan ḍamīr ada pada kaidah mabnī.',
		examples: [
			{
				id: 'indefinite-idafah',
				tokens: [
					{
						arabic: 'كِتَابُ',
						gloss: 'buku',
						role: 'Muḍāf · nakirah',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'طَالِبٍ',
						gloss: 'seorang murid',
						role: 'Muḍāf ilaih · nakirah',
						irab: 'jarr',
						marker: 'tanwin kasra'
					}
				],
				translation: 'Sebuah buku milik seorang murid.',
				explanation:
					'Muḍāf ilaih nakirah bertanwin, sehingga frasa ini nakirah (“buku seorang murid”, belum tertentu).'
			},
			{
				id: 'definite-idafah',
				tokens: [
					{
						arabic: 'كِتَابُ',
						gloss: 'buku',
						role: 'Muḍāf · ma‘rifah',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih · ma‘rifah',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Buku milik murid itu.',
				explanation:
					'Muḍāf ilaih ma‘rifah (الْـ), jadi seluruh frasa ma‘rifah walaupun كِتَابُ sendiri tidak memakai الْـ. Tidak boleh ditulis الْكِتَابُ الطَّالِبِ.'
			},
			{
				id: 'idafah-nasb',
				tokens: [
					{ arabic: 'رَأَيْتُ', gloss: 'saya melihat', role: 'Fi‘il + dhamir subjek' },
					{
						arabic: 'كِتَابَ',
						gloss: 'buku',
						role: 'Maf‘ūl bih · muḍāf',
						irab: 'nasb',
						marker: 'fatḥa'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Saya melihat buku milik murid itu.',
				explanation:
					'Muḍāf berfungsi sebagai objek, maka manṣūb dengan fatḥa. Muḍāf ilaih tetap berkasra: ia majrūr karena iḍāfah, apa pun fungsi frasanya.'
			},
			{
				id: 'idafah-naat-mudhaf',
				tokens: [
					{
						arabic: 'كِتَابُ',
						gloss: 'buku',
						role: 'Muḍāf · man‘ūt',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					},
					{
						arabic: 'الْجَدِيدُ',
						gloss: 'yang baru',
						role: 'Na‘at bagi muḍāf',
						irab: 'raf',
						marker: 'ḍamma'
					}
				],
				translation: 'Buku baru milik murid itu.',
				explanation: 'الْجَدِيدُ berḍamma karena mengikuti كِتَابُ: yang baru adalah bukunya.'
			},
			{
				id: 'idafah-naat-mudhaf-ilaih',
				tokens: [
					{
						arabic: 'كِتَابُ',
						gloss: 'buku',
						role: 'Muḍāf',
						irab: 'raf',
						marker: 'ḍamma'
					},
					{
						arabic: 'الطَّالِبِ',
						gloss: 'murid itu',
						role: 'Muḍāf ilaih · man‘ūt',
						irab: 'jarr',
						marker: 'kasra'
					},
					{
						arabic: 'الْجَدِيدِ',
						gloss: 'yang baru',
						role: 'Na‘at bagi muḍāf ilaih',
						irab: 'jarr',
						marker: 'kasra'
					}
				],
				translation: 'Buku milik murid baru itu.',
				explanation:
					'الْجَدِيدِ berkasra karena mengikuti الطَّالِبِ: yang baru adalah muridnya. Harakat akhir membedakan dua arti dari susunan yang hampir sama.'
			}
		],
		exercise: {
			question: 'Dalam كِتَابُ الطَّالِبِ الْجَدِيدِ, apa yang baru, bukunya atau muridnya?',
			answer: 'Muridnya, karena الْجَدِيدِ berkasra mengikuti الطَّالِبِ.',
			reason:
				'Na‘at mengikuti kasus kata yang diterangkannya; kasus itu menunjukkan kata mana yang dimaksud.'
		},
		sources: [cite(aj.makhfudat), cite(aj.naat), cite(qatr.idafah), cite(madinah.idafah)],
		reviewStatus: 'draft'
	}
];
