# Kata kerja tsulatsi mujarrad dari Wiktionary

**Status:** draft. Tidak ditinjau guru. Dipakai di `/rujukan/fiil/kata-kerja/` (daftar per bab,
tampilan kotak dengan modal). Tabel 22 wazan di `/rujukan/fiil/` tidak diubah.

## Sumber dan lisensi

- **Wiktionary berbahasa Inggris**, diekstrak oleh kaikki.org (Tatu Ylonen):
  `https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl` (sekitar 870 MB,
  diunduh 14 November 2026, tidak disimpan di repo). Teks Wiktionary berlisensi CC BY-SA 4.0 dan
  GFDL; setiap kata menautkan ke halaman Wiktionary-nya dan halaman memuat atribusi. Ini sejalan
  dengan lisensi materi proyek (CC BY-SA 4.0, ADR-004 D-1). Ini gambaran umum, bukan nasihat hukum.
- Data ini **tidak bergantung pada PR #6** (Qutrub dan Arramooz, GPLv2). Isi dan daftar kata
  berasal hanya dari Wiktionary; PR #6 dipakai sebagai pembanding mutu (lihat di bawah).

## Isi

`bun scripts/build-wiktionary-verbs.mjs --source <file kaikki>` menghasilkan
`data/wiktionary/verbs-form-i.json`: **2.788** kata kerja Form I (tiga huruf, bukan ruba‘i).
Tiap kata memuat madhi berharakat, transliterasi (gaya Wiktionary), mudhari, mashdar (maks. 3),
isim fa‘il dan maf‘ul, bab, transitif, arti Inggris (maks. 3), dan tautan Wiktionary. Bidang
yang tidak ada di sumber tidak diisi.

- **Bab (1 sampai 6)** diambil dari pola vokal Wiktionary (`a~u` = bab 1, `a~i` = 2, `a~a` = 3,
  `i~a` = 4, `i~i` = 5, `u~u` = 6; urutan sama dengan tabel tashrif). Bila tidak ada, bab
  diturunkan dari bentuk madhi dan mudhari hanya untuk kata kerja sehat tiga huruf; selain itu
  `bab = 0` ("belum diketahui"). Kata dengan lebih dari satu pola menyimpan `altBabs`.
- Jumlah per bab: 1 = 1.044, 2 = 644, 3 = 350, 4 = 556, 5 = 8, 6 = 166, belum diketahui = 20.

## Arti Indonesia

Wiktionary hanya memberi arti Inggris. Arti Indonesia di `verbs-form-i.id.json` adalah
**terjemahan dari arti Inggris itu oleh Claude** (8 agen paralel, aturan: satu terjemahan per
arti, tanpa menambah makna, tanpa awalan "untuk"), untuk 2.756 kata. 218 kata ditandai
`uncertain` karena arti Inggrisnya tidak jelas atau teknis. **Belum ditinjau manusia.**
Antarmuka menyebutnya "terjemahan Claude dari Wiktionary, belum ditinjau".

## Pembanding Google Translate

`scripts/compare-google-translate.py` memakai paket tidak resmi `googletrans` (tanpa akun)
untuk menerjemahkan madhi berharakat langsung dari Arab ke Indonesia, disimpan di
`verbs-form-i.google.json`. Ini **hanya pembanding**, bukan sumber arti. Uji awal menunjukkan
Google sering menganggap kata kerja sebagai kata benda (misalnya `كَتَبَ` menjadi "buku",
`عَلِمَ` menjadi "sains"), jadi hasilnya tidak dipakai sebagai arti. Skrip bisa terhenti kapan
saja karena endpoint-nya tidak resmi; hasil yang sudah ada tetap disimpan.

## Perbandingan dengan PR #6 (7.938 kata kerja Qutrub dan Arramooz)

| Pengukuran                                                                            | Hasil                  |
| ------------------------------------------------------------------------------------- | ---------------------- |
| Kata Form I Wiktionary yang juga ada di daftar PR #6                                  | 2.713 dari 2.788       |
| Kata Wiktionary yang tidak ada di PR #6                                               | 75                     |
| Kata PR #6 yang tidak ada di Wiktionary (tanpa arti, transliterasi, mudhari, mashdar) | 4.581 dari 7.938       |
| Bab sama pada kata yang ada di keduanya (termasuk pola alternatif)                    | 2.636 dari 2.713 (97%) |

Jadi sekitar 34% kata PR #6 mendapat arti dan transliterasi dari Wiktionary; sisanya hanya
punya madhi, akar, dan bab, dan tidak diisi dengan tebakan.

## Batasan

- Hanya Form I (enam bab pertama). Bentuk II sampai X ada di Wiktionary (sekitar 4.000 kata
  kerja lain), tetapi pemetaannya ke 22 kelompok situs belum dibuat.
- Transliterasi mengikuti skema Wiktionary (misalnya `ʔ`, `ḡ`), bukan ejaan Indonesia.
- Bab 5 hanya 8 kata; sumber lain bisa mencatat lebih banyak.
- Arti Inggris Wiktionary kadang memuat arti kasar atau teknis; semuanya diterjemahkan apa adanya.
