/**
 * G-05: hand-authored, scoped examples of Arabic clause connection.
 * Sources cover rule families; they are not proof of each original example.
 * No automatic derivation, Arabic parsing, or copying of copyrighted lessons.
 */
import type { IrabCase } from './phrase-rules.js';
import type { VerbMood } from './sentence-rules.js';

export type ClauseSpanKind =
	| 'main'
	| 'link'
	| 'relative'
	| 'condition'
	| 'result'
	| 'reason'
	| 'contrast'
	| 'circumstance'
	| 'exception'
	| 'specification';

export const CLAUSE_SPAN_LABELS: Record<ClauseSpanKind, string> = {
	main: 'Kalimat / unsur utama',
	link: 'Penghubung',
	relative: 'Ṣilah / klausa relatif',
	condition: 'Syarat',
	result: 'Jawab / akibat',
	reason: 'Sebab / alasan',
	contrast: 'Kontras',
	circumstance: 'Ḥāl / keadaan',
	exception: 'Istitsnā’ / pengecualian',
	specification: 'Tamyīz / penjelas'
};

export type ClauseToken = {
	arabic: string;
	gloss: string;
	role: string;
	/** Case of a nominal only. */
	irab?: IrabCase;
	/** Mood of a finite imperfect verb only. */
	mood?: VerbMood;
	/** An attested sign for this specific sample, not an automatically inferred suffix. */
	marker?: string;
};

export type ClauseSpan = {
	id: string;
	kind: ClauseSpanKind;
	note: string;
	tokens: readonly ClauseToken[];
};

export type ClauseExample = {
	id: string;
	spans: readonly ClauseSpan[];
	translation: string;
	explanation: string;
};

export type ClauseRule = {
	id: 'coordination' | 'relative-clauses' | 'conditions' | 'reasons' | 'contrast' | 'adjuncts';
	title: string;
	arabicTerm: string;
	summary: string;
	keyRule: string;
	limitation: string;
	examples: readonly ClauseExample[];
	exercise: { question: string; answer: string; reason: string };
	sources: readonly { name: string; url: string }[];
	reviewStatus: 'draft';
};

const un = { name: 'PBB — Arabic Language Curriculum, conjunctions dan discourse', url: 'https://languages.un.org/sites/default/files/2025-03/Arabic%20Language%20Curriculum_1.pdf' };
const coordination = { name: 'Arabic: An Essential Grammar — bab huruf al-‘aṭf', url: 'https://www.ziyaraat.net/books/arabicanessentialgrammar.pdf' };
const relative = { name: 'Michigan State University OpenBooks — relative pronouns', url: 'https://openbooks.lib.msu.edu/arb201/chapter/3-2-grammar-in-context/' };
const aljazeera = { name: 'Al Jazeera Learning Arabic — al-asmā’ al-mawṣūlah', url: 'https://learning.aljazeera.net/ar/node/19497' };
const conditional = { name: 'Al-Islam.org — jussive conditional particles', url: 'https://al-islam.org/elementary-arabic-syntax-2-rashid-al-shartuni/jussive-cases-aorist-tense' };
const conditionGrammar = { name: 'Rafed — fi‘l ash-sharṭ dan jawāb ash-sharṭ', url: 'https://lib.rafed.net/view.php?b_id=1934&page=65&type=c_fbook' };
const reason = { name: 'LibreTexts — karena (li’anna) vs karena (bisabab)', url: 'https://human.libretexts.org/Bookshelves/Languages/Arabic/Introduction_to_Arabic_II_%28Hanaa_Alkassas_Layla_Bahar_Al-Aloom_and_Samira_Murtada%29/03%3A_My_Favorite_Season/3.07%3A_Grammar_%282%29_Answering_Why' };
const ajurrumiyya = { name: 'Tafsīr al-Ājurrūmiyyah — bab al-ḥāl, tamyīz, istitsnā’', url: 'https://aqeedeh.com/book_files/pdf/ar/tabsit-al-ajrumiyeh-Ar-PDF.pdf' };

export const clauseRules: readonly ClauseRule[] = [
	{
		id: 'coordination',
		title: '‘Aṭf: menghubungkan kata dan tindakan',
		arabicTerm: 'حُرُوفُ الْعَطْفِ',
		summary: 'Penghubung dapat menyatukan kata benda atau dua rangkaian tindakan; makna وَ tidak sama persis dengan ثُمَّ.',
		keyRule:
			'وَ berarti “dan” tanpa memastikan jarak waktu, sedangkan ثُمَّ menunjukkan urutan dengan jeda. Dalam ‘aṭf antar isim, ma‘ṭūf mengikuti i‘rab ma‘ṭūf ‘alaih. Prefiks وَ secara ejaan menempel pada kata setelahnya.',
		limitation: 'Contoh bukan daftar lengkap huruf ‘aṭf. Urutan waktu tidak boleh disimpulkan dari setiap وَ.',
		examples: [
			{
				id: 'and-two-actions',
				spans: [
					{ id: 'first', kind: 'main', note: 'Tindakan pertama', tokens: [
						{ arabic: 'قَرَأَ', gloss: 'telah membaca', role: 'Fi‘il māḍī' },
						{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' },
						{ arabic: 'الْكِتَابَ', gloss: 'buku itu', role: 'Maf‘ūl bih', irab: 'nasb', marker: 'fatḥa' }
					] },
					{ id: 'join', kind: 'link', note: 'وَ tersambung pada fi‘il kedua', tokens: [
						{ arabic: 'وَكَتَبَ', gloss: 'dan menulis', role: 'وَ + fi‘il māḍī' }
					] },
					{ id: 'next', kind: 'main', note: 'Tindakan kedua, fā‘il tersirat هُوَ', tokens: [
						{ arabic: 'الدَّرْسَ', gloss: 'pelajaran itu', role: 'Maf‘ūl bih', irab: 'nasb', marker: 'fatḥa' }
					] }
				],
				translation: 'Murid itu membaca buku dan menulis pelajaran.',
				explanation: 'Penghubung وَ melekat pada كَتَبَ; fā‘il tindakan kedua dipahami dari konteks, tidak perlu diulang.'
			},
			{
				id: 'then-sequence',
				spans: [
					{ id: 'first', kind: 'main', note: 'Kejadian pertama', tokens: [
						{ arabic: 'دَخَلَ', gloss: 'telah masuk', role: 'Fi‘il māḍī' },
						{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'then', kind: 'link', note: 'Urutan dengan jeda', tokens: [
						{ arabic: 'ثُمَّ', gloss: 'kemudian', role: 'Huruf ‘aṭf' }
					] },
					{ id: 'second', kind: 'result', note: 'Kejadian berikutnya', tokens: [
						{ arabic: 'جَلَسَ', gloss: 'lalu duduk', role: 'Fi‘il māḍī; fā‘il tersirat' }
					] }
				],
				translation: 'Murid itu masuk, kemudian duduk.',
				explanation: 'ثُمَّ menandai urutan; subjek جَلَسَ tersirat, mengacu kepada murid tadi.'
			},
			{
				id: 'coordinated-subjects',
				spans: [
					{ id: 'verb', kind: 'main', note: 'Kejadian', tokens: [
						{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' }
					] },
					{ id: 'subject', kind: 'main', note: 'Ma‘ṭūf ‘alaih yang marfū‘', tokens: [
						{ arabic: 'الْمُعَلِّمُ', gloss: 'guru itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'join', kind: 'link', note: 'Wāw melekat pada ma‘ṭūf', tokens: [
						{ arabic: 'وَالطَّالِبُ', gloss: 'dan murid itu', role: 'وَ + ma‘ṭūf', irab: 'raf', marker: 'ḍamma' }
					] }
				],
				translation: 'Guru dan murid itu datang.',
				explanation: 'Meskipun وَ melekat pada الطَّالِبُ, isim setelahnya tetap marfū‘ karena di-‘aṭf-kan pada fā‘il.'
			}
		],
		exercise: {
			question: 'Apakah وَ selalu berarti dua kejadian berlangsung berturut-turut?',
			answer: 'Tidak. وَ sekadar menghubungkan; ثُمَّ lebih jelas menandai urutan dengan jeda.',
			reason: 'Jangan memaksakan makna “lalu” pada semua وَ tanpa bukti konteks.'
		},
		sources: [coordination, un],
		reviewStatus: 'draft'
	},
	{
		id: 'relative-clauses',
		title: 'Isim mawṣūl dan jumlah ṣilah',
		arabicTerm: 'الِاسْمُ الْمَوْصُولُ وَصِلَتُهُ',
		summary: 'Isim mawṣūl mengikat kata benda tertentu dengan klausa yang menjelaskan atau membatasinya.',
		keyRule:
			'الَّذِي digunakan untuk maskulin tunggal dan الَّتِي untuk feminin tunggal. Ṣilah dapat berisi fi‘il dan objeknya. Pada contoh yang memerlukan penghubung balik, dhamir ‘ā’id dapat hadir sebagai sufiks atau berupa dhamir tersirat.',
		limitation:
			'Isim tak tentu dapat diperluas oleh jumlah sifat tanpa الَّذِي. Bentuk relatif untuk mutsanna dan jamak tidak dibahas di tahap pengantar ini.',
		examples: [
			{
				id: 'relative-male',
				spans: [
					{ id: 'topic', kind: 'main', note: 'Mubtada yang diterangkan', tokens: [
						{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Mubtada', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'relative', kind: 'link', note: 'Isim mawṣūl maskulin', tokens: [
						{ arabic: 'الَّذِي', gloss: 'yang', role: 'Isim mawṣūl' }
					] },
					{ id: 'sila', kind: 'relative', note: 'Jumlah ṣilah', tokens: [
						{ arabic: 'يَقْرَأُ', gloss: 'membaca', role: 'Fi‘il, fā‘il tersirat', mood: 'indicative', marker: 'ḍamma' },
						{ arabic: 'الْكِتَابَ', gloss: 'buku itu', role: 'Maf‘ūl bih', irab: 'nasb', marker: 'fatḥa' }
					] },
					{ id: 'predicate', kind: 'main', note: 'Khabar dari mubtada awal', tokens: [
						{ arabic: 'مُجْتَهِدٌ', gloss: 'rajin', role: 'Khabar', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Murid yang membaca buku itu rajin.',
				explanation: 'الَّذِي + يَقْرَأُ الْكِتَابَ menerangkan الطَّالِبُ, sementara مُجْتَهِدٌ adalah khabar utama.'
			},
			{
				id: 'relative-female',
				spans: [
					{ id: 'topic', kind: 'main', note: 'Mubtada feminin', tokens: [
						{ arabic: 'الطَّالِبَةُ', gloss: 'siswi itu', role: 'Mubtada', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'relative', kind: 'link', note: 'Isim mawṣūl feminin', tokens: [
						{ arabic: 'الَّتِي', gloss: 'yang', role: 'Isim mawṣūl' }
					] },
					{ id: 'sila', kind: 'relative', note: 'Jumlah ṣilah', tokens: [
						{ arabic: 'تَكْتُبُ', gloss: 'menulis', role: 'Fi‘il, fā‘il tersirat هِيَ', mood: 'indicative', marker: 'ḍamma' },
						{ arabic: 'الدَّرْسَ', gloss: 'pelajaran itu', role: 'Maf‘ūl bih', irab: 'nasb', marker: 'fatḥa' }
					] },
					{ id: 'predicate', kind: 'main', note: 'Khabar feminin', tokens: [
						{ arabic: 'مُجْتَهِدَةٌ', gloss: 'rajin', role: 'Khabar', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Siswi yang menulis pelajaran itu rajin.',
				explanation: 'الَّتِي mengikuti kata benda feminin الطَّالِبَةُ. Fi‘il ṣilah mempunyai fā‘il tersirat هِيَ.'
			},
			{
				id: 'relative-object-return',
				spans: [
					{ id: 'topic', kind: 'main', note: 'Benda yang diterangkan', tokens: [
						{ arabic: 'الْكِتَابُ', gloss: 'buku itu', role: 'Mubtada', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'relative', kind: 'link', note: 'Isim mawṣūl', tokens: [
						{ arabic: 'الَّذِي', gloss: 'yang', role: 'Isim mawṣūl' }
					] },
					{ id: 'sila', kind: 'relative', note: 'Ḍamīr -هُ kembali ke الْكِتَابُ', tokens: [
						{ arabic: 'قَرَأْتُهُ', gloss: 'saya membacanya', role: 'Fi‘il + subjek + dhamir objek' }
					] },
					{ id: 'predicate', kind: 'main', note: 'Khabar utama', tokens: [
						{ arabic: 'مُفِيدٌ', gloss: 'bermanfaat', role: 'Khabar', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Buku yang saya baca itu bermanfaat.',
				explanation: 'Sufiks ـهُ pada قَرَأْتُهُ adalah ‘ā’id yang merujuk kepada الْكِتَابُ; jangan memisahkannya dengan spasi.'
			}
		],
		exercise: {
			question: 'Apa fungsi ـهُ pada قَرَأْتُهُ dalam kalimat relatif?',
			answer: 'Sebagai dhamir objek yang kembali kepada الْكِتَابُ (‘ā’id).',
			reason: 'Hubungan antara ism mawṣūl dan ṣilah dapat ditandai dhamir yang ada dalam klausa relatif.'
		},
		sources: [relative, aljazeera],
		reviewStatus: 'draft'
	},
	{
		id: 'conditions',
		title: 'Syarat dan jawāb asy-syarṭ',
		arabicTerm: 'الشَّرْطُ وَجَوَابُ الشَّرْطِ',
		summary: 'Hubungkan tindakan bersyarat dengan akibatnya, lalu amati dua muḍāri‘ yang menjadi majzūm.',
		keyRule:
			'إِنْ الشرطية biasanya menjazmkan dua fi‘il muḍāri‘: fi‘l asy-syarṭ dan jawāb asy-syarṭ. Jika jawāb berupa jumlah ismiyyah, biasanya diperlukan فَاءُ رَابِطَةُ الْجَوَابِ.',
		limitation:
			'Jangan menyamakan إِنْ (jika) dengan إِنَّ (sesungguhnya, nāsikh). إِذَا dan لَوْ memiliki perilaku berbeda. Contoh terbatas pada verba ṣaḥīḥ dengan tanda jazm sukūn.',
		examples: [
			{
				id: 'if-study',
				spans: [
					{ id: 'link', kind: 'link', note: 'Harf syarat jazm', tokens: [
						{ arabic: 'إِنْ', gloss: 'jika', role: 'Harf syarat' }
					] },
					{ id: 'condition', kind: 'condition', note: 'Fi‘l asy-syarṭ', tokens: [
						{ arabic: 'تَدْرُسْ', gloss: 'kamu belajar', role: 'Fi‘il muḍāri‘; subjek tersirat', mood: 'jussive', marker: 'sukūn' }
					] },
					{ id: 'result', kind: 'result', note: 'Jawāb asy-syarṭ', tokens: [
						{ arabic: 'تَنْجَحْ', gloss: 'kamu berhasil', role: 'Fi‘il muḍāri‘; subjek tersirat', mood: 'jussive', marker: 'sukūn' }
					] }
				],
				translation: 'Jika kamu belajar, kamu akan berhasil.',
				explanation: 'تَدْرُسْ dan تَنْجَحْ sama-sama majzūm karena إِنْ dalam pola syarat–jawab sederhana.'
			},
			{
				id: 'if-read',
				spans: [
					{ id: 'link', kind: 'link', note: 'Harf syarat jazm', tokens: [
						{ arabic: 'إِنْ', gloss: 'jika', role: 'Harf syarat' }
					] },
					{ id: 'condition', kind: 'condition', note: 'Fi‘l asy-syarṭ', tokens: [
						{ arabic: 'تَقْرَأْ', gloss: 'kamu membaca', role: 'Fi‘il muḍāri‘', mood: 'jussive', marker: 'sukūn' }
					] },
					{ id: 'result', kind: 'result', note: 'Jawāb asy-syarṭ', tokens: [
						{ arabic: 'تَفْهَمْ', gloss: 'kamu memahami', role: 'Fi‘il muḍāri‘', mood: 'jussive', marker: 'sukūn' }
					] }
				],
				translation: 'Jika kamu membaca, kamu akan memahami.',
				explanation: 'Dua fi‘il muḍāri‘ menjadi majzūm; translasi Indonesia tidak perlu menyalin bentuk sukūn secara literal.'
			},
			{
				id: 'if-nominal-result',
				spans: [
					{ id: 'link', kind: 'link', note: 'Harf syarat jazm', tokens: [
						{ arabic: 'إِنْ', gloss: 'jika', role: 'Harf syarat' }
					] },
					{ id: 'condition', kind: 'condition', note: 'Fi‘l asy-syarṭ', tokens: [
						{ arabic: 'تَدْرُسْ', gloss: 'kamu belajar', role: 'Fi‘il muḍāri‘', mood: 'jussive', marker: 'sukūn' }
					] },
					{ id: 'result', kind: 'result', note: 'فَــ menghubungkan jawāb nominal', tokens: [
						{ arabic: 'فَأَنْتَ', gloss: 'maka kamu', role: 'فَ + dhamir mubtada' },
						{ arabic: 'نَاجِحٌ', gloss: 'berhasil', role: 'Khabar marfū‘', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Jika kamu belajar, maka kamu akan berhasil.',
				explanation: 'Jawāb berupa jumlah ismiyyah, sehingga diawali فَـ; نَاجِحٌ adalah khabar, bukan fi‘il majzūm.'
			}
		],
		exercise: {
			question: 'Dalam إِنْ تَدْرُسْ تَنْجَحْ, mengapa kedua fi‘il bersukūn?',
			answer: 'Karena إِنْ menjazmkan fi‘l syarat dan jawab yang berupa muḍāri‘.',
			reason: 'Bentuk nominal yang didahului فَـ perlu dianalisis berbeda dari muḍāri‘ sebagai jawab.'
		},
		sources: [conditional, conditionGrammar],
		reviewStatus: 'draft'
	},
	{
		id: 'reasons',
		title: 'Sebab dan akibat: li’anna, bukan bisabab',
		arabicTerm: 'التَّعْلِيلُ وَالسَّبَبُ',
		summary: 'Sebab dapat berbentuk kalimat setelah لِأَنَّ, atau frasa nomina setelah بِسَبَبِ.',
		keyRule:
			'لِأَنَّ terdiri dari لِـ + أَنَّ dan bekerja seperti inna: ism-nya manṣūb, khabar-nya marfū‘ jika berupa kata tunggal. بِسَبَبِ adalah frasa preposisional yang diikuti isim majrūr, bukan otomatis kalimat lengkap.',
		limitation: 'Khabar لِأَنَّ juga dapat berupa klausa, tetapi contoh pertama sengaja memakai khabar mufrad supaya perubahan kasus terlihat jelas.',
		examples: [
			{
				id: 'because-sentence',
				spans: [
					{ id: 'main', kind: 'main', note: 'Keadaan utama', tokens: [
						{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Mubtada', irab: 'raf', marker: 'ḍamma' },
						{ arabic: 'فَرِحٌ', gloss: 'senang', role: 'Khabar', irab: 'raf', marker: 'tanwin ḍamm' }
					] },
					{ id: 'link', kind: 'link', note: 'لِـ + أَنَّ memperkenalkan sebab', tokens: [
						{ arabic: 'لِأَنَّ', gloss: 'karena', role: 'Harf ta‘līl + nāsikh' }
					] },
					{ id: 'reason', kind: 'reason', note: 'Jumlah sebab', tokens: [
						{ arabic: 'الدَّرْسَ', gloss: 'pelajaran itu', role: 'Ism anna', irab: 'nasb', marker: 'fatḥa' },
						{ arabic: 'سَهْلٌ', gloss: 'mudah', role: 'Khabar anna', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Murid itu senang karena pelajarannya mudah.',
				explanation: 'Berbeda dari لَمْ atau لَنْ, لِأَنَّ bekerja pada jumlah nominal dan menashabkan ism-nya.'
			},
			{
				id: 'because-of-noun',
				spans: [
					{ id: 'main', kind: 'main', note: 'Kejadian utama', tokens: [
						{ arabic: 'غَابَ', gloss: 'tidak hadir', role: 'Fi‘il māḍī' },
						{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'reason', kind: 'reason', note: 'Frasa sebab, bukan jumlah sesudah anna', tokens: [
						{ arabic: 'بِسَبَبِ', gloss: 'karena', role: 'Bi + sabab sebagai isim majrūr', irab: 'jarr', marker: 'kasra' },
						{ arabic: 'الْمَرَضِ', gloss: 'sakit', role: 'Muḍāf ilaih', irab: 'jarr', marker: 'kasra' }
					] }
				],
				translation: 'Murid itu tidak hadir karena sakit.',
				explanation: 'بِسَبَبِ الْمَرَضِ adalah frasa sebab; الْمَرَضِ majrūr sebagai muḍāf ilaih.'
			}
		],
		exercise: {
			question: 'Mengapa الدَّرْسَ memakai fatḥa setelah لِأَنَّ?',
			answer: 'Karena الدَّرْسَ menjadi ism أَنَّ yang manṣūb.',
			reason: 'Huruf لِأَنَّ dan بِسَبَبِ tidak memiliki struktur sesudahnya yang sama.'
		},
		sources: [reason, un],
		reviewStatus: 'draft'
	},
	{
		id: 'contrast',
		title: 'Kontras dengan lākinna',
		arabicTerm: 'الِاسْتِدْرَاكُ وَلَكِنَّ',
		summary: 'Penghubung kontras menjelaskan informasi yang berlawanan, tetapi bentuk لَكِنَّ juga berdampak pada i‘rab.',
		keyRule:
			'لَكِنَّ adalah salah satu saudara إِنَّ: ism-nya manṣūb dan khabar-nya marfū‘. Jangan menyamakan bentuk bertasydid لَكِنَّ dengan لَكِنْ yang tidak bekerja sebagai nāsikh.',
		limitation: 'Contoh hanya membahas لَكِنَّ bernāsikh; pemakaian لَكِنْ, بَلْ, dan konteks negasi akan diperluas pada tingkat berikutnya.',
		examples: [
			{
				id: 'but-font',
				spans: [
					{ id: 'main', kind: 'main', note: 'Informasi pertama', tokens: [
						{ arabic: 'الْكِتَابُ', gloss: 'buku itu', role: 'Mubtada', irab: 'raf', marker: 'ḍamma' },
						{ arabic: 'صَغِيرٌ', gloss: 'kecil', role: 'Khabar', irab: 'raf', marker: 'tanwin ḍamm' }
					] },
					{ id: 'link', kind: 'link', note: 'Harf nāsikh untuk kontras', tokens: [
						{ arabic: 'لَكِنَّ', gloss: 'tetapi', role: 'Harf nāsikh' }
					] },
					{ id: 'contrast', kind: 'contrast', note: 'Informasi pembanding', tokens: [
						{ arabic: 'الْخَطَّ', gloss: 'tulisannya', role: 'Ism lakinna', irab: 'nasb', marker: 'fatḥa' },
						{ arabic: 'كَبِيرٌ', gloss: 'besar', role: 'Khabar lakinna', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Buku itu kecil, tetapi tulisannya besar.',
				explanation: 'لَكِنَّ menashabkan الْخَطَّ; ini bukan sekadar tanda baca atau terjemahan “tetapi”.'
			},
			{
				id: 'but-lesson',
				spans: [
					{ id: 'main', kind: 'main', note: 'Keadaan awal', tokens: [
						{ arabic: 'الدَّرْسُ', gloss: 'pelajaran itu', role: 'Mubtada', irab: 'raf', marker: 'ḍamma' },
						{ arabic: 'طَوِيلٌ', gloss: 'panjang', role: 'Khabar', irab: 'raf', marker: 'tanwin ḍamm' }
					] },
					{ id: 'link', kind: 'link', note: 'Lakinna + dhamir sebagai ism-nya', tokens: [
						{ arabic: 'لَكِنَّهُ', gloss: 'tetapi itu', role: 'لَكِنَّ + dhamir ism' }
					] },
					{ id: 'contrast', kind: 'contrast', note: 'Khabar lakinna', tokens: [
						{ arabic: 'مُفِيدٌ', gloss: 'bermanfaat', role: 'Khabar lakinna', irab: 'raf', marker: 'tanwin ḍamm' }
					] }
				],
				translation: 'Pelajaran itu panjang, tetapi bermanfaat.',
				explanation: 'Dhamir ـهُ pada لَكِنَّهُ berfungsi sebagai ism lakinna; مُفِيدٌ tetap marfū‘.'
			}
		],
		exercise: {
			question: 'Pada لَكِنَّ الْخَطَّ كَبِيرٌ, apa yang dibuat manṣūb?',
			answer: 'الْخَطَّ, yakni ism لَكِنَّ.',
			reason: 'لَكِنَّ dengan tasydid adalah harf nāsikh yang bekerja seperti إِنَّ.'
		},
		sources: [coordination, un],
		reviewStatus: 'draft'
	},
	{
		id: 'adjuncts',
		title: 'Ḥāl, istitsnā’, dan tamyīz',
		arabicTerm: 'الْحَالُ وَالِاسْتِثْنَاءُ وَالتَّمْيِيزُ',
		summary: 'Pelengkap memberi keadaan, mengecualikan anggota kelompok, atau memperjelas ukuran/jumlah.',
		keyRule:
			'Ḥāl mufrad yang menerangkan keadaan umumnya manṣūb. Pada kalimat positif lengkap dengan إِلَّا, mustatsnā mansūb. Tamyīz bilangan 11–99, seperti كِتَابًا setelah عِشْرِينَ, lazim berupa isim tunggal manṣūb.',
		limitation: 'Aturan ini tidak universal: setelah negasi, pengecualian dapat memiliki alternatif i‘rab; ḥāl berbentuk kalimat serta tamyīz jenis lain juga memerlukan aturan tambahan.',
		examples: [
			{
				id: 'circumstance',
				spans: [
					{ id: 'main', kind: 'main', note: 'Peristiwa utama', tokens: [
						{ arabic: 'جَاءَ', gloss: 'telah datang', role: 'Fi‘il māḍī' },
						{ arabic: 'الطَّالِبُ', gloss: 'murid itu', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'hal', kind: 'circumstance', note: 'Keadaan saat kejadian', tokens: [
						{ arabic: 'مُبْتَسِمًا', gloss: 'sambil tersenyum', role: 'Ḥāl', irab: 'nasb', marker: 'tanwin fatḥ' }
					] }
				],
				translation: 'Murid itu datang sambil tersenyum.',
				explanation: 'مُبْتَسِمًا menyatakan keadaan subjek saat datang, bukan objek dari جَاءَ.'
			},
			{
				id: 'exception',
				spans: [
					{ id: 'main', kind: 'main', note: 'Pernyataan positif lengkap', tokens: [
						{ arabic: 'حَضَرَ', gloss: 'telah hadir', role: 'Fi‘il māḍī' },
						{ arabic: 'الطُّلَّابُ', gloss: 'para murid', role: 'Fā‘il', irab: 'raf', marker: 'ḍamma' }
					] },
					{ id: 'link', kind: 'link', note: 'Partikel pengecualian', tokens: [
						{ arabic: 'إِلَّا', gloss: 'kecuali', role: 'Adāt istitsnā’' }
					] },
					{ id: 'exception', kind: 'exception', note: 'Mustatsnā', tokens: [
						{ arabic: 'طَالِبًا', gloss: 'seorang murid', role: 'Mustatsnā', irab: 'nasb', marker: 'tanwin fatḥ' }
					] }
				],
				translation: 'Para murid hadir, kecuali seorang murid.',
				explanation: 'Dalam pernyataan positif lengkap, طَالِبًا menjadi mustatsnā manṣūb.'
			},
			{
				id: 'number-tamyiz',
				spans: [
					{ id: 'main', kind: 'main', note: 'Fi‘il dan bilangan', tokens: [
						{ arabic: 'اشْتَرَيْتُ', gloss: 'saya membeli', role: 'Fi‘il + subjek' },
						{ arabic: 'عِشْرِينَ', gloss: 'dua puluh', role: 'Bilangan; maf‘ūl bih', irab: 'nasb', marker: 'yā’' }
					] },
					{ id: 'spec', kind: 'specification', note: 'Penjelas bilangan', tokens: [
						{ arabic: 'كِتَابًا', gloss: 'buku', role: 'Tamyīz bilangan', irab: 'nasb', marker: 'tanwin fatḥ' }
					] }
				],
				translation: 'Saya membeli dua puluh buku.',
				explanation: 'كِتَابًا menjelaskan yang dihitung; setelah عِشْرِينَ, tamyīz berupa mufrad manṣūb.'
			}
		],
		exercise: {
			question: 'Apakah setiap frasa setelah إِلَّا pasti manṣūb?',
			answer: 'Tidak. Contoh positif lengkap ini manṣūb, tetapi kalimat negatif dan tak lengkap punya aturan lain.',
			reason: 'Jangan memindahkan kaidah pengecualian satu jenis kalimat ke semua struktur.'
		},
		sources: [ajurrumiyya],
		reviewStatus: 'draft'
	}
];

export function validateClauseRules(rules: readonly ClauseRule[]): string[] {
	const errors: string[] = [];
	const ruleIds = new Set<string>();
	for (const rule of rules) {
		if (ruleIds.has(rule.id)) errors.push('Duplicate rule: ' + rule.id);
		ruleIds.add(rule.id);
		if (rule.reviewStatus !== 'draft') errors.push('Unreviewed clause published: ' + rule.id);
		if (!rule.examples.length || !rule.sources.length || rule.sources.some((source) => !source.url.startsWith('https://')))
			errors.push('Missing examples or source: ' + rule.id);
		const exampleIds = new Set<string>();
		for (const example of rule.examples) {
			if (exampleIds.has(example.id)) errors.push('Duplicate example: ' + rule.id + '/' + example.id);
			exampleIds.add(example.id);
			if (!example.translation.trim() || !example.explanation.trim() || !example.spans.length)
				errors.push('Incomplete example: ' + rule.id + '/' + example.id);
			const spanIds = new Set<string>();
			for (const span of example.spans) {
				if (spanIds.has(span.id)) errors.push('Duplicate span: ' + rule.id + '/' + example.id + '/' + span.id);
				spanIds.add(span.id);
				if (!span.note.trim() || !span.tokens.length || !CLAUSE_SPAN_LABELS[span.kind])
					errors.push('Incomplete span: ' + rule.id + '/' + example.id + '/' + span.id);
				for (const token of span.tokens) {
					if (!token.arabic.trim() || !token.gloss.trim() || !token.role.trim())
						errors.push('Incomplete token: ' + rule.id + '/' + example.id + '/' + span.id);
					if (token.irab && token.mood)
						errors.push('Case/mood collision: ' + rule.id + '/' + example.id + '/' + span.id);
					if ((token.irab || token.mood) && !token.marker?.trim())
						errors.push('Missing sign: ' + rule.id + '/' + example.id + '/' + span.id);
					if (token.marker && !token.irab && !token.mood)
						errors.push('Sign without case/mood: ' + rule.id + '/' + example.id + '/' + span.id);
				}
			}
		}
	}
	return errors;
}
