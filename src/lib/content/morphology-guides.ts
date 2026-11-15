/**
 * Source-linked learning guides for the ELEVEN EXISTING tashrif columns.
 * These describe teaching categories, not a universal morphology generator.
 * Explanations and illustrative forms are draft pending teacher review.
 */
import { tashrifColumns, type TashrifColumnKey } from '#lib/domain/sharaf/matrix.js';

type Example = { arabic: string; gloss: string; observation: string };
type Section = { heading: string; text: string };
type Reference = { label: string; url: string };

export type MorphologyGuide = {
	key: TashrifColumnKey;
	title: string;
	arabic: string;
	group: 'fiil' | 'isim';
	summary: string;
	question: string;
	distinction: string;
	examples: readonly Example[];
	sections: readonly Section[];
	watchOut: readonly string[];
	related: readonly TashrifColumnKey[];
	references: readonly Reference[];
	reviewStatus: 'draft';
};

const ajurrumiyyah: Reference = {
	label: 'Matn al-Ājurrūmiyyah — pembagian kata, fi‘il, dan i‘rab',
	url: 'https://ar.wikisource.org/wiki/الآجرومية_في_النحو'
};
const ryding: Reference = {
	label:
		'Karin C. Ryding — A Reference Grammar of Modern Standard Arabic, bab 5–7 dan pembahasan verba',
	url: 'https://imamhamzatcoed.edu.ng/library/ebooks/resources/Modern_Standard_Arabic_Reference_Grammar.pdf'
};
const madinah: Reference = {
	label: 'Madinah Arabic — pelajaran tata bahasa Arab',
	url: 'https://madinaharabic.com/free-content/grammar'
};

export const morphologyGuides: Record<TashrifColumnKey, MorphologyGuide> = {
	madhi: {
		key: 'madhi',
		title: 'Fi‘il māḍī',
		arabic: 'الْفِعْلُ الْمَاضِي',
		group: 'fiil',
		summary:
			'Bentuk verba yang pada penggunaan dasarnya menyajikan peristiwa sebagai sudah terjadi atau selesai.',
		question: 'Apakah tindakan diceritakan sebagai telah terjadi?',
		distinction:
			'Māḍī adalah bentuk fi‘il, bukan isim maupun penanda waktu yang berdiri sendiri. Makna tepatnya dipengaruhi konteks.',
		examples: [
			{
				arabic: 'كَتَبَ',
				gloss: 'ia (laki-laki) menulis / telah menulis',
				observation: 'Lema verba كَتَبَ, pelaku ketiga tunggal maskulin.'
			},
			{
				arabic: 'كَتَبْتُ',
				gloss: 'aku telah menulis',
				observation: 'Akhiran تُ memberi petunjuk bahwa pelakunya orang pertama tunggal.'
			},
			{
				arabic: 'فَتَحَ الْوَلَدُ الْبَابَ',
				gloss: 'Anak laki-laki itu membuka pintu.',
				observation: 'فَتَحَ adalah verba; الْوَلَدُ berfungsi sebagai pelaku.'
			}
		],
		sections: [
			{
				heading: 'Bentuk dasar dan pelaku',
				text: 'Dalam kamus, māḍī sering dikutip sebagai bentuk orang ketiga laki-laki tunggal. Bandingkan كَتَبَ, كَتَبْتُ, dan كَتَبُوا: bentuk kata ikut menandai orang dan jumlah pelaku.'
			},
			{
				heading: 'Masa, aspek, dan konteks',
				text: 'Terjemahan “sudah” berguna sebagai petunjuk awal, bukan satu-satunya makna māḍī. Dalam doa, persyaratan, atau gaya sastra, waktu yang dimaksud tidak selalu sekadar masa lampau.'
			},
			{
				heading: 'Kaitannya dengan wazan',
				text: 'Pasangan māḍī–muḍāri‘ membantu mengidentifikasi bab verba triliteral dasar. Tidak aman menetapkan bab hanya dari tiga konsonan akar atau dari satu ejaan tanpa pasangan leksikal.'
			}
		],
		watchOut: [
			'Jangan menyamakan semua akhiran māḍī dengan i‘rab isim.',
			'Bentuk bersufiks menunjukkan pelaku yang berbeda; jangan mengganti tanpa memeriksa dhamir.'
		],
		related: ['mudhari', 'amr', 'mashdar'],
		references: [ajurrumiyyah, ryding],
		reviewStatus: 'draft'
	},
	mudhari: {
		key: 'mudhari',
		title: 'Fi‘il muḍāri‘',
		arabic: 'الْفِعْلُ الْمُضَارِعُ',
		group: 'fiil',
		summary:
			'Bentuk verba yang biasa digunakan untuk tindakan kini, kebiasaan, atau masa depan, tergantung konteks dan partikel.',
		question: 'Apa yang berubah ketika يَكْتُبُ didahului لَمْ atau لَنْ?',
		distinction:
			'Muḍāri‘ tetap bentuk verba yang sama secara kategori meskipun akhir katanya berubah menurut ‘āmil.',
		examples: [
			{
				arabic: 'يَكْتُبُ',
				gloss: 'ia menulis / sedang menulis',
				observation: 'Contoh marfū‘ dasar dengan akhiran ḍamma.'
			},
			{
				arabic: 'لَنْ يَكْتُبَ',
				gloss: 'ia tidak akan menulis',
				observation: 'لَنْ menyebabkan muḍāri‘ manṣūb; contoh ini berakhir fatḥa.'
			},
			{
				arabic: 'لَمْ يَكْتُبْ',
				gloss: 'ia tidak menulis (pada waktu lampau)',
				observation: 'لَمْ menyebabkan muḍāri‘ majzūm; contoh ini berakhir sukūn.'
			}
		],
		sections: [
			{
				heading: 'Tiga keadaan i‘rab dasar',
				text: 'Muḍāri‘ yang mu‘rab dapat marfū‘, manṣūb, atau majzūm. Untuk verba sehat tunggal, bentuk akhirnya sering tampak sebagai -u, -a, atau sukūn; verba lemah dan af‘āl khamsah mempunyai tanda berbeda.'
			},
			{
				heading: 'Awalan dan identitas pelaku',
				text: 'Awalan seperti أَ، نَ، يَ، تَ berhubungan dengan bentuk muḍāri‘ dan pelakunya. Awalan saja tidak cukup untuk menyimpulkan analisis sebuah kata tanpa konteks.'
			},
			{
				heading: 'Perbedaan dengan fi‘il māḍī',
				text: 'كَتَبَ dan يَكْتُبُ berbagi akar ك ت ب, tetapi berbeda bentuk dan cara menyatakan tindakan. Pada fi‘il tsulātsī mujarrad, vokal muḍāri‘ harus diketahui dari data leksikal.'
			}
		],
		watchOut: [
			'Jangan membaca setiap muḍāri‘ sebagai “sedang”; konteks dapat berarti kebiasaan atau masa depan.',
			'Tanda sukun bukan satu-satunya penanda jazm pada seluruh paradigma.'
		],
		related: ['madhi', 'amr', 'nahy'],
		references: [ajurrumiyyah, ryding],
		reviewStatus: 'draft'
	},
	mashdar: {
		key: 'mashdar',
		title: 'Maṣdar',
		arabic: 'الْمَصْدَرُ',
		group: 'isim',
		summary:
			'Nomina yang menyatakan nama perbuatan atau kejadian tanpa mengandung waktu gramatikal verba.',
		question: 'Apa bedanya “menulis” sebagai tindakan dan “penulisan” sebagai nama kegiatan?',
		distinction: 'Maṣdar tergolong ISIM secara gramatikal, walaupun berhubungan erat dengan verba.',
		examples: [
			{
				arabic: 'كَتَبَ — كِتَابَةٌ',
				gloss: 'telah menulis — penulisan',
				observation: 'كَتَبَ verba; كِتَابَةٌ adalah maṣdar yang menamai kegiatannya.'
			},
			{
				arabic: 'فَتَحَ — فَتْحٌ',
				gloss: 'telah membuka — pembukaan',
				observation: 'Dua kata dari keluarga akar ف ت ح dengan kelas berbeda.'
			},
			{
				arabic: 'نَصَرَ — نَصْرٌ',
				gloss: 'telah menolong — pertolongan',
				observation: 'Pola maṣdar tidak bisa dipastikan hanya dari satu pola verba triliteral.'
			}
		],
		sections: [
			{
				heading: 'Maṣdar bukan fi‘il',
				text: 'Maṣdar menamai perbuatan, sementara fi‘il menghubungkan peristiwa dengan bentuk verbal dan ciri orang/waktu/aspek. Karena maṣdar adalah isim, ia dapat memiliki fungsi sintaksis isim dalam kalimat.'
			},
			{
				heading: 'Maṣdar yang perlu dihafal',
				text: 'Pada verba triliteral dasar, bentuk maṣdar sering bersifat leksikal/simā‘ī. Untuk pola mazīd terdapat pola yang lebih produktif, tetapi pengecualian, perubahan huruf lemah, dan pemakaian nyata tetap perlu dicek.'
			},
			{
				heading: 'Beberapa kategori terkait',
				text: 'Ada maṣdar mīmī (berawalan mīm tambahan), maṣdar marrah (sekali terjadi), dan maṣdar hay’ah (cara/keadaan tindakan). Ketiganya bukan sinonim otomatis untuk setiap akar.'
			}
		],
		watchOut: [
			'فَعْلٌ pada matriks wazan adalah pola ilustratif, bukan bentuk maṣdar setiap fi‘il.',
			'Makna kamus dapat berbeda dari padanan harfiah “pe-an”.'
		],
		related: ['mimi', 'madhi', 'fail'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	},
	mimi: {
		key: 'mimi',
		title: 'Maṣdar mīmī',
		arabic: 'الْمَصْدَرُ الْمِيمِيُّ',
		group: 'isim',
		summary:
			'Bentuk maṣdar dengan mīm tambahan pada awal kata, untuk menyebut perbuatan atau kejadian.',
		question: 'Kalau bentuk bermīm juga dipakai untuk tempat, bagaimana membedakannya?',
		distinction:
			'Kategori ini ditentukan oleh FUNGSI maknanya sebagai nama peristiwa, bukan oleh awalan م semata.',
		examples: [
			{
				arabic: 'دَخَلَ — مَدْخَلٌ',
				gloss: 'masuk — masuknya sesuatu / pintu masuk',
				observation:
					'Bentuk مَدْخَلٌ dapat mengandung pembacaan peristiwa atau tempat menurut konteks dan pemakaian.'
			},
			{
				arabic: 'مَوْعِدٌ',
				gloss: 'waktu janji / janji pertemuan',
				observation:
					'Contoh yang perlu dibaca secara leksikal; kemiripan bentuk tidak menentukan kategori sendirian.'
			}
		],
		sections: [
			{
				heading: 'Apa yang ditandai mīm?',
				text: 'Mīm tambahan muncul dalam sejumlah pola nominal. Pada maṣdar mīmī, pembicaraan berkaitan dengan kejadian atau perbuatan; pada isim makān atau zamān berkaitan dengan tempat atau waktu.'
			},
			{
				heading: 'Pola bukan izin mengarang kata',
				text: 'Beberapa bentuk mengikuti pola berawalan مَ, tetapi vokal dan huruf lemah dapat mengubah hasilnya. Tabel bentuk hanyalah templat untuk membaca bentuk yang telah diketahui.'
			},
			{
				heading: 'Menguji lewat konteks',
				text: 'Tanyakan apakah kalimat membicarakan tindakan masuk, sebuah tempat masuk, atau waktu tertentu. Jika bentuk dan konteks tidak cukup jelas, nyatakan ambiguitasnya, jangan menebak.'
			}
		],
		watchOut: [
			'Tidak semua kata yang dimulai م adalah maṣdar mīmī.',
			'Bentuk yang sama dapat berfungsi sebagai nama tindakan, tempat, atau waktu.'
		],
		related: ['mashdar', 'makan', 'zaman'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	},
	fail: {
		key: 'fail',
		title: 'Isim fā‘il',
		arabic: 'اسْمُ الْفَاعِلِ',
		group: 'isim',
		summary: 'Bentuk turunan isim yang umumnya menunjuk pelaku tindakan atau penyandang sifat.',
		question: 'Mengapa كَاتِبٌ berbeda dari كَتَبَ?',
		distinction:
			'كَاتِبٌ adalah isim fā‘il; فَاعِلٌ dalam susunan kalimat adalah istilah peran pelaku (fā‘il). Keduanya tidak otomatis sama.',
		examples: [
			{
				arabic: 'كَتَبَ — كَاتِبٌ',
				gloss: 'menulis — penulis',
				observation: 'كَاتِبٌ mengikuti pola فَاعِلٌ untuk banyak verba triliteral dasar.'
			},
			{
				arabic: 'عَلَّمَ — مُعَلِّمٌ',
				gloss: 'mengajar — pengajar',
				observation: 'Pada banyak bentuk mazīd, bentuk turunan pelaku berawalan مُـ.'
			},
			{
				arabic: 'الطَّالِبُ كَاتِبٌ',
				gloss: 'Murid itu seorang penulis.',
				observation: 'كَاتِبٌ adalah jenis kata isim dan berfungsi sebagai khabar dalam kalimat ini.'
			}
		],
		sections: [
			{
				heading: 'Isim fā‘il berbeda dari subjek nahwu',
				text: 'Istilah isim fā‘il menyebut BENTUK turunan kata. Istilah fā‘il pada nahwu menyebut FUNGSI pelaku suatu verba. Sebuah isim fā‘il dapat menjadi mubtada, khabar, sifat, dan fungsi sintaksis lain.'
			},
			{
				heading: 'Akar dan pola',
				text: 'Banyak fi‘il triliteral dasar membentuk فَاعِلٌ, contohnya كَاتِبٌ. Verba mazīd memiliki pola turunan yang berbeda. Akar, bentuk verba, dan pemakaian kamus tetap perlu dicek.'
			},
			{
				heading: 'Makna pelaku atau sifat',
				text: 'Tidak semua isim fā‘il hanya menunjuk profesi. Sebagian menyatakan keadaan atau sifat yang berhubungan dengan suatu tindakan. Perhatikan konteks sebelum menerjemahkan.'
			}
		],
		watchOut: [
			'Jangan samakan isim fā‘il (bentuk kata) dengan fā‘il (peran nahwu).',
			'Tidak semua bentuk فَاعِل berarti profesi tetap.'
		],
		related: ['maful', 'mashdar', 'madhi'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	},
	maful: {
		key: 'maful',
		title: 'Isim maf‘ūl',
		arabic: 'اسْمُ الْمَفْعُولِ',
		group: 'isim',
		summary:
			'Bentuk turunan isim yang biasanya menunjuk pihak atau benda yang dikenai suatu tindakan.',
		question: 'Apa beda “penulis” dan “yang ditulis”?',
		distinction:
			'Isim maf‘ūl adalah bentuk morfologi; maf‘ūl bih adalah fungsi objek dalam kalimat. Jangan menyamakannya.',
		examples: [
			{
				arabic: 'كَتَبَ — مَكْتُوبٌ',
				gloss: 'menulis — yang ditulis / tertulis',
				observation: 'مَفْعُول adalah pola umum pada sejumlah verba triliteral transitif.'
			},
			{
				arabic: 'فَتَحَ — مَفْتُوحٌ',
				gloss: 'membuka — yang dibuka / terbuka',
				observation: 'Maknanya bisa dibaca sebagai keadaan hasil.'
			},
			{
				arabic: 'الْبَابُ مَفْتُوحٌ',
				gloss: 'Pintu itu terbuka.',
				observation: 'مَفْتُوحٌ berperan sebagai khabar; bukan objek kalimat.'
			}
		],
		sections: [
			{
				heading: 'Bentuk versus fungsi',
				text: 'مَكْتُوبٌ secara morfologi adalah isim maf‘ūl, tetapi bisa menjadi khabar atau sifat dalam frasa. Objek yang terkena tindakan dalam suatu kalimat disebut maf‘ūl bih, bukan otomatis isim maf‘ūl.'
			},
			{
				heading: 'Kaitan dengan transitivitas',
				text: 'Bentuk maf‘ūl prototipikal bergantung pada makna verba yang dapat mengenai objek. Tidak semua verba lazim mempunyai turunan maf‘ūl yang dipakai dengan cara sama.'
			},
			{
				heading: 'Bentuk reguler dan khusus',
				text: 'Pola مَفْعُولٌ sering berguna untuk fi‘il triliteral dasar yang sehat, sedangkan verba mazīd, mahmūz, atau mu‘tal perlu kaidah dan pengecekan leksikal.'
			}
		],
		watchOut: [
			'Jangan otomatis membentuk isim maf‘ūl dari semua verba intransitif.',
			'Dalam contoh الْبَابُ مَفْتُوحٌ, kata kedua merupakan khabar, bukan maf‘ūl bih.'
		],
		related: ['fail', 'mashdar', 'makan'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	},
	amr: {
		key: 'amr',
		title: 'Fi‘il amr',
		arabic: 'فِعْلُ الْأَمْرِ',
		group: 'fiil',
		summary:
			'Bentuk verba yang lazim dipakai untuk meminta atau memerintahkan lawan bicara melakukan sesuatu.',
		question: 'Siapa yang diminta melakukan tindakan?',
		distinction:
			'Amr positif adalah bentuk fi‘il khusus. Larangan dengan لَا الناهية + muḍāri‘ majzūm dibahas terpisah.',
		examples: [
			{
				arabic: 'اُكْتُبْ',
				gloss: 'Tulislah! (kepada seorang laki-laki)',
				observation: 'Pelaku أَنْتَ dipahami dari bentuk perintah, tidak perlu selalu tertulis.'
			},
			{
				arabic: 'اِفْتَحْ',
				gloss: 'Bukalah!',
				observation: 'Kata kerja فَتَحَ memberi bentuk amr اِفْتَحْ pada contoh ini.'
			},
			{
				arabic: 'قُلْ',
				gloss: 'Katakanlah!',
				observation:
					'Bentuk dari قَالَ menunjukkan perubahan verba lemah; tidak dibentuk sekadar menambah alif.'
			}
		],
		sections: [
			{
				heading: 'Pelaku dan bentuk sapaan',
				text: 'Dalam bentuk dasar yang diajarkan di sini, perintah ditujukan pada orang kedua tunggal maskulin. Paradigma Arab mempunyai bentuk sapaan lain untuk perempuan, jamak, atau dua orang.'
			},
			{
				heading: 'Hubungan dengan muḍāri‘',
				text: 'Pembentukan amr berkaitan dengan bentuk majzūm orang kedua, tetapi aturan hamzat waṣl, sukun dan huruf lemah memerlukan perhatian. كَتَبَ dan أَكَلَ tidak mengikuti prosedur mekanis yang sama.'
			},
			{
				heading: 'Tidak semua perintah adalah fi‘il amr',
				text: 'Perintah juga bisa disampaikan dengan struktur lain, misalnya lām al-amr + muḍāri‘ majzūm. Hal ini berbeda dari bentuk fi‘il amr yang tampil pada tabel.'
			}
		],
		watchOut: [
			'Bentuk أَنْتَ tidak boleh ditambahkan sebagai fā‘il eksplisit bila konstruksinya tidak memerlukan itu.',
			'Verba mu‘tal dan mahmūz memerlukan bentuk leksikal teruji.'
		],
		related: ['mudhari', 'nahy', 'madhi'],
		references: [ajurrumiyyah, ryding],
		reviewStatus: 'draft'
	},
	nahy: {
		key: 'nahy',
		title: 'Larangan (nahy)',
		arabic: 'لَا النَّاهِيَةُ',
		group: 'fiil',
		summary: 'Konstruksi larangan: partikel لَا الناهية diikuti fi‘il muḍāri‘ majzūm.',
		question: 'Mengapa “jangan menulis” bukan bentuk māḍī atau amr negatif?',
		distinction:
			'Dalam tabel tashrif, label “fi‘il nahy” adalah nama kolom pembelajaran; secara nahwu ia adalah susunan partikel + muḍāri‘ majzūm, bukan kategori kala fi‘il keempat.',
		examples: [
			{
				arabic: 'لَا تَكْتُبْ',
				gloss: 'Jangan menulis!',
				observation: 'لَا melarang; تَكْتُبْ adalah muḍāri‘ majzūm.'
			},
			{
				arabic: 'لَا تَفْتَحْ',
				gloss: 'Jangan membuka!',
				observation: 'Kata kerja muḍāri‘ berubah akhirnya karena partikel larangan.'
			},
			{
				arabic: 'لَا تَقُلْ',
				gloss: 'Jangan mengatakan!',
				observation: 'Fi‘il lemah قَالَ memiliki bentuk muḍāri‘ majzūm khusus.'
			}
		],
		sections: [
			{
				heading: 'Perbedaan لَا larangan dan penyangkalan',
				text: 'لَا الناهية meminta tindakan tidak dilakukan dan menjazmkan muḍāri‘; لَا النافية hanya menyangkal pernyataan dan tidak selalu mengubah mood dengan cara yang sama.'
			},
			{
				heading: 'Jazm tidak selalu berupa sukūn',
				text: 'Pada verba sehat seperti تَكْتُبْ, sukun menjadi tanda yang terlihat. Pada verba lemah dan af‘āl khamsah, jazm dapat tampak lewat penghilangan huruf atau nūn.'
			},
			{
				heading: 'Hubungan dengan fi‘il amr',
				text: 'Amr positif seperti اُكْتُبْ adalah bentuk verba; larangan negatifnya memakai partikel لَا dan muḍāri‘. Keduanya mempunyai struktur yang berbeda.'
			}
		],
		watchOut: [
			'Jangan menganggap semua لَا sebagai larangan; konteks dan struktur fi‘il menentukan fungsi.',
			'Larangan bukan tense baru yang memiliki pola akar tersendiri.'
		],
		related: ['amr', 'mudhari', 'madhi'],
		references: [ajurrumiyyah, ryding],
		reviewStatus: 'draft'
	},
	zaman: {
		key: 'zaman',
		title: 'Isim zamān',
		arabic: 'اسْمُ الزَّمَانِ',
		group: 'isim',
		summary: 'Nomina turunan yang menyatakan waktu berlangsungnya tindakan atau suatu peristiwa.',
		question: 'Apakah bentuk ini menyatakan waktu, atau justru tempat?',
		distinction:
			'Isim zamān adalah nomina leksikal, bukan keterangan waktu verbal otomatis. Bentuknya sering beririsan dengan isim makān.',
		examples: [
			{
				arabic: 'مَوْعِدٌ',
				gloss: 'waktu yang dijanjikan / janji temu',
				observation: 'Dipakai sebagai nomina waktu menurut konteks, terkait akar و ع د.'
			},
			{
				arabic: 'مَغْرِبٌ',
				gloss: 'waktu matahari terbenam / arah barat',
				observation: 'Satu ejaan dapat mengacu pada waktu atau tempat/arah.'
			}
		],
		sections: [
			{
				heading: 'Waktu sebagai nama',
				text: 'Ungkapan waktu dalam bahasa Arab tidak harus memakai isim zamān turunan. Kata jam, hari dan keterangan waktu lain bisa berasal dari kategori leksikal berbeda.'
			},
			{
				heading: 'Pola turunan',
				text: 'Beberapa pola dengan mīm awal dipakai untuk waktu terjadinya tindakan. Namun bentuk tepat tergantung akar dan jenis verba; jangan menghasilkan entri baru hanya karena ada slot “zaman” di matriks.'
			},
			{
				heading: 'Ambiguitas dengan isim makān',
				text: 'Konteks menentukan apakah مَغْرِبٌ menunjuk saat matahari terbenam atau arah barat. Kamus dan contoh pemakaian harus menjadi dasar pelabelan.'
			}
		],
		watchOut: [
			'Wazan مَفْعَل/مَفْعِل bukan bukti bahwa sebuah kata pasti mempunyai makna waktu.',
			'Beberapa bentuk merujuk tempat maupun waktu.'
		],
		related: ['makan', 'mimi', 'mashdar'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	},
	makan: {
		key: 'makan',
		title: 'Isim makān',
		arabic: 'اسْمُ الْمَكَانِ',
		group: 'isim',
		summary: 'Nomina yang menunjukkan tempat yang berkaitan dengan pelaksanaan tindakan.',
		question: 'Apakah kata tersebut menamai tempat, benda, atau kejadian?',
		distinction:
			'Isim makān merupakan kategori berdasarkan makna tempat; bukan sembarang kata depan seperti فِي.',
		examples: [
			{
				arabic: 'مَكْتَبٌ',
				gloss: 'meja tulis / kantor',
				observation: 'Leksikal terkait akar ك ت ب, bukan hasil mekanis setiap akar.'
			},
			{
				arabic: 'مَلْعَبٌ',
				gloss: 'lapangan / tempat bermain',
				observation: 'Terkait akar ل ع ب, mempunyai pemakaian tempat yang lazim.'
			},
			{
				arabic: 'مَدْخَلٌ',
				gloss: 'pintu masuk / tempat masuk',
				observation:
					'Pada konteks tertentu juga berkaitan dengan peristiwa masuk; lihat ambiguitas maṣdar mīmī.'
			}
		],
		sections: [
			{
				heading: 'Dari verba menuju makna tempat',
				text: 'Nama tempat bisa terkait kegiatan tertentu: menulis, bermain, atau masuk. Sebagian nama tempat merupakan kata leksikal yang harus dipelajari sendiri.'
			},
			{
				heading: 'Pola mīm awal',
				text: 'Pola seperti مَفْعَلٌ dan مَفْعِلٌ sering muncul dalam materi dasar. Pilihan pola bisa dipengaruhi jenis akar dan bentuk muḍāri‘; bentuk mazīd mengikuti pola lain.'
			},
			{
				heading: 'Perbedaan dengan isim zamān',
				text: 'Dua kategori ini dapat berwazan sama. Pastikan makna yang dimaksud memang tempat, bukan menyimpulkan kategori dari tulisan saja.'
			}
		],
		watchOut: [
			'Jangan menyatakan setiap kata مَفْعَل adalah isim makān.',
			'Kata فِي merupakan ḥarf jarr, bukan isim makān.'
		],
		related: ['zaman', 'mimi', 'alah'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	},
	alah: {
		key: 'alah',
		title: 'Isim ālah (alat)',
		arabic: 'اسْمُ الْآلَةِ',
		group: 'isim',
		summary: 'Nomina yang menamai alat atau sarana untuk melakukan suatu tindakan.',
		question: 'Apakah yang disebut adalah alat nyata yang digunakan untuk tindakan?',
		distinction:
			'Isim alat adalah kategori nomina turunan/leksikal, bukan fi‘il perintah menggunakan alat.',
		examples: [
			{
				arabic: 'مِفْتَاحٌ',
				gloss: 'kunci',
				observation: 'Kata leksikal yang berkaitan dengan فَتَحَ, “membuka”.'
			},
			{
				arabic: 'مِكْنَسَةٌ',
				gloss: 'sapu',
				observation: 'Terkait كَنَسَ, “menyapu”; pola alat tidak selalu sama.'
			},
			{
				arabic: 'مِقَصٌّ',
				gloss: 'gunting',
				observation:
					'Berkaitan dengan قَصَّ, “memotong”; bentuknya menunjukkan perbedaan pola leksikal.'
			}
		],
		sections: [
			{
				heading: 'Pola lama dan kosakata modern',
				text: 'Contoh klasik sering memakai pola مِفْعَل، مِفْعَال، atau مِفْعَلَة. Penamaan alat modern juga menggunakan pola produktif lain dan kosakata serapan yang tidak boleh dipaksakan ke satu pola.'
			},
			{
				heading: 'Hubungan dengan akar',
				text: 'Bentuk alat dapat mengingatkan pada tindakan yang dilakukan, tetapi hubungan semantik sebuah kata tetap harus dikonfirmasi lewat kamus dan contoh pemakaian.'
			},
			{
				heading: 'Saat tidak ada bentuk tercatat',
				text: 'Tanda — pada tabel berarti sumber proyek belum merekam bentuknya. Jangan mengarang isim alat bagi suatu fi‘il yang tidak memiliki bentuk alat lazim.'
			}
		],
		watchOut: [
			'Tidak setiap fi‘il mempunyai isim alat konvensional.',
			'Perhatikan perbedaan wazan, variasi regional, dan istilah MSA modern.'
		],
		related: ['makan', 'fail', 'mashdar'],
		references: [ryding, madinah],
		reviewStatus: 'draft'
	}
};

export const morphologyGuideList = tashrifColumns.map((column) => morphologyGuides[column.key]);

/** Reject orphaned, mistyped, or incompletely sourced columns before site build. */
export function validateMorphologyGuides(): string[] {
	const issues: string[] = [];
	const keys = new Set<string>();
	for (const col of tashrifColumns) {
		const guide = morphologyGuides[col.key];
		if (!guide || guide.key !== col.key) {
			issues.push('Panduan tidak cocok dengan kolom: ' + col.key);
			continue;
		}
		if (keys.has(guide.key)) issues.push('Kunci ganda: ' + guide.key);
		keys.add(guide.key);
		if (guide.examples.length < 2 || guide.sections.length < 3)
			issues.push('Pembahasan belum lengkap: ' + guide.key);
		if (guide.references.length < 1 || guide.references.some((r) => !r.url.startsWith('https://')))
			issues.push('Rujukan tidak sah: ' + guide.key);
		if (guide.related.some((key) => key === guide.key || !morphologyGuides[key]))
			issues.push('Tautan pembahasan tidak sah: ' + guide.key);
		if (guide.reviewStatus !== 'draft') issues.push('Status guru belum sah: ' + guide.key);
	}
	return issues;
}
