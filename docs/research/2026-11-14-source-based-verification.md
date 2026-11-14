# Verifikasi materi bahasa Arab berbasis riset sumber

**Tanggal riset:** 14 November 2026  
**Status:** pedoman usulan untuk implementasi; **bukan** klaim bahwa 157 lema MSA atau pelajaran lain sudah diaudit menyeluruh.  
**Konteks:** arahan pemilik produk adalah agar verifikasi bahasa Arab umum dapat dikerjakan melalui penelitian pustaka/korpus dan kurikulum yang mapan, tanpa menjadikan pertemuan dengan pengajar sebagai satu-satunya jalan menyelesaikan materi.

## Keputusan operasional yang diusulkan

Pisahkan tiga jenis bukti agar label `verified` tidak menyesatkan:

1. **Leksikal:** bentuk Arab, sense/makna, POS, register MSA, bentuk jamak/feminin dan akar—masing-masing didukung URL halaman lema spesifik, bukan homepage kamus.
2. **Gramatikal:** rumus dan pengecualiannya dirujuk ke tata bahasa atau analisis korpus; contoh buatan proyek diuji terhadap kaidah yang relevan.
3. **Pedagogis:** urutan konsep, prasyarat dan tujuan belajar dibandingkan dengan kurikulum mapan; hasil belajar tetap perlu diuji pada pengguna, sehingga rujukan kurikulum bukan bukti efektivitas otomatis.

Istilah **`research_verified`** hanya boleh digunakan untuk *klaim yang telah diperiksa* dan tercatat buktinya. `draft` tidak otomatis berubah menjadi `approved`. Peninjauan pengajar boleh dipertahankan sebagai lapisan mutu opsional untuk materi bahasa Arab umum. Untuk bacaan ibadah/Al-Qur'an, pengucapan audio, pertentangan sumber, dan masalah tashih/izin, pertahankan pemeriksaan khusus yang saat ini ditentukan dalam [ADR-004](../decisions/0004-content-decisions.md), sampai ada keputusan pengganti yang eksplisit. **Kode saat ini masih menerapkan ADR-004 D-7; dokumen ini belum mengubah gate produksi.**

## Matriks bukti minimum

| Konten | Bukti minimum untuk klaim tertentu | Gagal verifikasi bila |
| --- | --- | --- |
| Lema MSA | URL halaman lema dan bagian *Arabic*; POS + arti yang sesuai dengan konteks; label dialek diperiksa | Hanya ada tautan beranda, transliterasi mirip, atau bukti cuma dari dialek |
| Jamak, feminin, elatif | Bentuk eksplisit pada entri leksikal/rujukan tepercaya; tulis jika ada beberapa alternatif | Hanya diturunkan otomatis dari akar/wazan |
| Akar & wazan fi'il | Entitas lema/sense, akar dan pola cocok; beda homograf dan fi'il mu'tal dibedakan | Akar sama dianggap bukti semua turunannya sah |
| Frasa nahwu | Kaidah tertulis (mis. idafah, na't–man'ut, mubtada–khabar); contoh baru; i'rab/kesesuaian diperiksa | Sumber hanya memuat dua kata tanpa validasi hubungan sintaksis |
| Bacaan Al-Qur'an | Token dari Tanzil sesuai versinya, anotasi Quranic Arabic Corpus hanya sebagai rujukan morfologi | Korpus Qur'ani diperlakukan sebagai bukti register MSA modern |
| Kurikulum | Pembandingan topik/prasyarat dengan Madinah Arabic dan/atau Al Jazeera, tulis tujuan dan latihan original | Menyalin pelajaran, menyamakan level CEFR tanpa bukti, atau menganggap urutan sebagai satu-satunya standar |
| Audio/pelafalan | Standar pelafalan, varian regional, dan pemeriksaan mendengar terpisah | TTS browser dianggap telah diuji tajwid/pelafalannya |

### Aturan sumber

- **Wiktionary / Kaikki**: rujukan leksikal utama, sumber turunan yang sama tidak dihitung sebagai dua bukti independen. Kaikki memuat MSA dan dialek; verifikasi bagian bahasa/varietas. Lisensi data turunan: CC BY-SA dan GFDL. [Kaikki](https://kaikki.org/dictionary/Arabic/index.html), [lisensi](https://kaikki.org/dictionary/).
- **Wikidata Lexemes**: data terstruktur CC0; cakupan tiap lema berbeda, tetap perlu cocokkan sense. [Kebijakan lisensi](https://www.wikidata.org/wiki/Wikidata:Licensing).
- **Kamus tambahan**: [panduan NYU](https://guides.nyu.edu/nyuadarabicdictionaries) mencantumkan Almaany, Oxford Arabic, dan Lane; gunakan entri spesifik bila dapat diperiksa, dengan hak cipta masing-masing.
- **Quranic Arabic Corpus**: rujukan analisis bahasa Al-Qur'an, **bukan** korpus frekuensi MSA. Data unduhan memuat GPL dan syarat tambahan (termasuk larangan modifikasi file); jangan impor massal sebelum telaah lisensi. [Dokumentasi](https://corpus.quran.com/documentation/), [ketentuan unduhan](https://corpus.quran.com/download/default.jsp).
- **Madinah Arabic**: benchmark urutan gramatika dan sharaf; materi bebas diakses tetapi tidak boleh direproduksi/dibuat turunannya tanpa izin tertulis menurut [terms November 2026](https://madinaharabic.com/terms-of-service). [Daftar pelajaran](https://madinaharabic.com/free-content/grammar).
- **Al Jazeera Learning Arabic**: benchmark level A1–C2, jenis bacaan, dan latihan, bukan izin untuk menyalin kursus. [Daftar kursus](https://learning.aljazeera.net/en/courses), [terms program pengajaran](https://learning.aljazeera.net/ar/pages/terms-conditions).
- **Karya buku berhak cipta** (mis. Ryding, Hans Wehr): periksa teori/entri dan kutip bibliografinya; jangan masukkan teks/dump buku ke data proyek.

## Pilot audit — lima lema, bukan keseluruhan 157

Tanggal cek: 14 November 2026. Berikut klaim yang **benar-benar ditemukan** pada bagian Arabic di Wiktionary. Setiap baris adalah hasil pemeriksaan sumber **untuk klaim terbatas**; belum mengaudit semua glos Indonesia dan contoh kalimat.

| ID proyek | Bukti klaim yang dicocokkan | URL lema |
| --- | --- | --- |
| `msa-kitab` | كِتَاب / kata benda “buku”; jamak كُتُب | https://en.wiktionary.org/wiki/كتاب |
| `msa-imraah` | اِمْرَأَة / “perempuan”; salah satu jamak نِسَاء (tercatat pula variasi lain), plural suplétif | https://en.wiktionary.org/wiki/امرأة |
| `msa-saghir` | صَغِير / adjektiva “kecil”; feminin صَغِيرَة; elatif أَصْغَر | https://en.wiktionary.org/wiki/صغير |
| `msa-hasub` | حَاسُوب / “komputer”; jamak حَوَاسِيب; akar ح س ب | https://en.wiktionary.org/wiki/حاسوب |
| `msa-internet` | إِنْتَرْنِت adalah salah satu ejaan berharakat, bersama إِنْتَرْنَت; kata serapan; bukan fi'il berakar triliteral | https://en.wiktionary.org/wiki/إنترنت |

Temuan khusus: ejaan dan vokalisasi bisa memiliki varian sah; tidak boleh merevisi data menjadi satu bentuk “mutlak” hanya karena sumber menampilkan salah satunya. Keberadaan satu bentuk leksikal juga tidak membuktikan seluruh kalimat yang menggunakan bentuk itu benar.

## Usulan catatan bukti per klaim

```ts
type ResearchEvidence = {
  field: 'lemma' | 'meaning' | 'pos' | 'register' | 'plural' | 'feminine' | 'root' | 'example' | 'rule' | 'curriculum';
  sourceUrl: string;      // tautan bukti spesifik, bukan beranda
  checkedOn: string;      // YYYY-MM-DD
  result: 'confirmed' | 'conflicted' | 'not_found';
  note?: string;          // bagian halaman, sense, register/varian, atau alasan konflik
};
```

Sebelum status `research_verified` tersedia, tambahkan tes yang memastikan: ada bukti positif untuk **setiap** field yang diklaim telah diperiksa, sumber bukan sekadar indeks umum, data konflik tidak diloloskan, dan review manusia tetap dibedakan dari pemeriksaan sumber. Jangan menjadikan `sources.length > 0` sebagai bukti kebenaran isi.

## Tahapan implementasi

1. Pertahankan 157 entri pada status **draft** sampai klaimnya didukung bukti per-lema. Audit bertahap dengan fixture 5 lema sebagai awal dan hasil per baris yang dapat direproduksi.
2. Buat ADR pengganti D-7 bagi **MSA umum** dan referensi nahwu–sharaf non-ibadah; pertahankan aturan khusus untuk ayat/shalat/audio. Ubah tipe dan validator hanya bersama unit test untuk gate baru.
3. Jalankan validasi aturan morfologi dari sumber sebagai *cross-check*, bukan generator universal bentuk jamak atau mu'tal tanpa attestation.
4. Buat crosswalk konsep kurikulum B0–B12/A1–A4 terhadap pelajaran Madinah dan level Al Jazeera, dengan atribusi dan tugas original; lakukan uji 5–10 pelajar sebelum klaim capaian pedagogis.
5. Periksa perubahan lisensi dan tautan sumber saat audit berulang, simpan tanggal dan versi; publish hanya klaim yang didukung bukti.

Dokumen ini adalah **riset + rancangan gate baru**, bukan QA lengkap dan bukan otorisasi diam-diam untuk menaikkan status `approved`.
