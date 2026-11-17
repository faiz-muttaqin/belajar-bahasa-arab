# RM-06 · Iqra opsional: titik cek bacaan yang tidak mengklaim penilaian lisan

**17 November 2026 · Implementasi pilot (draft).**

## Masalah validitas

Kemampuan CA-05 adalah **membaca teks pendek berharakat**, bukan sekadar memilih arti dari beberapa opsi. Tes pilihan ganda atau teks mandiri tidak bisa memverifikasi makhraj, panjang vokal, waqaf, maupun kefasihan. Oleh karena itu, pilot menyediakan **20 bacaan untuk cek mandiri** (5 per domain) pada `/belajar/checkpoint-iqra/` tanpa menyimpan hasil sebagai `LearningAttempt` atau menaikkan tingkat bukti. Ini tidak setara dengan hasil tes lisan yang disimak pengajar.

## Tugas yang tersedia

- 5 bacaan dengan vokal pendek/panjang dan sukun.
- 5 bacaan dengan tasydid atau tanwin.
- 5 bacaan dengan alif-lam syamsiyyah atau qamariyyah.
- 5 kalimat tiga kata atau lebih dengan keterkaitan tanda.
- Setiap stimulus berbeda dan berharakat, memiliki fokus tugas dan catatan periksa yang disembunyikan di HTML `details` sampai pengguna membukanya.
- No-JS/prerender, RTL, satu bacaan per kartu, teks terbaca di viewport sempit. Tidak ada mikrofon, server, rekaman, atau data suara yang dikumpulkan.

**Rujukan aturan**, bukan attestation kalimat baru: [W3C Arabic Layout Requirements](https://www.w3.org/TR/alreq/), ditambah bentuk pembanding dari materi fondasi proyek. Semua teks dan komentar merupakan karya sendiri, status draft untuk tashih; pengujian E2E menegaskan umpan balik tetap dapat dibuka tanpa JavaScript. URL sumber aturan tidak boleh dinyatakan memverifikasi kebenaran tiap kalimat maupun pelafalan pelajar.

## Berikutnya, RM-06 Iqra tahap audit

1. **IQA-02: audit setiap bacaan** oleh pengajar/qari: harakat, pemilihan kosakata, solar/lunar lam, tanwin dan aturan waqaf yang relevan.
2. **IQA-03: tes dengan pendengar nyata**, minimal tugas bacaan baru, rubrik error per fonem, sukun, panjang vokal, tasydid dan kelancaran. Feedback per butir dari pendamping, bukan dari teks otomatis.
3. **IQA-04: audio contoh** hanya setelah lisensi/izin dan tashih terpenuhi, bisa diputar offline; evaluasi sistem audio tidak mengubah bukti diri menjadi penilaian profesional.
4. **IQA-05: pengukuran progres** bila metode penilaian lisan benar-benar kredibel dan konsensual; pisahkan **assessment confidence**, posisi manual, dan tingkat bukti dari soal makna. Jangan otomatis menyetarakan dengan CEFR.
5. Lanjut **RM-07** uji UX/pembelajar sasaran, termasuk label checkpoint mandiri, kegagalan storage dan navigasi.

Pilot ini sengaja tidak merilis 20 soal pilihan ganda yang tampak “lulus” tetapi tidak mengukur kemampuan membaca.

## Catatan implementasi terverifikasi — 17 November 2026

**Status plan keseluruhan: PARTIAL**, bukan otomatis selesai karena PR pilot sudah merged. Audit lintas sebelas dokumen: [matriks status implementasi](./IMPLEMENTATION_STATUS.md).

**Sudah terlihat di kode:** `src/lib/content/checkpoints-iqra.ts`, `src/routes/belajar/checkpoint-iqra/+page.svelte`, `tests/e2e/rm06-checkpoint-iqra.e2e.ts`. Ini bukti keberadaan implementasi, **bukan** audit benar-salah kaidah atau hasil uji pengguna.

**Belum terpenuhi:** IQA-02–05: audit 20 bacaan, pelafalan oleh pendengar, audio terizin dan asesmen lisan kredibel; tidak ada skor otomatis.

**Tindak lanjut:** [issue #52](https://github.com/faiz-muttaqin/belajar-bahasa-arab/issues/52). Setiap PR lanjutan wajib menyebut sub-deliverable yang diselesaikan dan kriteria yang masih terbuka.
