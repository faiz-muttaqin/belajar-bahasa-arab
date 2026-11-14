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
  - Hindari merender 8.000+ opsi sekaligus: search index dari \`searchSharaf\`/bulk catalog, *lazy-load*, virtualisasi/pagination bila perlu, cache offline IndexedDB sebagaimana rancangan proyek.

## Realisasi pilot G-06

Halaman \`/kaidah/praktik/\` memasang **dua contoh dinamis** berbasis modul \`src/lib/domain/grammar/dynamic-examples.ts\` dan \`DynamicSentenceExample.svelte\`:

| Template | Slot dapat dipilih | Sumber asli | Constraint |
| --- | --- | --- | --- |
| Jumlah ismiyyah: \`الْكِتَابُ جَدِيدٌ\` | Mubtada dan khabar sifat | \`publishedVocabulary('msa')\` | Definite singular subject rafa‘; feminine/masculine nominal; khabar indefinite nominatif dengan bentuk feminin tersimpan di \`msa.feminine\` |
| Jumlah fi‘liyyah: \`كَتَبَ الطَّالِبُ الرِّسَالَةَ\` | Fi‘il, fā‘il, maf‘ūl bih | \`sharafEntries\` untuk verb lemma/bab, \`publishedVocabulary('msa'/'harian')\` untuk isim | Hanya māḍī orang ketiga maskulin; subjek orang maskulin tunggal marfū‘; objek singular manṣūb; daftar kompatibilitas objek tiap verba |

Data pilot terhubung ke ID kamus nyata. Karena dataset leksikal belum menyediakan valensi dan morphological synthesis berkualitas teacher-reviewed, **daftar pemilihan adalah subset terkurasi**, bukan filter otomatis untuk semua kata yang kebetulan satu POS. Modal menawarkan pencarian Arab/Indonesia dan menampilkan bab sharaf bila ada; tautan ke kamus lengkap tetap tersedia. Objek diganti otomatis bila fi‘il baru tak kompatibel dan pengguna diberi notifikasi. Versi pilot **tidak menyimpan skor atau pilihan ke IndexedDB**; ini prioritas lanjutan, bukan klaim fungsional saat ini.

## Roadmap kelanjutan (D-01 s.d. D-06)

1. **D-01 — Renderer terpakai ulang (pilot, PR G-06):** komponen slot dengan modal native keyboard-accessible, filter pencarian Arab/Indonesia, default prerender, reset dan undo/change notice; unit/E2E dan mobile tanpa JS.
2. **D-02 — Kontrak lexeme/wordforms lintas corpus:** pemetaan \`SharafEntry\`, \`VocabularyItem\`, tabel tashrif 22 wazan, metadata attestation, jenis/jumlah/gender/ma‘rifah/voice/valency dan provenance. Audit apakah modal fi‘il tabel wazan saat ini bisa direuse tanpa menggabungkan index/search UI mentah.
3. **D-03 — Engine infleksi terbatas:** memilih fi‘il sesuai dhamir, madhi/mudhari/amar, aktif/pasif, jussive/subjunctive, pola ṣaḥīḥ vs mu‘tal, bentuk ism fā‘il/maf‘ūl. Hanya bentuk yang *attested* atau diuji pada paradigma yang tepat; fallback tampilkan *tidak tersedia*, bukan menduga.
4. **D-04 — Kompatibilitas sintaksis/semantik:** agreement sifat/man‘ūt, dual dan jamak bukan manusia, idafah/ta‘rīf, objek transitif (valency) dan semantic role, nazm/naṣb/jarr, handling kata depan dan clitics. Setiap contoh menampilkan alasan mengapa kandidat disaring.
5. **D-05 — Integrasi seluruh contoh G-01–G-05:** kartu contoh statis mendapat affordance edit slot bila memiliki metadata template; contoh tanpa slot audit tetap statis. Pemilihan dapat dipertahankan sementara dalam sesi dan di-*reset*; dukung URL yang stabil bila aman.
6. **D-06 — Local-first learning:** simpan state latihan/tanggapan di model progress IndexedDB existing, statistik skill, adaptasi kesulitan/prasyarat, pencarian kamus lazy dan caching offline, uji keyboard/screen reader/RTL/hydration/memory/performance.

## Kriteria penerimaan perluasan

- Hanya substitution yang cocok secara morfologi, agreement, valency, kasus/mood, dan makna yang tampil; bila tidak ada opsi, jelaskan sebab dan tawarkan pembelajaran kamus.
- Model data tidak menyebut bentuk *reviewed* tanpa bukti. Rujukan, lisensi, dan register ditandai per leksikon dan per transformasi.
- Kata Arab utuh beserta clitic tetap satu token ortografis (mis. \`وَكَتَبَ\`). Glos kata-per-kata tidak menggantikan terjemahan alami kalimat lengkap.
- Tests lintas gender, dual/jamak, bentuk muta‘addi/lazim, mu‘tal, negasi, passive, + no JS static, keyboard focus Escape, 375px overflow dan hasil teks setelah penggantian.
- Interaksi harus tetap bisa jalan offline setelah aset kamus tersimpan, tidak memuat source backend atau inference online.
- Jangan mengubah tracker tahap G-01–G-05 menjadi linguistic-reviewed hanya karena UI interaktif berfungsi.

**Relasi roadmap:** \`docs/plans/nahwu-sharaf-knowledge-map.md\`, [issue G-06 #19](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/19), [data verifikasi kata MSA](../data/msa-common.md), [research protocol](../research/2026-11-14-source-based-verification.md).
