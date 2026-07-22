# Next.js E-Commerce Product Catalog

Proyek ini merupakan implementasi halaman **Catalog dan Product Listing** modern yang dibangun menggunakan **Next.js App Router**, **Server Components**, dan **URL-driven State Management**. Arsitektur ini dirancang untuk memberikan performa maksimal, SEO-optimized, serta *User Experience* yang responsif.

Live Demo : https://tjermin-shop.vercel.app

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React Server Components, ISR)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, Clean Code, Modular architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Data Fetching**: Native `fetch` dengan ISR (`revalidate: 3600`)
- **State Management**: `TanStack Query` + `Redux Toolkit`

---

## 🚀 Instalasi & Memulai Proyek

### Prasyarat
Pastikan Anda telah menginstal:
- **Node.js** (v18.x atau versi terbaru)
- **npm**, **yarn**, atau **pnpm**

### Langkah-Langkah Instalasi

1. **Clone Repositori**
   ```bash
   git clone https://github.com/andrepp97/tjermin-marketplace.git
   cd tjermin-marketplace
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan Mode Pengembang (Development Server)**
   ```bash
   npm run dev
   ```
   Buka browser dan akses [http://localhost:3000](http://localhost:3000).

4. **Build untuk Produksi**
   ```bash
   npm run build
   npm run start
   ```

---

## 💡 Cara Mengatasi Hydration Issues & Menerapkan Best Practices

Dalam proses pengembangan proyek ini, beberapa kendala *hydration mismatch* antara *Server-Side Rendered (SSR)* HTML dan *Client-Side React* berhasil diatasi melalui pendekatan berikut:

### 1. Menambahkan Prop `sizes` pada `next/image`
* **Masalah**: Muncul *warning/error* hydration saat menggunakan komponen `<Image />` dari Next.js karena ketidakcocokan ukuran layout responsif antara *server pre-rendering* dan *client layout engine*.
* **Solusi**: Menyediakan prop `sizes` pada setiap komponen `Image` (contoh: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`). Hal ini memastikan browser dan Next.js dapat menghitung *responsive srcSet* dengan tepat sebelum komponen di-hydrate.

### 2. Transisi dari Client-Side State ke URL Search Parameters
* **Masalah**: Penggunaan `useState` dan `useEffect` untuk menangani filter (kategori, rentang harga, pengurutan) di Client Component sering memicu pergeseran tampilan (*layout shift*) dan masalah hydration mismatch saat URL di-refresh atau di-bookmark.
* **Solusi**: Memindahkan seluruh *state* filter, sort, dan grid view ke URL Query String (`?category=...&sortBy=...&priceRange=...`).
  - Halaman utama `app/page.tsx` diubah menjadi murni **Server Component** yang membaca `searchParams` secara langsung.

### 3. Arsitektur Komponen Hybrid (Fallback Callback)
* **Masalah**: Komponen UI seperti `FilterSidebar` dan `MobileCatalogControls` sebelumnya bergantung pada prop handler yang wajib dioper dari parent, memicu bentrokan antara Server Component dan Client Component.
* **Solusi**: Membuat prop handler/callback menjadi opsional (`?`) dan diintegrasi dengan custom hook `useUpdateQuery`.
  - Jika komponen dipanggil dari Server Component tanpa callback, komponen secara otomatis memperbarui URL menggunakan `useUpdateQuery`.
  - Mengisolasi *local UI state* (seperti status buka/tutup modal filter mobile) menggunakan `useState` di dalam Client Component masing-masing tanpa mengganggu state global data catalog.

---

## 📁 Struktur Direktori Utama

```text
.
├── app/
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Server Component utama (baca searchParams & fetch data)
├── components/
│   ├── catalog/
│   │   ├── CatalogGrid.tsx    # Grid daftar produk
│   │   ├── CatalogHeader.tsx  # Header desktop & desktop view switcher
│   │   ├── DesktopGridSwitcher.tsx
│   │   └── MobileCatalogControls.tsx # Controls & modal filter khusus mobile
│   ├── FilterSidebar.tsx      # Sidebar filter desktop
│   └── HeroSection.tsx
├── hooks/
│   └── useUpdateQuery.ts      # Custom hook untuk mutasi URL SearchParams
├── services/
│   └── productService.ts      # Data fetching service (ISR enabled)
└── utils/
    ├── catalogHelpers.ts      # Helper fungsi filter & sorting
    └── formatters.ts          # Utility penformatan string/harga
```
