# Audit sumber G-02: akar, wazan, tashrif istilahi dan lughawi

**Tanggal:** 14 November 2026 · **Status:** materi draft, implementasi pilot yang bukan generator bentuk Arab umum.

## Bukti atas contoh ك ت ب

| Klaim yang dipakai | Sumber terperiksa | Batasan |
| --- | --- | --- |
| Akar ك ت ب, lemma كَتَبَ, pasangan يَكْتُبُ | [Wiktionary كَتَبَ](https://en.wiktionary.org/wiki/كتب), [OpenArabic kataba](https://openarabic.org/kataba-conjugation/) | Vokal muḍāri‘ Form I tidak dapat dipastikan dari akar tanpa attestation. OpenArabic merujuk Wiktionary, bukan bukti independen seluruhnya. |
| Māḍī, muḍāri‘ dan amr untuk orang pertama/kedua/ketiga | [Madinah Arabic lesson 28, part 2](https://madinaharabic.com/free-content/grammar/lesson-28/part-2) | Contoh yang ditampilkan hanya sebagian dari paradigma lengkap. |
| Maṣdar كِتَابَة, isim fā‘il كَاتِب, isim maf‘ūl مَكْتُوب | [Wiktionary كَتَبَ](https://en.wiktionary.org/wiki/كتب), [OpenArabic kataba](https://openarabic.org/kataba-conjugation/), [Quranic Arabic Corpus akar ك ت ب](https://corpus.quran.com/qurandictionary.jsp?root=ktb) | Makna dalam korpus Qur’ani berbeda menurut konteks; contoh di website bukan kutipan ayat. Maṣdar Form I tidak boleh dihasilkan secara universal dari satu rumus. |
| Perbedaan tashrif istilahi dan lughawi dalam pendidikan pesantren | [Kajian Al-Amtsilah (jurnal STIT Darul Fattah)](https://ejurnal.darulfattah.ac.id/almitsali/article/proxy/387/257), [Penerbit Sidogiri — Al-Amtsilah](https://sidogiripenerbit.com/shop/kitab-amtsilah-at-tashrifiyah-panduan-ilmu-sharaf/) | Rujukan tradisi/klasifikasi, **bukan** lisensi menggandakan tabel atau isi kitab cetak. |

## Ketelitian isi

- **Tashrif istilahi**: klasifikasi bentuk dan fungsi derivasi. Jangan menyamakan semua contoh secara mekanis: `كَاتِبٌ` adalah *isim fā‘il*, `مَكْتُوبٌ` *isim maf‘ūl*, `كِتَابَةٌ` maṣdar yang tercatat.
- **Tashrif lughawi**: infleksi karena orang, gender, jumlah; pada beberapa bentuk tidak ada perbedaan grafis (`تَكْتُبُ` untuk `هِيَ` dan `أَنْتَ` dalam indikatif).
- Bentuk `كَتَبَ` dan `يَكْتُبُ` adalah salah satu **fi‘il shahih** dalam Form I. Fi‘il mu‘tal, mahmuz, muda‘af, serta beberapa pola mazid memerlukan aturan tambahan; jangan menyamakan semua bentuknya dengan contoh ini.
- Kata Arab untuk contoh ditulis berharakat dengan glos Indonesia **asli**; tidak ada salinan paragraf sumber ke dalam frontend.
- Wazan yang ditampilkan di halaman ini adalah *pola untuk contoh yang dicatat*, bukan daftar definitif semua akar. 22 kelompok wazan dan kamus yang sudah ada tetap titik rujukan utama.

## Langkah lanjut G-02

1. Audit pasangan lemma → wazan dengan sumber per-lema, bukan hanya per-akar.
2. Hubungkan data 22 bab ke kartu interaktif tanpa memaksa bentuk masdar atau fi‘il mu‘tal yang belum dibuktikan.
3. Lengkapi paradigma lughawi dual, jamak, feminin dan kalimat contoh; uji per pola.
4. Tentukan status `research_verified` hanya setelah evidence per klaim dan validasi pengecualian, sebagaimana [protokol riset](../research/2026-11-14-source-based-verification.md).
