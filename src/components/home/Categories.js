import Link from 'next/link';
import { useLang } from '../../context/LanguageContext';
import { CATEGORIES } from '../../lib/products';

export default function Categories() {
  const { t } = useLang();

  const categoryLinks = CATEGORIES.map((cat) => ({
    ...cat,
    href: `/products?cat=${cat.id}`,
    label: t.categories[cat.labelKey],
    desc: t.categories[`${cat.labelKey}Desc`] || '',
  }));

  return (
    <section className="py-14 sm:py-20 bg-white" id="categories" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-10">
          <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            {t.categories.title}
          </span>
          <h2 id="categories-heading" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            {t.categories.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryLinks.map(({ id, icon, label, desc, href }) => (
            <Link
              key={id}
              href={href}
              className="group flex flex-col items-center text-center bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-200 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <span
                className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
              >
                {icon}
              </span>
              <span className="font-semibold text-gray-800 group-hover:text-primary-700 text-xs sm:text-sm leading-tight transition-colors">
                {label}
              </span>
              {desc && (
                <span className="hidden sm:block text-[11px] text-gray-400 mt-1 leading-tight line-clamp-2">
                  {desc}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm sm:text-base"
          >
            🛒 {t.categories.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
