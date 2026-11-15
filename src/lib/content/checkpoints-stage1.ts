import type { MeaningQuestion } from './lessons/types.js';
import type { CheckpointGroup } from './checkpoints.js';

/** Independent-original items using the documented first-person possessive suffix.
 * Source grammar: Madinah Arabic lesson 47 part 2 (not copied textbook exercises).
 * These transfer items are deliberately distinct from the U1 teaching examples.
 */
const possessiveSource = {
	label: 'Madinah Arabic · Lesson 47 Part 2 (genitive attached pronouns)',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-47/part-2',
	usageType: 'independent-original'
} as const;

function question(
	id: string,
	arabic: string,
	prompt: string,
	choices: MeaningQuestion['choices'],
	correct: MeaningQuestion['correct'],
	reason: string
): MeaningQuestion {
	return {
		id,
		kind: 'transfer',
		context: 'Titik cek Tahap 1 · terapkan pola -ku pada kata baru',
		arabic,
		prompt,
		choices,
		correct,
		reason,
		sources: [possessiveSource]
	};
}

export const stage1CheckpointGroups: readonly CheckpointGroup[] = [
	{
		id: 'makna-akhiran-ku',
		title: 'Makna akhiran -ku pada kosakata baru',
		competencyId: 'CB-01',
		lessonId: 'lesson-u1-01',
		contentRevision: 1,
		skill: 'meaning',
		questions: [
			question(
				'rm06-stage1-sahabat',
				'صَدِيقِي',
				'Siapa yang disebut lewat kata ini?',
				['Temanku', 'Teman kalian', 'Temannya'],
				0,
				'صَدِيقٌ berarti teman; akhiran ي menandai hubungan dengan penutur.'
			),
			question(
				'rm06-stage1-saudara-laki',
				'أَخِي',
				'Apa arti kata ini?',
				['Kakak perempuan', 'Saudara laki-lakiku', 'Saudara laki-laki mereka'],
				1,
				"أَخٌ berarti saudara laki-laki; bentuk أَخِي berarti 'saudara laki-lakiku'."
			),
			question(
				'rm06-stage1-saudara-perempuan',
				'أُخْتِي',
				'Siapa yang dimaksud oleh pembicara?',
				['Saudara laki-laki', 'Ibu mereka', 'Saudara perempuanku'],
				2,
				"أُخْتٌ berarti saudara perempuan; ي menandai 'milikku/keluargaku'."
			),
			question(
				'rm06-stage1-ayah',
				'أَبِي',
				'Kata ini menyebut anggota keluarga yang mana?',
				['Ayahku', 'Ibuku', 'Ayahnya'],
				0,
				'أَبٌ adalah ayah; أَبِي berarti ayahku.'
			),
			question(
				'rm06-stage1-ibu',
				'أُمِّي',
				'Apa arti kata Arab ini?',
				['Ibu mereka', 'Ibuku', 'Ibu kalian'],
				1,
				'أُمٌّ berarti ibu; bentuk أُمِّي menunjukkan ibuku.'
			),
			question(
				'rm06-stage1-nama',
				'اِسْمِي',
				'Apa makna gabungan kata dan akhirannya?',
				['Namanya', 'Nama kalian', 'Namaku'],
				2,
				'اِسْمٌ berarti nama; akhiran ي mengubahnya menjadi namaku.'
			),
			question(
				'rm06-stage1-makanan',
				'طَعَامِي',
				'Apa yang dimiliki penutur?',
				['Makananku', 'Minumanku', 'Makanan mereka'],
				0,
				'طَعَامٌ berarti makanan; طَعَامِي ialah makananku.'
			),
			question(
				'rm06-stage1-minuman',
				'شَرَابِي',
				'Pilih arti yang sesuai.',
				['Minumannya', 'Minumanku', 'Makanan kalian'],
				1,
				'شَرَابٌ ialah minuman; ي merujuk kepada yang sedang berbicara.'
			),
			question(
				'rm06-stage1-pelajaran',
				'دَرْسِي',
				'Apa arti bentuk ini?',
				['Pelajarannya', 'Pelajaran kami', 'Pelajaranku'],
				2,
				'دَرْسٌ berarti pelajaran; دَرْسِي berarti pelajaranku.'
			),
			question(
				'rm06-stage1-telepon',
				'هَاتِفِي',
				'Siapa yang memiliki telepon dalam kata tersebut?',
				['Penutur', 'Lawan bicara', 'Orang ketiga'],
				0,
				"هَاتِفٌ adalah telepon dan ي bermakna 'milikku'."
			),
			question(
				'rm06-stage1-sekolah',
				'مَدْرَسَتِي',
				'Apa makna kata ini?',
				['Sekolahnya', 'Sekolahku', 'Sekolah mereka'],
				1,
				'مَدْرَسَةٌ adalah sekolah; sebelum ي, ta marbutah menjadi ت sehingga bermakna sekolahku.'
			),
			question(
				'rm06-stage1-kantor',
				'مَكْتَبِي',
				'Benda atau tempat apa yang disebut?',
				['Kelas kalian', 'Tasnya', 'Meja kerja/kantorku'],
				2,
				'مَكْتَبٌ dapat berarti meja kerja atau kantor; ي menunjukkan hubungan dengan penutur.'
			),
			question(
				'rm06-stage1-lampu',
				'مِصْبَاحِي',
				'Terjemahan paling tepat adalah ...',
				['Lampuku', 'Kunciku', 'Lampu kalian'],
				0,
				'مِصْبَاحٌ berarti lampu; مِصْبَاحِي bermakna lampuku.'
			),
			question(
				'rm06-stage1-ranjang',
				'سَرِيرِي',
				'Apa yang dimiliki pembicara?',
				['Kursinya', 'Ranjangku', 'Rumah mereka'],
				1,
				"سَرِيرٌ berarti ranjang; akhir ي memberi arti 'ranjangku'."
			),
			question(
				'rm06-stage1-anak-laki',
				'وَلَدِي',
				'Apa yang dirujuk oleh kata ini?',
				['Anak mereka', 'Guruku', 'Anak laki-lakiku'],
				2,
				'وَلَدٌ dapat berarti anak lelaki; وَلدِي bermakna anakku pada konteks ini.'
			),
			question(
				'rm06-stage1-anak-perempuan',
				'بِنْتِي',
				'Pilih terjemahan yang cocok.',
				['Anak perempuanku', 'Saudari kalian', 'Ibu mereka'],
				0,
				'بِنْتٌ berarti anak perempuan; بِنْتِي menunjukkan anak perempuanku.'
			),
			question(
				'rm06-stage1-guru',
				'مُدَرِّسِي',
				'Kata ini menyatakan hubungan apa?',
				['Guru kalian', 'Guruku', 'Murid mereka'],
				1,
				"مُدَرِّسٌ berarti guru; ي pada مُدَرِّسِي bermakna 'guruku'."
			),
			question(
				'rm06-stage1-tetangga',
				'جَارِي',
				'Pilih makna kata berikut.',
				['Temannya', 'Tetangga kalian', 'Tetanggaku'],
				2,
				'جَارٌ berarti tetangga; جَارِي berarti tetanggaku.'
			),
			question(
				'rm06-stage1-paman',
				'عَمِّي',
				'Anggota keluarga manakah yang dimaksud?',
				['Paman dari pihak ayahku', 'Ayah mereka', 'Saudara perempuan'],
				0,
				'عَمٌّ berarti paman dari pihak ayah; عَمِّي adalah pamanku.'
			),
			question(
				'rm06-stage1-negeri',
				'بَلَدِي',
				'Bagaimana makna akhiran pada kata ini?',
				['Negara kalian', 'Negaraku', 'Negara mereka'],
				1,
				'بَلَدٌ berarti negeri atau negara; بَلَدِي berarti negeriku.'
			)
		]
	}
];
