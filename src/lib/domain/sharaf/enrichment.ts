/**
 * Overlay for the tashrif modal: meanings, mudhari, mashdar and participles from Wiktionary
 * (Form I and mazid), and model-recalled meanings for the Qutrub/Arramooz word list.
 * The data is a separate static asset (static/data/verbs-enrich-v1.json), built by
 * scripts/build-verb-enrichment.mjs; see docs/data/wiktionary-verbs.md and model-recall.md.
 */
import { BULK_SHARAF_GLOSS_MISSING } from './bulk.js';
import type { SharafEntry, SharafForm } from './lexicon.js';
import { patternCatalog } from './patterns.js';

export const ENRICHMENT_PATH = 'data/verbs-enrich-v1.json';

/** [lemma, bab, translit, mudhari, mashdar (، separated), fail, maful, idMeaning, enMeaning, pageTitle] */
type WiktionaryTuple = [
	string,
	number,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string
];
/** [lemma, root, bab, kind 0 padanan | 1 deskripsi | 2 unknown, text, confidence 0-3, model 0-1, code] */
type RecallTuple = [string, string, number, number, string, number, number, string];

export type VerbEnrichment = {
	schema: 1;
	attribution: string;
	totals: { wiktionary: number; recall: number };
	wk: WiktionaryTuple[];
	rc: RecallTuple[];
};

export function isVerbEnrichment(value: unknown): value is VerbEnrichment {
	if (!value || typeof value !== 'object') return false;
	const data = value as Partial<VerbEnrichment>;
	return (
		data.schema === 1 &&
		Array.isArray(data.wk) &&
		Array.isArray(data.rc) &&
		data.wk.length === data.totals?.wiktionary &&
		data.rc.length === data.totals?.recall
	);
}

const confidence = ['-', 'rendah', 'sedang', 'tinggi'] as const;
const models = ['Claude Sonnet 5.5', 'Claude Fable 5.2'] as const;
const nfc = (s: string) => s.normalize('NFC');
const wiktionaryUrl = (title: string) =>
	`https://en.wiktionary.org/wiki/${encodeURIComponent(title)}`;

function formsFrom([, , , nonPast, masdar, fail, maful]: WiktionaryTuple): SharafForm[] {
	const forms: SharafForm[] = [];
	if (nonPast) forms.push({ label: 'mudhari', value: nonPast });
	if (masdar) forms.push({ label: 'mashdar', value: masdar.split('،')[0]! });
	if (fail) forms.push({ label: 'fail', value: fail });
	if (maful) forms.push({ label: 'maful', value: maful });
	return forms;
}

const mergedCache = new WeakMap<
	readonly SharafEntry[],
	WeakMap<VerbEnrichment, readonly SharafEntry[]>
>();

/**
 * Returns the entries with enrichment applied. Entries that curators wrote by hand (ids not
 * starting with "bulk-") are never changed. Unmatched Wiktionary verbs become new entries,
 * which is how bab 7 to 22 get thousands of real words.
 */
export function mergeEnrichment(
	entries: readonly SharafEntry[],
	data: VerbEnrichment | undefined
): readonly SharafEntry[] {
	if (!data) return entries;
	const cached = mergedCache.get(entries)?.get(data);
	if (cached) return cached;

	const wkByKey = new Map<string, WiktionaryTuple>();
	for (const tuple of data.wk) wkByKey.set(`${nfc(tuple[0])}|${tuple[1]}`, tuple);
	const rcByKey = new Map<string, RecallTuple>();
	for (const tuple of data.rc) rcByKey.set(`${nfc(tuple[0])}|${tuple[1]}|${tuple[2]}`, tuple);

	const used = new Set<string>();
	const rows: SharafEntry[] = [];
	const curated = new Set<string>();
	for (const entry of entries) {
		if (entry.partOfSpeech === 'verb' && entry.bab && !entry.id.startsWith('bulk-')) {
			curated.add(`${nfc(entry.lemma)}|${entry.bab.number}`);
		}
	}

	for (const entry of entries) {
		if (entry.partOfSpeech !== 'verb' || !entry.bab || !entry.id.startsWith('bulk-')) {
			rows.push(entry);
			continue;
		}
		const key = `${nfc(entry.lemma)}|${entry.bab.number}`;
		const wk = wkByKey.get(key);
		if (wk) {
			used.add(key);
			const meaning = wk[7] || wk[8];
			rows.push({
				...entry,
				meaning: meaning || entry.meaning,
				meaningSource: wk[7] ? 'terjemahan' : wk[8] ? 'wiktionary' : undefined,
				forms: formsFrom(wk),
				formBehavior: 'unverified',
				explanation:
					`${entry.explanation} Mudhari, mashdar, isim fa‘il dan maf‘ul serta arti Inggris dari Wiktionary` +
					(wk[7]
						? '; arti Indonesia adalah terjemahan Claude dari arti Inggris itu, belum ditinjau.'
						: '.'),
				sources: [...entry.sources, wiktionaryUrl(wk[9])]
			});
			continue;
		}
		const rc = rcByKey.get(`${nfc(entry.lemma)}|${entry.root ?? ''}|${entry.bab.number}`);
		if (rc && rc[3] !== 2 && rc[4]) {
			rows.push({
				...entry,
				meaning: rc[4],
				meaningSource: rc[3] === 1 ? 'deskripsi-model' : 'model',
				explanation:
					`${entry.explanation} Arti ini berasal dari pengetahuan model ${models[rc[6]] ?? 'Claude'}` +
					` (keyakinan ${confidence[rc[5]] ?? '-'}), bukan dari kamus, dan belum diverifikasi.` +
					(rc[3] === 1 ? ' Ini deskripsi, bukan padanan satu kata.' : '')
			});
			continue;
		}
		rows.push(rc && rc[3] === 2 ? { ...entry, meaningSource: 'belum-diketahui' } : entry);
	}

	// Wiktionary verbs that no existing entry covers, grouped under their own bab.
	const counters = new Map<string, number>();
	for (const tuple of data.wk) {
		const key = `${nfc(tuple[0])}|${tuple[1]}`;
		if (used.has(key) || curated.has(key)) continue;
		const pattern = patternCatalog.find((candidate) => candidate.number === tuple[1]);
		if (!pattern) continue;
		const n = (counters.get(key) ?? 0) + 1;
		counters.set(key, n);
		const meaning = tuple[7] || tuple[8];
		rows.push({
			id: `wk-${tuple[1]}-${tuple[9]}-${n}`,
			lemma: tuple[0],
			meaning: meaning || BULK_SHARAF_GLOSS_MISSING,
			meaningSource: tuple[7] ? 'terjemahan' : tuple[8] ? 'wiktionary' : undefined,
			partOfSpeech: 'verb',
			bab: {
				number: tuple[1],
				exemplar: pattern.madhi,
				pattern: `${pattern.madhi} – ${pattern.mudhari}`
			},
			forms: formsFrom(tuple),
			babSelection: 'lexical',
			formBehavior: 'unverified',
			explanation:
				`Dari Wiktionary (transliterasi ${tuple[2] || 'tidak tercatat'}); bab dari nomor bentuknya. ` +
				'Arti Indonesia adalah terjemahan Claude dari arti Inggris Wiktionary dan belum ditinjau. ' +
				'Akar tidak dicatat oleh sumber ini.',
			sources: [wiktionaryUrl(tuple[9])],
			reviewStatus: 'draft'
		});
	}

	let byData = mergedCache.get(entries);
	if (!byData) {
		byData = new WeakMap();
		mergedCache.set(entries, byData);
	}
	byData.set(data, rows);
	return rows;
}
