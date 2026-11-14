/**
 * Twenty-two traditional teaching rows, in the order used by the supplied
 * tashrif reference image. Wazan are symbolic patterns, NOT a lexicon:
 * masdars and instrument nouns are not universally predictable.
 *
 * Independent crosschecks:
 * - https://shorofkrapyak.blogspot.com/2020/04/pembahasan-wazan.html
 * - https://repository.radenfatah.ac.id/26785/1/BUKU_Buku%20Lengkap%20Dalam%20Belajar%20Tashrif.pdf
 * - https://ejournal.uin-suka.ac.id/tarbiyah/almahara/article/download/2020.062.04/1930
 */
export type PatternFamily =
	| 'tsulatsi-mujarrad'
	| 'tsulatsi-mazid-1'
	| 'tsulatsi-mazid-2'
	| 'tsulatsi-mazid-3'
	| 'rubai-mujarrad'
	| 'rubai-mazid-1'
	| 'rubai-mazid-2';

export type MorphologyPattern = {
	number: number;
	family: PatternFamily;
	familyLabel: string;
	madhi: string;
	mudhari: string;
	mashdar?: string;
	fail?: string;
	maful?: string;
	amr?: string;
	nahy?: string;
	mimi?: string;
	zaman?: string;
	makan?: string;
	alah?: string;
	notes: string;
	source: string;
};

const basic = 'https://sayahafiz.com/assets/images/kitab/ilmu-sharaf-untuk-pemula.pdf';
const advanced = 'https://shorofkrapyak.blogspot.com/2020/04/pembahasan-wazan.html';
const academic = 'https://repository.radenfatah.ac.id/26785/1/BUKU_Buku%20Lengkap%20Dalam%20Belajar%20Tashrif.pdf';

export const patternCatalog: readonly MorphologyPattern[] = [
	{ number: 1, family: 'tsulatsi-mujarrad', familyLabel: 'Tsulatsi mujarrad', madhi: 'فَعَلَ', mudhari: 'يَفْعُلُ', notes: 'Bab نَصَرَ. Harakat ‘ain fi’il mudhari berupa dhammah; pemilihan bab untuk sebuah akar memerlukan sumber leksikal.', source: basic },
	{ number: 2, family: 'tsulatsi-mujarrad', familyLabel: 'Tsulatsi mujarrad', madhi: 'فَعَلَ', mudhari: 'يَفْعِلُ', notes: 'Bab ضَرَبَ. Harakat ‘ain fi’il mudhari berupa kasrah.', source: basic },
	{ number: 3, family: 'tsulatsi-mujarrad', familyLabel: 'Tsulatsi mujarrad', madhi: 'فَعَلَ', mudhari: 'يَفْعَلُ', notes: 'Bab فَتَحَ. Harakat ‘ain fi’il mudhari berupa fathah.', source: basic },
	{ number: 4, family: 'tsulatsi-mujarrad', familyLabel: 'Tsulatsi mujarrad', madhi: 'فَعِلَ', mudhari: 'يَفْعَلُ', notes: 'Bab عَلِمَ. Madhi berkasrah dan mudhari berfathah pada ‘ain fi’il.', source: basic },
	{ number: 5, family: 'tsulatsi-mujarrad', familyLabel: 'Tsulatsi mujarrad', madhi: 'فَعِلَ', mudhari: 'يَفْعِلُ', notes: 'Bab حَسِبَ. Madhi dan mudhari sama-sama berkasrah pada ‘ain fi’il.', source: basic },
	{ number: 6, family: 'tsulatsi-mujarrad', familyLabel: 'Tsulatsi mujarrad', madhi: 'فَعُلَ', mudhari: 'يَفْعُلُ', notes: 'Bab حَسُنَ. Umumnya berkaitan dengan sifat; tidak semua verba bisa membentuk isim maf’ul.', source: basic },
	{ number: 7, family: 'tsulatsi-mazid-1', familyLabel: 'Tsulatsi mazid +1', madhi: 'فَعَّلَ', mudhari: 'يُفَعِّلُ', mashdar: 'تَفْعِيلٌ', fail: 'مُفَعِّلٌ', maful: 'مُفَعَّلٌ', amr: 'فَعِّلْ', nahy: 'لَا تُفَعِّلْ', notes: 'Bentuk dengan tasydid pada ‘ain fi’il. Maknanya dapat bersifat kausatif/intensif, tergantung leksikon.', source: advanced },
	{ number: 8, family: 'tsulatsi-mazid-1', familyLabel: 'Tsulatsi mazid +1', madhi: 'فَاعَلَ', mudhari: 'يُفَاعِلُ', mashdar: 'مُفَاعَلَةٌ', fail: 'مُفَاعِلٌ', maful: 'مُفَاعَلٌ', amr: 'فَاعِلْ', nahy: 'لَا تُفَاعِلْ', notes: 'Alif tambahan sesudah fa’ fi’il. Sering mengandung interaksi atau partisipasi, bukan selalu demikian.', source: advanced },
	{ number: 9, family: 'tsulatsi-mazid-1', familyLabel: 'Tsulatsi mazid +1', madhi: 'أَفْعَلَ', mudhari: 'يُفْعِلُ', mashdar: 'إِفْعَالٌ', fail: 'مُفْعِلٌ', maful: 'مُفْعَلٌ', amr: 'أَفْعِلْ', nahy: 'لَا تُفْعِلْ', notes: 'Hamzah tambahan pada awal fi’il. Sering mengubah transitivitas, tetapi konteks leksikal tetap menentukan.', source: advanced },
	{ number: 10, family: 'tsulatsi-mazid-2', familyLabel: 'Tsulatsi mazid +2', madhi: 'تَفَاعَلَ', mudhari: 'يَتَفَاعَلُ', mashdar: 'تَفَاعُلٌ', fail: 'مُتَفَاعِلٌ', maful: 'مُتَفَاعَلٌ', amr: 'تَفَاعَلْ', nahy: 'لَا تَتَفَاعَلْ', notes: 'Tambahan ta’ dan alif; makna dapat menyatakan timbal balik atau peristiwa bertahap.', source: advanced },
	{ number: 11, family: 'tsulatsi-mazid-2', familyLabel: 'Tsulatsi mazid +2', madhi: 'تَفَعَّلَ', mudhari: 'يَتَفَعَّلُ', mashdar: 'تَفَعُّلٌ', fail: 'مُتَفَعِّلٌ', maful: 'مُتَفَعَّلٌ', amr: 'تَفَعَّلْ', nahy: 'لَا تَتَفَعَّلْ', notes: 'Tambahan ta’ awal dan tasydid pada ‘ain fi’il; sering berkaitan dengan proses yang menimpa subjek.', source: advanced },
	{ number: 12, family: 'tsulatsi-mazid-2', familyLabel: 'Tsulatsi mazid +2', madhi: 'اِفْتَعَلَ', mudhari: 'يَفْتَعِلُ', mashdar: 'اِفْتِعَالٌ', fail: 'مُفْتَعِلٌ', maful: 'مُفْتَعَلٌ', amr: 'اِفْتَعِلْ', nahy: 'لَا تَفْتَعِلْ', notes: 'Alif washal dan ta’ sisipan; bisa mengalami perubahan asimilasi pada akar tertentu.', source: advanced },
	{ number: 13, family: 'tsulatsi-mazid-2', familyLabel: 'Tsulatsi mazid +2', madhi: 'اِنْفَعَلَ', mudhari: 'يَنْفَعِلُ', mashdar: 'اِنْفِعَالٌ', fail: 'مُنْفَعِلٌ', maful: 'مُنْفَعَلٌ', amr: 'اِنْفَعِلْ', nahy: 'لَا تَنْفَعِلْ', notes: 'Alif washal dan nun sisipan; banyak verba berpola ini bersifat intransitif.', source: advanced },
	{ number: 14, family: 'tsulatsi-mazid-2', familyLabel: 'Tsulatsi mazid +2', madhi: 'اِفْعَلَّ', mudhari: 'يَفْعَلُّ', mashdar: 'اِفْعِلَالٌ', fail: 'مُفْعَلٌّ', amr: 'اِفْعَلَّ', notes: 'Sering dipakai untuk perubahan warna atau keadaan; fi’il lazim sehingga isim maf’ul tidak selalu digunakan.', source: advanced },
	{ number: 15, family: 'tsulatsi-mazid-3', familyLabel: 'Tsulatsi mazid +3', madhi: 'اِسْتَفْعَلَ', mudhari: 'يَسْتَفْعِلُ', mashdar: 'اِسْتِفْعَالٌ', fail: 'مُسْتَفْعِلٌ', maful: 'مُسْتَفْعَلٌ', amr: 'اِسْتَفْعِلْ', nahy: 'لَا تَسْتَفْعِلْ', notes: 'Alif-sin-ta’ di awal. Kerap menyatakan permintaan, pencarian, atau anggapan.', source: advanced },
	{ number: 16, family: 'tsulatsi-mazid-3', familyLabel: 'Tsulatsi mazid +3', madhi: 'اِفْعَوْعَلَ', mudhari: 'يَفْعَوْعِلُ', mashdar: 'اِفْعِيعَالٌ', fail: 'مُفْعَوْعِلٌ', maful: 'مُفْعَوْعَلٌ', amr: 'اِفْعَوْعِلْ', notes: 'Bentuk jarang dengan wawu dan pengulangan ‘ain; jangan mengasumsikan semua akar dapat menggunakannya.', source: academic },
	{ number: 17, family: 'tsulatsi-mazid-3', familyLabel: 'Tsulatsi mazid +3', madhi: 'اِفْعَوَّلَ', mudhari: 'يَفْعَوِّلُ', mashdar: 'اِفْعِوَّالٌ', fail: 'مُفْعَوِّلٌ', maful: 'مُفْعَوَّلٌ', amr: 'اِفْعَوِّلْ', notes: 'Bentuk langka dengan wawu bertasydid; contoh aktual harus dicari di kamus.', source: advanced },
	{ number: 18, family: 'tsulatsi-mazid-3', familyLabel: 'Tsulatsi mazid +3', madhi: 'اِفْعَالَّ', mudhari: 'يَفْعَالُّ', mashdar: 'اِفْعِيلَالٌ', fail: 'مُفْعَالٌّ', amr: 'اِفْعَالَّ', notes: 'Bentuk penegasan warna/sifat; istilah dan harakat perlu dibandingkan dengan rujukan sharaf.', source: academic },
	{ number: 19, family: 'rubai-mujarrad', familyLabel: 'Ruba’i mujarrad', madhi: 'فَعْلَلَ', mudhari: 'يُفَعْلِلُ', mashdar: 'فَعْلَلَةٌ', fail: 'مُفَعْلِلٌ', maful: 'مُفَعْلَلٌ', amr: 'فَعْلِلْ', nahy: 'لَا تُفَعْلِلْ', notes: 'Fi’il dengan empat konsonan asli. Wazan menggunakan fa-‘ain-lam-lam.', source: academic },
	{ number: 20, family: 'rubai-mazid-1', familyLabel: 'Ruba’i mazid +1', madhi: 'تَفَعْلَلَ', mudhari: 'يَتَفَعْلَلُ', mashdar: 'تَفَعْلُلٌ', fail: 'مُتَفَعْلِلٌ', maful: 'مُتَفَعْلَلٌ', amr: 'تَفَعْلَلْ', nahy: 'لَا تَتَفَعْلَلْ', notes: 'Ruba’i dengan tambahan ta’ pada awal fi’il.', source: academic },
	{ number: 21, family: 'rubai-mazid-2', familyLabel: 'Ruba’i mazid +2', madhi: 'اِفْعَنْلَلَ', mudhari: 'يَفْعَنْلِلُ', mashdar: 'اِفْعِنْلَالٌ', fail: 'مُفْعَنْلِلٌ', maful: 'مُفْعَنْلَلٌ', amr: 'اِفْعَنْلِلْ', notes: 'Ruba’i dengan hamzah washal dan nun tambahan. Sering intransitif.', source: academic },
	{ number: 22, family: 'rubai-mazid-2', familyLabel: 'Ruba’i mazid +2', madhi: 'اِفْعَلَلَّ', mudhari: 'يَفْعَلِلُّ', mashdar: 'اِفْعِلْلَالٌ', fail: 'مُفْعَلِلٌّ', amr: 'اِفْعَلِلَّ', notes: 'Ruba’i dengan penambahan hamzah washal dan tasydid; bentuk leksikal dapat mengalami i‘lal atau perubahan hamzah.', source: academic }
];

if (patternCatalog.length !== 22 || new Set(patternCatalog.map((p) => p.number)).size !== 22) {
	throw new Error('The 22-row morphology catalog is incomplete.');
}
