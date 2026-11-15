import type { MeaningQuestion } from './lessons/types.js';
import type { CheckpointGroup } from './checkpoints.js';

/**
 * RM-06 · Tahap 2.
 * All questions are originally authored examples of documented rules,
 * not verbatim copies. Every item has a reviewable provenance URL.
 */
const sources = {
  tanya: {
    label: 'Madinah Arabic · Lesson 2 Part 1 (mā/man dan kata tunjuk)',
    href: 'https://madinaharabic.com/free-content/grammar/lesson-2/part-1',
    usageType: 'independent-original'
  },
  jumlah: {
    label: 'Madinah Arabic · Lesson 58 Part 1 (kalimat nominal, mubtada dan khabar)',
    href: 'https://madinaharabic.com/free-content/grammar/lesson-58/part-1',
    usageType: 'independent-original'
  }
} as const;

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
    id,
    kind: 'transfer',
    context: 'Titik cek Tahap 2 · contoh baru',
    arabic, prompt, choices, correct, reason,
    sources: [sources[source]]
  };
}

/** 20 meaningful variants for each tested competency, not answer shuffles. */
export const stage2CheckpointGroups: readonly CheckpointGroup[] = [
  {
    id: 'tanya-benda-orang',
    title: 'Pertanyaan benda dan orang',
    competencyId: 'CB-04',
    lessonId: 'lesson-u2-01',
    contentRevision: 1,
    skill: 'meaning',
    questions: [
    question("rm06-stage2-tanya-apa-pena", "مَا هَذَا؟ هَذَا قَلَمٌ.", "Benda apa yang ditunjuk dalam jawaban?", ["Pena","Guru","Masjid"], 0, "مَا menanyakan benda; قَلَمٌ berarti pena.", "tanya"),
    question("rm06-stage2-tanya-siapa-guru", "مَنْ هَذَا؟ هَذَا مُدَرِّسٌ.", "Siapa yang ditunjuk?", ["Murid","Guru","Dokter"], 1, "مَنْ menanyakan orang; مُدَرِّسٌ bermakna guru.", "tanya"),
    question("rm06-stage2-tanya-apa-lampu", "مَا هَذَا؟ هَذَا مِصْبَاحٌ.", "Apa benda dalam jawaban?", ["Pena","Kursi","Lampu"], 2, "مِصْبَاحٌ berarti lampu; pertanyaan مَا meminta nama benda.", "tanya"),
    question("rm06-stage2-tanya-siapa-dokter", "مَنْ هَذَا؟ هَذَا طَبِيبٌ.", "Apa profesi orang ini?", ["Dokter","Pedagang","Imam"], 0, "طَبِيبٌ berarti dokter; مَنْ mengacu pada identitas orang.", "tanya"),
    question("rm06-stage2-tanya-apa-kursi", "مَا هَذَا؟ هَذَا كُرْسِيٌّ.", "Benda apa yang dijawab?", ["Meja","Kursi","Pintu"], 1, "كُرْسِيٌّ adalah kursi; ini jawaban untuk pertanyaan tentang benda.", "tanya"),
    question("rm06-stage2-tanya-siapa-imam", "مَنْ هَذَا؟ هَذَا إِمَامٌ.", "Identitas orang yang disebut adalah ...", ["Guru","Pelajar","Imam"], 2, "إِمَامٌ berarti imam, sebuah identitas orang.", "tanya"),
    question("rm06-stage2-tanya-apa-pintu", "مَا هَذَا؟ هَذَا بَابٌ.", "Arti kata benda dalam jawabannya?", ["Pintu","Rumah","Kursi"], 0, "بَابٌ berarti pintu, dan هَذَا menunjuk benda itu.", "tanya"),
    question("rm06-stage2-tanya-siapa-insinyur", "مَنْ هَذَا؟ هَذَا مُهَنْدِسٌ.", "Siapa orang yang dikenalkan?", ["Penjaga","Insinyur","Petani"], 1, "مُهَنْدِسٌ adalah insinyur; pertanyaan مَنْ meminta identitas.", "tanya"),
    question("rm06-stage2-tanya-apa-meja", "مَا هَذَا؟ هَذَا مَكْتَبٌ.", "Arti benda yang diperkenalkan?", ["Sekolah","Kunci","Meja"], 2, "مَكْتَبٌ dalam konteks perabotan berarti meja kerja.", "tanya"),
    question("rm06-stage2-tanya-siapa-petani", "مَنْ هَذَا؟ هَذَا فَلَّاحٌ.", "Apa pekerjaan orang ini?", ["Petani","Dokter","Pedagang"], 0, "فَلَّاحٌ bermakna petani; مَنْ menanyakan siapa orangnya.", "tanya"),
    question("rm06-stage2-tanya-tanya-ranjang", "هَذَا سَرِيرٌ.", "Jika ingin menanyakan nama benda ini, pertanyaan mana cocok?", ["مَا هَذَا؟","مَنْ هَذَا؟","مَا ذَلِكَ؟"], 0, "سَرِيرٌ adalah ranjang; مَا هَذَا؟ berarti 'Ini apa?'.", "tanya"),
    question("rm06-stage2-tanya-tanya-pedagang", "هَذَا تَاجِرٌ.", "Pertanyaan yang cocok untuk mengenali orang ini adalah ...", ["مَا هَذَا؟","مَنْ هَذَا؟","مَا ذَلِكَ؟"], 1, "تَاجِرٌ adalah pedagang; gunakan مَنْ untuk menanyakan orang.", "tanya"),
    question("rm06-stage2-tanya-tanya-rumah", "هَذَا بَيْتٌ.", "Apa pertanyaan tepat untuk menanyakan benda yang dekat?", ["مَنْ هَذَا؟","مَا ذَلِكَ؟","مَا هَذَا؟"], 2, "بَيْتٌ berarti rumah; مَا هَذَا؟ menanyakan benda yang ditunjuk.", "tanya"),
    question("rm06-stage2-tanya-tanya-polisi", "هَذَا شُرْطِيٌّ.", "Pilih pertanyaan untuk identitas orang pada jawaban ini.", ["مَنْ هَذَا؟","مَا هَذَا؟","مَا ذَلِكَ؟"], 0, "شُرْطِيٌّ adalah petugas polisi; مَنْ cocok untuk identitas orang.", "tanya"),
    question("rm06-stage2-tanya-tanya-masjid", "هَذَا مَسْجِدٌ.", "Untuk menanyakan apa bangunan ini, gunakan ...", ["مَنْ هَذَا؟","مَا هَذَا؟","مَا ذَلِكَ؟"], 1, "مَسْجِدٌ berarti masjid; pertanyaan benda menggunakan مَا.", "tanya"),
    question("rm06-stage2-tanya-tanya-penjaga", "هَذَا حَارِسٌ.", "Pertanyaan yang sesuai jika Anda belum mengenali orangnya?", ["مَا هَذَا؟","مَا ذَلِكَ؟","مَنْ هَذَا؟"], 2, "حَارِسٌ berarti penjaga; مَنْ menanyakan identitas orang.", "tanya"),
    question("rm06-stage2-tanya-tanya-telepon", "هَذَا هَاتِفٌ.", "Pilih pertanyaan yang menanyakan identitas benda tersebut.", ["مَا هَذَا؟","مَنْ هَذَا؟","مَا ذَلِكَ؟"], 0, "هَاتِفٌ adalah telepon; gunakan مَا untuk menanyakan benda.", "tanya"),
    question("rm06-stage2-tanya-tanya-penulis", "هَذَا كَاتِبٌ.", "Apa pertanyaan untuk menanyakan identitas penulis?", ["مَا هَذَا؟","مَنْ هَذَا؟","مَا ذَلِكَ؟"], 1, "كَاتِبٌ menyebut orang yang menulis; pertanyaan مَنْ tepat.", "tanya"),
    question("rm06-stage2-tanya-tanya-papan", "هَذَا لَوْحٌ.", "Pertanyaan mana untuk menanyakan apa benda ini?", ["مَنْ هَذَا؟","مَا ذَلِكَ؟","مَا هَذَا؟"], 2, "لَوْحٌ berarti papan; مَا هَذَا؟ menanyakan benda ini.", "tanya"),
    question("rm06-stage2-tanya-tanya-perawat", "هَذَا مُمَرِّضٌ.", "Jika jawabannya menyebut seorang perawat, tanyakan ...", ["مَنْ هَذَا؟","مَا هَذَا؟","مَا ذَلِكَ؟"], 0, "مُمَرِّضٌ adalah perawat; مَنْ menanyakan orang.", "tanya")
    ]
  },
  {
    id: 'frasa-atau-kalimat',
    title: 'Frasa dan kalimat lengkap',
    competencyId: 'CB-06',
    lessonId: 'lesson-u3-01',
    contentRevision: 1,
    skill: 'structure',
    questions: [
    question("rm06-stage2-struktur-pena-baru", "هَذَا الْقَلَمُ جَدِيدٌ.", "Informasi baru apa yang disampaikan?", ["Pena ini baru","Pena ini","Pena apa?"], 0, "جَدِيدٌ adalah khabar yang menyatakan pena ini baru.", "jumlah"),
    question("rm06-stage2-struktur-masjid-besar", "الْمَسْجِدُ كَبِيرٌ.", "Apa isi kabar pada kalimat ini?", ["Masjid itu dekat","Masjid itu besar","Ini masjid"], 1, "كَبِيرٌ memberi informasi 'besar' pada الْمَسْجِدُ.", "jumlah"),
    question("rm06-stage2-struktur-pintu-terbuka", "الْبَابُ مَفْتُوحٌ.", "Apa yang diberitakan tentang pintu?", ["Pintu ini","Pintu kecil","Pintu terbuka"], 2, "مَفْتُوحٌ menyatakan pintu itu terbuka.", "jumlah"),
    question("rm06-stage2-struktur-kursi-lama", "الْكُرْسِيُّ قَدِيمٌ.", "Makna informasi baru di akhir kalimat?", ["Kursi itu lama","Kursi baru","Kursi di sini"], 0, "قَدِيمٌ adalah khabar dan berarti lama/tua.", "jumlah"),
    question("rm06-stage2-struktur-buku-bermanfaat", "الْكِتَابُ مُفِيدٌ.", "Bagian kedua menyatakan bahwa buku ...", ["Ada di tas","Bermanfaat","Tertutup"], 1, "مُفِيدٌ adalah khabar: bermanfaat.", "jumlah"),
    question("rm06-stage2-struktur-kelas-bersih", "الْفَصْلُ نَظِيفٌ.", "Apa yang dinyatakan tentang kelas?", ["Kelas itu besar","Kelas itu lama","Kelas itu bersih"], 2, "نَظِيفٌ berarti bersih; ia melengkapi kalimat.", "jumlah"),
    question("rm06-stage2-struktur-lampu-rusak", "هَذَا الْمِصْبَاحُ مَكْسُورٌ.", "Kalimat ini memberikan kabar bahwa ...", ["Lampu ini rusak","Lampu ini baru","Ini sebuah lampu"], 0, "مَكْسُورٌ bermakna rusak/pecah dan berperan sebagai kabar.", "jumlah"),
    question("rm06-stage2-struktur-siswa-hadir", "الطَّالِبُ حَاضِرٌ.", "Apa kabar yang disampaikan?", ["Siswa itu guru","Siswa itu hadir","Siswa itu rajin"], 1, "حَاضِرٌ menunjukkan siswa tersebut hadir.", "jumlah"),
    question("rm06-stage2-struktur-catatan-besar", "هَذَا الدَّفْتَرُ كَبِيرٌ.", "Apa informasi baru pada kalimat ini?", ["Buku catatan ini","Buku catatan itu kecil","Buku catatan ini besar"], 2, "كَبِيرٌ menyampaikan sifat besar sebagai informasi lengkap.", "jumlah"),
    question("rm06-stage2-struktur-alat-bermanfaat", "الْجِهَازُ مُفِيدٌ.", "Apa arti kabar bagi benda tersebut?", ["Alat itu bermanfaat","Alat itu rusak","Alat ini baru"], 0, "مُفِيدٌ adalah kabar 'bermanfaat' tentang alat.", "jumlah"),
    question("rm06-stage2-struktur-banding-buku", "الْكِتَابُ — الْكِتَابُ جَدِيدٌ.", "Bagian mana memberi pernyataan lengkap?", ["Bagian pertama saja","Bagian kedua saja","Keduanya hanya menyebut benda"], 1, "الْكِتَابُ hanya menyebut topik; tambahan جَدِيدٌ membuat kalimat lengkap.", "jumlah"),
    question("rm06-stage2-struktur-banding-pintu", "الْبَابُ — الْبَابُ مُغْلَقٌ.", "Mana bentuk yang sudah menyatakan keadaan pintu?", ["Kata الْبَابُ saja","Keduanya belum lengkap","الْبَابُ مُغْلَقٌ"], 2, "مُغْلَقٌ adalah khabar yang melengkapi penyebutan pintu.", "jumlah"),
    question("rm06-stage2-struktur-banding-meja", "الْمَكْتَبُ — الْمَكْتَبُ صَغِيرٌ.", "Bagian mana memberi kabar baru?", ["Kalimat kedua","Kata pertama saja","Tidak ada yang memberi kabar"], 0, "صَغِيرٌ pada bagian kedua menyatakan meja itu kecil.", "jumlah"),
    question("rm06-stage2-struktur-banding-guru", "الْمُدَرِّسُ — الْمُدَرِّسُ حَاضِرٌ.", "Bagian yang menyatakan sesuatu tentang guru?", ["Kata pertama saja","Kalimat kedua","Keduanya frasa tanpa kabar"], 1, "حَاضِرٌ memberi informasi bahwa guru hadir.", "jumlah"),
    question("rm06-stage2-struktur-banding-masjid", "الْمَسْجِدُ — الْمَسْجِدُ جَدِيدٌ.", "Kalimat lengkapnya ada pada bagian ...", ["Pertama","Tidak ada","Kedua"], 2, "Bagian kedua memiliki khabar جَدِيدٌ; yang pertama hanya menyebut masjid.", "jumlah"),
    question("rm06-stage2-struktur-rumah-luas", "هَذَا الْبَيْتُ وَاسِعٌ.", "Kata mana menjadi kabar?", ["وَاسِعٌ","الْبَيْتُ","هَذَا"], 0, "وَاسِعٌ berarti luas dan memberi kabar tentang rumah.", "jumlah"),
    question("rm06-stage2-struktur-pena-panjang", "الْقَلَمُ طَوِيلٌ.", "Kata mana adalah khabar?", ["الْقَلَمُ","طَوِيلٌ","Keduanya hanya topik"], 1, "طَوِيلٌ menyatakan panjang tentang pena.", "jumlah"),
    question("rm06-stage2-struktur-kunci-kecil", "الْمِفْتَاحُ صَغِيرٌ.", "Kata mana memberi informasi baru?", ["الْمِفْتَاحُ","Tidak ada khabar","صَغِيرٌ"], 2, "صَغِيرٌ memberi kabar 'kecil' tentang kunci.", "jumlah"),
    question("rm06-stage2-struktur-dokter-sibuk", "الطَّبِيبُ مَشْغُولٌ.", "Manakah yang menerangkan keadaan dokter?", ["مَشْغُولٌ","الطَّبِيبُ","هَذَا"], 0, "مَشْغُولٌ adalah kabar yang berarti sibuk.", "jumlah"),
    question("rm06-stage2-struktur-telepon-baru", "الْهَاتِفُ جَدِيدٌ.", "Bagian mana yang menunjukkan informasi tentang telepon?", ["الْهَاتِفُ","جَدِيدٌ","Tidak ada"], 1, "جَدِيدٌ memberitahukan bahwa telepon itu baru.", "jumlah")
    ]
  }
];
