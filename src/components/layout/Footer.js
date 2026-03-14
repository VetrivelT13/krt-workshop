import Link from 'next/link';
import { useLang } from '../../context/LanguageContext';

const PHONE1 = '8825515488';
const PHONE2 = '9965634061';

export default function Footer() {
  const { t } = useLang();

  const categories = [
    { href: '/products?cat=tractor-parts', label: t.categories.tractorParts },
    { href: '/products?cat=agri-tools',    label: t.categories.agriTools },
    { href: '/products?cat=welding',       label: t.categories.weldingMaterials },
    { href: '/products?cat=engine-oils',   label: t.categories.engineOils },
    { href: '/products?cat=belts',         label: t.categories.belts },
  ];

  const quickLinks = [
    { href: '/',         label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/#about',   label: t.nav.about },
    { href: '/#contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-primary-900 text-green-100">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                🚜
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">KRT Workshop</div>
                <div className="text-green-400 text-xs">& Traders</div>
              </div>
            </div>
            <p className="text-sm text-green-300 leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${PHONE1}`}
                className="w-9 h-9 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center text-lg transition-colors"
                aria-label="Call us"
              >
                📞
              </a>
              <a
                href="https://wa.me/918825515488"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center text-lg transition-colors"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-green-300 hover:text-white transition-colors"
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2">
              {categories.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-green-300 hover:text-white transition-colors"
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-sm text-green-300">
              <li className="flex gap-2">
                <span className="shrink-0">📍</span>
                <span>KRT Workshop, Vilangudi, Near Govt Hospital, Ariyalur, TN – 621704</span>
              </li>
              <li>
                <a href={`tel:${PHONE1}`} className="flex gap-2 hover:text-white transition-colors">
                  <span>📞</span> {PHONE1}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE2}`} className="flex gap-2 hover:text-white transition-colors">
                  <span>📞</span> {PHONE2}
                </a>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">🕐</span>
                <span>Mon–Sat: 8AM–7PM<br />Sun: 9AM–2PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-500">
          <span>{t.footer.rights}</span>
          <span>{t.footer.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
