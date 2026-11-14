/**
 * G-02: illustrative, source-traceable sharaf examples. Not a generic conjugator.
 * Arabic forms checked against source references; all Indonesian glosses and teaching
 * explanations are original. Nonpredictable Forms I stem vowels/masdars are lexical.
 */
export type SharafFormCategory = 'root' | 'past' | 'present' | 'imperative' | 'masdar' | 'agent' | 'patient';

export const SHARAF_FORM_LABELS: Record<SharafFormCategory, string> = {
	root: 'Akar / pola',
	past: 'Fi‘il māḍī',
	present: 'Fi‘il muḍāri‘',
	imperative: 'Fi‘il amr',
	masdar: 'Maṣdar',
	agent: 'Isim fā‘il',
	patient: 'Isim maf‘ūl'
};

export type SharafForm = {
	id: string;
	arabic: string;
	gloss: string;
	label: string;
	category: SharafFormCategory;
	/** Wazan is only supplied for the individually attested example. */
	pattern?: string;
	/** Dhamir disambiguates identical conjugations; don't infer from bare script. */
	pronoun?: { arabic: string; gloss: string };
};

export type SharafSection = {
	id: 'akar-dan-wazan' | 'tashrif-istilahi' | 'tashrif-lughawi';
	title: string;
	summary: string;
	rule: string;
	forms: readonly SharafForm[];
	note: string;
	exercise: { question: string; answer: string; reason: string };
	sources: readonly { name: string; url: string }[];
	reviewStatus: 'draft';
};

const dictionary = 'https://en.wiktionary.org/wiki/كتب';
const madinah = 'https://madinaharabic.com/free-content/grammar/lesson-28/part-2';
const openArabic = 'https://openarabic.org/kataba-conjugation/';
const corpus = 'https://corpus.quran.com/qurandictionary.jsp?root=ktb';

export const sharafSections: readonly SharafSection[] = [
	{
		id: 'akar-dan-wazan',
		title: 'Akar dan wazan bukan kata yang sama',
		summary: 'Akar ك ت ب menghubungkan keluarga makna tulis, sedangkan wazan menjelaskan susunan dan vokal bentuk kata.',
		rule:
			'Pada fi‘il tsulātsī mujarrad (Form I), akar memiliki tiga konsonan asal. Pasangan vokal māḍī–muḍāri‘ harus dicatat dari kamus: melihat كَتَبَ saja tidak cukup untuk memastikan يَكْتُبُ.',
		forms: [
			{ id: 'root-k-t-b', arabic: 'ك ت ب', gloss: 'makna dasar: tulis', label: 'Akar tiga huruf', category: 'root' },
			{ id: 'wazan-past', arabic: 'كَتَبَ', gloss: 'dia telah menulis', label: 'Pola فَعَلَ', category: 'past', pattern: 'فَعَلَ' },
			{ id: 'wazan-present', arabic: 'يَكْتُبُ', gloss: 'dia menulis', label: 'Pola يَفْعُلُ', category: 'present', pattern: 'يَفْعُلُ' }
		],
		note:
			'Urutan vokal a–u merupakan sifat leksikal pasangan كَتَبَ / يَكْتُبُ, bukan hukum bahwa setiap akar فَعَلَ selalu berubah menjadi يَفْعُلُ. Akar kata serapan tidak wajib dipaksakan menjadi tiga konsonan.',
		exercise: {
			question: 'Jika hanya mengetahui bentuk كَتَبَ, bolehkah kita selalu menebak vokal muḍāri‘ dari satu rumus?',
			answer: 'Tidak; cari pasangan māḍī–muḍāri‘ pada kamus atau tabel yang bersumber.',
			reason: 'Form I mempunyai beberapa bab vokal. Contoh كَتَبَ / يَكْتُبُ tidak membuktikan semua verba mempunyai pasangan vokal yang sama.'
		},
		sources: [
			{ name: 'Wiktionary — entri كَتَبَ dan konjugasi', url: dictionary },
			{ name: 'Quranic Arabic Corpus — akar ك ت ب (bahasa Qur’ani)', url: corpus },
			{ name: 'OpenArabic — contoh pola kātaba/kataba Form I', url: openArabic }
		],
		reviewStatus: 'draft'
	},
	{
		id: 'tashrif-istilahi',
		title: 'Tashrif istilahi: satu akar, beberapa fungsi',
		summary: 'Dari kata kerja lampau ke bentuk nonlampau, perintah, kegiatan, pelaku, dan objek perbuatan.',
		rule:
			'Tashrif istilahi menunjukkan jenis bentuk (ṣīghah) dan hubungan derivasi. Bentuk maṣdar untuk Form I sering harus dicatat secara leksikal; beberapa lema memiliki lebih dari satu maṣdar.',
		forms: [
			{ id: 'ist-past', arabic: 'كَتَبَ', gloss: 'dia telah menulis', label: 'Perbuatan lampau', category: 'past', pattern: 'فَعَلَ' },
			{ id: 'ist-present', arabic: 'يَكْتُبُ', gloss: 'dia menulis', label: 'Perbuatan nonlampau', category: 'present', pattern: 'يَفْعُلُ' },
			{ id: 'ist-amr', arabic: 'اُكْتُبْ', gloss: 'tulislah!', label: 'Perintah untuk أنتَ', category: 'imperative', pattern: 'اُفْعُلْ' },
			{ id: 'ist-masdar', arabic: 'كِتَابَةٌ', gloss: 'kegiatan menulis', label: 'Maṣdar yang tercatat', category: 'masdar' },
			{ id: 'ist-fa-il', arabic: 'كَاتِبٌ', gloss: 'penulis', label: 'Pelaku kegiatan', category: 'agent', pattern: 'فَاعِلٌ' },
			{ id: 'ist-maf-ul', arabic: 'مَكْتُوبٌ', gloss: 'yang ditulis', label: 'Hasil / yang dikenai', category: 'patient', pattern: 'مَفْعُولٌ' }
		],
		note:
			'Isim fā‘il dan maf‘ūl ditampilkan dengan harakat rafa‘ + tanwin sebagai contoh bentuk berdiri sendiri. I‘rab akhirnya berubah sesuai posisi dalam kalimat. Bentuk seperti كِتَابَةٌ tidak boleh digeneralisasi sebagai maṣdar setiap fi‘il.',
		exercise: {
			question: 'Bentuk mana yang menunjuk orang yang menulis dan bentuk mana yang menunjuk sesuatu yang ditulis?',
			answer: 'كَاتِبٌ = penulis; مَكْتُوبٌ = yang ditulis.',
			reason: 'Isim fā‘il dan isim maf‘ūl menyatakan peran berbeda; makna detail tetap bergantung pada lema dan konteks.'
		},
		sources: [
			{ name: 'OpenArabic — bentuk dan maṣdar كَتَبَ', url: openArabic },
			{ name: 'Wiktionary — konjugasi dan turunan كَتَبَ', url: dictionary },
			{ name: 'Quranic Arabic Corpus — isim fā‘il/maf‘ūl dari ك ت ب', url: corpus }
		],
		reviewStatus: 'draft'
	},
	{
		id: 'tashrif-lughawi',
		title: 'Tashrif lughawi: berubah mengikuti dhamir',
		summary: 'Bandingkan bagaimana satu fi‘il mengikuti orang yang berbicara, diajak bicara, atau dibicarakan.',
		rule:
			'Fi‘il māḍī umumnya menunjukkan subjek melalui akhirannya, sedangkan muḍāri‘ memakai awalan dan/atau akhiran. Harakat akhir muḍāri‘ dalam contoh berikut adalah keadaan marfū‘ (indikatif), bukan selalu tetap dalam semua kalimat.',
		forms: [
			{ id: 'lug-he-past', arabic: 'كَتَبَ', gloss: 'dia (lk) telah menulis', label: 'Lampau · orang ketiga', category: 'past', pronoun: { arabic: 'هُوَ', gloss: 'dia (lk)' } },
			{ id: 'lug-she-past', arabic: 'كَتَبَتْ', gloss: 'dia (pr) telah menulis', label: 'Lampau · orang ketiga', category: 'past', pronoun: { arabic: 'هِيَ', gloss: 'dia (pr)' } },
			{ id: 'lug-i-past', arabic: 'كَتَبْتُ', gloss: 'saya telah menulis', label: 'Lampau · orang pertama', category: 'past', pronoun: { arabic: 'أَنَا', gloss: 'saya' } },
			{ id: 'lug-you-past', arabic: 'كَتَبْتَ', gloss: 'kamu (lk) telah menulis', label: 'Lampau · orang kedua', category: 'past', pronoun: { arabic: 'أَنْتَ', gloss: 'kamu (lk)' } },
			{ id: 'lug-he-present', arabic: 'يَكْتُبُ', gloss: 'dia (lk) menulis', label: 'Nonlampau · orang ketiga', category: 'present', pronoun: { arabic: 'هُوَ', gloss: 'dia (lk)' } },
			{ id: 'lug-she-present', arabic: 'تَكْتُبُ', gloss: 'dia (pr) menulis', label: 'Nonlampau · orang ketiga', category: 'present', pronoun: { arabic: 'هِيَ', gloss: 'dia (pr)' } },
			{ id: 'lug-you-present', arabic: 'تَكْتُبُ', gloss: 'kamu (lk) menulis', label: 'Nonlampau · orang kedua', category: 'present', pronoun: { arabic: 'أَنْتَ', gloss: 'kamu (lk)' } },
			{ id: 'lug-i-present', arabic: 'أَكْتُبُ', gloss: 'saya menulis', label: 'Nonlampau · orang pertama', category: 'present', pronoun: { arabic: 'أَنَا', gloss: 'saya' } },
			{ id: 'lug-we-present', arabic: 'نَكْتُبُ', gloss: 'kami / kita menulis', label: 'Nonlampau · orang pertama jamak', category: 'present', pronoun: { arabic: 'نَحْنُ', gloss: 'kami / kita' } }
		],
		note:
			'تَكْتُبُ dapat berarti “dia perempuan menulis” atau “kamu laki-laki menulis”; dhamir dan konteks membedakannya. Di sini hanya ditampilkan sebagian paradigma untuk belajar perbedaan dasar; tabel lengkap memerlukan bentuk ganda/jamak dan kasus fi‘il lain.',
		exercise: {
			question: 'Mengapa تَكْتُبُ muncul dua kali dengan arti pelaku berbeda?',
			answer: 'Karena bentuk muḍāri‘ tersebut dipakai untuk هِيَ dan أَنْتَ.',
			reason: 'Satu bentuk tertulis dapat memiliki lebih dari satu analisis subjek; baca dhamir/konteks sebelum menerjemahkan.'
		},
		sources: [
			{ name: 'Madinah Arabic — lesson 28, māḍī/muḍāri‘/amr per dhamir', url: madinah },
			{ name: 'OpenArabic — tabel konjugasi kata كَتَبَ', url: openArabic }
		],
		reviewStatus: 'draft'
	}
];

export function validateSharafSections(sections: readonly SharafSection[]): string[] {
	const errors: string[] = [];
	const seen = new Set<string>();
	for (const section of sections) {
		if (seen.has(section.id)) errors.push(`Duplicate section: ${section.id}`);
		seen.add(section.id);
		if (!section.sources.length || !section.sources.every((s) => /^https:\/\//.test(s.url)))
			errors.push(`Missing source: ${section.id}`);
		if (!section.forms.length) errors.push(`No forms: ${section.id}`);
		const ids = new Set<string>();
		for (const form of section.forms) {
			if (ids.has(form.id)) errors.push(`Duplicate form: ${section.id}/${form.id}`);
			ids.add(form.id);
			if (!form.arabic.trim() || !form.gloss.trim() || !form.label.trim())
				errors.push(`Missing form/gloss/label: ${section.id}/${form.id}`);
			if (form.pronoun && (!form.pronoun.arabic.trim() || !form.pronoun.gloss.trim()))
				errors.push(`Missing pronoun gloss: ${section.id}/${form.id}`);
		}
	}
	return errors;
}
