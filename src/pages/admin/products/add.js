import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProductForm from '../../../components/admin/ProductForm';
import { addProduct } from '../../../lib/products';
import { useLang } from '../../../context/LanguageContext';
import toast from 'react-hot-toast';

export default function AddProduct() {
  const { t } = useLang();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data, imageFile) => {
    setSubmitting(true);
    try {
      await addProduct(data, imageFile);
      toast.success(t.admin.successAdd);
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error(t.admin.errorAdd);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Add Product">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin/products"
            className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors"
          >
            ←
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">{t.admin.addProduct}</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
          <ProductForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
      </div>
    </AdminLayout>
  );
}
