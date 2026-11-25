# Bacaan shalat dan kosakata Arab–Indonesia

## Cakupan

RS-04 / V-04 / CB-02. Rujukan belajar dimulai dari takbir sampai salam, dengan pilihan lafaz berdampingan di setiap posisi. Entri mencatat perawi, nomor hadis, konteks dalam riwayat dan penilaian yang dipakai bila di luar Sahih al-Bukhari dan Sahih Muslim. Anotasi berisi glos dalam konteks dan pola yang membantu pembaca memahami bacaan.

## Progres 25 November 2026

- Sinkronisasi dari `main` di `f22e8aa`. Inventaris sumber dimulai dengan Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Sunan an-Nasa'i, dan Sunan Ibn Majah. Cocokkan nomor Sahih Muslim berdasarkan `arabicnumber` karena nomor urut JSON berbeda.
- Pakai matan Arab klasik dari [hadith-api, snapshot df57907](https://github.com/fawazahmed0/hadith-api/tree/df57907be35291c91ad6a6691180e22ca9920784), dengan [Unlicense](https://github.com/fawazahmed0/hadith-api/blob/df57907be35291c91ad6a6691180e22ca9920784/LICENSE). Kutip bagian bacaan dan rapikan ejaan Naskh. Glos dan terjemahan disusun untuk proyek. Tautan Sunnah.com memudahkan membandingkan bacaan dengan narasi lengkap.
- Al-Fatihah dirujuk melalui hadis dan tautan ke mushaf. Teks surah utuh menunggu tashih sesuai [ADR-004](../decisions/0004-content-decisions.md). Seluruh halaman ditandai draf bersumber untuk peninjauan ustadz.

Versi awal `/rujukan/bacaan-shalat/` memuat 42 entri dalam 13 bagian dari takbir hingga salam, zikir setelah salam, dan satu qunut khusus witir. Arti disusun untuk setiap kata yang tercetak. Delapan puluh tiga glos dari hadis juga masuk ke koleksi Shalat dan pencarian umum. Kamus Al-Fatihah memberi glos untuk 26 bentuk kata unik dengan tautan per ayat dari Tanzil Uthmani 1.1. Bacaan setelah Al-Fatihah dapat berbeda menurut surah yang dibaca.

## Pemeriksaan sumber

Semua entri hadis pada halaman dibandingkan dengan matan dalam snapshot. Dua redaksi muncul di sekitar sisipan periwayat. Pada al-Bukhari 789, tambahan wāw dicatat terpisah. Pada al-Bukhari 831, penjelasan Nabi muncul di antara doa keselamatan dan syahadat. Kedua bagian bacaan ditampilkan berurutan dengan penjelasan itu di luar lafaz. Untuk al-Bukhari 834, salinan JSON memiliki karakter pengganti di awal kata وَلَا. Ejaan diperiksa dengan [teks riwayat daring](https://sunnah.com/bukhari:834).

## Tinjauan ustadz

- Tinjau harakat, pemenggalan dan makna utuh berdasarkan perawi serta nomor pada kartu. Periksa khusus لَبَّيْكَ وَسَعْدَيْكَ dan وَالشَّرُّ لَيْسَ إِلَيْكَ pada Muslim 771a, جَدّ pada dua konteks, serta konotasi dari kata kerja صَلَّى.
- Periksa Ibn Majah 898 berdasarkan dua penilaian yang berbeda. [Al-Albani](https://dorar.net/h/4YsPO2gj?osoul=1) menilainya sahih dan [edisi Darussalam](https://sunnah.com/ibnmajah:898) mencatat daif.
- Tinjau perbedaan konteks shalat malam, witir, dan shalat harian. Belum ada klaim mengenai praktik mazhab tertentu. Untuk jenazah dan istikharah, tinjau penempatan doa dan makna pronomina. Rujukan qunut nazilah dan takbir Idulfitri juga tersedia.
- Tinjau penjelasan pola pronomina, bentuk amr, idafah dan bentuk pasif. Materi baru disajikan sebagai teks. Pemeriksaan harakat pada perangkat seluler fisik masih terbuka.

## Pemeriksaan ulang PR #96

Lafaz lama dicocokkan lagi per kata dan harakat dengan snapshot yang sama. Untuk tahmid رَبَّنَا وَلَكَ الْحَمْدُ, kartu kini mengarah ke al-Bukhari 738, yang memuat lafaz tersebut tanpa sisipan perawi. Glos yang tersurat dan makna Indonesia dalam konteks diperiksa terpisah. Misalnya, يُقْضَى adalah bentuk pasif dan كَانُوا membawa konteks lampau meskipun terjemahan utuh dalam bahasa Indonesia dapat lebih ringkas.

Katalog kini memuat 58 entri dalam 16 bagian. Enam belas tambahan meliputi tahajud, iktidal, rukuk atau sujud, doa dalam shalat, doa di penghujung shalat, zikir selepas salam, witir, jenazah, dan istikharah. Tiga puluh glos tambahan dari bagian tersebut terhubung ke pencarian dan kosakata. Tautan pembanding tersedia untuk tasyahud Ibnu Umar, takbir Idulfitri, dan qunut nazilah.

Pada al-Bukhari 1120 dan 1166, lafaz bacaan ditampilkan dengan pilihan redaksinya disebut di catatan. Frasa editorial di tengah matan dan pilihan kedua yang diantar dengan “atau perawi berkata” tidak digabung ke dalam lafaz yang dipilih. Tinjau makna penghujung shalat dalam Abi Dawud 1522 serta perbedaan konteks sujud dan witir pada doa perlindungan. Cek kembali harakat dan arti pada shalat jenazah dan istikharah saat tinjauan ustadz.

## CB-02 · Latihan varian tasyahud

Dasar kerja CB-02 adalah katalog 58 bacaan dari commit `24f8133`. Latihan memakai dua riwayat yang sudah ditautkan pada katalog, yaitu [Ibnu Mas‘ud](https://sunnah.com/bukhari:831) dan [Ibnu Abbas](https://sunnah.com/muslim:403a). Fokus latihan adalah makna kata yang sama dan unsur pembeda pada pembuka serta syahadat kedua. Cabang ini opsional pada Tahap 1. Latihan dan lembar tinjauan disiapkan sebagai draf.

Cabang Tahap 1 kini membuka latihan mandiri di `/belajar/varian-tasyahud/`. Lima soal memeriksa kata pembeda dan kata yang sama. Pembahasan memuat rujukan per soal, dan tiap cuplikan membuka lafaz utuh di katalog. Latihan bisa dibuka dengan atau tanpa JavaScript dan bersifat opsional.

[Lembar tinjauan](./lembar-tinjauan-bacaan-shalat.md) mencakup semua 58 ID dari katalog. Setiap entri memuat lafaz, glos bernomor, makna utuh, sumber, dan daftar periksa. Catatan hasil disimpan menurut ID dan nomor kata. Semua butir menunggu pemeriksaan ustadz.
