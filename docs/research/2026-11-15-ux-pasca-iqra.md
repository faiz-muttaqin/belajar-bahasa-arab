# Audit UX pelajar pasca-Iqra

**15 November 2026 · Situs publik · Referensi kode `a595bbd`**

Audit mengikuti skenario penutur Indonesia lulusan SMA atau kuliah yang sudah membaca tulisan Arab berharakat lewat Iqra atau mengaji. Pelajar ingin memahami isi bacaan dan memakai ungkapan sehari-hari. Dalam penjelasan Indonesia ia bisa menangkap maksud dan keterangan, tetapi perlu contoh konkret untuk menunjuk inti kalimat, hubungan antarkata, dan gagasan utama.

**Cakupan.** Penelusuran heuristik berbasis tugas di Chromium dengan Playwright Interactive. Ukuran layar 1440 × 900 dan emulasi ponsel 390 × 664. Bagian Bedah per kata juga diperiksa di 320 × 568. Pemeriksaan tambahan mencakup pembahasan dengan keyboard, halaman pelajaran pertama tanpa JavaScript, Progres setelah muat ulang, dan simulasi perangkat tanpa suara Arab. Temuan perilaku berasal dari browser. Dampak pada pelajar, kualitas pelafalan, dan hasil belajar masih perlu diuji dengan peserta dan perangkat sungguhan. [Heuristik Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/) · [Uji termoderasi GOV.UK](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing).

## Temuan dan langkah reproduksi

### P0 · Dua petunjuk mulai yang bersaing

Dari beranda baru, ketuk “Mulai belajar”. Di `/belajar/`, ada 23 kartu pelajaran dan dua kelompok, Dasar serta Menengah. Tautan “Mulai dari isim, fi‘il, dan harf” berada sebelum keduanya. Pada layar 390 × 664, tautan tersebut terlihat utuh di y=307–351. Kartu shalat dimulai di y=531 dan berakhir di y=673. Navigasi bawah mulai di y=599, sehingga hanya bagian atas kartu yang terlihat. Pelajar harus menentukan sendiri apakah mengikuti petunjuk “Mulai dari…” atau kartu shalat.

Ketuk tautan tersebut. Situs membuka bagian “Bedah per kata”. Pada contoh pertama terlihat “kalimat nominal”, “frasa sifat”, “Mubtada’”, “marfu‘”, “dammah”, dan bentuk kata. Makna Indonesia per kata tersedia. Makna satu kalimat perlu dibuka terpisah. Untuk tugas pertama, tawarkan hasil yang bisa dibayangkan seperti “Mulai memahami bacaan shalat” dengan satu contoh. Jadikan “Bedah jenis kata” pilihan pendalaman. Spesifikasi onboarding sudah mengusulkan tombol langsung ke pelajaran pertama dan menempatkan pertanyaan kesiapan sesudahnya. Cek ketersediaan materi serta audio yang diperlukan sesuai spesifikasi tersebut. [Daftar di ponsel](./bukti-ux-pasca-iqra/01-daftar-ponsel.png) · [Tujuan tautan Bedah per kata](./bukti-ux-pasca-iqra/02-bedah-per-kata.png) · [Spesifikasi onboarding](../curriculum/ONBOARDING_SPEC.md).

### P0 · Progres kosong sesudah pelajaran pertama

Di `/belajar/kata-inti-shalat/`, buka pembahasan soal lalu ketuk “Pelajaran berikutnya”. Buka Progres dan muat ulang. Halaman masih menyatakan “Belum ada progres di perangkat ini” di atas janji penyimpanan otomatis setelah pelajaran pertama. Pembaca tidak mendapat tanda selesai atau pintasan kembali. Kode [halaman Progres](../../src/routes/progres/+page.svelte) merender keadaan kosong yang sama tanpa membaca penyimpanan belajar. Perbaiki janji pada layar, lalu uji penyimpanan lintas muat ulang dan tab pada browser yang sama. [Hasil setelah membuka pelajaran kedua](./bukti-ux-pasca-iqra/03-progres.png).

### P1 · Instruksi memilih dan menulis belum punya langkah di layar

Pada latihan shalat, “Lihat pembahasan” membuka jawaban dengan alasan. Pada `/belajar/menunjuk-dan-bertanya/#latihan`, instruksi meminta memilih pertanyaan, tetapi setiap soal hanya punya pembahasan yang bisa dibuka. Pada pelajaran paragraf dan uji akhir, instruksi meminta ringkasan serta bukti. Cara menjawab yang ditawarkan ialah di kepala atau di kertas. Satu-satunya input pada uji akhir adalah pengaturan harakat di bagian bacaan.

Untuk latihan awal, tambahkan pilihan bermakna dan “Belum tahu”, tampilkan alasan lalu beri satu contoh baru. Untuk bacaan, beri tempat menulis jawaban singkat dan memperlihatkannya di samping pembahasan. Gunakan rubrik ringkasan untuk penilaian mandiri. Pembahasan yang dapat dibuka dengan Enter dan Space dan tersedia pada HTML tanpa JavaScript sudah berfungsi pada pelajaran shalat. [Latihan shalat](./bukti-ux-pasca-iqra/04-pembahasan.png) · [Latihan tanya jawab](./bukti-ux-pasca-iqra/05-latihan-tanya.png) · [Uji bacaan](./bukti-ux-pasca-iqra/06-uji-bacaan.png).

### P1 · Jalur percakapan berhenti di contoh baca

Buka “Tanya ‘ini apa?’ dan ‘ini siapa?’”. Ada dua pasangan tanya-jawab Arab standar, terjemahan Indonesia, dan audio dari browser untuk setiap contoh. Periksa katalog serta menu Latihan. Materi yang ditemukan berfokus pada membaca contoh, membuka pembahasan, dan mengganti kata pada contoh tata bahasa. Kompetensi interaksi dialog CB-20 masih tercatat sebagai backlog. Pelajaran tentang klausa penjelas mencantumkan CB-20 dalam daftar materi, namun tugasnya tentang menemukan kabar utama dan keterangan. Bukti untuk CB-20 perlu berasal dari tugas dialog.

Ubah dua pasangan yang sudah ada menjadi dialog dua orang dengan jeda agar pelajar dapat menjawab sebelum mendengar model. Lanjutkan ke salam, nama atau asal, dan satu pertanyaan balik. Tampilkan label Arab standar. Gunakan suara yang telah ditinjau untuk tugas menyimak. Dalam simulasi tanpa suara Arab, petunjuk pemasangan terlihat setelah membuka “Pengaturan audio browser”, sementara penekanan tombol contoh belum memberi petunjuk yang terlihat di dekat tombol saat dicek. Uji pesan kegagalan dan pilihan untuk meneruskan lewat teks di Safari iOS serta Chrome Android. [Graf kompetensi](../curriculum/COMPETENCY_GRAPH.md) · [Daftar pelajaran](../content/public-lessons.md) · [Rencana audio](../content/tracker.md#audio).

### P1 · Pelajar perlu jembatan untuk memilah inti dan detail

`/belajar/gagasan-utama-paragraf/` memberi teks tentang rak pertukaran buku. Soalnya meminta satu kalimat tanpa memasukkan letak dan angka. Di `/belajar/uji-membaca-dokumen/`, tiga paragraf pengumuman diikuti empat soal. Pelajar mencari waktu, lokasi dan apa yang perlu dibawa, memeriksa dugaan jumlah peserta, dan menulis ringkasan. Pembahasan pertama menunjuk paragraf yang mendukung jawabannya. Pengaturan harakat berhasil menyembunyikan tanda dan mengembalikannya saat diuji.

Pertahankan tugas pengumuman sebagai target setelah pelajar terbiasa dengan teks pendek. Tambahkan contoh Indonesia dari konteks yang sama, lalu latihan dua atau tiga kalimat Arab dengan tugas “Apa yang terjadi?” dan “Bagian mana buktinya?”. Setelah itu, latihan inti satu paragraf dapat meminta jawaban dengan kata sendiri dan satu detail pendukung. [Teks uji berharakat di ponsel](./bukti-ux-pasca-iqra/07-bacaan-ponsel.png) · [Uji bacaan](./bukti-ux-pasca-iqra/06-uji-bacaan.png).

### P2 · Kepadatan berasal dari urutan dan istilah

Beranda memberi satu tombol utama yang jelas dengan pilihan Iqra. Bagian pembuka daftar pelajaran dan menu Latihan memakan hampir satu layar sebelum muncul materi yang dapat dipilih pemula. Pada menu Latihan, kartu teratas meminta pengguna mengganti kata lewat “modal pencarian kamus” dan membuka “praktik contoh dinamis”. Alatnya bekerja saat diuji. “Buku itu baru” berubah menjadi “Sekolah itu baru” dan dapat dikembalikan dengan Reset. Posisikan alat itu setelah latihan makna pertama dan beri label seperti “Coba susun kalimat dari contoh”.

Bagian Arab yang diperiksa tidak melebar keluar layar pada 390 px, dan halaman Bedah per kata yang diuji muat pada 320 px. Masalah visual utama pada jalur awal adalah bagian atas yang memakai ruang sebelum langkah berikutnya. Pangkas pengantar yang mengulang tujuan, dekatkan satu contoh dan satu tindakan, lalu letakkan nahwu, sharaf, dan rincian harakat di panel yang dapat dibuka. Pertahankan penjelasan seperti “siapa melakukan apa” dan “-ku/-nya” yang sudah langsung menyebut fungsi kata. [Daftar di ponsel](./bukti-ux-pasca-iqra/01-daftar-ponsel.png) · [Panduan bahasa lugas](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/).

## Perbandingan kurikulum

| Rujukan                                                                                                                                                                                                                             | Apa yang dipakai di roadmap                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Council of Europe, CEFR Companion Volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4), hlm. 54 dan 72                                                                                           | Deskriptor A1 memberi contoh membaca teks yang sangat pendek dan interaksi dengan pertanyaan sederhana, pengulangan, serta bantuan lawan bicara. Tambah bacaan 2–3 kalimat sebelum pengumuman yang lebih panjang dan nilai interaksi lisan secara terpisah.                     |
| [Sprachenzentrum Universität Wien, Arabic A1](https://sprachenzentrum.univie.ac.at/en/niveau-beschreibungen/arabic/)                                                                                                                | A1/1 mulai dari salam, perkenalan, dan asal. A1/2 melanjutkan ke tanya jawab sederhana dan konteks seperti waktu dan tempat tinggal. Jadwalkan percakapan sejak unit awal, bersama tata bahasa yang diperlukan untuk situasi itu.                                               |
| [Al Jazeera Learning Arabic, titik mulai untuk pembaca huruf Arab](https://learning.aljazeera.net/ar/node/836) dan [contoh dialog “Siapa Anda?”](https://learning.aljazeera.net/en/languageofmedia/%D9%85%D9%86-%D8%A3%D9%86%D8%AA) | Pusat belajar ini mengarahkan pembaca yang sudah mengenal huruf ke pelajaran komunikasi. Contohnya memakai giliran bicara serta transkrip yang bisa ditampilkan dengan atau tanpa harakat. Ambil bentuk kegiatan untuk dialog orisinal berdurasi pendek dengan bantuan harakat. |

[Roadmap pengembangan dan tugas pilot](../curriculum/ROADMAP.md)
