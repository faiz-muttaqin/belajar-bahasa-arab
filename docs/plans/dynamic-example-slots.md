# Dynamic Examples — G-06 pilot dan pengembangan

**Dibuat:** 14 November 2026 · **Status:** pilot terbatas di PR G-06; migrasi ke semua kartu contoh belum dilakukan. **Permintaan pengguna:** kata Arab pada contoh dapat diketuk → modal search seperti pemilih fi‘il tabel wazan → memilih bentuk lain berdasarkan kelas/fungsi kata dan data dictionary yang telah dikumpulkan.

## Masalah yang harus dicegah

**Kelas kata yang sama tidak cukup untuk substitution aman.** Mengganti كَتَبَ dengan فَتَحَ tanpa meninjau objek bisa menghasilkan kalimat tidak alami. Mengganti كِتَابٌ dengan مَدْرَسَةٌ mengharuskan agreement sifat feminin; mengganti fi‘il māḍī ke muḍāri‘ juga memerlukan analisis dhamir, mood, negasi, dan bentuk khusus. Kamus memuat lema, bukan seluruh permukaan kata dengan i‘rab lengkap. Korpus 7.938+ verba dan sebagian glos berbasis model/kamus **tidak semuanya telah mendapat audit per-lema**, sehingga tidak boleh dianggap aman dipakai dalam setiap kalimat.

## Kontrak desain

- **Template + slot** terpisah dari data kata:
  - \`templateId\` dan \`slotId\` yang stabil, \`role\` sintaksis, \`expectedPartOfSpeech\`, \`case\` isim dan \`verbMood\` bila ada.
  - Fitur sintaksis wajib diikat sesuai template: gender, jumlah (mufrad/mutsanna/jamak), definiteness, pronominal agreement, voice, transitivity, frame semantik, collocation, dan inflection.
  - \`lexemeId\` harus dapat ditelusuri ke kamus/rujukan; \`surfaceForm\` dipisahkan dari \`lemma\`.
  - Bentuk \`surfaceForm\` berasal dari attestation atau kaidah yang didukung dengan constraint dan test, **bukan** mengubah huruf terakhir dengan regex universal.
  - Penggantian sebagian slot harus **menghitung ulang** token Arab, glos Indonesia, terjemahan alami, peran dan penjelasan; bila ada dependent slot yang tak cocok, tampilkan notifikasi dan pilihan yang sesuai.
  - Selalu simpan contoh asli dalam HTML hasil prerender (static-first). Modal interaktif baru aktif setelah hydration. Tanpa JS tetap ada contoh dan latihan.
  - Label dan warna tidak boleh menggantikan penjelasan tekstual. Pencarian RTL tanpa harakat menggunakan \`normalizeArabicSearch\` yang sudah ada, plus kata kunci Indonesia. Jangan menjadikan hasil normalisasi sebagai identitas lema.
  - Hindari merender 8.000+ opsi sekaligus: search index dari \`searchSharaf\`/bulk catalog, _lazy-load_, virtualisasi/pagination bila perlu, cache offline IndexedDB sebagaimana rancangan proyek.

## Progres D-03 — selector fi‘il berbukti (PR lanjutan D-02)

D-03 menyediakan `verb-frames.ts`: pilihan māḍī, muḍāri‘ marfū‘, negasi `لَمْ` (majzūm), `لَنْ` (manṣūb), dan amr. **Tidak seluruh bentuk ada untuk setiap verba**; pilihan tanpa pasangan bentuk yang tercatat dinonaktifkan, dan jika pilihan lemma baru tidak mendukung frame sebelumnya, pilihan otomatis kembali ke māḍī dengan penjelasan. Mode perintah menghilangkan fā‘il eksplisit karena pelaku `أَنْتَ` tersirat. Sumber bentuk yang mendasari pilihan tercatat di [audit D-03](../data/dynamic-example-verb-inflection-audit.md). Ini pilot terbatas, belum konjugator umum atau penyelesaian D-03 penuh untuk seluruh dhamir dan verba mu‘tal.

## Progres D-04a — validator kompatibilitas yang memberi alasan

`src/lib/domain/grammar/grammar-constraints.ts` memperkenalkan kontrak per slot yang memeriksa kelas kata, data bentuk berharakat, kesesuaian i‘rab, gender, jumlah, ma‘rifah, mood/bentuk fi‘il dan kecocokan objek yang sudah dikurasi. Penilaiannya **fail-closed**: metadata hilang tidak berarti otomatis kompatibel. `evaluateAdjectiveAgreement` juga membedakan **na‘at** dan **khabar**, serta melindungi kasus jamak ghayr ‘āqil jika informasi animacy belum eksplisit.

Pada pilot G-06, pilihan yang belum terkurasi tetap bisa ditemukan dan dibaca dalam modal, tetapi nonaktif dengan alasan yang menjelaskan _batas bukti contoh_ (bukan mengklaim kalimat selalu salah). D-04a belum menangani iḍāfah kompleks, klitik, maushul maupun hubungan antar klausa dan belum memasang UI ke G-01–G-05. [Audit D-04a](../data/dynamic-example-constraints-audit.md).

## Progres D-04b — hubungan frasa (merged PR #34)

Validator baru untuk hubungan **iḍāfah**, huruf **jar–majrūr**, dhamir posesif sambung, dan kaitan **isim mawṣūl–ṣilah** menjaga agar pergantian sebagian token tidak menghasilkan rangkaian Arab yang belum dikurasi. Bentuk dan peran dikaitkan ke contoh G-03/G-05 serta referensi kata ganti yang sudah ada di proyek; **tidak** ada pembentuk sufiks atau parser umum. Kasus muḍāf mengikuti konteks, sedangkan muḍāf ilaih tetap jarr; token sambung seperti قَرَأْتُهُ harus utuh. Semua permukaan tetap _draft_ untuk audit pengajar. Baca [audit D-04b](../data/dynamic-example-phrase-relations-audit.md).

Bagian D-04b merupakan **fondasi domain**; UI penggantian contoh dalam G-01/G-03 baru dimulai melalui D-05a. Tahap selanjutnya D-05b/c dan D-06.

## D-05a — Penggantian kata langsung pada G-01/G-03 (PR lanjutan D-04b)

`GrammarExample.svelte` serta `PhraseGloss.svelte` sekarang dapat menampilkan pemilih variasi di **kartu contoh aslinya** untuk subset yang mempunyai **pasangan lengkap** dan kontrak eksplisit: na‘at–man‘ūt, mubtada–khabar, iḍāfah G-01, ma‘rifah/nakirah, na‘at G-03 dan jar–iḍāfah. Pemilihan pada sebuah kata mengganti satu **bingkai sumber lengkap** beserta token, glos, arti dan penjelasannya; tidak menyusun bentuk baru dari lema.

Komponen dialog dipakai ulang, mencari Arab/Indonesia, berstatus `draft`, bisa ditutup Escape dan di-reset. Tanpa JavaScript bentuk awal dari sumber kurikulum tetap ada di prerender. G-03 `idafah-door`, bentuk dua/jamak lain dan G-04/G-05 **tetap statis** sampai ada pilihan yang terkurasi. [Audit D-05a](../data/dynamic-inline-examples-audit.md).

**Selanjutnya:** D-05b/c (contoh kalimat/klausa sesuai bukti dan audit semantik), lalu D-06 (progres latihan, cache dan pencarian besar). Fitur glosarium dan roadmap pembelajar pasca-Iqra tetap dikerjakan independen.

## Realisasi pilot G-06

Halaman \`/kaidah/praktik/\` memasang **dua contoh dinamis** berbasis modul \`src/lib/domain/grammar/dynamic-examples.ts\` dan \`DynamicSentenceExample.svelte\`:

| Template                                 | Slot dapat dipilih       | Sumber asli                                                                                | Constraint                                                                                                                                   |
| ---------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Jumlah ismiyyah: \`الْكِتَابُ جَدِيدٌ\`         | Mubtada dan khabar sifat | \`publishedVocabulary('msa')\`                                                             | Definite singular subject rafa‘; feminine/masculine nominal; khabar indefinite nominatif dengan bentuk feminin tersimpan di \`msa.feminine\` |
| Jumlah fi‘liyyah: \`كَتَبَ الطَّالِبُ الرِّسَالَةَ\` | Fi‘il, fā‘il, maf‘ūl bih | \`sharafEntries\` untuk verb lemma/bab, \`publishedVocabulary('msa'/'harian')\` untuk isim | Hanya māḍī orang ketiga maskulin; subjek orang maskulin tunggal marfū‘; objek singular manṣūb; daftar kompatibilitas objek tiap verba        |

Data pilot terhubung ke ID kamus nyata. Karena dataset leksikal belum menyediakan valensi dan morphological synthesis berkualitas teacher-reviewed, **daftar pemilihan adalah subset terkurasi**, bukan filter otomatis untuk semua kata yang kebetulan satu POS. Modal menawarkan pencarian Arab/Indonesia dan menampilkan bab sharaf bila ada; tautan ke kamus lengkap tetap tersedia. Objek diganti otomatis bila fi‘il baru tak kompatibel dan pengguna diberi notifikasi. Versi pilot **tidak menyimpan skor atau pilihan ke IndexedDB**; ini prioritas lanjutan, bukan klaim fungsional saat ini.

## Progres D-02 (PR setelah G-06)

Kontrak `LexemeRecord`, `WordSurface`, `MorphFeatures`, `SurfaceEvidence`, dan valensi konteks sudah ditambahkan di `src/lib/domain/grammar/lexeme-forms.ts`. Adapter MSA/kosakata dan sharaf memisahkan lema dengan bentuk yang dinyatakan eksplisit; data tabel wazan tetap aturan/pola, bukan hasil infleksi bebas. Pilot G-06 menggunakan kontrak ini untuk mengaitkan setiap kandidat pengganti dengan metadata kasus/aspek, sumber lema, dan status `draft`. Rincian dan batas cakupan ada di [audit D-02](../data/dynamic-example-lexeme-audit.md). Integrasi menyeluruh, generator terbatas, dan pengganti pada semua G-01–G-05 masih tahap berikutnya.

## Roadmap kelanjutan (D-01 s.d. D-06)

1. **D-01 — Renderer terpakai ulang (pilot, PR G-06):** komponen slot dengan modal native keyboard-accessible, filter pencarian Arab/Indonesia, default prerender, reset dan undo/change notice; unit/E2E dan mobile tanpa JS.
2. **D-02 — Kontrak lexeme/wordforms lintas corpus:** pemetaan \`SharafEntry\`, \`VocabularyItem\`, tabel tashrif 22 wazan, metadata attestation, jenis/jumlah/gender/ma‘rifah/voice/valency dan provenance. Audit apakah modal fi‘il tabel wazan saat ini bisa direuse tanpa menggabungkan index/search UI mentah.
3. **D-03 — Engine infleksi terbatas:** memilih fi‘il sesuai dhamir, madhi/mudhari/amar, aktif/pasif, jussive/subjunctive, pola ṣaḥīḥ vs mu‘tal, bentuk ism fā‘il/maf‘ūl. Hanya bentuk yang _attested_ atau diuji pada paradigma yang tepat; fallback tampilkan _tidak tersedia_, bukan menduga.
4. **D-04 — Kompatibilitas sintaksis/semantik:** agreement sifat/man‘ūt, dual dan jamak bukan manusia, idafah/ta‘rīf, objek transitif (valency) dan semantic role, nazm/naṣb/jarr, handling kata depan dan clitics. Setiap contoh menampilkan alasan mengapa kandidat disaring.
5. **D-05 — Integrasi seluruh contoh G-01–G-05:** kartu contoh statis mendapat affordance edit slot bila memiliki metadata template; contoh tanpa slot audit tetap statis. Pemilihan dapat dipertahankan sementara dalam sesi dan di-_reset_; dukung URL yang stabil bila aman.
6. **D-06 — Local-first learning:** simpan state latihan/tanggapan di model progress IndexedDB existing, statistik skill, adaptasi kesulitan/prasyarat, pencarian kamus lazy dan caching offline, uji keyboard/screen reader/RTL/hydration/memory/performance.

## Kriteria penerimaan perluasan

- Hanya substitution yang cocok secara morfologi, agreement, valency, kasus/mood, dan makna yang tampil; bila tidak ada opsi, jelaskan sebab dan tawarkan pembelajaran kamus.
- Model data tidak menyebut bentuk _reviewed_ tanpa bukti. Rujukan, lisensi, dan register ditandai per leksikon dan per transformasi.
- Kata Arab utuh beserta clitic tetap satu token ortografis (mis. \`وَكَتَبَ\`). Glos kata-per-kata tidak menggantikan terjemahan alami kalimat lengkap.
- Tests lintas gender, dual/jamak, bentuk muta‘addi/lazim, mu‘tal, negasi, passive, + no JS static, keyboard focus Escape, 375px overflow dan hasil teks setelah penggantian.
- Interaksi harus tetap bisa jalan offline setelah aset kamus tersimpan, tidak memuat source backend atau inference online.
- Jangan mengubah tracker tahap G-01–G-05 menjadi linguistic-reviewed hanya karena UI interaktif berfungsi.

**Relasi roadmap:** \`docs/plans/nahwu-sharaf-knowledge-map.md\`, [issue G-06 #19](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/19), [data verifikasi kata MSA](../data/msa-common.md), [research protocol](../research/2026-11-14-source-based-verification.md).

## Visual peran kata dan perubahan

[VP-01–VP-03](./visual-pembelajaran.md) memakai anotasi serta pasangan sumber yang sama dengan D-05 untuk menghubungkan kata terpilih, peran nahwu, glos, alasan akhir kata dan kata dependennya. Sorotan/animasi mengikuti perubahan satu bingkai utuh; lapisan jenis kata, bentuk sharaf dan peran sintaksis dipilih terpisah. Tidak menambah generator atau penyimpanan progres kedua. Semua informasi tetap tersedia tanpa JS dan gerak.

## Catatan implementasi terverifikasi — 17 November 2026

**Status plan keseluruhan: PARTIAL**, bukan otomatis selesai karena PR pilot sudah merged. Audit lintas sebelas dokumen: [matriks status implementasi](./IMPLEMENTATION_STATUS.md).

**Sudah terlihat di kode:** `src/lib/domain/grammar/lexeme-forms.ts`, `src/lib/components/learning/InlineCuratedExamplePicker.svelte`, `tests/e2e/grammar-inline-examples.e2e.ts`. Ini bukti keberadaan implementasi, **bukan** audit benar-salah kaidah atau hasil uji pengguna.

**Belum terpenuhi:** D-05b/c: G-04/G-05, bentuk verba mu‘tal/pronomina lain, D-06 bukti progres; cakupan semua kartu belum tercapai.

**Tindak lanjut:** [issue #24](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/24). Setiap PR lanjutan wajib menyebut sub-deliverable yang diselesaikan dan kriteria yang masih terbuka.

## Catatan D-05b dan D-05c: G-04 dan G-05 (25 November 2026)

**D-05b (kalimat G-04, `/kaidah/kalimat/`)** dan **D-05c (klausa G-05, `/kaidah/klausa/`)** memperluas penggantian kata D-05a dengan model yang sama: memilih satu opsi mengganti **satu bingkai utuh** (token, glos, terjemahan alami, penjelasan). Tidak ada bentuk yang dirangkai dari lema.

- **G-04:** ke-18 kartu contoh menjadi interaktif (mubtada-khabar, syibh-jumlah, fi‘il-fā‘il-maf‘ūl, amr, pasif dengan pasangan aktif, negasi `لَا لَمْ لَنْ`, kāna/inna, pertanyaan `هَلْ`). Bentuk fi‘il memakai tabel D-03 (māḍī, muḍāri‘, lam, lan, amr) dan hanya bentuk yang tercatat; fi‘il mu‘tal ajwaf `غَابَ` / `يَغِيبُ` tercatat dari data Form I Wiktionary.
- **G-05:** kartu ‘aṭf (tiga), isim mawṣūl + ṣilah (tiga, memakai validator D-04b dengan daftar bingkai terkurasi) dan syarat `إِنْ` (dua) menjadi interaktif. Kartu sebab, kontras, ḥāl, istitsnā’, tamyīz dan syarat dengan jawab nominal tetap statis karena belum ada alternatif bersumber.
- **Validator baru** (`sentence-clause-constraints.ts`): kecocokan penanda akhir dengan kasus/mood, fi‘il-fā‘il (gender, fi‘il tetap tunggal), valensi per bingkai, amr, pasif berpasangan, partikel negasi dan mood, kāna/inna, klitik satu token, kasus ma‘ṭūf, syarat jazm, relatif utuh dan kasra penghubung `ت`. Opsi yang gagal tetap terlihat, nonaktif dan memberi alasan; bentuk yang belum tercatat (mutsanna, pasif mu‘tal, lam/lan/amr verba tertentu, dhamir ‘ā’id feminin) tampil sebagai opsi nonaktif tanpa menampilkan Arab karangan.
- Setiap bingkai mencatat sumber dan asal bentuk. Bentuk variasi penulis (gender, kasus, klitik) ditandai `authored-variant` dengan bentuk asalnya. Semua tetap `draft`. [Audit D-05b/c](../data/dynamic-clauses-d05bc-audit.md) memuat tiap bingkai, hasil verifikasi bahasa dua tahap oleh Fable dan batas buktinya.

**Masih terbuka:** D-06 (progres latihan, cache, pencarian besar), tinjauan guru bahasa Arab atas seluruh bingkai, dan kartu G-05 yang belum punya alternatif bersumber.
