# P4 — Ekstraksi nonverba Wiktionary

Status: ekstraksi snapshot postprocessed berhasil dalam P7.1; audit hasil dan lisensi belum selesai. Independen dari P1, P2, P3 dan P6. P5 dapat menggunakan kontrak ini setelah data nyata diperiksa.

## Sumber

English Wiktionary, via [Kaikki Arabic](https://kaikki.org/dictionary/Arabic/index.html), registry ID `wiktionary`, CC BY-SA 4.0 dan GFDL. Atribusi kepada kontributor Wiktionary dan Kaikki/Wiktextract. [Dokumentasi format](https://github.com/tatuylonen/wiktextract#format-of-the-extracted-word-entries).

Halaman Kaikki pada 20 November 2026 menyebut dump enwiktionary 2026-10-01, ekstraksi 2026-10-30, dan unduhan postprocessed 827,9 MB. Endpoint tersebut ditandai deprecated; jangan menganggap URL atau isi tetap. Catat tanggal dump yang benar dan SHA-256 berkas masukan. Jangan commit dump mentah. Kesesuaian lisensi informasi tambahan hasil postprocessing perlu diperiksa sebelum redistribusi.

## Menjalankan ekstraksi

Unduh JSONL di luar repository, lalu jalankan:

```sh
node --test scripts/build-wiktionary-nonverbs.test.mjs
node scripts/build-wiktionary-nonverbs.mjs \
  --source /path/to/arabic.jsonl \
  --snapshot 2026-10-01 \
  --out /tmp/nonverbs.json
```

Ganti tanggal dengan tanggal dump aktual. Output adalah kandidat internal yang belum dipublikasikan. Tidak masuk build statis sampai P5 mengadopsi dan memvalidasi kontraknya. Salinan terpilih yang didistribusikan harus beratribusi, berlisensi sesuai sumber, mengikuti kebijakan hak cipta dan tidak memuat data tambahan yang haknya belum jelas.

## Kontrak

- POS upstream dipertahankan: noun, adj, adv, pron, prep, postp, conj, particle, interj, num, det, article, phrase, prep_phrase, proverb, abbrev dan name.
- Kelompok kandidat terpisah dari infleksi/varian, nama diri, dialek terdeteksi dan sense tanpa glos.
- Register yang tidak berlabel tetap unspecified, bukan otomatis MSA; tag historis tidak membuktikan sebuah sense masih dipakai.
- Lema memakai bentuk canonical tunggal jika tersedia. Jika ambigu, semua canonical dipertahankan dan judul halaman dipakai.
- Lema dibedakan menurut POS, vokalisasi, judul halaman dan nomor etimologi jika tersedia. ID lokal berbasis hash bukan ID upstream abadi. Akar dan bab tidak ditebak; akar eksplisit belum diekstrak.
- Glos Inggris, label register, gender/jamak/dual eksplisit dan relasi form_of/alt_of dipertahankan sebagai bukti sumber, bukan definisi Indonesia. Setiap sense memiliki URL halaman, baris JSONL, indeks sense dan status draft.
- Statistik membedakan jumlah kunci kandidat lema, sense unik, bucket, POS dan duplikat. Jumlah kunci belum membuktikan jumlah lema bahasa Arab unik karena homograf dan entri sumber ambigu.

## Gerbang sebelum P5

1. Jalankan ekstraksi pada snapshot nyata; simpan laporan jumlah dan checksum.
2. Audit POS serta tag register/form-of nyata, terutama dialek tidak berlabel, plural lexicalized, adjektiva/partisipel dan homograf. Pisahkan idiom dari satu kata.
3. Periksa akar eksplisit dan relasi keluarga kata tanpa menebak akar; audit duplikat lintas halaman dan varian ejaan.
4. Tinjau izin redistribusi untuk data postprocessed, lalu simpan data terpilih beserta atribusi. Tambahkan glos Indonesia orisinal yang terverifikasi pada tahap integrasi.
5. Jangan menandai P4 selesai sebelum data nyata dan laporan tersedia. Tidak ada klaim jumlah lema atau akurasi linguistik dari fixture sintetis.

Tidak menggunakan Qabas sebagai sumber redistribusi, Lane, atau basis data lokal lex.zip/db.sqlite.

## Hasil aktual P7.1

[CI 44718897669](https://github.com/faiz-muttaqin/belajar-bahasa-arab/actions/runs/44718897669), 20 November 2026: 17.347 kandidat kunci lema dan 29.319 kunci sense unik dari snapshot 233.417 baris. Dua ekstraksi identik. Sebanyak 1.425 baris kandidat memiliki canonical ambigu dan 28.190 register unspecified. P6 menggunakan snapshot yang sama dan memperoleh lead untuk 136/152 entri. Tidak ada data baru yang diterbitkan. SHA-256, rincian dan pekerjaan tersisa dicatat dalam [checkpoint P7](../plans/p7-dictionary-expansion.md).
