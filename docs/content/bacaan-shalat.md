# Bacaan shalat dan kosakata Arab–Indonesia

## Cakupan

RS-04 / V-04 / CB-02. Rujukan belajar dimulai dari takbir sampai salam, dengan pilihan lafaz berdampingan di setiap posisi. Entri mencatat perawi, nomor hadis, konteks dalam riwayat dan penilaian yang dipakai bila di luar Sahih al-Bukhari dan Sahih Muslim. Anotasi berisi glos dalam konteks dan pola yang membantu pembaca memahami bacaan.

## Progres 25 November 2026

- Sinkronisasi dari `main` di `f22e8aa`. Inventaris sumber dimulai dengan Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Sunan an-Nasa'i, dan Sunan Ibn Majah. Cocokkan nomor Sahih Muslim berdasarkan `arabicnumber` karena nomor urut JSON berbeda.
- Pakai matan Arab klasik dari [hadith-api, snapshot df57907](https://github.com/fawazahmed0/hadith-api/tree/df57907be35291c91ad6a6691180e22ca9920784), dengan [Unlicense](https://github.com/fawazahmed0/hadith-api/blob/df57907be35291c91ad6a6691180e22ca9920784/LICENSE). Kutip bagian bacaan dan rapikan ejaan Naskh. Glos dan terjemahan disusun untuk proyek. Tautan Sunnah.com memudahkan membandingkan bacaan dengan narasi lengkap.
- Al-Fatihah dirujuk melalui hadis dan tautan ke mushaf. Teks surah utuh menunggu tashih sesuai [ADR-004](../decisions/0004-content-decisions.md). Seluruh halaman ditandai draf bersumber untuk peninjauan ustadz.
