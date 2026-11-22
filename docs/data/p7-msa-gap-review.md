# P7.3 — Antrean 16 gap MSA yang dapat ditelusuri

Status: penelitian semantik dan sumber masih terbuka. Rujukan utama: [P7](../plans/p7-dictionary-expansion.md), [P6](p6-msa-expansion.md), dan [issue #79](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/79).

## Mengapa ID perlu dicatat

Snapshot nyata P4 menghasilkan candidate lead untuk 136 dari 152 starter MSA; 16 belum cocok berdasarkan normalisasi ejaan, POS dan bucket yang dipakai pencarian otomatis. Ketidakcocokan **tidak membuktikan kata tidak ada atau bentuknya salah**. Sebelas gap diklasifikasikan sebagai expression, tiga noun, dan dua adjective pada preflight sebelumnya.

P7.3 menambahkan `p6.withoutCandidateIds` yang diurutkan secara deterministik pada laporan preflight. Daftar ini hanya memuat ID yang sudah ada pada konten milik proyek `msaVocabulary`; **bukan** glos, rekaman Wiktionary, atau teks pihak ketiga. Jumlahnya harus identik dengan `p6.withoutCandidate`, dan ID kosong/duplikat adalah kegagalan data, bukan alasan untuk menghilangkan item.

## Alur penelitian lanjutan

1. Dari artefak ringkasan workflow `P7 nonverb snapshot and MSA leads`, ambil `p6.withoutCandidateIds` dan cocokkan ID dengan kosakata yang memang sudah berada di `src/lib/content/msa-vocabulary.ts` atau berkas ekspansinya.
2. Untuk ungkapan majemuk, cek apakah sumber memiliki entri frasa tersendiri atau tersusun dari beberapa lema. Tidak boleh menganggap komponen individual sebagai bukti arti frasa.
3. Cari rujukan terbuka/domain publik serta contoh penggunaan formal dengan tanggal, URL, kelas kata dan register per sense; jangan mengklaim label MSA dari register unspecified.
4. Catat hasil `candidate-found`, `no-evidence-yet`, `ineligible`, atau `hold` beserta alasan dan sumber; kandidat temuan tetap belum terbit sampai audit substansif.
5. Jangan mengubah `p7_preflight.py` menjadi auto-translator. Penggabungan P5 harus menggunakan mapping ID dan keputusan reviewer, bukan kesamaan ejaan saja.

**Batasan:** angka 136/16 tetap baseline dari snapshot terpin 2026-10-01. Jika checksum sumber berubah, hitung ulang baseline dan rekam metriknya; jangan gabung dua snapshot secara diam-diam. Audit lisensi dan izin penerbitan tetap terpisah.
