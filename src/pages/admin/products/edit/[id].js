import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import ProductForm from '../../../../components/admin/ProductForm';
import { getProductById, updateProduct } from '../../../../lib/products';
import { useLang } from '../../../../context/LanguageContext';
import toast from 'react-hot-toast';

export default function EditProduct() {
  const { t } = useLang();
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then((p) => {
        if (p) setProduct(p);
        else router.replace('/admin/products');
      })
      .catch(() => router.replace('/admin/products'))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSubmit = async (data, imageFile) => {
    setSubmitting(true);
    try {
      await updateProduct(id, data, imageFile, product.imagePath);
      toast.success(t.admin.successEdit);
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error(t.admin.errorEdit);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Product">
        <div className="max-w-2xl mx-auto space-y-4 animate-pulse">
          <div className="h-8 bg-gray-100 rounded w-1/3" />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 rounded-xl" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!product) return null;

  return (
    <AdminLayout title="Edit Product">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin/products"
            className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors"
          >
            ←
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">{t.admin.editProduct}</h1>
            <p className="text-sm text-gray-400 truncate">{product.name}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
