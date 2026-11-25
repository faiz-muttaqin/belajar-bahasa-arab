# Audit G-02 lanjutan: akar lemah, rubā‘ī, maṣdar Form II dan IV, ‘amal

**25 November 2026 · materi draf (ADR-004 D-9) · sub-deliverable G-02 / OER-02 ([#15](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/15), [#55](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/55))**

Lanjutan dari [audit Form III–IX](./2026-11-25-g02-forms-iii-ix-audit.md). Implementasi oleh Sonnet 5.5; pemeriksaan kebahasaan oleh Fable 5.2 dalam dua putaran. Kalimat contoh dan latihan adalah tulisan proyek; sumber mendukung bentuk kata dan pernyataan kaidah, bukan kalimatnya.

## Cakupan baru

| Bagian                                                          | Isi                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID kaidah dan prasyarat                                         | ID stabil `g02.<nama>` pada tiga bagian sharaf, sembilan kaidah participle, empat kaidah maṣdar dan empat kaidah ‘amal. Prasyarat per kaidah menunjuk kaidah G-02 lain dan kompetensi `competencies.ts` (CB-13 sampai CB-21, CR-01, CR-03). Tanpa graf kedua. |
| Tautan wazan                                                    | Setiap contoh menaut ke baris verbanya di `/rujukan/fiil/kata-kerja/<bab>/`. Nomor bab diuji terhadap `data/wiktionary/*.json`.                                                                                                                               |
| Akar lemah dan khusus (11 keluarga baru, `/kaidah/participle/`) | nāqiṣ: دَعَا, بَنَى. Lafīf mafrūq: وَقَى. Lafīf maqrūn: رَوَى. Mahmūz: أَخَذَ (fā’), سَأَلَ (‘ain), قَرَأَ (lām). Muḍā‘af: مَدَّ (I), اِسْتَمَرَّ (X). Rubā‘ī mujarrad تَرْجَمَ (Iq) dan mazīd تَدَحْرَجَ (IIq).                                                                                 |
| Maṣdar Form II dan IV (`/kaidah/masdar/`)                       | نَظَّمَ → تَنْظِيمٌ (تَفْعِيلٌ) dan أَرْسَلَ → إِرْسَالٌ (إِفْعَالٌ); 8 latihan baru.                                                                                                                                                                                                 |
| Pelajaran ‘amal (`/kaidah/participle/amal/`)                    | 4 kaidah, 7 contoh, 7 latihan.                                                                                                                                                                                                                                |

Total: 26 keluarga participle dan 104 latihan; 13 pasangan maṣdar dan 52 latihan.

## Sumber

- **Bentuk kata:** baris `dataId` di `data/wiktionary/verbs-form-i.json` dan `verbs-mazid.json` (Wiktionary via kaikki.org, CC BY-SA 4.0 dan GFDL; terdaftar di `data/sources/registry.json` sebagai `wiktionary`, tanpa sumber baru). Uji `g02-rules.spec.ts` mencocokkan māḍī, muḍāri‘, maṣdar dan dua isim setiap keluarga dengan baris itu (setelah tanwin dilepas) dan memastikan nomor bab sama dengan data. Tidak memakai `lex.zip`.
- **Pembanding Lane's Lexicon** (`data/third-party/lane/form-i.json`, CC BY-SA 3.0 US): ada untuk akar سءل, قرء, بنى, روى dan وقى; tidak ada untuk دعو, ءخذ dan مدد. Hanya bukti pembanding; entri وَقَى mencatat perintah قِ.
- **Kaidah akar lemah, rubā‘ī dan maṣdar Form II dan IV:** tabel verba Wiktionary. Halaman LibreTexts Mohamed dan Issa 5.2 (CC BY 4.0) dan Hana Kassas 2.6 (CC BY 4.0) dibaca ulang dan **tidak** memuat pola maṣdar bentuk turunan maupun ‘amal; keduanya tidak dipakai untuk klaim itu.
- **‘Amal:** dua artikel Wikipedia Arab (CC BY-SA 4.0): اسم الفاعل (bagian «عمله وأحكامه» dan pembuka) dan نائب فاعل (pembuka dan «ما يرفع نائب فاعل»). Alfiyyah di Wikisource Arab (revisi yang dibaca) dan Syarḥ Ibn ‘Aqīl (hanya jilid I) tidak memuat bab إعمال, dan artikel اسم المفعول hanya membahas pembentukan. Keterbatasan: teks kedua artikel tampak rusak pada beberapa bagian, dan artikel نائب فاعل hanya sebagian dibaca verbatim oleh pembaca halaman. Pemeriksa Fable membuka kedua artikel pada putaran 1 dan 2 dan mengonfirmasi isi catatan sumber.
- **Tidak ada di sumber:** aturan bahwa isim maf‘ūl mengikuti jenis nā’ib al-fā‘il (hanya tampak pada contoh artikel), dan aturan makna lampau memakai fi‘il atau iḍāfah (tidak dinyatakan eksplisit). Keduanya ditandai demikian pada halaman.

## Putaran 1: 93 butir diperiksa

Fable membuka 13 entri Wiktionary dan dua artikel Wikipedia. Semua māḍī, muḍāri‘, maṣdar dan isim pada 11 keluarga dan dua pasangan maṣdar tercatat seperti yang dipakai, dan glos Indonesia sesuai makna entri. Hasil: 67 benar, 12 perlu perbaikan, 14 minor atau tidak pasti.

| Butir                                            | Masalah                                                                                                                                                  | Perubahan                                                                                                              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `qaraa`, `part-85`                               | Hamzah قَارِئٌ disebut “berkasrah sesudah alif” (salinan dari سَائِلٌ). Hamzah itu final dan di atas yā’ karena huruf sebelumnya berkasrah.                    | Teks diperbaiki.                                                                                                       |
| `akhadha`                                        | مَأْخَذٌ disebut “bentuk turunan”; entri mencatatnya sebagai maṣdar kedua.                                                                                   | “maṣdar kedua”.                                                                                                        |
| `waqaa`                                          | Catatan menyebut bab tidak diketahui “karena wāw gugur”; verba ini berpola فَعَلَ يَفْعِلُ.                                                                     | Catatan menyatakan polanya dan bahwa data situs belum mengklasifikasikannya. `wazanBab` tetap 0 agar sama dengan data. |
| `g02.akar-mudaaf`                                | “Melebur bila berurutan” terlalu luas (مَدَدْتُ tidak melebur).                                                                                              | Syarat harakat ditambahkan.                                                                                            |
| `g02.amal-isim-fail`                             | Syarat penyandaran dibatasi pada fā‘il isim nyata; sumber menerapkan dua syarat juga pada objek, dan daftar penyandaran tidak lengkap.                   | Teks ditulis ulang: dua syarat, daftar penyandaran, fā‘il tersembunyi tanpa syarat.                                    |
| `g02.amal-idafah`, sumber `fail`                 | Perbedaan pendapat dalam artikel menyangkut iḍāfah kepada fā‘il, bukan objek; teks artikel rusak.                                                        | Peringatan dan catatan sumber diperbaiki.                                                                              |
| sumber `naib`, `g02.amal-isim-maful`             | “Syarat rinci belum diperiksa” padahal bagian «ما يرفع نائب فاعل» memuatnya.                                                                             | Catatan sumber dan peringatan diperbarui.                                                                              |
| `g02.amal-isim-maful`                            | Aturan jenis tidak lengkap dan tidak dinyatakan sumber.                                                                                                  | Ditambah aturan i‘rāb, ketakrifan, jumlah, dan penandaan bahwa jenis hanya tampak pada contoh sumber.                  |
| `amal-06`                                        | الْمَدِينَةَ juga feminin sehingga tidak membuktikan kesesuaian dengan nā’ib al-fā‘il.                                                                        | Kalimat diganti: زُرْنَا الْبَلَدَ الْمَعْرُوفَةَ آثَارُهُ.                                                                            |
| `amal-ex-03`                                     | Alternatif modern هَلْ سَيَسْتَقْبِلُ dikritik dan label register salah.                                                                                          | Diganti هَلْ يَسْتَقْبِلُ.                                                                                                     |
| `daa`, `part-61`, `g02.akar-naqis`               | Asal yā’ pada دَاعٍ tidak dijelaskan; contoh feminin وَاقِيَةٌ berakar lafīf.                                                                                  | Penjelasan wāw menjadi yā’ ditambah; contoh feminin diganti دَاعِيَةٌ.                                                     |
| `part-64`, `part-93`, `istamarra`                | Pertanyaan “dua wāw” tidak sesuai tulisan; “tidak ada isim maf‘ūl” padahal tabel memuat مُسْتَمَرٌّ.                                                           | Pertanyaan dan jawaban diperbaiki.                                                                                     |
| `part-67`, `part-91`                             | Kalimat gramatikal tetapi hampa tanpa pelengkap.                                                                                                         | الْبُيُوتُ الْمَبْنِيَّةُ حَدِيثًا قَرِيبَةٌ مِنَ النَّهْرِ dan الْحِبَالُ الْمَمْدُودَةُ بَيْنَ الْأَشْجَارِ جَدِيدَةٌ.                                             |
| `part-88`, `amal-07`, `amal-ex-02/04`, `amal-03` | “Kakak atau adik laki-laki” janggal; contoh iḍāfah dapat dibaca sebagai kata benda; ex-02 tidak menyebut bahwa isim fā‘il bekerja karena menjadi khabar. | “Saudara laki-laki”; catatan ditambahkan.                                                                              |

Butir yang dibiarkan: `part-103` (khabar partisip untuk aksi berlangsung, keyakinan rendah) dan `amal-ex-05` (kedudukan الْغُرْفَةَ sebagai maf‘ūl bih, penyederhanaan lazim). Dua kalimat yang diminta diperiksa dinyatakan gramatikal: أَمُسْتَقْبِلٌ الْمُدِيرُ الضُّيُوفَ غَدًا؟ dan دَخَلْنَا الْغُرْفَةَ الْمَفْتُوحَ بَابُهَا.

## Putaran 2: 25 butir yang berubah

Hanya butir yang diubah setelah putaran 1 dikirim ulang. Tidak ada kesalahan bentuk atau harakat. Fable membaca ulang teks mentah kedua artikel Wikipedia dan lima entri Wiktionary. 19 benar, 6 perlu perbaikan kecil, semuanya diterapkan:

- **`g02.amal-isim-fail`:** aturan makna lampau tidak dinyatakan artikel, dan syarat berlaku juga untuk me-rafa‘-kan fā‘il isim nyata. Teks disesuaikan; aturan lampau dipindah ke peringatan dengan catatan “tidak dinyatakan sumber”.
- **Sumber `naib`:** judul dan catatan melengkapi syarat dari «ما يرفع نائب فاعل» (nā’ib al-fā‘il wajib dhamir tersembunyi tanpa ال dan tanpa penyandaran; isim maf‘ūl tidak diberi sifat dan boleh di-iḍāfah-kan kepada ma‘mūl-nya).
- **`waqaa`:** kalimat ganda tentang wāw dihapus.
- **`g02.akar-mudaaf`:** “huruf kedua” diperjelas menjadi huruf kedua dari dua huruf sama.
- **`part-67`:** asal shadda ditulis lengkap (wāw pola menjadi yā’ lalu melebur dengan yā’ akar).
- **`amal-ex-03`:** urutan penjelasan diperbaiki; “mausūf” menjadi “mauṣūf”.

Perbaikan putaran 2 berupa kata-kata dan tidak dikirim untuk putaran ketiga.

## Yang tidak bisa dipastikan

- Nomor bab (`wazanBab`) hanya diperiksa terhadap data situs, bukan terhadap kitab. `وَقَى` tetap di “Bab belum diketahui” sampai data situs mengklasifikasikannya.
- Kaidah nā’ib al-fā‘il pada isim maf‘ūl bersumber dari artikel yang sebagian dibaca lewat ringkasan; perlu dicek ulang pada kitab nahwu atau oleh pengajar.
- Tinjauan ustadz, uji pembelajar dan cek harakat di ponsel nyata tetap terbuka (ADR-004 D-9, satu tinjauan ujung ke ujung).
