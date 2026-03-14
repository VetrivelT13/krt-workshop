import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../../context/LanguageContext';
import { getFeaturedProducts } from '../../lib/products';
import ProductCard from '../products/ProductCard';

export default function FeaturedProducts() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts(6)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-gray-50" id="products" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block bg-earth-100 text-earth-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            ✨ {t.featuredProducts.title}
          </span>
          <h2 id="featured-heading" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            {t.featuredProducts.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            {t.featuredProducts.subtitle}
          </p>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-6 bg-gray-100 rounded w-1/3 mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-base">{t.featuredProducts.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-150 text-sm sm:text-base"
          >
            {t.featuredProducts.viewAllProducts} →
          </Link>
        </div>
      </div>
    </section>
  );
}
