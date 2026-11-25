/**
 * VP-01 annotations for the G-03 edge-case examples (issue #16): ẓarf, muannath, al-asmā’
 * al-khamsa, jamak taksir and mamnū‘ min aṣ-ṣarf, maqṣūr and manqūṣ, mabnī words, and iḍāfah
 * in naṣb and as ma‘rifah.
 *
 * Arabic text, glosses and translations are read from the examples in phrase-rules-edge.ts, so an
 * annotation cannot drift from the page it explains. The Indonesian analysis is original teaching
 * text; the cited sources check terms and rules, not the sentences. Everything stays `draft`
 * (ADR-004 D-9). Limits of the evidence: docs/data/nahwu-phrase-irab-audit.md.
 */
import {
	aj,
	analysis,
	jarrIsim,
	limitNotes,
	madinah,
	phraseOrigin,
	qatr,
	sentence,
	tandaFiil,
	tandaIsimAl,
	tandaIsimTanwin,
	withArticle,
	withSubjectPronoun
} from './annotation-builders.js';
import { phraseRules } from './phrase-rules.js';
import type {
	AnnotatedSentence,
	AnnotatedToken,
	AnnotationSource,
	FinalVowel,
	RelationType,
	RoleId,
	RuleLink,
	TokenSegment
} from '#lib/domain/grammar/annotation.js';
import type { IrabCase, PhraseRuleId } from './phrase-rules.js';

type Spec = Omit<AnnotatedToken, 'id' | 'text' | 'gloss'>;
type SpecInput = Spec | ((text: string) => Spec);
type Relation = {
	type: RelationType;
	from: readonly [number, ...number[]];
	to: readonly [number, ...number[]];
	reason: string;
};

const link = (id: PhraseRuleId, label: string): RuleLink => ({
	label,
	path: `kaidah/frasa/#${id}` as RuleLink['path']
});

const links = {
	zharf: link('zharf-makan-zaman', 'Kaidah ẓarf makān dan zamān'),
	muannath: link('muannath-salim', 'Kaidah muannath dan jamak muannath sālim'),
	khamsa: link('asma-khamsa', 'Kaidah al-asmā’ al-khamsa'),
	taksir: link('jamak-taksir-mamnu', 'Kaidah jamak taksir dan mamnū‘ min aṣ-ṣarf'),
	maqshur: link('maqshur-manqush', 'Kaidah isim maqṣūr dan manqūṣ'),
	mabni: link('kata-mabni', 'Kaidah kata mabnī'),
	idafah: link('idafah-nasb-marifah', 'Kaidah iḍāfah pada naṣb dan ma‘rifah')
};

const vowel = (sign: string, kase: IrabCase, reason: string): FinalVowel => ({
	sign,
	case: kase,
	reason
});

function isim(o: {
	role: RoleId;
	alsoRoles?: readonly RoleId[];
	roleReason: string;
	wordClassReason?: string;
	vowel?: FinalVowel;
	stem?: string;
	note?: string;
}): SpecInput {
	return (text) => {
		const article = text.startsWith('ال');
		return {
			wordClass: 'isim',
			wordClassReason: o.wordClassReason ?? (article ? tandaIsimAl : tandaIsimTanwin),
			role: o.role,
			...(o.alsoRoles ? { alsoRoles: o.alsoRoles } : {}),
			roleReason: o.roleReason,
			...(o.vowel ? { finalVowel: o.vowel } : {}),
			...(article && o.stem ? { segments: withArticle(text, o.stem) } : {}),
			...(o.note ? { note: o.note } : {})
		};
	};
}

function verb(
	roleReason: string,
	pronoun?: { suffix: string; stemNote: string },
	wordClassReason = tandaFiil
): SpecInput {
	return (text) => ({
		wordClass: 'fiil',
		wordClassReason,
		role: 'fiil',
		roleReason,
		...(pronoun ? { segments: withSubjectPronoun(text, pronoun.suffix, pronoun.stemNote) } : {})
	});
}

const withSubject = 'Verba kalimat verbal. Pelakunya, “saya”, melekat pada kata ini sebagai تُ.';
const withDoer = 'Verba kalimat verbal; pelaku disebut sesudahnya.';
const subjectPronoun = (stem: string) => ({
	suffix: 'تُ',
	stemNote: `Batang fi‘il māḍī ${stem}; di depan تُ huruf akhirnya bersukun.`
});
const raaytu = verb(withSubject, {
	suffix: 'تُ',
	stemNote: 'Batang fi‘il māḍī رَأَى; di depan تُ alif akhirnya kembali menjadi يْ (ya bersukun).'
});
const sallamtu = verb(withSubject, subjectPronoun('سَلَّمَ'));
const qaraatu = verb(withSubject, subjectPronoun('قَرَأَ'));
const saaltu = verb(withSubject, subjectPronoun('سَأَلَ'));
const jaa = verb(withDoer);

const harfJar: Spec = {
	wordClass: 'harf',
	wordClassReason:
		'Salah satu harf jarr yang disebut Al-Ājurrūmiyyah. Bentuknya tetap dan tidak punya tanda isim atau fi‘il.',
	role: 'harf-jar',
	roleReason: 'Harf jarr: membuat isim sesudahnya majrūr.'
};

const mudhafIlaih = (stem: string, reason = 'Muḍāf ilaih berstatus jarr, tandanya kasrah.') =>
	isim({
		role: 'mudhaf-ilaih',
		roleReason: 'Kata kedua iḍāfah: isim sesudah muḍāf, selalu majrūr.',
		vowel: vowel('kasrah', 'jarr', reason),
		stem
	});

const faail = (stem: string, sign = 'ḍammah') =>
	isim({
		role: 'fail',
		roleReason: 'Pelaku perbuatan (fā‘il).',
		vowel: vowel(sign, 'raf', 'Fā‘il berstatus rafa‘.'),
		stem
	});

const rel = (
	type: RelationType,
	from: Relation['from'],
	to: Relation['to'],
	reason: string
): Relation => ({ type, from, to, reason });

/** The edge-case example `exampleId` of rule `ruleId`; throws when content and annotation drift. */
function exampleOf(ruleId: PhraseRuleId, exampleId: string) {
	const example = phraseRules
		.find((rule) => rule.id === ruleId)
		?.examples.find((item) => item.id === exampleId);
	if (!example) throw new Error(`Missing phrase example ${ruleId}/${exampleId}`);
	return example;
}

function annotate(input: {
	id: string;
	rule: PhraseRuleId;
	example: string;
	unit: 'sentence' | 'phrase';
	sources: readonly [AnnotationSource, ...AnnotationSource[]];
	notes?: readonly string[];
	links: readonly RuleLink[];
	tokens: readonly SpecInput[];
	relations: readonly Relation[];
}): AnnotatedSentence {
	const example = exampleOf(input.rule, input.example);
	if (example.tokens.length !== input.tokens.length)
		throw new Error(
			`${input.id}: ${input.tokens.length} specs for ${example.tokens.length} tokens`
		);
	return sentence({
		id: input.id,
		unit: input.unit,
		origins: [phraseOrigin(input.rule, input.example)],
		translation: example.translation,
		analysis: analysis(input.sources, ...(input.notes ?? [])),
		ruleLinks: input.links,
		tokens: example.tokens.map((token, index) => {
			const spec = input.tokens[index]!;
			return {
				text: token.arabic,
				gloss: token.gloss,
				...(typeof spec === 'function' ? spec(token.arabic) : spec)
			};
		}),
		relations: input.relations
	});
}

const nominalZharf =
	' Pada kalimat nominal, para ahli nahwu menerangkan kedudukan ẓarf sebagai khabar dengan cara yang berbeda-beda; sumber yang dikutip tidak merincinya.';
const taqdirNote =
	' Perkiraan harakat (muqaddara) dan harakat tampak (ẓāhira) dibahas Qaṭr an-Nadā; Al-Ājurrūmiyyah hanya menyebut i‘rab lafẓī dan taqdīrī secara umum.';
const mabniNote =
	' Al-Ājurrūmiyyah menyebut ḍamīr dan isim isyārah, tetapi tidak membahas ke-mabnī-annya maupun maḥall; rujukan untuk mabnī adalah Qaṭr an-Nadā dan Madinah Arabic. Kata mabnī tidak diberi alasan harakat akhir.';

const zharfSources = [aj.zharf, qatr.maful, aj.makhfudat, madinah.adverbPlace] as const;
const zharfTimeSources = [aj.zharf, qatr.maful, aj.makhfudat, madinah.adverbTime] as const;

/** ẓarf as muḍāf and khabar of a nominal sentence. */
const zharfKhabar = (reasonStem: string, sample: string): SpecInput =>
	isim({
		role: 'zharf',
		alsoRoles: ['mudhaf', 'khabar'],
		roleReason: `Ẓarf makān (${reasonStem}). Ia juga muḍāf bagi isim sesudahnya dan menempati kedudukan khabar.`,
		wordClassReason: `Isim keterangan tempat; dapat didahului harf jarr (misalnya ${sample}), salah satu tanda isim.`,
		vowel: vowel('fatḥah', 'nasb', 'Ẓarf berstatus naṣb, tandanya fatḥah.')
	});

const zharfPlain = (kind: 'makān' | 'zamān', gloss: string, sample: string): SpecInput =>
	isim({
		role: 'zharf',
		alsoRoles: ['mudhaf'],
		roleReason: `Ẓarf ${kind} (“${gloss}”). Ia juga muḍāf bagi isim sesudahnya.`,
		wordClassReason: `Isim keterangan ${kind === 'makān' ? 'tempat' : 'waktu'}; dapat didahului harf jarr (misalnya ${sample}), salah satu tanda isim.`,
		vowel: vowel('fatḥah', 'nasb', 'Ẓarf berstatus naṣb, tandanya fatḥah.')
	});

const zharfAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-kitab-fawq-maktab',
		rule: 'zharf-makan-zaman',
		example: 'place-above',
		unit: 'sentence',
		sources: [...zharfSources, aj.mubtada],
		notes: [nominalZharf],
		links: [links.zharf],
		tokens: [
			isim({
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang buku.',
				vowel: vowel('ḍammah', 'raf', 'Mubtada’ berstatus rafa‘, tandanya ḍammah.'),
				stem: 'كِتَابٌ berarti “buku”.'
			}),
			zharfKhabar('“di atas”', 'مِنْ فَوْقِ الْمَكْتَبِ'),
			mudhafIlaih('مَكْتَبٌ berarti “meja tulis”.')
		],
		relations: [
			rel('mubtada-khabar', [1], [2], 'Kabar tentang buku adalah tempatnya: di atas meja tulis.'),
			rel('mudhaf-mudhaf-ilaih', [2], [3], 'Muḍāf ilaih majrūr; فَوْقَ tidak bertanwin.')
		]
	}),
	annotate({
		id: 'ph-qitta-taht-kursi',
		rule: 'zharf-makan-zaman',
		example: 'place-below',
		unit: 'sentence',
		sources: [...zharfSources, aj.mubtada],
		notes: [nominalZharf],
		links: [links.zharf],
		tokens: [
			isim({
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang kucing.',
				vowel: vowel('ḍammah', 'raf', 'Mubtada’ berstatus rafa‘, tandanya ḍammah.'),
				stem: 'قِطَّةٌ berarti “kucing”.'
			}),
			zharfKhabar('“di bawah”', 'مِنْ تَحْتِ الْكُرْسِيِّ'),
			mudhafIlaih('كُرْسِيٌّ berarti “kursi”.')
		],
		relations: [
			rel('mubtada-khabar', [1], [2], 'Kabar tentang kucing adalah tempatnya: di bawah kursi.'),
			rel('mudhaf-mudhaf-ilaih', [2], [3], 'Muḍāf ilaih majrūr; تَحْتَ tidak bertanwin.')
		]
	}),
	annotate({
		id: 'ph-waqafa-amama-bab',
		rule: 'zharf-makan-zaman',
		example: 'place-front',
		unit: 'sentence',
		sources: [...zharfSources, aj.fail],
		links: [links.zharf],
		tokens: [
			verb(withDoer),
			faail('طَالِبٌ berarti “murid”.'),
			zharfPlain('makān', 'di depan', 'مِنْ أَمَامِ الْبَابِ'),
			mudhafIlaih('بَابٌ berarti “pintu”.')
		],
		relations: [
			rel('fiil-fail', [1], [2], 'Yang berdiri adalah الطَّالِبُ.'),
			rel('mudhaf-mudhaf-ilaih', [3], [4], 'Muḍāf ilaih majrūr; أَمَامَ tidak bertanwin.')
		]
	}),
	annotate({
		id: 'ph-jaa-badaa-dars',
		rule: 'zharf-makan-zaman',
		example: 'time-after',
		unit: 'sentence',
		sources: [...zharfTimeSources, aj.fail],
		links: [links.zharf],
		tokens: [
			jaa,
			faail('طَالِبٌ berarti “murid”.'),
			zharfPlain('zamān', 'sesudah', 'مِنْ بَعْدِ الدَّرْسِ'),
			mudhafIlaih('دَرْسٌ berarti “pelajaran”.')
		],
		relations: [
			rel('fiil-fail', [1], [2], 'Yang datang adalah الطَّالِبُ.'),
			rel('mudhaf-mudhaf-ilaih', [3], [4], 'Muḍāf ilaih majrūr; بَعْدَ tidak bertanwin.')
		]
	}),
	annotate({
		id: 'ph-wasala-qabla-dars',
		rule: 'zharf-makan-zaman',
		example: 'time-before',
		unit: 'sentence',
		sources: [...zharfTimeSources, aj.fail],
		links: [links.zharf],
		tokens: [
			verb(withDoer),
			faail('مُعَلِّمٌ berarti “guru”.'),
			zharfPlain('zamān', 'sebelum', 'مِنْ قَبْلِ الدَّرْسِ'),
			mudhafIlaih('دَرْسٌ berarti “pelajaran”.')
		],
		relations: [
			rel('fiil-fail', [1], [2], 'Yang tiba adalah الْمُعَلِّمُ.'),
			rel('mudhaf-mudhaf-ilaih', [3], [4], 'Muḍāf ilaih majrūr; قَبْلَ tidak bertanwin.')
		]
	})
];

const muannathSources = [aj.irab, qatr.types, madinah.feminineSound] as const;
const muannathNote =
	' Pasangan mudzakkar–muannath dengan tā’ marbūṭah dan kesesuaian sifatnya tidak dinyatakan dalam bab Al-Ājurrūmiyyah yang dikutip; perlu sumber tambahan (Madinah Arabic pelajaran 9 menyinggung kesesuaian sifat).';

const teacherPair = (gender: 'mudzakkar' | 'muannath'): SpecInput[] => [
	isim({
		role: 'manut',
		roleReason: `Kata benda ${gender} yang diterangkan oleh sifat sesudahnya.`,
		vowel: vowel(
			'tanwīn ḍammah',
			'raf',
			'Contoh ini ditulis dalam posisi rafa‘ sebagai bentuk rujukan. Pada posisi naṣb atau jarr akhirnya ikut berubah.'
		)
	}),
	isim({
		role: 'naat',
		roleReason: `Sifat ${gender} yang mengikuti kata benda: sama-sama nakirah dan sama-sama rafa‘.`,
		vowel: vowel(
			'tanwīn ḍammah',
			'raf',
			'Na‘at mengikuti i‘rab man‘ūt-nya; keduanya rafa‘ pada contoh ini.'
		)
	})
];

const feminineSoundPlural = (role: RoleId, roleReason: string, v: FinalVowel): SpecInput =>
	isim({
		role,
		roleReason,
		vowel: v,
		stem: 'Jamak muannath sālim dari مُعَلِّمَةٌ (guru perempuan): tā’ marbūṭah diganti ـَات.'
	});

const muannathAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-muallim-jadid',
		rule: 'muannath-salim',
		example: 'masc-teacher',
		unit: 'phrase',
		sources: [aj.naat, madinah.adjective],
		notes: [limitNotes.phrase, muannathNote],
		links: [links.muannath],
		tokens: teacherPair('mudzakkar'),
		relations: [
			rel(
				'naat-manut',
				[2],
				[1],
				'Keduanya mudzakkar, nakirah dan rafa‘. Ini frasa sifat, bukan kalimat nominal.'
			)
		]
	}),
	annotate({
		id: 'ph-muallima-jadida',
		rule: 'muannath-salim',
		example: 'fem-teacher',
		unit: 'phrase',
		sources: [aj.naat, madinah.adjective],
		notes: [limitNotes.phrase, muannathNote],
		links: [links.muannath],
		tokens: teacherPair('muannath'),
		relations: [
			rel(
				'naat-manut',
				[2],
				[1],
				'Keduanya muannath, nakirah dan rafa‘; tā’ marbūṭah tampak pada keduanya.'
			)
		]
	}),
	annotate({
		id: 'ph-jaat-muallimat',
		rule: 'muannath-salim',
		example: 'fem-plural-subject',
		unit: 'sentence',
		sources: [...muannathSources, aj.fail],
		notes: [],
		links: [links.muannath],
		tokens: [
			verb(
				'Verba kalimat verbal; pelaku muannath disebut sesudahnya dan fi‘ilnya memakai tā’ ta’nīth.',
				undefined,
				'Fi‘il māḍī: menerima tā’ ta’nīth sākinah (di sini diberi kasrah karena bertemu lām الْـ yang bersukun), tanda fi‘il menurut Al-Ājurrūmiyyah.'
			),
			feminineSoundPlural(
				'fail',
				'Pelaku perbuatan (fā‘il).',
				vowel('ḍammah', 'raf', 'Jamak muannath sālim marfū‘ dengan ḍammah.')
			)
		],
		relations: [rel('fiil-fail', [1], [2], 'Yang datang adalah الْمُعَلِّمَاتُ.')]
	}),
	annotate({
		id: 'ph-raaytu-muallimat',
		rule: 'muannath-salim',
		example: 'fem-plural-object',
		unit: 'sentence',
		sources: [...muannathSources, aj.mafulBih, aj.manshubat],
		links: [links.muannath],
		tokens: [
			raaytu,
			feminineSoundPlural(
				'maful-bih',
				'Objek langsung (maf‘ūl bih).',
				vowel(
					'kasrah',
					'nasb',
					'Maf‘ūl bih berstatus naṣb, tetapi jamak muannath sālim memakai kasrah sebagai pengganti fatḥah (Al-Ājurrūmiyyah).'
				)
			)
		],
		relations: [rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah الْمُعَلِّمَاتِ.')]
	}),
	annotate({
		id: 'ph-sallamtu-muallimat',
		rule: 'muannath-salim',
		example: 'fem-plural-jarr',
		unit: 'sentence',
		sources: [...muannathSources, aj.makhfudat],
		notes: [limitNotes.khafd],
		links: [links.muannath],
		tokens: [
			sallamtu,
			harfJar,
			feminineSoundPlural(
				'majrur',
				jarrIsim('عَلَى'),
				vowel('kasrah', 'jarr', 'Berkasrah karena harf jarr عَلَى.')
			)
		],
		relations: [rel('jar-majrur', [2], [3], 'عَلَى menjarrkan الْمُعَلِّمَاتِ.')]
	}),
	annotate({
		id: 'ph-raaytu-muallimatin',
		rule: 'muannath-salim',
		example: 'fem-plural-indefinite',
		unit: 'sentence',
		sources: [...muannathSources, aj.mafulBih, aj.manshubat],
		links: [links.muannath],
		tokens: [
			raaytu,
			isim({
				role: 'maful-bih',
				roleReason: 'Objek langsung (maf‘ūl bih).',
				vowel: vowel(
					'tanwīn kasrah',
					'nasb',
					'Naṣb jamak muannath sālim ditandai kasrah; pada nakirah tampak sebagai tanwin kasrah.'
				)
			})
		],
		relations: [rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah مُعَلِّمَاتٍ.')]
	})
];

const khamsaSources = [aj.irab, qatr.types, madinah.sixNouns] as const;
const khamsaNote =
	' Syarat lengkap penggunaan wāw, alif dan yā’ (misalnya bahwa kata itu muḍāf) tidak dirinci dalam sumber yang dikutip; contoh memakai bentuk muḍāf seperti yang dicontohkan Al-Ājurrūmiyyah (أَبُوكَ).';

const khamsaToken = (
	role: RoleId,
	roleReason: string,
	v: FinalVowel,
	alsoRoles: RoleId[] = ['mudhaf']
) =>
	isim({
		role,
		alsoRoles,
		roleReason,
		vowel: v,
		wordClassReason:
			'Isim yang menerima tanda isim dan menjadi muḍāf. Termasuk al-asmā’ al-khamsa menurut Al-Ājurrūmiyyah.'
	});

const khamsaAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-jaa-abu-talib',
		rule: 'asma-khamsa',
		example: 'father-raf',
		unit: 'sentence',
		sources: [...khamsaSources, aj.fail, aj.makhfudat],
		notes: [khamsaNote],
		links: [links.khamsa],
		tokens: [
			jaa,
			khamsaToken(
				'fail',
				'Pelaku perbuatan (fā‘il); sekaligus muḍāf bagi الطَّالِبِ.',
				vowel('wāw', 'raf', 'Al-asmā’ al-khamsa marfū‘ dengan wāw sebagai pengganti ḍammah.'),
				['mudhaf']
			),
			mudhafIlaih('طَالِبٌ berarti “murid”.')
		],
		relations: [
			rel('fiil-fail', [1], [2], 'Yang datang adalah أَبُو الطَّالِبِ.'),
			rel('mudhaf-mudhaf-ilaih', [2], [3], 'Muḍāf ilaih majrūr dengan kasrah.')
		]
	}),
	annotate({
		id: 'ph-raaytu-aba-talib',
		rule: 'asma-khamsa',
		example: 'father-nasb',
		unit: 'sentence',
		sources: [...khamsaSources, aj.mafulBih, aj.makhfudat],
		notes: [khamsaNote],
		links: [links.khamsa],
		tokens: [
			raaytu,
			khamsaToken(
				'maful-bih',
				'Objek langsung (maf‘ūl bih); sekaligus muḍāf bagi الطَّالِبِ.',
				vowel('alif', 'nasb', 'Al-asmā’ al-khamsa manṣūb dengan alif sebagai pengganti fatḥah.')
			),
			mudhafIlaih('طَالِبٌ berarti “murid”.', 'Muḍāf ilaih tetap jarr dengan kasrah.')
		],
		relations: [
			rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah أَبَا الطَّالِبِ.'),
			rel('mudhaf-mudhaf-ilaih', [2], [3], 'Muḍāf ilaih majrūr dengan kasrah.')
		]
	}),
	annotate({
		id: 'ph-sallamtu-abi-talib',
		rule: 'asma-khamsa',
		example: 'father-jarr',
		unit: 'sentence',
		sources: [...khamsaSources, aj.makhfudat],
		notes: [khamsaNote, limitNotes.khafd],
		links: [links.khamsa],
		tokens: [
			sallamtu,
			harfJar,
			khamsaToken(
				'majrur',
				'Isim yang dijarrkan oleh عَلَى; sekaligus muḍāf bagi الطَّالِبِ.',
				vowel('yā’', 'jarr', 'Al-asmā’ al-khamsa majrūr dengan yā’ sebagai pengganti kasrah.')
			),
			mudhafIlaih(
				'طَالِبٌ berarti “murid”.',
				'Berkasrah karena menjadi muḍāf ilaih, bukan karena عَلَى.'
			)
		],
		relations: [
			rel('jar-majrur', [2], [3], 'عَلَى menjarrkan أَبِي.'),
			rel('mudhaf-mudhaf-ilaih', [3], [4], 'Muḍāf ilaih majrūr dengan kasrah.')
		]
	}),
	annotate({
		id: 'ph-jaa-rajul-dhu-ilm',
		rule: 'asma-khamsa',
		example: 'dhu-ilm',
		unit: 'sentence',
		sources: [...khamsaSources, aj.fail, aj.naat],
		notes: [khamsaNote],
		links: [links.khamsa],
		tokens: [
			jaa,
			isim({
				role: 'fail',
				alsoRoles: ['manut'],
				roleReason: 'Pelaku perbuatan (fā‘il); sekaligus kata yang diterangkan oleh ذُو.',
				vowel: vowel('tanwīn ḍammah', 'raf', 'Fā‘il berstatus rafa‘, tandanya ḍammah.')
			}),
			khamsaToken(
				'naat',
				'Sifat bagi رَجُلٌ; sekaligus muḍāf bagi عِلْمٍ.',
				vowel(
					'wāw',
					'raf',
					'Na‘at mengikuti man‘ūt yang rafa‘; al-asmā’ al-khamsa marfū‘ dengan wāw.'
				),
				['mudhaf']
			),
			isim({
				role: 'mudhaf-ilaih',
				roleReason: 'Kata kedua iḍāfah: isim sesudah muḍāf, selalu majrūr.',
				vowel: vowel(
					'tanwīn kasrah',
					'jarr',
					'Muḍāf ilaih berstatus jarr; nakirah, jadi bertanwin kasrah.'
				)
			})
		],
		relations: [
			rel('fiil-fail', [1], [2], 'Yang datang adalah رَجُلٌ.'),
			rel('naat-manut', [3], [2], 'ذُو mengikuti رَجُلٌ dalam kasus rafa‘ dan sama-sama nakirah.'),
			rel('mudhaf-mudhaf-ilaih', [3], [4], 'Muḍāf ilaih majrūr dengan tanwin kasrah.')
		]
	})
];

const taksirSources = [aj.irab, qatr.mamnu, madinah.diptote] as const;
const taksirNote =
	' Daftar sebab larangan ṣarf berasal dari Qaṭr an-Nadā; Al-Ājurrūmiyyah hanya menyebut tandanya (fatḥah pada jarr). Hanya satu sebab dicontohkan.';
const feminineAgree = (v: FinalVowel): SpecInput =>
	isim({
		role: 'naat',
		roleReason: 'Sifat bagi jamak benda tidak berakal, dalam bentuk feminin tunggal.',
		vowel: v,
		note: 'Feminin tunggal di sini adalah pola khusus untuk jamak benda tidak berakal, bukan kesalahan jumlah.'
	});

const taksirAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-fi-kutub-kathira',
		rule: 'jamak-taksir-mamnu',
		example: 'munsarif-jarr',
		unit: 'phrase',
		sources: [...taksirSources, aj.makhfudat, aj.naat],
		notes: [limitNotes.prepositionPhrase, limitNotes.khafd, limitNotes.nonhumanPlural],
		links: [links.taksir],
		tokens: [
			harfJar,
			isim({
				role: 'majrur',
				alsoRoles: ['manut'],
				roleReason: jarrIsim('فِي') + ' Ia juga kata yang diterangkan oleh sifat sesudahnya.',
				vowel: vowel(
					'tanwīn kasrah',
					'jarr',
					'Jamak taksir munṣarif (menerima tanwin): majrūr dengan kasrah, di sini tanwin kasrah.'
				)
			}),
			feminineAgree(vowel('tanwīn kasrah', 'jarr', 'Na‘at mengikuti kasus man‘ūt-nya: jarr.'))
		],
		relations: [
			rel('jar-majrur', [1], [2], 'فِي menjarrkan كُتُبٍ.'),
			rel('naat-manut', [3], [2], 'Sifat mengikuti كُتُبٍ dalam kasus jarr.')
		]
	}),
	annotate({
		id: 'ph-qaraatu-kutuba-kathira',
		rule: 'jamak-taksir-mamnu',
		example: 'munsarif-nasb',
		unit: 'sentence',
		sources: [...taksirSources, aj.mafulBih, aj.naat],
		notes: [limitNotes.nonhumanPlural],
		links: [links.taksir],
		tokens: [
			qaraatu,
			isim({
				role: 'maful-bih',
				alsoRoles: ['manut'],
				roleReason:
					'Objek langsung (maf‘ūl bih); sekaligus kata yang diterangkan oleh sifat sesudahnya.',
				vowel: vowel(
					'tanwīn fatḥah',
					'nasb',
					'Jamak taksir munṣarif manṣūb dengan fatḥah; pada nakirah tampak sebagai tanwin fatḥah.'
				)
			}),
			feminineAgree(vowel('tanwīn fatḥah', 'nasb', 'Na‘at mengikuti kasus man‘ūt-nya: naṣb.'))
		],
		relations: [
			rel('fiil-maful-bih', [1], [2], 'Yang dibaca adalah كُتُبًا.'),
			rel('naat-manut', [3], [2], 'Sifat mengikuti كُتُبًا dalam kasus naṣb.')
		]
	}),
	annotate({
		id: 'ph-fi-madaris-kathira',
		rule: 'jamak-taksir-mamnu',
		example: 'mamnu-jarr',
		unit: 'phrase',
		sources: [...taksirSources, aj.makhfudat, aj.naat],
		notes: [limitNotes.prepositionPhrase, limitNotes.khafd, taksirNote, limitNotes.nonhumanPlural],
		links: [links.taksir],
		tokens: [
			harfJar,
			isim({
				role: 'majrur',
				alsoRoles: ['manut'],
				roleReason: jarrIsim('فِي') + ' Ia juga kata yang diterangkan oleh sifat sesudahnya.',
				wordClassReason:
					'Di sini tanpa tanwin dan tanpa الْـ, tetapi dapat didahului harf jarr فِي dan dapat memakai الْـ (الْمَدَارِسِ), tanda isim.',
				vowel: vowel(
					'fatḥah',
					'jarr',
					'Mamnū‘ min aṣ-ṣarf: tidak bertanwin dan majrūr dengan fatḥah, bukan kasrah (Al-Ājurrūmiyyah). Pola مَفَاعِلُ dihitung sebagai salah satu sebab.'
				)
			}),
			feminineAgree(
				vowel(
					'tanwīn kasrah',
					'jarr',
					'Sifat كَثِيرَةٌ munṣarif, jadi majrūr dengan kasrah dan tanwin walaupun kata yang diterangkannya berfatḥah.'
				)
			)
		],
		relations: [
			rel('jar-majrur', [1], [2], 'فِي menjarrkan مَدَارِسَ.'),
			rel(
				'naat-manut',
				[3],
				[2],
				'Sifat mengikuti مَدَارِسَ dalam kasus jarr, tetapi tandanya kasrah bertanwin karena كَثِيرَةٍ munṣarif.'
			)
		]
	}),
	annotate({
		id: 'ph-fi-al-madaris',
		rule: 'jamak-taksir-mamnu',
		example: 'mamnu-definite',
		unit: 'phrase',
		sources: [...taksirSources, aj.makhfudat],
		notes: [limitNotes.prepositionPhrase, limitNotes.khafd, taksirNote],
		links: [links.taksir],
		tokens: [
			harfJar,
			isim({
				role: 'majrur',
				roleReason: jarrIsim('فِي'),
				vowel: vowel(
					'kasrah',
					'jarr',
					'Isim mamnū‘ min aṣ-ṣarf memakai kasrah pada jarr bila disertai الْـ (Qaṭr an-Nadā).'
				),
				stem: 'مَدْرَسَةٌ (sekolah) dalam jamak taksir مَدَارِسُ.'
			})
		],
		relations: [rel('jar-majrur', [1], [2], 'فِي menjarrkan الْمَدَارِسِ.')]
	}),
	annotate({
		id: 'ph-fi-madaris-madina',
		rule: 'jamak-taksir-mamnu',
		example: 'mamnu-idafah',
		unit: 'phrase',
		sources: [...taksirSources, aj.makhfudat, madinah.idafah],
		notes: [limitNotes.prepositionPhrase, limitNotes.khafd, taksirNote],
		links: [links.taksir],
		tokens: [
			harfJar,
			isim({
				role: 'mudhaf',
				alsoRoles: ['majrur'],
				roleReason: 'Kata pertama iḍāfah (muḍāf); sekaligus majrūr karena didahului فِي.',
				vowel: vowel(
					'kasrah',
					'jarr',
					'Isim mamnū‘ min aṣ-ṣarf memakai kasrah pada jarr bila menjadi muḍāf (Qaṭr an-Nadā).'
				)
			}),
			mudhafIlaih('مَدِينَةٌ berarti “kota”.')
		],
		relations: [
			rel('jar-majrur', [1], [2], 'فِي menjarrkan مَدَارِسِ.'),
			rel('mudhaf-mudhaf-ilaih', [2], [3], 'Muḍāf ilaih majrūr dengan kasrah.')
		]
	})
];

const maqshurSources = [aj.bab_irab, qatr.taqdir, madinah.maqsur] as const;

const maqshurToken = (
	role: RoleId,
	roleReason: string,
	v: FinalVowel,
	kind: 'maqṣūr' | 'manqūṣ',
	stem: string
): SpecInput =>
	isim({
		role,
		roleReason,
		vowel: v,
		stem,
		note:
			kind === 'maqṣūr'
				? 'Isim maqṣūr: berakhir alif maqṣūrah, sehingga harakat i‘rab tidak tampak pada akhirnya.'
				: 'Isim manqūṣ: berakhir yā’ yang didahului kasrah. Rafa‘ dan jarr hanya diperkirakan; naṣb tampak.'
	});

const maqshurAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-jaa-fata',
		rule: 'maqshur-manqush',
		example: 'maqsur-raf',
		unit: 'sentence',
		sources: [...maqshurSources, aj.fail],
		notes: [taqdirNote],
		links: [links.maqshur],
		tokens: [
			jaa,
			maqshurToken(
				'fail',
				'Pelaku perbuatan (fā‘il).',
				vowel(
					'ḍammah muqaddarah',
					'raf',
					'Fā‘il berstatus rafa‘; tandanya ḍammah yang hanya diperkirakan.'
				),
				'maqṣūr',
				'فَتًى berarti “pemuda”.'
			)
		],
		relations: [rel('fiil-fail', [1], [2], 'Yang datang adalah الْفَتَى.')]
	}),
	annotate({
		id: 'ph-raaytu-fata',
		rule: 'maqshur-manqush',
		example: 'maqsur-nasb',
		unit: 'sentence',
		sources: [...maqshurSources, aj.mafulBih],
		notes: [taqdirNote],
		links: [links.maqshur],
		tokens: [
			raaytu,
			maqshurToken(
				'maful-bih',
				'Objek langsung (maf‘ūl bih).',
				vowel('fatḥah muqaddarah', 'nasb', 'Maf‘ūl bih berstatus naṣb; fatḥah hanya diperkirakan.'),
				'maqṣūr',
				'فَتًى berarti “pemuda”.'
			)
		],
		relations: [rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah الْفَتَى.')]
	}),
	annotate({
		id: 'ph-jaa-qadi',
		rule: 'maqshur-manqush',
		example: 'manqus-raf',
		unit: 'sentence',
		sources: [...maqshurSources, aj.fail],
		notes: [taqdirNote],
		links: [links.maqshur],
		tokens: [
			jaa,
			maqshurToken(
				'fail',
				'Pelaku perbuatan (fā‘il).',
				vowel(
					'ḍammah muqaddarah',
					'raf',
					'Fā‘il berstatus rafa‘; ḍammah hanya diperkirakan pada yā’.'
				),
				'manqūṣ',
				'قَاضٍ berarti “hakim”.'
			)
		],
		relations: [rel('fiil-fail', [1], [2], 'Yang datang adalah الْقَاضِي.')]
	}),
	annotate({
		id: 'ph-raaytu-qadiya',
		rule: 'maqshur-manqush',
		example: 'manqus-nasb',
		unit: 'sentence',
		sources: [...maqshurSources, aj.mafulBih],
		notes: [taqdirNote],
		links: [links.maqshur],
		tokens: [
			raaytu,
			maqshurToken(
				'maful-bih',
				'Objek langsung (maf‘ūl bih).',
				vowel('fatḥah ẓāhirah', 'nasb', 'Maf‘ūl bih berstatus naṣb; fatḥah tampak pada yā’.'),
				'manqūṣ',
				'قَاضٍ berarti “hakim”.'
			)
		],
		relations: [rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah الْقَاضِيَ.')]
	}),
	annotate({
		id: 'ph-sallamtu-qadi',
		rule: 'maqshur-manqush',
		example: 'manqus-jarr',
		unit: 'sentence',
		sources: [...maqshurSources, aj.makhfudat],
		notes: [taqdirNote, limitNotes.khafd],
		links: [links.maqshur],
		tokens: [
			sallamtu,
			harfJar,
			maqshurToken(
				'majrur',
				jarrIsim('عَلَى'),
				vowel(
					'kasrah muqaddarah',
					'jarr',
					'Berstatus jarr karena عَلَى; kasrah hanya diperkirakan pada yā’.'
				),
				'manqūṣ',
				'قَاضٍ berarti “hakim”.'
			)
		],
		relations: [rel('jar-majrur', [2], [3], 'عَلَى menjarrkan الْقَاضِي.')]
	})
];

const mabniSources = [qatr.marifah, madinah.mabni, madinah.declinable] as const;
const khabarRaf = isim({
	role: 'khabar',
	roleReason: 'Informasi yang melengkapi mubtada’.',
	vowel: vowel(
		'tanwīn ḍammah',
		'raf',
		'Khabar berstatus rafa‘, tandanya ḍammah; di sini ia bertanwin.'
	)
});

const demonstrative = (role: RoleId, roleReason: string, place: string): SpecInput => ({
	wordClass: 'isim',
	wordClassReason:
		'Isim isyārah (kata tunjuk): menunjuk sesuatu dan termasuk isim. Qaṭr an-Nadā membahasnya sebagai salah satu ma‘rifah.',
	role,
	roleReason,
	note: `Mabnī: bentuknya tetap. Kedudukannya berada di tempat ${place} (maḥall), sehingga tidak diberi harakat i‘rab.`
});

const mabniAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-huwa-talib',
		rule: 'kata-mabni',
		example: 'pronoun-subject',
		unit: 'sentence',
		sources: [...mabniSources, madinah.pronouns, aj.mubtada],
		notes: [mabniNote],
		links: [links.mabni],
		tokens: [
			{
				wordClass: 'isim',
				wordClassReason:
					'Ḍamīr munfaṣil (kata ganti yang berdiri sendiri) termasuk isim; Al-Ājurrūmiyyah menyebutnya sebagai isim muḍmar.',
				role: 'mubtada',
				roleReason: 'Topik kalimat nominal: kalimat memberi kabar tentang “dia”.',
				note: 'Mabnī: bentuknya tetap. Kedudukannya sebagai mubtada’ berada di tempat rafa‘ (maḥall), sehingga tidak diberi harakat i‘rab.'
			},
			khabarRaf
		],
		relations: [rel('mubtada-khabar', [1], [2], 'Kabar tentang “dia”: seorang murid.')]
	}),
	annotate({
		id: 'ph-hadha-kitab',
		rule: 'kata-mabni',
		example: 'demonstrative-subject',
		unit: 'sentence',
		sources: [...mabniSources, aj.mubtada],
		notes: [mabniNote],
		links: [links.mabni],
		tokens: [
			demonstrative(
				'mubtada',
				'Topik kalimat nominal: kalimat memberi kabar tentang “ini”.',
				'rafa‘'
			),
			khabarRaf
		],
		relations: [rel('mubtada-khabar', [1], [2], 'Kabar tentang “ini”: sebuah buku.')]
	}),
	annotate({
		id: 'ph-raaytu-hadha',
		rule: 'kata-mabni',
		example: 'demonstrative-object',
		unit: 'sentence',
		sources: [...mabniSources, aj.mafulBih],
		notes: [mabniNote],
		links: [links.mabni],
		tokens: [
			raaytu,
			demonstrative('maful-bih', 'Objek langsung (maf‘ūl bih): yang dilihat.', 'naṣb')
		],
		relations: [rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah هَذَا.')]
	}),
	annotate({
		id: 'ph-saaltu-an-hadha',
		rule: 'kata-mabni',
		example: 'demonstrative-jarr',
		unit: 'sentence',
		sources: [...mabniSources, aj.makhfudat],
		notes: [mabniNote, limitNotes.khafd],
		links: [links.mabni],
		tokens: [saaltu, harfJar, demonstrative('majrur', jarrIsim('عَنْ'), 'jarr')],
		relations: [rel('jar-majrur', [2], [3], 'عَنْ menjarrkan هَذَا (di tempat jarr).')]
	}),
	annotate({
		id: 'ph-kitabuhum-jadid',
		rule: 'kata-mabni',
		example: 'attached-pronoun',
		unit: 'sentence',
		sources: [...mabniSources, madinah.pronouns, aj.mubtada, aj.makhfudat],
		notes: [mabniNote],
		links: [links.mabni],
		tokens: [
			(text) => {
				const pronoun = 'هُمْ';
				if (!text.endsWith(pronoun)) throw new Error(`${text} does not end in ${pronoun}`);
				const segments: readonly TokenSegment[] = [
					{
						text: text.slice(0, -pronoun.length),
						kind: 'stem',
						note: 'كِتَابُ: muḍāf, berḍammah dan tanpa tanwin.'
					},
					{
						text: pronoun,
						kind: 'attached-pronoun',
						note: 'Ḍamīr muttaṣil “mereka” yang menjadi muḍāf ilaih di tempat jarr. Ia mabnī dan tidak berubah karena ‘āmil. Ia tetap bagian dari satu kata ini. Setelah kasra atau yā’ ia dibaca ـهِمْ; itu penyesuaian bunyi, bukan i‘rab.'
					}
				];
				return {
					wordClass: 'isim',
					wordClassReason: 'Isim yang menjadi muḍāf; tidak bertanwin dan tidak memakai الْـ.',
					role: 'mubtada',
					alsoRoles: ['mudhaf'],
					roleReason: 'Topik kalimat nominal; sekaligus muḍāf bagi ḍamīr ـهُمْ yang melekat padanya.',
					finalVowel: vowel(
						'ḍammah',
						'raf',
						'Mubtada’ berstatus rafa‘, tandanya ḍammah pada كِتَابُ.'
					),
					segments
				};
			},
			khabarRaf
		],
		relations: [rel('mubtada-khabar', [1], [2], 'Kabar tentang buku mereka: baru.')]
	})
];

const idafahSources = [aj.makhfudat, aj.naat, qatr.idafah, madinah.idafah] as const;
const idafahNote =
	' Al-Ājurrūmiyyah memuat ma‘rifah yang terbentuk dengan iḍāfah dalam bab na‘t; aturan bahwa na‘at mengikuti muḍāf atau muḍāf ilaih mengikuti aturan umum na‘at dan hanya dicontohkan pada satu pasangan.';

const idafahAnnotations: readonly AnnotatedSentence[] = [
	annotate({
		id: 'ph-kitab-talib-nakira',
		rule: 'idafah-nasb-marifah',
		example: 'indefinite-idafah',
		unit: 'phrase',
		sources: [...idafahSources],
		notes: [limitNotes.phrase, limitNotes.khafd, idafahNote],
		links: [links.idafah],
		tokens: [
			isim({
				role: 'mudhaf',
				roleReason: 'Kata pertama iḍāfah: “buku” yang dimiliki oleh seorang murid.',
				wordClassReason:
					'Dapat menerima tanwin (كِتَابٌ) dan الْـ (الْكِتَابُ), tanda isim. Di sini tidak bertanwin karena menjadi muḍāf.',
				vowel: vowel(
					'ḍammah',
					'raf',
					'Di sini ditulis rafa‘ sebagai bentuk rujukan. Kasus muḍāf mengikuti fungsi frasa dalam kalimat.'
				)
			}),
			isim({
				role: 'mudhaf-ilaih',
				roleReason:
					'Kata kedua iḍāfah, nakirah (طَالِبٍ tanpa الْـ), sehingga seluruh frasa belum tertentu.',
				vowel: vowel(
					'tanwīn kasrah',
					'jarr',
					'Muḍāf ilaih berstatus jarr; nakirah, jadi bertanwin kasrah.'
				)
			})
		],
		relations: [
			rel('mudhaf-mudhaf-ilaih', [1], [2], 'Muḍāf ilaih nakirah, sehingga frasa nakirah.')
		]
	}),
	annotate({
		id: 'ph-raaytu-kitab-talib',
		rule: 'idafah-nasb-marifah',
		example: 'idafah-nasb',
		unit: 'sentence',
		sources: [...idafahSources, aj.mafulBih],
		notes: [limitNotes.khafd],
		links: [links.idafah],
		tokens: [
			raaytu,
			isim({
				role: 'maful-bih',
				alsoRoles: ['mudhaf'],
				roleReason: 'Objek langsung (maf‘ūl bih); sekaligus muḍāf bagi الطَّالِبِ.',
				wordClassReason:
					'Dapat menerima tanwin (كِتَابٌ) dan الْـ (الْكِتَابُ), tanda isim. Di sini tidak bertanwin karena menjadi muḍāf.',
				vowel: vowel(
					'fatḥah',
					'nasb',
					'Maf‘ūl bih berstatus naṣb, tandanya fatḥah. Muḍāf tetap tanpa tanwin.'
				)
			}),
			mudhafIlaih(
				'طَالِبٌ berarti “murid”.',
				'Muḍāf ilaih tetap jarr dengan kasrah, apa pun fungsi frasa.'
			)
		],
		relations: [
			rel('fiil-maful-bih', [1], [2], 'Yang dilihat adalah كِتَابَ الطَّالِبِ.'),
			rel('mudhaf-mudhaf-ilaih', [2], [3], 'Muḍāf berfatḥah, muḍāf ilaih tetap berkasrah.')
		]
	}),
	annotate({
		id: 'ph-kitab-talib-jadid-raf',
		rule: 'idafah-nasb-marifah',
		example: 'idafah-naat-mudhaf',
		unit: 'phrase',
		sources: [...idafahSources],
		notes: [limitNotes.phrase, limitNotes.khafd, idafahNote],
		links: [links.idafah],
		tokens: [
			isim({
				role: 'mudhaf',
				alsoRoles: ['manut'],
				roleReason: 'Kata pertama iḍāfah (muḍāf); sekaligus kata yang diterangkan oleh الْجَدِيدُ.',
				wordClassReason:
					'Dapat menerima tanwin dan الْـ, tanda isim. Di sini tidak bertanwin karena menjadi muḍāf.',
				vowel: vowel('ḍammah', 'raf', 'Ditulis rafa‘ sebagai bentuk rujukan; na‘at mengikutinya.')
			}),
			mudhafIlaih('طَالِبٌ berarti “murid”.'),
			isim({
				role: 'naat',
				roleReason: 'Sifat bagi كِتَابُ: mengikuti kasus rafa‘ dan ketertentuan muḍāf.',
				wordClassReason: 'Diawali الْـ; menyebut sifat.',
				vowel: vowel('ḍammah', 'raf', 'Na‘at mengikuti i‘rab man‘ūt-nya (كِتَابُ).'),
				stem: 'جَدِيدٌ berarti “baru”.'
			})
		],
		relations: [
			rel('mudhaf-mudhaf-ilaih', [1], [2], 'Muḍāf ilaih majrūr dengan kasrah.'),
			rel('naat-manut', [3], [1], 'Berḍammah, jadi yang diterangkan adalah كِتَابُ.')
		]
	}),
	annotate({
		id: 'ph-kitab-talib-jadid-jarr',
		rule: 'idafah-nasb-marifah',
		example: 'idafah-naat-mudhaf-ilaih',
		unit: 'phrase',
		sources: [...idafahSources],
		notes: [limitNotes.phrase, limitNotes.khafd, idafahNote],
		links: [links.idafah],
		tokens: [
			isim({
				role: 'mudhaf',
				roleReason: 'Kata pertama iḍāfah: “buku” milik murid.',
				wordClassReason:
					'Dapat menerima tanwin dan الْـ, tanda isim. Di sini tidak bertanwin karena menjadi muḍāf.',
				vowel: vowel('ḍammah', 'raf', 'Ditulis rafa‘ sebagai bentuk rujukan.')
			}),
			isim({
				role: 'mudhaf-ilaih',
				alsoRoles: ['manut'],
				roleReason: 'Kata kedua iḍāfah; sekaligus kata yang diterangkan oleh الْجَدِيدِ.',
				vowel: vowel('kasrah', 'jarr', 'Muḍāf ilaih berstatus jarr, tandanya kasrah.'),
				stem: 'طَالِبٌ berarti “murid”.'
			}),
			isim({
				role: 'naat',
				roleReason: 'Sifat bagi الطَّالِبِ: mengikuti kasus jarr dan ketertentuannya.',
				wordClassReason: 'Diawali الْـ; menyebut sifat.',
				vowel: vowel('kasrah', 'jarr', 'Na‘at mengikuti i‘rab man‘ūt-nya (الطَّالِبِ).'),
				stem: 'جَدِيدٌ berarti “baru”.'
			})
		],
		relations: [
			rel('mudhaf-mudhaf-ilaih', [1], [2], 'Muḍāf ilaih majrūr dengan kasrah.'),
			rel('naat-manut', [3], [2], 'Berkasrah, jadi yang diterangkan adalah الطَّالِبِ.')
		]
	})
];

/** G-03 edge-case examples (issue #16). `definite-idafah` reuses the existing `g1-kitab-talib`. */
export const phraseEdgeAnnotations: readonly AnnotatedSentence[] = [
	...zharfAnnotations,
	...muannathAnnotations,
	...khamsaAnnotations,
	...taksirAnnotations,
	...maqshurAnnotations,
	...mabniAnnotations,
	...idafahAnnotations
];
