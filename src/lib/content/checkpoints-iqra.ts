/**
 * RM-06 Iqra: twenty independent *reading prompts* for human/self observation.
 * These do not produce LearningAttempt or competence levels: text alone cannot
 * verify articulation, makharij, length or fluency. Arabic and notes remain draft.
 */
export type IqraSelfCheckItem = {
	id: string;
	arabic: string;
	focus: string;
	check: string;
};

export type IqraSelfCheckGroup = {
	id: string;
	title: string;
	items: readonly IqraSelfCheckItem[];
};

const items: readonly (IqraSelfCheckItem & { group: string })[] = [
	{
		group: 'vowels',
		id: 'iqra-check-01',
		arabic: 'بَابٌ صَغِيرٌ',
		focus: 'Perhatikan vokal panjang setelah ba dan bunyi tanwin pada dua kata.',
		check: 'Vokal panjang pada بَابٌ berasal dari fathah + alif. Baca harakat akhir saat menyambung; jangan samakan dengan berhenti.'
	},
	{
		group: 'vowels',
		id: 'iqra-check-02',
		arabic: 'مِفْتَاحٌ جَدِيدٌ',
		focus: 'Temukan sukun dan vokal panjang di dua kata.',
		check: 'Fa bersukun pada مِفْتَاحٌ; ta diikuti alif memberi ā. Pada جَدِيدٌ, ya memanjangkan i.'
	},
	{
		group: 'vowels',
		id: 'iqra-check-03',
		arabic: 'مَاءٌ بَارِدٌ',
		focus: 'Amati pemanjangan a dan hamzah.',
		check: 'Mَاءٌ ditulis dengan alif pemanjang sebelum hamzah; بَارِدٌ juga memiliki ā pada ba.'
	},
	{
		group: 'vowels',
		id: 'iqra-check-04',
		arabic: 'قَلَمٌ قَصِيرٌ',
		focus: 'Bedakan vokal pendek dari vokal panjang.',
		check: 'قَلَمٌ memuat a pendek; قَصِيرٌ memiliki bunyi ī panjang yang ditulis dengan ya.'
	},
	{
		group: 'vowels',
		id: 'iqra-check-05',
		arabic: 'كِتَابٌ مُفِيدٌ',
		focus: 'Tunjukkan alif dan ya yang memanjangkan vokal.',
		check: 'كِتَابٌ memiliki ā dan مُفِيدٌ memiliki ī. Jangan memanjangkan kasrah pada ka di kata pertama.'
	},
	{
		group: 'shadda',
		id: 'iqra-check-06',
		arabic: 'حَقٌّ وَاضِحٌ',
		focus: 'Temukan konsonan rangkap dan akhiran tanwin.',
		check: 'Qaf dalam حَقٌّ bertanda tasydid; ketika disambung, tanda tanwin berbunyi -un.'
	},
	{
		group: 'shadda',
		id: 'iqra-check-07',
		arabic: 'مُدَرِّسٌ مَاهِرٌ',
		focus: 'Temukan tasydid dan dua vokal panjang/pendek.',
		check: 'Ra pada مُدَرِّسٌ bertanda tasydid. مَاهِرٌ mengandung ā panjang.'
	},
	{
		group: 'shadda',
		id: 'iqra-check-08',
		arabic: 'دَرْسٌ سَهْلٌ',
		focus: 'Cari huruf bersukun pada masing-masing kata.',
		check: 'Ra dalam دَرْسٌ dan ha dalam سَهْلٌ sama-sama bersukun; jangan menambah vokal sesudahnya.'
	},
	{
		group: 'shadda',
		id: 'iqra-check-09',
		arabic: 'وَلَدٌ سَعِيدٌ',
		focus: 'Tandai di mana tanwin dibaca saat kata disambung.',
		check: 'Dammatain pada وَلَدٌ dan سَعِيدٌ berbunyi -un saat dibaca sambung, dengan ketentuan waqaf berbeda.'
	},
	{
		group: 'shadda',
		id: 'iqra-check-10',
		arabic: 'قَلَمٌ مُلَوَّنٌ',
		focus: 'Cari tanda yang merangkap satu konsonan.',
		check: 'Waw pada مُلَوَّنٌ memiliki tasydid; bedakan dari waw pemanjang vokal.'
	},
	{
		group: 'article',
		id: 'iqra-check-11',
		arabic: 'الشَّارِعُ طَوِيلٌ',
		focus: 'Dengarkan sendiri apakah lam pada al- diucapkan.',
		check: 'Awalan pada الشَّارِعُ melebur ke sy (huruf syamsiyyah), ditandai tasydid.'
	},
	{
		group: 'article',
		id: 'iqra-check-12',
		arabic: 'النَّافِذَةُ مَفْتُوحَةٌ',
		focus: 'Cari tasydid pada awal kata dan sukun di kata kedua.',
		check: 'Nun setelah al- dalam النَّافِذَةُ dirangkap; fa pada مَفْتُوحَةٌ bersukun.'
	},
	{
		group: 'article',
		id: 'iqra-check-13',
		arabic: 'الصَّبَاحُ جَمِيلٌ',
		focus: 'Bandingkan bunyi awal kata dengan huruf yang ditulis.',
		check: 'Shad dalam الصَّبَاحُ adalah huruf syamsiyyah: lam pada al- tidak dibunyikan terpisah.'
	},
	{
		group: 'article',
		id: 'iqra-check-14',
		arabic: 'الْقَمَرُ مُنِيرٌ',
		focus: 'Perhatikan apakah lam awalan terdengar.',
		check: 'Qaf huruf qamariyyah, sehingga lam pada الْقَمَرُ terdengar ketika mulai membaca.'
	},
	{
		group: 'article',
		id: 'iqra-check-15',
		arabic: 'الرَّجُلُ قَرِيبٌ',
		focus: 'Tunjukkan posisi tasydid setelah awalan al-.',
		check: 'Ra pada الرَّجُلُ dirangkap dan lam awalnya tidak diucapkan terpisah.'
	},
	{
		group: 'sentence',
		id: 'iqra-check-16',
		arabic: 'الْمَاءُ عَلَى الطَّاوِلَةِ.',
		focus: 'Baca satu kalimat penuh dan perhatikan peralihan antarkata.',
		check: 'Dalam الْمَاءُ, lam awalan terdengar; dalam الطَّاوِلَةِ ta setelah al- dirangkap. Jangan menghilangkan hamzah pada مَاء.'
	},
	{
		group: 'sentence',
		id: 'iqra-check-17',
		arabic: 'هَذَا الْقَلَمُ جَدِيدٌ.',
		focus: 'Kenali kelompok kata tanpa mengeja setiap huruf.',
		check: 'Baca هَذَا sebagai satu kata. Lam pada الْقَلَمُ terdengar. Pada berhenti akhir kalimat, tanwin berbeda dari bacaan sambung.'
	},
	{
		group: 'sentence',
		id: 'iqra-check-18',
		arabic: 'تَقْرَأُ الْبِنْتُ كِتَابًا.',
		focus: 'Perhatikan sukun, hamzah dan akhir kata terakhir.',
		check: 'Qaf pada تَقْرَأُ bersukun, hamzah tetap dibaca; lam pada الْبِنْتُ terdengar. Fathatain pada كِتَابًا berubah cara baca saat berhenti.'
	},
	{
		group: 'sentence',
		id: 'iqra-check-19',
		arabic: 'كَتَبَ الطَّالِبُ رِسَالَةً.',
		focus: 'Sambungkan tiga kata, lalu cek huruf syamsiyyah.',
		check: 'ط pada الطَّالِبُ dirangkap; akhir رِسَالَةً perlu dibedakan antara bacaan sambung dan waqaf.'
	},
	{
		group: 'sentence',
		id: 'iqra-check-20',
		arabic: 'الْمُدَرِّسُ فِي الْغُرْفَةِ.',
		focus: 'Tandai satu tasydid dan satu vokal panjang.',
		check: 'Ra pada الْمُدَرِّسُ bertanda tasydid; فِي mengandung vokal ī panjang. Lam awalan pada kata pertama dan terakhir terdengar.'
	}
];

export const iqraSelfCheckGroups: readonly IqraSelfCheckGroup[] = [
	{ id: 'vowels', title: 'Vokal dan sukun', items: items.filter((item) => item.group === 'vowels') },
	{ id: 'shadda', title: 'Tasydid dan tanwin', items: items.filter((item) => item.group === 'shadda') },
	{ id: 'article', title: 'Alif-lam syamsiyyah dan qamariyyah', items: items.filter((item) => item.group === 'article') },
	{ id: 'sentence', title: 'Baca kalimat berharakat', items: items.filter((item) => item.group === 'sentence') }
];

export const iqraSelfCheckSources = [{ label: 'W3C · Arabic layout requirements (tulisan dan harakat)', href: 'https://www.w3.org/TR/alreq/' }] as const;
