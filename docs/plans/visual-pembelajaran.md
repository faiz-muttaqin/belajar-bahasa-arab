# Visual pembelajaran: peran kata, perubahan bentuk dan cakupan

**15 November 2026 · Rencana atas arahan pemilik · Belum diimplementasikan**

Visual membantu pelajar menjawab pertanyaan konkret: kata ini bertugas sebagai apa, apa yang berubah ketika bentuknya diganti, dan materi mana yang sudah dipelajari. Rencana ini memakai anotasi, contoh dan kompetensi yang sudah ada; pengayaan berikutnya ditulis dari sumber yang tercatat menurut [ADR-004 D-9](../decisions/0004-content-decisions.md#d-9-sumber-dulu-tinjauan-ustadz-di-akhir).

## 1. Posisi sekarang dan urutan kerja

- G-01 sampai G-05 sudah memiliki glos, warna dan label peran. D-05a sudah mengganti sebagian contoh G-01/G-03 dengan bingkai sumber yang utuh. [Rencana dinamis](./dynamic-example-slots.md).
- Pelajaran dan bacaan sudah memiliki bedah per kata; belum ada penjelajah peran yang terhubung langsung dengan kata pada seluruh teks. [Daftar materi](../content/public-lessons.md#bedah-per-kata).
- RM-02 menyiapkan 33 kompetensi, 29 pelajaran dan 27 langkah sebagai dasar data peta. RM-03 sudah membangun peta statis; RM-04 menyimpan posisi; RM-05 menyimpan bukti jawaban. [Peta belajar](./peta-belajar.md).
- F-16 sudah menyediakan panduan 11 bentuk tashrif dan klasifikasi isim/fi‘il lewat PR #37. Bentuk kata dan tugasnya dalam kalimat tetap dijelaskan sebagai dimensi berbeda.

| ID    | Pekerjaan                                                            | Ketergantungan                             | Selesai ketika                                                                                                                                                                                                        |
| ----- | -------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VP-01 | Kontrak anotasi dan audit contoh pilot                               | RM-02; data bedah kata dan D-05a           | ID kalimat/token/relasi stabil, setiap analisis punya sumber dan jenis penggunaan; inventaris contoh pilot beserta batas buktinya tercatat. Belum membuat parser atau contoh baru tanpa sumber.                       |
| VP-02 | Penjelajah peran kata pada pelajaran jenis kata dan contoh G-01/G-03 | RM-03, VP-01                               | Ketuk atau fokus kata menampilkan glos, posisi dalam urutan baca dan alasan perannya; pasangan yang berhubungan ikut tersorot. Label, legenda dan mode tanpa warna tersedia. Uji keyboard, RTL, no-JS dan tema lulus. |
| VP-03 | Perubahan bentuk dan hubungan kata secara bertahap                   | VP-02, pasangan contoh terkurasi dari D-05 | Pelajar mengendalikan langkah sebelum/sesudah dan membaca alasan setiap perubahan. Tidak ada putar otomatis; mode gerak berkurang menyajikan informasi setara.                                                        |
| VP-04 | Grafik cakupan per tahap dan ringkasan bukti                         | RM-04 untuk posisi; RM-05 untuk bukti      | Grafik memakai hitungan dan penyebut dari katalog, disertai teks/tabel. Membuka atau menyelesaikan pelajaran tidak menaikkan tingkat pemahaman. Tanpa rekaman jawaban tampil “Belum ada bukti latihan”.               |
| VP-05 | Pengayaan materi dan uji pemahaman                                   | VP-02/03; RM-06 untuk soal titik cek       | Contoh pembanding, pengecualian dan soal transfer baru mencatat sumber per butir. Pemilik lalu peserta RM-07 membandingkan pemahaman dengan dan tanpa bantuan visual. Hasil dicatat, bukan diasumsikan dari animasi.  |

RM-02 tetap perubahan data saja. RM-03 selesai; tugas implementasi berikutnya adalah RM-04. VP-01 dapat diaudit sekarang sebelum memperluas UI peran kata. RM-04 dan RM-05 tetap memakai penyimpanan yang direncanakan, tanpa schema progres kedua.

## 2. Ketuk kata untuk memahami posisinya

Tampilkan kalimat Arab utuh dalam urutan kanan ke kiri. Pelajar memilih satu lapisan penjelasan: **jenis kata**, **peran dalam kalimat**, atau **bentuk sharaf**. Jangan menyalakan semua lapisan sekaligus. “Kata ke-2 dalam urutan baca” adalah posisi tampilan; peran nahwu berasal dari anotasi kalimat, bukan ditebak dari nomor kata.

Saat kata dipilih, panel di dekat teks menjelaskan:

1. Kata dan glos Indonesianya, lalu terjemahan alami kalimat lengkap.
2. Label seperti mubtada, khabar, fā‘il atau maf‘ūl bih, dengan penjelasan singkat dalam bahasa Indonesia.
3. Kata atau rentang yang berhubungan, misalnya na‘at–man‘ūt, muḍāf–muḍāf ilaih, jar–majrūr, atau kata ganti–rujukannya.
4. Alasan harakat akhirnya bila anotasi sumber memang mendukungnya; bentuk mabnī dan analisis ambigu dijelaskan sesuai batas buktinya.
5. Tautan kaidah, sumber dan status draf. Isim fā‘il sebagai bentuk turunan tidak otomatis diberi peran fā‘il.

Warna peran harus konsisten, tetapi selalu disertai label atau penanda bentuk dan legenda. Sediakan pilihan “Tanpa warna peran”. Warna pengajaran merupakan pengecualian terbatas pada aturan satu aksen [taste.md](../design/taste.md), bukan perubahan palet navigasi. Uji kontras tema terang/gelap sebelum menetapkan token warna.

Anotasi memakai ID stabil pada kalimat, kata dan hubungan. Pertahankan teks Arab asli beserta harakat dan klitik; pemenggalan visual tidak mengubah kata tersambung menjadi beberapa kata baru. Sorotan huruf hanya mengubah warna/latar span di dalam teks, tanpa padding, border, perubahan arah atau spasi antarglif. Relasi kalimat panjang dapat berupa pasangan sorotan dan daftar penjelasan di ponsel; panah graf hanya dipakai bila tetap terbaca.

Tanpa JavaScript, kalimat, glos, label, alasan dan sumber tetap tersedia dalam HTML, misalnya melalui `details` dan daftar berurutan. Interaksi fokus/ketuk menghubungkan informasi yang sama, tanpa mengharuskan hover. Pembaca layar mendapat nama kata dan label peran; fokus tetap terlihat dan dikembalikan dengan benar setelah panel ditutup.

## 3. Animasi yang menjelaskan perubahan

Pilot memakai pasangan contoh yang sudah ada: frasa sifat dibandingkan dengan kalimat nominal, perubahan kasus setelah huruf jar, dan bentuk aktif dibandingkan dengan pasif. Setiap pasangan harus memiliki anotasi lengkap dan sumber; jangan membuat hasil derivasi dari seluruh kamus secara otomatis.

Pelajar memilih “Lihat perubahan”, lalu bergerak dengan “Sebelumnya”, “Berikutnya” dan “Ulangi”. Tunjukkan satu perubahan beserta alasannya, termasuk kata lain yang ikut berubah. Kontrol “Hentikan” tersedia bila ada rangkaian yang sedang diputar. Teks sumber tetap dapat dipilih dan dibaca; animasi tidak memindahkan huruf satu per satu atau menutupi harakat.

Gunakan CSS/Svelte yang sudah ada dengan transisi singkat sesuai taste.md. Tidak menambah library animasi atau graf. Tidak ada loop, autoplay, efek dekoratif atau gerak karena scroll. Dengan `prefers-reduced-motion`, perubahan langsung menuju keadaan akhir; langkah, sorotan dan penjelasannya tetap bisa diperiksa satu per satu.

## 4. Grafik cakupan yang dapat diperiksa

Grafik utama berupa batang per tahap dengan label hitungan, misalnya “2 dari 5 langkah selesai”, beserta rincian Belum dimulai, Sedang dipelajari, Selesai dan Dilewati. Jumlah dan penyebut berasal dari data peta dan revisi pelajaran kini. Iqra, cabang opsional dan materi direncanakan dipisahkan dari penyebut jalur utama.

Ringkasan pemahaman ditampilkan terpisah setelah RM-05 tersedia, berdasarkan jawaban dan segi kemampuan. Penilaian diri diberi label. Sebuah kompetensi dihitung pada tempat utamanya saja meski digunakan di beberapa pelajaran. Grafik tidak memakai persentase penguasaan, penyetaraan CEFR atau klaim cakupan Al-Qur’an. Perhitungan token/lema Al-Qur’an, bila kelak diperlukan, merupakan riset RS-03 dengan metodologi dan sumber tersendiri.

Setiap grafik mempunyai judul, kalimat ringkas dan tabel/list angka yang setara; seluruhnya dapat dibaca tanpa warna. Sebelum hidrasi, halaman menampilkan struktur peta dan penjelasan bahwa status berasal dari perangkat ini. Jangan menampilkan angka nol seolah progres sudah dibaca dari IndexedDB.

## 5. Pengayaan dari sumber

Pekerjaan ini memprioritaskan penjelasan alasan, contoh pembanding dan pengecualian pada materi yang sudah dipetakan. Untuk setiap tambahan, catat: ID stabil dan revisi, kompetensi, sumber spesifik (bab/halaman/URL), jenis penggunaan, status lisensi, register, contoh/glos/terjemahan, analisis peran dan status tinjauan. Tambahkan baris atau rincian materi pada [tracker](../content/tracker.md) saat butir dibuat atau berpindah tahap.

Rujukan berikut telah diperiksa pada 15 November 2026; digunakan untuk konsep dan penjelasan asli proyek, bukan izin menyalin teks, soal, ilustrasi atau dataset:

| Sumber                                                                                                                                                                          | Pemakaian dan batas                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Al-Ājurrūmiyyah](https://ar.wikisource.org/wiki/الآجرومية_في_النحو)                                                                                                            | Pembagian kata, i‘rab, fā‘il dan mubtada–khabar. Rujuk bab untuk tiap anotasi; jangan menyamakan bentuk kata dan fungsi.                                                                     |
| [Madinah Arabic: kalimat nominal](https://madinaharabic.com/free-content/grammar/lesson-58/part-1) dan [iḍāfah](https://madinaharabic.com/free-content/grammar/lesson-5/part-2) | Silang uji hubungan kata dan kontras untuk pilot. Contoh serta penjelasan Indonesia ditulis independen.                                                                                      |
| [Quranic Arabic Corpus: dependency graphs](https://corpus.quran.com/documentation/dependencygraph.jsp)                                                                          | Rujukan representasi hubungan antarkata, segmen dan frasa. Khusus register Qur’ani; tidak otomatis dipakai sebagai analisis MSA. Tidak mengimpor dataset, gambar atau ayat dari halaman ini. |
| [Riset pedagogi proyek §4, §6, §7](../arabic-learning-pedagogy-ux-research-reissued.md)                                                                                         | Dasar segmentasi, visual yang relevan, pengurangan bantuan dan uji transfer. Manfaat interaksi yang diusulkan masih hipotesis produk yang perlu diuji.                                       |
| [W3C Arabic Layout Requirements](https://www.w3.org/International/alreq/)                                                                                                       | Arah teks, sambungan huruf dan harakat; sorotan tidak boleh memutus sambungan atau merusak penempatan tanda.                                                                                 |
| [WCAG: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)                                                                                             | Informasi tetap tersampaikan melalui teks/bentuk selain warna.                                                                                                                               |
| [WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)                                                               | Gerak nonesensial bisa dimatikan; sumber ini Level AAA, dipakai sebagai kebijakan gerak proyek, bukan klaim sudah memenuhi semua AAA.                                                        |

Semua materi baru boleh dipakai sebagai draf bersumber menurut D-9. Tinjauan ustadz/pengajar dilakukan sekali dari awal sampai akhir sebelum status `approved`. Lisensi, izin, teks Al-Qur’an dan audio tetap mengikuti gerbang masing-masing.

## 6. Bukti penerimaan tiap PR visual

- Build statis memuat teks, anotasi dan sumber tanpa JS; tidak menambah backend, database, inferensi atau dependency baru.
- Uji pada lebar 320, 390, 768 dan 1440 px, tema terang/gelap/sistem, keyboard, pembaca layar dan gerak berkurang; tidak bergantung hover dan tidak menggeser halaman secara horizontal.
- Uji harakat bertumpuk, shadda, sukun dan hamza pada beberapa ukuran; utamakan kata utuh dan periksa sambungan pada perangkat Android serta Safari iOS saat tersedia.
- Uji navigasi SvelteKit, back/forward dan fokus setelah panel ditutup. Pemilihan contoh memperbarui glos, terjemahan dan relasi secara bersamaan sesuai data terkurasi.
- Uji soal baru tanpa warna atau sorotan sesudah latihan berbantuan. Catat apakah pelajar dapat menjelaskan peran dan alasan, bukan hanya mengingat warnanya.

## Catatan implementasi terverifikasi — 17 November 2026

**Status plan keseluruhan: PLANNED**, bukan otomatis selesai karena PR pilot sudah merged. Audit lintas sebelas dokumen: [matriks status implementasi](./IMPLEMENTATION_STATUS.md).

**Sudah terlihat di kode:** `src/lib/components/learning/SentenceBreakdown.svelte`, `src/lib/domain/roadmap/presentation.ts`. Ini bukti keberadaan implementasi, **bukan** audit benar-salah kaidah atau hasil uji pengguna.

**Belum terpenuhi:** VP-01–05 belum selesai sebagai paket: ID relasi/bukti, word-role explorer interaktif, mode tanpa warna, animasi bertahap, grafik capaian dan uji pengguna.

**Tindak lanjut:** [issue #52](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/52). Setiap PR lanjutan wajib menyebut sub-deliverable yang diselesaikan dan kriteria yang masih terbuka.

## Catatan implementasi VP-01 dan VP-02 — 25 November 2026

**Sub-deliverable yang dikerjakan:** VP-01 (kontrak anotasi dan audit contoh pilot) dan VP-02 (penjelajah peran kata). VP-03 sampai VP-05 belum.

**Selesai:**

- Kontrak: `src/lib/domain/grammar/annotation.ts` (ID kalimat, kata dan hubungan; sumber, jenis penggunaan dan status `draft` per analisis; enam jenis hubungan ditambah fi‘il–nā’ib al-fā‘il dan fi‘il–maf‘ūl bih) dengan uji unit. Lapisan dan warna: `annotation-layers.ts`, kontras token teks diuji untuk tema terang dan gelap bawaan.
- Data pilot: 18 anotasi dari contoh yang sudah ada (pelajaran `isim-fiil-harf`, G-01 di `/kaidah/`, G-03 di `/kaidah/frasa/`). Inventaris, sumber, batas bukti dan hasil tinjauan Fable: [vp01-annotation-pilot.md](../data/vp01-annotation-pilot.md).
- Komponen `WordRoleExplorer.svelte` (dengan `WordRolePanel` dan `WordRoleDetails`): satu lapisan sekali tampil (jenis kata, peran, bentuk sharaf), panel ketuk/fokus, sorotan pasangan, legenda, “Tanpa warna peran”, fokus kembali ke kata saat panel ditutup (tombol Tutup atau Escape). Tanpa JavaScript, kalimat, glos, label, alasan dan sumber tetap ada dalam `details` dan daftar berurutan.
- Uji Playwright: keyboard, ganti lapisan, tanpa warna, sorotan tanpa mengubah ukuran/spasi/arah, RTL, kontras terang/gelap di halaman nyata, tanpa JS, dan tidak ada luapan horizontal pada 320, 390, 768 dan 1440 px.

**Belum terpenuhi:** uji pengguna dan perbandingan dengan/tanpa bantuan visual (VP-05); uji Safari iOS dan Android nyata; sumber tambahan untuk kesesuaian na‘at; tinjauan ustadz atas seluruh jalur; penyimpanan pilihan “Tanpa warna peran” di perangkat; contoh kata ganti–rujukan. Status keseluruhan tetap diperbarui oleh sesi utama setelah merge.
