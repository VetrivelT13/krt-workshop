import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/products/ProductCard';
import { getAllProducts, CATEGORIES } from '../../lib/products';
import { useLang } from '../../context/LanguageContext';

export default function ProductsPage() {
  const { t } = useLang();
  const router = useRouter();
  const { cat, q } = router.query;

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  // Sync URL params to state
  useEffect(() => {
    if (cat) setSelectedCat(cat);
    if (q) setSearch(q);
  }, [cat, q]);

  useEffect(() => {
    getAllProducts()
      .then(setAllProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    if (selectedCat) {
      products = products.filter((p) => p.category === selectedCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    return products;
  }, [allProducts, selectedCat, search]);

  const handleCategoryChange = (catId) => {
    setSelectedCat(catId);
    const query = { ...router.query };
    if (catId) {
      query.cat = catId;
    } else {
      delete query.cat;
    }
    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  return (
    <Layout
      title={`Products — KRT Workshop & Traders, Ariyalur`}
      description="Browse tractor spare parts, agriculture tools, engine oils, welding materials and belts available at KRT Workshop & Traders, Ariyalur."
      canonical="https://krtworkshop.vercel.app/products"
    >
      {/* Page header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{t.productsPage.title}</h1>
          <p className="text-green-200 text-sm sm:text-base">{t.productsPage.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder={t.productsPage.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>

          {/* Category select */}
          <select
            value={selectedCat}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="sm:w-56 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
            aria-label={t.productsPage.filterBy}
          >
            <option value="">{t.productsPage.all}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {t.categories[cat.labelKey]}
              </option>
            ))}
          </select>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              !selectedCat
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.productsPage.all}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCat === cat.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {t.categories[cat.labelKey]}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-4">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-base">{t.productsPage.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
