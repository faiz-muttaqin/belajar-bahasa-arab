import type { VocabularyItem } from '#lib/domain/vocabulary/types.js';
import { prayerReadings, readingSource } from './shalat-readings.js';

// Each ID identifies a contextual sense, which may differ from a word's meaning in another prayer.
const selections = [
	['baid', 'allahumma-baid', 'بَاعِدْ'],
	['khatayaya', 'allahumma-baid', 'خَطَايَايَ'],
	['mashriq', 'allahumma-baid', 'الْمَشْرِقِ'],
	['maghrib', 'allahumma-baid', 'وَالْمَغْرِبِ'],
	['naqqini', 'allahumma-baid', 'نَقِّنِي'],
	['thawb', 'allahumma-baid', 'الثَّوْبُ'],
	['danas', 'allahumma-baid', 'الدَّنَسِ'],
	['ighsil', 'allahumma-baid', 'اغْسِلْ'],
	['thalj', 'allahumma-baid', 'وَالثَّلْجِ'],
	['barad', 'allahumma-baid', 'وَالْبَرَدِ'],
	['jadd-keagungan', 'subhanaka', 'جَدُّكَ'],
	['ghayruka', 'subhanaka', 'غَيْرُكَ'],
	['bukratan', 'allahu-akbar-kabira', 'بُكْرَةً'],
	['asila', 'allahu-akbar-kabira', 'وَأَصِيلًا'],
	['wajjahtu', 'wajjahtu', 'وَجَّهْتُ'],
	['fatara', 'wajjahtu', 'فَطَرَ'],
	['hanifa', 'wajjahtu', 'حَنِيفًا'],
	['nusuki', 'wajjahtu', 'وَنُسُكِي'],
	['akhlak', 'wajjahtu', 'الْأَخْلَاقِ'],
	['labbaik', 'wajjahtu', 'لَبَّيْكَ'],
	['ghayb', 'fathir', 'الْغَيْبِ'],
	['shahadah', 'fathir', 'وَالشَّهَادَةِ'],
	['ihdini', 'fathir', 'اهْدِنِي'],
	['mustaqim', 'fathir', 'مُسْتَقِيمٍ'],
	['audhu', 'taawuz', 'أَعُوذُ'],
	['rajim', 'taawuz', 'الرَّجِيمِ'],
	['amin', 'amin', 'آمِينَ'],
	['subbuh', 'subbuhun-quddus', 'سُبُّوحٌ'],
	['quddus', 'subbuhun-quddus', 'قُدُّوسٌ'],
	['malaikah', 'subbuhun-quddus', 'الْمَلَائِكَةِ'],
	['jabarut', 'dhil-jabarut', 'الْجَبَرُوتِ'],
	['malakut', 'dhil-jabarut', 'وَالْمَلَكُوتِ'],
	['rakatu', 'laka-rakatu', 'رَكَعْتُ'],
	['khashaa', 'laka-rakatu', 'خَشَعَ'],
	['samia', 'samiallahu', 'سَمِعَ'],
	['hamidahu', 'samiallahu', 'حَمِدَهُ'],
	['rabbana', 'rabbana-lakal-hamd', 'رَبَّنَا'],
	['hamd', 'rabbana-lakal-hamd', 'الْحَمْدُ'],
	['mubarak', 'rabbana-hamdan-kathira', 'مُبَارَكًا'],
	['mila', 'rabbana-milas-samawat', 'مِلْءَ'],
	['shita', 'rabbana-milas-samawat', 'شِئْتَ'],
	['jadd-kekayaan', 'ahlath-thana', 'الْجَدِّ'],
	['dhanbi', 'ighfir-li-dhanbi', 'ذَنْبِي'],
	['alaniyah', 'ighfir-li-dhanbi', 'وَعَلَانِيَتَهُ'],
	['sirr', 'ighfir-li-dhanbi', 'وَسِرَّهُ'],
	['sajadtu', 'laka-sajadtu', 'سَجَدْتُ'],
	['khalaqahu', 'laka-sajadtu', 'خَلَقَهُ'],
	['rida', 'audhu-biridaka', 'بِرِضَاكَ'],
	['sakhat', 'audhu-biridaka', 'سَخَطِكَ'],
	['uqbah', 'audhu-biridaka', 'عُقُوبَتِكَ'],
	['uhsi', 'audhu-biridaka', 'أُحْصِي'],
	['ighfir', 'rabbighfirli', 'اغْفِرْ'],
	['warhamni', 'rabbighfirli-warhamni', 'وَارْحَمْنِي'],
	['wajburni', 'rabbighfirli-warhamni', 'وَاجْبُرْنِي'],
	['warzuqni', 'rabbighfirli-warhamni', 'وَارْزُقْنِي'],
	['warfani', 'rabbighfirli-warhamni', 'وَارْفَعْنِي'],
	['tahiyyat', 'tasyahud-ibn-masud', 'التَّحِيَّاتُ'],
	['tayyibat', 'tasyahud-ibn-masud', 'وَالطَّيِّبَاتُ'],
	['barakatuhu', 'tasyahud-ibn-masud', 'وَبَرَكَاتُهُ'],
	['ibad', 'tasyahud-ibn-masud', 'عِبَادِ'],
	['salihin', 'tasyahud-ibn-masud', 'الصَّالِحِينَ'],
	['ashhadu', 'tasyahud-ibn-masud', 'أَشْهَدُ'],
	['rasuluhu', 'tasyahud-ibn-masud', 'وَرَسُولُهُ'],
	['salli', 'shalawat-kaab', 'صَلِّ'],
	['aal', 'shalawat-kaab', 'آلِ'],
	['barik', 'shalawat-kaab', 'بَارِكْ'],
	['hamid', 'shalawat-kaab', 'حَمِيدٌ'],
	['majid', 'shalawat-kaab', 'مَجِيدٌ'],
	['dhurriyyah', 'shalawat-abu-humaid', 'وَذُرِّيَّتِهِ'],
	['fitnah', 'perlindungan-empat-perkara', 'فِتْنَةِ'],
	['mahya', 'perlindungan-empat-perkara', 'الْمَحْيَا'],
	['mamat', 'perlindungan-empat-perkara', 'وَالْمَمَاتِ'],
	['qabr', 'perlindungan-empat-perkara', 'الْقَبْرِ'],
	['nafs', 'zalamtu-nafsi', 'نَفْسِي'],
	['maghfirah', 'zalamtu-nafsi', 'مَغْفِرَةً'],
	['asraftu', 'ma-qaddamtu', 'أَسْرَفْتُ'],
	['rahmah', 'salam-wa-rahmatullah', 'وَرَحْمَةُ'],
	['astaghfiru', 'astaghfirullah', 'أَسْتَغْفِرُ'],
	['jalal', 'antas-salam', 'الْجَلَالِ'],
	['ikram', 'antas-salam', 'وَالْإِكْرَامِ'],
	['tawallani', 'allahumma-ihdini', 'وَتَوَلَّنِي'],
	['qini', 'allahumma-ihdini', 'وَقِنِي'],
	['taqdi', 'allahumma-ihdini', 'تَقْضِي'],
	['qayyim', 'iftitah-tahajud-ibn-abbas', 'قَيِّمُ'],
	['waad', 'iftitah-tahajud-ibn-abbas', 'وَوَعْدُكَ'],
	['tawakkaltu', 'iftitah-tahajud-ibn-abbas', 'تَوَكَّلْتُ'],
	['anabtu', 'iftitah-tahajud-ibn-abbas', 'أَنَبْتُ'],
	['baynahuma', 'rabbana-mila-baynahuma', 'بَيْنَهُمَا'],
	['tahhirni', 'tahmid-tahhirni', 'طَهِّرْنِي'],
	['wasakh', 'tahmid-tahhirni', 'الْوَسَخِ'],
	['matham', 'taawwudh-matham-maghram', 'الْمَأْثَمِ'],
	['maghram', 'taawwudh-matham-maghram', 'وَالْمَغْرَمِ'],
	['qasd', 'biilmikal-ghayb', 'الْقَصْدَ'],
	['mursyid', 'biilmikal-ghayb', 'هُدَاةً'],
	['ainni', 'allahumma-ainni', 'أَعِنِّي'],
	['dhikrika', 'allahumma-ainni', 'ذِكْرِكَ'],
	['shukrika', 'allahumma-ainni', 'وَشُكْرِكَ'],
	['wahdahu', 'tahlil-penutup', 'وَحْدَهُ'],
	['qadir', 'tahlil-penutup', 'قَدِيرٌ'],
	['hawl', 'tahlil-ibn-zubair', 'حَوْلَ'],
	['fadhl', 'tahlil-ibn-zubair', 'الْفَضْلُ'],
	['mukhlisin', 'tahlil-ibn-zubair', 'مُخْلِصِينَ'],
	['malik', 'subhanal-malikil-quddus', 'الْمَلِكِ'],
	['nuzul', 'jenazah-awf', 'نُزُلَهُ'],
	['mudkhal', 'jenazah-awf', 'مُدْخَلَهُ'],
	['abdil', 'jenazah-awf', 'وَأَبْدِلْهُ'],
	['ghaaib', 'jenazah-abu-hurairah', 'وَغَائِبِنَا'],
	['tawaffaytahu', 'jenazah-abu-hurairah', 'تَوَفَّيْتَهُ'],
	['astakhiruka', 'istikharah-jabir', 'أَسْتَخِيرُكَ'],
	['astaqdiruka', 'istikharah-jabir', 'وَأَسْتَقْدِرُكَ'],
	['maash', 'istikharah-jabir', 'وَمَعَاشِي'],
	['aqibah', 'istikharah-jabir', 'وَعَاقِبَةِ'],
	['ardini', 'istikharah-jabir', 'أَرْضِنِي']
] as const;

const withoutPunctuation = (arabic: string) => arabic.normalize('NFC').replace(/[،.]/g, '');
const readingsById = new Map(
	prayerReadings.flatMap((group) => group.readings.map((reading) => [reading.id, reading] as const))
);

export const shalatVocabulary: readonly VocabularyItem[] = selections.map(
	([id, readingId, arabic]): VocabularyItem => {
		const reading = readingsById.get(readingId);
		const word = reading?.words.find(
			([surface]) => withoutPunctuation(surface) === arabic.normalize('NFC')
		);
		if (!reading || !word) throw new Error(`Kosakata shalat tidak cocok dengan bacaannya: ${id}`);
		return {
			id: `shalat-${id}`,
			arabic,
			meaning: word[1],
			context: word[2] ?? `Dalam bacaan ${reading.title.toLowerCase()}.`,
			concreteness: 'abstract',
			collection: 'shalat',
			register: 'classical',
			reviewStatus: 'draft',
			sources: [readingSource(reading).href]
		};
	}
);

export const shalatVocabularyReadings: ReadonlyMap<string, string> = new Map(
	selections.map(([id, readingId]) => [`shalat-${id}`, readingId])
);
