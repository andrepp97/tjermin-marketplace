# Next.js E-Commerce Product Catalog

Proyek ini merupakan implementasi halaman **Catalog dan Product Listing** modern yang dibangun menggunakan **Next.js App Router**, **Server Components**, dan **URL-driven State Management**. Arsitektur ini dirancang untuk memberikan performa maksimal, SEO-optimized, serta *User Experience* yang responsif.

Live Demo (Cloudflare) : https://tjermin-marketplace.andreputerap.workers.dev
Live Demo (Vercel) : https://tjermin-shop.vercel.app (Blocked SSR)

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


### 💾 Custom Storage Integration (`customStorage.ts`)

#### **Alasan Implementasi**
Secara bawaan, **Redux Persist** mengandalkan Web Storage browser (`window.localStorage`) untuk menyimpan *state*. Namun, pada arsitektur **Next.js (Server-Side Rendering / SSR)**, kode di-render terlebih dahulu di lingkungan Node.js (server) di mana objek `window` dan `localStorage` belum tersedia (`undefined`).

Implementasi `customStorage.ts` dibuat untuk menyelesaikan masalah tersebut dengan pendekatan berikut:

1. **Mencegah Error SSR & Build**: Menghindari error `ReferenceError: window is not defined` saat Next.js melakukan Server-Side Rendering atau kompilasi build statis.
2. **Graceful Fallback (Noop Storage)**: Menyediakan *dummy storage* yang aman (*no-operation*) pada server. *Dummy storage* ini mengembalikan `Promise` kosong sehingga Redux Persist tidak mengalami *crash* saat dijalankan di server.
3. **Seamless Client-Side Hydration**: Begitu aplikasi selesai dimuat di browser (`typeof window !== 'undefined'`), sistem secara otomatis beralih menggunakan `localStorage` asli milik browser untuk menyimpan dan memulihkan *state* aplikasi.


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
