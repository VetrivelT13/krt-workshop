import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getAllProducts, deleteProduct, CATEGORIES } from '../../../lib/products';
import { useLang } from '../../../context/LanguageContext';
import toast from 'react-hot-toast';

export default function ManageProducts() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`${t.admin.confirmDelete}\n\n"${product.name}"`)) return;

    setDeleting(product.id);
    try {
      await deleteProduct(product.id, product.imagePath);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      toast.success(t.admin.successDelete);
    } catch (err) {
      toast.error(t.admin.errorDelete);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter ? p.category === catFilter : true;
    return matchSearch && matchCat;
  });

  return (
    <AdminLayout title="Manage Products">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">{t.admin.manageProducts}</h1>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          ➕ {t.admin.addProduct}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="sm:w-48 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {t.categories[cat.labelKey]}
            </option>
          ))}
        </select>
      </div>

      {/* Table/cards */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white rounded-xl border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📦</div>
          <p className="text-sm">
            {search || catFilter ? 'No products match your filters.' : 'No products yet.'}
          </p>
          <Link href="/admin/products/add" className="mt-3 inline-block text-primary-600 text-sm font-medium">
            Add your first product →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-3">{filtered.length} products</p>
          <div className="space-y-2">
            {filtered.map((product) => {
              const cat = CATEGORIES.find((c) => c.id === product.category);
              const isAvailable = product.status === 'available';

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 p-3 hover:border-primary-200 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      cat?.icon || '📦'
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">{product.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{cat?.icon} {t.categories[cat?.labelKey] || product.category}</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs font-semibold text-primary-700">₹{Number(product.price).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className={`hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                    isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {isAvailable ? '✅ Available' : '❌ Sold'}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deleting === product.id}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      {deleting === product.id ? '...' : '🗑️ Del'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
