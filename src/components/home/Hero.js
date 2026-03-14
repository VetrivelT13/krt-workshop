import Link from 'next/link';
import { useLang } from '../../context/LanguageContext';

const PHONE1 = '8825515488';
const PHONE2 = '9965634061';

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-10 right-10 text-[120px] sm:text-[200px] leading-none select-none">🚜</div>
        <div className="absolute bottom-10 left-10 text-[80px] sm:text-[120px] leading-none select-none">🌾</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] sm:text-[500px] leading-none select-none">⚙️</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/30">
            📍 Ariyalur, Tamil Nadu, India
          </span>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            {t.hero.tagline}{' '}
            <span className="text-green-300">{t.hero.taglineHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-green-100 leading-relaxed mb-8 max-w-2xl">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-green-50 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 text-sm sm:text-base"
            >
              🛒 {t.hero.browseProducts}
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 text-sm sm:text-base"
            >
              📞 {t.hero.contactUs}
            </a>
          </div>

          {/* Quick contact */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${PHONE1}`}
              className="flex items-center gap-2 bg-primary-800/60 hover:bg-primary-800 border border-primary-500/50 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <span className="text-base">📞</span>
              <span>{PHONE1}</span>
            </a>
            <a
              href={`tel:${PHONE2}`}
              className="flex items-center gap-2 bg-primary-800/60 hover:bg-primary-800 border border-primary-500/50 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <span className="text-base">📞</span>
              <span>{PHONE2}</span>
            </a>
            <a
              href="https://wa.me/918825515488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Stats ribbon */}
      <div className="relative bg-primary-900/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '10+', label: t.hero.yearsExp },
              { value: '500+', label: t.hero.happyCustomers },
              { value: '200+', label: t.hero.productsAvailable },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl sm:text-2xl font-extrabold text-green-300">{value}</div>
                <div className="text-xs sm:text-sm text-green-200 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
