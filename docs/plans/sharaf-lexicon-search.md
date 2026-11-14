# Kamus sharaf berbasis akar dan wazan — fase awal

Status: **prototype, belum diaudit pengajar**. URL: `/sharaf/`. Fitur ini melengkapi, bukan menggantikan, tabel `/rujukan/`.

## Tujuan

Menjawab pertanyaan pelajar: "Saya tahu kata Arab ini, tetapi masuk bab tashrif mana?" Cari memakai bentuk kata atau akar, lihat madhi–mudhari, bab, wazan, kategori kaidah dan sumbernya. Nomor bab mengikuti urutan tabel proyek (bab 4 عِلِمَ, bab 5 حَسِبَ, bab 6 حَسُنَ); **nomor bab tidak universal antar kitab**.

## Model data

- `root`: keluarga akar (misalnya ك ت ب), bukan identifier unik sebuah verba.
- `lemma`: entri leksikal. Banyak lemma dapat berbagi akar dan satu ejaan tak berharakat dapat memiliki banyak analisis.
- `babSelection`: cara menemukan bab (leksikal / kaidah / tidak berlaku).
- `formBehavior`: perubahan bentuk reguler / kaidah khusus / pengecualian / tetap. Ini **terpisah** dari penentuan bab.
- `forms`: bentuk yang benar-benar dicatat, bukan hasil generator untuk bentuk yang belum divalidasi.
- `sources` dan `reviewStatus`: provenance dan status pemeriksaan.

Normalisasi pencarian melepas harakat dan menyederhanakan beberapa varian alif/ya. **Tidak digunakan sebagai primary key** atau untuk menyamakan kata secara ilmiah. Hasil dicocokkan ke lemma, bentuk tersimpan, dan akar, dengan skor exact sebelum root/prefix. Tidak ada klaim bahwa hasil kosong berarti kata itu tidak sah.

## Dataset awal dan pembatasan

Enam contoh bab berasal dari `src/lib/content/reference.ts`; kata كَتَبَ, قَرَأَ, مَفْتُوحٌ dan beberapa partikel memanfaatkan kosakata internal; قَالَ adalah contoh penjelasan i‘lal ajwaf yang harus ditinjau pengajar. Semua berstatus **draft**. Tidak ada impor dataset pihak ketiga dalam PR ini.

Untuk perluasan leksikon, audit terlebih dahulu:

1. [Qutrub](https://github.com/linuxscout/qutrub) — potensi pasangan madhi–mudhari/bab.
2. [Arramooz](https://github.com/linuxscout/arramooz) — calon sumber lemma, akar dan kelas kata.
3. [Arabic Stop Words](https://github.com/linuxscout/arabicstopwords) — calon daftar partikel.
4. [CAMeL Morph](https://github.com/CAMeL-Lab/camel_morph) — calon pembanding analisis morfologis.

Periksa lisensi **per dataset, versi dan file**, serta kesesuaiannya dengan ADR-004, sebelum menyalin ke repository atau build publik. Kode GPL yang digunakan sebagai dependensi juga perlu dianalisis secara terpisah dari hak atas data. Jangan menyebut seluruh isi kamus sebagai "irregular"; fi'il ajwaf memiliki kaidah i‘lal, sedangkan pilihan bab Form I bisa sima‘i.

## Langkah berikutnya

1. Audit legal dan skema sumber; kumpulkan contoh representatif, catat SHA, lisensi dan atribusi.
2. Siapkan pipeline ingestion ke format internal dengan checksum, deduplikasi lemma dan validation report. Jangan mengarang pasangan madhi–mudhari.
3. Tambahkan relasi `Root → Lexeme → Paradigm → WordForm`, multi-analisis tanpa harakat, transitive/intransitive, pola mazid dan kelas mu‘tal.
4. Uji silang terhadap kamus dan pengajar; pisahkan data yang terverifikasi dari contoh draft.
5. Terapkan prioritas hafalan menurut frekuensi dan kegunaan; tidak perlu enumerasi seluruh kombinasi 28 huruf sebagai kamus.

## QA

Pengujian otomatis ditambahkan untuk normalisasi harakat, pencarian madhi/mudhari/akar, pengelompokan akar lintas kelas kata, filter partikel, dan pemisahan babSelection/formBehavior.

Jalankan `bun run check && bun run lint && bun run test:unit -- --run && bun run build`. **Belum dijalankan lewat GitHub connector**, karena connector ini mendukung perubahan file/PR tetapi tidak menyediakan eksekusi perintah build. Uji browser, aksesibilitas, dan review konten Arab diperlukan sebelum merge.
