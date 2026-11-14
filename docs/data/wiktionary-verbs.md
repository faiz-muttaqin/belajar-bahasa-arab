# Kata kerja per wazan dari Wiktionary

**Status:** draft. Tidak ditinjau guru. Dipakai di `/rujukan/fiil/kata-kerja/` (daftar untuk
22 wazan, tampilan kotak dengan modal). Tabel 22 wazan di `/rujukan/fiil/` tidak diubah.

## Sumber dan lisensi

- **Wiktionary berbahasa Inggris**, diekstrak oleh kaikki.org (Tatu Ylonen):
  `https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl` (sekitar 870 MB,
  diunduh 14 November 2026, tidak disimpan di repo). Teks Wiktionary berlisensi CC BY-SA 4.0 dan
  GFDL; setiap kata menautkan ke halaman Wiktionary-nya dan halaman memuat atribusi. Ini sejalan
  dengan lisensi materi proyek (CC BY-SA 4.0, ADR-004 D-1). Ini gambaran umum, bukan nasihat hukum.
- Data Wiktionary **tidak bergantung pada PR #6** (Qutrub dan Arramooz, GPLv2). Isi dan daftar kata
  berasal hanya dari Wiktionary; PR #6 dipakai sebagai pembanding mutu (lihat di bawah). PR #6 sudah di-merge; kata-kata
  nya yang tidak ada di Wiktionary memakai arti dari model: lihat [model-recall](./model-recall.md).

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

## Bentuk mazid dan ruba'i (kelompok 7 sampai 22)

Dibangun oleh skrip yang sama ke `data/wiktionary/verbs-mazid.json`: **4.479** kata kerja. Bab
ditentukan dari nomor Form Wiktionary, bukan dari vokal. Penomoran Barat berbeda dari urutan
tradisional tabel 22 wazan:

| Kelompok situs | Wazan  | Form Wiktionary | Jumlah |
| -------------- | ------ | --------------- | ------ |
| 7              | فَعَّلَ    | II              | 1.190  |
| 8              | فَاعَلَ   | III             | 342    |
| 9              | أَفْعَلَ   | IV              | 664    |
| 10             | تَفَاعَلَ  | VI              | 318    |
| 11             | تَفَعَّلَ   | V               | 583    |
| 12             | اِفْتَعَلَ  | VIII            | 476    |
| 13             | اِنْفَعَلَ  | VII             | 174    |
| 14             | اِفْعَلَّ   | IX              | 23     |
| 15             | اِسْتَفْعَلَ | X               | 319    |
| 16             | اِفْعَوْعَلَ | XII             | 19     |
| 17             | اِفْعَوَّلَ  | XIII            | 3      |
| 18             | اِفْعَالَّ  | XI              | 13     |
| 19             | فَعْلَلَ   | Iq              | 240    |
| 20             | تَفَعْلَلَ  | IIq             | 80     |
| 21             | اِفْعَنْلَلَ | IIIq            | 15     |
| 22             | اِفْعَلَلَّ  | IVq             | 20     |

Form XIV (2 kata kerja) tidak punya baris di tabel situs dan dilewati. Pada halaman, kata kerja
mazid dikelompokkan menurut huruf akar pertama setelah awalan wazan dibuang (misalnya أ pada
أَفْعَلَ atau است pada اِسْتَفْعَلَ). Itu perkiraan mekanis: pada kata kerja yang lemah atau
berimbuhan khusus, huruf kelompok bisa tidak sama dengan huruf akar pertama.

## Arti Indonesia

Wiktionary hanya memberi arti Inggris. Arti Indonesia di `verbs-form-i.id.json` adalah
**terjemahan dari arti Inggris itu oleh Claude** (8 agen paralel, aturan: satu terjemahan per
arti, tanpa menambah makna, tanpa awalan "untuk"), untuk 2.756 kata Form I (`verbs-form-i.id.json`) dan 4.402 kata mazid (`verbs-mazid.id.json`).
529 kata ditandai `uncertain` (218 + 311) karena arti Inggrisnya tidak jelas atau teknis. **Belum ditinjau manusia.**
Antarmuka menyebutnya "terjemahan Claude dari Wiktionary, belum ditinjau".

## Pembanding Google Translate

Hanya untuk Form I dan hanya sebagian. `scripts/compare-google-translate.py` memakai paket tidak resmi `googletrans` (tanpa akun)
untuk menerjemahkan madhi berharakat langsung dari Arab ke Indonesia, disimpan di
`verbs-form-i.google.json`. Ini **hanya pembanding**, bukan sumber arti. Uji awal menunjukkan
Google sering menganggap kata kerja sebagai kata benda (misalnya `كَتَبَ` menjadi "buku",
`عَلِمَ` menjadi "sains"), jadi hasilnya tidak dipakai sebagai arti. Skrip bisa terhenti kapan
saja karena endpoint-nya tidak resmi; hasil yang sudah ada tetap disimpan. Google kadang membalas
teks Arab yang sama bila permintaan dibatasi; balasan seperti itu dibuang, bukan disimpan.

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

- Form XIV dilewati (lihat di atas). Pembanding Google hanya ada untuk sebagian Form I.
- Halaman prerender untuk 22 kelompok berukuran sekitar 12 MB di folder build (termasuk
  `__data.json`); bila perlu, pecah per huruf atau muat bertahap.
- Transliterasi mengikuti skema Wiktionary (misalnya `ʔ`, `ḡ`), bukan ejaan Indonesia.
- Bab 5 hanya 8 kata; sumber lain bisa mencatat lebih banyak.
- Arti Inggris Wiktionary kadang memuat arti kasar atau teknis; semuanya diterjemahkan apa adanya.

## Modal "Cari contoh kata dan wazan" (`/rujukan/fiil/`)

Tabel 22 wazan tidak diubah, tetapi kamus di modalnya sekarang memakai data ini. Modal
memuat `static/data/verbs-enrich-v1.json` (dibuat oleh `scripts/build-verb-enrichment.mjs`, sekitar
2 MB, 0,6 MB terkompresi, diunduh terpisah dan di-cache browser) dan menempelkannya ke daftar PR #6:
arti dan bentuk (mudhari, mashdar, isim fa'il dan maf'ul) dari Wiktionary, arti dari model untuk
sisanya, dan seluruh kata kerja mazid (bab 7 sampai 22) sebagai entri baru. Kata sekitar 12.500 di
modal. Daftarnya berupa daftar berjendela (`VirtualGrid`): hanya baris yang terlihat yang digambar,
jadi ribuan kata tetap ringan. Setiap kartu menyebut sumber arti (Wiktionary, terjemahan Claude,
dari model, deskripsi model, belum diketahui). Jalankan ulang skripnya bila data di `data/`
berubah.
