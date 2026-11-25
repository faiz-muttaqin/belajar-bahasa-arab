import type { MeaningPractice } from './lessons/types.js';
import { prayerReadings, readingSource } from './shalat-readings.js';

const readings = prayerReadings.find(({ id }) => id === 'tasyahud')?.readings;
const ibnMasud = readings?.find(({ id }) => id === 'tasyahud-ibn-masud');
const ibnAbbas = readings?.find(({ id }) => id === 'tasyahud-ibn-abbas');
if (!ibnMasud || !ibnAbbas) throw new Error('Riwayat tasyahud untuk CB-02 tidak lengkap.');

const masudSource = { ...readingSource(ibnMasud), usageType: 'independent-original' } as const;
const abbasSource = { ...readingSource(ibnAbbas), usageType: 'independent-original' } as const;

function comparison(
	reading: typeof ibnMasud,
	meanings: readonly [opening: string, closing: string],
	emphasis: readonly string[]
) {
	const startOfGreeting = reading.words.findIndex(([word]) => word === 'السَّلَامُ');
	const startOfSecondTestimony = reading.words.findIndex(([word]) => word === 'وَأَشْهَدُ');
	if (startOfGreeting < 1 || startOfSecondTestimony <= startOfGreeting)
		throw new Error(`Bagian tasyahud untuk CB-02 tidak lengkap: ${reading.id}`);

	const annotate = ([arabic]: (typeof reading.words)[number]) => ({
		arabic,
		emphasized: emphasis.includes(arabic)
	});
	return {
		id: reading.id,
		title: reading.title,
		source: readingSource(reading),
		fragments: [
			{
				label: 'Pembuka',
				words: reading.words.slice(0, startOfGreeting).map(annotate),
				meaning: meanings[0]
			},
			{
				label: 'Syahadat kedua',
				words: reading.words.slice(startOfSecondTestimony).map(annotate),
				meaning: meanings[1]
			}
		]
	};
}

export const tasyahudComparison = [
	comparison(
		ibnMasud,
		[
			'Segala penghormatan, shalat, dan kebaikan bagi Allah.',
			'Dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.'
		],
		['عَبْدُهُ', 'وَرَسُولُهُ']
	),
	comparison(
		ibnAbbas,
		[
			'Segala penghormatan yang diberkahi, segala shalat, dan segala kebaikan bagi Allah.',
			'Dan aku bersaksi bahwa Muhammad adalah utusan Allah.'
		],
		['الْمُبَارَكَاتُ', 'رَسُولُ', 'اللَّهِ']
	)
] as const;

export const tasyahudQuestions: MeaningPractice = [
	{
		id: 'cb-02-mubarakat',
		kind: 'guided',
		context: 'Pembuka riwayat Ibnu Abbas',
		arabic: 'الْمُبَارَكَاتُ',
		prompt: 'Apa arti kata yang ditebalkan pada pembuka riwayat Ibnu Abbas?',
		choices: ['Segala penghormatan', 'Yang diberkahi', 'Segala shalat'],
		correct: 1,
		reason:
			'الْمُبَارَكَاتُ berarti “yang diberkahi” dan menerangkan التَّحِيَّاتُ, yaitu segala penghormatan.',
		sources: [abbasSource]
	},
	{
		id: 'cb-02-abduhu',
		kind: 'guided',
		context: 'Syahadat kedua riwayat Ibnu Mas‘ud',
		arabic: 'عَبْدُهُ',
		prompt: 'Apa arti kata ini dalam syahadat kedua?',
		choices: ['Utusan-Nya', 'Hamba mereka', 'Hamba-Nya'],
		correct: 2,
		reason:
			'عَبْد berarti “hamba”. Akhiran ـهُ berarti “-Nya” dan dalam konteks ini merujuk kepada Allah.',
		sources: [masudSource]
	},
	{
		id: 'cb-02-rasulullah',
		kind: 'guided',
		context: 'Syahadat kedua riwayat Ibnu Abbas',
		arabic: 'رَسُولُ اللَّهِ',
		prompt: 'Apa arti frasa ini?',
		choices: ['Utusan Allah', 'Hamba Allah', 'Rahmat Allah'],
		correct: 0,
		reason:
			'رَسُولُ اللَّهِ berarti “utusan Allah”. Riwayat Ibnu Mas‘ud menyampaikan makna utusan-Nya melalui bentuk وَرَسُولُهُ, dengan akhiran yang merujuk kepada Allah.',
		sources: [abbasSource, masudSource]
	},
	{
		id: 'cb-02-tahiyyat',
		kind: 'guided',
		context: 'Awal kedua riwayat',
		arabic: 'التَّحِيَّاتُ',
		prompt: 'Makna kata apa yang tetap sama di awal kedua riwayat?',
		choices: ['Segala puji', 'Segala penghormatan', 'Segala kebaikan'],
		correct: 1,
		reason:
			'Keduanya dimulai dengan التَّحِيَّاتُ, yaitu segala penghormatan. Pada riwayat Ibnu Abbas, kata yang mengikutinya menyatakan bahwa penghormatan itu diberkahi.',
		sources: [masudSource, abbasSource]
	},
	{
		id: 'cb-02-lillah',
		kind: 'guided',
		context: 'Susunan pembuka kedua riwayat',
		arabic: 'لِلَّهِ',
		prompt: 'Apa makna yang dibawa kata ini pada kedua pembuka?',
		choices: ['Dari Allah', 'Bersama Allah', 'Bagi Allah'],
		correct: 2,
		reason:
			'لِـ membawa makna “bagi”. Letak لِلَّهِ berbeda pada kedua pembuka, tetapi keduanya menyatakan bahwa penghormatan, shalat, dan kebaikan itu bagi Allah.',
		sources: [masudSource, abbasSource]
	}
];
