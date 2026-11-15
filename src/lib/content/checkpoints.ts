import type { MeaningPractice, MeaningQuestion } from './lessons/types.js';
import type { EvidenceItem } from '#lib/domain/roadmap/evidence.js';

export type CheckpointGroup = {
  id: string;
  title: string;
  competencyId: string;
  /** Original lesson record provides a stable, published evidence owner. */
  lessonId: string;
  contentRevision: number;
  questions: MeaningPractice;
};

const sources = {
  lokasi: { label: 'Madinah Arabic · pertanyaan dan kalimat lokasi', href: 'https://madinaharabic.com/free-content/grammar/lesson-4/part-1', usageType: 'independent-original' },
  idafah: { label: 'Madinah Book 1 · pelajaran 5 (iḍāfah)', href: 'https://madinah.arabic.aramb.dev/books/book1/lessons/lesson5', usageType: 'independent-original' },
  pronoun: { label: 'Madinah Arabic · pelajaran 23 (pronomina)', href: 'https://madinaharabic.com/free-content/grammar/lesson-23/part-4', usageType: 'independent-original' }
} as const;

/** Original, vocalised transfer items based on the cited grammar patterns. Not copies. */
function question(
  id: string,
  arabic: string,
  prompt: string,
  choices: MeaningQuestion['choices'],
  correct: MeaningQuestion['correct'],
  reason: string,
  source: keyof typeof sources
): MeaningQuestion {
  return {
    id, kind: 'transfer', context: 'Titik cek · contoh baru',
    arabic, prompt, choices, correct, reason,
    sources: [sources[source]]
  };
}

/** Stage 3 pilot: 24 source-backed variants; eight per target competency. */
export const stage3CheckpointGroups: readonly CheckpointGroup[] = [
  {
    id: 'lokasi',
    title: "Kata ganti dan lokasi",
    competencyId: 'CB-07',
    lessonId: 'lesson-u4-01',
    contentRevision: 1,
    questions: [
      question("rm06-lokasi-kunci-di-meja", "أَيْنَ الْمِفْتَاحُ؟ هُوَ عَلَى الْمَكْتَبِ.", "Di mana kunci itu?", ["Di atas meja","Di dalam tas","Di atas kursi"], 0, "عَلَى الْمَكْتَبِ berarti 'di atas meja'.", 'lokasi'),
      question("rm06-lokasi-tas-di-kursi", "الْحَقِيبَةُ فِي الْغُرْفَةِ. هِيَ عَلَى الْكُرْسِيِّ.", "Apa yang dirujuk oleh هِيَ?", ["Ruangan","Tas","Kursi"], 1, "هِيَ merujuk ke الْحَقِيبَةُ, yaitu tas yang sudah disebut.", 'lokasi'),
      question("rm06-lokasi-buku-baru", "الْكِتَابُ فِي الْحَقِيبَةِ. هُوَ جَدِيدٌ.", "Benda apa yang disebut baru?", ["Tas","Buku","Kunci"], 1, "هُوَ pada kalimat kedua merujuk ke الْكِتَابُ.", 'lokasi'),
      question("rm06-lokasi-guru-di-kantor", "الْمُدَرِّسُ فِي الْمَكْتَبِ. هُوَ هُنَا.", "Di mana guru itu berada?", ["Di sekolah","Di kelas","Di kantor"], 2, "فِي الْمَكْتَبِ menunjukkan lokasi guru di kantor.", 'lokasi'),
      question("rm06-lokasi-catatan-di-ruang", "الدَّفْتَرُ عَلَى الْمَكْتَبِ. هُوَ فِي الْغُرْفَةِ.", "Apa yang berada di dalam ruangan?", ["Buku catatan","Tas","Pintu"], 0, "Kata ganti هُوَ merujuk ke buku catatan yang berada di meja.", 'lokasi'),
      question("rm06-lokasi-sekolah-di-kota", "أَيْنَ الْمَدْرَسَةُ؟ هِيَ فِي الْمَدِينَةِ.", "Kata mana yang menunjukkan lokasi sekolah?", ["الْمَدْرَسَةُ","فِي الْمَدِينَةِ","هِيَ"], 1, "فِي الْمَدِينَةِ berarti 'di kota'.", 'lokasi'),
      question("rm06-lokasi-kunci-di-kelas", "الْمِفْتَاحُ فِي الْفَصْلِ. هُوَ عَلَى الْكُرْسِيِّ.", "Kunci itu berada di atas apa?", ["Meja","Tas","Kursi"], 2, "عَلَى الْكُرْسِيِّ berarti 'di atas kursi'.", 'lokasi'),
      question("rm06-lokasi-tas-baru", "الْحَقِيبَةُ عَلَى الْمَكْتَبِ. هِيَ جَدِيدَةٌ.", "Apa yang dikabarkan sebagai benda baru?", ["Meja","Tas","Buku"], 1, "هِيَ merujuk ke الْحَقِيبَةُ; جَدِيدَةٌ memberi kabar tentang tas.", 'lokasi')
    ]
  },
  {
    id: 'idafah',
    title: "Idhafah: hubungan benda dan pemilik",
    competencyId: 'CB-09',
    lessonId: 'lesson-u5-01',
    contentRevision: 1,
    questions: [
      question("rm06-idafah-kunci-kelas", "مِفْتَاحُ الْفَصْلِ فِي الْحَقِيبَةِ.", "Benda apa yang berada di dalam tas?", ["Kunci kelas","Pintu sekolah","Tas siswa"], 0, "مِفْتَاحُ الْفَصْلِ merupakan satu frasa 'kunci kelas'.", 'idafah'),
      question("rm06-idafah-pintu-sekolah", "بَابُ الْمَدْرَسَةِ مَفْتُوحٌ.", "Apa yang terbuka?", ["Ruangannya","Pintu sekolah","Buku guru"], 1, "بَابُ adalah benda utama: 'pintu'; الْمَدْرَسَةِ menentukan pintu yang mana.", 'idafah'),
      question("rm06-idafah-buku-guru", "كِتَابُ الْمُدَرِّسِ عَلَى الْمَكْتَبِ.", "Buku siapa yang ada di meja?", ["Buku siswa","Buku Lina","Buku guru"], 2, "كِتَابُ الْمُدَرِّسِ adalah 'buku guru'.", 'idafah'),
      question("rm06-idafah-tas-siswa", "حَقِيبَةُ الطَّالِبِ فِي الْغُرْفَةِ.", "Siapa yang terkait dengan tas itu?", ["Siswa","Guru","Kepala sekolah"], 0, "الطَّالِبِ setelah حَقِيبَةُ menjelaskan tas milik siswa.", 'idafah'),
      question("rm06-idafah-catatan-siswa", "دَفْتَرُ الطَّالِبِ جَدِيدٌ.", "Kata pertama frasa milik ini berarti apa?", ["Siswa","Buku catatan","Baru"], 1, "دَفْتَرُ adalah benda utama, sementara الطَّالِبِ menerangkan pemiliknya.", 'idafah'),
      question("rm06-idafah-kunci-kantor", "مِفْتَاحُ الْمَكْتَبِ صَغِيرٌ.", "Apa makna lengkap frasa sebelum sifat?", ["Meja kecil","Kantor kecil","Kunci kantor"], 2, "مِفْتَاحُ الْمَكْتَبِ bermakna 'kunci kantor'.", 'idafah'),
      question("rm06-idafah-buku-siswa", "كِتَابُ الطَّالِبِ فِي الْحَقِيبَةِ.", "Yang ada di dalam tas ialah ...", ["Buku siswa","Tas guru","Pintu kelas"], 0, "كِتَابُ الطَّالِبِ adalah benda utama dan pemilik dalam satu frasa.", 'idafah'),
      question("rm06-idafah-pintu-ruangan", "بَابُ الْغُرْفَةِ مَفْتُوحٌ.", "Apa yang dimaksud بَابُ الْغُرْفَةِ?", ["Tas di dalam ruangan","Pintu ruangan","Ruangan baru"], 1, "Kata kedua الْغُرْفَةِ menjelaskan pintu yang dimaksud.", 'idafah')
    ]
  },
  {
    id: 'kepemilikan',
    title: "Kata ganti kepemilikan",
    competencyId: 'CB-12',
    lessonId: 'lesson-u8-01',
    contentRevision: 1,
    questions: [
      question("rm06-kepemilikan-kitab-sami", "هَذَا كِتَابُ سَامِي. كِتَابُهُ عَلَى الْمَكْتَبِ.", "Siapa pemilik buku di atas meja?", ["Guru","Sami","Lina"], 1, "Akhiran ـهُ merujuk ke Sami pada kalimat sebelumnya.", 'pronoun'),
      question("rm06-kepemilikan-kunci-lina", "هَذَا كِتَابُ لِينَا. مِفْتَاحُهَا فِي الْغُرْفَةِ.", "Kunci siapa yang berada di ruangan?", ["Lina","Sami","Guru"], 0, "Akhiran ـهَا mengacu ke Lina yang disebut sebelumnya.", 'pronoun'),
      question("rm06-kepemilikan-catatanku", "دَفْتَرِي عَلَى الْكُرْسِيِّ.", "Siapa pemilik buku catatan?", ["Sami","Lina","Orang yang berbicara"], 2, "Akhiran ي menyatakan 'milikku'.", 'pronoun'),
      question("rm06-kepemilikan-kunci-sami", "هَذَا مِفْتَاحُ سَامِي. مِفْتَاحُهُ صَغِيرٌ.", "Benda apa yang dikabarkan kecil?", ["Kunci Sami","Tas Lina","Buku guru"], 0, "مِفْتَاحُهُ merujuk ke kunci milik Sami.", 'pronoun'),
      question("rm06-kepemilikan-buku-lina", "هَذِهِ حَقِيبَةُ لِينَا. كِتَابُهَا عَلَى الْمَكْتَبِ.", "Buku siapa yang berada di meja?", ["Buku Sami","Buku Lina","Buku siswa"], 1, "ـهَا pada كِتَابُهَا merujuk ke Lina.", 'pronoun'),
      question("rm06-kepemilikan-pintuku", "بَابِي مَفْتُوحٌ.", "Siapa pemilik pintu yang disebut?", ["Dia","Kalian","Penutur"], 2, "Akhiran ي pada بَابِي bermakna 'pintuku'.", 'pronoun'),
      question("rm06-kepemilikan-catatan-guru", "الْمُدَرِّسُ فِي الْمَكْتَبِ. دَفْتَرُهُ عَلَى الْكُرْسِيِّ.", "Siapa pemilik buku catatan di kursi?", ["Guru","Siswa","Lina"], 0, "Akhiran ـهُ mengacu ke guru yang disebut sebelumnya.", 'pronoun'),
      question("rm06-kepemilikan-kunciku", "مِفْتَاحِي فِي الْحَقِيبَةِ.", "Apa arti مِفْتَاحِي?", ["Kunci kalian","Kunciku","Kuncinya"], 1, "مِفْتَاحٌ adalah kunci, dan ي menandai 'milikku'.", 'pronoun')
    ]
  }
];

export function collectCheckpointEvidenceItems(groups: readonly CheckpointGroup[]): EvidenceItem[] {
  const seen = new Set<string>();
  const items: EvidenceItem[] = [];
  for (const group of groups) {
    if (group.questions.length < 2) throw new Error(`Checkpoint needs two new variants: ${group.id}`);
    for (const question of group.questions) {
      if (seen.has(question.id)) throw new Error(`Duplicate checkpoint evidence ID: ${question.id}`);
      seen.add(question.id);
      if (question.kind !== 'transfer' || !question.sources.length ||
          question.sources.some((source) => !source.label.trim() || !source.href.startsWith('https://')))
        throw new Error(`Unsourced or ineligible checkpoint item: ${question.id}`);
      items.push({
        id: question.id, lessonId: group.lessonId, competencyIds: [group.competencyId],
        kind: 'transfer', skill: 'meaning'
      });
    }
  }
  return items;
}
