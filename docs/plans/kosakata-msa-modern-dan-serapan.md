# Kosakata Arab Fuṣḥā modern: serapan, pembentukan istilah, dan pemakaian formal

**17 November 2026 · Status: rencana bertahap; data leksikal dan etimologi masih draft.**

## Tujuan dan batas

Pengguna yang telah bisa membaca Arab berharakat perlu memahami kata sehari-hari yang muncul dalam berita, dokumen, formulir, pendidikan, teknologi dan komunikasi formal berbahasa Modern Standard Arabic (MSA). Hubungkan kata dengan bacaan dan pelajaran nahwu–sharaf yang sudah ada; jangan membangun kamus atau kurikulum kedua. MSA merupakan ragam Fuṣḥā modern, bukan bahasa terpisah dari Classical Arabic (CA). Banyak kata umum dan kaidah dipakai keduanya; keberadaan di MSA **tidak** berarti kata itu baru atau dipinjam.

Pembagian yang perlu dijaga:

- **Serapan / loanword**: leksem yang dipinjam dari bahasa lain dan disesuaikan dalam Arab; contoh awal `إِنْتَرْنِت` (internet). Arah bahasa sumber dan kronologi memerlukan bukti etimologis per lema.
- **Istilah modern bentukan Arab**: kata yang dibuat dari akar/pola Arab; `حَاسُوب` dari ح س ب merupakan contoh kandidat yang telah tercatat, **bukan** serapan hanya karena merujuk teknologi.
- **Frasa/terjemahan istilah**: gabungan kata Arab seperti `هَاتِفٌ ذَكِيٌّ`; berbeda dari satu lema serapan dan tetap mengikuti kaidah kesesuaian sintaksis.
- **Kata warisan atau bersama**: kata yang digunakan dalam CA maupun MSA, misalnya `كِتَاب`; jangan diberi label «khusus klasik» atau «modern» tanpa analisis korpus.
- **Pemakaian baru atas kata lama**: perlu label relasi _sense_, bukan mengubah semua bentuk kata menjadi kategori serapan.
- **Varian dialek**: jangan memasukkannya ke MSA formal tanpa bukti register. Modul ‘Āmmiyyah tetap terpisah.

Tidak semua kata asing modern masuk Fuṣḥā; sebagian mempunyai lebih dari satu padanan baku, ejaan berbeda atau ragam negara. Catat alternatif tanpa mengklaim satu bentuk sebagai satu-satunya bentuk resmi.

## Pengalaman belajar dan penanda

Untuk kartu kosakata yang `msa.formation === 'loanword'`, tampilkan **label teks kecil “Serapan · draf”** dekat kata. Label harus terbaca tanpa hover, bekerja di ponsel dan tanpa JavaScript, serta tidak mengganti warna/border seluruh kartu. Detail yang sudah ada menjelaskan «Kata serapan; jangan memaksakan akar tsulatsi». Penanda mencerminkan anotasi _draft_ saat ini, **bukan sertifikasi etimologi**. Untuk item tanpa metadata, **jangan** menampilkan «bukan serapan»; ketiadaan informasi tidak membuktikan asal kata.

Ekspansi berikutnya: saat bukti per-lema sudah lolos gate research, label ringkas dapat membedakan **Serapan**, **Bentukan Arab**, **Gabungan kata**, dan **Makna modern**, semuanya menggunakan teks + penjelasan di detail kata. Penanda dapat dipilih pada filter «Asal/pembentukan», tetapi jangan menambah filter kosong sebelum dataset cukup. Tautan per kelas menuju halaman pembelajaran tentang perbedaan CA/MSA/‘Āmmiyyah. Untuk etimologi yang diperdebatkan, tampilkan «Belum pasti» dan beberapa rujukan yang menjelaskan perbedaan.

Konteks contoh: orang membaca pesan jadwal, mencari alamat, membuka situs, atau memahami pemberitahuan sekolah. Latihan menanyakan **makna dalam konteks** dan pilihan padanan yang wajar, bukan menghafal label etimologi. Sediakan **20–50 butir yang benar-benar berbeda** per bank latihan matang: stimulus, konteks dan maksud berbeda; pengacakan opsi bukan variasi. Implementasi bertahap dapat dimulai dari subset kecil terkurasi, bukan memalsukan jumlah.

## Kontrak data dan audit

Gunakan entri `VocabularyItem` / `MsaLexicalInfo` yang sudah ada dan ID stabil. `formation` hanya klaim jenis pembentukan; **jangan** menggantikannya dengan register, POS atau status bukti. Pengembangan metadata (setelah ADR/schema review):

- `etymology`: asal bahasa, bentuk asal (jika bisa diverifikasi), jenis peminjaman, tahap adaptasi/ejaan Arab, rujukan lema spesifik, tanggal cek, catatan konflik dan status verifikasi **per klaim**.
- `usage`: sense MSA, konteks, register (formal/colloquial), wilayah bila relevan, alternatif padanan; bedakan contoh karya sendiri dari kutipan korpus.
- `historicalEvidence`: ada/tidaknya attestation CA dengan rujukan dan kronologi eksplisit. **Tidak ditemukan di korpus** bukan bukti tidak pernah ada.
- `morphology`: plural, gender, akar/wazan hanya bila didukung. Serapan bisa mengalami morfologi Arab, jadi label «serapan» **tidak otomatis berarti tidak bisa ditashrif**.

Gunakan protokol [source-based verification](../research/2026-11-14-source-based-verification.md) dan pekerjaan [audit 157 lema](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/13). Hindari indeks kamus sebagai bukti etimologi lema; catat entry-specific URL + apa yang didukung. Kaikki/Wiktionary yang bersumber sama bukan dua bukti independen. Materi terbuka dengan label _draft_ sebelum peninjauan sesuai ADR-004 D-9. Jangan impor konten sumber yang lisensinya belum lolos; makna/soal ditulis independen.

Rujukan awal (untuk diaudit, bukan lisensi impor otomatis):

- [Wiktionary entry: إنترنت](https://en.wiktionary.org/wiki/إنترنت)
- [Wiktionary entry: حاسوب](https://en.wiktionary.org/wiki/حاسوب)
- [Wiktionary entry: هاتف ذكي](https://en.wiktionary.org/wiki/هاتف_ذكي)
- [Kaikki Arabic index](https://kaikki.org/dictionary/Arabic/index.html)
- [Ryding, A Reference Grammar of Modern Standard Arabic (Cambridge)](https://www.cambridge.org/core/books/reference-grammar-of-modern-standard-arabic/)

## Tahapan delivery

1. **LM-01 · Penanda aman (pilot).** Badge teks untuk item `formation: loanword` yang _sudah_ memiliki anotasi; jelaskan draft dan no-JS; regression test untuk internet vs hasub. Tidak menambah lemma atau mengubah status review.
2. **LM-02 · Audit leksikal.** Reuse issue #13: audit setiap klaim pada 157 starter entries, terutama kata teknologi, sumber asal, adaptasi dan alternatif; tabel bukti, ketidakpastian dan revisi, tanpa memalsukan akar.
3. **LM-03 · Kosakata dokumen/harian.** Tambah batch kecil kata yang sudah dibuktikan dari pengumuman, formulir, berita, pendidikan, layanan publik dan teknologi; dedup per (lemma, POS, sense, register). Pilih cakupan berdasarkan tugas membaca, bukan mengarang angka frekuensi.
4. **LM-04 · Pemakaian di teks.** Hubungkan kartu ke paragraf/formulir MSA, pilihan kata lintas CA–MSA, glos, pembahasan dan ≥20 variasi latihan bermakna per bank yang sudah diterbitkan; gate lisensi, audit kebahasaan dan static HTML.
5. **LM-05 · Uji pembelajar.** Periksa apakah label dipahami tanpa tooltip/hover, mobile 375px, pembaca layar dan no-JS; bandingkan keberhasilan memahami teks baru dengan/ tanpa penjelasan etimologi. Jangan menilai kemampuan membaca dari arti kata serapan saja.

**Di luar cakupan PR pilot:** menambah 157 entri tanpa audit, mengklaim kata non-serapan = klasik, menyamakan MSA dengan ‘Āmmiyyah, atau menambah API/backend/penyimpanan baru.

## Catatan implementasi terverifikasi — 17 November 2026

**Status plan keseluruhan: PARTIAL**, bukan otomatis selesai karena PR pilot sudah merged. Audit lintas sebelas dokumen: [matriks status implementasi](./IMPLEMENTATION_STATUS.md).

**Sudah terlihat di kode:** `src/lib/components/learning/VocabCard.svelte`, `src/lib/content/msa-research.ts`, `tests/e2e/msa-vocabulary.e2e.ts`. Ini bukti keberadaan implementasi, **bukan** audit benar-salah kaidah atau hasil uji pengguna.

**Belum terpenuhi:** LM-02–05: sisa 152 lema belum punya audit klaim, kategori etimologi lain, bacaan dokumen kontekstual, uji pengguna; metadata leksikal penuh belum selesai.

**Tindak lanjut:** [issue #13](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/13). Setiap PR lanjutan wajib menyebut sub-deliverable yang diselesaikan dan kriteria yang masih terbuka.

## P6 / LM-03 — batch 1 (20 November 2026)

Menambahkan delapan entri draf dengan 31 klaim parsial (bentuk, makna, POS; tujuh juga jenis pembentukan) dari bagian Arabic pada halaman lema Wiktionary. Lima istilah media/teknologi dan tiga dokumen/administrasi; jumlah katalog 165, dengan 13 audit parsial. Register, koroborasi independen, audit 152 lema awal yang belum diperiksa, dedup silang katalog, LM-04 dan LM-05 tetap terbuka. Tidak ada promosi research_verified, impor definisi, atau klaim frekuensi.
