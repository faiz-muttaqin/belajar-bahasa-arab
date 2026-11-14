# Sharaf staging preview → katalog statis (14 Nov 2026)

## Batas impor

File `src/lib/content/sharaf-staging-preview.ts` menyimpan tepat 17 record
madhi–akar–bab serta 3 kata tugas dari **fixture preview** yang telah
dinormalisasi dalam arsip staging `arabic_morphology_staging.zip`. Ini **bukan**
impor penuh dataset dan belum merupakan kamus Arab yang lengkap.

- 17 record verba dari Qutrub/Arramooz: pasangan madhi + akar + bab
  dinormalisasi. **7 cocok dengan entri first-party yang sudah ada**;
  provenance-nya ditambahkan pada entri existing tanpa menghilangkan arti
  atau bentuk tashrif. **10 record berbeda** ditambahkan ke pencarian.
- 3 kata tugas dari Arabic Stopwords ditambahkan. Tanda "Arti Indonesia
  belum tersedia" dan `formBehavior: 'unverified'` pada verba baru
  berarti data tidak lengkap, bukan arti yang ditebak.
- 6 kandidat root/Form I–X dari Muṣarrif **tidak diimpor sebagai kata**
  karena tidak memiliki lema madhi yang terverifikasi pada preview.
- Ejaan yang mirip tetapi bab berbeda (seperti `كَتَبَ` pada dua bab
  di sumber Qutrub) tetap menjadi record **terpisah**. Tidak ada
  pembangkitan mudhari, mashdar, atau perubahan lain secara otomatis.

## Jejak sumber / snapshot yang dipertahankan

| Dataset          | Commit                                     | File sumber                                    | Lisensi                |
| ---------------- | ------------------------------------------ | ---------------------------------------------- | ---------------------- |
| Qutrub           | `52e1412ccbaaf429136412183318fcbf0cf9bcd7` | `data/ar_verb_normalized.dict`                 | GPL (COPYING upstream) |
| Arramooz         | `b055c5dea51b8a9152e7e66a7ca3b6f713fb187d` | `data/verbs/verb_triliteral.csv`               | GPL-2.0                |
| Arabic Stopwords | `f6018e22e02067022231d4dbda0e46b4b1b7e1e7` | `releases/latest/csv/stopwords_classified.csv` | GPL (LICENSE upstream) |

Setiap entri tambahan menyertakan tautan ke file pada commit upstream
dan identitas baris/cabang bab asli dalam `explanation`. Ini adalah
**sampel fakta leksikal kecil dengan provenance**, bukan salinan penuh
kamus pihak ketiga. Untuk impor massal, pemeriksaan kewajiban lisensi dan
review data tetap diwajibkan. Semua entri baru berstatus `draft`.

### Pemetaan bab

| Qutrub/Arramooz | Bab internal |
| --------------- | ------------ |
| 1               | 1            |
| 2               | 2            |
| 3               | 3            |
| 4               | 4            |
| 5               | 6            |
| 6               | 5            |

Pemetaan diterapkan pada preview sebelum impor; perbedaan ini **tidak**
boleh diabaikan pada saat dataset lengkap tersedia.

## Distribusi statis dan cache

- `/data/materi.json` dan `/data/sharaf.json` digenerasi saat
  `adapter-static` build. Hash konten katalog pada `/data/manifest.json`
  berubah otomatis saat glosarium berubah.
- Setelah load, `catalog/sync.svelte.ts` memeriksa manifest, mengunduh
  katalog lengkap yang tervalidasi, dan menyimpan ke IndexedDB
  `belajar-bahasa-arab-materi / packages / active`.
- Jika IndexedDB terblokir, katalog kecil dapat disimpan secara aman ke
  `localStorage` (`belajar-bahasa-arab:materi:v1`), dengan batas ukuran
  1,5 juta karakter agar tidak mencoba penyimpanan yang berlebihan.
- Pencarian menggunakan `WeakMap` per snapshot untuk menyimpan
  **normalisasi sekali** (lema, bentuk, akar, arti); indeks dipanaskan
  saat idle setelah cache lokal atau snapshot baru dimuat. Ini mempercepat
  pencarian berulang di memori, **bukan** menyimpan indeks ganda di browser.
- UI pertama dapat langsung memakai katalog statis bawaan tanpa menunggu
  download; isi versi terbaru diperbarui di background saat online.

## QA

Tes unit:

- record yang diimpor dan deduplikasi;
- pemisahan bab untuk ejaan yang sama;
- bentuk yang tidak tersedia tidak dikarang;
- cache indeks pencarian dipakai ulang.

Tes E2E:

- isi katalog hasil build dan endpoint sharaf;
- pembaruan katalog di IndexedDB dari background manifest;
- fallback localStorage ketika akses IndexedDB diblokir.

**Batas penting:** Belum ada unduhan penuh 7.889/7.952 record verba,
Muṣarrif 6.287 record, maupun CAMeL Morph. Angka-angka itu adalah hasil
inventarisasi sumber, bukan jumlah entri yang sudah diintegrasikan.
