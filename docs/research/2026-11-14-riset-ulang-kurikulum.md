# Riset ulang kurikulum dan pembelajaran (14 November 2026)

> **Status:** hasil riset ulang terhadap [dokumen riset utama](../arabic-learning-pedagogy-ux-research-reissued.md). Bukan kurikulum final. Semua keputusan konten tetap butuh tinjauan guru bahasa Arab / ustadz. Pertanyaan hukum (hak cipta, lisensi, tashih) di sini hanya **latar belakang**; keputusan akhirnya perlu penasihat hukum/IP.
>
> **Metode:** enam agen riset paralel dengan pertanyaan yang tidak tumpang tindih (audit rujukan, frekuensi kosakata Al-Qur'an, teks bacaan shalat, ilmu belajar, kurikulum resmi Indonesia, kurikulum pembanding dan materi terbuka), lalu satu agen kritikus memeriksa kontradiksi dan mengecek ulang 6 URL secara acak. Tidak ada sumber fiktif yang ditemukan; beberapa detail dikoreksi (lihat §8). Agen hanya membaca halaman web, tanpa mengunduh dataset dan tanpa mengarang contoh Arab.

## 1. Ringkasan untuk pemilik produk

1. **Klaim "paham 50%/65%/85% Al-Qur'an" menghitung kemunculan kata (token), bukan pemahaman.** Playlist yang dirujuk [R35–R37] milik kanal YouTube **Arabic 101** (@Arabic101); kanal itu tidak mendefinisikan persentasenya. Situs ini sebaiknya menulis "kata ini muncul N kali dalam Al-Qur'an", **bukan** "paham X% Al-Qur'an", dan menghitung angkanya sendiri dari data korpus dengan satuan yang dinyatakan.
2. **Pendekatan frekuensi + kata bacaan shalat itu mapan** (Arabic 101, Understand Al-Qur'an Academy), cocok dengan hipotesis §6.1b. Tetapi daftar kata, glosa dan urutan mereka berhak cipta; kita hanya meminjam _metode_, bukan isi.
3. **Banyak kata Al-Qur'an paling sering adalah kata tugas** (min, fī, inna, alladhī, mā, lā …). Kata seperti ini tidak cocok dengan kartu ikon; butuh pelajaran pemakaian singkat.
4. **Ikon untuk setiap kata tidak didukung bukti.** Glosa gambar setara (tidak lebih baik) dari glosa teks; gambar membantu kata konkret, bisa mengganggu hafalan bentuk kata, dan baru bermanfaat bila diikuti latihan mengingat dengan gambar disembunyikan. Aturan usulan: **arti Indonesia selalu ada; ikon hanya untuk kata benda konkret; kata abstrak pakai kalimat konteks; kata tugas tanpa ikon.**
5. **Tabel tashrif istilahi sangat dikenal pelajar pesantren** (Al-Amtsilah at-Tashrifiyyah, dihafal lewat _lalaran_), tetapi bukti terbaik mendukung **pola hibrida**: lihat contoh dan temukan polanya dulu (_guided induction_), lalu aturan singkat, lalu tabel sebagai rujukan dan bahan latihan mengingat. Tabel tetap opsional, bukan gerbang.
6. **Terjemahan Kemenag (LPMQ 2019) tertulis "All Rights Reserved"** dan tidak punya lisensi pakai ulang. Jalur yang paling jelas: tautkan ke quran.kemenag.go.id, atau pakai QuranEnc (`indonesian_affairs`) dengan syaratnya (tanpa perubahan, atribusi, nomor versi, wajib memberi tahu QuranEnc bila kita menambah catatan). Penampilan surat utuh mungkin terkena aturan tashih (PMA 44/2016). Ini perlu penasihat dan izin LPMQ.
7. **Kurikulum resmi:** panduan Kemendikdasmen Bahasa Arab **Fase F (2025)** praktis adalah kursus pemula untuk remaja (mapel pilihan, mulai dari nol), dengan 4 elemen keterampilan dan 2 tema (kehidupan sehari-hari, lingkungan sekitar), urutan reseptif → produktif. Ini analog resmi terdekat untuk pengguna dewasa pasca-Iqra kita.
8. **Urutan topik jalur utama perlu ditinjau:** buku Madinah (Durus al-Lughah) memperkenalkan _hādhā_ + _mā/man_ (kata tanya) di pelajaran pertama, sedangkan draf Jalur B kita meletakkan "bertanya" di B8. Kata kerja paling sering di Al-Qur'an (qāla, kāna) juga muncul jauh lebih awal daripada B6–B7.
9. **Yang belum ada sama sekali:** sumber kosakata MSA harian berlisensi terbuka, inventaris kata bacaan shalat yang terverifikasi, glosa Indonesia per kata berlisensi terbuka, lisensi audio, standar transliterasi, dan data kemampuan nyata lulusan Iqra.

## 2. Kosakata Al-Qur'an berbasis frekuensi

### 2.1 Apa arti "X% kosakata"

| Temuan                                                                                                                                                                                                                                                                                                                                       | Status                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Playlist R35–R37 = kanal **Arabic 101**. Metode: Tahap I (7 pelajaran daftar frekuensi + aturan baca + pelajaran khusus kata **مَا**), Tahap II (11 pelajaran + kata majemuk/bentuk bersambung), Tahap III (kata kerja per bentuk II–X lalu variasi bentuk I). Didukung buku berbayar dan dek Memrise. Persentase tidak pernah didefinisikan. | Tinggi (oEmbed + RSS playlist)            |
| Klaim sejenis (Understand Al-Qur'an Academy; buklet "80% of Qur'anic Words": 82,6% = 64.282 dari ±77.800 kata) menghitung **kemunculan kata**, bukan kosakata unik, dan tidak menyebut metode hitungnya.                                                                                                                                     | Sedang                                    |
| Quranic Arabic Corpus (QAC): **77.430 kata** (dipisah spasi) dan **128.219 segmen** morfologis. Persentase berbeda ±1,65 kali tergantung penyebutnya.                                                                                                                                                                                        | Tinggi                                    |
| QAC menerbitkan peringkat frekuensi per lema (non-verba) dan per verba. Teratas: min 3.226; Allah 2.699; fī 1.701; inna 1.682; ʿalā 1.445; alladhī 1.442; verba: qāla 1.618; kāna 1.358. Klitik (wa-, bi-) dan pronomina melekat tidak masuk daftar ini.                                                                                     | Tinggi                                    |
| Hitungan kasar agen (bukan angka terbit): 50 lema non-verba teratas + 10 verba teratas ≈ 35.400 kemunculan ≈ 46% dari 77.430 kata. Jadi "±50% dengan ±100 kata" masuk akal, **jika** penyebutnya kata dan klitik diabaikan.                                                                                                                  | Rendah, perlu dihitung ulang dengan skrip |
| Tidak ditemukan kurva cakupan kumulatif yang terbit di jurnal ilmiah. Angka yang kita hitung sendiri (dan dokumentasikan) akan menjadi sumber primer.                                                                                                                                                                                        | Sedang                                    |

**Keputusan yang diusulkan**

- UI menulis "muncul N kali dalam Al-Qur'an" dengan penjelasan singkat (token ≠ pemahaman). Jangan menyalin label 50/65/85.
- Buat skrip offline (setelah lisensi disetujui) yang menghitung kurva cakupan lema untuk 25/50/65/80/85% dari kata **dan** dari segmen, dengan aturan hitung tertulis (klitik, pronomina, nama diri seperti "Allah").
- Kata tugas di 100 teratas ditandai "butuh pelajaran pemakaian", meniru pola pelajaran khusus مَا dari Arabic 101 (sebagai ide, bukan isi).

### 2.2 Lisensi data Al-Qur'an (latar belakang, bukan nasihat hukum)

| Sumber                                   | Ketentuan pokok                                                                                                                                 | Implikasi                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Tanzil, teks Arab                        | CC BY 3.0, **verbatim** (tidak boleh diubah), kredit + tautan tanzil.net.                                                                       | Tampilkan ayat apa adanya dengan kredit; simpan `textVersion`. Naskah Madani, bukan MSI.                         |
| Quranic Arabic Corpus                    | GNU GPL + syarat pakai (kredit, tautan corpus.quran.com, file tidak diubah). Glosa per kata berbahasa Inggris.                                  | Cocok untuk morfologi/frekuensi dengan kredit; tanya penasihat sebelum menerbitkan data turunan.                 |
| Terjemahan via Tanzil (termasuk Kemenag) | Non-komersial saja; Tanzil bukan pemilik teks Kemenag.                                                                                          | Jangan jadikan dasar lisensi terjemahan Kemenag.                                                                 |
| LPMQ / quran.kemenag.go.id (edisi 2019)  | Bebas dibaca dan diunduh, tetapi "All Rights Reserved – LPMQ", tanpa lisensi; API JSON tidak terdokumentasi.                                    | Tautkan per ayat, atau minta izin tertulis (lajnah@kemenag.go.id).                                               |
| QuranEnc `indonesian_affairs` v1.0.1     | Boleh dipakai ulang: tanpa perubahan, atribusi, nomor versi, ikuti versi terbaru, beri tahu QuranEnc atas catatan kita, tanpa iklan tak pantas. | Jalur pakai ulang paling jelas; cocokkan dulu dengan edisi LPMQ 2019; glosa kita harus terpisah dari terjemahan. |
| Quran.com / Quran Foundation API         | Butuh kredensial; cache maksimal 7 hari; **tidak boleh dibundel saat build**.                                                                   | Tidak cocok untuk situs statis.                                                                                  |
| QuranWBW, hablullah/data-quran           | Tanpa lisensi / sudah 404 (dulu CC BY-NC-ND).                                                                                                   | Jangan dipakai.                                                                                                  |
| MASAQ (Univ. Jordan)                     | CC BY 4.0 (teks Tanzil di dalamnya tetap verbatim).                                                                                             | Alternatif sumber lema dengan lisensi lebih longgar; cek dulu.                                                   |

**Regulasi:** PMA 44/2016 memasukkan mushaf digital dan terjemahan Kemenag ke aturan tashih/izin edar; LPMQ punya _Pedoman Pentashihan Mushaf Al-Qur'an Digital_ (2022). Apakah situs belajar yang menampilkan surat pendek utuh perlu tashih adalah pertanyaan untuk penasihat dan LPMQ. Sampai ada jawaban, **jangan menampilkan surat utuh**; cukup kata dan potongan pendek dengan sumber.

## 3. Bacaan shalat

- Tidak ditemukan satu dokumen resmi Kemenag yang memuat seluruh bacaan shalat secara daring. Rujukan yang dapat dikutip bersifat organisasi: **NU Online** (mengikuti rujukan Syafi'i) dan **Majelis Tarjih Muhammadiyah** (HPT, Tuntunan Ramadhan). Keduanya hak cipta dilindungi: tautkan, jangan salin.
- **Ada variansi yang wajib diberi label:** doa iftitah (beberapa bentuk sahih; NU dan Muhammadiyah berbeda pilihan), lafaz tasyahud (riwayat Ibnu Abbas untuk Syafi'i, Ibnu Mas'ud untuk Hanafi/Hanbali, Umar untuk Maliki), "sayyidina" dalam shalawat, dan tambahan "wa bihamdih" pada tasbih rukuk/sujud.
- **Unit shalat pertama hanya memakai kata inti yang tidak diperselisihkan** (mis. subḥāna, rabbī, al-ʿaẓīm, al-aʿlā, Allāhu akbar, as-salāmu ʿalaikum), setelah ustadz meninjau. Varian menyusul dengan skema label (`variantOf`, `riwayat`, `commonIn: NU/Muhammadiyah`, `isOptional`).
- Lafaz bacaan shalat berasal dari teks hadis, tetapi harakat, transliterasi dan terjemahan dari terbitan tertentu bisa berhak cipta. Menulis glosa dan transliterasi sendiri lalu ditinjau orang yang kompeten adalah jalur yang lebih aman (konfirmasi ke penasihat).
- **Segmentasi kata belum punya standar nasional** (studi LPMQ di Jurnal Suhuf): kita perlu aturan sendiri untuk klitik (wa-, fa-, bi-, li-, al-) dan pronomina melekat, lalu menerapkannya konsisten.
- **Keputusan naskah:** naskah Tanzil Uthmani selaras dengan QAC, sedangkan Mushaf Standar Indonesia (MSI) lebih akrab bagi lulusan Iqra tetapi hak cipta dilindungi. Perlu keputusan per permukaan (kosakata Al-Qur'an, bacaan shalat, pelajaran MSA).

## 4. Ilmu belajar: empat pilihan desain

| Pilihan                       | Temuan (bukti)                                                                                                                                                                                                                                                                                                                             | Implikasi untuk produk                                                                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ikon / gambar ↔ kata          | Glosa gambar, teks dan audio tidak berbeda bermakna (meta-analisis); glosa L1 > glosa L2. Gambar baru unggul setelah rasa terlalu yakin dihapus lewat latihan mengingat. Gambar membantu kata abstrak hanya bila simbolis (studi kecil); bisa mengganggu hafalan bentuk kata.                                                              | Arti Indonesia selalu ada; maksimal dua kanal makna per kata; ikon hanya untuk benda konkret; setelah tahap "asosiasi", latihan berikutnya **menyembunyikan gambar**. Tambah tag `concreteness` (konkret/abstrak/kata tugas) di skema kosakata.                                     |
| Hafalan tabel vs temukan pola | Instruksi eksplisit > implisit (Spada & Tomita 2010), tetapi selisihnya kecil di meta-analisis terluas. _Guided induction_ unggul di beberapa studi kecil (satu tentang negasi bahasa Arab Palestina, n=27); hasil campuran. Belum ada uji langsung hafalan tashrif pada dewasa. Repetisi bentuk tanpa tautan makna umumnya tidak efektif. | Template "temukan pola": 3–5 pasangan contoh dengan imbuhan disorot → satu pertanyaan pemandu → konfirmasi aturan → tabel ringkas sebagai rujukan. Pilot pada sufiks pelaku kata kerja lampau (contoh harus dari guru).                                                             |
| Jadwal pengulangan            | Spacing efek sedang–besar pada L2; jarak sama dan jarak membesar setara; jarak lebih panjang lebih baik untuk retensi tertunda (Kim & Webb 2022). FSRS lebih akurat memprediksi lupa pada data Anki, tetapi belum terbukti meningkatkan hasil belajar.                                                                                     | Pakai **ts-fsrs** (MIT, jalan di browser), `desired retention` 0,90, parameter bawaan. Pemetaan nilai: salah = Again, benar = Good, benar cepat = Easy, tidak pernah "Hard" untuk jawaban salah. Uji bundel dulu (field `engines` node≥24). Jangan klaim angka retensi ke pengguna. |
| Format latihan mengingat      | Latihan tes > baca ulang; recall > recognition; manfaat tes berpindah ke format baru (d=0,40). Beberapa cloze pendek > satu tugas berat. Menilai kata mana yang cocok dalam konteks paling mendukung belajar.                                                                                                                              | Recall sebagai format utama untuk produksi; recognition cukup untuk tujuan reseptif (memahami bacaan). Cloze dengan pengecoh dari akar/pola yang sama. Umpan balik korektif **wajib** setelah setiap butir (R11 hanya efektif dengan umpan balik).                                  |

## 5. Kurikulum resmi Indonesia

- **KMA 1503/2025** (mengubah KMA 450/2024, ditetapkan 22 September 2025, status berlaku) ada di JDIH Kemenag: ini kerangka implementasi kurikulum madrasah (termasuk pembelajaran mendalam dan Kurikulum Berbasis Cinta), **bukan** rincian isi bahasa Arab.
- **Kepdirjen Pendis 9941/2025** memuat CP PAI dan Bahasa Arab madrasah (Fase A–F). Salinan resmi lampirannya **belum ditemukan**; yang terbaca hanya salinan tidak resmi. Struktur (Komponen Bahasa vs Keterampilan Bahasa; kata kerja naik dari "mengenali" → "mengidentifikasi" → "menganalisis") boleh dipakai sebagai inspirasi, tetapi **daftar tata bahasa per fase belum boleh dipakai** (direkonstruksi dari teks Arab yang rusak).
- **Panduan Kemendikdasmen Bahasa Arab Fase F (2025)** terbaca lengkap: mapel pilihan kelas XI–XII, empat elemen (al-istimāʿ, al-kalām, al-qirāʾah, al-kitābah), dua tema (al-ḥayāt al-yaumiyyah, al-bīʾah), materi esensial (perkenalan, keluarga, kegiatan sekolah, cuaca dan waktu, hobi; bangunan umum, rumah sakit, wisata dan transportasi, peristiwa alam), urutan tujuan reseptif → produktif. Tidak ada jumlah kosakata atau level CEFR.
- **Usulan:** tag setiap pelajaran dengan satu dari empat keterampilan dan satu tema; adaptasi sub-tema untuk dewasa (tempat kerja, perjalanan, masjid) dan buang tema yang terlalu anak-anak (kebun binatang, warna, buah) dari jalur utama.

## 6. Kurikulum pembanding dan materi terbuka

- **Buku Madinah (Durus al-Lughah, V. Abdur Rahim), urutan pelajaran 1–10** (dari kursus komersial; nomor pelajaran berbeda antar edisi): hādhā + mā/man + hamzah tanya → dhālika → al- → huruf jarr, pronomina, kalimat nominal/verbal → iḍāfah, hamzah qaṭʿ/waṣl, nidāʾ → hādhihi, lām milik → tilka, huruf syamsiyah → ulangan → murakkab waṣfī, alladhī → pronomina melekat, kata kerja lampau. Rujukan **urutan** yang baik untuk jalur utama; kata kerja baru muncul sekitar pelajaran 10.
- **Al-ʿArabiyyah Bayna Yadayk:** 4 level, fusha saja, tanpa bahasa perantara, unit = 3 dialog + kosakata + struktur + bunyi + 4 keterampilan + tes. Pinjam bentuk unitnya, bukan medium khusus-Arab dan isinya (hak cipta).
- **Al-Kitaab:** tata bahasa spiral dan disimpulkan dari contoh; alur cerita membawa kosakata. MSA + dialek di luar cakupan kita.
- **Gontor (Durus al-Lughah, metode langsung):** sukses karena imersi 24 jam yang tidak bisa ditiru situs belajar mandiri; mendukung pilihan "instruksi Arab singkat + penjelasan Indonesia saat dibutuhkan".
- **Tradisi pesantren:** Jurumiyah (urutan bab berbasis iʿrāb), Amtsilati (5 jilid, untuk membaca kitab kuning), Al-Miftah lil Ulum; **Al-Amtsilah at-Tashrifiyyah** (K.H. Ma'shum bin Ali) adalah kitab sharaf pertama yang umum, berisi tabel contoh dari istilahi ke lughawi, dihafal lewat _lalaran_, di sebagian pesantren menjadi syarat naik kelas. Enam bab dasar dalam versi web mengikuti urutan yang tercantum pada [Ringkasan Al-Amtsilah, bagian 5.2](https://www.terjemahmatan.com/2017/03/download-buku-ringkasan-al-amtsilah-at.html). Catatan sebelum implementasi: urutan bagian tambahan masih menunggu kolasi edisi cetak.
- **Materi berlisensi terbuka:** Wikibooks Arabic dan Wiktionary (CC BY-SA 4.0), Tatoeba (CC BY 2.0 FR, atribusi per penulis kalimat), MSU _Elementary Arabic I_ (CC BY-NC 4.0), Edinburgh _Roots & Routes_ (CC BY-NC-SA 4.0), matan Jurumiyah (kemungkinan domain publik; edisi modern tidak). Semua tetap butuh tinjauan guru; campuran SA/NC/GPL/verbatim harus diputuskan setelah **lisensi konten situs ini sendiri** ditetapkan.

## 7. Keputusan yang dibutuhkan dari pemilik produk

| No. | Keputusan                       | Opsi / catatan                                                                                     |
| --- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| D-1 | Lisensi konten situs ini        | Mis. CC BY-SA 4.0 untuk teks kita; menentukan sumber mana yang boleh diimpor. Perlu penasihat IP.  |
| D-2 | Naskah Arab per permukaan       | Tanzil Uthmani (lisensi jelas, selaras QAC) vs MSI (akrab, hak cipta). Bisa berbeda per permukaan. |
| D-3 | Sumber terjemahan Al-Qur'an     | Tautan ke quran.kemenag.go.id, QuranEnc (dengan syarat), atau izin LPMQ.                           |
| D-4 | Urutan unit pertama jalur utama | Rekonsiliasi Jalur B (B1–B8) dengan urutan Madinah (kata tanya dan penunjuk lebih awal).           |
| D-5 | Varian bacaan shalat default    | Mayoritas pengguna Syafi'i/NU, minoritas besar Muhammadiyah; perlu peninjau keagamaan.             |
| D-6 | Aturan ikon                     | Usulan riset: ikon hanya untuk benda konkret (bukan setiap kata), berbeda dari usulan awal §6.1b.  |
| D-7 | Peninjau                        | Minimal satu guru bahasa Arab dan satu ustadz, plus format catatan tinjauan per butir.             |

## 8. Koreksi rujukan pada dokumen riset utama

Sudah diterapkan di dokumen utama (lihat changelog di sana):

- **R02:** domain lama mati; diganti tautan penerbit (Kuswoyo, _El-Wasathiya_ 2014, DOI 10.35888/el-wasathiya.v2i1.1994). Klaim "6 jilid" tidak ada di abstrak; dipakai hanya untuk karakter Iqra yang behavioristik/drill.
- **R04:** salah kutip untuk klaim dewasa vs bayi (itu halaman penerbit buku, sama dengan R23). Dilepas dari klaim tersebut; klaim ditandai _Design hypothesis_.
- **R06:** ditambah Spada & Tomita (2010) sebagai meta-analisis yang lebih baru.
- **R08:** ternyata studi 1.516 anak penutur asli kelas 1–6 (Asadi 2017): kata tanpa harakat dibaca lebih cepat dan akurat mulai kelas 3. Bukan studi pembaca dewasa mahir.
- **R11:** manfaat hanya muncul **dengan umpan balik korektif** dan hanya diuji 30 menit kemudian.
- **R12, R17:** pakai DOI / CEFR Companion Volume 2020 agar dapat dibuka otomatis.
- **R16:** pernyataan _can-do_ adalah dokumen terpisah NCSSFL-ACTFL; R16 hanya untuk deskriptor kemahiran.
- **R18:** PDF lama 404; diganti catatan JDIH Kemenag (KMA 1503/2025, ditetapkan 22 September 2025, berlaku).
- **R20:** hanya bukti keberadaan Kepdirjen 9941/2025; lampiran resmi belum ditemukan.
- **R24:** sertifikat TLS salah; diganti halaman produk platform.arabicforall.net.
- **R30, R34:** lisensi QAC dinyatakan (GNU GPL + syarat pakai).
- **R35–R37:** kanal **Arabic 101**.

Detail yang dikoreksi kritikus: ukuran sampel dan label kondisi Soderstrom (2026) tidak ada di abstrak (hanya arah efek yang dipakai); hitungan Dukes 2013 hanya dari satu blog (tidak dipakai); syarat QuranEnc "beri tahu catatan" sempat terlewat.

## 9. Celah yang belum diteliti

- Sumber frekuensi/kosakata inti **MSA harian** berlisensi terbuka (untuk koleksi Harian dan B1).
- Inventaris lema bacaan shalat inti yang terverifikasi (takbiratul ihram, al-Fatihah, tasbih rukuk/sujud, i'tidal, inti tasyahud, salam).
- Surat pendek mana yang umum dihafal orang dewasa Indonesia (subset Juz 'Amma).
- Glosa Indonesia per kata (tidak ada sumber terbuka): siapa menulis, siapa meninjau.
- Lisensi audio (model Chatterbox dan keluarannya, audio murattal, Common Voice).
- Standar transliterasi Arab-Latin (SKB Menag–Mendikbud) dan kata serapan Arab dalam KBBI sebagai jembatan.
- Kemampuan nyata lulusan Iqra dewasa (kecepatan decoding, kata yang sudah dikenal) untuk penempatan dan gerbang B0.
- Jumlah kata/struktur baru per pelajaran yang wajar untuk pemula dewasa.

## 10. Sumber utama yang dipakai

Selain R01–R37 di dokumen utama: QAC (corpus.quran.com: lemmas.jsp, verbs.jsp, license.jsp, download), Tanzil (tanzil.net/docs/text_license, /trans), QuranEnc API (quranenc.com/en/home/api), Quran Foundation developer terms, quran.kemenag.go.id, Jurnal Suhuf (jurnalsuhuf.kemenag.go.id/suhuf/article/view/852), PMA 44/2016 (pasal.id), JDIH Kemenag (KMA 1503/2025), Panduan Bahasa Arab Fase F (kurikulum.kemendikdasmen.go.id), Spada & Tomita 2010 (doi 10.1111/j.1467-9922.2010.00562.x), Kim & Webb 2022 (doi 10.1111/lang.12479), Cerezo et al. 2016 (doi 10.1017/s0272263116000139), Aljasser 2026 (jltr.academypublication.com/index.php/jltr/article/view/12186), ts-fsrs (open-spaced-repetition.github.io/ts-fsrs), Anki manual (docs.ankiweb.net/deck-options.html), NU Online (nu.or.id; quran.nu.or.id), Suara Muhammadiyah, madinaharabic.com, platform.arabicforall.net, alkitaabtextbook.com, MSU Open Books (openbooks.lib.msu.edu/arb101), Edinburgh OERabic, Tatoeba terms, Wiktionary copyrights. Daftar lengkap per temuan tersimpan di log riset sesi ini.
