import type { ResearchAudit, ResearchField } from '#lib/domain/research/evidence.js';

/**
 * L-01: verified page sections, but not complete lexeme approvals.
 * Wiktionary entries are CC BY-SA 4.0 / GFDL; no definitions or examples are imported.
 * These original Indonesian claim descriptions are provided only as audit metadata.
 * Reviewed against the Arabic sections on 2026-11-17, not dialect-only sections.
 */
const wiktionary = (lemma: string) => `https://en.wiktionary.org/wiki/${lemma}`;
function claim(
	field: ResearchField,
	assertion: string,
	lemma: string,
	section: string
) {
	return {
		field,
		assertion,
		sourceUrl: wiktionary(lemma),
		section: `Arabic > ${section}`,
		checkedOn: '2026-11-17',
		outcome: 'supports' as const
	};
}

export const msaResearchAudits: Readonly<Record<string, ResearchAudit>> = {
	kitab: {
		status: 'partial',
		claims: [
			claim('arabic', 'Lema Arab كِتَاب tercatat.', 'كتاب', 'Noun'),
			claim('meaning', 'Salah satu makna lema adalah buku.', 'كتاب', 'Noun, sense book'),
			claim('wordClass', 'Lema termasuk nomina.', 'كتاب', 'Noun'),
			claim('root', 'Akar ك ت ب tercatat.', 'كتاب', 'Root'),
			claim('plural', 'Jamak كُتُب tercatat.', 'كتاب', 'Noun, inflection')
		]
	},
	imraah: {
		status: 'partial',
		claims: [
			claim('arabic', 'Lema اِمْرَأَة tercatat.', 'امرأة', 'Noun'),
			claim('meaning', 'Salah satu maknanya adalah perempuan dewasa.', 'امرأة', 'Noun, sense woman'),
			claim('wordClass', 'Lema termasuk nomina.', 'امرأة', 'Noun'),
			claim('plural', 'نِسَاء salah satu bentuk jamak; ada alternatif lain.', 'امرأة', 'Noun, plurals')
		]
	},
	saghir: {
		status: 'partial',
		claims: [
			claim('arabic', 'Lema صَغِير tercatat.', 'صغير', 'Adjective'),
			claim('meaning', 'Makna kecil tercatat untuk sifat ini.', 'صغير', 'Adjective, small'),
			claim('wordClass', 'Lema termasuk sifat.', 'صغير', 'Adjective'),
			claim('root', 'Akar ص غ ر tercatat.', 'صغير', 'Root'),
			claim('feminine', 'Bentuk feminin صَغِيرَة tercatat.', 'صغير', 'Adjective, feminine')
		]
	},
	hasub: {
		status: 'partial',
		claims: [
			claim('arabic', 'Lema حَاسُوب tercatat.', 'حاسوب', 'Noun'),
			claim('meaning', 'Makna komputer tercatat.', 'حاسوب', 'Noun, computer'),
			claim('wordClass', 'Lema termasuk nomina.', 'حاسوب', 'Noun'),
			claim('root', 'Akar ح س ب tercatat.', 'حاسوب', 'Root'),
			claim('plural', 'Jamak حَوَاسِيب tercatat.', 'حاسوب', 'Noun, plural'),
			claim('formation', 'Istilah alat dibentuk dari akar Arab, bukan sekadar transliterasi.', 'حاسوب', 'Etymology')
		]
	},
	internet: {
		status: 'partial',
		claims: [
			claim('arabic', 'إِنْتَرْنِت termasuk varian vokalisasi lema.', 'إنترنت', 'Noun, alternative forms'),
			claim('meaning', 'Lema menunjuk pada internet.', 'إنترنت', 'Noun, sense Internet'),
			claim('wordClass', 'Lema termasuk nomina.', 'إنترنت', 'Noun'),
			claim('formation', 'Istilah dipinjam dari bahasa Inggris.', 'إنترنت', 'Etymology')
		]
	}
};
