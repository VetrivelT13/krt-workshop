import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProducts, CATEGORIES } from '../../lib/products';
import { useLang } from '../../context/LanguageContext';

export default function AdminDashboard() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const available = products.filter((p) => p.status === 'available').length;
  const sold = products.filter((p) => p.status === 'sold').length;
  const recent = products.slice(0, 5);

  const stats = [
    { label: t.admin.totalProducts, value: products.length, icon: '📦', color: 'bg-blue-50 text-blue-700' },
    { label: t.admin.availableProducts, value: available, icon: '✅', color: 'bg-green-50 text-green-700' },
    { label: t.admin.soldProducts, value: sold, icon: '🏷️', color: 'bg-red-50 text-red-600' },
  ];

  // Category breakdown
  const catBreakdown = CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.id).length,
    label: t.categories[cat.labelKey],
  }));

  return (
    <AdminLayout title="Dashboard">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">{t.admin.dashboard}</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, Thangadurai R 👋</p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          ➕ {t.admin.addProduct}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${color}`}>
              {icon}
            </div>
            <div className="text-3xl font-extrabold text-gray-800">{loading ? '—' : value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent products */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">{t.admin.recentProducts}</h2>
            <Link href="/admin/products" className="text-xs text-primary-600 hover:text-primary-800 font-medium">
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-sm">No products yet. Add your first product!</p>
              <Link href="/admin/products/add" className="mt-3 inline-block text-primary-600 text-sm font-medium">
                Add Product →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recent.map((product) => {
                const cat = CATEGORIES.find((c) => c.id === product.category);
                return (
                  <div key={product.id} className="flex items-center gap-4 px-5 py-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-lg shrink-0 overflow-hidden">
                      {product.imageUrl ? (
                        <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />
                      ) : (
                        cat?.icon || '📦'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm truncate">{product.name}</div>
                      <div className="text-xs text-gray-400">₹{Number(product.price).toLocaleString('en-IN')}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {product.status === 'available' ? '✅' : '❌'}
                    </span>
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">By Category</h2>
          </div>
          <div className="p-4 space-y-3">
            {catBreakdown.map(({ id, icon, label, count }) => (
              <div key={id} className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-700 mb-1">{label}</div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: products.length ? `${(count / products.length) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-500 w-5 text-right">{count}</span>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="px-5 py-4 border-t border-gray-100 space-y-2">
            <Link
              href="/admin/products/add"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              ➕ Add New Product
            </Link>
            <Link
              href="/admin/products"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              📋 Manage All Products
            </Link>
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 font-medium py-1.5 rounded-xl text-xs transition-colors"
            >
              🌐 View Website →
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
