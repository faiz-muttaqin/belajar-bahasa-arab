# Riset Pedagogi, Kurikulum, Onboarding, dan UX — Website Belajar Bahasa Arab untuk Penutur Indonesia

> **Status:** research-informed design proposal, **bukan kurikulum final atau materi siap terbit**  
> **Tanggal kajian:** 13 November 2026  
> **Proyek:** `belajar-bahasa-arab` · `arab.faizmuttaqin.com` (nama usulan)  
> **Teknologi yang diasumsikan:** SvelteKit static-first, audio terpragenerasi, penyimpanan progres browser; keputusan teknologi detail ada di `ARABIC_LEARNING_STACK_GUIDE.md`.

## 0. Cara membaca dokumen ini — instruksi bagi developer dan AI agent

1. Pisahkan **temuan sumber**, **inferensi pedagogis**, dan **keputusan produk**. Label `Evidence`, `Design hypothesis`, atau `To verify` dipakai untuk membedakannya.
2. Jangan menganggap _Iqra selesai = paham bahasa Arab_. Iqra mengajarkan decoding/bacaan Al-Qur'an; memahami bahasa Arab adalah kompetensi yang berbeda.
3. Jangan menganggap cara bayi memperoleh bahasa pertama adalah urutan optimal untuk pembelajar dewasa. Kita meminjam kegiatan mendengar–meniru–asosiasi, **ditambah** penjelasan eksplisit yang singkat, latihan bermakna, dan retrieval practice [R04, R05, R06].
4. Sumber **kurikulum pemerintah** dipakai sebagai pembanding capaian, bukan perintah menyalin urutan MI/MTs/MA ke situs untuk dewasa. Sumber **metode komersial** hanya dipakai sebagai referensi rancangan; jangan menyalin teks, latihan, ilustrasi, rekaman atau struktur buku secara substansial tanpa lisensi.
5. Setiap contoh Arab, transliterasi, i'rab/morfologi dan audio terbit **harus ditinjau penutur/guru bahasa Arab kompeten**. AI boleh mendraf, tidak menjadi otoritas akhir.
6. Dokumen ini memprioritaskan Fusha / Modern Standard Arabic (MSA) untuk keterampilan umum. Pembedaan MSA, Arab klasik/Al-Qur'an, dan dialek percakapan harus eksplisit; jangan menjanjikan seluruhnya dari satu program dasar [R09, R10].
7. Jangan memblokir seluruh situs karena hasil tes awal. Prasyarat keras hanya berlaku untuk **kompetensi fondasional yang benar-benar diperlukan** oleh aktivitas berikutnya; materi tetap dapat dijelajahi.

---

## 1. Ringkasan keputusan yang direkomendasikan

**Product thesis:** _Bahasa Arab yang dipahami, bukan sekadar istilah yang dihafal._ Dari situasi sehari-hari dan suara, ke teks berharakat, makna, bentuk kata dan kalimat, baru kemudian istilah gramatikal dan bacaan mandiri.

**Jalur awal:**

- **Jalur utama — 'Saya sudah bisa membaca Arab':** onboarding singkat, cek kesiapan opsional, pelajaran pertama langsung dimulai; pengguna mendengar dan memahami contoh sejak menit pertama.
- **Jalur fondasi — 'Saya ingin mulai dari huruf':** huruf dan bunyi, sambungan huruf, harakat, sukun/tasydid/tanwin, pembacaan bertahap. **Bukan reproduksi digital buku Iqra berhak cipta**; rancang latihan orisinal [R01, R02].
- **Jalur review — 'Saya pernah belajar nahwu/sharaf':** tes singkat yang dapat dilewati, langsung menuju konsep yang belum dikuasai.
- **Jalur minat — 'Bahasa Arab percakapan / membaca teks / memahami Al-Qur'an':** bukan tiga kurikulum terpisah pada MVP; gunakan preferensi untuk contoh dan rekomendasi. Semua memulai dengan fondasi bahasa, kemudian masuk ke modul spesialisasi.

**Siklus aktivitas per konsep:** lihat situasi → dengar → tebak makna → lihat tulisan → perhatikan pola → penjelasan Bahasa Indonesia → latihan ingatan **tanpa jawaban terlihat** → feedback → review terjadwal.

**Mastery:** fokus 4 kemampuan: (1) mengenali bunyi/membaca, (2) memahami makna, (3) membedakan struktur, (4) mengingat/menghasilkan. Nilai per kemampuan, bukan satu persentase global.

**Batas MVP:** tidak ada akun wajib, tidak ada AI tutor real-time, tidak perlu mikrofon/ASR wajib, tidak ada gamifikasi yang memanipulasi. Audio statis dan interaksi lokal mencukupi.

---

## 2. Apa sebenarnya yang didukung riset?

| Temuan dan status evidensi                                                                                                                                                         | Implikasi untuk aplikasi                                                                                        | Batasan                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spaced practice membantu retensi L2**; meta-analisis 48 eksperimen/3.411 peserta. **Evidence: kuat** [R05].                                                                      | Jadwalkan review kosakata, bentuk kata, dan pola kalimat; tampilkan daftar 'Perlu diulang'.                     | Jadwal 1/3/7/14 hari adalah **heuristik desain**, bukan angka universal yang dibuktikan studi tersebut.                                       |
| **Instruksi eksplisit L2 bisa efektif**; meta-analisis menemukan keuntungan pembelajaran terfokus/eksplisit. **Evidence: cukup kuat** [R06].                                       | Setelah contoh bermakna, beri _micro-explanation_ dalam bahasa Indonesia dan sebut istilah Arab.                | Studi lintas bahasa; efeknya tidak membuktikan satu urutan terbaik untuk Arab Indonesia.                                                      |
| **Harakat membantu sebagian pembelajar L2 pada tahap awal**; studi pembelajar Arab asing dan kajian mekanisme baca Arab. **Evidence: moderat, kontekstual** [R07, R08, R09].       | Default teks **berharakat** pada tahap awal; kemudian perkenalkan teks tanpa harakat secara bertahap.           | Pada pembaca mahir/penutur asli, harakat bisa meningkatkan kepadatan visual. Hindari aturan 'selalu berharakat' untuk semua level [R08, R10]. |
| **Kesadaran morfologi, fonologi, ortografi** terkait kemampuan membaca Arab. **Evidence: kuat sebagai kaitan; kausalitas intervensi bervariasi** [R09, R10].                       | Perlihatkan akar-pola setelah pengguna mengenal beberapa kata; bedakan bunyi, tulisan, akar, afiks, dan fungsi. | Jangan menganggap menampilkan akar kata saja otomatis meningkatkan kemampuan.                                                                 |
| **Retrieval practice + umpan balik** membantu belajar kosakata dalam eksperimen bahasa lain. **Evidence: moderat** [R11, R12].                                                     | Setelah melihat contoh, siswa memilih, mengingat, mengurutkan, menulis; feedback menjelaskan alasan.            | Jangan memperlakukan satu jawaban benar sebagai retensi jangka panjang.                                                                       |
| **Multimedia yang koheren, berdekatan dan tersegmentasi** dapat membantu belajar; overview dari banyak tinjauan. **Evidence: kuat secara umum** [R13].                             | Audio, kata Arab, gambar konteks pada satu layar; hindari animasi kosmetik dan informasi berlebihan.            | Temuan umum e-learning, bukan bukti setiap animasi meningkatkan belajar Arab.                                                                 |
| **Onboarding panjang tidak selalu memperbaiki performa**; NN/g menyarankan kontekstual dan skippable. **Evidence: kuat untuk UX, bukan capaian bahasa** [R14, R15].                | Mulai belajar dulu; sesuaikan jalur secara progresif, bukan meminta banyak form.                                | Perlu uji usability terhadap pelajar Indonesia.                                                                                               |
| **Keterampilan bahasa perlu dinilai terpisah** (listening, speaking, reading, writing). ACTFL dan CEFR mendefinisikan kemampuan dengan _can-do_. **Framework standar** [R16, R17]. | Dashboard melacak 4 keterampilan, tanpa menjanjikan 'A1' hanya karena menuntaskan X pelajaran.                  | Sertifikasi level CEFR/ACTFL butuh asesmen yang tervalidasi.                                                                                  |

**Penting tentang hipotesis 'belajar seperti bayi':** bayi memperoleh bahasa lisan melalui paparan interaktif dalam lingkungan yang sangat berbeda dari pelajar dewasa. Untuk dewasa Indonesia, kemampuan membaca aksara Arab yang sudah ada dan kemampuan membandingkan bahasa Indonesia adalah **aset**; jangan sengaja menghilangkannya demi meniru pemerolehan bayi. Metode yang diusulkan adalah _meaning-first + explicit form noticing + spaced retrieval_, **bukan** klaim bahwa ini metode terbaik yang sudah terbukti untuk semua populasi.

---

## 3. Perbandingan kurikulum dan metode yang relevan

### 3.1 Acuan kurikulum dan standar (bukan salinan materi)

| Acuan                                                                                                                                           | Yang relevan                                                                              | Kelebihan sebagai referensi                                       | Tidak langsung cocok untuk situs ini                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kemenag: KMA 1503/2025** yang merevisi **KMA 450/2024**, beserta **Kepdirjen Pendis 9941/2025** tentang CP PAI & Bahasa Arab [R18, R19, R20]. | Rasional, tujuan, capaian fase MI–MA, pembelajaran mendalam, asesmen.                     | Sangat relevan untuk konteks Indonesia.                           | Targetnya lembaga madrasah dan fase sekolah, bukan otomatis pembelajar dewasa otodidak.                                                      |
| **Kemenag: KMA 183/2019** [R21].                                                                                                                | Jejak kurikulum sebelumnya dan perbandingan kompetensi.                                   | Berguna secara historis.                                          | **Jangan** tandai sebagai regulasi utama yang mutakhir bila sudah direvisi/digantikan kebijakan berikutnya.                                  |
| **Kemendikdasmen: Panduan Bahasa Arab Fase F (2025)** [R22].                                                                                    | 4 keterampilan, pemetaan materi esensial, pembelajaran bermakna, contoh alur tujuan.      | Panduan nyata menerjemahkan capaian menjadi tujuan dan aktivitas. | **Khusus Fase F SMA/MA kelas XI–XII**, bukan kurikulum dasar SD/MI atau kursus bagi pemula.                                                  |
| **Al-‘Arabiyyah Bayna Yadayk** (_Arabic for All_) [R23, R24].                                                                                   | Fusha untuk non-penutur; dialog, kosakata, bunyi, pola, membaca, menulis, audio, tes.     | Desain pelajaran terintegrasi 4 keterampilan; jalur bertahap.     | Buku berlisensi/hak cipta; metode utamanya berbahasa Arab tanpa bahasa perantara, sedangkan situs kita sengaja memakai penjelasan Indonesia. |
| **ACTFL 2024** dan **CEFR 2020** [R16, R17].                                                                                                    | Deskriptor fungsional mendengar, berbicara, membaca, menulis; _can-do_, novice/pre-A1/A1. | Menjaga produk berorientasi kemampuan, bukan hafalan terminologi. | Tidak otomatis menjadi sertifikasi level; adaptasi khusus Arab diperlukan.                                                                   |
| **Umm Al-Qura University — program Arabic as L2** [R25].                                                                                        | Membaca, menyimak, percakapan, tata bahasa fungsional, menulis.                           | Referensi program non-penutur secara akademis.                    | Beban jam dan setting perguruan tinggi tidak cocok untuk microlearning.                                                                      |

**Prioritas referensi:** regulasi Kemenag mutakhir → buku teks resmi Kemenag untuk contoh struktur capaian → kurikulum khusus Arab sebagai bahasa asing → penelitian pembelajaran Arab → kajian umum pembelajaran bahasa → review produk sebagai inspirasi UX. Tidak semua kategori punya kualitas evidensi yang sama.

### 3.2 Pendekatan/metode pengajaran

| Pendekatan                                               | Cara utama                                                                                        | Keunggulan                                                | Kelemahan / risiko                                                              | Keputusan                                                                             |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Iqra/Ummi** [R01–R02]                                  | Bertahap mengenali/membaca aksara; dengar–ulang; pada Ummi ada pola _direct method_ dan repetisi. | Baik sebagai jalur decoding awal.                         | **Membaca tulisan Al-Qur'an tidak identik memahami bahasa Arab**.               | Modul fondasi opsional, tujuan terukur.                                               |
| **Audio-lingual / listen-repeat** [R26]                  | Mendengar, menirukan dialog/pola.                                                                 | Paparan suara, kefasihan pola sederhana.                  | Repetisi dapat tanpa pemahaman; sulit mengukur transfer ke situasi baru.        | Komponen aktivitas, bukan seluruh metode.                                             |
| **Direct / natural / immersion** [R26]                   | Menjelaskan konsep melalui Arab, konteks dan visual.                                              | Mengurangi ketergantungan terjemahan, memperbanyak input. | Pemula bisa bingung pada konsep abstrak; aplikasi tanpa guru perlu scaffolding. | Pakai untuk instruksi pendek dan contoh; ada tombol penjelasan Indonesia.             |
| **Grammar–translation / qawa'id wa tarjamah** [R26, R27] | Istilah, aturan, terjemahan, latihan bentuk.                                                      | Berguna untuk pembaca teks dan kesadaran struktur.        | Sering membuat orang hafal isim/fi'il tanpa memahami fungsi/komunikasi.         | Gunakan sebagai penjelasan ringkas **setelah** contoh dan eksplorasi.                 |
| **Communicative / task-based** [R27]                     | Memakai bahasa untuk mencapai tujuan dalam konteks nyata.                                         | Menghubungkan arti ke penggunaan.                         | Perlu situasi dan feedback yang akurat.                                         | Jalur utama micro-task: 'tunjuk benda', 'menanyakan tempat', 'menjelaskan aktivitas'. |
| **Morphology / root–pattern explicit** [R09, R10]        | Melihat keteraturan akar, pola, morfem dan fungsi.                                                | Khusus bahasa Arab, membantu pemahaman keluarga kata.     | Sangat mudah menjadi beban istilah sharaf terlalu dini.                         | Diintroduksi setelah sejumlah contoh konkret dipahami.                                |
| **Spaced retrieval** [R05, R11]                          | Mengingat lagi tanpa melihat solusi, setelah jeda.                                                | Retensi jangka panjang.                                   | Jadwal/kesulitan mesti dikalibrasi.                                             | Lapisan review lintas semua modul.                                                    |

**Kombinasi yang diusulkan:** _communicative meaning-first + scaffold bahasa Indonesia + eksplisit yang ringkas + audio imitative + morphology awareness + spaced retrieval_; label **Design hypothesis** sampai diuji pada pengguna sasaran.

### 3.3 Target bahasa dan perbedaan ragam

- **Fase 1:** _fusha/Modern Standard Arabic_, terutama bahasa sederhana yang bisa dipakai untuk membaca dan memahami kalimat.
- **Fase lanjutan:** modul khusus teks klasik/Al-Qur'an (dengan istilah sharaf/nahwu dan konteks tafsir), serta pengenalan dialek untuk percakapan bila diperlukan.
- Perbedaan MSA–dialek dan mekanisme ortografi/diakritik adalah ciri bahasa Arab yang harus dipertimbangkan [R09, R10].
- Tanda level 'novice', 'A1', dan 'Fase A' **jangan diperlakukan saling ekuivalen** tanpa pemetaan dan penilaian formal.

---

## 4. Onboarding: desain pengguna baru, benar-benar bisa mulai belajar

### 4.1 Prinsip UX

1. **No mandatory account.** CTA pertama langsung mencoba pelajaran.
2. **Jangan melabeli pengguna 'bisa Iqra pasti mahir membaca'.** Tawarkan cek singkat, tidak memalukan.
3. **Satu keputusan utama per layar**, tetapi hindari wizard lima–sepuluh pertanyaan.
4. **Beri nilai sebelum meminta preferensi.** Pengguna melihat satu contoh Arab bermakna, memainkan audio dan menebak gambar.
5. **Help kontekstual** tepat saat menghadapi konsep baru; tidak perlu tur UI penuh [R14–R15].
6. **Kebebasan untuk mengubah jalur** di pengaturan/profil lokal kapan saja.

### 4.2 User flow usulan

```text
Landing / Pelajaran contoh publik
    │
    ├─ Mulai belajar bahasa Arab → 1 micro-lesson (tanpa login)
    │      │
    │      ├─ "Sudah bisa membaca tulisan Arab?" (opsional)
    │      │     ├─ Bisa → post-Iqra
    │      │     ├─ Sedikit → cek bunyi/harakat singkat
    │      │     └─ Belum → fondasi baca (Iqra-like orisinal)
    │      │
    │      ├─ (Opsional) cek kesiapan 3–6 item ≠ sertifikasi
    │      └─ Rekomendasi unit berikutnya + tombol Lewati
    │
    ├─ Belajar membaca huruf Arab → modul fondasi
    └─ Lihat seluruh materi → katalog publik
```

**Minimal landing:** judul jelas, subheading 'Dengarkan, pahami, lalu pelajari polanya', CTA `Mulai pelajaran 1`, secondary `Belum bisa baca Arab?`, demo 1 contoh dengan audio, sinyal 'tanpa akun · progres tersimpan di perangkat', tautan kurikulum, dan disclaimer audio.

**Placement assessment** (jika dibuat): 1 suara-ke-gambar, 1 baca teks berharakat, 1 paham kata, 1 paham kalimat, 1 beda pola. Jangan minta rekam suara di onboarding. Jika gagal, rekomendasikan penguatan; jangan melarang eksplorasi materi.

**Definisi 'first success':** pengguna dapat mengasosiasikan bunyi + teks + makna suatu kalimat/ungkapan dan mendapat feedback yang dapat dipahami dalam satu sesi pendek. Ini metrik desain, bukan klaim empiris.

### 4.3 Layar inti dan urutan desain

| Layar              | Konten inti                                             | Interaksi & aksesibilitas                             |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------------- |
| Landing            | CTA dan demonstrasi 1 kalimat Arab                      | HTML statis, ramah mesin pencari; audio click-to-play |
| Onboarding ringan  | pilih/skip jalur                                        | tombol skippable, tidak memerlukan email              |
| Dashboard lokal    | Lanjutkan, materi hari ini, review due, minat           | progress di IndexedDB; fallback jika belum ada data   |
| Unit map           | pembelajaran bertahap, target _can-do_                  | tiap node tautan yang punya URL sendiri               |
| Lesson             | audio, contoh berharakat, visual, makna, pola, latihan  | satu fokus; controls replay/lambat/harakat (opsional) |
| Feedback           | benar/salah + **alasan yang bisa dipahami**             | bukan hanya animasi centang/silang                    |
| Review             | item jatuh tempo + asal konsep                          | spaced retrieval; jangan autoplay semua audio         |
| Dictionary/grammar | contoh + 'bahasa Indonesia dulu' + nuansa/pengecualian  | bisa dicari, deep link publik                         |
| Jalur fondasi      | huruf bunyi, sambungan, harakat                         | pisahkan target baca dan target paham                 |
| Settings           | light/dark, font Arab, size, transliterasi, audio speed | export/import progres, opsi hapus data                |

**Desain visual:** struktur mirip _reader_ yang tenang, bukan dashboard SaaS. Satu konsep utama per viewport, ruang kosong lega, audio jelas, representasi Arab besar, visual yang hanya relevan, progres minimal. Dukung light/dark; uji teks Arab dalam dua tema.

### 4.4 Referensi UI yang benar-benar dapat dibuka

- [AlifBee Bahasa Indonesia](https://www.alifbee.com/id) — rujukan kategori produk Arab dengan 4 keterampilan, konten audiovisual dan latihan.
- [AlifBee English (contoh visual interaksi)](https://www.alifbee.com/en) — contoh micro-lesson huruf/suara.
- [Duolingo course Arabic](https://en.duolingo.com/course/ar/en) — rujukan micro-lessons/gamification, **jangan** menyalin tampilan/karakter/kurikulumnya.
- [NN/g mobile app onboarding](https://www.nngroup.com/articles/mobile-app-onboarding/) — kritik tutorial onboarding berlebihan.
- [NN/g contextual onboarding](https://www.nngroup.com/articles/onboarding-tutorials/) — bantuan kontekstual dan progressive disclosure.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — standar aksesibilitas: target interaksi, contrast, keyboard, reduced motion.
- [W3C Arabic & Persian Layout](https://www.w3.org/International/alreq/) — kebutuhan aksara Arab, arah dan diakritik.

**Tidak meniru secara verbatim:** inspirasi interaksi boleh, visual/copy/asset harus orisinal.

---

## 5. Rencana kurikulum produk — **draft yang harus divalidasi guru**

### 5.1 Prinsip struktur

- **Unit** berisi tujuan _can-do_ dan 2–5 konsep utama.
- **Pelajaran** berisi satu masalah bermakna, contoh audio/teks, latihan dan feedback.
- **Konsep** (graf prasyarat) terpisah dari urutan unit agar bisa direview di banyak konteks.
- **Kosakata** memilih kata berguna dalam konteks, bukan angka frekuensi buatan. Setiap pilihan punya alasan dan sumber.
- **Pola gramatikal** diperkenalkan saat sudah ada dua contoh yang dapat dibandingkan; istilah menyusul.
- **Pengulangan** memakai konteks bervariasi; hindari sepuluh soal yang hampir identik.

### 5.2 Dua jalur yang bertemu

**Jalur A — Fondasi membaca (opsional)**

| Tahap | Target observable                                                       | Catatan gate                                                                                     |
| ----- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| A0    | membedakan beberapa bunyi Arab penting dan memilih audio sesuai tulisan | penguatan fonologi, terutama bunyi yang sering tertukar oleh penutur Indonesia                   |
| A1    | mengenali huruf dan variasi bentuk awal/tengah/akhir                    | jangan menuntut kaligrafi                                                                        |
| A2    | membaca harakat dasar /a i u/, vokal panjang, sukun                     | decoding akurat pada kata yang belum dihafal                                                     |
| A3    | membaca tasydid/tanwin dan kata pendek berharakat                       | hubungkan ke bunyi dan makna bila memungkinkan                                                   |
| A4    | membaca ungkapan dan kalimat sederhana berharakat                       | **boleh bergabung dengan Jalur B** tanpa harus menyelesaikan seluruh topik tajwid tingkat lanjut |

**Jalur B — Inti Bahasa Arab pasca-Iqra (utama)**

| Unit (proposed)         | Tujuan _can-do_ yang dapat diuji                            | Contoh isi dan penjelasan                                                                |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| B0: kesiapan & bunyi    | membedakan suara/tulisan dan menemukan makna kata sederhana | perbedaan bunyi; harakat yang memengaruhi makna                                          |
| B1: benda di sekitar    | menunjuk dan menyebut benda secara sederhana                | `كِتَابٌ` buku, `قَلَمٌ` pena; audio + objek                                                   |
| B2: menunjukkan sesuatu | memahami 'ini ...' dan 'ini [benda tertentu]'               | `هَذَا كِتَابٌ` vs `هَذَا الْكِتَابُ` (beda fungsi/jenis ungkapan; perlu review ahli)               |
| B3: deskripsi           | memahami deskripsi sederhana                                | `الْكِتَابُ جَدِيدٌ` = buku itu baru; kalimat nomina tanpa 'adalah' tertulis                    |
| B4: orang dan milik     | memahami hubungan orang/benda                               | pronomina dan konstruksi kepemilikan dasar; hindari menumpuk istilah iḍāfah terlalu awal |
| B5: lokasi              | memahami 'di/atas/dekat' dengan gambar                      | `فِي` = di/dalam; harf jarr dan peran yang tidak identik dengan 'kata hubung' Indonesia   |
| B6: tindakan            | membedakan aksi dan pelakunya dalam kalimat                 | `يَكْتُبُ الطَّالِبُ` = murid sedang/umumnya menulis (tergantung konteks)                        |
| B7: waktu dan bentuk    | membedakan aksi lampau vs bukan lampau                      | `كَتَبَ` vs `يَكْتُبُ`; **jangan** samakan mudāri‘ secara mutlak dengan present tense Inggris   |
| B8: bertanya            | memahami pertanyaan sederhana dalam konteks                 | siapa/apa/di mana; dialog pendek                                                         |
| B9: gender/number       | mengenali dampak gender gramatikal dan bentuk jumlah        | maskulin/feminin, tunggal/jamak; jangan minta hafal semua irregular plural               |
| B10: pola akar kata     | mengenali keluarga kata dengan makna terkait                | ك-ت-ب; perhatikan perbedaan kata dasar/afiks/pola                                        |
| B11: gabungan kalimat   | memahami paragraf singkat bertopik sehari-hari              | dialog + bacaan dengan harakat yang dikurangi bertahap                                   |
| B12: integrasi          | menyimak cerita pendek, membaca, memilih respons            | tes transfer ke contoh **baru**, bukan soal yang sudah dihafal                           |

**Urutan B0–B12 adalah hipotesis**. Materi dan urutannya harus ditelaah ahli Arab + diuji 5–10 pelajar berlatar berbeda sebelum dipromosikan sebagai kurikulum tetap.

### 5.3 Penjelasan tata bahasa berbasis analogi (jangan salah menyederhanakan)

**Lapis pembelajaran:** (1) contoh + makna → (2) analogi Bahasa Indonesia → (3) istilah Arab → (4) batas analogi → (5) contoh kontra.

| Istilah Arab                      | Pendekatan awal Indonesia                                                              | Akurasi dan batas analogi                                                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **اِسْم / ism**                     | kategori luas yang mencakup banyak 'kata benda' dan kata yang menyebut sifat/identitas | **Tidak identik dengan kata benda Indonesia.** Ism dalam gramatika Arab juga mencakup sifat/adjektiva, kata ganti, dan kata tunjuk; jangan menamai semua ism sebagai 'benda'. |
| **فِعْل / fi‘l**                    | kata yang mengungkap tindakan/kejadian beserta informasi bentuk waktu/aspek tertentu   | Mirip kata kerja, tetapi bentuk Arab mengodekan kategori gramatikal berbeda dari bahasa Indonesia.                                                                            |
| **حَرْف / ḥarf**                    | kata partikel/fungsi; seperti sebagian kata depan, kata sambung, kata penyangkalan     | **Bukan sekadar kata hubung.** `فِي` (di/dalam) ialah ḥarf jarr, `وَ` dapat menghubungkan, dan `لَمْ` penyangkalan.                                                               |
| **جُمْلَة اِسْمِيَّة / jumlah ismiyyah**  | kalimat yang dimulai dengan unsur nominal dan dapat menyatakan 'X adalah Y'            | Kalimat Arab tertentu **tidak butuh** kata padanan 'adalah' dalam bentuk sekarang; jangan menyimpulkan semua kalimat tanpa fi‘l = fragmen.                                    |
| **جُمْلَة فِعْلِيَّة / jumlah fi‘liyyah** | kalimat berawal dengan fi‘l                                                            | Perhatikan urutan, kesesuaian dan konteks; beda dengan pola S-P-O Indonesia yang fleksibel.                                                                                   |
| **جَذْر / akar & وَزْن / pola**       | keluarga kata berkerabat, seperti bagian-bagian lego yang memodifikasi makna           | Perubahan makna tidak selalu dapat ditebak dari akar; gunakan contoh dan pengecualian.                                                                                        |

**Contoh visual 1 — “Ini buku” vs “buku ini”**

```text
[orang menunjuk buku]  هَذَا كِتَابٌ  → Ini adalah sebuah buku.
[fokus pada buku tertentu] هَذَا الْكِتَابُ → buku ini (frasa nomina)
```

Keduanya punya `هَذَا`, tetapi fungsi ungkapannya berbeda. Tampilkan adegan dan susunan kata, bukan sekadar terjemahan literal. Contoh harus ditinjau ahli sebelum masuk data produksi.

**Contoh visual 2 — “Siapa melakukan apa”**

```text
كَتَبَ الطَّالِبُ
[tindakan: menulis]  [pelaku: murid]
```

Mulai dengan makna 'Murid itu menulis/telah menulis' dalam suatu konteks cerita, lalu baru memberi label fi‘l dan fā‘il.

**Contoh visual 3 — keluarga akar ك-ت-ب**

```text
كَتَبَ      → ia menulis
يَكْتُبُ    → ia menulis / sedang menulis (bergantung konteks)
كِتَابٌ     → buku
كَاتِبٌ     → penulis
```

Tampilkan **kesamaan konsonan akar** dan perubahan pola hanya setelah pembelajar menguasai arti beberapa contoh; tidak otomatis menganggap semua kata turunan memiliki makna identik.

---

## 6. Apa yang wajib hafal, apa yang harus paham, dan apa yang boleh dibantu?

### 6.1 Jangan memakai satu ukuran mastery

| Tipe                                  | Contoh                                            | Tujuan                                                  | Gate yang disarankan                                                                   |
| ------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Fondasi decoding**                  | huruf + harakat + sambungan                       | bisa membaca **item baru** tanpa memorisasi bentuk utuh | **Perlu untuk aktivitas membaca mandiri**; berikan mode dengarkan jika belum siap.     |
| **Persepsi bunyi**                    | membedakan ح/ه, ع/ء, ق/ك dan bunyi serupa         | membedakan sinyal yang memengaruhi makna                | Gate lokal untuk latihan pengucapan/baca tertentu; jangan memblokir seluruh kurikulum. |
| **Kosakata high-utility**             | kata tanya, kata tunjuk, benda/aksi dalam unit    | recall makna dua arah pada konteks baru                 | Review terjadwal; tidak perlu menghafal daftar besar sebelum unit selanjutnya.         |
| **Pola inti**                         | nominal vs verbal, siapa pelaku, negasi sederhana | membaca kalimat baru dengan tepat                       | Gate sempit pada konsep prasyarat untuk unit lanjutan.                                 |
| **Istilah akademik**                  | mubtada’, khabar, i‘rab rinci                     | dapat menjelaskan aturan pada pelajaran grammar khusus  | **Bukan gate** untuk memahami dialog/kalimat awal.                                     |
| **Pengetahuan budaya/sejarah bahasa** | diglosia, konvensi kitab, alasan istilah          | memberi model mental lebih kuat                         | Opsional dalam panel 'Mengapa demikian?'.                                              |

**Aturan produk (usulan):**

- **Gate 'wajib' bila dependensi nyata:** untuk aktivitas baca mandiri, pastikan kemampuan decoding yang relevan, tetapi pengguna boleh memilih dukungan audio/transliterasi.
- **Mastery concept:** memerlukan **dua kesempatan berbeda** dan item **belum pernah dilihat** (contoh kebijakan produk). Jangan mengklaim threshold 80%/90% sebagai konstanta ilmiah.
- **Tidak ada penalti waktu** untuk pemula; kecepatan bukan pengganti akurasi + makna.
- **Review dapat muncul sambil progres lanjut**, tidak semua kesalahan wajib mengulang seluruh modul.
- **Guru manusia bisa override** rekomendasi/urutan; manual override juga tersedia bagi pelajar mandiri dengan penjelasan konsekuensi.

### 6.1a Tabel rujukan yang dapat dihafal (usulan pemilik produk, 13 November 2026)

**Status: Design hypothesis / To verify.** Pemilik produk mengusulkan tabel rujukan ringkas yang boleh dihafal lebih dulu, misalnya **Tabel Tashrif Istilahi** (pola perubahan bentuk kata menurut wazan) dan **jenis-jenis ḥarf/kata penghubung** (ḥarf jarr, ḥarf ‘aṭf, dll.), dengan penjelasan per baris lewat popup/modal/collapsible.

- **Alasan:** tabel memberi peta yang stabil dan mudah diulang; banyak pelajar Indonesia (pesantren/madrasah) sudah akrab dengan format ini.
- **Ketegangan dengan §6.1:** dokumen ini menempatkan istilah akademik dan hafalan pola _setelah_ contoh bermakna. Kompromi yang diusulkan: tabel sebagai **rujukan opsional** dan bahan **spaced review**, bukan gate; setiap baris menautkan contoh dalam konteks dan penjelasan Bahasa Indonesia; mode hafalan memakai retrieval (tutup kolom, tebak, buka).
- **Yang perlu diriset:** urutan wazan yang dipakai (mis. pola tsulatsi mujarrad/mazid), apakah tabel tashrif istilahi atau lughawi lebih dulu, daftar ḥarf yang relevan untuk MSA vs teks klasik, sumber rujukan yang lisensinya aman, dan efek hafalan tabel terhadap pemahaman (uji dengan butir baru).
- **Aturan konten:** isi tabel tidak boleh dikarang AI; wajib bersumber dan ditinjau guru/linguis sebelum terbit. Sebelum itu UI hanya memakai data fixture berlabel.

### 6.2 Model graf prasyarat (concept DAG), bukan satu pohon pelajaran

```text
[recognize_letters] → [decode_diacritics] → [read_simple_words]
                                         ↘ [read_short_sentences]
[listen_simple_words] → [match_meaning] → [basic_deixis]
                                           ↘ [nominal_sentence]
[identify_agent_action] → [verbal_sentence] → [verb_form_contrasts]
[core_vocab] ───────────────→ [basic_dialogues] → [short_stories]
```

Setiap assessment memetakan satu/multiple konsep. Path belajarnya urutan rekomendasi, bukan kunci akses keras untuk seluruh materi.

### 6.3 Evaluasi yang menunjukkan pemahaman, bukan sekadar ingatan UI

- **Recognition:** dengar `كِتَابٌ` → pilih gambar buku di antara distraktor masuk akal.
- **Comprehension:** dengar kalimat baru → pilih adegan yang sesuai.
- **Production ringan:** tampilkan gambar → susun kata Arab (jangan jadi drag-only; sediakan klik/tap).
- **Transfer:** ganti objek/pelaku dari contoh, lalu cek apakah pelajar masih paham.
- **Retention:** ulangi di hari yang berbeda tanpa melihat jawaban.
- **Explanation:** untuk grammar, minta memilih _mengapa_ sebuah bentuk cocok, bukan hanya menamai label.
- **Audio pronunciation:** jangan otomatis menganggap _speech recognition_ setara penilaian makhraj manusia; untuk MVP cukup 'dengar & tirukan sendiri', tanpa skor pengucapan otomatis.

---

## 7. Desain sebuah pelajaran interaktif

**Target 3–7 menit hanya hipotesis UX untuk diuji**, bukan standar wajib.

1. **Hook konteks (15–25 detik):** adegan nyata sederhana; masalah 'bagaimana menunjuk benda ini?'.
2. **Listen first:** suara dengan tombol Play, teks bisa ditampilkan/ditutup sesuai tahap; jangan mewajibkan audio bagi pengguna tuli.
3. **Associate:** gambar/situasi + kata/kalimat Arab, makna dan subtitle Indonesia.
4. **Notice:** sorot satu pola atau perbedaan bermakna, bukan semua aturan sekaligus.
5. **Explain:** panel Bahasa Indonesia singkat, label bahasa Arab dan batas analogi.
6. **Retrieve:** soal yang membutuhkan mengingat/memahami tanpa jawaban terlihat, dengan feedback yang membetulkan model mental.
7. **Transfer & exit:** contoh baru + ringkasan 1 kalimat dan rencana review.

**Animasi yang berguna:** reveal segment kata setelah pengguna mengklik, highlight akar/prefiks/sufiks, panah hubungan pelaku–tindakan, marker perubahan harakat. **Animasi yang dihindari:** mascot yang bergerak terus, confetti panjang, autoplay, efek transisi yang memutus perhatian saat menyimak.

**Warna pedagogis:** kategori bisa diberi warna pelengkap tetapi **tidak menjadi satu-satunya kanal informasi**. Selalu sertai label teks, pola/ikon, dan legenda. Warna _ism/fi‘l/harf_ bisa berubah dalam mode dark, namun semantik harus konsisten. Untuk pemula jangan memaksakan highlight semua morfem sekaligus.

**Layout responsif:** pada mobile satu kolom `visual -> Arab -> Play -> makna -> interaksi`; pada tablet/laptop split view `contoh + penjelasan` bila tidak mengorbankan fokus; sidebar map boleh sticky hanya di layar besar.

**RTL & Arabic QA:** berikan `lang="ar" dir="rtl"` per span/blok Arab, sementara UI induk `lang="id" dir="ltr"`. Jangan memaksa seluruh halaman RTL karena bahasa antarmukanya Indonesia. Perhatikan tanda kurung, angka, harakat, ligatur, line-height, pemisahan kata, styling pada `prefers-reduced-motion` [R28].

---

## 8. Sistem audio dan quality assurance linguistik

**Sumber tool:** [Voicebox oleh jamiepine](https://github.com/jamiepine/voicebox). README menjelaskan beberapa engine; **Arabic didukung melalui Chatterbox Multilingual**, bukan berarti semua engine mendukung Arabic [R29].

**Pipeline terpisah dari frontend:**

```text
Draft teks Arab → review bahasa → Unicode/harakat canonical
  → Voicebox / engine terpilih → beberapa take → verifikasi audio manusia
  → export compressed assets → manifest ber-ID stabil → static hosting
```

**Wajib per klip:** `id`, `arabicText`, `variant` (MSA, classical, dll.), `speaker/voice`, `engine/version`, `audioPath`, `durationMs`, `reviewStatus`, `reviewer`, `license`, `textVersion`. Pengguna tidak boleh diberi audio **unreviewed** sebagai standar pelafalan.

**Quality gate suara:**

- Makharij / kontras huruf Arab; panjang-pendek vokal; tasydid; tanwin; hamzah; alif maqṣūrah; tā' marbūṭah; waqaf vs washal.
- Pastikan harakat pada teks **sesuai bentuk yang disuarakan**, termasuk perubahan akhir ketika waqaf.
- Bandingkan bunyi otomatis terhadap pengajar/penutur fasih; jika ragu, rekam manusia untuk pasangan minimal dan pelajaran fonologi.
- TTS Arab bisa tidak stabil untuk teks pendek/terpotong dan lafaz berharakat. Evaluasi _per model_, jangan menyimpulkan dari label 'supports Arabic'.
- Ada izin jelas untuk suara referensi/voice cloning; jangan menggunakan suara orang lain tanpa persetujuan.

**UI audio:** replay, slow-playback _bila tanpa merusak pitch/artikulasi_, transcript yang bisa dibaca screen reader, tidak autoplay, preload sesuai kebutuhan. Audio yang tidak tersedia punya fallback teks/rekaman alternatif. Kata/kutipan Al-Qur'an membutuhkan sumber dan aturan penanganan berbeda dari contoh MSA generik.

---

## 9. Data model minimal (contoh kontrak, belum implementasi)

```ts
/** Dokumen ilustratif, tidak perlu memasang ORM pada fase statis. */
type EvidenceLevel = 'official_curriculum' | 'peer_reviewed' | 'secondary' | 'expert_review';

type LearningConcept = {
	id: string;
	category: 'sound' | 'vocabulary' | 'morphology' | 'syntax' | 'usage';
	prerequisites: string[];
	canDoId: string;
	indonesianExplanation: string;
	commonMisconceptions: string[];
	arabicTerms: string[];
	exampleIds: string[];
	evidenceUrls: string[];
	reviewStatus: 'draft' | 'linguist_reviewed' | 'approved';
};

type ArabicExample = {
	id: string;
	arabicWithHarakat: string;
	arabicWithoutHarakat?: string;
	indonesianMeaning: string;
	context: string;
	register: 'msa' | 'classical' | 'dialect';
	transliteration?: string; // optional learner support, not default crutch
	audioId?: string;
	morphology?: Array<{ surface: string; tag: string; gloss: string }>;
	sources: string[];
	reviewedBy?: string;
};

type UserMastery = {
	conceptId: string;
	skill: 'decoding' | 'listening' | 'meaning' | 'structure' | 'production';
	lastAttemptAt?: string;
	nextReviewAt?: string;
	attempts: number;
	correct: number;
	difficultyRating?: number;
};
```

**Static architecture:** pelajaran berada dalam file versioned JSON/Markdown; halaman statis diprerender; pengguna menyimpan progress/bookmark di IndexedDB; `localStorage` untuk tema, preferensi dan _last visited_. Simpan `contentVersion` agar migrasi profil lokal dapat dilakukan. Ekspor/impor data berbasis JSON. Jangan menyimpan source of truth di komponen UI.

**Content lint:** semua `ArabicExample` approved harus lolos validasi: Unicode/normalisasi, `lang/dir`, sumber, audio review, kata/kalimat yang tepat, tidak ada terjemahan ambigu tak diberi konteks, pernyataan grammar punya rujukan dan reviewer.

---

## 10. Pengukuran, pengujian dan validasi hipotesis

### 10.1 Metrik bermakna

| Metrik                          | Mengukur                              | Tidak boleh disimpulkan             |
| ------------------------------- | ------------------------------------- | ----------------------------------- |
| Time to first lesson            | friksi onboarding                     | pembelajaran efektif                |
| First task completion           | apakah orang paham UI/tugas           | kemahiran bahasa secara umum        |
| Delayed recall 1/7/30 hari      | retensi pada item yang pernah dilatih | kefasihan seluruh bahasa Arab       |
| Transfer accuracy               | memahami contoh **baru**              | penguasaan semua konteks            |
| Skill-specific mastery          | konsep mana yang memerlukan penguatan | skor CEFR/ACTFL resmi               |
| Error reason breakdown          | miskonsepsi mana berulang             | penyebab psikologis definitif       |
| Revisit without streak pressure | apakah pengguna merasa terbantu       | kuantitas waktu = kualitas otomatis |

### 10.2 Uji pengguna awal (proposal)

- Rekrut pelajar Indonesia dengan 3 profil: belum baca Arab, bisa baca Iqra, dan pernah belajar nahwu/sharaf tetapi belum paham penggunaannya.
- Setiap orang coba landing, pilih jalur, pelajaran pertama, review, serta kontrol font/audio/dark mode.
- Observasi: 'apa arti `ism` menurutmu?', 'apa beda `هَذَا كِتَابٌ` dan `هَذَا الْكِتَابُ`?', 'bisa membaca kata baru?', 'mampu menjelaskan kesalahan sendiri?'.
- Tes tunda dengan **butir baru**, bukan hanya recall visual UI yang sama.
- Bandingkan **A:** audio+contoh+micro-grammar vs **B:** grammar sebelum contoh, pada sampel lebih besar apabila sudah layak. Jangan mengklaim perbedaan kausal dari 5 pengguna.
- Minta ahli bahasa Arab dan ahli pedagogi memberi _content rubric_, terpisah dari usability testing.

---

## 11. Roadmap riset → desain → implementasi (untuk coding agent)

### Gate P0 — riset dan definisi

- [ ] Tentukan sasaran primer: dewasa Indonesia yang **bisa membaca Arab berharakat tetapi belum memahami makna**.
- [ ] Tetapkan Fusha/MSA sebagai baseline dan catatan beda dengan Arab Al-Qur'an/dialek.
- [ ] Buat daftar 15–25 can-do awal berdasarkan sumber, tidak menyalin soal komersial.
- [ ] Buat konsep DAG awal + aturan gate yang sempit.
- [ ] Review daftar konsep dan contoh Arab oleh guru/linguis.

### Gate P1 — UX prototype (tanpa kurikulum lengkap)

- [ ] Wireframe landing, onboarding opsional, lesson, feedback, review, catalog, settings.
- [ ] Buat **1 lesson reference** lengkap (audio dan contoh sudah direview).
- [ ] Desain dark/light, font/harkat, mobile/tablet/desktop, keyboard/reduced motion.
- [ ] Usability test dengan tiga profil; revisi sebelum membuat puluhan lesson.

### Gate P2 — functional slice static

- [ ] Static lesson per URL + SEO basic.
- [ ] Audio dari file statis; visual situasional; penjelasan Indonesia.
- [ ] IndexedDB review/progress, localStorage preferences, ekspor/impor.
- [ ] Semantically stable IDs, versi konten dan lint quality.
- [ ] Tes beberapa pelajaran fondasi baca, jangan memaksa hafalan istilah.

### Gate P3 — curriculum pilot

- [ ] Buat 2–3 unit post-Iqra dan satu unit fondasi membaca.
- [ ] Retention + transfer tests; lihat miskonsepsi dominan.
- [ ] Evaluasi audio Voicebox untuk kontras huruf; pakai rekaman manusia bila bermasalah.
- [ ] Gunakan temuan studi dan tes untuk memutuskan langkah berikutnya.

### Gate P4 — ekspansi

- [ ] Desain review scheduling yang dapat diperbaiki; jangan menanam angka heuristik ke data konten.
- [ ] Tambah jalur baca Al-Qur'an dan dialek hanya jika fondasi dan review ahli mencukupi.
- [ ] Pertimbangkan sinkronisasi lintas perangkat, akun dan backend **nanti**, bila benar-benar dibutuhkan.

### Aturan keras bagi AI agent

1. **Jangan menghasilkan ratusan pelajaran otomatis** sebelum satu template pelajaran diterima secara pedagogis dan UX.
2. Jangan mengarang referensi, definisi nahwu/sharaf, tashkeel, atau makna kontekstual. Tandai `needs_review` jika tidak yakin.
3. Jangan menyalin latihan dari buku berhak cipta; lakukan transformasi ide metode ke konten orisinal dengan lisensi yang aman.
4. Jangan mengunci pengguna pada prasyarat yang tidak betul-betul diperlukan. Berikan eksplorasi bebas.
5. Jangan memberi nilai pelafalan akurat menggunakan model speech-to-text tanpa validasi yang kuat.
6. Semua asset/audio perlu provenance, status QA, fallback, dan izin/lisensi.
7. Uji mode tanpa audio, tanpa animasi, tanpa login dan tanpa jaringan setelah aset sudah termuat.
8. Setiap perubahan kurikulum atau audio punya review ahli + changelog konten.

---

## 12. Referensi yang sudah diperiksa — tautan untuk agent, dikelompokkan menurut kegunaan

> Semua tautan berikut ditemukan melalui pencarian daring dan diperiksa terhadap halaman hasil/abstrak/dokumentasi resmi pada 13 November 2026. Artikel berbayar bisa hanya tersedia abstraknya. **Label [R#] dipakai di badan dokumen**. Hindari menyebut abstrak sebagai bukti detail metode yang tidak dijelaskan di abstrak.

### A. Belajar membaca awal, pendekatan Indonesia dan psikologi bahasa

- **[R01]** [Metode Ummi — situs penerbit](https://ummifoundation.org/metode) — pendekatan langsung, pengulangan, pembacaan Al-Qur'an; **deskripsi penerbit, bukan uji efektivitas independen**.
- **[R02]** [Iqra K.H. As'ad Humam — dokumen akademik terindeks Garuda](https://download.garuda.kemdikbud.go.id/article.php?article=1765023&title=METODE+IQRA%27+KH+ASAD+HUMAM+PERSPEKTIF+BEHAVIORISTIK&val=18855) — menjelaskan 6 jilid dan progresi; bukan lisensi untuk menduplikasi buku.
- **[R03]** [NICHD/National Reading Panel — phonics](https://www.nichd.nih.gov/publications/pubs/nrp/Pages/findings.aspx) — hubungan huruf-bunyi sistematis **untuk literasi awal secara umum**, transfer ke Arab perlu kehati-hatian.
- **[R04]** [Al-‘Arabiyyah Bayna Yadayk — penerbit resmi](https://www.arabicforall.net/ar/arabic-at-your-hands) — penutur non-Arab dan Fusha; model kurikulum, bukan sumber konten bebas pakai.

### B. Bukti efektivitas belajar, ingatan, morfologi & harakat

- **[R05]** [The Effects of Spaced Practice on Second Language Learning (2022), meta-analysis](https://onlinelibrary.wiley.com/doi/full/10.1111/lang.12479) — 48 eksperimen, 3.411 pelajar.
- **[R06]** [Norris & Ortega (2000), Effectiveness of L2 Instruction — ERIC](https://eric.ed.gov/?id=EJ611436) — keuntungan instruksi bahasa eksplisit; dari abstrak.
- **[R07]** [Shehata (2021), Short Vowels and Context Effects in Arabic — full article](https://www.ccsenet.org/journal/index.php/ies/article/view/0/45724) — membaca berharakat dan konteks pada pelajar dewasa Arab L2.
- **[R08]** [Reading Arabic with diacritics: vowelised but not necessarily easy](https://www.tandfonline.com/doi/full/10.1080/17586801.2017.1400493) — studi hasil beragam pada pembaca native; mengingatkan bahwa harakat tidak selalu mempermudah pembaca mahir.
- **[R09]** [MAWRID: A Model of Arabic Word Reading in Development — PubMed](https://pubmed.ncbi.nlm.nih.gov/28715927/) — tiga faktor: diakritik, morfologi, diglosia.
- **[R10]** [Diglossia and Orthographic Complexity — review 2026](https://link.springer.com/article/10.1007/s10936-026-10214-3) — tinjauan Arab-spesifik fonologi, ortografi, morfologi, progres ke teks tak berharakat; utamanya pelajar native, generalisasi harus hati-hati.
- **[R11]** [Retrieval Practice plus Feedback Benefits L3 Vocabulary — ERIC](https://eric.ed.gov/?id=EJ1420152) — belajar kosakata bahasa ketiga menggunakan retrieval + feedback.
- **[R12]** [Dunlosky et al. (2013), Improving Students' Learning With Effective Learning Techniques](https://www.psychologicalscience.org/journals/pspi/1529100612453266/) — tinjauan strategi belajar.
- **[R13]** [Multimedia Design for Learning, overview of meta-analyses](https://journals.sagepub.com/doi/10.3102/00346543211052329) — signaling, segmentasi, koherensi dan multimedia; umum, bukan hanya Arab.

### C. Onboarding & framework penilaian

- **[R14]** [Nielsen Norman Group — Mobile-App Onboarding](https://www.nngroup.com/articles/mobile-app-onboarding/) — pelajaran desain onboarding dan alasan menghindari tutorial yang tidak perlu.
- **[R15]** [Nielsen Norman Group — Onboarding Tutorials vs. Contextual Help](https://www.nngroup.com/articles/onboarding-tutorials/) — bantuan in-context.
- **[R16]** [ACTFL Proficiency Guidelines 2024](https://www.actfl.org/proficiency-guidelines-overview) — empat kemampuan dan 'can-do' yang teramati.
- **[R17]** [Council of Europe CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) — deskriptor pre-A1/A1 dan seterusnya; gunakan untuk inspirasi kompetensi, bukan klaim level resmi.

### D. Kurikulum nasional, referensi Arab non-penutur dan contoh grammar

- **[R18]** [KMA 1503/2025 — salinan Kemenag Sulawesi Tengah (PDF)](https://sulteng.kemenag.go.id/files/show/20251020162801surat-penyampaian-kma-kurikulum-2025%2Blampiran_compressed-tzR.pdf) — merevisi KMA 450/2024; dokumen besar dapat sulit dimuat pada sebagian layanan.
- **[R19]** [Kemenag tentang KMA 450/2024](https://kemenag.go.id/nasional/kemenag-luncurkan-pedoman-implementasi-kurikulum-bagi-madrasah-raEXW) — konteks regulasi sebelumnya.
- **[R20]** [Kemenag Batam, pembahasan Kepdirjen Pendis 9941/2025](https://batam.kemenag.go.id/main/perkuat-mutu-pembelajaran-pengawas-madrasah-hadiri-perdana-mgmp-pai-dan-bahasa-arab-mts-kota-batam) — verifikasi nomor regulasi; **lampiran CP langsung perlu dibaca untuk pemetaan rinci**.
- **[R21]** [KMA 183/2019 — PDF situs Kemenag daerah](https://kemenagkukar.id/documents/LIST%20HUKUM/Pendidikan%20Agama%20Islam/10.%20KMA%20NO%20183%20TAHUN%202019%20PAI_DAN_BAHASA_ARAB%20PADA%20MADRASAH.pdf) — historis.
- **[R22]** [Kemendikdasmen Panduan Mata Pelajaran Bahasa Arab Fase F 2025 — PDF](https://kurikulum.kemendikdasmen.go.id/file/panduan/dokumen/26.%20Final%20Panduan%20Mata%20Pelajaran%20ARAB_12_Sep_2025_revisi%203.pdf) — untuk SMA/MA Kelas XI–XII, bukan jenjang semua umur.
- **[R23]** [Arabic for All — seri Al-‘Arabiyyah Bayna Yadayk](https://www.arabicforall.net/ar/arabic-at-your-hands) — deskripsi 4 tingkat dan metode Fusha.
- **[R24]** [Arabic for All — konten buku tingkat 1](https://shop.arabicforall.net/ar/store/product/arabic-at-your-hands-student-book-1-1) — unit dialog, vocabulary, structure, listening, speaking, reading, writing.
- **[R25]** [Umm Al-Qura University — Arabic as Second Language curriculum](https://uqu.edu.sa/en/App/Degrees/1976) — contoh pembagian keterampilan.
- **[R26]** [Methods of Arabic Language Learning (2024), jurnal Indonesia](https://jurnal.stain-madina.ac.id/index.php/almaany/article/view/1974) — gambaran direct, natural, grammar–translation, audiolingual.
- **[R27]** [Conventional and Contemporary Arabic Teaching Methods: Comparative Analysis, Indonesia](https://journal.walisongo.ac.id/index.php/alsina/article/view/23307) — metode pesantren vs pendekatan kontemporer; literature review, bukan RCT.
- **[R30]** [Quranic Arabic Corpus — morphology, syntax & grammar](https://corpus.quran.com/documentation/) — **khusus Arab Al-Qur'an**; rujukan penjelasan morfologi dan visual treebank, bukan selalu padanan MSA.
- **[R31]** [AlifBee Bahasa Indonesia](https://www.alifbee.com/id) — benchmark produk belajar Arab MSA untuk pemula; informasi yang diterbitkan pemilik produk.

### E. Implementasi Arabic UI, audio & aksesibilitas

- **[R28]** [W3C Arabic & Persian Layout Requirements](https://www.w3.org/International/alreq/) — RTL, bidi, posisi harakat dan layout aksara Arab; edisi living/draft.
- **[R29]** [jamiepine/voicebox — README](https://github.com/jamiepine/voicebox/blob/main/README.md) dan [engine support](https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/overview/voice-cloning.mdx) — Arabic didukung pada Chatterbox Multilingual.
- **[R32]** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — UI target dan aksesibilitas.
- **[R33]** [Duolingo Arabic course](https://en.duolingo.com/course/ar/en) — inspirasi microlearning; jangan klaim gamifikasi lebih baik tanpa tes khusus.
- **[R34]** [The Quranic Arabic Corpus — word-by-word](https://corpus.quran.com/wordbyword.jsp) — contoh representasi per kata; beda register dan hak penggunaan harus dicek.

### F. Riset yang masih perlu didalami

- **[To verify]** Kumpulkan teks lampiran resmi SK Dirjen Pendis 9941/2025 untuk memetakan CP per fase _secara langsung_, bukan dari ringkasan.
- **[To verify]** Uji empiris perbedaan pedagogi untuk **dewasa Indonesia yang mampu membaca Iqra tetapi belum memahami bahasa Arab**. Literatur Arab di atas banyak berfokus pada penutur asli atau L2 dengan bahasa pertama Inggris; generalisasi terbatas.
- **[To verify]** Lisensi gambar, audio, cuplikan buku pemerintah dan sumber Quranic Corpus sebelum dipakai sebagai materi di website.
- **[To verify]** Bandingkan font Arab berharakat pada Android murah, iOS, desktop dan kondisi dark mode; jangan memilih berdasarkan screenshot saja.
- **[To verify]** Evaluasi kualitas Voicebox/Chatterbox Multilingual terhadap guru/pelafal yang memahami MSA dan makharij; kemampuan synthesizer bukan bukti akurasi pendidikan.
- **[To verify]** Tentukan apakah target awal benar-benar pemahaman Fusha umum, penafsiran Al-Qur'an, atau percakapan sehari-hari; contoh dan urutan unit dapat berubah cukup besar.

---

## 13. Handoff prompt untuk coding agent

> Bangun _hanya_ satu prototype vertikal dari `ARABIC_LEARNING_PEDAGOGY_UX_RESEARCH.md`: landing static, onboarding skippable, satu pelajaran contoh yang sudah disetujui, quiz feedback, dan progress IndexedDB. Gunakan arsitektur SvelteKit static-first dari guide teknis. Jangan membuat database server atau akun. Gunakan layout clean responsif dan `lang=ar dir=rtl` pada elemen Arab. Sediakan dark/light mode, kontrol audio dan reduced motion. **Jangan** menghasilkan konten pelajaran baru atau audio otomatis tanpa status `needs_review` dan sumber. Sajikan keputusan implementasi beserta alasannya dan uji pada mobile/desktop. Semua contoh grammar dan audio wajib tinjauan ahli sebelum publikasi.
