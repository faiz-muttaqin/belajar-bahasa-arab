import { describe, expect, it } from 'vitest';
import { sentenceRules } from '#lib/content/sentence-rules.js';
import { sharafEntries } from '#lib/content/sharaf.js';
import {
	resolveVerbFrame,
	validateVerbFrameRegistry,
	verbFrameIds,
	verbFrameOptions
} from './verb-frames.js';

describe('D-03 curated verb inflection and frame compatibility', () => {
	it('compiles exact source-linked forms from the curated whitelist', () => {
		expect(validateVerbFrameRegistry()).toEqual([]);
		expect(verbFrameIds).toEqual(['past', 'present', 'lam', 'lan', 'imperative']);
		for (const verbId of ['fiil-kataba', 'fiil-qaraa', 'fiil-fataha']) {
			const entry = sharafEntries.find((item) => item.id === verbId)!;
			for (const option of verbFrameOptions(verbId)) {
				const resolved = resolveVerbFrame(verbId, option.id);
				expect(option.available).toBe(Boolean(resolved));
				if (!resolved) continue;
				expect(resolved.bab).toBe(entry.bab?.number);
				expect(resolved.form.evidence.kind).toBe('curated-example');
				expect(resolved.form.evidence.reviewStatus).toBe('draft');
				expect(resolved.form.evidence.sourceUrls.length).toBeGreaterThan(0);
				expect(resolved.form.features.case).toBeUndefined();
				expect(resolved.form.features.voice).toBe('active');
				expect(resolved.form.features.number).toBe('singular');
				expect(resolved.form.features.gender).toBe('masculine');
			}
		}
	});

	it('distinguishes imperfect indicative from perfect without changing actor agreement', () => {
		const past = resolveVerbFrame('fiil-qaraa', 'past')!;
		const present = resolveVerbFrame('fiil-qaraa', 'present')!;
		expect(past.form.text).toBe('قَرَأَ');
		expect(past.form.features.aspect).toBe('perfect');
		expect(past.form.features.mood).toBeUndefined();
		expect(present.form.text).toBe('يَقْرَأُ');
		expect(present.form.features).toMatchObject({
			aspect: 'imperfect',
			mood: 'indicative',
			person: 3,
			gender: 'masculine'
		});
		expect(past.actor).toBe('explicit-third-masculine');
		expect(present.actor).toBe(past.actor);
	});

	it('reuses *exact* G-04 lam and lan sample tokens, never synthesizes new endings', () => {
		const negation = sentenceRules.find((rule) => rule.id === 'negation')!;
		for (const [frame, sampleId, expected, mood] of [
			['lam', 'negation-lam', 'يَكْتُبْ', 'jussive'],
			['lan', 'negation-lan', 'يَكْتُبَ', 'subjunctive']
		] as const) {
			const existing = negation.examples.find((example) => example.id === sampleId)!;
			const sourceText = existing.tokens.find((token) => token.role === 'verb')!.arabic;
			const resolved = resolveVerbFrame('fiil-kataba', frame)!;
			expect(resolved.form.text).toBe(expected);
			expect(resolved.form.text).toBe(sourceText);
			expect(resolved.form.features.mood).toBe(mood);
			expect(resolved.particle?.arabic).toBe(frame === 'lam' ? 'لَمْ' : 'لَنْ');
			expect(resolved.form.evidence.sourceUrls).toEqual(
				expect.arrayContaining(negation.sources.map((source) => source.url))
			);
		}
	});

	it('shows command only where explicit imperative exists; the agent becomes implicit 2ms', () => {
		const command = resolveVerbFrame('fiil-fataha', 'imperative')!;
		expect(command.form.text).toBe('اِفْتَحْ');
		expect(command.actor).toBe('implicit-second-masculine');
		expect(command.form.features).toMatchObject({
			aspect: 'imperative',
			person: 2,
			gender: 'masculine',
			number: 'singular'
		});
		expect(command.form.features.mood).toBeUndefined();
		expect(command.particle).toBeUndefined();
	});

	it('disables unknown lexemes and unrecorded combinations rather than guessing', () => {
		expect(resolveVerbFrame('fiil-qaraa', 'lam')).toBeUndefined();
		expect(resolveVerbFrame('fiil-fataha', 'lan')).toBeUndefined();
		expect(resolveVerbFrame('fiil-kataba', 'imperative')).toBeUndefined();
		expect(resolveVerbFrame('fiil-qala', 'present')).toBeUndefined();
		expect(resolveVerbFrame('bulk-unknown', 'past')).toBeUndefined();
		expect(
			verbFrameOptions('fiil-qaraa')
				.filter((item) => item.available)
				.map((item) => item.id)
		).toEqual(['past', 'present']);
	});
});
