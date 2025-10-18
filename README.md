# Sora - Aplikasi Penyewaan Kapal (Boat Rental App)

Sora adalah aplikasi web modern yang dirancang untuk memudahkan pencarian dan pemesanan kapal sewaan, dengan fokus awal di area Danau Toba. Aplikasi ini menyediakan antarmuka yang bersih, responsif, dan ramah pengguna, serta mendukung dua bahasa (Indonesia dan Inggris).

## Fitur Utama

* **Pencarian Kapal:** Pengguna dapat mencari kapal berdasarkan lokasi, tanggal, dan jumlah penumpang.
* **Filter Kategori:** Memfilter kapal berdasarkan tipe, seperti Kapal Tradisional, Speed Boat, Kapal Wisata, dan Perahu Nelayan.
* **Daftar Kapal:** Menampilkan kapal yang tersedia dalam format kartu (card) yang informatif, lengkap dengan gambar, harga, rating, kapasitas, dan fitur (seperti GPS).
* **Modal Pemesanan:** Alur pemesanan multi-langkah yang intuitif langsung dari daftar kapal.
* **Multi-Bahasa:** Dukungan penuh untuk bahasa Indonesia (id) dan Inggris (en) yang dapat diganti kapan saja.
* **Navigasi Tab:** Antarmuka tab-based yang mudah untuk beralih antara Home, Search, Favorites, dan Profile.
* **Fitur Profil (Mockup):** Termasuk halaman profil pengguna, daftar pemesanan, metode pembayaran, dan pengaturan.
* **Kartu Loyalitas:** Menampilkan poin loyalitas dan level pengguna untuk mendorong retensi.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi modern berbasis React dan TypeScript.

* **Framework Utama:** [React](https://react.dev/) (v18.3.1)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Komponen UI:**
    * [shadcn/ui](https://ui.shadcn.com/): Kumpulan komponen UI yang dapat digunakan kembali.
    * [Radix UI](https://www.radix-ui.com/): Primitif UI headless untuk aksesibilitas dan kustomisasi (digunakan di bawah shadcn/ui).
    * [Lucide React](https://lucide.dev/): Pustaka ikon yang simpel dan indah.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (dikonfigurasi melalui `globals.css` dan `index.css`).
* **Manajemen State:** React Hooks (`useState`).

## Susunan Proyek

```
boat-rental/
├── public/                     # Folder untuk aset statis
├── src/                        # Folder kode sumber utama 
├── components/                 # Komponen-komponen React 
├── figma/ 
  └── ImageWithFallback.tsx     # Komponen image dengan fallback 
├── ui/                         # Komponen UI inti dari shadcn/ui 
├── alert.tsx 
├── button.tsx
├── dialog.tsx│
  └── ... (dan komponen ui lainnya) 
├── BoatCard.tsx                # Komponen kartu untuk menampilkan kapal 
├── BookingModal.tsx            # Komponen modal untuk proses pemesanan 
├── BottomNav.tsx               # Komponen navigasi bawah (tab) 
├── LanguageSwitcher.tsx        # Komponen untuk ganti bahasa 
├── LoyaltyCard.tsx             # Komponen kartu loyalitas pengguna 
  └── SearchHeader.tsx          # Komponen header pencarian di halaman utama 
├── guidelines/ 
  └── Guidelines.md             # Panduan untuk pengembangan 
├── styles/ 
  └── globals.css               # File CSS global dan variabel Tailwind 
├── App.tsx                     # Komponen aplikasi utama (root component) 
├── Attributions.md             # Atribusi untuk aset pihak ketiga 
├── index.css                   # File CSS tambahan 
  └── main.tsx                  # Titik masuk (entry point) aplikasi React
├── .gitignore
├── index.html                  # File HTML utama
├── package.json                # Dependensi proyek dan skrip
├── README.md                   # Dokumentasi proyek 
  └── vite.config.ts            # Konfigurasi build tool Vite
```


* `src/App.tsx`: Komponen root yang mengatur state utama, logika rendering tab, dan tata letak halaman.
* `src/main.tsx`: Titik masuk aplikasi React, me-render komponen `App` ke dalam DOM.
* `src/components/`: Berisi semua komponen React yang dapat digunakan kembali.
* `src/components/ui/`: Berisi komponen UI inti dari shadcn/ui (misalnya, Button, Dialog, Select).
* `src/components/figma/`: Komponen utilitas spesifik, seperti `ImageWithFallback`.
* `src/styles/globals.css`: Konfigurasi dasar Tailwind CSS dan variabel tema (CSS variables).
* `package.json`: Mendefinisikan semua dependensi proyek dan skrip.
* `vite.config.ts`: Konfigurasi untuk build tool Vite, termasuk alias path.

## Prasyarat dan Instalasi

Untuk menjalankan proyek ini secara lokal, Anda memerlukan:

* [Node.js](https://nodejs.org/) (v18 atau lebih baru direkomendasikan)
* [npm](https://www.npmjs.com/) (atau manajer paket lain seperti yarn atau pnpm)

### Langkah Instalasi

1.  **Clone repositori:**
    ```bash
    git clone [https://github.com/username/boat-rental.git](https://github.com/username/boat-rental.git)
    cd boat-rental
    ```

2.  **Install dependensi:**
    Gunakan perintah berikut untuk menginstal semua paket yang diperlukan dari `package.json`.
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    Perintah ini akan memulai server pengembangan Vite secara lokal, biasanya di `http://localhost:3000`.
    ```bash
    npm run dev
    ```

4.  **Build untuk produksi:**
    Untuk membuat versi produksi dari aplikasi, jalankan:
    ```bash
    npm run build
    ```

## Contoh Penggunaan

Setelah server pengembangan berjalan:

1.  Buka `http://localhost:3000` di browser Anda.
2.  Anda akan melihat halaman utama (`Home`) yang menampilkan `SearchHeader`, `LoyaltyCard`, dan daftar "Kapal Unggulan".
3.  Gunakan `SearchHeader` untuk (secara simulasi) mencari kapal.
4.  Klik pada tombol kategori (misalnya, "Speed Boat") untuk memfilter daftar kapal yang ditampilkan.
5.  Klik tombol "Pesan Sekarang" pada salah satu kapal untuk membuka modal pemesanan.
6.  Gunakan `LanguageSwitcher` di kanan atas untuk mengubah bahasa antara Indonesia dan Inggris.
7.  Gunakan `BottomNav` untuk beralih ke halaman lain seperti "Search", "Favorites", dan "Profile".

## Kontribusi

Kontribusi untuk proyek ini sangat diharapkan! Jika Anda ingin berkontribusi, silakan fork repositori ini dan buat *pull request* dengan perubahan Anda.

1.  Fork repositori.
2.  Buat branch fitur baru (`git checkout -b fitur/nama-fitur`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur X'`).
4.  Push ke branch Anda (`git push origin fitur/nama-fitur`).
5.  Buka *Pull Request*.

Pastikan untuk mengikuti gaya kode yang ada dan perbarui dokumentasi jika diperlukan.

## Lisensi

Proyek ini dilisensikan di bawah **Lisensi MIT**. Lihat file `LICENSE` untuk detail lebih lanjut.

---
