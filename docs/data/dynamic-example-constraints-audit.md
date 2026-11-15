# Audit D-04a — batas sintaksis/semantik untuk contoh dinamis

**Tanggal:** 15 November 2026 · **Status:** pilot validasi pada G-06, belum pengganti seluruh aturan nahwu. Semua redaksi dan pilihan yang dikurasi tetap \`draft\` untuk tinjauan guru bahasa Arab.

## Tujuan

Sebelum D-05 memindahkan penggantian kata ke kartu G-01–G-05, UI perlu jawaban yang bisa dipahami untuk dua hal: "mengapa kata ini boleh digunakan" dan "mengapa belum bisa digunakan". Tidak boleh hanya menyaring entri berdasarkan noun/verb/adjective. Engine juga **tidak boleh menyebut suatu frasa tidak gramatikal hanya karena kolokasinya belum masuk daftar contoh**.

## API dan kontrak

- \`grammar-constraints.ts\`: \`SlotContract\`, \`evaluateSlotCandidate()\`, \`evaluateAdjectiveAgreement()\`. Penilaian menghasilkan \`allowed\`, kode alasan penolakan dan penjelasan lolos. **Gagal tertutup (fail-closed)** jika metadata wajib tidak ada.
- Syarat \`wordClass\`, sumber \`curated-example\` dengan URL valid, \`case\` pada isim, \`mood\` pada muḍāri‘, \`gender\`, \`number\`, \`definiteness\`, \`person\`, \`aspect\`, \`voice\` dinilai hanya dari **\`MorphFeatures\` yang dinyatakan eksplisit**, bukan inference dari bentuk permukaan atau pola wazan.
- \`requiresCollocation\` membutuhkan daftar \`allowedLexemeIds\` dari bingkai contoh. Jika pilihan tidak terdaftar, hasilnya **"belum dikurasi pada contoh ini"**, bukan "salah bahasa Arab".
- \`evaluateAdjectiveAgreement\` membedakan \`attributive\` (**na‘at**) vs \`nominal-predicate\` (**khabar**): na‘at perlu kecocokan i‘rab, gender, jumlah dan ma‘rifah; khabar contoh G-06 **nakirah dan marfū‘** kendati mubtada-nya ma‘rifah. Untuk jamak bukan manusia, *pilot rule* memeriksa sifat feminin tunggal **hanya jika kelas referen diketahui eksplisit**. Jika kategori manusia/bukan manusia tidak diketahui, engine menolak daripada menebak. Ini bukan pernyataan bahwa semua plural/semua konstruksi mengikuti satu aturan.
- \`dynamic-examples.ts\` kini mempunyai \`contractForBuilderSlot()\`, \`assessBuilderChoices()\`, dan \`searchBuilderChoiceAssessments()\`. Baik pencarian, pilihan yang dapat di-klik, validasi \`chooseBuilderWord()\`, dan pengujian berbagi penilaian yang sama.
- Di modal G-06, kandidat *blocked* tetap terbaca bersama alasannya, tetapi berupa tombol \`disabled\` tanpa \`data-choice\`; \`data-blocked\` memudahkan audit E2E. Kandidat yang lolos menunjukkan syarat frame dan tetap diberi label \`draft\`.

## Diterapkan sekarang

| Template dan slot | Kebutuhan yang dievaluasi | Perilaku saat gagal |
| --- | --- | --- |
| Nominal / mubtada | isim ma‘rifah, mufrad, marfū‘ | Tampilkan alasan kelas/fitur hilang/berbeda |
| Nominal / khabar | sifat nakirah, mufrad, marfū‘, gender sama dengan subjek | Sesuaikan bentuk feminin yang sudah tercatat; tidak menyamakan definiteness dengan mubtada |
| Verbal / fi‘il | verba aktif māḍī 3ms sebagai bentuk dasar pemilihan lema | Sumber lema saja tidak cukup; perubahan ke mode D-03 lain memakai fallback yang sudah ada |
| Verbal / fā‘il | isim tunggal maskulin marfū‘, ma‘rifah | Hanya kandidat berfitur eksplisit diterima |
| Verbal / maf‘ūl bih | isim tunggal manṣūb, ma‘rifah, pasangan objek terkurasi | Kandidat lain terlihat nonaktif dengan alasan "belum dikurasi" |

Perubahan ini **tidak** mengubah output Arab default, susunan token, batas bentuk \`lam/lan/amr\`, atau aturan no-JS. Pengguna yang sudah bisa membaca Iqra tetap melihat contoh awal tanpa berinteraksi. UX novice review oleh agent lain **berjalan terpisah**: D-04a tidak mengklaim telah melakukan tes pembelajar nyata.

## Belum tercakup

1. Identifikasi \`animacy\` pada kamus 8k+ verba/isim, plural/dwitunggal per lema, pasangan na‘at dengan bentuk taksir, dan semua pengecualian.
2. Variasi \`iḍāfah\`/jar-majrūr, klitik terikat, tawābi‘, kata penghubung, pasif, māwṣūl, ḥāl dan hubungan antar klausa. **Jangan** menjalankan substitusi pada template ini sampai D-04b dan D-05 memiliki metadata teruji.
3. Penjelasan yang lolos adalah untuk **frame contoh**, bukan bukti universal suatu kata atau klaim bahwa sumber sudah diverifikasi oleh linguist.
4. Tidak ada penambahan jasa daring, generasi otomatis, atau klasifikasi POS hasil tebakan. Pengujian unit dan E2E mengecek kontrak, bukan kebenaran linguistik seluruh rujukan.

Lanjutan terencana: **D-04b** untuk kontrak idafah, jar, klitik/relasi klausa yang *bisa dibuktikan*, kemudian **D-05** integrasi bertahap kartu G-01–G-05. [Roadmap](../plans/dynamic-example-slots.md) · [issue #24](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/24).
