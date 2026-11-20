# Audit arti Arab–Indonesia

## 20 November 2026

Titik awal pada commit `a8ed8f7`. Koleksi Wiktionary berisi 2.788 verba Form I dan 4.479 verba turunan. Ada 32 dan 77 entri berturut-turut yang tidak memiliki glos Indonesia maupun Inggris dalam ekstrak lokal. Koleksi tambahan Qutrub/Arramooz berisi 5.005 kombinasi lema, akar dan bab. Sebanyak 1.702 ditandai `tidak_diketahui`, 833 memiliki deskripsi dan 2.470 memiliki padanan.

Pencarian `/sharaf/` dan `/cari/` membaca impor morfologi tanpa pengayaan arti yang sudah dipakai modal tashrif. Kamus kata tugas juga memuat penanda arti kosong. Pemeriksaan dilanjutkan menurut ID sumber, vokalisasi, kelas kata dan bab. Catatan ini diperbarui ketika setiap kelompok selesai.

Ke-109 entri Wiktionary yang kosong kini memiliki usulan padanan. Tautan pada kolom `audit.source` menunjuk ke lema rujukan varian atau kamus pembanding. Tiap glos baru ditandai `uncertain` untuk peninjauan. Pasangan قَلَا dan قَلِيَ serta dua entri نَهَدَ diuji dengan masdar dan konteks. Tinjau khusus makna geografis تَجَارَرَ dan pemakaian klasik اُقْتُتِلَ.

Seratus entri pertama dalam daftar kecocokan Al-Wasīṭ sudah mendapat draf padanan Indonesia. Pemeriksaan memakai bentuk lampau, vokal mudhari dan pelaku atau objek yang disebut sumber. Misalnya, أَرَضَ menggerogoti kayu dengan rayap sebagai pelaku, sedangkan بَكَشَ dipakai untuk membuka simpul.

Ditambahkan 417 padanan dan deskripsi pada baris Arabic Stopwords untuk partikel, pronomina, nomina dan ungkapan seperti صَهْ. Tabel `data/arabic-stopwords-id.tsv` menyimpan nomor baris sumber, lema persis, glos, rujukan dan catatan pemakaian. Beberapa nomor memuat kata yang sama dalam fungsi berbeda, misalnya لَا sebagai larangan dan sebagai penyangkal. Nomor baris menghitung rekaman sumber, bukan jumlah ejaan unik. Contoh Indonesia dan Arab yang dibuat untuk audit ini bersifat ilustratif.

Pemeriksaan berikutnya membedakan pelaku dan objek pada verba langka. شَصَرَ dipakai ketika sapi jantan menanduk, sedangkan نَثَطَ menggambarkan tunas yang menembus permukaan tanah. Arti yang kamusnya hanya merujuk ke kata lain ditahan sampai makna rujukannya jelas.

## Lanjutan dengan Claude Fable 5.2 (20 November 2026)

Sesudah lima kelompok pertama, 502 entri Qutrub/Arramooz sudah punya draf padanan dan 1.200 masih `tidak_diketahui`. Untuk setiap entri yang tersisa, bukti dikumpulkan dari salinan lokal kamus Arab (Al-Wasīṭ, Al-Muḥīṭ, Al-Muʿāṣira, Al-Ghanī, Lisān al-ʿArab) serta Lane dan Hans Wehr. Bukti dicocokkan dengan bentuk lampau berharakat dan vokal mudhari sesuai bab. Hasilnya: 674 entri punya bukti kuat dengan vokal yang cocok, 526 hanya punya bukti lemah (potongan Lisān atau akar di Hans Wehr), dan 137 tidak punya bukti.

Claude Fable 5.2 menyusun draf per kelompok 40 entri, hanya dari potongan kamus tersebut. Claude Sonnet 5.5 lalu memeriksa setiap draf terhadap potongan yang sama. Draf yang ditolak pemeriksa tetap `tidak_diketahui`. Setiap entri yang terisi menyimpan `audit.source`: tautan akar Al-Wasīṭ di situs Majma' al-Lugha al-'Arabiyya bila sumbernya Al-Wasīṭ, atau tautan akar di ejtaal.net (Arabic Almanac) untuk Lane, Hans Wehr, Lisān, dan Al-Muḥīṭ. `audit.note` menyebut kamus, kutipan bukti yang pendek, dan model yang menyusun serta memeriksanya. Teks kamus tidak disalin ke repo.

**Hasil.** Dari 1.200 entri, Fable 5.2 mengusulkan arti untuk 838. Pemeriksa menerima 569, memperbaiki 81, dan menolak 188. Yang ditolak umumnya hanya didukung potongan Lisān tanpa harakat, atau vokal mudharinya tidak cocok dengan bab. Jadi 650 entri kini terisi: 634 padanan dan 16 deskripsi. Sumbernya Al-Wasīṭ (307), Al-Muḥīṭ (144), Lisān (103), Al-Ghanī (49), Lane (36), Hans Wehr (6), dan Al-Muʿāṣira (5). Keyakinan `high` berarti kamus berharakat atau Lane memuat arti itu dengan vokal yang cocok. `low` berarti hanya Lisān yang mendukung dan babnya belum terbukti; tinjau kelompok ini lebih dulu.

Sebanyak 550 entri tetap `tidak_diketahui`: 362 karena Fable tidak menemukan arti untuk bentuk dan bab yang persis, dan 188 karena ditolak pemeriksa. Banyak di antaranya kemungkinan kombinasi bab buatan generator morfologi yang tidak tercatat di kamus. Tautan ejtaal.net membuka kamus pindaian per akar (termasuk Lane, Hans Wehr, Lisān, dan Muḥīṭ al-Muḥīṭ). Untuk sumber Al-Muḥīṭ dan Al-Ghanī, nama kamus dan kutipan pendek di `audit.note` menjadi pegangan peninjau.
