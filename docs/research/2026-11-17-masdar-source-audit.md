# Audit sumber OER-02: maṣdar pada bacaan MSA

**17 November 2026 · Implementasi pilot, status materi: DRAF.**

## Pembuktian sumber dan lisensi

- [Elementary Arabic (Mohamed & Issa), bab 5.2 Grammar](<https://human.libretexts.org/Bookshelves/Languages/Arabic/Elementary_Arabic_(Mohamed_and_Issa)/05:_Hobbies_and_Sports/5.02:_Grammar>) menyatakan lisensi **CC BY 4.0 pada halaman** (pemeriksaan tanggal 2026-11-17), dan menjelaskan verbal noun (maṣdar) serta perbedaannya dari fi‘il. Penulis yang tercantum Ayman Mohamed dan Sadam Issa, Michigan State University Libraries. Tidak menyalin isi latihan, audio, H5P, atau contoh halaman.
- Kamus untuk setiap pasangan, hanya klaim pasangan fi‘il–maṣdar: [كَتَبَ](https://en.wiktionary.org/wiki/كتب), [قَرَأَ](https://en.wiktionary.org/wiki/قرأ), [دَرَسَ](https://en.wiktionary.org/wiki/درس), [اِسْتَعْمَلَ](https://en.wiktionary.org/wiki/استعمل), [اِجْتَمَعَ](https://en.wiktionary.org/wiki/اجتمع). Semua di bagian Arabic dari Wiktionary; materi Wiktionary CC BY-SA 4.0/GFDL. Tautan sumber spesifik disimpan di data.
- Referensi tambahan untuk variasi Form I: [Wiktionary كَتَبَ](https://en.wiktionary.org/wiki/كتب) mencantumkan beberapa maṣdar; jangan memaksakan satu maṣdar per akar. [Riset verifikasi proyek](../research/2026-11-14-source-based-verification.md).

## Yang dikirim dalam pilot OER-02

1. Halaman /kaidah/masdar/ dalam HTML statis, dapat dibaca tanpa JavaScript, relasi dari halaman sharaf dan peta kaidah.
2. Lima pasangan lema yang dieja dengan harakat dan tautan kamus spesifik per pasangan.
3. 20 stimulus berbeda, masing-masing soal dan pembahasan Indonesia yang dibuat mandiri, variasi kategori fi‘il/frasa/maṣdar sebagai isim/pemahaman.
4. Tes jumlah, ID unik, sumber per item, static no-JS 375px dan tautan navigasi.
5. Tidak menambah skema progres/score, lisensi eksternal/berkas media atau engine morfologi otomatis.

## Batas yang masih terbuka

- **Belum audit per kalimat:** rujukan sumber untuk lema dan konsep tidak membuktikan bahwa setiap kalimat Arab buatan proyek telah diperiksa kasus i‘rab, kelaziman pilihan kata, sintaksis, dan konteks. Semua tetap `draft`; CI menguji aplikasi, bukan akurasi linguistik.
- **Belum cakupan penuh G-02/OER-02:** pola mazīd lain, maṣdar ganda/perbedaan makna, verba mu‘tal, isim fā‘il/maf‘ūl belum diperkaya di sini. Tabel wazan yang ada tetap otoritas bentuk yang tersimpan, bukan generator universal.
- **Belum uji peserta RM-07** dan tidak ada hasil belajar yang diukur.

**Follow-up:** [issue #55](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/55) (OER-02–06); [issue #15](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/15) (G-02); [RM-07 #52](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/52).
