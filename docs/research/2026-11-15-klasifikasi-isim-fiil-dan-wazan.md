# Studi perbandingan isim, fi‘il, dan 11 bentuk tashrif

**15 November 2026 — konten pelajaran draf untuk tashih pengajar.** Sasaran: pelajar dewasa Indonesia yang sudah bisa membaca Arab berharakat tetapi belum memahami pembagian kata. Bukan salinan bebas dari satu kitab dan bukan sistem derivasi otomatis.

## Temuan audit repo

- \`/rujukan/istilah/isim/\` semula menjelaskan isim secara ringkas, belum menunjukkan banyak sumbu penggolongan; \`/rujukan/istilah/fiil/\` menjelaskan tiga bentuk dan partikel, namun belum membedakan mujarrad/mazīd, ṣaḥīḥ/mu‘tal, transitivitas, atau suara.
- Pada \`TransposedTashrif.svelte\` terdapat **11 kolom** dan **22 kelompok wazan**. Sel sudah membuka modal rinci, tetapi **judul kolom** hanya teks; tanpa JavaScript, pengunjung tidak punya akses satu-klik dari judul ke halaman pembahasan.
- Data \`tashrifColumns\` dari \`src/lib/domain/sharaf/matrix.ts\` dijadikan single source of truth. Materi baru memiliki 11 slug yang sama; setiap pembahasan dapat diakses via URL statis \`/rujukan/bentuk/<key>/\` dan dihubungkan dengan jenis kata.

## Komparasi pendekatan

| Pertanyaan                                        | Kerangka nahwu tradisional                                                       | Tata bahasa MSA deskriptif                                                         | Keputusan untuk pembelajar                                                                                                |
| ------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Apa kelompok kata?                                | Isim, fi‘il, ḥarf                                                                | Kategori nomina, verba, adjektiva, pronomina, partikel dengan analisis lebih rinci | Jelaskan bahwa isim tradisional lebih luas dari nomina Indonesia. Pisahkan label kelas, bentuk, dan peran kalimat         |
| Tiga jenis fi‘il?                                 | Māḍī, muḍāri‘, amr                                                               | Bentuk perfect/imperfect/imperative dipahami juga melalui aspek, mood dan konteks  | Perlihatkan tiga bentuk dasar; _nahy_ dijelaskan sebagai **لَا الناهية + muḍāri‘ majzūm**, bukan kala keempat              |
| Apakah isi tabel semuanya kata kerja?             | Sharf menggabungkan fi‘il dan _musytaqqāt_ (turunan)                             | Derivasi menghubungkan leksikon verba dengan nomina/partisipel                     | Labeli maṣdar, fā‘il, maf‘ūl, zaman, makān, dan ālah sebagai **isim**, meskipun berasal dari keluarga akar verba          |
| Apakah فَاعِلْ, مَفْعُول selalu pelaku dan objek nahwu? | Isim fā‘il/maf‘ūl adalah bentuk; fā‘il/maf‘ūl bih juga nama fungsi berbeda       | Partisipel bisa menjadi khabar atau atribut                                        | Bedakan kelas/bentuk dari sintaksis dengan contoh الْبَابُ مَفْتُوحٌ                                                             |
| Bisakah semua kata diturunkan dari akar?          | Pola qiyās dan bentuk simā‘ī/leksikal                                            | Produktivitas morfologi bervariasi dan mempunyai pengecualian                      | Jadikan matriks sebagai pola mengingat; **jangan** buat maṣdar, nama alat, tempat, waktu untuk tiap verba tanpa attestasi |
| Apakah isim dibagi menurut satu daftar?           | Ada pembagian makna, jāmid/musytaq, ma‘rifah/nakirah, mu‘rab/mabnī, mufrad/jamak | Derivasi, referensialitas, gender, jumlah, kasus adalah dimensi terpisah           | Tampilkan **sumbu klasifikasi**, bukan daftar “jenis ke-1 sampai ke-30” yang saling terpisah                              |

## Struktur hasil implementasi

1. **11 halaman tashrif:** \`madhi\`, \`mudhari\`, \`mashdar\`, \`mimi\`, \`fail\`, \`maful\`, \`amr\`, \`nahy\`, \`zaman\`, \`makan\`, \`alah\`. Setiap halaman memiliki definisi, pertanyaan awal, pembeda kategori, dua/tiga contoh Arab berharakat, penjelasan minimal tiga subbab, daftar salah-kaprah, dan rujukan.
2. **Dua artikel klasifikasi:** Isim memiliki empat sumbu (makna/kelas kata, asal bentuk, ketentuan referen, gender/jumlah/i‘rab); fi‘il lima sumbu (waktu/fungsi, mujarrad/mazīd, jenis akar, transitivitas dan pasif, mood).
3. **Navigasi:** header transposed maupun tabel fallback mengarah ke halaman permanen dan berfungsi tanpa JavaScript. Halaman jenis kata, halaman istilah, dan rujukan fi‘il saling bertaut.
4. **Batas pengetahuan:** status semua materi tetap \`draft\`; contoh tidak otomatis diberikan label “verified” hanya karena unit test berhasil.

## Sumber yang benar-benar diperiksa (sebagai pijakan kaidah)

- [Matn al-Ājurrūmiyyah (Wikisource Arab)](https://ar.wikisource.org/wiki/الآجرومية_في_النحو) — kategori isim/fi‘il/ḥarf; bab af‘āl membedakan māḍī, muḍāri‘, amr; tanda kasus dan mood.
- [Ryding, _A Reference Grammar of Modern Standard Arabic_](https://imamhamzatcoed.edu.ng/library/ebooks/resources/Modern_Standard_Arabic_Reference_Grammar.pdf) — daftar jenis nomina termasuk maṣdar, ism fā‘il/maf‘ūl, nama tempat dan alat; infleksi isim; verba dan jussive. Sumber untuk konsep, bukan izin menyalin materi.
- [Abdul Basith, _Klasifikasi Kata dalam Bahasa Arab Menurut Linguis Arab Klasik dan Modern_, Adabiyyāt (2009)](https://download.garuda.kemdikbud.go.id/article.php?article=827519&title=KLASIFIKASI+KATA+DALAM+BAHASA+ARAB+MENURUT+LINGUIS+ARAB+KLASIK+DAN+MODERN&val=13440) — pembagian isim berbasis kategori semantis dan bentuk nominal.
- [Madinah Arabic — daftar pelajaran tata bahasa](https://madinaharabic.com/free-content/grammar) — silang uji istilah yang lazim dipakai dalam pembelajaran.

**Penting:** Sumber tadi mendukung kerangka umum; setiap harakat, contoh kalimat, artinya dalam bahasa Indonesia, dan batas penggunaan derivasi **masih harus ditashih**. Tidak ada klaim bahwa seluruh 22 bab, 8.000+ verba, dan bentuk turunan telah diverifikasi.

## Checklist penerimaan dan kelanjutan

- [x] 11 header matriks dan header tabel fallback mempunyai tautan bermakna.
- [x] 11 halaman penjelasan memiliki rute yang dapat diprerender.
- [x] Artikel isim/fi‘il menjelaskan perbedaan sumbu klasifikasi dan memiliki tautan bentuk terkait.
- [x] Unit test memastikan 11 slug identik dengan matriks, contoh dan sumber ada, serta status tetap draf.
- [x] E2E untuk header, artikel, navigasi, dan JavaScript-off (menunggu hasil CI PR).
- [ ] Tashih pengajar untuk setiap contoh (terutama ambiguitas maṣdar mīmī, zaman/makān, kalimat pasif, ragam MSA vs klasik).
- [ ] Pendalaman ism al-marra, ism al-hay’ah, mubālaghah, sifat musyabbahah, taṣghīr, nisbah, mu‘tal lafīf, af‘āl khamsah, dan derivasi non-triliteral.
- [ ] Latihan pengenalan bentuk berbasis contoh baru dengan penilaian tersimpan lokal (D-06/RM roadmap), setelah contoh lolos audit guru.
