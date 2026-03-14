import { useLang } from '../../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ta', label: 'த',  full: 'தமிழ்' },
  { code: 'hi', label: 'हि', full: 'हिन्दी' },
];

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Select language">
      {LANGUAGES.map(({ code, label, full }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={full}
          aria-pressed={lang === code}
          className={`
            px-2 py-1 rounded text-xs font-semibold transition-all duration-150
            ${lang === code
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            }
          `}
        >
          {compact ? label : full}
        </button>
      ))}
    </div>
  );
}
