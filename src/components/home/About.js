import { useLang } from '../../context/LanguageContext';

const PHONE1 = '8825515488';
const PHONE2 = '9965634061';

export default function About() {
  const { t } = useLang();

  const details = [
    { icon: '📍', label: t.about.locationLabel, value: t.about.locationValue },
    { icon: '🕐', label: t.about.hoursLabel, value: t.about.hoursValue },
    {
      icon: '📞',
      label: t.about.phone1Label,
      value: PHONE1,
      href: `tel:${PHONE1}`,
    },
    {
      icon: '📞',
      label: t.about.phone2Label,
      value: PHONE2,
      href: `tel:${PHONE2}`,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white" id="about" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Text side */}
          <div>
            <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              ℹ️ {t.about.title}
            </span>
            <h2 id="about-heading" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5">
              {t.about.title}
            </h2>

            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>{t.about.para1}</p>
              <p>{t.about.para2}</p>
              <p>{t.about.para3}</p>
            </div>

            {/* Owner card */}
            <div className="mt-7 flex items-center gap-4 bg-primary-50 rounded-2xl p-4 border border-primary-100">
              <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-2xl text-white shrink-0">
                👨‍🔧
              </div>
              <div>
                <div className="font-bold text-gray-800">{t.about.owner}</div>
                <div className="text-sm text-primary-600">{t.about.ownerTitle}</div>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <div className="text-sm font-medium text-gray-700 whitespace-pre-line">{value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
