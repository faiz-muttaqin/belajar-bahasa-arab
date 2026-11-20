import type { ResearchAudit, ResearchField } from '#lib/domain/research/evidence.js';
import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';

// P6 / LM-03 batch 3. The selected senses and plurals were checked in Arabic sections.
// Indonesian glosses are original; nominative case endings are editorial.
// No register, frequency, or modern origin is inferred from a dictionary headword.
const rows = `
iqtisad|اِقْتِصَادٌ|ekonomi, ilmu ekonomi|اقتصاد|business|||Noun, senses 3–4|abstract
sharikah|شَرِكَةٌ|perusahaan|شركة|business|شَرِكَاتٌ|sound|Noun, sense 2|abstract
tijarah|تِجَارَةٌ|perdagangan|تجارة|business|تِجَارَاتٌ|sound|Noun, sense 2|abstract
sir|سِعْرٌ|harga|سعر|business|أَسْعَارٌ|broken|Etymology 1 > Noun, sense 1|abstract
ribh|رِبْحٌ|laba, keuntungan|ربح|business|أَرْبَاحٌ|broken|Etymology 1.2 > Noun, sense 2|abstract
khasarah|خَسَارَةٌ|kerugian|خسارة|business|خَسَائِرُ|broken|Noun, sense 2|abstract
ratib|رَاتِبٌ|gaji, upah|راتب|work|رَوَاتِبُ|broken|Noun, sense 1|abstract
wazifah|وَظِيفَةٌ|pekerjaan, jabatan|وظيفة|work|وَظَائِفُ|broken|Noun, sense 1|abstract
aqd|عَقْدٌ|kontrak, perjanjian|عقد|work|عُقُودٌ|broken|Etymology 1.4 > Noun, sense 3|abstract
istithmar|اِسْتِثْمَارٌ|investasi|استثمار|business|اِسْتِثْمَارَاتٌ|sound|Noun, sense 2|abstract
mizaniyyah|مِيزَانِيَّةٌ|anggaran|ميزانية|business|مِيزَانِيَّاتٌ|sound|Noun, sense 1|abstract
amil-client|عَمِيلٌ|pelanggan, klien|عميل|business|عُمَلَاءُ|broken|Noun, sense 1|concrete
daribah|ضَرِيبَةٌ|pajak|ضريبة|business|ضَرَائِبُ|broken|Noun, sense 1|abstract
mihnah|مِهْنَةٌ|profesi|مهنة|work|مِهَنٌ|broken|Noun, sense 1|abstract
irad|إِيرَادٌ|pendapatan, penerimaan|إيراد|business|||Noun, sense 4|abstract
taklifah|تَكْلِفَةٌ|biaya|تكلفة|business|تَكْلِفَاتٌ|sound|Noun, sense 2|abstract
masna|مَصْنَعٌ|pabrik|مصنع|business|مَصَانِعُ|broken|Etymology 1 > Noun, sense 1|concrete
`;

export const msaBusinessVocabulary: readonly VocabularyItem[] = rows
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
			(topic !== 'business' && topic !== 'work') ||
			(concreteness !== 'abstract' && concreteness !== 'concrete') ||
			(plural && kind !== 'sound' && kind !== 'broken') ||
			(!plural && kind)
		) {
			throw new Error(`Malformed business MSA row: ${line}`);
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
				...(plural
					? [claim('plural', `Salah satu bentuk jamak: ${plural}.`, nounSection)]
					: [])
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
