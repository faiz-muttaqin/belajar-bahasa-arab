import type { MeaningPractice, MeaningQuestion } from './lessons/types.js';
import type { CheckpointGroup } from './checkpoints.js';

/** New, independently written examples based on verified Madinah Arabic grammar lessons. */
const activePassiveSource = {
	label: 'Madinah Arabic · pelajaran 34, bagian 1 (aktif dan pasif)',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-34/part-1',
	usageType: 'independent-original'
} as const;
const negationSource = {
	label: 'Madinah Arabic · pelajaran 31, bagian 7 (negasi dan waktu)',
	href: 'https://madinaharabic.com/free-content/grammar/lesson-31/part-7',
	usageType: 'independent-original'
} as const;

type Item = {
	id: string;
	arabic: string;
	prompt: string;
	choices: MeaningQuestion['choices'];
	correct: MeaningQuestion['correct'];
	reason: string;
};
function makeQuestions(
	items: readonly Item[],
	source: MeaningQuestion['sources'][number],
	context: string
): MeaningPractice {
	const first = items[0];
	const second = items[1];
	if (!first || !second) throw new Error('Checkpoint group requires at least two questions');
	const toQuestion = (item: Item): MeaningQuestion => ({
		id: `rm06-stage4-${item.id}`,
		kind: 'transfer',
		context,
		arabic: item.arabic,
		prompt: item.prompt,
		choices: item.choices,
		correct: item.correct,
		reason: item.reason,
		sources: [source]
	});
	return [toQuestion(first), toQuestion(second), ...items.slice(2).map(toQuestion)];
}

const activePassiveItems: readonly Item[] = [
	{
		id: 'penjaga-membuka',
		arabic: 'فَتَحَ الْحَارِسُ الْبَابَ.',
		prompt: 'Siapa yang membuka pintu?',
		choices: ['Penjaga', 'Siswa', 'Pelaku tidak disebut'],
		correct: 0,
		reason: 'الْحَارِسُ disebut sebagai pelaku yang membuka الْبَابَ.'
	},
	{
		id: 'pintu-dibuka',
		arabic: 'فُتِحَ الْبَابُ.',
		prompt: 'Apa yang diketahui tentang pelakunya?',
		choices: ['Penjaga membukanya', 'Sami membukanya', 'Tidak disebutkan'],
		correct: 2,
		reason: 'فُتِحَ adalah bentuk pasif; kalimat tidak menyebut siapa yang membuka pintu.'
	},
	{
		id: 'siswa-menulis',
		arabic: 'كَتَبَ الطَّالِبُ الرِّسَالَةَ.',
		prompt: 'Siapa yang menulis surat?',
		choices: ['Guru', 'Siswa', 'Tidak disebutkan'],
		correct: 1,
		reason: 'كَتَبَ aktif; الطَّالِبُ adalah pelaku, الرِّسَالَةَ sasaran tindakan.'
	},
	{
		id: 'pelajaran-ditulis',
		arabic: 'كُتِبَ الدَّرْسُ.',
		prompt: 'Apa inti informasi kalimat?',
		choices: ['Pelajaran ditulis', 'Siswa menulis pelajaran', 'Guru membaca'],
		correct: 0,
		reason: 'كُتِبَ bermakna ditulis; penulis tidak disebut.'
	},
	{
		id: 'anak-memecahkan',
		arabic: 'كَسَرَ الْوَلَدُ الْكُوبَ.',
		prompt: 'Yang dikenai tindakan ialah ...',
		choices: ['Anak', 'Guru', 'Gelas'],
		correct: 2,
		reason: 'الْكُوبَ adalah gelas yang dipecahkan oleh الْوَلَدُ.'
	},
	{
		id: 'gelas-pecah',
		arabic: 'كُسِرَ الْكُوبُ.',
		prompt: 'Siapa yang memecahkan gelas?',
		choices: ['Tidak dijelaskan', 'Anak', 'Penjaga'],
		correct: 0,
		reason: 'Bentuk كُسِرَ menyampaikan bahwa gelas dipecahkan tanpa menyebut pelaku.'
	},
	{
		id: 'pria-membawa',
		arabic: 'حَمَلَ الرَّجُلُ الْكِتَابَ.',
		prompt: 'Apa tindakan laki-laki itu?',
		choices: ['Membaca buku', 'Membawa buku', 'Menulis buku'],
		correct: 1,
		reason: 'حَمَلَ berarti membawa; الرَّجُلُ pelaku dan الْكِتَابَ benda yang dibawa.'
	},
	{
		id: 'buku-dibawa',
		arabic: 'حُمِلَ الْكِتَابُ.',
		prompt: 'Kesimpulan yang didukung teks adalah ...',
		choices: ['Guru membawa buku', 'Buku tertinggal', 'Buku dibawa'],
		correct: 2,
		reason: 'حُمِلَ bentuk pasif dari membawa; orang yang membawanya tidak diketahui.'
	},
	{
		id: 'penjaga-menutup',
		arabic: 'أَغْلَقَ الْحَارِسُ الْمَكْتَبَ.',
		prompt: 'Siapa yang menutup kantor?',
		choices: ['Penjaga', 'Siswa', 'Tidak disebut'],
		correct: 0,
		reason: 'أَغْلَقَ aktif; الْحَارِسُ adalah pelakunya.'
	},
	{
		id: 'kantor-ditutup',
		arabic: 'أُغْلِقَ الْمَكْتَبُ.',
		prompt: 'Pernyataan apa yang tidak didukung kalimat?',
		choices: ['Kantor ditutup', 'Penjaga menutup kantor', 'Pelaku tidak disebut'],
		correct: 1,
		reason: 'Bentuk pasif أُغْلِقَ tidak menyebut penjaga atau pelaku lain.'
	},
	{
		id: 'siswa-mencuci',
		arabic: 'غَسَلَ الطَّالِبُ الْكُوبَ.',
		prompt: 'Siapa mencuci gelas?',
		choices: ['Gelas', 'Guru', 'Siswa'],
		correct: 2,
		reason: 'Pelaku غَسَلَ adalah الطَّالِبُ, sedangkan الْكُوبَ adalah objeknya.'
	},
	{
		id: 'gelas-dicuci',
		arabic: 'غُسِلَ الْكُوبُ.',
		prompt: 'Apa perbedaan dari kalimat aktif?',
		choices: ['Pelaku tidak disebut', 'Gelas menjadi pelaku', 'Kegiatan belum terjadi'],
		correct: 0,
		reason: 'غُسِلَ adalah pasif lampau; yang disebut hanya gelas yang dicuci.'
	},
	{
		id: 'siswa-menghafal',
		arabic: 'حَفِظَ الطَّالِبُ الدَّرْسَ.',
		prompt: 'Apa yang dihafal?',
		choices: ['Pintu', 'Pelajaran', 'Surat'],
		correct: 1,
		reason: 'الدَّرْسَ adalah pelajaran yang dihafal oleh siswa.'
	},
	{
		id: 'pelajaran-dihafal',
		arabic: 'حُفِظَ الدَّرْسُ.',
		prompt: 'Apakah penghafalnya dapat diketahui?',
		choices: ['Guru', 'Siswa', 'Tidak dari kalimat ini'],
		correct: 2,
		reason: 'حُفِظَ menyatakan pelajaran dihafal; penghafal tidak disebut.'
	},
	{
		id: 'guru-membaca',
		arabic: 'قَرَأَ الْمُدَرِّسُ الْكِتَابَ.',
		prompt: 'Kata mana menunjuk pelaku?',
		choices: ['الْمُدَرِّسُ', 'الْكِتَابَ', 'قَرَأَ'],
		correct: 0,
		reason: 'الْمُدَرِّسُ berperan sebagai pembaca, sementara الْكِتَابَ dibaca.'
	},
	{
		id: 'buku-dibaca',
		arabic: 'قُرِئَ الْكِتَابُ.',
		prompt: 'Terjemahan yang tepat adalah ...',
		choices: ['Guru membaca buku', 'Buku telah dibaca', 'Siswa membawa buku'],
		correct: 1,
		reason: 'قُرِئَ adalah bentuk pasif lampau: buku telah dibaca.'
	},
	{
		id: 'anak-minum',
		arabic: 'شَرِبَ الْوَلَدُ الْمَاءَ.',
		prompt: 'Apa yang dilakukan anak itu?',
		choices: ['Mencuci air', 'Membawa air', 'Meminum air'],
		correct: 2,
		reason: 'شَرِبَ الْوَلَدُ الْمَاءَ menyebut tindakan minum dan pelakunya.'
	},
	{
		id: 'air-diminum',
		arabic: 'شُرِبَ الْمَاءُ.',
		prompt: 'Apa yang dapat disimpulkan?',
		choices: ['Air telah diminum', 'Anak meminum air', 'Guru menuang air'],
		correct: 0,
		reason: 'شُرِبَ adalah pasif; siapa yang meminum air tidak disebut.'
	},
	{
		id: 'siswa-memahami',
		arabic: 'فَهِمَ الطَّالِبُ السُّؤَالَ.',
		prompt: 'Siapa yang memahami pertanyaan?',
		choices: ['Guru', 'Siswa', 'Tidak diketahui'],
		correct: 1,
		reason: 'فَهِمَ aktif, dengan الطَّالِبُ sebagai pelaku dan السُّؤَالَ sebagai objek.'
	},
	{
		id: 'pertanyaan-dipahami',
		arabic: 'فُهِمَ السُّؤَالُ.',
		prompt: 'Informasi apa yang tidak diberikan?',
		choices: ['Pertanyaan dipahami', 'Aksi lampau terjadi', 'Siapa yang memahami'],
		correct: 2,
		reason: 'فُهِمَ adalah pasif; kalimat tidak mengidentifikasi orang yang memahami.'
	}
];
const negationItems: readonly Item[] = [
	{
		id: 'lam-surat',
		arabic: 'لَمْ يَكْتُبْ سَامِي الرِّسَالَةَ أَمْسِ.',
		prompt: 'Kapan penulisan surat tidak terjadi?',
		choices: ['Kemarin', 'Besok', 'Setiap pagi'],
		correct: 0,
		reason: 'لَمْ menegasikan peristiwa lampau; أَمْسِ berarti kemarin.'
	},
	{
		id: 'lam-pintu',
		arabic: 'لَمْ يَفْتَحْ الْحَارِسُ الْبَابَ صَبَاحًا.',
		prompt: 'Apa yang tidak dilakukan penjaga?',
		choices: ['Menutup kantor', 'Membuka pintu pagi hari', 'Membaca buku'],
		correct: 1,
		reason: 'لَمْ يَفْتَحْ berarti tidak membuka; صَبَاحًا pada pagi hari.'
	},
	{
		id: 'lam-buku',
		arabic: 'لَمْ يَقْرَأْ الطَّالِبُ الْكِتَابَ أَمْسِ.',
		prompt: 'Apa peristiwa yang dinegasikan?',
		choices: ['Siswa menulis buku', 'Guru membaca buku', 'Siswa membaca buku kemarin'],
		correct: 2,
		reason: 'لَمْ يَقْرَأْ adalah negasi membaca pada masa lampau.'
	},
	{
		id: 'lam-pelajaran',
		arabic: 'لَمْ يَحْفَظْ الطَّالِبُ الدَّرْسَ أَمْسِ.',
		prompt: 'Apakah siswa menghafal pelajaran kemarin?',
		choices: ['Tidak', 'Ya', 'Tidak dijelaskan waktunya'],
		correct: 0,
		reason: 'لَمْ يَحْفَظْ berarti tidak menghafal pada waktu lampau.'
	},
	{
		id: 'lam-air',
		arabic: 'لَمْ يَشْرَبْ الْوَلَدُ الْمَاءَ صَبَاحًا.',
		prompt: 'Kapan anak tidak minum air?',
		choices: ['Malam', 'Pagi', 'Besok'],
		correct: 1,
		reason: 'Keterangan صَبَاحًا menyatakan pagi, dan لَمْ menegasikan tindakan lampau.'
	},
	{
		id: 'lam-gelas',
		arabic: 'لَمْ يَغْسِلْ الْوَلَدُ الْكُوبَ أَمْسِ.',
		prompt: 'Tindakan apa yang tidak terjadi kemarin?',
		choices: ['Membawa gelas', 'Memecahkan gelas', 'Mencuci gelas'],
		correct: 2,
		reason: 'لَمْ يَغْسِلْ menandai peristiwa mencuci yang tidak terjadi.'
	},
	{
		id: 'lam-kelas',
		arabic: 'لَمْ يَدْخُلْ سَامِي الْفَصْلَ أَمْسِ.',
		prompt: 'Apa arti kalimat ini?',
		choices: ['Sami tidak masuk kelas kemarin', 'Sami tidak akan masuk besok', 'Sami selalu masuk kelas'],
		correct: 0,
		reason: 'لَمْ + bentuk mudhari‘ menjelaskan aksi lampau yang tidak terjadi.'
	},
	{
		id: 'lan-surat',
		arabic: 'لَنْ يَكْتُبَ سَامِي الرِّسَالَةَ غَدًا.',
		prompt: 'Bagaimana waktu negasi kalimat?',
		choices: ['Lampau', 'Akan datang', 'Kebiasaan tanpa waktu'],
		correct: 1,
		reason: 'لَنْ menegasikan kejadian yang akan datang; غَدًا berarti besok.'
	},
	{
		id: 'lan-kantor',
		arabic: 'لَنْ يَفْتَحَ الْحَارِسُ الْمَكْتَبَ غَدًا.',
		prompt: 'Apa rencana yang tidak akan dilakukan?',
		choices: ['Menutup pintu', 'Membaca pelajaran', 'Membuka kantor besok'],
		correct: 2,
		reason: 'لَنْ يَفْتَحَ berarti tidak akan membuka.'
	},
	{
		id: 'lan-bacaan',
		arabic: 'لَنْ يَقْرَأَ الطَّالِبُ الدَّرْسَ غَدًا.',
		prompt: 'Pernyataan yang tepat ialah ...',
		choices: ['Siswa tidak akan membaca pelajaran besok', 'Siswa tidak membaca kemarin', 'Guru tidak akan menulis'],
		correct: 0,
		reason: 'لَنْ menolak kejadian masa depan, bukan menceritakan masa lampau.'
	},
	{
		id: 'lan-air',
		arabic: 'لَنْ يَشْرَبَ سَامِي الْمَاءَ غَدًا.',
		prompt: 'Apa yang dinegasikan?',
		choices: ['Sami membawa air', 'Sami meminum air besok', 'Sami meminum air kemarin'],
		correct: 1,
		reason: 'شُرْب air adalah tindakan yang dinegasikan dengan لَنْ.'
	},
	{
		id: 'lan-cuci',
		arabic: 'لَنْ يَغْسِلَ الطَّالِبُ الْكُوبَ غَدًا.',
		prompt: 'Bagaimana arti kata kerjanya?',
		choices: ['Sudah mencuci', 'Sedang mencuci', 'Tidak akan mencuci'],
		correct: 2,
		reason: 'لَنْ يَغْسِلَ berarti tidak akan mencuci, dengan waktu besok.'
	},
	{
		id: 'lan-sekolah',
		arabic: 'لَنْ يَدْخُلَ سَامِي الْمَدْرَسَةَ غَدًا.',
		prompt: 'Apakah Sami akan masuk sekolah besok?',
		choices: ['Tidak', 'Ya', 'Sudah masuk kemarin'],
		correct: 0,
		reason: 'لَنْ يَدْخُلَ menjelaskan rencana masuk yang tidak akan dilakukan.'
	},
	{
		id: 'lan-hafal',
		arabic: 'لَنْ يَحْفَظَ الطَّالِبُ النَّصَّ غَدًا.',
		prompt: 'Tugas apa yang tidak akan dilakukan?',
		choices: ['Menulis teks', 'Menghafal teks', 'Membaca pintu'],
		correct: 1,
		reason: 'الطَّالِبُ tidak akan menghafal النَّصَّ (teks) besok.'
	},
	{
		id: 'la-surat',
		arabic: 'لَا يَكْتُبُ سَامِي الرِّسَالَةَ لَيْلًا.',
		prompt: 'Kapan Sami tidak menulis surat?',
		choices: ['Siang', 'Besok', 'Malam'],
		correct: 2,
		reason: 'لَا يَكْتُبُ menegasikan tindakan nonlampau; لَيْلًا berarti malam.'
	},
	{
		id: 'la-kantor',
		arabic: 'لَا يَفْتَحُ الْحَارِسُ الْمَكْتَبَ لَيْلًا.',
		prompt: 'Apa yang tidak dilakukan penjaga pada malam hari?',
		choices: ['Membuka kantor', 'Menghafal pelajaran', 'Menulis surat'],
		correct: 0,
		reason: 'لَا يَفْتَحُ memberi informasi kegiatan yang tidak dilakukan pada malam hari.'
	},
	{
		id: 'la-buku',
		arabic: 'لَا يَقْرَأُ الطَّالِبُ الْكِتَابَ صَبَاحًا.',
		prompt: 'Apa yang tidak dilakukan siswa pada pagi hari?',
		choices: ['Membawa buku', 'Membaca buku', 'Mencuci gelas'],
		correct: 1,
		reason: 'لَا يَقْرَأُ berarti tidak membaca; صَبَاحًا pagi.'
	},
	{
		id: 'la-minum',
		arabic: 'لَا يَشْرَبُ الْوَلَدُ الْمَاءَ لَيْلًا.',
		prompt: 'Perbuatan apa yang dinegasikan?',
		choices: ['Menulis pesan', 'Membuka pintu', 'Minum air malam hari'],
		correct: 2,
		reason: 'Kata لَا langsung sebelum يَشْرَبُ menegasikan perbuatan minum.'
	},
	{
		id: 'la-kelas',
		arabic: 'لَا يَدْخُلُ الطَّالِبُ الْفَصْلَ لَيْلًا.',
		prompt: 'Pernyataan yang sesuai adalah ...',
		choices: ['Siswa tidak masuk kelas pada malam hari', 'Siswa tidak masuk kemarin', 'Siswa akan masuk besok'],
		correct: 0,
		reason: 'لَا dengan fi‘il mudhari‘ menegasikan tindakan nonlampau.'
	},
	{
		id: 'la-gelas',
		arabic: 'لَا يَغْسِلُ سَامِي الْكُوبَ صَبَاحًا.',
		prompt: 'Apa yang tidak dilakukan Sami?',
		choices: ['Memecahkan gelas', 'Mencuci gelas pada pagi hari', 'Membawa buku'],
		correct: 1,
		reason: 'لَا يَغْسِلُ berarti tidak mencuci; صَبَاحًا menunjukkan pagi.'
	}
];

/** 20 contextual items per CB-14 / CB-15: independent transfer, not answer shuffling. */
export const stage4CheckpointGroups: readonly CheckpointGroup[] = [
	{
		id: 'pelaku-tindakan',
		title: 'Pelaku, sasaran, serta kalimat aktif dan pasif',
		competencyId: 'CB-14',
		lessonId: 'lesson-u9-04',
		contentRevision: 1,
		skill: 'structure',
		questions: makeQuestions(activePassiveItems, activePassiveSource, 'Titik cek Tahap 4 · pelaku dan tindakan')
	},
	{
		id: 'negasi-waktu',
		title: 'Apa yang tidak terjadi dan kapan?',
		competencyId: 'CB-15',
		lessonId: 'lesson-u9-02',
		contentRevision: 1,
		skill: 'meaning',
		questions: makeQuestions(negationItems, negationSource, 'Titik cek Tahap 4 · negasi dan waktu')
	}
];
