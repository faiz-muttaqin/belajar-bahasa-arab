# Peta kaidah nahwu–sharaf: dari kata sampai wacana

**Dibuat:** 14 November 2026 · **Status:** rencana implementasi bertahap · **Target:** pembelajar Indonesia yang sudah dapat membaca Arab berharakat; Iqra tetap jalur terpisah.

## Prinsip produk

- **Jangan membuat kurikulum paralel**: rujuk 22 kelompok tashrif di `/rujukan/fiil/`, tabel isim/harf, kamus MSA dan pelajaran existing di `/belajar/`. Halaman `/kaidah/` adalah peta konsep + demonstrasi peran dan keterkaitannya.
- Setiap aturan punya ID stabil, kategori (sharaf, frasa, kalimat, klausa, wacana), penjelasan original, prasyarat, contoh Arab berharakat, terjemahan Indonesia, sumber spesifik, pengecualian, dan level kepastian audit.
- **Setiap kata Arab berada di atas glosnya**, urutan Arab kanan-ke-kiri; kelompok kata dapat membungkus di layar sempit tanpa memisahkan glos dari kata. Terjemahan _alami_ dari keseluruhan frasa/kalimat di bawahnya; glos kata per kata bukan selalu padanan literal yang sempurna.
- Gunakan warna tenang sebagai _penekanan peran_, **bukan pengganti label teks**. Cantumkan legenda, label eksplisit, batas kontras dan mode dark/light. Tidak pernah mencampur peran sintaksis dengan kategori sharaf atau kategori leksikal.
- Contoh dan latihan adalah redaksi original; rujukan kitab digunakan untuk kaidah, bukan sumber salin-tempel. Bedakan attestation lema, kaidah, dan contoh buatan proyek. Status materi tetap draft sampai klaim didukung bukti (lihat [protokol verifikasi](../research/2026-11-14-source-based-verification.md)).

## Crosswalk rujukan

| Rujukan                                          | Cakupan                                                                                                                                                                                                                                                         | Bentuk penggunaan dan batasan                                                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Al-Ājurrūmiyyah**, Ibn Ājurrūm                 | Kalām, i‘rab, marfū‘āt, mubtada–khabar, na‘at, fi‘il–fa‘il, mansūbāt, majrūrāt                                                                                                                                                                                  | Kerangka klasifikasi; bukan salinan edisi/terjemahan                                                                                                |
| **Qaṭr al-Nadā**, Ibn Hishām                     | Pendalaman i‘rab, mu‘rab/mabnī, fungsional kalimat, tawābi‘                                                                                                                                                                                                     | Pendalaman dan edge cases; [katalog NYU](https://sites.dlib.nyu.edu/viewer/books/auc_aco000948/1)                                                   |
| **Alfiyyah Ibn Mālik**                           | Sintaksis dan kasus lebih luas; pengecualian serta konstruksi kompleks                                                                                                                                                                                          | Roadmap tingkat lanjut, jangan menjadikan nazham sebagai kalimat contoh tanpa audit                                                                 |
| **Al-Amtsilah at-Taṣrīfiyyah**, Muhammad Ma‘shūm | Tashrif istilahi/lughawi yang lazim di Indonesia                                                                                                                                                                                                                | Peta pola dan contoh asli; tabel existing menjadi titik masuk                                                                                       |
| **Matn al-Binā’ wa al-Asās**                     | Tsulatsi/ruba‘i, mazid/mujarrad, bab perubahan fi‘il                                                                                                                                                                                                            | Riset tahap sharaf; contoh penjelasan buku modern [UIN Mataram](https://repository.uinmataram.ac.id/344/) berlisensi CC BY-NC-ND, **tidak diimpor** |
| **Madinah Arabic**                               | Kurikulum aplikatif dengan [na‘at](https://madinaharabic.com/free-content/grammar/lesson-9/part-2), [idafah](https://madinaharabic.com/free-content/grammar/lesson-5/part-2), [mubtada–khabar](https://madinaharabic.com/free-content/grammar/lesson-58/part-1) | Rujukan halaman kaidah spesifik; konten ditulis ulang secara independen, bukan menyalin aset                                                        |
| **Quranic Arabic Corpus**                        | Morfologi dan i‘rab Arab Qur’ani                                                                                                                                                                                                                                | Cross-check kasus Qur’ani, **bukan** asumsi register MSA modern; hak penggunaan dataset perlu audit                                                 |

Klasifikasi nahwu tradisional bukan urutan pedagogis otomatis: aturan diprioritaskan berdasar prasyarat, frekuensi kebutuhan, dan kemampuan membaca teks. Judul kitab dan babnya adalah metadata/bibliografi, bukan impor teks.

## Seri PR bertahap

| ID       | Fokus                                      | Deliverable                                                                                                                                  | Ketergantungan            |
| -------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **G-01** | Peta pertama: frasa sifat, nominal, idafah | `/kaidah/`, 3 aturan, glos per kata, warna + label, latihan buka-jawab, sumber, tautan dari navigasi dan rujukan, test static/no-JS          | Kosakata MSA + tabel isim |
| **G-02** | Sharaf: akar dan perubahan bentuk          | Hubungkan 22 wazan, fi‘il madhi/mudhari/amar, tsulatsi–ruba‘i, mujarrad–mazid, isim fa‘il/maf‘ul, masdar; contoh _attested_ dan pengecualian | Leksikon dan kaidah G-01  |
| **G-03** | Jenis kata & i‘rab dalam frasa             | Ma‘rifah/nakirah, mudhakkar/muannath, mufrad/mutsanna/jamak, jar–majrur, zharf, na‘at agreement, tanwin, tanda rafa‘/nashab/jarr             | G-01; tabel isim          |
| **G-04** | Kalimat lengkap                            | Mubtada–khabar berbagai tipe, fi‘il–fa‘il–maf‘ul, naib fa‘il, negasi, pertanyaan, amil nāsikh dan harf nāsikh; contoh kontrol bentuk kata    | G-02 + G-03               |
| **G-05** | Kalimat tersambung                         | Athaf, isim maushul, jumlah shilah, syarat, sabab–natijah, istitsna, haal/tamyiz, urutan dan kontras; penandaan rentang klausa               | G-04                      |
| **G-06** | Wacana dan latihan adaptif                 | Peta prasyarat, deep link antar kaidah/kosakata/pelajaran, latihan komposisi, pencarian kaidah dan pemahaman paragraf, pengujian pembelajar  | G-01–05                   |

### G-01: kriteria penerimaan

- [ ] Tiga aturan/kontras terpisah jelas: **كِتَابٌ جَدِيدٌ** (frasa sifat) vs **الْكِتَابُ جَدِيدٌ** (kalimat nominal) vs **كِتَابُ الطَّالِبِ** (idafah).
- [ ] Setiap token Arab berharakat memiliki glos Indonesia tepat di bawahnya serta label peran yang tetap jelas tanpa warna.
- [ ] Contoh punya terjemahan keseluruhan yang tidak disamakan dengan rangkaian glos literal; penjelasan akhir kata dan batasan kaidah.
- [ ] Mobile dan desktop tanpa overflow horizontal, dark/light; tidak bergantung JavaScript untuk teks, glos, ataupun jawaban latihan.
- [ ] Tautan navigasi/rujukan dan sumber spesifik; tidak ada dependency atau service baru.
- [ ] CI `bun run verify` lulus, 3 aturan diuji pada unit, route dan no-JS pada E2E.

## Audit sebelum ekspansi

Prioritaskan klaim yang berpotensi menyesatkan: jamak taksir tidak selalu tak beraturan, ṣifah mengikuti man‘ūt pada empat dimensi namun **jamak ghayr ‘āqil** sering memakai sifat feminin tunggal, idafah bisa menyatakan hubungan lebih luas dari kepemilikan, dan **akhir kata dapat berubah sesuai fungsi sintaksis**, bukan dihafal sebagai bentuk absolut. Material baru tetap berstatus `draft` hingga ada audit berbasis bukti per kaidah.

## Dynamic examples — rencana tambahan G-06 dan sesudahnya

Mulai dari **pilot modal search dua pola kalimat** di G-06, pengguna dapat mengetuk slot kata dan memilih lema terkurasi dari kamus MSA dan tabel fi‘il sharaf. Pencocokan **tidak cukup berdasarkan jenis kata**; harus mempertimbangkan i‘rab, gender, jumlah, tashrif, pelaku/objek dan valensi semantik. Teks contoh dan terjemahan diperbarui tanpa merusak HTML statis untuk pengguna tanpa JavaScript.

Pemetaan kontrak dan lanjutan D-02–D-06 ada dalam [rencana Dynamic Examples](./dynamic-example-slots.md), ditelusuri lewat [GitHub issue #24](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/24). Sampai morphological engine dan korpus diperiksa, opsi modal dibatasi pada pasangan kata **yang sudah dianotasi**; bukan semua lema dictionary. Penyimpanan percobaan/progres belajar ke IndexedDB tetap tahap lanjutan.
