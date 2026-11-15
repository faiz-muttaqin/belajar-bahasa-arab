import type { MeaningPractice, MeaningQuestion } from './types.js';

// Original quiz items are source-bounded, not copied textbook exercises.
// Every question retains its own traceable source and stable evidence ID.
const sources = {
  bukhari: { label: 'Sahih al-Bukhari 789 · takbir', href: 'https://sunnah.com/bukhari:789', usageType: 'independent-original' },
  muslim: { label: 'Sahih Muslim 772 · rukuk dan sujud', href: 'https://sunnah.com/muslim:772', usageType: 'independent-original' },
  abudawud: { label: 'Sunan Abi Dawud 996 · salam', href: 'https://sunnah.com/abudawud:996', usageType: 'independent-original' },
  pronoun: { label: 'Madinah Arabic · pronomina posesif', href: 'https://madinaharabic.com/free-content/grammar/lesson-47/part-2', usageType: 'independent-original' }
} as const;

const question = (
  id: string,
  kind: MeaningQuestion['kind'],
  context: string,
  arabic: string,
  prompt: string,
  choices: MeaningQuestion['choices'],
  correct: MeaningQuestion['correct'],
  reason: string,
  source: keyof typeof sources
): MeaningQuestion => ({
  id, kind, context, arabic, prompt, choices, correct, reason,
  sources: [sources[source]]
});

/** 20 distinct prompts: guided reading first, then novel everyday transfer. */
export const u1MeaningQuestions: MeaningPractice = [
  question("u1-rabbi-meaning", "guided", "Dari bacaan shalat", "رَبِّي", "Apa arti kata ini dalam bacaan shalat?", ["Tuhan kalian","Tuhanku","Tuhan mereka"], 1, "Bagian رَبّ berarti “Tuhan”. Huruf ي di akhir menambahkan makna “-ku”.", "muslim"),
  question("u1-kitabi-transfer", "transfer", "Contoh baru dari Arab sehari-hari", "كِتَابِي", "Apa arti kata ini?", ["Buku mereka","Buku kalian","Bukuku"], 2, "Kata كِتَابٌ berarti “buku”. Seperti pada kata sebelumnya, huruf ي di akhir menambahkan makna “-ku”.", "pronoun"),
  question("u1-allahu-akbar", "guided", "Makna takbir", "اللَّهُ أَكْبَرُ", "Apa makna ungkapan takbir ini?", ["Allah Mahabesar","Allah Maha Mengetahui","Segala puji bagi Allah"], 0, "Ungkapan takbir menyatakan kebesaran Allah.", "bukhari"),
  question("u1-akbar", "guided", "Bedah kata takbir", "أَكْبَرُ", "Makna kata ini pada takbir berkaitan dengan apa?", ["Keselamatan","Kebesaran","Tempat"], 1, "Kata أَكْبَرُ pada takbir berkaitan dengan kebesaran.", "bukhari"),
  question("u1-subhana", "guided", "Bedah kata tasbih", "سُبْحَانَ", "Makna yang disampaikan kata ini?", ["Mahasuci","Mahatinggi","Kepada kalian"], 0, "سُبْحَانَ mengungkapkan penyucian Allah dari kekurangan.", "muslim"),
  question("u1-rabbiya", "guided", "Bentuk kata saat disambung", "رَبِّيَ", "Kata ini merujuk kepada siapa?", ["Tuhan mereka","Tuhanku","Tuhan kalian"], 1, "Dalam frasa tasbih, رَبِّيَ bermakna 'Tuhanku'; vokal akhir muncul saat disambung.", "muslim"),
  question("u1-al-azim", "guided", "Kata pembeda bacaan rukuk", "الْعَظِيمِ", "Apa maknanya dalam bacaan rukuk?", ["Yang Mahatinggi","Yang Mahaagung","Yang Maha Pengampun"], 1, "الْعَظِيمِ bermakna Yang Mahaagung pada bacaan rukuk.", "muslim"),
  question("u1-al-ala", "guided", "Kata pembeda bacaan sujud", "الْأَعْلَى", "Apa maknanya dalam bacaan sujud?", ["Yang Mahatinggi","Yang Mahaagung","Yang Mahaluas"], 0, "الْأَعْلَى bermakna Yang Mahatinggi pada bacaan sujud.", "muslim"),
  question("u1-as-salam", "guided", "Bagian pertama salam", "السَّلَامُ", "Kata ini berkaitan dengan makna apa?", ["Keselamatan","Buku","Kebesaran"], 0, "السَّلَامُ dalam salam berkaitan dengan keselamatan.", "abudawud"),
  question("u1-alaikum", "guided", "Bagian kedua salam", "عَلَيْكُمْ", "Siapa yang disapa dalam kata ini?", ["Diriku saja","Kalian","Dia seorang diri"], 1, "Akhiran -kum menyapa orang-orang yang dituju, 'kalian'.", "abudawud"),
  question("u1-tasbih-ruku", "guided", "Kenali konteks rukuk", "سُبْحَانَ رَبِّيَ الْعَظِيمِ", "Ungkapan ini diasosiasikan dengan gerakan apa?", ["Sujud","Rukuk","Salam"], 1, "Dalam riwayat yang dirujuk, tasbih berakhir الْعَظِيمِ dibaca saat rukuk.", "muslim"),
  question("u1-tasbih-sujud", "guided", "Kenali konteks sujud", "سُبْحَانَ رَبِّيَ الْأَعْلَى", "Ungkapan ini diasosiasikan dengan gerakan apa?", ["Rukuk","Salam","Sujud"], 2, "Dalam riwayat yang dirujuk, tasbih berakhir الْأَعْلَى dibaca saat sujud.", "muslim"),
  question("u1-salam-phrase", "guided", "Makna salam", "السَّلَامُ عَلَيْكُمْ", "Apa makna umum ungkapan ini?", ["Semoga keselamatan tercurah kepada kalian","Tuhanku Yang Mahaagung","Allah Mahabesar"], 0, "Bagian السَّلَامُ menyebut keselamatan dan عَلَيْكُمْ menunjuk kepada kalian.", "abudawud"),
  question("u1-qalami", "transfer", "Pindahkan pola -ku ke benda baru", "قَلَمِي", "Apa arti kata ini?", ["Penaku","Penanya","Pena mereka"], 0, "قَلَمٌ berarti pena; akhiran ي memberi arti 'penaku'.", "pronoun"),
  question("u1-daftari", "transfer", "Pindahkan pola -ku ke benda baru", "دَفْتَرِي", "Apa arti kata ini?", ["Buku catatan kalian","Buku catatanku","Buku catatannya"], 1, "دَفْتَرٌ berarti buku catatan; ي menunjukkan pemiliknya adalah penutur.", "pronoun"),
  question("u1-miftahi", "transfer", "Pindahkan pola -ku ke benda baru", "مِفْتَاحِي", "Apa arti kata ini?", ["Kuncinya","Kunci kalian","Kunciku"], 2, "مِفْتَاحٌ berarti kunci; ي menunjukkan 'milikku'.", "pronoun"),
  question("u1-bayti", "transfer", "Pindahkan pola -ku ke benda baru", "بَيْتِي", "Apa arti kata ini?", ["Rumahku","Rumahnya","Rumah kalian"], 0, "بَيْتٌ berarti rumah; bentuk بَيْتِي bermakna rumahku.", "pronoun"),
  question("u1-haqibati", "transfer", "Pindahkan pola -ku ke benda baru", "حَقِيبَتِي", "Apa arti kata ini?", ["Tas mereka","Tasku","Tas kalian"], 1, "حَقِيبَةٌ berarti tas; saat menerima akhiran ي, ta marbutah ditulis ت.", "pronoun"),
  question("u1-ghurfati", "transfer", "Pindahkan pola -ku ke benda baru", "غُرْفَتِي", "Apa arti kata ini?", ["Ruangan mereka","Ruangan kalian","Ruanganku"], 2, "غُرْفَةٌ berarti ruangan; akhiran ي memberi arti ruanganku.", "pronoun"),
  question("u1-babi", "transfer", "Pindahkan pola -ku ke benda baru", "بَابِي", "Apa arti kata ini?", ["Pintu mereka","Pintuku","Pintu kalian"], 1, "بَابٌ berarti pintu; akhiran ي menunjukkan milik penutur.", "pronoun")
];
