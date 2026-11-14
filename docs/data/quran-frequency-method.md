# Frekuensi lema Al-Qur’an — metodologi dan audit

**Status 14 November 2026:** 98 lema/kartu dalam koleksi awal; 85 memiliki frekuensi yang diperiksa secara manual dari daftar Quranic Arabic Corpus (QAC), 13 belum dapat dipastikan secara satu-ke-satu. Semua materi Arab masih `reviewStatus: 'draft'`, bukan tashih oleh ustadz.

## Unit hitung: jangan campurkan tiga hal

1. **Lemma (lema):** hitungan semua bentuk infleksi yang oleh korpus dianggap satu lema (contoh `رَبّ`); untuk nonverba menggunakan [Lemmas by Frequency](https://corpus.quran.com/lemmas.jsp?group=1).
2. **Verba + bentuk morfologis:** sebuah verba berharakat dan pola (form I, II, IV, dst.), termasuk perubahan infleksinya, dihitung lewat [Verb Concordance](https://corpus.quran.com/verbs.jsp). Contohnya `قَالَ` = 1.618 kejadian _verba_; **bukan** semua kata dari akar ق و ل.
3. **Bentuk tulisan/token:** dapat mencakup al-, wa-, bi-, li-, pronomina sufiks, dan variasi i‘rab. Angka lama bukan otomatis jumlah kecocokan teks pada mushaf. Jangan menghitung kemunculan dengan `string.includes` atas ayat.

Tabel QAC ada dua mode: [grouped by POS](https://corpus.quran.com/lemmas.jsp?group=1) dan [split by POS](https://corpus.quran.com/lemmas.jsp). **Angka tidak boleh dicampur tanpa catatan**. Untuk pembelajaran fungsi: `لَا` penyangkalan 1.364 berbeda dari larangan 327; `مَا` relatif 1.266 berbeda dari fungsi negatif atau syarat; `مَنْ` relatif 606 berbeda dari bentuk interogatif atau syarat. Pada `إِلَّا`, angka 102 dipakai hanya untuk fungsi pengecualian, bukan jumlah gabungan 663. QAC memiliki kategori gramatikalnya sendiri; hasil bukan klaim mutlak lintas semua korpus.

## Data yang benar-benar ditambahkan

- `src/lib/content/quran-frequency.ts` menyimpan **angka faktual terpilih yang dibaca satu per satu** dari halaman QAC, _bukan_ file anotasi morfologi GPL; setiap nilai menyimpan URL halaman sumber dan basis penghitungan.
- `src/lib/content/quran-vocabulary.ts` menghubungkan angka ke ID dari kamus proyek (jangan mencocokkan hanya dari ejaan Arab tanpa harakat); angka yang tidak ada bernilai **undefined**, bukan nol.
- Pada tabel baca, angka ditampilkan sebagai `N× (lema)` atau `N× (lema fi’il)`, dan kartu memiliki link ke sumber. Urutan tertinggi ke terendah berlaku untuk item yang terverifikasi; **13 item tanpa hitungan selalu di akhir** bahkan jika urutan dibalik.
- 3 entri baru dengan glos sendiri: `كُلّ` (359; contoh 2:20 `كُلِّ`), `غَيْر` (147; contoh 1:7 `غَيْرِ`), dan `سَبِيل` (176; contoh 2:154 `سَبِيلِ`). Angka dari QAC; keberadaan token dicocokkan melalui [2:20](https://quran.com/2/20), [1:7](https://quran.com/1/7), [2:154](https://quran.com/2/154) dan perlu pemeriksaan **byte-for-byte** tambahan terhadap arsip Tanzil 1.1 yang sudah dipakai proyek sebelum dinyatakan final.

## Sumber utama yang dibaca

- Quranic Arabic Corpus, [Lemmas by Frequency, grouped pages 1–8](https://corpus.quran.com/lemmas.jsp?group=1), [split view](https://corpus.quran.com/lemmas.jsp), [Verb Concordance, pages 1–5](https://corpus.quran.com/verbs.jsp). Seluruh baris terpilih diperiksa pada halaman sesuai `source` di kode. Penerbit: Kais Dukes / University of Leeds, anotasi korpus v0.4.
- [Syarat unduh korpus QAC](https://corpus.quran.com/download/): file anotasi penuh memakai GPL dan instruksi distribusi verbatim; **tidak** dimasukkan ke repo maupun dibundel pada website. Hanya sejumlah kecil _fakta numerik_ yang dirujuk dengan atribusi. Jika kebijakan lisensi berubah atau ada permintaan ekspansi massal, lakukan kajian legal terhadap hak database/ekstraksi dan pertimbangkan pipeline hitung independen dengan akses data yang berizin.
- [Tanzil Text License](https://tanzil.net/docs/Text_License): salinan teks Al-Qur’an harus verbatim dan diberi atribusi. Tidak ada teks seluruh surat/ayat baru yang diimpor; contoh ditampilkan sebagai token tunggal, sedangkan keterkaitan token ke versi Tanzil wajib diverifikasi. Tidak ada penyalinan terjemahan QAC/Quran.com.
- [Audit token koleksi sebelumnya](./quran-vocabulary.md) tetap berlaku untuk 95 entri asli; cek ulang ketiga entri baru terhadap SHA korpus lokal sebelum mengubah status review.

## 13 entri yang belum mempunyai frekuensi terverifikasi

`bi`, `li`, `wa`, `fa` adalah klitika yang melekat, sehingga tidak boleh diberi angka dari tabel lema biasa. `huwa`, `hiya`, `ana`, `nahnu`, `hum` memerlukan perhitungan morfologis personal-pronoun yang konsisten (bentuk bebas versus sufiks). `alladhina` berbagi lema korpus dengan bentuk relatif lain dan tidak boleh diberi ulang angka `alladhi`. `istana` dan `tawasa` perlu pemeriksaan spesifik bentuk verba; `akhirah` perlu dipisahkan dari bentuk sifat `آخِر` dalam hitungan korpus.

Status kosong bukan "kata jarang" atau "tidak ada dalam mushaf". Sampai data dikurasi ulang, panel menampilkan "Frekuensi belum diverifikasi" dan menaruhnya sesudah seluruh angka.

## Langkah perluasan yang aman

1. Tentukan aturan tokenisasi/lemmatisasi yang konsisten dan klasifikasi POS dengan dukungan ahli bahasa Arab; lalu validasi terhadap ayat acak.
2. Tentukan dasar legal untuk dataset morfologi komprehensif sebelum impor besar, rekam versi, checksum, lisensi dan atribusi.
3. Kelompokkan kosakata menurut kebutuhan hafalan _dan_ frekuensi; jangan menyebut persentase cakupan bacaan hanya dari jumlah lema tanpa validasi token berdasarkan teks Al-Qur’an.
4. Tashih arti, fungsi partikel, token ayat baru, dan transliterasi melalui reviewer sesuai ADR-004 D-7. Jangan otomatis menandai semua data terverifikasi sebagai konten final.
