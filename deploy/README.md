# Deploy ke VPS dengan git pull

Server menarik `main` dari GitHub setiap beberapa menit dan membangun ulang **hanya bila ada
commit baru**. Tidak ada kunci atau secret di GitHub, dan tidak ada jalan masuk dari GitHub ke
server. Hasil build adalah situs statis: cukup disajikan dari satu folder.

```
git fetch (kecil)  ->  commit sama? selesai  ->  bun install + bun run build
                   ->  salin ke releases/<sha>  ->  pindahkan symlink `current`
```

- Build yang gagal **tidak mengganti** situs yang sedang tayang, dan commit yang gagal tidak
  dicoba ulang tiap 5 menit sampai ada commit yang lebih baru (`FORCE=1` untuk memaksa).
- Satu proses pada satu waktu (kunci folder), jadi build lambat tidak bertumpuk.
- Folder rilis lama dibersihkan, sisa 3 terbaru. Mundur ke rilis lama:
  `ln -sfn /srv/belajar-bahasa-arab-releases/<sha7> /srv/belajar-bahasa-arab-releases/current`.

## Kebutuhan di server

- `git`, `curl`, Node lewat [nvm](https://github.com/nvm-sh/nvm) (versi dibaca dari `.nvmrc`,
  dipasang otomatis bila belum ada), dan [Bun](https://bun.sh) (versi di `packageManager`).
- Jangan pakai root. Buat user biasa, misalnya `belajar`, yang memiliki folder clone dan rilis.

## Pemasangan satu kali

```bash
sudo useradd -m belajar && sudo -iu belajar
git clone https://github.com/faiz-muttaqin/belajar-bahasa-arab.git ~/belajar-bahasa-arab
sudo mkdir -p /srv/belajar-bahasa-arab-releases && sudo chown belajar: /srv/belajar-bahasa-arab-releases
RELEASES_DIR=/srv/belajar-bahasa-arab-releases ~/belajar-bahasa-arab/deploy/update.sh   # build pertama
```

Clone itu khusus untuk deploy: jangan edit file di dalamnya.

### Penjadwalan (pilih satu)

Cron, tiap 5 menit (`crontab -e` sebagai user `belajar`):

```cron
*/5 * * * * RELEASES_DIR=/srv/belajar-bahasa-arab-releases /home/belajar/belajar-bahasa-arab/deploy/update.sh >> /home/belajar/deploy.log 2>&1
```

Atau systemd timer (`~/.config/systemd/user/belajar-update.{service,timer}`):

```ini
# belajar-update.service
[Service]
Type=oneshot
Environment=RELEASES_DIR=/srv/belajar-bahasa-arab-releases
ExecStart=/home/belajar/belajar-bahasa-arab/deploy/update.sh

# belajar-update.timer
[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
[Install]
WantedBy=timers.target
```

Aktifkan dengan `systemctl --user enable --now belajar-update.timer` (dan `loginctl enable-linger belajar`).

## Menyajikan situs di sebuah port

`update.sh` hanya membangun; **tidak ada yang otomatis berjalan di sebuah port** sampai Anda
menjalankan server file statis. Contoh memakai [Caddy](https://caddyserver.com) dan
[Caddyfile](./Caddyfile): ia menyajikan folder `current` di **`127.0.0.1:4173`** (port ini hanya
pilihan contoh; ubah di baris `http://127.0.0.1:4173`). Karena hanya mendengarkan `127.0.0.1`,
situs tidak terjangkau dari luar server; forwarder atau reverse proxy Anda harus berada di
mesin yang sama dan meneruskan ke `127.0.0.1:4173`.

```bash
# sesuaikan baris `root` di deploy/Caddyfile ke folder rilis Anda, lalu:
caddy run --config ~/belajar-bahasa-arab/deploy/Caddyfile --adapter caddyfile
# cek dari server:
curl -sI http://127.0.0.1:4173/ | head -1        # HTTP/1.1 200 OK
curl -sI http://127.0.0.1:4173/tidak-ada/ | head -1   # HTTP/1.1 404 Not Found
```

Agar tetap berjalan setelah reboot, jadikan service systemd (`/etc/systemd/system/belajar-web.service`):

```ini
[Unit]
Description=Belajar Bahasa Arab (static)
After=network.target

[Service]
User=belajar
ExecStart=/usr/bin/caddy run --config /home/belajar/belajar-bahasa-arab/deploy/Caddyfile --adapter caddyfile
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Caddy membaca file dari symlink `current` setiap permintaan, jadi rilis baru langsung tayang
tanpa restart. Bila memakai nginx, arahkan `root` ke `/srv/belajar-bahasa-arab-releases/current`,
`try_files $uri $uri/ =404;`, dan `error_page 404 /404.html;`. Karena `trailingSlash` aktif,
alamat halaman berakhiran `/`.

## Soal batas git pull dari GitHub

- `git fetch` ke repo publik **tidak memakai kuota REST API** GitHub (batas 60 permintaan per jam
  per IP untuk API tanpa login berlaku untuk API, bukan untuk operasi git). Satu fetch tiap
  5 menit hanya 288 kali sehari, dan script ini berhenti tanpa membangun bila commitnya sama.
- GitHub pernah mengumumkan bahwa pada lalu lintas yang tidak biasa, sebagian operasi git lewat
  HTTPS tanpa login **bisa sementara meminta autentikasi**
  ([pengumuman Oktober 2026](https://github.blog/changelog/2026-10-19-some-git-over-https-may-temporarily-require-authentication)).
  Itu bukan syarat umum, dan SSH atau HTTPS yang terautentikasi tidak terkena. Kalau fetch
  sering gagal, script mencatat "fetch failed" dan **membiarkan rilis yang ada tetap tayang**,
  jadi paling buruk situs hanya terlambat diperbarui.
- Untuk menutup kemungkinan itu, pakai **deploy key read-only** (kunci SSH hanya untuk membaca
  repo). Buat di server: `ssh-keygen -t ed25519 -f ~/.ssh/belajar_deploy -N ""`, tambahkan
  isi `belajar_deploy.pub` di GitHub (Settings, Deploy keys, **jangan** centang "Allow write
  access"), lalu `git remote set-url origin git@github.com:faiz-muttaqin/belajar-bahasa-arab.git`.
  Kunci privat tetap di server, tidak di repo, dan hanya bisa membaca repo yang sudah publik.
- Angka batas tepat untuk operasi git tidak diumumkan secara resmi, jadi jangan menurunkan
  jeda di bawah satu menit.

## Pemecahan masalah

- Lihat log: `tail -f ~/deploy.log`. Baris `FAILED at: ...` menyebut langkah yang gagal.
- Paksa membangun ulang commit saat ini: `FORCE=1 RELEASES_DIR=... deploy/update.sh`.
- Build di server tidak menjalankan tes. Tes berjalan di pipeline pengembangan (`bun run verify`).
