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

## Peran kata dan visual pembelajaran

[Rencana visual VP-01–VP-05](./visual-pembelajaran.md) memperluas label/warna existing menjadi penjelajah kata dan hubungan sintaksis yang dapat diketuk, dengan alasan i‘rab, animasi perubahan bertahap, mode tanpa warna dan fallback HTML. Contoh tetap dari data terkurasi D-05; tidak ada parser bebas. Peta prasyarat memakai 33 kompetensi dari RM-02, bukan graf kedua.

## Catatan implementasi terverifikasi — 17 November 2026

**Status plan keseluruhan: PARTIAL**, bukan otomatis selesai karena PR pilot sudah merged. Audit lintas sebelas dokumen: [matriks status implementasi](./IMPLEMENTATION_STATUS.md).

**Sudah terlihat di kode:** `src/routes/kaidah/+page.svelte`, `src/routes/kaidah/sharaf/+page.svelte`, `src/routes/kaidah/praktik/+page.svelte`. Ini bukti keberadaan implementasi, **bukan** audit benar-salah kaidah atau hasil uji pengguna.

**Belum terpenuhi:** G-01–05 punya halaman pilot tetapi belum menjamin seluruh cakupan kitab/edge cases; G-06 komposisi/adaptasi, bukti per kaidah dan uji pengguna belum lengkap.

**Tindak lanjut:** [issue #15](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/15), [issue #16](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/16), [issue #17](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/17), [issue #18](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/18), [issue #19](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/19). Setiap PR lanjutan wajib menyebut sub-deliverable yang diselesaikan dan kriteria yang masih terbuka.

### G-02 · Pembaruan OER-02a/b (20 November 2026)

- OER-02a (#57): maṣdar, lima pasangan dan 20 latihan. Belum mencakup variasi maṣdar seluruh wazan.
- OER-02b mencakup enam keluarga verba pada Form I, II, IV dan X, termasuk satu ajwaf. Sebanyak 24 tugas kontekstual sudah diaudit per butir dan masih berstatus draf. [Audit sumber dan latihan](../research/2026-11-20-participle-source-audit.md).
- G-02/OER-02 masih **partial**. Form III, V–IX dan pola lain, akar lemah lain, pengamalan isim turunan, audit contoh maṣdar, tinjauan pengajar, dan uji pembelajar masih terbuka. [#15](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/15), [#55](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/55).

### G-02 · Pembaruan Form III–X (25 November 2026)

- `/kaidah/participle/` kini memuat 15 keluarga verba pada Form I sampai X (sembilan keluarga baru: سَاعَدَ III, تَعَلَّمَ V, تَبَادَلَ VI, اِنْقَطَعَ VII, اِنْتَظَرَ VIII, اِخْتَارَ VIII ajwaf, اِتَّصَلَ VIII mithāl, اِسْتَقْبَلَ X, اِحْمَرَّ IX), dengan maṣdar per keluarga dan 60 latihan. Bentuk yang tidak lazim (isim maf‘ūl Form VII, IX dan اِتَّصَلَ) ditandai, bukan dicontohkan.
- `/kaidah/masdar/` kini memuat 11 pasangan (enam baru: مُسَاعَدَةٌ dan قِتَالٌ untuk Form III, تَعَلُّمٌ V, تَعَاوُنٌ VI, اِنْقِطَاعٌ VII, اِحْمِرَارٌ IX) dan 44 latihan; setiap Form I, III, V–X mempunyai pasangan bersumber.
- Pemeriksaan kebahasaan dua putaran oleh Fable. [Audit Form III–IX](../research/2026-11-25-g02-forms-iii-ix-audit.md). Semua tetap `draft`.
- Masih terbuka: Form II dan IV pada halaman maṣdar, akar nāqiṣ, lafīf, mahmūz, pola lain di luar 22 wazan yang dibahas, pengamalan isim turunan, tinjauan pengajar dan uji pembelajar.

### G-02 · Lanjutan: ID kaidah, tautan wazan, akar lemah, rubā‘ī dan ‘amal (25 November 2026)

- **ID kaidah dan prasyarat:** setiap kaidah G-02 (sharaf, participle, maṣdar, ‘amal) punya ID stabil `g02.<nama>` dan prasyarat per kaidah: kaidah G-02 lain serta kompetensi pada peta belajar (`competencies.ts`, mis. CB-14, CB-15, CR-03). Tidak ada graf kedua; `g02-rules.ts` mengumpulkan semuanya dan menguji ID unik, rujukan yang ada, serta tanpa siklus.
- **Tautan wazan:** tiap contoh sharaf, participle dan maṣdar menaut ke baris verbanya pada halaman kelompok `/rujukan/fiil/kata-kerja/<bab>/`. Nomor bab diuji terhadap data Wiktionary.
- **`/kaidah/participle/`:** 26 keluarga (sebelas baru) dan 104 latihan: nāqiṣ دَعَا dan بَنَى; lafīf mafrūq وَقَى dan maqrūn رَوَى; mahmūz أَخَذَ, سَأَلَ, قَرَأَ; muḍā‘af مَدَّ dan اِسْتَمَرَّ; rubā‘ī mujarrad تَرْجَمَ dan mazīd تَدَحْرَجَ.
- **`/kaidah/masdar/`:** 13 pasangan dan 52 latihan; Form II (تَنْظِيمٌ) dan Form IV (إِرْسَالٌ) ditambahkan.
- **`/kaidah/participle/amal/`:** pelajaran pendek ‘amal isim fā‘il (objek manṣūb, iḍāfah) dan isim maf‘ūl (nā’ib al-fā‘il): 4 kaidah, 7 contoh, 7 latihan. Sumber: dua artikel Wikipedia Arab (CC BY-SA 4.0); teksnya sebagian rusak dan kaidah nā’ib al-fā‘il dibaca sebagian dari ringkasan pemeriksa.
- Pemeriksaan kebahasaan Fable dua putaran. [Audit](../research/2026-11-25-g02-continuation-audit.md). Semua tetap `draft`.
- Masih terbuka: tinjauan pengajar atau ustadz, uji pembelajar dan cek harakat di ponsel nyata, perubahan bertahap māḍī/muḍāri‘/amr (VP-03), mazīd dengan akar lemah, serta kasus ‘amal lain (shifah musyabbahah, syarat klasik lain).

### G-03 · Pembaruan kasus khusus (25 November 2026)

- `/kaidah/frasa/` kini memuat 12 kaidah dan 51 contoh. Tujuh kaidah baru: ẓarf makān dan zamān, muannath dan jamak muannath sālim (kasrah pada naṣb), al-asmā’ al-khamsa, jamak taksir dan mamnū‘ min aṣ-ṣarf, isim maqṣūr dan manqūṣ, kata mabnī (ḍamīr dan isim isyārah), serta iḍāfah pada naṣb dan ma‘rifah.
- Semua contoh baru beranotasi (peran baru: ẓarf) dan tiga urutan perubahan bertahap ditambahkan. Rujukan sampai tingkat bab (Al-Ājurrūmiyyah dan Qaṭr an-Nadā di Wikisource) atau pelajaran dan bagian (Madinah Arabic). Dua putaran pemeriksaan kebahasaan Fable: [audit](../data/nahwu-phrase-irab-audit.md).
- Masih terbuka: tinjauan pengajar atau ustadz, uji peramban ponsel nyata, sembilan sebab mamnū‘ min aṣ-ṣarf selain pola مَفَاعِلُ, ḍamīr dan isim isyārah lain, syarat lengkap al-asmā’ al-khamsa, serta kasus nakirah isim manqūṣ. [#16](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/16) tetap terbuka.
