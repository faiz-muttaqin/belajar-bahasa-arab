/**
 * D-03 — restricted fi‘il frame selector, NOT a conjugation algorithm.
 *
 * Only hand-selected, source-linked forms may be used. The three teaching verbs
 * in G-06 share one VSO frame (3rd person masculine singular); imperative
 * requires a *different* frame with an implied second-person subject.
 *
 * In particular, never derive jussive/subjunctive or imperative by changing
 * a final mark on an arbitrary lexeme. The D-03 registry is intentionally small.
 */
import { sentenceRules } from '#lib/content/sentence-rules.js';
import { sharafEntries } from '#lib/content/sharaf.js';
import {
	curatedFrameSurface,
	lexemeFromSharaf,
	type MorphFeatures,
	type WordSurface
} from './lexeme-forms.js';

export type VerbFrameId = 'past' | 'present' | 'lam' | 'lan' | 'imperative';

export const verbFrameLabels: Readonly<Record<VerbFrameId, string>> = {
	past: 'Māḍī · lampau',
	present: 'Muḍāri‘ · nonlampau',
	lam: 'لَمْ · tidak (lampau)',
	lan: 'لَنْ · tidak akan',
	imperative: 'Amr · perintah (kamu)'
};

export const verbFrameIds = [
	'past',
	'present',
	'lam',
	'lan',
	'imperative'
] as const satisfies readonly VerbFrameId[];

type FrameAnnotation = {
	marker: string;
	detail: string;
	actor: 'explicit-third-masculine' | 'implicit-second-masculine';
	particle?: { arabic: 'لَمْ' | 'لَنْ'; gloss: string; marker: string };
};

export type ResolvedVerbFrame = FrameAnnotation & {
	form: WordSurface;
	verbId: string;
	frame: VerbFrameId;
	bab: number;
};

/**
 * Dedicated whitelist of exact words whose forms are discussed in the project's
 * vocabulary, sharaf reference and/or G-04 grammar examples.
 */
const approvedForPilot: Readonly<Record<string, readonly VerbFrameId[]>> = {
	'fiil-kataba': ['past', 'present', 'lam', 'lan'],
	'fiil-qaraa': ['past', 'present'],
	'fiil-fataha': ['past', 'present', 'imperative']
};

const frameAnnotations: Readonly<Record<VerbFrameId, FrameAnnotation>> = {
	past: {
		marker: 'Māḍī · bentuk tetap',
		detail: 'Peristiwa lampau, 3 laki-laki tunggal',
		actor: 'explicit-third-masculine'
	},
	present: {
		marker: 'Muḍāri‘ marfū‘ · ḍamma',
		detail: 'Nonlampau (bergantung konteks), 3 laki-laki tunggal',
		actor: 'explicit-third-masculine'
	},
	lam: {
		marker: 'Muḍāri‘ majzūm · sukūn',
		detail: 'لَمْ me-jazm-kan muḍāri‘, makna negasi lampau',
		actor: 'explicit-third-masculine',
		particle: { arabic: 'لَمْ', gloss: 'tidak (lampau)', marker: 'Harf jazm' }
	},
	lan: {
		marker: 'Muḍāri‘ manṣūb · fatḥa',
		detail: 'لَنْ menashabkan muḍāri‘, makna negasi mendatang',
		actor: 'explicit-third-masculine',
		particle: { arabic: 'لَنْ', gloss: 'tidak akan', marker: 'Harf naṣb' }
	},
	imperative: {
		marker: 'Fi‘il amr · mabnī ‘alā sukūn',
		detail: 'Perintah orang kedua maskulin tunggal; pelaku tersirat أَنْتَ',
		actor: 'implicit-second-masculine'
	}
};

function lexicalVerb(verbId: string) {
	const entry = sharafEntries.find((word) => word.id === verbId);
	if (!entry || entry.partOfSpeech !== 'verb' || !entry.bab || !entry.sources.length)
		return undefined;
	return entry;
}

function sourceForm(verbId: string, frame: VerbFrameId): string | undefined {
	const entry = lexicalVerb(verbId);
	if (!entry) return undefined;

	if (frame === 'past') return entry.lemma;
	if (frame === 'present')
		return entry.forms.find((form) => form.label === 'mudhari')?.value;
	if (frame === 'imperative')
		return entry.forms.find((form) => form.label === 'amr')?.value;

	// G-04 contains exactly one audited-for-structure draft illustration of
	// these operators. NEVER use that one sample to infer forms for other verbs.
	if (verbId !== 'fiil-kataba') return undefined;
	const illustration = sentenceRules
		.find((rule) => rule.id === 'negation')
		?.examples.find((example) => example.id === (frame === 'lam' ? 'negation-lam' : 'negation-lan'));
	return illustration?.tokens.find((token) => token.role === 'verb')?.arabic;
}

export function resolveVerbFrame(verbId: string, frame: VerbFrameId): ResolvedVerbFrame | undefined {
	if (!approvedForPilot[verbId]?.includes(frame)) return undefined;
	const entry = lexicalVerb(verbId);
	const surface = sourceForm(verbId, frame);
	if (!entry || !surface) return undefined;

	const features: MorphFeatures = frame === 'imperative'
		? { aspect: 'imperative', voice: 'active', person: 2, gender: 'masculine', number: 'singular' }
		: frame === 'past'
			? { aspect: 'perfect', voice: 'active', person: 3, gender: 'masculine', number: 'singular' }
			: {
					aspect: 'imperfect',
					voice: 'active',
					person: 3,
					gender: 'masculine',
					number: 'singular',
					mood: frame === 'present' ? 'indicative' : frame === 'lam' ? 'jussive' : 'subjunctive'
				};
	const annotation = frameAnnotations[frame];

	const meaningEvidence = frame === 'lam' || frame === 'lan'
		? 'Token operator + fi‘il diambil dari contoh G-04 yang masih draft.'
		: 'Bentuk ditemukan secara eksplisit pada indeks sharaf proyek; analisis orang/mood khusus untuk frame pilot ini.';

	const form = curatedFrameSurface({
		lexeme: lexemeFromSharaf(entry),
		id: 'frame-' + frame,
		surface,
		features,
		reason: meaningEvidence + ' Tidak ada konjugasi otomatis.'
	});
	if (frame === 'lam' || frame === 'lan') {
		const rule = sentenceRules.find((item) => item.id === 'negation');
		if (!rule?.sources.length) return undefined;
		form.evidence = {
			...form.evidence,
			sourceUrls: [...new Set([...form.evidence.sourceUrls, ...rule.sources.map((source) => source.url)])],
			note: form.evidence.note + ' Kaidah perubahan mood merujuk G-04.'
		};
	}
	return { form, verbId, frame, bab: entry.bab.number, ...annotation };
}

export function verbFrameOptions(verbId: string): {
	id: VerbFrameId;
	label: string;
	available: boolean;
}[] {
	return verbFrameIds.map((id) => ({
		id,
		label: verbFrameLabels[id],
		available: resolveVerbFrame(verbId, id) !== undefined
	}));
}

/** Registry integrity, including precise equality against source values. */
export function validateVerbFrameRegistry(): string[] {
	const errors: string[] = [];
	const expected: Readonly<Record<string, Partial<Record<VerbFrameId, string>>>> = {
		'fiil-kataba': {
			past: 'كَتَبَ', present: 'يَكْتُبُ', lam: 'يَكْتُبْ', lan: 'يَكْتُبَ'
		},
		'fiil-qaraa': { past: 'قَرَأَ', present: 'يَقْرَأُ' },
		'fiil-fataha': { past: 'فَتَحَ', present: 'يَفْتَحُ', imperative: 'اِفْتَحْ' }
	};
	for (const [verbId, frames] of Object.entries(approvedForPilot)) {
		if (!lexicalVerb(verbId)) errors.push('Missing lexical entry: ' + verbId);
		for (const frame of frames) {
			const rendered = resolveVerbFrame(verbId, frame);
			if (!rendered) {
				errors.push('Missing recorded form: ' + verbId + '/' + frame);
				continue;
			}
			if (rendered.form.text !== expected[verbId]?.[frame])
				errors.push('Source spelling differs from curated frame: ' + verbId + '/' + frame);
			if (rendered.form.evidence.reviewStatus !== 'draft')
				errors.push('Unreviewed form promoted: ' + verbId + '/' + frame);
			if (!rendered.form.evidence.sourceUrls.length)
				errors.push('Missing frame source: ' + verbId + '/' + frame);
		}
	}
	return errors;
}
