import type { ResearchAudit, ResearchField } from '#lib/domain/research/evidence.js';
import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';

// P6 / LM-03 batch 4. The selected senses and plurals were checked in Arabic sections.
// Indonesian glosses are original; nominative case endings are editorial.
// No register, frequency, or modern origin is inferred from a dictionary headword.
const rows = `
marad|مَرَضٌ|penyakit|مرض|health|أَمْرَاضٌ|broken|Etymology 1.3 > Noun, sense 2|abstract
dawa|دَوَاءٌ|obat|دواء|health|أَدْوِيَةٌ|broken|Noun, sense 1|concrete
saydaliyyah|صَيْدَلِيَّةٌ|apotek|صيدلية|health|صَيْدَلِيَّاتٌ|sound|Noun, sense 1|concrete
iyadah|عِيَادَةٌ|klinik|عيادة|health|عِيَادَاتٌ|sound|Noun, sense 3|concrete
marid-patient|مَرِيضٌ|pasien|مريض|health|مَرْضَى|broken|Noun, sense 1|concrete
ilaj|عِلَاجٌ|pengobatan, terapi|علاج|health|||Noun, senses 3–4|abstract
liqah|لِقَاحٌ|vaksin|لقاح|health|لِقَاحَاتٌ|sound|Noun, sense 2|concrete
tadhkirah|تَذْكِرَةٌ|tiket|تذكرة|transport|تَذَاكِرُ|broken|Noun, sense 4|concrete
rihlah|رِحْلَةٌ|perjalanan|رحلة|transport|رِحْلَاتٌ|sound|Etymology 1 > Noun, senses 1–2|abstract
markabah|مَرْكَبَةٌ|kendaraan|مركبة|transport|مَرْكَبَاتٌ|sound|Noun, sense 1|concrete
saiq|سَائِقٌ|pengemudi|سائق|transport|سَائِقُونَ|sound|Noun, sense 2|concrete
rakib|رَاكِبٌ|penumpang|راكب|transport|رُكَّابٌ|broken|Noun, sense 1|concrete
mina|مِينَاءٌ|pelabuhan|ميناء|transport|مَوَانِئُ|broken|Noun, sense 1|concrete
waqud|وَقُودٌ|bahan bakar|وقود|transport|||Noun, sense 1|concrete
`;

export const msaHealthVocabulary: readonly VocabularyItem[] = rows
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
			(topic !== 'health' && topic !== 'transport') ||
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
