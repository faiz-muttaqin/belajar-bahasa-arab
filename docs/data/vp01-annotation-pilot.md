# VP-01: kontrak anotasi dan inventaris contoh pilot

**25 November 2026 · Status konten: `draft` ([ADR-004 D-9](../decisions/0004-content-decisions.md#d-9-sumber-dulu-tinjauan-ustadz-di-akhir)) · Bagian dari [rencana visual pembelajaran](../plans/visual-pembelajaran.md), VP-01 dan VP-02**

Dokumen ini mencatat contoh mana yang sudah dianotasi untuk penjelajah peran kata, dari mana asalnya, dan sampai mana buktinya. Ini bukan sertifikasi keakuratan linguistik dan bukan tinjauan ustadz.

## Kontrak

- Tipe, ID dan validasi: `src/lib/domain/grammar/annotation.ts`. Data pilot: `src/lib/content/grammar-annotations.ts`. Lapisan dan warna: `src/lib/domain/grammar/annotation-layers.ts`.
- ID stabil: kalimat `ph-fi-kitab-talib`, kata `ph-fi-kitab-talib.t2`, hubungan `ph-fi-kitab-talib.r1`. Nomor kata hanya urutan baca (kanan ke kiri); peran berasal dari anotasi.
- Satu token adalah satu kata tertulis lengkap dengan harakat dan klitik. `segments` hanya menerangkan bagian satu kata (misalnya `الْ` + `بَابُ`, atau `رَأَيْ` + `تُ`) dan jumlahnya harus sama dengan teks tokennya. Penjelajah tidak membuat tombol atau sorotan per bagian.
- Setiap analisis memiliki: sumber (label, URL https dan bab atau pelajaran), jenis penggunaan (`independent-original`, `adaptation`, `verbatim`), status `draft` dan batas bukti dalam bahasa Indonesia.
- Hubungan: na‘at–man‘ūt, muḍāf–muḍāf ilaih, jarr–majrūr, mubtada’–khabar, fi‘il–fā‘il, kata ganti–rujukan. Ditambah fi‘il–nā’ib al-fā‘il dan fi‘il–maf‘ūl bih karena contoh pilot memerlukannya. Ujung hubungan dapat berupa beberapa kata (khabar berupa frasa jarr–majrūr). Peran kata dan jenis hubungan diperiksa agar cocok.
- Alasan harakat akhir (`finalVowel`) hanya ada pada isim yang kasusnya didukung anotasi. Fi‘il dan harf tidak diberi alasan harakat akhir, dan analisis mabnī tidak ditebak.
- Isim fā‘il dan isim maf‘ūl memakai catatan sharaf; perannya di kalimat dijelaskan terpisah di `roleReason`.
- Tidak ada parser dan tidak ada contoh baru: unit test memeriksa bahwa teks, glos dan terjemahan setiap anotasi masih sama dengan konten asalnya.

## Inventaris: 18 anotasi

Satu anotasi dapat menjelaskan contoh yang sama di dua halaman (G-01 di `/kaidah/` dan G-03 di `/kaidah/frasa/`). Tiga contoh G-01 memakai anotasi G-03 yang sudah ada.

| ID                         | Teks               | Satuan  | Asal contoh                                                              | Hubungan                       |
| -------------------------- | ------------------ | ------- | ------------------------------------------------------------------------ | ------------------------------ |
| `wc-pintu-terbuka`         | الْبَابُ مَفْتُوحٌ        | kalimat | Pelajaran isim-fiil-harf, kelompok 1, kalimat 1                          | Mubtada’–khabar                |
| `wc-pintu-yang-terbuka`    | الْبَابُ الْمَفْتُوحُ      | frasa   | Pelajaran isim-fiil-harf, kelompok 1, kalimat 2                          | Na‘at–man‘ūt                   |
| `wc-penjaga-membuka`       | فَتَحَ الْحَارِسُ الْبَابَ   | kalimat | Pelajaran isim-fiil-harf, kelompok 2, kalimat 1                          | Fi‘il–fā‘il; Fi‘il–maf‘ūl bih  |
| `wc-pintu-dibuka`          | فُتِحَ الْبَابُ          | kalimat | Pelajaran isim-fiil-harf, kelompok 2, kalimat 2                          | Fi‘il–nā’ib al-fā‘il           |
| `wc-kunci-di-tas`          | الْمِفْتَاحُ فِي الْحَقِيبَةِ | kalimat | Pelajaran isim-fiil-harf, kelompok 3, kalimat 1                          | Jarr–majrūr; Mubtada’–khabar   |
| `ph-kitab-jadid`           | كِتَابٌ جَدِيدٌ          | frasa   | G-03 naat-agreement/indefinite-adjective<br>G-01 nat-manut/sifat-nakirah | Na‘at–man‘ūt                   |
| `ph-kitab-jadid-def`       | الْكِتَابُ الْجَدِيدُ      | frasa   | G-03 naat-agreement/definite-adjective                                   | Na‘at–man‘ūt                   |
| `ph-madrasa-kabira`        | مَدْرَسَةٌ كَبِيرَةٌ        | frasa   | G-03 naat-agreement/feminine-adjective<br>G-01 nat-manut/sifat-feminin   | Na‘at–man‘ūt                   |
| `ph-kutub-jadida`          | كُتُبٌ جَدِيدَةٌ          | frasa   | G-03 naat-agreement/nonhuman-plural                                      | Na‘at–man‘ūt                   |
| `ph-bab-al-bait`           | بَابُ الْبَيْتِ          | frasa   | G-03 idafah-jar/idafah-door<br>G-01 idafah/idafah-pintu                  | Muḍāf–muḍāf ilaih              |
| `ph-fi-al-bait`            | فِي الْبَيْتِ           | frasa   | G-03 idafah-jar/preposition-house                                        | Jarr–majrūr                    |
| `ph-fi-kitab-talib`        | فِي كِتَابِ الطَّالِبِ     | frasa   | G-03 idafah-jar/preposition-idafah                                       | Jarr–majrūr; Muḍāf–muḍāf ilaih |
| `ph-jaa-talib`             | جَاءَ الطَّالِبُ         | kalimat | G-03 perubahan-irab/case-subject                                         | Fi‘il–fā‘il                    |
| `ph-raaytu-talib`          | رَأَيْتُ الطَّالِبَ        | kalimat | G-03 perubahan-irab/case-object                                          | Fi‘il–maf‘ūl bih               |
| `ph-sallamtu-talib`        | سَلَّمْتُ عَلَى الطَّالِبِ    | kalimat | G-03 perubahan-irab/case-preposition                                     | Jarr–majrūr                    |
| `g1-kitab-jadid-khabar`    | الْكِتَابُ جَدِيدٌ        | kalimat | G-01 mubtada-khabar/khabar-buku                                          | Mubtada’–khabar                |
| `g1-madrasa-kabira-khabar` | الْمَدْرَسَةُ كَبِيرَةٌ      | kalimat | G-01 mubtada-khabar/khabar-sekolah                                       | Mubtada’–khabar                |
| `g1-kitab-talib`           | كِتَابُ الطَّالِبِ        | frasa   | G-01 idafah/idafah-buku                                                  | Muḍāf–muḍāf ilaih              |

Pelajaran `isim-fiil-harf` ("Bedah per kata") dianotasi seluruhnya (5 kalimat). Pada G-01 dan G-03 yang dianotasi adalah semua contoh G-01 (6) dan contoh G-03 untuk na‘at, iḍāfah/jarr dan tiga kasus (10). Contoh ma‘rifah/nakirah dan jumlah/gender G-03 tidak diambil karena tidak memiliki hubungan antarkata yang bisa disorot (satu kata) atau memerlukan analisis mutsanna dan jamak salim yang belum disumberkan di sini.

## Sumber dan jenis penggunaan

Semua kalimat adalah contoh tertulis proyek (`independent-original`). Sumber dipakai untuk memeriksa istilah dan kaidah, bukan sebagai asal kalimat atau teks yang disalin.

| Sumber                                                                                                                                                                | Bab atau pelajaran yang dikutip                                                                                                                                                                                                                                     | Cara diperiksa                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Al-Ājurrūmiyyah, Wikisource Arab](https://ar.wikisource.org/wiki/%D8%A7%D9%84%D8%A2%D8%AC%D8%B1%D9%88%D9%85%D9%8A%D8%A9_%D9%81%D9%8A_%D8%A7%D9%84%D9%86%D8%AD%D9%88) | Pembuka (kalām, tanda isim, fi‘il, harf); Bāb ma‘rifat ‘alāmāt al-i‘rāb; Bāb marfū‘āt al-asmā’; Bāb al-fā‘il; Bāb al-maf‘ūl alladhī lam yusamma fā‘iluh; Bāb al-mubtada’ wa-l-khabar; Bāb an-na‘t; Bāb manṣūbāt al-asmā’; Bāb al-maf‘ūl bih; Bāb makhfūḍāt al-asmā’ | Judul bab dan kalimat kunci dibaca langsung dari halaman pada 25 November 2026. |
| [Madinah Arabic, kalimat nominal](https://madinaharabic.com/free-content/grammar/lesson-58/part-1)                                                                    | Grammar Lesson 58, bagian 1                                                                                                                                                                                                                                         | Judul halaman dan istilah mubtada’/khabar dibaca.                               |
| [Madinah Arabic, pelaku](https://madinaharabic.com/free-content/grammar/lesson-64/part-2)                                                                             | Grammar Lesson 64, bagian 2                                                                                                                                                                                                                                         | Judul halaman dibaca.                                                           |
| [Madinah Arabic, aktif dan pasif](https://madinaharabic.com/free-content/grammar/lesson-34/part-1)                                                                    | Grammar Lesson 34, bagian 1                                                                                                                                                                                                                                         | Judul halaman dibaca; halaman memberi contoh pasif, aturannya ditunda.          |
| [Madinah Arabic, iḍāfah](https://madinaharabic.com/free-content/grammar/lesson-5/part-2)                                                                              | Grammar Lesson 5, bagian 2                                                                                                                                                                                                                                          | Istilah muḍāf dan muḍāf ilaih dibaca.                                           |

Kedua sumber sudah dipakai di konten lain proyek; tidak ada sumber baru yang perlu didaftarkan di `data/sources/registry.json` karena registri itu hanya untuk teks kamus ([ADR-004 D-10](../decisions/0004-content-decisions.md)) dan tidak ada teks pihak ketiga yang disalin.

## Batas bukti

Setiap analisis menampilkan batasnya kepada pelajar. Yang belum didukung sumber kutipan:

- Kesesuaian jenis dan jumlah na‘at dengan man‘ūt, kesesuaian jenis khabar dengan mubtada’, dan aturan sifat feminin tunggal untuk jamak benda tidak berakal. Bab an-Na‘t di Al-Ājurrūmiyyah hanya menyebut i‘rab dan ketertentuan. Pernyataan ini ditandai sebagai perlu sumber tambahan.
- Akar dan pola kata (ف ت ح, ح ر س, مَفْعُول, فَاعِل, مِفْعَال) serta istilah isim fā‘il, isim maf‘ūl dan isim alat. Al-Ājurrūmiyyah tidak membahasnya; catatan ini berasal dari pelajaran proyek. Perubahan vokal fi‘il pasif (فَعَلَ → فُعِلَ) didukung bab al-maf‘ūl alladhī lam yusamma fā‘iluh.
- Istilah nā’ib al-fā‘il tidak ada di Al-Ājurrūmiyyah (di sana disebut al-maf‘ūl alladhī lam yusamma fā‘iluh) maupun di halaman Madinah yang dikutip.
- Al-Ājurrūmiyyah memakai istilah khafḍ untuk apa yang di situs ini disebut jarr.
- Muḍāf tidak bertanwin: didukung halaman Madinah 5/2, tidak oleh Al-Ājurrūmiyyah.
- Halaman Madinah dibaca melalui peringkas halaman; kutipan istilah tidak diperiksa dari teks mentah.
- Tidak ada contoh hubungan kata ganti–rujukan: contoh pilot hanya memuat kata ganti pelaku yang melekat pada fi‘il (رَأَيْتُ, سَلَّمْتُ) tanpa rujukan di teks yang sama. Tipenya ada di kontrak dan diuji dengan data uji, tetapi belum dipakai pada materi.
- Konten tetap `draft`. Tinjauan ustadz dilakukan sekali dari awal sampai akhir (D-9).

## Tinjauan subagen Fable (25 November 2026)

Subagen Fable meninjau semua anotasi (analisis nahwu, harakat, glos, terjemahan, alasan harakat akhir) terhadap sumber di atas. Ia **tidak** menemukan peran, hubungan, kasus atau harakat yang salah.

**Yang diperiksa (putaran pertama):** harakat 48 bentuk Arab berbeda berdasarkan titik kode (token, bagian, akar, pola, kata yang dikutip di catatan); peran, `partOf`, `alsoRoles`, tipe dan arah hubungan untuk 15 anotasi pada saat tinjauan; kasus dan tanda harakat akhir, termasuk bahwa hanya isim yang memiliki alasan harakat akhir; catatan sharaf agar tidak memberi peran dari nama bentuk; alasan jenis kata terhadap tanda isim, fi‘il dan harf Al-Ājurrūmiyyah; segmentasi رَأَيْ + تُ dan سَلَّمْ + تُ; kesesuaian teks, glos dan terjemahan dengan `word-classes.ts` dan `phrase-rules.ts`; bab-bab Al-Ājurrūmiyyah di atas dan empat pelajaran Madinah.

**Yang diubah setelah tinjauan:**

- Penanda alasan jenis kata untuk fi‘il kini memakai tanda dari Al-Ājurrūmiyyah (قَدْ dan تْ penanda feminin), bukan alasan makna.
- Pernyataan jenis dan jumlah pada na‘at الْمَفْتُوحُ diganti dengan batas yang jujur; batas serupa ditambahkan pada contoh feminin dan jamak benda tidak berakal.
- Lokator ditambah: Bāb marfū‘āt al-asmā’, Bāb manṣūbāt al-asmā’, Bāb ma‘rifat ‘alāmāt al-i‘rāb dan Bāb al-fā‘il di anotasi yang bergantung padanya. Catatan istilah khafḍ, catatan sharaf dan catatan nā’ib al-fā‘il ditambahkan ke batas bukti.
- Catatan segmen: artikel ال pada huruf syamsiyah diterangkan lamnya tidak dibaca; catatan batang رَأَى dan سَلَّمَ; kata ganti تُ diberi keterangan ḍamīr muttaṣil sebagai fā‘il.
- Ejaan seragam: “khabar tempat”, “harf jarr”, “tanwīn ḍammah”, “rafa‘”. Alasan isim muḍāf kini menyebut tanda isim yang nyata (dapat menerima tanwin dan الْـ). Alasan isim majrūr tidak lagi menyebut “bukan fā‘il atau objek”.

**Disarankan tetapi tidak diubah:**

- Terjemahan lesson “Penjaga membuka pintu itu.” dan “Kunci itu ada di dalam tas.” dibandingkan glos “penjaga itu” dan “tas itu”; usulan menambah “itu”. Terjemahan berasal dari konten pelajaran yang sudah ada dan tetap dibandingkan oleh uji, jadi tidak diubah di PR ini.
- Glos فِي “di” pada `ph-fi-kitab-talib` berbeda dari terjemahan “Di dalam”; glos mengikuti konten G-03.
- Pola مَفْعُول, فَاعِل, مِفْعَال ditulis tanpa tanwin mengikuti pelajaran yang ada; Fable menyatakan keduanya dapat diterima.

**Tinjauan kedua (hari yang sama).** Setelah perbaikan di atas dan penambahan tiga anotasi G-01 baru (`g1-*`), Fable meninjau ulang versi terbaru: tiga anotasi baru, kalimat yang berubah dan semua teks `limitNotes`. Hasilnya: peran, hubungan, kasus dan harakat benar. Tiga perbaikan lanjutan sudah diterapkan:

- Batas bukti `g1-madrasa-kabira-khabar` kini menyebut kesesuaian jenis khabar dan mubtada’ (bukan na‘at, yang tidak ada di kalimat itu).
- Catatan batang رَأَى diperjelas: di depan تُ, alif akhirnya kembali menjadi يْ (ya bersukun).
- Catatan sharaf tidak lagi mengatakan sumber tidak membahas sharaf sama sekali, karena Bāb al-maf‘ūl alladhī lam yusamma fā‘iluh menyebut perubahan vokal fi‘il pasif.

Satu usulan opsional tidak diambil: menambahkan contoh فَتَحَتْ pada alasan jenis kata fi‘il, agar tidak menambah bentuk yang tidak berasal dari konten yang ada. Ejaan “topik kalimat nominal” diseragamkan pada anotasi G-01. Halaman Madinah 34/1 dan 58/1 masih dibaca melalui peringkas, bukan teks mentah.

## Pekerjaan terbuka

- Tinjauan ustadz atas seluruh jalur (D-9) dan sumber tambahan untuk kesesuaian na‘at.
- Uji pengguna: apakah pelajar dapat menjelaskan peran dan alasannya tanpa bantuan warna (rencana §6, VP-05).
- Uji perangkat nyata: Safari iOS dan Android untuk sambungan huruf dan harakat pada kata yang disorot. Pada Chromium desktop yang diuji, sorotan tidak mengubah lebar, tinggi, padding, border atau arah.
- Pilihan “Tanpa warna peran” belum disimpan di perangkat; tersimpan hanya selama halaman terbuka.
