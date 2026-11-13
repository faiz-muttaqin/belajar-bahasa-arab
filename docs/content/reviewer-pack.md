# Paket ajakan peninjau konten

Dokumen ini untuk dikirim (sebagian atau seluruhnya) kepada calon peninjau: **guru bahasa Arab** dan **ustadz**. Isi bagian dalam kurung siku sebelum dikirim. Keputusan yang mendasarinya: [ADR-004 D-7](../decisions/0004-content-decisions.md).

---

## 1. Pesan ajakan (singkat, bisa ditempel ke WhatsApp atau email)

> Assalamu'alaikum, [nama/sapaan].
>
> Saya sedang membangun situs gratis untuk belajar bahasa Arab bagi orang Indonesia, khususnya yang sudah bisa membaca Al-Qur'an (lulus Iqra) tetapi belum paham artinya. Prinsipnya: _paham, bukan sekadar hafal_. Situs ini tanpa iklan, tanpa akun, dan materinya berlisensi terbuka (CC BY-SA 4.0).
>
> Kami tidak ingin menerbitkan satu kata pun tanpa diperiksa orang yang kompeten. Apakah [Ustadz/Ustadzah/Bapak/Ibu] berkenan menjadi peninjau? Bentuknya: memeriksa daftar kata, harakat, arti dan catatan singkat, kira-kira [N] butir per kiriman, dengan waktu yang [Ustadz/Bapak/Ibu] tentukan sendiri. Nama peninjau akan dicantumkan di situs (bila berkenan).
>
> Bila berkenan, saya kirimkan contoh butir dan panduan singkatnya. Jazakumullahu khairan.
>
> [nama Anda] · [kontak]

## 2. Tentang proyek (untuk peninjau)

- **Sasaran:** orang dewasa Indonesia yang bisa membaca tulisan Arab berharakat, ingin memahami bacaan shalat, Al-Qur'an dan bahasa Arab fusha sederhana.
- **Metode:** dengar → pahami makna dari konteks → lihat polanya → penjelasan singkat bahasa Indonesia → latihan mengingat → pengulangan terjadwal.
- **Unit pertama:** kata-kata inti bacaan shalat yang tidak diperselisihkan, lalu kata penunjuk dan kata tanya (hādhā, mā, man), al-, huruf jarr, iḍāfah, dan seterusnya.
- **Prinsip konten:** setiap kata harus bersumber; teks Al-Qur'an ditampilkan apa adanya (naskah Uthmani dari Tanzil); perbedaan praktik (mis. lafaz tasyahud, doa iftitah) ditampilkan berdampingan dengan label, tanpa menyatakan satu yang paling benar.
- **Yang tidak kami lakukan:** mengarang contoh, menyalin buku berhak cipta, menilai pelafalan dengan mesin.

## 3. Peran peninjau

| Peran            | Meninjau                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Guru bahasa Arab | Kosakata harian, contoh kalimat MSA, penjelasan tata bahasa, tabel rujukan (mis. tashrif, jenis ḥarf).    |
| Ustadz           | Kata dan kutipan bacaan shalat dan Al-Qur'an, label varian, catatan makna yang menyentuh aspek keagamaan. |
| Pendengar audio  | Rekaman/audio hasil sintesis: makhraj, panjang-pendek vokal, tasydid, tanwin, hamzah, waqaf.              |

## 4. Daftar periksa per butir

Untuk setiap kata/contoh/baris tabel:

1. **Teks Arab benar** (huruf, hamzah, alif, ta marbuthah) dan **harakat lengkap serta tepat** untuk bentuk yang dimaksud.
2. **Arti Indonesia** tepat dan tidak menyesatkan; bila ada lebih dari satu makna, konteksnya jelas.
3. **Label ragam** benar: fusha/MSA atau Al-Qur'an/klasik.
4. **Catatan tata bahasa** (bila ada) tidak menyederhanakan secara keliru; batas analoginya disebut.
5. **Sumber** yang dicantumkan memang mendukung butir itu.
6. **Varian** (khusus bacaan shalat): label dan riwayatnya tepat, tidak ada yang dinyatakan satu-satunya yang benar.
7. **Ikon** (bila ada) cocok dan tidak menimbulkan salah paham; hanya untuk benda konkret.
8. **Audio** (bila ada): sesuai teks berharakat, termasuk bentuk waqaf di akhir.

## 5. Format catatan tinjauan

Peninjau cukup mengisi tabel ini (spreadsheet atau balasan teks juga boleh); kami yang memasukkannya ke data.

| ID butir | Keputusan                             | Catatan / perbaikan | Peninjau | Peran                     | Tanggal    |
| -------- | ------------------------------------- | ------------------- | -------- | ------------------------- | ---------- |
| [id]     | disetujui / perlu perbaikan / ditolak | [catatan]           | [nama]   | guru bahasa Arab / ustadz | YYYY-MM-DD |

Di data situs, catatan ini disimpan sebagai `reviews: [{ reviewer, role, date, decision, notes }]`. Butir hanya terbit bila tinjauan terbaru dari peran yang dibutuhkan berstatus **disetujui** (dicek otomatis oleh kode).

## 6. Contoh butir untuk tinjauan pertama

Akan diisi setelah inventaris kata bacaan shalat selesai disusun dari sumber (tugas RS-04 di [tracker](./tracker.md)). Formatnya:

| ID           | Arab (berharakat) | Arti (draf) | Ragam            | Konteks                 | Sumber                |
| ------------ | ----------------- | ----------- | ---------------- | ----------------------- | --------------------- |
| [shalat-001] | [teks]            | [arti]      | Al-Qur'an/klasik | [mis. takbiratul ihram] | [rujukan hadis/kitab] |

## 7. Atribusi

Dengan persetujuan peninjau, nama dan peran dicantumkan di halaman Tentang dan pada butir yang ditinjau. Peninjau boleh memilih tidak disebutkan namanya; catatan internal tetap menyimpan siapa yang meninjau.
