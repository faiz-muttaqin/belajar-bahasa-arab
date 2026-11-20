# P5 — Kamus per sense dan keluarga kata

Status: pilot integrasi, bukan penyelesaian kamus. P4 (#64) menyediakan ekstraktor, tetapi belum ada snapshot hasil nyata yang lolos audit.

## Implementasi

- Kontrak `src/lib/domain/dictionary/senses.ts` menyimpan ID lema dan ID sense terpisah, POS, register per sense, glos dan definisi Indonesia, sumber dan locator per klaim, akar/gender/bab opsional, bentuk tercatat vs hasil aturan, contoh orisinal opsional dan relasi eksplisit.
- Pilot `src/lib/content/dictionary-pilot.ts`: lima lema, sebelas sense, satu akar, diteliti terhadap bagian Arabic dari [كتب](https://en.wiktionary.org/wiki/كتب#Arabic), [كتاب](https://en.wiktionary.org/wiki/كتاب#Arabic), [مكتب](https://en.wiktionary.org/wiki/مكتب#Arabic), [مكتبة](https://en.wiktionary.org/wiki/مكتبة#Arabic) dan [كتابة](https://en.wiktionary.org/wiki/كتابة#Arabic) pada 20 November 2026.
- Teks glos Indonesia orisinal dan fakta kebahasaan, tidak menyalin contoh/definisi panjang. Rujukan Wiktionary CC BY-SA 4.0 / GFDL, registry ID wiktionary. Semua draf; satu sense historis dan sepuluh sense unspecified karena register lainnya belum diaudit penuh. Tidak ada klaim cakupan seluruh makna.
- Halaman `/sharaf/kamus/` dengan filter POS dan register, pencarian tanpa harakat, akar, bentuk tercatat dan glos Indonesia. Keluarga akar dibentuk dari akar eksplisit dengan kesamaan NFC, bukan normalisasi pencarian. Relasi masdar disimpan terpisah dari hubungan akar.
- HTML statis menampilkan pilot tanpa JavaScript. Tes unit dan E2E ditambahkan; CI perlu dijalankan. Tidak ada backend, dependency baru atau data bulk di bundle.

## Integrasi P4/P2/P6 berikutnya

P4 menghasilkan baris kandidat dengan lemmaId, senseId, bucket, POS, register, glos sumber, bentuk dan locator snapshot (checksum, baris dan indeks sense). Pemetaan ke kontrak P5 harus mempertahankan identitas upstream, provenance per sense dan status review:

1. Audit snapshot nyata sebelum membuat tabel konversi POS/register. Jangan anggap bucket candidate otomatis layak terbit, unspecified bukan MSA.
2. Jangan menggabungkan homograf berdasarkan normalisasi Arab. Identitas P4 harus dipertahankan sebagai alias ketika lema dari sumber berbeda dipadankan secara manual.
3. Glos Inggris bukan glos Indonesia. Susun glos Indonesia per sense dengan klaim spesifik dan sumbernya; jangan menerbitkan terjemahan tanpa audit.
4. Akar harus memiliki bukti eksplisit. Bentuk infleksi dan relasi derivasi tidak boleh disimpulkan dari kemiripan ejaan. Untuk bab, catat pasangan bentuk atau nomor Form secara spesifik.
5. Setelah lisensi, register, dan identitas diaudit, bangun indeks manifest berversi dan shard per prefiks, lalu perluas pencarian secara lazy. Pilot saat ini kecil dan tidak membuat shard kosong.
6. Tambahkan dukungan registry ID sumber lain dengan role sumber utama/pembanding terpisah. Kontrak pilot sengaja hanya menerima Wiktionary, agar sumber pembanding tidak diperlakukan sebagai bukti sense.
7. Integrasi D-02 dan katalog sharaf/msa lama tanpa mengubah makna, review status atau provenance. Perluasan dan validasi P7 menunggu data P4/P2/P6.

## Batasan

Belum ada impor batch P4, rekonsiliasi dengan ribuan verba, indeks shard, audit sinonim/polisemi penuh, contoh orisinal terverifikasi, ataupun review linguist. Jangan menandai P5 selesai.

## Audit komparasi — 20 November 2026

Sumber pembanding diperiksa hanya sebagai bukti komparatif, tanpa mengimpor teks definisi:

- [Lane, akar كتب](https://www.arabic-english-dictionary.com/content/22_k/023_ktb): artikel 1 mendukung kataba/yaktubu dan masdar kitabah; artikel kitab mendukung buku dan jamak kutub; kitabah mendukung kegiatan menulis. Artikel maktab mencatat sekolah dan plural makatib. Tidak membuktikan semua sense modern.
- [Al-Mu’jam al-Wasīṭ, maktab](https://www.arabicacademy.gov.eg/ar/محرك-البحث/الْمَكْتَبُ?exact_search=true): mendukung meja kerja, kantor, plural makatib, dan akar. Perbedaan pemakaian historis tetap harus diberi label.
- [Kamus Akademi Kairo, maktabah](https://www.arabicacademy.gov.eg/ar/محرك-البحث/الْمَكْتَبَةُ?exact_search=true): mendukung perpustakaan dan tempat menjual buku/alat tulis. Sumber ini mengelompokkan penjualan buku dan alat tulis, tidak membuktikan bahwa keduanya wajib merupakan dua sense terpisah.
- [Al-Mu’jam al-Wasīṭ, kitabah](https://www.arabicacademy.gov.eg/ar/محرك-البحث/الْكِتَابَةُ?exact_search=true): mendukung kegiatan menulis; tidak mendukung secara independen seluruh sense tulisan tangan dan sistem tulisan yang dicatat Wiktionary.

Audit mempertahankan sepuluh sense pilot dan menambah sense historis maktab (Wiktionary Arabic > Noun; pembanding Lane). Jamak maktab dan gender kitab/maktab ditambahkan berdasarkan headword Wiktionary. Jamak alternatif maktabah memang tercatat pada bagian Arabic, bukan hanya dialek. Sumber pembanding tidak dipromosikan ke evidence utama. Semua tetap draft.

Audit arsitektur: D-02 adalah kontrak permukaan untuk grammar; P5 adalah identitas leksikal dan sense, bukan generator infleksi. P4 masih membutuhkan adapter, ID snapshot/locator yang dapat ditelusuri, pemetaan POS tanpa kehilangan tag, dukungan banyak sumber dan status konflik, serta audit lisensi sebelum impor. Kontrak pilot belum mampu memuat semua metadata tersebut. Normalisasi pencarian tidak boleh menjadi identity key, dan hubungan akar bukan sinonimi. Belum ada klaim pemeriksaan exhaustif atau review linguist.

Audit CI: path resolve dikoreksi mengikuti route type SvelteKit. File E2E diganti dari .spec.ts menjadi .e2e.ts agar sesuai testMatch Playwright. Typecheck lulus pada commit koreksi path; hasil seluruh suite untuk perubahan audit masih menunggu CI.
