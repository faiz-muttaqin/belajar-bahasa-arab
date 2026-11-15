/**
 * Multiple, independent classification axes: do NOT present them as one
 * mutually exclusive list of "types". Learners need the difference between
 * lexical category, morphological derivation, syntax and inflection.
 *
 * Original Indonesian teaching prose; content remains draft until teacher review.
 */
import type { TashrifColumnKey } from '#lib/domain/sharaf/matrix.js';

type Entry = {
	title: string;
	arabic: string;
	meaning: string;
	explanation: string;
	form?: TashrifColumnKey;
};
type Axis = {
	id: string;
	heading: string;
	intro: string;
	entries: readonly Entry[];
	note?: string;
};
export type WordClassGuide = {
	id: 'isim' | 'fiil';
	lead: string;
	warning: string;
	axes: readonly Axis[];
	references: readonly { label: string; url: string }[];
	reviewStatus: 'draft';
};

const ajurrumiyyah = {
	label: 'Al-Ājurrūmiyyah — pembagian isim, fi‘il, ḥarf, dan bab fi‘il',
	url: 'https://ar.wikisource.org/wiki/الآجرومية_في_النحو'
};
const ryding = {
	label: 'Ryding — A Reference Grammar of Modern Standard Arabic, noun types and verb system',
	url: 'https://imamhamzatcoed.edu.ng/library/ebooks/resources/Modern_Standard_Arabic_Reference_Grammar.pdf'
};
const indonesian = {
	label: 'Abdul Basith — Klasifikasi kata dalam bahasa Arab menurut linguis Arab klasik dan modern (Adabiyyāt, 2009)',
	url: 'https://download.garuda.kemdikbud.go.id/article.php?article=827519&title=KLASIFIKASI+KATA+DALAM+BAHASA+ARAB+MENURUT+LINGUIS+ARAB+KLASIK+DAN+MODERN&val=13440'
};

export const wordClassGuides: Record<'isim' | 'fiil', WordClassGuide> = {
	isim: {
		id: 'isim',
		lead: 'Dalam tata bahasa Arab tradisional, isim jauh lebih luas daripada “kata benda”: nama orang, kata sifat, kata ganti, kata tunjuk, dan banyak kata keterangan dapat termasuk isim. Cara mengelompokkannya bergantung pada pertanyaan yang sedang dijawab.',
		warning: 'Jangan menjumlahkan kelompok di bawah sebagai jumlah jenis isim yang saling terpisah. Sebuah kata bisa sekaligus isim musytaq, isim fā‘il, mufrad, mudzakkar, nakirah dan marfū‘.',
		axes: [
			{
				id: 'isim-makna',
				heading: '1. Berdasarkan arti dan jenis rujukan',
				intro: 'Ini membantu mengenali apa yang ditunjuk oleh sebuah kata, bukan bagaimana bentuk i‘rabnya.',
				entries: [
					{ title: 'Isim benda / nama jenis', arabic: 'كِتَابٌ', meaning: 'sebuah buku', explanation: 'Menamai benda konkret. Banyak kata seperti بَيْتٌ (rumah) dan مَاءٌ (air) dipelajari sebagai lema leksikal.' },
					{ title: 'Isim ‘alam (nama diri)', arabic: 'مُحَمَّدٌ', meaning: 'Muhammad', explanation: 'Nama diri tertentu; dapat bersifat ma‘rifah meskipun tanpa الْـ.' },
					{ title: 'Sifat / na‘at sebagai jenis kata', arabic: 'كَبِيرٌ', meaning: 'besar', explanation: 'Sifat dalam bahasa Arab lazim termasuk isim; na‘at adalah fungsi sifat ketika menerangkan kata lain.' },
					{ title: 'Ḍamīr (kata ganti)', arabic: 'هُوَ', meaning: 'dia (laki-laki)', explanation: 'Kata ganti termasuk isim dalam pembagian tradisional. Sebagian besar bentuknya mabnī dan tidak menerima i‘rab seperti nomina biasa.' },
					{ title: 'Isim isyārah (kata tunjuk)', arabic: 'هَذَا', meaning: 'ini (maskulin)', explanation: 'Menunjuk sesuatu dalam konteks; bentuknya tidak sekadar “nomina benda”.' },
					{ title: 'Isim mawṣūl (kata relatif)', arabic: 'الَّذِي', meaning: 'yang (maskulin tunggal)', explanation: 'Menghubungkan referen dengan klausa penjelas (ṣilah) dalam susunan tertentu.' }
				]
			},
			{
				id: 'isim-asal',
				heading: '2. Berdasarkan asal dan pembentukan kata',
				intro: 'Pertanyaannya: apakah kata bersifat leksikal dasar (jāmid) atau turunan dengan pola (musytaq)? Pembagian ini tidak identik dengan jenis benda/sifat.',
				entries: [
					{ title: 'Isim jāmid (non-turunan pada analisis ini)', arabic: 'بَيْتٌ', meaning: 'rumah', explanation: 'Tidak otomatis diturunkan dari pola pelaku/objek sebuah verba.' },
					{ title: 'Maṣdar (nomina peristiwa)', arabic: 'كِتَابَةٌ', meaning: 'penulisan', explanation: 'Menyebut perbuatan tanpa bentuk waktu verbal.', form: 'mashdar' },
					{ title: 'Maṣdar mīmī', arabic: 'مَدْخَلٌ', meaning: 'masuknya / pintu masuk', explanation: 'Memiliki mīm tambahan pada sejumlah pola; makna tindakan atau tempat perlu dibedakan lewat konteks.', form: 'mimi' },
					{ title: 'Isim fā‘il (bentuk pelaku)', arabic: 'كَاتِبٌ', meaning: 'penulis', explanation: 'Jenis bentuk turunan, bukan otomatis peran fā‘il dalam sebuah kalimat.', form: 'fail' },
					{ title: 'Isim maf‘ūl (bentuk terkena aksi)', arabic: 'مَكْتُوبٌ', meaning: 'yang ditulis', explanation: 'Jenis bentuk turunan, bukan otomatis objek maf‘ūl bih.', form: 'maful' },
					{ title: 'Isim zamān', arabic: 'مَوْعِدٌ', meaning: 'waktu yang dijanjikan', explanation: 'Berhubungan dengan waktu terjadinya suatu hal.', form: 'zaman' },
					{ title: 'Isim makān', arabic: 'مَلْعَبٌ', meaning: 'lapangan bermain', explanation: 'Menamai tempat yang terkait tindakan.', form: 'makan' },
					{ title: 'Isim ālah', arabic: 'مِفْتَاحٌ', meaning: 'kunci', explanation: 'Menamai alat; banyak bentuk mempunyai pemakaian leksikal yang perlu dicek.', form: 'alah' },
					{ title: 'Ṣifah musyabbahah', arabic: 'كَرِيمٌ', meaning: 'mulia / dermawan', explanation: 'Sifat yang cenderung menggambarkan kualitas relatif menetap; tidak setiap فَعِيل memiliki analisis sama.' },
					{ title: 'Isim tafḍīl', arabic: 'أَكْبَرُ', meaning: 'lebih besar / terbesar', explanation: 'Bentuk perbandingan yang berkaitan dengan pola أَفْعَل dalam konteks sesuai.' },
					{ title: 'Ṣīghah mubālaghah', arabic: 'غَفَّارٌ', meaning: 'maha pengampun / sering mengampuni (menurut konteks)', explanation: 'Pola intensif tidak boleh diasumsikan menghasilkan kata lazim dari setiap akar.' }
				],
				note: 'Contoh ini bukan inventaris seluruh kategori turunan: masih ada isim marrah, isim hay’ah, nisbah, taṣghīr dan kategori leksikal lain untuk pembahasan berikutnya.'
			},
			{
				id: 'isim-ketetapan',
				heading: '3. Berdasarkan ketentuan rujukan',
				intro: 'Kategori ini berlaku lintas jenis leksikal maupun pola turunan.',
				entries: [
					{ title: 'Nakirah (belum tertentu)', arabic: 'كِتَابٌ', meaning: 'sebuah buku', explanation: 'Contoh nakirah munṣarif dengan tanwin. Tidak semua nakirah harus mempunyai tanwin.' },
					{ title: 'Ma‘rifah (tertentu)', arabic: 'الْكِتَابُ', meaning: 'buku itu', explanation: 'الـ adalah salah satu cara menjadikan nomina tertentu; nama diri dan kata ganti juga bisa ma‘rifah.' },
					{ title: 'Ma‘rifah melalui iḍāfah', arabic: 'كِتَابُ الطَّالِبِ', meaning: 'buku murid itu', explanation: 'Muḍāf pertama tidak memiliki tanwin; ketentuan frasa terkait dengan muḍāf ilaih.' }
				]
			},
			{
				id: 'isim-perubahan',
				heading: '4. Berdasarkan gender, jumlah dan i‘rab',
				intro: 'Ini merupakan atribut yang dapat dimiliki kata yang sama, bukan “jenis isim” yang terpisah dari isim fā‘il atau maṣdar.',
				entries: [
					{ title: 'Mudzakkar / mu’annats', arabic: 'طَالِبٌ — طَالِبَةٌ', meaning: 'murid laki-laki — murid perempuan', explanation: 'Gender gramatikal; tidak selalu menandai jenis kelamin biologis benda atau orang.' },
					{ title: 'Mufrad / mutsannā / jamak', arabic: 'كِتَابٌ — كِتَابَانِ — كُتُبٌ', meaning: 'buku — dua buku — buku-buku', explanation: 'Jumlah tunggal, dua, dan plural. Bentuk jamak bisa salim atau taksir (pecah pola).' },
					{ title: 'Mu‘rab (akhir berubah sesuai peran)', arabic: 'الْكِتَابُ — الْكِتَابَ — الْكِتَابِ', meaning: 'buku itu (rafa‘, naṣb, jarr)', explanation: 'Contoh dasar dengan kasus berbeda pada kata yang sama.' },
					{ title: 'Mabnī (bentuk tetap)', arabic: 'هَذَا', meaning: 'ini', explanation: 'Akhir kata tertentu tetap pada banyak posisi; status i‘rabnya dibahas sebagai mahal, bukan perubahan harakat tampak.' }
				],
				note: 'Dalam jamak tidak berakal, pola kesesuaian sifat sering memakai feminin tunggal. Pada mamnū‘ min aṣ-ṣarf, aturan tanwin dan jarr juga mempunyai pengecualian.'
			}
		],
		references: [ajurrumiyyah, ryding, indonesian], reviewStatus: 'draft'
	},
	fiil: {
		id: 'fiil',
		lead: 'Fi‘il mengungkap tindakan atau keadaan dan memiliki struktur waktu/aspek serta penandaan pelaku. Satu verba dapat dianalisis menurut bentuk waktu, kelas akar, jumlah huruf tambahan, transitivitas, dan bentuk aktif/pasif sekaligus.',
		warning: 'Māḍī, muḍāri‘ dan amr adalah pengelompokan berdasarkan bentuk/waktu atau fungsi. Mujarrad/mazīd, ṣaḥīḥ/mu‘tal, lāzim/muta‘addī, dan ma‘lūm/majhūl adalah sudut analisis lain—bukan jenis fi‘il keempat hingga kesepuluh.',
		axes: [
			{
				id: 'fiil-bentuk',
				heading: '1. Bentuk utama berdasarkan waktu/fungsi',
				intro: 'Tiga bentuk utama fi‘il dalam nahwu tradisional dan susunan larangan yang berkaitan dengannya.',
				entries: [
					{ title: 'Fi‘il māḍī', arabic: 'كَتَبَ', meaning: 'telah menulis', explanation: 'Bentuk verba yang biasanya menyajikan tindakan sebagai telah berlangsung.', form: 'madhi' },
					{ title: 'Fi‘il muḍāri‘', arabic: 'يَكْتُبُ', meaning: 'menulis / sedang menulis', explanation: 'Bentuk nonlampau atau kebiasaan; mood bisa berubah menurut partikel.', form: 'mudhari' },
					{ title: 'Fi‘il amr', arabic: 'اُكْتُبْ', meaning: 'tulislah!', explanation: 'Bentuk verba perintah positif untuk lawan bicara.', form: 'amr' },
					{ title: 'Nahy (larangan)', arabic: 'لَا تَكْتُبْ', meaning: 'jangan menulis!', explanation: 'Bukan fi‘il keempat: gabungan لَا الناهية dengan muḍāri‘ majzūm.', form: 'nahy' }
				]
			},
			{
				id: 'fiil-bab',
				heading: '2. Berdasarkan struktur akar dan tambahan huruf',
				intro: 'Akar dan pola membantu mengelompokkan verba; 22 kelompok dalam tabel proyek bukan 22 jenis kata.',
				entries: [
					{ title: 'Tsulātsī mujarrad', arabic: 'كَتَبَ — يَكْتُبُ', meaning: 'menulis', explanation: 'Tiga huruf akar tanpa tambahan derivasi pada pola dasar. Enam bab tradisional membedakan pola māḍī–muḍāri‘.' },
					{ title: 'Tsulātsī mazīd', arabic: 'عَلَّمَ — يُعَلِّمُ', meaning: 'mengajar', explanation: 'Bentuk yang dikembangkan dengan tambahan fonologis/morfologis, termasuk tasydid; tiap pola mempunyai fungsi yang tidak selalu identik.' },
					{ title: 'Rubā‘ī', arabic: 'دَحْرَجَ — يُدَحْرِجُ', meaning: 'menggelindingkan', explanation: 'Bentuk dengan empat huruf akar; mempunyai pola dasar dan pola mazīd tersendiri.' }
				],
				note: 'Jangan menentukan bab dari tiga konsonan saja. Untuk tsulātsī mujarrad, pasangan māḍī–muḍāri‘ dan pemakaian kamus adalah data penting.'
			},
			{
				id: 'fiil-kesehatan-akar',
				heading: '3. Berdasarkan bentuk akar: ṣaḥīḥ dan mu‘tal',
				intro: 'Kelas ini memengaruhi perubahan huruf dalam tashrif.',
				entries: [
					{ title: 'Ṣaḥīḥ sālim', arabic: 'كَتَبَ', meaning: 'menulis', explanation: 'Contoh akar tanpa huruf ‘illat, hamzah asli, atau penggandaan akar.' },
					{ title: 'Mahmūz', arabic: 'قَرَأَ', meaning: 'membaca', explanation: 'Salah satu konsonan akar berupa hamzah. Perubahan ejaan atau bentuk tidak otomatis menjadikannya tak beraturan.' },
					{ title: 'Muḍā‘af', arabic: 'مَدَّ', meaning: 'memanjangkan', explanation: 'Penggandaan konsonan akar perlu perhatian pada tashrif dan tasydid.' },
					{ title: 'Mu‘tal mithāl', arabic: 'وَعَدَ — يَعِدُ', meaning: 'berjanji', explanation: 'Huruf ‘illat pada posisi awal akar.' },
					{ title: 'Mu‘tal ajwaf', arabic: 'قَالَ — يَقُولُ', meaning: 'berkata', explanation: 'Huruf ‘illat pada posisi tengah akar; lihat قُلْ dalam perintah.' },
					{ title: 'Mu‘tal nāqiṣ', arabic: 'دَعَا — يَدْعُو', meaning: 'memanggil / berdoa', explanation: 'Huruf ‘illat pada posisi akhir akar.' }
				],
				note: 'Kata kerja dengan lebih dari satu ciri khusus (misalnya lafīf atau campuran hamzah dan ‘illat) membutuhkan pembahasan lanjutan dan contoh teruji.'
			},
			{
				id: 'fiil-objek',
				heading: '4. Berdasarkan objek dan bentuk aktif/pasif',
				intro: 'Makna dan sintaksis bisa memengaruhi apakah sebuah kata kerja membutuhkan atau menerima objek.',
				entries: [
					{ title: 'Lāzim (intransitif)', arabic: 'جَلَسَ', meaning: 'duduk', explanation: 'Tidak mengambil maf‘ūl bih langsung pada penggunaan dasar ini; masih bisa memiliki keterangan atau frasa preposisional.' },
					{ title: 'Muta‘addī (transitif)', arabic: 'فَتَحَ الْوَلَدُ الْبَابَ', meaning: 'anak itu membuka pintu', explanation: 'الْبَابَ adalah objek langsung dari فَتَحَ.' },
					{ title: 'Ma‘lūm (aktif)', arabic: 'كَتَبَ الطَّالِبُ الدَّرْسَ', meaning: 'murid itu menulis pelajaran', explanation: 'Pelaku disebut secara eksplisit.' },
					{ title: 'Majhūl (pasif)', arabic: 'كُتِبَ الدَّرْسُ', meaning: 'pelajaran itu ditulis', explanation: 'Pola pasif māḍī; الدَّرْسُ berfungsi sebagai nā’ib al-fā‘il, bukan fā‘il aktif.' }
				],
				note: 'Sebagian verba berubah transitivitas menurut makna dan konstruksi. Jangan menentukan pasif hanya dari urutan kata tanpa tanda bentuk dan konteks.'
			},
			{
				id: 'fiil-mood',
				heading: '5. Muḍāri‘ berdasarkan mood (i‘rab)',
				intro: 'Māḍī dan amr umumnya dibahas sebagai mabnī pada level dasar; muḍāri‘ sering menerima tanda rafa‘, naṣb dan jazm.',
				entries: [
					{ title: 'Marfū‘', arabic: 'يَكْتُبُ', meaning: 'ia menulis', explanation: 'Contoh umum tanpa partikel yang menashabkan atau menjazmkan.' , form: 'mudhari'},
					{ title: 'Manṣūb', arabic: 'لَنْ يَكْتُبَ', meaning: 'ia tidak akan menulis', explanation: 'لَنْ diikuti muḍāri‘ manṣūb.' , form: 'mudhari'},
					{ title: 'Majzūm', arabic: 'لَمْ يَكْتُبْ', meaning: 'ia tidak menulis pada masa lampau', explanation: 'لَمْ menjazmkan muḍāri‘.' , form: 'mudhari'}
				],
				note: 'Tanda rafa‘/naṣb/jazm tidak selalu satu harakat: verba lemah dan al-af‘āl al-khamsah mempunyai bentuk penanda lain.'
			}
		],
		references: [ajurrumiyyah, ryding, indonesian], reviewStatus: 'draft'
	}
};

export function validateWordClassGuides(): string[] {
	const errors: string[] = [];
	for (const [id, guide] of Object.entries(wordClassGuides)) {
		if (guide.id !== id || guide.axes.length < 4) errors.push('Guide tidak lengkap: ' + id);
		const seen = new Set<string>();
		for (const axis of guide.axes) {
			if (seen.has(axis.id)) errors.push('Bagian berulang: ' + axis.id);
			seen.add(axis.id);
			if (axis.entries.length < 2) errors.push('Contoh tidak cukup: ' + axis.id);
			for (const entry of axis.entries) {
				if (!entry.arabic || !entry.meaning || !entry.explanation)
					errors.push('Entri belum lengkap: ' + axis.id + '/' + entry.title);
			}
		}
		if (guide.reviewStatus !== 'draft' || !guide.references.length)
			errors.push('Status atau sumber belum cukup: ' + id);
	}
	return errors;
}
