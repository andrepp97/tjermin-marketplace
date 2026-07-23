# Next.js E-Commerce Product Catalog

Proyek ini merupakan implementasi halaman **Catalog dan Product Listing** modern yang dibangun menggunakan **Next.js App Router**, **React Server Components (RSC)**, **Framer Motion**, dan **Client-side State Management**. Arsitektur ini dirancang modular untuk memberikan performa maksimal, SEO-optimized, animasi yang mulus (60 FPS), serta *User Experience* yang instan dan responsif.

Live Demo (Cloudflare) : https://tjermin-marketplace.andreputerap.workers.dev

Live Demo (Vercel) : https://tjermin-shop.vercel.app (Vercel SSR blocked by FakeStoreAPI)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components, Streaming SSR)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, Clean Code, Modular architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Layout animations, `AnimatePresence`, Page Transitions)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **State Management & Caching**: [Redux Toolkit](https://redux-toolkit.js.org/) + `redux-persist`, [TanStack Query v5](https://tanstack.com/query)
- **Data Fetching**: Native `fetch` dengan ISR/Revalidation (`next: { revalidate: 3600 }`)

---

## 🚀 Instalasi & Memulai Proyek

### Prasyarat
Pastikan Anda telah menginstal:
- **Node.js** (v18.x atau versi terbaru)
- **npm**, **yarn**, atau **pnpm**

### Langkah-Langkah Instalasi

1. **Clone Repository**
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

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Buka browser dan akses [http://localhost:3000](http://localhost:3000).

4. **Build untuk Production**
   ```bash
   npm run build
   npm run start
   ```

---

## 💡 Mengatasi Hydration Issues

Dalam proses pengembangan proyek ini, beberapa kendala *hydration mismatch* antara *Server-Side Rendered (SSR)* HTML dan *Client-Side React* berhasil diatasi melalui pendekatan berikut:


### 💾 Custom Storage Integration (`customStorage.ts`)

Secara bawaan, **Redux Persist** mengandalkan Web Storage browser (`window.localStorage`) untuk menyimpan *state*. Namun, pada arsitektur **Next.js (Server-Side Rendering / SSR)**, kode di-render terlebih dahulu di lingkungan Node.js (server) di mana objek `window` dan `localStorage` belum tersedia (`undefined`).

Implementasi `customStorage.ts` dibuat untuk menyelesaikan masalah tersebut dengan pendekatan berikut:

1. **Graceful Fallback (Noop Storage)**: Menyediakan *dummy storage* yang aman (*no-operation*) pada server. *Dummy storage* ini mengembalikan `Promise` kosong sehingga Redux Persist tidak mengalami *crash* saat dijalankan di server.
2. **Client-Side Hydration**: Begitu aplikasi selesai dimuat di browser (`typeof window !== 'undefined'`), sistem secara otomatis beralih menggunakan `localStorage` asli milik browser untuk menyimpan dan memulihkan *state* aplikasi.


---

## 📁 Struktur Direktori Utama

```text
.
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── template.tsx                  # Framer Motion page-level transition wrapper
│   ├── page.tsx                      # Katalog Produk
│   └── products/
│       └── [id]/
│           ├── loading.tsx           # Instant Skeleton Loader (Streaming SSR)
│           └── page.tsx              # Server Component Detail Produk & Metadata
├── components/
│   ├── catalog/
│   │   ├── CatalogGrid.tsx           # Grid produk dengan AnimatePresence
│   │   ├── CatalogHeader.tsx         # Desktop header & controls
│   │   ├── DesktopGridSwitcher.tsx   # Switcher kolom layout desktop
│   │   └── MobileCatalogControls.tsx # Control bar & drawer filter mobile
│   ├── product-detail/
│   │   ├── ImageGallery.tsx          # Gallery slider produk
│   │   ├── ProductActions.tsx        # Client Component 'Add to Cart'
│   │   └── ProductAccordions.tsx     # Informasi tambahan & spesifikasi
│   ├── FilterSidebar.tsx             # Sidebar filter kriteria desktop
│   └── ProductCard.tsx               # Cards interaktif dengan Framer Motion
├── hooks/
│   ├── useCatalogLayout.ts           # Custom hook pengelola state layout grid
│   └── useFilteredProducts.ts        # Custom hook filtering & sorting logic
├── services/
│   └── productService.ts             # Service data fetching (Next.js ISR enabled)
├── store/
│   └── customStorage.ts              # SSR-safe storage fallback untuk Redux Persist
└── utils/
    ├── catalogHelpers.ts             # Utility pencarian, penyaringan & sorting
    └── formatters.ts                 # Utility penformatan mata uang USD/IDR
```
