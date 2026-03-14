import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { getProductById, getAllProducts, CATEGORIES } from '../../lib/products';
import { useLang } from '../../context/LanguageContext';

const PHONE1 = '8825515488';
const PHONE2 = '9965634061';

export default function ProductDetail() {
  const { t } = useLang();
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then((p) => {
        if (p) setProduct(p);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-gray-100 rounded-2xl" />
          <div className="space-y-4 pt-4">
            <div className="h-6 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-10 bg-gray-100 rounded w-1/3" />
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout title="Product Not Found">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Product Not Found</h1>
          <p className="text-gray-500 mb-8">This product may have been removed or sold.</p>
          <Link href="/products" className="btn-primary">
            {t.productDetail.backToProducts}
          </Link>
        </div>
      </Layout>
    );
  }

  if (!product) return null;

  const category = CATEGORIES.find((c) => c.id === product.category);
  const isAvailable = product.status === 'available';

  const waMsg = encodeURIComponent(
    `${t.contact.whatsappMessage}\n\nProduct: ${product.name}\nPrice: ₹${product.price}\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — KRT Workshop`,
          text: `Check out ${product.name} at ₹${product.price} on KRT Workshop!`,
          url: window.location.href,
        });
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  return (
    <Layout
      title={`${product.name} — KRT Workshop & Traders`}
      description={`${product.name} available at KRT Workshop & Traders, Ariyalur. Price: ₹${product.price}. ${product.description || ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  {category?.icon || '📦'}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category + status */}
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <span className="text-xs font-medium bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                  {category.icon} {t.categories[category.labelKey]}
                </span>
              )}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}>
                {isAvailable ? `✅ ${t.productDetail.available}` : `❌ ${t.productDetail.sold}`}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-primary-700 mb-5">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {t.productDetail.description}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>
            )}

            {/* Contact buttons */}
            {isAvailable && (
              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${PHONE1}`}
                  className="flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-base sm:text-lg w-full"
                >
                  📞 {t.productDetail.callNow} — {PHONE1}
                </a>
                <a
                  href={`https://wa.me/91${PHONE1}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-base sm:text-lg w-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.productDetail.whatsapp}
                </a>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-primary-300 text-gray-600 hover:text-primary-700 font-semibold py-3 rounded-xl transition-all w-full text-sm"
                >
                  🔗 {t.productDetail.shareProduct}
                </button>
              </div>
            )}

            {/* Shop info */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">{t.productDetail.shopInfo}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span>📍</span>
                  <span>KRT Workshop, Vilangudi, Near GH, Ariyalur, TN – 621704</span>
                </div>
                <div className="flex gap-2">
                  <span>👨‍🔧</span>
                  <span>Owner: Thangadurai R</span>
                </div>
                <div className="flex gap-2">
                  <span>🕐</span>
                  <span>Mon–Sat: 8AM–7PM | Sun: 9AM–2PM</span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/products"
              className="mt-5 text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors inline-flex items-center gap-1"
            >
              {t.productDetail.backToProducts}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
