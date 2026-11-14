import {
	validateVocab,
	type MsaClass,
	type MsaLexicalInfo,
	type MsaTopic,
	type VocabularyItem
} from '#lib/domain/vocabulary/types.js';

/**
 * First-party Indonesian glosses and a deliberately SMALL MSA starter set.
 * Candidate lemmas are not claimed to be a frequency list or independently
 * attested from an entire third-party dictionary. See docs/data/msa-common.md.
 * One line = stable slug | Arabic lemma/phrase | original Indonesian gloss | word class.
 */
const seeds: Record<MsaTopic, string> = {
	people: `
shakhs|شَخْصٌ|orang, individu|noun
rajul|رَجُلٌ|laki-laki dewasa|noun
imraah|اِمْرَأَةٌ|perempuan dewasa|noun
walad|وَلَدٌ|anak laki-laki|noun
bint|بِنْتٌ|anak perempuan|noun
tifl|طِفْلٌ|anak kecil|noun
ab|أَبٌ|ayah|noun
umm|أُمٌّ|ibu|noun
akh|أَخٌ|saudara laki-laki|noun
ukht|أُخْتٌ|saudara perempuan|noun
sadiq|صَدِيقٌ|teman, sahabat|noun
jar|جَارٌ|tetangga|noun
usrah|أُسْرَةٌ|keluarga|noun
ustadh|أُسْتَاذٌ|guru, pengajar, sapaan hormat|noun
sayyid|سَيِّدٌ|tuan, sapaan hormat|noun
sayyidah|سَيِّدَةٌ|nyonya, ibu (sapaan hormat)|noun
talib|طَالِبٌ|pelajar, mahasiswa|noun
tabib|طَبِيبٌ|dokter|noun
muhandis|مُهَنْدِسٌ|insinyur|noun
muwazzaf|مُوَظَّفٌ|pegawai|noun
tilmidh|تِلْمِيذٌ|murid sekolah|noun
`,
	places: `
bayt|بَيْتٌ|rumah|noun
manzil|مَنْزِلٌ|rumah, tempat tinggal|noun
madinah|مَدِينَةٌ|kota|noun
qaryah|قَرْيَةٌ|desa|noun
shari|شَارِعٌ|jalan raya|noun
tariq|طَرِيقٌ|jalan, rute|noun
madrasah|مَدْرَسَةٌ|sekolah|noun
jamiah|جَامِعَةٌ|universitas|noun
maktab|مَكْتَبٌ|kantor, meja kerja|noun
masjid|مَسْجِدٌ|masjid|noun
mustashfa|مُسْتَشْفًى|rumah sakit|noun
suq|سُوقٌ|pasar|noun
matam|مَطْعَمٌ|restoran|noun
mahattah|مَحَطَّةٌ|stasiun, terminal|noun
matar|مَطَارٌ|bandara|noun
matjar|مَتْجَرٌ|toko|noun
`,
	objects: `
kitab|كِتَابٌ|buku|noun
qalam|قَلَمٌ|pena|noun
waraqah|وَرَقَةٌ|lembar kertas|noun
tawilah|طَاوِلَةٌ|meja|noun
nafidhah|نَافِذَةٌ|jendela|noun
thawb|ثَوْبٌ|pakaian, jubah|noun
hidha|حِذَاءٌ|sepatu|noun
nazzarah|نَظَّارَةٌ|kacamata|noun
sayyarah|سَيَّارَةٌ|mobil|noun
darrajah|دَرَّاجَةٌ|sepeda|noun
hafilah|حَافِلَةٌ|bus|noun
qitar|قِطَارٌ|kereta|noun
kharitah|خَرِيطَةٌ|peta|noun
jaridah|جَرِيدَةٌ|surat kabar|noun
surah-photo|صُورَةٌ|gambar, foto|noun
risalah|رِسَالَةٌ|surat, pesan|noun
`,
	food: `
ma-water|مَاءٌ|air|noun
khubz|خُبْزٌ|roti|noun
aruzz|أَرُزٌّ|beras, nasi|noun
taam|طَعَامٌ|makanan|noun
sharab|شَرَابٌ|minuman|noun
fakihah|فَاكِهَةٌ|buah-buahan|noun
tuffahah|تُفَّاحَةٌ|sebuah apel|noun
mawz|مَوْزٌ|pisang|noun
samak|سَمَكٌ|ikan|noun
lahm|لَحْمٌ|daging|noun
halib|حَلِيبٌ|susu|noun
qahwah|قَهْوَةٌ|kopi|noun
shay|شَايٌ|teh|noun
`,
	nature: `
shams|شَمْسٌ|matahari|noun
qamar|قَمَرٌ|bulan|noun
najm|نَجْمٌ|bintang|noun
sama|سَمَاءٌ|langit|noun
ard|أَرْضٌ|bumi, tanah|noun
bahr|بَحْرٌ|laut|noun
jabal|جَبَلٌ|gunung|noun
nahr|نَهْرٌ|sungai|noun
shajarah|شَجَرَةٌ|pohon|noun
zahrah|زَهْرَةٌ|bunga|noun
matar-rain|مَطَرٌ|hujan|noun
hawa|هَوَاءٌ|udara|noun
thalj|ثَلْجٌ|salju|noun
`,
	time: `
yawm|يَوْمٌ|hari|noun
laylah|لَيْلَةٌ|malam|noun
sabah|صَبَاحٌ|pagi|noun
masa|مَسَاءٌ|sore, malam hari|noun
usbu|أُسْبُوعٌ|pekan|noun
shahr|شَهْرٌ|bulan (kalender)|noun
sanah|سَنَةٌ|tahun|noun
saah|سَاعَةٌ|jam (waktu)|noun
waqt|وَقْتٌ|waktu|noun
daqiqah|دَقِيقَةٌ|menit|noun
lahzah|لَحْظَةٌ|sekejap|noun
bidayah|بِدَايَةٌ|awal, permulaan|noun
nihayah|نِهَايَةٌ|akhir, penutup|noun
`,
	qualities: `
jadid|جَدِيدٌ|baru|adjective
qadim|قَدِيمٌ|lama, kuno|adjective
kabir|كَبِيرٌ|besar|adjective
saghir|صَغِيرٌ|kecil|adjective
jamil|جَمِيلٌ|indah, bagus|adjective
qabih|قَبِيحٌ|buruk, jelek|adjective
tawil|طَوِيلٌ|panjang, tinggi|adjective
qasir|قَصِيرٌ|pendek|adjective
sari|سَرِيعٌ|cepat|adjective
bati|بَطِيءٌ|lambat|adjective
sahl|سَهْلٌ|mudah|adjective
sab|صَعْبٌ|sulit|adjective
jayyid|جَيِّدٌ|baik, bagus|adjective
sayyi|سَيِّئٌ|buruk|adjective
nazif|نَظِيفٌ|bersih|adjective
qadhir|قَذِرٌ|kotor|adjective
harr|حَارٌّ|panas|adjective
barid|بَارِدٌ|dingin|adjective
qarib|قَرِيبٌ|dekat|adjective
baid|بَعِيدٌ|jauh|adjective
muhimm|مُهِمٌّ|penting|adjective
mumkin|مُمْكِنٌ|mungkin, dapat dilakukan|adjective
daruri|ضَرُورِيٌّ|perlu, mendesak|adjective
mufid|مُفِيدٌ|bermanfaat|adjective
said|سَعِيدٌ|bahagia|adjective
hazin|حَزِينٌ|sedih|adjective
mughlaq|مُغْلَقٌ|tertutup|adjective
sahih|صَحِيحٌ|benar, sahih|adjective
khati|خَاطِئٌ|keliru, salah|adjective
qawi|قَوِيٌّ|kuat|adjective
daif|ضَعِيفٌ|lemah|adjective
ghali|غَالٍ|mahal|adjective
rakhis|رَخِيصٌ|murah|adjective
`,
	technology: `
hatif|هَاتِفٌ|telepon|noun
hatif-dhaki|هَاتِفٌ ذَكِيٌّ|telepon pintar|noun
hasub|حَاسُوبٌ|komputer|noun
internet|إِنْتَرْنِت|internet|noun
shashah|شَاشَةٌ|layar|noun
shabakah|شَبَكَةٌ|jaringan|noun
barnamaj|بَرْنَامَجٌ|program|noun
tatbiq|تَطْبِيقٌ|aplikasi, penerapan|noun
mawqi-iliktruni|مَوْقِعٌ إِلِكْتُرُونِيٌّ|situs web|noun
barid-iliktruni|بَرِيدٌ إِلِكْتُرُونِيٌّ|surat elektronik, email|noun
kalimat-murur|كَلِمَةُ مُرُورٍ|kata sandi|noun
milaff|مِلَفٌّ|berkas, file|noun
bayanat|بَيَانَاتٌ|data|noun
taqniyah|تَقْنِيَّةٌ|teknologi, teknik|noun
malumat|مَعْلُومَاتٌ|informasi|noun
rabit|رَابِطٌ|tautan|noun
safhah|صَفْحَةٌ|halaman|noun
mutasaffih|مُتَصَفِّحٌ|peramban web|noun
lawhat-mafatih|لَوْحَةُ مَفَاتِيحَ|papan ketik|noun
raqami|رَقْمِيٌّ|digital|adjective
`,
	social: `
marhaban|مَرْحَبًا|halo, selamat datang|expression
ahlan-wasahlan|أَهْلًا وَسَهْلًا|selamat datang|expression
sabah-khayr|صَبَاحُ الْخَيْرِ|selamat pagi|expression
masa-khayr|مَسَاءُ الْخَيْرِ|selamat sore, selamat malam|expression
shukran|شُكْرًا|terima kasih|expression
afwan|عَفْوًا|sama-sama, maaf|expression
min-fadlik|مِنْ فَضْلِكَ|tolong, silakan (kepada laki-laki)|expression
ila-liqa|إِلَى اللِّقَاءِ|sampai jumpa|expression
maa-salamah|مَعَ السَّلَامَةِ|selamat jalan, sampai jumpa|expression
salam-alaykum|السَّلَامُ عَلَيْكُمْ|semoga keselamatan atas kalian|expression
ya-nida|يَا|wahai, hai (partikel seruan)|particle
law-samaht|لَوْ سَمَحْتَ|permisi, mohon (kepada laki-laki)|expression
`
};

type Supplement = Pick<MsaLexicalInfo, 'root' | 'plural' | 'feminine' | 'example' | 'formation'>;

/** Selected lexical facts only; no plural, root or feminine is manufactured for other items. */
const supplements: Readonly<Record<string, Supplement>> = {
	rajul: { plural: { value: 'رِجَالٌ', kind: 'broken' } },
	imraah: { plural: { value: 'نِسَاءٌ', kind: 'lexical' } },
	tifl: { plural: { value: 'أَطْفَالٌ', kind: 'broken' } },
	sadiq: { plural: { value: 'أَصْدِقَاءُ', kind: 'broken' } },
	kitab: {
		root: 'كتب',
		plural: { value: 'كُتُبٌ', kind: 'broken' },
		example: { arabic: 'كِتَابٌ جَدِيدٌ', meaning: 'sebuah buku baru' }
	},
	qalam: { plural: { value: 'أَقْلَامٌ', kind: 'broken' } },
	bayt: { plural: { value: 'بُيُوتٌ', kind: 'broken' } },
	madinah: {
		plural: { value: 'مُدُنٌ', kind: 'broken' },
		example: { arabic: 'مَدِينَةٌ كَبِيرَةٌ', meaning: 'sebuah kota besar' }
	},
	madrasah: { plural: { value: 'مَدَارِسُ', kind: 'broken' } },
	jamiah: { plural: { value: 'جَامِعَاتٌ', kind: 'sound' } },
	maktab: { plural: { value: 'مَكَاتِبُ', kind: 'broken' } },
	tabib: { plural: { value: 'أَطِبَّاءُ', kind: 'broken' } },
	qitar: { plural: { value: 'قِطَارَاتٌ', kind: 'sound' } },
	sayyarah: { plural: { value: 'سَيَّارَاتٌ', kind: 'sound' } },
	risalah: { plural: { value: 'رَسَائِلُ', kind: 'broken' } },
	hasub: { root: 'حسب', plural: { value: 'حَوَاسِيبُ', kind: 'broken' }, formation: 'derived' },
	internet: { formation: 'loanword' },
	'hatif-dhaki': { formation: 'compound' },
	'mawqi-iliktruni': { formation: 'compound' },
	'barid-iliktruni': { formation: 'compound' },
	'kalimat-murur': { formation: 'compound' },
	'lawhat-mafatih': { formation: 'compound' },
	kabir: { feminine: 'كَبِيرَةٌ' },
	saghir: { root: 'صغر', feminine: 'صَغِيرَةٌ' },
	jadid: { feminine: 'جَدِيدَةٌ' },
	qadim: { feminine: 'قَدِيمَةٌ' },
	jamil: { feminine: 'جَمِيلَةٌ' },
	tawil: { feminine: 'طَوِيلَةٌ' },
	qasir: { feminine: 'قَصِيرَةٌ' },
	sari: { feminine: 'سَرِيعَةٌ' },
	sahl: { feminine: 'سَهْلَةٌ' },
	sab: { feminine: 'صَعْبَةٌ' },
	nazif: { feminine: 'نَظِيفَةٌ' },
	said: { feminine: 'سَعِيدَةٌ' },
	raqami: { formation: 'derived' }
};

const mainLexicon = 'https://kaikki.org/dictionary/Arabic/index.html';
const msaPhrasebook = 'https://en.wiktionary.org/wiki/Appendix:Basic_Arabic_phrases';
const wiktionaryCopyright = 'https://en.wiktionary.org/wiki/Wiktionary:Copyrights';
const specificSource: Readonly<Record<string, string>> = {
	imraah: 'https://en.wiktionary.org/wiki/امرأة',
	hasub: 'https://en.wiktionary.org/wiki/حاسوب',
	internet: 'https://en.wiktionary.org/wiki/إنترنت',
	'hatif-dhaki': 'https://en.wiktionary.org/wiki/هاتف_ذكي',
	saghir: 'https://en.wiktionary.org/wiki/صغير',
	shukran: 'https://en.wiktionary.org/wiki/شكرا'
};

export const msaVocabulary: readonly VocabularyItem[] = Object.entries(seeds).flatMap(
	([topic, data]) =>
		data
			.trim()
			.split('\n')
			.map((line): VocabularyItem => {
				const parts = line.split('|');
				if (parts.length !== 4) throw new Error(`Malformed MSA row: ${line}`);
				const [slug, arabic, meaning, wordClass] = parts;
				if (
					!slug ||
					!arabic ||
					!meaning ||
					!wordClass ||
					!['noun', 'adjective', 'expression', 'particle'].includes(wordClass)
				) {
					throw new Error(`Invalid MSA row: ${line}`);
				}
				const grouping = topic as MsaTopic;
				const kind = wordClass as MsaClass;
				const details = supplements[slug] ?? {};
				return {
					id: `msa-${slug}`,
					arabic,
					meaning,
					collection: 'msa',
					register: 'msa',
					reviewStatus: 'draft',
					concreteness:
						kind === 'expression' || kind === 'particle'
							? 'function'
							: kind === 'adjective' || grouping === 'time'
								? 'abstract'
								: 'concrete',
					sources: [
						specificSource[slug] ?? (grouping === 'social' ? msaPhrasebook : mainLexicon),
						wiktionaryCopyright
					],
					msa: { wordClass: kind, topic: grouping, attestation: 'curated-draft', ...details }
				};
			})
);

const uniqueIds = new Set<string>();
for (const item of msaVocabulary) {
	if (uniqueIds.has(item.id) || validateVocab(item).length > 0) {
		throw new Error(`MSA content rejected: ${item.id}`);
	}
	uniqueIds.add(item.id);
}
