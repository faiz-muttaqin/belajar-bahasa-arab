# Peta belajar: posisi dan tingkat pemahaman

**15 November 2026 · RM-05 selesai (bukti jawaban) · Berikutnya RM-06 (titik cek baru bersumber)**

Pelajar perlu melihat tiga hal dalam satu halaman: jalur yang akan dilalui, posisinya sekarang, dan seberapa jauh ia sudah paham. Rencana ini meminjam pola peta dari [roadmap.sh](https://roadmap.sh/) dan menyesuaikannya untuk orang dewasa Indonesia yang belajar lewat ponsel, tanpa akun, dengan data yang hanya tersimpan di browser.

Rencana ini tidak membuat kurikulum baru. Isi peta diambil dari [graf kompetensi](../curriculum/COMPETENCY_GRAPH.md), [roadmap pasca-Iqra](../curriculum/ROADMAP.md), dan [daftar pelajaran publik](../content/public-lessons.md). Semua kompetensi, urutan, dan soal disusun dari riset dan sumber yang dicatat, berstatus `draft`, dan boleh dipakai. Tinjauan ustadz dilakukan sekali secara menyeluruh saat jalur sudah siap dari awal sampai akhir ([ADR-004 D-9](../decisions/0004-content-decisions.md#d-9-sumber-dulu-tinjauan-ustadz-di-akhir)).

## 1. Yang sudah ada

| Bagian                                                     | Keadaan setelah RM-02                                                                                                                                                         | Dipakai untuk peta                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Graf kompetensi](../curriculum/COMPETENCY_GRAPH.md)       | 33 node dan 55 prasyarat `hard`, `soft`, `optional` sudah bertipe di `competencies.ts`; Markdown tetap memuat alasan dan sumber.                                              | Sumber node, prasyarat dan kalimat "saya bisa". Validator berjalan saat build. |
| [Roadmap pasca-Iqra](../curriculum/ROADMAP.md)             | Urutan kerja P0 sampai P2 dan lima tahap hasil belajar (Kenali makna sampai Coba situasi baru) dengan uji penerimaan.                                                         | Lima hasil itu menjadi titik cek di akhir tahap peta (bagian 4).               |
| [Spesifikasi onboarding](../curriculum/ONBOARDING_SPEC.md) | Cek kesiapan opsional. Aturan O-8: tanpa level CEFR, persentase, atau kata lulus/gagal. Aturan O-9: penguasaan butuh dua kesempatan dengan soal baru.                         | Aturan bahasa dan bukti untuk tingkat pemahaman.                               |
| Riset pedagogi §6.1 dan §6.2                               | Jangan memakai satu ukuran penguasaan. Gate keras hanya bila dependensinya nyata. Urutan adalah rekomendasi, bukan kunci.                                                     | Dasar pemisahan status dan bukti.                                              |
| Katalog pelajaran `src/lib/content/lessons/`               | 6 pelajaran Iqra dan 23 pelajaran jalur utama. Tiap pelajaran punya `id`, `revision`, `level` (Fondasi, Dasar, Menengah) dan `competencies`.                                  | Langkah peta menautkan pelajaran lewat ID, bukan slug.                         |
| Progres `src/lib/progress/`                                | IndexedDB `belajar-bahasa-arab-progres`, store `lessons`: `lastOpenedAt` dan `completedRevision`. `/progres/` menampilkan "Lanjut belajar", ekspor dan impor JSON (schema 1). | Posisi pelajar. Belum ada catatan jawaban latihan.                             |
| Latihan makna (`MeaningPractice`)                          | Hanya di pelajaran U1: dua soal pilihan, soal kedua memakai contoh baru dengan pola yang sama. Jawaban tidak disimpan.                                                        | Sumber bukti pertama setelah jawaban disimpan.                                 |
| Latihan lain                                               | Pembahasan yang dibuka sendiri. Tidak ada input jawaban.                                                                                                                      | Hanya bisa menjadi penilaian diri, diberi label sebagai penilaian diri.        |
| Pendalaman                                                 | `/kaidah/` (frasa, kalimat, klausa, sharaf, praktik), `/rujukan/` (jenis kata, 22 wazan), `/kosakata/`.                                                                       | Cabang opsional di peta, tidak pernah mengunci langkah.                        |
| [Peta nahwu–sharaf](./nahwu-sharaf-knowledge-map.md) G-06  | Merencanakan "peta prasyarat" untuk kaidah.                                                                                                                                   | Pakai data prasyarat yang sama, jangan membuat dua graf.                       |

Implementasi RM-02 menambahkan data bertipe untuk 33 kompetensi (30 node awal dan CB-22–CB-24), 29 pelajaran dalam 27 langkah, tujuh tahap termasuk Iqra, dan empat cabang. RM-03 menambahkan UI peta statis dan dialog detail; penyimpanan masih schema 1.

Kesimpulan: data untuk posisi sudah ada. Data untuk tingkat pemahaman belum ada, karena jawaban latihan belum disimpan dan sebagian besar latihan belum punya input jawaban.

## 2. Pelajaran dari sistem lain

[Studi komparasi](../research/2026-11-15-studi-komparasi-peta-belajar.md) membandingkan 19 sistem: Duolingo, Busuu, Babbel, Khan Academy, roadmap.sh, Anki, LingQ, kisi CEFR dan ELP, Madinah Arabic, Quranic, Understand Al-Qur'an, Fawakih, Kalaam, Al-Kitaab, Iqra, Amtsilati, Al-Miftah lil Ulum, pesantren nahwu klasik, dan kurikulum madrasah. Temuan yang menentukan rencana ini:

- Posisi paling mudah dibaca sebagai bagian besar dan langkah kecil, seperti "Iqra 3 halaman 14". Hampir semua sistem memakai daftar linear. Diagram 2D roadmap.sh tidak terbaca di ponsel 375 px.
- Angka utama di banyak aplikasi mengukur cakupan materi, bukan pemahaman. Tingkat yang jujur berasal dari jawaban (Khan, Anki, checkpoint Busuu, setoran dan sorogan).
- Alat untuk orang dewasa mandiri membiarkan pelajar melewati materi dengan murah. Cek singkat dipakai untuk mengubah lompatan menjadi bukti.
- Tingkat tertinggi selalu butuh bukti yang berjarak waktu. Tingkat turun karena jawaban salah, bukan karena waktu berlalu.
- Penilaian diri dan bukti disimpan berdampingan, tidak saling menimpa.
- Sistem untuk orang dewasa mandiri memakai tonggak dan informasi polos, bukan streak.

Dari roadmap.sh diambil legenda, panel detail per langkah, dan tombol status. Tidak diambil: login, diagram yang diperkecil di ponsel, dan status yang hanya ditandai sendiri tanpa bukti.

## 3. Dua ukuran yang dipisah

Ukuran tunggal seperti "60% selesai" mencampur "sudah membuka" dengan "sudah paham". Rencana ini memisahkannya, sesuai riset §6.1 dan aturan O-8 dan O-9.

### 3.1 Posisi di jalur (per langkah)

| Status            | Asal                                                                   | Tampilan                                   |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------ |
| Belum dimulai     | Tidak ada catatan                                                      | Lingkaran kosong + teks                    |
| Sedang dipelajari | Salah satu pelajaran langkah ini pernah dibuka, atau ditandai manual   | Setengah lingkaran + teks                  |
| Selesai           | Semua pelajaran wajib di langkah ini ditandai selesai pada revisi kini | Centang + teks                             |
| Dilewati          | Pelajar memilih "Saya sudah bisa, lewati"                              | Panah lompat + "Dilewati, belum ada bukti" |

Tanda manual terbaru pada langkah mengungguli status dari pelajaran: “Sedang saya pelajari” juga dapat dipakai untuk mengulang langkah yang sudah selesai. Setelah “Hapus tanda”, status kembali dihitung dari revisi pelajaran.

Status posisi tidak pernah menaikkan tingkat pemahaman. Membuka, menggulir, atau menyelesaikan pelajaran tidak dihitung sebagai bukti.

Posisi ditulis "Tahap N · langkah M dari K", meniru kebiasaan "Iqra 3 halaman 14".

**"Anda di sini"** adalah langkah pertama dalam urutan peta yang belum Selesai atau Dilewati. Bila ada tanda manual "Sedang saya pelajari", tanda terbaru itu yang dipakai. Dengan aturan ini penanda tidak melompat mundur saat pemilik membuka ulang U1 untuk mengulang atau membuka pelajaran dari `/kaidah/`. Tautan "Lanjut belajar" (pelajaran terakhir dibuka) tetap ada secara terpisah.

### 3.2 Tingkat pemahaman (per kompetensi)

Ambang di bawah adalah kebijakan produk awal, bukan angka ilmiah. Uji dan sesuaikan pada RM-07.

| Tingkat | Label                        | Bukti minimum                                                                                            | Rilis |
| ------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- | ----- |
| 0       | (tanpa lencana)              | Belum ada bukti. Dialog membedakan "Belum ada latihan dengan jawaban di langkah ini" dan "Belum dicoba". | RM-05 |
| 1       | Mengenal                     | Sudah mencoba, dengan bantuan, menjawab "Belum tahu", atau jawaban belum tepat.                          | RM-05 |
| 2       | Paham pada contoh            | Benar tanpa bantuan pada soal dari pelajaran.                                                            | RM-05 |
| 3       | Bisa pada contoh baru        | Benar tanpa bantuan pada soal contoh baru yang belum pernah dijawab sebelumnya.                          | RM-05 |
| 4       | Tetap ingat (nama sementara) | Tingkat 3, lalu benar pada ulangan terjadwal F-09 (FSRS) yang jatuh tempo sesudahnya.                    | RM-08 |

Aturan tambahan:

- **Contoh baru dihitung saat dijawab, bukan ditetapkan di data.** Sebuah jawaban dihitung sebagai contoh baru hanya bila belum ada jawaban sebelumnya untuk `itemId` itu. Mengulang pelajaran tidak menaikkan ke tingkat 3. Pemilik juga dapat menandai soal "sudah saya lihat saat menulis atau meninjau", dan soal itu dibatasi sampai tingkat 2. Untuk bukti tingkat 3 bagi pemilik, utamakan soal titik cek baru yang ditulis dari sumber tanpa dilihat lagi sebelum dijawab, atau bacaan pendek bersumber yang belum pernah dibaca.
- **Penilaian diri** ("Jawaban saya cocok dengan pembahasan") paling tinggi tingkat 2, ditampilkan dengan keterangan "menurut penilaian Anda", dan disertai kalimat "Anggap belum cocok bila Anda ragu atau perlu melihat pembahasan".
- **Hasil cek kesiapan** (store `placementRuns` dari ONBOARDING §6) dibaca dengan batas tingkat 2 (O-9).
- **Segi kemampuan.** Setiap jawaban punya `skill` (`decoding`, `meaning`, `structure`, `listening`, `recall`), sama dengan `placementRuns`. Jawaban `recall` (hafalan, misalnya mode hafalan tabel) boleh mendukung tingkat 4 tetapi tidak pernah menaikkan ke tingkat 2 atau 3.
- **Cara menggabungkan jawaban.** Tingkat adalah tingkat tertinggi yang aturannya terpenuhi oleh jawaban sejak penurunan terakhir. Jawaban pada revisi konten lama tetap dihitung, kecuali ID soal sudah dipensiunkan.
- **Turun hanya karena jawaban.** Turun satu tingkat bila ada jawaban salah tanpa bantuan pada soal lain dari soal yang memberi tingkat itu. Tidak ada penurunan karena waktu.
- **Arti tingkat 4.** Tingkat 4 berarti bertahan dalam ingatan, bukan penguasaan menurut riset §6.1 (dua kesempatan dengan soal baru). Penguasaan dalam arti §6.1 butuh minimal dua varian soal baru per kompetensi dan menjadi pekerjaan konten RM-06.

### 3.3 Ringkasan

Ringkasan di `/progres/` memakai kalimat dan hitungan, bukan persen:

> Anda di **Tahap 3 · langkah 2 dari 5** (tingkat Dasar). Di tahap ini, 2 dari 5 kemampuan sudah "Bisa pada contoh baru".

Label Fondasi, Dasar, dan Menengah sudah dipakai pelajaran. Level CEFR atau ACTFL, persen, dan angka cakupan Al-Qur'an tidak ditampilkan (O-8; [studi komparasi §2](../research/2026-11-15-studi-komparasi-peta-belajar.md#2-pola-lintas-sistem)). Setelah latihan atau titik cek, satu baris per kompetensi menyebut "Naik ke …", "Tetap", atau "Turun ke …". Tahap yang selesai mendapat satu baris "Tahap 2 selesai". Tidak ada streak, XP, konfeti, atau maskot.

## 4. Susunan peta

Peta memiliki empat lapis: **tahap** (bagian besar), **langkah** (kira-kira satu unit), **kompetensi** (node graf), dan **pelajaran** (halaman yang sudah ada). Pelajaran yang memuat beberapa kompetensi ditaruh di langkah kompetensi pertamanya. Kompetensi lainnya tetap mendapat bukti dari pelajaran itu.

| Tahap                              | Langkah dan pelajaran                                                          | Kompetensi                             | Titik cek di akhir tahap (dari ROADMAP)   |
| ---------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- | ----------------------------------------- |
| Fondasi membaca (opsional, Iqra)   | A1-01, A2-01 sampai A2-03, A3-01, A4-01                                        | CA-02 sampai CA-06                     | Membaca kalimat pendek berharakat (CA-05) |
| 1 · Makna pertama                  | U1-01 Kata inti shalat                                                         | CB-01                                  | 1. Kenali makna                           |
| 2 · Benda dan pertanyaan           | U2-01 Menunjuk dan bertanya · U3-01 Benda tertentu · U3-02 Isim, fi‘il, harf   | CB-03 sampai CB-06, CB-16              | 2. Tanya dan jawab                        |
| 3 · Tempat, milik, dan kata ganti  | U4-01 · U5-01 · U6-01 · U7-01 · U8-01                                          | CB-07 sampai CB-12                     | Belum ada; dibuat pertama di RM-06        |
| 4 · Siapa melakukan apa            | U9-01 sampai U9-06                                                             | CB-13 sampai CB-15, CB-17 sampai CB-19 | 3. Pahami pesan (bagian baca)             |
| 5 · Dari kalimat ke paragraf       | U10-01 · U11-01 sampai U11-06                                                  | CB-22 sampai CB-24                     | 4. Temukan inti bacaan                    |
| 6 · Uji dengan teks baru           | U12-01 Uji membaca dokumen                                                     | CB-21, CB-24                           | 5. Coba situasi baru                      |
| Cabang · Percakapan (direncanakan) | Belum ada pelajaran. Tampil dengan label "Direncanakan" dan tidak bisa dibuka. | CB-20                                  | 3. Berkenalan (bagian lisan)              |
| Cabang · Pendalaman (opsional)     | `/kaidah/` G-01 sampai G-05, `/rujukan/`, `/kosakata/`                         | CR-01 sampai CR-03                     | Tidak ada; tidak pernah mengunci          |

Catatan untuk peninjau:

- CA-01 (bunyi) dan CB-02 (varian bacaan shalat) belum memiliki pelajaran publik. Keduanya mendapat cabang `planned` di Fondasi dan Tahap 1, tanpa tautan. Bersama Percakapan dan Pendalaman, ada empat cabang.
- Setiap langkah merujuk seluruh `competencyIds` yang dipakai pelajarannya. `primaryCompetencyIds` menempatkan setiap kompetensi tepat satu kali untuk hitungan tahap; rujukan silang tidak menambah penyebut. CB-24 berumah utama di Tahap 5 dan tetap dipakai di Tahap 6.

- Pelajaran U9-03 mencantumkan CB-20, tetapi tugasnya membaca klausa. Peta memasukkan CB-20 ke cabang Percakapan dan membiarkan U9-03 di Tahap 4, sesuai temuan [audit UX](../research/2026-11-15-ux-pasca-iqra.md).
- Titik cek Tahap 3 memakai tugas pesan 2 sampai 3 kalimat dari ROADMAP P1 · 5. Cek di tengah tahap belum dibuat; ditinjau lagi setelah RM-07.
- Setiap titik cek memuat satu soal membaca bacaan pendek dan menyebut maknanya, meniru Al-Miftah dan sorogan.
- Prasyarat di graf hampir semuanya `soft`. Peta menampilkannya sebagai "Disarankan dulu" dengan tombol "Lanjut saja", sehingga tidak ada langkah yang dikunci.
- **Salinan lokal.** Untuk sekarang peta hanya mencakup pelajaran publik, dan satu kalimat di peta menyebutkannya. Saat `/pustaka/` dibangun ([rencana impor lokal](./local-content-import.md)), peta menambah cabang "Salinan lokal (hanya di perangkat ini)" yang dibentuk di browser saja. Cabang itu tidak diprerender, berlabel "Salinan lokal · belum ditinjau", memakai store tanda posisi yang sama, tidak memberi tingkat pada kompetensi publik, dan build tetap jalan tanpa `content-local/` (aturan 5).

## 5. Tampilan

**Lokasi.** `/belajar/` menjadi peta dan menggantikan daftar datar sekarang. URL pelajaran tidak berubah. Judul pelajaran tetap terlihat di kartu langkah, bukan hanya di dialog. `/progres/` menampilkan ringkasan §3.3 dan tautan ke peta. Panel Q1 dan tautan "Cek kesiapan (opsional)" dari ONBOARDING §7 diletakkan di atas Tahap 1 dan hanya muncul setelah pelajaran pertama.

**Ponsel (utama).** Satu kolom. Tiap tahap adalah judul dengan satu kalimat "Setelah tahap ini Anda bisa …". Langkah tampil sebagai kartu bertanda garis vertikal, berisi judul langkah dan pelajarannya, perkiraan menit, status dalam teks dan ikon, serta tingkat pemahaman ringkas. Cabang opsional ada di bawah tahap terkait sebagai kartu bergaris putus-putus. Penanda "Anda di sini" tampil di atas kartu dan ada tombol "Ke posisi saya".

**Legenda.** "Jalur utama", "Opsional", "Direncanakan", "Urutan tidak ketat", dan "Draf · bersumber, belum ditinjau ustadz". Setiap langkah dan soal bisa membuka daftar sumbernya.

**Detail langkah.** Ketuk kartu untuk membuka dialog bawaan berisi: yang akan Anda bisa, pelajaran (tautan), kompetensi beserta tingkatnya, prasyarat yang disarankan, rujukan terkait, dan tombol "Sedang saya pelajari", "Saya sudah bisa, lewati", serta "Hapus tanda". Satu baris menjelaskan tingkat yang belum muncul: "Tingkat berikutnya muncul setelah ulangan terjadwal tersedia." Istilah Arab (misalnya iḍāfah) hanya muncul di dialog, dalam `lang="ar"` bila ditulis dengan huruf Arab.

**Titik cek dan cek cepat.** Satu format dengan cek kesiapan di ONBOARDING §3: ada pilihan "Belum tahu", umpan balik setiap soal, tanpa skor berjalan, tanpa batas waktu, tanpa waktu tunggu untuk mengulang. Aturannya ditulis sebagai aturan bukti, bukan nilai lulus: "4 dari 5 benar pada soal baru: kemampuan ini tercatat Bisa pada contoh baru. Kurang dari itu: tidak ada yang turun, coba lagi kapan saja." Tidak memakai kata lulus, gagal, atau nilai. Sesudahnya tampil semua soal dengan jawaban pelajar dan kunci, dikelompokkan per kompetensi. Cek cepat setelah "lewati" memakai soal titik cek langkah itu dan tersedia begitu soal bersumber untuk langkah itu ada.

**Ulangan.** Antrean ulangan dan set "Ulangi kesalahan" berada di `/latihan/` (ONBOARDING §7). Peta dan `/progres/` paling banyak menampilkan satu baris tenang "Ulangan menunggu: N" yang menautkan ke `/latihan/`. Soal cek kesiapan tidak pernah masuk ulangan.

**Desktop.** Daftar yang sama dengan kolom ringkasan di kanan. Diagram prasyarat 2D ditunda dan ditinjau lagi bersama G-06 bila prasyarat `hard` bertambah. Tidak ada library graf.

**Visual pembelajaran.** [Rencana visual](./visual-pembelajaran.md) merinci penjelajah peran kata, animasi perubahan bertahap dan grafik hitungan cakupan. Grafik posisi tersedia setelah RM-04; grafik bukti menunggu RM-05. Warna selalu disertai label, dan informasi tetap utuh tanpa animasi. RM-02 tetap data saja.

**Aksesibilitas dan gaya.** Daftar bernomor (`<ol>`) dengan judul bertingkat; status tidak hanya ditandai warna; target ketuk minimal 44 px; mendukung tema terang, gelap dan sistem; mengikuti `prefers-reduced-motion`; tanpa streak, konfeti atau maskot ([taste.md](../design/taste.md)).

**Tanpa JavaScript.** Seluruh peta, legenda dan tautan pelajaran ada di HTML statis. Status dan tingkat ditambahkan setelah hidrasi dari IndexedDB. Jika penyimpanan tidak tersedia, satu kalimat menjelaskan bahwa progres tidak tersimpan di perangkat ini.

## 6. Data dan penyimpanan

- `src/lib/content/competencies.ts`: node dari graf kompetensi (ID, judul, kalimat "saya bisa", prasyarat beserta kekuatannya, `reviewStatus: 'draft'`). Markdown graf tetap menjadi dokumen alasan.
- `src/lib/content/roadmap.ts`: tahap, langkah, cabang, titik cek; merujuk ID pelajaran dan ID kompetensi.
- `src/lib/domain/roadmap/`: fungsi murni `stepStatus`, `currentPosition`, `competencyLevel`, `summarizeRoadmap`, beserta uji unit.
- Validator saat build: setiap pelajaran publik berada di tepat satu langkah; setiap ID kompetensi di pelajaran ada di data; urutan langkah tidak melawan prasyarat `hard` (invarian I-5); cabang direncanakan tidak menautkan halaman yang tidak ada.
- IndexedDB versi 2 dengan migrasi dari versi 1:
  - store `marks`: `{ stepId, mark: 'learning' | 'skipped', at }`
  - store `attempts` (mulai RM-05): `{ id, itemId, lessonId, contentRevision, competencyIds, skill, outcome: 'correct' | 'incorrect' | 'dont_know', assisted, selfAssessed, seenWhileAuthoring, at }`. Status "contoh baru" dihitung dari riwayat, tidak disimpan.
  - `placementRuns` tetap store sendiri seperti ONBOARDING §6.
  - Jadwal ulangan dibuat dari `attempts` oleh F-09 (ts-fsrs). Rencana ini tidak membuat jadwal kedua.
- Cadangan JSON schema 2 berisi `lessons`, `marks`, dan `attempts`. File schema 1 tetap bisa diimpor. Impor **menggabungkan**: `attempts` disatukan berdasarkan `id`, `marks` mengambil tanda terbaru per `stepId`. Dengan begitu data dari ponsel dan laptop bisa disatukan.
- Setelah jawaban pertama disimpan, panggil `navigator.storage.persist()` dan tampilkan hasilnya di `/progres/`, bersama "Cadangan terakhir: tanggal" dan tombol ekspor. Perilaku penghapusan storage di WebKit perlu diperiksa sebelum ditulis di layar.
- Tidak menyimpan teks jawaban bebas, nama, atau data lain yang tidak perlu (ONBOARDING §6). Semuanya tetap di browser.

## 7. Pertimbangan ulang rencana yang ada

| Dokumen                                                      | Perubahan yang diusulkan                                                                                                                                   |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ROADMAP](../curriculum/ROADMAP.md)                          | Lima tahap hasil tetap menjadi tujuan. Peta memakai tahap berbasis unit dan menempatkan kelima hasil sebagai titik cek. Tautan ke rencana ini ditambahkan. |
| [Graf kompetensi](../curriculum/COMPETENCY_GRAPH.md)         | Tetap menjadi sumber alasan. RM-02 memindahkan node dan edge ke data TS dengan validator build. CB-22 sampai CB-24 masuk hitungan graf.                    |
| [Onboarding](../curriculum/ONBOARDING_SPEC.md)               | `placementRuns` dibaca peta dengan batas tingkat 2 (O-9). Panel Q1 dan tautan cek kesiapan berada di atas Tahap 1 pada peta `/belajar/` (menjawab OP-9).   |
| [Tracker](../content/tracker.md)                             | Baris F-15 untuk peta belajar. F-07 (progres) dan F-09 (ulangan terjadwal, ts-fsrs) menjadi dependensi.                                                    |
| G-06 di [peta nahwu–sharaf](./nahwu-sharaf-knowledge-map.md) | Memakai data prasyarat dari RM-02, bukan graf sendiri.                                                                                                     |

Urutan terhadap ROADMAP: P0 · 1 dan P0 · 2 sudah berjalan (#30), pilot P1 · 3 ada di U1 (#31). RM-02 dan RM-03 selesai. RM-04 memakai data dan UI yang sudah ada untuk menambahkan posisi personal. RM-05 menyimpan jawaban otomatis U1 dan menambahkan penilaian diri pada empat latihan bersumber U2/U3 (ROADMAP P1 · 3). RM-06 memperluas soal transfer dan titik cek.

## 8. Tahapan PR

Urutan disusun untuk pemilik sebagai pengguna utama: posisi dulu, lalu bukti, dan fitur ulangan terakhir.

| ID    | Isi                                                                                                                       | Selesai ketika                                                                                                                                                                                                                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RM-01 | Rencana ini, studi komparasi, dan pembaruan tautan di ROADMAP serta tracker                                               | Selesai 15 November 2026. Keputusan §9 disetujui; lanjut ke §10.                                                                                                                                                                                                                                                                                             |
| RM-02 | Data kompetensi, data peta, fungsi domain, validator                                                                      | Selesai 15 November 2026: 29 pelajaran, 27 langkah, 33 kompetensi; validator dan domain diuji. Tidak ada perubahan UI. Berikutnya RM-03.                                                                                                                                                                                                                     |
| RM-03 | Peta statis di `/belajar/` dan dialog detail                                                                              | Selesai 15 November 2026: tujuh tahap, 27 langkah dan 29 tautan pelajaran dalam HTML; dialog keyboard dan disclosure tanpa JS. Tautan #dasar/#menengah dipertahankan. Berikutnya RM-04.                                                                                                                                                                      |
| RM-04 | Status posisi, tanda manual, "Anda di sini", ringkasan di `/progres/`, IndexedDB v2 (`marks`), impor gabung, `persist()`  | Selesai 15 November 2026: migrasi v1/v2, posisi dan tanda tersimpan, cadangan schema 1/2 tergabung, catatan penghapusan bertahan. Iqra tetap terpisah dari posisi dan hitungan jalur utama. Berikutnya RM-05.                                                                                                                                                |
| RM-05 | Simpan jawaban latihan dan tampilkan tingkat 0 sampai 3                                                                   | Selesai 15 November 2026: jawaban `MeaningPractice` tersimpan dengan `skill`; jawaban kedua pada soal yang sama tidak dihitung contoh baru; soal "sudah saya lihat" dibatasi tingkat 2; penilaian diri berlabel dan dibatasi tingkat 2; ringkasan naik, tetap, turun tampil; uji unit untuk setiap aturan §3.2.                                              |
| RM-06 | Titik cek per tahap dengan soal baru, mulai dari Tahap 3; cek cepat setelah "lewati"                                      | Soal titik cek ditulis dari sumber yang dicatat per soal (D-9), tidak muncul di pelajaran, minimal dua varian soal baru per kompetensi, dan langsung dipakai sebagai bukti dengan label draf. Titik cek tanpa soal tampil sebagai "Direncanakan". Kalimat aturan mengikuti §5 tanpa kata lulus atau gagal.                                                   |
| RM-07 | Uji pakai: pemilik selama dua minggu, lalu 5 sampai 8 pelajar sasaran (bersama pilot RS-08)                               | Pemilik mencatat hambatan harian. Tugas peserta: "Anda sudah sampai mana?", "Apa yang sebaiknya dipelajari berikutnya?", "Kemampuan mana yang sudah Anda kuasai?", "Mana yang perlu diulang?". Bandingkan nama "Tetap ingat" dengan "Melekat", dan label kartu "lancar / perlu diulang" dengan nama tingkat. Minimal 4 dari 5 peserta menjawab tanpa arahan. |
| RM-08 | Ulangan setelah F-09: tingkat 4, "Ulangan menunggu: N", set "Ulangi kesalahan" dan "Latih yang belum kuat" di `/latihan/` | Dimulai bila F-09 sudah ada dan tahap yang sudah dicapai pemilik punya minimal 3 soal berjawaban per kompetensi. Jadwal hanya dari FSRS. Soal cek kesiapan tidak masuk ulangan.                                                                                                                                                                              |

## 9. Keputusan

Diputuskan berdasarkan [studi komparasi](../research/2026-11-15-studi-komparasi-peta-belajar.md#4-keputusan-dan-alasannya), dengan pemilik sebagai pengguna utama. Semuanya masih bisa diubah setelah RM-07.

1. **Lokasi.** `/belajar/` menjadi peta. Tidak ada menu baru.
2. **Lewati.** "Saya sudah bisa, lewati" boleh tanpa cek. Ini hanya tanda posisi ("Dilewati, belum ada bukti") dan bisa dihapus kapan saja. Cek cepat ditawarkan begitu soal bersumber untuk langkah itu tersedia (RM-06).
3. **Tingkat.** Data menyimpan tingkat 0 sampai 4. Tingkat 0 tanpa lencana. RM-05 merilis tingkat 1 sampai 3. Tingkat 4 ("Tetap ingat", nama sementara) menunggu F-09. Tingkat turun hanya karena jawaban salah.
4. **Sumber dan tinjauan.** Semua isi peta dan soal disusun dari riset dan sumber yang dicatat, lalu langsung dipakai dengan label "Draf · bersumber, belum ditinjau ustadz" ([ADR-004 D-9](../decisions/0004-content-decisions.md#d-9-sumber-dulu-tinjauan-ustadz-di-akhir)). Hasil latihan pada soal draf tetap dihitung sebagai bukti. Tinjauan ustadz dilakukan sekali secara menyeluruh saat jalur siap dari awal sampai akhir, memakai daftar sumber per butir. Butir tanpa sumber tidak terbit.
5. **Bukti.** Tanda posisi, penilaian diri, dan jawaban adalah tiga sumber terpisah. Hanya jawaban pada soal baru yang memberi tingkat 3.
6. **Ringkasan.** Hitungan dalam kalimat. Tanpa persen, CEFR, atau angka cakupan Al-Qur'an.
7. **Motivasi.** Tanpa streak, XP, liga, konfeti, atau maskot. Pakai ringkasan naik, tetap, turun dan baris "Tahap selesai".
8. **Ulangan.** Satu jadwal dari F-09 (ts-fsrs). Antrean di `/latihan/`. Semua fitur ulangan masuk RM-08.
9. **Salinan lokal.** Peta mencakup pelajaran publik sekarang. Cabang "Salinan lokal" ditambahkan di browser saat `/pustaka/` ada.
10. **Diagram desktop.** Ditunda.

Belum diriset: metode Tamyiz, Al-Bayan, dan anotasi utawi-iku. Riset dari sumbernya sebelum RM-06 menulis soal "baca dan maknai", lalu masukkan ke daftar tinjauan menyeluruh.

## 10. Lanjutkan dari sini: RM-06

**Status (15 November 2026).** RM-01 sampai RM-05 selesai. Data ada di `src/lib/content/competencies.ts` dan `roadmap.ts`; kontrak, validator dan fungsi posisi berada di `src/lib/domain/roadmap/`. Validator dipanggil bersama `validateLessons` saat katalog dibaca untuk build. RM-03 memakai data ini untuk peta di `/belajar/`, dengan 27 langkah, tautan 29 pelajaran, tujuan, prasyarat, sumber, cabang dan titik cek direncanakan. RM-04 menambahkan store `marks`, migrasi IndexedDB v2 dan cadangan schema 2 tanpa dependency baru.

### Kontrak yang sudah tersedia

- **33 kompetensi, 55 prasyarat:** 4 hard, 47 soft, 4 optional. ID dan edge diuji terhadap graf Markdown beserta perluasan bacaan.
- **29 pelajaran dalam 27 langkah:** 23 pelajaran jalur utama (23 langkah) dan 6 Iqra (4 langkah; tiga pelajaran harakat berada dalam satu langkah). Setiap pelajaran tepat satu langkah.
- **Tujuh tahap, empat cabang, tujuh titik cek direncanakan.** CA-01, CB-02 dan CB-20 berumah pada cabang direncanakan; CR-01–CR-03 pada Pendalaman. Setiap kompetensi tepat satu tempat utama; pelajaran boleh merujuk kompetensi dari langkah/cabang lain.
- **Sumber:** node, langkah, tahap, cabang dan titik cek mencatat sumber serta jenis penggunaan `independent-original`, berstatus `draft`. Tidak menulis materi Arab baru.
- **Domain:** `stepStatus`, `currentPosition`, `summarizeRoadmap`. Posisi default mengikuti jalur utama; Iqra dipilih eksplisit. Semua pelajaran wajib harus selesai pada revisi kini. Tanda manual terbaru mengungguli status pelajaran; membuka ulang pelajaran selesai tidak menggeser posisi ke belakang tanpa tanda manual.
- **Build menolak:** pelajaran hilang/ganda, ID tak dikenal/ganda, sumber kosong/tidak sah, tempat utama kompetensi hilang/ganda, siklus prasyarat, prasyarat hard terbalik/tanpa alasan, tautan cabang direncanakan dan route rujukan yang tidak dikenal. Tautan Pendalaman juga diperiksa terhadap tipe route Kit dan berkas halaman nyata.
- `StepMark` sudah tersimpan di IndexedDB v2; nilai `cleared` mempertahankan catatan penghapusan untuk impor gabung. Cadangan schema 2 tetap menerima schema 1. `attempts` kini tersimpan di IndexedDB v3 dan cadangan schema 2, dengan merge idempoten menurut isi kontrak dan ID jawaban.

### UI yang sudah tersedia

`presentRoadmap` membentuk data tampilan dari ID pelajaran dan kompetensi; judul, slug serta menit selalu berasal dari katalog. `LearningRoadmap`, `RoadmapStage`, `RoadmapStepDetails` dan `RoadmapSources` merender daftar tersebut. Enam tahap utama tampil lebih dahulu, lalu Iqra opsional. Anchor `#dasar` dan `#menengah` tetap berlaku.

Rincian dibaca melalui disclosure HTML tanpa JS, lalu menjadi dialog native setelah dukungan browser terdeteksi. Escape/Tutup mengembalikan fokus ke pemicu; tautan prasyarat menutup dialog dan menuju langkah terkait. Di ponsel, navigasi dan legenda berada dalam disclosure ringkas; di desktop, keduanya ada di kolom kanan. Semua bahan peta berlabel draf dan sumbernya dapat dibuka. RM-04 menambahkan status posisi dan kontrol tanda untuk jalur utama serta Iqra opsional. RM-05 menambahkan bukti pemahaman 0–3 dari jawaban nyata, terpisah dari posisi.

### Implementasi RM-04

- IndexedDB versi 2 memperbarui database yang sama secara inkremental, mempertahankan seluruh catatan `lessons` dari v1, dan menambah store `marks` berdasarkan `stepId`.
- Cadangan JSON schema 2 memuat `lessons`, `marks`, dan `attempts: []` yang masih kosong. Impor menerima schema 1; satu transaksi menggabungkan pelajaran serta tanda terbaru. Pilihan `cleared` merupakan catatan penghapusan agar cadangan lama tidak mengembalikan tanda yang sudah dihapus.
- `/belajar/` dan `/progres/` menggunakan `stepStatus`, `currentPosition` dan `summarizeRoadmap` yang sama. Posisi tidak dianggap bukti paham. Penanganan status loading/unavailable tetap menjaga tautan dan HTML awal tanpa JavaScript.
- Helper pemeriksaan persistensi disiapkan, tetapi `navigator.storage.persist()` **tidak otomatis diminta** sebelum jawaban nyata pertama pada RM-05.
- Regresi unit dan browser mencakup migrasi v1, impor schema 1/2, tanda lintas tab, Iqra opsional, penyimpanan gagal dan pemisahan posisi dari riwayat pelajaran. Penggabungan transaksi mempertahankan semua revisi, status selesai dan tanda terbaru meskipun ID berulang dalam satu batch.

### Kontrak RM-04 yang telah diterapkan

Tambahkan posisi personal di peta dan ringkasan `/progres/` sesuai §3.1, §3.3 dan §6, memakai fungsi domain RM-02. Jangan membuat rumus posisi atau graf baru.

1. Migrasikan IndexedDB dari versi 1 ke versi 2 secara inkremental. Store `lessons` dan seluruh catatan lama harus dipertahankan; tambahkan store `marks` dengan key `stepId`. Upgrader tidak boleh membuat ulang store yang sudah ada. Pisahkan versi database dan schema cadangan jika diperlukan agar keduanya tidak tersamar sebagai versi konten.
2. Hubungkan pembacaan data melalui adaptor progres browser yang ada. Sebelum siap, tampilkan penjelasan memuat progres; jangan menganggap array awal kosong sebagai bukti “Belum dimulai”. Saat storage gagal, peta serta seluruh tautan tetap dapat dipakai dan menjelaskan bahwa progres tidak tersimpan di perangkat ini.
3. Tambahkan status dalam teks/ikon, penanda “Anda di sini”, tombol “Ke posisi saya”, serta kontrol “Sedang saya pelajari”, “Saya sudah bisa, lewati” dan “Hapus tanda”. Tanda manual mengikuti aturan §3.1. Detail langkah tetap tersedia tanpa JS; kontrol simpan baru muncul saat adaptor siap.
4. Peta dan `/progres/` memakai `currentPosition` serta `summarizeRoadmap` yang sama. “Lanjut belajar” berbasis pelajaran terakhir dibuka tetap terpisah. Iqra dan cabang opsional tidak menambah penyebut jalur utama. Gunakan hitungan, bukan persentase atau tingkat pemahaman yang belum memiliki jawaban.
5. Ekspor/impor schema 2 menggabungkan catatan pelajaran dan mengambil tanda terbaru per `stepId`; schema 1 tetap dapat diimpor. Kontrak cadangan menyiapkan `attempts` untuk RM-05, tanpa membuat bukti atau jawaban tiruan. Dua cadangan dari perangkat berbeda harus bisa digabungkan; duplikat tidak menggandakan catatan.
6. Siapkan pembacaan status persistensi dan helper `navigator.storage.persist()`. Waktu pemanggilan tetap setelah jawaban pertama disimpan (§6, RM-05), bukan saat pengguna sekadar membuka peta.
7. Uji migrasi dengan data versi 1, reload, tab lain, cadangan schema 1/2, penyimpanan gagal dan revisi pelajaran berubah. Setelah U1 selesai, posisi menuju Tahap 2; membuka ulang U1 tidak memindahkannya ke belakang; tanda manual terbaru tetap menang dan dapat dihapus. Jalankan seluruh gate proyek dan perbarui F-15 serta baris RM-04 di §8.

### Implementasi RM-05

- Tambahkan IndexedDB v3 `attempts` berkey `id`, tetap mempertahankan store `lessons` dan `marks` milik RM-04; cadangan tetap schema 2 dengan `attempts` sungguhan dan impor idempoten. Impor dari schema 1/2 lama tidak mengarang bukti.
- ID soal dibuat stabil dan dicatat di katalog; registry membedakan contoh pembelajaran, calon transfer, dan latihan penilaian diri. Kelayakan “baru” diputuskan dari riwayat jawaban dan catatan penulis, **bukan** boolean tersimpan. Soal yang dipensiunkan tidak dipakai sebagai bukti aktif.
- `competencyUnderstanding` menghitung tingkat 0–3, penurunan satu tingkat karena jawaban salah tanpa bantuan pada soal berbeda, dan batas tingkat 2 bagi penilaian diri. `recall` tidak dapat menaikkan level 2 atau 3. Kebijakan ini tetap ambang produk awal, bukan rating CEFR.
- Integrasi latihan makna U1 (dua jawaban otomatis) dan empat pemeriksaan diri bersumber dari latihan U2/U3. Soal penilaian diri berlabel jelas, tidak menciptakan teks Arab baru. `/belajar/` dan `/progres/` menampilkan bukti terpisah dari status langkah.
- Helper permintaan persistensi hanya dipanggil **setelah jawaban pertama benar-benar tersimpan**. Safari/iOS/Android nyata, uji pelajar dan tinjauan ustadz tetap terpisah.
- Tes unit dan E2E mencakup contoh ulang, pernah dilihat saat menulis, penilaian diri, perubahan tingkat, migrasi dan cadangan, kegagalan storage, static fallback, persistensi sesudah commit pertama dan pembaruan peta antartab. Review menambahkan regresi konflik dalam batch, urutan properti JSON, batas bantuan/hafalan dan penurunan sesudah pemahaman pulih. Ringkasan memakai tujuan tiap kompetensi agar kemampuan berbeda dalam satu langkah tidak berlabel sama. Tidak ada dependency baru.

### Tugas berikutnya: RM-06

Bangun titik cek per tahap sesuai §4, §5 dan baris RM-06 di §8, mulai dari Tahap 3. Riset Tamyiz, Al-Bayan dan anotasi utawi-iku dari sumbernya sebelum menulis tugas “baca dan maknai”; catat sumber, izin penggunaan dan revisi per soal sesuai ADR-004 D-9. Sediakan minimal dua varian soal baru per kompetensi tanpa menampilkan soal titik cek di pelajaran. Butir tanpa sumber tidak boleh diterbitkan; titik cek yang belum punya soal tetap berlabel “Direncanakan”.

Gunakan kontrak `EvidenceItem`, `LearningAttempt` dan `competencyUnderstanding` RM-05; jangan membuat rumus tingkat baru. Kelanjutan meliputi cek cepat sesudah “lewati”, feedback naik/tetap/turun per kompetensi, serta pengujian contoh baru, bantuan, penilaian diri, hafalan, impor dan migrasi. Riwayat penyelesaian, tanda posisi dan bukti tetap terpisah. Ulangan terjadwal/tingkat 4 menunggu RM-08 dan F-09.

**Sesudah RM-05:** RM-06 memperluas titik cek baru yang bersumber. Audit VP-01 pada [rencana visual](./visual-pembelajaran.md) dapat menyiapkan penjelajah peran kata; grafik posisi memakai RM-04 dan grafik bukti memakai RM-05. Warna disertai label, animasi dikendalikan pelajar dan tetap menghormati reduced motion.

### Ekspansi RM-06: Tahap 1 (16 November 2026)

- PR bertingkat berikutnya menambahkan **20 soal transfer asli** dengan stimulus baru untuk CB-01, berbeda dari 20 soal yang sudah tersedia di materi U1. Fokusnya mengenali akhiran posesif orang pertama tunggal dari pola `رَبِّي` pada contoh kosakata MSA baru, bukan mengarang bacaan shalat baru.
- Semua butir diberi rujukan eksplisit Madinah Arabic Lesson 47 Part 2 tentang pronomina posesif; tidak menyalin latihan pihak ketiga. Soal tetap berlabel draf untuk tinjauan bahasa Arab.
- Titik cek Tahap 1 tersedia di `/belajar/checkpoint-1/`; bukti jawaban tetap terpisah dari tanda selesai dan memakai aturan penilaian tingkat 0–3 yang sudah ada. Tidak ada dependency baru.

### Ekspansi RM-06: Tahap 2 (16 November 2026)

- Stacked PR di atas pilot RM-06 Tahap 3 menambahkan **40 soal transfer baru** dalam dua kelompok, masing-masing 20 butir: CB-04 (pertanyaan benda/orang) dan CB-06 (frasa vs kalimat lengkap). Butir berasal dari penyusunan mandiri berdasarkan Madinah Arabic pelajaran 2 bagian 1 dan pelajaran 58 bagian 1, dengan sumber masing-masing tercatat di data. Semua tetap `draft` untuk ditinjau.
- Soal struktur mencatat `skill: structure`, bukan `meaning`; bukti tetap disimpan di IndexedDB yang sudah ada. Tahap 2 tersedia di `/belajar/checkpoint-2/`, dan tautan peta menggunakan jumlah soal yang benar per tahap.
- Bank tahapan lain tetap `planned` hingga soal bersumbernya tersedia. Tidak mengubah aturan ambang tingkat pemahaman atau jadwal ulangan.

### Pilot RM-06: Tahap 3 (16 November 2026)

- Titik cek Tahap 3 aktif di `/belajar/checkpoint-3/`, dengan **24 butir**: masing-masing delapan untuk CB-07 (rujukan kata ganti/lokasi), CB-09 (idhafah), dan CB-12 (akhiran pemilik). Seluruh teks merupakan susunan orisinal yang diadaptasikan sebagai pola latihan; sumber dicatat per soal dan masih berstatus `draft`.
- Setiap jawaban menggunakan `recordLearningAnswer`, `EvidenceItem` dan tingkat RM-05, tanpa menandai pelajaran atau langkah selesai. Hasil impornya tetap menggunakan skema IndexedDB v3/schema cadangan 2. Setelah tanda “lewati” ditetapkan, tautan cek cepat muncul tanpa menghapus tanda.
- Latihan makna U1 diperkaya menjadi 20 butir berbeda; komponen soal bukan lagi pasangan tetap dua soal. Jumlah latihan selanjutnya dinaikkan bertahap menjadi **20–50 butir per bank** menurut cakupan materi dan kemampuan memverifikasi sumber; jangan menambah soal duplikat untuk memenuhi angka.
- Metode Tamyiz, Al-Bayan, dan utawi-iku **belum diklaim telah diaudit**. Tugas khusus “baca dan maknai” yang bergantung pada metode tersebut belum diterbitkan. Titik cek tahap lain masih berstatus direncanakan dan perlu bank bersumber sendiri.

### Ekspansi RM-06: Tahap 4 (16 November 2026)

- Checkpoint **40 butir orisinal** di `/belajar/checkpoint-4/`: 20 untuk CB-14 (pelaku, tindakan, bentuk aktif/pasif) dan 20 untuk CB-15 (cakupan negasi dan waktu). Seluruh soal baru disusun dari pola Madinah Arabic [pelajaran 34 bagian 1](https://madinaharabic.com/free-content/grammar/lesson-34/part-1) dan [pelajaran 31 bagian 7](https://madinaharabic.com/free-content/grammar/lesson-31/part-7), bukan menyalin soal sumber.
- Setiap butir punya ID stabil, harakat, opsi pilihan, pembahasan, dan provenance; klasifikasi bukti `structure` untuk CB-14 dan `meaning` untuk CB-15. Bukti tetap memakai IndexedDB dan tingkat RM-05 tanpa tanda kelulusan.
- Semua masih **draf, belum ditinjau ustadz**. Setelah tahap ini, titik cek Iqra opsional, Tahap 5 dan Tahap 6 masih belum tersedia. Audit metode khusus Tamyiz/Al-Bayan/utawi-iku dan RM-07 tetap agenda terpisah.


### Ekspansi RM-06: Tahap 5 (16 November 2026)

- Titik cek Tahap 5 tersedia pada `/belajar/checkpoint-5/` dengan **60 teks/soal transfer orisinal**, tiga kelompok masing-masing **20**: CB-22 (hubungan antarbagian: sebab/akibat/urutan/kontras), CB-23 (gagasan utama paragraf vs detail), dan CB-24 (struktur dokumen, rujukan, hasil, batas inferensi). Tiap stimulus Arab berbeda dan soal tidak dibentuk dengan pengacakan opsi.
- Desain asesmen mengacu pada [Council of Europe — reading comprehension](https://www.coe.int/en/web/common-european-framework-reference-languages/reading-comprehension) yang mempertimbangkan teks, pembaca, konteks, tujuan, dan variasi tugas; contoh penyajian bahasa dari [Al Jazeera Learning Arabic](https://learning.aljazeera.net/en/pages/about-us). Semua teks latihan ditulis secara independen dan **bukan** adaptasi/cuplikan bacaan sumber berhak cipta. Sumber metodologi dicatat per item, bukan diklaim sebagai sumber kalimat tertentu.
- Gunakan kontrak bukti RM-05: `structure` untuk CB-22/CB-24 dan `meaning` untuk CB-23, dengan pemilik pelajaran/revisi stabil. Tidak ada rumus baru, DB/backend, dependency, atau status kelulusan.
- Materi Arab dan pemilihan jawaban masih **draf untuk tashih ustadz/pengajar**. CI otomatis memeriksa ID, keterbacaan HTML statis/no-JS, lint/typecheck/unit/E2E. Review lingustik manual dan uji pengguna tetap terpisah.
- **Berikutnya:** lengkapi titik cek Tahap 6 untuk CB-21 dan CB-24 (20–50 variasi per bank bila cukup terverifikasi), titik cek jalur Iqra opsional, baru audit RM-07. Rencana Tamyiz, Al-Bayan, dan utawi-iku tetap memerlukan audit sumber sebelum digunakan untuk klaim khusus.

## Sumber

- [Studi komparasi 19 sistem belajar](../research/2026-11-15-studi-komparasi-peta-belajar.md), dengan sumber per sistem.
- [roadmap.sh, Frontend Developer](https://roadmap.sh/frontend), diamati 15 November 2026 di browser desktop dan emulasi 375 × 812.
- [CEFR Companion Volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4): bentuk kalimat "saya bisa" dan penilaian per keterampilan. Level tidak ditampilkan (O-8).
- Riset pedagogi proyek §6.1 dan §6.2, [graf kompetensi](../curriculum/COMPETENCY_GRAPH.md), [spesifikasi onboarding](../curriculum/ONBOARDING_SPEC.md) §1, §3, §6 dan §7, [rencana impor lokal](./local-content-import.md).
