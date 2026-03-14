import { useLang } from '../../context/LanguageContext';

const PHONE1 = '8825515488';
const PHONE2 = '9965634061';

export default function Contact() {
  const { t } = useLang();

  const waMsg = encodeURIComponent(t.contact.whatsappMessage);

  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            📞 {t.contact.title}
          </span>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {t.contact.title}
          </h2>
          <p className="text-green-200 max-w-lg mx-auto text-sm sm:text-base">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact actions */}
          <div className="space-y-4">
            {/* Call buttons */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">{t.contact.callUs}</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${PHONE1}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-4 transition-colors group"
                  aria-label={`Call ${PHONE1}`}
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-green-300 font-medium">Primary</div>
                    <div className="text-xl font-bold tracking-wider">{PHONE1}</div>
                  </div>
                </a>
                <a
                  href={`tel:${PHONE2}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-4 transition-colors group"
                  aria-label={`Call ${PHONE2}`}
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-green-300 font-medium">Alternate</div>
                    <div className="text-xl font-bold tracking-wider">{PHONE2}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/91${PHONE1}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-400 rounded-2xl px-6 py-5 transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="text-green-100 text-xs font-medium">Chat with us</div>
                <div className="text-white font-bold text-lg">WhatsApp Now</div>
              </div>
            </a>

            {/* Address */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="flex gap-3">
                <span className="text-2xl shrink-0">📍</span>
                <div>
                  <div className="font-semibold mb-1">{t.contact.address}</div>
                  <a
                    href="https://maps.google.com/?q=Vilangudi+Ariyalur+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-white text-sm underline underline-offset-2 transition-colors"
                  >
                    {t.contact.getDirections} →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 min-h-[300px] sm:min-h-[400px] flex flex-col">
            <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8 text-center">
              <div className="text-5xl">🗺️</div>
              <div>
                <p className="font-semibold text-lg mb-2">KRT Workshop Location</p>
                <p className="text-green-200 text-sm mb-4">{t.contact.mapPlaceholder}</p>
                <p className="text-green-300 text-xs">Vilangudi, Near Government Hospital,<br />Ariyalur, Tamil Nadu – 621704</p>
              </div>
              {/*
                TO ADD GOOGLE MAPS EMBED: Replace the content above with:
                <iframe
                  src="YOUR_GOOGLE_MAPS_EMBED_URL"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KRT Workshop Location"
                />
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
