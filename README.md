# SKYTIVE PHOTOBOOTH STUDIO

**SKYTIVE PHOTOBOOTH** adalah aplikasi photobooth berbasis web kontemporer dengan estetika **Elegant Minimalist Editorial** dan sentuhan creative studio. Dibangun menggunakan Next.js (App Router), Tailwind CSS v4, Zustand, dan HTML5 Canvas untuk ekspor foto beresolusi tinggi.

---

## 📸 Arsitektur Dua Alur Studio (Dual-Flow System)

Aplikasi menyediakan dua alur studio independen sesuai preferensi pengguna:

### 1. Alur 3-Strip Edition (Classic Strip 600×1800 px)
- **Sumber Frame:** `public/new-frame/` & `public/frames/`
  - *Bubble Cute Studio* (`BubbleCute-Frame.png`)
  - *Dreamy Fun Palette* (`DreamyFun-Frame.png`)
  - *Elegant Minimalist* (`Elegant-Frame.png`)
  - *Retro Vintage Archive* (`RetroVintage-Frame.png`)
  - *Skena Creative* (`Skena-Frame.png`)
  - *Street Velocity* (`StreetRacing-Frame.png`)
  - *Contemporary Studio Strip* (Polosan dengan palet warna background kustom)
  - Koleksi frame retro klasik yang tetap dipertahankan.
- **Mekanisme Alur:**
  1. Seleksi Frame 3-Strip & Pengaturan Timer (3 detik / 5 detik).
  2. Sesi Kamera Live: Hitungan mundur dan capture otomatis 3 foto berurutan.
  3. Editor Foto: Pratinjau strip vertikal, seleksi slot foto, zoom slider, dan geser koordinat (pan).
  4. Halaman Unduh: Pembuatan QR Code instan ke halaman mobile `/p/[id]` dan unduh langsung file PNG strip.

### 2. Alur Newspaper Gazette Edition (Frontpage 1414×2000 px)
- **Sumber Frame:** `public/frame-newspaper/Newspaper-Frame.png`
- **Mekanisme Alur:**
  1. Langsung mulai sesi Newspaper dari Beranda.
  2. Sesi Kamera Live: Hitungan mundur dan capture 1 foto utama (Hero Shot).
  3. Pratinjau & Penyesuaian Kilat: Tampilan poster koran vintage skala penuh dengan kontrol posisi/zoom untuk 1 foto tersebut.
  4. Halaman Unduh: Cetak langsung soft-file koran resolusi tinggi 1414×2000 px atau scan QR Code ke smartphone.

---

## 🎨 Design System & Estetika Editorial

- **Typography:**
  - Headline & Display: **Plus Jakarta Sans** (weights 700 & 800, tight tracking)
  - Body & UI: **Inter** (weight 500 body, 600 action buttons)
  - Metadata & Counters: **JetBrains Mono**
- **Color Palette:**
  - Base Background: Off-white (`#F5F3EE`) & Warm Studio Surface (`#FAF9F5`)
  - Typography & Borders: Ink Black (`#191919`)
  - Secondary Mutes: Warm Gray (`#737373`, `#ECEAE4`)
  - Accent: Editorial Terracotta (`#B83A24`)
- **Micro-interactions:**
  - Transisi halus 200–300 ms tanpa animasi berlebihan.
  - Hairline borders (`1px solid rgba(25, 25, 25, 0.15)`).

---

## 🚀 Menjalankan Project

```bash
# Install dependensi
npm install

# Menjalankan server pengembangan
npm run dev

# Membangun bundle produksi
npm run build

# Menjalankan produksi
npm start
```

---

## 📂 Struktur Direktori Utama

```
photobooth/
├── public/
│   ├── new-frame/           # Koleksi frame 3-strip baru (BubbleCute, Dreamy, Elegant, dll.)
│   ├── frame-newspaper/     # Frame Newspaper Gazette (Newspaper-Frame.png)
│   └── frames/              # Frame legacy yang tetap dipertahankan
├── src/
│   ├── app/
│   │   ├── api/photos/      # Endpoint RAM ephemeral storage
│   │   ├── p/[id]/          # Halaman unduh khusus mobile pelanggan
│   │   ├── globals.css      # Design tokens editorial kontemporer
│   │   └── page.tsx         # Root controller tampilan photobooth
│   ├── components/          # Header, Footer, Button, Modal
│   ├── constants/           # Definisi metadata frame & slot koordinat
│   ├── features/
│   │   ├── landing/         # Beranda dengan seleksi dual-flow
│   │   ├── frame/           # Katalog seleksi frame & timer
│   │   ├── camera/          # Live camera viewfinder & countdown
│   │   ├── editor/          # Canvas editor foto (3-strip & newspaper)
│   │   └── download/        # QR Code & unduh soft-file
│   └── store/               # Zustand global store (flowType, step, photos)
```

© SKYTIVE PHOTOBOOTH STUDIO. All Rights Reserved.

