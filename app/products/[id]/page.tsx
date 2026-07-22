import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { productService } from '@/services/productService';
import { ProductCard } from '@/components/ProductCard';
import {
  formatPriceFromUSD,
  formatOriginalPriceFromUSD,
} from '@/utils/formatters';

// Client Components
import { ImageGallerySlider } from '@/components/product-detail/ImageGallery';
import { ProductActions } from '@/components/product-detail/ProductActions';
import { ProductAccordions } from '@/components/product-detail/ProductAccordions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) return { title: 'Product Not Found - TJERMIN' };

  return {
    title: `${product.title} | TJERMIN`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await productService.getRelatedProducts(
    product.category,
    id
  );

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop',
  ];

  const formattedPrice = formatPriceFromUSD(product.price);
  const formattedOriginalPrice = formatOriginalPriceFromUSD(product.price);

  const accordions = [
    {
      id: 'additional',
      title: 'Additional Info',
      content:
        'Care instructions: Machine wash cold with like colors. Tumble dry low. Do not bleach. Cool iron if needed.',
    },
    {
      id: 'details',
      title: 'Details',
      content: `Category: ${product.category}. Rating: ${product.rating?.rate || 4.5} / 5.`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 py-6 text-slate-800">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <span className="capitalize">{product.category}</span>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold truncate max-w-50">
          {product.title}
        </span>
      </nav>

      {/* Main Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
        <ImageGallerySlider images={galleryImages} productTitle={product.title} />
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {product.title}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formattedPrice}
            </span>
            <span className="text-sm sm:text-base text-slate-400 line-through font-medium">
              {formattedOriginalPrice}
            </span>
          </div>

          <div className="mt-4 text-xs font-semibold text-slate-600">Category</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-medium capitalize">
              {product.category}
            </span>
            <span className="text-xs px-3 py-1 rounded-md bg-emerald-100/80 text-emerald-800 font-semibold">
              In Stock
            </span>
          </div>

          <div className="mt-6">
            <ProductActions product={product} />
          </div>

          {/* Specs Table */}
          <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-6 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-500">SKU:</span>
              <span className="font-semibold text-slate-900">PRD-{product.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Stock:</span>
              <span className="font-semibold text-slate-900">In Stock (247)</span>
            </div>
          </div>

          <div className="mt-6">
            <ProductAccordions items={accordions} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            You might also like
          </h2>
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            More Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </section>

    </div>
  );
}