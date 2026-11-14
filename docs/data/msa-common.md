# Kosakata umum MSA — leksikon isim, sifat dan ungkapan

**Status:** 14 November 2026 · **157 entri awal** untuk penutur Indonesia · **Draft** (belum ditashih ahli bahasa Arab).

Koleksi ini menambahkan data _di luar kamus verba_ pada `/kosakata/` → **Umum MSA**. Ada 111 kata benda, 34 kata sifat, 11 ungkapan, dan 1 partikel seruan yang dikelompokkan dalam sembilan tema. Setiap entri punya ID stabil, lemma/ungkapan Arab, arti Indonesia yang ditulis ulang untuk proyek, jenis kata, tema, dan sumber rujukan untuk pemeriksaan. Subset yang dipilih mencatat bentuk jamak, feminin, akar atau contoh frasa; bentuk yang belum tercatat **tidak dibangkitkan secara otomatis**.

## Mengapa 12.000+ verba bukan seluruh leksikon?

[Inventaris verba proyek](./wiktionary-verbs.md) berisi 7.938 kombinasi fi'il Form I dari Qutrub/Arramooz, ditambah ribuan contoh mazid dari Wiktionary; katalog modal mencakup sekitar 12.500 **lema kata kerja**, bukan 12.500 kata dari seluruh kelas. Isim tradisional meliputi nomina, kata sifat, nama diri, kata ganti dan kategori nomina lain. Pembagian tiga pokok tetap **isim, fi'il, harf** (lihat Ryding, _A Reference Grammar of Modern Standard Arabic_, bab 5 dan 10). Ungkapan adalah _unit leksikal_ yang dapat terdiri atas beberapa kata, bukan kelas tata bahasa keempat.

Perbandingan eksternal: [Kaikki Arabic dictionary](https://kaikki.org/dictionary/Arabic/index.html) memaparkan 31.715 entri berkategori _Noun_, 9.088 _Adjective_, 2.976 _Proper name_, dan 115 _Interjection_ (snapshot enwiktionary 1 Oktober 2026, halaman dipantau 14 November). **Angka ini bukan jumlah lemma unik MSA**, dapat mencakup dialek, infleksi, banyak sense, dan duplikasi. Jangan menjumlahkannya seakan-akan jumlah kata baku unik.

## Sumber yang sudah diteliti

| Sumber                                                                                                                                                                      | Kegunaan                                                            | Lisensi / keputusan                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Cambridge: Arabic noun types](https://www.cambridge.org/core/books/abs/reference-grammar-of-modern-standard-arabic/arabic-noun-types/7F8B6CE3CD8B92C06CDF175D51D0A703)     | Isim turunan, nominal, kata tidak diturunkan, serapan               | Rujukan teori; **jangan salin bab buku**                                                                                                    |
| [Cambridge: Adjectives](https://www.cambridge.org/core/books/abs/reference-grammar-of-modern-standard-arabic/adjectives-function-and-form/5BDAB16E0066CF07E48EEBD4B589FA90) | Kata sifat, perubahan gender/number dan penggunaan                  | Rujukan teori, bukan sumber leksikon bulk                                                                                                   |
| [Wiktionary Arabic / Kaikki](https://kaikki.org/dictionary/Arabic/index.html)                                                                                               | Daftar calon nomina/sifat, ejaan, bentuk dan register untuk audit   | Konten Wiktionary [CC BY-SA 4.0 / GFDL](https://en.wiktionary.org/wiki/Wiktionary:Copyrights). **Tidak ada bulk dump disalin dalam PR ini** |
| [Wikidata Lexemes](https://www.wikidata.org/wiki/Wikidata:Lexicographical_data/Documentation)                                                                               | Calon source-of-truth bentuk/sense dan kelas kata; ID stabil        | [CC0 pada data terstruktur](https://www.wikidata.org/wiki/Wikidata:Licensing); coverage/quality Arab belum diaudit                          |
| [Wiktionary: Basic Arabic phrases](https://en.wiktionary.org/wiki/Appendix:Basic_Arabic_phrases)                                                                            | Periksa sapaan MSA, antara lain مرحبا، شكرا، إلى اللقاء             | Rujukan ungkapan; tiap formulasi orang pertama/jenis kelamin butuh konteks                                                                  |
| [Routledge Frequency Dictionary of Arabic](https://resourcecentre.routledge.com/books/9780415444347)                                                                        | Kandidat **pembanding** seleksi 5.000 kata dari korpus MSA + dialek | **Bukan data bebas untuk diimpor** tanpa izin                                                                                               |
| [OpenArabic 100 common words](https://www.openarabic.org/most-common-arabic-words/)                                                                                         | Menjelaskan kesenjangan frekuensi vs kurikulum MSA                  | Berbasis subtitle/OpenSubtitles dan token ortografis, termasuk dialek; jangan otomatis menganggapnya frekuensi **lema MSA tulis**           |

### Fakta leksikal khusus yang dipilih untuk ditandai

- [اِمْرَأَة / نِسَاء](https://en.wiktionary.org/wiki/امرأة): bentuk jamak yang perlu dihafal sebagai pasangan lema, **bukan** rumus semua kata feminin.
- [حَاسُوب / حَوَاسِيب](https://en.wiktionary.org/wiki/حاسوب): nomina teknologi yang dibentuk dari akar ح س ب. Kata modern **tidak otomatis serapan**.
- [إِنْتَرْنِت](https://en.wiktionary.org/wiki/إنترنت): serapan dari bahasa Inggris; **jangan memaksa** analisis akar tsulatsi.
- [هَاتِف ذَكِيّ](https://en.wiktionary.org/wiki/هاتف_ذكي): gabungan nomina dan sifat; bentuk frasa punya aturan kesesuaian yang perlu dipelajari kelak.
- [صَغِير / صَغِيرَة](https://en.wiktionary.org/wiki/صغير): bentuk feminin dari sifat; tidak berarti semua adjektiva punya pola feminin yang identik.
- [شُكْرًا](https://en.wiktionary.org/wiki/شكرا): ungkapan terima kasih, tidak sekadar nomina biasa.

## Data dan keterbatasan

- Daftar **disusun manual sebagai kandidat belajar**, bukan 157 lema hasil ekstraksi Wiktionary yang tiap baris telah diaudit. Untuk entri tanpa tautan spesifik, `sources` merujuk **indeks kamus yang harus digunakan untuk verifikasi**, bukan bukti bahwa bentuk dan glos pasti cocok. UI mencantumkan status draft.
- Makna Indonesia adalah formulasi original tim proyek, bukan salinan definisi/glos Wiktionary atau teks berhak cipta.
- Tidak ada klaim bahwa urutan kata berdasarkan frekuensi. Kategorisasi tematik tidak setara dengan frekuensi. Bentuk berharakat, pilihan makna, feminin dan jamak seluruhnya perlu revisi dari pengajar.
- Jamak taksir dapat berpola tetapi sering perlu hafalan pasangan lema; `lexical` khusus untuk plural yang tidak boleh diasumsikan dari satu pola standar. Jangan menyebut semua jamak taksir sebagai irregular.
- Kelas `noun` dan `adjective` pada UI adalah **subkelompok pedagogis dalam isim**. `expression` adalah label gabungan frasa; `particle` (mis. يَا) termasuk harf, bukan isim.
- Dataset tetap first-party, termasuk dalam katalog statis dan pengindeksan pencarian global. Tidak ada backend, auth, perubahan penyimpanan IndexedDB, atau dependensi baru.
- Data yang tidak memiliki plural, gender, atau akar **disimpan tanpa bidang itu**; tidak menghasilkan bentuk yang tidak didukung rujukan.

## Rencana ekspansi setelah review

1. **Audit per lema** terhadap kamus terpilih, simpan URL halaman konkret, kelas/POS, register MSA atau dialek, root (opsional), jamak, feminin, contoh referensi, dan rekaman reviewer. Tandai yang tidak ditemukan, jangan menerbitkan bentuk berspekulasi.
2. **Korpus frekuensi MSA tertulis yang jelas lisensinya**: jika dataset memberikan frekuensi _token_, lakukan lemmatisasi/anotasi dengan izin dan audit. Jangan memakai peringkat subtitle atau frekuensi Al-Qur'an sebagai peringkat universal MSA.
3. Dedup silang dengan `harian`, `quran`, dan `sharaf` di level `(lemma berharakat, POS, sense, register)`; pertahankan entri berbeda untuk homograf dan polisemi.
4. Tambahkan kategori _proper names_, bilangan, nisbah, adverbia/zharf, plural kolektif, adjektiva warna dan elatif setelah review. Hubungkan dengan anotasi root/pattern jika sumber mengizinkan.
5. Baru setelah fondasi lema benar, contoh frasa diajarkan berurutan: **na‘at–man‘ut**, **mubtada–khabar**, **idafah**, **huruf jar + majrur**, seruan **ya + munada**, kesesuaian gender/jumlah, pola jamak, dan ungkapan tetap. Kembangkan pelajaran dengan teks original serta review kebahasaan.

Tindak lanjut di tracker: **RS-01** (riset sumber), **V-06** (koleksi MSA), dan _peninjauan pengajar_ (D-7). Status maksimum PR ini tetap **Stage 3 Draft**.
