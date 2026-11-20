import type { ResearchAudit, ResearchField } from '#lib/domain/research/evidence.js';
import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';

// P6 / LM-03 batch 2. Independently authored glosses of selected noun senses.
// Headword and one selected plural are checked in Arabic > Noun, not dialect sections.
// Nominative endings are editorial; no claim of exclusive modern usage or frequency.
const rows = `
wathiqah|وَثِيقَةٌ|dokumen tertulis|وثيقة|documents|وَثَائِقُ|broken|concrete
shahadah|شَهَادَةٌ|sertifikat, ijazah|شهادة|documents|شَهَادَاتٌ|sound|concrete
tawqi|تَوْقِيعٌ|tanda tangan|توقيع|documents|تَوْقِيعَاتٌ|sound|concrete
unwan|عُنْوَانٌ|alamat, judul|عنوان|documents|عَنَاوِينُ|broken|abstract
talab|طَلَبٌ|permohonan, pengajuan|طلب|documents|طَلَبَاتٌ|sound|abstract
rukhsah|رُخْصَةٌ|izin, lisensi|رخصة|documents|رُخَصٌ|broken|abstract
huwiyyah|هُوِيَّةٌ|identitas, dokumen identitas|هوية|documents|هُوِيَّاتٌ|sound|abstract
faturah|فَاتُورَةٌ|tagihan, faktur|فاتورة|documents|فَوَاتِيرُ|broken|concrete
imtihan|اِمْتِحَانٌ|ujian|امتحان|education|اِمْتِحَانَاتٌ|sound|abstract
manhaj|مَنْهَجٌ|kurikulum, metode|منهج|education|مَنَاهِجُ|broken|abstract
muhadarah|مُحَاضَرَةٌ|kuliah, ceramah|محاضرة|education|مُحَاضَرَاتٌ|sound|abstract
wajib|وَاجِبٌ|tugas, pekerjaan rumah|واجب|education|وَاجِبَاتٌ|sound|abstract
maktabah|مَكْتَبَةٌ|perpustakaan, toko buku|مكتبة|education|مَكْتَبَاتٌ|sound|concrete
wizarah|وِزَارَةٌ|kementerian|وزارة|public-services|وِزَارَاتٌ|sound|abstract
baladiyyah|بَلَدِيَّةٌ|pemerintah munisipal|بلدية|public-services|بَلَدِيَّاتٌ|sound|abstract
sifarah|سِفَارَةٌ|kedutaan|سفارة|public-services|سِفَارَاتٌ|sound|concrete
khidmah|خِدْمَةٌ|layanan, jasa|خدمة|public-services|خِدْمَاتٌ|sound|abstract
mawid|مَوْعِدٌ|jadwal janji, waktu yang ditetapkan|موعد|public-services|||abstract
`;

export const msaFormalVocabulary: readonly VocabularyItem[] = rows
	.trim()
	.split('\n')
	.map((line): VocabularyItem => {
		const [id, arabic, meaning, lemma, topic, plural, kind, concreteness] = line.split('|');
		if (
			!id ||
			!arabic ||
			!meaning ||
			!lemma ||
			(topic !== 'documents' && topic !== 'education' && topic !== 'public-services') ||
			(concreteness !== 'abstract' && concreteness !== 'concrete') ||
			(plural && kind !== 'sound' && kind !== 'broken') ||
			(!plural && kind)
		) {
			throw new Error(`Malformed formal MSA row: ${line}`);
		}

		const sourceUrl = `https://en.wiktionary.org/wiki/${lemma}#Arabic`;
		const claim = (field: ResearchField, assertion: string, section = 'Noun') => ({
			field,
			assertion,
			sourceUrl,
			section: `Arabic > ${section}`,
			checkedOn: '2026-11-20',
			outcome: 'supports' as const
		});
		const research: ResearchAudit = {
			status: 'partial',
			claims: [
				claim('arabic', `Lema ${arabic} tercatat; akhiran i‘rab editorial.`),
				claim('meaning', `Makna terpilih: ${meaning}.`),
				claim('wordClass', 'Makna terpilih tercatat pada bagian nomina.'),
				...(plural ? [claim('plural', `Salah satu bentuk jamak: ${plural}.`)] : []),
				...(id === 'faturah'
					? [claim('formation', 'Serapan dari bahasa Italia.', 'Etymology')]
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
					: {}),
				...(id === 'faturah' ? { formation: 'loanword' as const } : {})
			}
		};
	});
