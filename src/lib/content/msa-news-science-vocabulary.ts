import type { ResearchAudit, ResearchField } from '#lib/domain/research/evidence.js';
import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';

// P6 / LM-03 batch 5. The selected senses and plurals were checked in Arabic sections.
// Indonesian glosses are original; nominative case endings are editorial.
// No register, frequency, or modern origin is inferred from a dictionary headword.
const rows = `
sihafah|صِحَافَةٌ|jurnalisme, pers|صحافة|news|||Noun, senses 1–2|abstract
hukumah|حُكُومَةٌ|pemerintah|حكومة|news|حُكُومَاتٌ|sound|Noun, sense 2|abstract
intikhab|اِنْتِخَابٌ|pemilihan|انتخاب|news|اِنْتِخَابَاتٌ|sound|Noun, sense 1|abstract
biah|بِيئَةٌ|lingkungan|بيئة|environment|بِيئَاتٌ|sound|Noun, sense 1|abstract
talawwuth|تَلَوُّثٌ|pencemaran|تلوث|environment|||Etymology 1.2 > Noun, subsense 1.1|abstract
munakh|مُنَاخٌ|iklim|مناخ|environment|مُنَاخَاتٌ|sound|Noun, sense 1|abstract
tajribah|تَجْرِبَةٌ|percobaan, eksperimen|تجربة|science|تَجَارِبُ|broken|Noun, sense 2|abstract
mukhtabar|مُخْتَبَرٌ|laboratorium|مختبر|science|مُخْتَبَرَاتٌ|sound|Noun, sense 1|concrete
fayrus|فَيْرُوسٌ|virus biologis|فيروس|science|||Noun, sense 1|concrete
`;

export const msaNewsScienceVocabulary: readonly VocabularyItem[] = rows
	.trim()
	.split('\n')
	.map((line): VocabularyItem => {
		const [id, arabic, meaning, lemma, topic, plural, kind, section, concreteness] =
			line.split('|');
		if (
			!id ||
			!arabic ||
			!meaning ||
			!lemma ||
			!section ||
			(topic !== 'news' && topic !== 'environment' && topic !== 'science') ||
			(concreteness !== 'abstract' && concreteness !== 'concrete') ||
			(plural && kind !== 'sound' && kind !== 'broken') ||
			(!plural && kind)
		) {
			throw new Error(`Malformed topical MSA row: ${line}`);
		}

		const sourceUrl = `https://en.wiktionary.org/wiki/${lemma}#Arabic`;
		const nounSection = section.split(',')[0] ?? section;
		const claim = (field: ResearchField, assertion: string, locator: string) => ({
			field,
			assertion,
			sourceUrl,
			section: `Arabic > ${locator}`,
			checkedOn: '2026-11-20',
			outcome: 'supports' as const
		});
		const research: ResearchAudit = {
			status: 'partial',
			claims: [
				claim('arabic', `Lema ${arabic} tercatat; akhiran i‘rab editorial.`, nounSection),
				claim('meaning', `Makna terpilih: ${meaning}.`, section),
				claim('wordClass', 'Makna terpilih tercatat pada bagian nomina.', section),
				...(plural ? [claim('plural', `Salah satu bentuk jamak: ${plural}.`, nounSection)] : [])
			]
		};

		return {
			id: `msa-${id}`,
			collection: 'msa',
			register: 'msa',
			arabic,
			meaning,
			concreteness,
			reviewStatus: 'draft',
			sources: [sourceUrl, 'https://en.wiktionary.org/wiki/Wiktionary:Copyrights'],
			research,
			msa: {
				wordClass: 'noun',
				topic,
				attestation: 'curated-draft',
				...(plural && (kind === 'sound' || kind === 'broken')
					? { plural: { value: plural, kind } }
					: {})
			}
		};
	});
