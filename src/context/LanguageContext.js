import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '../../locales/en';
import ta from '../../locales/ta';
import hi from '../../locales/hi';

const translations = { en, ta, hi };

const LanguageContext = createContext({
  lang: 'en',
  t: en,
  setLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('krt_lang') : null;
    if (saved && translations[saved]) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l) => {
    if (translations[l]) {
      setLangState(l);
      if (typeof window !== 'undefined') {
        localStorage.setItem('krt_lang', l);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
