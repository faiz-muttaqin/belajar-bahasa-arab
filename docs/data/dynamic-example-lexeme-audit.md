# D-02 — Kontrak lexeme, permukaan kata, dan provenance

**Status:** pilot implementasi D-02 pada PR setelah G-06. **Semua bentuk contoh masih draft** sampai dilakukan pemeriksaan manusia. Dokumen ini adalah audit arsitektur, bukan fatwa linguistik atas setiap contoh.

## Masalah yang diselesaikan

Data kamus MSA/harian (\`VocabularyItem\`) memuat lema dan, pada sebagian entri, bentuk feminin/jamak yang tersimpan. Data sharaf (\`SharafEntry\`) memuat lema, bab, dan bentuk tertentu seperti muḍāri‘ atau mashdar. Ada pula tabel \`tashrifIstilahi\` serta 22 pola wazan di \`referenceWazans\`/\`patternCatalog\`. **Tiga jenis data ini tidak saling ekuivalen**:

- \`lemma\` adalah identitas leksikal, bukan token siap dipasang ke kalimat.
- \`SharafEntry.forms\` adalah daftar bentuk yang *tercatat*; beberapa label belum menjelaskan person, number, gender, voice, mood, atau kasus.
- Tabel 22 wazan adalah **pola pembelajaran**; pola bukan bukti bentuk spesifik dari sembarang akar, juga bukan izin membuat masdar dan i‘lal dengan regex.
- \`publishedVocabulary('quran')\` dan \`('shalat')\` mengandung register klasik dan tidak boleh otomatis diperlakukan sebagai nomina MSA dengan kasus yang sama.

## Implementasi modul

\`src/lib/domain/grammar/lexeme-forms.ts\` mendefinisikan:

| Tipe | Fungsi |
| --- | --- |
| \`LexemeRecord\` | ID kamus, kelas kata, lema, arti, register, asal data, root/bab opsional, daftar bentuk, valensi dengan scope eksplisit |
| \`WordSurface\` | Teks ortografis dan \`MorphFeatures\` bentuk yang memang diketahui (gender, jumlah, ma‘rifah, kasus nomina, aspek/mood fi‘il, orang, voice) |
| \`SurfaceEvidence\` | \`dictionary-lemma\`, \`explicit-dictionary-form\`, atau \`curated-example\`; sumber URL, status review, dan catatan |
| \`LexemeValency\` | \`unknown\` sebagai default; daftar contoh objek transitive hanya bila diatur untuk bingkai pembelajaran yang terkurasi |
| \`lexemeFromVocabulary\` | Adapter konservatif dari data MSA/harian/Qur’an/shalat yang sudah ada; tidak menebak kasus/bab |
| \`lexemeFromSharaf\` | Adapter dari entri sharaf: bentuk \`mudhari\` boleh ditandai aspek imperfect, tetapi tidak otomatis diberi person/voice/mood |
| \`curatedFrameSurface\` | Satu-satunya jalan menghasilkan \`WordSurface\` untuk pilihan contoh dinamis: wajib mempunyai slot, bentuk, fitur dan alasan; selamanya \`draft\` sampai diaudit |
| \`searchLexemeRecords\` | Penelusuran bentuk/arti/root/bab memakai normalisasi yang sudah digunakan kamus, bukan identifikasi lema dari string tanpa harakat |

## Integrasi dengan pilot G-06

- Semua opsi pada \`dynamic-examples.ts\` sekarang mempunyai \`features\` dan \`evidence\`, berasal dari adapter kamus. Bentuk **الْكِتَابُ** dari lema **كِتَابٌ** diberi tag \`case: raf\` dan \`definiteness: definite\`, tetapi selalu diberi status \`curated-example/draft\`.
- Sifat **جَدِيدَةٌ** memakai metadata feminin eksplisit dari kamus MSA dan konteks khabar, bukan pola otomatis untuk semua adjektiva.
- Fi‘il **كَتَبَ** diberi fitur \`aspect: perfect\`, \`person: 3\`, \`gender: masculine\`, \`number: singular\`, \`voice: active\` **hanya untuk bingkai yang disediakan**. Tidak menegaskan bentuk lain tanpa data.
- Objek **الرِّسَالَةَ** dan **الْبَابَ** berasal dari daftar objek kompatibel per fi‘il dalam pilot. \`withCuratedValency\` menandai contoh collocation, **bukan** klaim bahwa verba selalu memerlukan objek atau hanya dapat menerima objek itu.
- Modal menampilkan status bentuk \`draft\` dan sumber **lema**. Sumber kamus yang ditampilkan tidak otomatis memverifikasi seluruh infleksi baru.
- Tidak ada perubahan SSR/static fallback, penambahan paket/backend, ataupun pemuatan seluruh 8.000+ verba ke UI.

## Penolakan yang disengaja

\`curatedFrameSurface\` menolak:
1. Nomina dengan verb mood (\`jussive\`, \`subjunctive\`) atau fi‘il dengan noun case (\`raf\`, \`nasb\`, \`jarr\`).
2. Verb mood pada selain fi‘il muḍāri‘ (\`aspect: imperfect\`).
3. Voice, aspect, atau person pada entri non-verba.
4. Bentuk tanpa ID, teks, alasan, atau sumber leksikal.
5. Valensi konteks tanpa daftar contoh objek kompatibel.

Kandidat yang tidak memenuhi syarat tetap **tidak tersedia**, meskipun ejaannya tampak sesuai. \`normalizeArabicSearch\` hanya membantu pencarian, bukan kunci identitas atau generator infleksi.

## Batasan yang belum terselesaikan

- Adapter D-02 belum mengimpor dan melabelkan semua bentuk \`tashrifIstilahi\` atau wazan sebagai lema tepercaya. Untuk yang hanya merupakan *pattern example*, akses harus tetap sebagai aturan, bukan *wordform* terverifikasi.
- Tidak ada analisis morfologi universal, konjugator aktif/pasif, negasi, bentuk mu‘tal, atau validasi kolokasi lintas jutaan pasangan.
- Perlu **D-03** untuk form registry yang dipilih dengan tashrif/dhamir/mood berdasarkan bukti, **D-04** untuk constraint sintaksis/semantik lintas kelas, **D-05** untuk rollout ke kartu G-01–G-05, dan **D-06** untuk local progress/lazy-indexing.
- Semua anotasi \`curated-example\` adalah draf pengajaran dari proyek. **Validasi unit/E2E tidak menggantikan tashih bahasa Arab**.

Lanjutan: [roadmap dynamic examples](../plans/dynamic-example-slots.md) · [issue #24](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/24) · [data MSA](./msa-common.md).
