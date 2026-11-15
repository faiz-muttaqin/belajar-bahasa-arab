# Peta belajar: posisi dan tingkat pemahaman

**15 November 2026 · Rencana untuk ditinjau pemilik produk · Belum ada kode**

Pelajar perlu melihat tiga hal dalam satu halaman: jalur yang akan dilalui, posisinya sekarang, dan seberapa jauh ia sudah paham. Rencana ini meminjam pola peta dari [roadmap.sh](https://roadmap.sh/) dan menyesuaikannya untuk orang dewasa Indonesia yang belajar lewat ponsel, tanpa akun, dengan data yang hanya tersimpan di browser.

Rencana ini tidak membuat kurikulum baru. Isi peta diambil dari [graf kompetensi](../curriculum/COMPETENCY_GRAPH.md), [roadmap pasca-Iqra](../curriculum/ROADMAP.md), dan [daftar pelajaran publik](../content/public-lessons.md). Semua kompetensi dan urutan masih berstatus draf dan menunggu tinjauan guru (ADR-004 D-7).

## 1. Yang sudah ada

| Bagian                                                     | Keadaan di `main` (`a97d465`)                                                                                                                                                 | Dipakai untuk peta                                                         |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Graf kompetensi](../curriculum/COMPETENCY_GRAPH.md)       | 30 node (CA, CB, CR) dengan prasyarat `hard`, `soft`, `optional`; unit U1 sampai U10; invarian bahwa urutan unit tidak boleh melawan prasyarat. Hanya ada sebagai Markdown.   | Sumber node, prasyarat dan kalimat "saya bisa". Perlu dipindah ke data TS. |
| [Roadmap pasca-Iqra](../curriculum/ROADMAP.md)             | Urutan kerja P0 sampai P2 dan lima tahap hasil belajar (Kenali makna sampai Coba situasi baru) dengan uji penerimaan.                                                         | Lima hasil itu menjadi titik cek di akhir tahap peta (bagian 4).           |
| [Spesifikasi onboarding](../curriculum/ONBOARDING_SPEC.md) | Cek kesiapan opsional. Aturan O-8: tanpa level CEFR, persentase, atau kata lulus/gagal. Aturan O-9: penguasaan butuh dua kesempatan dengan soal baru.                         | Aturan bahasa dan bukti untuk tingkat pemahaman.                           |
| Riset pedagogi §6.1 dan §6.2                               | Jangan memakai satu ukuran penguasaan. Gate keras hanya bila dependensinya nyata. Urutan adalah rekomendasi, bukan kunci.                                                     | Dasar pemisahan status dan bukti.                                          |
| Katalog pelajaran `src/lib/content/lessons/`               | 6 pelajaran Iqra dan 23 pelajaran jalur utama. Tiap pelajaran punya `id`, `revision`, `level` (Fondasi, Dasar, Menengah) dan `competencies`.                                  | Langkah peta menautkan pelajaran lewat ID, bukan slug.                     |
| Progres `src/lib/progress/`                                | IndexedDB `belajar-bahasa-arab-progres`, store `lessons`: `lastOpenedAt` dan `completedRevision`. `/progres/` menampilkan "Lanjut belajar", ekspor dan impor JSON (schema 1). | Posisi pelajar. Belum ada catatan jawaban latihan.                         |
| Latihan makna (`MeaningPractice`)                          | Hanya di pelajaran U1: dua soal pilihan, soal kedua memakai contoh baru dengan pola yang sama. Jawaban tidak disimpan.                                                        | Sumber bukti pertama setelah jawaban disimpan.                             |
| Latihan lain                                               | Pembahasan yang dibuka sendiri. Tidak ada input jawaban.                                                                                                                      | Hanya bisa menjadi penilaian diri, diberi label sebagai penilaian diri.    |
| Pendalaman                                                 | `/kaidah/` (frasa, kalimat, klausa, sharaf, praktik), `/rujukan/` (jenis kata, 22 wazan), `/kosakata/`.                                                                       | Cabang opsional di peta, tidak pernah mengunci langkah.                    |
| [Peta nahwu–sharaf](./nahwu-sharaf-knowledge-map.md) G-06  | Merencanakan "peta prasyarat" untuk kaidah.                                                                                                                                   | Pakai data prasyarat yang sama, jangan membuat dua graf.                   |

Kesimpulan: data untuk posisi sudah ada. Data untuk tingkat pemahaman belum ada, karena jawaban latihan belum disimpan dan sebagian besar latihan belum punya input jawaban.

## 2. Yang diambil dari roadmap.sh

Diamati di [roadmap.sh/frontend](https://roadmap.sh/frontend) pada 15 November 2026:

- **Legenda** di awal peta: rekomendasi, pilihan alternatif, dan "urutan tidak ketat".
- **Node bisa diketuk.** Panel samping memuat penjelasan singkat, sumber belajar, dan tiga tombol status: Learning, Done, Skip.
- **Jalur utama vertikal** dengan cabang topik di kiri dan kanan.
- Di layar 375 px, diagram yang sama diperkecil sampai teksnya tidak terbaca.

| Diambil                                        | Disesuaikan                                                                                                        | Tidak diambil                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Satu halaman yang memperlihatkan seluruh jalur | Di ponsel memakai daftar bertahap vertikal, bukan diagram yang diperkecil.                                         | Akun, login, berbagi ke media sosial                   |
| Legenda jalur utama dan opsional               | Kata Indonesia: "Jalur utama", "Opsional", "Direncanakan".                                                         | Iklan, sumber berbayar, tutor AI                       |
| Panel detail per node                          | Dialog bawaan (`<dialog>`) yang sudah dipakai situs, berisi "Yang akan Anda bisa", pelajaran, dan prasyarat.       | Status yang hanya ditandai sendiri tanpa bukti latihan |
| Tombol status                                  | Status posisi terpisah dari bukti pemahaman (bagian 3). "Lewati" berarti pelajar merasa sudah bisa, bukan "paham". | Persentase sebagai ukuran utama                        |

## 3. Dua ukuran yang dipisah

Ukuran tunggal seperti "60% selesai" mencampur "sudah membuka" dengan "sudah paham". Rencana ini memisahkannya, sesuai riset §6.1 dan aturan O-8 dan O-9.

### 3.1 Posisi di jalur (per langkah)

| Status            | Asal                                                                   | Tampilan                  |
| ----------------- | ---------------------------------------------------------------------- | ------------------------- |
| Belum dimulai     | Tidak ada catatan                                                      | Lingkaran kosong + teks   |
| Sedang dipelajari | Salah satu pelajaran langkah ini pernah dibuka                         | Setengah lingkaran + teks |
| Selesai           | Semua pelajaran wajib di langkah ini ditandai selesai pada revisi kini | Centang + teks            |
| Dilewati          | Pelajar memilih "Saya sudah bisa, lewati"                              | Panah lompat + teks       |

"Anda di sini" diletakkan pada langkah yang memuat pelajaran dari "Lanjut belajar" (`summarizeProgress`). Pengunjung baru melihatnya pada langkah pertama jalur utama, dengan Fondasi Iqra sebagai cabang opsional.

### 3.2 Tingkat pemahaman (per kompetensi)

Label ditulis dari sudut pandang hal yang bisa diamati. Ambang di bawah adalah kebijakan produk awal yang diuji pada pilot, bukan angka ilmiah.

| Tingkat | Label                 | Bukti minimum (usulan)                                                                                    |
| ------- | --------------------- | --------------------------------------------------------------------------------------------------------- |
| 0       | Belum ada bukti       | Belum mencoba latihan kompetensi ini.                                                                     |
| 1       | Mengenal              | Sudah mencoba, dengan bantuan atau jawaban belum tepat.                                                   |
| 2       | Paham pada contoh     | Benar tanpa bantuan pada soal dari pelajaran.                                                             |
| 3       | Bisa pada contoh baru | Benar tanpa bantuan pada soal yang ditandai sebagai contoh baru, misalnya soal kedua `MeaningPractice`.   |
| 4       | Melekat               | Tingkat 3 pada dua kesempatan berbeda, berjarak minimal satu hari. Kelak dapat diambil dari ulangan F-09. |

Penilaian diri ("Jawaban saya cocok dengan pembahasan") paling tinggi menaikkan ke tingkat 2 dan ditampilkan dengan keterangan "menurut penilaian Anda". Tingkat turun kembali dari 4 ke 3 bila ulangan terakhir salah.

### 3.3 Tingkat keseluruhan

Ringkasan di `/progres/` memakai kalimat, bukan persen:

> Anda sedang di **Tahap 3 · Tempat, milik, dan kata ganti** (tingkat Dasar). Di tahap ini, 2 dari 5 kemampuan sudah "Bisa pada contoh baru".

Label Fondasi, Dasar, dan Menengah sudah dipakai pelajaran. Level CEFR atau ACTFL tidak ditampilkan karena penyetaraan memerlukan uji tersendiri ([ROADMAP](../curriculum/ROADMAP.md), O-8). Jumlah ditulis sebagai hitungan ("2 dari 5"), yang lebih jujur daripada persen ketika jumlah butir per kompetensi berbeda.

## 4. Susunan peta

Peta memiliki empat lapis: **tahap** (bagian besar), **langkah** (kira-kira satu unit), **kompetensi** (node graf), dan **pelajaran** (halaman yang sudah ada). Pelajaran yang memuat beberapa kompetensi ditaruh di langkah kompetensi pertamanya. Kompetensi lainnya tetap mendapat bukti dari pelajaran itu.

| Tahap                              | Langkah dan pelajaran                                                          | Kompetensi                             | Titik cek di akhir tahap (dari ROADMAP)         |
| ---------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- | ----------------------------------------------- |
| Fondasi membaca (opsional, Iqra)   | A1-01, A2-01 sampai A2-03, A3-01, A4-01                                        | CA-02 sampai CA-06                     | Membaca kalimat pendek berharakat (CA-05)       |
| 1 · Makna pertama                  | U1-01 Kata inti shalat                                                         | CB-01                                  | 1. Kenali makna                                 |
| 2 · Benda dan pertanyaan           | U2-01 Menunjuk dan bertanya · U3-01 Benda tertentu · U3-02 Isim, fi‘il, harf   | CB-03 sampai CB-06, CB-16              | 2. Tanya dan jawab                              |
| 3 · Tempat, milik, dan kata ganti  | U4-01 · U5-01 · U6-01 · U7-01 · U8-01                                          | CB-07 sampai CB-12                     | (belum ada; usulan: tugas baca pesan 2 kalimat) |
| 4 · Siapa melakukan apa            | U9-01 sampai U9-06                                                             | CB-13 sampai CB-15, CB-17 sampai CB-19 | 3. Pahami pesan (bagian baca)                   |
| 5 · Dari kalimat ke paragraf       | U10-01 · U11-01 sampai U11-06                                                  | CB-22 sampai CB-24                     | 4. Temukan inti bacaan                          |
| 6 · Uji dengan teks baru           | U12-01 Uji membaca dokumen                                                     | CB-21, CB-24                           | 5. Coba situasi baru                            |
| Cabang · Percakapan (direncanakan) | Belum ada pelajaran. Tampil dengan label "Direncanakan" dan tidak bisa dibuka. | CB-20                                  | 3. Berkenalan (bagian lisan)                    |
| Cabang · Pendalaman (opsional)     | `/kaidah/` G-01 sampai G-05, `/rujukan/`, `/kosakata/`                         | CR-01 sampai CR-03                     | Tidak ada; tidak pernah mengunci                |

Catatan untuk peninjau:

- Pelajaran U9-03 mencantumkan CB-20, tetapi tugasnya membaca klausa. Peta memasukkan CB-20 ke cabang Percakapan dan membiarkan U9-03 di Tahap 4, sesuai temuan [audit UX](../research/2026-11-15-ux-pasca-iqra.md).
- Tahap 3 belum punya titik cek. Tahap ini bisa memakai tugas pesan 2 sampai 3 kalimat dari ROADMAP P1 · 5.
- Prasyarat di graf hampir semuanya `soft`. Peta menampilkannya sebagai "Disarankan dulu" dengan tombol "Lanjut saja", sehingga tidak ada langkah yang dikunci.

## 5. Tampilan

**Ponsel (utama).** Satu kolom. Tiap tahap adalah judul dengan satu kalimat "Setelah tahap ini Anda bisa ...". Langkah tampil sebagai kartu bertanda garis vertikal, berisi judul, perkiraan menit, status dalam teks dan ikon, serta tingkat pemahaman ringkas. Cabang opsional ada di bawah tahap terkait sebagai kartu bergaris putus-putus. Penanda "Anda di sini" tampil di atas kartu dan ada tombol "Ke posisi saya".

**Detail langkah.** Ketuk kartu untuk membuka dialog bawaan berisi: yang akan Anda bisa, pelajaran (tautan), kompetensi beserta tingkatnya, prasyarat yang disarankan, rujukan terkait, dan tombol "Sedang saya pelajari", "Saya sudah bisa, lewati", serta "Hapus tanda". Istilah Arab (misalnya iḍāfah) hanya muncul di dialog, dalam `lang="ar"` bila ditulis dengan huruf Arab.

**Desktop.** Peta di kolom kiri, ringkasan posisi tetap di kolom kanan. Tampilan graf prasyarat dua dimensi bisa ditambahkan kelak sebagai SVG statis yang dibangun saat build, bersama G-06. Tidak perlu library graf baru.

**Aksesibilitas dan gaya.** Daftar bernomor (`<ol>`) dengan judul bertingkat; status tidak hanya ditandai warna; target ketuk minimal 44 px; mendukung tema terang, gelap dan sistem; mengikuti `prefers-reduced-motion`; tanpa streak, konfeti atau maskot ([taste.md](../design/taste.md)).

**Tanpa JavaScript.** Seluruh peta, legenda dan tautan pelajaran ada di HTML statis. Status dan tingkat ditambahkan setelah hidrasi dari IndexedDB. Jika penyimpanan tidak tersedia, satu kalimat menjelaskan bahwa progres tidak tersimpan di perangkat ini.

**Lokasi halaman (perlu keputusan).** Usulan: `/belajar/` menjadi peta, menggantikan daftar datar yang sekarang, karena daftar itu sudah menjadi tempat memilih pelajaran. `/progres/` menampilkan ringkasan bagian 3.3 dan tautan ke peta. Pilihan lain adalah halaman baru `/peta-belajar/`, tetapi itu menambah satu menu.

## 6. Data dan penyimpanan

- `src/lib/content/competencies.ts`: node dari graf kompetensi (ID, judul, kalimat "saya bisa", prasyarat beserta kekuatannya, `reviewStatus: 'draft'`). Markdown graf tetap menjadi dokumen alasan.
- `src/lib/content/roadmap.ts`: tahap, langkah, cabang, titik cek; merujuk ID pelajaran dan ID kompetensi.
- `src/lib/domain/roadmap/`: fungsi murni `stepStatus`, `competencyLevel`, `currentStage`, `summarizeRoadmap`, beserta uji unit.
- Validator saat build: setiap pelajaran publik berada di tepat satu langkah; setiap ID kompetensi di pelajaran ada di data; urutan langkah tidak melawan prasyarat `hard` (invarian I-5); cabang direncanakan tidak menautkan halaman yang tidak ada.
- IndexedDB versi 2 dengan migrasi dari versi 1:
  - store `marks`: `{ stepId, mark: 'learning' | 'skipped', at }`
  - store `attempts`: `{ id, itemId, lessonId, contentRevision, competencyIds, outcome: 'correct' | 'incorrect' | 'dont_know', assisted, novel, selfAssessed, at }`
- Cadangan JSON schema 2 berisi `lessons`, `marks` dan `attempts`. File schema 1 tetap bisa diimpor.
- Tidak menyimpan teks jawaban bebas, nama, atau data lain yang tidak perlu (ONBOARDING §6). Semuanya tetap di browser.

## 7. Pertimbangan ulang rencana yang ada

| Dokumen                                                      | Perubahan yang diusulkan                                                                                                                                   |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ROADMAP](../curriculum/ROADMAP.md)                          | Lima tahap hasil tetap menjadi tujuan. Peta memakai tahap berbasis unit dan menempatkan kelima hasil sebagai titik cek. Tautan ke rencana ini ditambahkan. |
| [Graf kompetensi](../curriculum/COMPETENCY_GRAPH.md)         | Tetap menjadi sumber alasan. Saat RM-02, node dan edge dipindah ke data TS dan validator memeriksa invarian. CB-22 sampai CB-24 masuk hitungan graf.       |
| [Onboarding](../curriculum/ONBOARDING_SPEC.md)               | Hasil cek kesiapan menjadi bukti tingkat 1 atau 2 untuk kompetensi yang diuji, tidak pernah tingkat 3 ke atas (O-9).                                       |
| [Tracker](../content/tracker.md)                             | Baris F-15 untuk peta belajar. F-07 (progres) dan F-09 (ulangan terjadwal) menjadi dependensi.                                                             |
| G-06 di [peta nahwu–sharaf](./nahwu-sharaf-knowledge-map.md) | Memakai data prasyarat dari RM-02, bukan graf sendiri.                                                                                                     |

Urutan terhadap ROADMAP: P0 · 1 dan P0 · 2 sudah berjalan (#30), pilot P1 · 3 ada di U1 (#31). RM-02 sampai RM-04 hanya memakai data yang sudah ada, jadi bisa dikerjakan sekarang. RM-05 bergantung pada perluasan latihan dengan input jawaban (P1 · 3).

## 8. Tahapan PR

| ID    | Isi                                                                                                       | Selesai ketika                                                                                                                                                                                                         |
| ----- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RM-01 | Rencana ini dan pembaruan tautan di ROADMAP serta tracker                                                 | Pemilik produk menyetujui lokasi halaman dan label tingkat.                                                                                                                                                            |
| RM-02 | Data kompetensi, data peta, fungsi domain, validator                                                      | Semua 29 pelajaran terpetakan; validator gagal pada pelajaran tanpa langkah, ID kompetensi yang tidak dikenal, dan urutan yang melawan prasyarat `hard`; uji unit lulus. Tidak ada perubahan UI.                       |
| RM-03 | Peta statis dan dialog detail                                                                             | HTML statis memuat semua tahap dan tautan; tanpa JS tetap terbaca; tanpa geser horizontal pada 320, 390 dan 1440 px; tema terang dan gelap; fokus keyboard kembali ke kartu setelah dialog ditutup; uji E2E dan no-JS. |
| RM-04 | Status posisi dari progres yang ada, tanda manual, "Anda di sini", ringkasan di `/progres/`, IndexedDB v2 | Setelah menyelesaikan U1 dan memuat ulang, peta menandai Tahap 1 selesai dan "Anda di sini" pindah ke Tahap 2; tanda "lewati" bertahan setelah muat ulang dan ikut ekspor-impor; cadangan schema 1 tetap bisa diimpor. |
| RM-05 | Simpan jawaban latihan dan tampilkan tingkat pemahaman                                                    | Jawaban `MeaningPractice` tersimpan; soal contoh baru menaikkan ke tingkat 3; penilaian diri berlabel dan maksimal tingkat 2; uji unit untuk setiap aturan tingkat termasuk turun dari 4 ke 3.                         |
| RM-06 | Titik cek per tahap dengan soal baru                                                                      | Soal titik cek ditulis, ditinjau (G-REVIEW), dan tidak muncul di pelajaran. Sampai ditinjau, titik cek tampil sebagai "Direncanakan". Tingkat 4 memakai ulangan F-09 bila sudah tersedia.                              |
| RM-07 | Uji dengan 5 sampai 8 pelajar sasaran (bersama pilot RS-08)                                               | Tugas: "Anda sudah sampai mana?", "Apa yang sebaiknya dipelajari berikutnya?", "Kemampuan mana yang sudah Anda kuasai?" Minimal 4 dari 5 peserta menjawab tanpa arahan. Label yang membingungkan diganti.              |

## 9. Keputusan terbuka

1. Lokasi peta: `/belajar/` menjadi peta (usulan) atau halaman baru `/peta-belajar/`.
2. Apakah "Saya sudah bisa, lewati" boleh menandai langkah sebagai Dilewati tanpa cek singkat. Usulan: boleh, dan peta menawarkan cek singkat bila tersedia.
3. Nama lima tingkat pemahaman. Perlu diuji pada RM-07; alternatif untuk "Melekat" adalah "Tetap ingat".
4. Apakah tahap dan titik cek perlu ditinjau guru sebelum RM-03 terbit, atau cukup label "Draf, belum ditinjau" di halaman.

## Sumber

- [roadmap.sh, Frontend Developer](https://roadmap.sh/frontend), diamati 15 November 2026 di browser desktop dan emulasi 375 × 812.
- [Khan Academy, cara kerja tingkat penguasaan](https://support.khanacademy.org/hc/en-us/articles/5548760867853): contoh tingkat bertahap (Attempted, Familiar, Proficient, Mastered) yang bisa turun lagi. Ambangnya tidak dipakai.
- [CEFR Companion Volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4) dan [CEFR self-assessment grid](https://europass.europa.eu/system/files/2020-05/CEFR%20self-assessment%20grid%20EN.pdf): bentuk kalimat "saya bisa" dan penilaian per keterampilan. Level tidak ditampilkan (O-8).
- Riset pedagogi proyek §6.1 dan §6.2, [graf kompetensi](../curriculum/COMPETENCY_GRAPH.md), [spesifikasi onboarding](../curriculum/ONBOARDING_SPEC.md) §1 dan §6.
