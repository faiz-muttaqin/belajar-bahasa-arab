# Bacaan shalat dan kosakata Arab–Indonesia

## Cakupan

RS-04 / V-04 / CB-02. Rujukan belajar dimulai dari takbir sampai salam, dengan pilihan lafaz berdampingan di setiap posisi. Entri mencatat perawi, nomor hadis, konteks dalam riwayat dan penilaian yang dipakai bila di luar Sahih al-Bukhari dan Sahih Muslim. Anotasi berisi glos dalam konteks dan pola yang membantu pembaca memahami bacaan.

## Progres 25 November 2026

- Sinkronisasi dari `main` di `f22e8aa`. Inventaris sumber dimulai dengan Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Sunan an-Nasa'i, dan Sunan Ibn Majah. Cocokkan nomor Sahih Muslim berdasarkan `arabicnumber` karena nomor urut JSON berbeda.
- Pakai matan Arab klasik dari [hadith-api, snapshot df57907](https://github.com/fawazahmed0/hadith-api/tree/df57907be35291c91ad6a6691180e22ca9920784), dengan [Unlicense](https://github.com/fawazahmed0/hadith-api/blob/df57907be35291c91ad6a6691180e22ca9920784/LICENSE). Kutip bagian bacaan dan rapikan ejaan Naskh. Glos dan terjemahan disusun untuk proyek. Tautan Sunnah.com memudahkan membandingkan bacaan dengan narasi lengkap.
- Al-Fatihah dirujuk melalui hadis dan tautan ke mushaf. Teks surah utuh menunggu tashih sesuai [ADR-004](../decisions/0004-content-decisions.md). Seluruh halaman ditandai draf bersumber untuk peninjauan ustadz.

Halaman `/rujukan/bacaan-shalat/` memuat 41 entri dalam 13 bagian dari takbir hingga salam, zikir setelah salam, dan satu qunut khusus witir. Arti disusun untuk setiap kata yang tercetak. Delapan puluh tiga glos dari hadis juga masuk ke koleksi Shalat dan pencarian umum. Enam belas token Al-Fatihah ditampilkan sebagai daftar kosakata tematik dengan locator ayat dari Tanzil Uthmani 1.1. Bacaan setelah Al-Fatihah dapat berbeda menurut surah yang dibaca.

## Pemeriksaan sumber

Semua entri hadis pada halaman dibandingkan dengan matan dalam snapshot. Dua redaksi muncul di sekitar sisipan periwayat. Pada al-Bukhari 789, tambahan wāw dicatat terpisah. Pada al-Bukhari 831, penjelasan Nabi muncul di antara doa keselamatan dan syahadat. Kedua bagian bacaan ditampilkan berurutan dengan penjelasan itu di luar lafaz. Untuk al-Bukhari 834, salinan JSON memiliki karakter pengganti di awal kata وَلَا. Ejaan diperiksa dengan [teks riwayat daring](https://sunnah.com/bukhari:834).

## Tinjauan ustadz

- Tinjau harakat, pemenggalan dan makna utuh berdasarkan perawi serta nomor pada kartu. Periksa khusus لَبَّيْكَ وَسَعْدَيْكَ dan وَالشَّرُّ لَيْسَ إِلَيْكَ pada Muslim 771a, جَدّ pada dua konteks, serta konotasi dari kata kerja صَلَّى.
- Periksa Ibn Majah 898 berdasarkan dua penilaian yang berbeda. [Al-Albani](https://dorar.net/h/4YsPO2gj?osoul=1) menilainya sahih dan [edisi Darussalam](https://sunnah.com/ibnmajah:898) mencatat daif.
- Tinjau perbedaan konteks shalat malam, witir, dan shalat harian. Belum ada klaim mengenai praktik mazhab tertentu. Qunut nazilah, shalat jenazah dan shalat Id belum dicakup.
- Tinjau penjelasan pola pronomina, bentuk amr, idafah dan bentuk pasif. Materi baru disajikan sebagai teks. Pemeriksaan harakat pada perangkat seluler fisik masih terbuka.
