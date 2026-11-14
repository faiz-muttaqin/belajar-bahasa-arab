# Kosakata Al-Qur’an untuk pelajar Indonesia

Koleksi di `/kosakata/#al-quran` berisi **98 entri** (95 entri awal dan 3 lema baru) dalam enam kelompok. **85 hitungan frekuensi telah diperiksa** terhadap Quranic Arabic Corpus; rincian cara hitung, lisensi, dan 13 entri tanpa hitungan ada pada [audit frekuensi](./quran-frequency-method.md). Mulai dari harf dan kata rujukan, lalu fi’il untuk ucapan dan pengetahuan, iman dan ibadah, serta keadaan dan tindakan. Kelompok isim memuat benda, konsep, dan sifat. Fungsi yang berbeda mendapat entri sendiri bila perlu, seperti lā penyangkalan dan lā larangan.

## Sumber dan pemakaian

- **Arabic101** menjadi pembanding pendekatan belajar yang mendahulukan kosakata umum dan pengenalan bentuk dalam konteks. Judul ketiga video pembuka diperiksa melalui metadata YouTube dan tahapan belajar diperiksa di situs Arabic101. Daftar kata, naskah video dan materi kursus tidak disalin. Angka 65% dan 85% adalah nama seri, tanpa klaim cakupan untuk koleksi situs ini. [Panduan awal](https://www.youtube.com/playlist?list=PL6TlMIZ5ylgrYBl5c2LGoc1iwTPyYMMYH) · [Seri 65%](https://www.youtube.com/playlist?list=PL6TlMIZ5ylgrtqN60yWKuS6xvPDUx6cNZ) · [Seri 85%](https://www.youtube.com/playlist?list=PL6TlMIZ5ylgr0FQHVC3yzL6TM9lOXHXc7) · [Ikhtisar kursus](https://academy.arabic101.org/course-3-how-to-understand-the-quran-in-arabic/).
- **Quranic Arabic Corpus** dipakai sebagai pembanding kata umum dan perbedaan kelas kata. File anotasi dan glos dari korpus tidak diimpor; sejumlah kecil angka frekuensi sebagai fakta numerik dirujuk satu per satu dengan URL sumber. [Lema](https://corpus.quran.com/lemmas.jsp) · [Konkordansi fi’il](https://corpus.quran.com/verbs.jsp).
- **Tanzil Uthmani 1.1** dipakai untuk memeriksa hadirnya kata dan menampilkan satu token yang disalin apa adanya per entri. Simpan surah–ayat, versi teks, dan tautan sumber. Token dapat mencakup awalan atau akhiran yang menempel. Lema kamus dan glos Indonesia disimpan terpisah dari bentuk ayat. Tidak ada salinan seluruh ayat, surah, terjemahan ayat, atau tafsir dalam koleksi ini. [Unduhan](https://tanzil.net/download/) · [Lisensi](https://tanzil.net/docs/text_license).
- **Indeks fi’il proyek** menyediakan tautan ke 30 entri Wiktionary dengan lema berharakat dan makna yang cocok. Transliterasi untuk entri bertaut diambil dari data Wiktionary (CC BY-SA 4.0) dengan atribusi. Kata kerja yang belum punya pasangan tetap dapat dipelajari lewat glos dan bukti ayatnya. Daftar Qutrub/Arramooz dan arti hasil perkiraan model tidak diimpor ke koleksi ini. [Indeks fi’il](https://belajar-bahasa-arab.faizmuttaqin.com/rujukan/fiil/) · [Asal data lokal](./wiktionary-verbs.md).

## Audit entri

Ke-95 token dari koleksi awal dicocokkan dengan batas token utuh dalam berkas Tanzil Uthmani 1.1 berformat `txt (with aya numbers)` yang diunduh dari situs penerbit. SHA-256 berkas audit adalah `bf4f57b968d03f4131c070b1e285da9be0e0a108a21c910e872801ca273312c8`. Seluruh tautan fi’il dicocokkan dengan ID pada `data/wiktionary/verbs-form-i.json` atau `data/wiktionary/verbs-mazid.json`.

Glos dan catatan belajar merupakan tulisan proyek dengan lisensi CC BY-SA 4.0 dan masih memerlukan tinjauan pengajar. Koleksi ini memprioritaskan contoh yang berguna untuk membaca. Angka pada tombol kelompok adalah jumlah entri, tanpa menghitung frekuensi dalam mushaf. Data dimuat oleh katalog statis yang sama dengan koleksi kosakata lain sehingga tersedia di pencarian situs.

### Entri tambahan pada riset frekuensi

Kata `كُلّ` (2:20), `غَيْر` (1:7), dan `سَبِيل` (2:154) dicocokkan dengan halaman ayat Quran.com yang menampilkan bentuk Arab. Ketiganya masih membutuhkan pengulangan audit token terhadap unduhan Tanzil Uthmani 1.1 dengan SHA-256 di atas; **jangan menyatakan ketiganya sudah lolos audit berkas atau tinjauan ustadz**. Lihat [metodologi frekuensi](./quran-frequency-method.md).
