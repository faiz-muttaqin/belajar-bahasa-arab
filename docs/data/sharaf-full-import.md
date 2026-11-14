# Impor leksikon sharaf penuh — 14 November 2026

## Hasil ekstraksi yang benar-benar disertakan

Impor ini menggunakan salinan **lengkap** dua daftar verba tsulatsi dan
daftar kata fungsi Arab. Bukan preview 17 record yang digunakan PR #4.

- Qutrub: **7.889** record kata kerja bersumber.
- Arramooz: **7.952** record kata kerja bersumber.
- Gabungan unik: **7.938** kombinasi `madhi berharakat + akar + bab`.
- Arab Stopwords: **596** record berkelas kata dari sumber, disimpan
  lengkap. Dari jumlah itu, kelas `حرف`, `اسم`, `ضمير`, dan
  `اسم فعل` masuk ke tampilan glosarium sesuai tipe masing-masing.
  Entri auxiliary `فعل` dan huruf abjad `حرف ابجدي` tidak
  disalahklasifikasikan sebagai fi’il bermakna lengkap.
- Sebanyak **7.868** kombinasi ditemukan pada kedua sumber verba.
  Sisanya terdiri dari 4 kombinasi khusus Qutrub dan 66 khusus Arramooz.

Ini **bukan 7.938 akar unik**, bukan 7.938 kata dengan arti Indonesia,
dan bukan ribuan paradigma lengkap yang dihasilkan. Korpus ini
memberikan lemma madhi, akar, kode transitivitas dan bab Form I
(tsulatsi mujarrad). Bab 7–22 masih memakai contoh yang sudah ada
di katalog kurikulum; bentuk mazid belum diimpor massal.

## Lokasi berkas

- `data/sharaf-upstream/qutrub-ar_verb_normalized.dict` (sumber lengkap)
- `data/sharaf-upstream/arramooz-verb_triliteral.tsv` (sumber lengkap)
- `data/sharaf-upstream/arabicstopwords-classified.tsv` (sumber lengkap)
- `data/sharaf-upstream/GPL-2.0.txt` (teks lisensi GPLv2)
- `scripts/build-sharaf-lexicon.mjs` (normalisasi deterministik)
- `static/data/sharaf-lexicon-v1.json` (output siap deploy)

Jalankan `bun scripts/build-sharaf-lexicon.mjs --check` untuk
memverifikasi output identik dengan data sumber di git. Jalankan tanpa
`--check` untuk meregenerasi file saat memperbarui snapshot.

## Provenance dan lisensi

Sumber-sumber berikut diakses pada snapshot commit yang dikunci.
Salinan sumber berisi header/kolom asli dan tidak diubah.

- [Qutrub oleh Taha Zerrouki](https://github.com/linuxscout/qutrub/tree/52e1412ccbaaf429136412183318fcbf0cf9bcd7)
  — file `data/ar_verb_normalized.dict`, GPLv2 menurut COPYING.
- [Arramooz oleh Taha Zerrouki dan kontributor](https://github.com/linuxscout/arramooz/tree/b055c5dea51b8a9152e7e66a7ca3b6f713fb187d)
  — file `data/verbs/verb_triliteral.csv`, GPLv2.
- [Arabic Stopwords](https://github.com/linuxscout/arabicstopwords/tree/f6018e22e02067022231d4dbda0e46b4b1b7e1e7)
  — file `releases/latest/csv/stopwords_classified.csv`, GPLv2.

Dataset tersendiri, transkripsi ulang dan JSON normalisasi
didistribusikan berdasarkan **GPLv2** dengan sumber preferensi yang
tersedia di repo. Ketentuan kompatibilitas dengan lisensi keseluruhan
aplikasi perlu dipastikan sebelum merge atau distribusi lebih lanjut.
Sumber terbatas lisensi lain (Qabas CC BY-ND) tidak disalin.

## Normalisasi

1. Parse TSV, periksa tepat lima kolom untuk verba dan kode bab 1–6.
2. Normalisasi Unicode `NFC`, **tetapi jangan hapus harakat pada
   identifier** karena vokalisasi berbeda dapat menandai lema berbeda.
3. Map bab sumber `5 → 6` dan `6 → 5` ke urutan 22 kelompok situs.
4. Deduplikasi berdasarkan `(madhi berharakat, akar, bab internal)`;
   simpan kedua ID sumber, transitivitas dan URL provenance.
5. Gabungkan dengan contoh internal berdasarkan kunci tersebut saat
   browser memuat dataset. Pertahankan terjemahan dan bentuk yang
   sudah ada. Jangan mengarang mudhari/mashdar jika sumber tidak
   mencatatnya.
6. Untuk kata fungsi, pertahankan kelas kata sumber; tampilkan hanya
   kategori yang sesuai model UI tanpa mengklaim semua 596 merupakan
   kata penghubung.

## Performa dan offline

File `/data/sharaf-lexicon-v1.json` adalah static asset terpisah dan
**tidak** di-bundle ke HTML/JavaScript halaman pertama. Setelah load,
aplikasi membacanya dari cache IndexedDB bila ada, atau mengunduhnya
satu kali dari aset statis ketika online.

Storage `belajar-bahasa-arab-materi` meningkat dari versi 1 ke
versi 2. Store lama `packages` dipertahankan; store baru
`sharaf-lexicon` menyimpan snapshot besar, dengan fallback
`localStorage` berukuran terbatas untuk browser yang menolak IndexedDB.
Hasil normalisasi pencarian disimpan dalam memori (WeakMap) per versi.

UI modal membatasi render awal hingga 48 kartu dan menambah 48 kartu
per klik agar tidak membuat ribuan komponen sekaligus. Halaman
`/sharaf/` serta hasil pencarian global menggunakan indeks yang sama
dan menampilkan hasil bertahap. Data yang belum punya arti Indonesia
tetap dapat ditelusuri berdasarkan ejaan Arab, akar dan bab.

## QA dan batasan

- `bun scripts/build-sharaf-lexicon.mjs --check`
- `bun run verify`: TypeScript, lint, unit test, build statis dan Playwright
- Tes khusus: data penuh, perbedaan bab, kesesuaian GPL dan sumber,
  cache versi 2, modal bertahap, pencarian global dan deep links.

Kamus awal proyek tetap tersedia ketika unduhan tambahan gagal. Tidak
ada permintaan ke backend runtime atau layanan leksikografi eksternal.
