# Sharaf 22 bab: matriks, kamus, dan navigasi desktop

## Kebutuhan dari pemilik proyek

- Dua puluh dua kelompok sebagaimana diagram rujukan: 6 tsulatsi mujarrad,
  12 tsulatsi mazid (+1: 3, +2: 5, +3: 4), 1 ruba’i mujarrad, dan
  3 ruba’i mazid (+1: 1, +2: 2).
- Sebelas bentuk istilahi menjadi **sebelas kolom**, berurutan dari kanan ke
  kiri mulai dengan madhi; semua tetap berada di tabel horizontal yang dapat
  digeser. Bab di kolom kiri tetap terlihat saat digeser.
- Pencarian global (Arab/Indonesia) di atas tabel, lalu dialog modal untuk
  mencari kata atau melihat penjelasan. Klik label bab membuka modal terfilter;
  klik sel membuka keterangan tentang pola serta sumbernya.
- Satu tombol **Clear semua** menghapus semua pilihan dan mengembalikan wazan.
- Desktop memakai sidebar navigasi aplikasi dan memanfaatkan lebar layar.
  Mobile memakai header serta bottom tab existing. Artikel pelajaran tetap
  memakai lebar teks nyaman dibaca.

## Pemisahan data

1. `patterns.ts`: 22 **wazan simbolik**, sumber, serta kelompoknya. Wazan
   menggambarkan pola, bukan kamus atau klaim semua bentuk pasti produktif.
2. `sharaf.ts`: lemma serta bentuk yang tercatat dengan makna Indonesia dan
   catatan sumber. Bentuk tidak tercatat ditampilkan `—`, **tidak ditebak**.
3. `matrix.ts`: menggabungkan katalog pola dan contoh kata untuk UI.
4. `lexicon.ts`: mencari bentuk, akar, dan terjemahan Indonesia. Pencarian
   tanpa harakat bisa ambigu sehingga semua kandidat tetap ditampilkan.
5. `catalog/sync.svelte.ts`: katalog statis bersama dengan manifest versi dan
   penyimpanan IndexedDB. Data bawaan tersedia selama paket belum tersimpan.

Perlu diketahui: nomor bab di diagram 22 bukan identik dengan penomoran Forms
I–X yang umum dalam tata bahasa Arab internasional. Empat pola tsulatsi mazid
tambahan berisi contoh langka; beberapa bentuk turunan tertentu (mashdar,
isim alat, isim zaman/makan) bisa beragam dan tidak otomatis berlaku untuk
semua akar. Situs harus mempertahankan label bentuk belum tercatat.

## Bukti dan sumber yang diperiksa

- [Bagan ilmu sharaf pemula](https://sayahafiz.com/assets/images/kitab/ilmu-sharaf-untuk-pemula.pdf):
  pemisahan tsulatsi/ruba’i serta mujarrad/mazid.
- [Pembahasan wazan Shorof Krapyak](https://shorofkrapyak.blogspot.com/2020/04/pembahasan-wazan.html):
  pola tsulatsi mazid termasuk bentuk langka.
- [Buku lengkap tashrif dari repository UIN Raden Fatah](https://repository.radenfatah.ac.id/26785/1/BUKU_Buku%20Lengkap%20Dalam%20Belajar%20Tashrif.pdf):
  madhi–mudhari–mashdar pada pola khusus.
- [Jurnal Al Mahara UIN Sunan Kalijaga](https://ejournal.uin-suka.ac.id/tarbiyah/almahara/article/download/2020.062.04/1930):
  contoh pola tsulatsi dengan tambahan tiga huruf.
- [Qabas (Birzeit) — اعشوشب](https://sina.birzeit.edu/qabas/lemma/2020895100):
  akar عشب, makna, serta kelas fi’il.
- [Majma' al-Lughah al-'Arabiyyah Cairo — احرنجم](https://www.arabicacademy.gov.eg/ar/search_engine/roots/%D8%AD%D8%B1%D8%AC%D9%85):
  makna berkumpul.
- [Mu'jam al Ghani — اجلوذ](https://www.arabicterminology.com/content/%D8%A7%D9%90%D8%AC%D9%92%D9%84%D9%8E%D9%88%D9%91%D9%8E%D8%B0%D9%8E):
  contoh fi’il langka dan makna.

Tidak ada salinan kamus GPL atau teks berhak cipta yang diimpor. Semua
contoh merupakan fakta leksikal pendek yang dinyatakan ulang, dengan tautan
provenance. Sebelum ekspansi massal dataset, periksa lisensi per dataset
serta kualitas entri dan bentuk ganda.

## Verifikasi

- `bun run check`, `bun run lint`, `bun run test:unit --run`, dan
  `bun run build`.
- Playwright E2E untuk 22×11, pemilihan kata, modal detail, Clear, navigasi
  desktop, katalog JSON, dan HTML tanpa JavaScript.
- Pemeriksaan manual tambahan: font/harakat pada perangkat nyata, dialog
  keyboard focus dan aksesibilitas, terutama pada layar sempit.
