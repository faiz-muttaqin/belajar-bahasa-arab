/**
 * D-05c: curated alternative frames for the G-05 clause cards (‘aṭf, isim mawṣūl + ṣilah, syarat).
 *
 * Same contract as sentence-frames.ts: one frame is one complete example, original
 * curriculum examples are referenced by id, new ones are authored for the project and
 * stay `draft`. Reasons, contrast and adjunct cards have no sourced alternative and stay static.
 */
import type { ClauseExample, ClauseSpan, ClauseSpanKind, ClauseToken } from './clause-rules.js';
import type { VerbMood } from './sentence-rules.js';
import type { IrabCase } from './phrase-rules.js';
import type {
	ClauseTemplate,
	FrameDef,
	FrameGap,
	SlotMeta
} from '#lib/domain/grammar/frame-types.js';
import { d03, slot, sourcesFor } from './frame-authoring.js';

export type ClauseFrame = FrameDef<ClauseExample, ClauseTemplate>;

type Part = { token: ClauseToken; slot: SlotMeta };

const noun = (
	arabic: string,
	gloss: string,
	role: string,
	irab: IrabCase,
	marker: string,
	lexemeId: string,
	features: string,
	options: { from?: string; clitic?: 'وَ' | 'فَ'; stem?: string } = {}
): Part => ({
	token: { arabic, gloss, role, irab, marker },
	slot: slot(lexemeId, 'noun', features, options)
});

const adjective = (
	arabic: string,
	gloss: string,
	role: string,
	irab: IrabCase,
	marker: string,
	lexemeId: string,
	features: string
): Part => ({
	token: { arabic, gloss, role, irab, marker },
	slot: slot(lexemeId, 'adjective', features)
});

const verbPart = (
	arabic: string,
	gloss: string,
	role: string,
	meta: SlotMeta,
	mood?: VerbMood,
	marker?: string
): Part => ({ token: { arabic, gloss, role, mood, marker }, slot: meta });

const variantVerb = (
	arabic: string,
	gloss: string,
	role: string,
	lexemeId: string,
	features: string,
	from: string,
	options: { clitic?: 'وَ' | 'فَ'; stem?: string; mood?: VerbMood; marker?: string } = {}
): Part =>
	verbPart(
		arabic,
		gloss,
		role,
		slot(lexemeId, 'verb', features, { from, clitic: options.clitic, stem: options.stem }),
		options.mood,
		options.marker
	);

const word = (arabic: string, gloss: string, role: string, lexemeId: string): Part => ({
	token: { arabic, gloss, role },
	slot: slot(lexemeId, 'particle', '')
});

function span(id: string, kind: ClauseSpanKind, note: string, parts: readonly Part[]) {
	return { id, kind, note, parts };
}
type SpanSpec = ReturnType<typeof span>;

type Extra = { pluralAnimacy?: 'human' | 'nonhuman' };

function authored(
	id: string,
	family: string,
	ruleId: string,
	template: ClauseTemplate,
	spans: readonly SpanSpec[],
	translation: string,
	explanation: string,
	basis: string,
	extra: Extra = {}
): ClauseFrame {
	const slots = spans.flatMap((item) => item.parts.map((part) => part.slot));
	const clauseSpans: ClauseSpan[] = spans.map((item) => ({
		id: item.id,
		kind: item.kind,
		note: item.note,
		tokens: item.parts.map((part) => part.token)
	}));
	return {
		id,
		family,
		ruleId,
		template,
		example: { id, spans: clauseSpans, translation, explanation },
		slots,
		...extra,
		provenance: { basis, sources: sourcesFor(slots) }
	};
}

function original(
	id: string,
	family: string,
	ruleId: string,
	template: ClauseTemplate,
	slots: readonly SlotMeta[]
): ClauseFrame {
	return {
		id,
		family,
		ruleId,
		template,
		original: true,
		slots,
		provenance: {
			basis: 'Contoh asli G-05 dari kurikulum proyek; metadata slot ditulis oleh pengurasi.',
			sources: sourcesFor(slots)
		}
	};
}

const own = (note: string) =>
	'Kalimat ditulis untuk proyek ini dari bentuk yang sudah tercatat. ' + note;

const FAM = {
	actions: 'c-athaf-actions',
	then: 'c-athaf-then',
	subjects: 'c-athaf-subjects',
	relative: 'c-relative',
	condition: 'c-condition'
} as const;

// Slot metadata reused by original examples.
const talib = slot('msa-talib', 'noun', 'm sg def');
const talibah = slot('curr-talibah', 'noun', 'f sg def');
const kitab = slot('msa-kitab', 'noun', 'm sg def');
const dars = slot('curr-dars', 'noun', 'm sg def');
const alladhi = slot('curr-alladhi', 'noun', 'm sg def');
const allati = slot('curr-allati', 'noun', 'f sg def');
const mujtahid = slot('curr-mujtahid', 'adjective', 'm sg indef');
const mujtahidah = slot('curr-mujtahid', 'adjective', 'f sg indef');
const mufid = slot('msa-mufid', 'adjective', 'm sg indef');
const nonVerb = (id: string) => slot(id, 'particle', '');

const sila = (lexemeId: string, features: string) => slot(lexemeId, 'verb', features);

export const clauseFrames: readonly ClauseFrame[] = [
	// ---- ‘Aṭf: dua tindakan oleh pelaku yang sama ---------------------------------------
	original('and-two-actions', FAM.actions, 'coordination', 'athaf-actions', [
		d03('fiil-qaraa', 'past'),
		talib,
		kitab,
		slot('fiil-kataba', 'verb', '3 m sg perf act', { clitic: 'وَ', stem: 'كَتَبَ' }),
		dars
	]),
	authored(
		'athaf-girl',
		FAM.actions,
		'coordination',
		'athaf-actions',
		[
			span('first', 'main', 'Tindakan pertama', [
				variantVerb('قَرَأَتِ', 'telah membaca', 'Fi‘il māḍī', 'fiil-qaraa', '3 f sg perf act', 'قَرَأَ'),
				noun('الطَّالِبَةُ', 'siswi itu', 'Fā‘il', 'raf', 'ḍamma', 'curr-talibah', 'f sg def'),
				noun('الْكِتَابَ', 'buku itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-kitab', 'm sg def')
			]),
			span('join', 'link', 'وَ tersambung pada fi‘il kedua', [
				variantVerb(
					'وَكَتَبَتِ',
					'dan telah menulis',
					'وَ + fi‘il māḍī; fā‘il tersirat هِيَ',
					'fiil-kataba',
					'3 f sg perf act',
					'كَتَبَ',
					{ clitic: 'وَ', stem: 'كَتَبَتِ' }
				)
			]),
			span('next', 'main', 'Tindakan kedua, fā‘il tersirat هِيَ', [
				noun('الدَّرْسَ', 'pelajaran itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'curr-dars', 'm sg def')
			])
		],
		'Siswi itu telah membaca buku itu dan menulis pelajaran itu.',
		'وَ melekat pada كَتَبَتِ. Pelaku kedua sama dengan pelaku pertama, maka kedua fi‘il feminin: قَرَأَتْ dibaca قَرَأَتِ dan كَتَبَتْ dibaca كَتَبَتِ karena bertemu ال-.',
		own('قَرَأَتِ dan كَتَبَتِ disusun dari قَرَأَ dan كَتَبَ (D-03) sebagai bentuk feminin.')
	),
	authored(
		'athaf-guard',
		FAM.actions,
		'coordination',
		'athaf-actions',
		[
			span('first', 'main', 'Tindakan pertama', [
				verbPart('فَتَحَ', 'telah membuka', 'Fi‘il māḍī', d03('fiil-fataha', 'past')),
				noun('الْحَارِسُ', 'penjaga itu', 'Fā‘il', 'raf', 'ḍamma', 'curr-haris', 'm sg def'),
				noun('الْبَابَ', 'pintu itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'bab', 'm sg def')
			]),
			span('join', 'link', 'وَ tersambung pada fi‘il kedua yang lazim, fā‘il tersirat هُوَ', [
				variantVerb(
					'وَدَخَلَ',
					'dan masuk',
					'وَ + fi‘il māḍī lazim',
					'wikt-dakhala',
					'3 m sg perf act',
					'دَخَلَ',
					{ clitic: 'وَ', stem: 'دَخَلَ' }
				)
			])
		],
		'Penjaga itu membuka pintu dan masuk.',
		'وَدَخَلَ satu token. دَخَلَ dipakai lazim pada contoh ini, jadi tidak ada objek kedua; pelakunya tetap penjaga yang sama.',
		own('فَتَحَ dari D-03; دَخَلَ adalah token contoh G-05 (then-sequence), وَ ditambahkan penulis.')
	),
	authored(
		'athaf-boy',
		FAM.actions,
		'coordination',
		'athaf-actions',
		[
			span('first', 'main', 'Tindakan pertama', [
				verbPart('كَتَبَ', 'telah menulis', 'Fi‘il māḍī', d03('fiil-kataba', 'past')),
				noun('الْوَلَدُ', 'anak laki-laki itu', 'Fā‘il', 'raf', 'ḍamma', 'msa-walad', 'm sg def'),
				noun('الرِّسَالَةَ', 'surat itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-risalah', 'f sg def')
			]),
			span('join', 'link', 'وَ tersambung pada fi‘il kedua', [
				variantVerb(
					'وَقَرَأَ',
					'dan membaca',
					'وَ + fi‘il māḍī',
					'fiil-qaraa',
					'3 m sg perf act',
					'قَرَأَ',
					{ clitic: 'وَ', stem: 'قَرَأَ' }
				)
			]),
			span('next', 'main', 'Tindakan kedua, fā‘il tersirat هُوَ', [
				noun('الْكِتَابَ', 'buku itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-kitab', 'm sg def')
			])
		],
		'Anak laki-laki itu menulis surat dan membaca buku.',
		'Dua tindakan oleh pelaku yang sama; objek tiap tindakan manṣūb.',
		own('Fi‘il dari D-03 (kataba, qaraa); isim adalah bentuk pilot G-06, وَ ditambahkan penulis.')
	),

	// ---- ‘Aṭf dengan ثُمَّ ---------------------------------------------------------------
	original('then-sequence', FAM.then, 'coordination', 'athaf-sequence', [
		slot('wikt-dakhala', 'verb', '3 m sg perf act'),
		talib,
		nonVerb('curr-thumma'),
		slot('wikt-jalasa', 'verb', '3 m sg perf act')
	]),
	authored(
		'then-girl',
		FAM.then,
		'coordination',
		'athaf-sequence',
		[
			span('first', 'main', 'Kejadian pertama', [
				variantVerb('دَخَلَتِ', 'telah masuk', 'Fi‘il māḍī', 'wikt-dakhala', '3 f sg perf act', 'دَخَلَ'),
				noun('الطَّالِبَةُ', 'siswi itu', 'Fā‘il', 'raf', 'ḍamma', 'curr-talibah', 'f sg def')
			]),
			span('then', 'link', 'Urutan dengan jeda', [
				word('ثُمَّ', 'kemudian', 'Huruf ‘aṭf', 'curr-thumma')
			]),
			span('second', 'result', 'Kejadian berikutnya', [
				variantVerb(
					'جَلَسَتْ',
					'telah duduk',
					'Fi‘il māḍī; fā‘il tersirat هِيَ',
					'wikt-jalasa',
					'3 f sg perf act',
					'جَلَسَ'
				)
			])
		],
		'Siswi itu masuk, kemudian duduk.',
		'ثُمَّ menandai urutan; fi‘il kedua feminin (جَلَسَتْ) karena pelakunya siswi yang sama. دَخَلَتْ dibaca دَخَلَتِ karena bertemu ال-; جَلَسَتْ di akhir kalimat tetap bersukūn.',
		own('دَخَلَتِ dan جَلَسَتْ disusun dari دَخَلَ dan جَلَسَ sebagai bentuk feminin.')
	),
	authored(
		'then-teacher',
		FAM.then,
		'coordination',
		'athaf-sequence',
		[
			span('first', 'main', 'Kejadian pertama', [
				verbPart('جَاءَ', 'telah datang', 'Fi‘il māḍī', slot('wikt-jaa', 'verb', '3 m sg perf act')),
				noun('الْمُعَلِّمُ', 'guru itu', 'Fā‘il', 'raf', 'ḍamma', 'curr-muallim', 'm sg def')
			]),
			span('then', 'link', 'Urutan dengan jeda', [
				word('ثُمَّ', 'kemudian', 'Huruf ‘aṭf', 'curr-thumma')
			]),
			span('second', 'result', 'Kejadian berikutnya', [
				verbPart(
					'جَلَسَ',
					'telah duduk',
					'Fi‘il māḍī; fā‘il tersirat هُوَ',
					slot('wikt-jalasa', 'verb', '3 m sg perf act')
				)
			])
		],
		'Guru itu datang, kemudian duduk.',
		'Fā‘il جَلَسَ tersirat (هُوَ) dan mengacu kepada guru tadi.',
		own('Semua token adalah token contoh G-05 yang sudah ada.')
	),
	authored(
		'then-attend',
		FAM.then,
		'coordination',
		'athaf-sequence',
		[
			span('first', 'main', 'Kejadian pertama', [
				verbPart(
					'حَضَرَ',
					'telah hadir',
					'Fi‘il māḍī',
					slot('wikt-hadara', 'verb', '3 m sg perf act')
				),
				noun('الطَّالِبُ', 'murid itu', 'Fā‘il', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
			]),
			span('then', 'link', 'Urutan dengan jeda', [
				word('ثُمَّ', 'kemudian', 'Huruf ‘aṭf', 'curr-thumma')
			]),
			span('second', 'result', 'Kejadian berikutnya', [
				verbPart(
					'جَلَسَ',
					'telah duduk',
					'Fi‘il māḍī; fā‘il tersirat هُوَ',
					slot('wikt-jalasa', 'verb', '3 m sg perf act')
				)
			])
		],
		'Murid itu hadir, kemudian duduk.',
		'ثُمَّ menunjukkan urutan; kedua fi‘il dipakai lazim pada contoh ini dan memakai pelaku yang sama.',
		own('Semua token adalah token contoh G-05 yang sudah ada.')
	),

	// ---- ‘Aṭf antar fā‘il ----------------------------------------------------------------
	original('coordinated-subjects', FAM.subjects, 'coordination', 'athaf-subjects', [
		slot('wikt-jaa', 'verb', '3 m sg perf act'),
		slot('curr-muallim', 'noun', 'm sg def'),
		slot('msa-talib', 'noun', 'm sg def', { clitic: 'وَ', stem: 'الطَّالِبُ' })
	]),
	authored(
		'subj-attend',
		FAM.subjects,
		'coordination',
		'athaf-subjects',
		[
			span('verb', 'main', 'Kejadian', [
				verbPart('حَضَرَ', 'telah hadir', 'Fi‘il māḍī', slot('wikt-hadara', 'verb', '3 m sg perf act'))
			]),
			span('subject', 'main', 'Ma‘ṭūf ‘alaih yang marfū‘', [
				noun('الطَّالِبُ', 'murid itu', 'Fā‘il', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
			]),
			span('join', 'link', 'Wāw melekat pada ma‘ṭūf', [
				noun('وَالْمُعَلِّمُ', 'dan guru itu', 'وَ + ma‘ṭūf', 'raf', 'ḍamma', 'curr-muallim', 'm sg def', {
					from: 'الْمُعَلِّمُ',
					clitic: 'وَ',
					stem: 'الْمُعَلِّمُ'
				})
			])
		],
		'Murid dan guru itu hadir.',
		'الْمُعَلِّمُ di-‘aṭf-kan pada fā‘il sehingga tetap marfū‘, walaupun وَ melekat pada kata itu.',
		own('Semua kata adalah token contoh G-05; hanya susunan وَ + ma‘ṭūf yang ditulis ulang.')
	),
	authored(
		'subj-guard-ustadh',
		FAM.subjects,
		'coordination',
		'athaf-subjects',
		[
			span('verb', 'main', 'Kejadian', [
				verbPart('جَاءَ', 'telah datang', 'Fi‘il māḍī', slot('wikt-jaa', 'verb', '3 m sg perf act'))
			]),
			span('subject', 'main', 'Ma‘ṭūf ‘alaih yang marfū‘', [
				noun('الْحَارِسُ', 'penjaga itu', 'Fā‘il', 'raf', 'ḍamma', 'curr-haris', 'm sg def')
			]),
			span('join', 'link', 'Wāw melekat pada ma‘ṭūf', [
				noun('وَالْأُسْتَاذُ', 'dan guru itu', 'وَ + ma‘ṭūf', 'raf', 'ḍamma', 'msa-ustadh', 'm sg def', {
					from: 'الْأُسْتَاذُ',
					clitic: 'وَ',
					stem: 'الْأُسْتَاذُ'
				})
			])
		],
		'Penjaga dan guru itu datang.',
		'Ma‘ṭūf mengikuti kasus ma‘ṭūf ‘alaih; fi‘il tetap tunggal dan maskulin.',
		own('الْأُسْتَاذُ adalah bentuk pilot G-06; وَ ditambahkan penulis.')
	),

	// ---- Isim mawṣūl dan ṣilah ---------------------------------------------------------
	original('relative-male', FAM.relative, 'relative-clauses', 'relative', [
		talib,
		alladhi,
		d03('fiil-qaraa', 'present'),
		kitab,
		mujtahid
	]),
	original('relative-female', FAM.relative, 'relative-clauses', 'relative', [
		talibah,
		allati,
		slot('fiil-kataba', 'verb', '3 f sg impf act'),
		dars,
		mujtahidah
	]),
	original('relative-object-return', FAM.relative, 'relative-clauses', 'relative', [
		kitab,
		alladhi,
		sila('fiil-qaraa', '1 sg perf act'),
		mufid
	]),
	authored(
		'rel-male-write',
		FAM.relative,
		'relative-clauses',
		'relative',
		[
			span('topic', 'main', 'Mubtada yang diterangkan', [
				noun('الطَّالِبُ', 'murid itu', 'Mubtada', 'raf', 'ḍamma', 'msa-talib', 'm sg def')
			]),
			span('relative', 'link', 'Isim mawṣūl maskulin', [
				{ token: { arabic: 'الَّذِي', gloss: 'yang', role: 'Isim mawṣūl' }, slot: alladhi }
			]),
			span('sila', 'relative', 'Jumlah ṣilah', [
				verbPart(
					'يَكْتُبُ',
					'menulis',
					'Fi‘il, fā‘il tersirat',
					d03('fiil-kataba', 'present'),
					'indicative',
					'ḍamma'
				),
				noun('الدَّرْسَ', 'pelajaran itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'curr-dars', 'm sg def')
			]),
			span('predicate', 'main', 'Khabar dari mubtada awal', [
				adjective('مُجْتَهِدٌ', 'rajin', 'Khabar', 'raf', 'tanwin ḍamm', 'curr-mujtahid', 'm sg indef')
			])
		],
		'Murid yang menulis pelajaran itu rajin.',
		'الَّذِي + يَكْتُبُ الدَّرْسَ menerangkan الطَّالِبُ; مُجْتَهِدٌ adalah khabar utama.',
		own('يَكْتُبُ dari D-03 (kataba); sisanya token contoh G-05.')
	),
	authored(
		'rel-female-read',
		FAM.relative,
		'relative-clauses',
		'relative',
		[
			span('topic', 'main', 'Mubtada feminin', [
				noun('الطَّالِبَةُ', 'siswi itu', 'Mubtada', 'raf', 'ḍamma', 'curr-talibah', 'f sg def')
			]),
			span('relative', 'link', 'Isim mawṣūl feminin', [
				{ token: { arabic: 'الَّتِي', gloss: 'yang', role: 'Isim mawṣūl' }, slot: allati }
			]),
			span('sila', 'relative', 'Jumlah ṣilah', [
				variantVerb(
					'تَقْرَأُ',
					'membaca',
					'Fi‘il, fā‘il tersirat هِيَ',
					'fiil-qaraa',
					'3 f sg impf act',
					'يَقْرَأُ',
					{ mood: 'indicative', marker: 'ḍamma' }
				),
				noun('الْكِتَابَ', 'buku itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'msa-kitab', 'm sg def')
			]),
			span('predicate', 'main', 'Khabar feminin', [
				adjective('مُجْتَهِدَةٌ', 'rajin', 'Khabar', 'raf', 'tanwin ḍamm', 'curr-mujtahid', 'f sg indef')
			])
		],
		'Siswi yang membaca buku itu rajin.',
		'الَّتِي mengikuti kata benda feminin; fi‘il ṣilah feminin (تَقْرَأُ) dengan fā‘il tersirat هِيَ.',
		own('تَقْرَأُ disusun dari يَقْرَأُ (D-03) sebagai bentuk feminin; sisanya token contoh G-05.')
	),
	authored(
		'rel-male-open',
		FAM.relative,
		'relative-clauses',
		'relative',
		[
			span('topic', 'main', 'Mubtada yang diterangkan', [
				noun('الْحَارِسُ', 'penjaga itu', 'Mubtada', 'raf', 'ḍamma', 'curr-haris', 'm sg def')
			]),
			span('relative', 'link', 'Isim mawṣūl maskulin', [
				{ token: { arabic: 'الَّذِي', gloss: 'yang', role: 'Isim mawṣūl' }, slot: alladhi }
			]),
			span('sila', 'relative', 'Jumlah ṣilah', [
				verbPart(
					'يَفْتَحُ',
					'membuka',
					'Fi‘il, fā‘il tersirat',
					d03('fiil-fataha', 'present'),
					'indicative',
					'ḍamma'
				),
				noun('الْبَابَ', 'pintu itu', 'Maf‘ūl bih', 'nasb', 'fatḥa', 'bab', 'm sg def')
			]),
			span('predicate', 'main', 'Khabar dari mubtada awal', [
				adjective('مُجْتَهِدٌ', 'rajin', 'Khabar', 'raf', 'tanwin ḍamm', 'curr-mujtahid', 'm sg indef')
			])
		],
		'Penjaga yang membuka pintu itu rajin.',
		'Ṣilah berisi fi‘il dan objek manṣūb; fā‘ilnya tersirat dan kembali ke الْحَارِسُ.',
		own('يَفْتَحُ dari D-03 (fataha); sisanya token contoh G-04/G-05.')
	),
	authored(
		'rel-return-lesson',
		FAM.relative,
		'relative-clauses',
		'relative',
		[
			span('topic', 'main', 'Benda yang diterangkan', [
				noun('الدَّرْسُ', 'pelajaran itu', 'Mubtada', 'raf', 'ḍamma', 'curr-dars', 'm sg def')
			]),
			span('relative', 'link', 'Isim mawṣūl', [
				{ token: { arabic: 'الَّذِي', gloss: 'yang', role: 'Isim mawṣūl' }, slot: alladhi }
			]),
			span('sila', 'relative', 'Ḍamīr -هُ kembali ke الدَّرْسُ', [
				verbPart(
					'قَرَأْتُهُ',
					'saya membacanya',
					'Fi‘il + subjek + dhamir objek',
					sila('fiil-qaraa', '1 sg perf act')
				)
			]),
			span('predicate', 'main', 'Khabar utama', [
				adjective('مُفِيدٌ', 'bermanfaat', 'Khabar', 'raf', 'tanwin ḍamm', 'msa-mufid', 'm sg indef')
			])
		],
		'Pelajaran yang saya baca itu bermanfaat.',
		'Sufiks ـهُ pada قَرَأْتُهُ adalah ‘ā’id yang merujuk kepada الدَّرْسُ (maskulin); jangan dipisahkan dengan spasi.',
		own('Semua token adalah token contoh G-04/G-05; hanya kepala frasa yang diganti.')
	),
	authored(
		'rel-return-book-easy',
		FAM.relative,
		'relative-clauses',
		'relative',
		[
			span('topic', 'main', 'Benda yang diterangkan', [
				noun('الْكِتَابُ', 'buku itu', 'Mubtada', 'raf', 'ḍamma', 'msa-kitab', 'm sg def')
			]),
			span('relative', 'link', 'Isim mawṣūl', [
				{ token: { arabic: 'الَّذِي', gloss: 'yang', role: 'Isim mawṣūl' }, slot: alladhi }
			]),
			span('sila', 'relative', 'Ḍamīr -هُ kembali ke الْكِتَابُ', [
				verbPart(
					'قَرَأْتُهُ',
					'saya membacanya',
					'Fi‘il + subjek + dhamir objek',
					sila('fiil-qaraa', '1 sg perf act')
				)
			]),
			span('predicate', 'main', 'Khabar utama', [
				adjective('سَهْلٌ', 'mudah', 'Khabar', 'raf', 'tanwin ḍamm', 'msa-sahl', 'm sg indef')
			])
		],
		'Buku yang saya baca itu mudah.',
		'ـهُ pada قَرَأْتُهُ adalah ‘ā’id: dhamir yang kembali kepada الَّذِي, yaitu الْكِتَابُ; khabar utama سَهْلٌ marfū‘.',
		own('Semua token adalah token contoh G-04/G-05.')
	),

	// ---- Syarat dan jawab ----------------------------------------------------------------
	original('if-study', FAM.condition, 'conditions', 'condition', [
		nonVerb('curr-in'),
		slot('curr-darasa', 'verb', '2 m sg impf act'),
		slot('curr-najaha', 'verb', '2 m sg impf act')
	]),
	original('if-read', FAM.condition, 'conditions', 'condition', [
		nonVerb('curr-in'),
		slot('fiil-qaraa', 'verb', '2 m sg impf act'),
		slot('curr-fahima', 'verb', '2 m sg impf act')
	]),
	authored(
		'if-study-understand',
		FAM.condition,
		'conditions',
		'condition',
		[
			span('link', 'link', 'Harf syarat jazm', [word('إِنْ', 'jika', 'Harf syarat', 'curr-in')]),
			span('condition', 'condition', 'Fi‘l asy-syarṭ', [
				verbPart(
					'تَدْرُسْ',
					'kamu belajar',
					'Fi‘il muḍāri‘; subjek tersirat',
					slot('curr-darasa', 'verb', '2 m sg impf act'),
					'jussive',
					'sukūn'
				)
			]),
			span('result', 'result', 'Jawāb asy-syarṭ', [
				verbPart(
					'تَفْهَمْ',
					'kamu memahami',
					'Fi‘il muḍāri‘; subjek tersirat',
					slot('curr-fahima', 'verb', '2 m sg impf act'),
					'jussive',
					'sukūn'
				)
			])
		],
		'Jika kamu belajar, kamu akan memahami.',
		'إِنْ menjazmkan kedua muḍāri‘: تَدْرُسْ (syarat) dan تَفْهَمْ (jawab), keduanya dengan sukūn.',
		own(
			'Kedua fi‘il adalah token contoh G-05 yang sudah ada; hanya pasangan syarat–jawab yang baru.'
		)
	),
	authored(
		'if-read-succeed',
		FAM.condition,
		'conditions',
		'condition',
		[
			span('link', 'link', 'Harf syarat jazm', [word('إِنْ', 'jika', 'Harf syarat', 'curr-in')]),
			span('condition', 'condition', 'Fi‘l asy-syarṭ', [
				verbPart(
					'تَقْرَأْ',
					'kamu membaca',
					'Fi‘il muḍāri‘',
					slot('fiil-qaraa', 'verb', '2 m sg impf act'),
					'jussive',
					'sukūn'
				)
			]),
			span('result', 'result', 'Jawāb asy-syarṭ', [
				verbPart(
					'تَنْجَحْ',
					'kamu berhasil',
					'Fi‘il muḍāri‘',
					slot('curr-najaha', 'verb', '2 m sg impf act'),
					'jussive',
					'sukūn'
				)
			])
		],
		'Jika kamu membaca, kamu akan berhasil.',
		'Dua fi‘il muḍāri‘ menjadi majzūm; terjemahan Indonesia tidak perlu menyalin sukūn.',
		own(
			'Kedua fi‘il adalah token contoh G-05 yang sudah ada; hanya pasangan syarat–jawab yang baru.'
		)
	)
];

export const clauseGaps: readonly FrameGap[] = [
	{
		id: 'gap-relative-feminine-return',
		family: FAM.relative,
		label: 'Isim mawṣūl feminin dengan dhamir ‘ā’id ـهَا (الَّتِي + fi‘il + ـهَا)',
		surfaces: ['الَّتِي'],
		reason:
			'Token utuh dengan sufiks feminin ـهَا (seperti قَرَأْتُهَا) belum tercatat; hanya ـهُ pada قَرَأْتُهُ yang ada di data.'
	},
	{
		id: 'gap-relative-dual-plural',
		family: FAM.relative,
		label: 'Isim mawṣūl mutsanna dan jamak',
		surfaces: [],
		reason:
			'Bentuk relatif mutsanna dan jamak tidak dibahas pada tahap pengantar ini dan belum tercatat pada data.'
	},
	{
		id: 'gap-athaf-fa',
		family: FAM.actions,
		label: 'Penghubung فَ pada fi‘il kedua',
		surfaces: ['فَ'],
		reason:
			'Contoh فَ + fi‘il belum tercatat pada data; hanya وَ yang dikurasi untuk dua tindakan berurutan.'
	},
	{
		id: 'gap-condition-other',
		family: FAM.condition,
		label: 'Syarat dengan إِذَا atau jawab nominal dengan فَ',
		surfaces: ['إِذَا'],
		reason:
			'Contoh إِنْ dengan jawab nominal (فَأَنْتَ نَاجِحٌ) belum punya pasangan alternatif yang dicatat; إِذَا berperilaku berbeda dan tidak dikurasi.'
	}
];
