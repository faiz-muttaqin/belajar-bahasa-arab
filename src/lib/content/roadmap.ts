import type { Path } from '$app/types';
import type {
	Roadmap,
	RoadmapSource,
	RoadmapStage,
	RoadmapStep
} from '#lib/domain/roadmap/types.js';
import { competencies, competencySources } from './competencies.js';

const mapSource: RoadmapSource = {
	label: 'Rencana peta belajar · susunan tahap dan tujuan (§4)',
	href: 'https://github.com/faiz-muttaqin/belajar-bahasa-arab/blob/main/docs/plans/peta-belajar.md#4-susunan-peta',
	usageType: 'independent-original'
};
const sources = [mapSource, competencySources.lessons];
const byId = new Map(competencies.map((competency) => [competency.id, competency]));

function step(
	id: string,
	title: string,
	lessonIds: readonly string[],
	competencyIds: readonly string[],
	primaryCompetencyIds = competencyIds
): RoadmapStep {
	return {
		id,
		title,
		canDo: competencyIds.map((key) => byId.get(key)?.canDo ?? '').join(' '),
		lessonIds,
		competencyIds,
		primaryCompetencyIds,
		sources,
		reviewStatus: 'draft'
	};
}

function stage(
	number: number,
	title: string,
	canDo: string,
	steps: readonly RoadmapStep[],
	checkpointTitle: string,
	checkpointCompetencies: readonly string[]
): RoadmapStage {
	return {
		id: number === 0 ? 'stage-iqra' : `stage-${number}`,
		number,
		title,
		canDo,
		track: number === 0 ? 'iqra' : 'belajar',
		level: number === 0 ? 'Fondasi' : number < 5 ? 'Dasar' : 'Menengah',
		optional: number === 0,
		steps,
		checkpoint: {
			id: `checkpoint-${number === 0 ? 'iqra' : number}`,
			title: checkpointTitle,
			competencyIds: checkpointCompetencies,
			status: [1, 2, 3].includes(number) ? 'available' : 'planned',
			...(number === 1
				? { path: 'belajar/checkpoint-1/' as const, questionCount: 20 }
				: number === 2
					? { path: 'belajar/checkpoint-2/' as const, questionCount: 40 }
					: number === 3
						? { path: 'belajar/checkpoint-3/' as const, questionCount: 24 }
						: {}),
			sources,
			reviewStatus: 'draft'
		},
		sources,
		reviewStatus: 'draft'
	};
}

/** Compile-time check against SvelteKit's actual generated route manifest. */
const referenceLinks = [
	{ path: 'kaidah/', label: 'Peta kaidah' },
	{ path: 'kaidah/sharaf/', label: 'Sharaf' },
	{ path: 'kaidah/frasa/', label: 'Frasa' },
	{ path: 'kaidah/kalimat/', label: 'Kalimat' },
	{ path: 'kaidah/klausa/', label: 'Klausa' },
	{ path: 'kaidah/praktik/', label: 'Praktik kaidah' },
	{ path: 'rujukan/', label: 'Jenis kata' },
	{ path: 'kosakata/', label: 'Kosakata' }
] as const satisfies readonly { path: Path; label: string }[];
export const roadmapReferencePaths = referenceLinks.map((link) => link.path);
export type RoadmapReferencePath = (typeof roadmapReferencePaths)[number];

export const roadmap: Roadmap = {
	stages: [
		stage(
			0,
			'Fondasi membaca',
			'Saya bisa membaca kalimat pendek berharakat.',
			[
				step('step-a1', 'Huruf dan bentuknya', ['lesson-a1-01'], ['CA-02']),
				step(
					'step-a2',
					'Harakat, vokal panjang dan sukun',
					['lesson-a2-01', 'lesson-a2-02', 'lesson-a2-03'],
					['CA-03']
				),
				step('step-a3', 'Tasydid dan tanwin', ['lesson-a3-01'], ['CA-04']),
				step('step-a4', 'Kalimat pendek berharakat', ['lesson-a4-01'], ['CA-06', 'CA-05'])
			],
			'Membaca kalimat pendek berharakat',
			['CA-05']
		),
		stage(
			1,
			'Makna pertama',
			'Saya tahu arti kata inti dalam bacaan shalat.',
			[step('step-u1', 'Kata inti shalat', ['lesson-u1-01'], ['CB-01'])],
			'Kenali makna',
			['CB-01']
		),
		stage(
			2,
			'Benda dan pertanyaan',
			'Saya bisa memahami pertanyaan dan kalimat pendek tentang benda.',
			[
				step('step-u2', 'Menunjuk dan bertanya', ['lesson-u2-01'], ['CB-03', 'CB-04']),
				step('step-u3-01', 'Benda tertentu dan kalimat', ['lesson-u3-01'], ['CB-05', 'CB-06']),
				step('step-u3-02', 'Isim, fi‘il dan harf', ['lesson-u3-02'], ['CB-06', 'CB-16'], ['CB-16'])
			],
			'Tanya dan jawab',
			['CB-04', 'CB-06']
		),
		stage(
			3,
			'Tempat, milik dan kata ganti',
			'Saya bisa memahami lokasi, hubungan milik dan deskripsi singkat.',
			[
				step('step-u4', 'Kata ganti dan lokasi', ['lesson-u4-01'], ['CB-07', 'CB-08']),
				step('step-u5', 'Hubungan milik', ['lesson-u5-01'], ['CB-09']),
				step('step-u6', 'Kata tunjuk feminin', ['lesson-u6-01'], ['CB-10']),
				step('step-u7', 'Sifat atau kabar', ['lesson-u7-01'], ['CB-11']),
				step('step-u8', 'Kata ganti melekat', ['lesson-u8-01'], ['CB-12'])
			],
			'Pahami pesan dua sampai tiga kalimat',
			['CB-07', 'CB-09', 'CB-12']
		),
		stage(
			4,
			'Siapa melakukan apa',
			'Saya bisa memahami tindakan, pelaku, sasaran dan waktu peristiwa.',
			[
				step(
					'step-u9-01',
					'Pelaku, tindakan dan waktu',
					['lesson-u9-01'],
					['CB-13', 'CB-14', 'CB-15']
				),
				step('step-u9-02', 'Negasi dan waktu', ['lesson-u9-02'], ['CB-15', 'CB-16'], []),
				step(
					'step-u9-03',
					'Klausa yang menjelaskan',
					['lesson-u9-03'],
					['CB-19', 'CB-20'],
					['CB-19']
				),
				step('step-u9-04', 'Kalimat aktif dan pasif', ['lesson-u9-04'], ['CB-14', 'CB-15'], []),
				step('step-u9-05', 'Akar dan bentuk kata', ['lesson-u9-05'], ['CB-18']),
				step('step-u9-06', 'Tunggal, ganda dan jamak', ['lesson-u9-06'], ['CB-17'])
			],
			'Pahami pesan',
			['CB-14', 'CB-15']
		),
		stage(
			5,
			'Dari kalimat ke paragraf',
			'Saya bisa menemukan gagasan utama dan memahami hubungan antarparagraf.',
			[
				step('step-u10', 'Hubungan antarkalimat', ['lesson-u10-01'], ['CB-22']),
				step('step-u11-01', 'Gagasan utama paragraf', ['lesson-u11-01'], ['CB-23']),
				step('step-u11-02', 'Struktur dokumen pendek', ['lesson-u11-02'], ['CB-24']),
				step(
					'step-u11-03',
					'Bandingkan dua pilihan',
					['lesson-u11-03'],
					['CB-22', 'CB-23', 'CB-24'],
					[]
				),
				step(
					'step-u11-04',
					'Bedah kalimat dalam cerita',
					['lesson-u11-04'],
					['CB-14', 'CB-19', 'CB-23'],
					[]
				),
				step(
					'step-u11-05',
					'Lacak kata ganti antarparagraf',
					['lesson-u11-05'],
					['CB-12', 'CB-14', 'CB-23', 'CB-24'],
					[]
				),
				step(
					'step-u11-06',
					'Rangkum gagasan utama',
					['lesson-u11-06'],
					['CB-12', 'CB-22', 'CB-23', 'CB-24'],
					[]
				)
			],
			'Temukan inti bacaan',
			['CB-22', 'CB-23', 'CB-24']
		),
		stage(
			6,
			'Uji dengan teks baru',
			'Saya bisa merangkum pengumuman baru dan menunjukkan bukti dari bacaan.',
			[step('step-u12', 'Uji membaca dokumen', ['lesson-u12-01'], ['CB-21', 'CB-24'], ['CB-21'])],
			'Coba situasi baru',
			['CB-21', 'CB-24']
		)
	],
	branches: [
		{
			id: 'branch-sounds',
			stageId: 'stage-iqra',
			title: 'Bunyi yang sering tertukar',
			canDo: byId.get('CA-01')!.canDo,
			competencyIds: ['CA-01'],
			status: 'planned',
			links: [],
			sources,
			reviewStatus: 'draft'
		},
		{
			id: 'branch-shalat-variants',
			stageId: 'stage-1',
			title: 'Varian bacaan shalat',
			canDo: byId.get('CB-02')!.canDo,
			competencyIds: ['CB-02'],
			status: 'planned',
			links: [],
			sources,
			reviewStatus: 'draft'
		},
		{
			id: 'branch-conversation',
			stageId: 'stage-4',
			title: 'Percakapan',
			canDo: byId.get('CB-20')!.canDo,
			competencyIds: ['CB-20'],
			status: 'planned',
			links: [],
			sources,
			reviewStatus: 'draft'
		},
		{
			id: 'branch-reference',
			stageId: 'stage-4',
			title: 'Pendalaman',
			canDo: 'Saya bisa membuka rujukan kaidah, bentuk kata dan kosakata saat diperlukan.',
			competencyIds: ['CR-01', 'CR-02', 'CR-03'],
			status: 'available',
			links: referenceLinks,
			sources,
			reviewStatus: 'draft'
		}
	]
};
