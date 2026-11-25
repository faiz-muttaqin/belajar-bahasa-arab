/**
 * G-02: the grammatical action (‘amal) of isim fā‘il and isim maf‘ūl. All Arabic sentences are
 * original and fully voweled; the sources support the rule statements only, not the sentences.
 * Scope is deliberately short: it does not list every classical condition or disputed case.
 */
import { rulePrerequisites, type RulePrerequisites } from './g02-types.js';

export const amalSources = [
	{
		id: 'fail',
		title: 'Wikipedia Arab · اسم الفاعل (bagian pembuka dan «عمله وأحكامه»)',
		url: 'https://ar.wikipedia.org/wiki/اسم_الفاعل',
		license: 'CC BY-SA 4.0',
		checked: '25 Nov 2026',
		note: 'Menyatakan bahwa isim fā‘il bekerja seperti fi‘ilnya; bekerja tanpa syarat bila disertai ال; tanpa ال memberi objek manṣūb dengan dua syarat, yaitu bermakna kini atau akan datang dan bersandar pada pertanyaan, penafian, mubtada (sebagai khabar), mauṣūf (sebagai na‘at) atau ṣāḥib al-ḥāl. Objek juga boleh dijadikan muḍāf ilaih. Contoh kalimat kita tidak berasal dari halaman ini. Teks artikel tampak rusak (paragraf tersambung di tengah kalimat) pada bagian «إضافته إلى مرفوعه» dan «عمله وأحكامه».'
	},
	{
		id: 'naib',
		title: 'Wikipedia Arab · نائب فاعل (bagian pembuka dan «ما يرفع نائب فاعل»)',
		url: 'https://ar.wikipedia.org/wiki/نائب_الفاعل',
		license:
			'CC BY-SA 4.0 (tertera pada halaman Wikipedia; belum diperiksa pada salinan yang dibaca)',
		checked: '25 Nov 2026',
		note: 'Bagian pembuka menyebut bahwa nā’ib al-fā‘il tidak hanya muncul sesudah fi‘il pasif, tetapi juga sesudah bentuk serupa seperti isim maf‘ūl. Bagian «ما يرفع نائب فاعل» menyatakan syaratnya sama dengan isim fā‘il: tanpa syarat bila disertai ال, dan bersandar pada penafian, pertanyaan, khabar, ṣifah atau ḥāl bila tanpa ال; Tanpa ال dan tanpa penyandaran, nā’ib al-fā‘il wajib berupa dhamir tersembunyi. Syarat tambahan: isim maf‘ūl tidak diberi sifat dan tidak di-iḍāfah-kan kepada selain ma‘mūl-nya; berbeda dari isim fā‘il, ia boleh di-iḍāfah-kan kepada ma‘mūl-nya. Syarat kini atau akan datang tidak diulang di bagian ini, hanya tercakup lewat rujukan ke isim fā‘il. Contohnya وَجَدتُ البُندُقِيَّةَ المَقتُول صَاحِبُهَا. Bagian ini dibaca dari teks artikel dan ringkasan pemeriksa; halaman اسم المفعول sendiri hanya membahas pembentukan.'
	}
] as const;

export type AmalSourceId = (typeof amalSources)[number]['id'];

export type AmalRule = {
	id: string;
	title: string;
	text: string;
	caution: string;
	prerequisites: RulePrerequisites;
	sourceId: AmalSourceId;
};

export const amalRules: readonly AmalRule[] = [
	{
		id: 'g02.amal-isim-fail',
		title: 'Isim fā‘il dapat memberi objek seperti fi‘ilnya',
		text: 'Isim fā‘il dari verba transitif dapat disusul maf‘ūl bih yang manṣūb. Bila disertai ال, ia bekerja tanpa syarat tambahan. Tanpa ال, ia me-rafa‘-kan fā‘il yang berupa isim nyata dan me-naṣab-kan objek dengan dua syarat: (1) bermakna kini atau akan datang, dan (2) bersandar pada kata sebelumnya, yaitu menjadi khabar bagi mubtada, na‘at atau ḥāl, atau didahului pertanyaan atau penafian. Fā‘il yang berupa dhamir tersembunyi tidak memerlukan syarat tambahan.',
		caution:
			'Hanya contoh dasar yang dibahas di sini. Untuk makna lampau dipakai fi‘il māḍī atau iḍāfah (كَاتِبُ الدَّرْسِ أَمْسِ); sumber artikel tidak menyatakan hal ini secara eksplisit. Syarat lain dan pendapat yang berbeda antara ahli nahwu tidak diuraikan; periksa kitab nahwu bila perlu.',
		prerequisites: rulePrerequisites(
			['g02.participle-dua-bentuk', 'g02.participle-irab'],
			['CB-14', 'CR-03']
		),
		sourceId: 'fail'
	},
	{
		id: 'g02.amal-idafah',
		title: 'Objek juga dapat menjadi muḍāf ilaih',
		text: 'Objek isim fā‘il dapat dijadikan muḍāf ilaih: كَاتِبٌ الدَّرْسَ menjadi كَاتِبُ الدَّرْسِ. Tanwin isim fā‘il hilang, dan objek menjadi majrūr. Maknanya tetap objek dari perbuatan itu.',
		caution:
			'Sumber menyatakan objek isim fā‘il boleh dijadikan muḍāf ilaih. Perbedaan pendapat yang dimuat sumber menyangkut iḍāfah isim fā‘il kepada fā‘il-nya, bukan kepada objeknya; hal itu tidak dibahas di sini.',
		prerequisites: rulePrerequisites(['g02.amal-isim-fail'], []),
		sourceId: 'fail'
	},
	{
		id: 'g02.amal-isim-maful',
		title: 'Isim maf‘ūl dapat disusul nā’ib al-fā‘il',
		text: 'Isim maf‘ūl berasal dari fi‘il pasif. Seperti fi‘il pasif, ia dapat disusul isim marfū‘ yang menjadi nā’ib al-fā‘il: الْغُرْفَةُ الْمَفْتُوحُ بَابُهَا (padanan فُتِحَ بَابُهَا). Isim maf‘ūl itu tetap mengikuti kata yang diterangkannya dalam i‘rāb dan ma‘rifah atau nakirah serta selalu tunggal, tetapi jenisnya (mudhakkar atau mu’annath) mengikuti nā’ib al-fā‘il sesudahnya. Aturan jenis ini tampak pada contoh sumber (isim maf‘ūl maskulin sesudah البُندُقِيَّة yang feminin), tetapi tidak dinyatakan sebagai aturan oleh sumber.',
		caution:
			'Dengan ال, isim maf‘ūl bekerja tanpa syarat; tanpa ال berlaku syarat penyandaran seperti pada isim fā‘il (sumber: bagian «ما يرفع نائب فاعل»). Syarat rinci lain tidak diuraikan di sini.',
		prerequisites: rulePrerequisites(['g02.amal-isim-fail'], ['CB-14']),
		sourceId: 'naib'
	},
	{
		id: 'g02.amal-batas',
		title: 'Tidak setiap isim fā‘il sedang bekerja',
		text: 'Isim fā‘il yang dipakai sebagai nama profesi atau sifat tetap tidak membawa objek manṣūb: هُوَ كَاتِبٌ مَشْهُورٌ. Periksa apakah ada maf‘ūl bih atau nā’ib al-fā‘il sebelum menyebut bahwa isim itu bekerja. Isim fā‘il dari verba intransitif tidak membawa objek.',
		caution:
			'Bentuk yang sama dapat menjadi nama profesi atau menyatakan perbuatan; konteks yang menentukan.',
		prerequisites: rulePrerequisites(['g02.amal-isim-fail', 'g02.participle-tidak-lazim'], []),
		sourceId: 'fail'
	}
];

export type AmalExample = {
	id: string;
	ruleId: string;
	arabic: string;
	translation: string;
	explanation: string;
};

export const amalExamples: readonly AmalExample[] = [
	{
		id: 'amal-ex-01',
		ruleId: 'g02.amal-isim-fail',
		arabic: 'الطَّالِبُ الْقَارِئُ الدَّرْسَ أَخِي.',
		translation: 'Siswa yang membaca pelajaran itu adalah saudara saya.',
		explanation:
			'الْقَارِئُ adalah isim fā‘il dengan ال (bermakna الَّذِي يَقْرَأُ) dan menjadi na‘at untuk الطَّالِبُ. الدَّرْسَ adalah maf‘ūl bih manṣūb dari الْقَارِئُ. Seluruh frasa الطَّالِبُ الْقَارِئُ الدَّرْسَ adalah mubtada, dan أَخِي adalah khabar yang marfū‘ dengan ḍammah muqaddarah.'
	},
	{
		id: 'amal-ex-02',
		ruleId: 'g02.amal-isim-fail',
		arabic: 'هَذَا الطَّالِبُ كَاتِبٌ الدَّرْسَ الْآنَ.',
		translation: 'Siswa ini sedang menulis pelajaran sekarang.',
		explanation:
			'كَاتِبٌ adalah isim fā‘il tanpa ال dan menjadi khabar. Fā‘ilnya dhamir tersembunyi هُوَ, dan الْآنَ menunjukkan makna kini. كَاتِبٌ bersandar pada mubtada sebagai khabar, sehingga dapat bekerja. الدَّرْسَ adalah maf‘ūl bih manṣūb, seperti pada يَكْتُبُ الدَّرْسَ.'
	},
	{
		id: 'amal-ex-03',
		ruleId: 'g02.amal-isim-fail',
		arabic: 'أَمُسْتَقْبِلٌ الْمُدِيرُ الضُّيُوفَ غَدًا؟',
		translation: 'Apakah direktur akan menyambut para tamu besok?',
		explanation:
			'مُسْتَقْبِلٌ adalah isim fā‘il Form X yang bersandar pada hamzah pertanyaan dan bermakna akan datang (غَدًا). الْمُدِيرُ adalah fā‘ilnya, isim nyata yang marfū‘, dan الضُّيُوفَ adalah maf‘ūl bih manṣūb. Dalam i‘rāb, مُسْتَقْبِلٌ adalah mubtada dan الْمُدِيرُ adalah fā‘il yang menempati kedudukan khabar. Susunan ini baku dan klasik; dalam bahasa Arab modern lazim dipakai fi‘il: هَلْ يَسْتَقْبِلُ الْمُدِيرُ الضُّيُوفَ غَدًا؟'
	},
	{
		id: 'amal-ex-04',
		ruleId: 'g02.amal-idafah',
		arabic: 'هَذَا الطَّالِبُ كَاتِبُ الدَّرْسِ الْآنَ.',
		translation: 'Siswa ini sedang menulis pelajaran sekarang.',
		explanation:
			'Maknanya sama dengan kalimat sebelumnya, tetapi objeknya menjadi muḍāf ilaih. كَاتِبُ adalah muḍāf (tanpa tanwin) dan الدَّرْسِ adalah muḍāf ilaih majrūr. Dari segi makna, الدَّرْسِ tetap objek dari perbuatan menulis. Tanpa الْآنَ, frasa كَاتِبُ الدَّرْسِ juga dapat dibaca sebagai kata benda (penulis pelajaran itu); konteks yang menentukan.'
	},
	{
		id: 'amal-ex-05',
		ruleId: 'g02.amal-isim-maful',
		arabic: 'دَخَلْنَا الْغُرْفَةَ الْمَفْتُوحَ بَابُهَا.',
		translation: 'Kami memasuki ruangan yang pintunya terbuka.',
		explanation:
			'الْمَفْتُوحَ adalah isim maf‘ūl dan menjadi na‘at untuk الْغُرْفَةَ (manṣūb karena maf‘ūl bih dari دَخَلْنَا). بَابُهَا adalah nā’ib al-fā‘il yang marfū‘ dan muḍāf kepada dhamir ـهَا; padanan pasifnya فُتِحَ بَابُهَا. الْمَفْتُوحَ maskulin karena mengikuti بَابُ, bukan الْغُرْفَةَ yang feminin.'
	},
	{
		id: 'amal-ex-06',
		ruleId: 'g02.amal-isim-maful',
		arabic: 'الْمُوَظَّفُ الْمَكْتُوبُ اسْمُهُ فِي الْقَائِمَةِ حَاضِرٌ.',
		translation: 'Karyawan yang namanya tertulis dalam daftar itu hadir.',
		explanation:
			'الْمَكْتُوبُ adalah isim maf‘ūl yang menjadi na‘at untuk الْمُوَظَّفُ. اسْمُهُ adalah nā’ib al-fā‘il yang marfū‘ (padanan كُتِبَ اسْمُهُ), فِي الْقَائِمَةِ adalah jar–majrūr, dan حَاضِرٌ adalah khabar bagi الْمُوَظَّفُ.'
	},
	{
		id: 'amal-ex-07',
		ruleId: 'g02.amal-batas',
		arabic: 'هُوَ كَاتِبٌ مَشْهُورٌ.',
		translation: 'Dia seorang penulis yang terkenal.',
		explanation:
			'كَاتِبٌ di sini adalah nama profesi dan menjadi khabar, dan مَشْهُورٌ adalah na‘at-nya. Tidak ada maf‘ūl bih atau nā’ib al-fā‘il, sehingga isim ini tidak sedang bekerja seperti fi‘il.'
	}
];

export type AmalTaskKind = 'recognise' | 'case' | 'contrast' | 'limit';

export type AmalTask = {
	id: string;
	ruleId: string;
	kind: AmalTaskKind;
	arabic: string;
	question: string;
	answer: string;
	status: 'draft';
};

export const amalTasks: readonly AmalTask[] = [
	{
		id: 'amal-01',
		ruleId: 'g02.amal-isim-fail',
		kind: 'recognise',
		arabic: 'الْمُهَنْدِسُ مُصَمِّمٌ الْجِسْرَ الْجَدِيدَ الْآنَ.',
		question: 'Kata mana yang bekerja seperti fi‘il, dan apa objeknya?',
		answer:
			'مُصَمِّمٌ adalah isim fā‘il Form II yang menjadi khabar dan bermakna kini (الْآنَ); fā‘ilnya dhamir tersembunyi هُوَ. الْجِسْرَ adalah maf‘ūl bih manṣūb dan الْجَدِيدَ adalah na‘at-nya: insinyur itu sedang merancang jembatan baru sekarang.',
		status: 'draft'
	},
	{
		id: 'amal-02',
		ruleId: 'g02.amal-isim-fail',
		kind: 'case',
		arabic: 'أَنَا مُرْسِلٌ الرِّسَالَةَ غَدًا.',
		question: 'Mengapa الرِّسَالَةَ berakhir fatḥah?',
		answer:
			'مُرْسِلٌ adalah isim fā‘il Form IV, khabar bagi أَنَا, dan bermakna akan datang (غَدًا). Seperti أُرْسِلُ, ia membawa objek, sehingga الرِّسَالَةَ adalah maf‘ūl bih manṣūb: saya akan mengirim surat besok.',
		status: 'draft'
	},
	{
		id: 'amal-03',
		ruleId: 'g02.amal-idafah',
		kind: 'contrast',
		arabic: 'هَذَا الطَّالِبُ قَارِئُ الْكِتَابِ الْآنَ.',
		question: 'Apa bedanya dengan هَذَا الطَّالِبُ قَارِئٌ الْكِتَابَ الْآنَ؟',
		answer:
			'Di sini قَارِئُ adalah muḍāf tanpa tanwin dan الْكِتَابِ adalah muḍāf ilaih majrūr. Pada versi bertanwin, objek manṣūb. Artinya sama: siswa ini sedang membaca buku. Tanpa الْآنَ, قَارِئُ الْكِتَابِ juga dapat dibaca sebagai kata benda (pembaca buku itu); konteks yang menentukan.',
		status: 'draft'
	},
	{
		id: 'amal-04',
		ruleId: 'g02.amal-isim-fail',
		kind: 'limit',
		arabic: 'الْمُوَظَّفُ كَتَبَ الرِّسَالَةَ أَمْسِ.',
		question: 'Mengapa untuk perbuatan kemarin dipakai fi‘il, bukan كَاتِبٌ الرِّسَالَةَ؟',
		answer:
			'Tanpa ال, isim fā‘il yang memberi objek manṣūb lazim bermakna kini atau akan datang. Untuk makna lampau dipakai fi‘il māḍī seperti كَتَبَ di sini, atau iḍāfah: karyawan itu menulis surat kemarin.',
		status: 'draft'
	},
	{
		id: 'amal-05',
		ruleId: 'g02.amal-isim-maful',
		kind: 'case',
		arabic: 'رَأَيْتُ الْبَابَ الْمَكْسُورَ قُفْلُهُ.',
		question: 'Apa kedudukan قُفْلُهُ, dan mengapa marfū‘?',
		answer:
			'قُفْلُهُ adalah nā’ib al-fā‘il bagi isim maf‘ūl الْمَكْسُورَ, seperti pada كُسِرَ قُفْلُهُ. Ia marfū‘ dengan ḍammah dan muḍāf kepada dhamir ـهُ. الْمَكْسُورَ sendiri manṣūb sebagai na‘at untuk الْبَابَ: saya melihat pintu yang kuncinya rusak.',
		status: 'draft'
	},
	{
		id: 'amal-06',
		ruleId: 'g02.amal-isim-maful',
		kind: 'contrast',
		arabic: 'زُرْنَا الْبَلَدَ الْمَعْرُوفَةَ آثَارُهُ.',
		question: 'Mengapa الْمَعْرُوفَةَ feminin padahal الْبَلَدَ maskulin, dan apa nā’ib al-fā‘il-nya?',
		answer:
			'الْبَلَدَ maskulin, tetapi الْمَعْرُوفَةَ feminin karena jenisnya mengikuti nā’ib al-fā‘il sesudahnya, yaitu آثَارُهُ (jamak benda tak berakal, diperlakukan feminin tunggal). Dalam i‘rāb dan ketakrifan, الْمَعْرُوفَةَ tetap mengikuti الْبَلَدَ, sehingga manṣūb. آثَارُهُ adalah nā’ib al-fā‘il yang marfū‘ dan muḍāf kepada ـهُ: kami mengunjungi negeri yang peninggalannya terkenal.',
		status: 'draft'
	},
	{
		id: 'amal-07',
		ruleId: 'g02.amal-batas',
		kind: 'limit',
		arabic: 'أَخِي مُدَرِّسٌ مَاهِرٌ.',
		question: 'Apakah مُدَرِّسٌ di sini memberi objek manṣūb?',
		answer:
			'Tidak. مُدَرِّسٌ dipakai sebagai nama profesi dan menjadi khabar, dan مَاهِرٌ adalah na‘at-nya. Tidak ada maf‘ūl bih atau nā’ib al-fā‘il, jadi isim ini tidak sedang bekerja seperti fi‘il: saudara laki-laki saya guru yang mahir.',
		status: 'draft'
	}
];

export function validateAmal(): string[] {
	const errors: string[] = [];
	const ruleIds = new Set(amalRules.map((rule) => rule.id));
	const seen = new Set<string>();
	for (const item of [...amalExamples, ...amalTasks]) {
		if (seen.has(item.id)) errors.push(`Duplicate ID: ${item.id}`);
		seen.add(item.id);
		if (!ruleIds.has(item.ruleId)) errors.push(`Unknown rule: ${item.id}`);
		if (!item.arabic.trim()) errors.push(`Empty Arabic: ${item.id}`);
	}
	const stimuli = [...amalExamples, ...amalTasks].map((item) => item.arabic.normalize('NFC'));
	if (new Set(stimuli).size !== stimuli.length) errors.push('Duplicate Arabic sentence');
	for (const rule of amalRules) {
		if (!amalExamples.some((item) => item.ruleId === rule.id))
			errors.push(`Rule without example: ${rule.id}`);
		if (!amalTasks.some((item) => item.ruleId === rule.id))
			errors.push(`Rule without task: ${rule.id}`);
	}
	return errors;
}
